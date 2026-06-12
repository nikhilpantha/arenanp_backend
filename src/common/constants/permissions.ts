import { VenueMemberRole } from '@prisma/client';

/**
 * Fine-grained, venue-scoped permissions. A venue membership's effective
 * permission set = the role's defaults (below) ∪ the membership's
 * `permissions[]` overrides. Guards check these per target venue.
 */
export const VENUE_PERMISSIONS = [
  'venue:edit', // profile, services, hours, verification
  'bookings:read',
  'bookings:write', // create / modify / cancel
  'calendar:manage',
  'customers:read',
  'offers:manage',
  'memberships:manage',
  'teams:manage',
  'finance:read',
  'finance:payout',
  'staff:manage', // invite / remove staff, change roles
] as const;

export type VenuePermission = (typeof VENUE_PERMISSIONS)[number];

/** Default permission set granted by each venue role. */
export const ROLE_PERMISSIONS: Record<VenueMemberRole, readonly VenuePermission[]> = {
  OWNER: VENUE_PERMISSIONS, // everything
  MANAGER: [
    'venue:edit',
    'bookings:read',
    'bookings:write',
    'calendar:manage',
    'customers:read',
    'offers:manage',
    'memberships:manage',
    'teams:manage',
    'finance:read',
  ],
  FRONT_DESK: ['bookings:read', 'bookings:write', 'calendar:manage', 'customers:read'],
  STAFF: ['bookings:read', 'calendar:manage', 'customers:read'],
  COACH: ['bookings:read', 'calendar:manage'],
};

/** Resolve a membership's effective permissions: role defaults merged with overrides. */
export function effectivePermissions(
  role: VenueMemberRole,
  overrides: readonly string[] = [],
): VenuePermission[] {
  const set = new Set<VenuePermission>(ROLE_PERMISSIONS[role]);
  for (const p of overrides) {
    if ((VENUE_PERMISSIONS as readonly string[]).includes(p)) set.add(p as VenuePermission);
  }
  return [...set];
}
