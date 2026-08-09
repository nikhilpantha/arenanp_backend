"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normaliseNepalPhone = normaliseNepalPhone;
exports.isValidNepalPhone = isValidNepalPhone;
exports.phoneKey = phoneKey;
/**
 * Normalise a Nepal phone number to E.164 (+977XXXXXXXXXX).
 * Accepts inputs like "9800000000", "9779800000000", "+9779800000000".
 * Throws on anything that doesn't look like a Nepal mobile.
 */
function normaliseNepalPhone(input) {
    var trimmed = input.trim().replace(/\s+/g, '');
    var digits = trimmed.replace(/[^\d]/g, '');
    var core = digits;
    if (core.startsWith('977'))
        core = core.slice(3);
    if (core.length === 10 && core.startsWith('9')) {
        return "+977".concat(core);
    }
    throw new Error('Invalid Nepal phone number');
}
function isValidNepalPhone(input) {
    try {
        normaliseNepalPhone(input);
        return true;
    }
    catch (_a) {
        return false;
    }
}
/**
 * Lenient canonical key for matching the same person across bookings (loyalty).
 * Strips non-digits and a leading 977 country code; never throws. Returns the
 * 10-digit core when recognisable, otherwise the raw digits.
 */
function phoneKey(input) {
    var digits = input.replace(/[^\d]/g, '');
    var core = digits.startsWith('977') ? digits.slice(3) : digits;
    return core;
}
