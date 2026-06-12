import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { CapabilityStatus, CapabilityType, User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../../database/prisma.service';
import { CapabilitiesService } from '../capabilities/capabilities.service';
import { OtpService } from './otp.service';
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
   * Public helper used by other modules (e.g. invitation accept) to mint an
   * access token for a user without going through OTP / password.
   */
  issueTokenForUser(user: User): Promise<SignedAccessToken> {
    return this.signAccessToken(user);
  }

  /**
   * Increment the user's `tokenVersion` so every previously-issued JWT is
   * rejected by JwtStrategy on its next request. Called on sign-out and on
   * admin actions that should kill existing sessions (suspend, demote, etc).
   */
  async invalidateSessions(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
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
