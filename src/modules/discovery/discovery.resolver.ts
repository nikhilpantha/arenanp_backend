import { Args, ID, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { StorageService } from '../../storage/storage.service';

import { DiscoveryService } from './discovery.service';
import { BrowseVenuesInput, CourtSlotsInput } from './dto/discovery.inputs';
import { PaginatedVenues } from './dto/paginated-venues';
import { CourtSlots } from './dto/slot.model';
import { PublicCourt } from './dto/venue-detail.model';
import { VenueCard } from './dto/venue-card.model';
import { VenueDetail } from './dto/venue-detail.model';

/** Player marketplace: browse approved venues. Presigns the list cover images. */
@Resolver(() => VenueCard)
export class DiscoveryResolver {
  constructor(
    private readonly service: DiscoveryService,
    private readonly storage: StorageService,
  ) {}

  @Query(() => PaginatedVenues, {
    name: 'venues',
    description: 'Browse approved venues (player marketplace), filtered + paginated.',
  })
  venues(@Args('input') input: BrowseVenuesInput): Promise<PaginatedVenues> {
    return this.service.browseVenues(input);
  }

  @Query(() => CourtSlots, {
    name: 'courtSlots',
    description: 'Bookable slots for a court on a venue-local day (booked/past flagged).',
  })
  courtSlots(@Args('input') input: CourtSlotsInput): Promise<CourtSlots> {
    return this.service.courtSlots(input);
  }

  @ResolveField(() => String, { nullable: true })
  coverImageUrl(@Parent() v: VenueCard): Promise<string | null> {
    return this.storage.getDownloadUrl(v.coverImageUrl);
  }
}

/** Public venue detail; presigns the cover + gallery images. */
@Resolver(() => VenueDetail)
export class VenueDetailResolver {
  constructor(
    private readonly service: DiscoveryService,
    private readonly storage: StorageService,
  ) {}

  @Query(() => VenueDetail, { name: 'venue', description: 'Public venue detail with its courts.' })
  venue(@Args('venueId', { type: () => ID }) venueId: string): Promise<VenueDetail> {
    return this.service.venueDetail(venueId);
  }

  @ResolveField(() => String, { nullable: true })
  coverImageUrl(@Parent() v: VenueDetail): Promise<string | null> {
    return this.storage.getDownloadUrl(v.coverImageUrl);
  }

  @ResolveField(() => [String])
  imageUrls(@Parent() v: VenueDetail): Promise<string[]> {
    return this.storage.getDownloadUrls(v.imageUrls);
  }
}

/** Presigns court gallery images wherever a PublicCourt is returned. */
@Resolver(() => PublicCourt)
export class PublicCourtResolver {
  constructor(private readonly storage: StorageService) {}

  @ResolveField(() => [String])
  imageUrls(@Parent() court: PublicCourt): Promise<string[]> {
    return this.storage.getDownloadUrls(court.imageUrls);
  }
}
