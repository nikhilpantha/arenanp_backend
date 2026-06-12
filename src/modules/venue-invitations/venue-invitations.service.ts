import { randomBytes } from 'crypto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

import { PrismaService } from '../../database/prisma.service';
import { MailerService } from '../../mailer/mailer.service';
import { AuthService } from '../auth/auth.service';
import type { AuthUser } from '../../common/types/auth-context';
import { mapUserToGraphql } from '../users/dto/user.model';
import type { AuthPayload } from '../auth/dto/auth-payload';

import { VenueInvitationsRepository } from './venue-invitations.repository';
import {
  CreateInvitationResult,
  InvitationVerification,
  VenueInvitation,
  mapInvitationToGraphql,
} from './dto/invitation.models';
import {
  AcceptVenueInvitationInput,
  InviteVenueInput,
  ResendVenueInvitationInput,
  RevokeVenueInvitationInput,
} from './dto/invitation.inputs';

const INVITATION_TTL_HOURS = 72;

@Injectable()
export class VenueInvitationsService {
  private readonly logger = new Logger(VenueInvitationsService.name);

  constructor(
    private readonly repo: VenueInvitationsRepository,
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  async listPending(): Promise<VenueInvitation[]> {
    const rows = await this.repo.listPending();
    return rows.map(mapInvitationToGraphql);
  }

  async invite(input: InviteVenueInput, actor: AuthUser): Promise<CreateInvitationResult> {
    const email = input.email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser && existingUser.passwordHash) {
      throw new ConflictException(
        'An account with this email already exists. Ask them to sign in instead.',
      );
    }

    const existingInvite = await this.repo.findPendingByEmail(email);
    if (existingInvite) {
      throw new ConflictException(
        'A pending invitation already exists for this email. Resend or revoke it first.',
      );
    }

    const { token, tokenHash } = await this.mintToken();
    const expiresAt = this.expiry();

    const invitation = await this.repo.create({
      email,
      fullName: input.fullName?.trim() || null,
      phoneNumber: input.phoneNumber?.trim() || null,
      tokenHash,
      expiresAt,
      invitedById: actor.id,
    });

    const setupUrl = this.buildSetupUrl(invitation.id, token);
    await this.sendInviteEmail({
      email,
      fullName: invitation.fullName,
      setupUrl,
    });

    return {
      invitation: mapInvitationToGraphql(invitation),
      setupUrl: this.mailer.provider === 'stub' ? setupUrl : undefined,
    };
  }

  async resend(input: ResendVenueInvitationInput): Promise<CreateInvitationResult> {
    const row = await this.repo.findById(input.invitationId);
    if (!row) throw new NotFoundException('Invitation not found.');
    if (row.acceptedAt) {
      throw new BadRequestException('That invitation has already been accepted.');
    }

    const { token, tokenHash } = await this.mintToken();
    const updated = await this.repo.rotateToken({
      id: row.id,
      tokenHash,
      expiresAt: this.expiry(),
    });

    const setupUrl = this.buildSetupUrl(updated.id, token);
    await this.sendInviteEmail({
      email: updated.email,
      fullName: updated.fullName,
      setupUrl,
    });

    return {
      invitation: mapInvitationToGraphql(updated),
      setupUrl: this.mailer.provider === 'stub' ? setupUrl : undefined,
    };
  }

  async revoke(input: RevokeVenueInvitationInput): Promise<boolean> {
    const row = await this.repo.findById(input.invitationId);
    if (!row) throw new NotFoundException('Invitation not found.');
    if (row.acceptedAt) {
      throw new BadRequestException('Accepted invitations can no longer be revoked.');
    }
    await this.repo.delete(row.id);
    return true;
  }

  /** Public — called by the setup page before showing the password form. */
  async verifyToken(rawToken: string): Promise<InvitationVerification> {
    const parsed = this.parseToken(rawToken);
    if (!parsed) return { valid: false, reason: 'Malformed token.' };

    const row = await this.repo.findById(parsed.id);
    if (!row) return { valid: false, reason: 'Invitation not found.' };
    if (row.acceptedAt) return { valid: false, reason: 'This invitation has already been used.' };
    if (row.expiresAt <= new Date()) {
      return { valid: false, reason: 'This invitation has expired.' };
    }

    const ok = await this.verifyHash(row.tokenHash, parsed.secret);
    if (!ok) return { valid: false, reason: 'Invalid invitation token.' };

    return {
      valid: true,
      email: row.email,
      fullName: row.fullName ?? undefined,
      phoneNumber: row.phoneNumber ?? undefined,
    };
  }

  /** Public — consumes the invitation and signs the user in. */
  async accept(input: AcceptVenueInvitationInput): Promise<AuthPayload> {
    const parsed = this.parseToken(input.token);
    if (!parsed) throw new BadRequestException('Malformed token.');

    const row = await this.repo.findById(parsed.id);
    if (!row) throw new BadRequestException('Invitation not found.');
    if (row.acceptedAt) throw new BadRequestException('This invitation has already been used.');
    if (row.expiresAt <= new Date()) {
      throw new BadRequestException('This invitation has expired.');
    }

    const ok = await this.verifyHash(row.tokenHash, parsed.secret);
    if (!ok) throw new BadRequestException('Invalid invitation token.');

    const passwordHash = await argon2.hash(input.password, { type: argon2.argon2id });

    let user;
    try {
      user = await this.repo.acceptAndProvisionUser({
        invitationId: row.id,
        passwordHash,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not accept invitation.';
      throw new BadRequestException(msg);
    }

    const token = await this.auth.issueTokenForUser(user);
    return {
      ...token,
      user: mapUserToGraphql(user),
    };
  }

  private async mintToken(): Promise<{ token: string; tokenHash: string }> {
    // 32 raw bytes -> 43-char base64url string. Plenty of entropy.
    const secret = randomBytes(32).toString('base64url');
    const tokenHash = await argon2.hash(secret, { type: argon2.argon2id });
    return { token: secret, tokenHash };
  }

  private async verifyHash(hash: string, secret: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, secret);
    } catch {
      return false;
    }
  }

  private parseToken(raw: string): { id: string; secret: string } | null {
    const dot = raw.indexOf('.');
    if (dot <= 0 || dot === raw.length - 1) return null;
    return { id: raw.slice(0, dot), secret: raw.slice(dot + 1) };
  }

  private buildSetupUrl(invitationId: string, secret: string): string {
    const base = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:3000';
    return `${base.replace(/\/$/, '')}/setup-account?token=${invitationId}.${secret}`;
  }

  private expiry(): Date {
    const d = new Date();
    d.setHours(d.getHours() + INVITATION_TTL_HOURS);
    return d;
  }

  private async sendInviteEmail(args: {
    email: string;
    fullName?: string | null;
    setupUrl: string;
  }): Promise<void> {
    const greeting = args.fullName ? `Hi ${args.fullName}` : 'Hi there';
    const text = `${greeting},

You've been invited to join Arena NP as a venue owner. Click the link below to set your password and finish setting up your account. The link expires in ${INVITATION_TTL_HOURS} hours.

${args.setupUrl}

If you didn't expect this email, you can safely ignore it.

— The Arena NP team`;

    await this.mailer.send({
      to: args.email,
      subject: 'Set up your Arena NP venue account',
      text,
    });
  }
}
