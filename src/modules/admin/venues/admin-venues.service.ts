import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { VenueVerificationStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminVenuesRepository } from './admin-venues.repository';
import { AdminVenue, mapPrismaVenueToAdmin } from './dto/admin-venue.model';
import { ListAdminVenuesInput } from './dto/list-admin-venues.input';
import { PaginatedAdminVenues } from './dto/paginated-admin-venues';
import {
  RejectVenueInput,
  SuspendVenueInput,
  UpdateVenueVerificationStatusInput,
} from './dto/venue-action.inputs';

@Injectable()
export class AdminVenuesService {
  constructor(private readonly repo: AdminVenuesRepository) {}

  async list(input: ListAdminVenuesInput): Promise<PaginatedAdminVenues> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapPrismaVenueToAdmin),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<AdminVenue> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Venue not found.');
    return mapPrismaVenueToAdmin(row);
  }

  async approve(venueId: string, actor: AuthUser): Promise<AdminVenue> {
    const existing = await this.repo.findById(venueId);
    if (!existing) throw new NotFoundException('Venue not found.');
    if (existing.verificationStatus === VenueVerificationStatus.APPROVED) {
      return mapPrismaVenueToAdmin(existing);
    }
    const updated = await this.repo.updateVerification({
      venueId,
      nextStatus: VenueVerificationStatus.APPROVED,
      reviewedById: actor.id,
      rejectionReason: null,
    });
    return mapPrismaVenueToAdmin(updated);
  }

  async reject(input: RejectVenueInput, actor: AuthUser): Promise<AdminVenue> {
    const existing = await this.repo.findById(input.venueId);
    if (!existing) throw new NotFoundException('Venue not found.');
    const updated = await this.repo.updateVerification({
      venueId: input.venueId,
      nextStatus: VenueVerificationStatus.REJECTED,
      reviewedById: actor.id,
      rejectionReason: input.reason.trim(),
    });
    return mapPrismaVenueToAdmin(updated);
  }

  async suspend(input: SuspendVenueInput, actor: AuthUser): Promise<AdminVenue> {
    const existing = await this.repo.findById(input.venueId);
    if (!existing) throw new NotFoundException('Venue not found.');
    const updated = await this.repo.updateVerification({
      venueId: input.venueId,
      nextStatus: VenueVerificationStatus.SUSPENDED,
      reviewedById: actor.id,
      rejectionReason: input.reason?.trim() ?? null,
    });
    return mapPrismaVenueToAdmin(updated);
  }

  async setFeatured(venueId: string, isFeatured: boolean): Promise<AdminVenue> {
    const existing = await this.repo.findById(venueId);
    if (!existing) throw new NotFoundException('Venue not found.');
    if (isFeatured && existing.verificationStatus !== VenueVerificationStatus.APPROVED) {
      throw new BadRequestException('Only APPROVED venues can be featured.');
    }
    const updated = await this.repo.setFeatured(venueId, isFeatured);
    return mapPrismaVenueToAdmin(updated);
  }

  async updateVerificationStatus(
    input: UpdateVenueVerificationStatusInput,
    actor: AuthUser,
  ): Promise<AdminVenue> {
    if (input.status === VenueVerificationStatus.REJECTED && !input.reason?.trim()) {
      throw new BadRequestException('A reason is required when rejecting a venue.');
    }
    const existing = await this.repo.findById(input.venueId);
    if (!existing) throw new NotFoundException('Venue not found.');
    const updated = await this.repo.updateVerification({
      venueId: input.venueId,
      nextStatus: input.status,
      reviewedById: actor.id,
      rejectionReason: input.reason?.trim() ?? null,
    });
    return mapPrismaVenueToAdmin(updated);
  }
}
