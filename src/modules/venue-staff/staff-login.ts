import { randomInt } from 'node:crypto';

/**
 * Minting the credentials a venue owner hands to a new staff member.
 *
 * The address is derived from their name and the venue's slug —
 * `ram.bahadur@lumbini-futsal.arenanp.com` — because the owner has to be able
 * to read it aloud across a desk. That legibility is also its weakness: anyone
 * who knows the venue can guess the address, so the password is the only real
 * secret, which is why the generator here is deliberately strong and the API
 * rate-limits sign-in attempts.
 */

const EMAIL_DOMAIN_SUFFIX = 'arenanp.com';
const MAX_LOCAL_LENGTH = 24;

/**
 * Local parts that would read as platform infrastructure rather than a person.
 * `ram@…` is fine; `admin@…` and `support@…` are not, whoever asks for them.
 */
const RESERVED_LOCAL = new Set([
  'abuse',
  'admin',
  'billing',
  'help',
  'info',
  'mail',
  'noreply',
  'no-reply',
  'owner',
  'postmaster',
  'root',
  'security',
  'support',
  'webmaster',
]);

/** "Ram Bahadur Thapa" → "ram.bahadur.thapa". Falls back to `staff`. */
export function staffLocalPart(fullName: string): string {
  const base = fullName
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .slice(0, MAX_LOCAL_LENGTH)
    .replace(/\.+$/, '');

  return base.length > 0 && !RESERVED_LOCAL.has(base) ? base : 'staff';
}

export function staffEmailDomain(venueSlug: string): string {
  return `${venueSlug}.${EMAIL_DOMAIN_SUFFIX}`;
}

/**
 * The address for this person at this venue, avoiding any already taken.
 *
 * `isTaken` checks the whole platform, not the venue: `User.email` is globally
 * unique, so two people called Ram at two venues are already separated by the
 * slug in the domain, and the counter only ever fires for two Rams at the SAME
 * venue — `ram2@…`, `ram3@…`.
 */
export async function uniqueStaffEmail(
  fullName: string,
  venueSlug: string,
  isTaken: (email: string) => Promise<boolean>,
  maxAttempts = 50,
): Promise<string> {
  const local = staffLocalPart(fullName);
  const domain = staffEmailDomain(venueSlug);

  const first = `${local}@${domain}`;
  if (!(await isTaken(first))) return first;

  for (let n = 2; n <= maxAttempts; n++) {
    const candidate = `${local}${n}@${domain}`;
    if (!(await isTaken(candidate))) return candidate;
  }
  throw new Error(`Could not mint a free login for "${fullName}" at ${venueSlug}.`);
}

// Ambiguous characters are left out on purpose: this password gets written on
// paper or read down a phone line, and "was that l or 1?" turns into a support
// call. Each group is drawn from separately so the result always satisfies the
// password policy rather than satisfying it by luck.
const LOWER = 'abcdefghijkmnpqrstuvwxyz';
const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const DIGITS = '23456789';
const SYMBOLS = '!@#$%&*?';

/**
 * A starter password strong enough to be the only thing guarding a guessable
 * address, and still transcribable — e.g. `Kpq7-vnx9!`.
 */
export function generateStarterPassword(): string {
  const pick = (set: string, count: number) =>
    Array.from({ length: count }, () => set[randomInt(set.length)]).join('');

  // Shuffled so the character classes don't always land in the same positions.
  const chars = [pick(UPPER, 1), pick(DIGITS, 2), pick(SYMBOLS, 1), pick(LOWER, 6)]
    .join('')
    .split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  // A hyphen in the middle gives the eye somewhere to rest when copying it.
  return `${chars.slice(0, 5).join('')}-${chars.slice(5).join('')}`;
}
