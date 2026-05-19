import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import type { AuthUser } from '../types/auth-context';

/**
 * Inject the authenticated user (populated by JwtStrategy / GqlAuthGuard).
 * Works in both REST and GraphQL handlers.
 */
export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): AuthUser | undefined => {
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req?.user;
    }
    return context.switchToHttp().getRequest().user;
  },
);
