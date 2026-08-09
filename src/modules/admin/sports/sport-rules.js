"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SLOT_DURATIONS = void 0;
exports.normaliseTags = normaliseTags;
exports.normaliseSlotDurations = normaliseSlotDurations;
exports.deriveFeatures = deriveFeatures;
exports.patch = patch;
exports.assertSportConfig = assertSportConfig;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
/**
 * Pure rules for the sport catalogue. Kept out of the service because they are
 * the contract venue setup depends on: an owner's setup screen renders itself
 * from these fields, so a half-configured sport would break a screen nobody on
 * the admin side ever sees.
 */
/** Trim, drop blanks, and de-duplicate (case-insensitive) a catalogue list. */
function normaliseTags(values) {
    var seen = new Set();
    var out = [];
    for (var _i = 0, _a = values !== null && values !== void 0 ? values : []; _i < _a.length; _i++) {
        var raw = _a[_i];
        var value = raw.trim();
        var key = value.toLowerCase();
        if (value && !seen.has(key)) {
            seen.add(key);
            out.push(value);
        }
    }
    return out;
}
/** Fallback when an admin clears the list — a sport needs at least one option. */
exports.DEFAULT_SLOT_DURATIONS = [30, 60, 90, 120];
/** Keep positive whole minutes, de-duplicate, and sort ascending. */
function normaliseSlotDurations(durations) {
    var cleaned = Array.from(new Set((durations !== null && durations !== void 0 ? durations : []).filter(function (d) { return Number.isInteger(d) && d > 0; }))).sort(function (a, b) { return a - b; });
    return cleaned.length ? cleaned : exports.DEFAULT_SLOT_DURATIONS;
}
/**
 * `Sport.features` is derived, never authored. It exists only so the Expo app's
 * venue setup — which still reads one flat chip list — keeps working while the
 * typed catalogues roll out. Drop it once that screen moves over.
 */
function deriveFeatures(parts) {
    return normaliseTags(__spreadArray(__spreadArray(__spreadArray([], parts.surfaces, true), parts.formats, true), parts.courtFeatures, true));
}
/**
 * Resolve one nullable field of a patch. `undefined` means the client didn't
 * mention it, so keep what's stored; an explicit `null` means clear it. Treating
 * both as "keep" is what makes an optional field impossible to unset.
 */
function patch(incoming, current) {
    return incoming === undefined ? current : incoming;
}
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
function assertSportConfig(config) {
    var problems = [];
    var slots = config.slotDurations;
    // ── Consistency ─────────────────────────────────────────────────────────
    if (slots.length && !slots.includes(config.defaultSlotMinutes)) {
        problems.push("set the default slot to one of ".concat(slots.join(', '), " minutes (it is currently ").concat(config.defaultSlotMinutes, ")"));
    }
    var min = config.minDurationMinutes, max = config.maxDurationMinutes;
    if (min != null && max != null && min > max) {
        problems.push("make the minimum duration (".concat(min, ") no longer than the maximum (").concat(max, ")"));
    }
    if (min != null && slots.length && min < Math.min.apply(Math, slots)) {
        problems.push("raise the minimum duration to at least the shortest slot (".concat(Math.min.apply(Math, slots), " minutes)"));
    }
    // ── Completeness — only blocks going live ───────────────────────────────
    if (config.isActive) {
        if (!slots.length) {
            problems.push('add at least one slot duration');
        }
        if (!config.unitLabel.trim() || !config.unitLabelPlural.trim()) {
            problems.push('name the bookable unit, singular and plural (e.g. "court" / "courts")');
        }
        if (config.bookingMode === client_1.SportBookingMode.CAPACITY && !config.defaultCapacity) {
            problems.push('set the places per slot — a capacity sport sells N places rather than the whole surface');
        }
    }
    if (!problems.length)
        return;
    var verb = config.isActive ? 'activate' : 'save';
    throw new common_1.BadRequestException("Cannot ".concat(verb, " \"").concat(config.name, "\" \u2014 ").concat(joinClauses(problems), "."));
}
function joinClauses(items) {
    if (items.length === 1)
        return items[0];
    return "".concat(items.slice(0, -1).join('; '), "; and ").concat(items[items.length - 1]);
}
