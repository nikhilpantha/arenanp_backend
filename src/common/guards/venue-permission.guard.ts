import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { MembershipStatus, UserRole } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { effectivePermissions, type VenuePermission } from '../constants/permissions';
import { REQUIRE_VENUE_PERMISSION_KEY } from '../decorators/venue-permission.decorator';
import type { AuthUser } from '../types/auth-context';

/**
 * Venue-scoped RBAC. For a handler annotated with `@RequireVenuePermission(p)`,
 * resolves the caller's ACTIVE membership for the target venue and checks the
 * effective permission set. The venue id is read from the GraphQL args:
 * `venueId`, or `input.venueId`.
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
    const user: AuthUser | undefined = gqlCtx.getContext().req?.user;
    if (!user) throw new ForbiddenException('Not authenticated');
    if (user.role === UserRole.SUPER_ADMIN) return true;

    const args = gqlCtx.getArgs<{ venueId?: string; input?: { venueId?: string } }>();
    const venueId = args.venueId ?? args.input?.venueId;
    if (!venueId) throw new ForbiddenException('No venue specified for this action.');

    const membership = await this.prisma.venueMembership.findUnique({
      where: { venueId_userId: { venueId, userId: user.id } },
      select: { role: true, permissions: true, status: true },
    });
    if (!membership || membership.status !== MembershipStatus.ACTIVE) {
      throw new ForbiddenException('You are not an active member of this venue.');
    }
    if (!effectivePermissions(membership.role, membership.permissions).includes(required)) {
      throw new ForbiddenException(`Missing venue permission: ${required}`);
    }
    return true;
  }
}
