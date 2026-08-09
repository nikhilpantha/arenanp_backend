"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_KEYS = void 0;
exports.REDIS_KEYS = {
    otpCode: function (phone) { return "otp:code:".concat(phone); },
    otpAttempts: function (phone) { return "otp:attempts:".concat(phone); },
    otpResendCooldown: function (phone) { return "otp:resend:".concat(phone); },
    /** Single-use ticket handed out once a password-reset code checks out. */
    passwordResetTicket: function (phone) { return "pwreset:ticket:".concat(phone); },
};
