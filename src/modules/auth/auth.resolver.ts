import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { OtpRequestResult } from './dto/otp-request-result';
import { AuthPayload } from './dto/auth-payload';
import { Public } from '../../common/decorators/public.decorator';
import { mapUserToGraphql } from '../users/dto/user.model';

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
}
