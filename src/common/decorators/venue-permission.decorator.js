"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireVenuePermission = exports.REQUIRE_VENUE_PERMISSION_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.REQUIRE_VENUE_PERMISSION_KEY = 'requireVenuePermission';
/**
 * Require the caller to hold `permission` at the venue named by the handler's
 * `venueId` argument (or `input.venueId`), enforced by `VenuePermissionGuard`.
 *
 * Permissions are granted per user per venue in `staff_permissions` — there are
 * no venue roles. Two principals bypass the check: platform super admins, and
 * the venue's own owner.
 *
 * @example
 * ＠RequireVenuePermission('venue.bookings.manage')
 * async cancelBooking(＠Args('input') input: CancelBookingInput) {}
 */
var RequireVenuePermission = function (permission) {
    return (0, common_1.SetMetadata)(exports.REQUIRE_VENUE_PERMISSION_KEY, permission);
};
exports.RequireVenuePermission = RequireVenuePermission;
