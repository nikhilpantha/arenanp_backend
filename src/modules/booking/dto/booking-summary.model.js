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
exports.VenueBookingSummary = void 0;
var graphql_1 = require("@nestjs/graphql");
var VenueBookingSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "Top-of-screen overview numbers for a venue's bookings." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _bookingsToday_decorators;
    var _bookingsToday_initializers = [];
    var _bookingsToday_extraInitializers = [];
    var _revenueToday_decorators;
    var _revenueToday_initializers = [];
    var _revenueToday_extraInitializers = [];
    var _pendingPayments_decorators;
    var _pendingPayments_initializers = [];
    var _pendingPayments_extraInitializers = [];
    var VenueBookingSummary = _classThis = /** @class */ (function () {
        function VenueBookingSummary_1() {
            this.bookingsToday = __runInitializers(this, _bookingsToday_initializers, void 0);
            /**
             * Null for callers without `finance:read`. The whole query is gated on
             * `bookings:read`, which the front desk and ground staff hold — they need
             * the day's schedule, but the day's takings are the owner's business. A null
             * (rather than a zero) is what lets the console hide the tile instead of
             * showing a confident "Rs 0".
             */
            this.revenueToday = (__runInitializers(this, _bookingsToday_extraInitializers), __runInitializers(this, _revenueToday_initializers, void 0));
            this.pendingPayments = (__runInitializers(this, _revenueToday_extraInitializers), __runInitializers(this, _pendingPayments_initializers, void 0));
            __runInitializers(this, _pendingPayments_extraInitializers);
        }
        return VenueBookingSummary_1;
    }());
    __setFunctionName(_classThis, "VenueBookingSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _bookingsToday_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _revenueToday_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: "Money taken today. Null unless the caller holds 'finance:read'.",
            })];
        _pendingPayments_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Bookings today with money still owed (a count, not a sum).' })];
        __esDecorate(null, null, _bookingsToday_decorators, { kind: "field", name: "bookingsToday", static: false, private: false, access: { has: function (obj) { return "bookingsToday" in obj; }, get: function (obj) { return obj.bookingsToday; }, set: function (obj, value) { obj.bookingsToday = value; } }, metadata: _metadata }, _bookingsToday_initializers, _bookingsToday_extraInitializers);
        __esDecorate(null, null, _revenueToday_decorators, { kind: "field", name: "revenueToday", static: false, private: false, access: { has: function (obj) { return "revenueToday" in obj; }, get: function (obj) { return obj.revenueToday; }, set: function (obj, value) { obj.revenueToday = value; } }, metadata: _metadata }, _revenueToday_initializers, _revenueToday_extraInitializers);
        __esDecorate(null, null, _pendingPayments_decorators, { kind: "field", name: "pendingPayments", static: false, private: false, access: { has: function (obj) { return "pendingPayments" in obj; }, get: function (obj) { return obj.pendingPayments; }, set: function (obj, value) { obj.pendingPayments = value; } }, metadata: _metadata }, _pendingPayments_initializers, _pendingPayments_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueBookingSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueBookingSummary = _classThis;
}();
exports.VenueBookingSummary = VenueBookingSummary;
