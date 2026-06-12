import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  APP_PORT: Joi.number().port().default(4000),
  APP_NAME: Joi.string().default('arenanp-backend'),
  APP_URL: Joi.string().uri().default('http://localhost:4000'),
  APP_TIMEZONE: Joi.string().default('Asia/Kathmandu'),
  CORS_ORIGINS: Joi.string().default(''),

  // Frontend base URL — used to build links inside transactional emails
  // (invitation setup, password reset, etc).
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),

  // Email — stub logs to console + returns the rendered link in dev so admins
  // can click straight through. Swap for SendGrid / SES / Resend in prod.
  MAIL_PROVIDER: Joi.string().valid('stub', 'sendgrid', 'resend', 'ses').default('stub'),
  MAIL_FROM: Joi.string().default('Arena NP <noreply@arenanp.local>'),

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

  // Platform fees
  // Default commission percentage applied to a settlement when no PlatformSetting
  // override exists yet. Moves to PlatformSetting in Feature 10.
  PLATFORM_COMMISSION_PERCENTAGE: Joi.number().min(0).max(100).default(10),

  // Logging
  LOG_LEVEL: Joi.string().valid('trace', 'debug', 'info', 'warn', 'error', 'fatal').default('info'),

  // Storage (AWS S3) — private bucket; backend issues presigned upload/download URLs.
  // Empty-allowed so dev/test/CI without AWS still boots; StorageService throws a
  // clear error only when an upload/download is actually attempted unconfigured.
  AWS_REGION: Joi.string().default('ap-south-1'),
  AWS_S3_BUCKET: Joi.string().allow('').default(''),
  AWS_ACCESS_KEY_ID: Joi.string().allow('').default(''),
  AWS_SECRET_ACCESS_KEY: Joi.string().allow('').default(''),
  S3_PRESIGN_EXPIRY_SECONDS: Joi.number().integer().min(60).default(900),
  S3_DOWNLOAD_EXPIRY_SECONDS: Joi.number().integer().min(60).default(3600),

  // Seed
  SEED_SUPER_ADMIN_PHONE: Joi.string().optional(),
  SEED_SUPER_ADMIN_NAME: Joi.string().optional(),
  // `tlds: { allow: false }` lets us use dev-only TLDs like `admin@arenanp.local`.
  // Still enforces the format (must contain `@` and a domain).
  SEED_SUPER_ADMIN_EMAIL: Joi.string()
    .email({ tlds: { allow: false } })
    .optional(),
  SEED_SUPER_ADMIN_PASSWORD: Joi.string().min(8).optional(),
});
