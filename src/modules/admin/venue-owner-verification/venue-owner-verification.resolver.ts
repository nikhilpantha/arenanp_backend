import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminUser } from '../users/dto/admin-user.model';
import { VenueOwnerVerificationService } from './venue-owner-verification.service';
import { ListVenueOwnerVerificationRequestsInput } from './dto/list-venue-owner-verification-requests.input';
import { PaginatedVenueOwnerVerificationRequests } from './dto/paginated-venue-owner-verification-requests';
import { VenueOwnerVerificationRequestModel } from './dto/venue-owner-verification-request.model';
import {
  ApproveVenueOwnerVerificationInput,
  RejectVenueOwnerVerificationInput,
} from './dto/venue-owner-verification.inputs';

@Resolver(() => VenueOwnerVerificationRequestModel)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class VenueOwnerVerificationResolver {
  constructor(private readonly service: VenueOwnerVerificationService) {}

  @Query(() => PaginatedVenueOwnerVerificationRequests, {
    name: 'adminListVenueOwnerVerificationRequests',
    description: 'List venue-owner-verification submissions with optional status / search filters.',
  })
  list(
    @Args('input', { type: () => ListVenueOwnerVerificationRequestsInput, nullable: true })
    input?: ListVenueOwnerVerificationRequestsInput,
  ): Promise<PaginatedVenueOwnerVerificationRequests> {
    return this.service.list(input ?? new ListVenueOwnerVerificationRequestsInput());
  }

  @Query(() => VenueOwnerVerificationRequestModel, {
    name: 'adminVenueOwnerVerificationRequest',
    description: 'Single venue-owner-verification submission with submitted info + reviewer.',
  })
  getOne(@Args('id', { type: () => ID }) id: string): Promise<VenueOwnerVerificationRequestModel> {
    return this.service.getOne(id);
  }

  @Mutation(() => VenueOwnerVerificationRequestModel, {
    name: 'adminApproveVenueOwnerVerification',
    description: 'Approve a pending venue-owner-verification request.',
  })
  approve(
    @Args('input') input: ApproveVenueOwnerVerificationInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueOwnerVerificationRequestModel> {
    return this.service.approve(input, actor);
  }

  @Mutation(() => VenueOwnerVerificationRequestModel, {
    name: 'adminRejectVenueOwnerVerification',
    description: 'Reject a pending venue-owner-verification request with a reason.',
  })
  reject(
    @Args('input') input: RejectVenueOwnerVerificationInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueOwnerVerificationRequestModel> {
    return this.service.reject(input, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminSuspendVenueOwnerAccess',
    description: 'Suspend venue-owner access on a user (venueOwnerStatus -> SUSPENDED).',
  })
  suspend(
    @Args('userId', { type: () => ID }) userId: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminUser> {
    return this.service.suspendAccess(userId, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminReinstateVenueOwnerAccess',
    description: 'Reinstate venue-owner access on a previously-suspended user.',
  })
  reinstate(@Args('userId', { type: () => ID }) userId: string): Promise<AdminUser> {
    return this.service.reinstateAccess(userId);
  }
}
