import { BadRequestException } from '@nestjs/common';

/** A subscription time band, parsed from the "HH:mm-HH:mm" stored form. */
export interface TimeWindow {
  startMin: number;
  endMin: number;
}

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

/** "HH:mm" → minutes since midnight. Throws on malformed input. */
export function parseTime(value: string): number {
  const m = TIME_RE.exec(value.trim());
  if (!m) throw new BadRequestException(`Invalid time "${value}" (expected HH:mm).`);
  return Number(m[1]) * 60 + Number(m[2]);
}

/** minutes since midnight → "HH:mm". */
export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Validate + normalise the owner's "HH:mm-HH:mm" bands. Each must be well-formed with
 * end after start; at least one is required. Returns the canonical string list.
 */
export function normaliseWindows(windows: string[]): string[] {
  if (!windows || windows.length === 0) {
    throw new BadRequestException('Add at least one subscription time band.');
  }
  return windows.map((w) => {
    const [start, end] = w.split('-').map((s) => s.trim());
    const startMin = parseTime(start ?? '');
    const endMin = parseTime(end ?? '');
    if (endMin <= startMin) {
      throw new BadRequestException(`Band "${w}" must end after it starts.`);
    }
    return `${formatTime(startMin)}-${formatTime(endMin)}`;
  });
}

/** Parse stored "HH:mm-HH:mm" bands into numeric windows. */
export function parseWindows(windows: string[]): TimeWindow[] {
  return windows.map((w) => {
    const [start, end] = w.split('-');
    return { startMin: parseTime(start ?? ''), endMin: parseTime(end ?? '') };
  });
}

/**
 * Assert a chosen start time yields a session that fits entirely inside one of the
 * plan's bands. Returns the normalised "HH:mm" start on success.
 */
export function assertSlotInWindows(
  slotStart: string,
  sessionMinutes: number,
  windows: string[],
): string {
  const start = parseTime(slotStart);
  const end = start + sessionMinutes;
  const fits = parseWindows(windows).some((w) => start >= w.startMin && end <= w.endMin);
  if (!fits) {
    throw new BadRequestException(
      'The selected time does not fit within an allowed subscription band.',
    );
  }
  return formatTime(start);
}
