import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

const SPORT_INCLUDES = { createdBy: true } satisfies Prisma.SportInclude;

export type SportWithRelations = Prisma.SportGetPayload<{
  include: typeof SPORT_INCLUDES;
}>;

@Injectable()
export class AdminSportsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<SportWithRelations | null> {
    return this.prisma.sport.findUnique({ where: { id }, include: SPORT_INCLUDES });
  }

  findBySlug(slug: string): Promise<SportWithRelations | null> {
    return this.prisma.sport.findUnique({ where: { slug }, include: SPORT_INCLUDES });
  }

  list(args: { activeOnly?: boolean }): Promise<SportWithRelations[]> {
    return this.prisma.sport.findMany({
      where: args.activeOnly ? { isActive: true } : undefined,
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
      include: SPORT_INCLUDES,
    });
  }

  create(args: {
    slug: string;
    name: string;
    iconUrl?: string | null;
    description?: string | null;
    features: string[];
    slotDurations: number[];
    displayOrder: number;
    isActive: boolean;
    createdById: string;
  }): Promise<SportWithRelations> {
    return this.prisma.sport.create({
      data: {
        slug: args.slug,
        name: args.name,
        iconUrl: args.iconUrl ?? null,
        description: args.description ?? null,
        features: args.features,
        slotDurations: args.slotDurations,
        displayOrder: args.displayOrder,
        isActive: args.isActive,
        createdById: args.createdById,
      },
      include: SPORT_INCLUDES,
    });
  }

  update(args: { id: string; data: Prisma.SportUpdateInput }): Promise<SportWithRelations> {
    return this.prisma.sport.update({
      where: { id: args.id },
      data: args.data,
      include: SPORT_INCLUDES,
    });
  }

  delete(id: string): Promise<void> {
    return this.prisma.sport.delete({ where: { id } }).then(() => undefined);
  }

  /**
   * Refuse to delete a sport that's still referenced — Courts and Tournaments
   * have `ON DELETE RESTRICT` FKs, and the VenueSport junction would orphan.
   * We surface a single in-use count so the resolver can return a helpful error.
   */
  async countReferences(
    id: string,
  ): Promise<{ courts: number; tournaments: number; venues: number }> {
    const [courts, tournaments, venues] = await this.prisma.$transaction([
      this.prisma.court.count({ where: { sportId: id } }),
      this.prisma.tournament.count({ where: { sportId: id } }),
      this.prisma.venueSport.count({ where: { sportId: id } }),
    ]);
    return { courts, tournaments, venues };
  }
}
