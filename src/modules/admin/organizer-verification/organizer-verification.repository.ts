import { Injectable } from '@nestjs/common';
import { CapabilityStatus, CapabilityType, Prisma } from '@prisma/client';
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
    nextRequestStatus: CapabilityStatus;
    nextUserStatus: CapabilityStatus;
    reviewedById: string;
    rejectionReason?: string | null;
  }): Promise<RequestWithRelations> {
    const { requestId, nextRequestStatus, nextUserStatus, reviewedById, rejectionReason } = args;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.organizerVerificationRequest.findUnique({
        where: { id: requestId },
        select: {
          userId: true,
          businessName: true,
          contactEmail: true,
          contactPhone: true,
          city: true,
          bio: true,
          experience: true,
        },
      });
      if (!existing) {
        throw new Error('Request not found');
      }

      await this.applyCapability(tx, existing.userId, nextUserStatus);

      // On approval, materialise the living organizer profile from the application.
      if (nextUserStatus === CapabilityStatus.APPROVED) {
        const profile = {
          businessName: existing.businessName,
          contactEmail: existing.contactEmail,
          contactPhone: existing.contactPhone,
          city: existing.city,
          bio: existing.bio,
          experience: existing.experience,
        };
        await tx.organizerProfile.upsert({
          where: { userId: existing.userId },
          update: profile,
          create: { userId: existing.userId, ...profile },
        });
      }

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
  setUserCapabilityStatus(userId: string, status: CapabilityStatus) {
    return this.prisma.$transaction(async (tx) => {
      await this.applyCapability(tx, userId, status);
      return tx.user.findUniqueOrThrow({
        where: { id: userId },
        include: { capabilities: true },
      });
    });
  }

  /** Upsert the user's ORGANIZER capability; bump tokenVersion when suspending. */
  private async applyCapability(
    tx: Prisma.TransactionClient,
    userId: string,
    status: CapabilityStatus,
  ): Promise<void> {
    await tx.userCapability.upsert({
      where: { userId_type: { userId, type: CapabilityType.ORGANIZER } },
      update: { status },
      create: { userId, type: CapabilityType.ORGANIZER, status },
    });
    if (status === CapabilityStatus.SUSPENDED) {
      await tx.user.update({
        where: { id: userId },
        data: { tokenVersion: { increment: 1 } },
      });
    }
  }
}
