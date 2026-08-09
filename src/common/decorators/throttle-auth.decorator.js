"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottleAuth = void 0;
var throttler_1 = require("@nestjs/throttler");
/**
 * The tight per-IP budget for anything that accepts a credential — a password,
 * an OTP code, a reset token.
 *
 * The global limit is sized for ordinary API traffic and is far too generous
 * to stop a password guess: 120 attempts a minute against a login is a
 * successful attack, not rate limiting. These endpoints get ~10 attempts per
 * five minutes instead.
 *
 * It matters most for staff accounts, whose login emails are derived from a
 * name and a venue slug and are therefore guessable by design — the password
 * is the only secret, so the number of guesses has to be small.
 *
 * Per-IP, so it is a speed bump against a distributed attempt rather than a
 * wall. The per-phone OTP cooldown and the reset ticket's single use are the
 * other half; together they make credential stuffing expensive rather than
 * free.
 */
var ThrottleAuth = function () {
    var _a, _b;
    return (0, throttler_1.Throttle)({
        default: {
            ttl: parseInt((_a = process.env.THROTTLE_AUTH_TTL) !== null && _a !== void 0 ? _a : '300', 10) * 1000,
            limit: parseInt((_b = process.env.THROTTLE_AUTH_LIMIT) !== null && _b !== void 0 ? _b : '10', 10),
        },
    });
};
exports.ThrottleAuth = ThrottleAuth;
