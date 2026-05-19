import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  APP_PORT: Joi.number().port().default(4000),
  APP_NAME: Joi.string().default('arenanp-backend'),
  APP_URL: Joi.string().uri().default('http://localhost:4000'),
  APP_TIMEZONE: Joi.string().default('Asia/Kathmandu'),
  CORS_ORIGINS: Joi.string().default(''),

  // Database
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgresql', 'postgres'] })
    .required(),

  // Redis
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').default(''),
  REDIS_DB: Joi.number().integer().min(0).default(0),
  REDIS_TLS: Joi.boolean().truthy('true').falsy('false').default(false),

  // JWT
  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_TTL: Joi.string().default('7d'),

  // OTP
  OTP_LENGTH: Joi.number().integer().min(4).max(8).default(6),
  OTP_TTL_SECONDS: Joi.number().integer().min(60).default(300),
  OTP_MAX_ATTEMPTS: Joi.number().integer().min(1).default(5),
  OTP_RESEND_COOLDOWN_SECONDS: Joi.number().integer().min(0).default(60),

  // SMS
  SMS_PROVIDER: Joi.string().valid('stub', 'sparrow', 'twilio').default('stub'),
  SMS_API_KEY: Joi.string().allow('').default(''),
  SMS_SENDER_ID: Joi.string().default('ArenaNP'),

  // Throttling
  THROTTLE_TTL: Joi.number().integer().min(1).default(60),
  THROTTLE_LIMIT: Joi.number().integer().min(1).default(120),

  // GraphQL
  GRAPHQL_INTROSPECTION: Joi.boolean().truthy('true').falsy('false').default(true),

  // Logging
  LOG_LEVEL: Joi.string().valid('trace', 'debug', 'info', 'warn', 'error', 'fatal').default('info'),

  // Seed
  SEED_SUPER_ADMIN_PHONE: Joi.string().optional(),
  SEED_SUPER_ADMIN_NAME: Joi.string().optional(),
});
