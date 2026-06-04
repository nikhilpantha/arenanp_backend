import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { VenueOwnerStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';
import { mapPrismaUserToAdmin, AdminUser } from '../users/dto/admin-user.model';

import { VenueOwnerVerificationRepository } from './venue-owner-verification.repository';
import { ListVenueOwnerVerificationRequestsInput } from './dto/list-venue-owner-verification-requests.input';
import { PaginatedVenueOwnerVerificationRequests } from './dto/paginated-venue-owner-verification-requests';
import {
  mapVenueOwnerRequestToGraphql,
  VenueOwnerVerificationRequestModel,
} from './dto/venue-owner-verification-request.model';
import {
  ApproveVenueOwnerVerificationInput,
  RejectVenueOwnerVerificationInput,
} from './dto/venue-owner-verification.inputs';

@Injectable()
export class VenueOwnerVerificationService {
  constructor(private readonly repo: VenueOwnerVerificationRepository) {}

  async list(
    input: ListVenueOwnerVerificationRequestsInput,
  ): Promise<PaginatedVenueOwnerVerificationRequests> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapVenueOwnerRequestToGraphql),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<VenueOwnerVerificationRequestModel> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Venue-owner verification request not found.');
    return mapVenueOwnerRequestToGraphql(row);
  }

  async approve(
    input: ApproveVenueOwnerVerificationInput,
    actor: AuthUser,
  ): Promise<VenueOwnerVerificationRequestModel> {
    const row = await this.repo.findById(input.requestId);
    if (!row) throw new NotFoundException('Venue-owner verification request not found.');
    if (row.status !== VenueOwnerStatus.PENDING_VERIFICATION) {
      throw new BadRequestException(
        `Only PENDING_VERIFICATION requests can be approved (current: ${row.status}).`,
      );
    }
    const updated = await this.repo.transitionRequestAndUser({
      requestId: row.id,
      nextRequestStatus: VenueOwnerStatus.APPROVED,
      nextUserStatus: VenueOwnerStatus.APPROVED,
      reviewedById: actor.id,
      rejectionReason: null,
    });
    return mapVenueOwnerRequestToGraphql(updated);
  }

  async reject(
    input: RejectVenueOwnerVerificationInput,
    actor: AuthUser,
  ): Promise<VenueOwnerVerificationRequestModel> {
    const row = await this.repo.findById(input.requestId);
    if (!row) throw new NotFoundException('Venue-owner verification request not found.');
    if (row.status !== VenueOwnerStatus.PENDING_VERIFICATION) {
      throw new BadRequestException(
        `Only PENDING_VERIFICATION requests can be rejected (current: ${row.status}).`,
      );
    }
    const updated = await this.repo.transitionRequestAndUser({
      requestId: row.id,
      nextRequestStatus: VenueOwnerStatus.REJECTED,
      nextUserStatus: VenueOwnerStatus.REJECTED,
      reviewedById: actor.id,
      rejectionReason: input.reason.trim(),
    });
    return mapVenueOwnerRequestToGraphql(updated);
  }

  async suspendAccess(userId: string, actor: AuthUser): Promise<AdminUser> {
    if (userId === actor.id) {
      throw new BadRequestException('You cannot suspend your own venue-owner access.');
    }
    const updated = await this.repo.setUserVenueOwnerStatus(userId, VenueOwnerStatus.SUSPENDED);
    return mapPrismaUserToAdmin(updated);
  }

  async reinstateAccess(userId: string): Promise<AdminUser> {
    const updated = await this.repo.setUserVenueOwnerStatus(userId, VenueOwnerStatus.APPROVED);
    return mapPrismaUserToAdmin(updated);
  }
}
