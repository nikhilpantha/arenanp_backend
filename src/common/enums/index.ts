import { registerEnumType } from '@nestjs/graphql';
import {
  BookingPaymentStatus,
  BookingSource,
  BookingStatus,
  CapabilityStatus,
  CapabilityType,
  CustomerType,
  DisputeCategory,
  DisputeStatus,
  MatchStatus,
  MembershipStatus,
  PaymentProvider,
  PaymentStatus,
  RefundStatus,
  SettlementStatus,
  TournamentRegistrationStatus,
  TournamentStatus,
  TournamentVisibility,
  UserRole,
  VenueMemberRole,
  VenueVerificationStatus,
} from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Base user role. USER for everyone, SUPER_ADMIN for platform admins.',
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

registerEnumType(TournamentRegistrationStatus, {
  name: 'TournamentRegistrationStatus',
  description:
    'Lifecycle of a team registration. REGISTERED -> CONFIRMED, or WITHDRAWN / REJECTED.',
});

registerEnumType(MatchStatus, {
  name: 'MatchStatus',
  description: 'State of a tournament match.',
});

export {
  BookingPaymentStatus,
  BookingSource,
  BookingStatus,
  CapabilityStatus,
  CapabilityType,
  CustomerType,
  DisputeCategory,
  DisputeStatus,
  MatchStatus,
  MembershipStatus,
  PaymentProvider,
  PaymentStatus,
  RefundStatus,
  SettlementStatus,
  TournamentRegistrationStatus,
  TournamentStatus,
  TournamentVisibility,
  UserRole,
  VenueMemberRole,
  VenueVerificationStatus,
};
