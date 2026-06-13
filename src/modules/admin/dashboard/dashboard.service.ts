import { Injectable } from '@nestjs/common';
import { AdminDashboardRepository } from './dashboard.repository';
import {
  AdminDashboardKpis,
  AdminDashboardOverview,
  BookingTrendPoint,
  RecentBookingItem,
  RecentPaymentItem,
  RevenueTrendPoint,
} from './dto/dashboard.models';

const TREND_DAYS = 14;

/**
 * Builds the super-admin dashboard payload.
 *
 * Counts/aggregates from every shipped module are pulled live. Sections tied
 * to a module that hasn't landed (refunds, tournaments) stay zero / empty and
 * will be wired up when those features arrive.
 */
@Injectable()
export class AdminDashboardService {
  constructor(private readonly repo: AdminDashboardRepository) {}

  async getOverview(): Promise<AdminDashboardOverview> {
    const [
      totalUsers,
      pendingOrganizerVerifications,
      totalVenues,
      pendingVenueApprovals,
      pendingRefunds,
      activeTournaments,
      totalBookings,
      todayBookings,
      totalRevenue,
      bookingsByDay,
      revenueByDay,
      popularSports,
      popularCities,
      recentBookingsRows,
      recentPaymentsRows,
    ] = await Promise.all([
      this.repo.countUsers(),
      this.repo.countPendingOrganizerVerifications(),
      this.repo.countApprovedVenues(),
      this.repo.countPendingVenueApprovals(),
      this.repo.countPendingRefunds(),
      this.repo.countActiveTournaments(),
      this.repo.countBookings(),
      this.repo.countBookingsCreatedToday(),
      this.repo.sumSuccessfulPaymentAmount(),
      this.repo.bookingsByDay(TREND_DAYS),
      this.repo.revenueByDay(TREND_DAYS),
      this.repo.popularSportsByBooking(5),
      this.repo.popularCitiesByBooking(5),
      this.repo.recentBookings(5),
      this.repo.recentPayments(5),
    ]);

    const kpis: AdminDashboardKpis = {
      totalUsers,
      totalVenues,
      totalBookings,
      totalRevenue,
      pendingOrganizerVerifications,
      pendingVenueApprovals,
      pendingRefunds,
      activeTournaments,
      todayBookings,
    };

    const bookingsByDayMap = new Map(bookingsByDay.map((r) => [r.date, r.count]));
    const revenueByDayMap = new Map(revenueByDay.map((r) => [r.date, r.total]));

    const bookingTrend = this.dailySeries<BookingTrendPoint>(TREND_DAYS, (date) => ({
      date,
      bookings: bookingsByDayMap.get(date) ?? 0,
    }));
    const revenueTrend = this.dailySeries<RevenueTrendPoint>(TREND_DAYS, (date) => ({
      date,
      revenue: revenueByDayMap.get(date) ?? 0,
    }));

    const recentBookings: RecentBookingItem[] = recentBookingsRows.map((b) => ({
      id: b.id,
      userFullName: b.user?.fullName ?? b.customerName ?? undefined,
      venueName: b.venue.name,
      sport: b.court.sport.name,
      amount: Number(b.total.toString()),
      status: b.status,
      createdAt: b.createdAt,
    }));

    const recentPayments: RecentPaymentItem[] = recentPaymentsRows.map((p) => ({
      id: p.id,
      userFullName: p.user.fullName ?? undefined,
      provider: p.provider,
      amount: Number(p.amount.toString()),
      status: p.status,
      createdAt: p.createdAt,
    }));

    return {
      kpis,
      recentBookings,
      recentPayments,
      bookingTrend,
      revenueTrend,
      popularSports: popularSports.map((r) => ({ sport: r.sport, bookings: r.count })),
      popularCities: popularCities.map((r) => ({ city: r.city, bookings: r.count })),
    };
  }

  /** Build a continuous N-day series ending today so charts always render even with sparse data. */
  private dailySeries<T>(days: number, build: (isoDate: string) => T): T[] {
    const out: T[] = [];
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setUTCDate(d.getUTCDate() - i);
      out.push(build(d.toISOString().slice(0, 10)));
    }
    return out;
  }
}
