import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ALLOW_PASSWORD_PENDING_KEY } from '../decorators/allow-password-pending.decorator';
import type { AuthUser } from '../types/auth-context';

/**
 * Stops an account whose password was chosen by someone else from doing
 * anything until the holder picks their own.
 *
 * A venue owner creates a staff login and hands over a starter password. Until
 * it is changed, two people know it — so a booking "created by Ram" might have
 * been created by the owner, and the accountability the seat exists to provide
 * isn't there yet.
 *
 * This lives on the server rather than in a client redirect deliberately. A
 * React guard is a suggestion; anyone holding the token could call the API
 * directly around it. Here, the console genuinely cannot be driven until the
 * flag clears.
 *
 * Public routes are unaffected: they have no `req.user`, so the guard falls
 * through — which is what lets sign-in, refresh and sign-out keep working for
 * an account in this state.
 */
@Injectable()
export class PasswordChangeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const user = this.currentUser(context);
    if (!user?.mustChangePassword) return true;

    const allowed = this.reflector.getAllAndOverride<boolean | undefined>(
      ALLOW_PASSWORD_PENDING_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (allowed) return true;

    throw new ForbiddenException('Set a new password before continuing.');
  }

  private currentUser(context: ExecutionContext): AuthUser | undefined {
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      return GqlExecutionContext.create(context).getContext().req?.user;
    }
    return context.switchToHttp().getRequest()?.user;
  }
}
