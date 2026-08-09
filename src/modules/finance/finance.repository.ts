import { Injectable } from '@nestjs/common';
import {
  BookingStatus,
  ExpenseCategory,
  PaymentProvider,
  Prisma,
  SettlementStatus,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import { parseHHmmToMinutes, type ResolvedRange } from '../../common/utils/nepal-time';

/** Decimal | number | null → number. */
function num(v: Prisma.Decimal | number | bigint | null | undefined): number {
  if (v === null || v === undefined) return 0;
  return typeof v === 'number' ? v : Number(v.toString());
}

/** A method counts as "cash" when explicitly CASH or unset (the desk default for walk-ins). */
function isCash(method: PaymentProvider | null): boolean {
  return method === null || method === PaymentProvider.CASH;
}

const NOT_CANCELLED = { not: BookingStatus.CANCELLED } as const;
/** Nepal offset for hour-of-day bucketing in raw SQL (UTC + 5h45m). */
const NEPAL_INTERVAL = Prisma.sql`interval '345 minutes'`;

/** Postgres date_trunc units the trend supports. Interpolated raw — never user input. */
export type TrendBucket = 'day' | 'week' | 'month';

/**
 * A Date as the UTC wall-clock string its `timestamp without time zone` column
 * stores. Handing the driver a JS Date lets it localise the value — on a
 * UTC+05:45 machine that moves a midnight bound and silently drops the rows
 * sitting on it. Bound as a plain string and cast in the SQL text, it compares
 * exactly. (Bound as a nested `Prisma.sql` fragment it does NOT — hence the
 * `::timestamp` living in the query rather than in here.)
 */
function ts(d: Date): string {
  return d.toISOString().replace('Z', '');
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Every bucket start in [gte, lt), aligned the way Postgres `date_trunc` aligns:
 * weeks to Monday, months to the 1st. Walking the same alignment as the SQL is
 * what keeps the gap-fill lined up with the rows it is filling around.
 */
function bucketStarts(gte: Date, lt: Date, bucket: TrendBucket): Date[] {
  const out: Date[] = [];
  const cursor = new Date(gte);
  if (bucket === 'month') {
    cursor.setUTCDate(1);
  } else if (bucket === 'week') {
    // date_trunc('week') is ISO: Monday-based.
    const dow = (cursor.getUTCDay() + 6) % 7;
    cursor.setUTCDate(cursor.getUTCDate() - dow);
  }
  cursor.setUTCHours(0, 0, 0, 0);

  while (cursor < lt) {
    out.push(new Date(cursor));
    if (bucket === 'day') cursor.setUTCDate(cursor.getUTCDate() + 1);
    else if (bucket === 'week') cursor.setUTCDate(cursor.getUTCDate() + 7);
    else cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return out;
}

function bucketLabel(d: Date, bucket: TrendBucket): string {
  const day = d.getUTCDate();
  const mon = MONTHS[d.getUTCMonth()];
  if (bucket === 'month') return `${mon} ${d.getUTCFullYear()}`;
  if (bucket === 'week') return `w/c ${day} ${mon}`;
  return `${day} ${mon}`;
}

/**
 * Read-only finance aggregations for a single venue, plus expense / cash-close writes.
 *
 * Income is derived live from the existing money rails (no income table):
 *  - bookings   → `amountPaid` bucketed by `startAt` (the play date), matching the
 *                 booking summary's "revenueToday".
 *  - memberships → `subscription_payments.amount` bucketed by `createdAt` (paid date).
 * `total` is billed, not collected, so it only feeds receivables/AOV — never income.
 */
@Injectable()
export class FinanceRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Summary ────────────────────────────────────────────────────────────────

  async summary(venueId: string, range: ResolvedRange) {
    const { gte, lt } = range;
    const bookingWhere: Prisma.BookingWhereInput = {
      venueId,
      startAt: { gte, lt },
      status: NOT_CANCELLED,
    };

    const [
      bookingAgg,
      byMethod,
      freeAgg,
      addOnAgg,
      subPayments,
      expenseAgg,
      outstandingAgg,
      expenseByCat,
      noShowAgg,
    ] = await Promise.all([
      this.prisma.booking.aggregate({
        where: bookingWhere,
        // `total` is billed (already net of discount), `subtotal` is list price.
        // Both are needed so the summary can show gross − discounts = revenue
        // as a visible subtraction rather than an implicit one.
        _sum: { amountPaid: true, discountAmount: true, total: true, subtotal: true },
        _count: true,
      }),
      this.prisma.booking.groupBy({
        by: ['paymentMethod'],
        where: bookingWhere,
        _sum: { amountPaid: true },
      }),
      this.prisma.booking.aggregate({
        where: { ...bookingWhere, freeGame: true },
        _sum: { subtotal: true },
        _count: true,
      }),
      this.prisma.bookingExtra.aggregate({
        where: { booking: bookingWhere },
        _sum: { price: true },
      }),
      this.prisma.subscriptionPayment.groupBy({
        by: ['method'],
        where: { subscription: { venueId }, status: 'PAID', createdAt: { gte, lt } },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: { venueId, incurredAt: { gte, lt } },
        _sum: { amount: true },
      }),
      this.prisma.booking.aggregate({
        where: {
          venueId,
          startAt: { gte, lt },
          status: NOT_CANCELLED,
          paymentStatus: { not: 'PAID' },
        },
        _sum: { total: true, amountPaid: true },
      }),
      this.prisma.expense.groupBy({
        by: ['category'],
        where: { venueId, incurredAt: { gte, lt } },
        _sum: { amount: true },
        _count: true,
      }),
      // Money kept from customers who never turned up. Shown as its own line so
      // an owner can see it rather than wondering why income outran attendance.
      this.prisma.booking.aggregate({
        where: { venueId, startAt: { gte, lt }, status: BookingStatus.NO_SHOW },
        _sum: { amountPaid: true },
      }),
    ]);

    const bookingIncome = num(bookingAgg._sum.amountPaid);
    const membershipIncome = subPayments.reduce((s, r) => s + num(r._sum.amount), 0);
    const income = bookingIncome + membershipIncome;

    let cashIncome = 0;
    for (const r of byMethod) if (isCash(r.paymentMethod)) cashIncome += num(r._sum.amountPaid);
    for (const r of subPayments) if (isCash(r.method)) cashIncome += num(r._sum.amount);
    const digitalIncome = income - cashIncome;

    const expensesTotal = num(expenseAgg._sum.amount);
    const outstanding = num(outstandingAgg._sum.total) - num(outstandingAgg._sum.amountPaid);

    return {
      income,
      bookingIncome,
      membershipIncome,
      addOnRevenue: num(addOnAgg._sum.price),
      cashIncome,
      digitalIncome,
      revenue: num(bookingAgg._sum.total),
      grossRevenue: num(bookingAgg._sum.subtotal),
      discountsGiven: num(bookingAgg._sum.discountAmount),
      freeGames: { count: freeAgg._count, forgoneValue: num(freeAgg._sum.subtotal) },
      expensesTotal,
      expensesByCategory: expenseByCat
        .map((r) => ({
          category: r.category,
          amount: num(r._sum.amount),
          count: r._count,
        }))
        .sort((a, b) => b.amount - a.amount),
      netProfit: income - expensesTotal,
      outstanding: Math.max(0, outstanding),
      bookingsCount: bookingAgg._count,
      paidNoShows: num(noShowAgg._sum.amountPaid),
    };
  }

  // ─── Trend (continuous daily series) ─────────────────────────────────────────

  /**
   * Continuous income/expense/profit series, gap-filled so a quiet day is a zero
   * on the chart rather than a missing point the line would smooth over.
   *
   * `bucket` is applied in SQL via date_trunc, and the gap-fill walks the same
   * unit — so a WEEK series lands on week starts and a MONTH series on the 1st,
   * with no drift between the two halves.
   */
  async trend(venueId: string, range: ResolvedRange, bucket: TrendBucket) {
    const { gte, lt } = range;
    const unit = Prisma.raw(`'${bucket}'`);
    // Bucket keys come back as TEXT, not ::date — a date would be re-parsed in the
    // driver's local zone and land in the wrong bucket on a non-UTC machine.
    const [bookingRows, subRows, expenseRows] = await Promise.all([
      this.prisma.$queryRaw<{ date: string; income: Prisma.Decimal; bookings: bigint }[]>`
        SELECT to_char(date_trunc(${unit}, "startAt"), 'YYYY-MM-DD') AS date,
               COALESCE(SUM("amountPaid"), 0)                        AS income,
               COUNT(*)::bigint                                      AS bookings
        FROM bookings
        WHERE "venueId" = ${venueId} AND status <> 'CANCELLED'
          AND "startAt" >= ${ts(gte)}::timestamp AND "startAt" < ${ts(lt)}::timestamp
        GROUP BY date`,
      this.prisma.$queryRaw<{ date: string; income: Prisma.Decimal }[]>`
        SELECT to_char(date_trunc(${unit}, sp."createdAt"), 'YYYY-MM-DD') AS date,
               COALESCE(SUM(sp.amount), 0)                                AS income
        FROM subscription_payments sp
        JOIN subscriptions s ON s.id = sp."subscriptionId"
        WHERE s."venueId" = ${venueId} AND sp.status = 'PAID'
          AND sp."createdAt" >= ${ts(gte)}::timestamp AND sp."createdAt" < ${ts(lt)}::timestamp
        GROUP BY date`,
      this.prisma.$queryRaw<{ date: string; spent: Prisma.Decimal }[]>`
        SELECT to_char(date_trunc(${unit}, "incurredAt"), 'YYYY-MM-DD') AS date,
               COALESCE(SUM(amount), 0)                                 AS spent
        FROM expenses
        WHERE "venueId" = ${venueId}
          AND "incurredAt" >= ${ts(gte)}::timestamp AND "incurredAt" < ${ts(lt)}::timestamp
        GROUP BY date`,
    ]);

    const income = new Map<string, number>();
    const bookings = new Map<string, number>();
    const expenses = new Map<string, number>();
    const add = (m: Map<string, number>, k: string, v: number) => m.set(k, (m.get(k) ?? 0) + v);
    const key = (d: Date) => d.toISOString().slice(0, 10);

    for (const r of bookingRows) {
      add(income, r.date, num(r.income));
      add(bookings, r.date, Number(r.bookings));
    }
    for (const r of subRows) add(income, r.date, num(r.income));
    for (const r of expenseRows) add(expenses, r.date, num(r.spent));

    const out: {
      date: string;
      label: string;
      income: number;
      expenses: number;
      profit: number;
      bookings: number;
    }[] = [];
    for (const start of bucketStarts(gte, lt, bucket)) {
      const k = key(start);
      const inc = income.get(k) ?? 0;
      const exp = expenses.get(k) ?? 0;
      out.push({
        date: k,
        label: bucketLabel(start, bucket),
        income: inc,
        expenses: exp,
        profit: inc - exp,
        bookings: bookings.get(k) ?? 0,
      });
    }
    return out;
  }

  // ─── Performance ─────────────────────────────────────────────────────────────

  async performance(venueId: string, range: ResolvedRange) {
    const { gte, lt, days } = range;

    const [venue, activeCourts, totals, byCourt, bySport, peakRows, topRows, repeatRow] =
      await Promise.all([
        this.prisma.venue.findUnique({
          where: { id: venueId },
          select: { openTime: true, closeTime: true },
        }),
        this.prisma.court.count({ where: { venueId, isActive: true } }),
        this.prisma.booking.aggregate({
          where: { venueId, startAt: { gte, lt }, status: NOT_CANCELLED },
          _sum: { durationMinutes: true, total: true },
          _count: true,
        }),
        this.prisma.$queryRaw<
          {
            courtId: string;
            courtName: string;
            sport: string;
            bookings: bigint;
            revenue: Prisma.Decimal;
          }[]
        >`
          SELECT c.id AS "courtId", c.name AS "courtName", s.name AS sport,
                 COUNT(b.id)::bigint AS bookings, COALESCE(SUM(b."amountPaid"), 0) AS revenue
          FROM bookings b
          JOIN courts c ON c.id = b."courtId"
          JOIN sports s ON s.id = c."sportId"
          WHERE b."venueId" = ${venueId} AND b.status <> 'CANCELLED'
            AND b."startAt" >= ${gte} AND b."startAt" < ${lt}
          GROUP BY c.id, c.name, s.name
          ORDER BY revenue DESC`,
        this.prisma.$queryRaw<{ sport: string; bookings: bigint; revenue: Prisma.Decimal }[]>`
          SELECT s.name AS sport, COUNT(b.id)::bigint AS bookings,
                 COALESCE(SUM(b."amountPaid"), 0) AS revenue
          FROM bookings b
          JOIN courts c ON c.id = b."courtId"
          JOIN sports s ON s.id = c."sportId"
          WHERE b."venueId" = ${venueId} AND b.status <> 'CANCELLED'
            AND b."startAt" >= ${gte} AND b."startAt" < ${lt}
          GROUP BY s.name
          ORDER BY revenue DESC`,
        this.prisma.$queryRaw<{ hour: number; bookings: bigint; revenue: Prisma.Decimal }[]>`
          SELECT EXTRACT(HOUR FROM ("startAt" + ${NEPAL_INTERVAL}))::int AS hour,
                 COUNT(*)::bigint AS bookings, COALESCE(SUM("amountPaid"), 0) AS revenue
          FROM bookings
          WHERE "venueId" = ${venueId} AND status <> 'CANCELLED'
            AND "startAt" >= ${gte} AND "startAt" < ${lt}
          GROUP BY hour
          ORDER BY hour`,
        this.prisma.$queryRaw<
          { customerId: string | null; name: string; bookings: bigint; spent: Prisma.Decimal }[]
        >`
          SELECT MAX(b."customerId") AS "customerId",
                 COALESCE(MAX(c.name), MAX(b."customerName"), 'Walk-in') AS name,
                 COUNT(*)::bigint AS bookings, COALESCE(SUM(b."amountPaid"), 0) AS spent
          FROM bookings b
          LEFT JOIN customers c ON c.id = b."customerId"
          WHERE b."venueId" = ${venueId} AND b.status <> 'CANCELLED'
            AND b."startAt" >= ${gte} AND b."startAt" < ${lt}
          GROUP BY COALESCE(b."customerId", b."customerPhone", b."customerName")
          ORDER BY spent DESC
          LIMIT 8`,
        this.prisma.$queryRaw<{ repeat_rate: number | null }[]>`
          SELECT (COUNT(*) FILTER (WHERE cnt > 1))::float / NULLIF(COUNT(*), 0) * 100 AS repeat_rate
          FROM (
            SELECT COALESCE(b."customerId", b."customerPhone", b."customerName") AS k, COUNT(*) AS cnt
            FROM bookings b
            WHERE b."venueId" = ${venueId} AND b.status <> 'CANCELLED'
              AND b."startAt" >= ${gte} AND b."startAt" < ${lt}
              AND COALESCE(b."customerId", b."customerPhone", b."customerName") IS NOT NULL
            GROUP BY k
          ) t`,
      ]);

    const bookedMinutes = num(totals._sum.durationMinutes);
    const openMin = venue ? parseHHmmToMinutes(venue.openTime) : 0;
    const closeMin = venue ? parseHHmmToMinutes(venue.closeTime) : 0;
    const dailyOpenMinutes = Math.max(0, closeMin - openMin);
    // Capacity ignores closures (a documented approximation — see plan).
    const capacityMinutes = activeCourts * dailyOpenMinutes * days;
    const occupancyPct = capacityMinutes > 0 ? (bookedMinutes / capacityMinutes) * 100 : 0;
    const avgBookingValue = totals._count > 0 ? num(totals._sum.total) / totals._count : 0;

    return {
      occupancyPct,
      bookedHours: bookedMinutes / 60,
      capacityHours: capacityMinutes / 60,
      avgBookingValue,
      repeatRatePct: repeatRow[0]?.repeat_rate ?? 0,
      byCourt: byCourt.map((r) => ({
        courtId: r.courtId,
        courtName: r.courtName,
        sport: r.sport,
        bookings: Number(r.bookings),
        revenue: num(r.revenue),
      })),
      bySport: bySport.map((r) => ({
        sport: r.sport,
        bookings: Number(r.bookings),
        revenue: num(r.revenue),
      })),
      peakHours: peakRows.map((r) => ({
        hour: r.hour,
        bookings: Number(r.bookings),
        revenue: num(r.revenue),
      })),
      topCustomers: topRows.map((r) => ({
        customerId: r.customerId ?? undefined,
        name: r.name,
        bookings: Number(r.bookings),
        spent: num(r.spent),
      })),
    };
  }

  // ─── Offer ROI ───────────────────────────────────────────────────────────────

  async offerPerformance(venueId: string, range: ResolvedRange) {
    const { gte, lt } = range;
    const [offers, freeAgg] = await Promise.all([
      this.prisma.$queryRaw<
        {
          offerId: string;
          title: string;
          code: string | null;
          redemptions: bigint;
          given: Prisma.Decimal;
          driven: Prisma.Decimal;
        }[]
      >`
        SELECT o.id AS "offerId", o.title, o.code,
               COUNT(b.id)::bigint AS redemptions,
               COALESCE(SUM(b."discountAmount" + CASE WHEN b."freeGame" THEN b.subtotal ELSE 0 END), 0) AS given,
               COALESCE(SUM(b.total), 0) AS driven
        FROM offers o
        JOIN bookings b ON b."offerId" = o.id
        WHERE o."venueId" = ${venueId} AND b.status <> 'CANCELLED'
          AND b."startAt" >= ${gte} AND b."startAt" < ${lt}
        GROUP BY o.id, o.title, o.code
        ORDER BY given DESC`,
      this.prisma.booking.aggregate({
        where: { venueId, startAt: { gte, lt }, status: NOT_CANCELLED, freeGame: true },
        _sum: { subtotal: true },
        _count: true,
      }),
    ]);

    const list = offers.map((o) => ({
      offerId: o.offerId,
      title: o.title,
      code: o.code ?? undefined,
      redemptions: Number(o.redemptions),
      givenAmount: num(o.given),
      revenueDriven: num(o.driven),
    }));

    return {
      offers: list,
      freeGamesRedeemed: freeAgg._count,
      freeGamesForgoneValue: num(freeAgg._sum.subtotal),
      totalGiven: list.reduce((s, o) => s + o.givenAmount, 0),
      totalDriven: list.reduce((s, o) => s + o.revenueDriven, 0),
    };
  }

  // ─── Payout (platform settlements owed to the venue) ─────────────────────────

  async payoutSummary(venueId: string) {
    const [byStatus, lastPaid] = await Promise.all([
      this.prisma.settlement.groupBy({
        by: ['status'],
        where: { venueId },
        _sum: { netAmount: true },
      }),
      this.prisma.settlement.findFirst({
        where: { venueId, status: SettlementStatus.PAID, paidAt: { not: null } },
        orderBy: { paidAt: 'desc' },
        select: { paidAt: true },
      }),
    ]);
    const pick = (s: SettlementStatus) => num(byStatus.find((r) => r.status === s)?._sum.netAmount);
    return {
      pendingPayout: pick(SettlementStatus.PENDING),
      onHold: pick(SettlementStatus.ON_HOLD),
      paidOut: pick(SettlementStatus.PAID),
      lastPaidAt: lastPaid?.paidAt ?? undefined,
    };
  }

  // ─── Expenses (CRUD) ─────────────────────────────────────────────────────────

  listExpenses(venueId: string, range: ResolvedRange, category?: ExpenseCategory) {
    return this.prisma.expense.findMany({
      where: { venueId, incurredAt: { gte: range.gte, lt: range.lt }, category },
      orderBy: { incurredAt: 'desc' },
    });
  }

  createExpense(data: Prisma.ExpenseUncheckedCreateInput) {
    return this.prisma.expense.create({ data });
  }

  async updateExpense(venueId: string, expenseId: string, data: Prisma.ExpenseUpdateInput) {
    await this.assertExpense(venueId, expenseId);
    return this.prisma.expense.update({ where: { id: expenseId }, data });
  }

  async deleteExpense(venueId: string, expenseId: string) {
    await this.assertExpense(venueId, expenseId);
    return this.prisma.expense.delete({ where: { id: expenseId } });
  }

  private async assertExpense(venueId: string, expenseId: string) {
    const found = await this.prisma.expense.findFirst({
      where: { id: expenseId, venueId },
      select: { id: true },
    });
    if (!found) throw new Error('Expense not found.');
  }

  // ─── Cash reconciliation ─────────────────────────────────────────────────────

  /** Cash collected / paid out for a single business day (used by preview + close). */
  async cashFlowForDay(venueId: string, gte: Date, lt: Date) {
    const [bookingCash, subCash, expenseCash] = await Promise.all([
      this.prisma.booking.groupBy({
        by: ['paymentMethod'],
        where: { venueId, startAt: { gte, lt }, status: NOT_CANCELLED },
        _sum: { amountPaid: true },
      }),
      this.prisma.subscriptionPayment.groupBy({
        by: ['method'],
        where: { subscription: { venueId }, status: 'PAID', createdAt: { gte, lt } },
        _sum: { amount: true },
      }),
      this.prisma.expense.aggregate({
        where: { venueId, incurredAt: { gte, lt }, paymentMethod: PaymentProvider.CASH },
        _sum: { amount: true },
      }),
    ]);
    let cashIn = 0;
    for (const r of bookingCash) if (isCash(r.paymentMethod)) cashIn += num(r._sum.amountPaid);
    for (const r of subCash) if (isCash(r.method)) cashIn += num(r._sum.amount);
    return { cashIn, cashOut: num(expenseCash._sum.amount) };
  }

  findReconciliation(venueId: string, businessDate: Date) {
    return this.prisma.cashReconciliation.findUnique({
      where: { venueId_businessDate: { venueId, businessDate } },
    });
  }

  upsertReconciliation(args: {
    venueId: string;
    businessDate: Date;
    openingFloat: number;
    expectedCash: number;
    countedCash: number;
    variance: number;
    notes?: string;
    closedById: string;
  }) {
    const { venueId, businessDate, ...rest } = args;
    return this.prisma.cashReconciliation.upsert({
      where: { venueId_businessDate: { venueId, businessDate } },
      create: { venueId, businessDate, ...rest },
      update: { ...rest, closedAt: new Date() },
    });
  }

  listReconciliations(venueId: string, range: ResolvedRange) {
    return this.prisma.cashReconciliation.findMany({
      where: { venueId, businessDate: { gte: range.gte, lt: range.lt } },
      orderBy: { businessDate: 'desc' },
    });
  }

  // ─── Transactions ────────────────────────────────────────────────────────────

  /**
   * Every money movement in one filtered, sorted, paged feed.
   *
   * A UNION in SQL rather than three queries merged in memory: filtering,
   * sorting and paging all have to happen across the *combined* set, and the
   * footer totals have to cover every matching row — not the page on screen.
   * A client-side merge would page each rail separately and quietly mis-total.
   *
   * Booking payments come from the ledger (`booking_payments`), which is why
   * each instalment appears on the day it was actually taken.
   */
  async transactions(args: {
    venueId: string;
    range: ResolvedRange;
    search?: string;
    kinds?: string[];
    method?: PaymentProvider;
    category?: ExpenseCategory;
    sort: 'DATE_DESC' | 'DATE_ASC' | 'AMOUNT_DESC' | 'AMOUNT_ASC';
    page: number;
    pageSize: number;
  }) {
    const { venueId, range, page, pageSize } = args;
    const { gte, lt } = range;
    const kinds = args.kinds?.length ? args.kinds : null;
    const like = args.search?.trim() ? `%${args.search.trim()}%` : null;

    const wants = (k: string) => !kinds || kinds.includes(k);
    const parts: Prisma.Sql[] = [];

    if (wants('BOOKING_PAYMENT') && !args.category) {
      parts.push(Prisma.sql`
        SELECT p.id,
               'BOOKING_PAYMENT'::text                       AS kind,
               p."takenAt"                                   AS occurred_at,
               COALESCE(b."customerName", 'Walk-in')         AS description,
               c.name                                        AS counterparty,
               p.method::text                                AS method,
               NULL::text                                    AS category,
               p.amount                                      AS amount,
               b.id                                          AS reference
        FROM booking_payments p
        JOIN bookings b ON b.id = p."bookingId"
        LEFT JOIN courts c ON c.id = b."courtId"
        WHERE p."venueId" = ${venueId}
          AND p."takenAt" >= ${gte} AND p."takenAt" < ${lt}
          ${args.method ? Prisma.sql`AND p.method = ${args.method}::"PaymentProvider"` : Prisma.empty}
          ${like ? Prisma.sql`AND (b."customerName" ILIKE ${like} OR c.name ILIKE ${like} OR p.note ILIKE ${like})` : Prisma.empty}
      `);
    }

    if (wants('MEMBERSHIP_PAYMENT') && !args.category) {
      parts.push(Prisma.sql`
        SELECT sp.id,
               'MEMBERSHIP_PAYMENT'::text                    AS kind,
               sp."createdAt"                                AS occurred_at,
               cu.name                                       AS description,
               mp.name                                       AS counterparty,
               sp.method::text                               AS method,
               NULL::text                                    AS category,
               sp.amount                                     AS amount,
               NULL::text                                    AS reference
        FROM subscription_payments sp
        JOIN subscriptions s ON s.id = sp."subscriptionId"
        JOIN membership_plans mp ON mp.id = s."planId"
        LEFT JOIN customers cu ON cu.id = s."customerId"
        WHERE s."venueId" = ${venueId} AND sp.status = 'PAID'
          AND sp."createdAt" >= ${gte} AND sp."createdAt" < ${lt}
          ${args.method ? Prisma.sql`AND sp.method = ${args.method}::"PaymentProvider"` : Prisma.empty}
          ${like ? Prisma.sql`AND (cu.name ILIKE ${like} OR mp.name ILIKE ${like})` : Prisma.empty}
      `);
    }

    if (wants('EXPENSE')) {
      parts.push(Prisma.sql`
        SELECT e.id,
               'EXPENSE'::text                               AS kind,
               e."incurredAt"                                AS occurred_at,
               COALESCE(e.description, e.category::text)     AS description,
               e.vendor                                      AS counterparty,
               e."paymentMethod"::text                       AS method,
               e.category::text                              AS category,
               -e.amount                                     AS amount,
               NULL::text                                    AS reference
        FROM expenses e
        WHERE e."venueId" = ${venueId}
          AND e."incurredAt" >= ${gte} AND e."incurredAt" < ${lt}
          ${args.method ? Prisma.sql`AND e."paymentMethod" = ${args.method}::"PaymentProvider"` : Prisma.empty}
          ${args.category ? Prisma.sql`AND e.category = ${args.category}::"ExpenseCategory"` : Prisma.empty}
          ${like ? Prisma.sql`AND (e.description ILIKE ${like} OR e.vendor ILIKE ${like} OR e.category::text ILIKE ${like})` : Prisma.empty}
      `);
    }

    if (parts.length === 0) {
      return { items: [], totals: { moneyIn: 0, moneyOut: 0, net: 0, count: 0 }, total: 0 };
    }

    const unioned = Prisma.join(parts, ' UNION ALL ');
    const orderBy = Prisma.raw(
      {
        DATE_DESC: 'occurred_at DESC',
        DATE_ASC: 'occurred_at ASC',
        AMOUNT_DESC: 'amount DESC',
        AMOUNT_ASC: 'amount ASC',
      }[args.sort],
    );

    const [rows, totalsRow] = await Promise.all([
      this.prisma.$queryRaw<
        {
          id: string;
          kind: string;
          occurred_at: Date;
          description: string | null;
          counterparty: string | null;
          method: string | null;
          category: string | null;
          amount: Prisma.Decimal;
          reference: string | null;
        }[]
      >(Prisma.sql`
        SELECT * FROM (${unioned}) t
        ORDER BY ${orderBy}, id ASC
        LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
      `),
      this.prisma.$queryRaw<
        { money_in: Prisma.Decimal; money_out: Prisma.Decimal; count: bigint }[]
      >(Prisma.sql`
        SELECT COALESCE(SUM(amount) FILTER (WHERE amount > 0), 0) AS money_in,
               COALESCE(-SUM(amount) FILTER (WHERE amount < 0), 0) AS money_out,
               COUNT(*)::bigint                                    AS count
        FROM (${unioned}) t
      `),
    ]);

    const t = totalsRow[0];
    const moneyIn = num(t?.money_in);
    const moneyOut = num(t?.money_out);
    return {
      items: rows.map((r) => ({
        id: r.id,
        kind: r.kind,
        occurredAt: r.occurred_at,
        description: r.description ?? '—',
        counterparty: r.counterparty ?? undefined,
        method: r.method ?? undefined,
        category: r.category ?? undefined,
        amount: num(r.amount),
        reference: r.reference ?? undefined,
      })),
      totals: { moneyIn, moneyOut, net: moneyIn - moneyOut, count: Number(t?.count ?? 0) },
      total: Number(t?.count ?? 0),
    };
  }

  /**
   * Who still owes money. `outstanding` in the summary is one number; this is the
   * list behind it, which is the part an owner can actually act on.
   */
  async receivables(venueId: string, range: ResolvedRange) {
    const rows = await this.prisma.booking.findMany({
      where: {
        venueId,
        startAt: { gte: range.gte, lt: range.lt },
        status: NOT_CANCELLED,
        paymentStatus: { not: 'PAID' },
      },
      select: {
        id: true,
        customerName: true,
        customerPhone: true,
        startAt: true,
        total: true,
        amountPaid: true,
        court: { select: { name: true } },
      },
      orderBy: { startAt: 'desc' },
    });

    return (
      rows
        .map((r) => ({
          bookingId: r.id,
          customerName: r.customerName ?? 'Walk-in',
          customerPhone: r.customerPhone ?? undefined,
          courtName: r.court?.name,
          startAt: r.startAt,
          total: num(r.total),
          amountPaid: num(r.amountPaid),
          outstanding: num(r.total) - num(r.amountPaid),
        }))
        // A free game or a zeroed bill can sit at PENDING with nothing owed.
        .filter((r) => r.outstanding > 0)
        .sort((a, b) => b.outstanding - a.outstanding)
    );
  }

  /** Earliest money movement for the venue — the natural start of the ALL range. */
  async firstActivityAt(venueId: string): Promise<Date | null> {
    const [booking, expense] = await Promise.all([
      this.prisma.booking.findFirst({
        where: { venueId },
        orderBy: { startAt: 'asc' },
        select: { startAt: true },
      }),
      this.prisma.expense.findFirst({
        where: { venueId },
        orderBy: { incurredAt: 'asc' },
        select: { incurredAt: true },
      }),
    ]);
    const dates = [booking?.startAt, expense?.incurredAt].filter(Boolean) as Date[];
    if (dates.length === 0) return null;
    return dates.reduce((a, b) => (a < b ? a : b));
  }
}
