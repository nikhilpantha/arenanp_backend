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
exports.VenueAmenityOption = void 0;
exports.listVenueAmenities = listVenueAmenities;
var graphql_1 = require("@nestjs/graphql");
var venue_amenities_1 = require("../../../common/constants/venue-amenities");
var VenueAmenityOption = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A venue-wide amenity an owner can claim during setup.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var VenueAmenityOption = _classThis = /** @class */ (function () {
        function VenueAmenityOption_1() {
            this.slug = __runInitializers(this, _slug_initializers, void 0);
            this.label = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _label_initializers, void 0));
            __runInitializers(this, _label_extraInitializers);
        }
        return VenueAmenityOption_1;
    }());
    __setFunctionName(_classThis, "VenueAmenityOption");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _slug_decorators = [(0, graphql_1.Field)({ description: 'Canonical slug stored on `Venue.amenities`.' })];
        _label_decorators = [(0, graphql_1.Field)({ description: 'Human label to render. Never show the raw slug.' })];
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueAmenityOption = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueAmenityOption = _classThis;
}();
exports.VenueAmenityOption = VenueAmenityOption;
/** The closed catalogue, served so no client hardcodes the list or its labels. */
function listVenueAmenities() {
    return venue_amenities_1.VENUE_AMENITIES.map(function (slug) { return ({
        slug: slug,
        label: venue_amenities_1.VENUE_AMENITY_LABELS[slug],
    }); });
}
