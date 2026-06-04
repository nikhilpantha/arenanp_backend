import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminUsersService } from './admin-users.service';
import { AdminUser, AdminUserDetail } from './dto/admin-user.model';
import { ListAdminUsersInput } from './dto/list-admin-users.input';
import { PaginatedAdminUsers } from './dto/paginated-admin-users';
import { UpdateUserRoleInput } from './dto/update-user-role.input';

@Resolver(() => AdminUser)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminUsersResolver {
  constructor(private readonly service: AdminUsersService) {}

  @Query(() => PaginatedAdminUsers, {
    name: 'adminListUsers',
    description: 'List platform users with pagination, search and filters.',
  })
  listUsers(
    @Args('input', { type: () => ListAdminUsersInput, nullable: true })
    input?: ListAdminUsersInput,
  ): Promise<PaginatedAdminUsers> {
    return this.service.listUsers(input ?? new ListAdminUsersInput());
  }

  @Query(() => AdminUserDetail, {
    name: 'adminUserDetail',
    description: 'Full detail payload for a single user.',
  })
  userDetail(@Args('id', { type: () => ID }) id: string): Promise<AdminUserDetail> {
    return this.service.getUserDetail(id);
  }

  @Mutation(() => AdminUser, {
    name: 'adminSuspendUser',
    description: 'Suspend a user (sets isActive=false).',
  })
  suspendUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminUser> {
    return this.service.setActive(id, false, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminUnsuspendUser',
    description: 'Reactivate a previously suspended user (sets isActive=true).',
  })
  unsuspendUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminUser> {
    return this.service.setActive(id, true, actor);
  }

  @Mutation(() => AdminUser, {
    name: 'adminUpdateUserRole',
    description: 'Update a user’s platform role (USER / SUPER_ADMIN).',
  })
  updateUserRole(
    @Args('input') input: UpdateUserRoleInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminUser> {
    return this.service.updateRole(input, actor);
  }
}
