"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDashboardRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
/**
 * Repository for the super-admin dashboard.
 *
 * Pulls counts and aggregates from every module that has shipped so far
 * (users, venues, organizer / venue-owner verifications, bookings, payments).
 * Sections backed by modules that haven't landed (refunds, tournaments) stay
 * as `0` / `[]` and will be wired up by those modules.
 */
var AdminDashboardRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminDashboardRepository = _classThis = /** @class */ (function () {
        function AdminDashboardRepository_1(prisma) {
            this.prisma = prisma;
        }
        AdminDashboardRepository_1.prototype.countUsers = function () {
            return this.prisma.user.count();
        };
        AdminDashboardRepository_1.prototype.countPendingOrganizerVerifications = function () {
            return this.prisma.userCapability.count({
                where: { type: client_1.CapabilityType.ORGANIZER, status: client_1.CapabilityStatus.PENDING_VERIFICATION },
            });
        };
        AdminDashboardRepository_1.prototype.countApprovedVenues = function () {
            return this.prisma.venue.count({
                where: { verificationStatus: client_1.VenueVerificationStatus.APPROVED },
            });
        };
        AdminDashboardRepository_1.prototype.countPendingVenueApprovals = function () {
            return this.prisma.venue.count({
                where: { verificationStatus: client_1.VenueVerificationStatus.PENDING },
            });
        };
        AdminDashboardRepository_1.prototype.countPendingRefunds = function () {
            return this.prisma.refundRequest.count({ where: { status: client_1.RefundStatus.REQUESTED } });
        };
        AdminDashboardRepository_1.prototype.countActiveTournaments = function () {
            return this.prisma.tournament.count({ where: { status: client_1.TournamentStatus.ACTIVE } });
        };
        AdminDashboardRepository_1.prototype.countBookings = function () {
            return this.prisma.booking.count();
        };
        AdminDashboardRepository_1.prototype.countBookingsCreatedToday = function () {
            var start = new Date();
            start.setUTCHours(0, 0, 0, 0);
            var end = new Date(start);
            end.setUTCDate(end.getUTCDate() + 1);
            return this.prisma.booking.count({
                where: { createdAt: { gte: start, lt: end } },
            });
        };
        AdminDashboardRepository_1.prototype.sumSuccessfulPaymentAmount = function () {
            return __awaiter(this, void 0, void 0, function () {
                var agg;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.payment.aggregate({
                                _sum: { amount: true },
                                where: { status: client_1.PaymentStatus.SUCCEEDED },
                            })];
                        case 1:
                            agg = _c.sent();
                            return [2 /*return*/, Number((_b = (_a = agg._sum.amount) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0')];
                    }
                });
            });
        };
        /** Booking count per day for the last N days (UTC). */
        AdminDashboardRepository_1.prototype.bookingsByDay = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      SELECT date_trunc('day', \"createdAt\")::date AS date,\n             COUNT(*)::bigint                     AS count\n      FROM bookings\n      WHERE \"createdAt\" >= NOW() - (", "::int * INTERVAL '1 day')\n      GROUP BY date\n      ORDER BY date ASC\n    "], ["\n      SELECT date_trunc('day', \"createdAt\")::date AS date,\n             COUNT(*)::bigint                     AS count\n      FROM bookings\n      WHERE \"createdAt\" >= NOW() - (", "::int * INTERVAL '1 day')\n      GROUP BY date\n      ORDER BY date ASC\n    "])), days)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (r) { return ({ date: r.date.toISOString().slice(0, 10), count: Number(r.count) }); })];
                    }
                });
            });
        };
        /** Successful-payment revenue per day for the last N days (UTC). */
        AdminDashboardRepository_1.prototype.revenueByDay = function (days) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      SELECT date_trunc('day', \"paidAt\")::date AS date,\n             COALESCE(SUM(amount), 0)          AS total\n      FROM payments\n      WHERE status = 'SUCCEEDED'\n        AND \"paidAt\" IS NOT NULL\n        AND \"paidAt\" >= NOW() - (", "::int * INTERVAL '1 day')\n      GROUP BY date\n      ORDER BY date ASC\n    "], ["\n      SELECT date_trunc('day', \"paidAt\")::date AS date,\n             COALESCE(SUM(amount), 0)          AS total\n      FROM payments\n      WHERE status = 'SUCCEEDED'\n        AND \"paidAt\" IS NOT NULL\n        AND \"paidAt\" >= NOW() - (", "::int * INTERVAL '1 day')\n      GROUP BY date\n      ORDER BY date ASC\n    "])), days)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (r) { return ({
                                    date: r.date.toISOString().slice(0, 10),
                                    total: Number(r.total.toString()),
                                }); })];
                    }
                });
            });
        };
        /** Top sports by booking volume — joins booking -> court -> sport for the label. */
        AdminDashboardRepository_1.prototype.popularSportsByBooking = function (limit) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$queryRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      SELECT s.name AS sport, COUNT(*)::bigint AS count\n      FROM bookings b\n      JOIN courts c ON c.id = b.\"courtId\"\n      JOIN sports s ON s.id = c.\"sportId\"\n      GROUP BY s.name\n      ORDER BY count DESC\n      LIMIT ", "\n    "], ["\n      SELECT s.name AS sport, COUNT(*)::bigint AS count\n      FROM bookings b\n      JOIN courts c ON c.id = b.\"courtId\"\n      JOIN sports s ON s.id = c.\"sportId\"\n      GROUP BY s.name\n      ORDER BY count DESC\n      LIMIT ", "\n    "])), limit)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (r) { return ({ sport: r.sport, count: Number(r.count) }); })];
                    }
                });
            });
        };
        /** Top cities by booking volume — joins booking -> venue for the city. */
        AdminDashboardRepository_1.prototype.popularCitiesByBooking = function (limit) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$queryRaw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      SELECT v.city AS city, COUNT(*)::bigint AS count\n      FROM bookings b\n      JOIN venues v ON v.id = b.\"venueId\"\n      WHERE v.city IS NOT NULL\n      GROUP BY v.city\n      ORDER BY count DESC\n      LIMIT ", "\n    "], ["\n      SELECT v.city AS city, COUNT(*)::bigint AS count\n      FROM bookings b\n      JOIN venues v ON v.id = b.\"venueId\"\n      WHERE v.city IS NOT NULL\n      GROUP BY v.city\n      ORDER BY count DESC\n      LIMIT ", "\n    "])), limit)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (r) { return ({ city: r.city, count: Number(r.count) }); })];
                    }
                });
            });
        };
        AdminDashboardRepository_1.prototype.recentBookings = function (limit) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.booking.findMany({
                            take: limit,
                            orderBy: { createdAt: 'desc' },
                            include: {
                                user: { select: { id: true, fullName: true } },
                                venue: { select: { id: true, name: true } },
                                court: { select: { id: true, sport: { select: { name: true } } } },
                            },
                        })];
                });
            });
        };
        AdminDashboardRepository_1.prototype.recentPayments = function (limit) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.payment.findMany({
                            take: limit,
                            orderBy: { createdAt: 'desc' },
                            include: { user: { select: { id: true, fullName: true } } },
                        })];
                });
            });
        };
        return AdminDashboardRepository_1;
    }());
    __setFunctionName(_classThis, "AdminDashboardRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDashboardRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDashboardRepository = _classThis;
}();
exports.AdminDashboardRepository = AdminDashboardRepository;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
