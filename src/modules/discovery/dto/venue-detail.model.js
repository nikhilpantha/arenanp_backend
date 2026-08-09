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
exports.VenueDetail = exports.PublicCourt = exports.PublicAdditionalService = void 0;
exports.mapVenueDetail = mapVenueDetail;
var graphql_1 = require("@nestjs/graphql");
var sport_stub_model_1 = require("../../admin/sports/dto/sport-stub.model");
var PublicAdditionalService = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'An extra paid/free service a venue offers (equipment, café, …).' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var PublicAdditionalService = _classThis = /** @class */ (function () {
        function PublicAdditionalService_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.price = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            __runInitializers(this, _price_extraInitializers);
        }
        return PublicAdditionalService_1;
    }());
    __setFunctionName(_classThis, "PublicAdditionalService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, graphql_1.Field)()];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PublicAdditionalService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PublicAdditionalService = _classThis;
}();
exports.PublicAdditionalService = PublicAdditionalService;
var PublicCourt = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A bookable court shown in the player marketplace.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _slotMinutes_decorators;
    var _slotMinutes_initializers = [];
    var _slotMinutes_extraInitializers = [];
    var _features_decorators;
    var _features_initializers = [];
    var _features_extraInitializers = [];
    var PublicCourt = _classThis = /** @class */ (function () {
        function PublicCourt_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.sport = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.pricePerHour = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            this.slotMinutes = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _slotMinutes_initializers, void 0));
            this.features = (__runInitializers(this, _slotMinutes_extraInitializers), __runInitializers(this, _features_initializers, void 0));
            /** Stored S3 object keys; presigned by PublicCourtResolver. */
            this.imageUrls = __runInitializers(this, _features_extraInitializers);
        }
        return PublicCourt_1;
    }());
    __setFunctionName(_classThis, "PublicCourt");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _slotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _features_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _slotMinutes_decorators, { kind: "field", name: "slotMinutes", static: false, private: false, access: { has: function (obj) { return "slotMinutes" in obj; }, get: function (obj) { return obj.slotMinutes; }, set: function (obj, value) { obj.slotMinutes = value; } }, metadata: _metadata }, _slotMinutes_initializers, _slotMinutes_extraInitializers);
        __esDecorate(null, null, _features_decorators, { kind: "field", name: "features", static: false, private: false, access: { has: function (obj) { return "features" in obj; }, get: function (obj) { return obj.features; }, set: function (obj, value) { obj.features = value; } }, metadata: _metadata }, _features_initializers, _features_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PublicCourt = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PublicCourt = _classThis;
}();
exports.PublicCourt = PublicCourt;
var VenueDetail = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Public venue detail with its bookable courts.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _contactPhone_decorators;
    var _contactPhone_initializers = [];
    var _contactPhone_extraInitializers = [];
    var _amenities_decorators;
    var _amenities_initializers = [];
    var _amenities_extraInitializers = [];
    var _additionalServices_decorators;
    var _additionalServices_initializers = [];
    var _additionalServices_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _courts_decorators;
    var _courts_initializers = [];
    var _courts_extraInitializers = [];
    var _openTime_decorators;
    var _openTime_initializers = [];
    var _openTime_extraInitializers = [];
    var _closeTime_decorators;
    var _closeTime_initializers = [];
    var _closeTime_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var VenueDetail = _classThis = /** @class */ (function () {
        function VenueDetail_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.city = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.address = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.contactPhone = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _contactPhone_initializers, void 0));
            /** Stored S3 object key; presigned by VenueDetailResolver. */
            this.coverImageUrl = __runInitializers(this, _contactPhone_extraInitializers);
            this.amenities = __runInitializers(this, _amenities_initializers, void 0);
            this.additionalServices = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _additionalServices_initializers, void 0));
            this.sports = (__runInitializers(this, _additionalServices_extraInitializers), __runInitializers(this, _sports_initializers, void 0));
            this.courts = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _courts_initializers, void 0));
            this.openTime = (__runInitializers(this, _courts_extraInitializers), __runInitializers(this, _openTime_initializers, void 0));
            this.closeTime = (__runInitializers(this, _openTime_extraInitializers), __runInitializers(this, _closeTime_initializers, void 0));
            this.latitude = (__runInitializers(this, _closeTime_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            __runInitializers(this, _longitude_extraInitializers);
        }
        return VenueDetail_1;
    }());
    __setFunctionName(_classThis, "VenueDetail");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _address_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _contactPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amenities_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _additionalServices_decorators = [(0, graphql_1.Field)(function () { return [PublicAdditionalService]; })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [sport_stub_model_1.SportStub]; })];
        _courts_decorators = [(0, graphql_1.Field)(function () { return [PublicCourt]; })];
        _openTime_decorators = [(0, graphql_1.Field)()];
        _closeTime_decorators = [(0, graphql_1.Field)()];
        _latitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        _longitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _contactPhone_decorators, { kind: "field", name: "contactPhone", static: false, private: false, access: { has: function (obj) { return "contactPhone" in obj; }, get: function (obj) { return obj.contactPhone; }, set: function (obj, value) { obj.contactPhone = value; } }, metadata: _metadata }, _contactPhone_initializers, _contactPhone_extraInitializers);
        __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: function (obj) { return "amenities" in obj; }, get: function (obj) { return obj.amenities; }, set: function (obj, value) { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
        __esDecorate(null, null, _additionalServices_decorators, { kind: "field", name: "additionalServices", static: false, private: false, access: { has: function (obj) { return "additionalServices" in obj; }, get: function (obj) { return obj.additionalServices; }, set: function (obj, value) { obj.additionalServices = value; } }, metadata: _metadata }, _additionalServices_initializers, _additionalServices_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _courts_decorators, { kind: "field", name: "courts", static: false, private: false, access: { has: function (obj) { return "courts" in obj; }, get: function (obj) { return obj.courts; }, set: function (obj, value) { obj.courts = value; } }, metadata: _metadata }, _courts_initializers, _courts_extraInitializers);
        __esDecorate(null, null, _openTime_decorators, { kind: "field", name: "openTime", static: false, private: false, access: { has: function (obj) { return "openTime" in obj; }, get: function (obj) { return obj.openTime; }, set: function (obj, value) { obj.openTime = value; } }, metadata: _metadata }, _openTime_initializers, _openTime_extraInitializers);
        __esDecorate(null, null, _closeTime_decorators, { kind: "field", name: "closeTime", static: false, private: false, access: { has: function (obj) { return "closeTime" in obj; }, get: function (obj) { return obj.closeTime; }, set: function (obj, value) { obj.closeTime = value; } }, metadata: _metadata }, _closeTime_initializers, _closeTime_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueDetail = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueDetail = _classThis;
}();
exports.VenueDetail = VenueDetail;
function num(value) {
    return value == null ? undefined : Number(value.toString());
}
/** The venue's `additionalServices` JSON column → typed name/price list. */
function parseAdditionalServices(value) {
    if (!Array.isArray(value))
        return [];
    return value
        .filter(function (v) { return !!v && typeof v === 'object' && 'name' in v; })
        .map(function (v) { return ({
        name: String(v.name),
        price: typeof v.price === 'number' ? v.price : undefined,
    }); });
}
function mapPublicCourt(c) {
    return {
        id: c.id,
        name: c.name,
        sport: (0, sport_stub_model_1.mapSportStub)(c.sport),
        pricePerHour: Number(c.pricePerHour.toString()),
        slotMinutes: c.slotMinutes,
        features: c.features,
        imageUrls: c.imageUrls,
    };
}
function mapVenueDetail(v) {
    var _a, _b, _c, _d, _e;
    return {
        id: v.id,
        name: v.name,
        description: (_a = v.description) !== null && _a !== void 0 ? _a : undefined,
        city: (_b = v.city) !== null && _b !== void 0 ? _b : undefined,
        address: (_c = v.address) !== null && _c !== void 0 ? _c : undefined,
        contactPhone: (_d = v.contactPhone) !== null && _d !== void 0 ? _d : undefined,
        coverImageUrl: (_e = v.coverImageUrl) !== null && _e !== void 0 ? _e : undefined,
        imageUrls: v.imageUrls,
        amenities: v.amenities,
        additionalServices: parseAdditionalServices(v.additionalServices),
        sports: v.venueSports.map(function (vs) { return (0, sport_stub_model_1.mapSportStub)(vs.sport); }),
        courts: v.courts.map(mapPublicCourt),
        openTime: v.openTime,
        closeTime: v.closeTime,
        latitude: num(v.latitude),
        longitude: num(v.longitude),
    };
}
