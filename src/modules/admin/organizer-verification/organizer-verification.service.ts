import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CapabilityStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';
import { mapPrismaUserToAdmin, AdminUser } from '../users/dto/admin-user.model';

import { OrganizerVerificationRepository } from './organizer-verification.repository';
import { ListOrganizerVerificationRequestsInput } from './dto/list-organizer-verification-requests.input';
import { PaginatedOrganizerVerificationRequests } from './dto/paginated-organizer-verification-requests';
import {
  mapOrganizerRequestToGraphql,
  OrganizerVerificationRequestModel,
} from './dto/organizer-verification-request.model';
import {
  ApproveOrganizerVerificationInput,
  RejectOrganizerVerificationInput,
} from './dto/reject-organizer-verification.input';

@Injectable()
export class OrganizerVerificationService {
  constructor(private readonly repo: OrganizerVerificationRepository) {}

  async list(
    input: ListOrganizerVerificationRequestsInput,
  ): Promise<PaginatedOrganizerVerificationRequests> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapOrganizerRequestToGraphql),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<OrganizerVerificationRequestModel> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Organizer verification request not found.');
    return mapOrganizerRequestToGraphql(row);
  }

  async approve(
    input: ApproveOrganizerVerificationInput,
    actor: AuthUser,
  ): Promise<OrganizerVerificationRequestModel> {
    const row = await this.repo.findById(input.requestId);
    if (!row) throw new NotFoundException('Organizer verification request not found.');
    if (row.status !== CapabilityStatus.PENDING_VERIFICATION) {
      throw new BadRequestException(
        `Only PENDING_VERIFICATION requests can be approved (current: ${row.status}).`,
      );
    }
    const updated = await this.repo.transitionRequestAndUser({
      requestId: row.id,
      nextRequestStatus: CapabilityStatus.APPROVED,
      nextUserStatus: CapabilityStatus.APPROVED,
      reviewedById: actor.id,
      rejectionReason: null,
    });
    return mapOrganizerRequestToGraphql(updated);
  }

  async reject(
    input: RejectOrganizerVerificationInput,
    actor: AuthUser,
  ): Promise<OrganizerVerificationRequestModel> {
    const row = await this.repo.findById(input.requestId);
    if (!row) throw new NotFoundException('Organizer verification request not found.');
    if (row.status !== CapabilityStatus.PENDING_VERIFICATION) {
      throw new BadRequestException(
        `Only PENDING_VERIFICATION requests can be rejected (current: ${row.status}).`,
      );
    }
    const updated = await this.repo.transitionRequestAndUser({
      requestId: row.id,
      nextRequestStatus: CapabilityStatus.REJECTED,
      nextUserStatus: CapabilityStatus.REJECTED,
      reviewedById: actor.id,
      rejectionReason: input.reason.trim(),
    });
    return mapOrganizerRequestToGraphql(updated);
  }

  /**
   * Suspend an organizer at the user level. Only meaningful for users that
   * are currently APPROVED. The request row is not modified.
   */
  async suspendAccess(userId: string, actor: AuthUser): Promise<AdminUser> {
    if (userId === actor.id) {
      throw new BadRequestException('You cannot suspend your own organizer access.');
    }
    const updated = await this.repo.setUserCapabilityStatus(userId, CapabilityStatus.SUSPENDED);
    return mapPrismaUserToAdmin(updated);
  }

  /** Reinstate a previously suspended organizer back to APPROVED. */
  async reinstateAccess(userId: string): Promise<AdminUser> {
    const updated = await this.repo.setUserCapabilityStatus(userId, CapabilityStatus.APPROVED);
    return mapPrismaUserToAdmin(updated);
  }
}
