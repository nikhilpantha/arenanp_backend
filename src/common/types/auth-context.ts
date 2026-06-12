import type { CapabilityStatus, CapabilityType, UserRole } from '@prisma/client';

/** A single capability grant (type + current status) carried on the auth user. */
export interface CapabilitySnapshot {
  type: CapabilityType;
  status: CapabilityStatus;
}

/**
 * The authenticated principal attached to every request by JwtStrategy.
 * Capabilities are loaded fresh from the DB on each request, so an admin
 * approval takes effect on the user's next call without re-login.
 */
export interface AuthUser {
  id: string;
  phoneNumber: string;
  role: UserRole;
  capabilities: CapabilitySnapshot[];
}

/**
 * JWT claims. Deliberately minimal — authorization state (capabilities,
 * memberships) is resolved from the DB in JwtStrategy, not trusted from the
 * token. `tokenVersion` is the only authz-relevant claim: it mirrors
 * `User.tokenVersion` at sign time so sign-out / suspend can revoke a token.
 */
export interface JwtPayload {
  sub: string;
  role: UserRole;
  tokenVersion: number;
  iat?: number;
  exp?: number;
}

/** True when the user holds `type` with APPROVED status (SUPER_ADMIN bypass lives in guards). */
export function hasApprovedCapability(user: AuthUser, type: CapabilityType): boolean {
  return user.capabilities.some((c) => c.type === type && c.status === 'APPROVED');
}
