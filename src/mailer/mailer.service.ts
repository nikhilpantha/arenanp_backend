import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SendEmailArgs {
  to: string;
  subject: string;
  text: string;
  /** Optional HTML — stub logs only the text body. */
  html?: string;
}

/**
 * Transport-agnostic mailer. In dev (`MAIL_PROVIDER=stub`) we just log to the
 * console so links are clickable from the terminal. Swap in SendGrid / Resend /
 * SES by implementing a real `send()` branch for non-stub providers.
 */
@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  constructor(private readonly config: ConfigService) {}

  get from(): string {
    return this.config.get<string>('MAIL_FROM') ?? 'noreply@arenanp.local';
  }

  get provider(): string {
    return this.config.get<string>('MAIL_PROVIDER') ?? 'stub';
  }

  async send(args: SendEmailArgs): Promise<void> {
    if (this.provider === 'stub') {
      this.logger.log(
        `\n────────────────────────────────────────────────────────────\n` +
          `[Mailer:stub] To: ${args.to}\n` +
          `Subject: ${args.subject}\n` +
          `From: ${this.from}\n\n` +
          `${args.text}\n` +
          `────────────────────────────────────────────────────────────`,
      );
      return;
    }
    // TODO: integrate the real provider (SendGrid / Resend / SES).
    this.logger.warn(
      `MAIL_PROVIDER=${this.provider} is set but no real transport is wired up yet — email to ${args.to} was dropped.`,
    );
  }
}
