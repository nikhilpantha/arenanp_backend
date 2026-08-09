import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  BookingPaymentStatus,
  MembershipDuration,
  MembershipPlan as PrismaPlan,
  PaymentProvider,
  Subscription as PrismaSubscription,
  SubscriptionPayment as PrismaPayment,
  SubscriptionStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PageInfo } from '../../../common/dto/pagination.input';
import '../../../common/enums';
import { daysCredited } from '../lifecycle.util';

function num(v: Decimal): number {
  return Number(v.toString());
}

@ObjectType({ description: 'A venue-owned membership plan customers can subscribe to.' })
export class MembershipPlanModel {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;
  @Field() name!: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => Float) price!: number;
  @Field(() => MembershipDuration) duration!: MembershipDuration;
  @Field(() => Int) validityDays!: number;
  @Field(() => Int, { description: 'Session length in minutes (e.g. 60 = 1 hour).' })
  sessionMinutes!: number;
  @Field(() => [String], { description: 'Allowed subscription bands as "HH:mm-HH:mm".' })
  windows!: string[];
  @Field(() => [String]) daysOfWeek!: string[];
  @Field(() => [String]) sports!: string[];
  @Field({ nullable: true }) highlight?: string;
  @Field() isActive!: boolean;
  @Field(() => Int, { description: 'Active subscribers on this plan.' })
  activeSubscribers!: number;
  @Field(() => Int, {
    description: 'Running, upcoming, paused or pending members — any of these blocks deleting.',
  })
  liveSubscribers!: number;
  @Field(() => Int, {
    description:
      'Everyone who ever subscribed. Above zero means deleting would bin payment history.',
  })
  totalSubscribers!: number;
  @Field({ description: 'Whether this plan can be deleted outright (nobody ever bought it).' })
  canDelete!: boolean;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'A payment against a subscription (purchase or renewal).' })
export class SubscriptionPaymentModel {
  @Field(() => ID) id!: string;
  @Field(() => Float) amount!: number;
  @Field(() => PaymentProvider, { nullable: true }) method?: PaymentProvider;
  @Field(() => BookingPaymentStatus) status!: BookingPaymentStatus;
  @Field(() => Int, { nullable: true }) periodDays?: number;
  @Field() createdAt!: Date;
}

@ObjectType({ description: "A customer's subscription to a plan." })
export class SubscriptionModel {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;

  @Field(() => ID) planId!: string;
  @Field() planName!: string;
  @Field(() => MembershipDuration) duration!: MembershipDuration;
  @Field(() => Float, { description: 'What this term costs — the price they bought at.' })
  price!: number;
  @Field(() => Float, {
    description: "The plan's price today. Differs from `price` when it changed mid-term.",
  })
  planPrice!: number;
  @Field(() => Int, { description: 'Days this term runs for; a renewal adds this many.' })
  validityDays!: number;
  @Field(() => Int, { description: 'Session length in minutes.' })
  sessionMinutes!: number;
  @Field({ description: 'The member\'s daily start time ("HH:mm").' })
  slotStart!: string;
  @Field(() => [String]) daysOfWeek!: string[];
  @Field(() => [String]) sports!: string[];

  @Field(() => ID) courtId!: string;
  @Field() courtName!: string;

  @Field(() => ID) customerId!: string;
  @Field() customerName!: string;
  @Field({ nullable: true }) customerPhone?: string;

  @Field(() => SubscriptionStatus) status!: SubscriptionStatus;
  @Field({ description: 'ACTIVE and within 7 days of expiry.' })
  expiringSoon!: boolean;
  @Field() startedAt!: Date;
  @Field({ description: 'Moves out by the paused time when a paused membership resumes.' })
  expiresAt!: Date;
  @Field({ nullable: true, description: 'When the current pause started.' })
  pausedAt?: Date;
  @Field(() => Int, { description: 'Whole days a running pause has credited so far.' })
  pausedDays!: number;
  @Field(() => [SubscriptionPaymentModel], { description: 'Payment + renewal history.' })
  payments!: SubscriptionPaymentModel[];

