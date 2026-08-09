"use strict";
/// Platform staff permissions — typed enum instead of strings for compile-time safety.
/// Prevents typos and ensures consistency across guards/decorators.
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuePermission = exports.PlatformStaffPermission = void 0;
exports.getEnumValues = getEnumValues;
/** Platform staff permissions (platform-wide operations) */
var PlatformStaffPermission;
(function (PlatformStaffPermission) {
    // Support agent permissions
    PlatformStaffPermission["SUPPORT_READ"] = "support:read";
    PlatformStaffPermission["SUPPORT_REFUND"] = "support:refund";
    PlatformStaffPermission["SUPPORT_CHAT"] = "support:chat";
    // Customer operations
    PlatformStaffPermission["CUSTOMERS_READ"] = "customers:read";
    // Moderation permissions
    PlatformStaffPermission["MODERATION_SPORTS_WRITE"] = "moderation:sports:write";
    PlatformStaffPermission["MODERATION_VERIFY_VENUE"] = "moderation:verify:venue";
    PlatformStaffPermission["MODERATION_VERIFY_ORGANIZER"] = "moderation:verify:organizer";
    PlatformStaffPermission["MODERATION_USERS_SUSPEND"] = "moderation:users:suspend";
    PlatformStaffPermission["MODERATION_CONTENT_APPROVE"] = "moderation:content:approve";
    // Financial operations
    PlatformStaffPermission["FINANCE_READ"] = "finance:read";
    PlatformStaffPermission["FINANCE_PAYOUT_REVIEW"] = "finance:payout:review";
    PlatformStaffPermission["FINANCE_REFUND_HIGH"] = "finance:refund:high";
    // Admin settings
    PlatformStaffPermission["ADMIN_SETTINGS"] = "admin:settings";
    PlatformStaffPermission["ADMIN_SUBSCRIPTIONS"] = "admin:subscriptions";
    PlatformStaffPermission["ADMIN_STAFF"] = "admin:staff";
})(PlatformStaffPermission || (exports.PlatformStaffPermission = PlatformStaffPermission = {}));
/** Venue staff permissions (venue-scoped operations) */
var VenuePermission;
(function (VenuePermission) {
    // Venue management
    VenuePermission["VENUE_EDIT"] = "venue:edit";
    VenuePermission["VENUE_DELETE"] = "venue:delete";
    // Bookings
    VenuePermission["BOOKINGS_READ"] = "bookings:read";
    VenuePermission["BOOKINGS_WRITE"] = "bookings:write";
    VenuePermission["BOOKINGS_CANCEL"] = "bookings:cancel";
    // Calendar & scheduling
    VenuePermission["CALENDAR_MANAGE"] = "calendar:manage";
    // Customer management
    VenuePermission["CUSTOMERS_READ"] = "customers:read";
    VenuePermission["CUSTOMERS_WRITE"] = "customers:write";
    // Financial
    VenuePermission["FINANCE_READ"] = "finance:read";
    VenuePermission["FINANCE_PAYOUT"] = "finance:payout";
    // Staff management
    VenuePermission["STAFF_MANAGE"] = "staff:manage";
    // Sports & amenities
    VenuePermission["SPORTS_MANAGE"] = "sports:manage";
    VenuePermission["AMENITIES_MANAGE"] = "amenities:manage";
    // Offers & promotions
    VenuePermission["OFFERS_MANAGE"] = "offers:manage";
    // Memberships
    VenuePermission["MEMBERSHIPS_MANAGE"] = "memberships:manage";
    // Teams
    VenuePermission["TEAMS_MANAGE"] = "teams:manage";
})(VenuePermission || (exports.VenuePermission = VenuePermission = {}));
/** Helper to get all values from an enum */
function getEnumValues(enumObj) {
    return Object.values(enumObj);
}
