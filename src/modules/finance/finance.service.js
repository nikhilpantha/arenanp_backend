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
exports.FinanceService = void 0;
exports.mapExpense = mapExpense;
var common_1 = require("@nestjs/common");
var nepal_time_1 = require("../../common/utils/nepal-time");
var pagination_input_1 = require("../../common/dto/pagination.input");
var finance_inputs_1 = require("./dto/finance.inputs");
/**
 * Bucket width for a trend. An explicit choice always wins; otherwise the range
 * picks one, because a year of daily points is 365 unreadable ticks and a single
 * week rolled up to months is one bar.
 */
function pickBucket(days, explicit) {
    if (explicit === finance_inputs_1.TrendGranularity.DAY)
        return 'day';
    if (explicit === finance_inputs_1.TrendGranularity.WEEK)
        return 'week';
    if (explicit === finance_inputs_1.TrendGranularity.MONTH)
        return 'month';
    if (days > 120)
        return 'month';
    if (days > 31)
        return 'week';
    return 'day';
}
var num = function (v) { return (typeof v === 'number' ? v : Number(v.toString())); };
function mapExpense(e) {
    var _a, _b, _c;
    return {
        id: e.id,
        venueId: e.venueId,
        category: e.category,
        amount: num(e.amount),
        currency: e.currency,
        description: (_a = e.description) !== null && _a !== void 0 ? _a : undefined,
        vendor: (_b = e.vendor) !== null && _b !== void 0 ? _b : undefined,
        paymentMethod: (_c = e.paymentMethod) !== null && _c !== void 0 ? _c : undefined,
        incurredAt: e.incurredAt,
        createdAt: e.createdAt,
    };
}
function mapReconciliation(r) {
    var _a;
    return {
        id: r.id,
        venueId: r.venueId,
        businessDate: r.businessDate,
        openingFloat: num(r.openingFloat),
        expectedCash: num(r.expectedCash),
        countedCash: num(r.countedCash),
        variance: num(r.variance),
        notes: (_a = r.notes) !== null && _a !== void 0 ? _a : undefined,
        closedAt: r.closedAt,
    };
}
/** "yyyy-mm-dd" (or undefined = today) → that day's UTC business window. */
function dayWindow(date) {
    return (0, nepal_time_1.dayBounds)(date ? new Date("".concat(date, "T00:00:00.000Z")) : new Date());
}
var FinanceService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FinanceService = _classThis = /** @class */ (function () {
        function FinanceService_1(repo) {
            this.repo = repo;
        }
        /**
         * Resolve a request's window, including the two presets plain arithmetic can't
         * answer: TOMORROW (a forward day — money expected on advance bookings, since
         * bookings bucket by play date) and ALL (which has to ask the data where the
         * venue's history actually starts).
         */
        FinanceService_1.prototype.window = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var t, _a, gte, lt, first, lt, gte, days;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (input.from && input.to)
                                return [2 /*return*/, (0, nepal_time_1.resolveRange)(input)];
                            if (input.preset === finance_inputs_1.FinanceRangePreset.TOMORROW) {
                                t = new Date();
                                t.setUTCDate(t.getUTCDate() + 1);
                                _a = (0, nepal_time_1.dayBounds)(t), gte = _a.gte, lt = _a.lt;
                                return [2 /*return*/, { gte: gte, lt: lt, days: 1 }];
                            }
                            if (!(input.preset === finance_inputs_1.FinanceRangePreset.ALL)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.repo.firstActivityAt(input.venueId)];
                        case 1:
                            first = _b.sent();
                            lt = (0, nepal_time_1.dayBounds)(new Date()).lt;
                            gte = first ? (0, nepal_time_1.dayBounds)(first).gte : (0, nepal_time_1.dayBounds)(new Date()).gte;
                            days = Math.max(1, Math.round((lt.getTime() - gte.getTime()) / 86400000));
                            return [2 /*return*/, { gte: gte, lt: lt, days: days }];
                        case 2: return [2 /*return*/, (0, nepal_time_1.resolveRange)(input)];
                    }
                });
            });
        };
        FinanceService_1.prototype.summary = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.repo).summary;
                            _c = [input.venueId];
                            return [4 /*yield*/, this.window(input)];
                        case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    }
                });
            });
        };
        FinanceService_1.prototype.trend = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var range;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.window(input)];
                        case 1:
                            range = _a.sent();
                            return [2 /*return*/, this.repo.trend(input.venueId, range, pickBucket(range.days, input.granularity))];
                    }
                });
            });
        };
        FinanceService_1.prototype.performance = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.repo).performance;
                            _c = [input.venueId];
                            return [4 /*yield*/, this.window(input)];
                        case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    }
                });
            });
        };
        FinanceService_1.prototype.offerPerformance = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.repo).offerPerformance;
                            _c = [input.venueId];
                            return [4 /*yield*/, this.window(input)];
                        case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    }
                });
            });
        };
        FinanceService_1.prototype.transactions = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, result, _a, _b;
                var _c;
                var _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            page = (_d = input.page) !== null && _d !== void 0 ? _d : 1;
                            pageSize = (_e = input.pageSize) !== null && _e !== void 0 ? _e : 25;
                            _b = (_a = this.repo).transactions;
                            _c = {
                                venueId: input.venueId
                            };
                            return [4 /*yield*/, this.window(input)];
                        case 1: return [4 /*yield*/, _b.apply(_a, [(_c.range = _g.sent(),
                                    _c.search = input.search,
                                    _c.kinds = input.kinds,
                                    _c.method = input.method,
                                    _c.category = input.category,
                                    _c.sort = (_f = input.sort) !== null && _f !== void 0 ? _f : finance_inputs_1.TransactionSort.DATE_DESC,
                                    _c.page = page,
                                    _c.pageSize = pageSize,
                                    _c)])];
                        case 2:
                            result = _g.sent();
                            return [2 /*return*/, {
                                    items: result.items,
                                    totals: result.totals,
                                    pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, result.total),
                                }];
                    }
                });
            });
        };
        FinanceService_1.prototype.receivables = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = this.repo).receivables;
                            _c = [input.venueId];
                            return [4 /*yield*/, this.window(input)];
                        case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                    }
                });
            });
        };
        FinanceService_1.prototype.payoutSummary = function (venueId) {
            return this.repo.payoutSummary(venueId);
        };
        // ─── Expenses ────────────────────────────────────────────────────────────────
        FinanceService_1.prototype.listExpenses = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.listExpenses(input.venueId, (0, nepal_time_1.resolveRange)(input), input.category)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(mapExpense)];
                    }
                });
            });
        };
        FinanceService_1.prototype.createExpense = function (input, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.createExpense({
                                venueId: input.venueId,
                                category: input.category,
                                amount: input.amount,
                                description: input.description,
                                vendor: input.vendor,
                                paymentMethod: input.paymentMethod,
                                incurredAt: input.incurredAt,
                                createdById: userId,
                            })];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, mapExpense(row)];
                    }
                });
            });
        };
        FinanceService_1.prototype.updateExpense = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var row, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.repo.updateExpense(input.venueId, input.expenseId, {
                                    category: input.category,
                                    amount: input.amount,
                                    description: input.description,
                                    vendor: input.vendor,
                                    paymentMethod: input.paymentMethod,
                                    incurredAt: input.incurredAt,
                                })];
                        case 1:
                            row = _b.sent();
                            return [2 /*return*/, mapExpense(row)];
                        case 2:
                            _a = _b.sent();
                            throw new common_1.NotFoundException('Expense not found.');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        FinanceService_1.prototype.deleteExpense = function (venueId, expenseId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            _a = mapExpense;
                            return [4 /*yield*/, this.repo.deleteExpense(venueId, expenseId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                        case 2:
                            _b = _c.sent();
                            throw new common_1.NotFoundException('Expense not found.');
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // ─── Cash reconciliation ─────────────────────────────────────────────────────
        FinanceService_1.prototype.cashDayPreview = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, gte, lt, businessDate, _b, flow, existing, openingFloat;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = dayWindow(input.date), gte = _a.gte, lt = _a.lt;
                            businessDate = gte;
                            return [4 /*yield*/, Promise.all([
                                    this.repo.cashFlowForDay(input.venueId, gte, lt),
                                    this.repo.findReconciliation(input.venueId, businessDate),
                                ])];
                        case 1:
                            _b = _c.sent(), flow = _b[0], existing = _b[1];
                            openingFloat = existing ? num(existing.openingFloat) : 0;
                            return [2 /*return*/, {
                                    businessDate: businessDate.toISOString().slice(0, 10),
                                    openingFloat: openingFloat,
                                    cashIn: flow.cashIn,
                                    cashOut: flow.cashOut,
                                    expectedCash: openingFloat + flow.cashIn - flow.cashOut,
                                    alreadyClosed: !!existing,
                                    reconciliation: existing ? mapReconciliation(existing) : undefined,
                                }];
                    }
                });
            });
        };
        FinanceService_1.prototype.closeCashDay = function (input, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, gte, lt, flow, openingFloat, expectedCash, row;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = dayWindow(input.businessDate), gte = _a.gte, lt = _a.lt;
                            return [4 /*yield*/, this.repo.cashFlowForDay(input.venueId, gte, lt)];
                        case 1:
                            flow = _c.sent();
                            openingFloat = (_b = input.openingFloat) !== null && _b !== void 0 ? _b : 0;
                            expectedCash = openingFloat + flow.cashIn - flow.cashOut;
                            return [4 /*yield*/, this.repo.upsertReconciliation({
                                    venueId: input.venueId,
                                    businessDate: gte,
                                    openingFloat: openingFloat,
                                    expectedCash: expectedCash,
                                    countedCash: input.countedCash,
                                    variance: input.countedCash - expectedCash,
                                    notes: input.notes,
                                    closedById: userId,
                                })];
                        case 2:
                            row = _c.sent();
                            return [2 /*return*/, mapReconciliation(row)];
                    }
                });
            });
        };
        FinanceService_1.prototype.listReconciliations = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.listReconciliations(input.venueId, (0, nepal_time_1.resolveRange)(input))];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(mapReconciliation)];
                    }
                });
            });
        };
        return FinanceService_1;
    }());
    __setFunctionName(_classThis, "FinanceService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceService = _classThis;
}();
exports.FinanceService = FinanceService;
