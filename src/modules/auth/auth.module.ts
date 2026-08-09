import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { OtpService } from './otp.service';
import { JwtStrategy } from './strategies/jwt.strategy';

import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CapabilityGuard } from '../../common/guards/capability.guard';
import { PermissionGuard } from '../../common/guards/permission.guard';
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
    JwtStrategy,
    PermissionCacheService,
    ResourceOwnershipService,
    // Globally protect every route/resolver. Mark endpoints with @Public() to opt out.
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: CapabilityGuard },
    // Dynamic RBAC — enforces @RequirePermission() against the roles tables.
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
  exports: [
    AuthService,
    JwtModule,
    PassportModule,
    PermissionCacheService,
    ResourceOwnershipService,
  ],
})
export class AuthModule {}
