import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CapabilityType } from '@prisma/client';

import { RequireCapability } from '../../common/decorators/capability.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/types/auth-context';

import { BookingService } from './booking.service';
import {
  CancelMyBookingInput,
  CreateBookingInput,
  MyBookingsInput,
} from './dto/player-booking.inputs';
import { PaginatedPlayerBookings, PlayerBookingModel } from './dto/player-booking.model';

/**
 * Player-side booking: browse-then-book lands here. Gated by the PLAYER capability
 * (CapabilityGuard is global, so the decorator alone enforces it). New bookings start
 * PENDING_PAYMENT and wait for the venue to accept them.
 */
@Resolver(() => PlayerBookingModel)
export class PlayerBookingResolver {
  constructor(private readonly service: BookingService) {}

  @Query(() => PaginatedPlayerBookings, {
    name: 'myBookings',
    description: "The signed-in player's bookings, most recent first.",
  })
  @RequireCapability(CapabilityType.PLAYER)
  myBookings(
    @Args('input') input: MyBookingsInput,
    @CurrentUser() user: AuthUser,
  ): Promise<PaginatedPlayerBookings> {
    return this.service.myBookings(input, user.id);
  }

  @Mutation(() => PlayerBookingModel, {
    name: 'createBooking',
    description: 'Book a court slot as a player. Starts PENDING until the venue accepts.',
  })
  @RequireCapability(CapabilityType.PLAYER)
  createBooking(
    @Args('input') input: CreateBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<PlayerBookingModel> {
    return this.service.createBooking(input, user.id);
  }

  @Mutation(() => PlayerBookingModel, {
    name: 'cancelMyBooking',
    description: 'Cancel one of your own bookings (only before it reaches a terminal state).',
  })
  @RequireCapability(CapabilityType.PLAYER)
  cancelMyBooking(
    @Args('input') input: CancelMyBookingInput,
    @CurrentUser() user: AuthUser,
  ): Promise<PlayerBookingModel> {
    return this.service.cancelMyBooking(input, user.id);
  }
}
