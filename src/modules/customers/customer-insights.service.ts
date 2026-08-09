import { Injectable, NotFoundException } from '@nestjs/common';

import { NEPAL_UTC_OFFSET_MINUTES } from '../../common/utils/nepal-time';

import { computeLoyaltyReadiness } from '../offers/loyalty.util';

import {
  CustomerInsightsRepository,
  type CourtPlayRow,
  type CustomerTotalsRow,
  type MonthPlayRow,
  type SlotPlayRow,
} from './customer-insights.repository';
import { CustomersRepository } from './customers.repository';
import {
  CustomerFavouriteModel,
  CustomerLoyaltyModel,
  CustomerMonthModel,
  VenueCustomerInsightsModel,
} from './dto/customer-insights.model';

/** How many "favourites" the profile shows before it stops being a preference. */
const TOP_N = 4;
const MS_PER_DAY = 86_400_000;

@Injectable()
export class CustomerInsightsService {
  constructor(
    private readonly customers: CustomersRepository,
    private readonly insights: CustomerInsightsRepository,
  ) {}

  async getInsights(venueId: string, customerId: string): Promise<VenueCustomerInsightsModel> {
    const customer = await this.customers.findOne(venueId, customerId);
    if (!customer) throw new NotFoundException('Customer not found for this venue.');

    const [totals, courts, slots, months, loyalty] = await Promise.all([
      this.insights.totals(venueId, customerId),
      this.insights.courtPlay(venueId, customerId),
      this.insights.slotPlay(venueId, customerId),
      this.insights.monthlyPlay(venueId, customerId),
      this.loyaltyStanding(venueId, customerId),
    ]);

    return {
      ...countsOf(totals),
      ...moneyOf(totals),
      hoursPlayed: round(totals.playedMinutes / 60, 1),
      avgSessionMinutes: totals.visits > 0 ? Math.round(totals.playedMinutes / totals.visits) : 0,
      visitsPerMonth: visitsPerMonth(totals),
      firstVisitAt: totals.firstVisitAt ?? undefined,
      lastVisitAt: totals.lastVisitAt ?? undefined,
      nextVisitAt: totals.nextVisitAt ?? undefined,
      topCourts: topCourts(courts),
      topSports: topSports(courts),
      weekdayGames: weekdayGames(slots),
      hourGames: hourGames(slots),
      monthlyPlay: lastTwelveMonths(months),
      loyalty,
    };
  }

  /**
   * Where they stand on the venue's every-Nth free game. Folded into insights
   * rather than read from `venueLoyaltyStatus` so the whole profile needs only
   * `customers:read` — front desk staff without `bookings:read` still see it.
   */
  private async loyaltyStanding(
    venueId: string,
    customerId: string,
  ): Promise<CustomerLoyaltyModel> {
    const offer = await this.customers.findLoyaltyOffer(venueId);
    const every = offer?.everyGames ?? null;
    const [completed, redeemedMap] = await Promise.all([
      this.customers.completedByCustomer([customerId]),
      offer
        ? this.customers.redeemedByCustomer([customerId], offer.id)
        : Promise.resolve(new Map()),
    ]);
    const played = completed.get(customerId) ?? 0;
    const redeemed = (redeemedMap.get(customerId) as number | undefined) ?? 0;

    if (!offer || !every) {
      return { configured: false, gamesPlayed: played, toNext: 0, ready: false, redeemed };
    }
    const readiness = computeLoyaltyReadiness(every, played, redeemed);
    return {
      configured: true,
      every,
      gamesPlayed: readiness.gamesPlayed,
      toNext: readiness.toNext,
      ready: readiness.ready,
      redeemed,
      offerId: offer.id,
    };
  }
}

function countsOf(t: CustomerTotalsRow) {
  return {
    totalBookings: t.totalBookings,
    visits: t.visits,
    completed: t.completed,
    cancelled: t.cancelled,
    noShow: t.noShow,
    upcoming: t.upcoming,
    freeGames: t.freeGames,
    walkInBookings: t.walkInBookings,
    onlineBookings: t.onlineBookings,
    membershipBookings: t.membershipBookings,
  };
}

function moneyOf(t: CustomerTotalsRow) {
  return {
    lifetimeBilled: round(t.billed, 2),
    lifetimePaid: round(t.paid, 2),
    // Never negative: an overpayment is a refund question, not a debt.
    outstanding: round(Math.max(0, t.billed - t.paid), 2),
    avgSpendPerVisit: t.visits > 0 ? round(t.paid / t.visits, 2) : 0,
    totalDiscount: round(t.discount, 2),
  };
}

/**
 * Regularity: visits ÷ months they've been a customer here. Anchored on the
 * first visit (not on `createdAt`) so a record backfilled today doesn't read
 * as a two-year relationship, and floored at one month so a first-week regular
 * isn't shown an absurd rate.
 */
function visitsPerMonth(t: CustomerTotalsRow): number {
  if (!t.firstVisitAt || t.visits === 0) return 0;
  const days = (Date.now() - t.firstVisitAt.getTime()) / MS_PER_DAY;
  const months = Math.max(1, days / 30.44);
  return round(t.visits / months, 1);
}

function topCourts(rows: CourtPlayRow[]): CustomerFavouriteModel[] {
  return rows
    .slice(0, TOP_N)
    .map((r) => ({ label: `${r.courtName} · ${r.sportName}`, games: r.games }));
}

/** Courts roll up to sports — a player's real preference is the game, not the pitch. */
function topSports(rows: CourtPlayRow[]): CustomerFavouriteModel[] {
  const bySport = new Map<string, number>();
  for (const r of rows) bySport.set(r.sportName, (bySport.get(r.sportName) ?? 0) + r.games);
  return [...bySport.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, TOP_N)
    .map(([label, games]) => ({ label, games }));
}

/** Seven slots, Sunday-first — the shape the console's weekday strip expects. */
function weekdayGames(rows: SlotPlayRow[]): number[] {
  const week = [0, 0, 0, 0, 0, 0, 0];
  for (const r of rows) week[r.weekday] += r.games;
  return week;
}

/** Only the hours they've actually played, ascending — an empty hour is not a preference. */
function hourGames(rows: SlotPlayRow[]): { hour: number; games: number }[] {
  const byHour = new Map<number, number>();
  for (const r of rows) byHour.set(r.hour, (byHour.get(r.hour) ?? 0) + r.games);
  return [...byHour.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([hour, games]) => ({ hour, games }));
}

/**
 * Exactly twelve months ending this Nepal month, gaps filled with zeroes — a
 * trend strip has to keep its shape when someone stops playing for a while.
 */
function lastTwelveMonths(rows: MonthPlayRow[]): CustomerMonthModel[] {
  const found = new Map(rows.map((r) => [r.month, r]));
  const nepalNow = new Date(Date.now() + NEPAL_UTC_OFFSET_MINUTES * 60_000);
  const out: CustomerMonthModel[] = [];
  for (let back = 11; back >= 0; back--) {
    const d = new Date(Date.UTC(nepalNow.getUTCFullYear(), nepalNow.getUTCMonth() - back, 1));
    const month = d.toISOString().slice(0, 7);
    const hit = found.get(month);
    out.push({ month, games: hit?.games ?? 0, spend: round(hit?.spend ?? 0, 2) });
  }
  return out;
}

function round(value: number, places: number): number {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}
