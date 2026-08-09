"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertCourtsMatchSports = assertCourtsMatchSports;
exports.assertCourtMatchesSport = assertCourtMatchesSport;
exports.assertOperatingHours = assertOperatingHours;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var nepal_time_1 = require("../../common/utils/nepal-time");
/**
 * Pure validation for what an owner submits, checked against the platform's
 * sport catalogue. This is the one place the rules live, so `submitVenue` and
 * `setVenueServices` cannot drift — and so no client is trusted to enforce them
 * (there are two clients, and the mobile one predates the catalogue).
 */
/** Courts must use their sport's slot lengths, attributes and features. */
function assertCourtsMatchSports(services, sportsBySlug) {
    var _a;
    for (var _i = 0, services_1 = services; _i < services_1.length; _i++) {
        var service = services_1[_i];
        var sport = sportsBySlug.get(service.sportSlug);
        if (!sport)
            continue; // resolveSports already reported unknown slugs
        for (var _b = 0, _c = ((_a = service.courts) !== null && _a !== void 0 ? _a : []).entries(); _b < _c.length; _b++) {
            var _d = _c[_b], index = _d[0], court = _d[1];
            assertCourtMatchesSport(sport, court, "".concat(sport.name, " ").concat(sport.unitLabel, " ").concat(index + 1));
        }
    }
}
/**
 * The same rules for a single court, so editing one from the console cannot
 * accept what the wizard would reject. `where` names the court in the error —
 * the wizard uses a position ("Futsal court 2"), the settings screen the court's
 * own name, because that is what the owner is looking at.
 */
function assertCourtMatchesSport(sport, court, where) {
    var _a;
    if (where === void 0) { where = sport.unitLabel; }
    if (!sport.slotDurations.includes(court.slotMinutes)) {
        throw new common_1.BadRequestException("".concat(where, ": slot length must be ").concat(list(sport.slotDurations.map(String)), " minutes."));
    }
    assertDurationBounds(where, sport, court);
    assertInCatalogue(where, 'surface', court.surface, sport.surfaces);
    assertInCatalogue(where, 'format', court.format, sport.formats);
    var unknownFeatures = ((_a = court.features) !== null && _a !== void 0 ? _a : []).filter(function (feature) { return !sport.courtFeatures.includes(feature); });
    if (unknownFeatures.length) {
        throw new common_1.BadRequestException("".concat(where, ": unknown feature(s) ").concat(list(unknownFeatures), ". Allowed: ").concat(list(sport.courtFeatures), "."));
    }
    if (sport.bookingMode === client_1.SportBookingMode.CAPACITY && !court.capacity) {
        throw new common_1.BadRequestException("".concat(where, ": set how many places each slot holds \u2014 ").concat(sport.name, " is sold per place, not per ").concat(sport.unitLabel, "."));
    }
}
function assertDurationBounds(where, sport, court) {
    if (sport.minDurationMinutes != null && court.slotMinutes < sport.minDurationMinutes) {
        throw new common_1.BadRequestException("".concat(where, ": ").concat(sport.name, " bookings run at least ").concat(sport.minDurationMinutes, " minutes."));
    }
    if (sport.maxDurationMinutes != null && court.slotMinutes > sport.maxDurationMinutes) {
        throw new common_1.BadRequestException("".concat(where, ": ").concat(sport.name, " bookings run at most ").concat(sport.maxDurationMinutes, " minutes."));
    }
}
function assertInCatalogue(where, label, value, allowed) {
    if (!value)
        return;
    if (!allowed.length) {
        throw new common_1.BadRequestException("".concat(where, ": this sport has no ").concat(label, " options configured."));
    }
    if (!allowed.includes(value)) {
        throw new common_1.BadRequestException("".concat(where, ": \"").concat(value, "\" is not an available ").concat(label, ". Choose from ").concat(list(allowed), "."));
    }
}
/**
 * Closing must come after opening. Unvalidated, `22:00 → 06:00` yields zero
 * bookable slots forever, 0% occupancy and a rejection on every booking — a
 * venue that looks complete and can never be booked.
 */
function assertOperatingHours(openTime, closeTime) {
    if (!openTime || !closeTime)
        return;
    if ((0, nepal_time_1.parseHHmmToMinutes)(closeTime) <= (0, nepal_time_1.parseHHmmToMinutes)(openTime)) {
        throw new common_1.BadRequestException('Closing time must be after opening time. If you close after midnight, use 23:59 for now.');
    }
}
function list(values) {
    if (values.length <= 1)
        return values.join('');
    return "".concat(values.slice(0, -1).join(', '), " or ").concat(values[values.length - 1]);
}
