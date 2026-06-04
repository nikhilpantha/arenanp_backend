import { Injectable } from '@nestjs/common';
import { OrganizerStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListOrganizerVerificationRequestsInput } from './dto/list-organizer-verification-requests.input';

const REQUEST_INCLUDES = {
  user: true,
  reviewer: true,
} as const;

export type RequestWithRelations = Prisma.OrganizerVerificationRequestGetPayload<{
  include: typeof REQUEST_INCLUDES;
}>;

@Injectable()
export class OrganizerVerificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<RequestWithRelations | null> {
    return this.prisma.organizerVerificationRequest.findUnique({
      where: { id },
      include: REQUEST_INCLUDES,
    });
  }

  async listAndCount(
    input: ListOrganizerVerificationRequestsInput,
  ): Promise<{ items: RequestWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.OrganizerVerificationRequestWhereInput = {};
    if (input.status) where.status = input.status;
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { businessName: { contains: q, mode: 'insensitive' } },
        { user: { fullName: { contains: q, mode: 'insensitive' } } },
        { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
        { user: { email: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.organizerVerificationRequest.findMany({
        where,
        include: REQUEST_INCLUDES,
        orderBy: { createdAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.organizerVerificationRequest.count({ where }),
    ]);
    return { items, total };
  }

  /**
   * Transactionally update both the request row and the owning user's
   * `organizerStatus` so the two never drift apart. Returns the updated
   * request (with relations) for the resolver to return.
   */
  async transitionRequestAndUser(args: {
    requestId: string;
    nextRequestStatus: OrganizerStatus;
    nextUserStatus: OrganizerStatus;
    reviewedById: string;
    rejectionReason?: string | null;
  }): Promise<RequestWithRelations> {
    const { requestId, nextRequestStatus, nextUserStatus, reviewedById, rejectionReason } = args;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.organizerVerificationRequest.findUnique({
        where: { id: requestId },
        select: { userId: true },
      });
      if (!existing) {
        throw new Error('Request not found');
      }

      // Bump tokenVersion when the user is being suspended so any existing
      // session is immediately invalidated.
      await tx.user.update({
        where: { id: existing.userId },
        data:
          nextUserStatus === OrganizerStatus.SUSPENDED
            ? { organizerStatus: nextUserStatus, tokenVersion: { increment: 1 } }
            : { organizerStatus: nextUserStatus },
      });

      return tx.organizerVerificationRequest.update({
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

  /** Suspend / reinstate an organizer at the user level. No request row touched. */
  setUserOrganizerStatus(userId: string, status: OrganizerStatus) {
    return this.prisma.user.update({
      where: { id: userId },
      data:
        status === OrganizerStatus.SUSPENDED
          ? { organizerStatus: status, tokenVersion: { increment: 1 } }
          : { organizerStatus: status },
    });
  }
}
