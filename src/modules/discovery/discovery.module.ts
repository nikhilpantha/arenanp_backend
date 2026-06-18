import { Module } from '@nestjs/common';

import { DiscoveryRepository } from './discovery.repository';
import { DiscoveryResolver, PublicCourtResolver, VenueDetailResolver } from './discovery.resolver';
import { DiscoveryService } from './discovery.service';

/**
 * Player marketplace (read-only): browse approved venues, view a venue's courts,
 * and list a court's bookable slots for a day. StorageService is global, so the
 * resolvers can presign image keys without importing StorageModule.
 */
@Module({
  providers: [
    DiscoveryResolver,
    VenueDetailResolver,
    PublicCourtResolver,
    DiscoveryService,
    DiscoveryRepository,
  ],
})
export class DiscoveryModule {}
