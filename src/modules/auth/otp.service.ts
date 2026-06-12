import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomInt } from 'crypto';
import { RedisService } from '../../redis/redis.service';
import { REDIS_KEYS } from '../../common/constants';
import type { AppConfig } from '../../config/app.config';

/**
 * Dev master OTP — always accepted when SMS_PROVIDER=stub, so you can sign in
 * without reading the generated code. Strictly gated to the stub provider, so it
 * is impossible to use against a real SMS provider in production.
 */
const DEV_MASTER_OTP = '123456';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    private readonly redis: RedisService,
    private readonly config: ConfigService,
  ) {}

  private get otp() {
    return this.config.get<AppConfig['otp']>('app.otp')!;
  }

  private get sms() {
    return this.config.get<AppConfig['sms']>('app.sms')!;
  }

  /**
   * Generate + store an OTP for the given phone. Returns the result the
   * resolver should send back to the client.
   */
  async issue(phoneNumber: string): Promise<{
    expiresInSeconds: number;
    resendAvailableInSeconds: number;
    devCode?: string;
  }> {
    // Enforce resend cooldown.
    const cooldownKey = REDIS_KEYS.otpResendCooldown(phoneNumber);
    const cooldownTtl = await this.redis.ttl(cooldownKey);
    if (cooldownTtl > 0) {
      throw new BadRequestException(`Please wait ${cooldownTtl}s before requesting another OTP.`);
    }

    const code = this.generateCode();
    await this.redis.setEx(REDIS_KEYS.otpCode(phoneNumber), this.otp.ttlSeconds, code);
    await this.redis.del(REDIS_KEYS.otpAttempts(phoneNumber));
    await this.redis.setEx(cooldownKey, this.otp.resendCooldownSeconds, '1');

    await this.send(phoneNumber, code);

    return {
      expiresInSeconds: this.otp.ttlSeconds,
      resendAvailableInSeconds: this.otp.resendCooldownSeconds,
      devCode: this.sms.provider === 'stub' ? code : undefined,
    };
  }

  /**
   * Verify the OTP. On success, deletes the code so it can't be reused.
   * Throws on miss / mismatch / too-many-attempts.
   */
  async verify(phoneNumber: string, code: string): Promise<void> {
    // Dev master code: accepted forever in stub mode (no expiry / attempt limits).
    if (this.sms.provider === 'stub' && code === DEV_MASTER_OTP) {
      await this.redis.del(REDIS_KEYS.otpCode(phoneNumber));
      await this.redis.del(REDIS_KEYS.otpAttempts(phoneNumber));
      return;
    }

    const stored = await this.redis.get(REDIS_KEYS.otpCode(phoneNumber));
    if (!stored) {
      throw new BadRequestException('OTP expired or never requested. Request a new one.');
    }

    const attempts = await this.redis.incr(REDIS_KEYS.otpAttempts(phoneNumber));
    if (attempts === 1) {
      // First attempt — sync the attempts key's TTL with the code's TTL.
      await this.redis.expire(REDIS_KEYS.otpAttempts(phoneNumber), this.otp.ttlSeconds);
    }

    if (attempts > this.otp.maxAttempts) {
      await this.redis.del(REDIS_KEYS.otpCode(phoneNumber));
      throw new BadRequestException('Too many incorrect attempts. Request a new OTP.');
    }

    if (stored !== code) {
      throw new BadRequestException('Invalid OTP.');
    }

    await this.redis.del(REDIS_KEYS.otpCode(phoneNumber));
    await this.redis.del(REDIS_KEYS.otpAttempts(phoneNumber));
  }

  private generateCode(): string {
    const len = this.otp.length;
    const min = 10 ** (len - 1);
    const max = 10 ** len;
    return String(randomInt(min, max));
  }

  private async send(phoneNumber: string, code: string): Promise<void> {
    if (this.sms.provider === 'stub') {
      this.logger.log(`[OTP-STUB] ${phoneNumber} → ${code}`);
      return;
    }
    // TODO: plug in Sparrow SMS / Twilio / etc.
    this.logger.warn(`SMS provider ${this.sms.provider} is not implemented yet`);
  }
}
