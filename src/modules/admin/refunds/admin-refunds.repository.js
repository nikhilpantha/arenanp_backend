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
exports.AdminRefundsRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var admin_user_model_1 = require("../users/dto/admin-user.model");
var REFUND_INCLUDES = {
    user: true,
    approvedBy: true,
    processedBy: true,
    booking: {
        select: {
            id: true,
            venueId: true,
            startAt: true,
            total: true,
            status: true,
            venue: { select: { name: true } },
            court: {
                select: {
                    sport: { select: { id: true, slug: true, name: true, iconUrl: true } },
                },
            },
        },
    },
    payment: {
        select: {
            id: true,
            provider: true,
            providerTxnId: true,
            amount: true,
            status: true,
            paidAt: true,
        },
    },
};
var AdminRefundsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminRefundsRepository = _classThis = /** @class */ (function () {
        function AdminRefundsRepository_1(prisma) {
            this.prisma = prisma;
        }
        AdminRefundsRepository_1.prototype.findById = function (id) {
            return this.prisma.refundRequest.findUnique({ where: { id: id }, include: REFUND_INCLUDES });
        };
        AdminRefundsRepository_1.prototype.listAndCount = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, direction, where, q, _a, items, total;
                var _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            direction = input.sortOrder === admin_user_model_1.SortOrder.ASC ? 'asc' : 'desc';
                            where = {};
                            if (input.status)
                                where.status = input.status;
                            if ((_f = input.search) === null || _f === void 0 ? void 0 : _f.trim()) {
                                q = input.search.trim();
                                where.OR = [
                                    { booking: { id: { contains: q, mode: 'insensitive' } } },
                                    { booking: { venue: { name: { contains: q, mode: 'insensitive' } } } },
                                    { user: { fullName: { contains: q, mode: 'insensitive' } } },
                                    { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
                                ];
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.refundRequest.findMany({
                                        where: where,
                                        include: REFUND_INCLUDES,
                                        orderBy: { createdAt: direction },
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.refundRequest.count({ where: where }),
                                ])];
                        case 1:
                            _a = _g.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        AdminRefundsRepository_1.prototype.countPendingRefunds = function () {
            return this.prisma.refundRequest.count({ where: { status: client_1.RefundStatus.REQUESTED } });
        };
        AdminRefundsRepository_1.prototype.approve = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    return [2 /*return*/, this.prisma.refundRequest.update({
                            where: { id: args.refundId },
                            data: {
                                status: client_1.RefundStatus.APPROVED,
                                approvedById: args.actorId,
                                approvedAt: new Date(),
                                adminNotes: (_a = args.adminNotes) !== null && _a !== void 0 ? _a : undefined,
                                rejectionReason: null,
                            },
                            include: REFUND_INCLUDES,
                        })];
                });
            });
        };
        AdminRefundsRepository_1.prototype.reject = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.refundRequest.update({
                            where: { id: args.refundId },
                            data: {
                                status: client_1.RefundStatus.REJECTED,
                                rejectionReason: args.reason,
                                approvedById: args.actorId,
                                approvedAt: new Date(),
                            },
                            include: REFUND_INCLUDES,
                        })];
                });
            });
        };
        /**
         * Mark a refund PROCESSED in a transaction:
         *  1. Set RefundRequest.status = PROCESSED + audit fields.
         *  2. Flip the Payment status to REFUNDED (full) or PARTIALLY_REFUNDED.
         *  3. Put any existing Settlement ON_HOLD so the venue isn't double-paid.
         */
        AdminRefundsRepository_1.prototype.markProcessed = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var refund, requested, paid, fullRefund;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, tx.refundRequest.findUnique({
                                            where: { id: args.refundId },
                                            include: { payment: true },
                                        })];
                                    case 1:
                                        refund = _c.sent();
                                        if (!refund)
                                            throw new Error('Refund request not found');
                                        if (!refund.payment) return [3 /*break*/, 4];
                                        requested = Number(refund.requestedAmount.toString());
                                        paid = Number(refund.payment.amount.toString());
                                        fullRefund = requested >= paid;
                                        return [4 /*yield*/, tx.payment.update({
                                                where: { id: refund.payment.id },
                                                data: {
                                                    status: fullRefund ? client_1.PaymentStatus.REFUNDED : client_1.PaymentStatus.PARTIALLY_REFUNDED,
                                                },
                                            })];
                                    case 2:
                                        _c.sent();
                                        // If a settlement was created already, freeze it so the venue isn't
                                        // paid out gross for a now-refunded booking.
                                        return [4 /*yield*/, tx.settlement.updateMany({
                                                where: { paymentId: refund.payment.id, status: { not: client_1.SettlementStatus.PAID } },
                                                data: { status: client_1.SettlementStatus.ON_HOLD },
                                            })];
                                    case 3:
                                        // If a settlement was created already, freeze it so the venue isn't
                                        // paid out gross for a now-refunded booking.
                                        _c.sent();
                                        _c.label = 4;
                                    case 4: return [2 /*return*/, tx.refundRequest.update({
                                            where: { id: args.refundId },
                                            data: {
                                                status: client_1.RefundStatus.PROCESSED,
                                                processedById: args.actorId,
                                                processedAt: new Date(),
                                                processorReference: (_a = args.processorReference) !== null && _a !== void 0 ? _a : undefined,
                                                adminNotes: (_b = args.adminNotes) !== null && _b !== void 0 ? _b : undefined,
                                            },
                                            include: REFUND_INCLUDES,
                                        })];
                                }
                            });
                        }); })];
                });
            });
        };
        return AdminRefundsRepository_1;
    }());
    __setFunctionName(_classThis, "AdminRefundsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminRefundsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminRefundsRepository = _classThis;
}();
exports.AdminRefundsRepository = AdminRefundsRepository;
