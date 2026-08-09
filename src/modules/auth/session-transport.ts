import type { Request, Response } from 'express';

import type { AppConfig } from '../../config/app.config';
import type { IssuedRefreshToken } from './refresh-token.service';

/**
 * How the refresh token reaches the client — the one place that differs between a
 * browser and the phone app.
 *
 * **Web** gets it as an httpOnly cookie it can never read, so an XSS bug can steal
 * at worst the 15-minute access token, not a session that renews itself for a
 * week. The cookie is never echoed in the response body, because a body the page's
 * own JavaScript can read would defeat the entire point.
 *
 * **The Expo app** has no cookie jar worth relying on, so it gets the token in the
 * body and stores it itself. It says so by sending `x-arenanp-client: app`.
 */
export type ClientKind = 'web' | 'app';

const CLIENT_HEADER = 'x-arenanp-client';

/** Which transport this caller wants. Anything unrecognised is treated as a browser. */
export function clientKindOf(req: Request | undefined): ClientKind {
  const raw = req?.headers?.[CLIENT_HEADER];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.toLowerCase() === 'app' ? 'app' : 'web';
}

/** The refresh token this request carries, from the cookie or an explicit argument. */
export function readRefreshToken(
  req: Request | undefined,
  settings: AppConfig['refresh'],
  fromInput?: string | null,
): string | null {
  // The app sends it explicitly; a browser never does, and never should.
  if (fromInput) return fromInput;
  return parseCookies(req?.headers?.cookie)[settings.cookieName] ?? null;
}

export function setRefreshCookie(
  res: Response | undefined,
  refresh: IssuedRefreshToken,
  settings: AppConfig['refresh'],
  isProd: boolean,
): void {
  res?.cookie?.(settings.cookieName, refresh.token, {
    ...cookieOptions(settings, isProd),
    // Matches the token's own sliding expiry, so the cookie dies with the session.
    expires: refresh.expiresAt,
  });
}

export function clearRefreshCookie(
  res: Response | undefined,
  settings: AppConfig['refresh'],
  isProd: boolean,
): void {
  res?.clearCookie?.(settings.cookieName, cookieOptions(settings, isProd));
}

function cookieOptions(settings: AppConfig['refresh'], isProd: boolean) {
  return {
    httpOnly: true,
    // `Lax` is enough because the API and the consoles share a registrable domain
    // (api.arenanp.com ↔ venue.arenanp.com, and plain `localhost` in dev), so the
    // refresh call counts as same-site. It also means the cookie is not sent from
    // anyone else's site, which is the CSRF protection we want.
    sameSite: 'lax' as const,
    secure: isProd,
    // Sent on every request to the API. Narrowing it to a /auth path would break
    // the GraphQL endpoint, which is where refreshSession lives.
    path: '/',
    ...(settings.cookieDomain ? { domain: settings.cookieDomain } : {}),
  };
}

/** Minimal `Cookie:` header parse — avoids pulling in cookie-parser for one read. */
function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {};
  const out: Record<string, string> = {};
  for (const part of header.split(';')) {
    const eq = part.indexOf('=');
    if (eq < 1) continue;
    const name = part.slice(0, eq).trim();
    if (!name || name in out) continue;
    out[name] = decodeURIComponent(part.slice(eq + 1).trim());
  }
  return out;
}
