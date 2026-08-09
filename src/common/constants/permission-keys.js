"use strict";
/**
 * Canonical permission library — the single source of truth for every
 * permission key in the platform.
 *
 * These keys are seeded into the `permissions` table (see
 * `prisma/seeds/default-permissions.ts`) and are what `@RequirePermission()`
 * accepts. Because the catalog is `as const`, `PermissionKey` is a literal
 * union: a typo in a guard decorator is a compile error, not a runtime 403.
 *
 * Naming: `<subject>.<action>` in dot notation. Do not introduce the legacy
 * colon-notation keys (`finance:read`) — those belong to the pre-RBAC static
 * role map and are being retired.
 *
 * Adding a permission:
 *   1. add the entry here,
 *   2. re-run `npm run prisma:seed:permissions` (upserts, safe to repeat),
 *   3. add it to whichever system role presets should hold it by default.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMAIN_BY_SCOPE = exports.ALL_PERMISSION_KEYS = exports.WILDCARD_PERMISSION = exports.PERMISSION_CATALOG = void 0;
exports.flattenPermissionCatalog = flattenPermissionCatalog;
exports.permissionKeysForDomain = permissionKeysForDomain;
exports.domainForScope = domainForScope;
exports.PERMISSION_CATALOG = {
    PLATFORM_ADMINISTRATION: [
        // ─── Dashboard ───
        {
            key: 'dashboard.view',
            name: 'View Dashboard',
            description: 'Access the admin dashboard and its summary metrics',
        },
        // ─── Staff Management ───
        {
            key: 'staff.view',
            name: 'View Staff',
            description: 'View list of all platform staff members',
        },
        { key: 'staff.create', name: 'Create Staff', description: 'Create new staff members' },
        {
            key: 'staff.edit',
            name: 'Edit Staff',
            description: 'Edit staff member details and role assignments',
        },
        { key: 'staff.delete', name: 'Delete Staff', description: 'Delete staff member accounts' },
        {
            key: 'staff.suspend',
            name: 'Suspend Staff',
            description: 'Temporarily suspend staff access',
        },
        {
            key: 'staff.activate',
            name: 'Activate Staff',
            description: 'Restore suspended staff access',
        },
        {
            key: 'staff.resetPassword',
            name: 'Reset Staff Password',
            description: 'Reset staff member passwords',
        },
        {
            key: 'staff.impersonate',
            name: 'Impersonate Staff',
            description: 'Login as staff member for support/troubleshooting',
        },
        // ─── User Management ───
        {
            key: 'users.view',
            name: 'View Users',
            description: 'View all app users and their information',
        },
        { key: 'users.edit', name: 'Edit Users', description: 'Edit user profile details' },
        {
            key: 'users.suspend',
            name: 'Suspend Users',
            description: 'Suspend user accounts temporarily',
        },
        {
            key: 'users.activate',
            name: 'Activate Users',
            description: 'Restore suspended user accounts',
        },
        { key: 'users.delete', name: 'Delete Users', description: 'Delete user accounts permanently' },
        // ─── Organizer Verification ───
        {
            key: 'organizers.view',
            name: 'View Organizers',
            description: 'View all organizer accounts and applications',
        },
        {
            key: 'organizers.verify',
            name: 'Verify Organizers',
            description: 'Approve organizer verification applications',
        },
        {
            key: 'organizers.reject',
            name: 'Reject Organizers',
            description: 'Reject organizer verification applications',
        },
        {
            key: 'organizers.suspend',
            name: 'Suspend Organizers',
            description: 'Suspend organizer accounts',
        },
        {
            key: 'organizers.activate',
            name: 'Activate Organizers',
            description: 'Restore suspended organizer accounts',
        },
        // ─── Venue Verification & Administration ───
        {
            key: 'venues.view',
            name: 'View Venues',
            description: 'View all venue registrations and details',
        },
        {
            key: 'venues.edit',
            name: 'Edit Venues',
            description: 'Edit venue records as platform staff',
        },
        {
            key: 'venues.verify',
            name: 'Verify Venues',
            description: 'Approve venue registration applications',
        },
        {
            key: 'venues.reject',
            name: 'Reject Venues',
            description: 'Reject venue registration applications',
        },
        { key: 'venues.suspend', name: 'Suspend Venues', description: 'Suspend venue operations' },
        {
            key: 'venues.activate',
            name: 'Activate Venues',
            description: 'Restore suspended venue accounts',
        },
        {
            key: 'venues.invite',
            name: 'Invite Venue Owners',
            description: 'Issue and revoke venue owner invitations',
        },
        // ─── Sports Management ───
        { key: 'sports.view', name: 'View Sports', description: 'View all available sports' },
        { key: 'sports.create', name: 'Create Sports', description: 'Add new sports to the platform' },
        { key: 'sports.edit', name: 'Edit Sports', description: 'Edit sport details and information' },
        { key: 'sports.delete', name: 'Delete Sports', description: 'Remove sports from the platform' },
        // ─── Bookings ───
        {
            key: 'bookings.view',
            name: 'View Bookings',
            description: 'View all bookings across the platform',
        },
        { key: 'bookings.edit', name: 'Edit Bookings', description: 'Amend booking details' },
        {
            key: 'bookings.cancel',
            name: 'Cancel Bookings',
            description: 'Cancel bookings on behalf of customers',
        },
        // ─── Payments, Refunds & Payouts ───
        { key: 'payments.view', name: 'View Payments', description: 'View all payment transactions' },
        {
            key: 'payments.refund',
            name: 'Process Refunds',
            description: 'Process and manage payment refunds',
        },
        { key: 'refunds.view', name: 'View Refunds', description: 'View refund requests and history' },
        { key: 'refunds.approve', name: 'Approve Refunds', description: 'Approve refund requests' },
        { key: 'refunds.reject', name: 'Reject Refunds', description: 'Reject refund requests' },
        { key: 'payouts.view', name: 'View Payouts', description: 'View organizer and venue payouts' },
        {
            key: 'payouts.process',
            name: 'Process Payouts',
            description: 'Process and manage payouts to organizers',
        },
        {
            key: 'payouts.settle',
            name: 'Settle Payouts',
            description: 'Settle and reconcile payment batches',
        },
        // ─── Disputes ───
        { key: 'disputes.view', name: 'View Disputes', description: 'View customer payment disputes' },
        {
            key: 'disputes.resolve',
            name: 'Resolve Disputes',
            description: 'Resolve or escalate payment disputes',
        },
        // ─── Tournaments (platform oversight) ───
        {
            key: 'tournaments.view',
            name: 'View Tournaments',
            description: 'View all tournaments on the platform',
        },
        {
            key: 'tournaments.edit',
            name: 'Edit Tournaments',
            description: 'Edit tournament records as platform staff',
        },
        {
            key: 'tournaments.cancel',
            name: 'Cancel Tournaments',
            description: 'Cancel tournaments as platform staff',
        },
        // ─── Storage ───
        {
            key: 'storage.upload',
            name: 'Upload Files',
            description: 'Request presigned upload URLs for platform assets',
        },
        { key: 'storage.delete', name: 'Delete Files', description: 'Delete stored platform assets' },
        // ─── Permissions ───
        {
            key: 'permissions.view',
            name: 'View Permissions',
            description: 'View the permission library and what each staff member has been granted',
        },
        {
            key: 'permissions.assign',
            name: 'Assign Permissions',
            description: 'Grant and revoke permissions for staff members',
        },
        // ─── System Configuration ───
        {
            key: 'settings.view',
            name: 'View Settings',
            description: 'View system configuration and settings',
        },
        { key: 'settings.edit', name: 'Edit Settings', description: 'Modify system configuration' },
        {
            key: 'system.maintenance',
            name: 'System Maintenance',
            description: 'Enable/disable maintenance mode',
        },
        { key: 'system.backup', name: 'System Backup', description: 'Manage system backups' },
        // ─── Audit & Compliance ───
        {
            key: 'audit.view',
            name: 'View Audit Logs',
            description: 'View staff activity and audit logs',
        },
        {
            key: 'audit.export',
            name: 'Export Audit Logs',
            description: 'Export audit logs for compliance',
        },
        {
            key: 'audit.delete',
            name: 'Archive Audit Logs',
            description: 'Archive or delete old audit records',
        },
        {
            key: 'compliance.view',
            name: 'View Compliance',
            description: 'View compliance and regulatory reports',
        },
        // ─── Support & Moderation ───
        {
            key: 'support.tickets.view',
            name: 'View Support Tickets',
            description: 'View customer support tickets',
        },
        {
            key: 'support.tickets.resolve',
            name: 'Resolve Support Tickets',
            description: 'Respond to and resolve support tickets',
        },
        {
            key: 'content.moderate',
            name: 'Moderate Content',
            description: 'Moderate user-generated content',
        },
        {
            key: 'content.ban',
            name: 'Ban Content/Users',
            description: 'Ban inappropriate content or users',
        },
        // ─── Analytics & Reports ───
        {
            key: 'analytics.view',
            name: 'View Analytics',
            description: 'View platform analytics and metrics',
        },
        { key: 'analytics.export', name: 'Export Analytics', description: 'Export analytics reports' },
    ],
    // Granted per venue: a grant carries scopeType VENUE and the venue's id, so
    // the same person can hold different permissions at two venues.
    //
    // These keys are 1:1 with the operations venue resolvers actually guard —
    // adding one here without a `@RequireVenuePermission` to match creates a
    // permission that grants nothing.
    VENUE_MANAGEMENT: [
        { key: 'venue.view', name: 'View Venue', description: 'View venue details' },
        {
            key: 'venue.edit',
            name: 'Edit Venue',
            description: 'Edit the venue profile, services, opening hours and courts',
        },
        { key: 'venue.bookings.view', name: 'View Bookings', description: 'View venue bookings' },
        {
            key: 'venue.bookings.manage',
            name: 'Manage Bookings',
            description: 'Create, amend and cancel bookings',
        },
        {
            key: 'venue.calendar.manage',
            name: 'Manage Calendar',
            description: 'Manage availability, closures and blocked slots',
        },
        {
            key: 'venue.customers.view',
            name: 'View Customers',
            description: "View the venue's customer records",
        },
        {
            key: 'venue.offers.manage',
            name: 'Manage Offers',
            description: 'Create and edit discounts and promotions',
        },
        {
            key: 'venue.memberships.manage',
            name: 'Manage Memberships',
            description: 'Manage membership plans and customer subscriptions',
        },
        { key: 'venue.teams.manage', name: 'Manage Teams', description: 'Manage teams and clans' },
        {
            key: 'venue.finance.view',
            name: 'View Finance',
            description: 'View revenue, settlements and reports',
        },
        {
            key: 'venue.finance.payout',
            name: 'Manage Payouts',
            description: 'Request and reconcile payouts',
        },
        { key: 'venue.staff.view', name: 'View Venue Staff', description: 'View venue staff members' },
        {
            key: 'venue.staff.manage',
            name: 'Manage Venue Staff',
            description: 'Invite, remove and re-permission venue staff',
        },
    ],
    TOURNAMENT_MANAGEMENT: [
        { key: 'tournament.view', name: 'View Tournament', description: 'View tournament details' },
        { key: 'tournament.edit', name: 'Edit Tournament', description: 'Edit tournament details' },
        {
            key: 'tournament.staff.view',
            name: 'View Tournament Staff',
            description: 'View tournament staff members',
        },
        {
            key: 'tournament.staff.manage',
            name: 'Manage Tournament Staff',
            description: 'Add/remove staff from tournament',
        },
        {
            key: 'tournament.matches.view',
            name: 'View Matches',
            description: 'View tournament matches',
        },
        {
            key: 'tournament.matches.manage',
            name: 'Manage Matches',
            description: 'Create/edit matches and schedule',
        },
        {
            key: 'tournament.participants.view',
            name: 'View Participants',
            description: 'View tournament participants',
        },
        {
            key: 'tournament.participants.manage',
            name: 'Manage Participants',
            description: 'Add/remove participants',
        },
        {
            key: 'tournament.brackets.view',
            name: 'View Brackets',
            description: 'View tournament brackets',
        },
        {
            key: 'tournament.brackets.manage',
            name: 'Manage Brackets',
            description: 'Create/edit tournament brackets',
        },
        {
            key: 'tournament.reports.view',
            name: 'View Reports',
            description: 'View tournament reports and analytics',
        },
    ],
};
/** Wildcard held by the Super Admin system role — satisfies every check. */
exports.WILDCARD_PERMISSION = '*';
/** Flat list of `{ domain, key, name, description }` for seeding. */
function flattenPermissionCatalog() {
    return Object.entries(exports.PERMISSION_CATALOG).flatMap(function (_a) {
        var domain = _a[0], permissions = _a[1];
        return permissions.map(function (permission) { return (__assign(__assign({}, permission), { domain: domain })); });
    });
}
/** Every permission key in the catalog. */
exports.ALL_PERMISSION_KEYS = flattenPermissionCatalog().map(function (p) { return p.key; });
/** All keys belonging to a single domain. */
function permissionKeysForDomain(domain) {
    return exports.PERMISSION_CATALOG[domain].map(function (p) { return p.key; });
}
/**
 * Each scope draws from exactly one domain, which is what stops a platform
 * permission being granted against a single venue (or vice versa).
 */
exports.DOMAIN_BY_SCOPE = {
    PLATFORM: 'PLATFORM_ADMINISTRATION',
    VENUE: 'VENUE_MANAGEMENT',
    TOURNAMENT: 'TOURNAMENT_MANAGEMENT',
};
/** The domain whose permissions may be granted in `scope`. */
function domainForScope(scope) {
    return exports.DOMAIN_BY_SCOPE[scope];
}
