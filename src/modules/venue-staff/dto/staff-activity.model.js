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
exports.StaffActivity = void 0;
var graphql_1 = require("@nestjs/graphql");
/**
 * What one person actually did at the venue.
 *
 * Every figure here is derived from columns that have been written since the
 * day bookings shipped — `Booking.createdById`, `BookingStatusEvent.actorId`,
 * `BookingPayment.takenById`, `CashReconciliation.closedById`. None of them
 * had ever been read back, which is why "who cancelled the 7 PM booking?" was
 * unanswerable despite the answer sitting in the database.
 *
 * No new tables, and nothing retroactive is lost.
 */
var StaffActivity = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A staff member's activity over a period." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var _bookingsCreated_decorators;
    var _bookingsCreated_initializers = [];
    var _bookingsCreated_extraInitializers = [];
    var _bookingsCancelled_decorators;
    var _bookingsCancelled_initializers = [];
    var _bookingsCancelled_extraInitializers = [];
    var _noShowsMarked_decorators;
    var _noShowsMarked_initializers = [];
    var _noShowsMarked_extraInitializers = [];
    var _bookingsSettled_decorators;
    var _bookingsSettled_initializers = [];
    var _bookingsSettled_extraInitializers = [];
    var _paymentsTaken_decorators;
    var _paymentsTaken_initializers = [];
    var _paymentsTaken_extraInitializers = [];
    var _paymentCount_decorators;
    var _paymentCount_initializers = [];
    var _paymentCount_extraInitializers = [];
    var _discountsGiven_decorators;
    var _discountsGiven_initializers = [];
    var _discountsGiven_extraInitializers = [];
    var _cashDaysClosed_decorators;
    var _cashDaysClosed_initializers = [];
    var _cashDaysClosed_extraInitializers = [];
    var _lastActionAt_decorators;
    var _lastActionAt_initializers = [];
    var _lastActionAt_extraInitializers = [];
    var StaffActivity = _classThis = /** @class */ (function () {
        function StaffActivity_1() {
            this.membershipId = __runInitializers(this, _membershipId_initializers, void 0);
            this.fullName = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.from = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _from_initializers, void 0));
            this.to = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            this.bookingsCreated = (__runInitializers(this, _to_extraInitializers), __runInitializers(this, _bookingsCreated_initializers, void 0));
            this.bookingsCancelled = (__runInitializers(this, _bookingsCreated_extraInitializers), __runInitializers(this, _bookingsCancelled_initializers, void 0));
            this.noShowsMarked = (__runInitializers(this, _bookingsCancelled_extraInitializers), __runInitializers(this, _noShowsMarked_initializers, void 0));
            this.bookingsSettled = (__runInitializers(this, _noShowsMarked_extraInitializers), __runInitializers(this, _bookingsSettled_initializers, void 0));
            this.paymentsTaken = (__runInitializers(this, _bookingsSettled_extraInitializers), __runInitializers(this, _paymentsTaken_initializers, void 0));
            this.paymentCount = (__runInitializers(this, _paymentsTaken_extraInitializers), __runInitializers(this, _paymentCount_initializers, void 0));
            this.discountsGiven = (__runInitializers(this, _paymentCount_extraInitializers), __runInitializers(this, _discountsGiven_initializers, void 0));
            this.cashDaysClosed = (__runInitializers(this, _discountsGiven_extraInitializers), __runInitializers(this, _cashDaysClosed_initializers, void 0));
            this.lastActionAt = (__runInitializers(this, _cashDaysClosed_extraInitializers), __runInitializers(this, _lastActionAt_initializers, void 0));
            __runInitializers(this, _lastActionAt_extraInitializers);
        }
        return StaffActivity_1;
    }());
    __setFunctionName(_classThis, "StaffActivity");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _from_decorators = [(0, graphql_1.Field)({ description: 'Start of the window, "yyyy-mm-dd".' })];
        _to_decorators = [(0, graphql_1.Field)({ description: 'End of the window (exclusive), "yyyy-mm-dd".' })];
        _bookingsCreated_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Bookings they created.' })];
        _bookingsCancelled_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Bookings they cancelled.' })];
        _noShowsMarked_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Bookings they marked as no-shows.' })];
        _bookingsSettled_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Bookings they checked in or completed.' })];
        _paymentsTaken_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Money they took, across every payment they recorded.' })];
        _paymentCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _discountsGiven_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'Discounts given on bookings they created — the number an owner watches.',
            })];
        _cashDaysClosed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'End-of-day cash counts they closed.' })];
        _lastActionAt_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'The last thing they did here.' })];
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, null, _bookingsCreated_decorators, { kind: "field", name: "bookingsCreated", static: false, private: false, access: { has: function (obj) { return "bookingsCreated" in obj; }, get: function (obj) { return obj.bookingsCreated; }, set: function (obj, value) { obj.bookingsCreated = value; } }, metadata: _metadata }, _bookingsCreated_initializers, _bookingsCreated_extraInitializers);
        __esDecorate(null, null, _bookingsCancelled_decorators, { kind: "field", name: "bookingsCancelled", static: false, private: false, access: { has: function (obj) { return "bookingsCancelled" in obj; }, get: function (obj) { return obj.bookingsCancelled; }, set: function (obj, value) { obj.bookingsCancelled = value; } }, metadata: _metadata }, _bookingsCancelled_initializers, _bookingsCancelled_extraInitializers);
        __esDecorate(null, null, _noShowsMarked_decorators, { kind: "field", name: "noShowsMarked", static: false, private: false, access: { has: function (obj) { return "noShowsMarked" in obj; }, get: function (obj) { return obj.noShowsMarked; }, set: function (obj, value) { obj.noShowsMarked = value; } }, metadata: _metadata }, _noShowsMarked_initializers, _noShowsMarked_extraInitializers);
        __esDecorate(null, null, _bookingsSettled_decorators, { kind: "field", name: "bookingsSettled", static: false, private: false, access: { has: function (obj) { return "bookingsSettled" in obj; }, get: function (obj) { return obj.bookingsSettled; }, set: function (obj, value) { obj.bookingsSettled = value; } }, metadata: _metadata }, _bookingsSettled_initializers, _bookingsSettled_extraInitializers);
        __esDecorate(null, null, _paymentsTaken_decorators, { kind: "field", name: "paymentsTaken", static: false, private: false, access: { has: function (obj) { return "paymentsTaken" in obj; }, get: function (obj) { return obj.paymentsTaken; }, set: function (obj, value) { obj.paymentsTaken = value; } }, metadata: _metadata }, _paymentsTaken_initializers, _paymentsTaken_extraInitializers);
        __esDecorate(null, null, _paymentCount_decorators, { kind: "field", name: "paymentCount", static: false, private: false, access: { has: function (obj) { return "paymentCount" in obj; }, get: function (obj) { return obj.paymentCount; }, set: function (obj, value) { obj.paymentCount = value; } }, metadata: _metadata }, _paymentCount_initializers, _paymentCount_extraInitializers);
        __esDecorate(null, null, _discountsGiven_decorators, { kind: "field", name: "discountsGiven", static: false, private: false, access: { has: function (obj) { return "discountsGiven" in obj; }, get: function (obj) { return obj.discountsGiven; }, set: function (obj, value) { obj.discountsGiven = value; } }, metadata: _metadata }, _discountsGiven_initializers, _discountsGiven_extraInitializers);
        __esDecorate(null, null, _cashDaysClosed_decorators, { kind: "field", name: "cashDaysClosed", static: false, private: false, access: { has: function (obj) { return "cashDaysClosed" in obj; }, get: function (obj) { return obj.cashDaysClosed; }, set: function (obj, value) { obj.cashDaysClosed = value; } }, metadata: _metadata }, _cashDaysClosed_initializers, _cashDaysClosed_extraInitializers);
        __esDecorate(null, null, _lastActionAt_decorators, { kind: "field", name: "lastActionAt", static: false, private: false, access: { has: function (obj) { return "lastActionAt" in obj; }, get: function (obj) { return obj.lastActionAt; }, set: function (obj, value) { obj.lastActionAt = value; } }, metadata: _metadata }, _lastActionAt_initializers, _lastActionAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffActivity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffActivity = _classThis;
}();
exports.StaffActivity = StaffActivity;
