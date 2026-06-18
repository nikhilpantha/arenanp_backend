import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import { OffersModule } from '../offers/offers.module';

import { BookingRepository } from './booking.repository';
import { BookingResolver } from './booking.resolver';
import { BookingService } from './booking.service';
import { PlayerBookingResolver } from './player-booking.resolver';

/**
 * Bookings core. The venue panel manages bookings (list, summary, detail, walk-in
 * creation, status transitions, payment, accept/decline) via VenuePermissionGuard;
 * the player panel books slots + reads its own history (PlayerBookingResolver,
 * gated by the PLAYER capability).
 */
@Module({
  imports: [OffersModule],
  providers: [
    BookingResolver,
    PlayerBookingResolver,
    BookingService,
    BookingRepository,
    VenuePermissionGuard,
  ],
})
export class BookingModule {}
