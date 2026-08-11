import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CapabilityStatus, CapabilityType, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../../database/prisma.service';
import { CapabilitiesService } from '../capabilities/capabilities.service';
import { OtpService } from './otp.service';
import {
  RefreshTokenService,
  type IssuedRefreshToken,
  type SessionMeta,
} from './refresh-token.service';
import { assertPasswordStrength } from '../../common/utils/password-policy';
import { normaliseNepalPhone } from '../../common/utils/phone.util';
import type { JwtPayload } from '../../common/types/auth-context';
import type { AppConfig } from '../../config/app.config';

export interface SignedAccessToken {
  accessToken: string;
  expiresAt: Date;
  tokenType: 'Bearer';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly otp: OtpService,
    private readonly config: ConfigService,
    private readonly capabilities: CapabilitiesService,
    private readonly refreshTokens: RefreshTokenService,
  ) {}

  /**
   * Issue an OTP for the given phone. Creates a bare User on first request (no
   * role is forced). When `role` is given, that capability is granted (and its
   * 1:1 profile created) — instantly for the open roles, so signing up as / adding
   * a role just works on the same number. `password`, if given, is stored on first
   * sign-up so the account can later log in with a password too.
   */
  async requestOtp(rawPhone: string, role?: CapabilityType, password?: string) {
    const phone = this.parsePhone(rawPhone);
    const user = await this.prisma.user.upsert({
      where: { phoneNumber: phone },
      update: {},
      create: { phoneNumber: phone },
    });

    // Set the password only the first time (never silently overwrite an existing one).
    if (password && !user.passwordHash) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { passwordHash: await argon2.hash(password, { type: argon2.argon2id }) },
      });
    }

    const roleAdded = role ? await this.grantRole(user.id, role) : false;
    const result = await this.otp.issue(phone);
    return { phoneNumber: phone, ...result, roleAdded };
  }

  /**
   * Grant a capability (idempotent) + create its 1:1 role profile. Open roles
   * land APPROVED immediately. Returns true if the account didn't already hold it.
   */
  private async grantRole(userId: string, role: CapabilityType): Promise<boolean> {
    const current = await this.capabilities.getStatus(userId, role);
    const roleAdded = current !== CapabilityStatus.APPROVED;
    await this.capabilities.setStatus(userId, role, CapabilityStatus.APPROVED);

    // Role-data tables. VENUE has no 1:1 profile — venues are created later (1:N).
    if (role === CapabilityType.PLAYER) {
      await this.prisma.playerProfile.upsert({ where: { userId }, update: {}, create: { userId } });
    } else if (role === CapabilityType.ORGANIZER) {
      await this.prisma.organizerProfile.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });
    }
    return roleAdded;
  }

  /**
   * Verify the OTP and issue an access token.
   */
  async verifyOtp(
    rawPhone: string,
    code: string,
  ): Promise<{ user: User; token: SignedAccessToken }> {
    const phone = this.parsePhone(rawPhone);
    await this.otp.verify(phone, code);

    const existing = await this.prisma.user.findUnique({ where: { phoneNumber: phone } });
    const user = await this.prisma.user.update({
      where: { phoneNumber: phone },
      data: {
        lastLoginAt: new Date(),
        // Mark the phone verified the first time only — gates password login.
        phoneVerifiedAt: existing?.phoneVerifiedAt ?? new Date(),
      },
      include: { capabilities: true },
    });

    if (!user.isActive) {
      throw new BadRequestException('This account has been deactivated.');
    }

    const token = await this.signAccessToken(user);
    return { user, token };
  }

  /**
   * Phone + password login (mobile). Only succeeds once the phone has been
   * verified via OTP at least once — the first sign-in must be OTP. A generic
   * message is returned for every failure mode to prevent enumeration.
   */
  async loginWithPhonePassword(
    rawPhone: string,
    password: string,
  ): Promise<{ user: User; token: SignedAccessToken }> {
    const phone = this.parsePhone(rawPhone);
    const user = await this.prisma.user.findUnique({ where: { phoneNumber: phone } });

    const invalid = () => new UnauthorizedException('Invalid phone number or password.');

    if (!user || !user.passwordHash || !user.phoneVerifiedAt) {
      // Constant-time dummy verify so missing-user / unverified responses match.
      await argon2
        .verify(
          '$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$X9N0BPzHvW3Hh9F9KmCw5/h2qD9QtdLh9wM5cd2u8oM',
          password,
        )
        .catch(() => undefined);
      throw invalid();
    }

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw invalid();
    if (!user.isActive) throw new UnauthorizedException('This account has been deactivated.');

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
      include: { capabilities: true },
    });

    const token = await this.signAccessToken(updated);
    return { user: updated, token };
  }

  /**
   * Email + password login. Used by the admin and venue-management web panels.
   * The same generic message is returned for unknown email / wrong password /
   * missing password hash so an attacker can't enumerate registered emails.
   */
  async loginWithEmail(
    email: string,
    password: string,
  ): Promise<{ user: User; token: SignedAccessToken }> {
    const normalisedEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email: normalisedEmail } });

    const invalid = () => new UnauthorizedException('Invalid email or password.');

    if (!user || !user.passwordHash) {
      // Run a dummy verify to keep the response time constant whether the user
      // exists or not — defeats trivial timing-based enumeration.
      await argon2
        .verify(
          '$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$X9N0BPzHvW3Hh9F9KmCw5/h2qD9QtdLh9wM5cd2u8oM',
          password,
        )
        .catch(() => undefined);
      throw invalid();
    }

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw invalid();
    if (!user.isActive) throw new UnauthorizedException('This account has been deactivated.');

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
      include: { capabilities: true },
    });

    const token = await this.signAccessToken(updated);
    return { user: updated, token };
  }

  /**
   * Password recovery, step 1 of 3: text a code to an EXISTING account.
   *
   * Deliberately not `requestOtp`: that one upserts the user and grants a role,
   * which is right for sign-up and wrong here — you can only recover an account
   * that already exists, and recovering it must never change what it can do.
   */
  async requestPasswordReset(rawPhone: string) {
    const phone = this.parsePhone(rawPhone);
    await this.findResettableUser(phone);
    const result = await this.otp.issue(phone);
    return { phoneNumber: phone, ...result };
  }

  /**
   * Step 2: check the code and hand back a short-lived ticket. Splitting this
   * from the reset itself is what lets the code screen answer "wrong code"
   * immediately, before anyone types a new password.
   */
  async verifyPasswordResetCode(rawPhone: string, code: string) {
    const phone = this.parsePhone(rawPhone);
    await this.findResettableUser(phone);
    await this.otp.verify(phone, code);
    return this.otp.issueResetTicket(phone);
  }

  /** Step 3: spend the ticket on a new password and end every live session. */
  async resetPassword(rawPhone: string, resetToken: string, newPassword: string): Promise<void> {
    const phone = this.parsePhone(rawPhone);
    const user = await this.findResettableUser(phone);
    await this.otp.consumeResetTicket(phone, resetToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: await argon2.hash(newPassword, { type: argon2.argon2id }),
        // The code proved they hold the number, and password login is gated on
        // this — so a reset also unblocks an account that never verified.
        phoneVerifiedAt: user.phoneVerifiedAt ?? new Date(),
        // Every token signed before the change stops working: whoever forced
        // the reset should not stay signed in on their old session.
        tokenVersion: { increment: 1 },
      },
    });
  }

  /** The account a reset may target — it has to exist and still be usable. */
  private async findResettableUser(phone: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { phoneNumber: phone } });
    if (!user) throw new BadRequestException('No Arena NP account uses this number.');
    if (!user.isActive) throw new BadRequestException('This account has been deactivated.');
    return user;
  }

  /**
   * Public helper used by other modules (e.g. invitation accept) to mint an
   * access token for a user without going through OTP / password.
   */
  issueTokenForUser(user: User): Promise<SignedAccessToken> {
    return this.signAccessToken(user);
  }

  /**
   * Open a session for a user who has just proved who they are. The access token
   * comes from the login path itself; this adds the refresh token that keeps
   * renewing it for as long as they stay active.
   */
  async setupStaffPassword(
    token: string,
    password: string,
  ): Promise<{ user: User; token: SignedAccessToken }> {
    // Find user by setup token
    const user = await this.prisma.user.findUnique({
      where: { setupToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired setup token.');
    }

    // Check if token has expired
    if (user.setupTokenExpiry && user.setupTokenExpiry < new Date()) {
      throw new BadRequestException('Setup token has expired.');
    }

    // Check if token was already used
    if (user.setupTokenUsedAt) {
      throw new BadRequestException('Setup token has already been used.');
    }

    // Hash the password
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

    // Update user: set password, mark token as used, bump tokenVersion
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        setupToken: null,
        setupTokenUsedAt: new Date(),
        tokenVersion: { increment: 1 }, // Ensure any old tokens are invalid
      },
    });

    // Sign and return access token
    const accessToken = await this.signAccessToken(updatedUser);

    return {
      user: updatedUser,
      token: accessToken,
    };
  }

  openSession(user: User, meta: SessionMeta = {}): Promise<IssuedRefreshToken> {
    return this.refreshTokens.issue(user.id, meta);
  }

  /**
   * Mint the next access token for a rotated refresh token. Re-reads the user so a
   * suspension or a `tokenVersion` bump lands on the very next refresh rather than
   * whenever the current access token happens to run out.
   */
  async accessTokenForUserId(userId: string): Promise<{ user: User; token: SignedAccessToken }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Your session has ended. Please sign in again.');
    }
    return { user, token: await this.signAccessToken(user) };
  }

  /** Exchange a refresh token for the next one, sliding its deadline forward. */
  refreshSession(presented: string, meta: SessionMeta = {}) {
    return this.refreshTokens.rotate(presented, meta);
  }

  /** Sign out the one device that holds this refresh token. */
  signOutSession(presented: string): Promise<void> {
    return this.refreshTokens.revokeByToken(presented);
  }

  /**
   * Lock the account out everywhere: bump `tokenVersion` so live access tokens die
   * on their next request, AND revoke every refresh token, because a surviving one
   * would simply mint a fresh access token past the bump. For password resets,
   * suspends and role changes — not for an ordinary sign-out.
   */
  /**
   * Change your own password, proving the current one first.
   *
   * Two callers: someone tightening up their own account, and — the reason it
   * exists — a staff member replacing the starter password their venue owner
   * chose for them. Verifying the current password matters even in that second
   * case: it stops a walk-up on an unlocked phone from locking the real holder
   * out of a seat they were just handed.
   *
   * Returns the user so the caller can mint a fresh session. It must: step 4
   * kills every token in existence for this account, including the one being
   * used to make this very call, so without a new one the client is bounced to
   * the login screen the moment it succeeds.
   */
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Account not found.');
    if (!user.passwordHash) {
      throw new BadRequestException(
        'This account has no password yet. Use "forgot password" to set one.',
      );
    }

    const ok = await argon2.verify(user.passwordHash, currentPassword);
    if (!ok) throw new BadRequestException('That current password is not right.');
    if (currentPassword === newPassword) {
      throw new BadRequestException('Pick a password different from the current one.');
    }
    assertPasswordStrength(newPassword, {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: await argon2.hash(newPassword, { type: argon2.argon2id }),
        mustChangePassword: false,
        // Same reasoning as resetPassword: they have now proved the number is
        // theirs by holding a working password on it, so phone login unblocks.
        phoneVerifiedAt: user.phoneVerifiedAt ?? new Date(),
        // Whoever else knew the old password — the owner who typed it — loses
        // every session they might have opened with it.
        tokenVersion: { increment: 1 },
      },
    });
    await this.refreshTokens.revokeAllForUser(user.id, 'password changed');
    return updated;
  }

  async invalidateSessions(userId: string, reason = 'sessions invalidated'): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
    await this.refreshTokens.revokeAllForUser(userId, reason);
  }

  private async signAccessToken(user: User): Promise<SignedAccessToken> {
    const ttl = this.config.get<AppConfig['jwt']>('app.jwt')!.accessTtl;
    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: ttl as JwtSignOptions['expiresIn'],
    });
    const decoded = this.jwt.decode(accessToken) as { exp: number };
    return {
      accessToken,
      tokenType: 'Bearer',
      expiresAt: new Date(decoded.exp * 1000),
    };
  }

  private parsePhone(raw: string): string {
    try {
      return normaliseNepalPhone(raw);
    } catch {
      throw new BadRequestException('Phone must be a valid Nepal mobile number.');
    }
  }
}
