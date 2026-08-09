"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nepalWeekday = nepalWeekday;
exports.formatClock = formatClock;
exports.nepalClockRange = nepalClockRange;
exports.dayLabel = dayLabel;
var nepal_time_1 = require("../../common/utils/nepal-time");
var DOW = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
/** Nepal-local weekday ("sun".."sat") for an absolute instant. */
function nepalWeekday(d) {
    var shifted = new Date(d.getTime() + nepal_time_1.NEPAL_UTC_OFFSET_MINUTES * 60000);
    return DOW[shifted.getUTCDay()];
}
/** Minutes-since-midnight → friendly 12-hour clock, e.g. 360 → "6 AM", 1290 → "9:30 PM". */
function formatClock(minutes) {
    var total = ((minutes % 1440) + 1440) % 1440;
    var h = Math.floor(total / 60);
    var m = total % 60;
    var period = h < 12 ? 'AM' : 'PM';
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return m === 0 ? "".concat(h12, " ").concat(period) : "".concat(h12, ":").concat(String(m).padStart(2, '0'), " ").concat(period);
}
/** "6 AM to 7 AM" for a booking's absolute start/end, in Nepal wall-clock time. */
function nepalClockRange(startAt, endAt) {
    return "".concat(formatClock((0, nepal_time_1.utcToNepalMinutesOfDay)(startAt)), " to ").concat(formatClock((0, nepal_time_1.utcToNepalMinutesOfDay)(endAt)));
}
var DAY_NAME = {
    sun: 'Sundays',
    mon: 'Mondays',
    tue: 'Tuesdays',
    wed: 'Wednesdays',
    thu: 'Thursdays',
    fri: 'Fridays',
    sat: 'Saturdays',
};
/** Plural weekday label for messages, e.g. "Mondays". */
function dayLabel(d) {
    return DAY_NAME[d];
}
