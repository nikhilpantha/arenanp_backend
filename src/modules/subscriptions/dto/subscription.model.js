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
exports.MembershipStatsModel = exports.PaginatedSubscriptions = exports.SubscriptionModel = exports.SubscriptionPaymentModel = exports.MembershipPlanModel = void 0;
exports.mapPlan = mapPlan;
exports.mapPayment = mapPayment;
exports.mapSubscription = mapSubscription;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var pagination_input_1 = require("../../../common/dto/pagination.input");
require("../../../common/enums");
var lifecycle_util_1 = require("../lifecycle.util");
function num(v) {
    return Number(v.toString());
}
var MembershipPlanModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A venue-owned membership plan customers can subscribe to.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _validityDays_decorators;
    var _validityDays_initializers = [];
    var _validityDays_extraInitializers = [];
    var _sessionMinutes_decorators;
    var _sessionMinutes_initializers = [];
    var _sessionMinutes_extraInitializers = [];
    var _windows_decorators;
    var _windows_initializers = [];
    var _windows_extraInitializers = [];
    var _daysOfWeek_decorators;
    var _daysOfWeek_initializers = [];
    var _daysOfWeek_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _highlight_decorators;
    var _highlight_initializers = [];
    var _highlight_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _activeSubscribers_decorators;
    var _activeSubscribers_initializers = [];
    var _activeSubscribers_extraInitializers = [];
    var _liveSubscribers_decorators;
    var _liveSubscribers_initializers = [];
    var _liveSubscribers_extraInitializers = [];
    var _totalSubscribers_decorators;
    var _totalSubscribers_initializers = [];
    var _totalSubscribers_extraInitializers = [];
    var _canDelete_decorators;
    var _canDelete_initializers = [];
    var _canDelete_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var MembershipPlanModel = _classThis = /** @class */ (function () {
        function MembershipPlanModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.name = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.duration = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.validityDays = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _validityDays_initializers, void 0));
            this.sessionMinutes = (__runInitializers(this, _validityDays_extraInitializers), __runInitializers(this, _sessionMinutes_initializers, void 0));
            this.windows = (__runInitializers(this, _sessionMinutes_extraInitializers), __runInitializers(this, _windows_initializers, void 0));
            this.daysOfWeek = (__runInitializers(this, _windows_extraInitializers), __runInitializers(this, _daysOfWeek_initializers, void 0));
            this.sports = (__runInitializers(this, _daysOfWeek_extraInitializers), __runInitializers(this, _sports_initializers, void 0));
            this.highlight = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _highlight_initializers, void 0));
            this.isActive = (__runInitializers(this, _highlight_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.activeSubscribers = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _activeSubscribers_initializers, void 0));
            this.liveSubscribers = (__runInitializers(this, _activeSubscribers_extraInitializers), __runInitializers(this, _liveSubscribers_initializers, void 0));
            this.totalSubscribers = (__runInitializers(this, _liveSubscribers_extraInitializers), __runInitializers(this, _totalSubscribers_initializers, void 0));
            this.canDelete = (__runInitializers(this, _totalSubscribers_extraInitializers), __runInitializers(this, _canDelete_initializers, void 0));
            this.createdAt = (__runInitializers(this, _canDelete_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return MembershipPlanModel_1;
    }());
    __setFunctionName(_classThis, "MembershipPlanModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _duration_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipDuration; })];
        _validityDays_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _sessionMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Session length in minutes (e.g. 60 = 1 hour).' })];
        _windows_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { description: 'Allowed subscription bands as "HH:mm-HH:mm".' })];
        _daysOfWeek_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _highlight_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _activeSubscribers_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Active subscribers on this plan.' })];
        _liveSubscribers_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                description: 'Running, upcoming, paused or pending members — any of these blocks deleting.',
            })];
        _totalSubscribers_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                description: 'Everyone who ever subscribed. Above zero means deleting would bin payment history.',
            })];
        _canDelete_decorators = [(0, graphql_1.Field)({ description: 'Whether this plan can be deleted outright (nobody ever bought it).' })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _validityDays_decorators, { kind: "field", name: "validityDays", static: false, private: false, access: { has: function (obj) { return "validityDays" in obj; }, get: function (obj) { return obj.validityDays; }, set: function (obj, value) { obj.validityDays = value; } }, metadata: _metadata }, _validityDays_initializers, _validityDays_extraInitializers);
        __esDecorate(null, null, _sessionMinutes_decorators, { kind: "field", name: "sessionMinutes", static: false, private: false, access: { has: function (obj) { return "sessionMinutes" in obj; }, get: function (obj) { return obj.sessionMinutes; }, set: function (obj, value) { obj.sessionMinutes = value; } }, metadata: _metadata }, _sessionMinutes_initializers, _sessionMinutes_extraInitializers);
        __esDecorate(null, null, _windows_decorators, { kind: "field", name: "windows", static: false, private: false, access: { has: function (obj) { return "windows" in obj; }, get: function (obj) { return obj.windows; }, set: function (obj, value) { obj.windows = value; } }, metadata: _metadata }, _windows_initializers, _windows_extraInitializers);
        __esDecorate(null, null, _daysOfWeek_decorators, { kind: "field", name: "daysOfWeek", static: false, private: false, access: { has: function (obj) { return "daysOfWeek" in obj; }, get: function (obj) { return obj.daysOfWeek; }, set: function (obj, value) { obj.daysOfWeek = value; } }, metadata: _metadata }, _daysOfWeek_initializers, _daysOfWeek_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _highlight_decorators, { kind: "field", name: "highlight", static: false, private: false, access: { has: function (obj) { return "highlight" in obj; }, get: function (obj) { return obj.highlight; }, set: function (obj, value) { obj.highlight = value; } }, metadata: _metadata }, _highlight_initializers, _highlight_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _activeSubscribers_decorators, { kind: "field", name: "activeSubscribers", static: false, private: false, access: { has: function (obj) { return "activeSubscribers" in obj; }, get: function (obj) { return obj.activeSubscribers; }, set: function (obj, value) { obj.activeSubscribers = value; } }, metadata: _metadata }, _activeSubscribers_initializers, _activeSubscribers_extraInitializers);
        __esDecorate(null, null, _liveSubscribers_decorators, { kind: "field", name: "liveSubscribers", static: false, private: false, access: { has: function (obj) { return "liveSubscribers" in obj; }, get: function (obj) { return obj.liveSubscribers; }, set: function (obj, value) { obj.liveSubscribers = value; } }, metadata: _metadata }, _liveSubscribers_initializers, _liveSubscribers_extraInitializers);
        __esDecorate(null, null, _totalSubscribers_decorators, { kind: "field", name: "totalSubscribers", static: false, private: false, access: { has: function (obj) { return "totalSubscribers" in obj; }, get: function (obj) { return obj.totalSubscribers; }, set: function (obj, value) { obj.totalSubscribers = value; } }, metadata: _metadata }, _totalSubscribers_initializers, _totalSubscribers_extraInitializers);
        __esDecorate(null, null, _canDelete_decorators, { kind: "field", name: "canDelete", static: false, private: false, access: { has: function (obj) { return "canDelete" in obj; }, get: function (obj) { return obj.canDelete; }, set: function (obj, value) { obj.canDelete = value; } }, metadata: _metadata }, _canDelete_initializers, _canDelete_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MembershipPlanModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MembershipPlanModel = _classThis;
}();
exports.MembershipPlanModel = MembershipPlanModel;
var SubscriptionPaymentModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A payment against a subscription (purchase or renewal).' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _periodDays_decorators;
    var _periodDays_initializers = [];
    var _periodDays_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var SubscriptionPaymentModel = _classThis = /** @class */ (function () {
        function SubscriptionPaymentModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.amount = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.method = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _method_initializers, void 0));
            this.status = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.periodDays = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _periodDays_initializers, void 0));
            this.createdAt = (__runInitializers(this, _periodDays_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return SubscriptionPaymentModel_1;
    }());
    __setFunctionName(_classThis, "SubscriptionPaymentModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _method_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingPaymentStatus; })];
        _periodDays_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _periodDays_decorators, { kind: "field", name: "periodDays", static: false, private: false, access: { has: function (obj) { return "periodDays" in obj; }, get: function (obj) { return obj.periodDays; }, set: function (obj, value) { obj.periodDays = value; } }, metadata: _metadata }, _periodDays_initializers, _periodDays_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionPaymentModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionPaymentModel = _classThis;
}();
exports.SubscriptionPaymentModel = SubscriptionPaymentModel;
var SubscriptionModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A customer's subscription to a plan." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _planId_decorators;
    var _planId_initializers = [];
    var _planId_extraInitializers = [];
    var _planName_decorators;
    var _planName_initializers = [];
    var _planName_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _planPrice_decorators;
    var _planPrice_initializers = [];
    var _planPrice_extraInitializers = [];
    var _validityDays_decorators;
    var _validityDays_initializers = [];
    var _validityDays_extraInitializers = [];
    var _sessionMinutes_decorators;
    var _sessionMinutes_initializers = [];
    var _sessionMinutes_extraInitializers = [];
    var _slotStart_decorators;
    var _slotStart_initializers = [];
    var _slotStart_extraInitializers = [];
    var _daysOfWeek_decorators;
    var _daysOfWeek_initializers = [];
    var _daysOfWeek_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _customerName_decorators;
    var _customerName_initializers = [];
    var _customerName_extraInitializers = [];
    var _customerPhone_decorators;
    var _customerPhone_initializers = [];
    var _customerPhone_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _expiringSoon_decorators;
    var _expiringSoon_initializers = [];
    var _expiringSoon_extraInitializers = [];
    var _startedAt_decorators;
    var _startedAt_initializers = [];
    var _startedAt_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _pausedAt_decorators;
    var _pausedAt_initializers = [];
    var _pausedAt_extraInitializers = [];
    var _pausedDays_decorators;
    var _pausedDays_initializers = [];
    var _pausedDays_extraInitializers = [];
    var _payments_decorators;
    var _payments_initializers = [];
    var _payments_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var SubscriptionModel = _classThis = /** @class */ (function () {
        function SubscriptionModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.planId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _planId_initializers, void 0));
            this.planName = (__runInitializers(this, _planId_extraInitializers), __runInitializers(this, _planName_initializers, void 0));
            this.duration = (__runInitializers(this, _planName_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.price = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.planPrice = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _planPrice_initializers, void 0));
            this.validityDays = (__runInitializers(this, _planPrice_extraInitializers), __runInitializers(this, _validityDays_initializers, void 0));
            this.sessionMinutes = (__runInitializers(this, _validityDays_extraInitializers), __runInitializers(this, _sessionMinutes_initializers, void 0));
            this.slotStart = (__runInitializers(this, _sessionMinutes_extraInitializers), __runInitializers(this, _slotStart_initializers, void 0));
            this.daysOfWeek = (__runInitializers(this, _slotStart_extraInitializers), __runInitializers(this, _daysOfWeek_initializers, void 0));
            this.sports = (__runInitializers(this, _daysOfWeek_extraInitializers), __runInitializers(this, _sports_initializers, void 0));
            this.courtId = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.courtName = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.customerId = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
            this.customerName = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _customerName_initializers, void 0));
            this.customerPhone = (__runInitializers(this, _customerName_extraInitializers), __runInitializers(this, _customerPhone_initializers, void 0));
            this.status = (__runInitializers(this, _customerPhone_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.expiringSoon = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _expiringSoon_initializers, void 0));
            this.startedAt = (__runInitializers(this, _expiringSoon_extraInitializers), __runInitializers(this, _startedAt_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _startedAt_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.pausedAt = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _pausedAt_initializers, void 0));
            this.pausedDays = (__runInitializers(this, _pausedAt_extraInitializers), __runInitializers(this, _pausedDays_initializers, void 0));
            this.payments = (__runInitializers(this, _pausedDays_extraInitializers), __runInitializers(this, _payments_initializers, void 0));
            this.createdAt = (__runInitializers(this, _payments_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return SubscriptionModel_1;
    }());
    __setFunctionName(_classThis, "SubscriptionModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _planId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _planName_decorators = [(0, graphql_1.Field)()];
        _duration_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipDuration; })];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'What this term costs — the price they bought at.' })];
        _planPrice_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: "The plan's price today. Differs from `price` when it changed mid-term.",
            })];
        _validityDays_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Days this term runs for; a renewal adds this many.' })];
        _sessionMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Session length in minutes.' })];
        _slotStart_decorators = [(0, graphql_1.Field)({ description: 'The member\'s daily start time ("HH:mm").' })];
        _daysOfWeek_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _courtName_decorators = [(0, graphql_1.Field)()];
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _customerName_decorators = [(0, graphql_1.Field)()];
        _customerPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.SubscriptionStatus; })];
        _expiringSoon_decorators = [(0, graphql_1.Field)({ description: 'ACTIVE and within 7 days of expiry.' })];
        _startedAt_decorators = [(0, graphql_1.Field)()];
        _expiresAt_decorators = [(0, graphql_1.Field)({ description: 'Moves out by the paused time when a paused membership resumes.' })];
        _pausedAt_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'When the current pause started.' })];
        _pausedDays_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Whole days a running pause has credited so far.' })];
        _payments_decorators = [(0, graphql_1.Field)(function () { return [SubscriptionPaymentModel]; }, { description: 'Payment + renewal history.' })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _planId_decorators, { kind: "field", name: "planId", static: false, private: false, access: { has: function (obj) { return "planId" in obj; }, get: function (obj) { return obj.planId; }, set: function (obj, value) { obj.planId = value; } }, metadata: _metadata }, _planId_initializers, _planId_extraInitializers);
        __esDecorate(null, null, _planName_decorators, { kind: "field", name: "planName", static: false, private: false, access: { has: function (obj) { return "planName" in obj; }, get: function (obj) { return obj.planName; }, set: function (obj, value) { obj.planName = value; } }, metadata: _metadata }, _planName_initializers, _planName_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _planPrice_decorators, { kind: "field", name: "planPrice", static: false, private: false, access: { has: function (obj) { return "planPrice" in obj; }, get: function (obj) { return obj.planPrice; }, set: function (obj, value) { obj.planPrice = value; } }, metadata: _metadata }, _planPrice_initializers, _planPrice_extraInitializers);
        __esDecorate(null, null, _validityDays_decorators, { kind: "field", name: "validityDays", static: false, private: false, access: { has: function (obj) { return "validityDays" in obj; }, get: function (obj) { return obj.validityDays; }, set: function (obj, value) { obj.validityDays = value; } }, metadata: _metadata }, _validityDays_initializers, _validityDays_extraInitializers);
        __esDecorate(null, null, _sessionMinutes_decorators, { kind: "field", name: "sessionMinutes", static: false, private: false, access: { has: function (obj) { return "sessionMinutes" in obj; }, get: function (obj) { return obj.sessionMinutes; }, set: function (obj, value) { obj.sessionMinutes = value; } }, metadata: _metadata }, _sessionMinutes_initializers, _sessionMinutes_extraInitializers);
        __esDecorate(null, null, _slotStart_decorators, { kind: "field", name: "slotStart", static: false, private: false, access: { has: function (obj) { return "slotStart" in obj; }, get: function (obj) { return obj.slotStart; }, set: function (obj, value) { obj.slotStart = value; } }, metadata: _metadata }, _slotStart_initializers, _slotStart_extraInitializers);
        __esDecorate(null, null, _daysOfWeek_decorators, { kind: "field", name: "daysOfWeek", static: false, private: false, access: { has: function (obj) { return "daysOfWeek" in obj; }, get: function (obj) { return obj.daysOfWeek; }, set: function (obj, value) { obj.daysOfWeek = value; } }, metadata: _metadata }, _daysOfWeek_initializers, _daysOfWeek_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _customerName_decorators, { kind: "field", name: "customerName", static: false, private: false, access: { has: function (obj) { return "customerName" in obj; }, get: function (obj) { return obj.customerName; }, set: function (obj, value) { obj.customerName = value; } }, metadata: _metadata }, _customerName_initializers, _customerName_extraInitializers);
        __esDecorate(null, null, _customerPhone_decorators, { kind: "field", name: "customerPhone", static: false, private: false, access: { has: function (obj) { return "customerPhone" in obj; }, get: function (obj) { return obj.customerPhone; }, set: function (obj, value) { obj.customerPhone = value; } }, metadata: _metadata }, _customerPhone_initializers, _customerPhone_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _expiringSoon_decorators, { kind: "field", name: "expiringSoon", static: false, private: false, access: { has: function (obj) { return "expiringSoon" in obj; }, get: function (obj) { return obj.expiringSoon; }, set: function (obj, value) { obj.expiringSoon = value; } }, metadata: _metadata }, _expiringSoon_initializers, _expiringSoon_extraInitializers);
        __esDecorate(null, null, _startedAt_decorators, { kind: "field", name: "startedAt", static: false, private: false, access: { has: function (obj) { return "startedAt" in obj; }, get: function (obj) { return obj.startedAt; }, set: function (obj, value) { obj.startedAt = value; } }, metadata: _metadata }, _startedAt_initializers, _startedAt_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _pausedAt_decorators, { kind: "field", name: "pausedAt", static: false, private: false, access: { has: function (obj) { return "pausedAt" in obj; }, get: function (obj) { return obj.pausedAt; }, set: function (obj, value) { obj.pausedAt = value; } }, metadata: _metadata }, _pausedAt_initializers, _pausedAt_extraInitializers);
        __esDecorate(null, null, _pausedDays_decorators, { kind: "field", name: "pausedDays", static: false, private: false, access: { has: function (obj) { return "pausedDays" in obj; }, get: function (obj) { return obj.pausedDays; }, set: function (obj, value) { obj.pausedDays = value; } }, metadata: _metadata }, _pausedDays_initializers, _pausedDays_extraInitializers);
        __esDecorate(null, null, _payments_decorators, { kind: "field", name: "payments", static: false, private: false, access: { has: function (obj) { return "payments" in obj; }, get: function (obj) { return obj.payments; }, set: function (obj, value) { obj.payments = value; } }, metadata: _metadata }, _payments_initializers, _payments_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionModel = _classThis;
}();
exports.SubscriptionModel = SubscriptionModel;
var PaginatedSubscriptions = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _pageInfo_decorators;
    var _pageInfo_initializers = [];
    var _pageInfo_extraInitializers = [];
    var PaginatedSubscriptions = _classThis = /** @class */ (function () {
        function PaginatedSubscriptions_1() {
            this.items = __runInitializers(this, _items_initializers, void 0);
            this.pageInfo = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pageInfo_initializers, void 0));
            __runInitializers(this, _pageInfo_extraInitializers);
        }
        return PaginatedSubscriptions_1;
    }());
    __setFunctionName(_classThis, "PaginatedSubscriptions");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _items_decorators = [(0, graphql_1.Field)(function () { return [SubscriptionModel]; })];
        _pageInfo_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PageInfo; })];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _pageInfo_decorators, { kind: "field", name: "pageInfo", static: false, private: false, access: { has: function (obj) { return "pageInfo" in obj; }, get: function (obj) { return obj.pageInfo; }, set: function (obj, value) { obj.pageInfo = value; } }, metadata: _metadata }, _pageInfo_initializers, _pageInfo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginatedSubscriptions = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginatedSubscriptions = _classThis;
}();
exports.PaginatedSubscriptions = PaginatedSubscriptions;
var MembershipStatsModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Venue membership KPIs for the dashboard.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _activeMembers_decorators;
    var _activeMembers_initializers = [];
    var _activeMembers_extraInitializers = [];
    var _expiringSoon_decorators;
    var _expiringSoon_initializers = [];
    var _expiringSoon_extraInitializers = [];
    var _monthlyRevenue_decorators;
    var _monthlyRevenue_initializers = [];
    var _monthlyRevenue_extraInitializers = [];
    var _renewalRatePct_decorators;
    var _renewalRatePct_initializers = [];
    var _renewalRatePct_extraInitializers = [];
    var MembershipStatsModel = _classThis = /** @class */ (function () {
        function MembershipStatsModel_1() {
            this.activeMembers = __runInitializers(this, _activeMembers_initializers, void 0);
            this.expiringSoon = (__runInitializers(this, _activeMembers_extraInitializers), __runInitializers(this, _expiringSoon_initializers, void 0));
            /** Null for callers without `finance:read` — see `VenueBookingSummary.revenueToday`. */
            this.monthlyRevenue = (__runInitializers(this, _expiringSoon_extraInitializers), __runInitializers(this, _monthlyRevenue_initializers, void 0));
            this.renewalRatePct = (__runInitializers(this, _monthlyRevenue_extraInitializers), __runInitializers(this, _renewalRatePct_initializers, void 0));
            __runInitializers(this, _renewalRatePct_extraInitializers);
        }
        return MembershipStatsModel_1;
    }());
    __setFunctionName(_classThis, "MembershipStatsModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _activeMembers_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _expiringSoon_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _monthlyRevenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: "Membership revenue this month. Null unless the caller holds 'finance:read'.",
            })];
        _renewalRatePct_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _activeMembers_decorators, { kind: "field", name: "activeMembers", static: false, private: false, access: { has: function (obj) { return "activeMembers" in obj; }, get: function (obj) { return obj.activeMembers; }, set: function (obj, value) { obj.activeMembers = value; } }, metadata: _metadata }, _activeMembers_initializers, _activeMembers_extraInitializers);
        __esDecorate(null, null, _expiringSoon_decorators, { kind: "field", name: "expiringSoon", static: false, private: false, access: { has: function (obj) { return "expiringSoon" in obj; }, get: function (obj) { return obj.expiringSoon; }, set: function (obj, value) { obj.expiringSoon = value; } }, metadata: _metadata }, _expiringSoon_initializers, _expiringSoon_extraInitializers);
        __esDecorate(null, null, _monthlyRevenue_decorators, { kind: "field", name: "monthlyRevenue", static: false, private: false, access: { has: function (obj) { return "monthlyRevenue" in obj; }, get: function (obj) { return obj.monthlyRevenue; }, set: function (obj, value) { obj.monthlyRevenue = value; } }, metadata: _metadata }, _monthlyRevenue_initializers, _monthlyRevenue_extraInitializers);
        __esDecorate(null, null, _renewalRatePct_decorators, { kind: "field", name: "renewalRatePct", static: false, private: false, access: { has: function (obj) { return "renewalRatePct" in obj; }, get: function (obj) { return obj.renewalRatePct; }, set: function (obj, value) { obj.renewalRatePct = value; } }, metadata: _metadata }, _renewalRatePct_initializers, _renewalRatePct_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MembershipStatsModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MembershipStatsModel = _classThis;
}();
exports.MembershipStatsModel = MembershipStatsModel;
function mapPlan(p, counts) {
    var _a, _b;
    if (counts === void 0) { counts = { active: 0, live: 0, total: 0 }; }
    return {
        id: p.id,
        venueId: p.venueId,
        name: p.name,
        description: (_a = p.description) !== null && _a !== void 0 ? _a : undefined,
        price: num(p.price),
        duration: p.duration,
        validityDays: p.validityDays,
        sessionMinutes: p.sessionMinutes,
        windows: p.windows,
        daysOfWeek: p.daysOfWeek,
        sports: p.sports,
        highlight: (_b = p.highlight) !== null && _b !== void 0 ? _b : undefined,
        isActive: p.isActive,
        activeSubscribers: counts.active,
        liveSubscribers: counts.live,
        totalSubscribers: counts.total,
        canDelete: counts.total === 0,
        createdAt: p.createdAt,
    };
}
function mapPayment(p) {
    var _a, _b;
    return {
        id: p.id,
        amount: num(p.amount),
        method: (_a = p.method) !== null && _a !== void 0 ? _a : undefined,
        status: p.status,
        periodDays: (_b = p.periodDays) !== null && _b !== void 0 ? _b : undefined,
        createdAt: p.createdAt,
    };
}
/** Threshold (days) under which an ACTIVE subscription is flagged "expiring soon". */
var EXPIRING_SOON_DAYS = 7;
function mapSubscription(s, now) {
    var _a, _b, _c;
    var msLeft = s.expiresAt.getTime() - now.getTime();
    var daysLeft = msLeft / (1000 * 60 * 60 * 24);
    var expiringSoon = s.status === client_1.SubscriptionStatus.ACTIVE && daysLeft >= 0 && daysLeft <= EXPIRING_SOON_DAYS;
    return {
        id: s.id,
        venueId: s.venueId,
        planId: s.planId,
        planName: s.plan.name,
        duration: s.plan.duration,
        // Terms come off the SUBSCRIPTION, not the plan: re-pricing or re-timing a plan
        // must never rewrite what a member already bought. The plan's live price rides
        // along separately so the console can show "Rs 4,000 → Rs 4,500" at renewal.
        price: num(s.price),
        planPrice: num(s.plan.price),
        validityDays: s.validityDays,
        sessionMinutes: s.sessionMinutes,
        slotStart: s.slotStart,
        daysOfWeek: s.daysOfWeek,
        sports: s.plan.sports,
        courtId: s.courtId,
        courtName: s.court.name,
        customerId: s.customerId,
        customerName: s.customer.name,
        customerPhone: (_a = s.customer.phone) !== null && _a !== void 0 ? _a : undefined,
        status: s.status,
        expiringSoon: expiringSoon,
        startedAt: s.startedAt,
        expiresAt: s.expiresAt,
        pausedAt: (_b = s.pausedAt) !== null && _b !== void 0 ? _b : undefined,
        pausedDays: (0, lifecycle_util_1.daysCredited)(s.pausedAt, now),
        payments: ((_c = s.payments) !== null && _c !== void 0 ? _c : []).map(mapPayment),
        createdAt: s.createdAt,
    };
}
