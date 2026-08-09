/**
 * A venue's permanent URL-safe handle, derived from its name once at creation.
 *
 * It is load-bearing beyond prettiness: staff login emails are minted as
 * `<name>@<slug>.arenanp.com`, so the slug is part of every staff member's
 * credentials. It must never be regenerated after the venue exists.
 *
 * Nepali venue names routinely mix Devanagari and Latin ("फुटसल House"), so the
 * transliteration strips to ASCII and falls back to `venue` rather than
 * emitting an empty string — a name with no Latin characters still needs a
 * handle, and the uniqueness loop will make it `venue-2`.
 */

/** Reserved handles: they'd read as platform infrastructure in an email domain. */
const RESERVED = new Set([
  'admin',
  'api',
  'app',
  'arena',
  'arenanp',
  'mail',
  'staff',
  'support',
  'venue',
  'www',
]);

const MAX_LENGTH = 40;

/**
 * "Lumbini Futsal House" → "lumbini-futsal-house". Diacritics are folded, every
 * run of non-alphanumerics collapses to a single hyphen, and the result is
 * trimmed to a length that still fits comfortably in an email domain.
 */
export function slugifyVenueName(name: string): string {
  const base = name
    .normalize('NFKD')
    // Strip combining marks left behind by the decomposition (é → e).
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_LENGTH)
    .replace(/-+$/, '');

  // A reserved word on its own would collide with platform infrastructure; the
  // caller's uniqueness loop turns it into `venue-2`, which is fine.
  return base.length > 0 && !RESERVED.has(base) ? base : 'venue';
}

/**
 * The first candidate not already taken. `n` starts at 2 because "the second
 * Lumbini Futsal" reads better than "lumbini-futsal-1".
 *
 * `isTaken` is injected rather than querying here so the caller can run the
 * check inside its own transaction.
 */
export async function uniqueVenueSlug(
  name: string,
  isTaken: (slug: string) => Promise<boolean>,
  maxAttempts = 50,
): Promise<string> {
  const base = slugifyVenueName(name);
  if (!(await isTaken(base))) return base;

  for (let n = 2; n <= maxAttempts; n++) {
    const candidate = `${base}-${n}`;
    if (!(await isTaken(candidate))) return candidate;
  }
  // Fifty venues with one name is not a real venue estate; it's a runaway loop
  // or an attack. Fail loudly rather than spinning.
  throw new Error(`Could not find a free slug for "${name}" after ${maxAttempts} attempts.`);
}
