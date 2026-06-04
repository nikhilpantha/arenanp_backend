import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  PaymentProvider,
  PaymentStatus,
  Payment as PrismaPayment,
  SettlementStatus,
  Settlement as PrismaSettlement,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';
import { SportStub, mapSportStub } from '../../sports/dto/sport-stub.model';

@ObjectType({ description: 'Booking summary embedded in the payment payload.' })
export class AdminPaymentBookingStub {
  @Field(() => ID) id!: string;
  @Field() venueName!: string;
  @Field({ nullable: true }) venueId?: string;
  @Field() courtName!: string;
  @Field(() => SportStub) sport!: SportStub;
  @Field() startAt!: Date;
}

@ObjectType({
  description:
    'Commission breakdown for a payment. Live-computed when no Settlement row exists, otherwise reflects the snapshot stored on the Settlement.',
})
export class CommissionBreakdown {
  @Field(() => Float) grossAmount!: number;
  @Field(() => Float) commissionPercentage!: number;
  @Field(() => Float) platformCommissionAmount!: number;
  @Field(() => Float) venueSettlementAmount!: number;
  @Field() currency!: string;
  @Field({ description: 'true when no Settlement row exists yet — the values are computed live.' })
  isProvisional!: boolean;
}

@ObjectType()
export class AdminSettlement {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;
  @Field() venueName!: string;
  @Field(() => Float) grossAmount!: number;
  @Field(() => Float) commissionPercentage!: number;
  @Field(() => Float) platformCommissionAmount!: number;
  @Field(() => Float) netAmount!: number;
  @Field() currency!: string;
  @Field(() => SettlementStatus) status!: SettlementStatus;
  @Field({ nullable: true }) paidAt?: Date;
  @Field({ nullable: true }) paymentReference?: string;
  @Field({ nullable: true }) notes?: string;
  @Field(() => AdminUser, { nullable: true }) markedPaidBy?: AdminUser;
  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

@ObjectType({
  description:
    'Admin-facing payment row: customer, booking summary, commission and (optional) settlement.',
})
export class AdminPayment {
  @Field(() => ID) id!: string;
  @Field(() => AdminUser) user!: AdminUser;
  @Field(() => AdminPaymentBookingStub) booking!: AdminPaymentBookingStub;

  @Field(() => PaymentProvider) provider!: PaymentProvider;
  @Field({ nullable: true }) providerTxnId?: string;
  @Field(() => Float) amount!: number;
  @Field() currency!: string;
  @Field(() => PaymentStatus) status!: PaymentStatus;
  @Field({ nullable: true }) failureReason?: string;
  @Field({ nullable: true }) paidAt?: Date;

  @Field(() => CommissionBreakdown) commission!: CommissionBreakdown;
  @Field(() => AdminSettlement, { nullable: true }) settlement?: AdminSettlement;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

@ObjectType({
  description: 'Aggregate totals for a payment filter set — used to power the KPI strip.',
})
export class PaymentsOverview {
  @Field(() => Float) grossRevenue!: number;
  @Field(() => Float) platformCommission!: number;
  @Field(() => Float) venuesOwed!: number;
  @Field(() => Float) venuesSettled!: number;
  @Field(() => Float) refundedTotal!: number;
  @Field() currency!: string;
}

function decimalToNumber(d: Decimal | null | undefined): number {
  if (d === null || d === undefined) return 0;
  return typeof d === 'number' ? d : Number(d.toString());
}

type BookingLite = {
  id: string;
  venueId: string;
  venue: { name: string };
  court: {
    name: string;
    sport: { id: string; slug: string; name: string; iconUrl: string | null };
  };
  startAt: Date;
};

type PaymentWithRelations = PrismaPayment & {
  user: Parameters<typeof mapPrismaUserToAdmin>[0];
  booking: BookingLite;
  settlement?:
    | (PrismaSettlement & {
        markedPaidBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
        venue: { id: string; name: string };
      })
    | null;
};

export function buildCommissionBreakdown(args: {
  amount: number;
  currency: string;
  commissionPercentage: number;
  fromSettlement?: {
    grossAmount: number;
    commissionPercentage: number;
    platformCommissionAmount: number;
    netAmount: number;
    currency: string;
  } | null;
}): CommissionBreakdown {
  if (args.fromSettlement) {
    return {
      grossAmount: args.fromSettlement.grossAmount,
      commissionPercentage: args.fromSettlement.commissionPercentage,
      platformCommissionAmount: args.fromSettlement.platformCommissionAmount,
      venueSettlementAmount: args.fromSettlement.netAmount,
      currency: args.fromSettlement.currency,
      isProvisional: false,
    };
  }
  const pct = args.commissionPercentage;
  const platform = round2(args.amount * (pct / 100));
  const venue = round2(args.amount - platform);
  return {
    grossAmount: args.amount,
    commissionPercentage: pct,
    platformCommissionAmount: platform,
    venueSettlementAmount: venue,
    currency: args.currency,
    isProvisional: true,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function mapAdminSettlement(
  s: PrismaSettlement & {
    markedPaidBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
    venue: { id: string; name: string };
  },
): AdminSettlement {
  return {
    id: s.id,
    venueId: s.venueId,
    venueName: s.venue.name,
    grossAmount: decimalToNumber(s.grossAmount),
    commissionPercentage: decimalToNumber(s.commissionPercentage),
    platformCommissionAmount: decimalToNumber(s.platformCommissionAmount),
    netAmount: decimalToNumber(s.netAmount),
    currency: s.currency,
    status: s.status,
    paidAt: s.paidAt ?? undefined,
    paymentReference: s.paymentReference ?? undefined,
    notes: s.notes ?? undefined,
    markedPaidBy: s.markedPaidBy ? mapPrismaUserToAdmin(s.markedPaidBy) : undefined,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  };
}

export function mapAdminPayment(
  p: PaymentWithRelations,
  defaultCommissionPct: number,
): AdminPayment {
  const amount = decimalToNumber(p.amount);
  const settlement = p.settlement ?? null;
  const settlementGql = settlement ? mapAdminSettlement(settlement) : undefined;

  const commission = buildCommissionBreakdown({
    amount,
    currency: p.currency,
    commissionPercentage: defaultCommissionPct,
    fromSettlement: settlement
      ? {
          grossAmount: decimalToNumber(settlement.grossAmount),
          commissionPercentage: decimalToNumber(settlement.commissionPercentage),
          platformCommissionAmount: decimalToNumber(settlement.platformCommissionAmount),
          netAmount: decimalToNumber(settlement.netAmount),
          currency: settlement.currency,
        }
      : null,
  });

  return {
    id: p.id,
    user: mapPrismaUserToAdmin(p.user),
    booking: {
      id: p.booking.id,
      venueId: p.booking.venueId,
      venueName: p.booking.venue.name,
      courtName: p.booking.court.name,
      sport: mapSportStub(p.booking.court.sport),
      startAt: p.booking.startAt,
    },
    provider: p.provider,
    providerTxnId: p.providerTxnId ?? undefined,
    amount,
    currency: p.currency,
    status: p.status,
    failureReason: p.failureReason ?? undefined,
    paidAt: p.paidAt ?? undefined,
    commission,
    settlement: settlementGql,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}
