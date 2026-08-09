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
exports.SettlementExportRow = void 0;
var graphql_1 = require("@nestjs/graphql");
var SettlementExportRow = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Flat row shape suitable for CSV export. The frontend turns these into a CSV file client-side.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _paymentId_decorators;
    var _paymentId_initializers = [];
    var _paymentId_extraInitializers = [];
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _venueCity_decorators;
    var _venueCity_initializers = [];
    var _venueCity_extraInitializers = [];
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerName_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _paidAt_decorators;
    var _paidAt_initializers = [];
    var _paidAt_extraInitializers = [];
    var _grossAmount_decorators;
    var _grossAmount_initializers = [];
    var _grossAmount_extraInitializers = [];
    var _commissionPercentage_decorators;
    var _commissionPercentage_initializers = [];
    var _commissionPercentage_extraInitializers = [];
    var _platformCommissionAmount_decorators;
    var _platformCommissionAmount_initializers = [];
    var _platformCommissionAmount_extraInitializers = [];
    var _venueSettlementAmount_decorators;
    var _venueSettlementAmount_initializers = [];
    var _venueSettlementAmount_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _settlementStatus_decorators;
    var _settlementStatus_initializers = [];
    var _settlementStatus_extraInitializers = [];
    var _settlementPaidAt_decorators;
    var _settlementPaidAt_initializers = [];
    var _settlementPaidAt_extraInitializers = [];
    var _paymentReference_decorators;
    var _paymentReference_initializers = [];
    var _paymentReference_extraInitializers = [];
    var SettlementExportRow = _classThis = /** @class */ (function () {
        function SettlementExportRow_1() {
            this.paymentId = __runInitializers(this, _paymentId_initializers, void 0);
            this.bookingId = (__runInitializers(this, _paymentId_extraInitializers), __runInitializers(this, _bookingId_initializers, void 0));
            this.venueId = (__runInitializers(this, _bookingId_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.venueName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.venueCity = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _venueCity_initializers, void 0));
            this.customerName = (__runInitializers(this, _venueCity_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.provider = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.paidAt = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            this.grossAmount = (__runInitializers(this, _paidAt_extraInitializers), __runInitializers(this, _grossAmount_initializers, void 0));
            this.commissionPercentage = (__runInitializers(this, _grossAmount_extraInitializers), __runInitializers(this, _commissionPercentage_initializers, void 0));
            this.platformCommissionAmount = (__runInitializers(this, _commissionPercentage_extraInitializers), __runInitializers(this, _platformCommissionAmount_initializers, void 0));
            this.venueSettlementAmount = (__runInitializers(this, _platformCommissionAmount_extraInitializers), __runInitializers(this, _venueSettlementAmount_initializers, void 0));
            this.currency = (__runInitializers(this, _venueSettlementAmount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.settlementStatus = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _settlementStatus_initializers, void 0));
            this.settlementPaidAt = (__runInitializers(this, _settlementStatus_extraInitializers), __runInitializers(this, _settlementPaidAt_initializers, void 0));
            this.paymentReference = (__runInitializers(this, _settlementPaidAt_extraInitializers), __runInitializers(this, _paymentReference_initializers, void 0));
            __runInitializers(this, _paymentReference_extraInitializers);
        }
        return SettlementExportRow_1;
    }());
    __setFunctionName(_classThis, "SettlementExportRow");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _paymentId_decorators = [(0, graphql_1.Field)()];
        _bookingId_decorators = [(0, graphql_1.Field)()];
        _venueId_decorators = [(0, graphql_1.Field)()];
        _venueName_decorators = [(0, graphql_1.Field)()];
        _venueCity_decorators = [(0, graphql_1.Field)()];
        _customerName_decorators = [(0, graphql_1.Field)()];
        _provider_decorators = [(0, graphql_1.Field)()];
        _paidAt_decorators = [(0, graphql_1.Field)()];
        _grossAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _commissionPercentage_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _platformCommissionAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _venueSettlementAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _settlementStatus_decorators = [(0, graphql_1.Field)()];
        _settlementPaidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _paymentReference_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _paymentId_decorators, { kind: "field", name: "paymentId", static: false, private: false, access: { has: function (obj) { return "paymentId" in obj; }, get: function (obj) { return obj.paymentId; }, set: function (obj, value) { obj.paymentId = value; } }, metadata: _metadata }, _paymentId_initializers, _paymentId_extraInitializers);
        __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _venueCity_decorators, { kind: "field", name: "venueCity", static: false, private: false, access: { has: function (obj) { return "venueCity" in obj; }, get: function (obj) { return obj.venueCity; }, set: function (obj, value) { obj.venueCity = value; } }, metadata: _metadata }, _venueCity_initializers, _venueCity_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, null, _grossAmount_decorators, { kind: "field", name: "grossAmount", static: false, private: false, access: { has: function (obj) { return "grossAmount" in obj; }, get: function (obj) { return obj.grossAmount; }, set: function (obj, value) { obj.grossAmount = value; } }, metadata: _metadata }, _grossAmount_initializers, _grossAmount_extraInitializers);
        __esDecorate(null, null, _commissionPercentage_decorators, { kind: "field", name: "commissionPercentage", static: false, private: false, access: { has: function (obj) { return "commissionPercentage" in obj; }, get: function (obj) { return obj.commissionPercentage; }, set: function (obj, value) { obj.commissionPercentage = value; } }, metadata: _metadata }, _commissionPercentage_initializers, _commissionPercentage_extraInitializers);
        __esDecorate(null, null, _platformCommissionAmount_decorators, { kind: "field", name: "platformCommissionAmount", static: false, private: false, access: { has: function (obj) { return "platformCommissionAmount" in obj; }, get: function (obj) { return obj.platformCommissionAmount; }, set: function (obj, value) { obj.platformCommissionAmount = value; } }, metadata: _metadata }, _platformCommissionAmount_initializers, _platformCommissionAmount_extraInitializers);
        __esDecorate(null, null, _venueSettlementAmount_decorators, { kind: "field", name: "venueSettlementAmount", static: false, private: false, access: { has: function (obj) { return "venueSettlementAmount" in obj; }, get: function (obj) { return obj.venueSettlementAmount; }, set: function (obj, value) { obj.venueSettlementAmount = value; } }, metadata: _metadata }, _venueSettlementAmount_initializers, _venueSettlementAmount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _settlementStatus_decorators, { kind: "field", name: "settlementStatus", static: false, private: false, access: { has: function (obj) { return "settlementStatus" in obj; }, get: function (obj) { return obj.settlementStatus; }, set: function (obj, value) { obj.settlementStatus = value; } }, metadata: _metadata }, _settlementStatus_initializers, _settlementStatus_extraInitializers);
        __esDecorate(null, null, _settlementPaidAt_decorators, { kind: "field", name: "settlementPaidAt", static: false, private: false, access: { has: function (obj) { return "settlementPaidAt" in obj; }, get: function (obj) { return obj.settlementPaidAt; }, set: function (obj, value) { obj.settlementPaidAt = value; } }, metadata: _metadata }, _settlementPaidAt_initializers, _settlementPaidAt_extraInitializers);
        __esDecorate(null, null, _paymentReference_decorators, { kind: "field", name: "paymentReference", static: false, private: false, access: { has: function (obj) { return "paymentReference" in obj; }, get: function (obj) { return obj.paymentReference; }, set: function (obj, value) { obj.paymentReference = value; } }, metadata: _metadata }, _paymentReference_initializers, _paymentReference_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SettlementExportRow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SettlementExportRow = _classThis;
}();
exports.SettlementExportRow = SettlementExportRow;
