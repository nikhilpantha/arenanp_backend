"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.SetStaffPayTermsInput = exports.RecordStaffSalaryPaymentInput = exports.VenueSalariesInput = exports.CloseCashDayInput = exports.CashDayInput = exports.UpdateExpenseInput = exports.CreateExpenseInput = exports.ListExpensesInput = exports.ListTransactionsInput = exports.FinanceTrendInput = exports.FinanceRangeInput = exports.TransactionSort = exports.TransactionKind = exports.TrendGranularity = exports.FinanceRangePreset = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
/** Rolling reporting window ending today (or a custom from/to pair). */
var FinanceRangePreset;
(function (FinanceRangePreset) {
    FinanceRangePreset["TODAY"] = "TODAY";
    FinanceRangePreset["TOMORROW"] = "TOMORROW";
    FinanceRangePreset["WEEK"] = "WEEK";
    FinanceRangePreset["MONTH"] = "MONTH";
    FinanceRangePreset["YEAR"] = "YEAR";
    FinanceRangePreset["ALL"] = "ALL";
})(FinanceRangePreset || (exports.FinanceRangePreset = FinanceRangePreset = {}));
(0, graphql_1.registerEnumType)(FinanceRangePreset, {
    name: 'FinanceRangePreset',
    description: "Finance window: TODAY, TOMORROW (money expected on tomorrow's bookings), WEEK (7d), MONTH (30d), YEAR, or ALL (from the venue's first activity).",
});
/**
 * Bucket width for the trend series. A year of DAY buckets is 365 points nobody
 * can read, so callers may roll up — or omit this and let the range pick.
 */
