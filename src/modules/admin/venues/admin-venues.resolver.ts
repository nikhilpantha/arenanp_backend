import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';

import { AdminVenuesService } from './admin-venues.service';
import { AdminCourt, AdminVenue } from './dto/admin-venue.model';
import { ListAdminVenuesInput } from './dto/list-admin-venues.input';
import { PaginatedAdminVenues } from './dto/paginated-admin-venues';
import {
  RejectVenueInput,
  SuspendVenueInput,
  UpdateVenueVerificationStatusInput,
} from './dto/venue-action.inputs';

@Resolver(() => AdminVenue)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminVenuesResolver {
  constructor(
    private readonly service: AdminVenuesService,
    private readonly storage: StorageService,
  ) {}

  // The stored values are S3 object keys; presign them into download URLs on read.
  @ResolveField(() => String, { nullable: true })
  coverImageUrl(@Parent() venue: AdminVenue): Promise<string | null> {
    return this.storage.getDownloadUrl(venue.coverImageUrl);
  }

  @ResolveField(() => [String])
  imageUrls(@Parent() venue: AdminVenue): Promise<string[]> {
    return this.storage.getDownloadUrls(venue.imageUrls);
  }

  @ResolveField(() => [String])
  documentUrls(@Parent() venue: AdminVenue): Promise<string[]> {
    return this.storage.getDownloadUrls(venue.documentUrls);
  }

  @Query(() => PaginatedAdminVenues, {
    name: 'adminListVenues',
    description:
      'List venues with pagination, search, and city / sport / status / featured filters.',
  })
  list(
    @Args('input', { type: () => ListAdminVenuesInput, nullable: true })
    input?: ListAdminVenuesInput,
  ): Promise<PaginatedAdminVenues> {
    return this.service.list(input ?? new ListAdminVenuesInput());
  }

  @Query(() => AdminVenue, {
    name: 'adminVenueDetail',
    description: 'Single venue with owner, courts, gallery and review trail.',
  })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminVenue> {
    return this.service.getOne(id);
  }

  @Mutation(() => AdminVenue, { name: 'adminApproveVenue' })
  approve(
    @Args('venueId', { type: () => ID }) venueId: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminVenue> {
    return this.service.approve(venueId, actor);
  }

  @Mutation(() => AdminVenue, { name: 'adminRejectVenue' })
  reject(
    @Args('input') input: RejectVenueInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminVenue> {
    return this.service.reject(input, actor);
  }

  @Mutation(() => AdminVenue, { name: 'adminSuspendVenue' })
  suspend(
    @Args('input') input: SuspendVenueInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminVenue> {
    return this.service.suspend(input, actor);
  }

  @Mutation(() => AdminVenue, { name: 'adminFeatureVenue' })
  feature(@Args('venueId', { type: () => ID }) venueId: string): Promise<AdminVenue> {
    return this.service.setFeatured(venueId, true);
  }

  @Mutation(() => AdminVenue, { name: 'adminUnfeatureVenue' })
  unfeature(@Args('venueId', { type: () => ID }) venueId: string): Promise<AdminVenue> {
    return this.service.setFeatured(venueId, false);
  }

  @Mutation(() => AdminVenue, {
    name: 'adminUpdateVenueVerificationStatus',
    description: 'Generic verification-status setter; useful for bulk-status flows.',
  })
  updateStatus(
    @Args('input') input: UpdateVenueVerificationStatusInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminVenue> {
    return this.service.updateVerificationStatus(input, actor);
  }
}

/** Presigns admin court image keys into download URLs wherever an AdminCourt is returned. */
@Resolver(() => AdminCourt)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminCourtResolver {
  constructor(private readonly storage: StorageService) {}

  @ResolveField(() => [String])
  imageUrls(@Parent() court: AdminCourt): Promise<string[]> {
    return this.storage.getDownloadUrls(court.imageUrls);
  }
}
