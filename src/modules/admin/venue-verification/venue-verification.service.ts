import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CapabilityStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';
import { mapPrismaUserToAdmin, AdminUser } from '../users/dto/admin-user.model';

import { VenueVerificationRepository } from './venue-verification.repository';
import { ListVenueVerificationRequestsInput } from './dto/list-venue-verification-requests.input';
import { PaginatedVenueVerificationRequests } from './dto/paginated-venue-verification-requests';
import {
  mapVenueRequestToGraphql,
  VenueVerificationRequestModel,
} from './dto/venue-verification-request.model';
import {
  ApproveVenueVerificationInput,
  RejectVenueVerificationInput,
} from './dto/venue-verification.inputs';

@Injectable()
export class VenueVerificationService {
  constructor(private readonly repo: VenueVerificationRepository) {}

  async list(
    input: ListVenueVerificationRequestsInput,
  ): Promise<PaginatedVenueVerificationRequests> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapVenueRequestToGraphql),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<VenueVerificationRequestModel> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Venue verification request not found.');
    return mapVenueRequestToGraphql(row);
  }

  async approve(
    input: ApproveVenueVerificationInput,
    actor: AuthUser,
  ): Promise<VenueVerificationRequestModel> {
    const row = await this.repo.findById(input.requestId);
    if (!row) throw new NotFoundException('Venue verification request not found.');
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
    return mapVenueRequestToGraphql(updated);
  }

  async reject(
    input: RejectVenueVerificationInput,
    actor: AuthUser,
  ): Promise<VenueVerificationRequestModel> {
    const row = await this.repo.findById(input.requestId);
    if (!row) throw new NotFoundException('Venue verification request not found.');
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
    return mapVenueRequestToGraphql(updated);
  }

  async suspendAccess(userId: string, actor: AuthUser): Promise<AdminUser> {
    if (userId === actor.id) {
      throw new BadRequestException('You cannot suspend your own venue access.');
    }
    const updated = await this.repo.setUserCapabilityStatus(userId, CapabilityStatus.SUSPENDED);
    return mapPrismaUserToAdmin(updated);
  }

  async reinstateAccess(userId: string): Promise<AdminUser> {
    const updated = await this.repo.setUserCapabilityStatus(userId, CapabilityStatus.APPROVED);
    return mapPrismaUserToAdmin(updated);
  }
}
