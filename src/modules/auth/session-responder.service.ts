import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { User } from '@prisma/client';
import type { Request, Response } from 'express';

import type { AppConfig } from '../../config/app.config';
import { mapUserToGraphql } from '../users/dto/user.model';

import { AuthService, type SignedAccessToken } from './auth.service';
import { AuthPayload } from './dto/auth-payload';
import type { IssuedRefreshToken } from './refresh-token.service';
import {
  clearRefreshCookie,
  clientKindOf,
  readRefreshToken,
  setRefreshCookie,
} from './session-transport';

/** The bits of the GraphQL context a session needs. */
export type GqlContext = { req?: Request; res?: Response };

/**
 * Turns "this user has proved who they are" into an `AuthPayload`, and owns the one
 * decision that must never be made twice: **how** the refresh token reaches the
 * client. Every mutation that signs somebody in goes through here — login, OTP
 * verify, refresh, and accepting a venue invitation — so none of them can forget
 * the cookie or accidentally leak the token into a browser-readable body.
 */
@Injectable()
export class SessionResponder {
  constructor(
    private readonly auth: AuthService,
    private readonly config: ConfigService,
  ) {}

  get settings(): AppConfig['refresh'] {
    return this.config.get<AppConfig['refresh']>('app.refresh')!;
  }

  private get isProd(): boolean {
    return this.config.get<string>('NODE_ENV') === 'production';
  }

  /** Rough device info for the session row. Never trusted for anything. */
  meta(ctx: GqlContext) {
    return { userAgent: ctx.req?.headers?.['user-agent'], ip: ctx.req?.ip };
  }

  /** The refresh token on this request — cookie (web) or explicit argument (app). */
  presentedToken(ctx: GqlContext, fromInput?: string | null): string | null {
    return readRefreshToken(ctx.req, this.settings, fromInput);
  }

  clear(ctx: GqlContext): void {
    clearRefreshCookie(ctx.res, this.settings, this.isProd);
  }

  /** Open a brand-new session for a user who just authenticated, then reply. */
  async open(user: User, token: SignedAccessToken, ctx: GqlContext): Promise<AuthPayload> {
    const refresh = await this.auth.openSession(user, this.meta(ctx));
    return this.respond(user, token, refresh, ctx);
  }

  /**
   * The single place the refresh token is handed over. A browser gets it as an
   * httpOnly cookie and **never** in the body — page JavaScript could read it
   * there, which is the whole thing httpOnly exists to prevent. The phone app has
   * no usable cookie jar, so it gets the body instead and stores it itself.
   */
  respond(
    user: User,
    token: SignedAccessToken,
    refresh: IssuedRefreshToken,
    ctx: GqlContext,
  ): AuthPayload {
    const isApp = clientKindOf(ctx.req) === 'app';
    if (!isApp) setRefreshCookie(ctx.res, refresh, this.settings, this.isProd);
    return {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      expiresAt: token.expiresAt,
      refreshToken: isApp ? refresh.token : undefined,
      refreshExpiresAt: refresh.expiresAt,
      user: mapUserToGraphql(user),
    };
  }
}
