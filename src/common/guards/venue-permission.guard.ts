import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MembershipStatus, UserRole, VenueMemberRole } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import {
  effectivePermissions,
  VENUE_PERMISSIONS,
  type VenuePermission,
} from '../constants/permissions';
import { REQUIRE_VENUE_PERMISSION_KEY } from '../decorators/venue-permission.decorator';
import type { AuthUser, VenueAccessContext } from '../types/auth-context';

/**
 * Venue-scoped RBAC. For a handler annotated with `@RequireVenuePermission(p)`,
 * resolves the caller's ACTIVE membership for the target venue and checks the
 * effective permission set. The venue id is read from the GraphQL args:
 * `venueId`, or `input.venueId`.
 *
 * It also attaches what it resolved to the request as `venueAccess`, readable
 * with `@VenueAccess()`. A handler that gates a whole operation on one
 * permission often needs to gate a *field* on another — the day's revenue is
 * `finance:read` while the day's booking count is `bookings:read` — and
 * re-querying the membership per field would mean the same round trip twice.
 */
@Injectable()
export class VenuePermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<VenuePermission | undefined>(
      REQUIRE_VENUE_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const gqlCtx = GqlExecutionContext.create(context);
    const req = gqlCtx.getContext().req;
    const user: AuthUser | undefined = req?.user;
    if (!user) throw new ForbiddenException('Not authenticated');

    const args = gqlCtx.getArgs<{ venueId?: string; input?: { venueId?: string } }>();
    const venueId = args.venueId ?? args.input?.venueId;

    if (user.role === UserRole.SUPER_ADMIN) {
      // Platform admins hold every permission everywhere, so field-level gates
      // downstream must see a full set rather than an empty one.
      attach(req, {
        venueId: venueId ?? '',
        role: VenueMemberRole.OWNER,
        permissions: [...VENUE_PERMISSIONS],
      });
      return true;
    }

    if (!venueId) throw new ForbiddenException('No venue specified for this action.');

    const membership = await this.prisma.venueMembership.findUnique({
      where: { venueId_userId: { venueId, userId: user.id } },
      select: { role: true, permissions: true, status: true },
    });
    if (!membership || membership.status !== MembershipStatus.ACTIVE) {
      throw new ForbiddenException('You are not an active member of this venue.');
    }
    const permissions = effectivePermissions(membership.role, membership.permissions);
    if (!permissions.includes(required)) {
      throw new ForbiddenException(`Missing venue permission: ${required}`);
    }
    attach(req, { venueId, role: membership.role, permissions });
    return true;
  }
}

function attach(req: { venueAccess?: VenueAccessContext } | undefined, access: VenueAccessContext) {
  if (req) req.venueAccess = access;
}
