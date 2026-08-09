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
exports.AdminPaymentsService = void 0;
var common_1 = require("@nestjs/common");
var pagination_input_1 = require("../../../common/dto/pagination.input");
var admin_payment_model_1 = require("./dto/admin-payment.model");
var AdminPaymentsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminPaymentsService = _classThis = /** @class */ (function () {
        function AdminPaymentsService_1(repo, config, settings) {
            this.repo = repo;
            this.config = config;
            this.settings = settings;
        }
        Object.defineProperty(AdminPaymentsService_1.prototype, "envCommissionPct", {
            /**
             * Hard-coded fallback when the PlatformSetting row doesn't exist yet —
             * `commissionPercentage()` resolves it from the live settings first.
             */
            get: function () {
                var raw = this.config.get('PLATFORM_COMMISSION_PERCENTAGE');
                return typeof raw === 'number' ? raw : Number(raw !== null && raw !== void 0 ? raw : 10);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Live platform commission percentage. Prefers PlatformSetting; falls back
         * to the env var if reading settings fails (e.g. table missing during a
         * very early boot).
         */
        AdminPaymentsService_1.prototype.commissionPercentage = function () {
            return __awaiter(this, void 0, void 0, function () {
                var pct, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.settings.getCommissionPercentage()];
                        case 1:
                            pct = _b.sent();
                            return [2 /*return*/, pct !== null && pct !== void 0 ? pct : this.envCommissionPct];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/, this.envCommissionPct];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AdminPaymentsService_1.prototype.list = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, pct, _a, items, total;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            if (input.fromDate && input.toDate && input.fromDate >= input.toDate) {
                                throw new common_1.BadRequestException('fromDate must be earlier than toDate.');
                            }
                            return [4 /*yield*/, this.commissionPercentage()];
                        case 1:
                            pct = _f.sent();
                            return [4 /*yield*/, this.repo.listAndCount(input)];
                        case 2:
                            _a = _f.sent(), items = _a.items, total = _a.total;
                            return [2 /*return*/, {
                                    items: items.map(function (p) { return (0, admin_payment_model_1.mapAdminPayment)(p, pct); }),
                                    pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, total),
                                }];
                    }
                });
            });
        };
        AdminPaymentsService_1.prototype.getOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var row, pct;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(id)];
                        case 1:
                            row = _a.sent();
                            if (!row)
                                throw new common_1.NotFoundException('Payment not found.');
                            return [4 /*yield*/, this.commissionPercentage()];
                        case 2:
                            pct = _a.sent();
                            return [2 /*return*/, (0, admin_payment_model_1.mapAdminPayment)(row, pct)];
                    }
                });
            });
        };
        AdminPaymentsService_1.prototype.overview = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var pct;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.commissionPercentage()];
                        case 1:
                            pct = _a.sent();
                            return [2 /*return*/, this.repo.overview(input, pct)];
                    }
                });
            });
        };
        AdminPaymentsService_1.prototype.markSettlementPaid = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                var pct, updated, err_1, msg;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.commissionPercentage()];
                        case 1:
                            pct = _e.sent();
                            return [4 /*yield*/, this.repo.markSettlementPaid({
                                    paymentId: input.paymentId,
                                    actorId: actor.id,
                                    commissionPercentage: pct,
                                    paymentReference: (_b = (_a = input.paymentReference) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : null,
                                    notes: (_d = (_c = input.notes) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : null,
                                })];
                        case 2:
                            updated = _e.sent();
                            return [2 /*return*/, (0, admin_payment_model_1.mapAdminPayment)(updated, pct)];
                        case 3:
                            err_1 = _e.sent();
                            msg = err_1 instanceof Error ? err_1.message : 'Could not settle payment.';
                            throw new common_1.BadRequestException(msg);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AdminPaymentsService_1.prototype.exportSettlements = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var rows, pct;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.exportAll(input)];
                        case 1:
                            rows = _a.sent();
                            return [4 /*yield*/, this.commissionPercentage()];
                        case 2:
                            pct = _a.sent();
                            return [2 /*return*/, rows.map(function (p) {
                                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                                    var mapped = (0, admin_payment_model_1.mapAdminPayment)(p, pct);
                                    return {
                                        paymentId: mapped.id,
                                        bookingId: mapped.booking.id,
                                        venueId: (_a = mapped.booking.venueId) !== null && _a !== void 0 ? _a : '',
                                        venueName: mapped.booking.venueName,
                                        venueCity: (_c = (_b = p.booking.venue) === null || _b === void 0 ? void 0 : _b.city) !== null && _c !== void 0 ? _c : '',
                                        customerName: (_d = mapped.user.fullName) !== null && _d !== void 0 ? _d : mapped.user.phoneNumber,
                                        provider: mapped.provider,
                                        paidAt: (_f = (_e = mapped.paidAt) === null || _e === void 0 ? void 0 : _e.toISOString()) !== null && _f !== void 0 ? _f : '',
                                        grossAmount: mapped.commission.grossAmount,
                                        commissionPercentage: mapped.commission.commissionPercentage,
                                        platformCommissionAmount: mapped.commission.platformCommissionAmount,
                                        venueSettlementAmount: mapped.commission.venueSettlementAmount,
                                        currency: mapped.commission.currency,
                                        settlementStatus: (_h = (_g = mapped.settlement) === null || _g === void 0 ? void 0 : _g.status) !== null && _h !== void 0 ? _h : 'UNSETTLED',
                                        settlementPaidAt: (_l = (_k = (_j = mapped.settlement) === null || _j === void 0 ? void 0 : _j.paidAt) === null || _k === void 0 ? void 0 : _k.toISOString()) !== null && _l !== void 0 ? _l : undefined,
                                        paymentReference: (_o = (_m = mapped.settlement) === null || _m === void 0 ? void 0 : _m.paymentReference) !== null && _o !== void 0 ? _o : undefined,
                                    };
                                })];
                    }
                });
            });
        };
        return AdminPaymentsService_1;
    }());
    __setFunctionName(_classThis, "AdminPaymentsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminPaymentsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminPaymentsService = _classThis;
}();
exports.AdminPaymentsService = AdminPaymentsService;
