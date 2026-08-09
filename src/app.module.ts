import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';
import { storageConfig } from './config/storage.config';
import { envValidationSchema } from './config/env.validation';
import { graphqlConfigFactory } from './config/graphql.config';

import { PrismaModule } from './database/prisma.module';
import { RedisModule } from './redis/redis.module';
import { MailerModule } from './mailer/mailer.module';
import { StorageModule } from './storage/storage.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { BookingModule } from './modules/booking/booking.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { OffersModule } from './modules/offers/offers.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { CapabilitiesModule } from './modules/capabilities/capabilities.module';
import { VenueModule } from './modules/venue/venue.module';
import { VenueStaffModule } from './modules/venue-staff/venue-staff.module';
import { VenueInvitationsModule } from './modules/venue-invitations/venue-invitations.module';
import { SportsModule } from './modules/sports/sports.module';
import { ClosuresModule } from './modules/closures/closures.module';
import { FinanceModule } from './modules/finance/finance.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig, redisConfig, storageConfig],
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: false },
    }),

    // One global per-IP ceiling. Credential endpoints tighten it per handler
    // with `@ThrottleAuth()` rather than registering a second named limiter —
    // every configured limiter applies to every route, so a second one would
    // cap the whole API at the auth budget.
    ThrottlerModule.forRootAsync({
      useFactory: () => [
        {
          ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10) * 1000,
          limit: parseInt(process.env.THROTTLE_LIMIT ?? '120', 10),
        },
      ],
    }),

    GraphQLModule.forRootAsync(graphqlConfigFactory),

    // Infrastructure
    PrismaModule,
    RedisModule,
    MailerModule,
    StorageModule,

    CapabilitiesModule,
    AuthModule,
    UsersModule,
    AdminModule,
    VenueModule,
    VenueStaffModule,
    BookingModule,
    DiscoveryModule,
    OffersModule,
    CustomersModule,
    SubscriptionsModule,
    VenueInvitationsModule,
    SportsModule,
    ClosuresModule,
    FinanceModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
