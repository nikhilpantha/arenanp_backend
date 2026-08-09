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
exports.BookingModel = exports.BookingExtraModel = exports.BookingStatusEventModel = exports.BookingActorModel = void 0;
exports.mapBookingToGraphql = mapBookingToGraphql;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../common/enums");
var sport_stub_model_1 = require("../../admin/sports/dto/sport-stub.model");
var BookingActorModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: "Who did something to a booking. Names come from the venue's own staff, so a removed employee still reads as themselves — the User row survives, only their seat goes.",
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var BookingActorModel = _classThis = /** @class */ (function () {
        function BookingActorModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            __runInitializers(this, _name_extraInitializers);
        }
        return BookingActorModel_1;
    }());
    __setFunctionName(_classThis, "BookingActorModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingActorModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingActorModel = _classThis;
}();
exports.BookingActorModel = BookingActorModel;
var BookingStatusEventModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'One recorded change of state, and who made it.' })];
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
    var BookingStatusEventModel = _classThis = /** @class */ (function () {
        function BookingStatusEventModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.fromStatus = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fromStatus_initializers, void 0));
            this.toStatus = (__runInitializers(this, _fromStatus_extraInitializers), __runInitializers(this, _toStatus_initializers, void 0));
            this.actor = (__runInitializers(this, _toStatus_extraInitializers), __runInitializers(this, _actor_initializers, void 0));
            this.note = (__runInitializers(this, _actor_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            this.createdAt = (__runInitializers(this, _note_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return BookingStatusEventModel_1;
    }());
    __setFunctionName(_classThis, "BookingStatusEventModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fromStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; }, { nullable: true })];
        _toStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; })];
        _actor_decorators = [(0, graphql_1.Field)(function () { return BookingActorModel; }, { nullable: true })];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _fromStatus_decorators, { kind: "field", name: "fromStatus", static: false, private: false, access: { has: function (obj) { return "fromStatus" in obj; }, get: function (obj) { return obj.fromStatus; }, set: function (obj, value) { obj.fromStatus = value; } }, metadata: _metadata }, _fromStatus_initializers, _fromStatus_extraInitializers);
        __esDecorate(null, null, _toStatus_decorators, { kind: "field", name: "toStatus", static: false, private: false, access: { has: function (obj) { return "toStatus" in obj; }, get: function (obj) { return obj.toStatus; }, set: function (obj, value) { obj.toStatus = value; } }, metadata: _metadata }, _toStatus_initializers, _toStatus_extraInitializers);
        __esDecorate(null, null, _actor_decorators, { kind: "field", name: "actor", static: false, private: false, access: { has: function (obj) { return "actor" in obj; }, get: function (obj) { return obj.actor; }, set: function (obj, value) { obj.actor = value; } }, metadata: _metadata }, _actor_initializers, _actor_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingStatusEventModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingStatusEventModel = _classThis;
}();
exports.BookingStatusEventModel = BookingStatusEventModel;
var BookingExtraModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A single add-on service charged on a booking.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var BookingExtraModel = _classThis = /** @class */ (function () {
        function BookingExtraModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.price = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            __runInitializers(this, _price_extraInitializers);
        }
        return BookingExtraModel_1;
    }());
    __setFunctionName(_classThis, "BookingExtraModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingExtraModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingExtraModel = _classThis;
}();
exports.BookingExtraModel = BookingExtraModel;
var BookingModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A court booking as managed from the venue panel.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
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
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _endAt_decorators;
    var _endAt_initializers = [];
    var _endAt_extraInitializers = [];
    var _durationMinutes_decorators;
    var _durationMinutes_initializers = [];
    var _durationMinutes_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _subtotal_decorators;
    var _subtotal_initializers = [];
    var _subtotal_extraInitializers = [];
    var _discountAmount_decorators;
    var _discountAmount_initializers = [];
    var _discountAmount_extraInitializers = [];
    var _extras_decorators;
    var _extras_initializers = [];
    var _extras_extraInitializers = [];
    var _extrasTotal_decorators;
    var _extrasTotal_initializers = [];
    var _extrasTotal_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _freeGame_decorators;
    var _freeGame_initializers = [];
    var _freeGame_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _cancelledBy_decorators;
    var _cancelledBy_initializers = [];
    var _cancelledBy_extraInitializers = [];
    var _statusEvents_decorators;
    var _statusEvents_initializers = [];
    var _statusEvents_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var BookingModel = _classThis = /** @class */ (function () {
        function BookingModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.courtId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.courtName = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.sport = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            /// The venue Customer this booking belongs to (null for legacy/phoneless-walk-in rows).
            /// Lets a booking card deep-link to the unified customer profile.
            this.customerId = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
            this.customerName = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.customerPhone = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerPhone_initializers, void 0));
            this.customerType = (__runInitializers(this, _customerPhone_extraInitializers), __runInitializers(this, _customerType_initializers, void 0));
            this.source = (__runInitializers(this, _customerType_extraInitializers), __runInitializers(this, _source_initializers, void 0));
            this.startAt = (__runInitializers(this, _source_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.endAt = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _endAt_initializers, void 0));
            this.durationMinutes = (__runInitializers(this, _endAt_extraInitializers), __runInitializers(this, _durationMinutes_initializers, void 0));
            this.status = (__runInitializers(this, _durationMinutes_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.pricePerHour = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            this.subtotal = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _subtotal_initializers, void 0));
            this.discountAmount = (__runInitializers(this, _subtotal_extraInitializers), __runInitializers(this, _discountAmount_initializers, void 0));
            this.extras = (__runInitializers(this, _discountAmount_extraInitializers), __runInitializers(this, _extras_initializers, void 0));
            this.extrasTotal = (__runInitializers(this, _extras_extraInitializers), __runInitializers(this, _extrasTotal_initializers, void 0));
            this.total = (__runInitializers(this, _extrasTotal_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.freeGame = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _freeGame_initializers, void 0));
            this.paymentStatus = (__runInitializers(this, _freeGame_extraInitializers), __runInitializers(this, _paymentStatus_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.notes = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            /**
             * Attribution. Null on anything a player booked themselves, and on rows from
             * before staff accounts existed — the column has always been nullable.
             */
            this.createdBy = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.cancelledBy = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _cancelledBy_initializers, void 0));
            this.statusEvents = (__runInitializers(this, _cancelledBy_extraInitializers), __runInitializers(this, _statusEvents_initializers, void 0));
            this.createdAt = (__runInitializers(this, _statusEvents_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return BookingModel_1;
    }());
    __setFunctionName(_classThis, "BookingModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _courtName_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true })];
        _customerName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _customerPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _customerType_decorators = [(0, graphql_1.Field)(function () { return client_1.CustomerType; })];
        _source_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingSource; })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        _endAt_decorators = [(0, graphql_1.Field)()];
        _durationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; })];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _subtotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _discountAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _extras_decorators = [(0, graphql_1.Field)(function () { return [BookingExtraModel]; })];
        _extrasTotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _freeGame_decorators = [(0, graphql_1.Field)()];
        _paymentStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingPaymentStatus; })];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true })];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdBy_decorators = [(0, graphql_1.Field)(function () { return BookingActorModel; }, { nullable: true, description: 'Who created this booking.' })];
        _cancelledBy_decorators = [(0, graphql_1.Field)(function () { return BookingActorModel; }, { nullable: true })];
        _statusEvents_decorators = [(0, graphql_1.Field)(function () { return [BookingStatusEventModel]; }, {
                description: 'Every state change, oldest first, with whoever made it.',
            })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } }, metadata: _metadata }, _customerPhone_initializers, _customerPhone_extraInitializers);
        __esDecorate(null, null, _customerType_decorators, { kind: "field", name: "customerType", static: false, private: false, access: { has: function (obj) { return "customerType" in obj; }, get: function (obj) { return obj.customerType; }, set: function (obj, value) { obj.customerType = value; } }, metadata: _metadata }, _customerType_initializers, _customerType_extraInitializers);
        __esDecorate(null, null, _source_decorators, { kind: "field", name: "source", static: false, private: false, access: { has: function (obj) { return "source" in obj; }, get: function (obj) { return obj.source; }, set: function (obj, value) { obj.source = value; } }, metadata: _metadata }, _source_initializers, _source_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _endAt_decorators, { kind: "field", name: "endAt", static: false, private: false, access: { has: function (obj) { return "endAt" in obj; }, get: function (obj) { return obj.endAt; }, set: function (obj, value) { obj.endAt = value; } }, metadata: _metadata }, _endAt_initializers, _endAt_extraInitializers);
        __esDecorate(null, null, _durationMinutes_decorators, { kind: "field", name: "durationMinutes", static: false, private: false, access: { has: function (obj) { return "durationMinutes" in obj; }, get: function (obj) { return obj.durationMinutes; }, set: function (obj, value) { obj.durationMinutes = value; } }, metadata: _metadata }, _durationMinutes_initializers, _durationMinutes_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _subtotal_decorators, { kind: "field", name: "subtotal", static: false, private: false, access: { has: function (obj) { return "subtotal" in obj; }, get: function (obj) { return obj.subtotal; }, set: function (obj, value) { obj.subtotal = value; } }, metadata: _metadata }, _subtotal_initializers, _subtotal_extraInitializers);
        __esDecorate(null, null, _discountAmount_decorators, { kind: "field", name: "discountAmount", static: false, private: false, access: { has: function (obj) { return "discountAmount" in obj; }, get: function (obj) { return obj.discountAmount; }, set: function (obj, value) { obj.discountAmount = value; } }, metadata: _metadata }, _discountAmount_initializers, _discountAmount_extraInitializers);
        __esDecorate(null, null, _extras_decorators, { kind: "field", name: "extras", static: false, private: false, access: { has: function (obj) { return "extras" in obj; }, get: function (obj) { return obj.extras; }, set: function (obj, value) { obj.extras = value; } }, metadata: _metadata }, _extras_initializers, _extras_extraInitializers);
        __esDecorate(null, null, _extrasTotal_decorators, { kind: "field", name: "extrasTotal", static: false, private: false, access: { has: function (obj) { return "extrasTotal" in obj; }, get: function (obj) { return obj.extrasTotal; }, set: function (obj, value) { obj.extrasTotal = value; } }, metadata: _metadata }, _extrasTotal_initializers, _extrasTotal_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _freeGame_decorators, { kind: "field", name: "freeGame", static: false, private: false, access: { has: function (obj) { return "freeGame" in obj; }, get: function (obj) { return obj.freeGame; }, set: function (obj, value) { obj.freeGame = value; } }, metadata: _metadata }, _freeGame_initializers, _freeGame_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _cancelledBy_decorators, { kind: "field", name: "cancelledBy", static: false, private: false, access: { has: function (obj) { return "cancelledBy" in obj; }, get: function (obj) { return obj.cancelledBy; }, set: function (obj, value) { obj.cancelledBy = value; } }, metadata: _metadata }, _cancelledBy_initializers, _cancelledBy_extraInitializers);
        __esDecorate(null, null, _statusEvents_decorators, { kind: "field", name: "statusEvents", static: false, private: false, access: { has: function (obj) { return "statusEvents" in obj; }, get: function (obj) { return obj.statusEvents; }, set: function (obj, value) { obj.statusEvents = value; } }, metadata: _metadata }, _statusEvents_initializers, _statusEvents_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingModel = _classThis;
}();
exports.BookingModel = BookingModel;
function mapActor(actor) {
    var _a;
    return actor ? { id: actor.id, name: (_a = actor.fullName) !== null && _a !== void 0 ? _a : undefined } : undefined;
}
function num(value) {
    return Number(value.toString());
}
function mapBookingToGraphql(b) {
    var _a, _b, _c, _d, _e, _f, _g;
    var extras = ((_a = b.extras) !== null && _a !== void 0 ? _a : []).map(function (e) { return ({ id: e.id, name: e.name, price: num(e.price) }); });
    var extrasTotal = extras.reduce(function (sum, e) { return sum + e.price; }, 0);
    return {
        id: b.id,
        courtId: b.courtId,
        courtName: b.court.name,
        sport: (0, sport_stub_model_1.mapSportStub)(b.court.sport),
        customerId: (_b = b.customerId) !== null && _b !== void 0 ? _b : undefined,
        customerName: (_c = b.customerName) !== null && _c !== void 0 ? _c : undefined,
        customerPhone: (_d = b.customerPhone) !== null && _d !== void 0 ? _d : undefined,
        customerType: b.customerType,
        source: b.source,
        startAt: b.startAt,
        endAt: b.endAt,
        durationMinutes: b.durationMinutes,
        status: b.status,
        pricePerHour: num(b.pricePerHour),
        subtotal: num(b.subtotal),
        discountAmount: num(b.discountAmount),
        extras: extras,
        extrasTotal: extrasTotal,
        total: num(b.total),
        freeGame: b.freeGame,
        paymentStatus: b.paymentStatus,
        amountPaid: num(b.amountPaid),
        paymentMethod: (_e = b.paymentMethod) !== null && _e !== void 0 ? _e : undefined,
        notes: (_f = b.adminNotes) !== null && _f !== void 0 ? _f : undefined,
        createdBy: mapActor(b.createdBy),
        cancelledBy: mapActor(b.cancelledBy),
        statusEvents: ((_g = b.statusEvents) !== null && _g !== void 0 ? _g : []).map(function (e) {
            var _a, _b;
            return ({
                id: e.id,
                fromStatus: (_a = e.fromStatus) !== null && _a !== void 0 ? _a : undefined,
                toStatus: e.toStatus,
                actor: mapActor(e.actor),
                note: (_b = e.note) !== null && _b !== void 0 ? _b : undefined,
                createdAt: e.createdAt,
            });
        }),
        createdAt: b.createdAt,
    };
}
