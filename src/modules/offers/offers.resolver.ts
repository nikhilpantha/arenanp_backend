import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { OffersService } from './offers.service';
import {
  CreateOfferInput,
  ListVenueOffersInput,
  LoyaltyStatusInput,
  UpdateOfferInput,
} from './dto/offer.inputs';
import { LoyaltyStatusModel, OfferModel, PaginatedOffers } from './dto/offer.model';

@Resolver(() => OfferModel)
export class OffersResolver {
  constructor(private readonly service: OffersService) {}

  // ─── Venue management (requires offers:manage) ──────────────────────────────

  @Query(() => PaginatedOffers, {
    name: 'venueOffers',
    description: 'All offers for a venue (management view), paginated.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('offers:manage')
  venueOffers(@Args('input') input: ListVenueOffersInput): Promise<PaginatedOffers> {
    return this.service.listVenueOffers(input);
  }

  @Mutation(() => OfferModel, {
    name: 'createOffer',
    description: 'Create a venue offer / promo code.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('offers:manage')
  createOffer(@Args('input') input: CreateOfferInput): Promise<OfferModel> {
    return this.service.create(input);
  }

  @Mutation(() => OfferModel, {
    name: 'updateOffer',
    description: 'Update / activate / deactivate an offer.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('offers:manage')
  updateOffer(@Args('input') input: UpdateOfferInput): Promise<OfferModel> {
    return this.service.update(input);
  }

  @Mutation(() => OfferModel, { name: 'deleteVenueOffer', description: 'Delete a venue offer.' })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('offers:manage')
  deleteVenueOffer(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('offerId', { type: () => ID }) offerId: string,
  ): Promise<OfferModel> {
    return this.service.remove(venueId, offerId);
  }

  @Query(() => LoyaltyStatusModel, {
    name: 'venueLoyaltyStatus',
    description: "A subject's loyalty progress toward a free game (by customer or phone).",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueLoyaltyStatus(@Args('input') input: LoyaltyStatusInput): Promise<LoyaltyStatusModel> {
    return this.service.getLoyaltyStatus(input);
  }

  // ─── Player-facing ──────────────────────────────────────────────────────────

  @Query(() => [OfferModel], {
    name: 'availableOffers',
    description: 'Currently-redeemable offers for a venue (player view).',
  })
  availableOffers(@Args('venueId', { type: () => ID }) venueId: string): Promise<OfferModel[]> {
    return this.service.availableOffers(venueId);
  }
}
