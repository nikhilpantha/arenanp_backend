import { Injectable } from '@nestjs/common';
import {
  MembershipStatus,
  Prisma,
  Sport,
  VenueMemberRole,
  VenueVerificationStatus,
} from '@prisma/client';

import { PermissionScopeType } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

import type {
  SetVenueServicesInput,
  SubmitVenueInput,
  UpdateVenueProfileInput,
  VenueCourtInput,
  VenueServiceInput,
} from './dto/venue.inputs';
import type { CourtWithSport, VenueWithRelations } from './dto/venue.model';
import { uniqueVenueSlug } from './venue-slug';

const COURT_INCLUDES = {
  sport: true,
  // Drives the console's "you can switch this off, but not delete it" guard.
  // A court's bookings cascade on delete, so the count is the difference
  // between hiding a court and erasing what it earned.
  _count: { select: { bookings: true } },
} satisfies Prisma.CourtInclude;

const VENUE_INCLUDES = {
  courts: { include: COURT_INCLUDES, orderBy: { createdAt: 'asc' } },
  venueSports: { include: { sport: true }, orderBy: { sport: { displayOrder: 'asc' } } },
} satisfies Prisma.VenueInclude;

const MEMBERSHIP_INCLUDES = {
  // primaryOwnerId powers the owner's implicit wildcard, matching the guard.
  venue: { select: { name: true, verificationStatus: true, primaryOwnerId: true } },
} satisfies Prisma.VenueMembershipInclude;

/**
 * Build the court rows for a service. Prefers explicit per-court detail (`courts[]`)
 * when the client sends it; otherwise falls back to the legacy "N identical courts"
 * shape (`courtCount` + a single slot/price). Courts are named sequentially when
 * there are several and no explicit name was given.
 */
function courtsForService(
  sport: Sport,
  svc: VenueServiceInput,
): Prisma.CourtCreateManyVenueInput[] {
  if (svc.courts?.length) {
    const many = svc.courts.length > 1;
    return svc.courts.map((c, i) => ({
      name: c.name?.trim() || (many ? `${sport.name} ${i + 1}` : sport.name),
      sportId: sport.id,
      pricePerHour: c.pricePerHour,
      slotMinutes: c.slotMinutes,
      // Per-court features win; the service-level array is the deprecated
      // fallback for clients that predate per-court attributes.
      features: c.features?.length ? c.features : svc.features,
      surface: c.surface ?? null,
      format: c.format ?? null,
      environment: c.environment ?? null,
      capacity: c.capacity ?? null,
      description: c.description ?? null,
      imageUrls: c.imageUrls ?? [],
    }));
  }

  // Legacy path: N identical courts at one slot/price.
  const pricePerHour = svc.pricePerHour ?? 0;
  return Array.from({ length: svc.courtCount }, (_, i) => ({
    name: svc.courtCount > 1 ? `${sport.name} ${i + 1}` : sport.name,
    sportId: sport.id,
    pricePerHour,
    slotMinutes: svc.slotMinutes,
    features: svc.features,
  }));
}

/** One court row from the wizard's court shape, with its name already resolved. */
export function courtRow(
  sport: Sport,
  court: VenueCourtInput,
  name: string,
): Prisma.CourtCreateManyVenueInput {
  return {
    name,
    sportId: sport.id,
    pricePerHour: court.pricePerHour,
    slotMinutes: court.slotMinutes,
    features: court.features ?? [],
    surface: court.surface ?? null,
    format: court.format ?? null,
    environment: court.environment ?? null,
    capacity: court.capacity ?? null,
    description: court.description ?? null,
    imageUrls: court.imageUrls ?? [],
  };
}

function additionalServicesJson(items: { name: string; price?: number }[]): Prisma.InputJsonValue {
  return items.map((s) => (s.price != null ? { name: s.name, price: s.price } : { name: s.name }));
}

