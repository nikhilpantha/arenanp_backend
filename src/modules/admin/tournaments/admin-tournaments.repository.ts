import { Injectable } from '@nestjs/common';
import { Prisma, TournamentStatus, TournamentVisibility } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListAdminTournamentsInput } from './dto/list-admin-tournaments.input';

const TOURNAMENT_INCLUDES = {
  organizer: true,
  approvedBy: true,
  closedBy: true,
  sport: true,
  venue: { select: { id: true, name: true, city: true } },
  registrations: {
    include: { captain: true },
    orderBy: { createdAt: 'asc' },
  },
  matches: {
    include: {
      team1: { select: { teamName: true } },
      team2: { select: { teamName: true } },
      winner: { select: { teamName: true } },
      venue: { select: { id: true, name: true, city: true } },
      court: { select: { name: true } },
    },
    orderBy: [{ round: 'asc' }, { matchNumber: 'asc' }],
  },
} satisfies Prisma.TournamentInclude;

export type TournamentWithRelations = Prisma.TournamentGetPayload<{
  include: typeof TOURNAMENT_INCLUDES;
}>;

@Injectable()
export class AdminTournamentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<TournamentWithRelations | null> {
    return this.prisma.tournament.findUnique({ where: { id }, include: TOURNAMENT_INCLUDES });
  }

  async listAndCount(
    input: ListAdminTournamentsInput,
  ): Promise<{ items: TournamentWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.TournamentWhereInput = {};
    if (input.status) where.status = input.status;
    if (input.visibility) where.visibility = input.visibility;
    if (input.sport) where.sportId = input.sport;
    if (input.city) where.city = { equals: input.city, mode: 'insensitive' };
    if (input.fromDate || input.toDate) {
      where.startDate = {};
      if (input.fromDate) where.startDate.gte = input.fromDate;
      if (input.toDate) where.startDate.lt = input.toDate;
    }
    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { city: { contains: q, mode: 'insensitive' } },
        { organizer: { fullName: { contains: q, mode: 'insensitive' } } },
        { organizer: { phoneNumber: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.tournament.findMany({
        where,
        include: TOURNAMENT_INCLUDES,
        orderBy: { startDate: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.tournament.count({ where }),
    ]);
    return { items, total };
  }

  countActive(): Promise<number> {
    return this.prisma.tournament.count({ where: { status: TournamentStatus.ACTIVE } });
  }

  updateStatus(args: {
    tournamentId: string;
    actorId: string;
    nextStatus: TournamentStatus;
    rejectionReason?: string | null;
    suspensionReason?: string | null;
  }): Promise<TournamentWithRelations> {
    const isClosing =
      args.nextStatus === TournamentStatus.COMPLETED ||
      args.nextStatus === TournamentStatus.CANCELLED;
    const isApproving = args.nextStatus === TournamentStatus.APPROVED;
    return this.prisma.tournament.update({
      where: { id: args.tournamentId },
      data: {
        status: args.nextStatus,
        rejectionReason: args.rejectionReason ?? undefined,
        suspensionReason: args.suspensionReason ?? undefined,
        approvedById: isApproving ? args.actorId : undefined,
        approvedAt: isApproving ? new Date() : undefined,
        closedById: isClosing ? args.actorId : undefined,
        closedAt: isClosing ? new Date() : undefined,
      },
      include: TOURNAMENT_INCLUDES,
    });
  }

  updateVisibility(args: {
    tournamentId: string;
    visibility: TournamentVisibility;
  }): Promise<TournamentWithRelations> {
    return this.prisma.tournament.update({
      where: { id: args.tournamentId },
      data: { visibility: args.visibility },
      include: TOURNAMENT_INCLUDES,
    });
  }
}
