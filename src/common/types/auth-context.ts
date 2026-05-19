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
  iat?: number;
  exp?: number;
}
