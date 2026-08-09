"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEPAL_UTC_OFFSET_MINUTES = void 0;
exports.parseHHmmToMinutes = parseHHmmToMinutes;
exports.nepalWallTimeToUtc = nepalWallTimeToUtc;
exports.utcToNepalMinutesOfDay = utcToNepalMinutesOfDay;
exports.dayBounds = dayBounds;
exports.resolveRange = resolveRange;
/**
 * Asia/Kathmandu is a fixed UTC+05:45 offset with no daylight saving, so wall-clock
 * conversions need only a constant offset — no tz database / dependency required.
 * (The configured `app.timezone` stays the source of truth for what this represents.)
 */
exports.NEPAL_UTC_OFFSET_MINUTES = 5 * 60 + 45; // 345
var TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
/** Minutes-since-midnight for a "HH:mm" string. Throws on a malformed value. */
function parseHHmmToMinutes(time) {
    var m = TIME_RE.exec(time);
    if (!m)
        throw new Error("Invalid HH:mm time: ".concat(time));
    return Number(m[1]) * 60 + Number(m[2]);
}
/**
 * Convert a Nepal-local date ("yyyy-mm-dd") + minutes-since-midnight to the absolute
 * UTC instant. `Date.UTC` builds the instant as if the wall time were UTC; subtracting
 * the offset shifts it to the real UTC moment for Kathmandu.
 */
function nepalWallTimeToUtc(date, minutesSinceMidnight) {
    var _a = date.split('-').map(Number), y = _a[0], mo = _a[1], d = _a[2];
    var base = Date.UTC(y, mo - 1, d, 0, 0) + minutesSinceMidnight * 60000;
    return new Date(base - exports.NEPAL_UTC_OFFSET_MINUTES * 60000);
}
var DAY_MINUTES = 24 * 60;
/** Nepal-local minutes-since-midnight for an absolute instant (0–1439). */
function utcToNepalMinutesOfDay(d) {
    var shifted = d.getTime() + exports.NEPAL_UTC_OFFSET_MINUTES * 60000;
    var min = Math.floor(shifted / 60000) % DAY_MINUTES;
    return (min + DAY_MINUTES) % DAY_MINUTES;
}
var MS_PER_DAY = 86400000;
/**
 * UTC day window [start, nextDay) for a `Date`. The platform treats the UTC day as
 * the business day: a venue opens at 06:00 Nepal — well after the 05:45 offset — so a
 * UTC day cleanly contains one Nepal trading day. Booking + finance share this so
 * "today" matches across every owner surface.
 */
function dayBounds(d) {
    var gte = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    var lt = new Date(gte);
    lt.setUTCDate(lt.getUTCDate() + 1);
    return { gte: gte, lt: lt };
}
/** Resolve a finance range preset (or explicit from/to) to a UTC [gte, lt) window. */
function resolveRange(input) {
    var _a;
    if ((input === null || input === void 0 ? void 0 : input.from) && (input === null || input === void 0 ? void 0 : input.to)) {
        var gte_1 = dayBounds(new Date("".concat(input.from, "T00:00:00.000Z"))).gte;
        var lt = dayBounds(new Date("".concat(input.to, "T00:00:00.000Z"))).lt;
        return withDays(gte_1, lt);
    }
    var today = dayBounds(new Date());
    var gte = new Date(today.gte);
    switch ((_a = input === null || input === void 0 ? void 0 : input.preset) !== null && _a !== void 0 ? _a : 'MONTH') {
        case 'TODAY':
            return withDays(today.gte, today.lt);
        case 'WEEK':
            gte.setUTCDate(gte.getUTCDate() - 6); // last 7 days incl. today
            break;
        case 'YEAR':
            gte.setUTCFullYear(gte.getUTCFullYear() - 1);
            gte.setUTCDate(gte.getUTCDate() + 1);
            break;
        case 'MONTH':
        default:
            gte.setUTCDate(gte.getUTCDate() - 29); // last 30 days incl. today
            break;
    }
    return withDays(gte, today.lt);
}
function withDays(gte, lt) {
    return { gte: gte, lt: lt, days: Math.max(1, Math.round((lt.getTime() - gte.getTime()) / MS_PER_DAY)) };
}
