import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MembershipDuration, MembershipPlan, Prisma, SubscriptionStatus } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import type {
  CreateMembershipPlanInput,
  CreateSubscriptionInput,
  ListMembershipPlansInput,
  ListSubscriptionsInput,
  RenewSubscriptionInput,
  UpdateMembershipPlanInput,
} from './dto/subscription.inputs';

/** Default validity window (days) for each plan duration. */
export const DURATION_DAYS: Record<MembershipDuration, number> = {
  WEEKLY: 7,
  FORTNIGHTLY: 14,
  MONTHLY: 30,
  QUARTERLY: 90,
  HALF_YEARLY: 180,
  YEARLY: 365,
};

/** Subscription joined with the plan, court + customer needed to map it for the client. */
const SUBSCRIPTION_INCLUDE = {
  plan: true,
  court: { select: { name: true } },
  customer: { select: { name: true, phone: true } },
} satisfies Prisma.SubscriptionInclude;

function addDays(from: Date, days: number): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Readable calendar date for a stored membership window end (UTC midnight). */
function formatDate(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/** Statuses that keep a membership "live" — they block deleting the plan. */
const LIVE_STATUSES = [
  SubscriptionStatus.SCHEDULED,
  SubscriptionStatus.ACTIVE,
  SubscriptionStatus.PAUSED,
];

@Injectable()
export class SubscriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Plans ──────────────────────────────────────────────────────────────────

  async listPlans(input: ListMembershipPlansInput) {
    const where: Prisma.MembershipPlanWhereInput = { venueId: input.venueId };
    if (input.activeOnly) where.isActive = true;
    return this.prisma.membershipPlan.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { subscriptions: { where: { status: SubscriptionStatus.ACTIVE } } } },
      },
    });
  }

  createPlan(input: CreateMembershipPlanInput, windows: string[]): Promise<MembershipPlan> {
    const validityDays = input.validityDays ?? DURATION_DAYS[input.duration];
    return this.prisma.membershipPlan.create({
      data: {
        venueId: input.venueId,
        name: input.name,
        description: input.description ?? null,
        price: input.price,
        duration: input.duration,
        validityDays,
        sessionMinutes: input.sessionMinutes,
        windows,
        daysOfWeek: input.daysOfWeek ?? [],
        sports: input.sports ?? [],
        highlight: input.highlight ?? null,
      },
    });
  }

  async updatePlan(input: UpdateMembershipPlanInput): Promise<MembershipPlan> {
    const existing = await this.prisma.membershipPlan.findFirst({
      where: { id: input.planId, venueId: input.venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Membership plan not found for this venue.');

    const data: Prisma.MembershipPlanUpdateInput = {};
    if (input.name !== undefined) data.name = input.name;
    if (input.description !== undefined) data.description = input.description;
    if (input.price !== undefined) data.price = input.price;
    if (input.duration !== undefined) {
      data.duration = input.duration;
      if (input.validityDays === undefined) data.validityDays = DURATION_DAYS[input.duration];
    }
    if (input.validityDays !== undefined) data.validityDays = input.validityDays;
    if (input.sessionMinutes !== undefined) data.sessionMinutes = input.sessionMinutes;
    if (input.windows !== undefined) data.windows = input.windows;
    if (input.daysOfWeek !== undefined) data.daysOfWeek = input.daysOfWeek;
    if (input.sports !== undefined) data.sports = input.sports;
    if (input.highlight !== undefined) data.highlight = input.highlight;
    if (input.isActive !== undefined) data.isActive = input.isActive;

    return this.prisma.membershipPlan.update({ where: { id: input.planId }, data });
  }

  async deletePlan(venueId: string, planId: string): Promise<MembershipPlan> {
    const existing = await this.prisma.membershipPlan.findFirst({
      where: { id: planId, venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Membership plan not found for this venue.');

    // Can't delete while members are still running or upcoming — wait until they end.
    const live = await this.prisma.subscription.findMany({
      where: { planId, status: { in: LIVE_STATUSES } },
      orderBy: { expiresAt: 'desc' },
      select: { expiresAt: true },
    });
    if (live.length > 0) {
      const n = live.length;
      throw new BadRequestException(
        `This plan still has ${n} running or upcoming membership${n > 1 ? 's' : ''}. ` +
          `You can delete it after the last one ends on ${formatDate(live[0].expiresAt)}.`,
      );
    }

    return this.prisma.membershipPlan.delete({ where: { id: planId } });
  }

  // ─── Subscriptions ────────────────────────────────────────────────────────────

  async listSubscriptions(input: ListSubscriptionsInput, page: number, pageSize: number) {
    const where: Prisma.SubscriptionWhereInput = { venueId: input.venueId };
    where.status = input.status ?? { not: SubscriptionStatus.CANCELLED };
    if (input.planId) where.planId = input.planId;
    const search = input.search?.trim();
    if (search) {
      where.customer = {
        OR: [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search } }],
      };
    }
    const [items, total] = await this.prisma.$transaction([
      this.prisma.subscription.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: SUBSCRIPTION_INCLUDE,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.subscription.count({ where }),
    ]);
    return { items, total };
  }

  findSubscription(venueId: string, subscriptionId: string) {
    return this.prisma.subscription.findFirst({
      where: { id: subscriptionId, venueId },
      include: { ...SUBSCRIPTION_INCLUDE, payments: { orderBy: { createdAt: 'desc' } } },
    });
  }

  /**
   * Whether a court's daily slot is already held by a live subscription (ACTIVE or
   * PAUSED) whose date range overlaps [startDate, endDate]. EXPIRED/CANCELLED free it.
   */
  async slotConflict(
    courtId: string,
    slotStart: string,
    startDate: Date,
    endDate: Date,
  ): Promise<boolean> {
    const count = await this.prisma.subscription.count({
      where: {
        courtId,
        slotStart,
        // Pending requests + scheduled (not-yet-started) memberships still hold their slot.
        status: {
          in: [
            SubscriptionStatus.PENDING,
            SubscriptionStatus.SCHEDULED,
            SubscriptionStatus.ACTIVE,
            SubscriptionStatus.PAUSED,
          ],
        },
        // Date ranges overlap when each starts on/before the other ends.
        startedAt: { lte: endDate },
        expiresAt: { gte: startDate },
      },
    });
    return count > 0;
  }

  /**
   * The daily slot starts ("HH:mm") already held on a court by a live subscription
   * (PENDING/SCHEDULED/ACTIVE/PAUSED) whose date range overlaps [startDate, endDate].
   * Drives the player picker's availability so they can't request a taken slot.
   */
  async takenSlotStarts(courtId: string, startDate: Date, endDate: Date): Promise<string[]> {
    const rows = await this.prisma.subscription.findMany({
      where: {
        courtId,
        status: {
          in: [
            SubscriptionStatus.PENDING,
            SubscriptionStatus.SCHEDULED,
            SubscriptionStatus.ACTIVE,
            SubscriptionStatus.PAUSED,
          ],
        },
        startedAt: { lte: endDate },
        expiresAt: { gte: startDate },
      },
      select: { slotStart: true },
      distinct: ['slotStart'],
    });
    return rows.map((r) => r.slotStart);
  }

  /** A player's own subscriptions across venues (via their linked customers), newest first. */
  async mySubscriptions(userId: string) {
    return this.prisma.subscription.findMany({
      where: { customer: { userId } },
      orderBy: { createdAt: 'desc' },
      include: SUBSCRIPTION_INCLUDE,
      take: 100,
    });
  }

  /** Resolve the plan, court + customer that all belong to the venue (any may be null). */
  async planCourtCustomer(venueId: string, planId: string, courtId: string, customerId: string) {
    const [plan, court, customer] = await Promise.all([
      this.prisma.membershipPlan.findFirst({ where: { id: planId, venueId } }),
      this.prisma.court.findFirst({ where: { id: courtId, venueId }, select: { id: true } }),
      this.prisma.customer.findFirst({ where: { id: customerId, venueId } }),
    ]);
    return { plan, court, customer };
  }

  /** Create the subscription + its first payment atomically. */
  async createSubscription(
    input: CreateSubscriptionInput,
    plan: MembershipPlan,
    slotStart: string,
    startedAt: Date,
    now: Date,
    forceStatus?: SubscriptionStatus,
  ) {
    const amount = input.amountPaid ?? Number(plan.price.toString());
    // A future start date means the membership is upcoming, not running yet — unless the
    // caller forces a status (player self-subscribe creates a PENDING request to approve).
    const status =
      forceStatus ?? (startedAt > now ? SubscriptionStatus.SCHEDULED : SubscriptionStatus.ACTIVE);
    const created = await this.prisma.$transaction(async (tx) => {
      const sub = await tx.subscription.create({
        data: {
          venueId: input.venueId,
          planId: plan.id,
          courtId: input.courtId,
          customerId: input.customerId,
          status,
          startedAt,
          expiresAt: addDays(startedAt, plan.validityDays),
          slotStart,
          payments: {
            create: {
              amount,
              method: input.paymentMethod ?? null,
              periodDays: plan.validityDays,
            },
          },
        },
      });
      return sub.id;
    });
    return this.findSubscription(input.venueId, created) as Promise<
      NonNullable<Awaited<ReturnType<SubscriptionsRepository['findSubscription']>>>
    >;
  }

  /** Extend a subscription by its plan's validity window + record a renewal payment. */
  async renewSubscription(input: RenewSubscriptionInput, now: Date) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id: input.subscriptionId, venueId: input.venueId },
      include: { plan: true },
    });
    if (!sub) throw new NotFoundException('Subscription not found for this venue.');

    // Renew from whichever is later — now or the current expiry — so unused days
    // aren't lost when renewing early.
    const base = sub.expiresAt > now ? sub.expiresAt : now;
    const amount = input.amountPaid ?? Number(sub.plan.price.toString());

    await this.prisma.$transaction([
      this.prisma.subscription.update({
        where: { id: sub.id },
        data: {
          status: SubscriptionStatus.ACTIVE,
          expiresAt: addDays(base, sub.plan.validityDays),
        },
      }),
      this.prisma.subscriptionPayment.create({
        data: {
          subscriptionId: sub.id,
          amount,
          method: input.paymentMethod ?? null,
          periodDays: sub.plan.validityDays,
        },
      }),
    ]);

    return this.findSubscription(input.venueId, sub.id) as Promise<
      NonNullable<Awaited<ReturnType<SubscriptionsRepository['findSubscription']>>>
    >;
  }

  async setStatus(venueId: string, subscriptionId: string, status: SubscriptionStatus) {
    const existing = await this.prisma.subscription.findFirst({
      where: { id: subscriptionId, venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Subscription not found for this venue.');
    await this.prisma.subscription.update({ where: { id: subscriptionId }, data: { status } });
    return this.findSubscription(venueId, subscriptionId) as Promise<
      NonNullable<Awaited<ReturnType<SubscriptionsRepository['findSubscription']>>>
    >;
  }

  // ─── Stats ──────────────────────────────────────────────────────────────────

  async stats(venueId: string, now: Date, soonBefore: Date, monthStart: Date) {
    const [activeMembers, expiringSoon, revenue, paymentGroups] = await Promise.all([
      this.prisma.subscription.count({
        where: { venueId, status: SubscriptionStatus.ACTIVE },
      }),
      this.prisma.subscription.count({
        where: {
          venueId,
          status: SubscriptionStatus.ACTIVE,
          expiresAt: { gte: now, lte: soonBefore },
        },
      }),
      this.prisma.subscriptionPayment.aggregate({
        where: { subscription: { venueId }, createdAt: { gte: monthStart } },
        _sum: { amount: true },
      }),
      this.prisma.subscriptionPayment.groupBy({
        by: ['subscriptionId'],
        where: { subscription: { venueId } },
        _count: { _all: true },
      }),
    ]);

    const withPayment = paymentGroups.length;
    const renewed = paymentGroups.filter((g) => g._count._all > 1).length;
    const renewalRatePct = withPayment === 0 ? 0 : Math.round((renewed / withPayment) * 100);

    return {
      activeMembers,
      expiringSoon,
      monthlyRevenue: revenue._sum.amount ? Number(revenue._sum.amount.toString()) : 0,
      renewalRatePct,
    };
  }

  /**
   * Lazily advance subscription lifecycle on read: SCHEDULED → ACTIVE once the start
   * date arrives, ACTIVE → SCHEDULED if it somehow hasn't started yet (legacy/edge data),
   * and ACTIVE/SCHEDULED → EXPIRED once past the end date.
   */
  async reconcileStatuses(venueId: string, now: Date): Promise<void> {
    await this.prisma.$transaction([
      // Promote: a scheduled membership whose start date has arrived is now running.
      this.prisma.subscription.updateMany({
        where: {
          venueId,
          status: SubscriptionStatus.SCHEDULED,
          startedAt: { lte: now },
          expiresAt: { gte: now },
        },
        data: { status: SubscriptionStatus.ACTIVE },
      }),
      // Demote: an active membership that hasn't started yet is really upcoming.
      this.prisma.subscription.updateMany({
        where: { venueId, status: SubscriptionStatus.ACTIVE, startedAt: { gt: now } },
        data: { status: SubscriptionStatus.SCHEDULED },
      }),
      // Expire: anything past its end date.
      this.prisma.subscription.updateMany({
        where: {
          venueId,
          status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.SCHEDULED] },
          expiresAt: { lt: now },
        },
        data: { status: SubscriptionStatus.EXPIRED },
      }),
    ]);
  }
}
