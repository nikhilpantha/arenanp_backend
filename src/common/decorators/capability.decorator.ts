import { SetMetadata } from '@nestjs/common';

export const REQUIRE_ORGANIZER_APPROVED_KEY = 'requireOrganizerApproved';
export const REQUIRE_VENUE_OWNER_APPROVED_KEY = 'requireVenueOwnerApproved';

/**
 * Require the current user to have `organizerStatus = APPROVED`.
 * Used by `CapabilityGuard` on tournament-creation mutations etc.
 */
export const RequireOrganizerApproved = () => SetMetadata(REQUIRE_ORGANIZER_APPROVED_KEY, true);

/**
 * Require the current user to have `venueOwnerStatus = APPROVED`.
 * Used by `CapabilityGuard` on venue / court / venue-booking mutations.
 */
export const RequireVenueOwnerApproved = () => SetMetadata(REQUIRE_VENUE_OWNER_APPROVED_KEY, true);
