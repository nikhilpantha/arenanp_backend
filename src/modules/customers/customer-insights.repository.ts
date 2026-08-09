import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { NEPAL_UTC_OFFSET_MINUTES } from '../../common/utils/nepal-time';
import { PrismaService } from '../../database/prisma.service';

/**
 * The aggregate half of the customer profile: four grouped scans over one
 * customer's bookings, answering "how loyal" and "how do they like to play".
 *
 * Raw SQL rather than Prisma groupBy because the interesting cuts are derived
 * — weekday and hour of the *Nepal* wall clock, calendar months, several
 * differently-filtered tallies in one pass. Everything is cast in SQL
 * (`::int` / `::float8`) so nothing comes back as a Decimal needing a second
 * conversion, and every scan is served by the `bookings(customerId)` index.
 */

/** Nepal is a fixed UTC+05:45, so wall-clock cuts are a constant shift. */
const OFFSET = Prisma.raw(`interval '${NEPAL_UTC_OFFSET_MINUTES} minutes'`);
const NEPAL = Prisma.sql`(b."startAt" + ${OFFSET})`;
const NOW = Prisma.sql`(now() AT TIME ZONE 'UTC')`;
/** A game that actually happened: already started, not cancelled, not a no-show. */
const VISITED = Prisma.sql`b."status"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b."startAt" <= ${NOW}`;
/** Trade: a cancelled booking is not money, even if something was collected. */
const TRADED = Prisma.sql`b."status"::text <> 'CANCELLED'`;

export interface CustomerTotalsRow {
  totalBookings: number;
  visits: number;
  completed: number;
  cancelled: number;
  noShow: number;
  upcoming: number;
  freeGames: number;
  walkInBookings: number;
  onlineBookings: number;
  membershipBookings: number;
  playedMinutes: number;
  billed: number;
  paid: number;
  discount: number;
  firstVisitAt: Date | null;
  lastVisitAt: Date | null;
  nextVisitAt: Date | null;
}

export interface CourtPlayRow {
  courtName: string;
  sportName: string;
  games: number;
}

export interface SlotPlayRow {
  weekday: number;
  hour: number;
  games: number;
}

export interface MonthPlayRow {
  month: string;
  games: number;
  spend: number;
}

@Injectable()
export class CustomerInsightsRepository {
  constructor(private readonly prisma: PrismaService) {}

  private scope(venueId: string, customerId: string): Prisma.Sql {
    return Prisma.sql`b."venueId" = ${venueId} AND b."customerId" = ${customerId}`;
  }

  /** Every headline number in one pass, each tally with its own FILTER. */
  async totals(venueId: string, customerId: string): Promise<CustomerTotalsRow> {
    const [row] = await this.prisma.$queryRaw<CustomerTotalsRow[]>(Prisma.sql`
      SELECT
        COUNT(*)::int AS "totalBookings",
        COUNT(*) FILTER (WHERE ${VISITED})::int AS "visits",
        COUNT(*) FILTER (WHERE b."status"::text = 'COMPLETED')::int AS "completed",
        COUNT(*) FILTER (WHERE b."status"::text = 'CANCELLED')::int AS "cancelled",
        COUNT(*) FILTER (WHERE b."status"::text = 'NO_SHOW')::int AS "noShow",
        COUNT(*) FILTER (
          WHERE b."status"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b."startAt" > ${NOW}
        )::int AS "upcoming",
        COUNT(*) FILTER (WHERE b."freeGame" AND ${TRADED})::int AS "freeGames",
        COUNT(*) FILTER (WHERE b."source"::text = 'WALK_IN' AND ${TRADED})::int AS "walkInBookings",
        COUNT(*) FILTER (WHERE b."source"::text = 'ONLINE' AND ${TRADED})::int AS "onlineBookings",
        COUNT(*) FILTER (
          WHERE b."source"::text = 'SUBSCRIPTION' AND ${TRADED}
        )::int AS "membershipBookings",
        COALESCE(SUM(b."durationMinutes") FILTER (WHERE ${VISITED}), 0)::int AS "playedMinutes",
        COALESCE(SUM(b."total") FILTER (WHERE ${TRADED}), 0)::float8 AS "billed",
        COALESCE(SUM(b."amountPaid") FILTER (WHERE ${TRADED}), 0)::float8 AS "paid",
        COALESCE(SUM(b."discountAmount") FILTER (WHERE ${TRADED}), 0)::float8 AS "discount",
        MIN(b."startAt") FILTER (WHERE ${VISITED}) AS "firstVisitAt",
        MAX(b."startAt") FILTER (WHERE ${VISITED}) AS "lastVisitAt",
        MIN(b."startAt") FILTER (
          WHERE b."status"::text NOT IN ('CANCELLED', 'NO_SHOW') AND b."startAt" > ${NOW}
        ) AS "nextVisitAt"
      FROM "bookings" b
      WHERE ${this.scope(venueId, customerId)}
    `);
    return row;
  }

  /** Visits per court (with its sport), busiest first — the "favourite court" cut. */
  courtPlay(venueId: string, customerId: string): Promise<CourtPlayRow[]> {
    return this.prisma.$queryRaw<CourtPlayRow[]>(Prisma.sql`
      SELECT c."name" AS "courtName", s."name" AS "sportName", COUNT(*)::int AS games
      FROM "bookings" b
      JOIN "courts" c ON c."id" = b."courtId"
      JOIN "sports" s ON s."id" = c."sportId"
      WHERE ${this.scope(venueId, customerId)} AND ${VISITED}
      GROUP BY c."name", s."name"
      ORDER BY games DESC, c."name" ASC
    `);
  }

  /** Visits by Nepal weekday (0 = Sunday) and start hour — the "when do they play" cut. */
  slotPlay(venueId: string, customerId: string): Promise<SlotPlayRow[]> {
    return this.prisma.$queryRaw<SlotPlayRow[]>(Prisma.sql`
      SELECT
        EXTRACT(DOW FROM ${NEPAL})::int AS weekday,
        EXTRACT(HOUR FROM ${NEPAL})::int AS hour,
        COUNT(*)::int AS games
      FROM "bookings" b
      WHERE ${this.scope(venueId, customerId)} AND ${VISITED}
      GROUP BY 1, 2
    `);
  }

  /** Visits and collected spend per Nepal calendar month, over the last 12 months. */
  monthlyPlay(venueId: string, customerId: string): Promise<MonthPlayRow[]> {
    return this.prisma.$queryRaw<MonthPlayRow[]>(Prisma.sql`
      SELECT
        to_char(date_trunc('month', ${NEPAL}), 'YYYY-MM') AS month,
        COUNT(*)::int AS games,
        COALESCE(SUM(b."amountPaid"), 0)::float8 AS spend
      FROM "bookings" b
      WHERE ${this.scope(venueId, customerId)}
        AND ${VISITED}
        AND ${NEPAL} >= date_trunc('month', ${NOW} + ${OFFSET}) - interval '11 months'
      GROUP BY 1
      ORDER BY 1 ASC
    `);
  }
}
