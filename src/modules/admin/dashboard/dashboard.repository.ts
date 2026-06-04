import { Injectable } from '@nestjs/common';
import {
  OrganizerStatus,
  PaymentStatus,
  Prisma,
  RefundStatus,
  TournamentStatus,
  VenueOwnerStatus,
  VenueVerificationStatus,
} from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

/**
 * Repository for the super-admin dashboard.
 *
 * Pulls counts and aggregates from every module that has shipped so far
 * (users, venues, organizer / venue-owner verifications, bookings, payments).
 * Sections backed by modules that haven't landed (refunds, tournaments) stay
 * as `0` / `[]` and will be wired up by those modules.
 */
@Injectable()
export class AdminDashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  countUsers(): Promise<number> {
    return this.prisma.user.count();
  }

  countPendingOrganizerVerifications(): Promise<number> {
    return this.prisma.user.count({
      where: { organizerStatus: OrganizerStatus.PENDING_VERIFICATION },
    });
  }

  countPendingVenueOwnerVerifications(): Promise<number> {
    return this.prisma.user.count({
      where: { venueOwnerStatus: VenueOwnerStatus.PENDING_VERIFICATION },
    });
  }

  countApprovedVenues(): Promise<number> {
    return this.prisma.venue.count({
      where: { verificationStatus: VenueVerificationStatus.APPROVED },
    });
  }

  countPendingVenueApprovals(): Promise<number> {
    return this.prisma.venue.count({
      where: { verificationStatus: VenueVerificationStatus.PENDING },
    });
  }

  countPendingRefunds(): Promise<number> {
    return this.prisma.refundRequest.count({ where: { status: RefundStatus.REQUESTED } });
  }

  countActiveTournaments(): Promise<number> {
    return this.prisma.tournament.count({ where: { status: TournamentStatus.ACTIVE } });
  }

  countBookings(): Promise<number> {
    return this.prisma.booking.count();
  }

  countBookingsCreatedToday(): Promise<number> {
    const start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    return this.prisma.booking.count({
      where: { createdAt: { gte: start, lt: end } },
    });
  }

  async sumSuccessfulPaymentAmount(): Promise<number> {
    const agg = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: PaymentStatus.SUCCEEDED },
    });
    return Number(agg._sum.amount?.toString() ?? '0');
  }

  /** Booking count per day for the last N days (UTC). */
  async bookingsByDay(days: number): Promise<{ date: string; count: number }[]> {
    const rows = await this.prisma.$queryRaw<{ date: Date; count: bigint }[]>`
      SELECT date_trunc('day', "createdAt")::date AS date,
             COUNT(*)::bigint                     AS count
      FROM bookings
      WHERE "createdAt" >= NOW() - (${days}::int * INTERVAL '1 day')
      GROUP BY date
      ORDER BY date ASC
    `;
    return rows.map((r) => ({ date: r.date.toISOString().slice(0, 10), count: Number(r.count) }));
  }

  /** Successful-payment revenue per day for the last N days (UTC). */
  async revenueByDay(days: number): Promise<{ date: string; total: number }[]> {
    const rows = await this.prisma.$queryRaw<{ date: Date; total: Prisma.Decimal }[]>`
      SELECT date_trunc('day', "paidAt")::date AS date,
             COALESCE(SUM(amount), 0)          AS total
      FROM payments
      WHERE status = 'SUCCEEDED'
        AND "paidAt" IS NOT NULL
        AND "paidAt" >= NOW() - (${days}::int * INTERVAL '1 day')
      GROUP BY date
      ORDER BY date ASC
    `;
    return rows.map((r) => ({
      date: r.date.toISOString().slice(0, 10),
      total: Number(r.total.toString()),
    }));
  }

  /** Top sports by booking volume — joins booking -> court -> sport for the label. */
  async popularSportsByBooking(limit: number): Promise<{ sport: string; count: number }[]> {
    const rows = await this.prisma.$queryRaw<{ sport: string; count: bigint }[]>`
      SELECT s.name AS sport, COUNT(*)::bigint AS count
      FROM bookings b
      JOIN courts c ON c.id = b."courtId"
      JOIN sports s ON s.id = c."sportId"
      GROUP BY s.name
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    return rows.map((r) => ({ sport: r.sport, count: Number(r.count) }));
  }

  /** Top cities by booking volume — joins booking -> venue for the city. */
  async popularCitiesByBooking(limit: number): Promise<{ city: string; count: number }[]> {
    const rows = await this.prisma.$queryRaw<{ city: string; count: bigint }[]>`
      SELECT v.city AS city, COUNT(*)::bigint AS count
      FROM bookings b
      JOIN venues v ON v.id = b."venueId"
      WHERE v.city IS NOT NULL
      GROUP BY v.city
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    return rows.map((r) => ({ city: r.city, count: Number(r.count) }));
  }

  async recentBookings(limit: number) {
    return this.prisma.booking.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, fullName: true } },
        venue: { select: { id: true, name: true } },
        court: { select: { id: true, sport: { select: { name: true } } } },
      },
    });
  }

  async recentPayments(limit: number) {
    return this.prisma.payment.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, fullName: true } } },
    });
  }
}
