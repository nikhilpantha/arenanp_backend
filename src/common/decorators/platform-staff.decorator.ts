import { SetMetadata } from '@nestjs/common';

export const REQUIRE_STAFF_PERMISSION_KEY = 'requireStaffPermission';

/**
 * Decorator for methods that require one or more platform staff permissions.
 * Enforced by PlatformStaffGuard (registered globally in AuthModule).
 *
 * @param permissions One or more permission strings (AND logic — all required)
 *
 * @example
 * @RequireStaffPermission('finance:payout:review')
 * async approvePayout(...) { }
 *
 * @example
 * @RequireStaffPermission('finance:read', 'finance:payout:review')
 * async viewAndApprovePayout(...) { }
 */
export const RequireStaffPermission = (...permissions: string[]) =>
  SetMetadata(REQUIRE_STAFF_PERMISSION_KEY, permissions);
