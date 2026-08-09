import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { staffWelcomeTemplate } from './templates/staff-welcome';
import { passwordResetTemplate } from './templates/password-reset';

@Injectable()
export class EmailService {
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    this.resend = new Resend(apiKey);
    this.fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL', 'noreply@arenanp.com');
  }

  async sendStaffWelcomeEmail(email: string, fullName: string, setupUrl: string): Promise<void> {
    try {
      const html = staffWelcomeTemplate(fullName, setupUrl);
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Welcome to Arena NP - Set Your Password',
        html,
      });
    } catch (error) {
      console.error('[EmailService] Failed to send welcome email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, fullName: string, resetUrl: string): Promise<void> {
    try {
      const html = passwordResetTemplate(fullName, resetUrl);
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Reset Your Arena NP Password',
        html,
      });
    } catch (error) {
      console.error('[EmailService] Failed to send reset email:', error);
      throw error;
    }
  }
}
