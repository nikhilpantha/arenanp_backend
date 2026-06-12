import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingPaymentStatus, BookingSource, BookingStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import { ACTION_TO_STATUS, BookingScope } from './dto/booking.inputs';
import type {
  CreateVenueBookingInput,
  ListVenueBookingsInput,
  RecordBookingPaymentInput,
  SetBookingStatusInput,
} from './dto/booking.inputs';
import type { BookingWithRelations } from './dto/booking.model';

const BOOKING_INCLUDES = {
  court: { include: { sport: true } },
} satisfies Prisma.BookingInclude;

/** UTC day window [start, nextDay) for a `Date`. */
function dayBounds(d: Date): { gte: Date; lt: Date } {
  const gte = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const lt = new Date(gte);
  lt.setUTCDate(lt.getUTCDate() + 1);
  return { gte, lt };
}

@Injectable()
export class BookingRepository {
  constructor(private readonly prisma: PrismaService) {}

  list(input: ListVenueBookingsInput): Promise<BookingWithRelations[]> {
    const where: Prisma.BookingWhereInput = { venueId: input.venueId };
    if (input.sportSlug) where.court = { sport: { slug: input.sportSlug } };

    if (input.date) {
      const { gte, lt } = dayBounds(new Date(`${input.date}T00:00:00.000Z`));
      where.startAt = { gte, lt };
    } else if (input.scope === BookingScope.TODAY) {
      const { gte, lt } = dayBounds(new Date());
      where.startAt = { gte, lt };
    } else if (input.scope === BookingScope.UPCOMING) {
      const { lt } = dayBounds(new Date());
      where.startAt = { gte: lt }; // from start of tomorrow onward
    }

    return this.prisma.booking.findMany({
      where,
      include: BOOKING_INCLUDES,
      orderBy: { startAt: 'asc' },
    });
  }

  async summary(venueId: string) {
    const { gte, lt } = dayBounds(new Date());
    const todayWhere: Prisma.BookingWhereInput = {
      venueId,
      startAt: { gte, lt },
      status: { not: BookingStatus.CANCELLED },
    };
    const [bookingsToday, paidAgg, pendingPayments] = await this.prisma.$transaction([
      this.prisma.booking.count({ where: todayWhere }),
      this.prisma.booking.aggregate({ _sum: { amountPaid: true }, where: todayWhere }),
      this.prisma.booking.count({
        where: { ...todayWhere, paymentStatus: { not: BookingPaymentStatus.PAID } },
      }),
    ]);
    return {
      bookingsToday,
      revenueToday: Number(paidAgg._sum.amountPaid?.toString() ?? '0'),
      pendingPayments,
    };
  }

  findOne(venueId: string, bookingId: string): Promise<BookingWithRelations | null> {
    return this.prisma.booking.findFirst({
      where: { id: bookingId, venueId },
      include: BOOKING_INCLUDES,
    });
  }

  async create(input: CreateVenueBookingInput, createdById: string): Promise<BookingWithRelations> {
    const court = await this.prisma.court.findFirst({
      where: { id: input.courtId, venueId: input.venueId },
      select: { pricePerHour: true },
    });
    if (!court) throw new NotFoundException('Court not found for this venue.');

    const pricePerHour = Number(court.pricePerHour.toString());
    const startAt = new Date(input.startAt);
    const endAt = new Date(startAt.getTime() + input.durationMinutes * 60_000);
    const subtotal = Math.round((pricePerHour * input.durationMinutes) / 60);
    const discountAmount = input.discountAmount ?? 0;
    const total = input.freeGame ? 0 : Math.max(0, subtotal - discountAmount);
    const amountPaid =
      input.amountPaid ?? (input.paymentStatus === BookingPaymentStatus.PAID ? total : 0);

    return this.prisma.booking.create({
      data: {
        venueId: input.venueId,
        courtId: input.courtId,
        createdById,
        customerName: input.customerName,
        customerPhone: input.customerPhone ?? null,
        customerType: input.customerType,
        source: BookingSource.WALK_IN,
        startAt,
        endAt,
        durationMinutes: input.durationMinutes,
        pricePerHour,
        subtotal,
        discountAmount,
        total,
        freeGame: input.freeGame,
        paymentStatus: input.paymentStatus,
        amountPaid,
        paymentMethod: input.paymentMethod ?? null,
        status: BookingStatus.CONFIRMED,
        adminNotes: input.notes ?? null,
      },
      include: BOOKING_INCLUDES,
    });
  }

  async setStatus(input: SetBookingStatusInput, actorId: string): Promise<BookingWithRelations> {
    const existing = await this.prisma.booking.findFirst({
      where: { id: input.bookingId, venueId: input.venueId },
      select: { id: true, status: true },
    });
    if (!existing) throw new NotFoundException('Booking not found for this venue.');

    const toStatus = ACTION_TO_STATUS[input.status];
    return this.prisma.$transaction(async (tx) => {
      await tx.bookingStatusEvent.create({
        data: {
          bookingId: existing.id,
          fromStatus: existing.status,
          toStatus,
          actorId,
          note: input.note ?? null,
        },
      });
      return tx.booking.update({
        where: { id: existing.id },
        data: {
          status: toStatus,
          completedAt: toStatus === BookingStatus.COMPLETED ? new Date() : undefined,
          cancelledAt: toStatus === BookingStatus.CANCELLED ? new Date() : undefined,
          cancelledById: toStatus === BookingStatus.CANCELLED ? actorId : undefined,
          cancellationReason:
            toStatus === BookingStatus.CANCELLED ? (input.note ?? null) : undefined,
        },
        include: BOOKING_INCLUDES,
      });
    });
  }

  async recordPayment(input: RecordBookingPaymentInput): Promise<BookingWithRelations> {
    const existing = await this.prisma.booking.findFirst({
      where: { id: input.bookingId, venueId: input.venueId },
      select: { id: true },
    });
    if (!existing) throw new NotFoundException('Booking not found for this venue.');
    return this.prisma.booking.update({
      where: { id: existing.id },
      data: {
        paymentStatus: input.paymentStatus,
        amountPaid: input.amountPaid,
        paymentMethod: input.paymentMethod ?? undefined,
      },
      include: BOOKING_INCLUDES,
    });
  }
}
