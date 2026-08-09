"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var nepal_time_1 = require("../../common/utils/nepal-time");
/** Decimal | number | null → number. */
function num(v) {
    if (v === null || v === undefined)
        return 0;
    return typeof v === 'number' ? v : Number(v.toString());
}
/** A method counts as "cash" when explicitly CASH or unset (the desk default for walk-ins). */
function isCash(method) {
    return method === null || method === client_1.PaymentProvider.CASH;
}
var NOT_CANCELLED = { not: client_1.BookingStatus.CANCELLED };
/** Nepal offset for hour-of-day bucketing in raw SQL (UTC + 5h45m). */
var NEPAL_INTERVAL = client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["interval '345 minutes'"], ["interval '345 minutes'"])));
/**
 * A Date as the UTC wall-clock string its `timestamp without time zone` column
 * stores. Handing the driver a JS Date lets it localise the value — on a
 * UTC+05:45 machine that moves a midnight bound and silently drops the rows
 * sitting on it. Bound as a plain string and cast in the SQL text, it compares
 * exactly. (Bound as a nested `Prisma.sql` fragment it does NOT — hence the
 * `::timestamp` living in the query rather than in here.)
 */
function ts(d) {
    return d.toISOString().replace('Z', '');
}
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * Every bucket start in [gte, lt), aligned the way Postgres `date_trunc` aligns:
 * weeks to Monday, months to the 1st. Walking the same alignment as the SQL is
 * what keeps the gap-fill lined up with the rows it is filling around.
 */
