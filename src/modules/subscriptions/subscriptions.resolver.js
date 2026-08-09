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
exports.SubscriptionsResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var capability_decorator_1 = require("../../common/decorators/capability.decorator");
var venue_access_decorator_1 = require("../../common/decorators/venue-access.decorator");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var subscription_model_1 = require("./dto/subscription.model");
var SubscriptionsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return subscription_model_1.SubscriptionModel; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venueMembershipPlans_decorators;
    var _venuePublicPlans_decorators;
    var _courtTakenSlots_decorators;
    var _createMembershipPlan_decorators;
    var _updateMembershipPlan_decorators;
    var _deleteMembershipPlan_decorators;
    var _venueSubscriptions_decorators;
    var _venueSubscription_decorators;
    var _createSubscription_decorators;
    var _createMySubscription_decorators;
    var _mySubscriptions_decorators;
    var _renewSubscription_decorators;
    var _setSubscriptionStatus_decorators;
    var _approveSubscription_decorators;
    var _venueMembershipStats_decorators;
    var SubscriptionsResolver = _classThis = /** @class */ (function () {
        function SubscriptionsResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        // ─── Plans ──────────────────────────────────────────────────────────────────
        SubscriptionsResolver_1.prototype.venueMembershipPlans = function (input) {
            return this.service.listPlans(input);
        };
        SubscriptionsResolver_1.prototype.venuePublicPlans = function (venueId) {
            return this.service.listPlans({ venueId: venueId, activeOnly: true });
        };
        SubscriptionsResolver_1.prototype.courtTakenSlots = function (courtId, startDate, endDate) {
            return this.service.courtTakenSlots(courtId, startDate, endDate);
        };
        SubscriptionsResolver_1.prototype.createMembershipPlan = function (input) {
            return this.service.createPlan(input);
        };
        SubscriptionsResolver_1.prototype.updateMembershipPlan = function (input) {
            return this.service.updatePlan(input);
        };
        SubscriptionsResolver_1.prototype.deleteMembershipPlan = function (venueId, planId) {
            return this.service.deletePlan(venueId, planId);
        };
        // ─── Subscriptions ────────────────────────────────────────────────────────────
        SubscriptionsResolver_1.prototype.venueSubscriptions = function (input) {
            return this.service.listSubscriptions(input);
        };
        SubscriptionsResolver_1.prototype.venueSubscription = function (venueId, subscriptionId) {
            return this.service.getSubscription(venueId, subscriptionId);
        };
        SubscriptionsResolver_1.prototype.createSubscription = function (input) {
            return this.service.createSubscription(input);
        };
        // ─── Player self-service ──────────────────────────────────────────────────────
        SubscriptionsResolver_1.prototype.createMySubscription = function (input, user) {
            return this.service.createMySubscription(input, user.id);
        };
        SubscriptionsResolver_1.prototype.mySubscriptions = function (user) {
            return this.service.mySubscriptions(user.id);
        };
        SubscriptionsResolver_1.prototype.renewSubscription = function (input) {
            return this.service.renewSubscription(input);
        };
        SubscriptionsResolver_1.prototype.setSubscriptionStatus = function (input) {
            return this.service.setStatus(input);
        };
        SubscriptionsResolver_1.prototype.approveSubscription = function (input) {
            return this.service.approveRequest(input);
        };
        // ─── Stats ──────────────────────────────────────────────────────────────────
        SubscriptionsResolver_1.prototype.venueMembershipStats = function (venueId, access) {
            return this.service.stats(venueId, (0, venue_access_decorator_1.canRead)(access, 'finance:read'));
        };
        return SubscriptionsResolver_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueMembershipPlans_decorators = [(0, graphql_1.Query)(function () { return [subscription_model_1.MembershipPlanModel]; }, {
                name: 'venueMembershipPlans',
                description: "A venue's membership plans.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _venuePublicPlans_decorators = [(0, graphql_1.Query)(function () { return [subscription_model_1.MembershipPlanModel]; }, {
                name: 'venuePublicPlans',
                description: "A venue's active membership plans — public, for the player marketplace.",
            })];
        _courtTakenSlots_decorators = [(0, graphql_1.Query)(function () { return [String]; }, {
                name: 'courtTakenSlots',
                description: 'Daily slot starts ("HH:mm") already held on a court over a date range.',
            })];
        _createMembershipPlan_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.MembershipPlanModel; }, {
                name: 'createMembershipPlan',
                description: 'Create a membership plan.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.memberships.manage')];
        _updateMembershipPlan_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.MembershipPlanModel; }, {
                name: 'updateMembershipPlan',
                description: 'Update / activate / deactivate a membership plan.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.memberships.manage')];
        _deleteMembershipPlan_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.MembershipPlanModel; }, {
                name: 'deleteMembershipPlan',
                description: 'Delete a membership plan.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.memberships.manage')];
        _venueSubscriptions_decorators = [(0, graphql_1.Query)(function () { return subscription_model_1.PaginatedSubscriptions; }, {
                name: 'venueSubscriptions',
                description: "A venue's subscriptions (excludes CANCELLED unless filtered), paginated.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _venueSubscription_decorators = [(0, graphql_1.Query)(function () { return subscription_model_1.SubscriptionModel; }, {
                name: 'venueSubscription',
                description: 'A single subscription with its payment history.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _createSubscription_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.SubscriptionModel; }, {
                name: 'createSubscription',
                description: 'Subscribe a customer to a plan (records the first payment).',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.memberships.manage')];
        _createMySubscription_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.SubscriptionModel; }, {
                name: 'createMySubscription',
                description: 'Subscribe to a plan as a player (auto-links the player as a venue customer).',
            }), (0, capability_decorator_1.RequireCapability)(client_1.CapabilityType.PLAYER)];
        _mySubscriptions_decorators = [(0, graphql_1.Query)(function () { return [subscription_model_1.SubscriptionModel]; }, {
                name: 'mySubscriptions',
                description: "The signed-in player's memberships across venues.",
            }), (0, capability_decorator_1.RequireCapability)(client_1.CapabilityType.PLAYER)];
        _renewSubscription_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.SubscriptionModel; }, {
                name: 'renewSubscription',
                description: 'Renew a subscription (extends the window + records a payment).',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.memberships.manage')];
        _setSubscriptionStatus_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.SubscriptionModel; }, {
                name: 'setSubscriptionStatus',
                description: 'Pause, resume or cancel a membership. Pausing frees the slot for walk-in bookings ' +
                    'but keeps it reserved against other memberships; resuming credits the paused days ' +
                    'onto the end date. Expiring happens on the end date by itself, and a pending ' +
                    'request is approved with approveSubscription, so neither can be set here.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.memberships.manage')];
        _approveSubscription_decorators = [(0, graphql_1.Mutation)(function () { return subscription_model_1.SubscriptionModel; }, {
                name: 'approveSubscription',
                description: "Approve a player's membership request: re-checks the plan is still on sale and " +
                    'the slot is still free, then activates it and records the first payment.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('memberships:manage')];
        _venueMembershipStats_decorators = [(0, graphql_1.Query)(function () { return subscription_model_1.MembershipStatsModel; }, {
                name: 'venueMembershipStats',
                description: "Venue membership KPIs. `monthlyRevenue` is omitted unless the caller holds 'finance:read'.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        __esDecorate(_classThis, null, _venueMembershipPlans_decorators, { kind: "method", name: "venueMembershipPlans", static: false, private: false, access: { has: function (obj) { return "venueMembershipPlans" in obj; }, get: function (obj) { return obj.venueMembershipPlans; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venuePublicPlans_decorators, { kind: "method", name: "venuePublicPlans", static: false, private: false, access: { has: function (obj) { return "venuePublicPlans" in obj; }, get: function (obj) { return obj.venuePublicPlans; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _courtTakenSlots_decorators, { kind: "method", name: "courtTakenSlots", static: false, private: false, access: { has: function (obj) { return "courtTakenSlots" in obj; }, get: function (obj) { return obj.courtTakenSlots; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createMembershipPlan_decorators, { kind: "method", name: "createMembershipPlan", static: false, private: false, access: { has: function (obj) { return "createMembershipPlan" in obj; }, get: function (obj) { return obj.createMembershipPlan; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateMembershipPlan_decorators, { kind: "method", name: "updateMembershipPlan", static: false, private: false, access: { has: function (obj) { return "updateMembershipPlan" in obj; }, get: function (obj) { return obj.updateMembershipPlan; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteMembershipPlan_decorators, { kind: "method", name: "deleteMembershipPlan", static: false, private: false, access: { has: function (obj) { return "deleteMembershipPlan" in obj; }, get: function (obj) { return obj.deleteMembershipPlan; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueSubscriptions_decorators, { kind: "method", name: "venueSubscriptions", static: false, private: false, access: { has: function (obj) { return "venueSubscriptions" in obj; }, get: function (obj) { return obj.venueSubscriptions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueSubscription_decorators, { kind: "method", name: "venueSubscription", static: false, private: false, access: { has: function (obj) { return "venueSubscription" in obj; }, get: function (obj) { return obj.venueSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createSubscription_decorators, { kind: "method", name: "createSubscription", static: false, private: false, access: { has: function (obj) { return "createSubscription" in obj; }, get: function (obj) { return obj.createSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createMySubscription_decorators, { kind: "method", name: "createMySubscription", static: false, private: false, access: { has: function (obj) { return "createMySubscription" in obj; }, get: function (obj) { return obj.createMySubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _mySubscriptions_decorators, { kind: "method", name: "mySubscriptions", static: false, private: false, access: { has: function (obj) { return "mySubscriptions" in obj; }, get: function (obj) { return obj.mySubscriptions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _renewSubscription_decorators, { kind: "method", name: "renewSubscription", static: false, private: false, access: { has: function (obj) { return "renewSubscription" in obj; }, get: function (obj) { return obj.renewSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setSubscriptionStatus_decorators, { kind: "method", name: "setSubscriptionStatus", static: false, private: false, access: { has: function (obj) { return "setSubscriptionStatus" in obj; }, get: function (obj) { return obj.setSubscriptionStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveSubscription_decorators, { kind: "method", name: "approveSubscription", static: false, private: false, access: { has: function (obj) { return "approveSubscription" in obj; }, get: function (obj) { return obj.approveSubscription; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueMembershipStats_decorators, { kind: "method", name: "venueMembershipStats", static: false, private: false, access: { has: function (obj) { return "venueMembershipStats" in obj; }, get: function (obj) { return obj.venueMembershipStats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsResolver = _classThis;
}();
exports.SubscriptionsResolver = SubscriptionsResolver;
