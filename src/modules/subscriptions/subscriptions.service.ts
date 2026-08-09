import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionStatus } from '@prisma/client';

import { buildPageInfo } from '../../common/dto/pagination.input';
import { CustomersRepository } from '../customers/customers.repository';

import { assertSlotInWindows, normaliseDays, normaliseWindows } from './slots.util';
import { SubscriptionsRepository } from './subscriptions.repository';
import type {
  ApproveSubscriptionInput,
  CreateMembershipPlanInput,
  CreateMySubscriptionInput,
  CreateSubscriptionInput,
  ListMembershipPlansInput,
  ListSubscriptionsInput,
  RenewSubscriptionInput,
  SetSubscriptionStatusInput,
  UpdateMembershipPlanInput,
} from './dto/subscription.inputs';
import {
  mapPlan,
  mapSubscription,
  MembershipPlanModel,
  MembershipStatsModel,
  PaginatedSubscriptions,
  SubscriptionModel,
} from './dto/subscription.model';

@Injectable()
export class SubscriptionsService {
  constructor(
    private readonly repo: SubscriptionsRepository,
    private readonly customers: CustomersRepository,
  ) {}

  // ─── Plans ──────────────────────────────────────────────────────────────────

  async listPlans(input: ListMembershipPlansInput): Promise<MembershipPlanModel[]> {
    const [plans, counts] = await Promise.all([
      this.repo.listPlans(input),
      this.repo.planCounts(input.venueId),
    ]);
    return plans.map((p) => mapPlan(p, counts.get(p.id)));
  }

  async createPlan(input: CreateMembershipPlanInput): Promise<MembershipPlanModel> {
    const windows = normaliseWindows(input.windows);
    input.daysOfWeek = normaliseDays(input.daysOfWeek);
    // Brand new, so nobody is on it — the zero counts from mapPlan are correct.
    return mapPlan(await this.repo.createPlan(input, windows));
  }

  async updatePlan(input: UpdateMembershipPlanInput): Promise<MembershipPlanModel> {
    // Normalise the bands and days in place when they're being changed.
    if (input.windows !== undefined) input.windows = normaliseWindows(input.windows);
    if (input.daysOfWeek !== undefined) input.daysOfWeek = normaliseDays(input.daysOfWeek);
    const plan = await this.repo.updatePlan(input);
    // Carry the real headcounts back — the console reads them straight off the
    // mutation result, and zeroes here would make a plan look safe to delete.
    const counts = await this.repo.planCounts(input.venueId);
    return mapPlan(plan, counts.get(plan.id));
  }

  async deletePlan(venueId: string, planId: string): Promise<MembershipPlanModel> {
    return mapPlan(await this.repo.deletePlan(venueId, planId));
  }

  // ─── Subscriptions ────────────────────────────────────────────────────────────

  async listSubscriptions(input: ListSubscriptionsInput): Promise<PaginatedSubscriptions> {
    const now = new Date();
    await this.repo.reconcileStatuses(input.venueId, now);
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listSubscriptions(input, page, pageSize);
    return {
      items: items.map((s) => mapSubscription(s, now)),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getSubscription(venueId: string, subscriptionId: string): Promise<SubscriptionModel> {
    const now = new Date();
    await this.repo.reconcileStatuses(venueId, now);
    const sub = await this.repo.findSubscription(venueId, subscriptionId);
    if (!sub) throw new NotFoundException('Subscription not found for this venue.');
    return mapSubscription(sub, now);
  }

  async createSubscription(
    input: CreateSubscriptionInput,
    forceStatus?: SubscriptionStatus,
  ): Promise<SubscriptionModel> {
    const { plan, court, customer } = await this.repo.planCourtCustomer(
      input.venueId,
      input.planId,
      input.courtId,
      input.customerId,
    );
    if (!plan) throw new NotFoundException('Membership plan not found for this venue.');
    if (!plan.isActive) throw new BadRequestException('This plan is no longer available.');
    if (!court) throw new NotFoundException('Court not found for this venue.');
    if (!customer) throw new NotFoundException('Customer not found for this venue.');

    // The chosen start must yield a session that fits inside one of the plan's bands.
    const slotStart = assertSlotInWindows(input.slotStart, plan.sessionMinutes, plan.windows);

    // …and that court's slot must be free over the new subscription's date range.
    const startDate = input.startDate;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + plan.validityDays);
    if (await this.repo.slotConflict(input.courtId, slotStart, startDate, endDate)) {
      throw new BadRequestException('That court and time slot is already taken for these dates.');
    }

    const now = new Date();
    const sub = await this.repo.createSubscription(
      input,
      plan,
      slotStart,
      startDate,
      now,
      forceStatus,
    );
    return mapSubscription(sub, now);
  }

  /**
   * A player subscribes to a plan themselves: resolve (or create) their venue customer,
   * then run the same validation + create path.
   *
   * It lands as a PENDING request the venue approves, and no payment is recorded until
   * then — the player pays at the counter, and approval is where that gets written.
   */
  async createMySubscription(
    input: CreateMySubscriptionInput,
    userId: string,
  ): Promise<SubscriptionModel> {
    const customer = await this.customers.getOrCreateForUser(input.venueId, userId);
    return this.createSubscription(
      { ...input, customerId: customer.id },
      SubscriptionStatus.PENDING,
    );
  }

  /** Daily slot starts ("HH:mm") already taken on a court over a date range (public). */
  async courtTakenSlots(courtId: string, startDate: string, endDate: string): Promise<string[]> {
    return this.repo.takenSlotStarts(courtId, new Date(startDate), new Date(endDate));
  }

  /** The signed-in player's subscriptions (across venues), mapped for the app. */
  async mySubscriptions(userId: string): Promise<SubscriptionModel[]> {
    const now = new Date();
    const items = await this.repo.mySubscriptions(userId);
    return items.map((s) => mapSubscription(s, now));
  }

  async renewSubscription(input: RenewSubscriptionInput): Promise<SubscriptionModel> {
    const now = new Date();
    const sub = await this.repo.renewSubscription(input, now);
    return mapSubscription(sub, now);
  }

  async setStatus(input: SetSubscriptionStatusInput): Promise<SubscriptionModel> {
    const now = new Date();
    const sub = await this.repo.setStatus(input.venueId, input.subscriptionId, input.status, now);
    return mapSubscription(sub, now);
  }

  /** Turn a player's request into a real membership and record what they paid. */
  async approveRequest(input: ApproveSubscriptionInput): Promise<SubscriptionModel> {
    const now = new Date();
    const sub = await this.repo.approveRequest(
      input.venueId,
      input.subscriptionId,
      now,
      input.amountPaid,
      input.paymentMethod,
    );
    return mapSubscription(sub, now);
  }

  // ─── Stats ──────────────────────────────────────────────────────────────────

  /** `withMoney` reflects the caller's `finance:read`; see `BookingService.summary`. */
  async stats(venueId: string, withMoney: boolean): Promise<MembershipStatsModel> {
    const now = new Date();
    await this.repo.reconcileStatuses(venueId, now);
    const soonBefore = new Date(now);
    soonBefore.setDate(soonBefore.getDate() + 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const { monthlyRevenue, ...counts } = await this.repo.stats(
      venueId,
      now,
      soonBefore,
      monthStart,
    );
    return withMoney ? { ...counts, monthlyRevenue } : counts;
  }
}
