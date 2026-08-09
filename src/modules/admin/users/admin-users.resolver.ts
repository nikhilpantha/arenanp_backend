import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';

import { AdminUsersService } from './admin-users.service';
import { AdminUser, AdminUserDetail } from './dto/admin-user.model';
import { ListAdminUsersInput } from './dto/list-admin-users.input';
import { PaginatedAdminUsers } from './dto/paginated-admin-users';
import { UpdateUserRoleInput } from './dto/update-user-role.input';

@Resolver(() => AdminUser)
@RequirePermission('users.view')
export class AdminUsersResolver {
  constructor(
    private readonly service: AdminUsersService,
    private readonly storage: StorageService,
  ) {}

  /** Presign the stored avatar key into a temporary download URL on read. */
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: AdminUser): Promise<string | null> {
    return this.storage.getDownloadUrl(user.avatarUrl);
  }

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

  @RequirePermission('users.suspend')
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

  @RequirePermission('users.activate')
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

  @RequirePermission('permissions.assign')
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
