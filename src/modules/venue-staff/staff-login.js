"use strict";
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
exports.staffLocalPart = staffLocalPart;
exports.staffEmailDomain = staffEmailDomain;
exports.uniqueStaffEmail = uniqueStaffEmail;
exports.generateStarterPassword = generateStarterPassword;
var node_crypto_1 = require("node:crypto");
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
var EMAIL_DOMAIN_SUFFIX = 'arenanp.com';
var MAX_LOCAL_LENGTH = 24;
/**
 * Local parts that would read as platform infrastructure rather than a person.
 * `ram@…` is fine; `admin@…` and `support@…` are not, whoever asks for them.
 */
var RESERVED_LOCAL = new Set([
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
function staffLocalPart(fullName) {
    var base = fullName
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '.')
        .replace(/^\.+|\.+$/g, '')
        .slice(0, MAX_LOCAL_LENGTH)
        .replace(/\.+$/, '');
    return base.length > 0 && !RESERVED_LOCAL.has(base) ? base : 'staff';
}
function staffEmailDomain(venueSlug) {
    return "".concat(venueSlug, ".").concat(EMAIL_DOMAIN_SUFFIX);
}
/**
 * The address for this person at this venue, avoiding any already taken.
 *
 * `isTaken` checks the whole platform, not the venue: `User.email` is globally
 * unique, so two people called Ram at two venues are already separated by the
 * slug in the domain, and the counter only ever fires for two Rams at the SAME
 * venue — `ram2@…`, `ram3@…`.
 */
function uniqueStaffEmail(fullName_1, venueSlug_1, isTaken_1) {
    return __awaiter(this, arguments, void 0, function (fullName, venueSlug, isTaken, maxAttempts) {
        var local, domain, first, n, candidate;
        if (maxAttempts === void 0) { maxAttempts = 50; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    local = staffLocalPart(fullName);
                    domain = staffEmailDomain(venueSlug);
                    first = "".concat(local, "@").concat(domain);
                    return [4 /*yield*/, isTaken(first)];
                case 1:
                    if (!(_a.sent()))
                        return [2 /*return*/, first];
                    n = 2;
                    _a.label = 2;
                case 2:
                    if (!(n <= maxAttempts)) return [3 /*break*/, 5];
                    candidate = "".concat(local).concat(n, "@").concat(domain);
                    return [4 /*yield*/, isTaken(candidate)];
                case 3:
                    if (!(_a.sent()))
                        return [2 /*return*/, candidate];
                    _a.label = 4;
                case 4:
                    n++;
                    return [3 /*break*/, 2];
                case 5: throw new Error("Could not mint a free login for \"".concat(fullName, "\" at ").concat(venueSlug, "."));
            }
        });
    });
}
// Ambiguous characters are left out on purpose: this password gets written on
// paper or read down a phone line, and "was that l or 1?" turns into a support
// call. Each group is drawn from separately so the result always satisfies the
// password policy rather than satisfying it by luck.
var LOWER = 'abcdefghijkmnpqrstuvwxyz';
var UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
var DIGITS = '23456789';
var SYMBOLS = '!@#$%&*?';
/**
 * A starter password strong enough to be the only thing guarding a guessable
 * address, and still transcribable — e.g. `Kpq7-vnx9!`.
 */
function generateStarterPassword() {
    var _a;
    var pick = function (set, count) {
        return Array.from({ length: count }, function () { return set[(0, node_crypto_1.randomInt)(set.length)]; }).join('');
    };
    // Shuffled so the character classes don't always land in the same positions.
    var chars = [pick(UPPER, 1), pick(DIGITS, 2), pick(SYMBOLS, 1), pick(LOWER, 6)]
        .join('')
        .split('');
    for (var i = chars.length - 1; i > 0; i--) {
        var j = (0, node_crypto_1.randomInt)(i + 1);
        _a = [chars[j], chars[i]], chars[i] = _a[0], chars[j] = _a[1];
    }
    // A hyphen in the middle gives the eye somewhere to rest when copying it.
    return "".concat(chars.slice(0, 5).join(''), "-").concat(chars.slice(5).join(''));
}
