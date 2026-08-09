import { Injectable, Logger } from '@nestjs/common';
import { PermissionScopeType, UserRole } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { RedisService } from '../../redis/redis.service';
import { WILDCARD_PERMISSION } from '../../common/constants/permission-keys';

/**
 * Resolves what a staff member may do.
 *
 * There are no roles — a user's permissions are exactly the grants recorded
 * against them in `staff_permissions`, scoped to the platform, a venue, or a
 * tournament. Expired grants are ignored.
 *
 * Results are cached in Redis per (user, scope) for `CACHE_TTL`. Every mutation
 * that can change access calls `invalidateUser`.
 */
@Injectable()
export class PermissionResolverService {
  private readonly logger = new Logger(PermissionResolverService.name);

  private readonly CACHE_TTL = 5 * 60; // seconds
  private readonly cacheKey = (userId: string, scopeType: string, scopeId: string) =>
    `perm:${userId}:${scopeType}:${scopeId}`;
  private readonly userKeyPattern = (userId: string) => `perm:${userId}:*`;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  /**
   * Platform-wide permissions for a user.
   *
   * Returns `['*']` for holders of the legacy `SUPER_ADMIN` enum value. That
   * bypass is deliberate: it guarantees a super admin cannot lock themselves
   * — or everyone — out of permission management by saving an empty set.
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    return this.resolve(userId, PermissionScopeType.PLATFORM, '');
  }

  /** Permissions a user holds at one specific venue. */
  async getVenueUserPermissions(userId: string, venueId: string): Promise<string[]> {
    return this.resolve(userId, PermissionScopeType.VENUE, venueId);
  }

  /** Permissions a user holds at one specific tournament. */
  async getTournamentUserPermissions(userId: string, tournamentId: string): Promise<string[]> {
    return this.resolve(userId, PermissionScopeType.TOURNAMENT, tournamentId);
  }

  /** True when the user holds `permissionKey` platform-wide (or the wildcard). */
  async userHasPermission(userId: string, permissionKey: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(WILDCARD_PERMISSION) || permissions.includes(permissionKey);
  }

  /** True when the user holds every key in `permissionKeys` (or the wildcard). */
  async userHasAllPermissions(userId: string, permissionKeys: string[]): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    if (permissions.includes(WILDCARD_PERMISSION)) return true;
    return permissionKeys.every((key) => permissions.includes(key));
  }

  /** True when the user holds `permissionKey` at `venueId` (or the wildcard). */
  async venueUserHasPermission(
    userId: string,
    venueId: string,
    permissionKey: string,
  ): Promise<boolean> {
    const permissions = await this.getVenueUserPermissions(userId, venueId);
    return permissions.includes(WILDCARD_PERMISSION) || permissions.includes(permissionKey);
  }

  /** True when the user holds `permissionKey` at `tournamentId` (or the wildcard). */
  async tournamentUserHasPermission(
    userId: string,
    tournamentId: string,
    permissionKey: string,
  ): Promise<boolean> {
    const permissions = await this.getTournamentUserPermissions(userId, tournamentId);
    return permissions.includes(WILDCARD_PERMISSION) || permissions.includes(permissionKey);
  }

  /** Drop every cached scope for one user. */
  async invalidateUser(userId: string): Promise<void> {
    try {
      await this.redis.deleteByPattern(this.userKeyPattern(userId));
    } catch (error) {
      this.logger.warn(`Permission cache invalidation failed for ${userId}: ${String(error)}`);
    }
  }

  private async resolve(
    userId: string,
    scopeType: PermissionScopeType,
    scopeId: string,
  ): Promise<string[]> {
    const cached = await this.readCache(userId, scopeType, scopeId);
    if (cached) return cached;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, isActive: true },
    });

    if (!user || !user.isActive) {
      return [];
    }

    // Super admins are unrestricted in every scope.
    if (user.role === UserRole.SUPER_ADMIN) {
      await this.writeCache(userId, scopeType, scopeId, [WILDCARD_PERMISSION]);
      return [WILDCARD_PERMISSION];
    }

    const grants = await this.prisma.staffPermission.findMany({
      where: {
        userId,
        scopeType,
        scopeId,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      select: { permissionKey: true },
    });

    const permissions = grants.map((grant) => grant.permissionKey);
    await this.writeCache(userId, scopeType, scopeId, permissions);
    return permissions;
  }

  private async readCache(
    userId: string,
    scopeType: string,
    scopeId: string,
  ): Promise<string[] | null> {
    try {
      const cached = await this.redis.get(this.cacheKey(userId, scopeType, scopeId));
      return cached ? (JSON.parse(cached) as string[]) : null;
    } catch (error) {
      // A cache miss must never fail an authorization check — fall through to DB.
      this.logger.warn(`Permission cache read failed for ${userId}: ${String(error)}`);
      return null;
    }
  }

  private async writeCache(
    userId: string,
    scopeType: string,
    scopeId: string,
    permissions: string[],
  ): Promise<void> {
    try {
      await this.redis.setEx(
        this.cacheKey(userId, scopeType, scopeId),
        this.CACHE_TTL,
        JSON.stringify(permissions),
      );
    } catch (error) {
      this.logger.warn(`Permission cache write failed for ${userId}: ${String(error)}`);
    }
  }
}
