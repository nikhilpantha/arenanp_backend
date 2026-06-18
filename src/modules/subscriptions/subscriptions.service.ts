import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { buildPageInfo } from '../../common/dto/pagination.input';

import { assertSlotInWindows, normaliseWindows } from './slots.util';
import { SubscriptionsRepository } from './subscriptions.repository';
import type {
  CreateMembershipPlanInput,
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
  constructor(private readonly repo: SubscriptionsRepository) {}

  // ─── Plans ──────────────────────────────────────────────────────────────────

  async listPlans(input: ListMembershipPlansInput): Promise<MembershipPlanModel[]> {
    const plans = await this.repo.listPlans(input);
    return plans.map((p) => mapPlan(p, p._count?.subscriptions ?? 0));
  }

  async createPlan(input: CreateMembershipPlanInput): Promise<MembershipPlanModel> {
    const windows = normaliseWindows(input.windows);
    return mapPlan(await this.repo.createPlan(input, windows));
  }

  async updatePlan(input: UpdateMembershipPlanInput): Promise<MembershipPlanModel> {
    // Normalise the bands in place when they're being changed.
    if (input.windows !== undefined) input.windows = normaliseWindows(input.windows);
    return mapPlan(await this.repo.updatePlan(input));
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

  async createSubscription(input: CreateSubscriptionInput): Promise<SubscriptionModel> {
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
    const sub = await this.repo.createSubscription(input, plan, slotStart, startDate, now);
    return mapSubscription(sub, now);
  }

  async renewSubscription(input: RenewSubscriptionInput): Promise<SubscriptionModel> {
    const now = new Date();
    const sub = await this.repo.renewSubscription(input, now);
    return mapSubscription(sub, now);
  }

  async setStatus(input: SetSubscriptionStatusInput): Promise<SubscriptionModel> {
    const sub = await this.repo.setStatus(input.venueId, input.subscriptionId, input.status);
    return mapSubscription(sub, new Date());
  }

  // ─── Stats ──────────────────────────────────────────────────────────────────

  async stats(venueId: string): Promise<MembershipStatsModel> {
    const now = new Date();
    await this.repo.reconcileStatuses(venueId, now);
    const soonBefore = new Date(now);
    soonBefore.setDate(soonBefore.getDate() + 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    return this.repo.stats(venueId, now, soonBefore, monthStart);
  }
}
