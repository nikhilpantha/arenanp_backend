import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TournamentStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminTournamentsRepository } from './admin-tournaments.repository';
import { AdminTournament, mapTournamentToAdmin } from './dto/admin-tournament.model';
import { ListAdminTournamentsInput } from './dto/list-admin-tournaments.input';
import { PaginatedAdminTournaments } from './dto/paginated-admin-tournaments';
import {
  ApproveTournamentInput,
  CancelTournamentInput,
  SuspendTournamentInput,
  UpdateTournamentStatusInput,
  UpdateTournamentVisibilityInput,
} from './dto/tournament-action.inputs';

const TERMINAL_STATUSES = new Set<TournamentStatus>([
  TournamentStatus.COMPLETED,
  TournamentStatus.CANCELLED,
]);

@Injectable()
export class AdminTournamentsService {
  constructor(private readonly repo: AdminTournamentsRepository) {}

  async list(input: ListAdminTournamentsInput): Promise<PaginatedAdminTournaments> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    if (input.fromDate && input.toDate && input.fromDate >= input.toDate) {
      throw new BadRequestException('fromDate must be earlier than toDate.');
    }
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapTournamentToAdmin),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<AdminTournament> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Tournament not found.');
    return mapTournamentToAdmin(row);
  }

  async approve(input: ApproveTournamentInput, actor: AuthUser): Promise<AdminTournament> {
    const existing = await this.repo.findById(input.tournamentId);
    if (!existing) throw new NotFoundException('Tournament not found.');
    if (
      existing.status !== TournamentStatus.PENDING_APPROVAL &&
      existing.status !== TournamentStatus.DRAFT
    ) {
      throw new BadRequestException(
        `Only DRAFT / PENDING_APPROVAL tournaments can be approved (current: ${existing.status}).`,
      );
    }
    const updated = await this.repo.updateStatus({
      tournamentId: existing.id,
      actorId: actor.id,
      nextStatus: TournamentStatus.APPROVED,
      rejectionReason: null,
    });
    return mapTournamentToAdmin(updated);
  }

  async suspend(input: SuspendTournamentInput, actor: AuthUser): Promise<AdminTournament> {
    const existing = await this.repo.findById(input.tournamentId);
    if (!existing) throw new NotFoundException('Tournament not found.');
    if (TERMINAL_STATUSES.has(existing.status)) {
      throw new BadRequestException(
        `Tournament is already ${existing.status}; cannot suspend a terminal tournament.`,
      );
    }
    const updated = await this.repo.updateStatus({
      tournamentId: existing.id,
      actorId: actor.id,
      nextStatus: TournamentStatus.SUSPENDED,
      suspensionReason: input.reason.trim(),
    });
    return mapTournamentToAdmin(updated);
  }

  async cancel(input: CancelTournamentInput, actor: AuthUser): Promise<AdminTournament> {
    const existing = await this.repo.findById(input.tournamentId);
    if (!existing) throw new NotFoundException('Tournament not found.');
    if (TERMINAL_STATUSES.has(existing.status)) {
      throw new BadRequestException(
        `Tournament is already ${existing.status}; cannot cancel from a terminal state.`,
      );
    }
    const updated = await this.repo.updateStatus({
      tournamentId: existing.id,
      actorId: actor.id,
      nextStatus: TournamentStatus.CANCELLED,
      rejectionReason: input.reason.trim(),
    });
    return mapTournamentToAdmin(updated);
  }

  async updateVisibility(input: UpdateTournamentVisibilityInput): Promise<AdminTournament> {
    const existing = await this.repo.findById(input.tournamentId);
    if (!existing) throw new NotFoundException('Tournament not found.');
    const updated = await this.repo.updateVisibility({
      tournamentId: input.tournamentId,
      visibility: input.visibility,
    });
    return mapTournamentToAdmin(updated);
  }

  async updateStatus(
    input: UpdateTournamentStatusInput,
    actor: AuthUser,
  ): Promise<AdminTournament> {
    const existing = await this.repo.findById(input.tournamentId);
    if (!existing) throw new NotFoundException('Tournament not found.');
    const needsReason =
      input.status === TournamentStatus.SUSPENDED || input.status === TournamentStatus.CANCELLED;
    if (needsReason && !input.reason?.trim()) {
      throw new BadRequestException(`A reason is required when transitioning to ${input.status}.`);
    }
    const updated = await this.repo.updateStatus({
      tournamentId: existing.id,
      actorId: actor.id,
      nextStatus: input.status,
      rejectionReason:
        input.status === TournamentStatus.CANCELLED ? (input.reason?.trim() ?? null) : null,
      suspensionReason:
        input.status === TournamentStatus.SUSPENDED ? (input.reason?.trim() ?? null) : null,
    });
    return mapTournamentToAdmin(updated);
  }
}
