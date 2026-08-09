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
exports.AdminBooking = exports.AdminBookingStatusEvent = exports.AdminBookingPayment = exports.AdminBookingCourtStub = exports.AdminBookingVenueStub = void 0;
exports.mapPaymentToAdmin = mapPaymentToAdmin;
exports.mapStatusEventToAdmin = mapStatusEventToAdmin;
exports.mapBookingToAdmin = mapBookingToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var sport_stub_model_1 = require("../../sports/dto/sport-stub.model");
var AdminBookingVenueStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact venue stub shown inside booking payloads.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var AdminBookingVenueStub = _classThis = /** @class */ (function () {
        function AdminBookingVenueStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.city = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            __runInitializers(this, _city_extraInitializers);
        }
        return AdminBookingVenueStub_1;
    }());
    __setFunctionName(_classThis, "AdminBookingVenueStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBookingVenueStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBookingVenueStub = _classThis;
}();
exports.AdminBookingVenueStub = AdminBookingVenueStub;
var AdminBookingCourtStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact court stub shown inside booking payloads.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var AdminBookingCourtStub = _classThis = /** @class */ (function () {
        function AdminBookingCourtStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.sport = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.pricePerHour = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            __runInitializers(this, _pricePerHour_extraInitializers);
        }
        return AdminBookingCourtStub_1;
    }());
    __setFunctionName(_classThis, "AdminBookingCourtStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBookingCourtStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBookingCourtStub = _classThis;
}();
exports.AdminBookingCourtStub = AdminBookingCourtStub;
var AdminBookingPayment = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Payment record attached to a booking, as seen by admin.' })];
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
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminBookingPayment = _classThis = /** @class */ (function () {
        function AdminBookingPayment_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.provider = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.providerTxnId = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _providerTxnId_initializers, void 0));
            this.amount = (__runInitializers(this, _providerTxnId_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.currency = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.status = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.failureReason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _failureReason_initializers, void 0));
            this.paidAt = (__runInitializers(this, _failureReason_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _paidAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminBookingPayment_1;
    }());
    __setFunctionName(_classThis, "AdminBookingPayment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _provider_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; })];
        _providerTxnId_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentStatus; })];
        _failureReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _paidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _providerTxnId_decorators, { kind: "field", name: "providerTxnId", static: false, private: false, access: { has: function (obj) { return "providerTxnId" in obj; }, get: function (obj) { return obj.providerTxnId; }, set: function (obj, value) { obj.providerTxnId = value; } }, metadata: _metadata }, _providerTxnId_initializers, _providerTxnId_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _failureReason_decorators, { kind: "field", name: "failureReason", static: false, private: false, access: { has: function (obj) { return "failureReason" in obj; }, get: function (obj) { return obj.failureReason; }, set: function (obj, value) { obj.failureReason = value; } }, metadata: _metadata }, _failureReason_initializers, _failureReason_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBookingPayment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBookingPayment = _classThis;
}();
exports.AdminBookingPayment = AdminBookingPayment;
var AdminBookingStatusEvent = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Timeline entry for a booking — one row per state transition.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _fromStatus_decorators;
    var _fromStatus_initializers = [];
    var _fromStatus_extraInitializers = [];
    var _toStatus_decorators;
    var _toStatus_initializers = [];
    var _toStatus_extraInitializers = [];
    var _actor_decorators;
    var _actor_initializers = [];
    var _actor_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AdminBookingStatusEvent = _classThis = /** @class */ (function () {
        function AdminBookingStatusEvent_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.fromStatus = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fromStatus_initializers, void 0));
            this.toStatus = (__runInitializers(this, _fromStatus_extraInitializers), __runInitializers(this, _toStatus_initializers, void 0));
            this.actor = (__runInitializers(this, _toStatus_extraInitializers), __runInitializers(this, _actor_initializers, void 0));
            this.note = (__runInitializers(this, _actor_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            this.createdAt = (__runInitializers(this, _note_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AdminBookingStatusEvent_1;
    }());
    __setFunctionName(_classThis, "AdminBookingStatusEvent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fromStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; }, { nullable: true })];
        _toStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; })];
        _actor_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _fromStatus_decorators, { kind: "field", name: "fromStatus", static: false, private: false, access: { has: function (obj) { return "fromStatus" in obj; }, get: function (obj) { return obj.fromStatus; }, set: function (obj, value) { obj.fromStatus = value; } }, metadata: _metadata }, _fromStatus_initializers, _fromStatus_extraInitializers);
        __esDecorate(null, null, _toStatus_decorators, { kind: "field", name: "toStatus", static: false, private: false, access: { has: function (obj) { return "toStatus" in obj; }, get: function (obj) { return obj.toStatus; }, set: function (obj, value) { obj.toStatus = value; } }, metadata: _metadata }, _toStatus_initializers, _toStatus_extraInitializers);
        __esDecorate(null, null, _actor_decorators, { kind: "field", name: "actor", static: false, private: false, access: { has: function (obj) { return "actor" in obj; }, get: function (obj) { return obj.actor; }, set: function (obj, value) { obj.actor = value; } }, metadata: _metadata }, _actor_initializers, _actor_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBookingStatusEvent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBookingStatusEvent = _classThis;
}();
exports.AdminBookingStatusEvent = AdminBookingStatusEvent;
var AdminBooking = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Admin-facing view of a Booking. Includes user, venue, court, payment and the status-change timeline.',
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
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerName_extraInitializers = [];
    var _customerPhone_decorators;
    var _customerPhone_initializers = [];
    var _customerPhone_extraInitializers = [];
    var _customerType_decorators;
    var _customerType_initializers = [];
    var _customerType_extraInitializers = [];
    var _source_decorators;
    var _source_initializers = [];
    var _source_extraInitializers = [];
    var _venue_decorators;
    var _venue_initializers = [];
    var _venue_extraInitializers = [];
    var _court_decorators;
    var _court_initializers = [];
    var _court_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _endAt_decorators;
    var _endAt_initializers = [];
    var _endAt_extraInitializers = [];
    var _durationMinutes_decorators;
    var _durationMinutes_initializers = [];
    var _durationMinutes_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _subtotal_decorators;
    var _subtotal_initializers = [];
    var _subtotal_extraInitializers = [];
    var _serviceFee_decorators;
    var _serviceFee_initializers = [];
    var _serviceFee_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _cancellationReason_decorators;
    var _cancellationReason_initializers = [];
    var _cancellationReason_extraInitializers = [];
    var _cancelledBy_decorators;
    var _cancelledBy_initializers = [];
    var _cancelledBy_extraInitializers = [];
    var _cancelledAt_decorators;
    var _cancelledAt_initializers = [];
    var _cancelledAt_extraInitializers = [];
    var _completedAt_decorators;
    var _completedAt_initializers = [];
    var _completedAt_extraInitializers = [];
    var _adminNotes_decorators;
    var _adminNotes_initializers = [];
    var _adminNotes_extraInitializers = [];
    var _payment_decorators;
    var _payment_initializers = [];
    var _payment_extraInitializers = [];
    var _statusEvents_decorators;
    var _statusEvents_initializers = [];
    var _statusEvents_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminBooking = _classThis = /** @class */ (function () {
        function AdminBooking_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            /** The registered player who booked online; null for venue walk-in bookings. */
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.customerName = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.customerPhone = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerPhone_initializers, void 0));
            this.customerType = (__runInitializers(this, _customerPhone_extraInitializers), __runInitializers(this, _customerType_initializers, void 0));
            this.source = (__runInitializers(this, _customerType_extraInitializers), __runInitializers(this, _source_initializers, void 0));
            this.venue = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _venue_initializers, void 0));
            this.court = (__runInitializers(this, _venue_extraInitializers), __runInitializers(this, _court_initializers, void 0));
            this.startAt = (__runInitializers(this, _court_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.endAt = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _endAt_initializers, void 0));
            this.durationMinutes = (__runInitializers(this, _endAt_extraInitializers), __runInitializers(this, _durationMinutes_initializers, void 0));
            this.pricePerHour = (__runInitializers(this, _durationMinutes_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            this.subtotal = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _subtotal_initializers, void 0));
            this.serviceFee = (__runInitializers(this, _subtotal_extraInitializers), __runInitializers(this, _serviceFee_initializers, void 0));
            this.total = (__runInitializers(this, _serviceFee_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.status = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.cancellationReason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _cancellationReason_initializers, void 0));
            this.cancelledBy = (__runInitializers(this, _cancellationReason_extraInitializers), __runInitializers(this, _cancelledBy_initializers, void 0));
            this.cancelledAt = (__runInitializers(this, _cancelledBy_extraInitializers), __runInitializers(this, _cancelledAt_initializers, void 0));
            this.completedAt = (__runInitializers(this, _cancelledAt_extraInitializers), __runInitializers(this, _completedAt_initializers, void 0));
            this.adminNotes = (__runInitializers(this, _completedAt_extraInitializers), __runInitializers(this, _adminNotes_initializers, void 0));
            this.payment = (__runInitializers(this, _adminNotes_extraInitializers), __runInitializers(this, _payment_initializers, void 0));
            this.statusEvents = (__runInitializers(this, _payment_extraInitializers), __runInitializers(this, _statusEvents_initializers, void 0));
            this.createdAt = (__runInitializers(this, _statusEvents_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminBooking_1;
    }());
    __setFunctionName(_classThis, "AdminBooking");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _user_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _customerName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _customerPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _customerType_decorators = [(0, graphql_1.Field)(function () { return client_1.CustomerType; })];
        _source_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingSource; })];
        _venue_decorators = [(0, graphql_1.Field)(function () { return AdminBookingVenueStub; })];
        _court_decorators = [(0, graphql_1.Field)(function () { return AdminBookingCourtStub; })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        _endAt_decorators = [(0, graphql_1.Field)()];
        _durationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _subtotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _serviceFee_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; })];
        _cancellationReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _cancelledBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _cancelledAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _completedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _adminNotes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _payment_decorators = [(0, graphql_1.Field)(function () { return AdminBookingPayment; }, { nullable: true })];
        _statusEvents_decorators = [(0, graphql_1.Field)(function () { return [AdminBookingStatusEvent]; })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } }, metadata: _metadata }, _customerPhone_initializers, _customerPhone_extraInitializers);
        __esDecorate(null, null, _customerType_decorators, { kind: "field", name: "customerType", static: false, private: false, access: { has: function (obj) { return "customerType" in obj; }, get: function (obj) { return obj.customerType; }, set: function (obj, value) { obj.customerType = value; } }, metadata: _metadata }, _customerType_initializers, _customerType_extraInitializers);
        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: function (obj) { return "source" in obj; }, get: function (obj) { return obj.source; }, set: function (obj, value) { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
        __esDecorate(null, null, _venue_decorators, { kind: "field", name: "venue", static: false, private: false, access: { has: function (obj) { return "venue" in obj; }, get: function (obj) { return obj.venue; }, set: function (obj, value) { obj.venue = value; } }, metadata: _metadata }, _venue_initializers, _venue_extraInitializers);
        __esDecorate(null, null, _court_decorators, { kind: "field", name: "court", static: false, private: false, access: { has: function (obj) { return "court" in obj; }, get: function (obj) { return obj.court; }, set: function (obj, value) { obj.court = value; } }, metadata: _metadata }, _court_initializers, _court_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _endAt_decorators, { kind: "field", name: "endAt", static: false, private: false, access: { has: function (obj) { return "endAt" in obj; }, get: function (obj) { return obj.endAt; }, set: function (obj, value) { obj.endAt = value; } }, metadata: _metadata }, _endAt_initializers, _endAt_extraInitializers);
        __esDecorate(null, null, _durationMinutes_decorators, { kind: "field", name: "durationMinutes", static: false, private: false, access: { has: function (obj) { return "durationMinutes" in obj; }, get: function (obj) { return obj.durationMinutes; }, set: function (obj, value) { obj.durationMinutes = value; } }, metadata: _metadata }, _durationMinutes_initializers, _durationMinutes_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _subtotal_decorators, { kind: "field", name: "subtotal", static: false, private: false, access: { has: function (obj) { return "subtotal" in obj; }, get: function (obj) { return obj.subtotal; }, set: function (obj, value) { obj.subtotal = value; } }, metadata: _metadata }, _subtotal_initializers, _subtotal_extraInitializers);
        __esDecorate(null, null, _serviceFee_decorators, { kind: "field", name: "serviceFee", static: false, private: false, access: { has: function (obj) { return "serviceFee" in obj; }, get: function (obj) { return obj.serviceFee; }, set: function (obj, value) { obj.serviceFee = value; } }, metadata: _metadata }, _serviceFee_initializers, _serviceFee_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _cancellationReason_decorators, { kind: "field", name: "cancellationReason", static: false, private: false, access: { has: function (obj) { return "cancellationReason" in obj; }, get: function (obj) { return obj.cancellationReason; }, set: function (obj, value) { obj.cancellationReason = value; } }, metadata: _metadata }, _cancellationReason_initializers, _cancellationReason_extraInitializers);
        __esDecorate(null, null, _cancelledBy_decorators, { kind: "field", name: "cancelledBy", static: false, private: false, access: { has: function (obj) { return "cancelledBy" in obj; }, get: function (obj) { return obj.cancelledBy; }, set: function (obj, value) { obj.cancelledBy = value; } }, metadata: _metadata }, _cancelledBy_initializers, _cancelledBy_extraInitializers);
        __esDecorate(null, null, _cancelledAt_decorators, { kind: "field", name: "cancelledAt", static: false, private: false, access: { has: function (obj) { return "cancelledAt" in obj; }, get: function (obj) { return obj.cancelledAt; }, set: function (obj, value) { obj.cancelledAt = value; } }, metadata: _metadata }, _cancelledAt_initializers, _cancelledAt_extraInitializers);
        __esDecorate(null, null, _completedAt_decorators, { kind: "field", name: "completedAt", static: false, private: false, access: { has: function (obj) { return "completedAt" in obj; }, get: function (obj) { return obj.completedAt; }, set: function (obj, value) { obj.completedAt = value; } }, metadata: _metadata }, _completedAt_initializers, _completedAt_extraInitializers);
        __esDecorate(null, null, _adminNotes_decorators, { kind: "field", name: "adminNotes", static: false, private: false, access: { has: function (obj) { return "adminNotes" in obj; }, get: function (obj) { return obj.adminNotes; }, set: function (obj, value) { obj.adminNotes = value; } }, metadata: _metadata }, _adminNotes_initializers, _adminNotes_extraInitializers);
        __esDecorate(null, null, _payment_decorators, { kind: "field", name: "payment", static: false, private: false, access: { has: function (obj) { return "payment" in obj; }, get: function (obj) { return obj.payment; }, set: function (obj, value) { obj.payment = value; } }, metadata: _metadata }, _payment_initializers, _payment_extraInitializers);
        __esDecorate(null, null, _statusEvents_decorators, { kind: "field", name: "statusEvents", static: false, private: false, access: { has: function (obj) { return "statusEvents" in obj; }, get: function (obj) { return obj.statusEvents; }, set: function (obj, value) { obj.statusEvents = value; } }, metadata: _metadata }, _statusEvents_initializers, _statusEvents_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBooking = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBooking = _classThis;
}();
exports.AdminBooking = AdminBooking;
function decimalToNumber(d) {
    if (d === null || d === undefined)
        return 0;
    return typeof d === 'number' ? d : Number(d.toString());
}
function mapPaymentToAdmin(p) {
    var _a, _b, _c;
    return {
        id: p.id,
        provider: p.provider,
        providerTxnId: (_a = p.providerTxnId) !== null && _a !== void 0 ? _a : undefined,
        amount: decimalToNumber(p.amount),
        currency: p.currency,
        status: p.status,
        failureReason: (_b = p.failureReason) !== null && _b !== void 0 ? _b : undefined,
        paidAt: (_c = p.paidAt) !== null && _c !== void 0 ? _c : undefined,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
    };
}
function mapStatusEventToAdmin(e) {
    var _a, _b;
    return {
        id: e.id,
        fromStatus: (_a = e.fromStatus) !== null && _a !== void 0 ? _a : undefined,
        toStatus: e.toStatus,
        actor: e.actor ? (0, admin_user_model_1.mapPrismaUserToAdmin)(e.actor) : undefined,
        note: (_b = e.note) !== null && _b !== void 0 ? _b : undefined,
        createdAt: e.createdAt,
    };
}
function mapBookingToAdmin(b) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        id: b.id,
        user: b.user ? (0, admin_user_model_1.mapPrismaUserToAdmin)(b.user) : undefined,
        customerName: (_a = b.customerName) !== null && _a !== void 0 ? _a : undefined,
        customerPhone: (_b = b.customerPhone) !== null && _b !== void 0 ? _b : undefined,
        customerType: b.customerType,
        source: b.source,
        venue: { id: b.venue.id, name: b.venue.name, city: (_c = b.venue.city) !== null && _c !== void 0 ? _c : undefined },
        court: {
            id: b.court.id,
            name: b.court.name,
            sport: (0, sport_stub_model_1.mapSportStub)(b.court.sport),
            pricePerHour: decimalToNumber(b.court.pricePerHour),
        },
        startAt: b.startAt,
        endAt: b.endAt,
        durationMinutes: b.durationMinutes,
        pricePerHour: decimalToNumber(b.pricePerHour),
        subtotal: decimalToNumber(b.subtotal),
        serviceFee: decimalToNumber(b.serviceFee),
        total: decimalToNumber(b.total),
        status: b.status,
        cancellationReason: (_d = b.cancellationReason) !== null && _d !== void 0 ? _d : undefined,
        cancelledBy: b.cancelledBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(b.cancelledBy) : undefined,
        cancelledAt: (_e = b.cancelledAt) !== null && _e !== void 0 ? _e : undefined,
        completedAt: (_f = b.completedAt) !== null && _f !== void 0 ? _f : undefined,
        adminNotes: (_g = b.adminNotes) !== null && _g !== void 0 ? _g : undefined,
        payment: b.payment ? mapPaymentToAdmin(b.payment) : undefined,
        statusEvents: b.statusEvents.map(mapStatusEventToAdmin),
        createdAt: b.createdAt,
        updatedAt: b.updatedAt,
    };
}
