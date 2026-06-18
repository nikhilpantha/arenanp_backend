import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VenueClosure } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import type { CreateClosureInput, ListClosuresInput } from './dto/closure.inputs';

@Injectable()
export class ClosuresRepository {
  constructor(private readonly prisma: PrismaService) {}

  list(input: ListClosuresInput): Promise<VenueClosure[]> {
    const where: Prisma.VenueClosureWhereInput = { venueId: input.venueId };
    if (input.upcomingOnly) where.endAt = { gt: new Date() };
    return this.prisma.venueClosure.findMany({ where, orderBy: { startAt: 'asc' } });
  }

  async create(input: CreateClosureInput, createdById: string): Promise<VenueClosure> {
    // A court-scoped closure must reference a court owned by this venue.
    if (input.courtId) {
      const court = await this.prisma.court.findFirst({
        where: { id: input.courtId, venueId: input.venueId },
        select: { id: true },
      });
      if (!court) throw new NotFoundException('Court not found for this venue.');
    }
    return this.prisma.venueClosure.create({
      data: {
        venueId: input.venueId,
        courtId: input.courtId ?? null,
        startAt: input.startAt,
        endAt: input.endAt,
        reason: input.reason ?? null,
        createdById,
      },
    });
  }

  async remove(venueId: string, closureId: string): Promise<VenueClosure> {
    const existing = await this.prisma.venueClosure.findFirst({
      where: { id: closureId, venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Closure not found for this venue.');
    return this.prisma.venueClosure.delete({ where: { id: closureId } });
  }
}
