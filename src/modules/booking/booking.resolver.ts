import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { canRead, VenueAccess } from '../../common/decorators/venue-access.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser, VenueAccessContext } from '../../common/types/auth-context';

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
  @RequireVenuePermission('venue.bookings.view')
  venueBookings(@Args('input') input: ListVenueBookingsInput): Promise<BookingModel[]> {
    return this.service.list(input);
  }

  @Query(() => VenueBookingSummary, {
    name: 'venueBookingSummary',
    description:
      "Today's booking overview numbers for a venue. `revenueToday` is omitted unless the caller holds 'venue.finance.view'.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.bookings.view')
  venueBookingSummary(
    @Args('venueId', { type: () => ID }) venueId: string,
    @VenueAccess() access: VenueAccessContext | undefined,
  ): Promise<VenueBookingSummary> {
    return this.service.summary(venueId, canRead(access, 'venue.finance.view'));
  }

  @Query(() => BookingModel, { name: 'venueBooking', description: 'A single booking by id.' })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.bookings.view')
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
  @RequireVenuePermission('venue.bookings.manage')
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
  @RequireVenuePermission('venue.bookings.manage')
  updateVenueBooking(@Args('input') input: UpdateVenueBookingInput): Promise<BookingModel> {
    return this.service.update(input);
  }

  @Mutation(() => BookingModel, {
    name: 'setVenueBookingStatus',
    description: 'Check in / complete / no-show / cancel a booking (writes a status event).',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.bookings.manage')
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
  @RequireVenuePermission('venue.bookings.manage')
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
  @RequireVenuePermission('venue.bookings.manage')
  recordVenueBookingPayment(
    @Args('input') input: RecordBookingPaymentInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.recordPayment(input, user.id);
  }

  @Mutation(() => BookingModel, {
    name: 'acceptVenueBooking',
    description:
      'Accept (confirm) a pending online booking. Legacy: player court bookings now confirm ' +
      'instantly, so this only applies to remaining PENDING_PAYMENT rows.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.bookings.manage')
  acceptVenueBooking(
    @Args('input') input: AcceptVenueBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.acceptBooking(input, user.id);
  }

  @Mutation(() => BookingModel, {
    name: 'declineVenueBooking',
    description:
      'Decline (cancel) a pending online booking. Legacy: player court bookings now confirm ' +
      'instantly, so this only applies to remaining PENDING_PAYMENT rows.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.bookings.manage')
  declineVenueBooking(
    @Args('input') input: DeclineVenueBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<BookingModel> {
    return this.service.declineBooking(input, user.id);
  }
}
