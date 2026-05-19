export const REDIS_KEYS = {
  otpCode: (phone: string) => `otp:code:${phone}`,
  otpAttempts: (phone: string) => `otp:attempts:${phone}`,
  otpResendCooldown: (phone: string) => `otp:resend:${phone}`,
};
