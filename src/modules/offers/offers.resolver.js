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
exports.OffersResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var offer_model_1 = require("./dto/offer.model");
var OffersResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return offer_model_1.OfferModel; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venueOffers_decorators;
    var _createOffer_decorators;
    var _updateOffer_decorators;
    var _deleteVenueOffer_decorators;
    var _venueLoyaltyStatus_decorators;
    var _availableOffers_decorators;
    var OffersResolver = _classThis = /** @class */ (function () {
        function OffersResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        // ─── Venue management (requires offers:manage) ──────────────────────────────
        OffersResolver_1.prototype.venueOffers = function (input) {
            return this.service.listVenueOffers(input);
        };
        OffersResolver_1.prototype.createOffer = function (input) {
            return this.service.create(input);
        };
        OffersResolver_1.prototype.updateOffer = function (input) {
            return this.service.update(input);
        };
        OffersResolver_1.prototype.deleteVenueOffer = function (venueId, offerId) {
            return this.service.remove(venueId, offerId);
        };
        OffersResolver_1.prototype.venueLoyaltyStatus = function (input) {
            return this.service.getLoyaltyStatus(input);
        };
        // ─── Player-facing ──────────────────────────────────────────────────────────
        OffersResolver_1.prototype.availableOffers = function (venueId) {
            return this.service.availableOffers(venueId);
        };
        return OffersResolver_1;
    }());
    __setFunctionName(_classThis, "OffersResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueOffers_decorators = [(0, graphql_1.Query)(function () { return offer_model_1.PaginatedOffers; }, {
                name: 'venueOffers',
                description: 'All offers for a venue (management view), paginated.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.offers.manage')];
        _createOffer_decorators = [(0, graphql_1.Mutation)(function () { return offer_model_1.OfferModel; }, {
                name: 'createOffer',
                description: 'Create a venue offer / promo code.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.offers.manage')];
        _updateOffer_decorators = [(0, graphql_1.Mutation)(function () { return offer_model_1.OfferModel; }, {
                name: 'updateOffer',
                description: 'Update / activate / deactivate an offer.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.offers.manage')];
        _deleteVenueOffer_decorators = [(0, graphql_1.Mutation)(function () { return offer_model_1.OfferModel; }, { name: 'deleteVenueOffer', description: 'Delete a venue offer.' }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.offers.manage')];
        _venueLoyaltyStatus_decorators = [(0, graphql_1.Query)(function () { return offer_model_1.LoyaltyStatusModel; }, {
                name: 'venueLoyaltyStatus',
                description: "A subject's loyalty progress toward a free game (by customer or phone).",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _availableOffers_decorators = [(0, graphql_1.Query)(function () { return [offer_model_1.OfferModel]; }, {
                name: 'availableOffers',
                description: 'Currently-redeemable offers for a venue (player view).',
            })];
        __esDecorate(_classThis, null, _venueOffers_decorators, { kind: "method", name: "venueOffers", static: false, private: false, access: { has: function (obj) { return "venueOffers" in obj; }, get: function (obj) { return obj.venueOffers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createOffer_decorators, { kind: "method", name: "createOffer", static: false, private: false, access: { has: function (obj) { return "createOffer" in obj; }, get: function (obj) { return obj.createOffer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateOffer_decorators, { kind: "method", name: "updateOffer", static: false, private: false, access: { has: function (obj) { return "updateOffer" in obj; }, get: function (obj) { return obj.updateOffer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteVenueOffer_decorators, { kind: "method", name: "deleteVenueOffer", static: false, private: false, access: { has: function (obj) { return "deleteVenueOffer" in obj; }, get: function (obj) { return obj.deleteVenueOffer; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueLoyaltyStatus_decorators, { kind: "method", name: "venueLoyaltyStatus", static: false, private: false, access: { has: function (obj) { return "venueLoyaltyStatus" in obj; }, get: function (obj) { return obj.venueLoyaltyStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _availableOffers_decorators, { kind: "method", name: "availableOffers", static: false, private: false, access: { has: function (obj) { return "availableOffers" in obj; }, get: function (obj) { return obj.availableOffers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OffersResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OffersResolver = _classThis;
}();
exports.OffersResolver = OffersResolver;
