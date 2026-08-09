import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpInput } from './dto/request-otp.input';
import { VerifyOtpInput } from './dto/verify-otp.input';
import { LoginWithEmailInput } from './dto/login-with-email.input';
import { Public } from '../../common/decorators/public.decorator';
import { ThrottleAuth } from '../../common/decorators/throttle-auth.decorator';

/**
 * Thin REST surface for auth.
 *
 * GraphQL is the primary entry point, but a REST mirror is handy for:
 *  - OTP "callback"-style integrations from SMS providers (delivery receipts).
 *  - Quick smoke testing from cURL / health probes that can't speak GraphQL.
 */
@Controller('auth')
// Every route here takes a credential, so the tight limiter applies to all of
// them — this surface must not be a rate-limit bypass for the GraphQL one.
@ThrottleAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('otp/request')
  @HttpCode(HttpStatus.OK)
  async requestOtp(@Body() body: RequestOtpInput) {
    return this.authService.requestOtp(body.phoneNumber);
  }

  @Public()
  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() body: VerifyOtpInput) {
    const { user, token } = await this.authService.verifyOtp(body.phoneNumber, body.code);
    const refresh = await this.authService.openSession(user);
    return {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      expiresAt: token.expiresAt,
      // No cookie on this surface: it exists for cURL and integrations, which have
      // nowhere to keep one. Browsers use the GraphQL mutations, which do set it.
      refreshToken: refresh.token,
      refreshExpiresAt: refresh.expiresAt,
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginWithEmail(@Body() body: LoginWithEmailInput) {
    const { user, token } = await this.authService.loginWithEmail(body.email, body.password);
    const refresh = await this.authService.openSession(user);
    return {
      accessToken: token.accessToken,
      tokenType: token.tokenType,
      expiresAt: token.expiresAt,
      refreshToken: refresh.token,
      refreshExpiresAt: refresh.expiresAt,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
