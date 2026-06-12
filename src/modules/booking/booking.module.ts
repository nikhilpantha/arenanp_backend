import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { BookingRepository } from './booking.repository';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';

/**
 * Bookings core — the venue panel's central entity. Powers the bookings list,
 * summary, detail, walk-in creation, status transitions and payment recording.
 * All operations are venue-scoped via VenuePermissionGuard.
 */
@Module({
  providers: [BookingResolver, BookingService, BookingRepository, VenuePermissionGuard],
})
export class BookingModule {}
