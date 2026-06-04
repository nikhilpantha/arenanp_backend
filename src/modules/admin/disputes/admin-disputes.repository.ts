import { Injectable } from '@nestjs/common';
import { DisputeStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListAdminDisputesInput } from './dto/list-admin-disputes.input';

const DISPUTE_INCLUDES = {
  user: true,
  closedBy: true,
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
  notes: {
    include: { author: true },
    orderBy: { createdAt: 'asc' },
  },
} satisfies Prisma.DisputeInclude;

export type DisputeWithRelations = Prisma.DisputeGetPayload<{
  include: typeof DISPUTE_INCLUDES;
}>;

@Injectable()
export class AdminDisputesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<DisputeWithRelations | null> {
    return this.prisma.dispute.findUnique({ where: { id }, include: DISPUTE_INCLUDES });
  }

  async listAndCount(
    input: ListAdminDisputesInput,
  ): Promise<{ items: DisputeWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.DisputeWhereInput = {};
    if (input.status) where.status = input.status;
    if (input.category) where.category = input.category;
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { subject: { contains: q, mode: 'insensitive' } },
        { user: { fullName: { contains: q, mode: 'insensitive' } } },
        { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
        { booking: { venue: { name: { contains: q, mode: 'insensitive' } } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.dispute.findMany({
        where,
        include: DISPUTE_INCLUDES,
        orderBy: { createdAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.dispute.count({ where }),
    ]);
    return { items, total };
  }

  addNote(args: {
    disputeId: string;
    authorId: string;
    body: string;
  }): Promise<DisputeWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      await tx.disputeNote.create({
        data: { disputeId: args.disputeId, authorId: args.authorId, body: args.body },
      });
      return tx.dispute.findUniqueOrThrow({
        where: { id: args.disputeId },
        include: DISPUTE_INCLUDES,
      });
    });
  }

  updateStatus(args: {
    disputeId: string;
    actorId: string;
    nextStatus: DisputeStatus;
    resolution?: string | null;
  }): Promise<DisputeWithRelations> {
    const isClosing =
      args.nextStatus === DisputeStatus.RESOLVED || args.nextStatus === DisputeStatus.REJECTED;
    return this.prisma.dispute.update({
      where: { id: args.disputeId },
      data: {
        status: args.nextStatus,
        resolution: args.resolution ?? undefined,
        closedById: isClosing ? args.actorId : null,
        closedAt: isClosing ? new Date() : null,
      },
      include: DISPUTE_INCLUDES,
    });
  }
}
