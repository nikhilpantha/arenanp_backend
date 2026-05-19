import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { OrganizerStatus, UserRole, VenueOwnerStatus } from '@prisma/client';
import {
  REQUIRE_ORGANIZER_APPROVED_KEY,
  REQUIRE_VENUE_OWNER_APPROVED_KEY,
} from '../decorators/capability.decorator';
import type { AuthUser } from '../types/auth-context';

/**
 * Enforces capability flags carried on `User` (organizerStatus, venueOwnerStatus).
 * SUPER_ADMIN bypasses all capability checks.
 */
@Injectable()
export class CapabilityGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const needsOrganizer = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_ORGANIZER_APPROVED_KEY,
      [context.getHandler(), context.getClass()],
    );
    const needsVenueOwner = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_VENUE_OWNER_APPROVED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!needsOrganizer && !needsVenueOwner) return true;

    const user = this.getUser(context);
    if (!user) throw new ForbiddenException('Not authenticated');
    if (user.role === UserRole.SUPER_ADMIN) return true;

    if (needsOrganizer && user.organizerStatus !== OrganizerStatus.APPROVED) {
      throw new ForbiddenException('Organizer access required (approved)');
    }
    if (needsVenueOwner && user.venueOwnerStatus !== VenueOwnerStatus.APPROVED) {
      throw new ForbiddenException('Venue-owner access required (approved)');
    }
    return true;
  }

  private getUser(context: ExecutionContext): AuthUser | undefined {
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req?.user;
    }
    return context.switchToHttp().getRequest().user;
  }
}
