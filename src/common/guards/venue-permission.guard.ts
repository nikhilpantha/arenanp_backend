import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { PermissionResolverService } from '../../modules/rbac/permission-resolver.service';
import { REQUIRE_VENUE_PERMISSION_KEY } from '../decorators/venue-permission.decorator';
import type { AuthUser } from '../types/auth-context';

/**
 * Venue-scoped authorization.
 *
 * For a handler annotated with `@RequireVenuePermission(key)`, checks the
 * caller's grants for the target venue in `staff_permissions`. The venue id is
 * read from the GraphQL args: `venueId`, or `input.venueId`.
 *
 * There are no venue roles. Permissions are granted per user per venue, so the
 * same person can manage bookings at one venue and only read them at another.
 *
 * Two principals bypass the grant check:
 *   - platform SUPER_ADMIN, who is unrestricted everywhere;
 *   - the venue's own owner, who implicitly holds everything at their venue.
 *
 * The owner bypass is what makes the model bootstrappable: a freshly created
 * venue has an owner and no grants, and without it nobody could grant the
 * owner anything.
 */
@Injectable()
export class VenuePermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly permissions: PermissionResolverService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string | undefined>(
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

    const venue = await this.prisma.venue.findUnique({
      where: { id: venueId },
      select: { primaryOwnerId: true },
    });
    if (!venue) throw new ForbiddenException('Venue not found.');
    if (venue.primaryOwnerId === user.id) return true;

    const allowed = await this.permissions.venueUserHasPermission(user.id, venueId, required);
    if (!allowed) {
      throw new ForbiddenException(`Missing venue permission: ${required}`);
    }

    return true;
  }
}
