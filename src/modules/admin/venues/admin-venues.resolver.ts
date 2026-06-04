import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminVenuesService } from './admin-venues.service';
import { AdminVenue } from './dto/admin-venue.model';
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
  constructor(private readonly service: AdminVenuesService) {}

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