function bucketStarts(gte, lt, bucket) {
    var out = [];
    var cursor = new Date(gte);
    if (bucket === 'month') {
        cursor.setUTCDate(1);
    }
    else if (bucket === 'week') {
        // date_trunc('week') is ISO: Monday-based.
        var dow = (cursor.getUTCDay() + 6) % 7;
        cursor.setUTCDate(cursor.getUTCDate() - dow);
    }
    cursor.setUTCHours(0, 0, 0, 0);
    while (cursor < lt) {
        out.push(new Date(cursor));
        if (bucket === 'day')
            cursor.setUTCDate(cursor.getUTCDate() + 1);
        else if (bucket === 'week')
            cursor.setUTCDate(cursor.getUTCDate() + 7);
        else
            cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
    return out;
}
function bucketLabel(d, bucket) {
    var day = d.getUTCDate();
    var mon = MONTHS[d.getUTCMonth()];
    if (bucket === 'month')
        return "".concat(mon, " ").concat(d.getUTCFullYear());
    if (bucket === 'week')
        return "w/c ".concat(day, " ").concat(mon);
    return "".concat(day, " ").concat(mon);
}
/**
 * Read-only finance aggregations for a single venue, plus expense / cash-close writes.
 *
 * Income is derived live from the existing money rails (no income table):
 *  - bookings   → `amountPaid` bucketed by `startAt` (the play date), matching the
 *                 booking summary's "revenueToday".
 *  - memberships → `subscription_payments.amount` bucketed by `createdAt` (paid date).
 * `total` is billed, not collected, so it only feeds receivables/AOV — never income.
 */
var FinanceRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FinanceRepository = _classThis = /** @class */ (function () {
        function FinanceRepository_1(prisma) {
            this.prisma = prisma;
        }
        // ─── Summary ────────────────────────────────────────────────────────────────
        FinanceRepository_1.prototype.summary = function (venueId, range) {
            return __awaiter(this, void 0, void 0, function () {
                var gte, lt, bookingWhere, _a, bookingAgg, byMethod, freeAgg, addOnAgg, subPayments, expenseAgg, outstandingAgg, expenseByCat, noShowAgg, bookingIncome, membershipIncome, income, cashIncome, _i, byMethod_1, r, _b, subPayments_1, r, digitalIncome, expensesTotal, outstanding;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            gte = range.gte, lt = range.lt;
                            bookingWhere = {
                                venueId: venueId,
                                startAt: { gte: gte, lt: lt },
                                status: NOT_CANCELLED,
                            };
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.booking.aggregate({
                                        where: bookingWhere,
                                        // `total` is billed (already net of discount), `subtotal` is list price.
                                        // Both are needed so the summary can show gross − discounts = revenue
                                        // as a visible subtraction rather than an implicit one.
                                        _sum: { amountPaid: true, discountAmount: true, total: true, subtotal: true },
                                        _count: true,
                                    }),
                                    this.prisma.booking.groupBy({
                                        by: ['paymentMethod'],
                                        where: bookingWhere,
                                        _sum: { amountPaid: true },
                                    }),
                                    this.prisma.booking.aggregate({
                                        where: __assign(__assign({}, bookingWhere), { freeGame: true }),
                                        _sum: { subtotal: true },
                                        _count: true,
                                    }),
                                    this.prisma.bookingExtra.aggregate({
                                        where: { booking: bookingWhere },
                                        _sum: { price: true },
                                    }),
                                    this.prisma.subscriptionPayment.groupBy({
                                        by: ['method'],
                                        where: { subscription: { venueId: venueId }, status: 'PAID', createdAt: { gte: gte, lt: lt } },
                                        _sum: { amount: true },
                                    }),
                                    this.prisma.expense.aggregate({
                                        where: { venueId: venueId, incurredAt: { gte: gte, lt: lt } },
                                        _sum: { amount: true },
                                    }),
                                    this.prisma.booking.aggregate({
                                        where: {
                                            venueId: venueId,
                                            startAt: { gte: gte, lt: lt },
                                            status: NOT_CANCELLED,
                                            paymentStatus: { not: 'PAID' },
                                        },
                                        _sum: { total: true, amountPaid: true },
                                    }),
                                    this.prisma.expense.groupBy({
                                        by: ['category'],
                                        where: { venueId: venueId, incurredAt: { gte: gte, lt: lt } },
                                        _sum: { amount: true },
                                        _count: true,
                                    }),
                                    // Money kept from customers who never turned up. Shown as its own line so
                                    // an owner can see it rather than wondering why income outran attendance.
                                    this.prisma.booking.aggregate({
                                        where: { venueId: venueId, startAt: { gte: gte, lt: lt }, status: client_1.BookingStatus.NO_SHOW },
                                        _sum: { amountPaid: true },
                                    }),
                                ])];
                        case 1:
                            _a = _c.sent(), bookingAgg = _a[0], byMethod = _a[1], freeAgg = _a[2], addOnAgg = _a[3], subPayments = _a[4], expenseAgg = _a[5], outstandingAgg = _a[6], expenseByCat = _a[7], noShowAgg = _a[8];
                            bookingIncome = num(bookingAgg._sum.amountPaid);
                            membershipIncome = subPayments.reduce(function (s, r) { return s + num(r._sum.amount); }, 0);
                            income = bookingIncome + membershipIncome;
                            cashIncome = 0;
                            for (_i = 0, byMethod_1 = byMethod; _i < byMethod_1.length; _i++) {
                                r = byMethod_1[_i];
                                if (isCash(r.paymentMethod))
                                    cashIncome += num(r._sum.amountPaid);
                            }
                            for (_b = 0, subPayments_1 = subPayments; _b < subPayments_1.length; _b++) {
                                r = subPayments_1[_b];
                                if (isCash(r.method))
                                    cashIncome += num(r._sum.amount);
                            }
                            digitalIncome = income - cashIncome;
                            expensesTotal = num(expenseAgg._sum.amount);
                            outstanding = num(outstandingAgg._sum.total) - num(outstandingAgg._sum.amountPaid);
                            return [2 /*return*/, {
                                    income: income,
                                    bookingIncome: bookingIncome,
                                    membershipIncome: membershipIncome,
                                    addOnRevenue: num(addOnAgg._sum.price),
                                    cashIncome: cashIncome,
                                    digitalIncome: digitalIncome,
                                    revenue: num(bookingAgg._sum.total),
                                    grossRevenue: num(bookingAgg._sum.subtotal),
                                    discountsGiven: num(bookingAgg._sum.discountAmount),
                                    freeGames: { count: freeAgg._count, forgoneValue: num(freeAgg._sum.subtotal) },
                                    expensesTotal: expensesTotal,
                                    expensesByCategory: expenseByCat
                                        .map(function (r) { return ({
                                        category: r.category,
                                        amount: num(r._sum.amount),
                                        count: r._count,
                                    }); })
                                        .sort(function (a, b) { return b.amount - a.amount; }),
                                    netProfit: income - expensesTotal,
                                    outstanding: Math.max(0, outstanding),
                                    bookingsCount: bookingAgg._count,
                                    paidNoShows: num(noShowAgg._sum.amountPaid),
                                }];
                    }
                });
            });
        };
        // ─── Trend (continuous daily series) ─────────────────────────────────────────
        /**
         * Continuous income/expense/profit series, gap-filled so a quiet day is a zero
         * on the chart rather than a missing point the line would smooth over.
         *
         * `bucket` is applied in SQL via date_trunc, and the gap-fill walks the same
         * unit — so a WEEK series lands on week starts and a MONTH series on the 1st,
         * with no drift between the two halves.
         */
        FinanceRepository_1.prototype.trend = function (venueId, range, bucket) {
            return __awaiter(this, void 0, void 0, function () {
                var gte, lt, unit, _a, bookingRows, subRows, expenseRows, income, bookings, expenses, add, key, _i, bookingRows_1, r, _b, subRows_1, r, _c, expenseRows_1, r, out, _d, _e, start, k, inc, exp;
                var _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            gte = range.gte, lt = range.lt;
                            unit = client_1.Prisma.raw("'".concat(bucket, "'"));
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.$queryRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        SELECT to_char(date_trunc(", ", \"startAt\"), 'YYYY-MM-DD') AS date,\n               COALESCE(SUM(\"amountPaid\"), 0)                        AS income,\n               COUNT(*)::bigint                                      AS bookings\n        FROM bookings\n        WHERE \"venueId\" = ", " AND status <> 'CANCELLED'\n          AND \"startAt\" >= ", "::timestamp AND \"startAt\" < ", "::timestamp\n        GROUP BY date"], ["\n        SELECT to_char(date_trunc(", ", \"startAt\"), 'YYYY-MM-DD') AS date,\n               COALESCE(SUM(\"amountPaid\"), 0)                        AS income,\n               COUNT(*)::bigint                                      AS bookings\n        FROM bookings\n        WHERE \"venueId\" = ", " AND status <> 'CANCELLED'\n          AND \"startAt\" >= ", "::timestamp AND \"startAt\" < ", "::timestamp\n        GROUP BY date"])), unit, venueId, ts(gte), ts(lt)),
                                    this.prisma.$queryRaw(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n        SELECT to_char(date_trunc(", ", sp.\"createdAt\"), 'YYYY-MM-DD') AS date,\n               COALESCE(SUM(sp.amount), 0)                                AS income\n        FROM subscription_payments sp\n        JOIN subscriptions s ON s.id = sp.\"subscriptionId\"\n        WHERE s.\"venueId\" = ", " AND sp.status = 'PAID'\n          AND sp.\"createdAt\" >= ", "::timestamp AND sp.\"createdAt\" < ", "::timestamp\n        GROUP BY date"], ["\n        SELECT to_char(date_trunc(", ", sp.\"createdAt\"), 'YYYY-MM-DD') AS date,\n               COALESCE(SUM(sp.amount), 0)                                AS income\n        FROM subscription_payments sp\n        JOIN subscriptions s ON s.id = sp.\"subscriptionId\"\n        WHERE s.\"venueId\" = ", " AND sp.status = 'PAID'\n          AND sp.\"createdAt\" >= ", "::timestamp AND sp.\"createdAt\" < ", "::timestamp\n        GROUP BY date"])), unit, venueId, ts(gte), ts(lt)),
                                    this.prisma.$queryRaw(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n        SELECT to_char(date_trunc(", ", \"incurredAt\"), 'YYYY-MM-DD') AS date,\n               COALESCE(SUM(amount), 0)                                 AS spent\n        FROM expenses\n        WHERE \"venueId\" = ", "\n          AND \"incurredAt\" >= ", "::timestamp AND \"incurredAt\" < ", "::timestamp\n        GROUP BY date"], ["\n        SELECT to_char(date_trunc(", ", \"incurredAt\"), 'YYYY-MM-DD') AS date,\n               COALESCE(SUM(amount), 0)                                 AS spent\n        FROM expenses\n        WHERE \"venueId\" = ", "\n          AND \"incurredAt\" >= ", "::timestamp AND \"incurredAt\" < ", "::timestamp\n        GROUP BY date"])), unit, venueId, ts(gte), ts(lt)),
                                ])];
                        case 1:
                            _a = _j.sent(), bookingRows = _a[0], subRows = _a[1], expenseRows = _a[2];
                            income = new Map();
                            bookings = new Map();
                            expenses = new Map();
                            add = function (m, k, v) { var _a; return m.set(k, ((_a = m.get(k)) !== null && _a !== void 0 ? _a : 0) + v); };
                            key = function (d) { return d.toISOString().slice(0, 10); };
                            for (_i = 0, bookingRows_1 = bookingRows; _i < bookingRows_1.length; _i++) {
                                r = bookingRows_1[_i];
                                add(income, r.date, num(r.income));
                                add(bookings, r.date, Number(r.bookings));
                            }
                            for (_b = 0, subRows_1 = subRows; _b < subRows_1.length; _b++) {
                                r = subRows_1[_b];
                                add(income, r.date, num(r.income));
                            }
                            for (_c = 0, expenseRows_1 = expenseRows; _c < expenseRows_1.length; _c++) {
                                r = expenseRows_1[_c];
                                add(expenses, r.date, num(r.spent));
                            }
                            out = [];
                            for (_d = 0, _e = bucketStarts(gte, lt, bucket); _d < _e.length; _d++) {
                                start = _e[_d];
                                k = key(start);
                                inc = (_f = income.get(k)) !== null && _f !== void 0 ? _f : 0;
                                exp = (_g = expenses.get(k)) !== null && _g !== void 0 ? _g : 0;
                                out.push({
                                    date: k,
                                    label: bucketLabel(start, bucket),
                                    income: inc,
                                    expenses: exp,
                                    profit: inc - exp,
                                    bookings: (_h = bookings.get(k)) !== null && _h !== void 0 ? _h : 0,
                                });
                            }
                            return [2 /*return*/, out];
                    }
                });
            });
        };
        // ─── Performance ─────────────────────────────────────────────────────────────
        FinanceRepository_1.prototype.performance = function (venueId, range) {
            return __awaiter(this, void 0, void 0, function () {
                var gte, lt, days, _a, venue, activeCourts, totals, byCourt, bySport, peakRows, topRows, repeatRow, bookedMinutes, openMin, closeMin, dailyOpenMinutes, capacityMinutes, occupancyPct, avgBookingValue;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            gte = range.gte, lt = range.lt, days = range.days;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.venue.findUnique({
                                        where: { id: venueId },
                                        select: { openTime: true, closeTime: true },
                                    }),
                                    this.prisma.court.count({ where: { venueId: venueId, isActive: true } }),
                                    this.prisma.booking.aggregate({
                                        where: { venueId: venueId, startAt: { gte: gte, lt: lt }, status: NOT_CANCELLED },
                                        _sum: { durationMinutes: true, total: true },
                                        _count: true,
                                    }),
                                    this.prisma.$queryRaw(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n          SELECT c.id AS \"courtId\", c.name AS \"courtName\", s.name AS sport,\n                 COUNT(b.id)::bigint AS bookings, COALESCE(SUM(b.\"amountPaid\"), 0) AS revenue\n          FROM bookings b\n          JOIN courts c ON c.id = b.\"courtId\"\n          JOIN sports s ON s.id = c.\"sportId\"\n          WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n            AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n          GROUP BY c.id, c.name, s.name\n          ORDER BY revenue DESC"], ["\n          SELECT c.id AS \"courtId\", c.name AS \"courtName\", s.name AS sport,\n                 COUNT(b.id)::bigint AS bookings, COALESCE(SUM(b.\"amountPaid\"), 0) AS revenue\n          FROM bookings b\n          JOIN courts c ON c.id = b.\"courtId\"\n          JOIN sports s ON s.id = c.\"sportId\"\n          WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n            AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n          GROUP BY c.id, c.name, s.name\n          ORDER BY revenue DESC"])), venueId, gte, lt),
                                    this.prisma.$queryRaw(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n          SELECT s.name AS sport, COUNT(b.id)::bigint AS bookings,\n                 COALESCE(SUM(b.\"amountPaid\"), 0) AS revenue\n          FROM bookings b\n          JOIN courts c ON c.id = b.\"courtId\"\n          JOIN sports s ON s.id = c.\"sportId\"\n          WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n            AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n          GROUP BY s.name\n          ORDER BY revenue DESC"], ["\n          SELECT s.name AS sport, COUNT(b.id)::bigint AS bookings,\n                 COALESCE(SUM(b.\"amountPaid\"), 0) AS revenue\n          FROM bookings b\n          JOIN courts c ON c.id = b.\"courtId\"\n          JOIN sports s ON s.id = c.\"sportId\"\n          WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n            AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n          GROUP BY s.name\n          ORDER BY revenue DESC"])), venueId, gte, lt),
                                    this.prisma.$queryRaw(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n          SELECT EXTRACT(HOUR FROM (\"startAt\" + ", "))::int AS hour,\n                 COUNT(*)::bigint AS bookings, COALESCE(SUM(\"amountPaid\"), 0) AS revenue\n          FROM bookings\n          WHERE \"venueId\" = ", " AND status <> 'CANCELLED'\n            AND \"startAt\" >= ", " AND \"startAt\" < ", "\n          GROUP BY hour\n          ORDER BY hour"], ["\n          SELECT EXTRACT(HOUR FROM (\"startAt\" + ", "))::int AS hour,\n                 COUNT(*)::bigint AS bookings, COALESCE(SUM(\"amountPaid\"), 0) AS revenue\n          FROM bookings\n          WHERE \"venueId\" = ", " AND status <> 'CANCELLED'\n            AND \"startAt\" >= ", " AND \"startAt\" < ", "\n          GROUP BY hour\n          ORDER BY hour"])), NEPAL_INTERVAL, venueId, gte, lt),
                                    this.prisma.$queryRaw(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n          SELECT MAX(b.\"customerId\") AS \"customerId\",\n                 COALESCE(MAX(c.name), MAX(b.\"customerName\"), 'Walk-in') AS name,\n                 COUNT(*)::bigint AS bookings, COALESCE(SUM(b.\"amountPaid\"), 0) AS spent\n          FROM bookings b\n          LEFT JOIN customers c ON c.id = b.\"customerId\"\n          WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n            AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n          GROUP BY COALESCE(b.\"customerId\", b.\"customerPhone\", b.\"customerName\")\n          ORDER BY spent DESC\n          LIMIT 8"], ["\n          SELECT MAX(b.\"customerId\") AS \"customerId\",\n                 COALESCE(MAX(c.name), MAX(b.\"customerName\"), 'Walk-in') AS name,\n                 COUNT(*)::bigint AS bookings, COALESCE(SUM(b.\"amountPaid\"), 0) AS spent\n          FROM bookings b\n          LEFT JOIN customers c ON c.id = b.\"customerId\"\n          WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n            AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n          GROUP BY COALESCE(b.\"customerId\", b.\"customerPhone\", b.\"customerName\")\n          ORDER BY spent DESC\n          LIMIT 8"])), venueId, gte, lt),
                                    this.prisma.$queryRaw(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n          SELECT (COUNT(*) FILTER (WHERE cnt > 1))::float / NULLIF(COUNT(*), 0) * 100 AS repeat_rate\n          FROM (\n            SELECT COALESCE(b.\"customerId\", b.\"customerPhone\", b.\"customerName\") AS k, COUNT(*) AS cnt\n            FROM bookings b\n            WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n              AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n              AND COALESCE(b.\"customerId\", b.\"customerPhone\", b.\"customerName\") IS NOT NULL\n            GROUP BY k\n          ) t"], ["\n          SELECT (COUNT(*) FILTER (WHERE cnt > 1))::float / NULLIF(COUNT(*), 0) * 100 AS repeat_rate\n          FROM (\n            SELECT COALESCE(b.\"customerId\", b.\"customerPhone\", b.\"customerName\") AS k, COUNT(*) AS cnt\n            FROM bookings b\n            WHERE b.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n              AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n              AND COALESCE(b.\"customerId\", b.\"customerPhone\", b.\"customerName\") IS NOT NULL\n            GROUP BY k\n          ) t"])), venueId, gte, lt),
                                ])];
                        case 1:
                            _a = _d.sent(), venue = _a[0], activeCourts = _a[1], totals = _a[2], byCourt = _a[3], bySport = _a[4], peakRows = _a[5], topRows = _a[6], repeatRow = _a[7];
                            bookedMinutes = num(totals._sum.durationMinutes);
                            openMin = venue ? (0, nepal_time_1.parseHHmmToMinutes)(venue.openTime) : 0;
                            closeMin = venue ? (0, nepal_time_1.parseHHmmToMinutes)(venue.closeTime) : 0;
                            dailyOpenMinutes = Math.max(0, closeMin - openMin);
                            capacityMinutes = activeCourts * dailyOpenMinutes * days;
                            occupancyPct = capacityMinutes > 0 ? (bookedMinutes / capacityMinutes) * 100 : 0;
                            avgBookingValue = totals._count > 0 ? num(totals._sum.total) / totals._count : 0;
                            return [2 /*return*/, {
                                    occupancyPct: occupancyPct,
                                    bookedHours: bookedMinutes / 60,
                                    capacityHours: capacityMinutes / 60,
                                    avgBookingValue: avgBookingValue,
                                    repeatRatePct: (_c = (_b = repeatRow[0]) === null || _b === void 0 ? void 0 : _b.repeat_rate) !== null && _c !== void 0 ? _c : 0,
                                    byCourt: byCourt.map(function (r) { return ({
                                        courtId: r.courtId,
                                        courtName: r.courtName,
                                        sport: r.sport,
                                        bookings: Number(r.bookings),
                                        revenue: num(r.revenue),
                                    }); }),
                                    bySport: bySport.map(function (r) { return ({
                                        sport: r.sport,
                                        bookings: Number(r.bookings),
                                        revenue: num(r.revenue),
                                    }); }),
                                    peakHours: peakRows.map(function (r) { return ({
                                        hour: r.hour,
                                        bookings: Number(r.bookings),
                                        revenue: num(r.revenue),
                                    }); }),
                                    topCustomers: topRows.map(function (r) {
                                        var _a;
                                        return ({
                                            customerId: (_a = r.customerId) !== null && _a !== void 0 ? _a : undefined,
                                            name: r.name,
                                            bookings: Number(r.bookings),
                                            spent: num(r.spent),
                                        });
                                    }),
                                }];
                    }
                });
            });
        };
        // ─── Offer ROI ───────────────────────────────────────────────────────────────
        FinanceRepository_1.prototype.offerPerformance = function (venueId, range) {
            return __awaiter(this, void 0, void 0, function () {
                var gte, lt, _a, offers, freeAgg, list;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            gte = range.gte, lt = range.lt;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.$queryRaw(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n        SELECT o.id AS \"offerId\", o.title, o.code,\n               COUNT(b.id)::bigint AS redemptions,\n               COALESCE(SUM(b.\"discountAmount\" + CASE WHEN b.\"freeGame\" THEN b.subtotal ELSE 0 END), 0) AS given,\n               COALESCE(SUM(b.total), 0) AS driven\n        FROM offers o\n        JOIN bookings b ON b.\"offerId\" = o.id\n        WHERE o.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n          AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n        GROUP BY o.id, o.title, o.code\n        ORDER BY given DESC"], ["\n        SELECT o.id AS \"offerId\", o.title, o.code,\n               COUNT(b.id)::bigint AS redemptions,\n               COALESCE(SUM(b.\"discountAmount\" + CASE WHEN b.\"freeGame\" THEN b.subtotal ELSE 0 END), 0) AS given,\n               COALESCE(SUM(b.total), 0) AS driven\n        FROM offers o\n        JOIN bookings b ON b.\"offerId\" = o.id\n        WHERE o.\"venueId\" = ", " AND b.status <> 'CANCELLED'\n          AND b.\"startAt\" >= ", " AND b.\"startAt\" < ", "\n        GROUP BY o.id, o.title, o.code\n        ORDER BY given DESC"])), venueId, gte, lt),
                                    this.prisma.booking.aggregate({
                                        where: { venueId: venueId, startAt: { gte: gte, lt: lt }, status: NOT_CANCELLED, freeGame: true },
                                        _sum: { subtotal: true },
                                        _count: true,
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), offers = _a[0], freeAgg = _a[1];
                            list = offers.map(function (o) {
                                var _a;
                                return ({
                                    offerId: o.offerId,
                                    title: o.title,
                                    code: (_a = o.code) !== null && _a !== void 0 ? _a : undefined,
                                    redemptions: Number(o.redemptions),
                                    givenAmount: num(o.given),
                                    revenueDriven: num(o.driven),
                                });
                            });
                            return [2 /*return*/, {
                                    offers: list,
                                    freeGamesRedeemed: freeAgg._count,
                                    freeGamesForgoneValue: num(freeAgg._sum.subtotal),
                                    totalGiven: list.reduce(function (s, o) { return s + o.givenAmount; }, 0),
                                    totalDriven: list.reduce(function (s, o) { return s + o.revenueDriven; }, 0),
                                }];
                    }
                });
            });
        };
        // ─── Payout (platform settlements owed to the venue) ─────────────────────────
        FinanceRepository_1.prototype.payoutSummary = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, byStatus, lastPaid, pick;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.settlement.groupBy({
                                    by: ['status'],
                                    where: { venueId: venueId },
                                    _sum: { netAmount: true },
                                }),
                                this.prisma.settlement.findFirst({
                                    where: { venueId: venueId, status: client_1.SettlementStatus.PAID, paidAt: { not: null } },
                                    orderBy: { paidAt: 'desc' },
                                    select: { paidAt: true },
                                }),
                            ])];
                        case 1:
                            _a = _c.sent(), byStatus = _a[0], lastPaid = _a[1];
                            pick = function (s) { var _a; return num((_a = byStatus.find(function (r) { return r.status === s; })) === null || _a === void 0 ? void 0 : _a._sum.netAmount); };
                            return [2 /*return*/, {
                                    pendingPayout: pick(client_1.SettlementStatus.PENDING),
                                    onHold: pick(client_1.SettlementStatus.ON_HOLD),
                                    paidOut: pick(client_1.SettlementStatus.PAID),
                                    lastPaidAt: (_b = lastPaid === null || lastPaid === void 0 ? void 0 : lastPaid.paidAt) !== null && _b !== void 0 ? _b : undefined,
                                }];
                    }
                });
            });
        };
        // ─── Expenses (CRUD) ─────────────────────────────────────────────────────────
        FinanceRepository_1.prototype.listExpenses = function (venueId, range, category) {
            return this.prisma.expense.findMany({
                where: { venueId: venueId, incurredAt: { gte: range.gte, lt: range.lt }, category: category },
                orderBy: { incurredAt: 'desc' },
            });
        };
        FinanceRepository_1.prototype.createExpense = function (data) {
            return this.prisma.expense.create({ data: data });
        };
        FinanceRepository_1.prototype.updateExpense = function (venueId, expenseId, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.assertExpense(venueId, expenseId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.expense.update({ where: { id: expenseId }, data: data })];
                    }
                });
            });
        };
        FinanceRepository_1.prototype.deleteExpense = function (venueId, expenseId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.assertExpense(venueId, expenseId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.expense.delete({ where: { id: expenseId } })];
                    }
                });
            });
        };
        FinanceRepository_1.prototype.assertExpense = function (venueId, expenseId) {
            return __awaiter(this, void 0, void 0, function () {
                var found;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.expense.findFirst({
                                where: { id: expenseId, venueId: venueId },
                                select: { id: true },
                            })];
                        case 1:
                            found = _a.sent();
                            if (!found)
                                throw new Error('Expense not found.');
                            return [2 /*return*/];
                    }
                });
            });
        };
        // ─── Cash reconciliation ─────────────────────────────────────────────────────
        /** Cash collected / paid out for a single business day (used by preview + close). */
        FinanceRepository_1.prototype.cashFlowForDay = function (venueId, gte, lt) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, bookingCash, subCash, expenseCash, cashIn, _i, bookingCash_1, r, _b, subCash_1, r;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.booking.groupBy({
                                    by: ['paymentMethod'],
                                    where: { venueId: venueId, startAt: { gte: gte, lt: lt }, status: NOT_CANCELLED },
                                    _sum: { amountPaid: true },
                                }),
                                this.prisma.subscriptionPayment.groupBy({
                                    by: ['method'],
                                    where: { subscription: { venueId: venueId }, status: 'PAID', createdAt: { gte: gte, lt: lt } },
                                    _sum: { amount: true },
                                }),
                                this.prisma.expense.aggregate({
                                    where: { venueId: venueId, incurredAt: { gte: gte, lt: lt }, paymentMethod: client_1.PaymentProvider.CASH },
                                    _sum: { amount: true },
                                }),
                            ])];
                        case 1:
                            _a = _c.sent(), bookingCash = _a[0], subCash = _a[1], expenseCash = _a[2];
                            cashIn = 0;
                            for (_i = 0, bookingCash_1 = bookingCash; _i < bookingCash_1.length; _i++) {
                                r = bookingCash_1[_i];
                                if (isCash(r.paymentMethod))
                                    cashIn += num(r._sum.amountPaid);
                            }
                            for (_b = 0, subCash_1 = subCash; _b < subCash_1.length; _b++) {
                                r = subCash_1[_b];
                                if (isCash(r.method))
                                    cashIn += num(r._sum.amount);
                            }
                            return [2 /*return*/, { cashIn: cashIn, cashOut: num(expenseCash._sum.amount) }];
                    }
                });
            });
        };
        FinanceRepository_1.prototype.findReconciliation = function (venueId, businessDate) {
            return this.prisma.cashReconciliation.findUnique({
                where: { venueId_businessDate: { venueId: venueId, businessDate: businessDate } },
            });
        };
        FinanceRepository_1.prototype.upsertReconciliation = function (args) {
            var venueId = args.venueId, businessDate = args.businessDate, rest = __rest(args, ["venueId", "businessDate"]);
            return this.prisma.cashReconciliation.upsert({
                where: { venueId_businessDate: { venueId: venueId, businessDate: businessDate } },
                create: __assign({ venueId: venueId, businessDate: businessDate }, rest),
                update: __assign(__assign({}, rest), { closedAt: new Date() }),
            });
        };
        FinanceRepository_1.prototype.listReconciliations = function (venueId, range) {
            return this.prisma.cashReconciliation.findMany({
                where: { venueId: venueId, businessDate: { gte: range.gte, lt: range.lt } },
                orderBy: { businessDate: 'desc' },
            });
        };
        // ─── Transactions ────────────────────────────────────────────────────────────
        /**
         * Every money movement in one filtered, sorted, paged feed.
         *
         * A UNION in SQL rather than three queries merged in memory: filtering,
         * sorting and paging all have to happen across the *combined* set, and the
         * footer totals have to cover every matching row — not the page on screen.
         * A client-side merge would page each rail separately and quietly mis-total.
         *
         * Booking payments come from the ledger (`booking_payments`), which is why
         * each instalment appears on the day it was actually taken.
         */
        FinanceRepository_1.prototype.transactions = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var venueId, range, page, pageSize, gte, lt, kinds, like, wants, parts, unioned, orderBy, _a, rows, totalsRow, t, moneyIn, moneyOut;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            venueId = args.venueId, range = args.range, page = args.page, pageSize = args.pageSize;
                            gte = range.gte, lt = range.lt;
                            kinds = ((_b = args.kinds) === null || _b === void 0 ? void 0 : _b.length) ? args.kinds : null;
                            like = ((_c = args.search) === null || _c === void 0 ? void 0 : _c.trim()) ? "%".concat(args.search.trim(), "%") : null;
                            wants = function (k) { return !kinds || kinds.includes(k); };
                            parts = [];
                            if (wants('BOOKING_PAYMENT') && !args.category) {
                                parts.push(client_1.Prisma.sql(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n        SELECT p.id,\n               'BOOKING_PAYMENT'::text                       AS kind,\n               p.\"takenAt\"                                   AS occurred_at,\n               COALESCE(b.\"customerName\", 'Walk-in')         AS description,\n               c.name                                        AS counterparty,\n               p.method::text                                AS method,\n               NULL::text                                    AS category,\n               p.amount                                      AS amount,\n               b.id                                          AS reference\n        FROM booking_payments p\n        JOIN bookings b ON b.id = p.\"bookingId\"\n        LEFT JOIN courts c ON c.id = b.\"courtId\"\n        WHERE p.\"venueId\" = ", "\n          AND p.\"takenAt\" >= ", " AND p.\"takenAt\" < ", "\n          ", "\n          ", "\n      "], ["\n        SELECT p.id,\n               'BOOKING_PAYMENT'::text                       AS kind,\n               p.\"takenAt\"                                   AS occurred_at,\n               COALESCE(b.\"customerName\", 'Walk-in')         AS description,\n               c.name                                        AS counterparty,\n               p.method::text                                AS method,\n               NULL::text                                    AS category,\n               p.amount                                      AS amount,\n               b.id                                          AS reference\n        FROM booking_payments p\n        JOIN bookings b ON b.id = p.\"bookingId\"\n        LEFT JOIN courts c ON c.id = b.\"courtId\"\n        WHERE p.\"venueId\" = ", "\n          AND p.\"takenAt\" >= ", " AND p.\"takenAt\" < ", "\n          ", "\n          ", "\n      "])), venueId, gte, lt, args.method ? client_1.Prisma.sql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["AND p.method = ", "::\"PaymentProvider\""], ["AND p.method = ", "::\"PaymentProvider\""])), args.method) : client_1.Prisma.empty, like ? client_1.Prisma.sql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["AND (b.\"customerName\" ILIKE ", " OR c.name ILIKE ", " OR p.note ILIKE ", ")"], ["AND (b.\"customerName\" ILIKE ", " OR c.name ILIKE ", " OR p.note ILIKE ", ")"])), like, like, like) : client_1.Prisma.empty));
                            }
                            if (wants('MEMBERSHIP_PAYMENT') && !args.category) {
                                parts.push(client_1.Prisma.sql(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n        SELECT sp.id,\n               'MEMBERSHIP_PAYMENT'::text                    AS kind,\n               sp.\"createdAt\"                                AS occurred_at,\n               cu.name                                       AS description,\n               mp.name                                       AS counterparty,\n               sp.method::text                               AS method,\n               NULL::text                                    AS category,\n               sp.amount                                     AS amount,\n               NULL::text                                    AS reference\n        FROM subscription_payments sp\n        JOIN subscriptions s ON s.id = sp.\"subscriptionId\"\n        JOIN membership_plans mp ON mp.id = s.\"planId\"\n        LEFT JOIN customers cu ON cu.id = s.\"customerId\"\n        WHERE s.\"venueId\" = ", " AND sp.status = 'PAID'\n          AND sp.\"createdAt\" >= ", " AND sp.\"createdAt\" < ", "\n          ", "\n          ", "\n      "], ["\n        SELECT sp.id,\n               'MEMBERSHIP_PAYMENT'::text                    AS kind,\n               sp.\"createdAt\"                                AS occurred_at,\n               cu.name                                       AS description,\n               mp.name                                       AS counterparty,\n               sp.method::text                               AS method,\n               NULL::text                                    AS category,\n               sp.amount                                     AS amount,\n               NULL::text                                    AS reference\n        FROM subscription_payments sp\n        JOIN subscriptions s ON s.id = sp.\"subscriptionId\"\n        JOIN membership_plans mp ON mp.id = s.\"planId\"\n        LEFT JOIN customers cu ON cu.id = s.\"customerId\"\n        WHERE s.\"venueId\" = ", " AND sp.status = 'PAID'\n          AND sp.\"createdAt\" >= ", " AND sp.\"createdAt\" < ", "\n          ", "\n          ", "\n      "])), venueId, gte, lt, args.method ? client_1.Prisma.sql(templateObject_14 || (templateObject_14 = __makeTemplateObject(["AND sp.method = ", "::\"PaymentProvider\""], ["AND sp.method = ", "::\"PaymentProvider\""])), args.method) : client_1.Prisma.empty, like ? client_1.Prisma.sql(templateObject_15 || (templateObject_15 = __makeTemplateObject(["AND (cu.name ILIKE ", " OR mp.name ILIKE ", ")"], ["AND (cu.name ILIKE ", " OR mp.name ILIKE ", ")"])), like, like) : client_1.Prisma.empty));
                            }
                            if (wants('EXPENSE')) {
                                parts.push(client_1.Prisma.sql(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n        SELECT e.id,\n               'EXPENSE'::text                               AS kind,\n               e.\"incurredAt\"                                AS occurred_at,\n               COALESCE(e.description, e.category::text)     AS description,\n               e.vendor                                      AS counterparty,\n               e.\"paymentMethod\"::text                       AS method,\n               e.category::text                              AS category,\n               -e.amount                                     AS amount,\n               NULL::text                                    AS reference\n        FROM expenses e\n        WHERE e.\"venueId\" = ", "\n          AND e.\"incurredAt\" >= ", " AND e.\"incurredAt\" < ", "\n          ", "\n          ", "\n          ", "\n      "], ["\n        SELECT e.id,\n               'EXPENSE'::text                               AS kind,\n               e.\"incurredAt\"                                AS occurred_at,\n               COALESCE(e.description, e.category::text)     AS description,\n               e.vendor                                      AS counterparty,\n               e.\"paymentMethod\"::text                       AS method,\n               e.category::text                              AS category,\n               -e.amount                                     AS amount,\n               NULL::text                                    AS reference\n        FROM expenses e\n        WHERE e.\"venueId\" = ", "\n          AND e.\"incurredAt\" >= ", " AND e.\"incurredAt\" < ", "\n          ", "\n          ", "\n          ", "\n      "])), venueId, gte, lt, args.method ? client_1.Prisma.sql(templateObject_17 || (templateObject_17 = __makeTemplateObject(["AND e.\"paymentMethod\" = ", "::\"PaymentProvider\""], ["AND e.\"paymentMethod\" = ", "::\"PaymentProvider\""])), args.method) : client_1.Prisma.empty, args.category ? client_1.Prisma.sql(templateObject_18 || (templateObject_18 = __makeTemplateObject(["AND e.category = ", "::\"ExpenseCategory\""], ["AND e.category = ", "::\"ExpenseCategory\""])), args.category) : client_1.Prisma.empty, like ? client_1.Prisma.sql(templateObject_19 || (templateObject_19 = __makeTemplateObject(["AND (e.description ILIKE ", " OR e.vendor ILIKE ", " OR e.category::text ILIKE ", ")"], ["AND (e.description ILIKE ", " OR e.vendor ILIKE ", " OR e.category::text ILIKE ", ")"])), like, like, like) : client_1.Prisma.empty));
                            }
                            if (parts.length === 0) {
                                return [2 /*return*/, { items: [], totals: { moneyIn: 0, moneyOut: 0, net: 0, count: 0 }, total: 0 }];
                            }
                            unioned = client_1.Prisma.join(parts, ' UNION ALL ');
                            orderBy = client_1.Prisma.raw({
                                DATE_DESC: 'occurred_at DESC',
                                DATE_ASC: 'occurred_at ASC',
                                AMOUNT_DESC: 'amount DESC',
                                AMOUNT_ASC: 'amount ASC',
                            }[args.sort]);
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n        SELECT * FROM (", ") t\n        ORDER BY ", ", id ASC\n        LIMIT ", " OFFSET ", "\n      "], ["\n        SELECT * FROM (", ") t\n        ORDER BY ", ", id ASC\n        LIMIT ", " OFFSET ", "\n      "])), unioned, orderBy, pageSize, (page - 1) * pageSize)),
                                    this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n        SELECT COALESCE(SUM(amount) FILTER (WHERE amount > 0), 0) AS money_in,\n               COALESCE(-SUM(amount) FILTER (WHERE amount < 0), 0) AS money_out,\n               COUNT(*)::bigint                                    AS count\n        FROM (", ") t\n      "], ["\n        SELECT COALESCE(SUM(amount) FILTER (WHERE amount > 0), 0) AS money_in,\n               COALESCE(-SUM(amount) FILTER (WHERE amount < 0), 0) AS money_out,\n               COUNT(*)::bigint                                    AS count\n        FROM (", ") t\n      "])), unioned)),
                                ])];
                        case 1:
                            _a = _f.sent(), rows = _a[0], totalsRow = _a[1];
                            t = totalsRow[0];
                            moneyIn = num(t === null || t === void 0 ? void 0 : t.money_in);
                            moneyOut = num(t === null || t === void 0 ? void 0 : t.money_out);
                            return [2 /*return*/, {
                                    items: rows.map(function (r) {
                                        var _a, _b, _c, _d, _e;
                                        return ({
                                            id: r.id,
                                            kind: r.kind,
                                            occurredAt: r.occurred_at,
                                            description: (_a = r.description) !== null && _a !== void 0 ? _a : '—',
                                            counterparty: (_b = r.counterparty) !== null && _b !== void 0 ? _b : undefined,
                                            method: (_c = r.method) !== null && _c !== void 0 ? _c : undefined,
                                            category: (_d = r.category) !== null && _d !== void 0 ? _d : undefined,
                                            amount: num(r.amount),
                                            reference: (_e = r.reference) !== null && _e !== void 0 ? _e : undefined,
                                        });
                                    }),
                                    totals: { moneyIn: moneyIn, moneyOut: moneyOut, net: moneyIn - moneyOut, count: Number((_d = t === null || t === void 0 ? void 0 : t.count) !== null && _d !== void 0 ? _d : 0) },
                                    total: Number((_e = t === null || t === void 0 ? void 0 : t.count) !== null && _e !== void 0 ? _e : 0),
                                }];
                    }
                });
            });
        };
        /**
         * Who still owes money. `outstanding` in the summary is one number; this is the
         * list behind it, which is the part an owner can actually act on.
         */
        FinanceRepository_1.prototype.receivables = function (venueId, range) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findMany({
                                where: {
                                    venueId: venueId,
                                    startAt: { gte: range.gte, lt: range.lt },
                                    status: NOT_CANCELLED,
                                    paymentStatus: { not: 'PAID' },
                                },
                                select: {
                                    id: true,
                                    customerName: true,
                                    customerPhone: true,
                                    startAt: true,
                                    total: true,
                                    amountPaid: true,
                                    court: { select: { name: true } },
                                },
                                orderBy: { startAt: 'desc' },
                            })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, (rows
                                    .map(function (r) {
                                    var _a, _b, _c;
                                    return ({
                                        bookingId: r.id,
                                        customerName: (_a = r.customerName) !== null && _a !== void 0 ? _a : 'Walk-in',
                                        customerPhone: (_b = r.customerPhone) !== null && _b !== void 0 ? _b : undefined,
                                        courtName: (_c = r.court) === null || _c === void 0 ? void 0 : _c.name,
                                        startAt: r.startAt,
                                        total: num(r.total),
                                        amountPaid: num(r.amountPaid),
                                        outstanding: num(r.total) - num(r.amountPaid),
                                    });
                                })
                                    // A free game or a zeroed bill can sit at PENDING with nothing owed.
                                    .filter(function (r) { return r.outstanding > 0; })
                                    .sort(function (a, b) { return b.outstanding - a.outstanding; }))];
                    }
                });
            });
        };
        /** Earliest money movement for the venue — the natural start of the ALL range. */
        FinanceRepository_1.prototype.firstActivityAt = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, booking, expense, dates;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.booking.findFirst({
                                    where: { venueId: venueId },
                                    orderBy: { startAt: 'asc' },
                                    select: { startAt: true },
                                }),
                                this.prisma.expense.findFirst({
                                    where: { venueId: venueId },
                                    orderBy: { incurredAt: 'asc' },
                                    select: { incurredAt: true },
                                }),
                            ])];
                        case 1:
                            _a = _b.sent(), booking = _a[0], expense = _a[1];
                            dates = [booking === null || booking === void 0 ? void 0 : booking.startAt, expense === null || expense === void 0 ? void 0 : expense.incurredAt].filter(Boolean);
                            if (dates.length === 0)
                                return [2 /*return*/, null];
                            return [2 /*return*/, dates.reduce(function (a, b) { return (a < b ? a : b); })];
                    }
                });
            });
        };
        return FinanceRepository_1;
    }());
    __setFunctionName(_classThis, "FinanceRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceRepository = _classThis;
}();
exports.FinanceRepository = FinanceRepository;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22;
