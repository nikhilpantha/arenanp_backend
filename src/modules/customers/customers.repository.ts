import { ConflictException, Injectable } from '@nestjs/common';
import {
  BookingStatus,
  Customer,
  CustomerType,
  Offer,
  OfferAudience,
  OfferTrigger,
  Prisma,
  SubscriptionStatus,
} from '@prisma/client';

import { phoneKey } from '../../common/utils/phone.util';
import { PrismaService } from '../../database/prisma.service';

import type { CreateVenueCustomerInput, ListVenueCustomersInput } from './dto/customer.inputs';
import { VenueCustomerSort } from './dto/customer.inputs';

/** Subscription states that count as a "live" membership for the hasActiveMembership filter. */
const LIVE_SUBSCRIPTION = [
  SubscriptionStatus.SCHEDULED,
  SubscriptionStatus.ACTIVE,
  SubscriptionStatus.PAUSED,
];

/** Per-customer lifetime spend + last-visit, batched for a page of customers. */
export interface CustomerSpend {
  spent: number;
  lastVisit: Date | null;
}

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

  private customerWhere(input: ListVenueCustomersInput): Prisma.CustomerWhereInput {
    const where: Prisma.CustomerWhereInput = { venueId: input.venueId };
    const search = input.search?.trim();
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }
    if (input.kind) where.kind = input.kind;
    if (input.hasActiveMembership) {
      where.subscriptions = { some: { status: { in: LIVE_SUBSCRIPTION } } };
    }
    return where;
  }

  async listVenueCustomers(input: ListVenueCustomersInput): Promise<Customer[]> {
    const where = this.customerWhere(input);
    const take = input.limit ?? 20;
    const skip = input.offset ?? 0;
    const sort = input.sort ?? VenueCustomerSort.CREATED;

    // Plain column sorts page in the DB.
    if (sort === VenueCustomerSort.CREATED || sort === VenueCustomerSort.NAME) {
      return this.prisma.customer.findMany({
        where,
        orderBy: sort === VenueCustomerSort.NAME ? { name: 'asc' } : { createdAt: 'desc' },
        take,
        skip,
      });
    }

    // Derived sorts (SPEND / LAST_VISIT): aggregate + order + page in the DB, so cost scales
    // with page size, not the whole catalog. Raw SQL because Prisma can't orderBy a derived
    // aggregate, and "last visit" is now-relative (the max booking start that is already past).
    const conds: Prisma.Sql[] = [Prisma.sql`c."venueId" = ${input.venueId}`];
    const search = input.search?.trim();
    if (search) {
      const like = `%${search}%`;
      conds.push(Prisma.sql`(c."name" ILIKE ${like} OR c."phone" ILIKE ${like})`);
    }
    if (input.kind) conds.push(Prisma.sql`c."kind"::text = ${input.kind}`);
    if (input.hasActiveMembership) {
      conds.push(
        Prisma.sql`EXISTS (SELECT 1 FROM "subscriptions" s WHERE s."customerId" = c.id AND s."status"::text IN ('SCHEDULED','ACTIVE','PAUSED'))`,
      );
    }
    const orderExpr =
      sort === VenueCustomerSort.SPEND
        ? Prisma.raw('COALESCE(SUM(b."amountPaid"), 0) DESC')
        : Prisma.raw(
            `MAX(b."startAt") FILTER (WHERE b."startAt" <= (now() AT TIME ZONE 'UTC')) DESC NULLS LAST`,
          );
    const ranked = await this.prisma.$queryRaw<{ id: string }[]>(Prisma.sql`
      SELECT c.id
      FROM "customers" c
      LEFT JOIN "bookings" b ON b."customerId" = c.id AND b."status"::text <> 'CANCELLED'
      WHERE ${Prisma.join(conds, ' AND ')}
      GROUP BY c.id
      ORDER BY ${orderExpr}, c.id ASC
      LIMIT ${take} OFFSET ${skip}
    `);
    const ids = ranked.map((r) => r.id);
    if (ids.length === 0) return [];
    const rows = await this.prisma.customer.findMany({ where: { id: { in: ids } } });
    const order = new Map(ids.map((id, i) => [id, i]));
    return rows.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
  }

  /**
   * Lifetime amount paid (over all non-cancelled bookings) + last visit, keyed by customerId.
   * "Last visit" is the most recent booking that has actually STARTED (startAt ≤ now) — a
   * future reservation isn't a visit. The two metrics need different filters, so they're two
   * batched groupBys over the same id set.
   */
  async spendAndLastVisitByCustomer(customerIds: string[]): Promise<Map<string, CustomerSpend>> {
    if (customerIds.length === 0) return new Map();
    const now = new Date();
    const [spendRows, visitRows] = await Promise.all([
      this.prisma.booking.groupBy({
        by: ['customerId'],
        where: { customerId: { in: customerIds }, status: { not: BookingStatus.CANCELLED } },
        _sum: { amountPaid: true },
      }),
      this.prisma.booking.groupBy({
        by: ['customerId'],
        where: {
          customerId: { in: customerIds },
          status: { not: BookingStatus.CANCELLED },
          startAt: { lte: now },
        },
        _max: { startAt: true },
      }),
    ]);
    const out = new Map<string, CustomerSpend>();
    for (const r of spendRows) {
      out.set(r.customerId as string, {
        spent: Number(r._sum.amountPaid?.toString() ?? '0'),
        lastVisit: null,
      });
    }
    for (const r of visitRows) {
      const id = r.customerId as string;
      const entry = out.get(id) ?? { spent: 0, lastVisit: null };
      entry.lastVisit = r._max.startAt ?? null;
      out.set(id, entry);
    }
    return out;
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

  /** A customer's memberships (most recent first) for the unified profile. */
  customerSubscriptions(venueId: string, customerId: string) {
    return this.prisma.subscription.findMany({
      where: { venueId, customerId },
      include: {
        plan: true,
        court: { select: { name: true } },
        customer: { select: { name: true, phone: true } },
        payments: { orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Find a venue customer by phone (the dedupe key), or null. Used to reuse an
   * existing record instead of creating a duplicate.
   */
  findByPhone(venueId: string, phone: string): Promise<Customer | null> {
    return this.prisma.customer.findFirst({ where: { venueId, phone: phoneKey(phone) } });
  }

  /**
   * The venue customer for an app player, creating one if absent — the single bridge
   * between an app `User` and a venue's CRM. Resolution order: by `userId` (already
   * linked) → by `phone` (claim an existing walk-in, linking `userId`) → create. Shared
   * by the player booking flow and membership subscribe so a player who books AND
   * subscribes reuses one record.
   */
  async getOrCreateForUser(venueId: string, userId: string): Promise<Customer> {
    const linked = await this.prisma.customer.findFirst({ where: { venueId, userId } });
    if (linked) return linked;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true, phoneNumber: true },
    });
    const name = normalizeName(user?.fullName || 'Player');
    const phone = user?.phoneNumber ? phoneKey(user.phoneNumber) : null;

    if (phone) {
      const byPhone = await this.prisma.customer.findFirst({ where: { venueId, phone } });
      // Claim an existing walk-in (or older row) for this user.
      if (byPhone) {
        return byPhone.userId
          ? byPhone
          : this.prisma.customer.update({ where: { id: byPhone.id }, data: { userId } });
      }
    }
    try {
      return await this.prisma.customer.create({ data: { venueId, name, phone, userId } });
    } catch (e) {
      // Lost a race on (venueId, userId) / (venueId, phone) — return the now-existing row.
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        const existing = await this.prisma.customer.findFirst({
          where: { venueId, OR: [{ userId }, ...(phone ? [{ phone }] : [])] },
        });
        if (existing) return existing;
      }
      throw e;
    }
  }

  /**
   * The venue customer for a desk walk-in, keyed by phone — reuse an existing record with
   * that phone (so repeat walk-ins merge into one customer) else create. The no-app-account
   * sibling of `getOrCreateForUser`; the caller only routes here when a phone is present
   * (a phoneless walk-in can't be deduped, so it stays inline on the booking).
   */
  async getOrCreateForWalkIn(
    venueId: string,
    params: { name: string; phone: string; kind?: CustomerType },
  ): Promise<Customer> {
    const name = normalizeName(params.name || 'Walk-in');
    const phone = phoneKey(params.phone);
    const kind = params.kind ?? CustomerType.INDIVIDUAL;

    const existing = await this.prisma.customer.findFirst({ where: { venueId, phone } });
    if (existing) {
      // Promote a default INDIVIDUAL record when this booking is for a team/club — same
      // rule as the backfill (never downgrade or reclassify an already-set TEAM/CLUB).
      if (existing.kind === CustomerType.INDIVIDUAL && kind !== CustomerType.INDIVIDUAL) {
        return this.prisma.customer.update({ where: { id: existing.id }, data: { kind } });
      }
      return existing;
    }

    try {
      return await this.prisma.customer.create({ data: { venueId, name, phone, kind } });
    } catch (e) {
      // Lost a race on the unique (venueId, phone); return the now-existing row.
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        const row = await this.prisma.customer.findFirst({ where: { venueId, phone } });
        if (row) return row;
      }
      throw e;
    }
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
