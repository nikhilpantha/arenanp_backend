import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus, Offer, OfferAudience, OfferTrigger, Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { phoneKey } from '../../common/utils/phone.util';

import type { CreateOfferInput, ListVenueOffersInput, UpdateOfferInput } from './dto/offer.inputs';

/** Where-clause for offers that are active and within their validity window right now. */
function activeWindow(now: Date): Prisma.OfferWhereInput {
  return { isActive: true, validFrom: { lte: now }, validUntil: { gte: now } };
}

/** A loyalty subject — exactly one identity is set (customer, user, or phone). */
export type LoyaltySubject =
  | { customerId: string }
  | { venueId: string; userId: string }
  | { venueId: string; phone: string };

function subjectWhere(subject: LoyaltySubject): Prisma.BookingWhereInput {
  if ('customerId' in subject) return { customerId: subject.customerId };
  if ('userId' in subject) return { venueId: subject.venueId, userId: subject.userId };
  return { venueId: subject.venueId, customerPhone: phoneKey(subject.phone) };
}

@Injectable()
export class OffersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listVenueOffers(
    input: ListVenueOffersInput,
    page: number,
    pageSize: number,
  ): Promise<{ items: Offer[]; total: number }> {
    const where: Prisma.OfferWhereInput = { venueId: input.venueId };
    if (input.activeOnly) Object.assign(where, activeWindow(new Date()));

    const [items, total] = await this.prisma.$transaction([
      this.prisma.offer.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.offer.count({ where }),
    ]);
    return { items, total };
  }

  /** Player-facing: active, in-window promo offers (exhausted ones filtered in the service). */
  availableOffers(venueId: string): Promise<Offer[]> {
    return this.prisma.offer.findMany({
      where: {
        venueId,
        trigger: OfferTrigger.PROMO_CODE,
        ...activeWindow(new Date()),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Real redemptions (non-cancelled bookings carrying the offer) per offer, batched. */
  async redemptionsByOffer(offerIds: string[]): Promise<Map<string, number>> {
    if (offerIds.length === 0) return new Map();
    const rows = await this.prisma.booking.groupBy({
      by: ['offerId'],
      where: { offerId: { in: offerIds }, status: { not: BookingStatus.CANCELLED } },
      _count: { _all: true },
    });
    return new Map(rows.map((r) => [r.offerId as string, r._count._all]));
  }

  /** Real redemptions of a single offer. */
  countRedemptions(offerId: string): Promise<number> {
    return this.prisma.booking.count({
      where: { offerId, status: { not: BookingStatus.CANCELLED } },
    });
  }

  /** The active loyalty (every-Nth) offer that applies to a subject's audience, or null. */
  findActiveLoyaltyOffer(venueId: string, audience: OfferAudience): Promise<Offer | null> {
    return this.prisma.offer.findFirst({
      where: {
        venueId,
        trigger: OfferTrigger.EVERY_NTH,
        everyGames: { not: null },
        audience: { in: [OfferAudience.ALL, audience] },
        ...activeWindow(new Date()),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Completed games attributable to a subject (the loyalty tally). */
  countCompletedForSubject(subject: LoyaltySubject): Promise<number> {
    return this.prisma.booking.count({
      where: { ...subjectWhere(subject), status: BookingStatus.COMPLETED },
    });
  }

  /**
   * Free games already granted to a subject under a loyalty offer. In-flight (not yet
   * completed) grants count too — only a CANCELLED one frees the cycle — so a second
   * free game can't be redeemed before the first is consumed.
   */
  countRedeemedFreeForSubject(subject: LoyaltySubject, offerId: string): Promise<number> {
    return this.prisma.booking.count({
      where: {
        ...subjectWhere(subject),
        offerId,
        freeGame: true,
        status: { not: BookingStatus.CANCELLED },
      },
    });
  }

  create(input: CreateOfferInput): Promise<Offer> {
    return this.prisma.offer.create({
      data: {
        venueId: input.venueId,
        title: input.title,
        description: input.description ?? null,
        discountType: input.discountType,
        discountValue: input.discountValue,
        maxDiscount: input.maxDiscount ?? null,
        minSubtotal: input.minSubtotal,
        trigger: input.trigger ?? OfferTrigger.PROMO_CODE,
        audience: input.audience ?? OfferAudience.ALL,
        everyGames: input.everyGames ?? null,
        code: input.code ? input.code.toUpperCase() : null,
        validFrom: input.validFrom,
        validUntil: input.validUntil,
        usageLimit: input.usageLimit ?? null,
      },
    });
  }

  async update(input: UpdateOfferInput): Promise<Offer> {
    const existing = await this.prisma.offer.findFirst({
      where: { id: input.offerId, venueId: input.venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Offer not found for this venue.');

    const data: Prisma.OfferUpdateInput = {};
    if (input.title !== undefined) data.title = input.title;
    if (input.description !== undefined) data.description = input.description;
    if (input.discountType !== undefined) data.discountType = input.discountType;
    if (input.discountValue !== undefined) data.discountValue = input.discountValue;
    if (input.maxDiscount !== undefined) data.maxDiscount = input.maxDiscount;
    if (input.minSubtotal !== undefined) data.minSubtotal = input.minSubtotal;
    if (input.trigger !== undefined) data.trigger = input.trigger;
    if (input.audience !== undefined) data.audience = input.audience;
    if (input.everyGames !== undefined) data.everyGames = input.everyGames;
    if (input.validFrom !== undefined) data.validFrom = input.validFrom;
    if (input.validUntil !== undefined) data.validUntil = input.validUntil;
    if (input.usageLimit !== undefined) data.usageLimit = input.usageLimit;
    if (input.isActive !== undefined) data.isActive = input.isActive;

    return this.prisma.offer.update({ where: { id: input.offerId }, data });
  }

  async remove(venueId: string, offerId: string): Promise<Offer> {
    const existing = await this.prisma.offer.findFirst({
      where: { id: offerId, venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Offer not found for this venue.');
    return this.prisma.offer.delete({ where: { id: offerId } });
  }

  /** Active, in-window promo offer matching a venue + code (case-insensitive), or null. */
  findRedeemableByCode(venueId: string, code: string): Promise<Offer | null> {
    return this.prisma.offer.findFirst({
      where: {
        venueId,
        trigger: OfferTrigger.PROMO_CODE,
        code: code.toUpperCase(),
        ...activeWindow(new Date()),
      },
    });
  }
}
