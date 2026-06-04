import { registerEnumType } from '@nestjs/graphql';
import {
  BookingStatus,
  DisputeCategory,
  DisputeStatus,
  MatchStatus,
  OrganizerStatus,
  PaymentProvider,
  PaymentStatus,
  RefundStatus,
  SettlementStatus,
  TournamentRegistrationStatus,
  TournamentStatus,
  TournamentVisibility,
  UserRole,
  VenueOwnerStatus,
  VenueVerificationStatus,
} from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Base user role. USER for everyone, SUPER_ADMIN for platform admins.',
});

registerEnumType(OrganizerStatus, {
  name: 'OrganizerStatus',
  description:
    'Lifecycle of a user requesting tournament-organizer access. Approved organizers can create tournaments.',
});

registerEnumType(VenueOwnerStatus, {
  name: 'VenueOwnerStatus',
  description:
    'Lifecycle of a user requesting venue-owner access. Approved venue owners can create venues.',
});

registerEnumType(VenueVerificationStatus, {
  name: 'VenueVerificationStatus',
  description:
    'Admin-side moderation status of a Venue. PENDING until approved; SUSPENDED hides it from the marketplace.',
});

registerEnumType(BookingStatus, {
  name: 'BookingStatus',
  description:
    'Booking lifecycle. PENDING_PAYMENT -> CONFIRMED -> COMPLETED, with CANCELLED / NO_SHOW as terminal branches.',
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
  BookingStatus,
  DisputeCategory,
  DisputeStatus,
  MatchStatus,
  OrganizerStatus,
  PaymentProvider,
  PaymentStatus,
  RefundStatus,
  SettlementStatus,
  TournamentRegistrationStatus,
  TournamentStatus,
  TournamentVisibility,
  UserRole,
  VenueOwnerStatus,
  VenueVerificationStatus,
};
