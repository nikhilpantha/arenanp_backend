import { BadRequestException } from '@nestjs/common';
import { SportBookingMode } from '@prisma/client';

/**
 * Pure rules for the sport catalogue. Kept out of the service because they are
 * the contract venue setup depends on: an owner's setup screen renders itself
 * from these fields, so a half-configured sport would break a screen nobody on
 * the admin side ever sees.
 */

/** Trim, drop blanks, and de-duplicate (case-insensitive) a catalogue list. */
export function normaliseTags(values?: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values ?? []) {
    const value = raw.trim();
    const key = value.toLowerCase();
    if (value && !seen.has(key)) {
      seen.add(key);
      out.push(value);
    }
  }
  return out;
}

/** Fallback when an admin clears the list — a sport needs at least one option. */
export const DEFAULT_SLOT_DURATIONS = [30, 60, 90, 120];

/** Keep positive whole minutes, de-duplicate, and sort ascending. */
export function normaliseSlotDurations(durations?: number[]): number[] {
  const cleaned = Array.from(
    new Set((durations ?? []).filter((d) => Number.isInteger(d) && d > 0)),
  ).sort((a, b) => a - b);
  return cleaned.length ? cleaned : DEFAULT_SLOT_DURATIONS;
}

/**
 * `Sport.features` is derived, never authored. It exists only so the Expo app's
 * venue setup — which still reads one flat chip list — keeps working while the
 * typed catalogues roll out. Drop it once that screen moves over.
 */
export function deriveFeatures(parts: {
  surfaces: string[];
  formats: string[];
  courtFeatures: string[];
}): string[] {
  return normaliseTags([...parts.surfaces, ...parts.formats, ...parts.courtFeatures]);
}

/**
 * Resolve one nullable field of a patch. `undefined` means the client didn't
 * mention it, so keep what's stored; an explicit `null` means clear it. Treating
 * both as "keep" is what makes an optional field impossible to unset.
 */
export function patch<T>(incoming: T | null | undefined, current: T | null): T | null {
  return incoming === undefined ? current : incoming;
}

/** The resolved state of a sport after a create or a patch is applied. */
export type SportConfig = {
  name: string;
  isActive: boolean;
  slotDurations: number[];
  defaultSlotMinutes: number;
  minDurationMinutes: number | null;
  maxDurationMinutes: number | null;
  bookingMode: SportBookingMode;
  defaultCapacity: number | null;
  unitLabel: string;
  unitLabelPlural: string;
};

/**
 * Two tiers of rule:
 *
 * - **Consistency** is always enforced — these describe a sport that
 *   contradicts itself (a default slot that isn't on offer), which is never a
 *   legitimate draft.
 * - **Completeness** is enforced only when the sport goes live, so an admin can
 *   save a half-filled draft and come back to it.
 *
 * Every failure is collected and reported together — an admin fixing one field
 * at a time through four round-trips is its own kind of broken.
 */
export function assertSportConfig(config: SportConfig): void {
  const problems: string[] = [];
  const slots = config.slotDurations;

  // ── Consistency ─────────────────────────────────────────────────────────
  if (slots.length && !slots.includes(config.defaultSlotMinutes)) {
    problems.push(
      `set the default slot to one of ${slots.join(', ')} minutes (it is currently ${config.defaultSlotMinutes})`,
    );
  }

  const { minDurationMinutes: min, maxDurationMinutes: max } = config;
  if (min != null && max != null && min > max) {
    problems.push(`make the minimum duration (${min}) no longer than the maximum (${max})`);
  }
  if (min != null && slots.length && min < Math.min(...slots)) {
    problems.push(
      `raise the minimum duration to at least the shortest slot (${Math.min(...slots)} minutes)`,
    );
  }

  // ── Completeness — only blocks going live ───────────────────────────────
  if (config.isActive) {
    if (!slots.length) {
      problems.push('add at least one slot duration');
    }
    if (!config.unitLabel.trim() || !config.unitLabelPlural.trim()) {
      problems.push('name the bookable unit, singular and plural (e.g. "court" / "courts")');
    }
    if (config.bookingMode === SportBookingMode.CAPACITY && !config.defaultCapacity) {
      problems.push(
        'set the places per slot — a capacity sport sells N places rather than the whole surface',
      );
    }
  }

  if (!problems.length) return;

  const verb = config.isActive ? 'activate' : 'save';
  throw new BadRequestException(`Cannot ${verb} "${config.name}" — ${joinClauses(problems)}.`);
}

function joinClauses(items: string[]): string {
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join('; ')}; and ${items[items.length - 1]}`;
}
