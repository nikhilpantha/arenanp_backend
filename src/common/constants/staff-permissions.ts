import { UserRole } from '@prisma/client';
import { PlatformStaffPermission } from './permissions.enum';

/**
 * Platform staff permissions by role. These are the *base* permissions;
 * PermissionOverride table can grant/revoke individual permissions.
 *
 * Uses TypeScript enum for type-safety (compile-time validation).
 * All string values match enum values exactly.
 */
export const STAFF_ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.USER]: [],
  [UserRole.SUPPORT_AGENT]: [
    PlatformStaffPermission.SUPPORT_READ, // View bookings, customers, disputes
    PlatformStaffPermission.SUPPORT_REFUND, // Approve refunds <₹5,000
    PlatformStaffPermission.SUPPORT_CHAT, // Chat with customers
    PlatformStaffPermission.CUSTOMERS_READ, // View customer contact info
  ],
  [UserRole.MODERATOR]: [
    PlatformStaffPermission.MODERATION_SPORTS_WRITE, // Create/edit/delete sports
    PlatformStaffPermission.MODERATION_VERIFY_VENUE, // Approve venue KYC
    PlatformStaffPermission.MODERATION_VERIFY_ORGANIZER, // Approve organizer verification
    PlatformStaffPermission.MODERATION_USERS_SUSPEND, // Suspend user capabilities
    PlatformStaffPermission.MODERATION_CONTENT_APPROVE, // Approve tournaments
  ],
  [UserRole.ADMIN]: [
    PlatformStaffPermission.FINANCE_READ, // View payments, settlements
    PlatformStaffPermission.FINANCE_PAYOUT_REVIEW, // Approve/reject payouts
    PlatformStaffPermission.FINANCE_REFUND_HIGH, // Approve refunds >₹5,000
    PlatformStaffPermission.ADMIN_SETTINGS, // Configure platform fees
    PlatformStaffPermission.ADMIN_SUBSCRIPTIONS, // Manage subscription plans
  ],
  [UserRole.SUPER_ADMIN]: ['*'], // All permissions (wildcard)
};

/// Get effective permissions for a staff member: base role permissions + active overrides.
/// @param role The user's platform staff role
/// @param overrides Active PermissionOverride rows (filtered by expiresAt in DB query)
export function getEffectiveStaffPermissions(
  role: UserRole,
  overrides: { permission: string; action: 'GRANT' | 'REVOKE' }[] = [],
): string[] {
  const basePerms = STAFF_ROLE_PERMISSIONS[role] || [];

  // SUPER_ADMIN has all permissions, no need to merge overrides
  if (basePerms.includes('*')) {
    return ['*'];
  }

  const grants = overrides.filter((o) => o.action === 'GRANT').map((o) => o.permission);
  const revokes = overrides.filter((o) => o.action === 'REVOKE').map((o) => o.permission);

  return [...basePerms, ...grants].filter((p) => !revokes.includes(p));
}
