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
exports.LoyaltyStatusModel = exports.PaginatedOffers = exports.OfferModel = void 0;
exports.mapOffer = mapOffer;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var pagination_input_1 = require("../../../common/dto/pagination.input");
require("../../../common/enums");
var OfferModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A venue discount / promo code, or a loyalty free-game reward.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _discountType_decorators;
    var _discountType_initializers = [];
    var _discountType_extraInitializers = [];
    var _discountValue_decorators;
    var _discountValue_initializers = [];
    var _discountValue_extraInitializers = [];
    var _maxDiscount_decorators;
    var _maxDiscount_initializers = [];
    var _maxDiscount_extraInitializers = [];
    var _minSubtotal_decorators;
    var _minSubtotal_initializers = [];
    var _minSubtotal_extraInitializers = [];
    var _trigger_decorators;
    var _trigger_initializers = [];
    var _trigger_extraInitializers = [];
    var _audience_decorators;
    var _audience_initializers = [];
    var _audience_extraInitializers = [];
    var _everyGames_decorators;
    var _everyGames_initializers = [];
    var _everyGames_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _validFrom_decorators;
    var _validFrom_initializers = [];
    var _validFrom_extraInitializers = [];
    var _validUntil_decorators;
    var _validUntil_initializers = [];
    var _validUntil_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _usageLimit_decorators;
    var _usageLimit_initializers = [];
    var _usageLimit_extraInitializers = [];
    var _usageCount_decorators;
    var _usageCount_initializers = [];
    var _usageCount_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var OfferModel = _classThis = /** @class */ (function () {
        function OfferModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.title = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.discountType = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _discountType_initializers, void 0));
            this.discountValue = (__runInitializers(this, _discountType_extraInitializers), __runInitializers(this, _discountValue_initializers, void 0));
            this.maxDiscount = (__runInitializers(this, _discountValue_extraInitializers), __runInitializers(this, _maxDiscount_initializers, void 0));
            this.minSubtotal = (__runInitializers(this, _maxDiscount_extraInitializers), __runInitializers(this, _minSubtotal_initializers, void 0));
            this.trigger = (__runInitializers(this, _minSubtotal_extraInitializers), __runInitializers(this, _trigger_initializers, void 0));
            this.audience = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _audience_initializers, void 0));
            this.everyGames = (__runInitializers(this, _audience_extraInitializers), __runInitializers(this, _everyGames_initializers, void 0));
            this.code = (__runInitializers(this, _everyGames_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            this.validFrom = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _validFrom_initializers, void 0));
            this.validUntil = (__runInitializers(this, _validFrom_extraInitializers), __runInitializers(this, _validUntil_initializers, void 0));
            this.isActive = (__runInitializers(this, _validUntil_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.usageLimit = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _usageLimit_initializers, void 0));
            this.usageCount = (__runInitializers(this, _usageLimit_extraInitializers), __runInitializers(this, _usageCount_initializers, void 0));
            this.createdAt = (__runInitializers(this, _usageCount_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return OfferModel_1;
    }());
    __setFunctionName(_classThis, "OfferModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _title_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _discountType_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferDiscountType; })];
        _discountValue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Percent (0–100) for PERCENT, or a flat amount for FLAT.' })];
        _maxDiscount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Cap on a PERCENT discount.' })];
        _minSubtotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Minimum booking subtotal to qualify.' })];
        _trigger_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferTrigger; })];
        _audience_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferAudience; })];
        _everyGames_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'For EVERY_NTH: free game every N games.' })];
        _code_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Promo code (upper-cased); null = always-listed offer.' })];
        _validFrom_decorators = [(0, graphql_1.Field)()];
        _validUntil_decorators = [(0, graphql_1.Field)(function () { return Date; }, { nullable: true, description: 'Null = open-ended; runs until switched off.' })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _usageLimit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _usageCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _discountType_decorators, { kind: "field", name: "discountType", static: false, private: false, access: { has: function (obj) { return "discountType" in obj; }, get: function (obj) { return obj.discountType; }, set: function (obj, value) { obj.discountType = value; } }, metadata: _metadata }, _discountType_initializers, _discountType_extraInitializers);
        __esDecorate(null, null, _discountValue_decorators, { kind: "field", name: "discountValue", static: false, private: false, access: { has: function (obj) { return "discountValue" in obj; }, get: function (obj) { return obj.discountValue; }, set: function (obj, value) { obj.discountValue = value; } }, metadata: _metadata }, _discountValue_initializers, _discountValue_extraInitializers);
        __esDecorate(null, null, _maxDiscount_decorators, { kind: "field", name: "maxDiscount", static: false, private: false, access: { has: function (obj) { return "maxDiscount" in obj; }, get: function (obj) { return obj.maxDiscount; }, set: function (obj, value) { obj.maxDiscount = value; } }, metadata: _metadata }, _maxDiscount_initializers, _maxDiscount_extraInitializers);
        __esDecorate(null, null, _minSubtotal_decorators, { kind: "field", name: "minSubtotal", static: false, private: false, access: { has: function (obj) { return "minSubtotal" in obj; }, get: function (obj) { return obj.minSubtotal; }, set: function (obj, value) { obj.minSubtotal = value; } }, metadata: _metadata }, _minSubtotal_initializers, _minSubtotal_extraInitializers);
        __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: function (obj) { return "trigger" in obj; }, get: function (obj) { return obj.trigger; }, set: function (obj, value) { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
        __esDecorate(null, null, _audience_decorators, { kind: "field", name: "audience", static: false, private: false, access: { has: function (obj) { return "audience" in obj; }, get: function (obj) { return obj.audience; }, set: function (obj, value) { obj.audience = value; } }, metadata: _metadata }, _audience_initializers, _audience_extraInitializers);
        __esDecorate(null, null, _everyGames_decorators, { kind: "field", name: "everyGames", static: false, private: false, access: { has: function (obj) { return "everyGames" in obj; }, get: function (obj) { return obj.everyGames; }, set: function (obj, value) { obj.everyGames = value; } }, metadata: _metadata }, _everyGames_initializers, _everyGames_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _validFrom_decorators, { kind: "field", name: "validFrom", static: false, private: false, access: { has: function (obj) { return "validFrom" in obj; }, get: function (obj) { return obj.validFrom; }, set: function (obj, value) { obj.validFrom = value; } }, metadata: _metadata }, _validFrom_initializers, _validFrom_extraInitializers);
        __esDecorate(null, null, _validUntil_decorators, { kind: "field", name: "validUntil", static: false, private: false, access: { has: function (obj) { return "validUntil" in obj; }, get: function (obj) { return obj.validUntil; }, set: function (obj, value) { obj.validUntil = value; } }, metadata: _metadata }, _validUntil_initializers, _validUntil_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _usageLimit_decorators, { kind: "field", name: "usageLimit", static: false, private: false, access: { has: function (obj) { return "usageLimit" in obj; }, get: function (obj) { return obj.usageLimit; }, set: function (obj, value) { obj.usageLimit = value; } }, metadata: _metadata }, _usageLimit_initializers, _usageLimit_extraInitializers);
        __esDecorate(null, null, _usageCount_decorators, { kind: "field", name: "usageCount", static: false, private: false, access: { has: function (obj) { return "usageCount" in obj; }, get: function (obj) { return obj.usageCount; }, set: function (obj, value) { obj.usageCount = value; } }, metadata: _metadata }, _usageCount_initializers, _usageCount_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OfferModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OfferModel = _classThis;
}();
exports.OfferModel = OfferModel;
var PaginatedOffers = function () {
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
    var PaginatedOffers = _classThis = /** @class */ (function () {
        function PaginatedOffers_1() {
            this.items = __runInitializers(this, _items_initializers, void 0);
            this.pageInfo = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pageInfo_initializers, void 0));
            __runInitializers(this, _pageInfo_extraInitializers);
        }
        return PaginatedOffers_1;
    }());
    __setFunctionName(_classThis, "PaginatedOffers");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _items_decorators = [(0, graphql_1.Field)(function () { return [OfferModel]; })];
        _pageInfo_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PageInfo; })];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _pageInfo_decorators, { kind: "field", name: "pageInfo", static: false, private: false, access: { has: function (obj) { return "pageInfo" in obj; }, get: function (obj) { return obj.pageInfo; }, set: function (obj, value) { obj.pageInfo = value; } }, metadata: _metadata }, _pageInfo_initializers, _pageInfo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginatedOffers = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginatedOffers = _classThis;
}();
exports.PaginatedOffers = PaginatedOffers;
var LoyaltyStatusModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A subject's loyalty progress toward a free game at a venue." })];
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
    var _offerId_decorators;
    var _offerId_initializers = [];
    var _offerId_extraInitializers = [];
    var LoyaltyStatusModel = _classThis = /** @class */ (function () {
        function LoyaltyStatusModel_1() {
            this.configured = __runInitializers(this, _configured_initializers, void 0);
            this.every = (__runInitializers(this, _configured_extraInitializers), __runInitializers(this, _every_initializers, void 0));
            this.gamesPlayed = (__runInitializers(this, _every_extraInitializers), __runInitializers(this, _gamesPlayed_initializers, void 0));
            this.toNext = (__runInitializers(this, _gamesPlayed_extraInitializers), __runInitializers(this, _toNext_initializers, void 0));
            this.ready = (__runInitializers(this, _toNext_extraInitializers), __runInitializers(this, _ready_initializers, void 0));
            this.offerId = (__runInitializers(this, _ready_extraInitializers), __runInitializers(this, _offerId_initializers, void 0));
            __runInitializers(this, _offerId_extraInitializers);
        }
        return LoyaltyStatusModel_1;
    }());
    __setFunctionName(_classThis, "LoyaltyStatusModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _configured_decorators = [(0, graphql_1.Field)({ description: 'Whether the venue has an active loyalty offer for this audience.' })];
        _every_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'Free game every N games (when configured).' })];
        _gamesPlayed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Qualifying completed games toward the current cycle.' })];
        _toNext_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Games remaining to the next free game (0 = ready now).' })];
        _ready_decorators = [(0, graphql_1.Field)({ description: 'A free game is available to redeem now.' })];
        _offerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true, description: 'The loyalty offer to redeem, when ready.' })];
        __esDecorate(null, null, _configured_decorators, { kind: "field", name: "configured", static: false, private: false, access: { has: function (obj) { return "configured" in obj; }, get: function (obj) { return obj.configured; }, set: function (obj, value) { obj.configured = value; } }, metadata: _metadata }, _configured_initializers, _configured_extraInitializers);
        __esDecorate(null, null, _every_decorators, { kind: "field", name: "every", static: false, private: false, access: { has: function (obj) { return "every" in obj; }, get: function (obj) { return obj.every; }, set: function (obj, value) { obj.every = value; } }, metadata: _metadata }, _every_initializers, _every_extraInitializers);
        __esDecorate(null, null, _gamesPlayed_decorators, { kind: "field", name: "gamesPlayed", static: false, private: false, access: { has: function (obj) { return "gamesPlayed" in obj; }, get: function (obj) { return obj.gamesPlayed; }, set: function (obj, value) { obj.gamesPlayed = value; } }, metadata: _metadata }, _gamesPlayed_initializers, _gamesPlayed_extraInitializers);
        __esDecorate(null, null, _toNext_decorators, { kind: "field", name: "toNext", static: false, private: false, access: { has: function (obj) { return "toNext" in obj; }, get: function (obj) { return obj.toNext; }, set: function (obj, value) { obj.toNext = value; } }, metadata: _metadata }, _toNext_initializers, _toNext_extraInitializers);
        __esDecorate(null, null, _ready_decorators, { kind: "field", name: "ready", static: false, private: false, access: { has: function (obj) { return "ready" in obj; }, get: function (obj) { return obj.ready; }, set: function (obj, value) { obj.ready = value; } }, metadata: _metadata }, _ready_initializers, _ready_extraInitializers);
        __esDecorate(null, null, _offerId_decorators, { kind: "field", name: "offerId", static: false, private: false, access: { has: function (obj) { return "offerId" in obj; }, get: function (obj) { return obj.offerId; }, set: function (obj, value) { obj.offerId = value; } }, metadata: _metadata }, _offerId_initializers, _offerId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoyaltyStatusModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoyaltyStatusModel = _classThis;
}();
exports.LoyaltyStatusModel = LoyaltyStatusModel;
function num(v) {
    return Number(v.toString());
}
/**
 * Map an offer for the client. `usageCount` is served from the REAL redemption count
 * (non-cancelled bookings carrying the offer), passed in by the service — not the stale
 * stored counter — so it stays accurate as bookings are cancelled. Defaults to 0.
 */
function mapOffer(o, redemptions) {
    var _a, _b, _c, _d;
    if (redemptions === void 0) { redemptions = 0; }
    return {
        id: o.id,
        venueId: o.venueId,
        title: o.title,
        description: (_a = o.description) !== null && _a !== void 0 ? _a : undefined,
        discountType: o.discountType,
        discountValue: num(o.discountValue),
        maxDiscount: o.maxDiscount == null ? undefined : num(o.maxDiscount),
        minSubtotal: num(o.minSubtotal),
        trigger: o.trigger,
        audience: o.audience,
        everyGames: (_b = o.everyGames) !== null && _b !== void 0 ? _b : undefined,
        code: (_c = o.code) !== null && _c !== void 0 ? _c : undefined,
        validFrom: o.validFrom,
        validUntil: o.validUntil,
        isActive: o.isActive,
        usageLimit: (_d = o.usageLimit) !== null && _d !== void 0 ? _d : undefined,
        usageCount: redemptions,
        createdAt: o.createdAt,
    };
}
