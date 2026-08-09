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
exports.SalaryService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
function num(value) {
    return value ? Number(value.toString()) : 0;
}
/** First day of the month a date falls in, as a UTC date. */
function monthStart(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}
function monthLabel(date) {
    return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}
/**
 * Staff pay.
 *
 * The whole design rests on one decision: a salary payment is an `Expense` with
 * a payee and a period attached, not a table of its own. That is why profit is
 * correct here without a single aggregation being touched — the money is
 * already in the ledger every report reads.
 *
 * What the service adds is the half a ledger can't express: what was agreed,
 * and therefore what is still owed.
 */
var SalaryService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SalaryService = _classThis = /** @class */ (function () {
        function SalaryService_1(prisma) {
            this.prisma = prisma;
        }
        SalaryService_1.prototype.period = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var start, end, _a, seats, payments, paidBySeat, rows;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            start = input.periodStart
                                ? monthStart(new Date(input.periodStart))
                                : monthStart(new Date());
                            end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1));
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.venueMembership.findMany({
                                        where: { venueId: input.venueId, status: client_1.MembershipStatus.ACTIVE },
                                        include: { user: { select: { fullName: true } } },
                                        orderBy: [{ role: 'asc' }, { createdAt: 'asc' }],
                                    }),
                                    this.prisma.expense.groupBy({
                                        by: ['staffMembershipId'],
                                        where: {
                                            venueId: input.venueId,
                                            category: client_1.ExpenseCategory.SALARY,
                                            staffMembershipId: { not: null },
                                            salaryPeriodStart: { gte: start, lt: end },
                                        },
                                        _sum: { amount: true, salaryQuantity: true },
                                        _count: { _all: true },
                                    }),
                                ])];
                        case 1:
                            _a = _b.sent(), seats = _a[0], payments = _a[1];
                            paidBySeat = new Map(payments.map(function (p) { return [p.staffMembershipId, p]; }));
                            rows = seats.map(function (seat) {
                                var _a, _b, _c;
                                var paidRow = paidBySeat.get(seat.id);
                                var paid = num(paidRow === null || paidRow === void 0 ? void 0 : paidRow._sum.amount);
                                var quantity = (paidRow === null || paidRow === void 0 ? void 0 : paidRow._sum.salaryQuantity) ? num(paidRow._sum.salaryQuantity) : undefined;
                                var rate = seat.payRate ? num(seat.payRate) : undefined;
                                var committed = committedFor(seat.payBasis, rate, quantity);
                                return {
                                    membershipId: seat.id,
                                    fullName: (_a = seat.user.fullName) !== null && _a !== void 0 ? _a : undefined,
                                    role: seat.role,
                                    basis: (_b = seat.payBasis) !== null && _b !== void 0 ? _b : undefined,
                                    rate: rate,
                                    committed: committed,
                                    paid: paid,
                                    due: committed === undefined ? undefined : Math.max(0, round(committed - paid)),
                                    quantity: quantity,
                                    paymentCount: (_c = paidRow === null || paidRow === void 0 ? void 0 : paidRow._count._all) !== null && _c !== void 0 ? _c : 0,
                                };
                            });
                            return [2 /*return*/, {
                                    periodStart: start.toISOString().slice(0, 10),
                                    label: monthLabel(start),
                                    rows: rows,
                                    committedTotal: round(sum(rows.map(function (r) { var _a; return (_a = r.committed) !== null && _a !== void 0 ? _a : 0; }))),
                                    paidTotal: round(sum(rows.map(function (r) { return r.paid; }))),
                                    dueTotal: round(sum(rows.map(function (r) { var _a; return (_a = r.due) !== null && _a !== void 0 ? _a : 0; }))),
                                    // Anyone on a daily or per-session rate whose count nobody has entered.
                                    // They are missing from the totals, and the screen has to say so — a
                                    // quietly incomplete "you owe staff" figure is worse than no figure.
                                    uncountedStaff: rows.filter(function (r) { return r.basis && r.basis !== client_1.PayBasis.MONTHLY && !r.quantity; })
                                        .length,
                                }];
                    }
                });
            });
        };
        /**
         * Record what was actually handed over.
         *
         * Writes an `Expense{category: SALARY}`, so from this moment the payment is
         * in net profit, in the transactions ledger, in the expense breakdown, and —
         * if it was cash — in the next day-close's expected drawer. None of that
         * needed building; it follows from choosing the ledger over a private table.
         */
        SalaryService_1.prototype.recordPayment = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var seat, period;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (input.amount <= 0)
                                throw new common_1.BadRequestException('Enter an amount above zero.');
                            return [4 /*yield*/, this.prisma.venueMembership.findFirst({
                                    where: { id: input.membershipId, venueId: input.venueId },
                                    include: { user: { select: { fullName: true } } },
                                })];
                        case 1:
                            seat = _d.sent();
                            if (!seat)
                                throw new common_1.NotFoundException('That person is not on this venue’s staff.');
                            period = monthStart(new Date(input.periodStart));
                            return [2 /*return*/, this.prisma.expense.create({
                                    data: {
                                        venueId: input.venueId,
                                        category: client_1.ExpenseCategory.SALARY,
                                        amount: input.amount,
                                        // Defaults to the day it was handed over. Back-dating is allowed and
                                        // meaningful: `incurredAt` is what every report buckets on, so paying
                                        // July's wages in August lands in July's profit if the owner says so.
                                        incurredAt: (_a = input.paidAt) !== null && _a !== void 0 ? _a : new Date(),
                                        paymentMethod: input.paymentMethod,
                                        description: (_b = input.note) !== null && _b !== void 0 ? _b : "Salary \u2014 ".concat(monthLabel(period)),
                                        staffMembershipId: seat.id,
                                        // Snapshot: the seat may be deleted one day; this row must still name
                                        // the person it paid.
                                        payeeName: (_c = seat.user.fullName) !== null && _c !== void 0 ? _c : undefined,
                                        salaryPeriodStart: period,
                                        salaryQuantity: input.quantity,
                                        createdById: actorId,
                                    },
                                })];
                    }
                });
            });
        };
        /** Set or clear what someone is paid. */
        SalaryService_1.prototype.setPayTerms = function (venueId, membershipId, basis, rate) {
            return __awaiter(this, void 0, void 0, function () {
                var seat;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (basis && (rate === null || rate === undefined || rate <= 0)) {
                                throw new common_1.BadRequestException('Enter what they are paid.');
                            }
                            return [4 /*yield*/, this.prisma.venueMembership.findFirst({
                                    where: { id: membershipId, venueId: venueId },
                                })];
                        case 1:
                            seat = _a.sent();
                            if (!seat)
                                throw new common_1.NotFoundException('That person is not on this venue’s staff.');
                            return [2 /*return*/, this.prisma.venueMembership.update({
                                    where: { id: membershipId },
                                    data: { payBasis: basis, payRate: basis ? rate : null },
                                })];
                    }
                });
            });
        };
        return SalaryService_1;
    }());
    __setFunctionName(_classThis, "SalaryService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SalaryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SalaryService = _classThis;
}();
exports.SalaryService = SalaryService;
/**
 * What is owed for one period.
 *
 * Monthly is the rate, every month. Daily and per-session multiply the rate by
 * a count that only exists once the owner enters it — so before that, the
 * answer is `undefined` rather than `0`. The distinction carries all the way
 * to the screen: "nothing owed" and "we don't know yet" must not look alike.
 */
function committedFor(basis, rate, quantity) {
    if (!basis || rate === undefined)
        return undefined;
    if (basis === client_1.PayBasis.MONTHLY)
        return rate;
    return quantity === undefined ? undefined : round(rate * quantity);
}
function sum(values) {
    return values.reduce(function (total, value) { return total + value; }, 0);
}
function round(value) {
    return Math.round(value * 100) / 100;
}
