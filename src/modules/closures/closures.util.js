"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOverlappingClosure = findOverlappingClosure;
exports.formatClosureWindow = formatClosureWindow;
exports.closureConflictMessage = closureConflictMessage;
var nepal_time_1 = require("../../common/utils/nepal-time");
/**
 * The first closure that blocks `[startAt, endAt)` on this court, or null. A closure
 * blocks when it is venue-wide (`courtId = null`) or scoped to this exact court, and
 * its window overlaps the requested one (`startAt < end && endAt > start`).
 */
function findOverlappingClosure(client, opts) {
    return client.venueClosure.findFirst({
        where: {
            venueId: opts.venueId,
            OR: [{ courtId: null }, { courtId: opts.courtId }],
            startAt: { lt: opts.endAt },
            endAt: { gt: opts.startAt },
        },
        select: { startAt: true, endAt: true, reason: true, courtId: true },
    });
}
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Minutes-since-midnight → friendly 12-hour clock, e.g. 360 → "6 AM", 1290 → "9:30 PM". */
function clock(minutes) {
    var total = ((minutes % 1440) + 1440) % 1440;
    var h = Math.floor(total / 60);
    var m = total % 60;
    var period = h < 12 ? 'AM' : 'PM';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? "".concat(h12, " ").concat(period) : "".concat(h12, ":").concat(String(m).padStart(2, '0'), " ").concat(period);
}
/** Nepal-local "Mon D" for an absolute instant, e.g. "Jun 20". */
function nepalDateLabel(d) {
    var shifted = new Date(d.getTime() + nepal_time_1.NEPAL_UTC_OFFSET_MINUTES * 60000);
    return "".concat(MONTHS[shifted.getUTCMonth()], " ").concat(shifted.getUTCDate());
}
/** Nepal-local yyyy-mm-dd key, to detect a single-day window. */
function nepalDayKey(d) {
    var shifted = new Date(d.getTime() + nepal_time_1.NEPAL_UTC_OFFSET_MINUTES * 60000);
    return shifted.toISOString().slice(0, 10);
}
/**
 * Friendly Nepal-local description of a closure window for owner-facing messages.
 * Single day → "Jun 20, 2 PM to 5 PM"; spanning days → "Jun 20 to Jun 22".
 * (A full-day closure ends at the next midnight, so the end date is stepped back a day.)
 */
function formatClosureWindow(startAt, endAt) {
    var startMin = (0, nepal_time_1.utcToNepalMinutesOfDay)(startAt);
    var endMin = (0, nepal_time_1.utcToNepalMinutesOfDay)(endAt);
    var sameDay = nepalDayKey(startAt) === nepalDayKey(endAt);
    var fullDay = startMin === 0 && endMin === 0;
    if (sameDay && !fullDay) {
        return "".concat(nepalDateLabel(startAt), ", ").concat(clock(startMin), " to ").concat(clock(endMin));
    }
    // Multi-day or full-day: the exclusive end midnight belongs to the prior day.
    var lastDay = new Date(endAt.getTime() - 60000);
    var startLabel = nepalDateLabel(startAt);
    var endLabel = nepalDateLabel(lastDay);
    return startLabel === endLabel ? startLabel : "".concat(startLabel, " to ").concat(endLabel);
}
/** Owner-facing conflict message for a closure blocking a requested booking. */
function closureConflictMessage(closure) {
    var window = formatClosureWindow(closure.startAt, closure.endAt);
    var reason = closure.reason ? " (".concat(closure.reason, ")") : '';
    return closure.courtId
        ? "This court is closed ".concat(window).concat(reason, ". Please pick a different time or court.")
        : "The venue is closed ".concat(window).concat(reason, ". Please pick a different time.");
}
