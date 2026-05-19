import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';

import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { redisConfig } from './config/redis.config';
import { envValidationSchema } from './config/env.validation';
import { graphqlConfigFactory } from './config/graphql.config';

import { PrismaModule } from './database/prisma.module';
import { RedisModule } from './redis/redis.module';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig, redisConfig],
      validationSchema: envValidationSchema,
      validationOptions: { abortEarly: false },
    }),

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

    AuthModule,
    UsersModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
