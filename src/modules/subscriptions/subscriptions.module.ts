import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import { CustomersModule } from '../customers/customers.module';

import { SubscriptionsRepository } from './subscriptions.repository';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { SubscriptionsService } from './subscriptions.service';

/**
 * Venue memberships: plans (the product) + subscriptions (a customer on a plan)
 * with payment/renewal history. Reads gated by bookings:read, writes by
 * memberships:manage.
 */
@Module({
  imports: [CustomersModule],
  providers: [
    SubscriptionsResolver,
    SubscriptionsService,
    SubscriptionsRepository,
    VenuePermissionGuard,
  ],
})
export class SubscriptionsModule {}
