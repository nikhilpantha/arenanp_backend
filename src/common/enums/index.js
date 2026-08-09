"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueVerificationStatus = exports.VenueMemberRole = exports.UserRole = exports.TournamentVisibility = exports.TournamentStatus = exports.TournamentRegistrationStatus = exports.TournamentFormat = exports.SubscriptionStatus = exports.StatScope = exports.SportPricingUnit = exports.SportPeriodType = exports.SportBookingMode = exports.SettlementStatus = exports.StaffStatus = exports.RefundStatus = exports.PermissionScopeType = exports.PermissionDomain = exports.PaymentStatus = exports.PaymentProvider = exports.OfferTrigger = exports.OfferDiscountType = exports.OfferAudience = exports.MembershipStatus = exports.MembershipDuration = exports.MatchStatus = exports.MatchStage = exports.ExpenseCategory = exports.DisputeStatus = exports.DisputeCategory = exports.CustomerType = exports.CourtEnvironment = exports.CapabilityType = exports.CapabilityStatus = exports.BookingStatus = exports.BookingSource = exports.BookingPaymentStatus = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
Object.defineProperty(exports, "BookingPaymentStatus", { enumerable: true, get: function () { return client_1.BookingPaymentStatus; } });
Object.defineProperty(exports, "BookingSource", { enumerable: true, get: function () { return client_1.BookingSource; } });
Object.defineProperty(exports, "BookingStatus", { enumerable: true, get: function () { return client_1.BookingStatus; } });
Object.defineProperty(exports, "CapabilityStatus", { enumerable: true, get: function () { return client_1.CapabilityStatus; } });
Object.defineProperty(exports, "CapabilityType", { enumerable: true, get: function () { return client_1.CapabilityType; } });
Object.defineProperty(exports, "CourtEnvironment", { enumerable: true, get: function () { return client_1.CourtEnvironment; } });
Object.defineProperty(exports, "CustomerType", { enumerable: true, get: function () { return client_1.CustomerType; } });
Object.defineProperty(exports, "DisputeCategory", { enumerable: true, get: function () { return client_1.DisputeCategory; } });
Object.defineProperty(exports, "DisputeStatus", { enumerable: true, get: function () { return client_1.DisputeStatus; } });
Object.defineProperty(exports, "ExpenseCategory", { enumerable: true, get: function () { return client_1.ExpenseCategory; } });
Object.defineProperty(exports, "MatchStage", { enumerable: true, get: function () { return client_1.MatchStage; } });
Object.defineProperty(exports, "MatchStatus", { enumerable: true, get: function () { return client_1.MatchStatus; } });
Object.defineProperty(exports, "MembershipDuration", { enumerable: true, get: function () { return client_1.MembershipDuration; } });
Object.defineProperty(exports, "MembershipStatus", { enumerable: true, get: function () { return client_1.MembershipStatus; } });
Object.defineProperty(exports, "OfferAudience", { enumerable: true, get: function () { return client_1.OfferAudience; } });
Object.defineProperty(exports, "OfferDiscountType", { enumerable: true, get: function () { return client_1.OfferDiscountType; } });
Object.defineProperty(exports, "OfferTrigger", { enumerable: true, get: function () { return client_1.OfferTrigger; } });
Object.defineProperty(exports, "PaymentProvider", { enumerable: true, get: function () { return client_1.PaymentProvider; } });
Object.defineProperty(exports, "PaymentStatus", { enumerable: true, get: function () { return client_1.PaymentStatus; } });
Object.defineProperty(exports, "PermissionDomain", { enumerable: true, get: function () { return client_1.PermissionDomain; } });
Object.defineProperty(exports, "PermissionScopeType", { enumerable: true, get: function () { return client_1.PermissionScopeType; } });
Object.defineProperty(exports, "RefundStatus", { enumerable: true, get: function () { return client_1.RefundStatus; } });
Object.defineProperty(exports, "StaffStatus", { enumerable: true, get: function () { return client_1.StaffStatus; } });
Object.defineProperty(exports, "SettlementStatus", { enumerable: true, get: function () { return client_1.SettlementStatus; } });
Object.defineProperty(exports, "SportBookingMode", { enumerable: true, get: function () { return client_1.SportBookingMode; } });
Object.defineProperty(exports, "SportPeriodType", { enumerable: true, get: function () { return client_1.SportPeriodType; } });
Object.defineProperty(exports, "SportPricingUnit", { enumerable: true, get: function () { return client_1.SportPricingUnit; } });
Object.defineProperty(exports, "StatScope", { enumerable: true, get: function () { return client_1.StatScope; } });
Object.defineProperty(exports, "SubscriptionStatus", { enumerable: true, get: function () { return client_1.SubscriptionStatus; } });
Object.defineProperty(exports, "TournamentFormat", { enumerable: true, get: function () { return client_1.TournamentFormat; } });
Object.defineProperty(exports, "TournamentRegistrationStatus", { enumerable: true, get: function () { return client_1.TournamentRegistrationStatus; } });
Object.defineProperty(exports, "TournamentStatus", { enumerable: true, get: function () { return client_1.TournamentStatus; } });
Object.defineProperty(exports, "TournamentVisibility", { enumerable: true, get: function () { return client_1.TournamentVisibility; } });
Object.defineProperty(exports, "UserRole", { enumerable: true, get: function () { return client_1.UserRole; } });
Object.defineProperty(exports, "VenueMemberRole", { enumerable: true, get: function () { return client_1.VenueMemberRole; } });
Object.defineProperty(exports, "VenueVerificationStatus", { enumerable: true, get: function () { return client_1.VenueVerificationStatus; } });
(0, graphql_1.registerEnumType)(client_1.UserRole, {
    name: 'UserRole',
    description: 'User role (platform-wide). USER for regular users/venue staff, or platform staff: SUPPORT_AGENT, MODERATOR, ADMIN, SUPER_ADMIN.',
});
(0, graphql_1.registerEnumType)(client_1.CapabilityType, {
    name: 'CapabilityType',
    description: 'What a user can be verified as on the platform (VENUE, ORGANIZER, COACH). Additive — a user may hold several.',
});
(0, graphql_1.registerEnumType)(client_1.CapabilityStatus, {
    name: 'CapabilityStatus',
    description: 'Lifecycle of a capability application, shared by every CapabilityType. Approved grants the capability.',
});
(0, graphql_1.registerEnumType)(client_1.VenueMemberRole, {
    name: 'VenueMemberRole',
    description: "A user's role within a single venue (venue-scoped RBAC): OWNER, MANAGER, FRONT_DESK, STAFF, COACH.",
});
(0, graphql_1.registerEnumType)(client_1.PayBasis, {
    name: 'PayBasis',
    description: "How a staff member's pay is reckoned. MONTHLY is the only basis whose owed amount the system can work out unaided; DAILY and PER_SESSION need a count the owner enters when settling up.",
});
(0, graphql_1.registerEnumType)(client_1.MembershipStatus, {
    name: 'MembershipStatus',
    description: 'Lifecycle of a venue membership (staff seat): INVITED, ACTIVE, SUSPENDED.',
});
(0, graphql_1.registerEnumType)(client_1.VenueVerificationStatus, {
    name: 'VenueVerificationStatus',
    description: 'Admin-side moderation status of a single Venue listing. PENDING until approved; SUSPENDED hides it from the marketplace.',
});
(0, graphql_1.registerEnumType)(client_1.BookingStatus, {
    name: 'BookingStatus',
    description: 'Booking lifecycle. PENDING_PAYMENT -> CONFIRMED -> COMPLETED, with CANCELLED / NO_SHOW as terminal branches.',
});
(0, graphql_1.registerEnumType)(client_1.CustomerType, {
    name: 'CustomerType',
    description: 'Who holds a booking — TEAM, INDIVIDUAL or CLUB.',
});
(0, graphql_1.registerEnumType)(client_1.BookingSource, {
    name: 'BookingSource',
    description: 'How the booking was created — WALK_IN, ONLINE or SUBSCRIPTION.',
});
(0, graphql_1.registerEnumType)(client_1.BookingPaymentStatus, {
    name: 'BookingPaymentStatus',
    description: 'Venue-side payment state of a booking — PAID, PENDING or PARTIAL.',
});
(0, graphql_1.registerEnumType)(client_1.PaymentProvider, {
    name: 'PaymentProvider',
    description: 'Provider that processed the payment (Nepal-first list + MANUAL for offline reconciliation).',
});
(0, graphql_1.registerEnumType)(client_1.PaymentStatus, {
    name: 'PaymentStatus',
    description: 'Payment state across providers. REFUNDED / PARTIALLY_REFUNDED feed into the refunds module.',
});
(0, graphql_1.registerEnumType)(client_1.SettlementStatus, {
    name: 'SettlementStatus',
    description: 'Lifecycle of a venue payout. Created PENDING on payment success, transitions to PAID once the bank transfer clears.',
});
(0, graphql_1.registerEnumType)(client_1.RefundStatus, {
    name: 'RefundStatus',
    description: 'Lifecycle of a refund request. REQUESTED -> APPROVED -> PROCESSED. REJECTED is terminal.',
});
(0, graphql_1.registerEnumType)(client_1.DisputeStatus, {
    name: 'DisputeStatus',
    description: 'Lifecycle of a dispute. OPEN -> IN_REVIEW -> RESOLVED / REJECTED.',
});
(0, graphql_1.registerEnumType)(client_1.DisputeCategory, {
    name: 'DisputeCategory',
    description: 'Subject area of a dispute. Used for routing + analytics.',
});
(0, graphql_1.registerEnumType)(client_1.TournamentStatus, {
    name: 'TournamentStatus',
    description: 'Tournament lifecycle. DRAFT -> PENDING_APPROVAL -> APPROVED -> ACTIVE -> COMPLETED. SUSPENDED / CANCELLED are admin sinks.',
});
(0, graphql_1.registerEnumType)(client_1.TournamentVisibility, {
    name: 'TournamentVisibility',
    description: 'Visibility of a tournament on the public app.',
});
(0, graphql_1.registerEnumType)(client_1.TournamentFormat, {
    name: 'TournamentFormat',
    description: 'Bracket / scheduling shape: SINGLE_ELIMINATION, DOUBLE_ELIMINATION, ROUND_ROBIN or GROUP_KNOCKOUT.',
});
(0, graphql_1.registerEnumType)(client_1.StatScope, {
    name: 'StatScope',
    description: 'Whether a stat is recorded against a whole TEAM or an individual PLAYER.',
});
(0, graphql_1.registerEnumType)(client_1.SportPeriodType, {
    name: 'SportPeriodType',
    description: 'Match period shape: HALVES, QUARTERS, SETS, INNINGS or SINGLE (one running score).',
});
(0, graphql_1.registerEnumType)(client_1.CourtEnvironment, {
    name: 'CourtEnvironment',
    description: 'Whether a court is INDOOR, OUTDOOR, or ROOFED (netted/covered, no walls).',
});
(0, graphql_1.registerEnumType)(client_1.SportPricingUnit, {
    name: 'SportPricingUnit',
    description: 'The unit a venue owner prices this sport in: PER_HOUR, PER_SLOT, PER_SESSION, PER_DAY or PER_PERSON_SLOT. Storage stays Court.pricePerHour — this governs entry and display only.',
});
(0, graphql_1.registerEnumType)(client_1.SportBookingMode, {
    name: 'SportBookingMode',
    description: 'EXCLUSIVE — one booking takes the whole surface (a futsal court). CAPACITY — the surface sells N places per slot (a pool lane, a skating session).',
});
(0, graphql_1.registerEnumType)(client_1.TournamentRegistrationStatus, {
    name: 'TournamentRegistrationStatus',
    description: 'Lifecycle of a team registration. REGISTERED -> CONFIRMED, or WITHDRAWN / REJECTED.',
});
(0, graphql_1.registerEnumType)(client_1.MatchStatus, {
    name: 'MatchStatus',
    description: 'State of a tournament match.',
});
(0, graphql_1.registerEnumType)(client_1.MatchStage, {
    name: 'MatchStage',
    description: 'Where a match sits in the structure: GROUP, KNOCKOUT, LOSERS (double-elim) or FINAL.',
});
(0, graphql_1.registerEnumType)(client_1.OfferDiscountType, {
    name: 'OfferDiscountType',
    description: 'How an offer reduces a booking subtotal: PERCENT, FLAT or FREE_GAME.',
});
(0, graphql_1.registerEnumType)(client_1.OfferTrigger, {
    name: 'OfferTrigger',
    description: 'What triggers an offer: PROMO_CODE (code entry) or EVERY_NTH (loyalty reward).',
});
(0, graphql_1.registerEnumType)(client_1.OfferAudience, {
    name: 'OfferAudience',
    description: 'Who a loyalty offer applies to: ALL, INDIVIDUAL or TEAM.',
});
(0, graphql_1.registerEnumType)(client_1.MembershipDuration, {
    name: 'MembershipDuration',
    description: 'How long a membership plan runs before renewal: WEEKLY, FORTNIGHTLY, MONTHLY, QUARTERLY, HALF_YEARLY or YEARLY.',
});
(0, graphql_1.registerEnumType)(client_1.SubscriptionStatus, {
    name: 'SubscriptionStatus',
    description: "A subscription's lifecycle: ACTIVE -> (PAUSED) -> EXPIRED, with CANCELLED as a terminal sink.",
});
(0, graphql_1.registerEnumType)(client_1.PermissionDomain, {
    name: 'PermissionDomain',
    description: 'Business area a permission belongs to: PLATFORM_ADMINISTRATION, VENUE_MANAGEMENT or TOURNAMENT_MANAGEMENT.',
});
(0, graphql_1.registerEnumType)(client_1.StaffStatus, {
    name: 'StaffStatus',
    description: 'Whether a staff assignment is ACTIVE, temporarily SUSPENDED, or INACTIVE (no longer with the organisation).',
});
(0, graphql_1.registerEnumType)(client_1.PermissionScopeType, {
    name: 'PermissionScopeType',
    description: 'What a permission grant applies to: PLATFORM (whole platform), VENUE (one venue) or TOURNAMENT (one tournament).',
});
