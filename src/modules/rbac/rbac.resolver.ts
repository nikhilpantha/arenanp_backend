import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PermissionDomain, PermissionScopeType } from '@prisma/client';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../common/types/auth-context';

import { PermissionResolverService } from './permission-resolver.service';
import { StaffPermissionService } from './staff-permission.service';
import {
  EffectivePermissionsObject,
  PermissionObject,
  StaffPermissionObject,
} from './dto/rbac.types';
import {
  GrantStaffPermissionInput,
  PermissionScopeInput,
  RevokeStaffPermissionInput,
  SetStaffPermissionsInput,
} from './dto/rbac.input';

/**
 * Permission administration.
 *
 * There are no roles — these operations grant and revoke permissions directly
 * against a staff member, within a scope. `myPermissions` is open to any
 * authenticated user (you may always read your own access); everything else
 * requires the corresponding `permissions.*` capability.
 */
@Resolver()
export class RbacResolver {
  constructor(
    private readonly staffPermissions: StaffPermissionService,
    private readonly permissionResolver: PermissionResolverService,
  ) {}

  // ─── Reads ──────────────────────────────────────────────────────────────

  @Query(() => EffectivePermissionsObject, {
    name: 'myPermissions',
    description:
      "The caller's own platform permissions plus every scope they hold grants in. Drives what the admin UI renders.",
  })
  async myPermissions(@CurrentUser() user: AuthUser): Promise<EffectivePermissionsObject> {
    const [permissions, scopes] = await Promise.all([
      this.permissionResolver.getUserPermissions(user.id),
      this.staffPermissions.listScopes(user.id),
    ]);

    return { permissions, scopes };
  }

  @Query(() => [PermissionObject], {
    name: 'listPermissions',
    description: 'The permission library, optionally filtered to one domain.',
  })
  @RequirePermission('permissions.view')
  async listPermissions(
    @Args('domain', { type: () => PermissionDomain, nullable: true }) domain?: PermissionDomain,
  ) {
    return this.staffPermissions.listPermissions(domain);
  }

  @Query(() => [PermissionObject], {
    name: 'permissionsForScope',
    description:
      'The permissions that may be granted in a scope — platform keys for PLATFORM, venue keys for VENUE, and so on.',
  })
  @RequirePermission('permissions.view')
  async permissionsForScope(
    @Args('scopeType', { type: () => PermissionScopeType }) scopeType: PermissionScopeType,
  ) {
    return this.staffPermissions.listPermissionsForScope(scopeType);
  }

  @Query(() => [StaffPermissionObject], {
    name: 'staffPermissions',
    description: "One staff member's grants, optionally narrowed to a single scope.",
  })
  @RequirePermission('permissions.view')
  async staffPermissionsFor(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('scope', { type: () => PermissionScopeInput, nullable: true })
    scope?: PermissionScopeInput,
  ) {
    return this.staffPermissions.listGrants(userId, scope);
  }

  // ─── Mutations ──────────────────────────────────────────────────────────

  @Mutation(() => [StaffPermissionObject], {
    description:
      "Replace a staff member's permissions within one scope. Anything omitted from the list is revoked.",
  })
  @RequirePermission('permissions.assign')
  async setStaffPermissions(
    @Args('input') input: SetStaffPermissionsInput,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.staffPermissions.setPermissions(
      input.userId,
      input.scope,
      input.permissionKeys,
      actor.id,
    );
  }

  @Mutation(() => StaffPermissionObject, {
    description: 'Grant one permission to a staff member, optionally with an expiry.',
  })
  @RequirePermission('permissions.assign')
  async grantStaffPermission(
    @Args('input') input: GrantStaffPermissionInput,
    @CurrentUser() actor: AuthUser,
  ) {
    return this.staffPermissions.grant(input.userId, input.permissionKey, input.scope, actor.id, {
      expiresAt: input.expiresAt,
      reason: input.reason,
    });
  }

  @Mutation(() => Boolean, { description: 'Revoke one permission from a staff member.' })
  @RequirePermission('permissions.assign')
  async revokeStaffPermission(@Args('input') input: RevokeStaffPermissionInput) {
    return this.staffPermissions.revoke(input.userId, input.permissionKey, input.scope);
  }
}
