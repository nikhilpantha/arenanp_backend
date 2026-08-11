import { registerEnumType } from '@nestjs/graphql';
import {
  BookingPaymentStatus,
  BookingSource,
  BookingStatus,
  CapabilityStatus,
  CapabilityType,
  CourtEnvironment,
  CustomerType,
  DisputeCategory,
  DisputeStatus,
  ExpenseCategory,
  MatchStage,
  MatchStatus,
  MembershipDuration,
  MembershipStatus,
  OfferAudience,
  OfferDiscountType,
  OfferTrigger,
  PayBasis,
  PaymentProvider,
  PaymentStatus,
  PermissionDomain,
  PermissionScopeType,
  RefundStatus,
  StaffStatus,
  SettlementStatus,
  SportBookingMode,
  SportPeriodType,
  SportPricingUnit,
  StatScope,
  SubscriptionStatus,
  TournamentFormat,
  TournamentRegistrationStatus,
  TournamentStatus,
  TournamentVisibility,
  UserRole,
  VenueMemberRole,
  VenueVerificationStatus,
} from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description:
    'User role (platform-wide). USER for regular users/venue staff, or platform staff: SUPPORT_AGENT, MODERATOR, ADMIN, SUPER_ADMIN.',
});

registerEnumType(CapabilityType, {
  name: 'CapabilityType',
  description:
    'What a user can be verified as on the platform (VENUE, ORGANIZER, COACH). Additive — a user may hold several.',
});

registerEnumType(CapabilityStatus, {
  name: 'CapabilityStatus',
  description:
    'Lifecycle of a capability application, shared by every CapabilityType. Approved grants the capability.',
});

registerEnumType(VenueMemberRole, {
  name: 'VenueMemberRole',
  description:
    "A user's role within a single venue (venue-scoped RBAC): OWNER, MANAGER, FRONT_DESK, STAFF, COACH.",
});

registerEnumType(PayBasis, {
  name: 'PayBasis',
  description:
    "How a staff member's pay is reckoned. MONTHLY is the only basis whose owed amount the system can work out unaided; DAILY and PER_SESSION need a count the owner enters when settling up.",
});

registerEnumType(MembershipStatus, {
  name: 'MembershipStatus',
  description: 'Lifecycle of a venue membership (staff seat): INVITED, ACTIVE, SUSPENDED.',
});

registerEnumType(VenueVerificationStatus, {
  name: 'VenueVerificationStatus',
  description:
    'Admin-side moderation status of a single Venue listing. PENDING until approved; SUSPENDED hides it from the marketplace.',
});

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
  description:
    'Booking lifecycle. PENDING_PAYMENT -> CONFIRMED -> COMPLETED, with CANCELLED / NO_SHOW as terminal branches.',
});

registerEnumType(CustomerType, {
  name: 'CustomerType',
  description: 'Who holds a booking — TEAM, INDIVIDUAL or CLUB.',
});

registerEnumType(BookingSource, {
  name: 'BookingSource',
  description: 'How the booking was created — WALK_IN, ONLINE or SUBSCRIPTION.',
});

registerEnumType(BookingPaymentStatus, {
  name: 'BookingPaymentStatus',
  description: 'Venue-side payment state of a booking — PAID, PENDING or PARTIAL.',
});

registerEnumType(PaymentProvider, {
  name: 'PaymentProvider',
  description:
    'Provider that processed the payment (Nepal-first list + MANUAL for offline reconciliation).',
});

registerEnumType(PaymentStatus, {
  name: 'PaymentStatus',
  description:
    'Payment state across providers. REFUNDED / PARTIALLY_REFUNDED feed into the refunds module.',
});

registerEnumType(SettlementStatus, {
  name: 'SettlementStatus',
  description:
    'Lifecycle of a venue payout. Created PENDING on payment success, transitions to PAID once the bank transfer clears.',
});

registerEnumType(RefundStatus, {
  name: 'RefundStatus',
  description:
    'Lifecycle of a refund request. REQUESTED -> APPROVED -> PROCESSED. REJECTED is terminal.',
});

registerEnumType(DisputeStatus, {
  name: 'DisputeStatus',
  description: 'Lifecycle of a dispute. OPEN -> IN_REVIEW -> RESOLVED / REJECTED.',
});

registerEnumType(DisputeCategory, {
  name: 'DisputeCategory',
  description: 'Subject area of a dispute. Used for routing + analytics.',
});

registerEnumType(TournamentStatus, {
  name: 'TournamentStatus',
  description:
    'Tournament lifecycle. DRAFT -> PENDING_APPROVAL -> APPROVED -> ACTIVE -> COMPLETED. SUSPENDED / CANCELLED are admin sinks.',
});

registerEnumType(TournamentVisibility, {
  name: 'TournamentVisibility',
  description: 'Visibility of a tournament on the public app.',
});

