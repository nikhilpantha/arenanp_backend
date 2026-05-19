/**
 * Normalise a Nepal phone number to E.164 (+977XXXXXXXXXX).
 * Accepts inputs like "9800000000", "9779800000000", "+9779800000000".
 * Throws on anything that doesn't look like a Nepal mobile.
 */
export function normaliseNepalPhone(input: string): string {
  const trimmed = input.trim().replace(/\s+/g, '');
  const digits = trimmed.replace(/[^\d]/g, '');

  let core = digits;
  if (core.startsWith('977')) core = core.slice(3);
  if (core.length === 10 && core.startsWith('9')) {
    return `+977${core}`;
  }
  throw new Error('Invalid Nepal phone number');
}

export function isValidNepalPhone(input: string): boolean {
  try {
    normaliseNepalPhone(input);
    return true;
  } catch {
    return false;
  }
}
