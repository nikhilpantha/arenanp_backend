"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertPasswordStrength = assertPasswordStrength;
var common_1 = require("@nestjs/common");
/**
 * Server-side password rules.
 *
 * The web app has enforced these in Yup since registration shipped, but only in
 * the browser — the API accepted anything. That was survivable while every
 * password was chosen by its own owner through that one form. It stops being
 * survivable with staff accounts: the owner types the starter password on
 * someone else's behalf (so "ram1234" is exactly what gets typed), and the
 * matching login address is derived from a name and the venue slug, so it is
 * guessable by design. The password is the only secret, which makes it the
 * only thing worth enforcing here.
 *
 * Deliberately the same shape as `apps/venue/src/lib/auth/schemas.ts` so a
 * password accepted by the form is accepted by the API.
 */
var MIN_LENGTH = 8;
/** Passwords so common that a rule about character classes is beside the point. */
var DENY_LIST = new Set([
    'password',
    'password1',
    'password123',
    'qwerty123',
    '12345678',
    '123456789',
    'arenanp1',
    'arena123',
    'nepal123',
    'welcome1',
    'changeme',
]);
/**
 * Throw unless `password` is strong enough to be the only thing protecting an
 * account whose username someone else can guess.
 */
function assertPasswordStrength(password, context) {
    var _a, _b, _c, _d;
    if (context === void 0) { context = {}; }
    var fail = function (message) {
        throw new common_1.BadRequestException(message);
    };
    if (password.length < MIN_LENGTH)
        fail("Use at least ".concat(MIN_LENGTH, " characters."));
    if (!/[a-z]/.test(password))
        fail('Add a lowercase letter.');
    if (!/[A-Z]/.test(password))
        fail('Add an uppercase letter.');
    if (!/[0-9]/.test(password))
        fail('Add a number.');
    if (!/[^A-Za-z0-9]/.test(password))
        fail('Add a special character.');
    var lowered = password.toLowerCase();
    if (DENY_LIST.has(lowered))
        fail('That password is too common. Pick something else.');
    // The three things an attacker already knows about a staff account.
    var digits = ((_a = context.phoneNumber) !== null && _a !== void 0 ? _a : '').replace(/\D/g, '').slice(-8);
    if (digits.length >= 6 && lowered.includes(digits)) {
        fail("Don't use the phone number in the password.");
    }
    var localPart = (_c = (_b = context.email) === null || _b === void 0 ? void 0 : _b.split('@')[0]) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    if (localPart && localPart.length >= 3 && lowered.includes(localPart)) {
        fail("Don't use the login address in the password.");
    }
    for (var _i = 0, _e = ((_d = context.fullName) !== null && _d !== void 0 ? _d : '').toLowerCase().split(/\s+/); _i < _e.length; _i++) {
        var word = _e[_i];
        if (word.length >= 4 && lowered.includes(word))
            fail("Don't use the name in the password.");
    }
}
