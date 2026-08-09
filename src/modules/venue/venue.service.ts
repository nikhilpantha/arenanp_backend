import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Sport } from '@prisma/client';

import { StorageService } from '../../storage/storage.service';
import { courtRow, VenueRepository } from './venue.repository';
import { mapMembershipToGraphql, VenueMembershipModel } from './dto/venue-membership.model';
import { mapVenueCourt, mapVenueToGraphql, VenueCourt, VenueModel } from './dto/venue.model';
import {
  assertCourtMatchesSport,
  assertCourtsMatchSports,
  assertOperatingHours,
} from './venue-rules';
import type {
  AddCourtInput,
  RemoveCourtInput,
  SetVenueServicesInput,
  SubmitVenueInput,
  UpdateCourtInput,
  UpdateVenueProfileInput,
} from './dto/venue.inputs';

/**
 * Strip the parts of a venue record that only someone who can edit the listing
 * has any business seeing.
 *
 * `documentUrls` holds the owner's KYC upload keys — PAN card, citizenship,
 * registration — which `VenueResolver` turns into downloadable presigned URLs.
 * Everyone with a seat at the venue can read this record (they need its name,
 * hours and courts to do their job), so without this a coach could pull the
 * owner's identity documents. `rejectionReason` goes too: it is admin
 * correspondence about the owner's paperwork, not staff-facing.
 *
 * Emptying the array rather than erroring is deliberate — the field resolver
 * then presigns nothing and the caller simply sees no documents, instead of
 * the whole venue query failing for a legitimate reader.
 */
function redactVenue(venue: VenueModel, permissions: string[] | null): VenueModel {
  if (permissions?.includes('venue:edit')) return venue;
  return { ...venue, documentUrls: [], rejectionReason: undefined };
}

/** "3 bookings and 1 membership" — said to an owner, so plain words and counts. */
function describeDependents(bookings: number, subscriptions: number): string {
  const parts: string[] = [];
  if (bookings) parts.push(`${bookings} booking${bookings === 1 ? '' : 's'}`);
  if (subscriptions) {
    parts.push(`${subscriptions} membership${subscriptions === 1 ? '' : 's'}`);
  }
  return parts.join(' and ');
}

@Injectable()
export class VenueService {
  constructor(
    private readonly repo: VenueRepository,
    private readonly storage: StorageService,
  ) {}

  /**
   * The venues the caller can work at, each redacted to what their role at
   * THAT venue allows — permissions are per venue, so a manager at one ground
   * and a coach at another must see two different shapes in the same list.
   */
  async myVenues(userId: string): Promise<VenueModel[]> {
    const venues = await this.repo.findMyVenues(userId);
    return Promise.all(
      venues.map(async (venue) =>
        redactVenue(mapVenueToGraphql(venue), await this.repo.myPermissions(venue.id, userId)),
      ),
    );
  }

  async myVenue(userId: string, venueId: string): Promise<VenueModel> {
    const venue = await this.repo.findMyVenue(venueId, userId);
    if (!venue) throw new NotFoundException('Venue not found.');
    return redactVenue(mapVenueToGraphql(venue), await this.repo.myPermissions(venueId, userId));
  }

  async myMemberships(userId: string): Promise<VenueMembershipModel[]> {
    const rows = await this.repo.findMyMemberships(userId);
    return rows.map(mapMembershipToGraphql);
  }

  async submitVenue(userId: string, input: SubmitVenueInput): Promise<VenueModel> {
    const sportsBySlug = await this.resolveSports(input.services.map((s) => s.sportSlug));
    assertOperatingHours(input.openTime, input.closeTime);
    assertCourtsMatchSports(input.services, sportsBySlug);
    const venue = await this.repo.submitVenue(userId, input, sportsBySlug);
    return mapVenueToGraphql(venue);
  }

  async updateProfile(input: UpdateVenueProfileInput): Promise<VenueModel> {
    // Hours may be patched one at a time, so compare against what's stored.
    if (input.openTime !== undefined || input.closeTime !== undefined) {
      const current = await this.repo.findById(input.venueId);
      assertOperatingHours(
        input.openTime ?? current?.openTime,
        input.closeTime ?? current?.closeTime,
      );
    }
    const replacingCover = input.coverImageUrl !== undefined;
    const replacingGallery = input.imageUrls !== undefined;
    // Snapshot current image keys so we can delete the ones being dropped.
    const before =
      replacingCover || replacingGallery ? await this.repo.findById(input.venueId) : null;

    const venue = await this.repo.updateProfile(input);

    if (before) {
      const orphans: string[] = [];
      if (replacingCover && before.coverImageUrl && before.coverImageUrl !== input.coverImageUrl) {
        orphans.push(before.coverImageUrl);
      }
      if (replacingGallery) {
        const next = new Set(input.imageUrls ?? []);
        orphans.push(...before.imageUrls.filter((key) => !next.has(key)));
      }
      await this.storage.deleteMany(orphans);
    }
    return mapVenueToGraphql(venue);
  }

  async setServices(input: SetVenueServicesInput): Promise<VenueModel> {
    const sportsBySlug = await this.resolveSports(input.services.map((s) => s.sportSlug));
    assertCourtsMatchSports(input.services, sportsBySlug);

    // This deletes and recreates every court, and `Booking`/`Subscription` cascade
    // from `Court` — so on a trading venue it would silently wipe the bookings,
    // memberships and payment history hanging off them. It is a setup-time call:
    // once anything is on record, courts change one at a time.
    const { bookings, subscriptions } = await this.repo.countVenueDependents(input.venueId);
    if (bookings || subscriptions) {
      throw new BadRequestException(
        `This venue has ${describeDependents(bookings, subscriptions)} on record. ` +
          'Replacing its sports and courts wholesale would delete every court and take ' +
          'those with it. Add, edit or remove courts one at a time instead.',
      );
    }

    // Courts are replaced wholesale; capture old court image keys to clean up.
    const before = await this.repo.findById(input.venueId);
    const oldCourtImages = before?.courts.flatMap((c) => c.imageUrls) ?? [];

    const venue = await this.repo.setServices(input, sportsBySlug);

    const surviving = new Set(venue.courts.flatMap((c) => c.imageUrls));
    await this.storage.deleteMany(oldCourtImages.filter((key) => !surviving.has(key)));
    return mapVenueToGraphql(venue);
  }

