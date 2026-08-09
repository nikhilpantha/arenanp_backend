import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Rate limiting that works over the Apollo driver.
 *
 * `ThrottlerGuard` reads the request and response off an HTTP context, which a
 * GraphQL execution context doesn't expose — so registering the stock guard
 * globally silently does nothing for every resolver in the app. This unwraps
 * the GraphQL context first and falls back to HTTP for the REST auth
 * controller, which shares the same limits.
 *
 * Behind a proxy the client address arrives in `x-forwarded-for`; without
 * honouring it every request would share the proxy's IP and one user could
 * exhaust the limit for everybody.
 */
@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext): { req: Request; res: Response } {
    if (context.getType<'http' | 'graphql'>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext();
      return { req: ctx.req, res: ctx.res ?? ctx.req?.res };
    }
    const http = context.switchToHttp();
    return { req: http.getRequest(), res: http.getResponse() };
  }

  protected async getTracker(req: Record<string, unknown>): Promise<string> {
    const headers = (req?.headers ?? {}) as Record<string, string | string[] | undefined>;
    const forwarded = headers['x-forwarded-for'];
    const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0];
    return (first?.trim() || (req?.ip as string) || 'unknown').toString();
  }
}
