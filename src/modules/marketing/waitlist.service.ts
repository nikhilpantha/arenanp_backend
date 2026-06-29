import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { MailerService } from '../../mailer/mailer.service';
import { JoinWaitlistDto } from './dto/waitlist.dto';

@Injectable()
export class WaitlistService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  /// Generate a 6-digit verification code
  private generateVerificationToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async joinWaitlist(dto: JoinWaitlistDto) {
    const { email, source } = dto;

    // Check if email already exists
    const existing = await this.prisma.waitlist.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('Email already on waitlist');
    }

    // Validate email format (additional validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    // Generate verification token
    const verificationToken = this.generateVerificationToken();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create waitlist entry
    const entry = await this.prisma.waitlist.create({
      data: {
        email,
        source: source || 'landing',
        verificationToken,
        verificationTokenExpiresAt: tokenExpiresAt,
        metadata: {
          createdAt: new Date().toISOString(),
        },
      },
    });

    // Send verification email
    await this.sendVerificationEmail(email, verificationToken);

    return {
      id: entry.id,
      email: entry.email,
      joinedAt: entry.joinedAt,
      isVerified: entry.isVerified,
      message: 'Welcome to the waitlist! Check your email to verify your signup.',
    };
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `${process.env.APP_URL || 'http://localhost:3003'}/verify?token=${token}`;

    await this.mailer.send({
      to: email,
      subject: 'Verify your Arena NP waitlist signup',
      text: `
Welcome to the Arena NP waitlist!

Your verification code is: ${token}

Or click the link to verify: ${verificationLink}

This link expires in 24 hours.

Thanks,
The Arena NP Team
      `,
      html: `
<h2>Welcome to the Arena NP waitlist!</h2>
<p>Your verification code is: <strong>${token}</strong></p>
<p><a href="${verificationLink}">Click here to verify your email</a></p>
<p>This link expires in 24 hours.</p>
<p>Thanks,<br/>The Arena NP Team</p>
      `,
    });
  }

  async verifyEmail(token: string): Promise<{ success: boolean; email: string }> {
    const entry = await this.prisma.waitlist.findFirst({
      where: { verificationToken: token },
    });

    if (!entry) {
      throw new NotFoundException('Invalid verification token');
    }

    // Check if token has expired
    if (entry.verificationTokenExpiresAt && entry.verificationTokenExpiresAt < new Date()) {
      throw new BadRequestException('Verification token has expired');
    }

    // Mark as verified
    const updated = await this.prisma.waitlist.update({
      where: { id: entry.id },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        verificationToken: null, // Clear the token
      },
    });

    return {
      success: true,
      email: updated.email,
    };
  }

  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    const entry = await this.prisma.waitlist.findUnique({
      where: { email },
    });

    if (!entry) {
      throw new NotFoundException('Email not found on waitlist');
    }

    if (entry.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    // Generate new token
    const newToken = this.generateVerificationToken();
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Update with new token
    await this.prisma.waitlist.update({
      where: { id: entry.id },
      data: {
        verificationToken: newToken,
        verificationTokenExpiresAt: tokenExpiresAt,
      },
    });

    // Resend email
    await this.sendVerificationEmail(email, newToken);

    return {
      message: 'Verification email resent. Check your inbox.',
    };
  }

  async getWaitlistStats() {
    const total = await this.prisma.waitlist.count();
    const verified = await this.prisma.waitlist.count({
      where: { isVerified: true },
    });
    const bySource = await this.prisma.waitlist.groupBy({
      by: ['source'],
      _count: true,
    });

    return {
      totalSignups: total,
      verifiedUsers: verified,
      pendingVerification: total - verified,
      bySource: bySource.map((s) => ({
        source: s.source || 'unknown',
        count: s._count,
      })),
    };
  }

  async markNotified(email: string) {
    return this.prisma.waitlist.update({
      where: { email },
      data: {
        notifiedAt: new Date(),
      },
    });
  }
}
