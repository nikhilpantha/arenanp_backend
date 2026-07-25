import { Injectable } from '@nestjs/common';
import { User, UserRole, OverrideAction, PermissionOverride, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import {
  CreateStaffInput,
  ChangeStaffRoleInput,
  GrantPermissionOverrideInput,
  ListStaffInput,
  ListStaffOutput,
} from './dto/staff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new staff member with the given role.
   * Sets isStaff=true, assigns role, creates their profile if needed.
   */
  async createStaff(input: CreateStaffInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        phoneNumber: input.phoneNumber,
        role: input.platformStaffRole,
        isActive: true,
        tokenVersion: 1,
      },
    });
  }

  /**
   * Change a staff member's role and force re-login by bumping tokenVersion.
   */
  async changeStaffRole(userId: string, input: ChangeStaffRoleInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        role: input.newRole,
        tokenVersion: { increment: 1 }, // Revoke all existing tokens
      },
    });
  }

  /**
   * Grant or revoke a specific permission for a staff member.
   * If a record with the same permission already exists, it's replaced.
   */
  async grantPermissionOverride(
    userId: string,
    input: GrantPermissionOverrideInput,
    grantedById: string,
  ): Promise<PermissionOverride> {
    return this.prisma.permissionOverride.upsert({
      where: {
        userId_permission: { userId, permission: input.permission },
      },
      create: {
        userId,
        permission: input.permission,
        action: input.action,
        grantedById,
        expiresAt: input.expiresAt || null,
        reason: input.reason,
      },
      update: {
        action: input.action,
        grantedById,
        grantedAt: new Date(),
        expiresAt: input.expiresAt || null,
        reason: input.reason,
      },
    });
  }

  /**
   * Revoke (delete) a permission override for a staff member.
   */
  async revokePermissionOverride(userId: string, permission: string): Promise<void> {
    await this.prisma.permissionOverride.deleteMany({
      where: { userId, permission },
    });
  }

  /**
   * Suspend a staff member (sets isActive=false and revokes all tokens).
   */
  async suspendStaff(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isActive: false,
        tokenVersion: { increment: 1 }, // Revoke all existing tokens
      },
    });
  }

  /**
   * Unsuspend a staff member (sets isActive=true).
   */
  async unsuspendStaff(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
  }

  /**
   * Get paginated list of all staff members.
   */
  async listStaff(input: ListStaffInput): Promise<ListStaffOutput> {
    const { limit = 50, offset = 0, role, isActive } = input;

    const where: Prisma.UserWhereInput = {
      role: { not: UserRole.USER }, // Only staff
      ...(role && { role }),
      ...(isActive !== undefined && { isActive }),
    };

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          phoneNumber: true,
          fullName: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          permissionOverrides: {
            where: {
              OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
            },
            select: { permission: true, action: true },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      items: items.map((u) => ({
        id: u.id,
        phoneNumber: u.phoneNumber,
        fullName: u.fullName || undefined,
        email: u.email || undefined,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt,
        overrideCount: u.permissionOverrides.length,
      })),
      total,
      limit,
      offset,
    };
  }

  /**
   * Get a staff member's effective permissions (base + active overrides).
   */
  async getStaffPermissions(
    userId: string,
  ): Promise<{ baseRole: UserRole; permissions: string[]; overrides: PermissionOverride[] }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        role: true,
        permissionOverrides: {
          where: {
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
        },
      },
    });

    if (!user || user.role === UserRole.USER) {
      return { baseRole: UserRole.USER, permissions: [], overrides: [] };
    }

    // Get base permissions from STAFF_ROLE_PERMISSIONS
    const { STAFF_ROLE_PERMISSIONS, getEffectiveStaffPermissions } =
      await import('../../../common/constants/staff-permissions');
    const basePerms = STAFF_ROLE_PERMISSIONS[user.role] || [];
    const effectivePerms = getEffectiveStaffPermissions(user.role, user.permissionOverrides);

    return {
      baseRole: user.role,
      permissions: effectivePerms,
      overrides: user.permissionOverrides,
    };
  }
}
