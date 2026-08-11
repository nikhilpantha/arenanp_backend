import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { RedisService } from '@/redis/redis.service';

/**
 * Redis cache for *venue-scoped* permissions.
 *
 * Platform staff permissions moved to `PermissionResolverService`, which caches
 * them itself and resolves from the dynamic roles tables. This service now
 * covers only `VenueMembership.permissions`, which is still membership-shaped
 * rather than role-shaped.
 *
 * Performance: ~5ms DB query → <1ms Redis hit. Invalidation is explicit.
 */
@Injectable()
export class PermissionCacheService {
  private readonly CACHE_TTL = 5 * 60; // seconds
  private readonly VENUE_PERMS_KEY = (userId: string, venueId: string) =>
    `venue:permissions:${userId}:${venueId}`;

  constructor(
    private readonly redis: RedisService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Effective permissions for a user within one venue (cached).
   *
   * @param userId - User ID
   * @param venueId - Venue ID
   * @returns Permission strings; empty when there is no active membership.
   */
  async getVenuePermissions(userId: string, venueId: string): Promise<string[]> {
    const cacheKey = this.VENUE_PERMS_KEY(userId, venueId);

    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const membership = await this.prisma.venueMembership.findFirst({
      where: { userId, venueId },
      select: { role: true, permissions: true, status: true },
    });

    // No membership or inactive = no permissions
    if (!membership || membership.status !== 'ACTIVE') {
      await this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify([]));
      return [];
    }

    const effectivePermissions = membership.permissions || [];
    await this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(effectivePermissions));

    return effectivePermissions;
  }

  /** Invalidate one user's cached permissions for one venue. */
  async invalidateVenuePermissionCache(userId: string, venueId: string): Promise<void> {
    await this.redis.del(this.VENUE_PERMS_KEY(userId, venueId));
  }

  /**
   * Invalidate every venue permission entry for a user. Bulk operation — use
   * only when a user is removed from all venues.
   */
  async invalidateAllVenuePermissionsForUser(userId: string): Promise<void> {
    await this.redis.deleteByPattern(`venue:permissions:${userId}:*`);
  }

  /** Cache statistics for observability. */
  async getCacheStats() {
    const dbSize = await this.redis.dbSize();
    return {
      cacheSize: dbSize,
      ttl: this.CACHE_TTL,
      venuePermsCacheKey: 'venue:permissions:*',
    };
  }
}
