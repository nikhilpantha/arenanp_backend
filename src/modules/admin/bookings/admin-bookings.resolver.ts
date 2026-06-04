import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminBookingsService } from './admin-bookings.service';
import { AdminBooking } from './dto/admin-booking.model';
import { ListAdminBookingsInput } from './dto/list-admin-bookings.input';
import { PaginatedAdminBookings } from './dto/paginated-admin-bookings';
import { CancelBookingByAdminInput, MarkBookingCompletedInput } from './dto/booking-action.inputs';

@Resolver(() => AdminBooking)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminBookingsResolver {
  constructor(private readonly service: AdminBookingsService) {}

  @Query(() => PaginatedAdminBookings, {
    name: 'adminListBookings',
    description: 'List bookings with date / venue / sport / status / payment-provider filters.',
  })
  list(
    @Args('input', { type: () => ListAdminBookingsInput, nullable: true })
    input?: ListAdminBookingsInput,
  ): Promise<PaginatedAdminBookings> {
    return this.service.list(input ?? new ListAdminBookingsInput());
  }

  @Query(() => AdminBooking, {
    name: 'adminBookingDetail',
    description: 'Full detail for a single booking — user, venue, court, payment and timeline.',
  })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminBooking> {
    return this.service.getOne(id);
  }

  @Mutation(() => AdminBooking, {
    name: 'adminCancelBooking',
    description: 'Cancel a booking on the user’s behalf. A reason is required.',
  })
  cancel(
    @Args('input') input: CancelBookingByAdminInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminBooking> {
    return this.service.cancel(input, actor);
  }

  @Mutation(() => AdminBooking, {
    name: 'adminMarkBookingCompleted',
    description: 'Mark a paid / CONFIRMED booking as COMPLETED.',
  })
  complete(
    @Args('input') input: MarkBookingCompletedInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminBooking> {
    return this.service.markCompleted(input, actor);
  }
}
