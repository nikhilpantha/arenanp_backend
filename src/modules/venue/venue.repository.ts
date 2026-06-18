import { Injectable } from '@nestjs/common';
import {
  MembershipStatus,
  Prisma,
  Sport,
  VenueMemberRole,
  VenueVerificationStatus,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import type {
  SetVenueServicesInput,
  SubmitVenueInput,
  UpdateVenueProfileInput,
} from './dto/venue.inputs';
import type { VenueWithRelations } from './dto/venue.model';

const VENUE_INCLUDES = {
  courts: { include: { sport: true }, orderBy: { createdAt: 'asc' } },
  venueSports: { include: { sport: true }, orderBy: { sport: { displayOrder: 'asc' } } },
} satisfies Prisma.VenueInclude;

const MEMBERSHIP_INCLUDES = {
  venue: { select: { name: true, verificationStatus: true } },
} satisfies Prisma.VenueMembershipInclude;

/**
 * Build the court rows for a service. Prefers explicit per-court detail (`courts[]`)
 * when the client sends it; otherwise falls back to the legacy "N identical courts"
 * shape (`courtCount` + a single slot/price). Courts are named sequentially when
 * there are several and no explicit name was given.
 */
function courtsForService(
  sport: Sport,
  svc: {
    courts?: { name?: string; slotMinutes: number; pricePerHour: number }[];
    courtCount: number;
    slotMinutes: number;
    pricePerHour?: number;
    features: string[];
  },
): Prisma.CourtCreateManyVenueInput[] {
  if (svc.courts?.length) {
    const many = svc.courts.length > 1;
    return svc.courts.map((c, i) => ({
      name: c.name?.trim() || (many ? `${sport.name} ${i + 1}` : sport.name),
      sportId: sport.id,
      pricePerHour: c.pricePerHour,
      slotMinutes: c.slotMinutes,
      features: svc.features,
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

  /** Venues the user is a member of. */
  findMyVenues(userId: string): Promise<VenueWithRelations[]> {
    return this.prisma.venue.findMany({
      where: { memberships: { some: { userId } } },
      include: VENUE_INCLUDES,
      orderBy: { createdAt: 'asc' },
    });
  }

  /** A single venue the user is a member of (or null). */
  findMyVenue(venueId: string, userId: string): Promise<VenueWithRelations | null> {
    return this.prisma.venue.findFirst({
      where: { id: venueId, memberships: { some: { userId } } },
      include: VENUE_INCLUDES,
    });
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
      const venue = await tx.venue.create({
        data: {
          primaryOwnerId: userId,
          name: input.name,
          description: input.description ?? null,
          address: input.address,
          city: input.city ?? null,
          latitude: input.latitude,
          longitude: input.longitude,
          coverImageUrl: input.coverImageUrl ?? null,
          imageUrls: input.imageUrls,
          documentUrls: input.verification?.documentUrls ?? [],
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

  /** Patch editable venue profile fields. */
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
}
