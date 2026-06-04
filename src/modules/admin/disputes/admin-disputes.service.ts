import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DisputeStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminDisputesRepository } from './admin-disputes.repository';
import { AdminDispute, mapDisputeToAdmin } from './dto/admin-dispute.model';
import { ListAdminDisputesInput } from './dto/list-admin-disputes.input';
import { PaginatedAdminDisputes } from './dto/paginated-admin-disputes';
import {
  CreateAdminNoteOnDisputeInput,
  UpdateDisputeStatusInput,
} from './dto/dispute-action.inputs';

@Injectable()
export class AdminDisputesService {
  constructor(private readonly repo: AdminDisputesRepository) {}

  async list(input: ListAdminDisputesInput): Promise<PaginatedAdminDisputes> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapDisputeToAdmin),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<AdminDispute> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Dispute not found.');
    return mapDisputeToAdmin(row);
  }

  async addNote(input: CreateAdminNoteOnDisputeInput, actor: AuthUser): Promise<AdminDispute> {
    const existing = await this.repo.findById(input.disputeId);
    if (!existing) throw new NotFoundException('Dispute not found.');
    const updated = await this.repo.addNote({
      disputeId: input.disputeId,
      authorId: actor.id,
      body: input.body.trim(),
    });
    return mapDisputeToAdmin(updated);
  }

  async updateStatus(input: UpdateDisputeStatusInput, actor: AuthUser): Promise<AdminDispute> {
    const existing = await this.repo.findById(input.disputeId);
    if (!existing) throw new NotFoundException('Dispute not found.');
    if (input.status === DisputeStatus.RESOLVED && !input.resolution?.trim()) {
      throw new BadRequestException('A resolution is required when marking a dispute resolved.');
    }
    if (
      (existing.status === DisputeStatus.RESOLVED || existing.status === DisputeStatus.REJECTED) &&
      input.status !== existing.status
    ) {
      throw new BadRequestException(
        `Dispute is already ${existing.status}; closed disputes cannot be reopened from here.`,
      );
    }
    const updated = await this.repo.updateStatus({
      disputeId: input.disputeId,
      actorId: actor.id,
      nextStatus: input.status,
      resolution: input.resolution?.trim() ?? null,
    });
    return mapDisputeToAdmin(updated);
  }
}
