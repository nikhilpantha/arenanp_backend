import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RefundStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminRefundsRepository } from './admin-refunds.repository';
import { AdminRefundRequest, mapRefundToAdmin } from './dto/admin-refund.model';
import { ListAdminRefundsInput } from './dto/list-admin-refunds.input';
import { PaginatedAdminRefunds } from './dto/paginated-admin-refunds';
import {
  ApproveRefundInput,
  MarkRefundProcessedInput,
  RejectRefundInput,
} from './dto/refund-action.inputs';

@Injectable()
export class AdminRefundsService {
  constructor(private readonly repo: AdminRefundsRepository) {}

  async list(input: ListAdminRefundsInput): Promise<PaginatedAdminRefunds> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapRefundToAdmin),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<AdminRefundRequest> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Refund request not found.');
    return mapRefundToAdmin(row);
  }

  async approve(input: ApproveRefundInput, actor: AuthUser): Promise<AdminRefundRequest> {
    const existing = await this.repo.findById(input.refundId);
    if (!existing) throw new NotFoundException('Refund request not found.');
    if (existing.status !== RefundStatus.REQUESTED) {
      throw new BadRequestException(
        `Only REQUESTED refunds can be approved (current: ${existing.status}).`,
      );
    }
    const updated = await this.repo.approve({
      refundId: input.refundId,
      actorId: actor.id,
      adminNotes: input.adminNotes?.trim() ?? null,
    });
    return mapRefundToAdmin(updated);
  }

  async reject(input: RejectRefundInput, actor: AuthUser): Promise<AdminRefundRequest> {
    const existing = await this.repo.findById(input.refundId);
    if (!existing) throw new NotFoundException('Refund request not found.');
    if (existing.status !== RefundStatus.REQUESTED) {
      throw new BadRequestException(
        `Only REQUESTED refunds can be rejected (current: ${existing.status}).`,
      );
    }
    const updated = await this.repo.reject({
      refundId: input.refundId,
      actorId: actor.id,
      reason: input.reason.trim(),
    });
    return mapRefundToAdmin(updated);
  }

  async markProcessed(
    input: MarkRefundProcessedInput,
    actor: AuthUser,
  ): Promise<AdminRefundRequest> {
    const existing = await this.repo.findById(input.refundId);
    if (!existing) throw new NotFoundException('Refund request not found.');
    if (existing.status !== RefundStatus.APPROVED) {
      throw new BadRequestException(
        `Only APPROVED refunds can be marked processed (current: ${existing.status}).`,
      );
    }
    const updated = await this.repo.markProcessed({
      refundId: input.refundId,
      actorId: actor.id,
      processorReference: input.processorReference?.trim() ?? null,
      adminNotes: input.adminNotes?.trim() ?? null,
    });
    return mapRefundToAdmin(updated);
  }
}
