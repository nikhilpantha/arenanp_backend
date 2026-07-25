import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { RedisService } from '@/redis/redis.service';
import {
  STAFF_ROLE_PERMISSIONS,
  getEffectiveStaffPermissions,
} from '@/common/constants/staff-permissions';

/**
 * Permission caching service for staff permissions.
 * Caches platform staff permissions in Redis with 5-minute TTL.
 *
 * Performance gain: 5+ ms (DB query) → < 1ms (Redis hit)
 * Cache invalidation: Explicit on permission changes
 */
@Injectable()
export class PermissionCacheService {
  private readonly CACHE_TTL = 5 * 60; // 5 minutes in seconds
  private readonly STAFF_PERMS_KEY = (userId: string) => `staff:permissions:${userId}`;
  private readonly VENUE_PERMS_KEY = (userId: string, venueId: string) =>
    `venue:permissions:${userId}:${venueId}`;

  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get effective permissions for a staff member (cached).
   * Checks Redis first; falls back to DB and caches result.
   *
   * @param userId - Staff member user ID
   * @returns Array of permission strings (e.g., ['finance:read', 'finance:payout:review'])
   */
  async getStaffPermissions(userId: string): Promise<string[]> {
    const cacheKey = this.STAFF_PERMS_KEY(userId);

    // Check Redis cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Cache miss: fetch from database
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return [];
    }

    // Get base permissions for role
    const basePermissions = STAFF_ROLE_PERMISSIONS[user.role] || [];

    // If SUPER_ADMIN, return wildcard immediately (no need to check overrides)
    if (basePermissions.includes('*')) {
      // Cache SUPER_ADMIN permissions
      await this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(['*']));
      return ['*'];
    }

    // Fetch active permission overrides (non-deleted, non-expired)
    const overrides = await this.prisma.permissionOverride.findMany({
      where: {
        userId,
        deletedAt: null,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      select: { permission: true, action: true },
    });

    // Merge base permissions with overrides
    const effectivePermissions = getEffectiveStaffPermissions(user.role, overrides);

    // Cache the result
    await this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(effectivePermissions));

    return effectivePermissions;
  }

  /**
   * Get effective permissions for a user within a specific venue (cached).
   * Checks Redis first; falls back to DB and caches result.
   *
   * @param userId - User ID
   * @param venueId - Venue ID
   * @returns Array of permission strings
   */
  async getVenuePermissions(userId: string, venueId: string): Promise<string[]> {
    const cacheKey = this.VENUE_PERMS_KEY(userId, venueId);

    // Check Redis cache
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Cache miss: fetch from database
    const membership = await this.prisma.venueMembership.findFirst({
      where: {
        userId,
        venueId,
      },
      select: {
        role: true,
        permissions: true,
        status: true,
      },
    });

    // No membership or inactive = no permissions
    if (!membership || membership.status !== 'ACTIVE') {
      await this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify([]));
      return [];
    }

    // If override permissions exist, use them; otherwise return empty (permissions resolved at resolver level)
    const effectivePermissions = membership.permissions || [];

    // Cache result
    await this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(effectivePermissions));

    return effectivePermissions;
  }

  /**
   * Invalidate staff permissions cache (called when permissions change).
   * Clears Redis key so next access will fetch from DB.
   *
   * @param userId - Staff member user ID
   */
  async invalidateStaffPermissionCache(userId: string): Promise<void> {
    const cacheKey = this.STAFF_PERMS_KEY(userId);
    await this.redis.del(cacheKey);
  }

  /**
   * Invalidate venue permissions cache for a user (called when membership changes).
   *
   * @param userId - User ID
   * @param venueId - Venue ID
   */
  async invalidateVenuePermissionCache(userId: string, venueId: string): Promise<void> {
    const cacheKey = this.VENUE_PERMS_KEY(userId, venueId);
    await this.redis.del(cacheKey);
  }

  /**
   * Invalidate all venue permissions for a user (called when user is removed from all venues).
   * This is a bulk operation - only use when necessary.
   *
   * @param userId - User ID
   */
  async invalidateAllVenuePermissionsForUser(userId: string): Promise<void> {
    // Pattern: venue:permissions:userId:*
    const pattern = `venue:permissions:${userId}:*`;
    await this.redis.deleteByPattern(pattern);
  }

  /**
   * Get cache statistics for monitoring.
   * Used for observability and debugging.
   */
  async getCacheStats() {
    const dbSize = await this.redis.dbSize();
    return {
      cacheSize: dbSize,
      ttl: this.CACHE_TTL,
      staffPermsCacheKey: 'staff:permissions:*',
      venuePermsCacheKey: 'venue:permissions:*',
    };
  }
}
