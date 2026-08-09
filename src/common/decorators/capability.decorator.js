"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireOrganizerApproved = exports.RequireVenueApproved = exports.RequireCapability = exports.REQUIRE_CAPABILITY_KEY = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
exports.REQUIRE_CAPABILITY_KEY = 'requireCapability';
/**
 * Require the current user to hold `type` with APPROVED status (enforced by
 * `CapabilityGuard`; SUPER_ADMIN bypasses). Generic over CapabilityType so a
 * new capability (e.g. COACH) needs no new decorator.
 */
var RequireCapability = function (type) {
    return (0, common_1.SetMetadata)(exports.REQUIRE_CAPABILITY_KEY, type);
};
exports.RequireCapability = RequireCapability;
/** Convenience: require an approved VENUE capability (venue/court/booking mutations). */
var RequireVenueApproved = function () { return (0, exports.RequireCapability)(client_1.CapabilityType.VENUE); };
exports.RequireVenueApproved = RequireVenueApproved;
/** Convenience: require an approved ORGANIZER capability (tournament creation etc). */
var RequireOrganizerApproved = function () { return (0, exports.RequireCapability)(client_1.CapabilityType.ORGANIZER); };
exports.RequireOrganizerApproved = RequireOrganizerApproved;
