import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { OtpService } from './otp.service';
import { RefreshTokenService } from './refresh-token.service';
import { SessionResponder } from './session-responder.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CapabilityGuard } from '../../common/guards/capability.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { GqlThrottlerGuard } from '../../common/guards/gql-throttler.guard';
import { PasswordChangeGuard } from '../../common/guards/password-change.guard';
import { CapabilitiesModule } from '../capabilities/capabilities.module';
import { RbacModule } from '../rbac/rbac.module';
import { PrismaModule } from '../../database/prisma.module';
import { RedisModule } from '../../redis/redis.module';
import { AuditModule } from '../audit/audit.module';
import { PermissionCacheService } from './permission-cache.service';
import { ResourceOwnershipService } from './resource-ownership.service';

// Force GraphQL enums to be registered before resolvers compile.
import '../../common/enums';

@Module({
  imports: [
    CapabilitiesModule,
    PrismaModule,
    RedisModule,
    AuditModule,
    RbacModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.jwt.accessSecret'),
        signOptions: {
          // `expiresIn` is typed `number | StringValue` in jsonwebtoken v9 (ms template literal);
          // we read it from env as a string and trust env validation upstream.
          expiresIn: (config.get<string>('app.jwt.accessTtl') ??
            '7d') as JwtSignOptions['expiresIn'],
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    OtpService,
    RefreshTokenService,
    SessionResponder,
    JwtStrategy,
    PermissionCacheService,
    ResourceOwnershipService,
    // Rate limiting runs FIRST, before authentication: a brute-force attempt
    // is exactly the traffic that never gets past JwtAuthGuard, so a limiter
    // registered after it would never see the requests it exists to stop.
    { provide: APP_GUARD, useClass: GqlThrottlerGuard },
    // Globally protect every route/resolver. Mark endpoints with @Public() to opt out.
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: CapabilityGuard },
    // Enforces @RequirePermission() against each user's permission grants.
    { provide: APP_GUARD, useClass: PermissionGuard },
    // Last, so it runs with `req.user` already populated: an account whose
    // password was set by someone else can do nothing until they replace it.
    { provide: APP_GUARD, useClass: PasswordChangeGuard },
  ],
  exports: [
    AuthService,
    SessionResponder,
    JwtModule,
    PassportModule,
    PermissionCacheService,
    ResourceOwnershipService,
  ],
})
export class AuthModule {}
