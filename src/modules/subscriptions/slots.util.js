"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTime = parseTime;
exports.formatTime = formatTime;
exports.normaliseWindows = normaliseWindows;
exports.normaliseDays = normaliseDays;
exports.parseWindows = parseWindows;
exports.assertSlotInWindows = assertSlotInWindows;
var common_1 = require("@nestjs/common");
var TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
/** "HH:mm" → minutes since midnight. Throws on malformed input. */
function parseTime(value) {
    var m = TIME_RE.exec(value.trim());
    if (!m)
        throw new common_1.BadRequestException("Invalid time \"".concat(value, "\" (expected HH:mm)."));
    return Number(m[1]) * 60 + Number(m[2]);
}
/** minutes since midnight → "HH:mm". */
function formatTime(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return "".concat(String(h).padStart(2, '0'), ":").concat(String(m).padStart(2, '0'));
}
/**
 * Validate + normalise the owner's "HH:mm-HH:mm" bands. Each must be well-formed with
 * end after start; at least one is required. Returns the canonical string list.
 */
function normaliseWindows(windows) {
    if (!windows || windows.length === 0) {
        throw new common_1.BadRequestException('Add at least one subscription time band.');
    }
    return windows.map(function (w) {
        var _a = w.split('-').map(function (s) { return s.trim(); }), start = _a[0], end = _a[1];
        var startMin = parseTime(start !== null && start !== void 0 ? start : '');
        var endMin = parseTime(end !== null && end !== void 0 ? end : '');
        if (endMin <= startMin) {
            throw new common_1.BadRequestException("Band \"".concat(w, "\" must end after it starts."));
        }
        return "".concat(formatTime(startMin), "-").concat(formatTime(endMin));
    });
}
var DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
/**
 * Validate + normalise a plan's weekday keys: lowercase, deduped, week order.
 * Hold-matching does `daysOfWeek.includes(nepalWeekday(...))` with these exact
 * lowercase keys, so anything else stored here would silently never match.
 */
function normaliseDays(days) {
    if (!days || days.length === 0)
        return [];
    var wanted = new Set(days.map(function (d) { return d.trim().toLowerCase(); }));
    for (var _i = 0, wanted_1 = wanted; _i < wanted_1.length; _i++) {
        var day = wanted_1[_i];
        if (!DAY_KEYS.includes(day)) {
            throw new common_1.BadRequestException("Invalid weekday \"".concat(day, "\" (expected sun..sat)."));
        }
    }
    return DAY_KEYS.filter(function (d) { return wanted.has(d); });
}
/** Parse stored "HH:mm-HH:mm" bands into numeric windows. */
function parseWindows(windows) {
    return windows.map(function (w) {
        var _a = w.split('-'), start = _a[0], end = _a[1];
        return { startMin: parseTime(start !== null && start !== void 0 ? start : ''), endMin: parseTime(end !== null && end !== void 0 ? end : '') };
    });
}
/**
 * Assert a chosen start time yields a session that fits entirely inside one of the
 * plan's bands. Returns the normalised "HH:mm" start on success.
 */
function assertSlotInWindows(slotStart, sessionMinutes, windows) {
    var start = parseTime(slotStart);
    var end = start + sessionMinutes;
    var fits = parseWindows(windows).some(function (w) { return start >= w.startMin && end <= w.endMin; });
    if (!fits) {
        throw new common_1.BadRequestException('The selected time does not fit within an allowed subscription band.');
    }
    return formatTime(start);
}
