"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PENDING_REQUEST_TTL_HOURS = void 0;
exports.transitionError = transitionError;
exports.expiryAfterResume = expiryAfterResume;
exports.daysCredited = daysCredited;
var client_1 = require("@prisma/client");
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
var ALLOWED = (_a = {},
    _a[client_1.SubscriptionStatus.PENDING] = [client_1.SubscriptionStatus.CANCELLED],
    _a[client_1.SubscriptionStatus.SCHEDULED] = [client_1.SubscriptionStatus.CANCELLED],
    _a[client_1.SubscriptionStatus.ACTIVE] = [client_1.SubscriptionStatus.PAUSED, client_1.SubscriptionStatus.CANCELLED],
    _a[client_1.SubscriptionStatus.PAUSED] = [client_1.SubscriptionStatus.ACTIVE, client_1.SubscriptionStatus.CANCELLED],
    _a[client_1.SubscriptionStatus.EXPIRED] = [client_1.SubscriptionStatus.CANCELLED],
    _a[client_1.SubscriptionStatus.CANCELLED] = [],
    _a);
/** Why this particular change is refused — null when it's allowed. */
function transitionError(from, to) {
    if (from === to)
        return null;
    if (ALLOWED[from].includes(to))
        return null;
    if (from === client_1.SubscriptionStatus.CANCELLED) {
        return 'This membership was cancelled and its slot released. Add a new one instead.';
    }
    if (from === client_1.SubscriptionStatus.PENDING && to === client_1.SubscriptionStatus.ACTIVE) {
        return "Approve the request instead — that's what checks the slot is still free and records their payment.";
    }
    if (from === client_1.SubscriptionStatus.EXPIRED && to === client_1.SubscriptionStatus.ACTIVE) {
        return 'This membership has run out. Renew it to start a new term.';
    }
    if (to === client_1.SubscriptionStatus.EXPIRED) {
        return "Memberships expire on their own end date — you can't expire one by hand.";
    }
    return "A ".concat(from.toLowerCase(), " membership can't be moved straight to ").concat(to.toLowerCase(), ".");
}
var MS_PER_DAY = 86400000;
/**
 * A pause owes the member the time they couldn't play, so resuming pushes the
 * end date out by exactly how long the pause ran. Exact elapsed time, not whole
 * days — a two-hour pause shouldn't hand out a free day.
 */
function expiryAfterResume(expiresAt, pausedAt, now) {
    if (!pausedAt)
        return expiresAt;
    var paused = Math.max(0, now.getTime() - pausedAt.getTime());
    return new Date(expiresAt.getTime() + paused);
}
/** Whole days credited by a pause, for the message the owner reads. */
function daysCredited(pausedAt, now) {
    if (!pausedAt)
        return 0;
    return Math.floor(Math.max(0, now.getTime() - pausedAt.getTime()) / MS_PER_DAY);
}
/** How long an unanswered player request holds its court slot before it lapses. */
exports.PENDING_REQUEST_TTL_HOURS = 48;
