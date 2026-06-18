import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { CustomersRepository } from './customers.repository';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';

/**
 * Venue customers, derived from bookings (no Customer table — loyalty is keyed by
 * phone for walk-ins and by userId for registered players). Read-only aggregate.
 */
@Module({
  providers: [CustomersResolver, CustomersService, CustomersRepository, VenuePermissionGuard],
})
export class CustomersModule {}
