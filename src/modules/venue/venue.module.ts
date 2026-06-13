import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { VenueRepository } from './venue.repository';
import { VenueCourtResolver, VenueResolver } from './venue.resolver';
import { VenueService } from './venue.service';

/**
 * Venue self-service module — the venue-side counterpart to admin/venues.
 * Lets an authenticated user submit a venue for review, read their own venues +
 * memberships, and (with venue:edit) manage the profile + services.
 */
@Module({
  providers: [
    VenueResolver,
    VenueCourtResolver,
    VenueService,
    VenueRepository,
    VenuePermissionGuard,
  ],
})
export class VenueModule {}
