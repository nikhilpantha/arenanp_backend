import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CapabilityType } from '@prisma/client';

import { RequireCapability } from '../../common/decorators/capability.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';

import { SubscriptionsService } from './subscriptions.service';
import {
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

  @Query(() => [MembershipPlanModel], {
    name: 'venuePublicPlans',
    description: "A venue's active membership plans — public, for the player marketplace.",
  })
  venuePublicPlans(
    @Args('venueId', { type: () => ID }) venueId: string,
  ): Promise<MembershipPlanModel[]> {
    return this.service.listPlans({ venueId, activeOnly: true });
  }

  @Query(() => [String], {
    name: 'courtTakenSlots',
    description: 'Daily slot starts ("HH:mm") already held on a court over a date range.',
  })
  courtTakenSlots(
    @Args('courtId', { type: () => ID }) courtId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<string[]> {
    return this.service.courtTakenSlots(courtId, startDate, endDate);
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

  // ─── Player self-service ──────────────────────────────────────────────────────

  @Mutation(() => SubscriptionModel, {
    name: 'createMySubscription',
    description: 'Subscribe to a plan as a player (auto-links the player as a venue customer).',
  })
  @RequireCapability(CapabilityType.PLAYER)
  createMySubscription(
    @Args('input') input: CreateMySubscriptionInput,
    @CurrentUser() user: AuthUser,
  ): Promise<SubscriptionModel> {
    return this.service.createMySubscription(input, user.id);
  }

  @Query(() => [SubscriptionModel], {
    name: 'mySubscriptions',
    description: "The signed-in player's memberships across venues.",
  })
  @RequireCapability(CapabilityType.PLAYER)
  mySubscriptions(@CurrentUser() user: AuthUser): Promise<SubscriptionModel[]> {
    return this.service.mySubscriptions(user.id);
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
