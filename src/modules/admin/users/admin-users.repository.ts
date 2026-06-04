import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { AdminUserSortField, SortOrder } from './dto/admin-user.model';
import { ListAdminUsersInput } from './dto/list-admin-users.input';

@Injectable()
export class AdminUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * List users with case-insensitive search and the standard admin filters.
   * Returns total count alongside the page so we can build PageInfo in one round-trip.
   */
  async listAndCount(input: ListAdminUsersInput): Promise<{ items: User[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;

    const where: Prisma.UserWhereInput = {};
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { fullName: { contains: q, mode: 'insensitive' } },
        { phoneNumber: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (input.role) where.role = input.role;
    if (input.organizerStatus) where.organizerStatus = input.organizerStatus;
    if (input.venueOwnerStatus) where.venueOwnerStatus = input.venueOwnerStatus;
    if (typeof input.isActive === 'boolean') where.isActive = input.isActive;

    const orderBy = this.buildOrderBy(input.sortBy, input.sortOrder);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total };
  }

  setActive(id: string, isActive: boolean): Promise<User> {
    // Suspending a user must kill their existing sessions; reactivating doesn't
    // touch tokenVersion (no live tokens exist while inactive anyway).
    return this.prisma.user.update({
      where: { id },
      data: isActive ? { isActive } : { isActive, tokenVersion: { increment: 1 } },
    });
  }

  setRole(id: string, role: User['role']): Promise<User> {
    // Role is embedded in the JWT — rotate the version so the next request
    // forces a re-login with the new role.
    return this.prisma.user.update({
      where: { id },
      data: { role, tokenVersion: { increment: 1 } },
    });
  }

  private buildOrderBy(
    sortBy: AdminUserSortField | undefined,
    sortOrder: SortOrder | undefined,
  ): Prisma.UserOrderByWithRelationInput {
    const direction: Prisma.SortOrder = sortOrder === SortOrder.ASC ? 'asc' : 'desc';
    switch (sortBy) {
      case AdminUserSortField.FULL_NAME:
        return { fullName: direction };
      case AdminUserSortField.LAST_LOGIN_AT:
        return { lastLoginAt: direction };
      case AdminUserSortField.CREATED_AT:
      default:
        return { createdAt: direction };
    }
  }
}
