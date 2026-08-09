import { SetMetadata } from '@nestjs/common';

import type { VenuePermissionKey } from '../constants/permission-keys';

export const REQUIRE_VENUE_PERMISSION_KEY = 'requireVenuePermission';

/**
 * Require the caller to hold `permission` at the venue named by the handler's
 * `venueId` argument (or `input.venueId`), enforced by `VenuePermissionGuard`.
 *
 * Permissions are granted per user per venue in `staff_permissions` — there are
 * no venue roles. Two principals bypass the check: platform super admins, and
 * the venue's own owner.
 *
 * @example
 * ＠RequireVenuePermission('venue.bookings.manage')
 * async cancelBooking(＠Args('input') input: CancelBookingInput) {}
 */
export const RequireVenuePermission = (permission: VenuePermissionKey) =>
  SetMetadata(REQUIRE_VENUE_PERMISSION_KEY, permission);