registerEnumType(TournamentFormat, {
  name: 'TournamentFormat',
  description:
    'Bracket / scheduling shape: SINGLE_ELIMINATION, DOUBLE_ELIMINATION, ROUND_ROBIN or GROUP_KNOCKOUT.',
});

registerEnumType(StatScope, {
  name: 'StatScope',
  description: 'Whether a stat is recorded against a whole TEAM or an individual PLAYER.',
});

registerEnumType(SportPeriodType, {
  name: 'SportPeriodType',
  description: 'Match period shape: HALVES, QUARTERS, SETS, INNINGS or SINGLE (one running score).',
});

registerEnumType(CourtEnvironment, {
  name: 'CourtEnvironment',
  description: 'Whether a court is INDOOR, OUTDOOR, or ROOFED (netted/covered, no walls).',
});

registerEnumType(SportPricingUnit, {
  name: 'SportPricingUnit',
  description:
    'The unit a venue owner prices this sport in: PER_HOUR, PER_SLOT, PER_SESSION, PER_DAY or PER_PERSON_SLOT. Storage stays Court.pricePerHour — this governs entry and display only.',
});

registerEnumType(SportBookingMode, {
  name: 'SportBookingMode',
  description:
    'EXCLUSIVE — one booking takes the whole surface (a futsal court). CAPACITY — the surface sells N places per slot (a pool lane, a skating session).',
});

registerEnumType(TournamentRegistrationStatus, {
  name: 'TournamentRegistrationStatus',
  description:
    'Lifecycle of a team registration. REGISTERED -> CONFIRMED, or WITHDRAWN / REJECTED.',
});

registerEnumType(MatchStatus, {
  name: 'MatchStatus',
  description: 'State of a tournament match.',
});

registerEnumType(MatchStage, {
  name: 'MatchStage',
  description:
    'Where a match sits in the structure: GROUP, KNOCKOUT, LOSERS (double-elim) or FINAL.',
});

registerEnumType(OfferDiscountType, {
  name: 'OfferDiscountType',
  description: 'How an offer reduces a booking subtotal: PERCENT, FLAT or FREE_GAME.',
});

registerEnumType(OfferTrigger, {
  name: 'OfferTrigger',
  description: 'What triggers an offer: PROMO_CODE (code entry) or EVERY_NTH (loyalty reward).',
});

registerEnumType(OfferAudience, {
  name: 'OfferAudience',
  description: 'Who a loyalty offer applies to: ALL, INDIVIDUAL or TEAM.',
});

registerEnumType(MembershipDuration, {
  name: 'MembershipDuration',
  description:
    'How long a membership plan runs before renewal: WEEKLY, FORTNIGHTLY, MONTHLY, QUARTERLY, HALF_YEARLY or YEARLY.',
});

registerEnumType(SubscriptionStatus, {
  name: 'SubscriptionStatus',
  description:
    "A subscription's lifecycle: ACTIVE -> (PAUSED) -> EXPIRED, with CANCELLED as a terminal sink.",
});

registerEnumType(PermissionDomain, {
  name: 'PermissionDomain',
  description:
    'Business area a permission belongs to: PLATFORM_ADMINISTRATION, VENUE_MANAGEMENT or TOURNAMENT_MANAGEMENT.',
});

registerEnumType(StaffStatus, {
  name: 'StaffStatus',
  description:
    'Whether a staff assignment is ACTIVE, temporarily SUSPENDED, or INACTIVE (no longer with the organisation).',
});

registerEnumType(PermissionScopeType, {
  name: 'PermissionScopeType',
  description:
    'What a permission grant applies to: PLATFORM (whole platform), VENUE (one venue) or TOURNAMENT (one tournament).',
});

registerEnumType(ExpenseCategory, {
  name: 'ExpenseCategory',
  description:
    'Operating-cost category for a venue expense: RENT, SALARY, UTILITIES, EQUIPMENT, MAINTENANCE, MARKETING, SUPPLIES, TAX or OTHER.',
});

export {
  BookingPaymentStatus,
  BookingSource,
  BookingStatus,
  CapabilityStatus,
  CapabilityType,
  CourtEnvironment,
  CustomerType,
  DisputeCategory,
  DisputeStatus,
  ExpenseCategory,
  MatchStage,
  MatchStatus,
  MembershipDuration,
  MembershipStatus,
  OfferAudience,
  OfferDiscountType,
  OfferTrigger,
  PaymentProvider,
  PaymentStatus,
  PermissionDomain,
  PermissionScopeType,
  RefundStatus,
  StaffStatus,
  SettlementStatus,
  SportBookingMode,
  SportPeriodType,
  SportPricingUnit,
  StatScope,
  SubscriptionStatus,
  TournamentFormat,
  TournamentRegistrationStatus,
  TournamentStatus,
  TournamentVisibility,
  UserRole,
  VenueMemberRole,
  VenueVerificationStatus,
};
