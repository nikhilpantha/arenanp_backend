import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { AuthUser } from '../types/auth-context';
import { REQUIRE_STAFF_PERMISSION_KEY } from '../decorators/platform-staff.decorator';
import {
  STAFF_ROLE_PERMISSIONS,
  getEffectiveStaffPermissions,
} from '../constants/staff-permissions';
import { PrismaService } from '../../database/prisma.service';

/**
 * Guard for platform staff endpoint authorization.
 * Checks that the user is staff and has all required permissions.
 * Permissions are computed from role defaults + active overrides.
 *
 * This guard is registered globally in AuthModule and only activates
 * when @RequireStaffPermission() is applied to a method.
 */
@Injectable()
export class PlatformStaffGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required permissions from decorator; if none, skip this guard
    const requiredPermissions = this.reflector.get<string[]>(
      REQUIRE_STAFF_PERMISSION_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // Extract user from request (works for both REST and GraphQL)
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthUser | undefined;

    if (!user) {
      throw new ForbiddenException('Staff access required');
    }

    // Must be a staff member
    if (user.role === UserRole.USER) {
      throw new ForbiddenException('Staff access required');
    }

    // SUPER_ADMIN always has all permissions
    const basePerms = STAFF_ROLE_PERMISSIONS[user.role] || [];
    if (basePerms.includes('*')) {
      return true;
    }

    // For other staff roles, fetch active overrides and compute effective permissions
    const overrides = await this.prisma.permissionOverride.findMany({
      where: {
        userId: user.id,
        OR: [
          { expiresAt: null }, // No expiry
          { expiresAt: { gt: new Date() } }, // Future expiry
        ],
      },
      select: { permission: true, action: true },
    });

    const effectivePerms = getEffectiveStaffPermissions(user.role, overrides);

    // Check all required permissions
    const hasAllPermissions = requiredPermissions.every((perm) => effectivePerms.includes(perm));

    if (!hasAllPermissions) {
      throw new ForbiddenException(
        `Insufficient permissions. Required: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
