import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  BookingPaymentStatus,
  BookingSource,
  BookingStatus,
  CustomerType,
  Prisma,
  SubscriptionStatus,
  VenueVerificationStatus,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { parseHHmmToMinutes, utcToNepalMinutesOfDay } from '../../common/utils/nepal-time';
import { phoneKey } from '../../common/utils/phone.util';

import { closureConflictMessage, findOverlappingClosure } from '../closures/closures.util';

import { dayLabel, nepalClockRange, nepalWeekday } from './availability.util';

import { ACTION_TO_STATUS, BookingScope } from './dto/booking.inputs';
import type {
  CompleteVenueBookingInput,
  CreateVenueBookingInput,
  ListVenueBookingsInput,
  RecordBookingPaymentInput,
  SetBookingStatusInput,
  UpdateVenueBookingInput,
} from './dto/booking.inputs';
import type { BookingWithRelations } from './dto/booking.model';
import type { PlayerBookingWithRelations } from './dto/player-booking.model';

const BOOKING_INCLUDES = {
  court: { include: { sport: true } },
  extras: true,
} satisfies Prisma.BookingInclude;

const PLAYER_BOOKING_INCLUDES = {
  court: { include: { sport: true } },
  venue: true,
} satisfies Prisma.BookingInclude;

const TERMINAL_STATUSES = new Set<BookingStatus>([
  BookingStatus.COMPLETED,
  BookingStatus.CANCELLED,
  BookingStatus.NO_SHOW,
]);

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
    } else if (input.dateFrom && input.dateTo) {
      const { gte } = dayBounds(new Date(`${input.dateFrom}T00:00:00.000Z`));
      const { lt } = dayBounds(new Date(`${input.dateTo}T00:00:00.000Z`));
      where.startAt = { gte, lt }; // [dateFrom 00:00, dateTo+1 00:00) — inclusive range
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

  /**
   * Reject a court/time that clashes with another booking or a member's recurring
   * subscription slot. Runs inside the booking transaction so two requests can't both
   * pass. Messages are written for the venue owner, not developers.
   */
  private async assertCourtAvailable(
    tx: Prisma.TransactionClient,
    opts: {
      venueId: string;
      courtId: string;
      startAt: Date;
      endAt: Date;
      excludeBookingId?: string;
    },
  ): Promise<void> {
    // 1) Overlapping booking on the same court (ignoring cancelled ones).
    const booking = await tx.booking.findFirst({
      where: {
        courtId: opts.courtId,
        status: { not: BookingStatus.CANCELLED },
        startAt: { lt: opts.endAt },
        endAt: { gt: opts.startAt },
        ...(opts.excludeBookingId ? { id: { not: opts.excludeBookingId } } : {}),
      },
      select: { startAt: true, endAt: true, customerName: true },
    });
    if (booking) {
      const who = booking.customerName ? ` (${booking.customerName})` : '';
      throw new ConflictException(
        `This court is already booked ${nepalClockRange(booking.startAt, booking.endAt)}${who}. Please pick a different time or court.`,
      );
    }

    // 2) A member's subscription that reserves this court at this time on this weekday.
    const startMin = utcToNepalMinutesOfDay(opts.startAt);
    const durationMin = Math.round((opts.endAt.getTime() - opts.startAt.getTime()) / 60_000);
    const endMin = startMin + durationMin;
    const weekday = nepalWeekday(opts.startAt);

    const subs = await tx.subscription.findMany({
      where: {
        courtId: opts.courtId,
        status: {
          in: [SubscriptionStatus.SCHEDULED, SubscriptionStatus.ACTIVE, SubscriptionStatus.PAUSED],
        },
        startedAt: { lte: opts.startAt },
        expiresAt: { gte: opts.startAt },
      },
      select: {
        slotStart: true,
        customer: { select: { name: true } },
        plan: { select: { sessionMinutes: true, daysOfWeek: true } },
      },
    });
    for (const s of subs) {
      if (!s.plan.daysOfWeek.includes(weekday)) continue;
      const subStart = parseHHmmToMinutes(s.slotStart);
      const subEnd = subStart + s.plan.sessionMinutes;
      if (startMin < subEnd && endMin > subStart) {
        throw new ConflictException(
          `${s.customer.name}'s membership reserves this court on ${dayLabel(weekday)} at this time. Please pick a different time or court.`,
        );
      }
    }

    // 3) An owner-set closure blocking this court (or the whole venue) at this time.
    const closure = await findOverlappingClosure(tx, {
      venueId: opts.venueId,
      courtId: opts.courtId,
      startAt: opts.startAt,
      endAt: opts.endAt,
    });
    if (closure) throw new ConflictException(closureConflictMessage(closure));
  }

  async create(
    input: CreateVenueBookingInput,
    createdById: string,
    loyaltyOfferId?: string,
  ): Promise<BookingWithRelations> {
    const court = await this.prisma.court.findFirst({
      where: { id: input.courtId, venueId: input.venueId },
      select: { pricePerHour: true },
    });
    if (!court) throw new NotFoundException('Court not found for this venue.');

    // A customer booking must reference a customer owned by this venue.
    if (input.customerId) {
      const found = await this.prisma.customer.findFirst({
        where: { id: input.customerId, venueId: input.venueId },
        select: { id: true },
      });
      if (!found) throw new NotFoundException('Customer not found for this venue.');
    }

    // A redeemed loyalty game (loyaltyOfferId set) or a manual comp both zero the total.
    const isFree = input.freeGame || loyaltyOfferId != null;

    const pricePerHour = Number(court.pricePerHour.toString());
    const startAt = new Date(input.startAt);
    const endAt = new Date(startAt.getTime() + input.durationMinutes * 60_000);
    const subtotal = Math.round((pricePerHour * input.durationMinutes) / 60);
    const discountAmount = isFree ? subtotal : (input.discountAmount ?? 0);
    const total = isFree ? 0 : Math.max(0, subtotal - discountAmount);
    const amountPaid =
      input.amountPaid ?? (input.paymentStatus === BookingPaymentStatus.PAID ? total : 0);

    return this.prisma.$transaction(async (tx) => {
      await this.assertCourtAvailable(tx, {
        venueId: input.venueId,
        courtId: input.courtId,
        startAt,
        endAt,
      });
      return tx.booking.create({
        data: {
          venueId: input.venueId,
          courtId: input.courtId,
          createdById,
          customerName: input.customerName,
          // Store the canonical phone key so loyalty counts match across bookings.
          customerPhone: input.customerPhone ? phoneKey(input.customerPhone) : null,
          customerType: input.customerType,
          customerId: input.customerId ?? null,
          source: BookingSource.WALK_IN,
          startAt,
          endAt,
          durationMinutes: input.durationMinutes,
          pricePerHour,
          subtotal,
          discountAmount,
          total,
          freeGame: isFree,
          offerId: loyaltyOfferId ?? null,
          paymentStatus: input.paymentStatus,
          amountPaid,
          paymentMethod: input.paymentMethod ?? null,
          status: BookingStatus.CONFIRMED,
          adminNotes: input.notes ?? null,
        },
        include: BOOKING_INCLUDES,
      });
    });
  }

  /** Edit a still-pending booking: reschedule (court/time/duration) and/or customer. */
  async update(input: UpdateVenueBookingInput): Promise<BookingWithRelations> {
    const existing = await this.prisma.booking.findFirst({
      where: { id: input.bookingId, venueId: input.venueId },
      select: {
        id: true,
        status: true,
        courtId: true,
        startAt: true,
        durationMinutes: true,
        pricePerHour: true,
        discountAmount: true,
        freeGame: true,
      },
    });
    if (!existing) throw new NotFoundException('Booking not found for this venue.');
    if (
      existing.status !== BookingStatus.PENDING_PAYMENT &&
      existing.status !== BookingStatus.CONFIRMED
    ) {
      throw new BadRequestException('Only a pending booking can be edited.');
    }

    // Resolve the (possibly new) court for its price snapshot.
    let pricePerHour = Number(existing.pricePerHour.toString());
    let courtId = existing.courtId;
    if (input.courtId && input.courtId !== existing.courtId) {
      const court = await this.prisma.court.findFirst({
        where: { id: input.courtId, venueId: input.venueId },
        select: { pricePerHour: true },
      });
      if (!court) throw new NotFoundException('Court not found for this venue.');
      pricePerHour = Number(court.pricePerHour.toString());
      courtId = input.courtId;
    }
    if (input.customerId) {
      const found = await this.prisma.customer.findFirst({
        where: { id: input.customerId, venueId: input.venueId },
        select: { id: true },
      });
      if (!found) throw new NotFoundException('Customer not found for this venue.');
    }

    const durationMinutes = input.durationMinutes ?? existing.durationMinutes;
    const startAt = input.startAt ? new Date(input.startAt) : existing.startAt;
    const endAt = new Date(startAt.getTime() + durationMinutes * 60_000);
    const subtotal = Math.round((pricePerHour * durationMinutes) / 60);
    const discountAmount = Number(existing.discountAmount.toString());
    const total = existing.freeGame ? 0 : Math.max(0, subtotal - discountAmount);

    return this.prisma.$transaction(async (tx) => {
      // Re-check availability for the new court/time, ignoring this booking itself.
      await this.assertCourtAvailable(tx, {
        venueId: input.venueId,
        courtId,
        startAt,
        endAt,
        excludeBookingId: existing.id,
      });
      return tx.booking.update({
        where: { id: existing.id },
        data: {
          courtId,
          startAt,
          endAt,
          durationMinutes,
          pricePerHour,
          subtotal,
          total,
          ...(input.customerId !== undefined ? { customerId: input.customerId } : {}),
          ...(input.customerName !== undefined ? { customerName: input.customerName } : {}),
          ...(input.customerPhone !== undefined
            ? { customerPhone: phoneKey(input.customerPhone) }
            : {}),
        },
        include: BOOKING_INCLUDES,
      });
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

  /** Complete a booking: attach add-on extras, recompute the total, settle payment. */
  async complete(input: CompleteVenueBookingInput, actorId: string): Promise<BookingWithRelations> {
    const existing = await this.prisma.booking.findFirst({
      where: { id: input.bookingId, venueId: input.venueId },
      select: { id: true, status: true, subtotal: true, discountAmount: true, freeGame: true },
    });
    if (!existing) throw new NotFoundException('Booking not found for this venue.');

    const base = existing.freeGame
      ? 0
      : Math.max(
          0,
          Number(existing.subtotal.toString()) - Number(existing.discountAmount.toString()),
        );
    const extrasTotal = input.extras.reduce((sum, e) => sum + e.price, 0);
    const total = base + extrasTotal;
    const amountPaid = Math.min(
      total,
      input.amountPaid ?? (input.paymentStatus === BookingPaymentStatus.PAID ? total : 0),
    );

    return this.prisma.$transaction(async (tx) => {
      // Re-completing replaces any previously captured extras.
      await tx.bookingExtra.deleteMany({ where: { bookingId: existing.id } });
      await tx.bookingStatusEvent.create({
        data: {
          bookingId: existing.id,
          fromStatus: existing.status,
          toStatus: BookingStatus.COMPLETED,
          actorId,
          note: input.note ?? null,
        },
      });
      return tx.booking.update({
        where: { id: existing.id },
        data: {
          status: BookingStatus.COMPLETED,
          completedAt: new Date(),
          total,
          paymentStatus: input.paymentStatus,
          amountPaid,
          paymentMethod: input.paymentMethod ?? undefined,
          extras: {
            create: input.extras.map((e) => ({ name: e.name, price: e.price })),
          },
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

  // ─── Player-facing ──────────────────────────────────────────────────────────

  /** Active court on an approved venue, with the data needed to price a booking. */
  courtForBooking(courtId: string) {
    return this.prisma.court.findFirst({
      where: {
        id: courtId,
        isActive: true,
        venue: { verificationStatus: VenueVerificationStatus.APPROVED },
      },
      select: {
        id: true,
        venueId: true,
        slotMinutes: true,
        pricePerHour: true,
        venue: { select: { openTime: true, closeTime: true } },
      },
    });
  }

  /** Create an online player booking, rejecting overlaps inside the transaction. */
  async createPlayerBooking(params: {
    userId: string;
    courtId: string;
    venueId: string;
    startAt: Date;
    endAt: Date;
    durationMinutes: number;
    pricePerHour: number;
    subtotal: number;
    discountAmount: number;
    total: number;
    offerId?: string | null;
    notes?: string | null;
  }): Promise<PlayerBookingWithRelations> {
    return this.prisma.$transaction(async (tx) => {
      const clash = await tx.booking.findFirst({
        where: {
          courtId: params.courtId,
          status: { not: BookingStatus.CANCELLED },
          startAt: { lt: params.endAt },
          endAt: { gt: params.startAt },
        },
        select: { id: true },
      });
      if (clash) throw new ConflictException('That slot is no longer available.');

      // Owner-set closure blocking this court / the whole venue (generic message: don't
      // leak the closure reason to players).
      const closure = await findOverlappingClosure(tx, {
        venueId: params.venueId,
        courtId: params.courtId,
        startAt: params.startAt,
        endAt: params.endAt,
      });
      if (closure) throw new ConflictException('That slot is no longer available.');

      // Atomically claim one offer redemption, re-checking the limit inside the tx.
      if (params.offerId) {
        const offer = await tx.offer.findUnique({
          where: { id: params.offerId },
          select: { usageLimit: true, usageCount: true },
        });
        if (!offer) throw new BadRequestException('Offer no longer available.');
        if (offer.usageLimit != null && offer.usageCount >= offer.usageLimit) {
          throw new ConflictException('This offer has reached its usage limit.');
        }
        await tx.offer.update({
          where: { id: params.offerId },
          data: { usageCount: { increment: 1 } },
        });
      }

      return tx.booking.create({
        data: {
          userId: params.userId,
          venueId: params.venueId,
          courtId: params.courtId,
          customerType: CustomerType.INDIVIDUAL,
          source: BookingSource.ONLINE,
          startAt: params.startAt,
          endAt: params.endAt,
          durationMinutes: params.durationMinutes,
          pricePerHour: params.pricePerHour,
          subtotal: params.subtotal,
          discountAmount: params.discountAmount,
          total: params.total,
          offerId: params.offerId ?? null,
          paymentStatus: BookingPaymentStatus.PENDING,
          status: BookingStatus.PENDING_PAYMENT,
          adminNotes: params.notes ?? null,
          statusEvents: {
            create: { toStatus: BookingStatus.PENDING_PAYMENT, actorId: params.userId },
          },
        },
        include: PLAYER_BOOKING_INCLUDES,
      });
    });
  }

  async listMyBookings(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<{ items: PlayerBookingWithRelations[]; total: number }> {
    const where: Prisma.BookingWhereInput = { userId };
    const [items, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        include: PLAYER_BOOKING_INCLUDES,
        orderBy: { startAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.booking.count({ where }),
    ]);
    return { items, total };
  }

  async cancelMyBooking(
    userId: string,
    bookingId: string,
    reason?: string | null,
  ): Promise<PlayerBookingWithRelations> {
    const existing = await this.prisma.booking.findFirst({
      where: { id: bookingId, userId },
      select: { id: true, status: true },
    });
    if (!existing) throw new NotFoundException('Booking not found.');
    if (TERMINAL_STATUSES.has(existing.status)) {
      throw new BadRequestException(`Booking is already ${existing.status}.`);
    }
    return this.prisma.$transaction(async (tx) => {
      await tx.bookingStatusEvent.create({
        data: {
          bookingId,
          fromStatus: existing.status,
          toStatus: BookingStatus.CANCELLED,
          actorId: userId,
          note: reason ?? null,
        },
      });
      return tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
          cancelledById: userId,
          cancellationReason: reason ?? null,
        },
        include: PLAYER_BOOKING_INCLUDES,
      });
    });
  }

  // ─── Venue accept / decline of pending online bookings ──────────────────────

  async acceptBooking(
    venueId: string,
    bookingId: string,
    actorId: string,
  ): Promise<BookingWithRelations> {
    const existing = await this.requirePending(venueId, bookingId, 'accepted');
    return this.prisma.$transaction(async (tx) => {
      await tx.bookingStatusEvent.create({
        data: {
          bookingId,
          fromStatus: existing.status,
          toStatus: BookingStatus.CONFIRMED,
          actorId,
        },
      });
      return tx.booking.update({
        where: { id: bookingId },
        data: { status: BookingStatus.CONFIRMED },
        include: BOOKING_INCLUDES,
      });
    });
  }

  async declineBooking(
    venueId: string,
    bookingId: string,
    actorId: string,
    reason?: string | null,
  ): Promise<BookingWithRelations> {
    const existing = await this.requirePending(venueId, bookingId, 'declined');
    return this.prisma.$transaction(async (tx) => {
      await tx.bookingStatusEvent.create({
        data: {
          bookingId,
          fromStatus: existing.status,
          toStatus: BookingStatus.CANCELLED,
          actorId,
          note: reason ?? null,
        },
      });
      return tx.booking.update({
        where: { id: bookingId },
        data: {
          status: BookingStatus.CANCELLED,
          cancelledAt: new Date(),
          cancelledById: actorId,
          cancellationReason: reason ?? null,
        },
        include: BOOKING_INCLUDES,
      });
    });
  }

  /** Fetch a venue booking and assert it is still awaiting acceptance. */
  private async requirePending(venueId: string, bookingId: string, action: string) {
    const existing = await this.prisma.booking.findFirst({
      where: { id: bookingId, venueId },
      select: { id: true, status: true },
    });
    if (!existing) throw new NotFoundException('Booking not found for this venue.');
    if (existing.status !== BookingStatus.PENDING_PAYMENT) {
      throw new BadRequestException(
        `Only pending bookings can be ${action} (current: ${existing.status}).`,
      );
    }
    return existing;
  }
}
