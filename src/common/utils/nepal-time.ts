/**
 * Asia/Kathmandu is a fixed UTC+05:45 offset with no daylight saving, so wall-clock
 * conversions need only a constant offset — no tz database / dependency required.
 * (The configured `app.timezone` stays the source of truth for what this represents.)
 */
export const NEPAL_UTC_OFFSET_MINUTES = 5 * 60 + 45; // 345

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** Minutes-since-midnight for a "HH:mm" string. Throws on a malformed value. */
export function parseHHmmToMinutes(time: string): number {
  const m = TIME_RE.exec(time);
  if (!m) throw new Error(`Invalid HH:mm time: ${time}`);
  return Number(m[1]) * 60 + Number(m[2]);
}

/**
 * Convert a Nepal-local date ("yyyy-mm-dd") + minutes-since-midnight to the absolute
 * UTC instant. `Date.UTC` builds the instant as if the wall time were UTC; subtracting
 * the offset shifts it to the real UTC moment for Kathmandu.
 */
export function nepalWallTimeToUtc(date: string, minutesSinceMidnight: number): Date {
  const [y, mo, d] = date.split('-').map(Number);
  const base = Date.UTC(y, mo - 1, d, 0, 0) + minutesSinceMidnight * 60_000;
  return new Date(base - NEPAL_UTC_OFFSET_MINUTES * 60_000);
}

const DAY_MINUTES = 24 * 60;

/** Nepal-local minutes-since-midnight for an absolute instant (0–1439). */
export function utcToNepalMinutesOfDay(d: Date): number {
  const shifted = d.getTime() + NEPAL_UTC_OFFSET_MINUTES * 60_000;
  const min = Math.floor(shifted / 60_000) % DAY_MINUTES;
  return (min + DAY_MINUTES) % DAY_MINUTES;
}

const MS_PER_DAY = 86_400_000;

/**
 * UTC day window [start, nextDay) for a `Date`. The platform treats the UTC day as
 * the business day: a venue opens at 06:00 Nepal — well after the 05:45 offset — so a
 * UTC day cleanly contains one Nepal trading day. Booking + finance share this so
 * "today" matches across every owner surface.
 */
export function dayBounds(d: Date): { gte: Date; lt: Date } {
  const gte = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const lt = new Date(gte);
  lt.setUTCDate(lt.getUTCDate() + 1);
  return { gte, lt };
}

/**
 * Finance reporting windows. Rolling, ending today (inclusive).
 *
 * TOMORROW and ALL are listed so callers can pass a preset straight through, but
 * they are resolved by the finance service before they reach `resolveRange`:
 * one looks forward, the other has to ask the data where history begins. They
 * fall through to the MONTH default here only if that interception is missed.
 */
export type FinanceRangePreset = 'TODAY' | 'TOMORROW' | 'WEEK' | 'MONTH' | 'YEAR' | 'ALL';

export interface FinanceRangeArgs {
  preset?: FinanceRangePreset;
  /** Explicit "yyyy-mm-dd" bounds (inclusive); override the preset when both are set. */
  from?: string;
  to?: string;
}

/** A resolved reporting window plus its inclusive day span (for capacity maths). */
export interface ResolvedRange {
  gte: Date;
  lt: Date;
  days: number;
}

/** Resolve a finance range preset (or explicit from/to) to a UTC [gte, lt) window. */
export function resolveRange(input?: FinanceRangeArgs): ResolvedRange {
  if (input?.from && input?.to) {
    const { gte } = dayBounds(new Date(`${input.from}T00:00:00.000Z`));
    const { lt } = dayBounds(new Date(`${input.to}T00:00:00.000Z`));
    return withDays(gte, lt);
  }
  const today = dayBounds(new Date());
  const gte = new Date(today.gte);
  switch (input?.preset ?? 'MONTH') {
    case 'TODAY':
      return withDays(today.gte, today.lt);
    case 'WEEK':
      gte.setUTCDate(gte.getUTCDate() - 6); // last 7 days incl. today
      break;
    case 'YEAR':
      gte.setUTCFullYear(gte.getUTCFullYear() - 1);
      gte.setUTCDate(gte.getUTCDate() + 1);
      break;
    case 'MONTH':
    default:
      gte.setUTCDate(gte.getUTCDate() - 29); // last 30 days incl. today
      break;
  }
  return withDays(gte, today.lt);
}

function withDays(gte: Date, lt: Date): ResolvedRange {
  return { gte, lt, days: Math.max(1, Math.round((lt.getTime() - gte.getTime()) / MS_PER_DAY)) };
}
