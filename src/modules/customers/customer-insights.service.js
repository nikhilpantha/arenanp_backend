"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
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
exports.CustomerInsightsService = void 0;
var common_1 = require("@nestjs/common");
var nepal_time_1 = require("../../common/utils/nepal-time");
var loyalty_util_1 = require("../offers/loyalty.util");
/** How many "favourites" the profile shows before it stops being a preference. */
var TOP_N = 4;
var MS_PER_DAY = 86400000;
var CustomerInsightsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomerInsightsService = _classThis = /** @class */ (function () {
        function CustomerInsightsService_1(customers, insights) {
            this.customers = customers;
            this.insights = insights;
        }
        CustomerInsightsService_1.prototype.getInsights = function (venueId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var customer, _a, totals, courts, slots, months, loyalty;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.customers.findOne(venueId, customerId)];
                        case 1:
                            customer = _e.sent();
                            if (!customer)
                                throw new common_1.NotFoundException('Customer not found for this venue.');
                            return [4 /*yield*/, Promise.all([
                                    this.insights.totals(venueId, customerId),
                                    this.insights.courtPlay(venueId, customerId),
                                    this.insights.slotPlay(venueId, customerId),
                                    this.insights.monthlyPlay(venueId, customerId),
                                    this.loyaltyStanding(venueId, customerId),
                                ])];
                        case 2:
                            _a = _e.sent(), totals = _a[0], courts = _a[1], slots = _a[2], months = _a[3], loyalty = _a[4];
                            return [2 /*return*/, __assign(__assign(__assign({}, countsOf(totals)), moneyOf(totals)), { hoursPlayed: round(totals.playedMinutes / 60, 1), avgSessionMinutes: totals.visits > 0 ? Math.round(totals.playedMinutes / totals.visits) : 0, visitsPerMonth: visitsPerMonth(totals), firstVisitAt: (_b = totals.firstVisitAt) !== null && _b !== void 0 ? _b : undefined, lastVisitAt: (_c = totals.lastVisitAt) !== null && _c !== void 0 ? _c : undefined, nextVisitAt: (_d = totals.nextVisitAt) !== null && _d !== void 0 ? _d : undefined, topCourts: topCourts(courts), topSports: topSports(courts), weekdayGames: weekdayGames(slots), hourGames: hourGames(slots), monthlyPlay: lastTwelveMonths(months), loyalty: loyalty })];
                    }
                });
            });
        };
        /**
         * Where they stand on the venue's every-Nth free game. Folded into insights
         * rather than read from `venueLoyaltyStatus` so the whole profile needs only
         * `customers:read` — front desk staff without `bookings:read` still see it.
         */
        CustomerInsightsService_1.prototype.loyaltyStanding = function (venueId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var offer, every, _a, completed, redeemedMap, played, redeemed, readiness;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.customers.findLoyaltyOffer(venueId)];
                        case 1:
                            offer = _e.sent();
                            every = (_b = offer === null || offer === void 0 ? void 0 : offer.everyGames) !== null && _b !== void 0 ? _b : null;
                            return [4 /*yield*/, Promise.all([
                                    this.customers.completedByCustomer([customerId]),
                                    offer
                                        ? this.customers.redeemedByCustomer([customerId], offer.id)
                                        : Promise.resolve(new Map()),
                                ])];
                        case 2:
                            _a = _e.sent(), completed = _a[0], redeemedMap = _a[1];
                            played = (_c = completed.get(customerId)) !== null && _c !== void 0 ? _c : 0;
                            redeemed = (_d = redeemedMap.get(customerId)) !== null && _d !== void 0 ? _d : 0;
                            if (!offer || !every) {
                                return [2 /*return*/, { configured: false, gamesPlayed: played, toNext: 0, ready: false, redeemed: redeemed }];
                            }
                            readiness = (0, loyalty_util_1.computeLoyaltyReadiness)(every, played, redeemed);
                            return [2 /*return*/, {
                                    configured: true,
                                    every: every,
                                    gamesPlayed: readiness.gamesPlayed,
                                    toNext: readiness.toNext,
                                    ready: readiness.ready,
                                    redeemed: redeemed,
                                    offerId: offer.id,
                                }];
                    }
                });
            });
        };
        return CustomerInsightsService_1;
    }());
    __setFunctionName(_classThis, "CustomerInsightsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerInsightsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerInsightsService = _classThis;
}();
exports.CustomerInsightsService = CustomerInsightsService;
function countsOf(t) {
    return {
        totalBookings: t.totalBookings,
        visits: t.visits,
        completed: t.completed,
        cancelled: t.cancelled,
        noShow: t.noShow,
        upcoming: t.upcoming,
        freeGames: t.freeGames,
        walkInBookings: t.walkInBookings,
        onlineBookings: t.onlineBookings,
        membershipBookings: t.membershipBookings,
    };
}
function moneyOf(t) {
    return {
        lifetimeBilled: round(t.billed, 2),
        lifetimePaid: round(t.paid, 2),
        // Never negative: an overpayment is a refund question, not a debt.
        outstanding: round(Math.max(0, t.billed - t.paid), 2),
        avgSpendPerVisit: t.visits > 0 ? round(t.paid / t.visits, 2) : 0,
        totalDiscount: round(t.discount, 2),
    };
}
/**
 * Regularity: visits ÷ months they've been a customer here. Anchored on the
 * first visit (not on `createdAt`) so a record backfilled today doesn't read
 * as a two-year relationship, and floored at one month so a first-week regular
 * isn't shown an absurd rate.
 */
