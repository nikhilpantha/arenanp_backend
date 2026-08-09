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
exports.AdminRefundRequest = exports.AdminRefundPaymentStub = exports.AdminRefundBookingStub = void 0;
exports.mapRefundToAdmin = mapRefundToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var sport_stub_model_1 = require("../../sports/dto/sport-stub.model");
var AdminRefundBookingStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Booking context embedded in a refund request.' })];
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
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var AdminRefundBookingStub = _classThis = /** @class */ (function () {
        function AdminRefundBookingStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.venueName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.sport = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.startAt = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.total = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.status = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return AdminRefundBookingStub_1;
    }());
    __setFunctionName(_classThis, "AdminRefundBookingStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _venueName_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; }, { nullable: true })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminRefundBookingStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminRefundBookingStub = _classThis;
}();
exports.AdminRefundBookingStub = AdminRefundBookingStub;
var AdminRefundPaymentStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Payment context embedded in a refund request (when one exists).' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _providerTxnId_decorators;
    var _providerTxnId_initializers = [];
    var _providerTxnId_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _paidAt_decorators;
    var _paidAt_initializers = [];
    var _paidAt_extraInitializers = [];
    var AdminRefundPaymentStub = _classThis = /** @class */ (function () {
        function AdminRefundPaymentStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.provider = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.providerTxnId = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _providerTxnId_initializers, void 0));
            this.amount = (__runInitializers(this, _providerTxnId_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.paidAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            __runInitializers(this, _paidAt_extraInitializers);
        }
        return AdminRefundPaymentStub_1;
    }());
    __setFunctionName(_classThis, "AdminRefundPaymentStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _provider_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; })];
        _providerTxnId_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentStatus; })];
        _paidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _providerTxnId_decorators, { kind: "field", name: "providerTxnId", static: false, private: false, access: { has: function (obj) { return "providerTxnId" in obj; }, get: function (obj) { return obj.providerTxnId; }, set: function (obj, value) { obj.providerTxnId = value; } }, metadata: _metadata }, _providerTxnId_initializers, _providerTxnId_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminRefundPaymentStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminRefundPaymentStub = _classThis;
}();
exports.AdminRefundPaymentStub = AdminRefundPaymentStub;
var AdminRefundRequest = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Admin-facing view of a refund request — booking + payment context, lifecycle timestamps, reviewer audit.',
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
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _requestedAmount_decorators;
    var _requestedAmount_initializers = [];
    var _requestedAmount_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _rejectionReason_decorators;
    var _rejectionReason_initializers = [];
    var _rejectionReason_extraInitializers = [];
    var _adminNotes_decorators;
    var _adminNotes_initializers = [];
    var _adminNotes_extraInitializers = [];
    var _approvedBy_decorators;
    var _approvedBy_initializers = [];
    var _approvedBy_extraInitializers = [];
    var _approvedAt_decorators;
    var _approvedAt_initializers = [];
    var _approvedAt_extraInitializers = [];
    var _processedBy_decorators;
    var _processedBy_initializers = [];
    var _processedBy_extraInitializers = [];
    var _processedAt_decorators;
    var _processedAt_initializers = [];
    var _processedAt_extraInitializers = [];
    var _processorReference_decorators;
    var _processorReference_initializers = [];
    var _processorReference_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminRefundRequest = _classThis = /** @class */ (function () {
        function AdminRefundRequest_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.booking = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _booking_initializers, void 0));
            this.payment = (__runInitializers(this, _booking_extraInitializers), __runInitializers(this, _payment_initializers, void 0));
            this.requestedAmount = (__runInitializers(this, _payment_extraInitializers), __runInitializers(this, _requestedAmount_initializers, void 0));
            this.currency = (__runInitializers(this, _requestedAmount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.reason = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            this.status = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.rejectionReason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _rejectionReason_initializers, void 0));
            this.adminNotes = (__runInitializers(this, _rejectionReason_extraInitializers), __runInitializers(this, _adminNotes_initializers, void 0));
            this.approvedBy = (__runInitializers(this, _adminNotes_extraInitializers), __runInitializers(this, _approvedBy_initializers, void 0));
            this.approvedAt = (__runInitializers(this, _approvedBy_extraInitializers), __runInitializers(this, _approvedAt_initializers, void 0));
            this.processedBy = (__runInitializers(this, _approvedAt_extraInitializers), __runInitializers(this, _processedBy_initializers, void 0));
            this.processedAt = (__runInitializers(this, _processedBy_extraInitializers), __runInitializers(this, _processedAt_initializers, void 0));
            this.processorReference = (__runInitializers(this, _processedAt_extraInitializers), __runInitializers(this, _processorReference_initializers, void 0));
            this.createdAt = (__runInitializers(this, _processorReference_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminRefundRequest_1;
    }());
    __setFunctionName(_classThis, "AdminRefundRequest");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _user_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _booking_decorators = [(0, graphql_1.Field)(function () { return AdminRefundBookingStub; })];
        _payment_decorators = [(0, graphql_1.Field)(function () { return AdminRefundPaymentStub; }, { nullable: true })];
        _requestedAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _reason_decorators = [(0, graphql_1.Field)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.RefundStatus; })];
        _rejectionReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _adminNotes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _approvedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _approvedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _processedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _processedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _processorReference_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _booking_decorators, { kind: "field", name: "booking", static: false, private: false, access: { has: function (obj) { return "booking" in obj; }, get: function (obj) { return obj.booking; }, set: function (obj, value) { obj.booking = value; } }, metadata: _metadata }, _booking_initializers, _booking_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _requestedAmount_decorators, { kind: "field", name: "requestedAmount", static: false, private: false, access: { has: function (obj) { return "requestedAmount" in obj; }, get: function (obj) { return obj.requestedAmount; }, set: function (obj, value) { obj.requestedAmount = value; } }, metadata: _metadata }, _requestedAmount_initializers, _requestedAmount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _rejectionReason_decorators, { kind: "field", name: "rejectionReason", static: false, private: false, access: { has: function (obj) { return "rejectionReason" in obj; }, get: function (obj) { return obj.rejectionReason; }, set: function (obj, value) { obj.rejectionReason = value; } }, metadata: _metadata }, _rejectionReason_initializers, _rejectionReason_extraInitializers);
        __esDecorate(null, null, _adminNotes_decorators, { kind: "field", name: "adminNotes", static: false, private: false, access: { has: function (obj) { return "adminNotes" in obj; }, get: function (obj) { return obj.adminNotes; }, set: function (obj, value) { obj.adminNotes = value; } }, metadata: _metadata }, _adminNotes_initializers, _adminNotes_extraInitializers);
        __esDecorate(null, null, _approvedBy_decorators, { kind: "field", name: "approvedBy", static: false, private: false, access: { has: function (obj) { return "approvedBy" in obj; }, get: function (obj) { return obj.approvedBy; }, set: function (obj, value) { obj.approvedBy = value; } }, metadata: _metadata }, _approvedBy_initializers, _approvedBy_extraInitializers);
        __esDecorate(null, null, _approvedAt_decorators, { kind: "field", name: "approvedAt", static: false, private: false, access: { has: function (obj) { return "approvedAt" in obj; }, get: function (obj) { return obj.approvedAt; }, set: function (obj, value) { obj.approvedAt = value; } }, metadata: _metadata }, _approvedAt_initializers, _approvedAt_extraInitializers);
        __esDecorate(null, null, _processedBy_decorators, { kind: "field", name: "processedBy", static: false, private: false, access: { has: function (obj) { return "processedBy" in obj; }, get: function (obj) { return obj.processedBy; }, set: function (obj, value) { obj.processedBy = value; } }, metadata: _metadata }, _processedBy_initializers, _processedBy_extraInitializers);
        __esDecorate(null, null, _processedAt_decorators, { kind: "field", name: "processedAt", static: false, private: false, access: { has: function (obj) { return "processedAt" in obj; }, get: function (obj) { return obj.processedAt; }, set: function (obj, value) { obj.processedAt = value; } }, metadata: _metadata }, _processedAt_initializers, _processedAt_extraInitializers);
        __esDecorate(null, null, _processorReference_decorators, { kind: "field", name: "processorReference", static: false, private: false, access: { has: function (obj) { return "processorReference" in obj; }, get: function (obj) { return obj.processorReference; }, set: function (obj, value) { obj.processorReference = value; } }, metadata: _metadata }, _processorReference_initializers, _processorReference_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminRefundRequest = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminRefundRequest = _classThis;
}();
exports.AdminRefundRequest = AdminRefundRequest;
function decimalToNumber(d) {
    if (d === null || d === undefined)
        return 0;
    return typeof d === 'number' ? d : Number(d.toString());
}
function mapRefundToAdmin(r) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        id: r.id,
        user: (0, admin_user_model_1.mapPrismaUserToAdmin)(r.user),
        booking: {
            id: r.booking.id,
            venueId: r.booking.venueId,
            venueName: r.booking.venue.name,
            sport: (0, sport_stub_model_1.mapSportStub)(r.booking.court.sport),
            startAt: r.booking.startAt,
            total: decimalToNumber(r.booking.total),
            status: r.booking.status,
        },
        payment: r.payment
            ? {
                id: r.payment.id,
                provider: r.payment.provider,
                providerTxnId: (_a = r.payment.providerTxnId) !== null && _a !== void 0 ? _a : undefined,
                amount: decimalToNumber(r.payment.amount),
                status: r.payment.status,
                paidAt: (_b = r.payment.paidAt) !== null && _b !== void 0 ? _b : undefined,
            }
            : undefined,
        requestedAmount: decimalToNumber(r.requestedAmount),
        currency: r.currency,
        reason: r.reason,
        status: r.status,
        rejectionReason: (_c = r.rejectionReason) !== null && _c !== void 0 ? _c : undefined,
        adminNotes: (_d = r.adminNotes) !== null && _d !== void 0 ? _d : undefined,
        approvedBy: r.approvedBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(r.approvedBy) : undefined,
        approvedAt: (_e = r.approvedAt) !== null && _e !== void 0 ? _e : undefined,
        processedBy: r.processedBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(r.processedBy) : undefined,
        processedAt: (_f = r.processedAt) !== null && _f !== void 0 ? _f : undefined,
        processorReference: (_g = r.processorReference) !== null && _g !== void 0 ? _g : undefined,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
    };
}
