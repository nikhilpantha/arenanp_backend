import { VenueMemberRole } from '@prisma/client';

import { permissionKeysForDomain, type VenuePermissionKey } from './permission-keys';

/**
 * Starting permission sets for the job titles a venue owner picks from.
 *
 * These are **presets, not authority**. Choosing "Front desk" when creating a
 * seat writes the keys below into `staff_permissions` as ordinary grants, and
 * from that moment the grants are the only thing that decides what the person
 * can do. Editing their permissions afterwards does not fight the preset, and
 * changing a preset here never alters anyone's existing access.
 *
 * The point is convenience: an owner hiring a receptionist should not tick
 * eleven boxes. It is deliberately a starting point rather than a role — the
 * whole reason venue permissions moved off `VenueMemberRole` is that two
 * "Managers" at two venues legitimately need different access.
 *
 * OWNER is absent on purpose: the venue's `primaryOwnerId` carries an implicit
 * wildcard in `VenuePermissionGuard`, so seeding rows for them would create
 * grants that outlive a transfer of ownership.
 */
export const VENUE_ROLE_PRESETS: Record<
  Exclude<VenueMemberRole, 'OWNER'>,
  readonly VenuePermissionKey[]
> = {
  MANAGER: [
    'venue.view',
    'venue.edit',
    'venue.bookings.view',
    'venue.bookings.manage',
    'venue.calendar.manage',
    'venue.customers.view',
    'venue.offers.manage',
    'venue.memberships.manage',
    'venue.teams.manage',
    'venue.finance.view',
    'venue.finance.manage',
    'venue.staff.view',
  ],
  FRONT_DESK: [
    'venue.view',
    'venue.bookings.view',
    'venue.bookings.manage',
    'venue.calendar.manage',
    'venue.customers.view',
  ],
  STAFF: ['venue.view', 'venue.bookings.view', 'venue.calendar.manage', 'venue.customers.view'],
  COACH: ['venue.view', 'venue.bookings.view', 'venue.calendar.manage'],
};

/** Permission keys a newly created seat starts with. */
export function presetFor(role: VenueMemberRole): readonly VenuePermissionKey[] {
  if (role === VenueMemberRole.OWNER) {
    // Owners hold everything anyway; return the full set so a non-primary-owner
    // seat marked OWNER is not left with nothing.
    return permissionKeysForDomain('VENUE_MANAGEMENT') as VenuePermissionKey[];
  }
  return VENUE_ROLE_PRESETS[role];
}
