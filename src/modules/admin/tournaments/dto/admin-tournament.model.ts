import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  MatchStatus,
  Match as PrismaMatch,
  PaymentProvider,
  PaymentStatus,
  Sport as PrismaSport,
  TournamentRegistrationStatus,
  TournamentRegistration as PrismaTournamentRegistration,
  TournamentStatus,
  TournamentVisibility,
  Tournament as PrismaTournament,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { SportStub, mapSportStub } from '../../sports/dto/sport-stub.model';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';

@ObjectType({ description: 'Venue stub embedded in tournament payloads.' })
export class AdminTournamentVenueStub {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) city?: string;
}

@ObjectType({ description: 'Team / registration row inside the tournament detail.' })
export class AdminTournamentRegistration {
  @Field(() => ID) id!: string;
  @Field() teamName!: string;
  @Field(() => AdminUser, { nullable: true }) captain?: AdminUser;
  @Field({ nullable: true }) contactEmail?: string;
  @Field({ nullable: true }) contactPhone?: string;
  @Field(() => TournamentRegistrationStatus) status!: TournamentRegistrationStatus;
  @Field(() => PaymentStatus) paymentStatus!: PaymentStatus;
  @Field(() => PaymentProvider, { nullable: true }) paymentProvider?: PaymentProvider;
  @Field({ nullable: true }) paymentReference?: string;
  @Field(() => Float) amountPaid!: number;
  @Field({ nullable: true }) paidAt?: Date;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'A single match row inside the bracket.' })
export class AdminTournamentMatch {
  @Field(() => ID) id!: string;
  @Field(() => Int) round!: number;
  @Field(() => Int) matchNumber!: number;
  @Field({ nullable: true }) team1Name?: string;
  @Field({ nullable: true }) team2Name?: string;
  @Field(() => Int, { nullable: true }) team1Score?: number;
  @Field(() => Int, { nullable: true }) team2Score?: number;
  @Field({ nullable: true }) winnerTeamName?: string;
  @Field({ nullable: true }) scheduledAt?: Date;
  @Field(() => AdminTournamentVenueStub, { nullable: true }) venue?: AdminTournamentVenueStub;
  @Field({ nullable: true }) courtName?: string;
  @Field(() => MatchStatus) status!: MatchStatus;
  @Field({ nullable: true }) notes?: string;
}

@ObjectType({ description: 'Aggregated payment totals for a tournament.' })
export class AdminTournamentPaymentSummary {
  @Field(() => Int) totalRegistrations!: number;
  @Field(() => Int) paidRegistrations!: number;
  @Field(() => Int) pendingPayments!: number;
  @Field(() => Float) totalCollected!: number;
  @Field(() => Float) entryFee!: number;
  @Field() currency!: string;
}

@ObjectType({
  description:
    'Admin-facing view of a Tournament — organizer, registrations, matches and payment totals.',
})
export class AdminTournament {
  @Field(() => ID) id!: string;
  @Field(() => AdminUser) organizer!: AdminUser;
  @Field(() => AdminTournamentVenueStub, { nullable: true }) venue?: AdminTournamentVenueStub;

  @Field() name!: string;
  @Field() slug!: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => SportStub) sport!: SportStub;
  @Field({ nullable: true }) city?: string;

  @Field() startDate!: Date;
  @Field() endDate!: Date;
  @Field({ nullable: true }) registrationDeadline?: Date;

  @Field(() => Int, { nullable: true }) maxTeams?: number;
  @Field(() => Int, { nullable: true }) minTeams?: number;

  @Field(() => Float) entryFee!: number;
  @Field(() => Float) prizePool!: number;
  @Field() currency!: string;

  @Field({ nullable: true }) coverImageUrl?: string;
  @Field(() => [String]) imageUrls!: string[];
  @Field({ nullable: true }) rulesText?: string;

  @Field(() => TournamentStatus) status!: TournamentStatus;
  @Field(() => TournamentVisibility) visibility!: TournamentVisibility;

  @Field({ nullable: true }) rejectionReason?: string;
  @Field({ nullable: true }) suspensionReason?: string;

  @Field(() => AdminUser, { nullable: true }) approvedBy?: AdminUser;
  @Field({ nullable: true }) approvedAt?: Date;
  @Field(() => AdminUser, { nullable: true }) closedBy?: AdminUser;
  @Field({ nullable: true }) closedAt?: Date;

  @Field(() => [AdminTournamentRegistration]) registrations!: AdminTournamentRegistration[];
  @Field(() => [AdminTournamentMatch]) matches!: AdminTournamentMatch[];
  @Field(() => AdminTournamentPaymentSummary) paymentSummary!: AdminTournamentPaymentSummary;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

