import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';

import { AdminUser } from '../users/dto/admin-user.model';
import { OrganizerVerificationService } from './organizer-verification.service';
import { ListOrganizerVerificationRequestsInput } from './dto/list-organizer-verification-requests.input';
import { PaginatedOrganizerVerificationRequests } from './dto/paginated-organizer-verification-requests';
import { OrganizerVerificationRequestModel } from './dto/organizer-verification-request.model';
import {
  ApproveOrganizerVerificationInput,
  RejectOrganizerVerificationInput,
} from './dto/reject-organizer-verification.input';

@Resolver(() => OrganizerVerificationRequestModel)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class OrganizerVerificationResolver {
  constructor(
    private readonly service: OrganizerVerificationService,
    private readonly storage: StorageService,
  ) {}

  /** Presign the stored KYC document keys into temporary download URLs for the admin. */
  @ResolveField(() => [String])
  documentUrls(@Parent() req: OrganizerVerificationRequestModel): Promise<string[]> {
    return this.storage.getDownloadUrls(req.documentUrls);
  }

  @Query(() => PaginatedOrganizerVerificationRequests, {
    name: 'adminListOrganizerVerificationRequests',
    description: 'List organizer-verification submissions with optional status / search filters.',
  })
  list(
    @Args('input', { type: () => ListOrganizerVerificationRequestsInput, nullable: true })
    input?: ListOrganizerVerificationRequestsInput,
  ): Promise<PaginatedOrganizerVerificationRequests> {
    return this.service.list(input ?? new ListOrganizerVerificationRequestsInput());
  }

  @Query(() => OrganizerVerificationRequestModel, {
    name: 'adminOrganizerVerificationRequest',
    description: 'Single organizer-verification submission with submitted info + reviewer.',
  })
  getOne(@Args('id', { type: () => ID }) id: string): Promise<OrganizerVerificationRequestModel> {
    return this.service.getOne(id);
  }

  @Mutation(() => OrganizerVerificationRequestModel, {
    name: 'adminApproveOrganizerVerification',
    description: 'Approve a pending organizer-verification request.',
  })
  approve(
    @Args('input') input: ApproveOrganizerVerificationInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<OrganizerVerificationRequestModel> {
    return this.service.approve(input, actor);
  }

  @Mutation(() => OrganizerVerificationRequestModel, {
    name: 'adminRejectOrganizerVerification',
    description: 'Reject a pending organizer-verification request with a reason.',
  })
  reject(
    @Args('input') input: RejectOrganizerVerificationInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<OrganizerVerificationRequestModel> {
    return this.service.reject(input, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminSuspendOrganizerAccess',
    description: 'Suspend organizer access on a user (organizerStatus -> SUSPENDED).',
  })
  suspend(
    @Args('userId', { type: () => ID }) userId: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminUser> {
    return this.service.suspendAccess(userId, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminReinstateOrganizerAccess',
    description: 'Reinstate organizer access on a previously-suspended user.',
  })
  reinstate(@Args('userId', { type: () => ID }) userId: string): Promise<AdminUser> {
    return this.service.reinstateAccess(userId);
  }
}
