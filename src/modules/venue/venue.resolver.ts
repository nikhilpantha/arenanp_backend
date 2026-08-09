import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenueApproved } from '../../common/decorators/capability.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';
import { StorageService } from '../../storage/storage.service';

import { listVenueAmenities, VenueAmenityOption } from './dto/venue-amenity.model';
import { VenueMembershipModel } from './dto/venue-membership.model';
import {
  AddCourtInput,
  RemoveCourtInput,
  SetVenueServicesInput,
  SubmitVenueInput,
  UpdateCourtInput,
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

  @Query(() => [VenueAmenityOption], {
    name: 'venueAmenities',
    description:
      'The closed catalogue of venue-wide amenities. Free text is not accepted — amenities are a marketplace filter, so clients must offer these and store the slug.',
  })
  venueAmenities(): VenueAmenityOption[] {
    return listVenueAmenities();
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

  // Granted APPROVED at venue signup, so this blocks exactly one case: an owner
  // the platform has SUSPENDED opening a fresh venue to carry on under.
  @RequireVenueApproved()
  @Mutation(() => VenueModel, {
    name: 'submitVenue',
    description:
      'Add a venue from the dashboard. Creates the venue as PENDING (a super admin must approve the listing before it goes live) + an OWNER membership + its courts/sports. Requires ≥1 sport with ≥1 court. Requires an approved — not suspended — VENUE capability.',
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
  @RequireVenuePermission('venue.edit')
  updateVenueProfile(@Args('input') input: UpdateVenueProfileInput): Promise<VenueModel> {
    return this.service.updateProfile(input);
  }

  @Mutation(() => VenueModel, {
    name: 'setVenueServices',
    description:
      "Replace the venue's sports + courts wholesale — every court is deleted and recreated, taking its bookings with it. Setup only. To change a live venue's courts use addCourt / updateCourt / removeCourt. Requires the venue:edit permission.",
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.edit')
  setVenueServices(@Args('input') input: SetVenueServicesInput): Promise<VenueModel> {
    return this.service.setServices(input);
  }

  @Mutation(() => VenueCourt, {
    name: 'updateCourt',
    description:
      'Change one court in place — price, slot length, attributes, or whether it takes bookings. A new price applies to bookings made from now on; bookings already taken keep the price they were booked at, so past takings and Finance are untouched. Requires the venue:edit permission.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.edit')
  updateCourt(@Args('input') input: UpdateCourtInput): Promise<VenueCourt> {
    return this.service.updateCourt(input);
  }

  @Mutation(() => VenueModel, {
    name: 'addCourt',
    description:
      'Add one court to an existing venue without disturbing the others. Requires the venue:edit permission.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.edit')
  addCourt(@Args('input') input: AddCourtInput): Promise<VenueModel> {
    return this.service.addCourt(input);
  }

  @Mutation(() => VenueModel, {
    name: 'removeCourt',
    description:
      'Delete a court. Refused once it has bookings or memberships — those cascade, so removing it would erase the income it earned. Switch the court off instead. Requires the venue:edit permission.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('venue.edit')
  removeCourt(@Args('input') input: RemoveCourtInput): Promise<VenueModel> {
    return this.service.removeCourt(input);
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
