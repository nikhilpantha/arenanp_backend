"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasApprovedCapability = hasApprovedCapability;
exports.isStaff = isStaff;
/** True when the user holds `type` with APPROVED status (SUPER_ADMIN bypass lives in guards). */
function hasApprovedCapability(user, type) {
    return user.capabilities.some(function (c) { return c.type === type && c.status === 'APPROVED'; });
}
/** True when the user is a platform staff member (not a regular USER). */
function isStaff(user) {
    return user.role !== 'USER';
}
