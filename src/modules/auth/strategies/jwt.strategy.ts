import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../database/prisma.service';
import type { AuthUser, JwtPayload } from '../../../common/types/auth-context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const secret = config.get<string>('app.jwt.accessSecret');
    if (!secret) throw new Error('JWT_ACCESS_SECRET is not configured');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        phoneNumber: true,
        role: true,
        isActive: true,
        tokenVersion: true,
        capabilities: { select: { type: true, status: true } },
      },
    });

    if (!user || !user.isActive) throw new UnauthorizedException('User not found or inactive');

    // Server-side session revocation. Sign-out / suspend / role change bumps
    // `User.tokenVersion`; any token whose claim no longer matches is dead.
    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException('Session has been invalidated. Please sign in again.');
    }

    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      role: user.role,
      capabilities: user.capabilities.map((c) => ({ type: c.type, status: c.status })),
    };
  }
}
