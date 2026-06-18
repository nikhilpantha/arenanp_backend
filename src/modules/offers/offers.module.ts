import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { OffersRepository } from './offers.repository';
import { OffersResolver } from './offers.resolver';
import { OffersService } from './offers.service';

/**
 * Venue offers (discounts / promo codes). Venue staff manage offers (offers:manage);
 * players read a venue's currently-redeemable offers. `OffersService` is exported so
 * the booking flow can validate + price a promo code at `createBooking`.
 */
@Module({
  providers: [OffersResolver, OffersService, OffersRepository, VenuePermissionGuard],
  exports: [OffersService],
})
export class OffersModule {}
