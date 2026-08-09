import { Throttle } from '@nestjs/throttler';

/**
 * The tight per-IP budget for anything that accepts a credential — a password,
 * an OTP code, a reset token.
 *
 * The global limit is sized for ordinary API traffic and is far too generous
 * to stop a password guess: 120 attempts a minute against a login is a
 * successful attack, not rate limiting. These endpoints get ~10 attempts per
 * five minutes instead.
 *
 * It matters most for staff accounts, whose login emails are derived from a
 * name and a venue slug and are therefore guessable by design — the password
 * is the only secret, so the number of guesses has to be small.
 *
 * Per-IP, so it is a speed bump against a distributed attempt rather than a
 * wall. The per-phone OTP cooldown and the reset ticket's single use are the
 * other half; together they make credential stuffing expensive rather than
 * free.
 */
export const ThrottleAuth = () =>
  Throttle({
    default: {
      ttl: parseInt(process.env.THROTTLE_AUTH_TTL ?? '300', 10) * 1000,
      limit: parseInt(process.env.THROTTLE_AUTH_LIMIT ?? '10', 10),
    },
  });
