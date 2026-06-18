import { Prisma } from '@prisma/client';

import { NEPAL_UTC_OFFSET_MINUTES, utcToNepalMinutesOfDay } from '../../common/utils/nepal-time';

/** A Prisma client or an in-transaction client — the overlap check works with either. */
type Client = Prisma.TransactionClient | { venueClosure: Prisma.TransactionClient['venueClosure'] };

/** A closure that blocks the given court/time window, selecting only what messages need. */
export type OverlappingClosure = {
  startAt: Date;
  endAt: Date;
  reason: string | null;
  courtId: string | null;
};

/**
 * The first closure that blocks `[startAt, endAt)` on this court, or null. A closure
 * blocks when it is venue-wide (`courtId = null`) or scoped to this exact court, and
 * its window overlaps the requested one (`startAt < end && endAt > start`).
 */
export function findOverlappingClosure(
  client: Client,
  opts: { venueId: string; courtId: string; startAt: Date; endAt: Date },
): Promise<OverlappingClosure | null> {
  return client.venueClosure.findFirst({
    where: {
      venueId: opts.venueId,
      OR: [{ courtId: null }, { courtId: opts.courtId }],
      startAt: { lt: opts.endAt },
      endAt: { gt: opts.startAt },
    },
    select: { startAt: true, endAt: true, reason: true, courtId: true },
  });
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Minutes-since-midnight → friendly 12-hour clock, e.g. 360 → "6 AM", 1290 → "9:30 PM". */
function clock(minutes: number): string {
  const total = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${period}` : `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/** Nepal-local "Mon D" for an absolute instant, e.g. "Jun 20". */
function nepalDateLabel(d: Date): string {
  const shifted = new Date(d.getTime() + NEPAL_UTC_OFFSET_MINUTES * 60_000);
  return `${MONTHS[shifted.getUTCMonth()]} ${shifted.getUTCDate()}`;
}

/** Nepal-local yyyy-mm-dd key, to detect a single-day window. */
function nepalDayKey(d: Date): string {
  const shifted = new Date(d.getTime() + NEPAL_UTC_OFFSET_MINUTES * 60_000);
  return shifted.toISOString().slice(0, 10);
}

/**
 * Friendly Nepal-local description of a closure window for owner-facing messages.
 * Single day → "Jun 20, 2 PM to 5 PM"; spanning days → "Jun 20 to Jun 22".
 * (A full-day closure ends at the next midnight, so the end date is stepped back a day.)
 */
export function formatClosureWindow(startAt: Date, endAt: Date): string {
  const startMin = utcToNepalMinutesOfDay(startAt);
  const endMin = utcToNepalMinutesOfDay(endAt);
  const sameDay = nepalDayKey(startAt) === nepalDayKey(endAt);
  const fullDay = startMin === 0 && endMin === 0;
  if (sameDay && !fullDay) {
    return `${nepalDateLabel(startAt)}, ${clock(startMin)} to ${clock(endMin)}`;
  }
  // Multi-day or full-day: the exclusive end midnight belongs to the prior day.
  const lastDay = new Date(endAt.getTime() - 60_000);
  const startLabel = nepalDateLabel(startAt);
  const endLabel = nepalDateLabel(lastDay);
  return startLabel === endLabel ? startLabel : `${startLabel} to ${endLabel}`;
}

/** Owner-facing conflict message for a closure blocking a requested booking. */
export function closureConflictMessage(closure: OverlappingClosure): string {
  const window = formatClosureWindow(closure.startAt, closure.endAt);
  const reason = closure.reason ? ` (${closure.reason})` : '';
  return closure.courtId
    ? `This court is closed ${window}${reason}. Please pick a different time or court.`
    : `The venue is closed ${window}${reason}. Please pick a different time.`;
}