var TrendGranularity;
(function (TrendGranularity) {
    TrendGranularity["DAY"] = "DAY";
    TrendGranularity["WEEK"] = "WEEK";
    TrendGranularity["MONTH"] = "MONTH";
})(TrendGranularity || (exports.TrendGranularity = TrendGranularity = {}));
(0, graphql_1.registerEnumType)(TrendGranularity, {
    name: 'TrendGranularity',
    description: 'Trend bucket width. Omit to auto-pick from the range length.',
});
/** What a transaction row represents. */
var TransactionKind;
(function (TransactionKind) {
    TransactionKind["BOOKING_PAYMENT"] = "BOOKING_PAYMENT";
    TransactionKind["MEMBERSHIP_PAYMENT"] = "MEMBERSHIP_PAYMENT";
    TransactionKind["EXPENSE"] = "EXPENSE";
})(TransactionKind || (exports.TransactionKind = TransactionKind = {}));
(0, graphql_1.registerEnumType)(TransactionKind, {
    name: 'TransactionKind',
    description: 'Money-movement type in the venue transaction ledger.',
});
var TransactionSort;
(function (TransactionSort) {
    TransactionSort["DATE_DESC"] = "DATE_DESC";
    TransactionSort["DATE_ASC"] = "DATE_ASC";
    TransactionSort["AMOUNT_DESC"] = "AMOUNT_DESC";
    TransactionSort["AMOUNT_ASC"] = "AMOUNT_ASC";
})(TransactionSort || (exports.TransactionSort = TransactionSort = {}));
(0, graphql_1.registerEnumType)(TransactionSort, { name: 'TransactionSort' });
/** Shared range fields — a preset, or explicit "yyyy-mm-dd" from/to that override it. */
var FinanceRangeInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _preset_decorators;
    var _preset_initializers = [];
    var _preset_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var FinanceRangeInput = _classThis = /** @class */ (function () {
        function FinanceRangeInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.preset = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _preset_initializers, void 0));
            this.from = (__runInitializers(this, _preset_extraInitializers), __runInitializers(this, _from_initializers, void 0));
            this.to = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            __runInitializers(this, _to_extraInitializers);
        }
        return FinanceRangeInput_1;
    }());
    __setFunctionName(_classThis, "FinanceRangeInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _preset_decorators = [(0, graphql_1.Field)(function () { return FinanceRangePreset; }, { nullable: true, defaultValue: FinanceRangePreset.MONTH }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(FinanceRangePreset)];
        _from_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Custom start "yyyy-mm-dd" (inclusive); needs `to` to apply.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _to_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Custom end "yyyy-mm-dd" (inclusive).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _preset_decorators, { kind: "field", name: "preset", static: false, private: false, access: { has: function (obj) { return "preset" in obj; }, get: function (obj) { return obj.preset; }, set: function (obj, value) { obj.preset = value; } }, metadata: _metadata }, _preset_initializers, _preset_extraInitializers);
        __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceRangeInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceRangeInput = _classThis;
}();
exports.FinanceRangeInput = FinanceRangeInput;
var FinanceTrendInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = FinanceRangeInput;
    var _granularity_decorators;
    var _granularity_initializers = [];
    var _granularity_extraInitializers = [];
    var FinanceTrendInput = _classThis = /** @class */ (function (_super) {
        __extends(FinanceTrendInput_1, _super);
        function FinanceTrendInput_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.granularity = __runInitializers(_this, _granularity_initializers, void 0);
            __runInitializers(_this, _granularity_extraInitializers);
            return _this;
        }
        return FinanceTrendInput_1;
    }(_classSuper));
    __setFunctionName(_classThis, "FinanceTrendInput");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _granularity_decorators = [(0, graphql_1.Field)(function () { return TrendGranularity; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(TrendGranularity)];
        __esDecorate(null, null, _granularity_decorators, { kind: "field", name: "granularity", static: false, private: false, access: { has: function (obj) { return "granularity" in obj; }, get: function (obj) { return obj.granularity; }, set: function (obj, value) { obj.granularity = value; } }, metadata: _metadata }, _granularity_initializers, _granularity_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FinanceTrendInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FinanceTrendInput = _classThis;
}();
exports.FinanceTrendInput = FinanceTrendInput;
/** The transaction ledger: one filtered, sorted, paged view over every money movement. */
var ListTransactionsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = FinanceRangeInput;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _kinds_decorators;
    var _kinds_initializers = [];
    var _kinds_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _sort_decorators;
    var _sort_initializers = [];
    var _sort_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageSize_decorators;
    var _pageSize_initializers = [];
    var _pageSize_extraInitializers = [];
    var ListTransactionsInput = _classThis = /** @class */ (function (_super) {
        __extends(ListTransactionsInput_1, _super);
        function ListTransactionsInput_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.search = __runInitializers(_this, _search_initializers, void 0);
            _this.kinds = (__runInitializers(_this, _search_extraInitializers), __runInitializers(_this, _kinds_initializers, void 0));
            _this.method = (__runInitializers(_this, _kinds_extraInitializers), __runInitializers(_this, _method_initializers, void 0));
            _this.category = (__runInitializers(_this, _method_extraInitializers), __runInitializers(_this, _category_initializers, void 0));
            _this.sort = (__runInitializers(_this, _category_extraInitializers), __runInitializers(_this, _sort_initializers, void 0));
            _this.page = (__runInitializers(_this, _sort_extraInitializers), __runInitializers(_this, _page_initializers, void 0));
            _this.pageSize = (__runInitializers(_this, _page_extraInitializers), __runInitializers(_this, _pageSize_initializers, void 0));
            __runInitializers(_this, _pageSize_extraInitializers);
            return _this;
        }
        return ListTransactionsInput_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ListTransactionsInput");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _search_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Matches customer, vendor, note, category or court.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _kinds_decorators = [(0, graphql_1.Field)(function () { return [TransactionKind]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsEnum)(TransactionKind, { each: true })];
        _method_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        _category_decorators = [(0, graphql_1.Field)(function () { return client_1.ExpenseCategory; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.ExpenseCategory)];
        _sort_decorators = [(0, graphql_1.Field)(function () { return TransactionSort; }, { nullable: true, defaultValue: TransactionSort.DATE_DESC }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(TransactionSort)];
        _page_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, defaultValue: 1 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
        _pageSize_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, defaultValue: 25 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(200)];
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _kinds_decorators, { kind: "field", name: "kinds", static: false, private: false, access: { has: function (obj) { return "kinds" in obj; }, get: function (obj) { return obj.kinds; }, set: function (obj, value) { obj.kinds = value; } }, metadata: _metadata }, _kinds_initializers, _kinds_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _sort_decorators, { kind: "field", name: "sort", static: false, private: false, access: { has: function (obj) { return "sort" in obj; }, get: function (obj) { return obj.sort; }, set: function (obj, value) { obj.sort = value; } }, metadata: _metadata }, _sort_initializers, _sort_extraInitializers);
        __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
        __esDecorate(null, null, _pageSize_decorators, { kind: "field", name: "pageSize", static: false, private: false, access: { has: function (obj) { return "pageSize" in obj; }, get: function (obj) { return obj.pageSize; }, set: function (obj, value) { obj.pageSize = value; } }, metadata: _metadata }, _pageSize_initializers, _pageSize_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListTransactionsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListTransactionsInput = _classThis;
}();
exports.ListTransactionsInput = ListTransactionsInput;
var ListExpensesInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _preset_decorators;
    var _preset_initializers = [];
    var _preset_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var ListExpensesInput = _classThis = /** @class */ (function () {
        function ListExpensesInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.preset = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _preset_initializers, void 0));
            this.from = (__runInitializers(this, _preset_extraInitializers), __runInitializers(this, _from_initializers, void 0));
            this.to = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            this.category = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            __runInitializers(this, _category_extraInitializers);
        }
        return ListExpensesInput_1;
    }());
    __setFunctionName(_classThis, "ListExpensesInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _preset_decorators = [(0, graphql_1.Field)(function () { return FinanceRangePreset; }, { nullable: true, defaultValue: FinanceRangePreset.MONTH }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(FinanceRangePreset)];
        _from_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _to_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _category_decorators = [(0, graphql_1.Field)(function () { return client_1.ExpenseCategory; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.ExpenseCategory)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _preset_decorators, { kind: "field", name: "preset", static: false, private: false, access: { has: function (obj) { return "preset" in obj; }, get: function (obj) { return obj.preset; }, set: function (obj, value) { obj.preset = value; } }, metadata: _metadata }, _preset_initializers, _preset_extraInitializers);
        __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListExpensesInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListExpensesInput = _classThis;
}();
exports.ListExpensesInput = ListExpensesInput;
var CreateExpenseInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
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
    var CreateExpenseInput = _classThis = /** @class */ (function () {
        function CreateExpenseInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.category = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.amount = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.description = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.vendor = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _vendor_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _vendor_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.incurredAt = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _incurredAt_initializers, void 0));
            __runInitializers(this, _incurredAt_extraInitializers);
        }
        return CreateExpenseInput_1;
    }());
    __setFunctionName(_classThis, "CreateExpenseInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _category_decorators = [(0, graphql_1.Field)(function () { return client_1.ExpenseCategory; }), (0, class_validator_1.IsEnum)(client_1.ExpenseCategory)];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(300)];
        _vendor_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        _incurredAt_decorators = [(0, graphql_1.Field)({ description: 'Date the cost applies to (bucketed by day).' }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _vendor_decorators, { kind: "field", name: "vendor", static: false, private: false, access: { has: function (obj) { return "vendor" in obj; }, get: function (obj) { return obj.vendor; }, set: function (obj, value) { obj.vendor = value; } }, metadata: _metadata }, _vendor_initializers, _vendor_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _incurredAt_decorators, { kind: "field", name: "incurredAt", static: false, private: false, access: { has: function (obj) { return "incurredAt" in obj; }, get: function (obj) { return obj.incurredAt; }, set: function (obj, value) { obj.incurredAt = value; } }, metadata: _metadata }, _incurredAt_initializers, _incurredAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateExpenseInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateExpenseInput = _classThis;
}();
exports.CreateExpenseInput = CreateExpenseInput;
var UpdateExpenseInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _expenseId_decorators;
    var _expenseId_initializers = [];
    var _expenseId_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
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
    var UpdateExpenseInput = _classThis = /** @class */ (function () {
        function UpdateExpenseInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.expenseId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _expenseId_initializers, void 0));
            this.category = (__runInitializers(this, _expenseId_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.amount = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.description = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.vendor = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _vendor_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _vendor_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.incurredAt = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _incurredAt_initializers, void 0));
            __runInitializers(this, _incurredAt_extraInitializers);
        }
        return UpdateExpenseInput_1;
    }());
    __setFunctionName(_classThis, "UpdateExpenseInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _expenseId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _category_decorators = [(0, graphql_1.Field)(function () { return client_1.ExpenseCategory; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.ExpenseCategory)];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(300)];
        _vendor_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        _incurredAt_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _expenseId_decorators, { kind: "field", name: "expenseId", static: false, private: false, access: { has: function (obj) { return "expenseId" in obj; }, get: function (obj) { return obj.expenseId; }, set: function (obj, value) { obj.expenseId = value; } }, metadata: _metadata }, _expenseId_initializers, _expenseId_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _vendor_decorators, { kind: "field", name: "vendor", static: false, private: false, access: { has: function (obj) { return "vendor" in obj; }, get: function (obj) { return obj.vendor; }, set: function (obj, value) { obj.vendor = value; } }, metadata: _metadata }, _vendor_initializers, _vendor_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _incurredAt_decorators, { kind: "field", name: "incurredAt", static: false, private: false, access: { has: function (obj) { return "incurredAt" in obj; }, get: function (obj) { return obj.incurredAt; }, set: function (obj, value) { obj.incurredAt = value; } }, metadata: _metadata }, _incurredAt_initializers, _incurredAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateExpenseInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateExpenseInput = _classThis;
}();
exports.UpdateExpenseInput = UpdateExpenseInput;
var CashDayInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var CashDayInput = _classThis = /** @class */ (function () {
        function CashDayInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.date = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            __runInitializers(this, _date_extraInitializers);
        }
        return CashDayInput_1;
    }());
    __setFunctionName(_classThis, "CashDayInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _date_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Business day "yyyy-mm-dd"; defaults to today.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CashDayInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CashDayInput = _classThis;
}();
exports.CashDayInput = CashDayInput;
var CloseCashDayInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _businessDate_decorators;
    var _businessDate_initializers = [];
    var _businessDate_extraInitializers = [];
    var _openingFloat_decorators;
    var _openingFloat_initializers = [];
    var _openingFloat_extraInitializers = [];
    var _countedCash_decorators;
    var _countedCash_initializers = [];
    var _countedCash_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var CloseCashDayInput = _classThis = /** @class */ (function () {
        function CloseCashDayInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.businessDate = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _businessDate_initializers, void 0));
            this.openingFloat = (__runInitializers(this, _businessDate_extraInitializers), __runInitializers(this, _openingFloat_initializers, void 0));
            this.countedCash = (__runInitializers(this, _openingFloat_extraInitializers), __runInitializers(this, _countedCash_initializers, void 0));
            this.notes = (__runInitializers(this, _countedCash_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            __runInitializers(this, _notes_extraInitializers);
        }
        return CloseCashDayInput_1;
    }());
    __setFunctionName(_classThis, "CloseCashDayInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _businessDate_decorators = [(0, graphql_1.Field)({ description: 'Business day being closed, "yyyy-mm-dd".' }), (0, class_validator_1.IsString)()];
        _openingFloat_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, defaultValue: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _countedCash_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(300)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _businessDate_decorators, { kind: "field", name: "businessDate", static: false, private: false, access: { has: function (obj) { return "businessDate" in obj; }, get: function (obj) { return obj.businessDate; }, set: function (obj, value) { obj.businessDate = value; } }, metadata: _metadata }, _businessDate_initializers, _businessDate_extraInitializers);
        __esDecorate(null, null, _openingFloat_decorators, { kind: "field", name: "openingFloat", static: false, private: false, access: { has: function (obj) { return "openingFloat" in obj; }, get: function (obj) { return obj.openingFloat; }, set: function (obj, value) { obj.openingFloat = value; } }, metadata: _metadata }, _openingFloat_initializers, _openingFloat_extraInitializers);
        __esDecorate(null, null, _countedCash_decorators, { kind: "field", name: "countedCash", static: false, private: false, access: { has: function (obj) { return "countedCash" in obj; }, get: function (obj) { return obj.countedCash; }, set: function (obj, value) { obj.countedCash = value; } }, metadata: _metadata }, _countedCash_initializers, _countedCash_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CloseCashDayInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CloseCashDayInput = _classThis;
}();
exports.CloseCashDayInput = CloseCashDayInput;
// ─── Staff salary ────────────────────────────────────────────────────────────
var VenueSalariesInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _periodStart_decorators;
    var _periodStart_initializers = [];
    var _periodStart_extraInitializers = [];
    var VenueSalariesInput = _classThis = /** @class */ (function () {
        function VenueSalariesInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.periodStart = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
            __runInitializers(this, _periodStart_extraInitializers);
        }
        return VenueSalariesInput_1;
    }());
    __setFunctionName(_classThis, "VenueSalariesInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _periodStart_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Any date inside the pay period; snapped to the first of that month. Defaults to now.',
            }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: function (obj) { return "periodStart" in obj; }, get: function (obj) { return obj.periodStart; }, set: function (obj, value) { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueSalariesInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueSalariesInput = _classThis;
}();
exports.VenueSalariesInput = VenueSalariesInput;
var RecordStaffSalaryPaymentInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _periodStart_decorators;
    var _periodStart_initializers = [];
    var _periodStart_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _paidAt_decorators;
    var _paidAt_initializers = [];
    var _paidAt_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var RecordStaffSalaryPaymentInput = _classThis = /** @class */ (function () {
        function RecordStaffSalaryPaymentInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            this.periodStart = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _periodStart_initializers, void 0));
            this.amount = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.paidAt = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            this.quantity = (__runInitializers(this, _paidAt_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.note = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            __runInitializers(this, _note_extraInitializers);
        }
        return RecordStaffSalaryPaymentInput_1;
    }());
    __setFunctionName(_classThis, "RecordStaffSalaryPaymentInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _periodStart_decorators = [(0, graphql_1.Field)({ description: 'Any date inside the period being settled; snapped to its month.' }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'What was handed over now. Part-payments are expected.' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paidAt_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'When the money changed hands. Defaults to today.' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _quantity_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: 'Days worked or sessions run — the count the system cannot know on its own.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(300)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: function (obj) { return "periodStart" in obj; }, get: function (obj) { return obj.periodStart; }, set: function (obj, value) { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RecordStaffSalaryPaymentInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RecordStaffSalaryPaymentInput = _classThis;
}();
exports.RecordStaffSalaryPaymentInput = RecordStaffSalaryPaymentInput;
var SetStaffPayTermsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _basis_decorators;
    var _basis_initializers = [];
    var _basis_extraInitializers = [];
    var _rate_decorators;
    var _rate_initializers = [];
    var _rate_extraInitializers = [];
    var SetStaffPayTermsInput = _classThis = /** @class */ (function () {
        function SetStaffPayTermsInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            this.basis = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _basis_initializers, void 0));
            this.rate = (__runInitializers(this, _basis_extraInitializers), __runInitializers(this, _rate_initializers, void 0));
            __runInitializers(this, _rate_extraInitializers);
        }
        return SetStaffPayTermsInput_1;
    }());
    __setFunctionName(_classThis, "SetStaffPayTermsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _basis_decorators = [(0, graphql_1.Field)(function () { return client_1.PayBasis; }, { nullable: true, description: 'Null clears the pay terms entirely.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PayBasis)];
        _rate_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Per month, per day or per session.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _basis_decorators, { kind: "field", name: "basis", static: false, private: false, access: { has: function (obj) { return "basis" in obj; }, get: function (obj) { return obj.basis; }, set: function (obj, value) { obj.basis = value; } }, metadata: _metadata }, _basis_initializers, _basis_extraInitializers);
        __esDecorate(null, null, _rate_decorators, { kind: "field", name: "rate", static: false, private: false, access: { has: function (obj) { return "rate" in obj; }, get: function (obj) { return obj.rate; }, set: function (obj, value) { obj.rate = value; } }, metadata: _metadata }, _rate_initializers, _rate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SetStaffPayTermsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SetStaffPayTermsInput = _classThis;
}();
exports.SetStaffPayTermsInput = SetStaffPayTermsInput;
