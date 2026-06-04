import { Injectable } from '@nestjs/common';
import { BookingStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { SortOrder } from '../users/dto/admin-user.model';
import { ListAdminBookingsInput } from './dto/list-admin-bookings.input';

const BOOKING_INCLUDES = {
  user: true,
  cancelledBy: true,
  venue: { select: { id: true, name: true, city: true } },
  court: {
    select: {
      id: true,
      name: true,
      pricePerHour: true,
      sport: { select: { id: true, slug: true, name: true, iconUrl: true } },
    },
  },
  payment: true,
  statusEvents: {
    include: { actor: true },
    orderBy: { createdAt: 'asc' },
  },
} satisfies Prisma.BookingInclude;

export type BookingWithRelations = Prisma.BookingGetPayload<{ include: typeof BOOKING_INCLUDES }>;

@Injectable()
export class AdminBookingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<BookingWithRelations | null> {
    return this.prisma.booking.findUnique({ where: { id }, include: BOOKING_INCLUDES });
  }

  async listAndCount(
    input: ListAdminBookingsInput,
  ): Promise<{ items: BookingWithRelations[]; total: number }> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const direction: Prisma.SortOrder = input.sortOrder === SortOrder.ASC ? 'asc' : 'desc';

    const where: Prisma.BookingWhereInput = {};
    if (input.status) where.status = input.status;
    if (input.venueId) where.venueId = input.venueId;
    if (input.sport) where.court = { sportId: input.sport };
    if (input.paymentProvider) where.payment = { provider: input.paymentProvider };

    if (input.fromDate || input.toDate) {
      where.startAt = {};
      if (input.fromDate) where.startAt.gte = input.fromDate;
      if (input.toDate) where.startAt.lt = input.toDate;
    }

    if (input.search?.trim()) {
      const q = input.search.trim();
      where.OR = [
        { id: { contains: q, mode: 'insensitive' } },
        { venue: { name: { contains: q, mode: 'insensitive' } } },
        { user: { fullName: { contains: q, mode: 'insensitive' } } },
        { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
      ];
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        include: BOOKING_INCLUDES,
        orderBy: { startAt: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.booking.count({ where }),
    ]);
    return { items, total };
  }

  /**
   * Transition a booking's status and append an audit row to status_events.
   * Both writes go through `$transaction` so the timeline can never drift.
   */
  async transitionStatus(args: {
    bookingId: string;
    nextStatus: BookingStatus;
    actorId: string;
    note?: string | null;
    cancellationReason?: string | null;
  }): Promise<BookingWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.booking.findUnique({
        where: { id: args.bookingId },
        select: { id: true, status: true },
      });
      if (!existing) throw new Error('Booking not found');

      const data: Prisma.BookingUpdateInput = {
        status: args.nextStatus,
      };
      if (args.nextStatus === BookingStatus.CANCELLED) {
        data.cancellationReason = args.cancellationReason ?? null;
        data.cancelledBy = { connect: { id: args.actorId } };
        data.cancelledAt = new Date();
      }
      if (args.nextStatus === BookingStatus.COMPLETED) {
        data.completedAt = new Date();
      }

      await tx.booking.update({ where: { id: existing.id }, data });

      await tx.bookingStatusEvent.create({
        data: {
          bookingId: existing.id,
          fromStatus: existing.status,
          toStatus: args.nextStatus,
          actorId: args.actorId,
          note: args.note ?? args.cancellationReason ?? null,
        },
      });

      return tx.booking.findUniqueOrThrow({
        where: { id: existing.id },
        include: BOOKING_INCLUDES,
      });
    });
  }
}
