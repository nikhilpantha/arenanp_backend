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
exports.RemoveCourtInput = exports.AddCourtInput = exports.UpdateCourtInput = exports.SetVenueServicesInput = exports.UpdateVenueProfileInput = exports.SubmitVenueInput = exports.VenueVerificationInput = exports.VenueServiceInput = exports.VenueCourtInput = exports.AdditionalServiceInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var venue_amenities_1 = require("../../../common/constants/venue-amenities");
var TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
var AdditionalServiceInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var AdditionalServiceInput = _classThis = /** @class */ (function () {
        function AdditionalServiceInput_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.price = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            __runInitializers(this, _price_extraInitializers);
        }
        return AdditionalServiceInput_1;
    }());
    __setFunctionName(_classThis, "AdditionalServiceInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1), (0, class_validator_1.MaxLength)(80)];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdditionalServiceInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdditionalServiceInput = _classThis;
}();
exports.AdditionalServiceInput = AdditionalServiceInput;
var VenueCourtInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)({
            description: "One bookable unit. Attribute values must come from the parent sport's catalogue (`surfaces`, `formats`, `courtFeatures`) — the server rejects anything else.",
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slotMinutes_decorators;
    var _slotMinutes_initializers = [];
    var _slotMinutes_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _features_decorators;
    var _features_initializers = [];
    var _features_extraInitializers = [];
    var _surface_decorators;
    var _surface_initializers = [];
    var _surface_extraInitializers = [];
    var _format_decorators;
    var _format_initializers = [];
    var _format_extraInitializers = [];
    var _environment_decorators;
    var _environment_initializers = [];
    var _environment_extraInitializers = [];
    var _capacity_decorators;
    var _capacity_initializers = [];
    var _capacity_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    var VenueCourtInput = _classThis = /** @class */ (function () {
        function VenueCourtInput_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.slotMinutes = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slotMinutes_initializers, 60));
            this.pricePerHour = (__runInitializers(this, _slotMinutes_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            /** Per-court, unlike the deprecated service-level `features`. */
            this.features = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _features_initializers, []));
            this.surface = (__runInitializers(this, _features_extraInitializers), __runInitializers(this, _surface_initializers, void 0));
            this.format = (__runInitializers(this, _surface_extraInitializers), __runInitializers(this, _format_initializers, void 0));
            this.environment = (__runInitializers(this, _format_extraInitializers), __runInitializers(this, _environment_initializers, void 0));
            this.capacity = (__runInitializers(this, _environment_extraInitializers), __runInitializers(this, _capacity_initializers, void 0));
            this.description = (__runInitializers(this, _capacity_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.imageUrls = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _imageUrls_initializers, []));
            __runInitializers(this, _imageUrls_extraInitializers);
        }
        return VenueCourtInput_1;
    }());
    __setFunctionName(_classThis, "VenueCourtInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Court name. Defaults to the sport name (+ index).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(80)];
        _slotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { defaultValue: 60 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(15)];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
        _features_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { defaultValue: [], description: 'Subset of `Sport.courtFeatures`.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.MaxLength)(60, { each: true })];
        _surface_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'One of `Sport.surfaces`.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(60)];
        _format_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'One of `Sport.formats`.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(60)];
        _environment_decorators = [(0, graphql_1.Field)(function () { return client_1.CourtEnvironment; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.CourtEnvironment)];
        _capacity_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                nullable: true,
                description: 'Places per slot. Required when the sport is CAPACITY-booked.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(500)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _imageUrls_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { defaultValue: [], description: 'S3 keys from createUploadUrl.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _slotMinutes_decorators, { kind: "field", name: "slotMinutes", static: false, private: false, access: { has: function (obj) { return "slotMinutes" in obj; }, get: function (obj) { return obj.slotMinutes; }, set: function (obj, value) { obj.slotMinutes = value; } }, metadata: _metadata }, _slotMinutes_initializers, _slotMinutes_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _features_decorators, { kind: "field", name: "features", static: false, private: false, access: { has: function (obj) { return "features" in obj; }, get: function (obj) { return obj.features; }, set: function (obj, value) { obj.features = value; } }, metadata: _metadata }, _features_initializers, _features_extraInitializers);
        __esDecorate(null, null, _surface_decorators, { kind: "field", name: "surface", static: false, private: false, access: { has: function (obj) { return "surface" in obj; }, get: function (obj) { return obj.surface; }, set: function (obj, value) { obj.surface = value; } }, metadata: _metadata }, _surface_initializers, _surface_extraInitializers);
        __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: function (obj) { return "format" in obj; }, get: function (obj) { return obj.format; }, set: function (obj, value) { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
        __esDecorate(null, null, _environment_decorators, { kind: "field", name: "environment", static: false, private: false, access: { has: function (obj) { return "environment" in obj; }, get: function (obj) { return obj.environment; }, set: function (obj, value) { obj.environment = value; } }, metadata: _metadata }, _environment_initializers, _environment_extraInitializers);
        __esDecorate(null, null, _capacity_decorators, { kind: "field", name: "capacity", static: false, private: false, access: { has: function (obj) { return "capacity" in obj; }, get: function (obj) { return obj.capacity; }, set: function (obj, value) { obj.capacity = value; } }, metadata: _metadata }, _capacity_initializers, _capacity_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueCourtInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueCourtInput = _classThis;
}();
exports.VenueCourtInput = VenueCourtInput;
var VenueServiceInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)({ description: 'A sport the venue offers, with its courts, slot length and price.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _sportSlug_decorators;
    var _sportSlug_initializers = [];
    var _sportSlug_extraInitializers = [];
    var _courts_decorators;
    var _courts_initializers = [];
    var _courts_extraInitializers = [];
    var _courtCount_decorators;
    var _courtCount_initializers = [];
    var _courtCount_extraInitializers = [];
    var _slotMinutes_decorators;
    var _slotMinutes_initializers = [];
    var _slotMinutes_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _features_decorators;
    var _features_initializers = [];
    var _features_extraInitializers = [];
    var VenueServiceInput = _classThis = /** @class */ (function () {
        function VenueServiceInput_1() {
            this.sportSlug = __runInitializers(this, _sportSlug_initializers, void 0);
            /**
             * Per-court detail (name + slot + price). When provided this is authoritative and the
             * legacy `courtCount`/`slotMinutes`/`pricePerHour` fields below are ignored.
             */
            this.courts = (__runInitializers(this, _sportSlug_extraInitializers), __runInitializers(this, _courts_initializers, void 0));
            this.courtCount = (__runInitializers(this, _courts_extraInitializers), __runInitializers(this, _courtCount_initializers, 1));
            this.slotMinutes = (__runInitializers(this, _courtCount_extraInitializers), __runInitializers(this, _slotMinutes_initializers, 60));
            this.pricePerHour = (__runInitializers(this, _slotMinutes_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            this.features = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _features_initializers, []));
            __runInitializers(this, _features_extraInitializers);
        }
        return VenueServiceInput_1;
    }());
    __setFunctionName(_classThis, "VenueServiceInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _sportSlug_decorators = [(0, graphql_1.Field)({ description: 'Sport slug, e.g. "futsal" (matches Sport.slug).' }), (0, class_validator_1.IsString)()];
        _courts_decorators = [(0, graphql_1.Field)(function () { return [VenueCourtInput]; }, {
                nullable: true,
                description: 'Per-court detail; overrides courtCount/slotMinutes/pricePerHour when set.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return VenueCourtInput; })];
        _courtCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                defaultValue: 1,
                description: 'Legacy: number of identical courts to create.',
            }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
        _slotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                defaultValue: 60,
                description: 'Legacy: slot length when courts[] is omitted.',
            }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(15)];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: 'Legacy: per-hour price when courts[] is omitted.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
        _features_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                defaultValue: [],
                deprecationReason: 'Set `features` on each court instead — a venue can have a wooden court and a cement one.',
                description: 'Legacy: fanned out onto every court that omits its own features.',
            }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        __esDecorate(null, null, _sportSlug_decorators, { kind: "field", name: "sportSlug", static: false, private: false, access: { has: function (obj) { return "sportSlug" in obj; }, get: function (obj) { return obj.sportSlug; }, set: function (obj, value) { obj.sportSlug = value; } }, metadata: _metadata }, _sportSlug_initializers, _sportSlug_extraInitializers);
        __esDecorate(null, null, _courts_decorators, { kind: "field", name: "courts", static: false, private: false, access: { has: function (obj) { return "courts" in obj; }, get: function (obj) { return obj.courts; }, set: function (obj, value) { obj.courts = value; } }, metadata: _metadata }, _courts_initializers, _courts_extraInitializers);
        __esDecorate(null, null, _courtCount_decorators, { kind: "field", name: "courtCount", static: false, private: false, access: { has: function (obj) { return "courtCount" in obj; }, get: function (obj) { return obj.courtCount; }, set: function (obj, value) { obj.courtCount = value; } }, metadata: _metadata }, _courtCount_initializers, _courtCount_extraInitializers);
        __esDecorate(null, null, _slotMinutes_decorators, { kind: "field", name: "slotMinutes", static: false, private: false, access: { has: function (obj) { return "slotMinutes" in obj; }, get: function (obj) { return obj.slotMinutes; }, set: function (obj, value) { obj.slotMinutes = value; } }, metadata: _metadata }, _slotMinutes_initializers, _slotMinutes_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _features_decorators, { kind: "field", name: "features", static: false, private: false, access: { has: function (obj) { return "features" in obj; }, get: function (obj) { return obj.features; }, set: function (obj, value) { obj.features = value; } }, metadata: _metadata }, _features_initializers, _features_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueServiceInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueServiceInput = _classThis;
}();
exports.VenueServiceInput = VenueServiceInput;
var VenueVerificationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)({ description: 'Venue KYC documents + business info submitted for verification.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _businessName_decorators;
    var _businessName_initializers = [];
    var _businessName_extraInitializers = [];
    var _businessType_decorators;
    var _businessType_initializers = [];
    var _businessType_extraInitializers = [];
    var _panNumber_decorators;
    var _panNumber_initializers = [];
    var _panNumber_extraInitializers = [];
    var _vatNumber_decorators;
    var _vatNumber_initializers = [];
    var _vatNumber_extraInitializers = [];
    var _registrationNumber_decorators;
    var _registrationNumber_initializers = [];
    var _registrationNumber_extraInitializers = [];
    var _documentUrls_decorators;
    var _documentUrls_initializers = [];
    var _documentUrls_extraInitializers = [];
    var VenueVerificationInput = _classThis = /** @class */ (function () {
        function VenueVerificationInput_1() {
            this.businessName = __runInitializers(this, _businessName_initializers, void 0);
            this.businessType = (__runInitializers(this, _businessName_extraInitializers), __runInitializers(this, _businessType_initializers, void 0));
            this.panNumber = (__runInitializers(this, _businessType_extraInitializers), __runInitializers(this, _panNumber_initializers, void 0));
            this.vatNumber = (__runInitializers(this, _panNumber_extraInitializers), __runInitializers(this, _vatNumber_initializers, void 0));
            this.registrationNumber = (__runInitializers(this, _vatNumber_extraInitializers), __runInitializers(this, _registrationNumber_initializers, void 0));
            this.documentUrls = (__runInitializers(this, _registrationNumber_extraInitializers), __runInitializers(this, _documentUrls_initializers, []));
            __runInitializers(this, _documentUrls_extraInitializers);
        }
        return VenueVerificationInput_1;
    }());
    __setFunctionName(_classThis, "VenueVerificationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _businessName_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _businessType_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _panNumber_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _vatNumber_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _registrationNumber_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _documentUrls_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { defaultValue: [] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        __esDecorate(null, null, _businessName_decorators, { kind: "field", name: "businessName", static: false, private: false, access: { has: function (obj) { return "businessName" in obj; }, get: function (obj) { return obj.businessName; }, set: function (obj, value) { obj.businessName = value; } }, metadata: _metadata }, _businessName_initializers, _businessName_extraInitializers);
        __esDecorate(null, null, _businessType_decorators, { kind: "field", name: "businessType", static: false, private: false, access: { has: function (obj) { return "businessType" in obj; }, get: function (obj) { return obj.businessType; }, set: function (obj, value) { obj.businessType = value; } }, metadata: _metadata }, _businessType_initializers, _businessType_extraInitializers);
        __esDecorate(null, null, _panNumber_decorators, { kind: "field", name: "panNumber", static: false, private: false, access: { has: function (obj) { return "panNumber" in obj; }, get: function (obj) { return obj.panNumber; }, set: function (obj, value) { obj.panNumber = value; } }, metadata: _metadata }, _panNumber_initializers, _panNumber_extraInitializers);
        __esDecorate(null, null, _vatNumber_decorators, { kind: "field", name: "vatNumber", static: false, private: false, access: { has: function (obj) { return "vatNumber" in obj; }, get: function (obj) { return obj.vatNumber; }, set: function (obj, value) { obj.vatNumber = value; } }, metadata: _metadata }, _vatNumber_initializers, _vatNumber_extraInitializers);
        __esDecorate(null, null, _registrationNumber_decorators, { kind: "field", name: "registrationNumber", static: false, private: false, access: { has: function (obj) { return "registrationNumber" in obj; }, get: function (obj) { return obj.registrationNumber; }, set: function (obj, value) { obj.registrationNumber = value; } }, metadata: _metadata }, _registrationNumber_initializers, _registrationNumber_extraInitializers);
        __esDecorate(null, null, _documentUrls_decorators, { kind: "field", name: "documentUrls", static: false, private: false, access: { has: function (obj) { return "documentUrls" in obj; }, get: function (obj) { return obj.documentUrls; }, set: function (obj, value) { obj.documentUrls = value; } }, metadata: _metadata }, _documentUrls_initializers, _documentUrls_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueVerificationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueVerificationInput = _classThis;
}();
exports.VenueVerificationInput = VenueVerificationInput;
/**
 * Add a venue from the dashboard. Creates the Venue as PENDING (a super admin
 * approves the listing before it goes live), an OWNER membership and its
 * courts/sports. The VENUE capability is granted separately at signup.
 */
var SubmitVenueInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _coverImageUrl_decorators;
    var _coverImageUrl_initializers = [];
    var _coverImageUrl_extraInitializers = [];
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    var _openTime_decorators;
    var _openTime_initializers = [];
    var _openTime_extraInitializers = [];
    var _closeTime_decorators;
    var _closeTime_initializers = [];
    var _closeTime_extraInitializers = [];
    var _contactEmail_decorators;
    var _contactEmail_initializers = [];
    var _contactEmail_extraInitializers = [];
    var _contactPhone_decorators;
    var _contactPhone_initializers = [];
    var _contactPhone_extraInitializers = [];
    var _amenities_decorators;
    var _amenities_initializers = [];
    var _amenities_extraInitializers = [];
    var _services_decorators;
    var _services_initializers = [];
    var _services_extraInitializers = [];
    var _additionalServices_decorators;
    var _additionalServices_initializers = [];
    var _additionalServices_extraInitializers = [];
    var _verification_decorators;
    var _verification_initializers = [];
    var _verification_extraInitializers = [];
    var SubmitVenueInput = _classThis = /** @class */ (function () {
        function SubmitVenueInput_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.address = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.latitude = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            this.coverImageUrl = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _coverImageUrl_initializers, void 0));
            this.imageUrls = (__runInitializers(this, _coverImageUrl_extraInitializers), __runInitializers(this, _imageUrls_initializers, []));
            this.openTime = (__runInitializers(this, _imageUrls_extraInitializers), __runInitializers(this, _openTime_initializers, void 0));
            this.closeTime = (__runInitializers(this, _openTime_extraInitializers), __runInitializers(this, _closeTime_initializers, void 0));
            this.contactEmail = (__runInitializers(this, _closeTime_extraInitializers), __runInitializers(this, _contactEmail_initializers, void 0));
            this.contactPhone = (__runInitializers(this, _contactEmail_extraInitializers), __runInitializers(this, _contactPhone_initializers, void 0));
            this.amenities = (__runInitializers(this, _contactPhone_extraInitializers), __runInitializers(this, _amenities_initializers, []));
            this.services = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _services_initializers, void 0));
            this.additionalServices = (__runInitializers(this, _services_extraInitializers), __runInitializers(this, _additionalServices_initializers, []));
            this.verification = (__runInitializers(this, _additionalServices_extraInitializers), __runInitializers(this, _verification_initializers, void 0));
            __runInitializers(this, _verification_extraInitializers);
        }
        return SubmitVenueInput_1;
    }());
    __setFunctionName(_classThis, "SubmitVenueInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(2000)];
        _address_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _latitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsLatitude)()];
        _longitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsLongitude)()];
        _coverImageUrl_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _imageUrls_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { defaultValue: [] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _openTime_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(TIME_RE, { message: 'openTime must be HH:mm' })];
        _closeTime_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(TIME_RE, { message: 'closeTime must be HH:mm' })];
        _contactEmail_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)({}, { message: 'Enter a valid email' })];
        _contactPhone_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _amenities_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                defaultValue: [],
                description: 'Venue-wide amenity slugs from the `venueAmenities` catalogue. Free text is rejected — amenities are a marketplace filter.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsIn)(venue_amenities_1.VENUE_AMENITIES, { each: true })];
        _services_decorators = [(0, graphql_1.Field)(function () { return [VenueServiceInput]; }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayMinSize)(1), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return VenueServiceInput; })];
        _additionalServices_decorators = [(0, graphql_1.Field)(function () { return [AdditionalServiceInput]; }, { defaultValue: [] }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return AdditionalServiceInput; })];
        _verification_decorators = [(0, graphql_1.Field)(function () { return VenueVerificationInput; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return VenueVerificationInput; })];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _coverImageUrl_decorators, { kind: "field", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; }, set: function (obj, value) { obj.coverImageUrl = value; } }, metadata: _metadata }, _coverImageUrl_initializers, _coverImageUrl_extraInitializers);
        __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
        __esDecorate(null, null, _openTime_decorators, { kind: "field", name: "openTime", static: false, private: false, access: { has: function (obj) { return "openTime" in obj; }, get: function (obj) { return obj.openTime; }, set: function (obj, value) { obj.openTime = value; } }, metadata: _metadata }, _openTime_initializers, _openTime_extraInitializers);
        __esDecorate(null, null, _closeTime_decorators, { kind: "field", name: "closeTime", static: false, private: false, access: { has: function (obj) { return "closeTime" in obj; }, get: function (obj) { return obj.closeTime; }, set: function (obj, value) { obj.closeTime = value; } }, metadata: _metadata }, _closeTime_initializers, _closeTime_extraInitializers);
        __esDecorate(null, null, _contactEmail_decorators, { kind: "field", name: "contactEmail", static: false, private: false, access: { has: function (obj) { return "contactEmail" in obj; }, get: function (obj) { return obj.contactEmail; }, set: function (obj, value) { obj.contactEmail = value; } }, metadata: _metadata }, _contactEmail_initializers, _contactEmail_extraInitializers);
        __esDecorate(null, null, _contactPhone_decorators, { kind: "field", name: "contactPhone", static: false, private: false, access: { has: function (obj) { return "contactPhone" in obj; }, get: function (obj) { return obj.contactPhone; }, set: function (obj, value) { obj.contactPhone = value; } }, metadata: _metadata }, _contactPhone_initializers, _contactPhone_extraInitializers);
        __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: function (obj) { return "amenities" in obj; }, get: function (obj) { return obj.amenities; }, set: function (obj, value) { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
        __esDecorate(null, null, _services_decorators, { kind: "field", name: "services", static: false, private: false, access: { has: function (obj) { return "services" in obj; }, get: function (obj) { return obj.services; }, set: function (obj, value) { obj.services = value; } }, metadata: _metadata }, _services_initializers, _services_extraInitializers);
        __esDecorate(null, null, _additionalServices_decorators, { kind: "field", name: "additionalServices", static: false, private: false, access: { has: function (obj) { return "additionalServices" in obj; }, get: function (obj) { return obj.additionalServices; }, set: function (obj, value) { obj.additionalServices = value; } }, metadata: _metadata }, _additionalServices_initializers, _additionalServices_extraInitializers);
        __esDecorate(null, null, _verification_decorators, { kind: "field", name: "verification", static: false, private: false, access: { has: function (obj) { return "verification" in obj; }, get: function (obj) { return obj.verification; }, set: function (obj, value) { obj.verification = value; } }, metadata: _metadata }, _verification_initializers, _verification_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubmitVenueInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubmitVenueInput = _classThis;
}();
exports.SubmitVenueInput = SubmitVenueInput;
/** Patch the editable profile fields of an existing venue. */
var UpdateVenueProfileInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _coverImageUrl_decorators;
    var _coverImageUrl_initializers = [];
    var _coverImageUrl_extraInitializers = [];
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    var _openTime_decorators;
    var _openTime_initializers = [];
    var _openTime_extraInitializers = [];
    var _closeTime_decorators;
    var _closeTime_initializers = [];
    var _closeTime_extraInitializers = [];
    var _contactEmail_decorators;
    var _contactEmail_initializers = [];
    var _contactEmail_extraInitializers = [];
    var _contactPhone_decorators;
    var _contactPhone_initializers = [];
    var _contactPhone_extraInitializers = [];
    var _amenities_decorators;
    var _amenities_initializers = [];
    var _amenities_extraInitializers = [];
    var _additionalServices_decorators;
    var _additionalServices_initializers = [];
    var _additionalServices_extraInitializers = [];
    var UpdateVenueProfileInput = _classThis = /** @class */ (function () {
        function UpdateVenueProfileInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.name = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.address = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.latitude = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            this.coverImageUrl = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _coverImageUrl_initializers, void 0));
            this.imageUrls = (__runInitializers(this, _coverImageUrl_extraInitializers), __runInitializers(this, _imageUrls_initializers, void 0));
            this.openTime = (__runInitializers(this, _imageUrls_extraInitializers), __runInitializers(this, _openTime_initializers, void 0));
            this.closeTime = (__runInitializers(this, _openTime_extraInitializers), __runInitializers(this, _closeTime_initializers, void 0));
            this.contactEmail = (__runInitializers(this, _closeTime_extraInitializers), __runInitializers(this, _contactEmail_initializers, void 0));
            this.contactPhone = (__runInitializers(this, _contactEmail_extraInitializers), __runInitializers(this, _contactPhone_initializers, void 0));
            this.amenities = (__runInitializers(this, _contactPhone_extraInitializers), __runInitializers(this, _amenities_initializers, void 0));
            this.additionalServices = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _additionalServices_initializers, void 0));
            __runInitializers(this, _additionalServices_extraInitializers);
        }
        return UpdateVenueProfileInput_1;
    }());
    __setFunctionName(_classThis, "UpdateVenueProfileInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _name_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(2000)];
        _address_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _latitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsLatitude)()];
        _longitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsLongitude)()];
        _coverImageUrl_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _imageUrls_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _openTime_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(TIME_RE, { message: 'openTime must be HH:mm' })];
        _closeTime_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.Matches)(TIME_RE, { message: 'closeTime must be HH:mm' })];
        _contactEmail_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)({}, { message: 'Enter a valid email' })];
        _contactPhone_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _amenities_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true, description: 'Venue-wide amenity slugs.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsIn)(venue_amenities_1.VENUE_AMENITIES, { each: true })];
        _additionalServices_decorators = [(0, graphql_1.Field)(function () { return [AdditionalServiceInput]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return AdditionalServiceInput; })];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _coverImageUrl_decorators, { kind: "field", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; }, set: function (obj, value) { obj.coverImageUrl = value; } }, metadata: _metadata }, _coverImageUrl_initializers, _coverImageUrl_extraInitializers);
        __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
        __esDecorate(null, null, _openTime_decorators, { kind: "field", name: "openTime", static: false, private: false, access: { has: function (obj) { return "openTime" in obj; }, get: function (obj) { return obj.openTime; }, set: function (obj, value) { obj.openTime = value; } }, metadata: _metadata }, _openTime_initializers, _openTime_extraInitializers);
        __esDecorate(null, null, _closeTime_decorators, { kind: "field", name: "closeTime", static: false, private: false, access: { has: function (obj) { return "closeTime" in obj; }, get: function (obj) { return obj.closeTime; }, set: function (obj, value) { obj.closeTime = value; } }, metadata: _metadata }, _closeTime_initializers, _closeTime_extraInitializers);
        __esDecorate(null, null, _contactEmail_decorators, { kind: "field", name: "contactEmail", static: false, private: false, access: { has: function (obj) { return "contactEmail" in obj; }, get: function (obj) { return obj.contactEmail; }, set: function (obj, value) { obj.contactEmail = value; } }, metadata: _metadata }, _contactEmail_initializers, _contactEmail_extraInitializers);
        __esDecorate(null, null, _contactPhone_decorators, { kind: "field", name: "contactPhone", static: false, private: false, access: { has: function (obj) { return "contactPhone" in obj; }, get: function (obj) { return obj.contactPhone; }, set: function (obj, value) { obj.contactPhone = value; } }, metadata: _metadata }, _contactPhone_initializers, _contactPhone_extraInitializers);
        __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: function (obj) { return "amenities" in obj; }, get: function (obj) { return obj.amenities; }, set: function (obj, value) { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
        __esDecorate(null, null, _additionalServices_decorators, { kind: "field", name: "additionalServices", static: false, private: false, access: { has: function (obj) { return "additionalServices" in obj; }, get: function (obj) { return obj.additionalServices; }, set: function (obj, value) { obj.additionalServices = value; } }, metadata: _metadata }, _additionalServices_initializers, _additionalServices_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateVenueProfileInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateVenueProfileInput = _classThis;
}();
exports.UpdateVenueProfileInput = UpdateVenueProfileInput;
/** Replace the venue's services (courts + sports) wholesale. */
var SetVenueServicesInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _services_decorators;
    var _services_initializers = [];
    var _services_extraInitializers = [];
    var SetVenueServicesInput = _classThis = /** @class */ (function () {
        function SetVenueServicesInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.services = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _services_initializers, void 0));
            __runInitializers(this, _services_extraInitializers);
        }
        return SetVenueServicesInput_1;
    }());
    __setFunctionName(_classThis, "SetVenueServicesInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _services_decorators = [(0, graphql_1.Field)(function () { return [VenueServiceInput]; }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayMinSize)(1), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return VenueServiceInput; })];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _services_decorators, { kind: "field", name: "services", static: false, private: false, access: { has: function (obj) { return "services" in obj; }, get: function (obj) { return obj.services; }, set: function (obj, value) { obj.services = value; } }, metadata: _metadata }, _services_initializers, _services_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SetVenueServicesInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SetVenueServicesInput = _classThis;
}();
exports.SetVenueServicesInput = SetVenueServicesInput;
/**
 * Patch ONE existing court, in place.
 *
 * The reason this exists rather than owners re-sending `setVenueServices`: that
 * mutation deletes every court and recreates it, and `Booking.courtId` cascades
 * — so a price change would take the venue's entire booking history, and its
 * takings, with it. Here the row keeps its id, so bookings keep their FK and
 * their money snapshot (`Booking.pricePerHour` / `subtotal` / `total` are
 * written once at booking time and never recomputed). A new rate therefore
 * applies to the next booking, never to one already taken.
 *
 * Every field is optional: absent means "leave it alone".
 */
var UpdateCourtInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _slotMinutes_decorators;
    var _slotMinutes_initializers = [];
    var _slotMinutes_extraInitializers = [];
    var _features_decorators;
    var _features_initializers = [];
    var _features_extraInitializers = [];
    var _surface_decorators;
    var _surface_initializers = [];
    var _surface_extraInitializers = [];
    var _format_decorators;
    var _format_initializers = [];
    var _format_extraInitializers = [];
    var _environment_decorators;
    var _environment_initializers = [];
    var _environment_extraInitializers = [];
    var _capacity_decorators;
    var _capacity_initializers = [];
    var _capacity_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    var UpdateCourtInput = _classThis = /** @class */ (function () {
        function UpdateCourtInput_1() {
            /** The owning venue — the permission guard reads this, and it scopes the court. */
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.courtId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.name = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.pricePerHour = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            this.slotMinutes = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _slotMinutes_initializers, void 0));
            this.features = (__runInitializers(this, _slotMinutes_extraInitializers), __runInitializers(this, _features_initializers, void 0));
            this.surface = (__runInitializers(this, _features_extraInitializers), __runInitializers(this, _surface_initializers, void 0));
            this.format = (__runInitializers(this, _surface_extraInitializers), __runInitializers(this, _format_initializers, void 0));
            this.environment = (__runInitializers(this, _format_extraInitializers), __runInitializers(this, _environment_initializers, void 0));
            this.capacity = (__runInitializers(this, _environment_extraInitializers), __runInitializers(this, _capacity_initializers, void 0));
            this.description = (__runInitializers(this, _capacity_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.isActive = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.imageUrls = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _imageUrls_initializers, void 0));
            __runInitializers(this, _imageUrls_extraInitializers);
        }
        return UpdateCourtInput_1;
    }());
    __setFunctionName(_classThis, "UpdateCourtInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _name_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1, { message: 'Name it, or leave the name unchanged.' }), (0, class_validator_1.MaxLength)(80)];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Applies to new bookings only.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
        _slotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(15)];
        _features_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true, description: 'Subset of `Sport.courtFeatures`.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.MaxLength)(60, { each: true })];
        _surface_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'One of `Sport.surfaces`.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(60)];
        _format_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'One of `Sport.formats`.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(60)];
        _environment_decorators = [(0, graphql_1.Field)(function () { return client_1.CourtEnvironment; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.CourtEnvironment)];
        _capacity_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(500)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _isActive_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Off hides it from new bookings; existing ones stand.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _imageUrls_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true, description: 'S3 keys from createUploadUrl.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _slotMinutes_decorators, { kind: "field", name: "slotMinutes", static: false, private: false, access: { has: function (obj) { return "slotMinutes" in obj; }, get: function (obj) { return obj.slotMinutes; }, set: function (obj, value) { obj.slotMinutes = value; } }, metadata: _metadata }, _slotMinutes_initializers, _slotMinutes_extraInitializers);
        __esDecorate(null, null, _features_decorators, { kind: "field", name: "features", static: false, private: false, access: { has: function (obj) { return "features" in obj; }, get: function (obj) { return obj.features; }, set: function (obj, value) { obj.features = value; } }, metadata: _metadata }, _features_initializers, _features_extraInitializers);
        __esDecorate(null, null, _surface_decorators, { kind: "field", name: "surface", static: false, private: false, access: { has: function (obj) { return "surface" in obj; }, get: function (obj) { return obj.surface; }, set: function (obj, value) { obj.surface = value; } }, metadata: _metadata }, _surface_initializers, _surface_extraInitializers);
        __esDecorate(null, null, _format_decorators, { kind: "field", name: "format", static: false, private: false, access: { has: function (obj) { return "format" in obj; }, get: function (obj) { return obj.format; }, set: function (obj, value) { obj.format = value; } }, metadata: _metadata }, _format_initializers, _format_extraInitializers);
        __esDecorate(null, null, _environment_decorators, { kind: "field", name: "environment", static: false, private: false, access: { has: function (obj) { return "environment" in obj; }, get: function (obj) { return obj.environment; }, set: function (obj, value) { obj.environment = value; } }, metadata: _metadata }, _environment_initializers, _environment_extraInitializers);
        __esDecorate(null, null, _capacity_decorators, { kind: "field", name: "capacity", static: false, private: false, access: { has: function (obj) { return "capacity" in obj; }, get: function (obj) { return obj.capacity; }, set: function (obj, value) { obj.capacity = value; } }, metadata: _metadata }, _capacity_initializers, _capacity_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateCourtInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateCourtInput = _classThis;
}();
exports.UpdateCourtInput = UpdateCourtInput;
/** Add one court to an existing venue, without touching the ones already there. */
var AddCourtInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _sportSlug_decorators;
    var _sportSlug_initializers = [];
    var _sportSlug_extraInitializers = [];
    var _court_decorators;
    var _court_initializers = [];
    var _court_extraInitializers = [];
    var AddCourtInput = _classThis = /** @class */ (function () {
        function AddCourtInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.sportSlug = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _sportSlug_initializers, void 0));
            this.court = (__runInitializers(this, _sportSlug_extraInitializers), __runInitializers(this, _court_initializers, void 0));
            __runInitializers(this, _court_extraInitializers);
        }
        return AddCourtInput_1;
    }());
    __setFunctionName(_classThis, "AddCourtInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _sportSlug_decorators = [(0, graphql_1.Field)({ description: 'Sport slug. The venue gains the sport if it did not offer it yet.' }), (0, class_validator_1.IsString)()];
        _court_decorators = [(0, graphql_1.Field)(function () { return VenueCourtInput; }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return VenueCourtInput; })];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _sportSlug_decorators, { kind: "field", name: "sportSlug", static: false, private: false, access: { has: function (obj) { return "sportSlug" in obj; }, get: function (obj) { return obj.sportSlug; }, set: function (obj, value) { obj.sportSlug = value; } }, metadata: _metadata }, _sportSlug_initializers, _sportSlug_extraInitializers);
        __esDecorate(null, null, _court_decorators, { kind: "field", name: "court", static: false, private: false, access: { has: function (obj) { return "court" in obj; }, get: function (obj) { return obj.court; }, set: function (obj, value) { obj.court = value; } }, metadata: _metadata }, _court_initializers, _court_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AddCourtInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AddCourtInput = _classThis;
}();
exports.AddCourtInput = AddCourtInput;
/** Delete one court. Refused when bookings or subscriptions depend on it. */
var RemoveCourtInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var RemoveCourtInput = _classThis = /** @class */ (function () {
        function RemoveCourtInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.courtId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            __runInitializers(this, _courtId_extraInitializers);
        }
        return RemoveCourtInput_1;
    }());
    __setFunctionName(_classThis, "RemoveCourtInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RemoveCourtInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RemoveCourtInput = _classThis;
}();
exports.RemoveCourtInput = RemoveCourtInput;
