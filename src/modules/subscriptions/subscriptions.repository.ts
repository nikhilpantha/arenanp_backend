import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  BookingStatus,
  MembershipDuration,
  MembershipPlan,
  PaymentProvider,
  Prisma,
  SubscriptionStatus,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { NEPAL_UTC_OFFSET_MINUTES } from '../../common/utils/nepal-time';
import { nepalClockRange } from '../booking/availability.util';

import { firstBookingInMemberSlot } from './conflicts.util';
import { expiryAfterResume, PENDING_REQUEST_TTL_HOURS, transitionError } from './lifecycle.util';
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

/** "Aug 10, 6 AM to 7 AM" — one booking, in Nepal wall-clock, for an owner-facing message. */
function nepalDayAndClock(startAt: Date, endAt: Date): string {
  const local = new Date(startAt.getTime() + NEPAL_UTC_OFFSET_MINUTES * 60_000);
  return `${MONTHS[local.getUTCMonth()]} ${local.getUTCDate()}, ${nepalClockRange(startAt, endAt)}`;
}

/**
 * Statuses that keep a membership "live" — someone is on the plan now, is about
 * to be, or has asked to be. PENDING counts: it already holds the court slot
 * (see `slotConflict`), so deleting the plan under it would orphan the request.
 */
const LIVE_STATUSES: SubscriptionStatus[] = [
  SubscriptionStatus.PENDING,
  SubscriptionStatus.SCHEDULED,
  SubscriptionStatus.ACTIVE,
  SubscriptionStatus.PAUSED,
];

/** Headcounts on one plan: on it today, still to come, and ever. */
export type PlanCounts = { active: number; live: number; total: number };

