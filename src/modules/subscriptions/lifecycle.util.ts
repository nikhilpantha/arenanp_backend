import { SubscriptionStatus } from '@prisma/client';

/**
 * Which hand-made status changes are legal, and why the rest aren't.
 *
 * `setSubscriptionStatus` used to accept any status → any status, so a cancelled
 * membership could be flipped back to ACTIVE (re-claiming a court slot that had
 * been released), and an expired one could be "reactivated" only for
 * `reconcileStatuses` to silently expire it again on the next read.
 *
 * EXPIRED is reached by the clock and left by renewing; ACTIVE ← PENDING is
 * reached by approving. Neither is a status the owner sets by hand.
 */
const ALLOWED: Record<SubscriptionStatus, SubscriptionStatus[]> = {
  [SubscriptionStatus.PENDING]: [SubscriptionStatus.CANCELLED],
  [SubscriptionStatus.SCHEDULED]: [SubscriptionStatus.CANCELLED],
  [SubscriptionStatus.ACTIVE]: [SubscriptionStatus.PAUSED, SubscriptionStatus.CANCELLED],
  [SubscriptionStatus.PAUSED]: [SubscriptionStatus.ACTIVE, SubscriptionStatus.CANCELLED],
  [SubscriptionStatus.EXPIRED]: [SubscriptionStatus.CANCELLED],
  [SubscriptionStatus.CANCELLED]: [],
};

/** Why this particular change is refused — null when it's allowed. */
export function transitionError(from: SubscriptionStatus, to: SubscriptionStatus): string | null {
  if (from === to) return null;
  if (ALLOWED[from].includes(to)) return null;

  if (from === SubscriptionStatus.CANCELLED) {
    return 'This membership was cancelled and its slot released. Add a new one instead.';
  }
  if (from === SubscriptionStatus.PENDING && to === SubscriptionStatus.ACTIVE) {
    return "Approve the request instead — that's what checks the slot is still free and records their payment.";
  }
  if (from === SubscriptionStatus.EXPIRED && to === SubscriptionStatus.ACTIVE) {
    return 'This membership has run out. Renew it to start a new term.';
  }
  if (to === SubscriptionStatus.EXPIRED) {
    return "Memberships expire on their own end date — you can't expire one by hand.";
  }
  return `A ${from.toLowerCase()} membership can't be moved straight to ${to.toLowerCase()}.`;
}

const MS_PER_DAY = 86_400_000;

/**
 * A pause owes the member the time they couldn't play, so resuming pushes the
 * end date out by exactly how long the pause ran. Exact elapsed time, not whole
 * days — a two-hour pause shouldn't hand out a free day.
 */
export function expiryAfterResume(expiresAt: Date, pausedAt: Date | null, now: Date): Date {
  if (!pausedAt) return expiresAt;
  const paused = Math.max(0, now.getTime() - pausedAt.getTime());
  return new Date(expiresAt.getTime() + paused);
}

/** Whole days credited by a pause, for the message the owner reads. */
export function daysCredited(pausedAt: Date | null, now: Date): number {
  if (!pausedAt) return 0;
  return Math.floor(Math.max(0, now.getTime() - pausedAt.getTime()) / MS_PER_DAY);
}

/** How long an unanswered player request holds its court slot before it lapses. */
export const PENDING_REQUEST_TTL_HOURS = 48;
