"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('app', function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    return ({
        env: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development',
        port: parseInt((_b = process.env.APP_PORT) !== null && _b !== void 0 ? _b : '4000', 10),
        name: (_c = process.env.APP_NAME) !== null && _c !== void 0 ? _c : 'arenanp-backend',
        url: (_d = process.env.APP_URL) !== null && _d !== void 0 ? _d : 'http://localhost:4000',
        timezone: (_e = process.env.APP_TIMEZONE) !== null && _e !== void 0 ? _e : 'Asia/Kathmandu',
        corsOrigins: ((_f = process.env.CORS_ORIGINS) !== null && _f !== void 0 ? _f : '')
            .split(',')
            .map(function (o) { return o.trim(); })
            .filter(Boolean),
        logLevel: (_g = process.env.LOG_LEVEL) !== null && _g !== void 0 ? _g : 'info',
        throttle: {
            ttl: parseInt((_h = process.env.THROTTLE_TTL) !== null && _h !== void 0 ? _h : '60', 10),
            limit: parseInt((_j = process.env.THROTTLE_LIMIT) !== null && _j !== void 0 ? _j : '120', 10),
        },
        jwt: {
            accessSecret: (_k = process.env.JWT_ACCESS_SECRET) !== null && _k !== void 0 ? _k : '',
            /// Short on purpose — a leaked access token is only useful for this long, and
            /// the refresh token silently mints the next one.
            accessTtl: (_l = process.env.JWT_ACCESS_TTL) !== null && _l !== void 0 ? _l : '15m',
        },
        refresh: {
            /// Go this long without using Arena NP and you have to sign in again. Every
            /// refresh pushes the deadline out, so an active user is never logged out.
            inactivityDays: parseInt((_m = process.env.REFRESH_INACTIVITY_DAYS) !== null && _m !== void 0 ? _m : '7', 10),
            /// Cookie name holding the refresh token on web (httpOnly, JS can't read it).
            cookieName: (_o = process.env.REFRESH_COOKIE_NAME) !== null && _o !== void 0 ? _o : 'arenanp_refresh',
            /// Set to `.arenanp.com` in production so every console subdomain shares the
            /// session. Left blank in dev, where the host is plain `localhost`.
            cookieDomain: (_p = process.env.REFRESH_COOKIE_DOMAIN) !== null && _p !== void 0 ? _p : '',
        },
        otp: {
            length: parseInt((_q = process.env.OTP_LENGTH) !== null && _q !== void 0 ? _q : '6', 10),
            ttlSeconds: parseInt((_r = process.env.OTP_TTL_SECONDS) !== null && _r !== void 0 ? _r : '300', 10),
            maxAttempts: parseInt((_s = process.env.OTP_MAX_ATTEMPTS) !== null && _s !== void 0 ? _s : '5', 10),
            resendCooldownSeconds: parseInt((_t = process.env.OTP_RESEND_COOLDOWN_SECONDS) !== null && _t !== void 0 ? _t : '60', 10),
        },
        sms: {
            provider: (_u = process.env.SMS_PROVIDER) !== null && _u !== void 0 ? _u : 'stub',
            apiKey: (_v = process.env.SMS_API_KEY) !== null && _v !== void 0 ? _v : '',
            senderId: (_w = process.env.SMS_SENDER_ID) !== null && _w !== void 0 ? _w : 'ArenaNP',
        },
    });
});
