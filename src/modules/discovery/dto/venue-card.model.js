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
exports.VenueCard = void 0;
exports.mapVenueCard = mapVenueCard;
var graphql_1 = require("@nestjs/graphql");
var sport_stub_model_1 = require("../../admin/sports/dto/sport-stub.model");
var VenueCard = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A venue as shown in the player marketplace list.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _priceFrom_decorators;
    var _priceFrom_initializers = [];
    var _priceFrom_extraInitializers = [];
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
    var VenueCard = _classThis = /** @class */ (function () {
        function VenueCard_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.city = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.address = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            /** Stored S3 object key; presigned to a download URL by VenueCardResolver. */
            this.coverImageUrl = __runInitializers(this, _address_extraInitializers);
            this.sports = __runInitializers(this, _sports_initializers, void 0);
            this.priceFrom = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _priceFrom_initializers, void 0));
            this.openTime = (__runInitializers(this, _priceFrom_extraInitializers), __runInitializers(this, _openTime_initializers, void 0));
            this.closeTime = (__runInitializers(this, _openTime_extraInitializers), __runInitializers(this, _closeTime_initializers, void 0));
            this.latitude = (__runInitializers(this, _closeTime_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            __runInitializers(this, _longitude_extraInitializers);
        }
        return VenueCard_1;
    }());
    __setFunctionName(_classThis, "VenueCard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _address_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [sport_stub_model_1.SportStub]; })];
        _priceFrom_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Lowest active court price/hour.' })];
        _openTime_decorators = [(0, graphql_1.Field)()];
        _closeTime_decorators = [(0, graphql_1.Field)()];
        _latitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        _longitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _priceFrom_decorators, { kind: "field", name: "priceFrom", static: false, private: false, access: { has: function (obj) { return "priceFrom" in obj; }, get: function (obj) { return obj.priceFrom; }, set: function (obj, value) { obj.priceFrom = value; } }, metadata: _metadata }, _priceFrom_initializers, _priceFrom_extraInitializers);
        __esDecorate(null, null, _openTime_decorators, { kind: "field", name: "openTime", static: false, private: false, access: { has: function (obj) { return "openTime" in obj; }, get: function (obj) { return obj.openTime; }, set: function (obj, value) { obj.openTime = value; } }, metadata: _metadata }, _openTime_initializers, _openTime_extraInitializers);
        __esDecorate(null, null, _closeTime_decorators, { kind: "field", name: "closeTime", static: false, private: false, access: { has: function (obj) { return "closeTime" in obj; }, get: function (obj) { return obj.closeTime; }, set: function (obj, value) { obj.closeTime = value; } }, metadata: _metadata }, _closeTime_initializers, _closeTime_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueCard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueCard = _classThis;
}();
exports.VenueCard = VenueCard;
function num(value) {
    return value == null ? undefined : Number(value.toString());
}
function mapVenueCard(v) {
    var _a, _b, _c;
    var prices = v.courts.map(function (c) { return Number(c.pricePerHour.toString()); });
    return {
        id: v.id,
        name: v.name,
        city: (_a = v.city) !== null && _a !== void 0 ? _a : undefined,
        address: (_b = v.address) !== null && _b !== void 0 ? _b : undefined,
        coverImageUrl: (_c = v.coverImageUrl) !== null && _c !== void 0 ? _c : undefined,
        sports: v.venueSports.map(function (vs) { return (0, sport_stub_model_1.mapSportStub)(vs.sport); }),
        priceFrom: prices.length ? Math.min.apply(Math, prices) : undefined,
        openTime: v.openTime,
        closeTime: v.closeTime,
        latitude: num(v.latitude),
        longitude: num(v.longitude),
    };
}
