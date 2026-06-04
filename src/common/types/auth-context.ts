import type { OrganizerStatus, UserRole, VenueOwnerStatus } from '@prisma/client';

export interface AuthUser {
  id: string;
  phoneNumber: string;
  role: UserRole;
  organizerStatus: OrganizerStatus;
  venueOwnerStatus: VenueOwnerStatus;
}

export interface JwtPayload {
  sub: string;
  role: UserRole;
  organizerStatus: OrganizerStatus;
  venueOwnerStatus: VenueOwnerStatus;
  /// Mirrors `User.tokenVersion` at sign time. JwtStrategy rejects requests
  /// whose claim doesn't match the live DB row — that's how sign-out + admin
  /// session-revocation actually invalidate previously-issued tokens.
  tokenVersion: number;
  iat?: number;
  exp?: number;
}
