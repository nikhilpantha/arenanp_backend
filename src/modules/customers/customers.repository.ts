import { ConflictException, Injectable } from '@nestjs/common';
import {
  BookingStatus,
  Customer,
  Offer,
  OfferAudience,
  OfferTrigger,
  Prisma,
} from '@prisma/client';

import { phoneKey } from '../../common/utils/phone.util';
import { PrismaService } from '../../database/prisma.service';

import type { CreateVenueCustomerInput, ListVenueCustomersInput } from './dto/customer.inputs';

/** Trim + collapse internal whitespace so " A  B " and "A B" dedupe to one customer. */
export function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

function activeWindow(now: Date): Prisma.OfferWhereInput {
  return { isActive: true, validFrom: { lte: now }, validUntil: { gte: now } };
}

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  listVenueCustomers(input: ListVenueCustomersInput): Promise<Customer[]> {
    const where: Prisma.CustomerWhereInput = { venueId: input.venueId };
    const search = input.search?.trim();
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }
    return this.prisma.customer.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: input.limit ?? 20,
      skip: input.offset ?? 0,
    });
  }

  findOne(venueId: string, customerId: string): Promise<Customer | null> {
    return this.prisma.customer.findFirst({ where: { id: customerId, venueId } });
  }

  /** A customer's bookings (most recent first) for the detail screen's history. */
  customerBookings(venueId: string, customerId: string) {
    return this.prisma.booking.findMany({
      where: { venueId, customerId },
      include: { court: { include: { sport: true } }, extras: true },
      orderBy: { startAt: 'desc' },
      take: 50,
    });
  }

  /**
   * Find a venue customer by phone (the dedupe key), or null. Used to reuse an
   * existing record instead of creating a duplicate.
   */
  findByPhone(venueId: string, phone: string): Promise<Customer | null> {
    return this.prisma.customer.findFirst({ where: { venueId, phone: phoneKey(phone) } });
  }

  async create(input: CreateVenueCustomerInput): Promise<Customer> {
    const name = normalizeName(input.name);
    const phone = input.phone ? phoneKey(input.phone) : null;

    // Reuse an existing record when the phone already belongs to a customer here.
    if (phone) {
      const existing = await this.prisma.customer.findFirst({
        where: { venueId: input.venueId, phone },
      });
      if (existing) return existing;
    }

    try {
      return await this.prisma.customer.create({
        data: { venueId: input.venueId, name, phone, notes: input.notes ?? null },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        // Lost a race on the unique (venueId, phone); return the now-existing row.
        if (phone) {
          const existing = await this.prisma.customer.findFirst({
            where: { venueId: input.venueId, phone },
          });
          if (existing) return existing;
        }
        throw new ConflictException('A customer with this phone already exists.');
      }
      throw e;
    }
  }

  /** The venue's active individual loyalty offer (every-Nth), or null. */
  findLoyaltyOffer(venueId: string): Promise<Offer | null> {
    return this.prisma.offer.findFirst({
      where: {
        venueId,
        trigger: OfferTrigger.EVERY_NTH,
        everyGames: { not: null },
        audience: { in: [OfferAudience.ALL, OfferAudience.INDIVIDUAL] },
        ...activeWindow(new Date()),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** Completed-game counts keyed by customerId. */
  async completedByCustomer(customerIds: string[]): Promise<Map<string, number>> {
    if (customerIds.length === 0) return new Map();
    const rows = await this.prisma.booking.groupBy({
      by: ['customerId'],
      where: { customerId: { in: customerIds }, status: BookingStatus.COMPLETED },
      _count: { _all: true },
    });
    return new Map(rows.map((r) => [r.customerId as string, r._count._all]));
  }

  /** Free games already redeemed under a loyalty offer, keyed by customerId. */
  async redeemedByCustomer(customerIds: string[], offerId: string): Promise<Map<string, number>> {
    if (customerIds.length === 0) return new Map();
    const rows = await this.prisma.booking.groupBy({
      by: ['customerId'],
      where: {
        customerId: { in: customerIds },
        offerId,
        freeGame: true,
        status: { not: BookingStatus.CANCELLED },
      },
      _count: { _all: true },
    });
    return new Map(rows.map((r) => [r.customerId as string, r._count._all]));
  }
}
