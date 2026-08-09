import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PermissionDomain, PermissionScopeType, Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { domainForScope } from '../../common/constants/permission-keys';
import { PermissionResolverService } from './permission-resolver.service';

/** A scope a grant can belong to: platform-wide, one venue, or one tournament. */
export interface PermissionScopeRef {
  scopeType: PermissionScopeType;
  /** Venue or tournament id. Ignored (and stored as '') for PLATFORM. */
  scopeId?: string | null;
}

/**
 * Grants and revokes individual permissions for staff members.
 *
 * There are no roles: this is the only way a staff member gains a capability.
 * Every mutation invalidates the affected user's cached permissions so the
 * change lands on their next request.
 */
@Injectable()
export class StaffPermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permissions: PermissionResolverService,
  ) {}

  /** The permission library, optionally filtered to one domain. */
  async listPermissions(domain?: PermissionDomain) {
    return this.prisma.permission.findMany({
      where: domain ? { domain } : undefined,
      orderBy: [{ domain: 'asc' }, { key: 'asc' }],
    });
  }

  /** The permissions available to grant in a given scope. */
  async listPermissionsForScope(scopeType: PermissionScopeType) {
    return this.listPermissions(domainForScope(scopeType) as PermissionDomain);
  }

  /** Active grants held by a user, optionally narrowed to one scope. */
  async listGrants(userId: string, scope?: PermissionScopeRef) {
    return this.prisma.staffPermission.findMany({
      where: {
        userId,
        ...(scope ? this.scopeWhere(scope) : {}),
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: { permission: true },
      orderBy: [{ scopeType: 'asc' }, { permissionKey: 'asc' }],
    });
  }

  /**
   * Replace a staff member's permission set within one scope.
   *
   * This is what the permissions screen saves: it diffs rather than
   * delete-and-recreate, so `grantedAt` and `grantedById` survive on the
   * permissions that were already there.
   */
  async setPermissions(
    userId: string,
    scope: PermissionScopeRef,
    permissionKeys: string[],
    grantedById: string,
  ) {
    await this.assertUserExists(userId);
    const scopeId = this.normaliseScopeId(scope);
    const keys = await this.validateKeysForScope(permissionKeys, scope.scopeType);

    await this.prisma.$transaction(async (tx) => {
      await tx.staffPermission.deleteMany({
        where: {
          userId,
          scopeType: scope.scopeType,
          scopeId,
          permissionKey: { notIn: keys },
        },
      });

      await tx.staffPermission.createMany({
        data: keys.map((permissionKey) => ({
          userId,
          permissionKey,
          scopeType: scope.scopeType,
          scopeId,
          grantedById,
        })),
        skipDuplicates: true,
      });
    });

    await this.permissions.invalidateUser(userId);
    return this.listGrants(userId, scope);
  }

  /** Grant a single permission, optionally time-limited. */
  async grant(
    userId: string,
    permissionKey: string,
    scope: PermissionScopeRef,
    grantedById: string,
    options: { expiresAt?: Date | null; reason?: string | null } = {},
  ) {
    await this.assertUserExists(userId);
    const scopeId = this.normaliseScopeId(scope);
    await this.validateKeysForScope([permissionKey], scope.scopeType);

    const grant = await this.prisma.staffPermission.upsert({
      where: {
        userId_permissionKey_scopeType_scopeId: {
          userId,
          permissionKey,
          scopeType: scope.scopeType,
          scopeId,
        },
      },
      create: {
        userId,
        permissionKey,
        scopeType: scope.scopeType,
        scopeId,
        grantedById,
        expiresAt: options.expiresAt ?? null,
        reason: options.reason ?? null,
      },
      update: {
        grantedById,
        grantedAt: new Date(),
        expiresAt: options.expiresAt ?? null,
        reason: options.reason ?? null,
      },
      include: { permission: true },
    });

    await this.permissions.invalidateUser(userId);
    return grant;
  }

  /** Revoke a single permission. Revocation is a delete — no tombstone row. */
  async revoke(userId: string, permissionKey: string, scope: PermissionScopeRef) {
    const scopeId = this.normaliseScopeId(scope);

    const { count } = await this.prisma.staffPermission.deleteMany({
      where: { userId, permissionKey, scopeType: scope.scopeType, scopeId },
    });

    if (count === 0) {
      throw new NotFoundException('That permission is not granted in this scope');
    }

    await this.permissions.invalidateUser(userId);
    return true;
  }

  /** Remove every grant a user holds in one scope — used when unassigning staff. */
  async clearScope(userId: string, scope: PermissionScopeRef) {
    const scopeId = this.normaliseScopeId(scope);

    await this.prisma.staffPermission.deleteMany({
      where: { userId, scopeType: scope.scopeType, scopeId },
    });
    await this.permissions.invalidateUser(userId);
  }

  /**
   * The distinct scopes a user holds grants in. Lets the permissions screen
   * show "this admin has access at 2 venues" without a second round trip.
   */
  async listScopes(userId: string) {
    const rows = await this.prisma.staffPermission.groupBy({
      by: ['scopeType', 'scopeId'],
      where: { userId },
      _count: { _all: true },
    });

    return rows.map((row) => ({
      scopeType: row.scopeType,
      scopeId: row.scopeId,
      permissionCount: row._count._all,
    }));
  }

  /** PLATFORM grants always store '' so the unique constraint holds. */
  private normaliseScopeId(scope: PermissionScopeRef): string {
    if (scope.scopeType === PermissionScopeType.PLATFORM) return '';

    const scopeId = scope.scopeId?.trim();
    if (!scopeId) {
      throw new BadRequestException(
        `A ${scope.scopeType.toLowerCase()} id is required for ${scope.scopeType}-scoped permissions`,
      );
    }
    return scopeId;
  }

  private scopeWhere(scope: PermissionScopeRef): Prisma.StaffPermissionWhereInput {
    return { scopeType: scope.scopeType, scopeId: this.normaliseScopeId(scope) };
  }

  /**
   * Rejects unknown keys, and keys belonging to a different domain than the
   * scope — granting `settings.edit` against a single venue is meaningless, so
   * it is an error rather than a silently dead row.
   */
  private async validateKeysForScope(
    permissionKeys: string[],
    scopeType: PermissionScopeType,
  ): Promise<string[]> {
    const unique = Array.from(new Set(permissionKeys));
    if (unique.length === 0) return [];

    const expectedDomain = domainForScope(scopeType) as PermissionDomain;
    const found = await this.prisma.permission.findMany({
      where: { key: { in: unique } },
      select: { key: true, domain: true },
    });

    const byKey = new Map(found.map((p) => [p.key, p.domain]));

    const unknown = unique.filter((key) => !byKey.has(key));
    if (unknown.length > 0) {
      throw new BadRequestException(`Unknown permissions: ${unknown.join(', ')}`);
    }

    const wrongDomain = unique.filter((key) => byKey.get(key) !== expectedDomain);
    if (wrongDomain.length > 0) {
      throw new BadRequestException(
        `These permissions cannot be granted at ${scopeType} scope: ${wrongDomain.join(', ')}`,
      );
    }

    return unique;
  }

  private async assertUserExists(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) throw new NotFoundException('User not found');
  }
}
