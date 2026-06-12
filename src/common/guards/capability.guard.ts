import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CapabilityType, UserRole } from '@prisma/client';
import { REQUIRE_CAPABILITY_KEY } from '../decorators/capability.decorator';
import { hasApprovedCapability, type AuthUser } from '../types/auth-context';

/**
 * Enforces an approved platform capability (VENUE / ORGANIZER / COACH) declared
 * via `@RequireCapability(...)`. SUPER_ADMIN bypasses all capability checks.
 */
@Injectable()
export class CapabilityGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<CapabilityType | undefined>(
      REQUIRE_CAPABILITY_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const user = this.getUser(context);
    if (!user) throw new ForbiddenException('Not authenticated');
    if (user.role === UserRole.SUPER_ADMIN) return true;

    if (!hasApprovedCapability(user, required)) {
      throw new ForbiddenException(`${required} capability required (approved)`);
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
