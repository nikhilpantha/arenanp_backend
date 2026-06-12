import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';

import { AdminUser } from '../users/dto/admin-user.model';
import { VenueVerificationService } from './venue-verification.service';
import { ListVenueVerificationRequestsInput } from './dto/list-venue-verification-requests.input';
import { PaginatedVenueVerificationRequests } from './dto/paginated-venue-verification-requests';
import { VenueVerificationRequestModel } from './dto/venue-verification-request.model';
import {
  ApproveVenueVerificationInput,
  RejectVenueVerificationInput,
} from './dto/venue-verification.inputs';

@Resolver(() => VenueVerificationRequestModel)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class VenueVerificationResolver {
  constructor(
    private readonly service: VenueVerificationService,
    private readonly storage: StorageService,
  ) {}

  /** Presign the stored KYC/PAN document keys into temporary download URLs for the admin. */
  @ResolveField(() => [String])
  documentUrls(@Parent() req: VenueVerificationRequestModel): Promise<string[]> {
    return this.storage.getDownloadUrls(req.documentUrls);
  }

  @Query(() => PaginatedVenueVerificationRequests, {
    name: 'adminListVenueVerificationRequests',
    description: 'List venue-verification submissions with optional status / search filters.',
  })
  list(
    @Args('input', { type: () => ListVenueVerificationRequestsInput, nullable: true })
    input?: ListVenueVerificationRequestsInput,
  ): Promise<PaginatedVenueVerificationRequests> {
    return this.service.list(input ?? new ListVenueVerificationRequestsInput());
  }

  @Query(() => VenueVerificationRequestModel, {
    name: 'adminVenueVerificationRequest',
    description: 'Single venue-verification submission with submitted info + reviewer.',
  })
  getOne(@Args('id', { type: () => ID }) id: string): Promise<VenueVerificationRequestModel> {
    return this.service.getOne(id);
  }

  @Mutation(() => VenueVerificationRequestModel, {
    name: 'adminApproveVenueVerification',
    description: 'Approve a pending venue-verification request.',
  })
  approve(
    @Args('input') input: ApproveVenueVerificationInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueVerificationRequestModel> {
    return this.service.approve(input, actor);
  }

  @Mutation(() => VenueVerificationRequestModel, {
    name: 'adminRejectVenueVerification',
    description: 'Reject a pending venue-verification request with a reason.',
  })
  reject(
    @Args('input') input: RejectVenueVerificationInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<VenueVerificationRequestModel> {
    return this.service.reject(input, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminSuspendVenueAccess',
    description: 'Suspend venue access on a user (venueStatus -> SUSPENDED).',
  })
  suspend(
    @Args('userId', { type: () => ID }) userId: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminUser> {
    return this.service.suspendAccess(userId, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminReinstateVenueAccess',
    description: 'Reinstate venue access on a previously-suspended user.',
  })
  reinstate(@Args('userId', { type: () => ID }) userId: string): Promise<AdminUser> {
    return this.service.reinstateAccess(userId);
  }
}
