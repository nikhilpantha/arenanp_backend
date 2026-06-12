import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CapabilityType } from '@prisma/client';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { LoginWithEmailInput } from './dto/login-with-email.input';
import { LoginWithPhoneInput } from './dto/login-with-phone.input';
import { OtpRequestResult } from './dto/otp-request-result';
import { AuthPayload } from './dto/auth-payload';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { mapUserToGraphql } from '../users/dto/user.model';
import type { AuthUser } from '../../common/types/auth-context';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // ── Per-role sign-up / sign-in. The role is fixed server-side (never a client
  // param). Each sends an OTP and ensures that capability on the same number,
  // creating it the first time ("roleAdded"). Used by both sign-up and sign-in.

  @Public()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP and ensure the PLAYER role for this phone (granted instantly).',
  })
  async requestPlayerOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber, CapabilityType.PLAYER, input.password);
  }

  @Public()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP and ensure the VENUE (owner) role for this phone.',
  })
  async requestVenueOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber, CapabilityType.VENUE, input.password);
  }

  @Public()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP and ensure the ORGANIZER role for this phone.',
  })
  async requestOrganizerOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber, CapabilityType.ORGANIZER, input.password);
  }

  @Public()
  @Mutation(() => AuthPayload, {
    description: 'Verify an OTP and return an access token.',
  })
  async verifyOtp(@Args('input') input: VerifyOtpInput): Promise<AuthPayload> {
    const { user, token } = await this.authService.verifyOtp(input.phoneNumber, input.code);
    return {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      expiresAt: token.expiresAt,
      user: mapUserToGraphql(user),
    };
  }

  @Public()
  @Mutation(() => AuthPayload, {
    description:
      'Email + password login. Used by admin / venue-management web panels. Mobile users use OTP.',
  })
  async loginWithEmail(@Args('input') input: LoginWithEmailInput): Promise<AuthPayload> {
    const { user, token } = await this.authService.loginWithEmail(input.email, input.password);
    return {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      expiresAt: token.expiresAt,
      user: mapUserToGraphql(user),
    };
  }

  @Public()
  @Mutation(() => AuthPayload, {
    description:
      'Phone + password login (mobile). Only works after the phone has been verified via OTP once.',
  })
  async loginWithPhone(@Args('input') input: LoginWithPhoneInput): Promise<AuthPayload> {
    const { user, token } = await this.authService.loginWithPhonePassword(
      input.phoneNumber,
      input.password,
    );
    return {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      expiresAt: token.expiresAt,
      user: mapUserToGraphql(user),
    };
  }

  @Mutation(() => Boolean, {
    description:
      'Sign the caller out by bumping their tokenVersion. Every previously-issued access token is rejected on the next request.',
  })
  async signOut(@CurrentUser() actor: AuthUser): Promise<boolean> {
    await this.authService.invalidateSessions(actor.id);
    return true;
  }
}
