import { Injectable } from '@nestjs/common';
import { PaymentStatus, Prisma, RefundStatus, SettlementStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListAdminRefundsInput } from './dto/list-admin-refunds.input';

const REFUND_INCLUDES = {
  user: true,
  approvedBy: true,
  processedBy: true,
  booking: {
    select: {
      id: true,
      venueId: true,
      startAt: true,
      total: true,
      status: true,
      venue: { select: { name: true } },
      court: {
        select: {
          sport: { select: { id: true, slug: true, name: true, iconUrl: true } },
        },
      },
    },
  },
  payment: {
    select: {
      id: true,
      provider: true,
      providerTxnId: true,
      amount: true,
      status: true,
      paidAt: true,
    },
  },
} satisfies Prisma.RefundRequestInclude;

export type RefundWithRelations = Prisma.RefundRequestGetPayload<{
  include: typeof REFUND_INCLUDES;
}>;

@Injectable()
export class AdminRefundsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<RefundWithRelations | null> {
    return this.prisma.refundRequest.findUnique({ where: { id }, include: REFUND_INCLUDES });
  }

  async listAndCount(
    input: ListAdminRefundsInput,
  ): Promise<{ items: RefundWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.RefundRequestWhereInput = {};
    if (input.status) where.status = input.status;
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { booking: { id: { contains: q, mode: 'insensitive' } } },
        { booking: { venue: { name: { contains: q, mode: 'insensitive' } } } },
        { user: { fullName: { contains: q, mode: 'insensitive' } } },
        { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.refundRequest.findMany({
        where,
        include: REFUND_INCLUDES,
        orderBy: { createdAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.refundRequest.count({ where }),
    ]);
    return { items, total };
  }

  countPendingRefunds(): Promise<number> {
    return this.prisma.refundRequest.count({ where: { status: RefundStatus.REQUESTED } });
  }

  async approve(args: {
    refundId: string;
    actorId: string;
    adminNotes?: string | null;
  }): Promise<RefundWithRelations> {
    return this.prisma.refundRequest.update({
      where: { id: args.refundId },
      data: {
        status: RefundStatus.APPROVED,
        approvedById: args.actorId,
        approvedAt: new Date(),
        adminNotes: args.adminNotes ?? undefined,
        rejectionReason: null,
      },
      include: REFUND_INCLUDES,
    });
  }

  async reject(args: {
    refundId: string;
    actorId: string;
    reason: string;
  }): Promise<RefundWithRelations> {
    return this.prisma.refundRequest.update({
      where: { id: args.refundId },
      data: {
        status: RefundStatus.REJECTED,
        rejectionReason: args.reason,
        approvedById: args.actorId,
        approvedAt: new Date(),
      },
      include: REFUND_INCLUDES,
    });
  }

  /**
   * Mark a refund PROCESSED in a transaction:
   *  1. Set RefundRequest.status = PROCESSED + audit fields.
   *  2. Flip the Payment status to REFUNDED (full) or PARTIALLY_REFUNDED.
   *  3. Put any existing Settlement ON_HOLD so the venue isn't double-paid.
   */
  async markProcessed(args: {
    refundId: string;
    actorId: string;
    processorReference?: string | null;
    adminNotes?: string | null;
  }): Promise<RefundWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      const refund = await tx.refundRequest.findUnique({
        where: { id: args.refundId },
        include: { payment: true },
      });
      if (!refund) throw new Error('Refund request not found');

      if (refund.payment) {
        const requested = Number(refund.requestedAmount.toString());
        const paid = Number(refund.payment.amount.toString());
        const fullRefund = requested >= paid;
        await tx.payment.update({
          where: { id: refund.payment.id },
          data: {
            status: fullRefund ? PaymentStatus.REFUNDED : PaymentStatus.PARTIALLY_REFUNDED,
          },
        });
        // If a settlement was created already, freeze it so the venue isn't
        // paid out gross for a now-refunded booking.
        await tx.settlement.updateMany({
          where: { paymentId: refund.payment.id, status: { not: SettlementStatus.PAID } },
          data: { status: SettlementStatus.ON_HOLD },
        });
      }

      return tx.refundRequest.update({
        where: { id: args.refundId },
        data: {
          status: RefundStatus.PROCESSED,
          processedById: args.actorId,
          processedAt: new Date(),
          processorReference: args.processorReference ?? undefined,
          adminNotes: args.adminNotes ?? undefined,
        },
        include: REFUND_INCLUDES,
      });
    });
  }
}
