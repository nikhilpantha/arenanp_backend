import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, createHash } from 'crypto';

import { PrismaService } from '../../database/prisma.service';
import type { AppConfig } from '../../config/app.config';

/** What a caller needs to hand back to the client after a login or a refresh. */
export interface IssuedRefreshToken {
  /** The opaque token itself. Shown to the client once and never stored. */
  token: string;
  expiresAt: Date;
}

/** Rough device info, recorded for a future "your sessions" screen. Never trusted. */
export interface SessionMeta {
  userAgent?: string;
  ip?: string;
}

const MS_PER_DAY = 86_400_000;

/**
 * Refresh-token sessions: one row per signed-in device, kept alive by use.
 *
 * The contract, in one line: **you stay signed in for as long as you keep using
 * Arena NP, and one quiet week signs you out.** Each refresh rotates the token and
 * pushes its expiry out by the inactivity window, so there is no fixed session
 * ceiling for an active user and no lingering session for an inactive one.
 */
@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private get settings(): AppConfig['refresh'] {
    return this.config.get<AppConfig['refresh']>('app.refresh')!;
  }

  /** How long from now a freshly-used token stays valid. */
  get inactivityMs(): number {
    return this.settings.inactivityDays * MS_PER_DAY;
  }

  /**
   * Start a new session. Called by every login path, so each device that signs in
   * gets its own independently-revocable row.
   */
  async issue(userId: string, meta: SessionMeta = {}): Promise<IssuedRefreshToken> {
    // A fresh login is a fresh family — nothing links it to the device's old chain.
    return this.mint(userId, this.newFamilyId(), meta);
  }

  /**
   * Exchange a refresh token for the next one, sliding the deadline forward.
   *
   * Returns the user id so the caller can mint the matching access token. Throws
   * `UnauthorizedException` for anything the client must react to by signing in
   * again — expired, unknown, revoked, or a detected replay.
   */
  async rotate(
    presented: string,
    meta: SessionMeta = {},
  ): Promise<{ userId: string; refresh: IssuedRefreshToken }> {
    const existing = await this.prisma.refreshToken.findUnique({
      where: { tokenHash: hash(presented) },
      include: { user: { select: { id: true, isActive: true } } },
    });

    // Unknown token: either garbage, or one we purged long ago.
    if (!existing) throw new UnauthorizedException(SIGN_IN_AGAIN);

    // Already rotated away, yet someone is presenting it: the only way that happens
    // is a copy. We can't tell the thief from the victim, so the whole family goes.
    if (existing.revokedAt) {
      await this.revokeFamily(existing.familyId, 'reuse detected');
      this.logger.warn(
        `Refresh token reuse detected for user ${existing.userId}; revoked family ${existing.familyId}.`,
      );
      throw new UnauthorizedException(SIGN_IN_AGAIN);
    }

    // The inactivity window ran out — this is the "logged out after 7 quiet days"
    // path the whole design exists to produce.
    if (existing.expiresAt.getTime() <= Date.now()) {
      await this.revoke(existing.id, 'expired');
      throw new UnauthorizedException(
        'You have been signed out after a week of inactivity. Please sign in again.',
      );
    }

    if (!existing.user.isActive) throw new UnauthorizedException(SIGN_IN_AGAIN);

    // Consume this one and hand out its replacement, same family.
    const refresh = await this.prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: { id: existing.id },
        data: { revokedAt: new Date(), revokedReason: 'rotated', lastUsedAt: new Date() },
      });
      return this.mint(existing.userId, existing.familyId, meta, tx);
    });

    // Housekeeping on a cheap, naturally-throttled hook rather than a cron.
    void this.purgeExpired().catch(() => undefined);

    return { userId: existing.userId, refresh };
  }

  /**
   * Sign out one device. Deliberately quiet when the token is unknown: sign-out is
   * idempotent, and telling a caller "that token doesn't exist" helps nobody.
   */
  async revokeByToken(presented: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { tokenHash: hash(presented), revokedAt: null },
      data: { revokedAt: new Date(), revokedReason: 'signed out' },
    });
  }

  /**
   * End every session a user has. Pairs with bumping `tokenVersion` for the things
   * that must lock an account out everywhere at once — password reset, suspend,
   * role change — where leaving live refresh tokens behind would undo the bump on
   * the next refresh.
   */
  async revokeAllForUser(userId: string, reason: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date(), revokedReason: reason },
    });
  }

  /** Drop rows nobody can use again, so the table tracks live devices, not history. */
  async purgeExpired(): Promise<void> {
    const cutoff = new Date(Date.now() - this.inactivityMs);
    await this.prisma.refreshToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { lt: cutoff } }],
      },
    });
  }

  private async mint(
    userId: string,
    familyId: string,
    meta: SessionMeta,
    tx?: TxClient,
  ): Promise<IssuedRefreshToken> {
    const token = randomBytes(48).toString('base64url');
    const expiresAt = new Date(Date.now() + this.inactivityMs);
    await (tx ?? this.prisma).refreshToken.create({
      data: {
        userId,
        familyId,
        tokenHash: hash(token),
        expiresAt,
        userAgent: meta.userAgent?.slice(0, 300) ?? null,
        ip: meta.ip ?? null,
      },
    });
    return { token, expiresAt };
  }

  private async revoke(id: string, reason: string): Promise<void> {
    await this.prisma.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date(), revokedReason: reason },
    });
  }

  private async revokeFamily(familyId: string, reason: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { familyId, revokedAt: null },
      data: { revokedAt: new Date(), revokedReason: reason },
    });
  }

  private newFamilyId(): string {
    return randomBytes(16).toString('hex');
  }
}

type TxClient = Parameters<Parameters<PrismaService['$transaction']>[0]>[0];

/**
 * One message for every "this token is no good" case, so a caller can't use the
 * wording to tell an unknown token from a revoked one.
 */
const SIGN_IN_AGAIN = 'Your session has ended. Please sign in again.';

/** Tokens are looked up by hash, so the raw value never touches the database. */
function hash(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
