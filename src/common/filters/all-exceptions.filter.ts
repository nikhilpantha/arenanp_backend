import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GqlArgumentsHost, GqlContextType } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  private httpAdapterHost?: HttpAdapterHost;

  setHttpAdapterHost(host: HttpAdapterHost) {
    this.httpAdapterHost = host;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const contextType = host.getType<GqlContextType>();

    if (contextType === 'graphql') {
      return this.handleGraphQL(exception, host);
    }
    return this.handleHttp(exception, host);
  }

  private handleGraphQL(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();
    const { status, message, code } = this.normalise(exception);

    this.logger.warn(
      `[GraphQL] ${info?.parentType?.name}.${info?.fieldName} → ${code} (${status}) ${message}`,
    );

    return new GraphQLError(message, {
      extensions: { code, status },
    });
  }

  private handleHttp(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const { status, message, code } = this.normalise(exception);

    this.logger.warn(`[HTTP] ${req.method} ${req.url} → ${status} ${code} ${message}`);

    res.status(status).json({
      statusCode: status,
      code,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }

  private normalise(exception: unknown): { status: number; message: string; code: string } {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : (response as { message?: string | string[] }).message
            ? Array.isArray((response as { message: string[] }).message)
              ? (response as { message: string[] }).message.join('; ')
              : ((response as { message: string }).message as string)
            : exception.message;
      return {
        status: exception.getStatus(),
        message,
        code: this.codeFromStatus(exception.getStatus()),
      };
    }
    if (exception instanceof Error) {
      this.logger.error(exception.stack ?? exception.message);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unknown error',
      code: 'INTERNAL_SERVER_ERROR',
    };
  }

  private codeFromStatus(status: number): string {
    switch (status) {
      case 400:
        return 'BAD_REQUEST';
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 422:
        return 'UNPROCESSABLE';
      case 429:
        return 'RATE_LIMITED';
      default:
        return status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'ERROR';
    }
  }
}
