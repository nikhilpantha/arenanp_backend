import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.APP_PORT ?? '4000', 10),
  name: process.env.APP_NAME ?? 'arenanp-backend',
  url: process.env.APP_URL ?? 'http://localhost:4000',
  timezone: process.env.APP_TIMEZONE ?? 'Asia/Kathmandu',
  corsOrigins: (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),
  logLevel: process.env.LOG_LEVEL ?? 'info',
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT ?? '120', 10),
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET ?? '',
    /// Short on purpose — a leaked access token is only useful for this long, and
    /// the refresh token silently mints the next one.
    accessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
  },
  refresh: {
    /// Go this long without using Arena NP and you have to sign in again. Every
    /// refresh pushes the deadline out, so an active user is never logged out.
    inactivityDays: parseInt(process.env.REFRESH_INACTIVITY_DAYS ?? '7', 10),
    /// Cookie name holding the refresh token on web (httpOnly, JS can't read it).
    cookieName: process.env.REFRESH_COOKIE_NAME ?? 'arenanp_refresh',
    /// Set to `.arenanp.com` in production so every console subdomain shares the
    /// session. Left blank in dev, where the host is plain `localhost`.
    cookieDomain: process.env.REFRESH_COOKIE_DOMAIN ?? '',
  },
  otp: {
    length: parseInt(process.env.OTP_LENGTH ?? '6', 10),
    ttlSeconds: parseInt(process.env.OTP_TTL_SECONDS ?? '300', 10),
    maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS ?? '5', 10),
    resendCooldownSeconds: parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS ?? '60', 10),
  },
  sms: {
    provider: process.env.SMS_PROVIDER ?? 'stub',
    apiKey: process.env.SMS_API_KEY ?? '',
    senderId: process.env.SMS_SENDER_ID ?? 'ArenaNP',
  },
}));

export type AppConfig = ReturnType<typeof appConfig>;
