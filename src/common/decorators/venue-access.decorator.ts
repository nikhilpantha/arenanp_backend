import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import type { VenueAccessContext } from '../types/auth-context';

/**
 * Inject what `VenuePermissionGuard` resolved for this request — the caller's
 * role at the target venue and their effective permission set.
 *
 * For gating a field inside a response the caller is otherwise allowed to
 * fetch: the venue's booking count is `bookings:read`, but the money it took
 * that day is `finance:read`, and the front desk holds only the first.
 *
 * Undefined on any handler the guard didn't run for, so callers must treat a
 * missing context as "no permissions" rather than assuming it can't happen.
 */
export const VenueAccess = createParamDecorator(
  (_: unknown, context: ExecutionContext): VenueAccessContext | undefined =>
    GqlExecutionContext.create(context).getContext().req?.venueAccess,
);

/** Convenience for the common `does the caller hold X?` check. */
export function canRead(access: VenueAccessContext | undefined, permission: string): boolean {
  return access?.permissions.includes(permission) ?? false;
}
