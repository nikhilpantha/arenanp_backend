import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminBookingsRepository } from './admin-bookings.repository';
import { AdminBooking, mapBookingToAdmin } from './dto/admin-booking.model';
import { ListAdminBookingsInput } from './dto/list-admin-bookings.input';
import { PaginatedAdminBookings } from './dto/paginated-admin-bookings';
import { CancelBookingByAdminInput, MarkBookingCompletedInput } from './dto/booking-action.inputs';

const TERMINAL_STATUSES = new Set<BookingStatus>([
  BookingStatus.COMPLETED,
  BookingStatus.CANCELLED,
  BookingStatus.NO_SHOW,
]);

@Injectable()
export class AdminBookingsService {
  constructor(private readonly repo: AdminBookingsRepository) {}

  async list(input: ListAdminBookingsInput): Promise<PaginatedAdminBookings> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;

    if (input.fromDate && input.toDate && input.fromDate >= input.toDate) {
      throw new BadRequestException('fromDate must be earlier than toDate.');
    }

    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map(mapBookingToAdmin),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<AdminBooking> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Booking not found.');
    return mapBookingToAdmin(row);
  }

  async cancel(input: CancelBookingByAdminInput, actor: AuthUser): Promise<AdminBooking> {
    const existing = await this.repo.findById(input.bookingId);
    if (!existing) throw new NotFoundException('Booking not found.');
    if (TERMINAL_STATUSES.has(existing.status)) {
      throw new BadRequestException(
        `Booking is already ${existing.status}; cannot cancel from a terminal state.`,
      );
    }
    const updated = await this.repo.transitionStatus({
      bookingId: existing.id,
      nextStatus: BookingStatus.CANCELLED,
      actorId: actor.id,
      cancellationReason: input.reason.trim(),
    });
    return mapBookingToAdmin(updated);
  }

  async markCompleted(input: MarkBookingCompletedInput, actor: AuthUser): Promise<AdminBooking> {
    const existing = await this.repo.findById(input.bookingId);
    if (!existing) throw new NotFoundException('Booking not found.');
    if (TERMINAL_STATUSES.has(existing.status)) {
      throw new BadRequestException(
        `Booking is already ${existing.status}; only active bookings can be marked completed.`,
      );
    }
    if (existing.status === BookingStatus.PENDING_PAYMENT) {
      throw new BadRequestException(
        'Booking has not been paid for yet. Confirm payment before completing.',
      );
    }
    const updated = await this.repo.transitionStatus({
      bookingId: existing.id,
      nextStatus: BookingStatus.COMPLETED,
      actorId: actor.id,
      note: input.note?.trim() ?? null,
    });
    return mapBookingToAdmin(updated);
  }
}
