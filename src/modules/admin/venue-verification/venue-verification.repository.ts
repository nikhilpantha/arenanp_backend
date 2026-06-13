import { Injectable } from '@nestjs/common';
import { CapabilityStatus, CapabilityType, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListVenueVerificationRequestsInput } from './dto/list-venue-verification-requests.input';

const REQUEST_INCLUDES = {
  user: true,
  reviewer: true,
} as const;

export type VenueRequestWithRelations = Prisma.VenueVerificationRequestGetPayload<{
  include: typeof REQUEST_INCLUDES;
}>;

@Injectable()
export class VenueVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<VenueRequestWithRelations | null> {
    return this.prisma.venueVerificationRequest.findUnique({
      where: { id },
      include: REQUEST_INCLUDES,
    });
  }

  async listAndCount(
    input: ListVenueVerificationRequestsInput,
  ): Promise<{ items: VenueRequestWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.VenueVerificationRequestWhereInput = {};
    if (input.status) where.status = input.status;
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { businessName: { contains: q, mode: 'insensitive' } },
        { panNumber: { contains: q, mode: 'insensitive' } },
        { user: { fullName: { contains: q, mode: 'insensitive' } } },
        { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
        { user: { email: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.venueVerificationRequest.findMany({
        where,
        include: REQUEST_INCLUDES,
        orderBy: { createdAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.venueVerificationRequest.count({ where }),
    ]);
    return { items, total };
  }

  /**
   * Transactionally update the request row and the owning user's VENUE
   * capability (upserted) so they never drift apart. Suspending also bumps
   * `tokenVersion` to kill any live session.
   */
  async transitionRequestAndUser(args: {
    requestId: string;
    nextRequestStatus: CapabilityStatus;
    nextUserStatus: CapabilityStatus;
    reviewedById: string;
    rejectionReason?: string | null;
  }): Promise<VenueRequestWithRelations> {
    const { requestId, nextRequestStatus, nextUserStatus, reviewedById, rejectionReason } = args;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.venueVerificationRequest.findUnique({
        where: { id: requestId },
        select: { userId: true },
      });
      if (!existing) {
        throw new Error('Request not found');
      }

      await this.applyCapability(tx, existing.userId, nextUserStatus);

      return tx.venueVerificationRequest.update({
        where: { id: requestId },
        data: {
          status: nextRequestStatus,
          rejectionReason: rejectionReason ?? null,
          reviewedById,
          reviewedAt: new Date(),
        },
        include: REQUEST_INCLUDES,
      });
    });
  }

  setUserCapabilityStatus(userId: string, status: CapabilityStatus) {
    return this.prisma.$transaction(async (tx) => {
      await this.applyCapability(tx, userId, status);
      return tx.user.findUniqueOrThrow({
        where: { id: userId },
        include: { capabilities: true },
      });
    });
  }

  /** Upsert the user's VENUE capability; bump tokenVersion when suspending. */
  private async applyCapability(
    tx: Prisma.TransactionClient,
    userId: string,
    status: CapabilityStatus,
  ): Promise<void> {
    await tx.userCapability.upsert({
      where: { userId_type: { userId, type: CapabilityType.VENUE } },
      update: { status },
      create: { userId, type: CapabilityType.VENUE, status },
    });
    if (status === CapabilityStatus.SUSPENDED) {
      await tx.user.update({
        where: { id: userId },
        data: { tokenVersion: { increment: 1 } },
      });
    }
  }
}
