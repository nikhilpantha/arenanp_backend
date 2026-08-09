import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingStatus, Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

import type { VenueStaffActivityInput } from './dto/venue-staff.inputs';
import { StaffActivity } from './dto/staff-activity.model';
import { VenueStaffRepository } from './venue-staff.repository';

const DEFAULT_DAYS = 30;

function num(value: Prisma.Decimal | null | undefined): number {
  return value ? Number(value.toString()) : 0;
}

/**
 * Per-person accountability, read back out of columns that were already being
 * written.
 *
 * Everything is scoped to the venue as well as the person: someone who works
 * at two grounds must not have one owner's numbers leak into the other's
 * screen.
 */
@Injectable()
export class StaffActivityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly staff: VenueStaffRepository,
  ) {}

  async forMember(input: VenueStaffActivityInput): Promise<StaffActivity> {
    const seat = await this.staff.findSeat(input.venueId, input.membershipId);
    if (!seat) throw new NotFoundException('That person is not on this venue’s staff.');

    const to = input.to ?? new Date();
    const from = input.from ?? new Date(to.getTime() - DEFAULT_DAYS * 24 * 60 * 60 * 1000);
    const window = { gte: from, lt: to };
    const { userId } = seat;
    const venueId = input.venueId;

    const [created, cancelled, events, payments, cashDays, lastBooking] = await Promise.all([
      this.prisma.booking.aggregate({
        where: { venueId, createdById: userId, createdAt: window },
        _count: { _all: true },
        _sum: { discountAmount: true },
      }),
      this.prisma.booking.count({
        where: { venueId, cancelledById: userId, cancelledAt: window },
      }),
      this.prisma.bookingStatusEvent.groupBy({
        by: ['toStatus'],
        where: { actorId: userId, createdAt: window, booking: { venueId } },
        _count: { _all: true },
      }),
      this.prisma.bookingPayment.aggregate({
        where: { venueId, takenById: userId, takenAt: window },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prisma.cashReconciliation.count({
        where: { venueId, closedById: userId, closedAt: window },
      }),
      this.prisma.booking.findFirst({
        where: { venueId, createdById: userId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      }),
    ]);

    const byStatus = new Map(events.map((e) => [e.toStatus, e._count._all]));

    return {
      membershipId: seat.id,
      fullName: seat.user.fullName ?? undefined,
      from: from.toISOString().slice(0, 10),
      to: to.toISOString().slice(0, 10),
      bookingsCreated: created._count._all,
      bookingsCancelled: cancelled,
      noShowsMarked: byStatus.get(BookingStatus.NO_SHOW) ?? 0,
      bookingsSettled:
        (byStatus.get(BookingStatus.CHECKED_IN) ?? 0) +
        (byStatus.get(BookingStatus.COMPLETED) ?? 0),
      paymentsTaken: num(payments._sum.amount),
      paymentCount: payments._count._all,
      discountsGiven: num(created._sum.discountAmount),
      cashDaysClosed: cashDays,
      lastActionAt: lastBooking?.createdAt ?? undefined,
    };
  }
}
