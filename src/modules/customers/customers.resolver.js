"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var booking_model_1 = require("../booking/dto/booking.model");
var subscription_model_1 = require("../subscriptions/dto/subscription.model");
var customer_insights_model_1 = require("./dto/customer-insights.model");
var customer_model_1 = require("./dto/customer.model");
var CustomersResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return customer_model_1.VenueCustomerModel; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venueCustomers_decorators;
    var _venueCustomer_decorators;
    var _venueCustomerBookings_decorators;
    var _venueCustomerInsights_decorators;
    var _venueCustomerSubscriptions_decorators;
    var _createVenueCustomer_decorators;
    var CustomersResolver = _classThis = /** @class */ (function () {
        function CustomersResolver_1(service, insights) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.insights = insights;
        }
        CustomersResolver_1.prototype.venueCustomers = function (input) {
            return this.service.listVenueCustomers(input);
        };
        CustomersResolver_1.prototype.venueCustomer = function (venueId, customerId) {
            return this.service.getOne(venueId, customerId);
        };
        CustomersResolver_1.prototype.venueCustomerBookings = function (venueId, customerId, limit, offset) {
            return this.service.getCustomerBookings(venueId, customerId, Math.min(Math.max(limit, 1), 100), Math.max(offset, 0));
        };
        CustomersResolver_1.prototype.venueCustomerInsights = function (venueId, customerId) {
            return this.insights.getInsights(venueId, customerId);
        };
        CustomersResolver_1.prototype.venueCustomerSubscriptions = function (venueId, customerId) {
            return this.service.getCustomerSubscriptions(venueId, customerId);
        };
        CustomersResolver_1.prototype.createVenueCustomer = function (input) {
            return this.service.create(input);
        };
        return CustomersResolver_1;
    }());
    __setFunctionName(_classThis, "CustomersResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueCustomers_decorators = [(0, graphql_1.Query)(function () { return [customer_model_1.VenueCustomerModel]; }, {
                name: 'venueCustomers',
                description: "Search/list a venue's customers (people and teams) with loyalty.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.customers.view')];
        _venueCustomer_decorators = [(0, graphql_1.Query)(function () { return customer_model_1.VenueCustomerModel; }, {
                name: 'venueCustomer',
                description: 'A single venue customer.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.customers.view')];
        _venueCustomerBookings_decorators = [(0, graphql_1.Query)(function () { return [booking_model_1.BookingModel]; }, {
                name: 'venueCustomerBookings',
                description: "A page of a customer's bookings (most recent first) — the detail screen lists every game individually.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.customers.view')];
        _venueCustomerInsights_decorators = [(0, graphql_1.Query)(function () { return customer_insights_model_1.VenueCustomerInsightsModel; }, {
                name: 'venueCustomerInsights',
                description: "A customer's play history at this venue, aggregated: loyalty standing, spend, reliability and playing preferences.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('customers:read')];
        _venueCustomerSubscriptions_decorators = [(0, graphql_1.Query)(function () { return [subscription_model_1.SubscriptionModel]; }, {
                name: 'venueCustomerSubscriptions',
                description: "A customer's memberships (most recent first), for the unified profile.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.customers.view')];
        _createVenueCustomer_decorators = [(0, graphql_1.Mutation)(function () { return customer_model_1.VenueCustomerModel; }, {
                name: 'createVenueCustomer',
                description: 'Create (or reuse, by phone) a venue customer.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        __esDecorate(_classThis, null, _venueCustomers_decorators, { kind: "method", name: "venueCustomers", static: false, private: false, access: { has: function (obj) { return "venueCustomers" in obj; }, get: function (obj) { return obj.venueCustomers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueCustomer_decorators, { kind: "method", name: "venueCustomer", static: false, private: false, access: { has: function (obj) { return "venueCustomer" in obj; }, get: function (obj) { return obj.venueCustomer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueCustomerBookings_decorators, { kind: "method", name: "venueCustomerBookings", static: false, private: false, access: { has: function (obj) { return "venueCustomerBookings" in obj; }, get: function (obj) { return obj.venueCustomerBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueCustomerInsights_decorators, { kind: "method", name: "venueCustomerInsights", static: false, private: false, access: { has: function (obj) { return "venueCustomerInsights" in obj; }, get: function (obj) { return obj.venueCustomerInsights; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueCustomerSubscriptions_decorators, { kind: "method", name: "venueCustomerSubscriptions", static: false, private: false, access: { has: function (obj) { return "venueCustomerSubscriptions" in obj; }, get: function (obj) { return obj.venueCustomerSubscriptions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createVenueCustomer_decorators, { kind: "method", name: "createVenueCustomer", static: false, private: false, access: { has: function (obj) { return "createVenueCustomer" in obj; }, get: function (obj) { return obj.createVenueCustomer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomersResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomersResolver = _classThis;
}();
exports.CustomersResolver = CustomersResolver;
