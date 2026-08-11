import { Injectable } from '@nestjs/common';
import { CapabilityType, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { AdminUserSortField, SortOrder } from './dto/admin-user.model';
import { ListAdminUsersInput } from './dto/list-admin-users.input';

const USER_INCLUDES = { capabilities: true } as const;
export type UserWithCapabilities = Prisma.UserGetPayload<{ include: typeof USER_INCLUDES }>;

@Injectable()
export class AdminUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<UserWithCapabilities | null> {
    return this.prisma.user.findUnique({ where: { id }, include: USER_INCLUDES });
  }

  /**
   * List users with case-insensitive search and the standard admin filters.
   * Returns total count alongside the page so we can build PageInfo in one round-trip.
   */
  async listAndCount(
    input: ListAdminUsersInput,
  ): Promise<{ items: UserWithCapabilities[]; total: number }> {
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
    const and: Prisma.UserWhereInput[] = [];
    if (input.organizerStatus) {
      and.push({
        capabilities: { some: { type: CapabilityType.ORGANIZER, status: input.organizerStatus } },
      });
    }
    if (input.venueStatus) {
      and.push({
        capabilities: { some: { type: CapabilityType.VENUE, status: input.venueStatus } },
      });
    }
    // Staff are managed under /staff, not in the customer directory. Keyed off
    // the staff tables rather than the `isStaff` flag so the two can never
    // disagree about who is an admin.
    if (!input.includeStaff) {
      and.push({
        systemStaff: { is: null },
        venueStaff: { none: {} },
        organizerStaff: { none: {} },
      });
    }

    if (and.length) where.AND = and;
    if (typeof input.isActive === 'boolean') where.isActive = input.isActive;

    const orderBy = this.buildOrderBy(input.sortBy, input.sortOrder);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        include: USER_INCLUDES,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total };
  }

  setActive(id: string, isActive: boolean): Promise<UserWithCapabilities> {
    // Suspending a user must kill their existing sessions; reactivating doesn't
    // touch tokenVersion (no live tokens exist while inactive anyway).
    return this.prisma.user.update({
      where: { id },
      data: isActive ? { isActive } : { isActive, tokenVersion: { increment: 1 } },
      include: USER_INCLUDES,
    });
  }

  /**
   * Change a user's platform role marker, keeping staff state consistent.
   *
   * Demoting to USER must strip everything that grants access, not just the
   * marker: the `isStaff` flag the admin panel gates on, the scope assignment
   * rows, and every permission grant. Flipping the enum alone would leave a
   * "demoted" account still holding its permissions and still able to open the
   * panel.
   *
   * Role is embedded in the JWT, so tokenVersion rotates either way to force a
   * re-login.
   */
  async setRole(id: string, role: User['role']): Promise<UserWithCapabilities> {
    const becomingStaff = role !== 'USER';

    return this.prisma.$transaction(async (tx) => {
      if (!becomingStaff) {
        await tx.staffPermission.deleteMany({ where: { userId: id } });
        await tx.systemStaff.deleteMany({ where: { userId: id } });
        await tx.venueStaff.deleteMany({ where: { userId: id } });
        await tx.organizerStaff.deleteMany({ where: { userId: id } });
      } else {
        await tx.systemStaff.upsert({
          where: { userId: id },
          update: { status: 'ACTIVE' },
          create: { userId: id, createdBy: id, status: 'ACTIVE' },
        });
      }

      return tx.user.update({
        where: { id },
        data: { role, isStaff: becomingStaff, tokenVersion: { increment: 1 } },
        include: USER_INCLUDES,
      });
    });
  }

  /** How many active super admins exist — used to block removing the last one. */
  countSuperAdmins(): Promise<number> {
    return this.prisma.user.count({ where: { role: 'SUPER_ADMIN', isActive: true } });
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
