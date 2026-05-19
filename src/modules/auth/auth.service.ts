import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '@prisma/client';
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

  private async signAccessToken(user: User): Promise<SignedAccessToken> {
    const ttl = this.config.get<AppConfig['jwt']>('app.jwt')!.accessTtl;
    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
      organizerStatus: user.organizerStatus,
      venueOwnerStatus: user.venueOwnerStatus,
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