function visitsPerMonth(t) {
    if (!t.firstVisitAt || t.visits === 0)
        return 0;
    var days = (Date.now() - t.firstVisitAt.getTime()) / MS_PER_DAY;
    var months = Math.max(1, days / 30.44);
    return round(t.visits / months, 1);
}
function topCourts(rows) {
    return rows
        .slice(0, TOP_N)
        .map(function (r) { return ({ label: "".concat(r.courtName, " \u00B7 ").concat(r.sportName), games: r.games }); });
}
/** Courts roll up to sports — a player's real preference is the game, not the pitch. */
function topSports(rows) {
    var _a;
    var bySport = new Map();
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var r = rows_1[_i];
        bySport.set(r.sportName, ((_a = bySport.get(r.sportName)) !== null && _a !== void 0 ? _a : 0) + r.games);
    }
    return __spreadArray([], bySport.entries(), true).sort(function (a, b) { return b[1] - a[1] || a[0].localeCompare(b[0]); })
        .slice(0, TOP_N)
        .map(function (_a) {
        var label = _a[0], games = _a[1];
        return ({ label: label, games: games });
    });
}
/** Seven slots, Sunday-first — the shape the console's weekday strip expects. */
function weekdayGames(rows) {
    var week = [0, 0, 0, 0, 0, 0, 0];
    for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
        var r = rows_2[_i];
        week[r.weekday] += r.games;
    }
    return week;
}
/** Only the hours they've actually played, ascending — an empty hour is not a preference. */
function hourGames(rows) {
    var _a;
    var byHour = new Map();
    for (var _i = 0, rows_3 = rows; _i < rows_3.length; _i++) {
        var r = rows_3[_i];
        byHour.set(r.hour, ((_a = byHour.get(r.hour)) !== null && _a !== void 0 ? _a : 0) + r.games);
    }
    return __spreadArray([], byHour.entries(), true).sort(function (a, b) { return a[0] - b[0]; })
        .map(function (_a) {
        var hour = _a[0], games = _a[1];
        return ({ hour: hour, games: games });
    });
}
/**
 * Exactly twelve months ending this Nepal month, gaps filled with zeroes — a
 * trend strip has to keep its shape when someone stops playing for a while.
 */
function lastTwelveMonths(rows) {
    var _a, _b;
    var found = new Map(rows.map(function (r) { return [r.month, r]; }));
    var nepalNow = new Date(Date.now() + nepal_time_1.NEPAL_UTC_OFFSET_MINUTES * 60000);
    var out = [];
    for (var back = 11; back >= 0; back--) {
        var d = new Date(Date.UTC(nepalNow.getUTCFullYear(), nepalNow.getUTCMonth() - back, 1));
        var month = d.toISOString().slice(0, 7);
        var hit = found.get(month);
        out.push({ month: month, games: (_a = hit === null || hit === void 0 ? void 0 : hit.games) !== null && _a !== void 0 ? _a : 0, spend: round((_b = hit === null || hit === void 0 ? void 0 : hit.spend) !== null && _b !== void 0 ? _b : 0, 2) });
    }
    return out;
}
function round(value, places) {
    var factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
}
