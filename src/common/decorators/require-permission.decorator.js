"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermission = exports.REQUIRE_PERMISSION_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.REQUIRE_PERMISSION_KEY = 'requirePermission';
/**
 * Gate a resolver or controller on one or more dynamic permissions.
 *
 * Enforced by `PermissionGuard` (registered globally in AuthModule). Permissions
 * are resolved from the `roles` / `platform_user_roles` tables at request time,
 * so a SUPER_ADMIN editing a role takes effect on the next request without a
 * deploy or a re-login.
 *
 * Multiple keys are AND-ed: the caller must hold all of them.
 *
 * Prefer this over `@Roles(UserRole.X)`, which hardcodes the legacy enum and
 * cannot see custom roles.
 *
 * @example
 * ＠RequirePermission('venues.verify')
 * async verifyVenue(...) {}
 *
 * @example
 * ＠RequirePermission('payouts.view', 'payouts.process')
 * async processPayout(...) {}
 */
var RequirePermission = function () {
    var permissions = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        permissions[_i] = arguments[_i];
    }
    return (0, common_1.SetMetadata)(exports.REQUIRE_PERMISSION_KEY, permissions);
};
exports.RequirePermission = RequirePermission;