  // ── One court at a time ───────────────────────────────────────────────────

  /**
   * Change one court — its price, its slot length, its attributes, or whether
   * it takes bookings at all.
   *
   * Nothing here touches money already taken. `Booking` snapshots
   * `pricePerHour`, `subtotal` and `total` when it is created and never
   * recomputes them, so a new rate prices the next booking and leaves every
   * past one — and everything Finance reports off them — exactly as it was.
   */
  async updateCourt(input: UpdateCourtInput): Promise<VenueCourt> {
    const court = await this.repo.findCourt(input.venueId, input.courtId);
    if (!court) throw new NotFoundException('That court is not part of this venue.');

    // Validate the RESULT, not the patch: a lone `slotMinutes` still has to sit
    // inside the sport's duration bounds alongside the values already stored.
    assertCourtMatchesSport(
      court.sport,
      {
        slotMinutes: input.slotMinutes ?? court.slotMinutes,
        surface: input.surface !== undefined ? input.surface : court.surface,
        format: input.format !== undefined ? input.format : court.format,
        features: input.features ?? court.features,
        capacity: input.capacity !== undefined ? input.capacity : court.capacity,
      },
      input.name?.trim() || court.name,
    );

    const data: Prisma.CourtUpdateInput = {};
    if (input.name !== undefined) data.name = input.name.trim();
    if (input.pricePerHour !== undefined) data.pricePerHour = input.pricePerHour;
    if (input.slotMinutes !== undefined) data.slotMinutes = input.slotMinutes;
    if (input.features !== undefined) data.features = input.features;
    if (input.surface !== undefined) data.surface = input.surface;
    if (input.format !== undefined) data.format = input.format;
    if (input.environment !== undefined) data.environment = input.environment;
    if (input.capacity !== undefined) data.capacity = input.capacity;
    if (input.description !== undefined) data.description = input.description;
    if (input.isActive !== undefined) data.isActive = input.isActive;
    if (input.imageUrls !== undefined) data.imageUrls = input.imageUrls;

    const updated = await this.repo.updateCourt(input.courtId, data);

    // Photos dropped from the court are dropped from storage too.
    if (input.imageUrls !== undefined) {
      const next = new Set(input.imageUrls);
      await this.storage.deleteMany(court.imageUrls.filter((key) => !next.has(key)));
    }
    return mapVenueCourt(updated);
  }

  /** Add one court to a live venue, leaving the existing ones untouched. */
  async addCourt(input: AddCourtInput): Promise<VenueModel> {
    const sportsBySlug = await this.resolveSports([input.sportSlug]);
    const sport = sportsBySlug.get(input.sportSlug)!;
    assertCourtMatchesSport(sport, input.court, input.court.name?.trim() || sport.name);

    const venue = await this.repo.findById(input.venueId);
    if (!venue) throw new NotFoundException('Venue not found.');

    // Unnamed courts are numbered within their sport, so adding a third futsal
    // court gives "Futsal 3" rather than a second "Futsal".
    const existing = venue.courts.filter((c) => c.sportId === sport.id).length;
    const name =
      input.court.name?.trim() || (existing ? `${sport.name} ${existing + 1}` : sport.name);

    const updated = await this.repo.addCourt(
      input.venueId,
      sport,
      courtRow(sport, input.court, name),
    );
    return mapVenueToGraphql(updated);
  }

  /**
   * Delete a court — but only one that never earned anything.
   *
   * `Booking.courtId` and `Subscription.courtId` both cascade, so deleting a
   * court that has either would silently erase paid bookings and the income
   * reported off them. That is never what an owner means by "remove this
   * court"; they mean stop selling it, which is `isActive = false`.
   */
  async removeCourt(input: RemoveCourtInput): Promise<VenueModel> {
    const court = await this.repo.findCourt(input.venueId, input.courtId);
    if (!court) throw new NotFoundException('That court is not part of this venue.');

    const { bookings, subscriptions } = await this.repo.countCourtDependents(input.courtId);
    if (bookings || subscriptions) {
      throw new BadRequestException(
        `${court.name} has ${describeDependents(bookings, subscriptions)} on record. Deleting it would delete them and the income they earned — switch the court off instead, and it stops taking new bookings while your books stay intact.`,
      );
    }

    const venue = await this.repo.deleteCourt(input.venueId, input.courtId, court.sportId);
    await this.storage.deleteMany(court.imageUrls);
    return mapVenueToGraphql(venue);
  }

  /** Validate every referenced sport exists + is active, and index them by slug. */
  private async resolveSports(slugs: string[]): Promise<Map<string, Sport>> {
    const unique = [...new Set(slugs)];
    const sports = await this.repo.sportsBySlugs(unique);
    const bySlug = new Map(sports.map((s) => [s.slug, s]));
    const missing = unique.filter((slug) => !bySlug.has(slug));
    if (missing.length) {
      throw new BadRequestException(`Unknown sport(s): ${missing.join(', ')}`);
    }
    const inactive = sports.filter((s) => !s.isActive).map((s) => s.slug);
    if (inactive.length) {
      throw new BadRequestException(`Sport(s) not available: ${inactive.join(', ')}`);
    }
    return bySlug;
  }
}
