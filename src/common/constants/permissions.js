"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.VENUE_PERMISSIONS = void 0;
exports.effectivePermissions = effectivePermissions;
/**
 * Fine-grained, venue-scoped permissions. A venue membership's effective
 * permission set = the role's defaults (below) ∪ the membership's
 * `permissions[]` overrides. Guards check these per target venue.
 */
exports.VENUE_PERMISSIONS = [
    'venue:edit', // profile, services, hours, verification
    'bookings:read',
    'bookings:write', // create / modify / cancel
    'calendar:manage',
    'customers:read',
    'offers:manage',
    'memberships:manage',
    'teams:manage',
    'finance:read',
    'finance:write', // record expenses, close cash day
    'finance:payout',
    'staff:manage', // invite / remove staff, change roles
];
/** Default permission set granted by each venue role. */
exports.ROLE_PERMISSIONS = {
    OWNER: exports.VENUE_PERMISSIONS, // everything
    MANAGER: [
        'venue:edit',
        'bookings:read',
        'bookings:write',
        'calendar:manage',
        'customers:read',
        'offers:manage',
        'memberships:manage',
        'teams:manage',
        'finance:read',
        'finance:write',
    ],
    FRONT_DESK: ['bookings:read', 'bookings:write', 'calendar:manage', 'customers:read'],
    STAFF: ['bookings:read', 'calendar:manage', 'customers:read'],
    COACH: ['bookings:read', 'calendar:manage'],
};
/** Resolve a membership's effective permissions: role defaults merged with overrides. */
function effectivePermissions(role, overrides) {
    if (overrides === void 0) { overrides = []; }
    var set = new Set(exports.ROLE_PERMISSIONS[role]);
    for (var _i = 0, overrides_1 = overrides; _i < overrides_1.length; _i++) {
        var p = overrides_1[_i];
        if (exports.VENUE_PERMISSIONS.includes(p))
            set.add(p);
    }
    return __spreadArray([], set, true);
}
