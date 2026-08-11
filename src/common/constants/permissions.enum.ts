/// Platform staff permissions — typed enum instead of strings for compile-time safety.
/// Prevents typos and ensures consistency across guards/decorators.

/** Platform staff permissions (platform-wide operations) */
export enum PlatformStaffPermission {
  // Support agent permissions
  SUPPORT_READ = 'support:read',
  SUPPORT_REFUND = 'support:refund',
  SUPPORT_CHAT = 'support:chat',

  // Customer operations
  CUSTOMERS_READ = 'customers:read',

  // Moderation permissions
  MODERATION_SPORTS_WRITE = 'moderation:sports:write',
  MODERATION_VERIFY_VENUE = 'moderation:verify:venue',
  MODERATION_VERIFY_ORGANIZER = 'moderation:verify:organizer',
  MODERATION_USERS_SUSPEND = 'moderation:users:suspend',
  MODERATION_CONTENT_APPROVE = 'moderation:content:approve',

  // Financial operations
  FINANCE_READ = 'finance:read',
  FINANCE_PAYOUT_REVIEW = 'finance:payout:review',
  FINANCE_REFUND_HIGH = 'finance:refund:high',

  // Admin settings
  ADMIN_SETTINGS = 'admin:settings',
  ADMIN_SUBSCRIPTIONS = 'admin:subscriptions',
  ADMIN_STAFF = 'admin:staff',
}

/** Venue staff permissions (venue-scoped operations) */
export enum VenuePermission {
  // Venue management
  VENUE_EDIT = 'venue:edit',
  VENUE_DELETE = 'venue:delete',

  // Bookings
  BOOKINGS_READ = 'bookings:read',
  BOOKINGS_WRITE = 'bookings:write',
  BOOKINGS_CANCEL = 'bookings:cancel',

  // Calendar & scheduling
  CALENDAR_MANAGE = 'calendar:manage',

  // Customer management
  CUSTOMERS_READ = 'customers:read',
  CUSTOMERS_WRITE = 'customers:write',

  // Financial
  FINANCE_READ = 'finance:read',
  FINANCE_PAYOUT = 'finance:payout',

  // Staff management
  STAFF_MANAGE = 'staff:manage',

  // Sports & amenities
  SPORTS_MANAGE = 'sports:manage',
  AMENITIES_MANAGE = 'amenities:manage',

  // Offers & promotions
  OFFERS_MANAGE = 'offers:manage',

  // Memberships
  MEMBERSHIPS_MANAGE = 'memberships:manage',

  // Teams
  TEAMS_MANAGE = 'teams:manage',
}

/** Helper to get all values from an enum */
export function getEnumValues<T extends Record<string, string>>(enumObj: T): string[] {
  return Object.values(enumObj);
}
