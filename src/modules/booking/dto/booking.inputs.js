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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTION_TO_STATUS = exports.RecordBookingPaymentInput = exports.SetBookingStatusInput = exports.BookingStatusAction = exports.CompleteVenueBookingInput = exports.BookingExtraInput = exports.UpdateVenueBookingInput = exports.CreateVenueBookingInput = exports.ListVenueBookingsInput = exports.BookingScope = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
require("../../../common/enums");
/** Time window for the bookings list. */
var BookingScope;
(function (BookingScope) {
    BookingScope["TODAY"] = "TODAY";
    BookingScope["UPCOMING"] = "UPCOMING";
})(BookingScope || (exports.BookingScope = BookingScope = {}));
(0, graphql_1.registerEnumType)(BookingScope, {
    name: 'BookingScope',
    description: 'Bookings time window: TODAY or UPCOMING.',
});
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
var ListVenueBookingsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _scope_decorators;
    var _scope_initializers = [];
    var _scope_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _dateFrom_decorators;
    var _dateFrom_initializers = [];
    var _dateFrom_extraInitializers = [];
    var _dateTo_decorators;
    var _dateTo_initializers = [];
    var _dateTo_extraInitializers = [];
    var _sportSlug_decorators;
    var _sportSlug_initializers = [];
    var _sportSlug_extraInitializers = [];
    var ListVenueBookingsInput = _classThis = /** @class */ (function () {
        function ListVenueBookingsInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.scope = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _scope_initializers, void 0));
            this.date = (__runInitializers(this, _scope_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.dateFrom = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _dateFrom_initializers, void 0));
            this.dateTo = (__runInitializers(this, _dateFrom_extraInitializers), __runInitializers(this, _dateTo_initializers, void 0));
            this.sportSlug = (__runInitializers(this, _dateTo_extraInitializers), __runInitializers(this, _sportSlug_initializers, void 0));
            __runInitializers(this, _sportSlug_extraInitializers);
        }
        return ListVenueBookingsInput_1;
    }());
    __setFunctionName(_classThis, "ListVenueBookingsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _scope_decorators = [(0, graphql_1.Field)(function () { return BookingScope; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(BookingScope)];
        _date_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Specific day (yyyy-mm-dd). Overrides scope when set.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(DATE_RE, { message: 'date must be yyyy-mm-dd' })];
        _dateFrom_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Range start (yyyy-mm-dd, inclusive). With dateTo, overrides scope; ignored when date is set.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(DATE_RE, { message: 'dateFrom must be yyyy-mm-dd' })];
        _dateTo_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Range end (yyyy-mm-dd, inclusive). Pair with dateFrom.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(DATE_RE, { message: 'dateTo must be yyyy-mm-dd' })];
        _sportSlug_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Filter by sport slug.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _scope_decorators, { kind: "field", name: "scope", static: false, private: false, access: { has: function (obj) { return "scope" in obj; }, get: function (obj) { return obj.scope; }, set: function (obj, value) { obj.scope = value; } }, metadata: _metadata }, _scope_initializers, _scope_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _dateFrom_decorators, { kind: "field", name: "dateFrom", static: false, private: false, access: { has: function (obj) { return "dateFrom" in obj; }, get: function (obj) { return obj.dateFrom; }, set: function (obj, value) { obj.dateFrom = value; } }, metadata: _metadata }, _dateFrom_initializers, _dateFrom_extraInitializers);
        __esDecorate(null, null, _dateTo_decorators, { kind: "field", name: "dateTo", static: false, private: false, access: { has: function (obj) { return "dateTo" in obj; }, get: function (obj) { return obj.dateTo; }, set: function (obj, value) { obj.dateTo = value; } }, metadata: _metadata }, _dateTo_initializers, _dateTo_extraInitializers);
        __esDecorate(null, null, _sportSlug_decorators, { kind: "field", name: "sportSlug", static: false, private: false, access: { has: function (obj) { return "sportSlug" in obj; }, get: function (obj) { return obj.sportSlug; }, set: function (obj, value) { obj.sportSlug = value; } }, metadata: _metadata }, _sportSlug_initializers, _sportSlug_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListVenueBookingsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListVenueBookingsInput = _classThis;
}();
exports.ListVenueBookingsInput = ListVenueBookingsInput;
var CreateVenueBookingInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerName_extraInitializers = [];
    var _customerPhone_decorators;
    var _customerPhone_initializers = [];
    var _customerPhone_extraInitializers = [];
    var _customerType_decorators;
    var _customerType_initializers = [];
    var _customerType_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _durationMinutes_decorators;
    var _durationMinutes_initializers = [];
    var _durationMinutes_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var _discountAmount_decorators;
    var _discountAmount_initializers = [];
    var _discountAmount_extraInitializers = [];
    var _freeGame_decorators;
    var _freeGame_initializers = [];
    var _freeGame_extraInitializers = [];
    var _redeemFreeGame_decorators;
    var _redeemFreeGame_initializers = [];
    var _redeemFreeGame_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var CreateVenueBookingInput = _classThis = /** @class */ (function () {
        function CreateVenueBookingInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.courtId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.customerName = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.customerPhone = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerPhone_initializers, void 0));
            this.customerType = (__runInitializers(this, _customerPhone_extraInitializers), __runInitializers(this, _customerType_initializers, client_1.CustomerType.INDIVIDUAL));
            this.customerId = (__runInitializers(this, _customerType_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
            this.startAt = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.durationMinutes = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _durationMinutes_initializers, 60));
            this.paymentStatus = (__runInitializers(this, _durationMinutes_extraInitializers), __runInitializers(this, _paymentStatus_initializers, client_1.BookingPaymentStatus.PENDING));
            this.amountPaid = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.discountAmount = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _discountAmount_initializers, void 0));
            // Must carry a class-validator decorator — the global ValidationPipe runs with
            // forbidNonWhitelisted, which rejects any property lacking one ("property freeGame
            // should not exist"). GraphQL's defaultValue means it's always present in the args.
            this.freeGame = (__runInitializers(this, _discountAmount_extraInitializers), __runInitializers(this, _freeGame_initializers, false));
            // Redeem the subject's earned loyalty free game (validated server-side against
            // their completed-game tally). Distinct from `freeGame`, which is a manual comp.
            this.redeemFreeGame = (__runInitializers(this, _freeGame_extraInitializers), __runInitializers(this, _redeemFreeGame_initializers, false));
            this.notes = (__runInitializers(this, _redeemFreeGame_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            __runInitializers(this, _notes_extraInitializers);
        }
        return CreateVenueBookingInput_1;
    }());
    __setFunctionName(_classThis, "CreateVenueBookingInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _customerName_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _customerPhone_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
        _customerType_decorators = [(0, graphql_1.Field)(function () { return client_1.CustomerType; }, { defaultValue: client_1.CustomerType.INDIVIDUAL }), (0, class_validator_1.IsEnum)(client_1.CustomerType)];
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true, description: 'The venue customer this booking is for.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _startAt_decorators = [(0, graphql_1.Field)({ description: 'Start time (ISO 8601).' }), (0, class_validator_1.IsString)()];
        _durationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { defaultValue: 60 }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(15)];
        _paymentStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingPaymentStatus; }, { defaultValue: client_1.BookingPaymentStatus.PENDING }), (0, class_validator_1.IsEnum)(client_1.BookingPaymentStatus)];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        _discountAmount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _freeGame_decorators = [(0, graphql_1.Field)({ defaultValue: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _redeemFreeGame_decorators = [(0, graphql_1.Field)({ defaultValue: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } }, metadata: _metadata }, _customerPhone_initializers, _customerPhone_extraInitializers);
        __esDecorate(null, null, _customerType_decorators, { kind: "field", name: "customerType", static: false, private: false, access: { has: function (obj) { return "customerType" in obj; }, get: function (obj) { return obj.customerType; }, set: function (obj, value) { obj.customerType = value; } }, metadata: _metadata }, _customerType_initializers, _customerType_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _durationMinutes_decorators, { kind: "field", name: "durationMinutes", static: false, private: false, access: { has: function (obj) { return "durationMinutes" in obj; }, get: function (obj) { return obj.durationMinutes; }, set: function (obj, value) { obj.durationMinutes = value; } }, metadata: _metadata }, _durationMinutes_initializers, _durationMinutes_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _discountAmount_decorators, { kind: "field", name: "discountAmount", static: false, private: false, access: { has: function (obj) { return "discountAmount" in obj; }, get: function (obj) { return obj.discountAmount; }, set: function (obj, value) { obj.discountAmount = value; } }, metadata: _metadata }, _discountAmount_initializers, _discountAmount_extraInitializers);
        __esDecorate(null, null, _freeGame_decorators, { kind: "field", name: "freeGame", static: false, private: false, access: { has: function (obj) { return "freeGame" in obj; }, get: function (obj) { return obj.freeGame; }, set: function (obj, value) { obj.freeGame = value; } }, metadata: _metadata }, _freeGame_initializers, _freeGame_extraInitializers);
        __esDecorate(null, null, _redeemFreeGame_decorators, { kind: "field", name: "redeemFreeGame", static: false, private: false, access: { has: function (obj) { return "redeemFreeGame" in obj; }, get: function (obj) { return obj.redeemFreeGame; }, set: function (obj, value) { obj.redeemFreeGame = value; } }, metadata: _metadata }, _redeemFreeGame_initializers, _redeemFreeGame_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateVenueBookingInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateVenueBookingInput = _classThis;
}();
exports.CreateVenueBookingInput = CreateVenueBookingInput;
/** Edit a pending/upcoming booking: reschedule (court/time/duration) and/or the customer. */
var UpdateVenueBookingInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _durationMinutes_decorators;
    var _durationMinutes_initializers = [];
    var _durationMinutes_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerName_extraInitializers = [];
    var _customerPhone_decorators;
    var _customerPhone_initializers = [];
    var _customerPhone_extraInitializers = [];
    var UpdateVenueBookingInput = _classThis = /** @class */ (function () {
        function UpdateVenueBookingInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.bookingId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _bookingId_initializers, void 0));
            this.courtId = (__runInitializers(this, _bookingId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.startAt = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.durationMinutes = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _durationMinutes_initializers, void 0));
            this.customerId = (__runInitializers(this, _durationMinutes_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
            this.customerName = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.customerPhone = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerPhone_initializers, void 0));
            __runInitializers(this, _customerPhone_extraInitializers);
        }
        return UpdateVenueBookingInput_1;
    }());
    __setFunctionName(_classThis, "UpdateVenueBookingInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _bookingId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _startAt_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'New start time (ISO 8601).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _durationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(15)];
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _customerName_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _customerPhone_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _durationMinutes_decorators, { kind: "field", name: "durationMinutes", static: false, private: false, access: { has: function (obj) { return "durationMinutes" in obj; }, get: function (obj) { return obj.durationMinutes; }, set: function (obj, value) { obj.durationMinutes = value; } }, metadata: _metadata }, _durationMinutes_initializers, _durationMinutes_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } }, metadata: _metadata }, _customerPhone_initializers, _customerPhone_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateVenueBookingInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateVenueBookingInput = _classThis;
}();
exports.UpdateVenueBookingInput = UpdateVenueBookingInput;
/** One add-on line item charged when completing a booking. */
var BookingExtraInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var BookingExtraInput = _classThis = /** @class */ (function () {
        function BookingExtraInput_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.price = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _price_initializers, 0));
            __runInitializers(this, _price_extraInitializers);
        }
        return BookingExtraInput_1;
    }());
    __setFunctionName(_classThis, "BookingExtraInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1), (0, class_validator_1.MaxLength)(120)];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { defaultValue: 0 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingExtraInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingExtraInput = _classThis;
}();
exports.BookingExtraInput = BookingExtraInput;
/** Complete a booking: attach the extras the customer used and settle payment. */
var CompleteVenueBookingInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    var _extras_decorators;
    var _extras_initializers = [];
    var _extras_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var CompleteVenueBookingInput = _classThis = /** @class */ (function () {
        function CompleteVenueBookingInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.bookingId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _bookingId_initializers, void 0));
            this.extras = (__runInitializers(this, _bookingId_extraInitializers), __runInitializers(this, _extras_initializers, []));
            this.paymentStatus = (__runInitializers(this, _extras_extraInitializers), __runInitializers(this, _paymentStatus_initializers, client_1.BookingPaymentStatus.PAID));
            this.amountPaid = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            this.note = (__runInitializers(this, _paymentMethod_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            __runInitializers(this, _note_extraInitializers);
        }
        return CompleteVenueBookingInput_1;
    }());
    __setFunctionName(_classThis, "CompleteVenueBookingInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _bookingId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _extras_decorators = [(0, graphql_1.Field)(function () { return [BookingExtraInput]; }, { defaultValue: [] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayMaxSize)(50), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return BookingExtraInput; })];
        _paymentStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingPaymentStatus; }, { defaultValue: client_1.BookingPaymentStatus.PAID }), (0, class_validator_1.IsEnum)(client_1.BookingPaymentStatus)];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
        __esDecorate(null, null, _extras_decorators, { kind: "field", name: "extras", static: false, private: false, access: { has: function (obj) { return "extras" in obj; }, get: function (obj) { return obj.extras; }, set: function (obj, value) { obj.extras = value; } }, metadata: _metadata }, _extras_initializers, _extras_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CompleteVenueBookingInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CompleteVenueBookingInput = _classThis;
}();
exports.CompleteVenueBookingInput = CompleteVenueBookingInput;
/** Venue-side status transitions (the manage actions). */
var BookingStatusAction;
(function (BookingStatusAction) {
    BookingStatusAction["CHECKED_IN"] = "CHECKED_IN";
    BookingStatusAction["COMPLETED"] = "COMPLETED";
    BookingStatusAction["NO_SHOW"] = "NO_SHOW";
    BookingStatusAction["CANCELLED"] = "CANCELLED";
})(BookingStatusAction || (exports.BookingStatusAction = BookingStatusAction = {}));
(0, graphql_1.registerEnumType)(BookingStatusAction, {
    name: 'BookingStatusAction',
    description: 'Venue manage actions: CHECKED_IN, COMPLETED, NO_SHOW, CANCELLED.',
});
var SetBookingStatusInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var SetBookingStatusInput = _classThis = /** @class */ (function () {
        function SetBookingStatusInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.bookingId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _bookingId_initializers, void 0));
            this.status = (__runInitializers(this, _bookingId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.note = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            __runInitializers(this, _note_extraInitializers);
        }
        return SetBookingStatusInput_1;
    }());
    __setFunctionName(_classThis, "SetBookingStatusInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _bookingId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return BookingStatusAction; }), (0, class_validator_1.IsEnum)(BookingStatusAction)];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SetBookingStatusInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SetBookingStatusInput = _classThis;
}();
exports.SetBookingStatusInput = SetBookingStatusInput;
var RecordBookingPaymentInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _bookingId_decorators;
    var _bookingId_initializers = [];
    var _bookingId_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var RecordBookingPaymentInput = _classThis = /** @class */ (function () {
        function RecordBookingPaymentInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.bookingId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _bookingId_initializers, void 0));
            this.paymentStatus = (__runInitializers(this, _bookingId_extraInitializers), __runInitializers(this, _paymentStatus_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _amountPaid_initializers, 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            __runInitializers(this, _paymentMethod_extraInitializers);
        }
        return RecordBookingPaymentInput_1;
    }());
    __setFunctionName(_classThis, "RecordBookingPaymentInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _bookingId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _paymentStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingPaymentStatus; }), (0, class_validator_1.IsEnum)(client_1.BookingPaymentStatus)];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { defaultValue: 0 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _bookingId_decorators, { kind: "field", name: "bookingId", static: false, private: false, access: { has: function (obj) { return "bookingId" in obj; }, get: function (obj) { return obj.bookingId; }, set: function (obj, value) { obj.bookingId = value; } }, metadata: _metadata }, _bookingId_initializers, _bookingId_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RecordBookingPaymentInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RecordBookingPaymentInput = _classThis;
}();
exports.RecordBookingPaymentInput = RecordBookingPaymentInput;
/** The terminal/lifecycle BookingStatus a status action maps to. */
exports.ACTION_TO_STATUS = (_a = {},
    _a[BookingStatusAction.CHECKED_IN] = client_1.BookingStatus.CHECKED_IN,
    _a[BookingStatusAction.COMPLETED] = client_1.BookingStatus.COMPLETED,
    _a[BookingStatusAction.NO_SHOW] = client_1.BookingStatus.NO_SHOW,
    _a[BookingStatusAction.CANCELLED] = client_1.BookingStatus.CANCELLED,
    _a);
