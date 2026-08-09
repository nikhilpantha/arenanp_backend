import { UnauthorizedException } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CapabilityType } from '@prisma/client';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { LoginWithEmailInput } from './dto/login-with-email.input';
import { LoginWithPhoneInput } from './dto/login-with-phone.input';
import { RefreshSessionInput } from './dto/refresh-session.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { RequestPasswordResetInput } from './dto/request-password-reset.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { PasswordResetTicket } from './dto/password-reset-ticket';
import { OtpRequestResult } from './dto/otp-request-result';
import { AuthPayload } from './dto/auth-payload';
import { SessionResponder, type GqlContext } from './session-responder.service';
import { Public } from '../../common/decorators/public.decorator';
import { ThrottleAuth } from '../../common/decorators/throttle-auth.decorator';
import { AllowWhilePasswordPending } from '../../common/decorators/allow-password-pending.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/types/auth-context';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly sessions: SessionResponder,
  ) {}

  // ── Per-role sign-up / sign-in. The role is fixed server-side (never a client
  // param). Each sends an OTP and ensures that capability on the same number,
  // creating it the first time ("roleAdded"). Used by both sign-up and sign-in.

  @Public()
  @ThrottleAuth()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP and ensure the PLAYER role for this phone (granted instantly).',
  })
  async requestPlayerOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber, CapabilityType.PLAYER, input.password);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP and ensure the VENUE (owner) role for this phone.',
  })
  async requestVenueOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber, CapabilityType.VENUE, input.password);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP and ensure the ORGANIZER role for this phone.',
  })
  async requestOrganizerOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber, CapabilityType.ORGANIZER, input.password);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => AuthPayload, {
    description: 'Verify an OTP and return an access token.',
  })
  async verifyOtp(
    @Args('input') input: VerifyOtpInput,
    @Context() ctx: GqlContext,
  ): Promise<AuthPayload> {
    const { user, token } = await this.authService.verifyOtp(input.phoneNumber, input.code);
    return this.sessions.open(user, token, ctx);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => AuthPayload, {
    description:
      'Email + password login. Used by admin / venue-management web panels. Mobile users use OTP.',
  })
  async loginWithEmail(
    @Args('input') input: LoginWithEmailInput,
    @Context() ctx: GqlContext,
  ): Promise<AuthPayload> {
    const { user, token } = await this.authService.loginWithEmail(input.email, input.password);
    return this.sessions.open(user, token, ctx);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => AuthPayload, {
    description:
      'Phone + password login (mobile). Only works after the phone has been verified via OTP once.',
  })
  async loginWithPhone(
    @Args('input') input: LoginWithPhoneInput,
    @Context() ctx: GqlContext,
  ): Promise<AuthPayload> {
    const { user, token } = await this.authService.loginWithPhonePassword(
      input.phoneNumber,
      input.password,
    );
    return this.sessions.open(user, token, ctx);
  }

  // ── Staying signed in ────────────────────────────────────────────────────────

  @Public()
  @Mutation(() => AuthPayload, {
    description:
      'Trade a refresh token for a new access token, sliding the session deadline forward. ' +
      'Public because the access token it replaces has usually already expired. Web reads ' +
      'the httpOnly cookie; the phone app passes its stored token in the input.',
  })
  async refreshSession(
    @Context() ctx: GqlContext,
    @Args('input', { nullable: true }) input?: RefreshSessionInput,
  ): Promise<AuthPayload> {
    const presented = this.sessions.presentedToken(ctx, input?.refreshToken);
    if (!presented) {
      // No cookie and no argument: there is nothing to renew, so this is a signed-out
      // visitor rather than an error worth logging.
      this.sessions.clear(ctx);
      throw new UnauthorizedException('Please sign in.');
    }

    const { userId, refresh } = await this.authService.refreshSession(
      presented,
      this.sessions.meta(ctx),
    );
    const { user, token } = await this.authService.accessTokenForUserId(userId);
    return this.sessions.respond(user, token, refresh, ctx);
  }

  // ── Password recovery. Three public steps on the same number: send a code,
  // trade the code for a ticket, trade the ticket for a new password. No access
  // token comes out of it — a reset ends every session, including this one, so
  // the account has to be signed into again with the new password.

  @Public()
  @ThrottleAuth()
  @Mutation(() => OtpRequestResult, {
    description:
      'Send a password-reset code. Fails if no account uses this number — unlike the sign-up OTPs it never creates one.',
  })
  async requestPasswordReset(
    @Args('input') input: RequestPasswordResetInput,
  ): Promise<OtpRequestResult> {
    return this.authService.requestPasswordReset(input.phoneNumber);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => PasswordResetTicket, {
    description: 'Check a password-reset code and return a single-use ticket for resetPassword.',
  })
  async verifyPasswordResetCode(
    @Args('input') input: VerifyOtpInput,
  ): Promise<PasswordResetTicket> {
    return this.authService.verifyPasswordResetCode(input.phoneNumber, input.code);
  }

  @Public()
  @ThrottleAuth()
  @Mutation(() => Boolean, {
    description:
      'Set a new password using a verified reset ticket. Signs out every existing session.',
  })
  async resetPassword(@Args('input') input: ResetPasswordInput): Promise<boolean> {
    await this.authService.resetPassword(input.phoneNumber, input.resetToken, input.newPassword);
    return true;
  }

  @Public()
  @Mutation(() => Boolean, {
    description:
      'Sign out THIS device: revokes the refresh token it holds and clears the cookie. ' +
      'Other devices stay signed in — use signOutEverywhere for those. Public and ' +
      'idempotent, so it still clears up when the access token has already expired.',
  })
  async signOut(
    @Context() ctx: GqlContext,
    @Args('input', { nullable: true }) input?: RefreshSessionInput,
  ): Promise<boolean> {
    const presented = this.sessions.presentedToken(ctx, input?.refreshToken);
    if (presented) await this.authService.signOutSession(presented);
    this.sessions.clear(ctx);
    return true;
  }

  @AllowWhilePasswordPending()
  @Mutation(() => AuthPayload, {
    description:
      'Change your own password, proving the current one. Returns a fresh session, because ' +
      'the change invalidates every token including the one that made this call.',
  })
  async changeMyPassword(
    @CurrentUser() actor: AuthUser,
    @Args('input') input: ChangePasswordInput,
    @Context() ctx: GqlContext,
  ): Promise<AuthPayload> {
    const user = await this.authService.changePassword(
      actor.id,
      input.currentPassword,
      input.newPassword,
    );
    const token = await this.authService.issueTokenForUser(user);
    return this.sessions.open(user, token, ctx);
  }

  @Mutation(() => Boolean, {
    description:
      "Sign out every device: bumps the caller's tokenVersion and revokes all their refresh " +
      'tokens. For a lost phone, or a shared number.',
  })
  async signOutEverywhere(
    @CurrentUser() actor: AuthUser,
    @Context() ctx: GqlContext,
  ): Promise<boolean> {
    await this.authService.invalidateSessions(actor.id, 'signed out everywhere');
    this.sessions.clear(ctx);
    return true;
  }
}
