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
exports.PublicCourtResolver = exports.VenueDetailResolver = exports.DiscoveryResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var paginated_venues_1 = require("./dto/paginated-venues");
var slot_model_1 = require("./dto/slot.model");
var venue_detail_model_1 = require("./dto/venue-detail.model");
var venue_card_model_1 = require("./dto/venue-card.model");
var venue_detail_model_2 = require("./dto/venue-detail.model");
/** Player marketplace: browse approved venues. Presigns the list cover images. */
var DiscoveryResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_card_model_1.VenueCard; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venues_decorators;
    var _courtSlots_decorators;
    var _coverImageUrl_decorators;
    var DiscoveryResolver = _classThis = /** @class */ (function () {
        function DiscoveryResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        DiscoveryResolver_1.prototype.venues = function (input) {
            return this.service.browseVenues(input);
        };
        DiscoveryResolver_1.prototype.courtSlots = function (input) {
            return this.service.courtSlots(input);
        };
        DiscoveryResolver_1.prototype.coverImageUrl = function (v) {
            return this.storage.getDownloadUrl(v.coverImageUrl);
        };
        return DiscoveryResolver_1;
    }());
    __setFunctionName(_classThis, "DiscoveryResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venues_decorators = [(0, graphql_1.Query)(function () { return paginated_venues_1.PaginatedVenues; }, {
                name: 'venues',
                description: 'Browse approved venues (player marketplace), filtered + paginated.',
            })];
        _courtSlots_decorators = [(0, graphql_1.Query)(function () { return slot_model_1.CourtSlots; }, {
                name: 'courtSlots',
                description: 'Bookable slots for a court on a venue-local day (booked/past flagged).',
            })];
        _coverImageUrl_decorators = [(0, graphql_1.ResolveField)(function () { return String; }, { nullable: true })];
        __esDecorate(_classThis, null, _venues_decorators, { kind: "method", name: "venues", static: false, private: false, access: { has: function (obj) { return "venues" in obj; }, get: function (obj) { return obj.venues; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _courtSlots_decorators, { kind: "method", name: "courtSlots", static: false, private: false, access: { has: function (obj) { return "courtSlots" in obj; }, get: function (obj) { return obj.courtSlots; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _coverImageUrl_decorators, { kind: "method", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DiscoveryResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DiscoveryResolver = _classThis;
}();
exports.DiscoveryResolver = DiscoveryResolver;
/** Public venue detail; presigns the cover + gallery images. */
var VenueDetailResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_detail_model_2.VenueDetail; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venue_decorators;
    var _coverImageUrl_decorators;
    var _imageUrls_decorators;
    var VenueDetailResolver = _classThis = /** @class */ (function () {
        function VenueDetailResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        VenueDetailResolver_1.prototype.venue = function (venueId) {
            return this.service.venueDetail(venueId);
        };
        VenueDetailResolver_1.prototype.coverImageUrl = function (v) {
            return this.storage.getDownloadUrl(v.coverImageUrl);
        };
        VenueDetailResolver_1.prototype.imageUrls = function (v) {
            return this.storage.getDownloadUrls(v.imageUrls);
        };
        return VenueDetailResolver_1;
    }());
    __setFunctionName(_classThis, "VenueDetailResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venue_decorators = [(0, graphql_1.Query)(function () { return venue_detail_model_2.VenueDetail; }, { name: 'venue', description: 'Public venue detail with its courts.' })];
        _coverImageUrl_decorators = [(0, graphql_1.ResolveField)(function () { return String; }, { nullable: true })];
        _imageUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        __esDecorate(_classThis, null, _venue_decorators, { kind: "method", name: "venue", static: false, private: false, access: { has: function (obj) { return "venue" in obj; }, get: function (obj) { return obj.venue; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _coverImageUrl_decorators, { kind: "method", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _imageUrls_decorators, { kind: "method", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueDetailResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueDetailResolver = _classThis;
}();
exports.VenueDetailResolver = VenueDetailResolver;
/** Presigns court gallery images wherever a PublicCourt is returned. */
var PublicCourtResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_detail_model_1.PublicCourt; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _imageUrls_decorators;
    var PublicCourtResolver = _classThis = /** @class */ (function () {
        function PublicCourtResolver_1(storage) {
            this.storage = (__runInitializers(this, _instanceExtraInitializers), storage);
        }
        PublicCourtResolver_1.prototype.imageUrls = function (court) {
            return this.storage.getDownloadUrls(court.imageUrls);
        };
        return PublicCourtResolver_1;
    }());
    __setFunctionName(_classThis, "PublicCourtResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _imageUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        __esDecorate(_classThis, null, _imageUrls_decorators, { kind: "method", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PublicCourtResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PublicCourtResolver = _classThis;
}();
exports.PublicCourtResolver = PublicCourtResolver;