  @Field() createdAt!: Date;
}

@ObjectType()
export class PaginatedSubscriptions {
  @Field(() => [SubscriptionModel]) items!: SubscriptionModel[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}

@ObjectType({ description: 'Venue membership KPIs for the dashboard.' })
export class MembershipStatsModel {
  @Field(() => Int) activeMembers!: number;
  @Field(() => Int) expiringSoon!: number;

  /** Null for callers without `finance:read` — see `VenueBookingSummary.revenueToday`. */
  @Field(() => Float, {
    nullable: true,
    description: "Membership revenue this month. Null unless the caller holds 'finance:read'.",
  })
  monthlyRevenue?: number;

  @Field(() => Int) renewalRatePct!: number;
}

export function mapPlan(
  p: PrismaPlan,
  counts: { active: number; live: number; total: number } = { active: 0, live: 0, total: 0 },
): MembershipPlanModel {
  return {
    id: p.id,
    venueId: p.venueId,
    name: p.name,
    description: p.description ?? undefined,
    price: num(p.price),
    duration: p.duration,
    validityDays: p.validityDays,
    sessionMinutes: p.sessionMinutes,
    windows: p.windows,
    daysOfWeek: p.daysOfWeek,
    sports: p.sports,
    highlight: p.highlight ?? undefined,
    isActive: p.isActive,
    activeSubscribers: counts.active,
    liveSubscribers: counts.live,
    totalSubscribers: counts.total,
    canDelete: counts.total === 0,
    createdAt: p.createdAt,
  };
}

export function mapPayment(p: PrismaPayment): SubscriptionPaymentModel {
  return {
    id: p.id,
    amount: num(p.amount),
    method: p.method ?? undefined,
    status: p.status,
    periodDays: p.periodDays ?? undefined,
    createdAt: p.createdAt,
  };
}

type SubscriptionWithRelations = PrismaSubscription & {
  plan: PrismaPlan;
  court: { name: string };
  customer: { name: string; phone: string | null };
  payments?: PrismaPayment[];
};

/** Threshold (days) under which an ACTIVE subscription is flagged "expiring soon". */
const EXPIRING_SOON_DAYS = 7;

export function mapSubscription(s: SubscriptionWithRelations, now: Date): SubscriptionModel {
  const msLeft = s.expiresAt.getTime() - now.getTime();
  const daysLeft = msLeft / (1000 * 60 * 60 * 24);
  const expiringSoon =
    s.status === SubscriptionStatus.ACTIVE && daysLeft >= 0 && daysLeft <= EXPIRING_SOON_DAYS;
  return {
    id: s.id,
    venueId: s.venueId,
    planId: s.planId,
    planName: s.plan.name,
    duration: s.plan.duration,
    // Terms come off the SUBSCRIPTION, not the plan: re-pricing or re-timing a plan
    // must never rewrite what a member already bought. The plan's live price rides
    // along separately so the console can show "Rs 4,000 → Rs 4,500" at renewal.
    price: num(s.price),
    planPrice: num(s.plan.price),
    validityDays: s.validityDays,
    sessionMinutes: s.sessionMinutes,
    slotStart: s.slotStart,
    daysOfWeek: s.daysOfWeek,
    sports: s.plan.sports,
    courtId: s.courtId,
    courtName: s.court.name,
    customerId: s.customerId,
    customerName: s.customer.name,
    customerPhone: s.customer.phone ?? undefined,
    status: s.status,
    expiringSoon,
    startedAt: s.startedAt,
    expiresAt: s.expiresAt,
    pausedAt: s.pausedAt ?? undefined,
    pausedDays: daysCredited(s.pausedAt, now),
    payments: (s.payments ?? []).map(mapPayment),
    createdAt: s.createdAt,
  };
}
