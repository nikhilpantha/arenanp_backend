import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PermissionScopeType } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { AuthUser } from '../../../common/types/auth-context';
import { StaffService } from './staff.service';
import {
  CreateStaffInput,
  ListStaffInput,
  ListStaffOutput,
  StaffMember,
  StaffPermissionsView,
} from './dto/staff.dto';

@Resolver(() => StaffMember)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  /** List platform, venue and tournament admins with their scopes. */
  @Query(() => ListStaffOutput)
  @RequirePermission('staff.view')
  async listStaff(
    @Args('input', { nullable: true }) input: ListStaffInput,
  ): Promise<ListStaffOutput> {
    return this.staffService.listStaff(input || {});
  }

  /** A staff member's grants and effective permissions within one scope. */
  @Query(() => StaffPermissionsView)
  @RequirePermission('permissions.view')
  async getStaffPermissions(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('scopeType', { type: () => PermissionScopeType }) scopeType: PermissionScopeType,
    @Args('scopeId', { type: () => ID, nullable: true }) scopeId?: string,
  ): Promise<StaffPermissionsView> {
    return this.staffService.getStaffPermissions(userId, scopeType, scopeId);
  }

  /**
   * Create a staff member as an admin of one scope. Permissions are granted
   * separately — pass `permissionKeys` to seed an initial set.
   */
  @Mutation(() => StaffMember)
  @RequirePermission('staff.create')
  async createStaff(
    @Args('input') input: CreateStaffInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<StaffMember> {
    const created = await this.staffService.createStaff(input, actor.id);

    return {
      id: created.id,
      phoneNumber: created.phoneNumber,
      fullName: created.fullName,
      email: created.email,
      role: created.role,
      // The caller refetches the list to pick up the assignment; returning an
      // empty array is honest about what this write actually returned.
      assignments: [],
      isActive: created.isActive,
      createdAt: created.createdAt,
    };
  }

  /** Suspend a staff member (isActive=false, tokens revoked). */
  @Mutation(() => String)
  @RequirePermission('staff.suspend')
  async suspendStaff(@Args('userId', { type: () => ID }) userId: string): Promise<string> {
    await this.staffService.suspendStaff(userId);
    return `Staff member ${userId} suspended`;
  }

  /** Restore a suspended staff member. */
  @Mutation(() => String)
  @RequirePermission('staff.activate')
  async unsuspendStaff(@Args('userId', { type: () => ID }) userId: string): Promise<string> {
    await this.staffService.unsuspendStaff(userId);
    return `Staff member ${userId} unsuspended`;
  }
}
