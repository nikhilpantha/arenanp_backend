import { Injectable } from '@nestjs/common';
import { Prisma, VenueVerificationStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListAdminVenuesInput } from './dto/list-admin-venues.input';

const VENUE_INCLUDES = {
  owner: true,
  reviewer: true,
  courts: {
    orderBy: { createdAt: 'asc' },
    include: { sport: true },
  },
  venueSports: {
    include: { sport: true },
    orderBy: { sport: { displayOrder: 'asc' } },
  },
} satisfies Prisma.VenueInclude;

export type VenueWithRelations = Prisma.VenueGetPayload<{ include: typeof VENUE_INCLUDES }>;

@Injectable()
export class AdminVenuesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<VenueWithRelations | null> {
    return this.prisma.venue.findUnique({ where: { id }, include: VENUE_INCLUDES });
  }

  async listAndCount(
    input: ListAdminVenuesInput,
  ): Promise<{ items: VenueWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.VenueWhereInput = {};
    if (input.verificationStatus) where.verificationStatus = input.verificationStatus;
    if (input.city) where.city = { equals: input.city, mode: 'insensitive' };
    if (input.sport) {
      // `input.sport` is now a sport id (the frontend resolves slug -> id before sending).
      where.venueSports = { some: { sportId: input.sport } };
    }
    if (typeof input.isFeatured === 'boolean') where.isFeatured = input.isFeatured;
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { owner: { fullName: { contains: q, mode: 'insensitive' } } },
        { owner: { phoneNumber: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.venue.findMany({
        where,
        include: VENUE_INCLUDES,
        orderBy: { createdAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.venue.count({ where }),
    ]);
    return { items, total };
  }

  updateVerification(args: {
    venueId: string;
    nextStatus: VenueVerificationStatus;
    reviewedById: string;
    rejectionReason?: string | null;
  }): Promise<VenueWithRelations> {
    return this.prisma.venue.update({
      where: { id: args.venueId },
      data: {
        verificationStatus: args.nextStatus,
        rejectionReason: args.rejectionReason ?? null,
        reviewedById: args.reviewedById,
        reviewedAt: new Date(),
      },
      include: VENUE_INCLUDES,
    });
  }

  setFeatured(venueId: string, isFeatured: boolean): Promise<VenueWithRelations> {
    return this.prisma.venue.update({
      where: { id: venueId },
      data: {
        isFeatured,
        featuredAt: isFeatured ? new Date() : null,
      },
      include: VENUE_INCLUDES,
    });
  }
}
