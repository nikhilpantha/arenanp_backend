import { Injectable } from '@nestjs/common';
import { BookingStatus, Prisma, VenueVerificationStatus } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import type { BrowseVenuesInput } from './dto/discovery.inputs';
import type { VenueForCard } from './dto/venue-card.model';
import type { VenueForDetail } from './dto/venue-detail.model';

const CARD_INCLUDES = {
  courts: { where: { isActive: true }, select: { pricePerHour: true } },
  venueSports: { include: { sport: true }, orderBy: { sport: { displayOrder: 'asc' } } },
} satisfies Prisma.VenueInclude;

const DETAIL_INCLUDES = {
  courts: { where: { isActive: true }, include: { sport: true }, orderBy: { createdAt: 'asc' } },
  venueSports: { include: { sport: true }, orderBy: { sport: { displayOrder: 'asc' } } },
} satisfies Prisma.VenueInclude;

@Injectable()
export class DiscoveryRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** Approved venues for the marketplace, filtered + paginated. */
  async browseVenues(
    input: BrowseVenuesInput,
    page: number,
    pageSize: number,
  ): Promise<{ items: VenueForCard[]; total: number }> {
    const where: Prisma.VenueWhereInput = {
      verificationStatus: VenueVerificationStatus.APPROVED,
    };
    if (input.search) where.name = { contains: input.search, mode: 'insensitive' };
    if (input.city) where.city = { equals: input.city, mode: 'insensitive' };
    if (input.sportSlug) where.venueSports = { some: { sport: { slug: input.sportSlug } } };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.venue.findMany({
        where,
        include: CARD_INCLUDES,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.venue.count({ where }),
    ]);
    return { items, total };
  }

  /** A single approved venue with its active courts (or null). */
  venueDetail(venueId: string): Promise<VenueForDetail | null> {
    return this.prisma.venue.findFirst({
      where: { id: venueId, verificationStatus: VenueVerificationStatus.APPROVED },
      include: DETAIL_INCLUDES,
    });
  }

  /** Slot-generation inputs for an active court on an approved venue (or null). */
  courtForSlots(courtId: string) {
    return this.prisma.court.findFirst({
      where: {
        id: courtId,
        isActive: true,
        venue: { verificationStatus: VenueVerificationStatus.APPROVED },
      },
      select: {
        id: true,
        venueId: true,
        slotMinutes: true,
        pricePerHour: true,
        venue: { select: { openTime: true, closeTime: true } },
      },
    });
  }

  /** Non-cancelled bookings on a court overlapping the [gte, lt) window. */
  bookingsForCourtInRange(
    courtId: string,
    gte: Date,
    lt: Date,
  ): Promise<{ startAt: Date; endAt: Date }[]> {
    return this.prisma.booking.findMany({
      where: {
        courtId,
        status: { not: BookingStatus.CANCELLED },
        startAt: { lt },
        endAt: { gt: gte },
      },
      select: { startAt: true, endAt: true },
      orderBy: { startAt: 'asc' },
    });
  }

  /** Closures overlapping [gte, lt) that block this court (court-scoped or venue-wide). */
  closuresForCourtInRange(
    venueId: string,
    courtId: string,
    gte: Date,
    lt: Date,
  ): Promise<{ startAt: Date; endAt: Date }[]> {
    return this.prisma.venueClosure.findMany({
      where: {
        venueId,
        OR: [{ courtId: null }, { courtId }],
        startAt: { lt },
        endAt: { gt: gte },
      },
      select: { startAt: true, endAt: true },
    });
  }
}
