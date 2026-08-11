import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PermissionResolverService } from '../../modules/rbac/permission-resolver.service';
import { REQUIRE_PERMISSION_KEY } from '../decorators/require-permission.decorator';
import type { AuthUser } from '../types/auth-context';

/**
 * Enforces `@RequirePermission()` against the dynamic RBAC tables.
 *
 * Registered globally in AuthModule; a no-op on handlers that carry no
 * `@RequirePermission()` metadata. Class-level metadata is inherited by every
 * method, and a method-level decorator overrides its class.
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissions: PermissionResolverService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(REQUIRE_PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!required || required.length === 0) {
      return true;
    }

    const user = this.getUser(context);
    if (!user) {
      throw new ForbiddenException('Not authenticated');
    }

    const allowed = await this.permissions.userHasAllPermissions(user.id, required);
    if (!allowed) {
      throw new ForbiddenException(`Missing permission: ${required.join(', ')}`);
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
