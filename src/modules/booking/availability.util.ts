import { NEPAL_UTC_OFFSET_MINUTES, utcToNepalMinutesOfDay } from '../../common/utils/nepal-time';

const DOW = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
export type Dow = (typeof DOW)[number];

/** Nepal-local weekday ("sun".."sat") for an absolute instant. */
export function nepalWeekday(d: Date): Dow {
  const shifted = new Date(d.getTime() + NEPAL_UTC_OFFSET_MINUTES * 60_000);
  return DOW[shifted.getUTCDay()];
}

/** Minutes-since-midnight → friendly 12-hour clock, e.g. 360 → "6 AM", 1290 → "9:30 PM". */
export function formatClock(minutes: number): string {
  const total = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  const period = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${period}` : `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/** "6 AM to 7 AM" for a booking's absolute start/end, in Nepal wall-clock time. */
export function nepalClockRange(startAt: Date, endAt: Date): string {
  return `${formatClock(utcToNepalMinutesOfDay(startAt))} to ${formatClock(utcToNepalMinutesOfDay(endAt))}`;
}

const DAY_NAME: Record<Dow, string> = {
  sun: 'Sundays',
  mon: 'Mondays',
  tue: 'Tuesdays',
  wed: 'Wednesdays',
  thu: 'Thursdays',
  fri: 'Fridays',
  sat: 'Saturdays',
};

/** Plural weekday label for messages, e.g. "Mondays". */
export function dayLabel(d: Dow): string {
  return DAY_NAME[d];
}
