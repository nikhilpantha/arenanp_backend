import { BadRequestException } from '@nestjs/common';
import { Sport, SportBookingMode } from '@prisma/client';

import { parseHHmmToMinutes } from '../../common/utils/nepal-time';
import type { VenueCourtInput, VenueServiceInput } from './dto/venue.inputs';

/**
 * Pure validation for what an owner submits, checked against the platform's
 * sport catalogue. This is the one place the rules live, so `submitVenue` and
 * `setVenueServices` cannot drift — and so no client is trusted to enforce them
 * (there are two clients, and the mobile one predates the catalogue).
 */

/** Courts must use their sport's slot lengths, attributes and features. */
export function assertCourtsMatchSports(
  services: VenueServiceInput[],
  sportsBySlug: Map<string, Sport>,
): void {
  for (const service of services) {
    const sport = sportsBySlug.get(service.sportSlug);
    if (!sport) continue; // resolveSports already reported unknown slugs

    for (const [index, court] of (service.courts ?? []).entries()) {
      assertCourtMatchesSport(sport, court, `${sport.name} ${sport.unitLabel} ${index + 1}`);
    }
  }
}

/**
 * The same rules for a single court, so editing one from the console cannot
 * accept what the wizard would reject. `where` names the court in the error —
 * the wizard uses a position ("Futsal court 2"), the settings screen the court's
 * own name, because that is what the owner is looking at.
 */
export function assertCourtMatchesSport(
  sport: Sport,
  court: CourtShape,
  where: string = sport.unitLabel,
): void {
  if (!sport.slotDurations.includes(court.slotMinutes)) {
    throw new BadRequestException(
      `${where}: slot length must be ${list(sport.slotDurations.map(String))} minutes.`,
    );
  }

  assertDurationBounds(where, sport, court);
  assertInCatalogue(where, 'surface', court.surface, sport.surfaces);
  assertInCatalogue(where, 'format', court.format, sport.formats);

  const unknownFeatures = (court.features ?? []).filter(
    (feature) => !sport.courtFeatures.includes(feature),
  );
  if (unknownFeatures.length) {
    throw new BadRequestException(
      `${where}: unknown feature(s) ${list(unknownFeatures)}. Allowed: ${list(sport.courtFeatures)}.`,
    );
  }

  if (sport.bookingMode === SportBookingMode.CAPACITY && !court.capacity) {
    throw new BadRequestException(
      `${where}: set how many places each slot holds — ${sport.name} is sold per place, not per ${sport.unitLabel}.`,
    );
  }
}

/**
 * What the rules actually read off a court. Loose on purpose: `updateCourt`
 * checks a patch merged onto the stored row, which is a Prisma Court, not the
 * wizard's input type.
 */
type CourtShape = Pick<VenueCourtInput, 'slotMinutes'> & {
  surface?: string | null;
  format?: string | null;
  features?: string[] | null;
  capacity?: number | null;
};

function assertDurationBounds(where: string, sport: Sport, court: CourtShape): void {
  if (sport.minDurationMinutes != null && court.slotMinutes < sport.minDurationMinutes) {
    throw new BadRequestException(
      `${where}: ${sport.name} bookings run at least ${sport.minDurationMinutes} minutes.`,
    );
  }
  if (sport.maxDurationMinutes != null && court.slotMinutes > sport.maxDurationMinutes) {
    throw new BadRequestException(
      `${where}: ${sport.name} bookings run at most ${sport.maxDurationMinutes} minutes.`,
    );
  }
}

function assertInCatalogue(
  where: string,
  label: string,
  value: string | null | undefined,
  allowed: string[],
): void {
  if (!value) return;
  if (!allowed.length) {
    throw new BadRequestException(`${where}: this sport has no ${label} options configured.`);
  }
  if (!allowed.includes(value)) {
    throw new BadRequestException(
      `${where}: "${value}" is not an available ${label}. Choose from ${list(allowed)}.`,
    );
  }
}

/**
 * Closing must come after opening. Unvalidated, `22:00 → 06:00` yields zero
 * bookable slots forever, 0% occupancy and a rejection on every booking — a
 * venue that looks complete and can never be booked.
 */
export function assertOperatingHours(openTime?: string, closeTime?: string): void {
  if (!openTime || !closeTime) return;
  if (parseHHmmToMinutes(closeTime) <= parseHHmmToMinutes(openTime)) {
    throw new BadRequestException(
      'Closing time must be after opening time. If you close after midnight, use 23:59 for now.',
    );
  }
}

function list(values: string[]): string {
  if (values.length <= 1) return values.join('');
  return `${values.slice(0, -1).join(', ')} or ${values[values.length - 1]}`;
}
