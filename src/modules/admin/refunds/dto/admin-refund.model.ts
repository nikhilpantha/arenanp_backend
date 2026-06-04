import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  PaymentProvider,
  PaymentStatus,
  RefundRequest as PrismaRefundRequest,
  RefundStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';
import { SportStub, mapSportStub } from '../../sports/dto/sport-stub.model';

@ObjectType({ description: 'Booking context embedded in a refund request.' })
export class AdminRefundBookingStub {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) venueId?: string;
  @Field() venueName!: string;
  @Field(() => SportStub, { nullable: true }) sport?: SportStub;
  @Field() startAt!: Date;
  @Field(() => Float) total!: number;
  @Field() status!: string;
}

@ObjectType({ description: 'Payment context embedded in a refund request (when one exists).' })
export class AdminRefundPaymentStub {
  @Field(() => ID) id!: string;
  @Field(() => PaymentProvider) provider!: PaymentProvider;
  @Field({ nullable: true }) providerTxnId?: string;
  @Field(() => Float) amount!: number;
  @Field(() => PaymentStatus) status!: PaymentStatus;
  @Field({ nullable: true }) paidAt?: Date;
}

@ObjectType({
  description:
    'Admin-facing view of a refund request — booking + payment context, lifecycle timestamps, reviewer audit.',
})
export class AdminRefundRequest {
  @Field(() => ID) id!: string;
  @Field(() => AdminUser) user!: AdminUser;
  @Field(() => AdminRefundBookingStub) booking!: AdminRefundBookingStub;
  @Field(() => AdminRefundPaymentStub, { nullable: true }) payment?: AdminRefundPaymentStub;

  @Field(() => Float) requestedAmount!: number;
  @Field() currency!: string;
  @Field() reason!: string;

  @Field(() => RefundStatus) status!: RefundStatus;
  @Field({ nullable: true }) rejectionReason?: string;
  @Field({ nullable: true }) adminNotes?: string;

  @Field(() => AdminUser, { nullable: true }) approvedBy?: AdminUser;
  @Field({ nullable: true }) approvedAt?: Date;

  @Field(() => AdminUser, { nullable: true }) processedBy?: AdminUser;
  @Field({ nullable: true }) processedAt?: Date;
  @Field({ nullable: true }) processorReference?: string;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

function decimalToNumber(d: Decimal | null | undefined): number {
  if (d === null || d === undefined) return 0;
  return typeof d === 'number' ? d : Number(d.toString());
}

type RefundWithRelations = PrismaRefundRequest & {
  user: Parameters<typeof mapPrismaUserToAdmin>[0];
  approvedBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  processedBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  booking: {
    id: string;
    venueId: string;
    startAt: Date;
    total: Decimal;
    status: string;
    venue: { name: string };
    court: { sport: { id: string; slug: string; name: string; iconUrl: string | null } };
  };
  payment: {
    id: string;
    provider: PaymentProvider;
    providerTxnId: string | null;
    amount: Decimal;
    status: PaymentStatus;
    paidAt: Date | null;
  } | null;
};

export function mapRefundToAdmin(r: RefundWithRelations): AdminRefundRequest {
  return {
    id: r.id,
    user: mapPrismaUserToAdmin(r.user),
    booking: {
      id: r.booking.id,
      venueId: r.booking.venueId,
      venueName: r.booking.venue.name,
      sport: mapSportStub(r.booking.court.sport),
      startAt: r.booking.startAt,
      total: decimalToNumber(r.booking.total),
      status: r.booking.status,
    },
    payment: r.payment
      ? {
          id: r.payment.id,
          provider: r.payment.provider,
          providerTxnId: r.payment.providerTxnId ?? undefined,
          amount: decimalToNumber(r.payment.amount),
          status: r.payment.status,
          paidAt: r.payment.paidAt ?? undefined,
        }
      : undefined,
    requestedAmount: decimalToNumber(r.requestedAmount),
    currency: r.currency,
    reason: r.reason,
    status: r.status,
    rejectionReason: r.rejectionReason ?? undefined,
    adminNotes: r.adminNotes ?? undefined,
    approvedBy: r.approvedBy ? mapPrismaUserToAdmin(r.approvedBy) : undefined,
    approvedAt: r.approvedAt ?? undefined,
    processedBy: r.processedBy ? mapPrismaUserToAdmin(r.processedBy) : undefined,
    processedAt: r.processedAt ?? undefined,
    processorReference: r.processorReference ?? undefined,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
}
