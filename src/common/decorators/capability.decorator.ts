import { SetMetadata } from '@nestjs/common';
import { CapabilityType } from '@prisma/client';

export const REQUIRE_CAPABILITY_KEY = 'requireCapability';

/**
 * Require the current user to hold `type` with APPROVED status (enforced by
 * `CapabilityGuard`; SUPER_ADMIN bypasses). Generic over CapabilityType so a
 * new capability (e.g. COACH) needs no new decorator.
 */
export const RequireCapability = (type: CapabilityType) =>
  SetMetadata(REQUIRE_CAPABILITY_KEY, type);

/** Convenience: require an approved VENUE capability (venue/court/booking mutations). */
export const RequireVenueApproved = () => RequireCapability(CapabilityType.VENUE);

/** Convenience: require an approved ORGANIZER capability (tournament creation etc). */
export const RequireOrganizerApproved = () => RequireCapability(CapabilityType.ORGANIZER);
