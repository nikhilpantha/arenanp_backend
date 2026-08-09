"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.FinanceResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var finance_service_1 = require("./finance.service");
var salary_models_1 = require("./dto/salary.models");
var finance_models_1 = require("./dto/finance.models");
/**
 * Venue-owner finance surface. Every handler is venue-scoped (the guard reads
 * `venueId` / `input.venueId`); reads need `finance:read`, writes `finance:write`.
 */
var FinanceResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venueFinanceSummary_decorators;
    var _venueFinanceTrend_decorators;
    var _venueTransactions_decorators;
    var _venueReceivables_decorators;
    var _venueFinancePerformance_decorators;
    var _venueOfferPerformance_decorators;
    var _venuePayoutSummary_decorators;
    var _venueExpenses_decorators;
    var _venueCashDayPreview_decorators;
    var _venueCashReconciliations_decorators;
    var _createVenueExpense_decorators;
    var _updateVenueExpense_decorators;
    var _deleteVenueExpense_decorators;
    var _venueSalaries_decorators;
    var _recordStaffSalaryPayment_decorators;
    var _setStaffPayTerms_decorators;
    var _closeVenueCashDay_decorators;
    var FinanceResolver = _classThis = /** @class */ (function () {
        function FinanceResolver_1(service, salaries) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.salaries = salaries;
        }
        // ─── Reads ─────────────────────────────────────────────────────────────────
        FinanceResolver_1.prototype.venueFinanceSummary = function (input) {
            return this.service.summary(input);
        };
        FinanceResolver_1.prototype.venueFinanceTrend = function (input) {
            return this.service.trend(input);
        };
        FinanceResolver_1.prototype.venueTransactions = function (input) {
            return this.service.transactions(input);
        };
        FinanceResolver_1.prototype.venueReceivables = function (input) {
            return this.service.receivables(input);
        };
        FinanceResolver_1.prototype.venueFinancePerformance = function (input) {
            return this.service.performance(input);
        };
        FinanceResolver_1.prototype.venueOfferPerformance = function (input) {
            return this.service.offerPerformance(input);
        };
        FinanceResolver_1.prototype.venuePayoutSummary = function (venueId) {
            return this.service.payoutSummary(venueId);
        };
        FinanceResolver_1.prototype.venueExpenses = function (input) {
            return this.service.listExpenses(input);
        };
        FinanceResolver_1.prototype.venueCashDayPreview = function (input) {
            return this.service.cashDayPreview(input);
        };
        FinanceResolver_1.prototype.venueCashReconciliations = function (input) {
            return this.service.listReconciliations(input);
        };
        // ─── Writes ────────────────────────────────────────────────────────────────
        FinanceResolver_1.prototype.createVenueExpense = function (input, user) {
            return this.service.createExpense(input, user.id);
        };
        FinanceResolver_1.prototype.updateVenueExpense = function (input) {
            return this.service.updateExpense(input);
        };
        FinanceResolver_1.prototype.deleteVenueExpense = function (venueId, expenseId) {
            return this.service.deleteExpense(venueId, expenseId);
        };
        // ─── Staff salary ──────────────────────────────────────────────────────────
        FinanceResolver_1.prototype.venueSalaries = function (input) {
            return this.salaries.period(input);
        };
        FinanceResolver_1.prototype.recordStaffSalaryPayment = function (input, user) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = finance_service_1.mapExpense;
                            return [4 /*yield*/, this.salaries.recordPayment(input, user.id)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        FinanceResolver_1.prototype.setStaffPayTerms = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.salaries.setPayTerms(input.venueId, input.membershipId, (_a = input.basis) !== null && _a !== void 0 ? _a : null, (_b = input.rate) !== null && _b !== void 0 ? _b : null)];
                        case 1:
                            _c.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        FinanceResolver_1.prototype.closeVenueCashDay = function (input, user) {
            return this.service.closeCashDay(input, user.id);
        };
        return FinanceResolver_1;
    }());
    __setFunctionName(_classThis, "FinanceResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueFinanceSummary_decorators = [(0, graphql_1.Query)(function () { return finance_models_1.FinanceSummary; }, {
                name: 'venueFinanceSummary',
                description: 'Income, give-aways, expenses and net profit for a venue over a period.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueFinanceTrend_decorators = [(0, graphql_1.Query)(function () { return [finance_models_1.FinanceTrendPoint]; }, {
                name: 'venueFinanceTrend',
                description: 'Income, expenses, profit and booking volume as a gap-filled series. Bucket width follows `granularity`, or the range length when omitted.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueTransactions_decorators = [(0, graphql_1.Query)(function () { return finance_models_1.PaginatedTransactions; }, {
                name: 'venueTransactions',
                description: 'Every money movement — booking payments, membership payments and expenses — searchable, filterable, sortable and paged. Totals cover the whole filtered set, not the page.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueReceivables_decorators = [(0, graphql_1.Query)(function () { return [finance_models_1.ReceivableRow]; }, {
                name: 'venueReceivables',
                description: 'Bookings with money still owed, largest first — the list behind `outstanding`.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueFinancePerformance_decorators = [(0, graphql_1.Query)(function () { return finance_models_1.FinancePerformance; }, {
                name: 'venueFinancePerformance',
                description: 'Occupancy, revenue by court / sport, peak hours and top customers.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueOfferPerformance_decorators = [(0, graphql_1.Query)(function () { return finance_models_1.OfferPerformance; }, {
                name: 'venueOfferPerformance',
                description: 'Per-offer cost vs. revenue driven, plus loyalty free-game give-away.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venuePayoutSummary_decorators = [(0, graphql_1.Query)(function () { return finance_models_1.PayoutSummary; }, {
                name: 'venuePayoutSummary',
                description: 'Platform-held settlement balance owed to the venue.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueExpenses_decorators = [(0, graphql_1.Query)(function () { return [finance_models_1.ExpenseModel]; }, {
                name: 'venueExpenses',
                description: 'Expenses for a venue over a period.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueCashDayPreview_decorators = [(0, graphql_1.Query)(function () { return finance_models_1.CashDayPreview; }, {
                name: 'venueCashDayPreview',
                description: 'Expected cash to count for a business day, with the cash-in/out breakdown.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _venueCashReconciliations_decorators = [(0, graphql_1.Query)(function () { return [finance_models_1.CashReconciliationModel]; }, {
                name: 'venueCashReconciliations',
                description: 'Closed cash days for a venue over a period.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _createVenueExpense_decorators = [(0, graphql_1.Mutation)(function () { return finance_models_1.ExpenseModel; }, {
                name: 'createVenueExpense',
                description: 'Record an operating expense.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:write')];
        _updateVenueExpense_decorators = [(0, graphql_1.Mutation)(function () { return finance_models_1.ExpenseModel; }, {
                name: 'updateVenueExpense',
                description: 'Edit an operating expense.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:write')];
        _deleteVenueExpense_decorators = [(0, graphql_1.Mutation)(function () { return finance_models_1.ExpenseModel; }, {
                name: 'deleteVenueExpense',
                description: 'Delete an operating expense.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:write')];
        _venueSalaries_decorators = [(0, graphql_1.Query)(function () { return salary_models_1.VenueSalaryPeriod; }, {
                name: 'venueSalaries',
                description: 'Who is owed what for a pay period, and what has been paid. Daily and per-session staff report a null `due` until a count is entered — the system does not record attendance and will not pretend to.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:read')];
        _recordStaffSalaryPayment_decorators = [(0, graphql_1.Mutation)(function () { return finance_models_1.ExpenseModel; }, {
                name: 'recordStaffSalaryPayment',
                description: 'Record a salary payment. Writes an expense, so it lands in net profit, the ledger, the category breakdown and the cash-day close with no further work.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:write')];
        _setStaffPayTerms_decorators = [(0, graphql_1.Mutation)(function () { return Boolean; }, {
                name: 'setStaffPayTerms',
                description: 'Set or clear what a staff member is paid, and on what basis.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _closeVenueCashDay_decorators = [(0, graphql_1.Mutation)(function () { return finance_models_1.CashReconciliationModel; }, {
                name: 'closeVenueCashDay',
                description: 'Close a business day: snapshot expected cash and record the physical count.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('finance:write')];
        __esDecorate(_classThis, null, _venueFinanceSummary_decorators, { kind: "method", name: "venueFinanceSummary", static: false, private: false, access: { has: function (obj) { return "venueFinanceSummary" in obj; }, get: function (obj) { return obj.venueFinanceSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueFinanceTrend_decorators, { kind: "method", name: "venueFinanceTrend", static: false, private: false, access: { has: function (obj) { return "venueFinanceTrend" in obj; }, get: function (obj) { return obj.venueFinanceTrend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueTransactions_decorators, { kind: "method", name: "venueTransactions", static: false, private: false, access: { has: function (obj) { return "venueTransactions" in obj; }, get: function (obj) { return obj.venueTransactions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueReceivables_decorators, { kind: "method", name: "venueReceivables", static: false, private: false, access: { has: function (obj) { return "venueReceivables" in obj; }, get: function (obj) { return obj.venueReceivables; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueFinancePerformance_decorators, { kind: "method", name: "venueFinancePerformance", static: false, private: false, access: { has: function (obj) { return "venueFinancePerformance" in obj; }, get: function (obj) { return obj.venueFinancePerformance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueOfferPerformance_decorators, { kind: "method", name: "venueOfferPerformance", static: false, private: false, access: { has: function (obj) { return "venueOfferPerformance" in obj; }, get: function (obj) { return obj.venueOfferPerformance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venuePayoutSummary_decorators, { kind: "method", name: "venuePayoutSummary", static: false, private: false, access: { has: function (obj) { return "venuePayoutSummary" in obj; }, get: function (obj) { return obj.venuePayoutSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueExpenses_decorators, { kind: "method", name: "venueExpenses", static: false, private: false, access: { has: function (obj) { return "venueExpenses" in obj; }, get: function (obj) { return obj.venueExpenses; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueCashDayPreview_decorators, { kind: "method", name: "venueCashDayPreview", static: false, private: false, access: { has: function (obj) { return "venueCashDayPreview" in obj; }, get: function (obj) { return obj.venueCashDayPreview; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueCashReconciliations_decorators, { kind: "method", name: "venueCashReconciliations", static: false, private: false, access: { has: function (obj) { return "venueCashReconciliations" in obj; }, get: function (obj) { return obj.venueCashReconciliations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createVenueExpense_decorators, { kind: "method", name: "createVenueExpense", static: false, private: false, access: { has: function (obj) { return "createVenueExpense" in obj; }, get: function (obj) { return obj.createVenueExpense; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateVenueExpense_decorators, { kind: "method", name: "updateVenueExpense", static: false, private: false, access: { has: function (obj) { return "updateVenueExpense" in obj; }, get: function (obj) { return obj.updateVenueExpense; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteVenueExpense_decorators, { kind: "method", name: "deleteVenueExpense", static: false, private: false, access: { has: function (obj) { return "deleteVenueExpense" in obj; }, get: function (obj) { return obj.deleteVenueExpense; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueSalaries_decorators, { kind: "method", name: "venueSalaries", static: false, private: false, access: { has: function (obj) { return "venueSalaries" in obj; }, get: function (obj) { return obj.venueSalaries; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _recordStaffSalaryPayment_decorators, { kind: "method", name: "recordStaffSalaryPayment", static: false, private: false, access: { has: function (obj) { return "recordStaffSalaryPayment" in obj; }, get: function (obj) { return obj.recordStaffSalaryPayment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setStaffPayTerms_decorators, { kind: "method", name: "setStaffPayTerms", static: false, private: false, access: { has: function (obj) { return "setStaffPayTerms" in obj; }, get: function (obj) { return obj.setStaffPayTerms; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _closeVenueCashDay_decorators, { kind: "method", name: "closeVenueCashDay", static: false, private: false, access: { has: function (obj) { return "closeVenueCashDay" in obj; }, get: function (obj) { return obj.closeVenueCashDay; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceResolver = _classThis;
}();
exports.FinanceResolver = FinanceResolver;
