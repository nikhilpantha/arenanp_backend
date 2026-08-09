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
exports.AdminPaymentsRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var admin_user_model_1 = require("../users/dto/admin-user.model");
var PAYMENT_INCLUDES = {
    user: true,
    booking: {
        select: {
            id: true,
            venueId: true,
            startAt: true,
            venue: { select: { name: true, city: true } },
            court: {
                select: {
                    name: true,
                    sport: { select: { id: true, slug: true, name: true, iconUrl: true } },
                },
            },
        },
    },
    settlement: {
        include: {
            markedPaidBy: true,
            venue: { select: { id: true, name: true } },
        },
    },
};
var AdminPaymentsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminPaymentsRepository = _classThis = /** @class */ (function () {
        function AdminPaymentsRepository_1(prisma) {
            this.prisma = prisma;
        }
        AdminPaymentsRepository_1.prototype.findById = function (id) {
            return this.prisma.payment.findUnique({ where: { id: id }, include: PAYMENT_INCLUDES });
        };
        AdminPaymentsRepository_1.prototype.buildWhere = function (input) {
            var _a, _b;
            var where = {};
            if (input.provider)
                where.provider = input.provider;
            if (input.status)
                where.status = input.status;
            if (input.venueId)
                where.booking = { venueId: input.venueId };
            if (input.settlementStatus) {
                if (input.settlementStatus === client_1.SettlementStatus.PENDING) {
                    // "PENDING" includes payments that have no Settlement row yet.
                    where.OR = [
                        { settlement: { is: null } },
                        { settlement: { status: client_1.SettlementStatus.PENDING } },
                    ];
                }
                else {
                    where.settlement = { status: input.settlementStatus };
                }
            }
            if (input.fromDate || input.toDate) {
                where.paidAt = {};
                if (input.fromDate)
                    where.paidAt.gte = input.fromDate;
                if (input.toDate)
                    where.paidAt.lt = input.toDate;
            }
            if ((_a = input.search) === null || _a === void 0 ? void 0 : _a.trim()) {
                var q = input.search.trim();
                where.OR = __spreadArray(__spreadArray([], ((_b = where.OR) !== null && _b !== void 0 ? _b : []), true), [
                    { id: { contains: q, mode: 'insensitive' } },
                    { providerTxnId: { contains: q, mode: 'insensitive' } },
                    { user: { fullName: { contains: q, mode: 'insensitive' } } },
                    { booking: { venue: { name: { contains: q, mode: 'insensitive' } } } },
                ], false);
            }
            return where;
        };
        AdminPaymentsRepository_1.prototype.listAndCount = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, direction, where, _a, items, total;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            direction = input.sortOrder === admin_user_model_1.SortOrder.ASC ? 'asc' : 'desc';
                            where = this.buildWhere(input);
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.payment.findMany({
                                        where: where,
                                        include: PAYMENT_INCLUDES,
                                        orderBy: [{ paidAt: direction }, { createdAt: direction }],
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.payment.count({ where: where }),
                                ])];
                        case 1:
                            _a = _f.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        /** Pull every payment matching the filter set, no pagination — for CSV export. */
        AdminPaymentsRepository_1.prototype.exportAll = function (input) {
            var direction = input.sortOrder === admin_user_model_1.SortOrder.ASC ? 'asc' : 'desc';
            return this.prisma.payment.findMany({
                where: this.buildWhere(input),
                include: PAYMENT_INCLUDES,
                orderBy: [{ paidAt: direction }, { createdAt: direction }],
            });
        };
        /**
         * Aggregates used by the KPI strip. Returns gross / commission / venue-owed /
         * venue-settled / refunded totals for the *filter set*, not just the page.
         */
        AdminPaymentsRepository_1.prototype.overview = function (input, defaultCommissionPct) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, succeeded, refunded, settledAgg, unsettledAgg, gross, refundedTotal, settledCommission, settledNet, unsettledCommission, unsettledNet, settledOrUnsettledGross, grossWithoutSettlement, provisionalCommission, provisionalVenueOwed;
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
                return __generator(this, function (_t) {
                    switch (_t.label) {
                        case 0:
                            where = this.buildWhere(input);
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.payment.aggregate({
                                        _sum: { amount: true },
                                        where: __assign(__assign({}, where), { status: client_1.PaymentStatus.SUCCEEDED }),
                                    }),
                                    this.prisma.payment.aggregate({
                                        _sum: { amount: true },
                                        where: __assign(__assign({}, where), { status: { in: [client_1.PaymentStatus.REFUNDED, client_1.PaymentStatus.PARTIALLY_REFUNDED] } }),
                                    }),
                                    this.prisma.settlement.aggregate({
                                        _sum: {
                                            netAmount: true,
                                            platformCommissionAmount: true,
                                        },
                                        where: {
                                            status: client_1.SettlementStatus.PAID,
                                            payment: { is: where },
                                        },
                                    }),
                                    this.prisma.settlement.aggregate({
                                        _sum: {
                                            netAmount: true,
                                            platformCommissionAmount: true,
                                        },
                                        where: {
                                            status: { in: [client_1.SettlementStatus.PENDING, client_1.SettlementStatus.ON_HOLD] },
                                            payment: { is: where },
                                        },
                                    }),
                                ])];
                        case 1:
                            _a = _t.sent(), succeeded = _a[0], refunded = _a[1], settledAgg = _a[2], unsettledAgg = _a[3];
                            gross = Number((_c = (_b = succeeded._sum.amount) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '0');
                            refundedTotal = Number((_e = (_d = refunded._sum.amount) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : '0');
                            settledCommission = Number((_g = (_f = settledAgg._sum.platformCommissionAmount) === null || _f === void 0 ? void 0 : _f.toString()) !== null && _g !== void 0 ? _g : '0');
                            settledNet = Number((_j = (_h = settledAgg._sum.netAmount) === null || _h === void 0 ? void 0 : _h.toString()) !== null && _j !== void 0 ? _j : '0');
                            unsettledCommission = Number((_l = (_k = unsettledAgg._sum.platformCommissionAmount) === null || _k === void 0 ? void 0 : _k.toString()) !== null && _l !== void 0 ? _l : '0');
                            unsettledNet = Number((_o = (_m = unsettledAgg._sum.netAmount) === null || _m === void 0 ? void 0 : _m.toString()) !== null && _o !== void 0 ? _o : '0');
                            settledOrUnsettledGross = Number(((_p = settledAgg._sum.netAmount) !== null && _p !== void 0 ? _p : 0).toString()) +
                                Number(((_q = settledAgg._sum.platformCommissionAmount) !== null && _q !== void 0 ? _q : 0).toString()) +
                                Number(((_r = unsettledAgg._sum.netAmount) !== null && _r !== void 0 ? _r : 0).toString()) +
                                Number(((_s = unsettledAgg._sum.platformCommissionAmount) !== null && _s !== void 0 ? _s : 0).toString());
                            grossWithoutSettlement = Math.max(0, gross - settledOrUnsettledGross);
                            provisionalCommission = round2(grossWithoutSettlement * (defaultCommissionPct / 100));
                            provisionalVenueOwed = round2(grossWithoutSettlement - provisionalCommission);
                            return [2 /*return*/, {
                                    grossRevenue: gross,
                                    platformCommission: round2(settledCommission + unsettledCommission + provisionalCommission),
                                    venuesOwed: round2(unsettledNet + provisionalVenueOwed),
                                    venuesSettled: round2(settledNet),
                                    refundedTotal: refundedTotal,
                                    currency: 'NPR',
                                }];
                    }
                });
            });
        };
        /**
         * Mark a payment's settlement as PAID. If no Settlement row exists, create
         * one with the current commission snapshot, then mark it PAID atomically.
         */
        AdminPaymentsRepository_1.prototype.markSettlementPaid = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var paymentId, actorId, commissionPercentage, paymentReference, notes;
                var _this = this;
                return __generator(this, function (_a) {
                    paymentId = args.paymentId, actorId = args.actorId, commissionPercentage = args.commissionPercentage, paymentReference = args.paymentReference, notes = args.notes;
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var payment, grossAmount, platformCommissionAmount, netAmount;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.payment.findUnique({
                                            where: { id: paymentId },
                                            include: { booking: { select: { venueId: true } }, settlement: true },
                                        })];
                                    case 1:
                                        payment = _a.sent();
                                        if (!payment)
                                            throw new Error('Payment not found');
                                        if (payment.status !== client_1.PaymentStatus.SUCCEEDED) {
                                            throw new Error("Cannot settle a payment with status ".concat(payment.status));
                                        }
                                        grossAmount = payment.amount;
                                        platformCommissionAmount = roundDecimal(Number(grossAmount.toString()) * (commissionPercentage / 100));
                                        netAmount = roundDecimal(Number(grossAmount.toString()) - Number(platformCommissionAmount.toString()));
                                        if (!payment.settlement) return [3 /*break*/, 3];
                                        return [4 /*yield*/, tx.settlement.update({
                                                where: { id: payment.settlement.id },
                                                data: {
                                                    status: client_1.SettlementStatus.PAID,
                                                    paidAt: new Date(),
                                                    paymentReference: paymentReference !== null && paymentReference !== void 0 ? paymentReference : payment.settlement.paymentReference,
                                                    notes: notes !== null && notes !== void 0 ? notes : payment.settlement.notes,
                                                    markedPaidById: actorId,
                                                },
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 3: return [4 /*yield*/, tx.settlement.create({
                                            data: {
                                                paymentId: payment.id,
                                                venueId: payment.booking.venueId,
                                                grossAmount: grossAmount,
                                                commissionPercentage: commissionPercentage,
                                                platformCommissionAmount: platformCommissionAmount,
                                                netAmount: netAmount,
                                                currency: payment.currency,
                                                status: client_1.SettlementStatus.PAID,
                                                paidAt: new Date(),
                                                paymentReference: paymentReference !== null && paymentReference !== void 0 ? paymentReference : null,
                                                notes: notes !== null && notes !== void 0 ? notes : null,
                                                markedPaidById: actorId,
                                            },
                                        })];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/, tx.payment.findUniqueOrThrow({
                                            where: { id: paymentId },
                                            include: PAYMENT_INCLUDES,
                                        })];
                                }
                            });
                        }); })];
                });
            });
        };
        return AdminPaymentsRepository_1;
    }());
    __setFunctionName(_classThis, "AdminPaymentsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminPaymentsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminPaymentsRepository = _classThis;
}();
exports.AdminPaymentsRepository = AdminPaymentsRepository;
function roundDecimal(n) {
    // Decimal(10,2) round to 2dp via JS number — fine for our amounts.
    return Math.round(n * 100) / 100;
}
function round2(n) {
    return Math.round(n * 100) / 100;
}