@Injectable()
export class VenueRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Sports referenced by the given slugs (for validation + court naming). */
  sportsBySlugs(slugs: string[]): Promise<Sport[]> {
    return this.prisma.sport.findMany({ where: { slug: { in: slugs } } });
  }

  /**
   * Venues the user can currently work at.
   *
   * `status: ACTIVE` is the whole point: a suspended or removed staff member
   * must stop seeing the venue immediately, and every guarded mutation already
   * enforces exactly this (`VenuePermissionGuard`). Without it here, the two
   * disagree — the console would keep listing a venue whose every action fails.
   */
  findMyVenues(userId: string): Promise<VenueWithRelations[]> {
    return this.prisma.venue.findMany({
      where: { memberships: { some: { userId, status: MembershipStatus.ACTIVE } } },
      include: VENUE_INCLUDES,
      orderBy: { createdAt: 'asc' },
    });
  }

  /** A single venue the user is an ACTIVE member of (or null). */
  findMyVenue(venueId: string, userId: string): Promise<VenueWithRelations | null> {
    return this.prisma.venue.findFirst({
      where: { id: venueId, memberships: { some: { userId, status: MembershipStatus.ACTIVE } } },
      include: VENUE_INCLUDES,
    });
  }

  /**
   * The caller's effective permissions at one venue, or null if they hold no
   * active seat there. Read from their grants — the seat's `role` is a job
   * title, not an authority.
   */
  async myPermissions(venueId: string, userId: string): Promise<string[] | null> {
    const membership = await this.prisma.venueMembership.findUnique({
      where: { venueId_userId: { venueId, userId } },
      select: { status: true },
    });
    if (!membership || membership.status !== MembershipStatus.ACTIVE) return null;

    const grants = await this.prisma.staffPermission.findMany({
      where: {
        userId,
        scopeType: PermissionScopeType.VENUE,
        scopeId: venueId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      select: { permissionKey: true },
    });
    return grants.map((g) => g.permissionKey);
  }

  findById(venueId: string): Promise<VenueWithRelations | null> {
    return this.prisma.venue.findUnique({ where: { id: venueId }, include: VENUE_INCLUDES });
  }

  /** The user's venue memberships, with the venue name + listing status. */
  findMyMemberships(userId: string) {
    return this.prisma.venueMembership.findMany({
      where: { userId },
      include: MEMBERSHIP_INCLUDES,
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Add a venue from the dashboard: creates the Venue + an OWNER membership +
   * its courts/sports in one transaction. The listing starts PENDING — a super
   * admin must approve it (adminUpdateVenueVerificationStatus) before it goes
   * live. A venue always has ≥1 sport with ≥1 court (enforced by SubmitVenueInput).
   *
   * The owner's VENUE capability is granted separately at signup, so it is NOT
   * touched here — adding a venue neither grants nor re-requests it.
   */
  async submitVenue(
    userId: string,
    input: SubmitVenueInput,
    sportsBySlug: Map<string, Sport>,
  ): Promise<VenueWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      // Minted here and never again — staff login emails embed it.
      const slug = await uniqueVenueSlug(
        input.name,
        async (candidate) => (await tx.venue.count({ where: { slug: candidate } })) > 0,
      );

      const venue = await tx.venue.create({
        data: {
          primaryOwnerId: userId,
          name: input.name,
          slug,
          description: input.description ?? null,
          address: input.address,
          city: input.city ?? null,
          latitude: input.latitude,
          longitude: input.longitude,
          coverImageUrl: input.coverImageUrl ?? null,
          imageUrls: input.imageUrls,
          documentUrls: input.verification?.documentUrls ?? [],
          amenities: input.amenities ?? [],
          additionalServices: additionalServicesJson(input.additionalServices),
          openTime: input.openTime ?? '06:00',
          closeTime: input.closeTime ?? '22:00',
          contactEmail: input.contactEmail ?? null,
          contactPhone: input.contactPhone ?? null,
          verificationStatus: VenueVerificationStatus.PENDING,
          memberships: {
            create: {
              userId,
              role: VenueMemberRole.OWNER,
              permissions: [],
              status: MembershipStatus.ACTIVE,
            },
          },
          venueSports: {
            create: input.services.map((s) => ({ sportId: sportsBySlug.get(s.sportSlug)!.id })),
          },
          courts: {
            create: input.services.flatMap((svc) =>
              courtsForService(sportsBySlug.get(svc.sportSlug)!, svc),
            ),
          },
        },
      });

      return tx.venue.findUniqueOrThrow({ where: { id: venue.id }, include: VENUE_INCLUDES });
    });
  }

  /**
   * Patch editable venue profile fields.
   *
   * `slug` is deliberately absent and must stay that way: staff login emails
   * embed it, so re-deriving it from a renamed venue would break every staff
   * account here with no error anyone could trace back to the rename.
   */
  async updateProfile(input: UpdateVenueProfileInput): Promise<VenueWithRelations> {
    const { venueId, additionalServices, ...rest } = input;
    const data: Prisma.VenueUpdateInput = {};
    if (rest.name !== undefined) data.name = rest.name;
    if (rest.description !== undefined) data.description = rest.description;
    if (rest.address !== undefined) data.address = rest.address;
    if (rest.city !== undefined) data.city = rest.city;
    if (rest.latitude !== undefined) data.latitude = rest.latitude;
    if (rest.longitude !== undefined) data.longitude = rest.longitude;
    if (rest.coverImageUrl !== undefined) data.coverImageUrl = rest.coverImageUrl;
    if (rest.imageUrls !== undefined) data.imageUrls = rest.imageUrls;
    if (rest.openTime !== undefined) data.openTime = rest.openTime;
    if (rest.closeTime !== undefined) data.closeTime = rest.closeTime;
    if (rest.contactEmail !== undefined) data.contactEmail = rest.contactEmail;
    if (rest.contactPhone !== undefined) data.contactPhone = rest.contactPhone;
    if (rest.amenities !== undefined) data.amenities = rest.amenities;
    if (additionalServices !== undefined) {
      data.additionalServices = additionalServicesJson(additionalServices);
    }
    return this.prisma.venue.update({ where: { id: venueId }, data, include: VENUE_INCLUDES });
  }

  /** Replace the venue's courts + sports wholesale. */
  async setServices(
    input: SetVenueServicesInput,
    sportsBySlug: Map<string, Sport>,
  ): Promise<VenueWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      await tx.court.deleteMany({ where: { venueId: input.venueId } });
      await tx.venueSport.deleteMany({ where: { venueId: input.venueId } });
      await tx.venueSport.createMany({
        data: input.services.map((s) => ({
          venueId: input.venueId,
          sportId: sportsBySlug.get(s.sportSlug)!.id,
        })),
        skipDuplicates: true,
      });
      await tx.court.createMany({
        data: input.services.flatMap((svc) =>
          courtsForService(sportsBySlug.get(svc.sportSlug)!, svc).map((c) => ({
            ...c,
            venueId: input.venueId,
          })),
        ),
      });
      return tx.venue.findUniqueOrThrow({ where: { id: input.venueId }, include: VENUE_INCLUDES });
    });
  }

  // ── One court at a time ───────────────────────────────────────────────────
  // Everything below edits a single Court row and leaves its id alone, which is
  // the whole point: `Booking.courtId` and `Subscription.courtId` cascade on
  // delete, so the wholesale replace above can never be the way an owner
  // changes a price.

  /** One court, scoped to its venue so a member of venue A can't touch venue B's. */
  findCourt(venueId: string, courtId: string): Promise<CourtWithSport | null> {
    return this.prisma.court.findFirst({
      where: { id: courtId, venueId },
      include: COURT_INCLUDES,
    });
  }

  /** Patch one court in place. Bookings keep their FK and their money snapshot. */
  updateCourt(courtId: string, data: Prisma.CourtUpdateInput): Promise<CourtWithSport> {
    return this.prisma.court.update({
      where: { id: courtId },
      data,
      include: COURT_INCLUDES,
    });
  }

  /**
   * Add one court, and the VenueSport row if this is the venue's first court in
   * that sport — without it the marketplace filters would never surface the
   * venue for the sport it just started offering.
   */
  async addCourt(
    venueId: string,
    sport: Sport,
    court: Prisma.CourtCreateManyVenueInput,
  ): Promise<VenueWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      await tx.venueSport.createMany({
        data: [{ venueId, sportId: sport.id }],
        skipDuplicates: true,
      });
      await tx.court.create({ data: { ...court, venueId } });
      return tx.venue.findUniqueOrThrow({ where: { id: venueId }, include: VENUE_INCLUDES });
    });
  }

  /** Subscriptions cascade too, so removal has to check them alongside bookings. */
  /** Everything across the venue that would die with its courts. */
  countVenueDependents(venueId: string): Promise<{ bookings: number; subscriptions: number }> {
    return this.prisma
      .$transaction([
        this.prisma.booking.count({ where: { venueId } }),
        this.prisma.subscription.count({ where: { venueId } }),
      ])
      .then(([bookings, subscriptions]) => ({ bookings, subscriptions }));
  }

  countCourtDependents(courtId: string): Promise<{ bookings: number; subscriptions: number }> {
    return this.prisma
      .$transaction([
        this.prisma.booking.count({ where: { courtId } }),
        this.prisma.subscription.count({ where: { courtId } }),
      ])
      .then(([bookings, subscriptions]) => ({ bookings, subscriptions }));
  }

  /**
   * Delete one court, dropping the sport from the venue when it was the last
   * court hosting it. Only ever reached for a court with no bookings and no
   * subscriptions — the service checks that first.
   */
  async deleteCourt(
    venueId: string,
    courtId: string,
    sportId: string,
  ): Promise<VenueWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      await tx.court.delete({ where: { id: courtId } });
      const remaining = await tx.court.count({ where: { venueId, sportId } });
      if (remaining === 0) {
        await tx.venueSport.deleteMany({ where: { venueId, sportId } });
      }
      return tx.venue.findUniqueOrThrow({ where: { id: venueId }, include: VENUE_INCLUDES });
    });
  }
}
