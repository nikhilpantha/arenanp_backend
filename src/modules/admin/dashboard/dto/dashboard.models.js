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
exports.AdminDashboardOverview = exports.PopularCityItem = exports.PopularSportItem = exports.RecentPaymentItem = exports.RecentBookingItem = exports.RevenueTrendPoint = exports.BookingTrendPoint = exports.AdminDashboardKpis = void 0;
var graphql_1 = require("@nestjs/graphql");
// Side-effect import to register existing GraphQL enums.
require("../../../../common/enums");
var AdminDashboardKpis = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Top-line KPI numbers for the super-admin dashboard.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _totalUsers_decorators;
    var _totalUsers_initializers = [];
    var _totalUsers_extraInitializers = [];
    var _totalVenues_decorators;
    var _totalVenues_initializers = [];
    var _totalVenues_extraInitializers = [];
    var _totalBookings_decorators;
    var _totalBookings_initializers = [];
    var _totalBookings_extraInitializers = [];
    var _totalRevenue_decorators;
    var _totalRevenue_initializers = [];
    var _totalRevenue_extraInitializers = [];
    var _pendingOrganizerVerifications_decorators;
    var _pendingOrganizerVerifications_initializers = [];
    var _pendingOrganizerVerifications_extraInitializers = [];
    var _pendingVenueApprovals_decorators;
    var _pendingVenueApprovals_initializers = [];
    var _pendingVenueApprovals_extraInitializers = [];
    var _pendingRefunds_decorators;
    var _pendingRefunds_initializers = [];
    var _pendingRefunds_extraInitializers = [];
    var _activeTournaments_decorators;
    var _activeTournaments_initializers = [];
    var _activeTournaments_extraInitializers = [];
    var _todayBookings_decorators;
    var _todayBookings_initializers = [];
    var _todayBookings_extraInitializers = [];
    var AdminDashboardKpis = _classThis = /** @class */ (function () {
        function AdminDashboardKpis_1() {
            this.totalUsers = __runInitializers(this, _totalUsers_initializers, void 0);
            this.totalVenues = (__runInitializers(this, _totalUsers_extraInitializers), __runInitializers(this, _totalVenues_initializers, void 0));
            this.totalBookings = (__runInitializers(this, _totalVenues_extraInitializers), __runInitializers(this, _totalBookings_initializers, void 0));
            this.totalRevenue = (__runInitializers(this, _totalBookings_extraInitializers), __runInitializers(this, _totalRevenue_initializers, void 0));
            this.pendingOrganizerVerifications = (__runInitializers(this, _totalRevenue_extraInitializers), __runInitializers(this, _pendingOrganizerVerifications_initializers, void 0));
            this.pendingVenueApprovals = (__runInitializers(this, _pendingOrganizerVerifications_extraInitializers), __runInitializers(this, _pendingVenueApprovals_initializers, void 0));
            this.pendingRefunds = (__runInitializers(this, _pendingVenueApprovals_extraInitializers), __runInitializers(this, _pendingRefunds_initializers, void 0));
            this.activeTournaments = (__runInitializers(this, _pendingRefunds_extraInitializers), __runInitializers(this, _activeTournaments_initializers, void 0));
            this.todayBookings = (__runInitializers(this, _activeTournaments_extraInitializers), __runInitializers(this, _todayBookings_initializers, void 0));
            __runInitializers(this, _todayBookings_extraInitializers);
        }
        return AdminDashboardKpis_1;
    }());
    __setFunctionName(_classThis, "AdminDashboardKpis");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _totalUsers_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalVenues_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalBookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalRevenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _pendingOrganizerVerifications_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _pendingVenueApprovals_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _pendingRefunds_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _activeTournaments_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _todayBookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _totalUsers_decorators, { kind: "field", name: "totalUsers", static: false, private: false, access: { has: function (obj) { return "totalUsers" in obj; }, get: function (obj) { return obj.totalUsers; }, set: function (obj, value) { obj.totalUsers = value; } }, metadata: _metadata }, _totalUsers_initializers, _totalUsers_extraInitializers);
        __esDecorate(null, null, _totalVenues_decorators, { kind: "field", name: "totalVenues", static: false, private: false, access: { has: function (obj) { return "totalVenues" in obj; }, get: function (obj) { return obj.totalVenues; }, set: function (obj, value) { obj.totalVenues = value; } }, metadata: _metadata }, _totalVenues_initializers, _totalVenues_extraInitializers);
        __esDecorate(null, null, _totalBookings_decorators, { kind: "field", name: "totalBookings", static: false, private: false, access: { has: function (obj) { return "totalBookings" in obj; }, get: function (obj) { return obj.totalBookings; }, set: function (obj, value) { obj.totalBookings = value; } }, metadata: _metadata }, _totalBookings_initializers, _totalBookings_extraInitializers);
        __esDecorate(null, null, _totalRevenue_decorators, { kind: "field", name: "totalRevenue", static: false, private: false, access: { has: function (obj) { return "totalRevenue" in obj; }, get: function (obj) { return obj.totalRevenue; }, set: function (obj, value) { obj.totalRevenue = value; } }, metadata: _metadata }, _totalRevenue_initializers, _totalRevenue_extraInitializers);
        __esDecorate(null, null, _pendingOrganizerVerifications_decorators, { kind: "field", name: "pendingOrganizerVerifications", static: false, private: false, access: { has: function (obj) { return "pendingOrganizerVerifications" in obj; }, get: function (obj) { return obj.pendingOrganizerVerifications; }, set: function (obj, value) { obj.pendingOrganizerVerifications = value; } }, metadata: _metadata }, _pendingOrganizerVerifications_initializers, _pendingOrganizerVerifications_extraInitializers);
        __esDecorate(null, null, _pendingVenueApprovals_decorators, { kind: "field", name: "pendingVenueApprovals", static: false, private: false, access: { has: function (obj) { return "pendingVenueApprovals" in obj; }, get: function (obj) { return obj.pendingVenueApprovals; }, set: function (obj, value) { obj.pendingVenueApprovals = value; } }, metadata: _metadata }, _pendingVenueApprovals_initializers, _pendingVenueApprovals_extraInitializers);
        __esDecorate(null, null, _pendingRefunds_decorators, { kind: "field", name: "pendingRefunds", static: false, private: false, access: { has: function (obj) { return "pendingRefunds" in obj; }, get: function (obj) { return obj.pendingRefunds; }, set: function (obj, value) { obj.pendingRefunds = value; } }, metadata: _metadata }, _pendingRefunds_initializers, _pendingRefunds_extraInitializers);
        __esDecorate(null, null, _activeTournaments_decorators, { kind: "field", name: "activeTournaments", static: false, private: false, access: { has: function (obj) { return "activeTournaments" in obj; }, get: function (obj) { return obj.activeTournaments; }, set: function (obj, value) { obj.activeTournaments = value; } }, metadata: _metadata }, _activeTournaments_initializers, _activeTournaments_extraInitializers);
        __esDecorate(null, null, _todayBookings_decorators, { kind: "field", name: "todayBookings", static: false, private: false, access: { has: function (obj) { return "todayBookings" in obj; }, get: function (obj) { return obj.todayBookings; }, set: function (obj, value) { obj.todayBookings = value; } }, metadata: _metadata }, _todayBookings_initializers, _todayBookings_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDashboardKpis = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDashboardKpis = _classThis;
}();
exports.AdminDashboardKpis = AdminDashboardKpis;
var BookingTrendPoint = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var BookingTrendPoint = _classThis = /** @class */ (function () {
        function BookingTrendPoint_1() {
            this.date = __runInitializers(this, _date_initializers, void 0);
            this.bookings = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            __runInitializers(this, _bookings_extraInitializers);
        }
        return BookingTrendPoint_1;
    }());
    __setFunctionName(_classThis, "BookingTrendPoint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _date_decorators = [(0, graphql_1.Field)()];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingTrendPoint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingTrendPoint = _classThis;
}();
exports.BookingTrendPoint = BookingTrendPoint;
var RevenueTrendPoint = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _revenue_decorators;
    var _revenue_initializers = [];
    var _revenue_extraInitializers = [];
    var RevenueTrendPoint = _classThis = /** @class */ (function () {
        function RevenueTrendPoint_1() {
            this.date = __runInitializers(this, _date_initializers, void 0);
            this.revenue = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _revenue_initializers, void 0));
            __runInitializers(this, _revenue_extraInitializers);
        }
        return RevenueTrendPoint_1;
    }());
    __setFunctionName(_classThis, "RevenueTrendPoint");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _date_decorators = [(0, graphql_1.Field)()];
        _revenue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _revenue_decorators, { kind: "field", name: "revenue", static: false, private: false, access: { has: function (obj) { return "revenue" in obj; }, get: function (obj) { return obj.revenue; }, set: function (obj, value) { obj.revenue = value; } }, metadata: _metadata }, _revenue_initializers, _revenue_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RevenueTrendPoint = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RevenueTrendPoint = _classThis;
}();
exports.RevenueTrendPoint = RevenueTrendPoint;
var RecentBookingItem = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact booking row for the dashboard recent-bookings table.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userFullName_decorators;
    var _userFullName_initializers = [];
    var _userFullName_extraInitializers = [];
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var RecentBookingItem = _classThis = /** @class */ (function () {
        function RecentBookingItem_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userFullName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userFullName_initializers, void 0));
            this.venueName = (__runInitializers(this, _userFullName_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.sport = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.amount = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return RecentBookingItem_1;
    }());
    __setFunctionName(_classThis, "RecentBookingItem");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)()];
        _userFullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _venueName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _sport_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userFullName_decorators, { kind: "field", name: "userFullName", static: false, private: false, access: { has: function (obj) { return "userFullName" in obj; }, get: function (obj) { return obj.userFullName; }, set: function (obj, value) { obj.userFullName = value; } }, metadata: _metadata }, _userFullName_initializers, _userFullName_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RecentBookingItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RecentBookingItem = _classThis;
}();
exports.RecentBookingItem = RecentBookingItem;
var RecentPaymentItem = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact payment row for the dashboard recent-payments table.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userFullName_decorators;
    var _userFullName_initializers = [];
    var _userFullName_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var RecentPaymentItem = _classThis = /** @class */ (function () {
        function RecentPaymentItem_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userFullName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userFullName_initializers, void 0));
            this.provider = (__runInitializers(this, _userFullName_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.amount = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return RecentPaymentItem_1;
    }());
    __setFunctionName(_classThis, "RecentPaymentItem");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)()];
        _userFullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _provider_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userFullName_decorators, { kind: "field", name: "userFullName", static: false, private: false, access: { has: function (obj) { return "userFullName" in obj; }, get: function (obj) { return obj.userFullName; }, set: function (obj, value) { obj.userFullName = value; } }, metadata: _metadata }, _userFullName_initializers, _userFullName_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RecentPaymentItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RecentPaymentItem = _classThis;
}();
exports.RecentPaymentItem = RecentPaymentItem;
var PopularSportItem = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var PopularSportItem = _classThis = /** @class */ (function () {
        function PopularSportItem_1() {
            this.sport = __runInitializers(this, _sport_initializers, void 0);
            this.bookings = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            __runInitializers(this, _bookings_extraInitializers);
        }
        return PopularSportItem_1;
    }());
    __setFunctionName(_classThis, "PopularSportItem");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sport_decorators = [(0, graphql_1.Field)()];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PopularSportItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PopularSportItem = _classThis;
}();
exports.PopularSportItem = PopularSportItem;
var PopularCityItem = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _bookings_decorators;
    var _bookings_initializers = [];
    var _bookings_extraInitializers = [];
    var PopularCityItem = _classThis = /** @class */ (function () {
        function PopularCityItem_1() {
            this.city = __runInitializers(this, _city_initializers, void 0);
            this.bookings = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _bookings_initializers, void 0));
            __runInitializers(this, _bookings_extraInitializers);
        }
        return PopularCityItem_1;
    }());
    __setFunctionName(_classThis, "PopularCityItem");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _city_decorators = [(0, graphql_1.Field)()];
        _bookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _bookings_decorators, { kind: "field", name: "bookings", static: false, private: false, access: { has: function (obj) { return "bookings" in obj; }, get: function (obj) { return obj.bookings; }, set: function (obj, value) { obj.bookings = value; } }, metadata: _metadata }, _bookings_initializers, _bookings_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PopularCityItem = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PopularCityItem = _classThis;
}();
exports.PopularCityItem = PopularCityItem;
var AdminDashboardOverview = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Aggregated dashboard payload returned to the super-admin home. Counts/lists for entities not yet implemented (venue, booking, payment, tournament) are returned as 0 / [] until those modules land.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _kpis_decorators;
    var _kpis_initializers = [];
    var _kpis_extraInitializers = [];
    var _recentBookings_decorators;
    var _recentBookings_initializers = [];
    var _recentBookings_extraInitializers = [];
    var _recentPayments_decorators;
    var _recentPayments_initializers = [];
    var _recentPayments_extraInitializers = [];
    var _bookingTrend_decorators;
    var _bookingTrend_initializers = [];
    var _bookingTrend_extraInitializers = [];
    var _revenueTrend_decorators;
    var _revenueTrend_initializers = [];
    var _revenueTrend_extraInitializers = [];
    var _popularSports_decorators;
    var _popularSports_initializers = [];
    var _popularSports_extraInitializers = [];
    var _popularCities_decorators;
    var _popularCities_initializers = [];
    var _popularCities_extraInitializers = [];
    var AdminDashboardOverview = _classThis = /** @class */ (function () {
        function AdminDashboardOverview_1() {
            this.kpis = __runInitializers(this, _kpis_initializers, void 0);
            this.recentBookings = (__runInitializers(this, _kpis_extraInitializers), __runInitializers(this, _recentBookings_initializers, void 0));
            this.recentPayments = (__runInitializers(this, _recentBookings_extraInitializers), __runInitializers(this, _recentPayments_initializers, void 0));
            this.bookingTrend = (__runInitializers(this, _recentPayments_extraInitializers), __runInitializers(this, _bookingTrend_initializers, void 0));
            this.revenueTrend = (__runInitializers(this, _bookingTrend_extraInitializers), __runInitializers(this, _revenueTrend_initializers, void 0));
            this.popularSports = (__runInitializers(this, _revenueTrend_extraInitializers), __runInitializers(this, _popularSports_initializers, void 0));
            this.popularCities = (__runInitializers(this, _popularSports_extraInitializers), __runInitializers(this, _popularCities_initializers, void 0));
            __runInitializers(this, _popularCities_extraInitializers);
        }
        return AdminDashboardOverview_1;
    }());
    __setFunctionName(_classThis, "AdminDashboardOverview");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _kpis_decorators = [(0, graphql_1.Field)(function () { return AdminDashboardKpis; })];
        _recentBookings_decorators = [(0, graphql_1.Field)(function () { return [RecentBookingItem]; })];
        _recentPayments_decorators = [(0, graphql_1.Field)(function () { return [RecentPaymentItem]; })];
        _bookingTrend_decorators = [(0, graphql_1.Field)(function () { return [BookingTrendPoint]; })];
        _revenueTrend_decorators = [(0, graphql_1.Field)(function () { return [RevenueTrendPoint]; })];
        _popularSports_decorators = [(0, graphql_1.Field)(function () { return [PopularSportItem]; })];
        _popularCities_decorators = [(0, graphql_1.Field)(function () { return [PopularCityItem]; })];
        __esDecorate(null, null, _kpis_decorators, { kind: "field", name: "kpis", static: false, private: false, access: { has: function (obj) { return "kpis" in obj; }, get: function (obj) { return obj.kpis; }, set: function (obj, value) { obj.kpis = value; } }, metadata: _metadata }, _kpis_initializers, _kpis_extraInitializers);
        __esDecorate(null, null, _recentBookings_decorators, { kind: "field", name: "recentBookings", static: false, private: false, access: { has: function (obj) { return "recentBookings" in obj; }, get: function (obj) { return obj.recentBookings; }, set: function (obj, value) { obj.recentBookings = value; } }, metadata: _metadata }, _recentBookings_initializers, _recentBookings_extraInitializers);
        __esDecorate(null, null, _recentPayments_decorators, { kind: "field", name: "recentPayments", static: false, private: false, access: { has: function (obj) { return "recentPayments" in obj; }, get: function (obj) { return obj.recentPayments; }, set: function (obj, value) { obj.recentPayments = value; } }, metadata: _metadata }, _recentPayments_initializers, _recentPayments_extraInitializers);
        __esDecorate(null, null, _bookingTrend_decorators, { kind: "field", name: "bookingTrend", static: false, private: false, access: { has: function (obj) { return "bookingTrend" in obj; }, get: function (obj) { return obj.bookingTrend; }, set: function (obj, value) { obj.bookingTrend = value; } }, metadata: _metadata }, _bookingTrend_initializers, _bookingTrend_extraInitializers);
        __esDecorate(null, null, _revenueTrend_decorators, { kind: "field", name: "revenueTrend", static: false, private: false, access: { has: function (obj) { return "revenueTrend" in obj; }, get: function (obj) { return obj.revenueTrend; }, set: function (obj, value) { obj.revenueTrend = value; } }, metadata: _metadata }, _revenueTrend_initializers, _revenueTrend_extraInitializers);
        __esDecorate(null, null, _popularSports_decorators, { kind: "field", name: "popularSports", static: false, private: false, access: { has: function (obj) { return "popularSports" in obj; }, get: function (obj) { return obj.popularSports; }, set: function (obj, value) { obj.popularSports = value; } }, metadata: _metadata }, _popularSports_initializers, _popularSports_extraInitializers);
        __esDecorate(null, null, _popularCities_decorators, { kind: "field", name: "popularCities", static: false, private: false, access: { has: function (obj) { return "popularCities" in obj; }, get: function (obj) { return obj.popularCities; }, set: function (obj, value) { obj.popularCities = value; } }, metadata: _metadata }, _popularCities_initializers, _popularCities_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDashboardOverview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDashboardOverview = _classThis;
}();
exports.AdminDashboardOverview = AdminDashboardOverview;
