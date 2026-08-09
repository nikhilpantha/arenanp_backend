"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstBookingInMemberSlot = firstBookingInMemberSlot;
var nepal_time_1 = require("../../common/utils/nepal-time");
var availability_util_1 = require("../booking/availability.util");
/**
 * The first one-off booking sitting inside a member's recurring slot.
 *
 * This is the mirror image of the check in `booking.repository`: that one stops a
 * booking landing on a member's slot, this one stops a member's slot being
 * extended or resumed over a booking that is already confirmed. Both have to
 * exist, because either side can move onto the other.
 */
function firstBookingInMemberSlot(slot, bookings) {
    var slotStart = (0, nepal_time_1.parseHHmmToMinutes)(slot.slotStart);
    var slotEnd = slotStart + slot.sessionMinutes;
    for (var _i = 0, bookings_1 = bookings; _i < bookings_1.length; _i++) {
        var booking = bookings_1[_i];
        if (!slot.daysOfWeek.includes((0, availability_util_1.nepalWeekday)(booking.startAt)))
            continue;
        var startMin = (0, nepal_time_1.utcToNepalMinutesOfDay)(booking.startAt);
        var endMin = startMin + Math.round((booking.endAt.getTime() - booking.startAt.getTime()) / 60000);
        if (startMin < slotEnd && endMin > slotStart)
            return booking;
    }
    return null;
}
