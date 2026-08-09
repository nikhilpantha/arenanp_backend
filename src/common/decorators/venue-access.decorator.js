"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueAccess = void 0;
exports.canRead = canRead;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
/**
 * Inject what `VenuePermissionGuard` resolved for this request — the caller's
 * role at the target venue and their effective permission set.
 *
 * For gating a field inside a response the caller is otherwise allowed to
 * fetch: the venue's booking count is `bookings:read`, but the money it took
 * that day is `finance:read`, and the front desk holds only the first.
 *
 * Undefined on any handler the guard didn't run for, so callers must treat a
 * missing context as "no permissions" rather than assuming it can't happen.
 */
exports.VenueAccess = (0, common_1.createParamDecorator)(function (_, context) { var _a; return (_a = graphql_1.GqlExecutionContext.create(context).getContext().req) === null || _a === void 0 ? void 0 : _a.venueAccess; });
/** Convenience for the common `does the caller hold X?` check. */
function canRead(access, permission) {
    var _a;
    return (_a = access === null || access === void 0 ? void 0 : access.permissions.includes(permission)) !== null && _a !== void 0 ? _a : false;
}
