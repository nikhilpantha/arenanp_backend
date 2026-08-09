import { parseHHmmToMinutes, utcToNepalMinutesOfDay } from '../../common/utils/nepal-time';
import { nepalWeekday } from '../booking/availability.util';

/** A member's recurring hold: the same clock slot on the same weekdays. */
export type MemberSlot = {
  slotStart: string;
  sessionMinutes: number;
  daysOfWeek: string[];
};

/** The bit of a one-off booking that can collide with that hold. */
export type BookingWindow = {
  startAt: Date;
  endAt: Date;
  customerName: string | null;
};

/**
 * The first one-off booking sitting inside a member's recurring slot.
 *
 * This is the mirror image of the check in `booking.repository`: that one stops a
 * booking landing on a member's slot, this one stops a member's slot being
 * extended or resumed over a booking that is already confirmed. Both have to
 * exist, because either side can move onto the other.
 */
export function firstBookingInMemberSlot(
  slot: MemberSlot,
  bookings: BookingWindow[],
): BookingWindow | null {
  const slotStart = parseHHmmToMinutes(slot.slotStart);
  const slotEnd = slotStart + slot.sessionMinutes;

  for (const booking of bookings) {
    if (!slot.daysOfWeek.includes(nepalWeekday(booking.startAt))) continue;
    const startMin = utcToNepalMinutesOfDay(booking.startAt);
    const endMin =
      startMin + Math.round((booking.endAt.getTime() - booking.startAt.getTime()) / 60_000);
    if (startMin < slotEnd && endMin > slotStart) return booking;
  }
  return null;
}
