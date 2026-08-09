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
exports.PaymentsOverview = exports.AdminPayment = exports.AdminSettlement = exports.CommissionBreakdown = exports.AdminPaymentBookingStub = void 0;
exports.buildCommissionBreakdown = buildCommissionBreakdown;
exports.mapAdminSettlement = mapAdminSettlement;
exports.mapAdminPayment = mapAdminPayment;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var sport_stub_model_1 = require("../../sports/dto/sport-stub.model");
var AdminPaymentBookingStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Booking summary embedded in the payment payload.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var AdminPaymentBookingStub = _classThis = /** @class */ (function () {
        function AdminPaymentBookingStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.venueId = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.courtName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.sport = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.startAt = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            __runInitializers(this, _startAt_extraInitializers);
        }
        return AdminPaymentBookingStub_1;
    }());
    __setFunctionName(_classThis, "AdminPaymentBookingStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueName_decorators = [(0, graphql_1.Field)()];
        _venueId_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _courtName_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminPaymentBookingStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminPaymentBookingStub = _classThis;
}();
exports.AdminPaymentBookingStub = AdminPaymentBookingStub;
var CommissionBreakdown = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Commission breakdown for a payment. Live-computed when no Settlement row exists, otherwise reflects the snapshot stored on the Settlement.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
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
    var _isProvisional_decorators;
    var _isProvisional_initializers = [];
    var _isProvisional_extraInitializers = [];
    var CommissionBreakdown = _classThis = /** @class */ (function () {
        function CommissionBreakdown_1() {
            this.grossAmount = __runInitializers(this, _grossAmount_initializers, void 0);
            this.commissionPercentage = (__runInitializers(this, _grossAmount_extraInitializers), __runInitializers(this, _commissionPercentage_initializers, void 0));
            this.platformCommissionAmount = (__runInitializers(this, _commissionPercentage_extraInitializers), __runInitializers(this, _platformCommissionAmount_initializers, void 0));
            this.venueSettlementAmount = (__runInitializers(this, _platformCommissionAmount_extraInitializers), __runInitializers(this, _venueSettlementAmount_initializers, void 0));
            this.currency = (__runInitializers(this, _venueSettlementAmount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.isProvisional = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _isProvisional_initializers, void 0));
            __runInitializers(this, _isProvisional_extraInitializers);
        }
        return CommissionBreakdown_1;
    }());
    __setFunctionName(_classThis, "CommissionBreakdown");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _grossAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _commissionPercentage_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _platformCommissionAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _venueSettlementAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _isProvisional_decorators = [(0, graphql_1.Field)({ description: 'true when no Settlement row exists yet — the values are computed live.' })];
        __esDecorate(null, null, _grossAmount_decorators, { kind: "field", name: "grossAmount", static: false, private: false, access: { has: function (obj) { return "grossAmount" in obj; }, get: function (obj) { return obj.grossAmount; }, set: function (obj, value) { obj.grossAmount = value; } }, metadata: _metadata }, _grossAmount_initializers, _grossAmount_extraInitializers);
        __esDecorate(null, null, _commissionPercentage_decorators, { kind: "field", name: "commissionPercentage", static: false, private: false, access: { has: function (obj) { return "commissionPercentage" in obj; }, get: function (obj) { return obj.commissionPercentage; }, set: function (obj, value) { obj.commissionPercentage = value; } }, metadata: _metadata }, _commissionPercentage_initializers, _commissionPercentage_extraInitializers);
        __esDecorate(null, null, _platformCommissionAmount_decorators, { kind: "field", name: "platformCommissionAmount", static: false, private: false, access: { has: function (obj) { return "platformCommissionAmount" in obj; }, get: function (obj) { return obj.platformCommissionAmount; }, set: function (obj, value) { obj.platformCommissionAmount = value; } }, metadata: _metadata }, _platformCommissionAmount_initializers, _platformCommissionAmount_extraInitializers);
        __esDecorate(null, null, _venueSettlementAmount_decorators, { kind: "field", name: "venueSettlementAmount", static: false, private: false, access: { has: function (obj) { return "venueSettlementAmount" in obj; }, get: function (obj) { return obj.venueSettlementAmount; }, set: function (obj, value) { obj.venueSettlementAmount = value; } }, metadata: _metadata }, _venueSettlementAmount_initializers, _venueSettlementAmount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _isProvisional_decorators, { kind: "field", name: "isProvisional", static: false, private: false, access: { has: function (obj) { return "isProvisional" in obj; }, get: function (obj) { return obj.isProvisional; }, set: function (obj, value) { obj.isProvisional = value; } }, metadata: _metadata }, _isProvisional_initializers, _isProvisional_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CommissionBreakdown = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CommissionBreakdown = _classThis;
}();
exports.CommissionBreakdown = CommissionBreakdown;
var AdminSettlement = function () {
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
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _grossAmount_decorators;
    var _grossAmount_initializers = [];
    var _grossAmount_extraInitializers = [];
    var _commissionPercentage_decorators;
    var _commissionPercentage_initializers = [];
    var _commissionPercentage_extraInitializers = [];
    var _platformCommissionAmount_decorators;
    var _platformCommissionAmount_initializers = [];
    var _platformCommissionAmount_extraInitializers = [];
    var _netAmount_decorators;
    var _netAmount_initializers = [];
    var _netAmount_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _paidAt_decorators;
    var _paidAt_initializers = [];
    var _paidAt_extraInitializers = [];
    var _paymentReference_decorators;
    var _paymentReference_initializers = [];
    var _paymentReference_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _markedPaidBy_decorators;
    var _markedPaidBy_initializers = [];
    var _markedPaidBy_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminSettlement = _classThis = /** @class */ (function () {
        function AdminSettlement_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.venueName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.grossAmount = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _grossAmount_initializers, void 0));
            this.commissionPercentage = (__runInitializers(this, _grossAmount_extraInitializers), __runInitializers(this, _commissionPercentage_initializers, void 0));
            this.platformCommissionAmount = (__runInitializers(this, _commissionPercentage_extraInitializers), __runInitializers(this, _platformCommissionAmount_initializers, void 0));
            this.netAmount = (__runInitializers(this, _platformCommissionAmount_extraInitializers), __runInitializers(this, _netAmount_initializers, void 0));
            this.currency = (__runInitializers(this, _netAmount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.status = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.paidAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            this.paymentReference = (__runInitializers(this, _paidAt_extraInitializers), __runInitializers(this, _paymentReference_initializers, void 0));
            this.notes = (__runInitializers(this, _paymentReference_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.markedPaidBy = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _markedPaidBy_initializers, void 0));
            this.createdAt = (__runInitializers(this, _markedPaidBy_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminSettlement_1;
    }());
    __setFunctionName(_classThis, "AdminSettlement");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueName_decorators = [(0, graphql_1.Field)()];
        _grossAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _commissionPercentage_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _platformCommissionAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _netAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.SettlementStatus; })];
        _paidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _paymentReference_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _markedPaidBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _grossAmount_decorators, { kind: "field", name: "grossAmount", static: false, private: false, access: { has: function (obj) { return "grossAmount" in obj; }, get: function (obj) { return obj.grossAmount; }, set: function (obj, value) { obj.grossAmount = value; } }, metadata: _metadata }, _grossAmount_initializers, _grossAmount_extraInitializers);
        __esDecorate(null, null, _commissionPercentage_decorators, { kind: "field", name: "commissionPercentage", static: false, private: false, access: { has: function (obj) { return "commissionPercentage" in obj; }, get: function (obj) { return obj.commissionPercentage; }, set: function (obj, value) { obj.commissionPercentage = value; } }, metadata: _metadata }, _commissionPercentage_initializers, _commissionPercentage_extraInitializers);
        __esDecorate(null, null, _platformCommissionAmount_decorators, { kind: "field", name: "platformCommissionAmount", static: false, private: false, access: { has: function (obj) { return "platformCommissionAmount" in obj; }, get: function (obj) { return obj.platformCommissionAmount; }, set: function (obj, value) { obj.platformCommissionAmount = value; } }, metadata: _metadata }, _platformCommissionAmount_initializers, _platformCommissionAmount_extraInitializers);
        __esDecorate(null, null, _netAmount_decorators, { kind: "field", name: "netAmount", static: false, private: false, access: { has: function (obj) { return "netAmount" in obj; }, get: function (obj) { return obj.netAmount; }, set: function (obj, value) { obj.netAmount = value; } }, metadata: _metadata }, _netAmount_initializers, _netAmount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, null, _paymentReference_decorators, { kind: "field", name: "paymentReference", static: false, private: false, access: { has: function (obj) { return "paymentReference" in obj; }, get: function (obj) { return obj.paymentReference; }, set: function (obj, value) { obj.paymentReference = value; } }, metadata: _metadata }, _paymentReference_initializers, _paymentReference_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _markedPaidBy_decorators, { kind: "field", name: "markedPaidBy", static: false, private: false, access: { has: function (obj) { return "markedPaidBy" in obj; }, get: function (obj) { return obj.markedPaidBy; }, set: function (obj, value) { obj.markedPaidBy = value; } }, metadata: _metadata }, _markedPaidBy_initializers, _markedPaidBy_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminSettlement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminSettlement = _classThis;
}();
exports.AdminSettlement = AdminSettlement;
var AdminPayment = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Admin-facing payment row: customer, booking summary, commission and (optional) settlement.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _booking_decorators;
    var _booking_initializers = [];
    var _booking_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _providerTxnId_decorators;
    var _providerTxnId_initializers = [];
    var _providerTxnId_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _failureReason_decorators;
    var _failureReason_initializers = [];
    var _failureReason_extraInitializers = [];
    var _paidAt_decorators;
    var _paidAt_initializers = [];
    var _paidAt_extraInitializers = [];
    var _commission_decorators;
    var _commission_initializers = [];
    var _commission_extraInitializers = [];
    var _settlement_decorators;
    var _settlement_initializers = [];
    var _settlement_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminPayment = _classThis = /** @class */ (function () {
        function AdminPayment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.booking = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _booking_initializers, void 0));
            this.provider = (__runInitializers(this, _booking_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.providerTxnId = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _providerTxnId_initializers, void 0));
            this.amount = (__runInitializers(this, _providerTxnId_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.currency = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.status = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.failureReason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _failureReason_initializers, void 0));
            this.paidAt = (__runInitializers(this, _failureReason_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            this.commission = (__runInitializers(this, _paidAt_extraInitializers), __runInitializers(this, _commission_initializers, void 0));
            this.settlement = (__runInitializers(this, _commission_extraInitializers), __runInitializers(this, _settlement_initializers, void 0));
            this.createdAt = (__runInitializers(this, _settlement_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminPayment_1;
    }());
    __setFunctionName(_classThis, "AdminPayment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _user_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _booking_decorators = [(0, graphql_1.Field)(function () { return AdminPaymentBookingStub; })];
        _provider_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; })];
        _providerTxnId_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentStatus; })];
        _failureReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _paidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _commission_decorators = [(0, graphql_1.Field)(function () { return CommissionBreakdown; })];
        _settlement_decorators = [(0, graphql_1.Field)(function () { return AdminSettlement; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _booking_decorators, { kind: "field", name: "booking", static: false, private: false, access: { has: function (obj) { return "booking" in obj; }, get: function (obj) { return obj.booking; }, set: function (obj, value) { obj.booking = value; } }, metadata: _metadata }, _booking_initializers, _booking_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _providerTxnId_decorators, { kind: "field", name: "providerTxnId", static: false, private: false, access: { has: function (obj) { return "providerTxnId" in obj; }, get: function (obj) { return obj.providerTxnId; }, set: function (obj, value) { obj.providerTxnId = value; } }, metadata: _metadata }, _providerTxnId_initializers, _providerTxnId_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _failureReason_decorators, { kind: "field", name: "failureReason", static: false, private: false, access: { has: function (obj) { return "failureReason" in obj; }, get: function (obj) { return obj.failureReason; }, set: function (obj, value) { obj.failureReason = value; } }, metadata: _metadata }, _failureReason_initializers, _failureReason_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, null, _commission_decorators, { kind: "field", name: "commission", static: false, private: false, access: { has: function (obj) { return "commission" in obj; }, get: function (obj) { return obj.commission; }, set: function (obj, value) { obj.commission = value; } }, metadata: _metadata }, _commission_initializers, _commission_extraInitializers);
        __esDecorate(null, null, _settlement_decorators, { kind: "field", name: "settlement", static: false, private: false, access: { has: function (obj) { return "settlement" in obj; }, get: function (obj) { return obj.settlement; }, set: function (obj, value) { obj.settlement = value; } }, metadata: _metadata }, _settlement_initializers, _settlement_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminPayment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminPayment = _classThis;
}();
exports.AdminPayment = AdminPayment;
var PaymentsOverview = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Aggregate totals for a payment filter set — used to power the KPI strip.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _grossRevenue_decorators;
    var _grossRevenue_initializers = [];
    var _grossRevenue_extraInitializers = [];
    var _platformCommission_decorators;
    var _platformCommission_initializers = [];
    var _platformCommission_extraInitializers = [];
    var _venuesOwed_decorators;
    var _venuesOwed_initializers = [];
    var _venuesOwed_extraInitializers = [];
    var _venuesSettled_decorators;
    var _venuesSettled_initializers = [];
    var _venuesSettled_extraInitializers = [];
    var _refundedTotal_decorators;
    var _refundedTotal_initializers = [];
    var _refundedTotal_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var PaymentsOverview = _classThis = /** @class */ (function () {
        function PaymentsOverview_1() {
            this.grossRevenue = __runInitializers(this, _grossRevenue_initializers, void 0);
            this.platformCommission = (__runInitializers(this, _grossRevenue_extraInitializers), __runInitializers(this, _platformCommission_initializers, void 0));
            this.venuesOwed = (__runInitializers(this, _platformCommission_extraInitializers), __runInitializers(this, _venuesOwed_initializers, void 0));
            this.venuesSettled = (__runInitializers(this, _venuesOwed_extraInitializers), __runInitializers(this, _venuesSettled_initializers, void 0));
            this.refundedTotal = (__runInitializers(this, _venuesSettled_extraInitializers), __runInitializers(this, _refundedTotal_initializers, void 0));
            this.currency = (__runInitializers(this, _refundedTotal_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            __runInitializers(this, _currency_extraInitializers);
        }
        return PaymentsOverview_1;
    }());
    __setFunctionName(_classThis, "PaymentsOverview");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _grossRevenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _platformCommission_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _venuesOwed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _venuesSettled_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _refundedTotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _grossRevenue_decorators, { kind: "field", name: "grossRevenue", static: false, private: false, access: { has: function (obj) { return "grossRevenue" in obj; }, get: function (obj) { return obj.grossRevenue; }, set: function (obj, value) { obj.grossRevenue = value; } }, metadata: _metadata }, _grossRevenue_initializers, _grossRevenue_extraInitializers);
        __esDecorate(null, null, _platformCommission_decorators, { kind: "field", name: "platformCommission", static: false, private: false, access: { has: function (obj) { return "platformCommission" in obj; }, get: function (obj) { return obj.platformCommission; }, set: function (obj, value) { obj.platformCommission = value; } }, metadata: _metadata }, _platformCommission_initializers, _platformCommission_extraInitializers);
        __esDecorate(null, null, _venuesOwed_decorators, { kind: "field", name: "venuesOwed", static: false, private: false, access: { has: function (obj) { return "venuesOwed" in obj; }, get: function (obj) { return obj.venuesOwed; }, set: function (obj, value) { obj.venuesOwed = value; } }, metadata: _metadata }, _venuesOwed_initializers, _venuesOwed_extraInitializers);
        __esDecorate(null, null, _venuesSettled_decorators, { kind: "field", name: "venuesSettled", static: false, private: false, access: { has: function (obj) { return "venuesSettled" in obj; }, get: function (obj) { return obj.venuesSettled; }, set: function (obj, value) { obj.venuesSettled = value; } }, metadata: _metadata }, _venuesSettled_initializers, _venuesSettled_extraInitializers);
        __esDecorate(null, null, _refundedTotal_decorators, { kind: "field", name: "refundedTotal", static: false, private: false, access: { has: function (obj) { return "refundedTotal" in obj; }, get: function (obj) { return obj.refundedTotal; }, set: function (obj, value) { obj.refundedTotal = value; } }, metadata: _metadata }, _refundedTotal_initializers, _refundedTotal_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaymentsOverview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaymentsOverview = _classThis;
}();
exports.PaymentsOverview = PaymentsOverview;
function decimalToNumber(d) {
    if (d === null || d === undefined)
        return 0;
    return typeof d === 'number' ? d : Number(d.toString());
}
function buildCommissionBreakdown(args) {
    if (args.fromSettlement) {
        return {
            grossAmount: args.fromSettlement.grossAmount,
            commissionPercentage: args.fromSettlement.commissionPercentage,
            platformCommissionAmount: args.fromSettlement.platformCommissionAmount,
            venueSettlementAmount: args.fromSettlement.netAmount,
            currency: args.fromSettlement.currency,
            isProvisional: false,
        };
    }
    var pct = args.commissionPercentage;
    var platform = round2(args.amount * (pct / 100));
    var venue = round2(args.amount - platform);
    return {
        grossAmount: args.amount,
        commissionPercentage: pct,
        platformCommissionAmount: platform,
        venueSettlementAmount: venue,
        currency: args.currency,
        isProvisional: true,
    };
}
function round2(n) {
    return Math.round(n * 100) / 100;
}
function mapAdminSettlement(s) {
    var _a, _b, _c;
    return {
        id: s.id,
        venueId: s.venueId,
        venueName: s.venue.name,
        grossAmount: decimalToNumber(s.grossAmount),
        commissionPercentage: decimalToNumber(s.commissionPercentage),
        platformCommissionAmount: decimalToNumber(s.platformCommissionAmount),
        netAmount: decimalToNumber(s.netAmount),
        currency: s.currency,
        status: s.status,
        paidAt: (_a = s.paidAt) !== null && _a !== void 0 ? _a : undefined,
        paymentReference: (_b = s.paymentReference) !== null && _b !== void 0 ? _b : undefined,
        notes: (_c = s.notes) !== null && _c !== void 0 ? _c : undefined,
        markedPaidBy: s.markedPaidBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(s.markedPaidBy) : undefined,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
    };
}
function mapAdminPayment(p, defaultCommissionPct) {
    var _a, _b, _c, _d;
    var amount = decimalToNumber(p.amount);
    var settlement = (_a = p.settlement) !== null && _a !== void 0 ? _a : null;
    var settlementGql = settlement ? mapAdminSettlement(settlement) : undefined;
    var commission = buildCommissionBreakdown({
        amount: amount,
        currency: p.currency,
        commissionPercentage: defaultCommissionPct,
        fromSettlement: settlement
            ? {
                grossAmount: decimalToNumber(settlement.grossAmount),
                commissionPercentage: decimalToNumber(settlement.commissionPercentage),
                platformCommissionAmount: decimalToNumber(settlement.platformCommissionAmount),
                netAmount: decimalToNumber(settlement.netAmount),
                currency: settlement.currency,
            }
            : null,
    });
    return {
        id: p.id,
        user: (0, admin_user_model_1.mapPrismaUserToAdmin)(p.user),
        booking: {
            id: p.booking.id,
            venueId: p.booking.venueId,
            venueName: p.booking.venue.name,
            courtName: p.booking.court.name,
            sport: (0, sport_stub_model_1.mapSportStub)(p.booking.court.sport),
            startAt: p.booking.startAt,
        },
        provider: p.provider,
        providerTxnId: (_b = p.providerTxnId) !== null && _b !== void 0 ? _b : undefined,
        amount: amount,
        currency: p.currency,
        status: p.status,
        failureReason: (_c = p.failureReason) !== null && _c !== void 0 ? _c : undefined,
        paidAt: (_d = p.paidAt) !== null && _d !== void 0 ? _d : undefined,
        commission: commission,
        settlement: settlementGql,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
    };
}
