import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';

import { VenueBookingSummary } from './dto/booking-summary.model';
import {
  CompleteVenueBookingInput,
  CreateVenueBookingInput,
  ListVenueBookingsInput,
  RecordBookingPaymentInput,
  SetBookingStatusInput,
  UpdateVenueBookingInput,
} from './dto/booking.inputs';
import { BookingModel } from './dto/booking.model';
import { AcceptVenueBookingInput, DeclineVenueBookingInput } from './dto/player-booking.inputs';
import { BookingService } from './booking.service';

@Resolver(() => BookingModel)
export class BookingResolver {
  constructor(private readonly service: BookingService) {}

  @Query(() => [BookingModel], {
    name: 'venueBookings',
    description: 'Bookings for a venue, filtered by scope (today/upcoming) or a specific date.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueBookings(@Args('input') input: ListVenueBookingsInput): Promise<BookingModel[]> {
    return this.service.list(input);
  }

  @Query(() => VenueBookingSummary, {
    name: 'venueBookingSummary',
    description: "Today's booking overview numbers for a venue.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueBookingSummary(
    @Args('venueId', { type: () => ID }) venueId: string,
  ): Promise<VenueBookingSummary> {
    return this.service.summary(venueId);
  }

  @Query(() => BookingModel, { name: 'venueBooking', description: 'A single booking by id.' })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueBooking(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('bookingId', { type: () => ID }) bookingId: string,
  ): Promise<BookingModel> {
    return this.service.getOne(venueId, bookingId);
  }

  @Mutation(() => BookingModel, {
    name: 'createVenueBooking',
    description: 'Create a walk-in / manual booking from the venue panel.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  createVenueBooking(
    @Args('input') input: CreateVenueBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.create(input, user.id);
  }

  @Mutation(() => BookingModel, {
    name: 'updateVenueBooking',
    description: 'Edit a pending booking — reschedule (court/time/duration) and/or its customer.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  updateVenueBooking(@Args('input') input: UpdateVenueBookingInput): Promise<BookingModel> {
    return this.service.update(input);
  }

  @Mutation(() => BookingModel, {
    name: 'setVenueBookingStatus',
    description: 'Check in / complete / no-show / cancel a booking (writes a status event).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  setVenueBookingStatus(
    @Args('input') input: SetBookingStatusInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.setStatus(input, user.id);
  }

  @Mutation(() => BookingModel, {
    name: 'completeVenueBooking',
    description: 'Complete a booking with add-on extras and final payment (writes a status event).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  completeVenueBooking(
    @Args('input') input: CompleteVenueBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.complete(input, user.id);
  }

  @Mutation(() => BookingModel, {
    name: 'recordVenueBookingPayment',
    description: 'Update a booking’s payment state (paid / pending / partial).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  recordVenueBookingPayment(
    @Args('input') input: RecordBookingPaymentInput,
  ): Promise<BookingModel> {
    return this.service.recordPayment(input);
  }

  @Mutation(() => BookingModel, {
    name: 'acceptVenueBooking',
    description: 'Accept (confirm) a pending online booking.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  acceptVenueBooking(
    @Args('input') input: AcceptVenueBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.acceptBooking(input, user.id);
  }

  @Mutation(() => BookingModel, {
    name: 'declineVenueBooking',
    description: 'Decline (cancel) a pending online booking.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:write')
  declineVenueBooking(
    @Args('input') input: DeclineVenueBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.declineBooking(input, user.id);
  }
}
