import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { CustomersRepository } from './customers.repository';
import { CustomersResolver } from './customers.resolver';
import { CustomersService } from './customers.service';

/**
 * Venue customers — the per-venue CRM (`Customer` table). A customer is a walk-in
 * (manual name/phone) or an app player linked via `Customer.userId`; loyalty is keyed
 * by `customerId`. Exports the repository so the booking + subscription flows can
 * get-or-create the player's customer (`getOrCreateForUser`).
 */
@Module({
  providers: [CustomersResolver, CustomersService, CustomersRepository, VenuePermissionGuard],
  exports: [CustomersRepository],
})
export class CustomersModule {}
