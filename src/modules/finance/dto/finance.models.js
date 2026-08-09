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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashDayPreview = exports.CashReconciliationModel = exports.ExpenseModel = exports.PayoutSummary = exports.OfferPerformance = exports.OfferRoi = exports.FinancePerformance = exports.TopCustomer = exports.PeakHourPoint = exports.SportRevenue = exports.CourtRevenue = exports.ReceivableRow = exports.PaginatedTransactions = exports.TransactionTotals = exports.TransactionRow = exports.FinanceTrendPoint = exports.ExpenseCategoryTotal = exports.FinanceSummary = exports.FreeGameStat = void 0;
var graphql_1 = require("@nestjs/graphql");
var pagination_input_1 = require("../../../common/dto/pagination.input");
// Side-effect import to register shared GraphQL enums (ExpenseCategory, PaymentProvider…).
require("../../../common/enums");
var FreeGameStat = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Loyalty free games redeemed and the play value forgone.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _count_decorators;
    var _count_initializers = [];
    var _count_extraInitializers = [];
    var _forgoneValue_decorators;
    var _forgoneValue_initializers = [];
    var _forgoneValue_extraInitializers = [];
    var FreeGameStat = _classThis = /** @class */ (function () {
        function FreeGameStat_1() {
            this.count = __runInitializers(this, _count_initializers, void 0);
            this.forgoneValue = (__runInitializers(this, _count_extraInitializers), __runInitializers(this, _forgoneValue_initializers, void 0));
            __runInitializers(this, _forgoneValue_extraInitializers);
        }
        return FreeGameStat_1;
    }());
    __setFunctionName(_classThis, "FreeGameStat");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _count_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _forgoneValue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: function (obj) { return "count" in obj; }, get: function (obj) { return obj.count; }, set: function (obj, value) { obj.count = value; } }, metadata: _metadata }, _count_initializers, _count_extraInitializers);
        __esDecorate(null, null, _forgoneValue_decorators, { kind: "field", name: "forgoneValue", static: false, private: false, access: { has: function (obj) { return "forgoneValue" in obj; }, get: function (obj) { return obj.forgoneValue; }, set: function (obj, value) { obj.forgoneValue = value; } }, metadata: _metadata }, _forgoneValue_initializers, _forgoneValue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FreeGameStat = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FreeGameStat = _classThis;
}();
exports.FreeGameStat = FreeGameStat;
var FinanceSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: "A venue's money picture for a period: income received across every rail, what was given away, expenses, and the resulting net profit.",
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _income_decorators;
    var _income_initializers = [];
    var _income_extraInitializers = [];
    var _bookingIncome_decorators;
    var _bookingIncome_initializers = [];
    var _bookingIncome_extraInitializers = [];
    var _membershipIncome_decorators;
    var _membershipIncome_initializers = [];
    var _membershipIncome_extraInitializers = [];
    var _addOnRevenue_decorators;
    var _addOnRevenue_initializers = [];
    var _addOnRevenue_extraInitializers = [];
    var _cashIncome_decorators;
    var _cashIncome_initializers = [];
    var _cashIncome_extraInitializers = [];
    var _digitalIncome_decorators;
    var _digitalIncome_initializers = [];
    var _digitalIncome_extraInitializers = [];
    var _discountsGiven_decorators;
    var _discountsGiven_initializers = [];
    var _discountsGiven_extraInitializers = [];
    var _freeGames_decorators;
    var _freeGames_initializers = [];
    var _freeGames_extraInitializers = [];
    var _revenue_decorators;
    var _revenue_initializers = [];
    var _revenue_extraInitializers = [];
    var _grossRevenue_decorators;
    var _grossRevenue_initializers = [];
    var _grossRevenue_extraInitializers = [];
    var _expensesTotal_decorators;
    var _expensesTotal_initializers = [];
    var _expensesTotal_extraInitializers = [];
    var _expensesByCategory_decorators;
    var _expensesByCategory_initializers = [];
    var _expensesByCategory_extraInitializers = [];
    var _netProfit_decorators;
    var _netProfit_initializers = [];
    var _netProfit_extraInitializers = [];
    var _outstanding_decorators;
    var _outstanding_initializers = [];
    var _outstanding_extraInitializers = [];
    var _bookingsCount_decorators;
    var _bookingsCount_initializers = [];
    var _bookingsCount_extraInitializers = [];
    var _paidNoShows_decorators;
    var _paidNoShows_initializers = [];
    var _paidNoShows_extraInitializers = [];
    var FinanceSummary = _classThis = /** @class */ (function () {
        function FinanceSummary_1() {
            this.income = __runInitializers(this, _income_initializers, void 0);
            this.bookingIncome = (__runInitializers(this, _income_extraInitializers), __runInitializers(this, _bookingIncome_initializers, void 0));
            this.membershipIncome = (__runInitializers(this, _bookingIncome_extraInitializers), __runInitializers(this, _membershipIncome_initializers, void 0));
            this.addOnRevenue = (__runInitializers(this, _membershipIncome_extraInitializers), __runInitializers(this, _addOnRevenue_initializers, void 0));
            this.cashIncome = (__runInitializers(this, _addOnRevenue_extraInitializers), __runInitializers(this, _cashIncome_initializers, void 0));
            this.digitalIncome = (__runInitializers(this, _cashIncome_extraInitializers), __runInitializers(this, _digitalIncome_initializers, void 0));
            this.discountsGiven = (__runInitializers(this, _digitalIncome_extraInitializers), __runInitializers(this, _discountsGiven_initializers, void 0));
            this.freeGames = (__runInitializers(this, _discountsGiven_extraInitializers), __runInitializers(this, _freeGames_initializers, void 0));
            this.revenue = (__runInitializers(this, _freeGames_extraInitializers), __runInitializers(this, _revenue_initializers, void 0));
            this.grossRevenue = (__runInitializers(this, _revenue_extraInitializers), __runInitializers(this, _grossRevenue_initializers, void 0));
            this.expensesTotal = (__runInitializers(this, _grossRevenue_extraInitializers), __runInitializers(this, _expensesTotal_initializers, void 0));
            this.expensesByCategory = (__runInitializers(this, _expensesTotal_extraInitializers), __runInitializers(this, _expensesByCategory_initializers, void 0));
            this.netProfit = (__runInitializers(this, _expensesByCategory_extraInitializers), __runInitializers(this, _netProfit_initializers, void 0));
            this.outstanding = (__runInitializers(this, _netProfit_extraInitializers), __runInitializers(this, _outstanding_initializers, void 0));
            this.bookingsCount = (__runInitializers(this, _outstanding_extraInitializers), __runInitializers(this, _bookingsCount_initializers, void 0));
            this.paidNoShows = (__runInitializers(this, _bookingsCount_extraInitializers), __runInitializers(this, _paidNoShows_initializers, void 0));
            __runInitializers(this, _paidNoShows_extraInitializers);
        }
        return FinanceSummary_1;
    }());
    __setFunctionName(_classThis, "FinanceSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _income_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Total money received = bookings + memberships.' })];
        _bookingIncome_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _membershipIncome_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _addOnRevenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Add-on revenue (already counted inside bookingIncome).' })];
        _cashIncome_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _digitalIncome_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _discountsGiven_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'Promo/loyalty discounts given (informational, not re-deducted).',
            })];
        _freeGames_decorators = [(0, graphql_1.Field)(function () { return FreeGameStat; })];
        _revenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'Billed for the period = collected + outstanding. Already net of discounts.',
            })];
        _grossRevenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'List price before discounts. gross − discountsGiven = revenue.',
            })];
        _expensesTotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _expensesByCategory_decorators = [(0, graphql_1.Field)(function () { return [ExpenseCategoryTotal]; }, { description: 'Expense split, biggest first.' })];
        _netProfit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'income − expenses.' })];
        _outstanding_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Billed but not yet collected (receivables).' })];
        _bookingsCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Non-cancelled bookings in the period.' })];
        _paidNoShows_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'Money taken on bookings the customer never turned up for.',
            })];
        __esDecorate(null, null, _income_decorators, { kind: "field", name: "income", static: false, private: false, access: { has: function (obj) { return "income" in obj; }, get: function (obj) { return obj.income; }, set: function (obj, value) { obj.income = value; } }, metadata: _metadata }, _income_initializers, _income_extraInitializers);
        __esDecorate(null, null, _bookingIncome_decorators, { kind: "field", name: "bookingIncome", static: false, private: false, access: { has: function (obj) { return "bookingIncome" in obj; }, get: function (obj) { return obj.bookingIncome; }, set: function (obj, value) { obj.bookingIncome = value; } }, metadata: _metadata }, _bookingIncome_initializers, _bookingIncome_extraInitializers);
        __esDecorate(null, null, _membershipIncome_decorators, { kind: "field", name: "membershipIncome", static: false, private: false, access: { has: function (obj) { return "membershipIncome" in obj; }, get: function (obj) { return obj.membershipIncome; }, set: function (obj, value) { obj.membershipIncome = value; } }, metadata: _metadata }, _membershipIncome_initializers, _membershipIncome_extraInitializers);
        __esDecorate(null, null, _addOnRevenue_decorators, { kind: "field", name: "addOnRevenue", static: false, private: false, access: { has: function (obj) { return "addOnRevenue" in obj; }, get: function (obj) { return obj.addOnRevenue; }, set: function (obj, value) { obj.addOnRevenue = value; } }, metadata: _metadata }, _addOnRevenue_initializers, _addOnRevenue_extraInitializers);
        __esDecorate(null, null, _cashIncome_decorators, { kind: "field", name: "cashIncome", static: false, private: false, access: { has: function (obj) { return "cashIncome" in obj; }, get: function (obj) { return obj.cashIncome; }, set: function (obj, value) { obj.cashIncome = value; } }, metadata: _metadata }, _cashIncome_initializers, _cashIncome_extraInitializers);
        __esDecorate(null, null, _digitalIncome_decorators, { kind: "field", name: "digitalIncome", static: false, private: false, access: { has: function (obj) { return "digitalIncome" in obj; }, get: function (obj) { return obj.digitalIncome; }, set: function (obj, value) { obj.digitalIncome = value; } }, metadata: _metadata }, _digitalIncome_initializers, _digitalIncome_extraInitializers);
        __esDecorate(null, null, _discountsGiven_decorators, { kind: "field", name: "discountsGiven", static: false, private: false, access: { has: function (obj) { return "discountsGiven" in obj; }, get: function (obj) { return obj.discountsGiven; }, set: function (obj, value) { obj.discountsGiven = value; } }, metadata: _metadata }, _discountsGiven_initializers, _discountsGiven_extraInitializers);
        __esDecorate(null, null, _freeGames_decorators, { kind: "field", name: "freeGames", static: false, private: false, access: { has: function (obj) { return "freeGames" in obj; }, get: function (obj) { return obj.freeGames; }, set: function (obj, value) { obj.freeGames = value; } }, metadata: _metadata }, _freeGames_initializers, _freeGames_extraInitializers);
        __esDecorate(null, null, _revenue_decorators, { kind: "field", name: "revenue", static: false, private: false, access: { has: function (obj) { return "revenue" in obj; }, get: function (obj) { return obj.revenue; }, set: function (obj, value) { obj.revenue = value; } }, metadata: _metadata }, _revenue_initializers, _revenue_extraInitializers);
        __esDecorate(null, null, _grossRevenue_decorators, { kind: "field", name: "grossRevenue", static: false, private: false, access: { has: function (obj) { return "grossRevenue" in obj; }, get: function (obj) { return obj.grossRevenue; }, set: function (obj, value) { obj.grossRevenue = value; } }, metadata: _metadata }, _grossRevenue_initializers, _grossRevenue_extraInitializers);
        __esDecorate(null, null, _expensesTotal_decorators, { kind: "field", name: "expensesTotal", static: false, private: false, access: { has: function (obj) { return "expensesTotal" in obj; }, get: function (obj) { return obj.expensesTotal; }, set: function (obj, value) { obj.expensesTotal = value; } }, metadata: _metadata }, _expensesTotal_initializers, _expensesTotal_extraInitializers);
        __esDecorate(null, null, _expensesByCategory_decorators, { kind: "field", name: "expensesByCategory", static: false, private: false, access: { has: function (obj) { return "expensesByCategory" in obj; }, get: function (obj) { return obj.expensesByCategory; }, set: function (obj, value) { obj.expensesByCategory = value; } }, metadata: _metadata }, _expensesByCategory_initializers, _expensesByCategory_extraInitializers);
        __esDecorate(null, null, _netProfit_decorators, { kind: "field", name: "netProfit", static: false, private: false, access: { has: function (obj) { return "netProfit" in obj; }, get: function (obj) { return obj.netProfit; }, set: function (obj, value) { obj.netProfit = value; } }, metadata: _metadata }, _netProfit_initializers, _netProfit_extraInitializers);
        __esDecorate(null, null, _outstanding_decorators, { kind: "field", name: "outstanding", static: false, private: false, access: { has: function (obj) { return "outstanding" in obj; }, get: function (obj) { return obj.outstanding; }, set: function (obj, value) { obj.outstanding = value; } }, metadata: _metadata }, _outstanding_initializers, _outstanding_extraInitializers);
        __esDecorate(null, null, _bookingsCount_decorators, { kind: "field", name: "bookingsCount", static: false, private: false, access: { has: function (obj) { return "bookingsCount" in obj; }, get: function (obj) { return obj.bookingsCount; }, set: function (obj, value) { obj.bookingsCount = value; } }, metadata: _metadata }, _bookingsCount_initializers, _bookingsCount_extraInitializers);
        __esDecorate(null, null, _paidNoShows_decorators, { kind: "field", name: "paidNoShows", static: false, private: false, access: { has: function (obj) { return "paidNoShows" in obj; }, get: function (obj) { return obj.paidNoShows; }, set: function (obj, value) { obj.paidNoShows = value; } }, metadata: _metadata }, _paidNoShows_initializers, _paidNoShows_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceSummary = _classThis;
}();
exports.FinanceSummary = FinanceSummary;
var ExpenseCategoryTotal = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'One expense category and what it cost in the period.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _count_decorators;
    var _count_initializers = [];
    var _count_extraInitializers = [];
    var ExpenseCategoryTotal = _classThis = /** @class */ (function () {
        function ExpenseCategoryTotal_1() {
            this.category = __runInitializers(this, _category_initializers, void 0);
            this.amount = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.count = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _count_initializers, void 0));
            __runInitializers(this, _count_extraInitializers);
        }
        return ExpenseCategoryTotal_1;
    }());
    __setFunctionName(_classThis, "ExpenseCategoryTotal");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _category_decorators = [(0, graphql_1.Field)(function () { return String; })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _count_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: function (obj) { return "count" in obj; }, get: function (obj) { return obj.count; }, set: function (obj, value) { obj.count = value; } }, metadata: _metadata }, _count_initializers, _count_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpenseCategoryTotal = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpenseCategoryTotal = _classThis;
}();
exports.ExpenseCategoryTotal = ExpenseCategoryTotal;
var FinanceTrendPoint = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var _income_decorators;
    var _income_initializers = [];
    var _income_extraInitializers = [];
    var _expenses_decorators;
    var _expenses_initializers = [];
    var _expenses_extraInitializers = [];
    var _profit_decorators;
    var _profit_initializers = [];
    var _profit_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var FinanceTrendPoint = _classThis = /** @class */ (function () {
        function FinanceTrendPoint_1() {
            this.date = __runInitializers(this, _date_initializers, void 0);
            this.label = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _label_initializers, void 0));
            this.income = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _income_initializers, void 0));
            this.expenses = (__runInitializers(this, _income_extraInitializers), __runInitializers(this, _expenses_initializers, void 0));
            this.profit = (__runInitializers(this, _expenses_extraInitializers), __runInitializers(this, _profit_initializers, void 0));
            this.bookings = (__runInitializers(this, _profit_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            __runInitializers(this, _bookings_extraInitializers);
        }
        return FinanceTrendPoint_1;
    }());
    __setFunctionName(_classThis, "FinanceTrendPoint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _date_decorators = [(0, graphql_1.Field)({ description: 'Bucket start, "yyyy-mm-dd".' })];
        _label_decorators = [(0, graphql_1.Field)({ description: 'Human label for the bucket, e.g. "7 Aug" or "Aug 2026".' })];
        _income_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _expenses_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _profit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'income − expenses for this bucket.' })];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, null, _income_decorators, { kind: "field", name: "income", static: false, private: false, access: { has: function (obj) { return "income" in obj; }, get: function (obj) { return obj.income; }, set: function (obj, value) { obj.income = value; } }, metadata: _metadata }, _income_initializers, _income_extraInitializers);
        __esDecorate(null, null, _expenses_decorators, { kind: "field", name: "expenses", static: false, private: false, access: { has: function (obj) { return "expenses" in obj; }, get: function (obj) { return obj.expenses; }, set: function (obj, value) { obj.expenses = value; } }, metadata: _metadata }, _expenses_initializers, _expenses_extraInitializers);
        __esDecorate(null, null, _profit_decorators, { kind: "field", name: "profit", static: false, private: false, access: { has: function (obj) { return "profit" in obj; }, get: function (obj) { return obj.profit; }, set: function (obj, value) { obj.profit = value; } }, metadata: _metadata }, _profit_initializers, _profit_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceTrendPoint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceTrendPoint = _classThis;
}();
exports.FinanceTrendPoint = FinanceTrendPoint;
var TransactionRow = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'One money movement in the venue ledger.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _kind_decorators;
    var _kind_initializers = [];
    var _kind_extraInitializers = [];
    var _occurredAt_decorators;
    var _occurredAt_initializers = [];
    var _occurredAt_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _counterparty_decorators;
    var _counterparty_initializers = [];
    var _counterparty_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _reference_decorators;
    var _reference_initializers = [];
    var _reference_extraInitializers = [];
    var TransactionRow = _classThis = /** @class */ (function () {
        function TransactionRow_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.kind = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _kind_initializers, void 0));
            this.occurredAt = (__runInitializers(this, _kind_extraInitializers), __runInitializers(this, _occurredAt_initializers, void 0));
            this.description = (__runInitializers(this, _occurredAt_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.counterparty = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _counterparty_initializers, void 0));
            this.method = (__runInitializers(this, _counterparty_extraInitializers), __runInitializers(this, _method_initializers, void 0));
            this.category = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.amount = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.reference = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _reference_initializers, void 0));
            __runInitializers(this, _reference_extraInitializers);
        }
        return TransactionRow_1;
    }());
    __setFunctionName(_classThis, "TransactionRow");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _kind_decorators = [(0, graphql_1.Field)(function () { return String; }, { description: 'BOOKING_PAYMENT | MEMBERSHIP_PAYMENT | EXPENSE.' })];
        _occurredAt_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ description: 'What it was — customer, plan or expense description.' })];
        _counterparty_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Court, plan or vendor.' })];
        _method_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _category_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Expense category, when it is one.' })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Positive = money in, negative = money out.' })];
        _reference_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Booking id, for linking back.' })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _kind_decorators, { kind: "field", name: "kind", static: false, private: false, access: { has: function (obj) { return "kind" in obj; }, get: function (obj) { return obj.kind; }, set: function (obj, value) { obj.kind = value; } }, metadata: _metadata }, _kind_initializers, _kind_extraInitializers);
        __esDecorate(null, null, _occurredAt_decorators, { kind: "field", name: "occurredAt", static: false, private: false, access: { has: function (obj) { return "occurredAt" in obj; }, get: function (obj) { return obj.occurredAt; }, set: function (obj, value) { obj.occurredAt = value; } }, metadata: _metadata }, _occurredAt_initializers, _occurredAt_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _counterparty_decorators, { kind: "field", name: "counterparty", static: false, private: false, access: { has: function (obj) { return "counterparty" in obj; }, get: function (obj) { return obj.counterparty; }, set: function (obj, value) { obj.counterparty = value; } }, metadata: _metadata }, _counterparty_initializers, _counterparty_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _reference_decorators, { kind: "field", name: "reference", static: false, private: false, access: { has: function (obj) { return "reference" in obj; }, get: function (obj) { return obj.reference; }, set: function (obj, value) { obj.reference = value; } }, metadata: _metadata }, _reference_initializers, _reference_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionRow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionRow = _classThis;
}();
exports.TransactionRow = TransactionRow;
var TransactionTotals = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Totals across every row matching the filter — not just this page.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _moneyIn_decorators;
    var _moneyIn_initializers = [];
    var _moneyIn_extraInitializers = [];
    var _moneyOut_decorators;
    var _moneyOut_initializers = [];
    var _moneyOut_extraInitializers = [];
    var _net_decorators;
    var _net_initializers = [];
    var _net_extraInitializers = [];
    var _count_decorators;
    var _count_initializers = [];
    var _count_extraInitializers = [];
    var TransactionTotals = _classThis = /** @class */ (function () {
        function TransactionTotals_1() {
            this.moneyIn = __runInitializers(this, _moneyIn_initializers, void 0);
            this.moneyOut = (__runInitializers(this, _moneyIn_extraInitializers), __runInitializers(this, _moneyOut_initializers, void 0));
            this.net = (__runInitializers(this, _moneyOut_extraInitializers), __runInitializers(this, _net_initializers, void 0));
            this.count = (__runInitializers(this, _net_extraInitializers), __runInitializers(this, _count_initializers, void 0));
            __runInitializers(this, _count_extraInitializers);
        }
        return TransactionTotals_1;
    }());
    __setFunctionName(_classThis, "TransactionTotals");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _moneyIn_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _moneyOut_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _net_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'moneyIn − moneyOut.' })];
        _count_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _moneyIn_decorators, { kind: "field", name: "moneyIn", static: false, private: false, access: { has: function (obj) { return "moneyIn" in obj; }, get: function (obj) { return obj.moneyIn; }, set: function (obj, value) { obj.moneyIn = value; } }, metadata: _metadata }, _moneyIn_initializers, _moneyIn_extraInitializers);
        __esDecorate(null, null, _moneyOut_decorators, { kind: "field", name: "moneyOut", static: false, private: false, access: { has: function (obj) { return "moneyOut" in obj; }, get: function (obj) { return obj.moneyOut; }, set: function (obj, value) { obj.moneyOut = value; } }, metadata: _metadata }, _moneyOut_initializers, _moneyOut_extraInitializers);
        __esDecorate(null, null, _net_decorators, { kind: "field", name: "net", static: false, private: false, access: { has: function (obj) { return "net" in obj; }, get: function (obj) { return obj.net; }, set: function (obj, value) { obj.net = value; } }, metadata: _metadata }, _net_initializers, _net_extraInitializers);
        __esDecorate(null, null, _count_decorators, { kind: "field", name: "count", static: false, private: false, access: { has: function (obj) { return "count" in obj; }, get: function (obj) { return obj.count; }, set: function (obj, value) { obj.count = value; } }, metadata: _metadata }, _count_initializers, _count_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TransactionTotals = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TransactionTotals = _classThis;
}();
exports.TransactionTotals = TransactionTotals;
var PaginatedTransactions = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _totals_decorators;
    var _totals_initializers = [];
    var _totals_extraInitializers = [];
    var _pageInfo_decorators;
    var _pageInfo_initializers = [];
    var _pageInfo_extraInitializers = [];
    var PaginatedTransactions = _classThis = /** @class */ (function () {
        function PaginatedTransactions_1() {
            this.items = __runInitializers(this, _items_initializers, void 0);
            this.totals = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _totals_initializers, void 0));
            this.pageInfo = (__runInitializers(this, _totals_extraInitializers), __runInitializers(this, _pageInfo_initializers, void 0));
            __runInitializers(this, _pageInfo_extraInitializers);
        }
        return PaginatedTransactions_1;
    }());
    __setFunctionName(_classThis, "PaginatedTransactions");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _items_decorators = [(0, graphql_1.Field)(function () { return [TransactionRow]; })];
        _totals_decorators = [(0, graphql_1.Field)(function () { return TransactionTotals; })];
        _pageInfo_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PageInfo; })];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _totals_decorators, { kind: "field", name: "totals", static: false, private: false, access: { has: function (obj) { return "totals" in obj; }, get: function (obj) { return obj.totals; }, set: function (obj, value) { obj.totals = value; } }, metadata: _metadata }, _totals_initializers, _totals_extraInitializers);
        __esDecorate(null, null, _pageInfo_decorators, { kind: "field", name: "pageInfo", static: false, private: false, access: { has: function (obj) { return "pageInfo" in obj; }, get: function (obj) { return obj.pageInfo; }, set: function (obj, value) { obj.pageInfo = value; } }, metadata: _metadata }, _pageInfo_initializers, _pageInfo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginatedTransactions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginatedTransactions = _classThis;
}();
exports.PaginatedTransactions = PaginatedTransactions;
var ReceivableRow = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A booking with money still owed on it.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerName_extraInitializers = [];
    var _customerPhone_decorators;
    var _customerPhone_initializers = [];
    var _customerPhone_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _outstanding_decorators;
    var _outstanding_initializers = [];
    var _outstanding_extraInitializers = [];
    var ReceivableRow = _classThis = /** @class */ (function () {
        function ReceivableRow_1() {
            this.bookingId = __runInitializers(this, _bookingId_initializers, void 0);
            this.customerName = (__runInitializers(this, _bookingId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.customerPhone = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerPhone_initializers, void 0));
            this.courtName = (__runInitializers(this, _customerPhone_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.startAt = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.total = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.outstanding = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _outstanding_initializers, void 0));
            __runInitializers(this, _outstanding_extraInitializers);
        }
        return ReceivableRow_1;
    }());
    __setFunctionName(_classThis, "ReceivableRow");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bookingId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _customerName_decorators = [(0, graphql_1.Field)()];
        _customerPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _courtName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _outstanding_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } }, metadata: _metadata }, _customerPhone_initializers, _customerPhone_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _outstanding_decorators, { kind: "field", name: "outstanding", static: false, private: false, access: { has: function (obj) { return "outstanding" in obj; }, get: function (obj) { return obj.outstanding; }, set: function (obj, value) { obj.outstanding = value; } }, metadata: _metadata }, _outstanding_initializers, _outstanding_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReceivableRow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReceivableRow = _classThis;
}();
exports.ReceivableRow = ReceivableRow;
var CourtRevenue = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var _revenue_decorators;
    var _revenue_initializers = [];
    var _revenue_extraInitializers = [];
    var CourtRevenue = _classThis = /** @class */ (function () {
        function CourtRevenue_1() {
            this.courtId = __runInitializers(this, _courtId_initializers, void 0);
            this.courtName = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.sport = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.bookings = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            this.revenue = (__runInitializers(this, _bookings_extraInitializers), __runInitializers(this, _revenue_initializers, void 0));
            __runInitializers(this, _revenue_extraInitializers);
        }
        return CourtRevenue_1;
    }());
    __setFunctionName(_classThis, "CourtRevenue");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _courtName_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _revenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, null, _revenue_decorators, { kind: "field", name: "revenue", static: false, private: false, access: { has: function (obj) { return "revenue" in obj; }, get: function (obj) { return obj.revenue; }, set: function (obj, value) { obj.revenue = value; } }, metadata: _metadata }, _revenue_initializers, _revenue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CourtRevenue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CourtRevenue = _classThis;
}();
exports.CourtRevenue = CourtRevenue;
var SportRevenue = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var _revenue_decorators;
    var _revenue_initializers = [];
    var _revenue_extraInitializers = [];
    var SportRevenue = _classThis = /** @class */ (function () {
        function SportRevenue_1() {
            this.sport = __runInitializers(this, _sport_initializers, void 0);
            this.bookings = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            this.revenue = (__runInitializers(this, _bookings_extraInitializers), __runInitializers(this, _revenue_initializers, void 0));
            __runInitializers(this, _revenue_extraInitializers);
        }
        return SportRevenue_1;
    }());
    __setFunctionName(_classThis, "SportRevenue");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sport_decorators = [(0, graphql_1.Field)()];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _revenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, null, _revenue_decorators, { kind: "field", name: "revenue", static: false, private: false, access: { has: function (obj) { return "revenue" in obj; }, get: function (obj) { return obj.revenue; }, set: function (obj, value) { obj.revenue = value; } }, metadata: _metadata }, _revenue_initializers, _revenue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SportRevenue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SportRevenue = _classThis;
}();
exports.SportRevenue = SportRevenue;
var PeakHourPoint = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Revenue + booking volume for one hour of the day (0–23, Nepal time).' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _hour_decorators;
    var _hour_initializers = [];
    var _hour_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var _revenue_decorators;
    var _revenue_initializers = [];
    var _revenue_extraInitializers = [];
    var PeakHourPoint = _classThis = /** @class */ (function () {
        function PeakHourPoint_1() {
            this.hour = __runInitializers(this, _hour_initializers, void 0);
            this.bookings = (__runInitializers(this, _hour_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            this.revenue = (__runInitializers(this, _bookings_extraInitializers), __runInitializers(this, _revenue_initializers, void 0));
            __runInitializers(this, _revenue_extraInitializers);
        }
        return PeakHourPoint_1;
    }());
    __setFunctionName(_classThis, "PeakHourPoint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _revenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _hour_decorators, { kind: "field", name: "hour", static: false, private: false, access: { has: function (obj) { return "hour" in obj; }, get: function (obj) { return obj.hour; }, set: function (obj, value) { obj.hour = value; } }, metadata: _metadata }, _hour_initializers, _hour_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, null, _revenue_decorators, { kind: "field", name: "revenue", static: false, private: false, access: { has: function (obj) { return "revenue" in obj; }, get: function (obj) { return obj.revenue; }, set: function (obj, value) { obj.revenue = value; } }, metadata: _metadata }, _revenue_initializers, _revenue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PeakHourPoint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PeakHourPoint = _classThis;
}();
exports.PeakHourPoint = PeakHourPoint;
var TopCustomer = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var _spent_decorators;
    var _spent_initializers = [];
    var _spent_extraInitializers = [];
    var TopCustomer = _classThis = /** @class */ (function () {
        function TopCustomer_1() {
            this.customerId = __runInitializers(this, _customerId_initializers, void 0);
            this.name = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.bookings = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            this.spent = (__runInitializers(this, _bookings_extraInitializers), __runInitializers(this, _spent_initializers, void 0));
            __runInitializers(this, _spent_extraInitializers);
        }
        return TopCustomer_1;
    }());
    __setFunctionName(_classThis, "TopCustomer");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true })];
        _name_decorators = [(0, graphql_1.Field)()];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _spent_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, null, _spent_decorators, { kind: "field", name: "spent", static: false, private: false, access: { has: function (obj) { return "spent" in obj; }, get: function (obj) { return obj.spent; }, set: function (obj, value) { obj.spent = value; } }, metadata: _metadata }, _spent_initializers, _spent_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TopCustomer = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TopCustomer = _classThis;
}();
exports.TopCustomer = TopCustomer;
var FinancePerformance = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'How busy and how valuable the venue was over the period.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _occupancyPct_decorators;
    var _occupancyPct_initializers = [];
    var _occupancyPct_extraInitializers = [];
    var _bookedHours_decorators;
    var _bookedHours_initializers = [];
    var _bookedHours_extraInitializers = [];
    var _capacityHours_decorators;
    var _capacityHours_initializers = [];
    var _capacityHours_extraInitializers = [];
    var _avgBookingValue_decorators;
    var _avgBookingValue_initializers = [];
    var _avgBookingValue_extraInitializers = [];
    var _repeatRatePct_decorators;
    var _repeatRatePct_initializers = [];
    var _repeatRatePct_extraInitializers = [];
    var _byCourt_decorators;
    var _byCourt_initializers = [];
    var _byCourt_extraInitializers = [];
    var _bySport_decorators;
    var _bySport_initializers = [];
    var _bySport_extraInitializers = [];
    var _peakHours_decorators;
    var _peakHours_initializers = [];
    var _peakHours_extraInitializers = [];
    var _topCustomers_decorators;
    var _topCustomers_initializers = [];
    var _topCustomers_extraInitializers = [];
    var FinancePerformance = _classThis = /** @class */ (function () {
        function FinancePerformance_1() {
            this.occupancyPct = __runInitializers(this, _occupancyPct_initializers, void 0);
            this.bookedHours = (__runInitializers(this, _occupancyPct_extraInitializers), __runInitializers(this, _bookedHours_initializers, void 0));
            this.capacityHours = (__runInitializers(this, _bookedHours_extraInitializers), __runInitializers(this, _capacityHours_initializers, void 0));
            this.avgBookingValue = (__runInitializers(this, _capacityHours_extraInitializers), __runInitializers(this, _avgBookingValue_initializers, void 0));
            this.repeatRatePct = (__runInitializers(this, _avgBookingValue_extraInitializers), __runInitializers(this, _repeatRatePct_initializers, void 0));
            this.byCourt = (__runInitializers(this, _repeatRatePct_extraInitializers), __runInitializers(this, _byCourt_initializers, void 0));
            this.bySport = (__runInitializers(this, _byCourt_extraInitializers), __runInitializers(this, _bySport_initializers, void 0));
            this.peakHours = (__runInitializers(this, _bySport_extraInitializers), __runInitializers(this, _peakHours_initializers, void 0));
            this.topCustomers = (__runInitializers(this, _peakHours_extraInitializers), __runInitializers(this, _topCustomers_initializers, void 0));
            __runInitializers(this, _topCustomers_extraInitializers);
        }
        return FinancePerformance_1;
    }());
    __setFunctionName(_classThis, "FinancePerformance");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _occupancyPct_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Booked court-hours ÷ available court-hours, %.' })];
        _bookedHours_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _capacityHours_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _avgBookingValue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _repeatRatePct_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Share of period customers with more than one booking.' })];
        _byCourt_decorators = [(0, graphql_1.Field)(function () { return [CourtRevenue]; })];
        _bySport_decorators = [(0, graphql_1.Field)(function () { return [SportRevenue]; })];
        _peakHours_decorators = [(0, graphql_1.Field)(function () { return [PeakHourPoint]; })];
        _topCustomers_decorators = [(0, graphql_1.Field)(function () { return [TopCustomer]; })];
        __esDecorate(null, null, _occupancyPct_decorators, { kind: "field", name: "occupancyPct", static: false, private: false, access: { has: function (obj) { return "occupancyPct" in obj; }, get: function (obj) { return obj.occupancyPct; }, set: function (obj, value) { obj.occupancyPct = value; } }, metadata: _metadata }, _occupancyPct_initializers, _occupancyPct_extraInitializers);
        __esDecorate(null, null, _bookedHours_decorators, { kind: "field", name: "bookedHours", static: false, private: false, access: { has: function (obj) { return "bookedHours" in obj; }, get: function (obj) { return obj.bookedHours; }, set: function (obj, value) { obj.bookedHours = value; } }, metadata: _metadata }, _bookedHours_initializers, _bookedHours_extraInitializers);
        __esDecorate(null, null, _capacityHours_decorators, { kind: "field", name: "capacityHours", static: false, private: false, access: { has: function (obj) { return "capacityHours" in obj; }, get: function (obj) { return obj.capacityHours; }, set: function (obj, value) { obj.capacityHours = value; } }, metadata: _metadata }, _capacityHours_initializers, _capacityHours_extraInitializers);
        __esDecorate(null, null, _avgBookingValue_decorators, { kind: "field", name: "avgBookingValue", static: false, private: false, access: { has: function (obj) { return "avgBookingValue" in obj; }, get: function (obj) { return obj.avgBookingValue; }, set: function (obj, value) { obj.avgBookingValue = value; } }, metadata: _metadata }, _avgBookingValue_initializers, _avgBookingValue_extraInitializers);
        __esDecorate(null, null, _repeatRatePct_decorators, { kind: "field", name: "repeatRatePct", static: false, private: false, access: { has: function (obj) { return "repeatRatePct" in obj; }, get: function (obj) { return obj.repeatRatePct; }, set: function (obj, value) { obj.repeatRatePct = value; } }, metadata: _metadata }, _repeatRatePct_initializers, _repeatRatePct_extraInitializers);
        __esDecorate(null, null, _byCourt_decorators, { kind: "field", name: "byCourt", static: false, private: false, access: { has: function (obj) { return "byCourt" in obj; }, get: function (obj) { return obj.byCourt; }, set: function (obj, value) { obj.byCourt = value; } }, metadata: _metadata }, _byCourt_initializers, _byCourt_extraInitializers);
        __esDecorate(null, null, _bySport_decorators, { kind: "field", name: "bySport", static: false, private: false, access: { has: function (obj) { return "bySport" in obj; }, get: function (obj) { return obj.bySport; }, set: function (obj, value) { obj.bySport = value; } }, metadata: _metadata }, _bySport_initializers, _bySport_extraInitializers);
        __esDecorate(null, null, _peakHours_decorators, { kind: "field", name: "peakHours", static: false, private: false, access: { has: function (obj) { return "peakHours" in obj; }, get: function (obj) { return obj.peakHours; }, set: function (obj, value) { obj.peakHours = value; } }, metadata: _metadata }, _peakHours_initializers, _peakHours_extraInitializers);
        __esDecorate(null, null, _topCustomers_decorators, { kind: "field", name: "topCustomers", static: false, private: false, access: { has: function (obj) { return "topCustomers" in obj; }, get: function (obj) { return obj.topCustomers; }, set: function (obj, value) { obj.topCustomers = value; } }, metadata: _metadata }, _topCustomers_initializers, _topCustomers_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinancePerformance = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinancePerformance = _classThis;
}();
exports.FinancePerformance = FinancePerformance;
var OfferRoi = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Cost vs. revenue for a single offer over the period.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _offerId_decorators;
    var _offerId_initializers = [];
    var _offerId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _redemptions_decorators;
    var _redemptions_initializers = [];
    var _redemptions_extraInitializers = [];
    var _givenAmount_decorators;
    var _givenAmount_initializers = [];
    var _givenAmount_extraInitializers = [];
    var _revenueDriven_decorators;
    var _revenueDriven_initializers = [];
    var _revenueDriven_extraInitializers = [];
    var OfferRoi = _classThis = /** @class */ (function () {
        function OfferRoi_1() {
            this.offerId = __runInitializers(this, _offerId_initializers, void 0);
            this.title = (__runInitializers(this, _offerId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.code = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            this.redemptions = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _redemptions_initializers, void 0));
            this.givenAmount = (__runInitializers(this, _redemptions_extraInitializers), __runInitializers(this, _givenAmount_initializers, void 0));
            this.revenueDriven = (__runInitializers(this, _givenAmount_extraInitializers), __runInitializers(this, _revenueDriven_initializers, void 0));
            __runInitializers(this, _revenueDriven_extraInitializers);
        }
        return OfferRoi_1;
    }());
    __setFunctionName(_classThis, "OfferRoi");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _offerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _title_decorators = [(0, graphql_1.Field)()];
        _code_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _redemptions_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _givenAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Discount + forgone free-game value given on this offer.' })];
        _revenueDriven_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Total billed on bookings that used this offer.' })];
        __esDecorate(null, null, _offerId_decorators, { kind: "field", name: "offerId", static: false, private: false, access: { has: function (obj) { return "offerId" in obj; }, get: function (obj) { return obj.offerId; }, set: function (obj, value) { obj.offerId = value; } }, metadata: _metadata }, _offerId_initializers, _offerId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _redemptions_decorators, { kind: "field", name: "redemptions", static: false, private: false, access: { has: function (obj) { return "redemptions" in obj; }, get: function (obj) { return obj.redemptions; }, set: function (obj, value) { obj.redemptions = value; } }, metadata: _metadata }, _redemptions_initializers, _redemptions_extraInitializers);
        __esDecorate(null, null, _givenAmount_decorators, { kind: "field", name: "givenAmount", static: false, private: false, access: { has: function (obj) { return "givenAmount" in obj; }, get: function (obj) { return obj.givenAmount; }, set: function (obj, value) { obj.givenAmount = value; } }, metadata: _metadata }, _givenAmount_initializers, _givenAmount_extraInitializers);
        __esDecorate(null, null, _revenueDriven_decorators, { kind: "field", name: "revenueDriven", static: false, private: false, access: { has: function (obj) { return "revenueDriven" in obj; }, get: function (obj) { return obj.revenueDriven; }, set: function (obj, value) { obj.revenueDriven = value; } }, metadata: _metadata }, _revenueDriven_initializers, _revenueDriven_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OfferRoi = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OfferRoi = _classThis;
}();
exports.OfferRoi = OfferRoi;
var OfferPerformance = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _offers_decorators;
    var _offers_initializers = [];
    var _offers_extraInitializers = [];
    var _freeGamesRedeemed_decorators;
    var _freeGamesRedeemed_initializers = [];
    var _freeGamesRedeemed_extraInitializers = [];
    var _freeGamesForgoneValue_decorators;
    var _freeGamesForgoneValue_initializers = [];
    var _freeGamesForgoneValue_extraInitializers = [];
    var _totalGiven_decorators;
    var _totalGiven_initializers = [];
    var _totalGiven_extraInitializers = [];
    var _totalDriven_decorators;
    var _totalDriven_initializers = [];
    var _totalDriven_extraInitializers = [];
    var OfferPerformance = _classThis = /** @class */ (function () {
        function OfferPerformance_1() {
            this.offers = __runInitializers(this, _offers_initializers, void 0);
            this.freeGamesRedeemed = (__runInitializers(this, _offers_extraInitializers), __runInitializers(this, _freeGamesRedeemed_initializers, void 0));
            this.freeGamesForgoneValue = (__runInitializers(this, _freeGamesRedeemed_extraInitializers), __runInitializers(this, _freeGamesForgoneValue_initializers, void 0));
            this.totalGiven = (__runInitializers(this, _freeGamesForgoneValue_extraInitializers), __runInitializers(this, _totalGiven_initializers, void 0));
            this.totalDriven = (__runInitializers(this, _totalGiven_extraInitializers), __runInitializers(this, _totalDriven_initializers, void 0));
            __runInitializers(this, _totalDriven_extraInitializers);
        }
        return OfferPerformance_1;
    }());
    __setFunctionName(_classThis, "OfferPerformance");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _offers_decorators = [(0, graphql_1.Field)(function () { return [OfferRoi]; })];
        _freeGamesRedeemed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _freeGamesForgoneValue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _totalGiven_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _totalDriven_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _offers_decorators, { kind: "field", name: "offers", static: false, private: false, access: { has: function (obj) { return "offers" in obj; }, get: function (obj) { return obj.offers; }, set: function (obj, value) { obj.offers = value; } }, metadata: _metadata }, _offers_initializers, _offers_extraInitializers);
        __esDecorate(null, null, _freeGamesRedeemed_decorators, { kind: "field", name: "freeGamesRedeemed", static: false, private: false, access: { has: function (obj) { return "freeGamesRedeemed" in obj; }, get: function (obj) { return obj.freeGamesRedeemed; }, set: function (obj, value) { obj.freeGamesRedeemed = value; } }, metadata: _metadata }, _freeGamesRedeemed_initializers, _freeGamesRedeemed_extraInitializers);
        __esDecorate(null, null, _freeGamesForgoneValue_decorators, { kind: "field", name: "freeGamesForgoneValue", static: false, private: false, access: { has: function (obj) { return "freeGamesForgoneValue" in obj; }, get: function (obj) { return obj.freeGamesForgoneValue; }, set: function (obj, value) { obj.freeGamesForgoneValue = value; } }, metadata: _metadata }, _freeGamesForgoneValue_initializers, _freeGamesForgoneValue_extraInitializers);
        __esDecorate(null, null, _totalGiven_decorators, { kind: "field", name: "totalGiven", static: false, private: false, access: { has: function (obj) { return "totalGiven" in obj; }, get: function (obj) { return obj.totalGiven; }, set: function (obj, value) { obj.totalGiven = value; } }, metadata: _metadata }, _totalGiven_initializers, _totalGiven_extraInitializers);
        __esDecorate(null, null, _totalDriven_decorators, { kind: "field", name: "totalDriven", static: false, private: false, access: { has: function (obj) { return "totalDriven" in obj; }, get: function (obj) { return obj.totalDriven; }, set: function (obj, value) { obj.totalDriven = value; } }, metadata: _metadata }, _totalDriven_initializers, _totalDriven_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OfferPerformance = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OfferPerformance = _classThis;
}();
exports.OfferPerformance = OfferPerformance;
var PayoutSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Platform-held settlement balance owed to the venue (separate from its own books).',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _pendingPayout_decorators;
    var _pendingPayout_initializers = [];
    var _pendingPayout_extraInitializers = [];
    var _onHold_decorators;
    var _onHold_initializers = [];
    var _onHold_extraInitializers = [];
    var _paidOut_decorators;
    var _paidOut_initializers = [];
    var _paidOut_extraInitializers = [];
    var _lastPaidAt_decorators;
    var _lastPaidAt_initializers = [];
    var _lastPaidAt_extraInitializers = [];
    var PayoutSummary = _classThis = /** @class */ (function () {
        function PayoutSummary_1() {
            this.pendingPayout = __runInitializers(this, _pendingPayout_initializers, void 0);
            this.onHold = (__runInitializers(this, _pendingPayout_extraInitializers), __runInitializers(this, _onHold_initializers, void 0));
            this.paidOut = (__runInitializers(this, _onHold_extraInitializers), __runInitializers(this, _paidOut_initializers, void 0));
            this.lastPaidAt = (__runInitializers(this, _paidOut_extraInitializers), __runInitializers(this, _lastPaidAt_initializers, void 0));
            __runInitializers(this, _lastPaidAt_extraInitializers);
        }
        return PayoutSummary_1;
    }());
    __setFunctionName(_classThis, "PayoutSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _pendingPayout_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _onHold_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _paidOut_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _lastPaidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _pendingPayout_decorators, { kind: "field", name: "pendingPayout", static: false, private: false, access: { has: function (obj) { return "pendingPayout" in obj; }, get: function (obj) { return obj.pendingPayout; }, set: function (obj, value) { obj.pendingPayout = value; } }, metadata: _metadata }, _pendingPayout_initializers, _pendingPayout_extraInitializers);
        __esDecorate(null, null, _onHold_decorators, { kind: "field", name: "onHold", static: false, private: false, access: { has: function (obj) { return "onHold" in obj; }, get: function (obj) { return obj.onHold; }, set: function (obj, value) { obj.onHold = value; } }, metadata: _metadata }, _onHold_initializers, _onHold_extraInitializers);
        __esDecorate(null, null, _paidOut_decorators, { kind: "field", name: "paidOut", static: false, private: false, access: { has: function (obj) { return "paidOut" in obj; }, get: function (obj) { return obj.paidOut; }, set: function (obj, value) { obj.paidOut = value; } }, metadata: _metadata }, _paidOut_initializers, _paidOut_extraInitializers);
        __esDecorate(null, null, _lastPaidAt_decorators, { kind: "field", name: "lastPaidAt", static: false, private: false, access: { has: function (obj) { return "lastPaidAt" in obj; }, get: function (obj) { return obj.lastPaidAt; }, set: function (obj, value) { obj.lastPaidAt = value; } }, metadata: _metadata }, _lastPaidAt_initializers, _lastPaidAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PayoutSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PayoutSummary = _classThis;
}();
exports.PayoutSummary = PayoutSummary;
var ExpenseModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _vendor_decorators;
    var _vendor_initializers = [];
    var _vendor_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var _incurredAt_decorators;
    var _incurredAt_initializers = [];
    var _incurredAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var ExpenseModel = _classThis = /** @class */ (function () {
        function ExpenseModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.category = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.amount = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.currency = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.description = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.vendor = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _vendor_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _vendor_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.incurredAt = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _incurredAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _incurredAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return ExpenseModel_1;
    }());
    __setFunctionName(_classThis, "ExpenseModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _category_decorators = [(0, graphql_1.Field)()];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _vendor_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _paymentMethod_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _incurredAt_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _vendor_decorators, { kind: "field", name: "vendor", static: false, private: false, access: { has: function (obj) { return "vendor" in obj; }, get: function (obj) { return obj.vendor; }, set: function (obj, value) { obj.vendor = value; } }, metadata: _metadata }, _vendor_initializers, _vendor_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _incurredAt_decorators, { kind: "field", name: "incurredAt", static: false, private: false, access: { has: function (obj) { return "incurredAt" in obj; }, get: function (obj) { return obj.incurredAt; }, set: function (obj, value) { obj.incurredAt = value; } }, metadata: _metadata }, _incurredAt_initializers, _incurredAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExpenseModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExpenseModel = _classThis;
}();
exports.ExpenseModel = ExpenseModel;
var CashReconciliationModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _businessDate_decorators;
    var _businessDate_initializers = [];
    var _businessDate_extraInitializers = [];
    var _openingFloat_decorators;
    var _openingFloat_initializers = [];
    var _openingFloat_extraInitializers = [];
    var _expectedCash_decorators;
    var _expectedCash_initializers = [];
    var _expectedCash_extraInitializers = [];
    var _countedCash_decorators;
    var _countedCash_initializers = [];
    var _countedCash_extraInitializers = [];
    var _variance_decorators;
    var _variance_initializers = [];
    var _variance_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _closedAt_decorators;
    var _closedAt_initializers = [];
    var _closedAt_extraInitializers = [];
    var CashReconciliationModel = _classThis = /** @class */ (function () {
        function CashReconciliationModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.businessDate = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _businessDate_initializers, void 0));
            this.openingFloat = (__runInitializers(this, _businessDate_extraInitializers), __runInitializers(this, _openingFloat_initializers, void 0));
            this.expectedCash = (__runInitializers(this, _openingFloat_extraInitializers), __runInitializers(this, _expectedCash_initializers, void 0));
            this.countedCash = (__runInitializers(this, _expectedCash_extraInitializers), __runInitializers(this, _countedCash_initializers, void 0));
            this.variance = (__runInitializers(this, _countedCash_extraInitializers), __runInitializers(this, _variance_initializers, void 0));
            this.notes = (__runInitializers(this, _variance_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.closedAt = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
            __runInitializers(this, _closedAt_extraInitializers);
        }
        return CashReconciliationModel_1;
    }());
    __setFunctionName(_classThis, "CashReconciliationModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _businessDate_decorators = [(0, graphql_1.Field)()];
        _openingFloat_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _expectedCash_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _countedCash_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _variance_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _closedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _businessDate_decorators, { kind: "field", name: "businessDate", static: false, private: false, access: { has: function (obj) { return "businessDate" in obj; }, get: function (obj) { return obj.businessDate; }, set: function (obj, value) { obj.businessDate = value; } }, metadata: _metadata }, _businessDate_initializers, _businessDate_extraInitializers);
        __esDecorate(null, null, _openingFloat_decorators, { kind: "field", name: "openingFloat", static: false, private: false, access: { has: function (obj) { return "openingFloat" in obj; }, get: function (obj) { return obj.openingFloat; }, set: function (obj, value) { obj.openingFloat = value; } }, metadata: _metadata }, _openingFloat_initializers, _openingFloat_extraInitializers);
        __esDecorate(null, null, _expectedCash_decorators, { kind: "field", name: "expectedCash", static: false, private: false, access: { has: function (obj) { return "expectedCash" in obj; }, get: function (obj) { return obj.expectedCash; }, set: function (obj, value) { obj.expectedCash = value; } }, metadata: _metadata }, _expectedCash_initializers, _expectedCash_extraInitializers);
        __esDecorate(null, null, _countedCash_decorators, { kind: "field", name: "countedCash", static: false, private: false, access: { has: function (obj) { return "countedCash" in obj; }, get: function (obj) { return obj.countedCash; }, set: function (obj, value) { obj.countedCash = value; } }, metadata: _metadata }, _countedCash_initializers, _countedCash_extraInitializers);
        __esDecorate(null, null, _variance_decorators, { kind: "field", name: "variance", static: false, private: false, access: { has: function (obj) { return "variance" in obj; }, get: function (obj) { return obj.variance; }, set: function (obj, value) { obj.variance = value; } }, metadata: _metadata }, _variance_initializers, _variance_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: function (obj) { return "closedAt" in obj; }, get: function (obj) { return obj.closedAt; }, set: function (obj, value) { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CashReconciliationModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CashReconciliationModel = _classThis;
}();
exports.CashReconciliationModel = CashReconciliationModel;
var CashDayPreview = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'What the desk should expect to count for a business day, with the breakdown.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _businessDate_decorators;
    var _businessDate_initializers = [];
    var _businessDate_extraInitializers = [];
    var _openingFloat_decorators;
    var _openingFloat_initializers = [];
    var _openingFloat_extraInitializers = [];
    var _cashIn_decorators;
    var _cashIn_initializers = [];
    var _cashIn_extraInitializers = [];
    var _cashOut_decorators;
    var _cashOut_initializers = [];
    var _cashOut_extraInitializers = [];
    var _expectedCash_decorators;
    var _expectedCash_initializers = [];
    var _expectedCash_extraInitializers = [];
    var _alreadyClosed_decorators;
    var _alreadyClosed_initializers = [];
    var _alreadyClosed_extraInitializers = [];
    var _reconciliation_decorators;
    var _reconciliation_initializers = [];
    var _reconciliation_extraInitializers = [];
    var CashDayPreview = _classThis = /** @class */ (function () {
        function CashDayPreview_1() {
            this.businessDate = __runInitializers(this, _businessDate_initializers, void 0);
            this.openingFloat = (__runInitializers(this, _businessDate_extraInitializers), __runInitializers(this, _openingFloat_initializers, void 0));
            this.cashIn = (__runInitializers(this, _openingFloat_extraInitializers), __runInitializers(this, _cashIn_initializers, void 0));
            this.cashOut = (__runInitializers(this, _cashIn_extraInitializers), __runInitializers(this, _cashOut_initializers, void 0));
            this.expectedCash = (__runInitializers(this, _cashOut_extraInitializers), __runInitializers(this, _expectedCash_initializers, void 0));
            this.alreadyClosed = (__runInitializers(this, _expectedCash_extraInitializers), __runInitializers(this, _alreadyClosed_initializers, void 0));
            this.reconciliation = (__runInitializers(this, _alreadyClosed_extraInitializers), __runInitializers(this, _reconciliation_initializers, void 0));
            __runInitializers(this, _reconciliation_extraInitializers);
        }
        return CashDayPreview_1;
    }());
    __setFunctionName(_classThis, "CashDayPreview");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _businessDate_decorators = [(0, graphql_1.Field)()];
        _openingFloat_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _cashIn_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Cash collected (bookings + memberships) that day.' })];
        _cashOut_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Cash paid out (expenses) that day.' })];
        _expectedCash_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _alreadyClosed_decorators = [(0, graphql_1.Field)()];
        _reconciliation_decorators = [(0, graphql_1.Field)(function () { return CashReconciliationModel; }, { nullable: true })];
        __esDecorate(null, null, _businessDate_decorators, { kind: "field", name: "businessDate", static: false, private: false, access: { has: function (obj) { return "businessDate" in obj; }, get: function (obj) { return obj.businessDate; }, set: function (obj, value) { obj.businessDate = value; } }, metadata: _metadata }, _businessDate_initializers, _businessDate_extraInitializers);
        __esDecorate(null, null, _openingFloat_decorators, { kind: "field", name: "openingFloat", static: false, private: false, access: { has: function (obj) { return "openingFloat" in obj; }, get: function (obj) { return obj.openingFloat; }, set: function (obj, value) { obj.openingFloat = value; } }, metadata: _metadata }, _openingFloat_initializers, _openingFloat_extraInitializers);
        __esDecorate(null, null, _cashIn_decorators, { kind: "field", name: "cashIn", static: false, private: false, access: { has: function (obj) { return "cashIn" in obj; }, get: function (obj) { return obj.cashIn; }, set: function (obj, value) { obj.cashIn = value; } }, metadata: _metadata }, _cashIn_initializers, _cashIn_extraInitializers);
        __esDecorate(null, null, _cashOut_decorators, { kind: "field", name: "cashOut", static: false, private: false, access: { has: function (obj) { return "cashOut" in obj; }, get: function (obj) { return obj.cashOut; }, set: function (obj, value) { obj.cashOut = value; } }, metadata: _metadata }, _cashOut_initializers, _cashOut_extraInitializers);
        __esDecorate(null, null, _expectedCash_decorators, { kind: "field", name: "expectedCash", static: false, private: false, access: { has: function (obj) { return "expectedCash" in obj; }, get: function (obj) { return obj.expectedCash; }, set: function (obj, value) { obj.expectedCash = value; } }, metadata: _metadata }, _expectedCash_initializers, _expectedCash_extraInitializers);
        __esDecorate(null, null, _alreadyClosed_decorators, { kind: "field", name: "alreadyClosed", static: false, private: false, access: { has: function (obj) { return "alreadyClosed" in obj; }, get: function (obj) { return obj.alreadyClosed; }, set: function (obj, value) { obj.alreadyClosed = value; } }, metadata: _metadata }, _alreadyClosed_initializers, _alreadyClosed_extraInitializers);
        __esDecorate(null, null, _reconciliation_decorators, { kind: "field", name: "reconciliation", static: false, private: false, access: { has: function (obj) { return "reconciliation" in obj; }, get: function (obj) { return obj.reconciliation; }, set: function (obj, value) { obj.reconciliation = value; } }, metadata: _metadata }, _reconciliation_initializers, _reconciliation_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CashDayPreview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CashDayPreview = _classThis;
}();
exports.CashDayPreview = CashDayPreview;