@Injectable()
export class SubscriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Plans ──────────────────────────────────────────────────────────────────

  async listPlans(input: ListMembershipPlansInput) {
    const where: Prisma.MembershipPlanWhereInput = { venueId: input.venueId };
    if (input.activeOnly) where.isActive = true;
    return this.prisma.membershipPlan.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  /**
   * Per-plan headcounts, split the three ways the console actually needs:
   * `active` for the card, `live` for "can this be deleted?", `total` for "does
   * deleting it destroy payment history?". Prisma can't express three differently
   * filtered counts of one relation, so it's one groupBy and a merge.
   */
  async planCounts(venueId: string): Promise<Map<string, PlanCounts>> {
    const rows = await this.prisma.subscription.groupBy({
      by: ['planId', 'status'],
      where: { venueId },
      _count: { _all: true },
    });

    const counts = new Map<string, PlanCounts>();
    for (const row of rows) {
      const tally = counts.get(row.planId) ?? { active: 0, live: 0, total: 0 };
      const n = row._count._all;
      tally.total += n;
      if (LIVE_STATUSES.includes(row.status)) tally.live += n;
      if (row.status === SubscriptionStatus.ACTIVE) tally.active += n;
      counts.set(row.planId, tally);
    }
    return counts;
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

  /**
   * Delete a plan — only ever possible for one nobody has bought.
   *
   * Two separate refusals, and both point at deactivating instead:
   * 1. Members are on it now (or have a request in) — they'd lose their slot.
   * 2. Only past members remain — their payments hang off those subscriptions,
   *    so the plan is accounting history. `Subscription.plan` is `onDelete:
   *    Restrict`, so without this check Prisma raises a foreign-key error the
   *    owner sees as "internal server error".
   */
  async deletePlan(venueId: string, planId: string): Promise<MembershipPlan> {
    const existing = await this.prisma.membershipPlan.findFirst({
      where: { id: planId, venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Membership plan not found for this venue.');

    const [live, total] = await Promise.all([
      this.prisma.subscription.findMany({
        where: { planId, status: { in: LIVE_STATUSES } },
        orderBy: { expiresAt: 'desc' },
        select: { expiresAt: true },
      }),
      this.prisma.subscription.count({ where: { planId } }),
    ]);

    if (live.length > 0) {
      const n = live.length;
      throw new BadRequestException(
        `This plan still has ${n} running or upcoming membership${n > 1 ? 's' : ''}. ` +
          'Switch the plan off instead — they finish their term and nobody new can join. ' +
          `The last one ends on ${formatDate(live[0].expiresAt)}.`,
      );
    }

    if (total > 0) {
      throw new BadRequestException(
        `This plan has ${total} past membership${total > 1 ? 's' : ''} with payment records, ` +
          'so deleting it would take that money history with it. ' +
          'Switch it off instead to hide it from new members.',
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
    /** Ignore this subscription — used when renewing, so it can't clash with itself. */
    excludeSubscriptionId?: string,
  ): Promise<boolean> {
    const count = await this.prisma.subscription.count({
      where: {
        courtId,
        slotStart,
        ...(excludeSubscriptionId ? { id: { not: excludeSubscriptionId } } : {}),
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
    // Nobody has paid for a request the venue hasn't approved yet. The first payment
    // is recorded on approval — writing a Rs 0 row here counted as "has paid" and
    // dragged the renewal rate down.
    const awaitingApproval = status === SubscriptionStatus.PENDING;
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
          // Lock in today's terms — the plan can change tomorrow, this term can't.
          price: plan.price,
          validityDays: plan.validityDays,
          sessionMinutes: plan.sessionMinutes,
          daysOfWeek: plan.daysOfWeek,
          ...(awaitingApproval
            ? {}
            : {
                payments: {
                  create: {
                    amount,
                    method: input.paymentMethod ?? null,
                    periodDays: plan.validityDays,
                  },
                },
              }),
        },
      });
      return sub.id;
    });
    return this.findSubscription(input.venueId, created) as Promise<
      NonNullable<Awaited<ReturnType<SubscriptionsRepository['findSubscription']>>>
    >;
  }

  /**
   * Non-cancelled bookings on a court between two instants — the raw material for
   * "is this member's recurring slot clear over that stretch of calendar?".
   */
  private courtBookings(courtId: string, from: Date, to: Date) {
    return this.prisma.booking.findMany({
      where: {
        courtId,
        status: { not: BookingStatus.CANCELLED },
        startAt: { lt: to },
        endAt: { gt: from },
      },
      orderBy: { startAt: 'asc' },
      select: { startAt: true, endAt: true, customerName: true },
    });
  }

  /**
   * A member's recurring slot is only theirs while their term runs. Whenever we
   * push that hold over new calendar — renewing, or resuming after a pause that
   * opened the slot to walk-ins — the court has to be clear first, or the member
   * and a paying booking both own the same hour.
   */
  private async assertSlotClearForBookings(
    sub: { courtId: string; slotStart: string; sessionMinutes: number; daysOfWeek: string[] },
    from: Date,
    to: Date,
    lead: string,
  ): Promise<void> {
    const bookings = await this.courtBookings(sub.courtId, from, to);
    const clash = firstBookingInMemberSlot(sub, bookings);
    if (!clash) return;
    const who = clash.customerName ? ` (${clash.customerName})` : '';
    throw new BadRequestException(
      `${lead} would put this member back on a court that's already booked: ` +
        `${nepalDayAndClock(clash.startAt, clash.endAt)}${who}. ` +
        'Move or cancel that booking first.',
    );
  }

  /** Extend a subscription by its plan's validity window + record a renewal payment. */
  async renewSubscription(input: RenewSubscriptionInput, now: Date) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id: input.subscriptionId, venueId: input.venueId },
      include: { plan: true },
    });
    if (!sub) throw new NotFoundException('Subscription not found for this venue.');

    // A cancelled membership released its slot the moment it was cancelled — someone
    // else may hold it now, so it restarts as a new membership, never as a renewal.
    if (sub.status === SubscriptionStatus.CANCELLED) {
      throw new BadRequestException(
        'This membership was cancelled and its slot was released. Add a new membership instead.',
      );
    }

    // A paused membership is mid-credit: its end date moves when it resumes, so
    // renewing first would extend from a date that's about to change.
    if (sub.status === SubscriptionStatus.PAUSED) {
      throw new BadRequestException(
        'This membership is paused. Resume it first — the paused days are credited ' +
          'to their end date, then you can renew from there.',
      );
    }

    // A switched-off plan is closed to new money: existing members ride out the term
    // they paid for, but renewing would sell a plan the venue has withdrawn.
    if (!sub.plan.isActive) {
      throw new BadRequestException(
        `"${sub.plan.name}" is switched off, so it can't be renewed. ` +
          'Switch the plan back on, or add this member to a current plan.',
      );
    }

    // Renew from whichever is later — now or the current expiry — so unused days
    // aren't lost when renewing early. A renewal buys a NEW term, so it takes the
    // plan's terms as they stand today rather than the ones it was bought on.
    const base = sub.expiresAt > now ? sub.expiresAt : now;
    const nextExpiry = addDays(base, sub.plan.validityDays);

    // The court + time is only theirs while their term runs. Renewing claims a NEW
    // stretch of calendar, so re-check it — after an expiry someone else may have
    // taken the slot, and silently extending would double-book the court.
    if (await this.slotConflict(sub.courtId, sub.slotStart, base, nextExpiry, sub.id)) {
      throw new BadRequestException(
        'Another member now holds that court and time for the new period. ' +
          'Move this member to a different slot instead.',
      );
    }
    await this.assertSlotClearForBookings(
      { ...sub, sessionMinutes: sub.plan.sessionMinutes, daysOfWeek: sub.plan.daysOfWeek },
      base,
      nextExpiry,
      'Renewing',
    );

    const amount = input.amountPaid ?? Number(sub.plan.price.toString());

    await this.prisma.$transaction([
      this.prisma.subscription.update({
        where: { id: sub.id },
        data: {
          status: SubscriptionStatus.ACTIVE,
          expiresAt: nextExpiry,
          // Re-snapshot: from now on this member is on today's terms, and the next
          // renewal extends by today's window.
          price: sub.plan.price,
          validityDays: sub.plan.validityDays,
          sessionMinutes: sub.plan.sessionMinutes,
          daysOfWeek: sub.plan.daysOfWeek,
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

  /**
   * Pause, resume or cancel — the only status changes an owner makes by hand.
   *
   * Pausing opens the member's slot to walk-in bookings (the venue can still earn
   * from that hour) while keeping it reserved against other memberships. Resuming
   * pays the time back onto their end date and re-claims the court, which is why it
   * has to check no walk-in got in first.
   */
  async setStatus(venueId: string, subscriptionId: string, status: SubscriptionStatus, now: Date) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id: subscriptionId, venueId },
    });
    if (!sub) throw new NotFoundException('Subscription not found for this venue.');

    const refusal = transitionError(sub.status, status);
    if (refusal) throw new BadRequestException(refusal);

    const data: Prisma.SubscriptionUpdateInput = { status };

    if (status === SubscriptionStatus.PAUSED) {
      data.pausedAt = now;
    } else if (status === SubscriptionStatus.ACTIVE && sub.status === SubscriptionStatus.PAUSED) {
      const expiresAt = expiryAfterResume(sub.expiresAt, sub.pausedAt, now);
      await this.assertSlotClearForBookings(sub, now, expiresAt, 'Resuming');
      data.expiresAt = expiresAt;
      data.pausedAt = null;
    } else if (status === SubscriptionStatus.CANCELLED) {
      data.pausedAt = null;
    }

    await this.prisma.subscription.update({ where: { id: subscriptionId }, data });
    return this.findSubscription(venueId, subscriptionId) as Promise<
      NonNullable<Awaited<ReturnType<SubscriptionsRepository['findSubscription']>>>
    >;
  }

  /**
   * Approve a player's request: the moment it becomes a real membership and the
   * moment money is first recorded against it.
   *
   * A request can sit for up to `PENDING_REQUEST_TTL_HOURS` holding its slot, so
   * everything is re-checked here rather than trusted from when it was made. It is
   * charged at the price it was requested at, not today's — they asked before any
   * increase.
   */
  async approveRequest(
    venueId: string,
    subscriptionId: string,
    now: Date,
    amountPaid?: number,
    method?: PaymentProvider,
  ) {
    const sub = await this.prisma.subscription.findFirst({
      where: { id: subscriptionId, venueId },
      include: { plan: { select: { name: true, isActive: true } } },
    });
    if (!sub) throw new NotFoundException('Subscription not found for this venue.');
    if (sub.status !== SubscriptionStatus.PENDING) {
      throw new BadRequestException('This membership is not waiting for approval.');
    }
    if (!sub.plan.isActive) {
      throw new BadRequestException(
        `"${sub.plan.name}" is switched off, so this request can't be approved. ` +
          'Switch the plan back on first, or reject the request.',
      );
    }

    if (await this.slotConflict(sub.courtId, sub.slotStart, sub.startedAt, sub.expiresAt, sub.id)) {
      throw new BadRequestException(
        'That court and time went to another member while this request was waiting. ' +
          'Reject it and offer them a different slot.',
      );
    }
    const from = sub.startedAt > now ? sub.startedAt : now;
    await this.assertSlotClearForBookings(sub, from, sub.expiresAt, 'Approving');

    const status = sub.startedAt > now ? SubscriptionStatus.SCHEDULED : SubscriptionStatus.ACTIVE;

    await this.prisma.$transaction([
      this.prisma.subscription.update({ where: { id: sub.id }, data: { status } }),
      this.prisma.subscriptionPayment.create({
        data: {
          subscriptionId: sub.id,
          amount: amountPaid ?? Number(sub.price.toString()),
          method: method ?? null,
          periodDays: sub.validityDays,
        },
      }),
    ]);

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
   *
   * PAUSED is left alone on purpose — a paused membership's end date is still moving,
   * so expiring it on the clock would cheat the member out of their credit.
   */
  async reconcileStatuses(venueId: string, now: Date): Promise<void> {
    const requestCutoff = new Date(now.getTime() - PENDING_REQUEST_TTL_HOURS * 3_600_000);
    await this.prisma.$transaction([
      // Let an unanswered request go: it has been holding a court slot the venue
      // could have sold, and the player has had no answer for two days.
      this.prisma.subscription.updateMany({
        where: {
          venueId,
          status: SubscriptionStatus.PENDING,
          createdAt: { lt: requestCutoff },
        },
        data: { status: SubscriptionStatus.CANCELLED },
      }),
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
