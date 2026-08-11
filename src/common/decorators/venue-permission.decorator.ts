import { SetMetadata } from '@nestjs/common';

import type { VenuePermissionKey } from '../constants/permission-keys';

export const REQUIRE_VENUE_PERMISSION_KEY = 'requireVenuePermission';

/**
 * Require the current user to hold `permission` on the venue identified by the
 * mutation's `venueId` argument (resolved by `VenuePermissionGuard`).
 * SUPER_ADMIN bypasses; OWNER has every permission.
 */
export const RequireVenuePermission = (permission: VenuePermissionKey) =>
  SetMetadata(REQUIRE_VENUE_PERMISSION_KEY, permission);
