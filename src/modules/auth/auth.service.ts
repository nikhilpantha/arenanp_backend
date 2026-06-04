import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { PrismaService } from '../../database/prisma.service';
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
  ) {}

  /**
   * Issue an OTP for the given phone. Creates a stub User on first request so
   * subsequent flows have a stable id.
   */
  async requestOtp(rawPhone: string) {
    const phone = this.parsePhone(rawPhone);
    await this.prisma.user.upsert({
      where: { phoneNumber: phone },
      update: {},
      create: { phoneNumber: phone },
    });
    const result = await this.otp.issue(phone);
    return { phoneNumber: phone, ...result };
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

    const user = await this.prisma.user.update({
      where: { phoneNumber: phone },
      data: { lastLoginAt: new Date() },
    });

    if (!user.isActive) {
      throw new BadRequestException('This account has been deactivated.');
    }

    const token = await this.signAccessToken(user);
    return { user, token };
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
      organizerStatus: user.organizerStatus,
      venueOwnerStatus: user.venueOwnerStatus,
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
