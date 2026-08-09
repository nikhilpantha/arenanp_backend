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
exports.VenueCustomerInsightsModel = exports.CustomerLoyaltyModel = exports.CustomerMonthModel = exports.CustomerHourBucketModel = exports.CustomerFavouriteModel = void 0;
var graphql_1 = require("@nestjs/graphql");
/**
 * Everything the venue console's customer profile needs to answer two
 * questions: how loyal is this player, and how do they like to play here.
 *
 * All of it is aggregated over the customer's WHOLE booking history at this
 * venue (the paged booking list only shows a window), so the numbers stay
 * right for a regular with hundreds of games.
 *
 * Vocabulary, fixed here so every field means the same thing:
 *   visit     — a booking that already started and wasn't cancelled or no-showed
 *   completed — status COMPLETED; the tally loyalty is earned on
 *   money     — summed over non-cancelled bookings (a cancelled game is not trade)
 */
var CustomerFavouriteModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'One "most booked" entry — a court, a sport, a slot.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var _games_decorators;
    var _games_initializers = [];
    var _games_extraInitializers = [];
    var CustomerFavouriteModel = _classThis = /** @class */ (function () {
        function CustomerFavouriteModel_1() {
            this.label = __runInitializers(this, _label_initializers, void 0);
            this.games = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _games_initializers, void 0));
            __runInitializers(this, _games_extraInitializers);
        }
        return CustomerFavouriteModel_1;
    }());
    __setFunctionName(_classThis, "CustomerFavouriteModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _label_decorators = [(0, graphql_1.Field)()];
        _games_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, null, _games_decorators, { kind: "field", name: "games", static: false, private: false, access: { has: function (obj) { return "games" in obj; }, get: function (obj) { return obj.games; }, set: function (obj, value) { obj.games = value; } }, metadata: _metadata }, _games_initializers, _games_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerFavouriteModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerFavouriteModel = _classThis;
}();
exports.CustomerFavouriteModel = CustomerFavouriteModel;
var CustomerHourBucketModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Visits starting in one Nepal-time hour of the day (0–23).' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _hour_decorators;
    var _hour_initializers = [];
    var _hour_extraInitializers = [];
    var _games_decorators;
    var _games_initializers = [];
    var _games_extraInitializers = [];
    var CustomerHourBucketModel = _classThis = /** @class */ (function () {
        function CustomerHourBucketModel_1() {
            this.hour = __runInitializers(this, _hour_initializers, void 0);
            this.games = (__runInitializers(this, _hour_extraInitializers), __runInitializers(this, _games_initializers, void 0));
            __runInitializers(this, _games_extraInitializers);
        }
        return CustomerHourBucketModel_1;
    }());
    __setFunctionName(_classThis, "CustomerHourBucketModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _hour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _games_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _hour_decorators, { kind: "field", name: "hour", static: false, private: false, access: { has: function (obj) { return "hour" in obj; }, get: function (obj) { return obj.hour; }, set: function (obj, value) { obj.hour = value; } }, metadata: _metadata }, _hour_initializers, _hour_extraInitializers);
        __esDecorate(null, null, _games_decorators, { kind: "field", name: "games", static: false, private: false, access: { has: function (obj) { return "games" in obj; }, get: function (obj) { return obj.games; }, set: function (obj, value) { obj.games = value; } }, metadata: _metadata }, _games_initializers, _games_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerHourBucketModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerHourBucketModel = _classThis;
}();
exports.CustomerHourBucketModel = CustomerHourBucketModel;
var CustomerMonthModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'One Nepal calendar month of play, for the trend strip.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _month_decorators;
    var _month_initializers = [];
    var _month_extraInitializers = [];
    var _games_decorators;
    var _games_initializers = [];
    var _games_extraInitializers = [];
    var _spend_decorators;
    var _spend_initializers = [];
    var _spend_extraInitializers = [];
    var CustomerMonthModel = _classThis = /** @class */ (function () {
        function CustomerMonthModel_1() {
            this.month = __runInitializers(this, _month_initializers, void 0);
            this.games = (__runInitializers(this, _month_extraInitializers), __runInitializers(this, _games_initializers, void 0));
            this.spend = (__runInitializers(this, _games_extraInitializers), __runInitializers(this, _spend_initializers, void 0));
            __runInitializers(this, _spend_extraInitializers);
        }
        return CustomerMonthModel_1;
    }());
    __setFunctionName(_classThis, "CustomerMonthModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _month_decorators = [(0, graphql_1.Field)({ description: 'Nepal month as "YYYY-MM".' })];
        _games_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _spend_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        __esDecorate(null, null, _month_decorators, { kind: "field", name: "month", static: false, private: false, access: { has: function (obj) { return "month" in obj; }, get: function (obj) { return obj.month; }, set: function (obj, value) { obj.month = value; } }, metadata: _metadata }, _month_initializers, _month_extraInitializers);
        __esDecorate(null, null, _games_decorators, { kind: "field", name: "games", static: false, private: false, access: { has: function (obj) { return "games" in obj; }, get: function (obj) { return obj.games; }, set: function (obj, value) { obj.games = value; } }, metadata: _metadata }, _games_initializers, _games_extraInitializers);
        __esDecorate(null, null, _spend_decorators, { kind: "field", name: "spend", static: false, private: false, access: { has: function (obj) { return "spend" in obj; }, get: function (obj) { return obj.spend; }, set: function (obj, value) { obj.spend = value; } }, metadata: _metadata }, _spend_initializers, _spend_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerMonthModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerMonthModel = _classThis;
}();
exports.CustomerMonthModel = CustomerMonthModel;
var CustomerLoyaltyModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "Loyalty standing under the venue's every-Nth free-game offer." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _configured_decorators;
    var _configured_initializers = [];
    var _configured_extraInitializers = [];
    var _every_decorators;
    var _every_initializers = [];
    var _every_extraInitializers = [];
    var _gamesPlayed_decorators;
    var _gamesPlayed_initializers = [];
    var _gamesPlayed_extraInitializers = [];
    var _toNext_decorators;
    var _toNext_initializers = [];
    var _toNext_extraInitializers = [];
    var _ready_decorators;
    var _ready_initializers = [];
    var _ready_extraInitializers = [];
    var _redeemed_decorators;
    var _redeemed_initializers = [];
    var _redeemed_extraInitializers = [];
    var _offerId_decorators;
    var _offerId_initializers = [];
    var _offerId_extraInitializers = [];
    var CustomerLoyaltyModel = _classThis = /** @class */ (function () {
        function CustomerLoyaltyModel_1() {
            this.configured = __runInitializers(this, _configured_initializers, void 0);
            this.every = (__runInitializers(this, _configured_extraInitializers), __runInitializers(this, _every_initializers, void 0));
            this.gamesPlayed = (__runInitializers(this, _every_extraInitializers), __runInitializers(this, _gamesPlayed_initializers, void 0));
            this.toNext = (__runInitializers(this, _gamesPlayed_extraInitializers), __runInitializers(this, _toNext_initializers, void 0));
            this.ready = (__runInitializers(this, _toNext_extraInitializers), __runInitializers(this, _ready_initializers, void 0));
            this.redeemed = (__runInitializers(this, _ready_extraInitializers), __runInitializers(this, _redeemed_initializers, void 0));
            this.offerId = (__runInitializers(this, _redeemed_extraInitializers), __runInitializers(this, _offerId_initializers, void 0));
            __runInitializers(this, _offerId_extraInitializers);
        }
        return CustomerLoyaltyModel_1;
    }());
    __setFunctionName(_classThis, "CustomerLoyaltyModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _configured_decorators = [(0, graphql_1.Field)({ description: 'The venue runs an every-Nth loyalty offer right now.' })];
        _every_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'Games per free game (N).' })];
        _gamesPlayed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Qualifying games in the current cycle count.' })];
        _toNext_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Games still to play before the next free one.' })];
        _ready_decorators = [(0, graphql_1.Field)({ description: 'A free game is available to redeem now.' })];
        _redeemed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Free games already given to this customer.' })];
        _offerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true })];
        __esDecorate(null, null, _configured_decorators, { kind: "field", name: "configured", static: false, private: false, access: { has: function (obj) { return "configured" in obj; }, get: function (obj) { return obj.configured; }, set: function (obj, value) { obj.configured = value; } }, metadata: _metadata }, _configured_initializers, _configured_extraInitializers);
        __esDecorate(null, null, _every_decorators, { kind: "field", name: "every", static: false, private: false, access: { has: function (obj) { return "every" in obj; }, get: function (obj) { return obj.every; }, set: function (obj, value) { obj.every = value; } }, metadata: _metadata }, _every_initializers, _every_extraInitializers);
        __esDecorate(null, null, _gamesPlayed_decorators, { kind: "field", name: "gamesPlayed", static: false, private: false, access: { has: function (obj) { return "gamesPlayed" in obj; }, get: function (obj) { return obj.gamesPlayed; }, set: function (obj, value) { obj.gamesPlayed = value; } }, metadata: _metadata }, _gamesPlayed_initializers, _gamesPlayed_extraInitializers);
        __esDecorate(null, null, _toNext_decorators, { kind: "field", name: "toNext", static: false, private: false, access: { has: function (obj) { return "toNext" in obj; }, get: function (obj) { return obj.toNext; }, set: function (obj, value) { obj.toNext = value; } }, metadata: _metadata }, _toNext_initializers, _toNext_extraInitializers);
        __esDecorate(null, null, _ready_decorators, { kind: "field", name: "ready", static: false, private: false, access: { has: function (obj) { return "ready" in obj; }, get: function (obj) { return obj.ready; }, set: function (obj, value) { obj.ready = value; } }, metadata: _metadata }, _ready_initializers, _ready_extraInitializers);
        __esDecorate(null, null, _redeemed_decorators, { kind: "field", name: "redeemed", static: false, private: false, access: { has: function (obj) { return "redeemed" in obj; }, get: function (obj) { return obj.redeemed; }, set: function (obj, value) { obj.redeemed = value; } }, metadata: _metadata }, _redeemed_initializers, _redeemed_extraInitializers);
        __esDecorate(null, null, _offerId_decorators, { kind: "field", name: "offerId", static: false, private: false, access: { has: function (obj) { return "offerId" in obj; }, get: function (obj) { return obj.offerId; }, set: function (obj, value) { obj.offerId = value; } }, metadata: _metadata }, _offerId_initializers, _offerId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomerLoyaltyModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomerLoyaltyModel = _classThis;
}();
exports.CustomerLoyaltyModel = CustomerLoyaltyModel;
var VenueCustomerInsightsModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A customer's play history at one venue, aggregated." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _totalBookings_decorators;
    var _totalBookings_initializers = [];
    var _totalBookings_extraInitializers = [];
    var _visits_decorators;
    var _visits_initializers = [];
    var _visits_extraInitializers = [];
    var _completed_decorators;
    var _completed_initializers = [];
    var _completed_extraInitializers = [];
    var _cancelled_decorators;
    var _cancelled_initializers = [];
    var _cancelled_extraInitializers = [];
    var _noShow_decorators;
    var _noShow_initializers = [];
    var _noShow_extraInitializers = [];
    var _upcoming_decorators;
    var _upcoming_initializers = [];
    var _upcoming_extraInitializers = [];
    var _freeGames_decorators;
    var _freeGames_initializers = [];
    var _freeGames_extraInitializers = [];
    var _walkInBookings_decorators;
    var _walkInBookings_initializers = [];
    var _walkInBookings_extraInitializers = [];
    var _onlineBookings_decorators;
    var _onlineBookings_initializers = [];
    var _onlineBookings_extraInitializers = [];
    var _membershipBookings_decorators;
    var _membershipBookings_initializers = [];
    var _membershipBookings_extraInitializers = [];
    var _hoursPlayed_decorators;
    var _hoursPlayed_initializers = [];
    var _hoursPlayed_extraInitializers = [];
    var _avgSessionMinutes_decorators;
    var _avgSessionMinutes_initializers = [];
    var _avgSessionMinutes_extraInitializers = [];
    var _visitsPerMonth_decorators;
    var _visitsPerMonth_initializers = [];
    var _visitsPerMonth_extraInitializers = [];
    var _lifetimeBilled_decorators;
    var _lifetimeBilled_initializers = [];
    var _lifetimeBilled_extraInitializers = [];
    var _lifetimePaid_decorators;
    var _lifetimePaid_initializers = [];
    var _lifetimePaid_extraInitializers = [];
    var _outstanding_decorators;
    var _outstanding_initializers = [];
    var _outstanding_extraInitializers = [];
    var _avgSpendPerVisit_decorators;
    var _avgSpendPerVisit_initializers = [];
    var _avgSpendPerVisit_extraInitializers = [];
    var _totalDiscount_decorators;
    var _totalDiscount_initializers = [];
    var _totalDiscount_extraInitializers = [];
    var _firstVisitAt_decorators;
    var _firstVisitAt_initializers = [];
    var _firstVisitAt_extraInitializers = [];
    var _lastVisitAt_decorators;
    var _lastVisitAt_initializers = [];
    var _lastVisitAt_extraInitializers = [];
    var _nextVisitAt_decorators;
    var _nextVisitAt_initializers = [];
    var _nextVisitAt_extraInitializers = [];
    var _topCourts_decorators;
    var _topCourts_initializers = [];
    var _topCourts_extraInitializers = [];
    var _topSports_decorators;
    var _topSports_initializers = [];
    var _topSports_extraInitializers = [];
    var _weekdayGames_decorators;
    var _weekdayGames_initializers = [];
    var _weekdayGames_extraInitializers = [];
    var _hourGames_decorators;
    var _hourGames_initializers = [];
    var _hourGames_extraInitializers = [];
    var _monthlyPlay_decorators;
    var _monthlyPlay_initializers = [];
    var _monthlyPlay_extraInitializers = [];
    var _loyalty_decorators;
    var _loyalty_initializers = [];
    var _loyalty_extraInitializers = [];
    var VenueCustomerInsightsModel = _classThis = /** @class */ (function () {
        function VenueCustomerInsightsModel_1() {
            // ─── Counts ───────────────────────────────────────────────────────────────
            this.totalBookings = __runInitializers(this, _totalBookings_initializers, void 0);
            this.visits = (__runInitializers(this, _totalBookings_extraInitializers), __runInitializers(this, _visits_initializers, void 0));
            this.completed = (__runInitializers(this, _visits_extraInitializers), __runInitializers(this, _completed_initializers, void 0));
            this.cancelled = (__runInitializers(this, _completed_extraInitializers), __runInitializers(this, _cancelled_initializers, void 0));
            this.noShow = (__runInitializers(this, _cancelled_extraInitializers), __runInitializers(this, _noShow_initializers, void 0));
            this.upcoming = (__runInitializers(this, _noShow_extraInitializers), __runInitializers(this, _upcoming_initializers, void 0));
            this.freeGames = (__runInitializers(this, _upcoming_extraInitializers), __runInitializers(this, _freeGames_initializers, void 0));
            // ─── Where the bookings come from ─────────────────────────────────────────
            this.walkInBookings = (__runInitializers(this, _freeGames_extraInitializers), __runInitializers(this, _walkInBookings_initializers, void 0));
            this.onlineBookings = (__runInitializers(this, _walkInBookings_extraInitializers), __runInitializers(this, _onlineBookings_initializers, void 0));
            this.membershipBookings = (__runInitializers(this, _onlineBookings_extraInitializers), __runInitializers(this, _membershipBookings_initializers, void 0));
            // ─── Time on court ────────────────────────────────────────────────────────
            this.hoursPlayed = (__runInitializers(this, _membershipBookings_extraInitializers), __runInitializers(this, _hoursPlayed_initializers, void 0));
            this.avgSessionMinutes = (__runInitializers(this, _hoursPlayed_extraInitializers), __runInitializers(this, _avgSessionMinutes_initializers, void 0));
            this.visitsPerMonth = (__runInitializers(this, _avgSessionMinutes_extraInitializers), __runInitializers(this, _visitsPerMonth_initializers, void 0));
            // ─── Money ────────────────────────────────────────────────────────────────
            this.lifetimeBilled = (__runInitializers(this, _visitsPerMonth_extraInitializers), __runInitializers(this, _lifetimeBilled_initializers, void 0));
            this.lifetimePaid = (__runInitializers(this, _lifetimeBilled_extraInitializers), __runInitializers(this, _lifetimePaid_initializers, void 0));
            this.outstanding = (__runInitializers(this, _lifetimePaid_extraInitializers), __runInitializers(this, _outstanding_initializers, void 0));
            this.avgSpendPerVisit = (__runInitializers(this, _outstanding_extraInitializers), __runInitializers(this, _avgSpendPerVisit_initializers, void 0));
            this.totalDiscount = (__runInitializers(this, _avgSpendPerVisit_extraInitializers), __runInitializers(this, _totalDiscount_initializers, void 0));
            // ─── Dates ────────────────────────────────────────────────────────────────
            this.firstVisitAt = (__runInitializers(this, _totalDiscount_extraInitializers), __runInitializers(this, _firstVisitAt_initializers, void 0));
            this.lastVisitAt = (__runInitializers(this, _firstVisitAt_extraInitializers), __runInitializers(this, _lastVisitAt_initializers, void 0));
            this.nextVisitAt = (__runInitializers(this, _lastVisitAt_extraInitializers), __runInitializers(this, _nextVisitAt_initializers, void 0));
            // ─── Preferences ──────────────────────────────────────────────────────────
            this.topCourts = (__runInitializers(this, _nextVisitAt_extraInitializers), __runInitializers(this, _topCourts_initializers, void 0));
            this.topSports = (__runInitializers(this, _topCourts_extraInitializers), __runInitializers(this, _topSports_initializers, void 0));
            this.weekdayGames = (__runInitializers(this, _topSports_extraInitializers), __runInitializers(this, _weekdayGames_initializers, void 0));
            this.hourGames = (__runInitializers(this, _weekdayGames_extraInitializers), __runInitializers(this, _hourGames_initializers, void 0));
            // ─── Trend ────────────────────────────────────────────────────────────────
            this.monthlyPlay = (__runInitializers(this, _hourGames_extraInitializers), __runInitializers(this, _monthlyPlay_initializers, void 0));
            this.loyalty = (__runInitializers(this, _monthlyPlay_extraInitializers), __runInitializers(this, _loyalty_initializers, void 0));
            __runInitializers(this, _loyalty_extraInitializers);
        }
        return VenueCustomerInsightsModel_1;
    }());
    __setFunctionName(_classThis, "VenueCustomerInsightsModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _totalBookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Every booking ever made, whatever its state.' })];
        _visits_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                description: 'Games that actually happened (started, not cancelled/no-show).',
            })];
        _completed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Bookings closed as COMPLETED — the loyalty tally.' })];
        _cancelled_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _noShow_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _upcoming_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Live bookings still in the future.' })];
        _freeGames_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Games taken free under a loyalty offer.' })];
        _walkInBookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _onlineBookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _membershipBookings_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _hoursPlayed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Hours played across all visits.' })];
        _avgSessionMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Typical session length, in minutes.' })];
        _visitsPerMonth_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'Visits per month since the first one — the regularity number.',
            })];
        _lifetimeBilled_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Billed across non-cancelled bookings.' })];
        _lifetimePaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Actually collected — matches the list screen\'s "spent".' })];
        _outstanding_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Billed minus paid: what they still owe.' })];
        _avgSpendPerVisit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Average collected per visit.' })];
        _totalDiscount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Discounts and offers given, lifetime.' })];
        _firstVisitAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _lastVisitAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _nextVisitAt_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Their next booking, if one is on the books.' })];
        _topCourts_decorators = [(0, graphql_1.Field)(function () { return [CustomerFavouriteModel]; }, { description: 'Most-played courts, busiest first.' })];
        _topSports_decorators = [(0, graphql_1.Field)(function () { return [CustomerFavouriteModel]; }, { description: 'Most-played sports, busiest first.' })];
        _weekdayGames_decorators = [(0, graphql_1.Field)(function () { return [graphql_1.Int]; }, { description: 'Visits per weekday, Sunday-first (7 entries).' })];
        _hourGames_decorators = [(0, graphql_1.Field)(function () { return [CustomerHourBucketModel]; }, {
                description: 'Visits by Nepal start hour — only hours they have actually played.',
            })];
        _monthlyPlay_decorators = [(0, graphql_1.Field)(function () { return [CustomerMonthModel]; }, { description: 'The last 12 Nepal months, oldest first.' })];
        _loyalty_decorators = [(0, graphql_1.Field)(function () { return CustomerLoyaltyModel; })];
        __esDecorate(null, null, _totalBookings_decorators, { kind: "field", name: "totalBookings", static: false, private: false, access: { has: function (obj) { return "totalBookings" in obj; }, get: function (obj) { return obj.totalBookings; }, set: function (obj, value) { obj.totalBookings = value; } }, metadata: _metadata }, _totalBookings_initializers, _totalBookings_extraInitializers);
        __esDecorate(null, null, _visits_decorators, { kind: "field", name: "visits", static: false, private: false, access: { has: function (obj) { return "visits" in obj; }, get: function (obj) { return obj.visits; }, set: function (obj, value) { obj.visits = value; } }, metadata: _metadata }, _visits_initializers, _visits_extraInitializers);
        __esDecorate(null, null, _completed_decorators, { kind: "field", name: "completed", static: false, private: false, access: { has: function (obj) { return "completed" in obj; }, get: function (obj) { return obj.completed; }, set: function (obj, value) { obj.completed = value; } }, metadata: _metadata }, _completed_initializers, _completed_extraInitializers);
        __esDecorate(null, null, _cancelled_decorators, { kind: "field", name: "cancelled", static: false, private: false, access: { has: function (obj) { return "cancelled" in obj; }, get: function (obj) { return obj.cancelled; }, set: function (obj, value) { obj.cancelled = value; } }, metadata: _metadata }, _cancelled_initializers, _cancelled_extraInitializers);
        __esDecorate(null, null, _noShow_decorators, { kind: "field", name: "noShow", static: false, private: false, access: { has: function (obj) { return "noShow" in obj; }, get: function (obj) { return obj.noShow; }, set: function (obj, value) { obj.noShow = value; } }, metadata: _metadata }, _noShow_initializers, _noShow_extraInitializers);
        __esDecorate(null, null, _upcoming_decorators, { kind: "field", name: "upcoming", static: false, private: false, access: { has: function (obj) { return "upcoming" in obj; }, get: function (obj) { return obj.upcoming; }, set: function (obj, value) { obj.upcoming = value; } }, metadata: _metadata }, _upcoming_initializers, _upcoming_extraInitializers);
        __esDecorate(null, null, _freeGames_decorators, { kind: "field", name: "freeGames", static: false, private: false, access: { has: function (obj) { return "freeGames" in obj; }, get: function (obj) { return obj.freeGames; }, set: function (obj, value) { obj.freeGames = value; } }, metadata: _metadata }, _freeGames_initializers, _freeGames_extraInitializers);
        __esDecorate(null, null, _walkInBookings_decorators, { kind: "field", name: "walkInBookings", static: false, private: false, access: { has: function (obj) { return "walkInBookings" in obj; }, get: function (obj) { return obj.walkInBookings; }, set: function (obj, value) { obj.walkInBookings = value; } }, metadata: _metadata }, _walkInBookings_initializers, _walkInBookings_extraInitializers);
        __esDecorate(null, null, _onlineBookings_decorators, { kind: "field", name: "onlineBookings", static: false, private: false, access: { has: function (obj) { return "onlineBookings" in obj; }, get: function (obj) { return obj.onlineBookings; }, set: function (obj, value) { obj.onlineBookings = value; } }, metadata: _metadata }, _onlineBookings_initializers, _onlineBookings_extraInitializers);
        __esDecorate(null, null, _membershipBookings_decorators, { kind: "field", name: "membershipBookings", static: false, private: false, access: { has: function (obj) { return "membershipBookings" in obj; }, get: function (obj) { return obj.membershipBookings; }, set: function (obj, value) { obj.membershipBookings = value; } }, metadata: _metadata }, _membershipBookings_initializers, _membershipBookings_extraInitializers);
        __esDecorate(null, null, _hoursPlayed_decorators, { kind: "field", name: "hoursPlayed", static: false, private: false, access: { has: function (obj) { return "hoursPlayed" in obj; }, get: function (obj) { return obj.hoursPlayed; }, set: function (obj, value) { obj.hoursPlayed = value; } }, metadata: _metadata }, _hoursPlayed_initializers, _hoursPlayed_extraInitializers);
        __esDecorate(null, null, _avgSessionMinutes_decorators, { kind: "field", name: "avgSessionMinutes", static: false, private: false, access: { has: function (obj) { return "avgSessionMinutes" in obj; }, get: function (obj) { return obj.avgSessionMinutes; }, set: function (obj, value) { obj.avgSessionMinutes = value; } }, metadata: _metadata }, _avgSessionMinutes_initializers, _avgSessionMinutes_extraInitializers);
        __esDecorate(null, null, _visitsPerMonth_decorators, { kind: "field", name: "visitsPerMonth", static: false, private: false, access: { has: function (obj) { return "visitsPerMonth" in obj; }, get: function (obj) { return obj.visitsPerMonth; }, set: function (obj, value) { obj.visitsPerMonth = value; } }, metadata: _metadata }, _visitsPerMonth_initializers, _visitsPerMonth_extraInitializers);
        __esDecorate(null, null, _lifetimeBilled_decorators, { kind: "field", name: "lifetimeBilled", static: false, private: false, access: { has: function (obj) { return "lifetimeBilled" in obj; }, get: function (obj) { return obj.lifetimeBilled; }, set: function (obj, value) { obj.lifetimeBilled = value; } }, metadata: _metadata }, _lifetimeBilled_initializers, _lifetimeBilled_extraInitializers);
        __esDecorate(null, null, _lifetimePaid_decorators, { kind: "field", name: "lifetimePaid", static: false, private: false, access: { has: function (obj) { return "lifetimePaid" in obj; }, get: function (obj) { return obj.lifetimePaid; }, set: function (obj, value) { obj.lifetimePaid = value; } }, metadata: _metadata }, _lifetimePaid_initializers, _lifetimePaid_extraInitializers);
        __esDecorate(null, null, _outstanding_decorators, { kind: "field", name: "outstanding", static: false, private: false, access: { has: function (obj) { return "outstanding" in obj; }, get: function (obj) { return obj.outstanding; }, set: function (obj, value) { obj.outstanding = value; } }, metadata: _metadata }, _outstanding_initializers, _outstanding_extraInitializers);
        __esDecorate(null, null, _avgSpendPerVisit_decorators, { kind: "field", name: "avgSpendPerVisit", static: false, private: false, access: { has: function (obj) { return "avgSpendPerVisit" in obj; }, get: function (obj) { return obj.avgSpendPerVisit; }, set: function (obj, value) { obj.avgSpendPerVisit = value; } }, metadata: _metadata }, _avgSpendPerVisit_initializers, _avgSpendPerVisit_extraInitializers);
        __esDecorate(null, null, _totalDiscount_decorators, { kind: "field", name: "totalDiscount", static: false, private: false, access: { has: function (obj) { return "totalDiscount" in obj; }, get: function (obj) { return obj.totalDiscount; }, set: function (obj, value) { obj.totalDiscount = value; } }, metadata: _metadata }, _totalDiscount_initializers, _totalDiscount_extraInitializers);
        __esDecorate(null, null, _firstVisitAt_decorators, { kind: "field", name: "firstVisitAt", static: false, private: false, access: { has: function (obj) { return "firstVisitAt" in obj; }, get: function (obj) { return obj.firstVisitAt; }, set: function (obj, value) { obj.firstVisitAt = value; } }, metadata: _metadata }, _firstVisitAt_initializers, _firstVisitAt_extraInitializers);
        __esDecorate(null, null, _lastVisitAt_decorators, { kind: "field", name: "lastVisitAt", static: false, private: false, access: { has: function (obj) { return "lastVisitAt" in obj; }, get: function (obj) { return obj.lastVisitAt; }, set: function (obj, value) { obj.lastVisitAt = value; } }, metadata: _metadata }, _lastVisitAt_initializers, _lastVisitAt_extraInitializers);
        __esDecorate(null, null, _nextVisitAt_decorators, { kind: "field", name: "nextVisitAt", static: false, private: false, access: { has: function (obj) { return "nextVisitAt" in obj; }, get: function (obj) { return obj.nextVisitAt; }, set: function (obj, value) { obj.nextVisitAt = value; } }, metadata: _metadata }, _nextVisitAt_initializers, _nextVisitAt_extraInitializers);
        __esDecorate(null, null, _topCourts_decorators, { kind: "field", name: "topCourts", static: false, private: false, access: { has: function (obj) { return "topCourts" in obj; }, get: function (obj) { return obj.topCourts; }, set: function (obj, value) { obj.topCourts = value; } }, metadata: _metadata }, _topCourts_initializers, _topCourts_extraInitializers);
        __esDecorate(null, null, _topSports_decorators, { kind: "field", name: "topSports", static: false, private: false, access: { has: function (obj) { return "topSports" in obj; }, get: function (obj) { return obj.topSports; }, set: function (obj, value) { obj.topSports = value; } }, metadata: _metadata }, _topSports_initializers, _topSports_extraInitializers);
        __esDecorate(null, null, _weekdayGames_decorators, { kind: "field", name: "weekdayGames", static: false, private: false, access: { has: function (obj) { return "weekdayGames" in obj; }, get: function (obj) { return obj.weekdayGames; }, set: function (obj, value) { obj.weekdayGames = value; } }, metadata: _metadata }, _weekdayGames_initializers, _weekdayGames_extraInitializers);
        __esDecorate(null, null, _hourGames_decorators, { kind: "field", name: "hourGames", static: false, private: false, access: { has: function (obj) { return "hourGames" in obj; }, get: function (obj) { return obj.hourGames; }, set: function (obj, value) { obj.hourGames = value; } }, metadata: _metadata }, _hourGames_initializers, _hourGames_extraInitializers);
        __esDecorate(null, null, _monthlyPlay_decorators, { kind: "field", name: "monthlyPlay", static: false, private: false, access: { has: function (obj) { return "monthlyPlay" in obj; }, get: function (obj) { return obj.monthlyPlay; }, set: function (obj, value) { obj.monthlyPlay = value; } }, metadata: _metadata }, _monthlyPlay_initializers, _monthlyPlay_extraInitializers);
        __esDecorate(null, null, _loyalty_decorators, { kind: "field", name: "loyalty", static: false, private: false, access: { has: function (obj) { return "loyalty" in obj; }, get: function (obj) { return obj.loyalty; }, set: function (obj, value) { obj.loyalty = value; } }, metadata: _metadata }, _loyalty_initializers, _loyalty_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueCustomerInsightsModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueCustomerInsightsModel = _classThis;
}();
exports.VenueCustomerInsightsModel = VenueCustomerInsightsModel;
