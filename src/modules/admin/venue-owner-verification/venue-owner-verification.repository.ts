import { Injectable } from '@nestjs/common';
import { Prisma, VenueOwnerStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListVenueOwnerVerificationRequestsInput } from './dto/list-venue-owner-verification-requests.input';

const REQUEST_INCLUDES = {
  user: true,
  reviewer: true,
} as const;

export type VenueOwnerRequestWithRelations = Prisma.VenueOwnerVerificationRequestGetPayload<{
  include: typeof REQUEST_INCLUDES;
}>;

@Injectable()
export class VenueOwnerVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<VenueOwnerRequestWithRelations | null> {
    return this.prisma.venueOwnerVerificationRequest.findUnique({
      where: { id },
      include: REQUEST_INCLUDES,
    });
  }

  async listAndCount(
    input: ListVenueOwnerVerificationRequestsInput,
  ): Promise<{ items: VenueOwnerRequestWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.VenueOwnerVerificationRequestWhereInput = {};
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
      this.prisma.venueOwnerVerificationRequest.findMany({
        where,
        include: REQUEST_INCLUDES,
        orderBy: { createdAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.venueOwnerVerificationRequest.count({ where }),
    ]);
    return { items, total };
  }

  /**
   * Transactionally update both the request row and the owning user's
   * `venueOwnerStatus` so they never drift apart.
   */
  async transitionRequestAndUser(args: {
    requestId: string;
    nextRequestStatus: VenueOwnerStatus;
    nextUserStatus: VenueOwnerStatus;
    reviewedById: string;
    rejectionReason?: string | null;
  }): Promise<VenueOwnerRequestWithRelations> {
    const { requestId, nextRequestStatus, nextUserStatus, reviewedById, rejectionReason } = args;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.venueOwnerVerificationRequest.findUnique({
        where: { id: requestId },
        select: { userId: true },
      });
      if (!existing) {
        throw new Error('Request not found');
      }

      // Bump tokenVersion when suspending so any live session is killed.
      await tx.user.update({
        where: { id: existing.userId },
        data:
          nextUserStatus === VenueOwnerStatus.SUSPENDED
            ? { venueOwnerStatus: nextUserStatus, tokenVersion: { increment: 1 } }
            : { venueOwnerStatus: nextUserStatus },
      });

      return tx.venueOwnerVerificationRequest.update({
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

  setUserVenueOwnerStatus(userId: string, status: VenueOwnerStatus) {
    return this.prisma.user.update({
      where: { id: userId },
      data:
        status === VenueOwnerStatus.SUSPENDED
          ? { venueOwnerStatus: status, tokenVersion: { increment: 1 } }
          : { venueOwnerStatus: status },
    });
  }
}
