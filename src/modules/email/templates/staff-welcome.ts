export function staffWelcomeTemplate(fullName: string, setupUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Welcome to Arena NP</h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px;">Admin Portal</p>
      </div>

      <!-- Content -->
      <div style="background: #f8fafc; padding: 40px 30px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #0f172a;">Hi ${fullName},</p>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">
          Your staff account has been created on Arena NP. To get started, please set your password by clicking the button below. This link will expire in <strong>24 hours</strong>.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${setupUrl}" style="
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.2s;
          " onmouseover="this.style.background='#047857'" onmouseout="this.style.background='#10b981'">
            Set Your Password →
          </a>
        </div>

        <p style="margin: 30px 0 20px 0; font-size: 14px; color: #6b7280;">Or copy this link:</p>
        <p style="margin: 0 0 30px 0; padding: 12px; background: white; border-left: 4px solid #10b981; font-size: 13px; color: #475569; word-break: break-all; border-radius: 4px;">
          ${setupUrl}
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

        <p style="margin: 20px 0; font-size: 14px; color: #475569;">
          <strong style="color: #0f172a;">Questions?</strong> Contact support at <a href="mailto:support@arenanp.com" style="color: #10b981; text-decoration: none;">support@arenanp.com</a>
        </p>

        <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
          This is an automated message. Please do not reply to this email.
        </p>
      </div>

      <!-- Footer -->
      <div style="background: #0f172a; color: #d1d5db; padding: 20px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">© Arena NP. All rights reserved.</p>
      </div>
    </div>
  `;
}