function decimalToNumber(d: Decimal | null | undefined): number {
  if (d === null || d === undefined) return 0;
  return typeof d === 'number' ? d : Number(d.toString());
}

type RegistrationLite = PrismaTournamentRegistration & {
  captain?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

type MatchLite = PrismaMatch & {
  team1?: { teamName: string } | null;
  team2?: { teamName: string } | null;
  winner?: { teamName: string } | null;
  venue?: { id: string; name: string; city: string | null } | null;
  court?: { name: string } | null;
};

type TournamentWithRelations = PrismaTournament & {
  organizer: Parameters<typeof mapPrismaUserToAdmin>[0];
  approvedBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  closedBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  sport: PrismaSport;
  venue?: { id: string; name: string; city: string | null } | null;
  registrations: RegistrationLite[];
  matches: MatchLite[];
};

export function mapRegistrationToAdmin(r: RegistrationLite): AdminTournamentRegistration {
  return {
    id: r.id,
    teamName: r.teamName,
    captain: r.captain ? mapPrismaUserToAdmin(r.captain) : undefined,
    contactEmail: r.contactEmail ?? undefined,
    contactPhone: r.contactPhone ?? undefined,
    status: r.status,
    paymentStatus: r.paymentStatus,
    paymentProvider: r.paymentProvider ?? undefined,
    paymentReference: r.paymentReference ?? undefined,
    amountPaid: decimalToNumber(r.amountPaid),
    paidAt: r.paidAt ?? undefined,
    createdAt: r.createdAt,
  };
}

export function mapMatchToAdmin(m: MatchLite): AdminTournamentMatch {
  return {
    id: m.id,
    round: m.round,
    matchNumber: m.matchNumber,
    team1Name: m.team1?.teamName ?? undefined,
    team2Name: m.team2?.teamName ?? undefined,
    team1Score: m.team1Score ?? undefined,
    team2Score: m.team2Score ?? undefined,
    winnerTeamName: m.winner?.teamName ?? undefined,
    scheduledAt: m.scheduledAt ?? undefined,
    venue: m.venue
      ? { id: m.venue.id, name: m.venue.name, city: m.venue.city ?? undefined }
      : undefined,
    courtName: m.court?.name ?? undefined,
    status: m.status,
    notes: m.notes ?? undefined,
  };
}

export function mapTournamentToAdmin(t: TournamentWithRelations): AdminTournament {
  const registrations = t.registrations.map(mapRegistrationToAdmin);
  const matches = t.matches.map(mapMatchToAdmin);

  const totalCollected = registrations.reduce((sum, r) => sum + r.amountPaid, 0);
  const paidRegistrations = registrations.filter((r) => r.paymentStatus === 'SUCCEEDED').length;
  const pendingPayments = registrations.filter((r) => r.paymentStatus === 'PENDING').length;

  return {
    id: t.id,
    organizer: mapPrismaUserToAdmin(t.organizer),
    venue: t.venue
      ? { id: t.venue.id, name: t.venue.name, city: t.venue.city ?? undefined }
      : undefined,
    name: t.name,
    slug: t.slug,
    description: t.description ?? undefined,
    sport: mapSportStub(t.sport),
    city: t.city ?? undefined,
    startDate: t.startDate,
    endDate: t.endDate,
    registrationDeadline: t.registrationDeadline ?? undefined,
    maxTeams: t.maxTeams ?? undefined,
    minTeams: t.minTeams ?? undefined,
    entryFee: decimalToNumber(t.entryFee),
    prizePool: decimalToNumber(t.prizePool),
    currency: t.currency,
    coverImageUrl: t.coverImageUrl ?? undefined,
    imageUrls: t.imageUrls,
    rulesText: t.rulesText ?? undefined,
    status: t.status,
    visibility: t.visibility,
    rejectionReason: t.rejectionReason ?? undefined,
    suspensionReason: t.suspensionReason ?? undefined,
    approvedBy: t.approvedBy ? mapPrismaUserToAdmin(t.approvedBy) : undefined,
    approvedAt: t.approvedAt ?? undefined,
    closedBy: t.closedBy ? mapPrismaUserToAdmin(t.closedBy) : undefined,
    closedAt: t.closedAt ?? undefined,
    registrations,
    matches,
    paymentSummary: {
      totalRegistrations: registrations.length,
      paidRegistrations,
      pendingPayments,
      totalCollected,
      entryFee: decimalToNumber(t.entryFee),
      currency: t.currency,
    },
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}
