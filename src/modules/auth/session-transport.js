"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientKindOf = clientKindOf;
exports.readRefreshToken = readRefreshToken;
exports.setRefreshCookie = setRefreshCookie;
exports.clearRefreshCookie = clearRefreshCookie;
var CLIENT_HEADER = 'x-arenanp-client';
/** Which transport this caller wants. Anything unrecognised is treated as a browser. */
function clientKindOf(req) {
    var _a;
    var raw = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a[CLIENT_HEADER];
    var value = Array.isArray(raw) ? raw[0] : raw;
    return (value === null || value === void 0 ? void 0 : value.toLowerCase()) === 'app' ? 'app' : 'web';
}
/** The refresh token this request carries, from the cookie or an explicit argument. */
function readRefreshToken(req, settings, fromInput) {
    var _a, _b;
    // The app sends it explicitly; a browser never does, and never should.
    if (fromInput)
        return fromInput;
    return (_b = parseCookies((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.cookie)[settings.cookieName]) !== null && _b !== void 0 ? _b : null;
}
function setRefreshCookie(res, refresh, settings, isProd) {
    var _a;
    (_a = res === null || res === void 0 ? void 0 : res.cookie) === null || _a === void 0 ? void 0 : _a.call(res, settings.cookieName, refresh.token, __assign(__assign({}, cookieOptions(settings, isProd)), { 
        // Matches the token's own sliding expiry, so the cookie dies with the session.
        expires: refresh.expiresAt }));
}
function clearRefreshCookie(res, settings, isProd) {
    var _a;
    (_a = res === null || res === void 0 ? void 0 : res.clearCookie) === null || _a === void 0 ? void 0 : _a.call(res, settings.cookieName, cookieOptions(settings, isProd));
}
function cookieOptions(settings, isProd) {
    return __assign({ httpOnly: true, 
        // `Lax` is enough because the API and the consoles share a registrable domain
        // (api.arenanp.com ↔ venue.arenanp.com, and plain `localhost` in dev), so the
        // refresh call counts as same-site. It also means the cookie is not sent from
        // anyone else's site, which is the CSRF protection we want.
        sameSite: 'lax', secure: isProd, 
        // Sent on every request to the API. Narrowing it to a /auth path would break
        // the GraphQL endpoint, which is where refreshSession lives.
        path: '/' }, (settings.cookieDomain ? { domain: settings.cookieDomain } : {}));
}
/** Minimal `Cookie:` header parse — avoids pulling in cookie-parser for one read. */
function parseCookies(header) {
    if (!header)
        return {};
    var out = {};
    for (var _i = 0, _a = header.split(';'); _i < _a.length; _i++) {
        var part = _a[_i];
        var eq = part.indexOf('=');
        if (eq < 1)
            continue;
        var name_1 = part.slice(0, eq).trim();
        if (!name_1 || name_1 in out)
            continue;
        out[name_1] = decodeURIComponent(part.slice(eq + 1).trim());
    }
    return out;
}
