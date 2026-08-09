import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CapabilityStatus,
  CapabilityType,
  MembershipStatus,
  UserRole,
  VenueMemberRole,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { PermissionResolverService } from '../../modules/rbac/permission-resolver.service';
import { permissionKeysForDomain, type VenuePermissionKey } from '../constants/permission-keys';
import { REQUIRE_VENUE_PERMISSION_KEY } from '../decorators/venue-permission.decorator';
import type { AuthUser, VenueAccessContext } from '../types/auth-context';

/** Every venue permission — what an unrestricted principal effectively holds. */
const ALL_VENUE_PERMISSIONS = permissionKeysForDomain('VENUE_MANAGEMENT');

/**
 * Venue-scoped authorization.
 *
 * For a handler annotated with `@RequireVenuePermission(key)`, checks the
 * caller's grants for the target venue in `staff_permissions`. The venue id is
 * read from the GraphQL args: `venueId`, or `input.venueId`.
 *
 * There are no venue roles. `VenueMembership.role` is a job title chosen when a
 * seat is created — it seeds a starting set of grants and is a display label
 * thereafter. Two "Managers" at two venues can hold completely different
 * permissions, which is the entire reason for the model.
 *
 * It also attaches what it resolved to the request as `venueAccess`, readable
 * with `@VenueAccess()`. A handler that gates a whole operation on one
 * permission often needs to gate a *field* on another — the day's revenue is
 * `venue.finance.view` while the day's booking count is `venue.bookings.view` —
 * and re-resolving per field would repeat the same round trip.
 *
 * Three principals bypass the grant check:
 *   - platform SUPER_ADMIN, unrestricted everywhere;
 *   - the venue's own owner, who implicitly holds everything at their venue;
 *   - nobody else.
 *
 * The owner bypass is what makes the model bootstrappable: a freshly created
 * venue has an owner and no grants, and without it nobody could grant the owner
 * anything.
 */
@Injectable()
export class VenuePermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
    private readonly permissions: PermissionResolverService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<VenuePermissionKey | undefined>(
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
        permissions: [...ALL_VENUE_PERMISSIONS],
      });
      return true;
    }

    if (!venueId) throw new ForbiddenException('No venue specified for this action.');

    // A suspended VENUE capability is the platform withdrawing someone's ability
    // to operate venues at all, so it outranks whatever their seat says.
    //
    // Only bites accounts that actually hold the capability: venue employees
    // have no VENUE capability of their own and are unaffected.
    const venueCapability = user.capabilities.find((c) => c.type === CapabilityType.VENUE);
    if (venueCapability?.status === CapabilityStatus.SUSPENDED) {
      throw new ForbiddenException('Your venue access has been suspended by the platform.');
    }

    const venue = await this.prisma.venue.findUnique({
      where: { id: venueId },
      select: { primaryOwnerId: true },
    });
    if (!venue) throw new ForbiddenException('Venue not found.');

    if (venue.primaryOwnerId === user.id) {
      attach(req, {
        venueId,
        role: VenueMemberRole.OWNER,
        permissions: [...ALL_VENUE_PERMISSIONS],
      });
      return true;
    }

    // The seat still gates access — a suspended or removed staff member holds
    // nothing regardless of grants — but it no longer decides *what* they can do.
    const membership = await this.prisma.venueMembership.findUnique({
      where: { venueId_userId: { venueId, userId: user.id } },
      select: { role: true, status: true },
    });
    if (!membership || membership.status !== MembershipStatus.ACTIVE) {
      throw new ForbiddenException('You are not an active member of this venue.');
    }

    const permissions = await this.permissions.getVenueUserPermissions(user.id, venueId);
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
