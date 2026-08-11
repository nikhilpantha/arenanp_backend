import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { BookingModel } from '../booking/dto/booking.model';
import { SubscriptionModel } from '../subscriptions/dto/subscription.model';

import { CustomerInsightsService } from './customer-insights.service';
import { CustomersService } from './customers.service';
import { VenueCustomerInsightsModel } from './dto/customer-insights.model';
import { CreateVenueCustomerInput, ListVenueCustomersInput } from './dto/customer.inputs';
import { VenueCustomerModel } from './dto/customer.model';

@Resolver(() => VenueCustomerModel)
export class CustomersResolver {
  constructor(
    private readonly service: CustomersService,
    private readonly insights: CustomerInsightsService,
  ) {}

  @Query(() => [VenueCustomerModel], {
    name: 'venueCustomers',
    description: "Search/list a venue's customers (people and teams) with loyalty.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.customers.view')
  venueCustomers(@Args('input') input: ListVenueCustomersInput): Promise<VenueCustomerModel[]> {
    return this.service.listVenueCustomers(input);
  }

  @Query(() => VenueCustomerModel, {
    name: 'venueCustomer',
    description: 'A single venue customer.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.customers.view')
  venueCustomer(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('customerId', { type: () => ID }) customerId: string,
  ): Promise<VenueCustomerModel> {
    return this.service.getOne(venueId, customerId);
  }

  @Query(() => [BookingModel], {
    name: 'venueCustomerBookings',
    description:
      "A page of a customer's bookings (most recent first) — the detail screen lists every game individually.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.customers.view')
  venueCustomerBookings(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('customerId', { type: () => ID }) customerId: string,
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 50 }) limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 }) offset: number,
  ): Promise<BookingModel[]> {
    return this.service.getCustomerBookings(
      venueId,
      customerId,
      Math.min(Math.max(limit, 1), 100),
      Math.max(offset, 0),
    );
  }

  @Query(() => VenueCustomerInsightsModel, {
    name: 'venueCustomerInsights',
    description:
      "A customer's play history at this venue, aggregated: loyalty standing, spend, reliability and playing preferences.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.customers.view')
  venueCustomerInsights(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('customerId', { type: () => ID }) customerId: string,
  ): Promise<VenueCustomerInsightsModel> {
    return this.insights.getInsights(venueId, customerId);
  }

  @Query(() => [SubscriptionModel], {
    name: 'venueCustomerSubscriptions',
    description: "A customer's memberships (most recent first), for the unified profile.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.customers.view')
  venueCustomerSubscriptions(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('customerId', { type: () => ID }) customerId: string,
  ): Promise<SubscriptionModel[]> {
    return this.service.getCustomerSubscriptions(venueId, customerId);
  }

  @Mutation(() => VenueCustomerModel, {
    name: 'createVenueCustomer',
    description: 'Create (or reuse, by phone) a venue customer.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.bookings.manage')
  createVenueCustomer(@Args('input') input: CreateVenueCustomerInput): Promise<VenueCustomerModel> {
    return this.service.create(input);
  }
}
