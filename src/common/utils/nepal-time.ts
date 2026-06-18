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
