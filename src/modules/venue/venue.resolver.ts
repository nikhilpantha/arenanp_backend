import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';
import { StorageService } from '../../storage/storage.service';

import { VenueMembershipModel } from './dto/venue-membership.model';
import {
  SetVenueServicesInput,
  SubmitVenueInput,
  UpdateVenueProfileInput,
} from './dto/venue.inputs';
import { VenueCourt, VenueModel } from './dto/venue.model';
import { VenueService } from './venue.service';

@Resolver(() => VenueModel)
export class VenueResolver {
  constructor(
    private readonly service: VenueService,
    private readonly storage: StorageService,
  ) {}

  // The stored values are S3 object keys; presign them into download URLs on read.
  @ResolveField(() => String, { nullable: true })
  coverImageUrl(@Parent() venue: VenueModel): Promise<string | null> {
    return this.storage.getDownloadUrl(venue.coverImageUrl);
  }

  @ResolveField(() => [String])
  imageUrls(@Parent() venue: VenueModel): Promise<string[]> {
    return this.storage.getDownloadUrls(venue.imageUrls);
  }

  @ResolveField(() => [String])
  documentUrls(@Parent() venue: VenueModel): Promise<string[]> {
    return this.storage.getDownloadUrls(venue.documentUrls);
  }

  @Query(() => [VenueModel], {
    name: 'myVenues',
    description: 'Venues the signed-in user operates (any membership).',
  })
  myVenues(@CurrentUser() user: AuthUser): Promise<VenueModel[]> {
    return this.service.myVenues(user.id);
  }

  @Query(() => VenueModel, {
    name: 'myVenue',
    description: 'A single venue the signed-in user is a member of.',
  })
  myVenue(
    @Args('venueId', { type: () => ID }) venueId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<VenueModel> {
    return this.service.myVenue(user.id, venueId);
  }

  @Query(() => [VenueMembershipModel], {
    name: 'myVenueMemberships',
    description: "The signed-in user's venue seats, with effective permissions + listing status.",
  })
  myVenueMemberships(@CurrentUser() user: AuthUser): Promise<VenueMembershipModel[]> {
    return this.service.myMemberships(user.id);
  }

  @Mutation(() => VenueModel, {
    name: 'submitVenue',
    description:
      'Add a venue from the dashboard. Creates the venue as PENDING (a super admin must approve the listing before it goes live) + an OWNER membership + its courts/sports. Requires ≥1 sport with ≥1 court. The VENUE capability is granted at signup and untouched here.',
  })
  submitVenue(
    @Args('input') input: SubmitVenueInput,
    @CurrentUser() user: AuthUser,
  ): Promise<VenueModel> {
    return this.service.submitVenue(user.id, input);
  }

  @Mutation(() => VenueModel, {
    name: 'updateVenueProfile',
    description: 'Update editable venue profile fields. Requires the venue:edit permission.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue:edit')
  updateVenueProfile(@Args('input') input: UpdateVenueProfileInput): Promise<VenueModel> {
    return this.service.updateProfile(input);
  }

  @Mutation(() => VenueModel, {
    name: 'setVenueServices',
    description: "Replace the venue's sports + courts. Requires the venue:edit permission.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue:edit')
  setVenueServices(@Args('input') input: SetVenueServicesInput): Promise<VenueModel> {
    return this.service.setServices(input);
  }
}

/** Presigns court image keys into download URLs wherever a VenueCourt is returned. */
@Resolver(() => VenueCourt)
export class VenueCourtResolver {
  constructor(private readonly storage: StorageService) {}

  @ResolveField(() => [String])
  imageUrls(@Parent() court: VenueCourt): Promise<string[]> {
    return this.storage.getDownloadUrls(court.imageUrls);
  }
}
