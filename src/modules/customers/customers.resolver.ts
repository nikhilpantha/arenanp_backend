import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { BookingModel } from '../booking/dto/booking.model';
import { SubscriptionModel } from '../subscriptions/dto/subscription.model';

import { CustomersService } from './customers.service';
import { CreateVenueCustomerInput, ListVenueCustomersInput } from './dto/customer.inputs';
import { VenueCustomerModel } from './dto/customer.model';

@Resolver(() => VenueCustomerModel)
export class CustomersResolver {
  constructor(private readonly service: CustomersService) {}

  @Query(() => [VenueCustomerModel], {
    name: 'venueCustomers',
    description: "Search/list a venue's customers (people and teams) with loyalty.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('customers:read')
  venueCustomers(@Args('input') input: ListVenueCustomersInput): Promise<VenueCustomerModel[]> {
    return this.service.listVenueCustomers(input);
  }

  @Query(() => VenueCustomerModel, {
    name: 'venueCustomer',
    description: 'A single venue customer.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('customers:read')
  venueCustomer(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('customerId', { type: () => ID }) customerId: string,
  ): Promise<VenueCustomerModel> {
    return this.service.getOne(venueId, customerId);
  }

  @Query(() => [BookingModel], {
    name: 'venueCustomerBookings',
    description: "A customer's bookings (most recent first), for the detail history.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('customers:read')
  venueCustomerBookings(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('customerId', { type: () => ID }) customerId: string,
  ): Promise<BookingModel[]> {
    return this.service.getCustomerBookings(venueId, customerId);
  }

  @Query(() => [SubscriptionModel], {
    name: 'venueCustomerSubscriptions',
    description: "A customer's memberships (most recent first), for the unified profile.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('customers:read')
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
  @RequireVenuePermission('customers:read')
  createVenueCustomer(@Args('input') input: CreateVenueCustomerInput): Promise<VenueCustomerModel> {
    return this.service.create(input);
  }
}
