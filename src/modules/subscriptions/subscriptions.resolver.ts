import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { SubscriptionsService } from './subscriptions.service';
import {
  CreateMembershipPlanInput,
  CreateSubscriptionInput,
  ListMembershipPlansInput,
  ListSubscriptionsInput,
  RenewSubscriptionInput,
  SetSubscriptionStatusInput,
  UpdateMembershipPlanInput,
} from './dto/subscription.inputs';
import {
  MembershipPlanModel,
  MembershipStatsModel,
  PaginatedSubscriptions,
  SubscriptionModel,
} from './dto/subscription.model';

@Resolver(() => SubscriptionModel)
export class SubscriptionsResolver {
  constructor(private readonly service: SubscriptionsService) {}

  // ─── Plans ──────────────────────────────────────────────────────────────────

  @Query(() => [MembershipPlanModel], {
    name: 'venueMembershipPlans',
    description: "A venue's membership plans.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueMembershipPlans(
    @Args('input') input: ListMembershipPlansInput,
  ): Promise<MembershipPlanModel[]> {
    return this.service.listPlans(input);
  }

  @Mutation(() => MembershipPlanModel, {
    name: 'createMembershipPlan',
    description: 'Create a membership plan.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('memberships:manage')
  createMembershipPlan(
    @Args('input') input: CreateMembershipPlanInput,
  ): Promise<MembershipPlanModel> {
    return this.service.createPlan(input);
  }

  @Mutation(() => MembershipPlanModel, {
    name: 'updateMembershipPlan',
    description: 'Update / activate / deactivate a membership plan.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('memberships:manage')
  updateMembershipPlan(
    @Args('input') input: UpdateMembershipPlanInput,
  ): Promise<MembershipPlanModel> {
    return this.service.updatePlan(input);
  }

  @Mutation(() => MembershipPlanModel, {
    name: 'deleteMembershipPlan',
    description: 'Delete a membership plan.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('memberships:manage')
  deleteMembershipPlan(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('planId', { type: () => ID }) planId: string,
  ): Promise<MembershipPlanModel> {
    return this.service.deletePlan(venueId, planId);
  }

  // ─── Subscriptions ────────────────────────────────────────────────────────────

  @Query(() => PaginatedSubscriptions, {
    name: 'venueSubscriptions',
    description: "A venue's subscriptions (excludes CANCELLED unless filtered), paginated.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueSubscriptions(
    @Args('input') input: ListSubscriptionsInput,
  ): Promise<PaginatedSubscriptions> {
    return this.service.listSubscriptions(input);
  }

  @Query(() => SubscriptionModel, {
    name: 'venueSubscription',
    description: 'A single subscription with its payment history.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueSubscription(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('subscriptionId', { type: () => ID }) subscriptionId: string,
  ): Promise<SubscriptionModel> {
    return this.service.getSubscription(venueId, subscriptionId);
  }

  @Mutation(() => SubscriptionModel, {
    name: 'createSubscription',
    description: 'Subscribe a customer to a plan (records the first payment).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('memberships:manage')
  createSubscription(@Args('input') input: CreateSubscriptionInput): Promise<SubscriptionModel> {
    return this.service.createSubscription(input);
  }

  @Mutation(() => SubscriptionModel, {
    name: 'renewSubscription',
    description: 'Renew a subscription (extends the window + records a payment).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('memberships:manage')
  renewSubscription(@Args('input') input: RenewSubscriptionInput): Promise<SubscriptionModel> {
    return this.service.renewSubscription(input);
  }

  @Mutation(() => SubscriptionModel, {
    name: 'setSubscriptionStatus',
    description: 'Pause, resume, cancel or expire a subscription.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('memberships:manage')
  setSubscriptionStatus(
    @Args('input') input: SetSubscriptionStatusInput,
  ): Promise<SubscriptionModel> {
    return this.service.setStatus(input);
  }

  // ─── Stats ──────────────────────────────────────────────────────────────────

  @Query(() => MembershipStatsModel, {
    name: 'venueMembershipStats',
    description: 'Venue membership KPIs (active, expiring, revenue, renewal rate).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueMembershipStats(
    @Args('venueId', { type: () => ID }) venueId: string,
  ): Promise<MembershipStatsModel> {
    return this.service.stats(venueId);
  }
}
