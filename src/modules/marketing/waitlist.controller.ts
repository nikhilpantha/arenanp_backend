import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { WaitlistService } from './waitlist.service';
import { JoinWaitlistDto, VerifyEmailDto } from './dto/waitlist.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Public()
  @Post('join')
  @HttpCode(HttpStatus.CREATED)
  async joinWaitlist(@Body() dto: JoinWaitlistDto) {
    return this.waitlistService.joinWaitlist(dto);
  }

  @Public()
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.waitlistService.verifyEmail(dto.token);
  }

  @Public()
  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  async resendVerification(@Body() dto: { email: string }) {
    return this.waitlistService.resendVerificationEmail(dto.email);
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    return this.waitlistService.getWaitlistStats();
  }
}
