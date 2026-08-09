import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { AdminUsersRepository } from './admin-users.repository';
import { AdminUser, AdminUserDetail, mapPrismaUserToAdmin } from './dto/admin-user.model';
import { ListAdminUsersInput } from './dto/list-admin-users.input';
import { PaginatedAdminUsers } from './dto/paginated-admin-users';
import { UpdateUserRoleInput } from './dto/update-user-role.input';
import { buildPageInfo } from '../../../common/dto/pagination.input';
import { PermissionResolverService } from '../../rbac/permission-resolver.service';
import type { AuthUser } from '../../../common/types/auth-context';

@Injectable()
export class AdminUsersService {
  constructor(
    private readonly repo: AdminUsersRepository,
    private readonly permissions: PermissionResolverService,
  ) {}

  async listUsers(input: ListAdminUsersInput): Promise<PaginatedAdminUsers> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;

    const { items, total } = await this.repo.listAndCount(input);

    return {
      items: items.map(mapPrismaUserToAdmin),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getUserDetail(id: string): Promise<AdminUserDetail> {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    // Related collections (bookings / payments / teams) land with their owning
    // modules. Until then we return safe zero/empty values so the detail UI works.
    return {
      user: mapPrismaUserToAdmin(user),
      bookingsCount: 0,
      totalSpent: 0,
      recentBookings: [],
      recentPayments: [],
      teams: [],
    };
  }

  async setActive(id: string, isActive: boolean, actor: AuthUser): Promise<AdminUser> {
    const target = await this.repo.findById(id);
    if (!target) throw new NotFoundException('User not found');
    if (target.id === actor.id) {
      throw new BadRequestException('You cannot change the active state of your own account.');
    }
    if (target.isActive === isActive) return mapPrismaUserToAdmin(target);

    // Suspending the last super admin empties the set just as surely as
    // demoting them — a suspended account holds no permissions.
    if (!isActive && target.role === UserRole.SUPER_ADMIN) {
      const remaining = await this.repo.countSuperAdmins();
      if (remaining <= 1) {
        throw new ConflictException(
          'This is the last active super admin. Promote another account before suspending this one.',
        );
      }
    }

    const updated = await this.repo.setActive(id, isActive);
    await this.permissions.invalidateUser(id);
    return mapPrismaUserToAdmin(updated);
  }

  /**
   * Change a user's platform role marker.
   *
   * Demoting revokes staff access outright — see `AdminUsersRepository.setRole`.
   * Two guards stand in the way of locking everyone out: you cannot demote
   * yourself, and you cannot remove the last super admin.
   */
  async updateRole(input: UpdateUserRoleInput, actor: AuthUser): Promise<AdminUser> {
    const target = await this.repo.findById(input.userId);
    if (!target) throw new NotFoundException('User not found');
    if (target.id === actor.id && input.role !== UserRole.SUPER_ADMIN) {
      throw new ConflictException('You cannot demote your own super-admin account.');
    }
    if (target.role === input.role) return mapPrismaUserToAdmin(target);

    // Losing the last super admin means nobody holds the wildcard, and no one
    // can grant it back — the platform would need a DB edit to recover.
    if (target.role === UserRole.SUPER_ADMIN && input.role !== UserRole.SUPER_ADMIN) {
      const remaining = await this.repo.countSuperAdmins();
      if (remaining <= 1) {
        throw new ConflictException(
          'This is the last super admin. Promote another account before demoting this one.',
        );
      }
    }

    const updated = await this.repo.setRole(input.userId, input.role);
    await this.permissions.invalidateUser(input.userId);
    return mapPrismaUserToAdmin(updated);
  }
}
