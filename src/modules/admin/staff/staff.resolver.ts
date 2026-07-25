import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequireStaffPermission } from '../../../common/decorators/platform-staff.decorator';
import { AuthUser } from '../../../common/types/auth-context';
import { StaffService } from './staff.service';
import {
  StaffMember,
  StaffPermissions,
  ListStaffOutput,
  CreateStaffInput,
  ChangeStaffRoleInput,
  GrantPermissionOverrideInput,
  ListStaffInput,
} from './dto/staff.dto';
import { User, PermissionOverride } from '@prisma/client';

@Resolver(() => StaffMember)
export class StaffResolver {
  constructor(private readonly staffService: StaffService) {}

  /**
   * List all staff members (paginated).
   * Only accessible to SUPER_ADMIN.
   */
  @Query(() => ListStaffOutput)
  @RequireStaffPermission('admin:staff')
  async listStaff(
    @Args('input', { nullable: true }) input: ListStaffInput,
    @CurrentUser() user: AuthUser,
  ): Promise<ListStaffOutput> {
    return this.staffService.listStaff(input || {});
  }

  /**
   * Get detailed permissions for a staff member.
   * Only accessible to SUPER_ADMIN.
   */
  @Query(() => StaffPermissions)
  @RequireStaffPermission('admin:staff')
  async getStaffPermissions(
    @Args('userId') userId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<any> {
    const result = await this.staffService.getStaffPermissions(userId);
    return {
      baseRole: result.baseRole,
      permissions: result.permissions,
      overrides: result.overrides.map((o) => ({
        permission: o.permission,
        action: o.action,
        reason: o.reason,
        expiresAt: o.expiresAt,
      })),
    };
  }

  /**
   * Create a new staff member.
   * Only accessible to SUPER_ADMIN.
   */
  @Mutation(() => StaffMember)
  @RequireStaffPermission('admin:staff')
  async createStaff(
    @Args('input') input: CreateStaffInput,
    @CurrentUser() user: AuthUser,
  ): Promise<any> {
    const created = await this.staffService.createStaff(input);
    return {
      id: created.id,
      phoneNumber: created.phoneNumber,
      fullName: created.fullName,
      email: created.email,
      role: created.role,
      isActive: created.isActive,
      createdAt: created.createdAt,
      overrideCount: 0,
    };
  }

  /**
   * Change a staff member's role (triggers re-login).
   * Only accessible to SUPER_ADMIN.
   */
  @Mutation(() => StaffMember)
  @RequireStaffPermission('admin:staff')
  async changeStaffRole(
    @Args('userId') userId: string,
    @Args('input') input: ChangeStaffRoleInput,
    @CurrentUser() user: AuthUser,
  ): Promise<any> {
    const updated = await this.staffService.changeStaffRole(userId, input);
    return {
      id: updated.id,
      phoneNumber: updated.phoneNumber,
      fullName: updated.fullName,
      email: updated.email,
      role: updated.role,
      isActive: updated.isActive,
      createdAt: updated.createdAt,
      overrideCount: 0,
    };
  }

  /**
   * Grant or revoke a permission override for a staff member.
   * Only accessible to SUPER_ADMIN.
   */
  @Mutation(() => String)
  @RequireStaffPermission('admin:staff')
  async grantPermissionOverride(
    @Args('userId') userId: string,
    @Args('input') input: GrantPermissionOverrideInput,
    @CurrentUser() user: AuthUser,
  ): Promise<string> {
    await this.staffService.grantPermissionOverride(userId, input, user.id);
    return `Permission ${input.action}ed for ${userId}`;
  }

  /**
   * Revoke a permission override for a staff member.
   * Only accessible to SUPER_ADMIN.
   */
  @Mutation(() => String)
  @RequireStaffPermission('admin:staff')
  async revokePermissionOverride(
    @Args('userId') userId: string,
    @Args('permission') permission: string,
    @CurrentUser() user: AuthUser,
  ): Promise<string> {
    await this.staffService.revokePermissionOverride(userId, permission);
    return `Permission revoked for ${userId}`;
  }

  /**
   * Suspend a staff member (sets isActive=false and revokes tokens).
   * Only accessible to SUPER_ADMIN.
   */
  @Mutation(() => String)
  @RequireStaffPermission('admin:staff')
  async suspendStaff(
    @Args('userId') userId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<string> {
    await this.staffService.suspendStaff(userId);
    return `Staff member ${userId} suspended`;
  }

  /**
   * Unsuspend a staff member (sets isActive=true).
   * Only accessible to SUPER_ADMIN.
   */
  @Mutation(() => String)
  @RequireStaffPermission('admin:staff')
  async unsuspendStaff(
    @Args('userId') userId: string,
    @CurrentUser() user: AuthUser,
  ): Promise<string> {
    await this.staffService.unsuspendStaff(userId);
    return `Staff member ${userId} unsuspended`;
  }
}
