"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardService = void 0;
var common_1 = require("@nestjs/common");
var TREND_DAYS = 14;
/**
 * Builds the super-admin dashboard payload.
 *
 * Counts/aggregates from every shipped module are pulled live. Sections tied
 * to a module that hasn't landed (refunds, tournaments) stay zero / empty and
 * will be wired up when those features arrive.
 */
var AdminDashboardService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminDashboardService = _classThis = /** @class */ (function () {
        function AdminDashboardService_1(repo) {
            this.repo = repo;
        }
        AdminDashboardService_1.prototype.getOverview = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, totalUsers, pendingOrganizerVerifications, totalVenues, pendingVenueApprovals, pendingRefunds, activeTournaments, totalBookings, todayBookings, totalRevenue, bookingsByDay, revenueByDay, popularSports, popularCities, recentBookingsRows, recentPaymentsRows, kpis, bookingsByDayMap, revenueByDayMap, bookingTrend, revenueTrend, recentBookings, recentPayments;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.repo.countUsers(),
                                this.repo.countPendingOrganizerVerifications(),
                                this.repo.countApprovedVenues(),
                                this.repo.countPendingVenueApprovals(),
                                this.repo.countPendingRefunds(),
                                this.repo.countActiveTournaments(),
                                this.repo.countBookings(),
                                this.repo.countBookingsCreatedToday(),
                                this.repo.sumSuccessfulPaymentAmount(),
                                this.repo.bookingsByDay(TREND_DAYS),
                                this.repo.revenueByDay(TREND_DAYS),
                                this.repo.popularSportsByBooking(5),
                                this.repo.popularCitiesByBooking(5),
                                this.repo.recentBookings(5),
                                this.repo.recentPayments(5),
                            ])];
                        case 1:
                            _a = _b.sent(), totalUsers = _a[0], pendingOrganizerVerifications = _a[1], totalVenues = _a[2], pendingVenueApprovals = _a[3], pendingRefunds = _a[4], activeTournaments = _a[5], totalBookings = _a[6], todayBookings = _a[7], totalRevenue = _a[8], bookingsByDay = _a[9], revenueByDay = _a[10], popularSports = _a[11], popularCities = _a[12], recentBookingsRows = _a[13], recentPaymentsRows = _a[14];
                            kpis = {
                                totalUsers: totalUsers,
                                totalVenues: totalVenues,
                                totalBookings: totalBookings,
                                totalRevenue: totalRevenue,
                                pendingOrganizerVerifications: pendingOrganizerVerifications,
                                pendingVenueApprovals: pendingVenueApprovals,
                                pendingRefunds: pendingRefunds,
                                activeTournaments: activeTournaments,
                                todayBookings: todayBookings,
                            };
                            bookingsByDayMap = new Map(bookingsByDay.map(function (r) { return [r.date, r.count]; }));
                            revenueByDayMap = new Map(revenueByDay.map(function (r) { return [r.date, r.total]; }));
                            bookingTrend = this.dailySeries(TREND_DAYS, function (date) {
                                var _a;
                                return ({
                                    date: date,
                                    bookings: (_a = bookingsByDayMap.get(date)) !== null && _a !== void 0 ? _a : 0,
                                });
                            });
                            revenueTrend = this.dailySeries(TREND_DAYS, function (date) {
                                var _a;
                                return ({
                                    date: date,
                                    revenue: (_a = revenueByDayMap.get(date)) !== null && _a !== void 0 ? _a : 0,
                                });
                            });
                            recentBookings = recentBookingsRows.map(function (b) {
                                var _a, _b, _c;
                                return ({
                                    id: b.id,
                                    userFullName: (_c = (_b = (_a = b.user) === null || _a === void 0 ? void 0 : _a.fullName) !== null && _b !== void 0 ? _b : b.customerName) !== null && _c !== void 0 ? _c : undefined,
                                    venueName: b.venue.name,
                                    sport: b.court.sport.name,
                                    amount: Number(b.total.toString()),
                                    status: b.status,
                                    createdAt: b.createdAt,
                                });
                            });
                            recentPayments = recentPaymentsRows.map(function (p) {
                                var _a;
                                return ({
                                    id: p.id,
                                    userFullName: (_a = p.user.fullName) !== null && _a !== void 0 ? _a : undefined,
                                    provider: p.provider,
                                    amount: Number(p.amount.toString()),
                                    status: p.status,
                                    createdAt: p.createdAt,
                                });
                            });
                            return [2 /*return*/, {
                                    kpis: kpis,
                                    recentBookings: recentBookings,
                                    recentPayments: recentPayments,
                                    bookingTrend: bookingTrend,
                                    revenueTrend: revenueTrend,
                                    popularSports: popularSports.map(function (r) { return ({ sport: r.sport, bookings: r.count }); }),
                                    popularCities: popularCities.map(function (r) { return ({ city: r.city, bookings: r.count }); }),
                                }];
                    }
                });
            });
        };
        /** Build a continuous N-day series ending today so charts always render even with sparse data. */
        AdminDashboardService_1.prototype.dailySeries = function (days, build) {
            var out = [];
            var today = new Date();
            today.setUTCHours(0, 0, 0, 0);
            for (var i = days - 1; i >= 0; i--) {
                var d = new Date(today);
                d.setUTCDate(d.getUTCDate() - i);
                out.push(build(d.toISOString().slice(0, 10)));
            }
            return out;
        };
        return AdminDashboardService_1;
    }());
    __setFunctionName(_classThis, "AdminDashboardService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDashboardService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDashboardService = _classThis;
}();
exports.AdminDashboardService = AdminDashboardService;
