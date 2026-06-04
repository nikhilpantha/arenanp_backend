import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { LoginWithEmailInput } from './dto/login-with-email.input';
import { OtpRequestResult } from './dto/otp-request-result';
import { AuthPayload } from './dto/auth-payload';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { mapUserToGraphql } from '../users/dto/user.model';
import type { AuthUser } from '../../common/types/auth-context';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => OtpRequestResult, {
    description: 'Send an OTP to the given phone. Creates a stub user on first request.',
  })
  async requestOtp(@Args('input') input: RequestOtpInput): Promise<OtpRequestResult> {
    return this.authService.requestOtp(input.phoneNumber);
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

  @Mutation(() => Boolean, {
    description:
      'Sign the caller out by bumping their tokenVersion. Every previously-issued access token is rejected on the next request.',
  })
  async signOut(@CurrentUser() actor: AuthUser): Promise<boolean> {
    await this.authService.invalidateSessions(actor.id);
    return true;
  }
}
