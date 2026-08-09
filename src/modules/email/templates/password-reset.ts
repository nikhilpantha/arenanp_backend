export function passwordResetTemplate(fullName: string, resetUrl: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #0f172a; max-width: 600px; margin: 0 auto; padding: 0;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 700;">Reset Your Password</h1>
        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px;">Arena NP Admin Portal</p>
      </div>

      <!-- Content -->
      <div style="background: #f8fafc; padding: 40px 30px; border-radius: 0 0 8px 8px;">
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #0f172a;">Hi ${fullName},</p>

        <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569;">
          We received a request to reset your password. Click the button below to create a new password. This link will expire in <strong>24 hours</strong>.
        </p>

        <p style="margin: 0 0 30px 0; font-size: 14px; color: #78350f; background: #fef3c7; padding: 12px; border-radius: 4px; border-left: 4px solid #f59e0b;">
          ⚠️ If you didn't request this, you can safely ignore this email.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="
            display: inline-block;
            background: #f59e0b;
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.2s;
          " onmouseover="this.style.background='#d97706'" onmouseout="this.style.background='#f59e0b'">
            Reset Password →
          </a>
        </div>

        <p style="margin: 30px 0 20px 0; font-size: 14px; color: #6b7280;">Or copy this link:</p>
        <p style="margin: 0 0 30px 0; padding: 12px; background: white; border-left: 4px solid #f59e0b; font-size: 13px; color: #475569; word-break: break-all; border-radius: 4px;">
          ${resetUrl}
        </p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

        <h3 style="margin: 20px 0 10px 0; font-size: 14px; color: #0f172a; font-weight: 600;">Security Tips:</h3>
        <ul style="margin: 10px 0 30px 20px; padding: 0; font-size: 14px; color: #475569;">
          <li style="margin-bottom: 8px;">Use a strong, unique password</li>
          <li style="margin-bottom: 8px;">Don't share your password with anyone</li>
          <li>Change your password regularly</li>
        </ul>

        <p style="margin: 20px 0; font-size: 14px; color: #475569;">
          <strong style="color: #0f172a;">Need help?</strong> Contact support at <a href="mailto:support@arenanp.com" style="color: #f59e0b; text-decoration: none;">support@arenanp.com</a>
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
