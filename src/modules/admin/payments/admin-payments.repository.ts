import { Injectable } from '@nestjs/common';
import { PaymentStatus, Prisma, SettlementStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListAdminPaymentsInput } from './dto/list-admin-payments.input';

const PAYMENT_INCLUDES = {
  user: true,
  booking: {
    select: {
      id: true,
      venueId: true,
      startAt: true,
      venue: { select: { name: true, city: true } },
      court: {
        select: {
          name: true,
          sport: { select: { id: true, slug: true, name: true, iconUrl: true } },
        },
      },
    },
  },
  settlement: {
    include: {
      markedPaidBy: true,
      venue: { select: { id: true, name: true } },
    },
  },
} satisfies Prisma.PaymentInclude;

export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: typeof PAYMENT_INCLUDES;
}>;

@Injectable()
export class AdminPaymentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<PaymentWithRelations | null> {
    return this.prisma.payment.findUnique({ where: { id }, include: PAYMENT_INCLUDES });
  }

  private buildWhere(input: ListAdminPaymentsInput): Prisma.PaymentWhereInput {
    const where: Prisma.PaymentWhereInput = {};
    if (input.provider) where.provider = input.provider;
    if (input.status) where.status = input.status;
    if (input.venueId) where.booking = { venueId: input.venueId };
    if (input.settlementStatus) {
      if (input.settlementStatus === SettlementStatus.PENDING) {
        // "PENDING" includes payments that have no Settlement row yet.
        where.OR = [
          { settlement: { is: null } },
          { settlement: { status: SettlementStatus.PENDING } },
        ];
      } else {
        where.settlement = { status: input.settlementStatus };
      }
    }
    if (input.fromDate || input.toDate) {
      where.paidAt = {};
      if (input.fromDate) where.paidAt.gte = input.fromDate;
      if (input.toDate) where.paidAt.lt = input.toDate;
    }
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        ...(where.OR ?? []),
        { id: { contains: q, mode: 'insensitive' } },
        { providerTxnId: { contains: q, mode: 'insensitive' } },
        { user: { fullName: { contains: q, mode: 'insensitive' } } },
        { booking: { venue: { name: { contains: q, mode: 'insensitive' } } } },
      ];
    }
    return where;
  }

  async listAndCount(
    input: ListAdminPaymentsInput,
  ): Promise<{ items: PaymentWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';
    const where = this.buildWhere(input);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        where,
        include: PAYMENT_INCLUDES,
        orderBy: [{ paidAt: direction }, { createdAt: direction }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.payment.count({ where }),
    ]);
    return { items, total };
  }

  /** Pull every payment matching the filter set, no pagination — for CSV export. */
  exportAll(input: ListAdminPaymentsInput): Promise<PaymentWithRelations[]> {
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';
    return this.prisma.payment.findMany({
      where: this.buildWhere(input),
      include: PAYMENT_INCLUDES,
      orderBy: [{ paidAt: direction }, { createdAt: direction }],
    });
  }

  /**
   * Aggregates used by the KPI strip. Returns gross / commission / venue-owed /
   * venue-settled / refunded totals for the *filter set*, not just the page.
   */
  async overview(input: ListAdminPaymentsInput, defaultCommissionPct: number) {
    const where = this.buildWhere(input);

    const [succeeded, refunded, settledAgg, unsettledAgg] = await this.prisma.$transaction([
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { ...where, status: PaymentStatus.SUCCEEDED },
      }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
          ...where,
          status: { in: [PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED] },
        },
      }),
      this.prisma.settlement.aggregate({
        _sum: {
          netAmount: true,
          platformCommissionAmount: true,
        },
        where: {
          status: SettlementStatus.PAID,
          payment: { is: where },
        },
      }),
      this.prisma.settlement.aggregate({
        _sum: {
          netAmount: true,
          platformCommissionAmount: true,
        },
        where: {
          status: { in: [SettlementStatus.PENDING, SettlementStatus.ON_HOLD] },
          payment: { is: where },
        },
      }),
    ]);

    const gross = Number(succeeded._sum.amount?.toString() ?? '0');
    const refundedTotal = Number(refunded._sum.amount?.toString() ?? '0');

    const settledCommission = Number(settledAgg._sum.platformCommissionAmount?.toString() ?? '0');
    const settledNet = Number(settledAgg._sum.netAmount?.toString() ?? '0');
    const unsettledCommission = Number(
      unsettledAgg._sum.platformCommissionAmount?.toString() ?? '0',
    );
    const unsettledNet = Number(unsettledAgg._sum.netAmount?.toString() ?? '0');

    // For payments that have no Settlement row yet, approximate commission +
    // venue-owed from the default rate.
    const settledOrUnsettledGross =
      Number((settledAgg._sum.netAmount ?? 0).toString()) +
      Number((settledAgg._sum.platformCommissionAmount ?? 0).toString()) +
      Number((unsettledAgg._sum.netAmount ?? 0).toString()) +
      Number((unsettledAgg._sum.platformCommissionAmount ?? 0).toString());
    const grossWithoutSettlement = Math.max(0, gross - settledOrUnsettledGross);
    const provisionalCommission = round2(grossWithoutSettlement * (defaultCommissionPct / 100));
    const provisionalVenueOwed = round2(grossWithoutSettlement - provisionalCommission);

    return {
      grossRevenue: gross,
      platformCommission: round2(settledCommission + unsettledCommission + provisionalCommission),
      venuesOwed: round2(unsettledNet + provisionalVenueOwed),
      venuesSettled: round2(settledNet),
      refundedTotal,
      currency: 'NPR',
    };
  }

  /**
   * Mark a payment's settlement as PAID. If no Settlement row exists, create
   * one with the current commission snapshot, then mark it PAID atomically.
   */
  async markSettlementPaid(args: {
    paymentId: string;
    actorId: string;
    commissionPercentage: number;
    paymentReference?: string | null;
    notes?: string | null;
  }): Promise<PaymentWithRelations> {
    const { paymentId, actorId, commissionPercentage, paymentReference, notes } = args;

    return this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.findUnique({
        where: { id: paymentId },
        include: { booking: { select: { venueId: true } }, settlement: true },
      });
      if (!payment) throw new Error('Payment not found');
      if (payment.status !== PaymentStatus.SUCCEEDED) {
        throw new Error(`Cannot settle a payment with status ${payment.status}`);
      }

      const grossAmount = payment.amount;
      const platformCommissionAmount = roundDecimal(
        Number(grossAmount.toString()) * (commissionPercentage / 100),
      );
      const netAmount = roundDecimal(
        Number(grossAmount.toString()) - Number(platformCommissionAmount.toString()),
      );

      if (payment.settlement) {
        await tx.settlement.update({
          where: { id: payment.settlement.id },
          data: {
            status: SettlementStatus.PAID,
            paidAt: new Date(),
            paymentReference: paymentReference ?? payment.settlement.paymentReference,
            notes: notes ?? payment.settlement.notes,
            markedPaidById: actorId,
          },
        });
      } else {
        await tx.settlement.create({
          data: {
            paymentId: payment.id,
            venueId: payment.booking.venueId,
            grossAmount,
            commissionPercentage,
            platformCommissionAmount,
            netAmount,
            currency: payment.currency,
            status: SettlementStatus.PAID,
            paidAt: new Date(),
            paymentReference: paymentReference ?? null,
            notes: notes ?? null,
            markedPaidById: actorId,
          },
        });
      }

      return tx.payment.findUniqueOrThrow({
        where: { id: paymentId },
        include: PAYMENT_INCLUDES,
      });
    });
  }
}

function roundDecimal(n: number) {
  // Decimal(10,2) round to 2dp via JS number — fine for our amounts.
  return Math.round(n * 100) / 100;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
