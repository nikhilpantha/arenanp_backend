"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugifyVenueName = slugifyVenueName;
exports.uniqueVenueSlug = uniqueVenueSlug;
/** Reserved handles: they'd read as platform infrastructure in an email domain. */
var RESERVED = new Set([
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
var MAX_LENGTH = 40;
/**
 * "Lumbini Futsal House" → "lumbini-futsal-house". Diacritics are folded, every
 * run of non-alphanumerics collapses to a single hyphen, and the result is
 * trimmed to a length that still fits comfortably in an email domain.
 */
function slugifyVenueName(name) {
    var base = name
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
function uniqueVenueSlug(name_1, isTaken_1) {
    return __awaiter(this, arguments, void 0, function (name, isTaken, maxAttempts) {
        var base, n, candidate;
        if (maxAttempts === void 0) { maxAttempts = 50; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    base = slugifyVenueName(name);
                    return [4 /*yield*/, isTaken(base)];
                case 1:
                    if (!(_a.sent()))
                        return [2 /*return*/, base];
                    n = 2;
                    _a.label = 2;
                case 2:
                    if (!(n <= maxAttempts)) return [3 /*break*/, 5];
                    candidate = "".concat(base, "-").concat(n);
                    return [4 /*yield*/, isTaken(candidate)];
                case 3:
                    if (!(_a.sent()))
                        return [2 /*return*/, candidate];
                    _a.label = 4;
                case 4:
                    n++;
                    return [3 /*break*/, 2];
                case 5: 
                // Fifty venues with one name is not a real venue estate; it's a runaway loop
                // or an attack. Fail loudly rather than spinning.
                throw new Error("Could not find a free slug for \"".concat(name, "\" after ").concat(maxAttempts, " attempts."));
            }
        });
    });
}
