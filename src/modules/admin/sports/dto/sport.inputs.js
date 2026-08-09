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
exports.UpdateSportInput = exports.CreateSportInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var sport_field_decorators_1 = require("./sport-field.decorators");
/**
 * The sport catalogue is what makes venue setup sport-agnostic: every label,
 * price unit, slot length and attribute an owner sees is read from the row an
 * admin fills in here, so adding a sport never needs a deploy.
 *
 * Note `features` is no longer an input — it is derived on write as
 * surfaces + formats + courtFeatures, and kept only so the Expo app's setup
 * screen keeps working until it moves to the typed lists.
 */
var CreateSportInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _iconUrl_decorators;
    var _iconUrl_initializers = [];
    var _iconUrl_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _pricingUnit_decorators;
    var _pricingUnit_initializers = [];
    var _pricingUnit_extraInitializers = [];
    var _unitLabel_decorators;
    var _unitLabel_initializers = [];
    var _unitLabel_extraInitializers = [];
    var _unitLabelPlural_decorators;
    var _unitLabelPlural_initializers = [];
    var _unitLabelPlural_extraInitializers = [];
    var _slotDurations_decorators;
    var _slotDurations_initializers = [];
    var _slotDurations_extraInitializers = [];
    var _defaultSlotMinutes_decorators;
    var _defaultSlotMinutes_initializers = [];
    var _defaultSlotMinutes_extraInitializers = [];
    var _minDurationMinutes_decorators;
    var _minDurationMinutes_initializers = [];
    var _minDurationMinutes_extraInitializers = [];
    var _maxDurationMinutes_decorators;
    var _maxDurationMinutes_initializers = [];
    var _maxDurationMinutes_extraInitializers = [];
    var _bookingMode_decorators;
    var _bookingMode_initializers = [];
    var _bookingMode_extraInitializers = [];
    var _defaultCapacity_decorators;
    var _defaultCapacity_initializers = [];
    var _defaultCapacity_extraInitializers = [];
    var _surfaces_decorators;
    var _surfaces_initializers = [];
    var _surfaces_extraInitializers = [];
    var _formats_decorators;
    var _formats_initializers = [];
    var _formats_extraInitializers = [];
    var _courtFeatures_decorators;
    var _courtFeatures_initializers = [];
    var _courtFeatures_extraInitializers = [];
    var _displayOrder_decorators;
    var _displayOrder_initializers = [];
    var _displayOrder_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var CreateSportInput = _classThis = /** @class */ (function () {
        function CreateSportInput_1() {
            this.name = __runInitializers(this, _name_initializers, void 0);
            this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.iconUrl = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _iconUrl_initializers, void 0));
            this.description = (__runInitializers(this, _iconUrl_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            // ── How the sport is sold ─────────────────────────────────────────────────
            this.pricingUnit = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _pricingUnit_initializers, client_1.SportPricingUnit.PER_HOUR));
            this.unitLabel = (__runInitializers(this, _pricingUnit_extraInitializers), __runInitializers(this, _unitLabel_initializers, 'court'));
            this.unitLabelPlural = (__runInitializers(this, _unitLabel_extraInitializers), __runInitializers(this, _unitLabelPlural_initializers, 'courts'));
            this.slotDurations = (__runInitializers(this, _unitLabelPlural_extraInitializers), __runInitializers(this, _slotDurations_initializers, [30, 60, 90, 120]));
            this.defaultSlotMinutes = (__runInitializers(this, _slotDurations_extraInitializers), __runInitializers(this, _defaultSlotMinutes_initializers, 60));
            this.minDurationMinutes = (__runInitializers(this, _defaultSlotMinutes_extraInitializers), __runInitializers(this, _minDurationMinutes_initializers, void 0));
            this.maxDurationMinutes = (__runInitializers(this, _minDurationMinutes_extraInitializers), __runInitializers(this, _maxDurationMinutes_initializers, void 0));
            this.bookingMode = (__runInitializers(this, _maxDurationMinutes_extraInitializers), __runInitializers(this, _bookingMode_initializers, client_1.SportBookingMode.EXCLUSIVE));
            this.defaultCapacity = (__runInitializers(this, _bookingMode_extraInitializers), __runInitializers(this, _defaultCapacity_initializers, void 0));
            // ── Court attribute catalogues ────────────────────────────────────────────
            this.surfaces = (__runInitializers(this, _defaultCapacity_extraInitializers), __runInitializers(this, _surfaces_initializers, []));
            this.formats = (__runInitializers(this, _surfaces_extraInitializers), __runInitializers(this, _formats_initializers, []));
            this.courtFeatures = (__runInitializers(this, _formats_extraInitializers), __runInitializers(this, _courtFeatures_initializers, []));
            // ── Listing ───────────────────────────────────────────────────────────────
            this.displayOrder = (__runInitializers(this, _courtFeatures_extraInitializers), __runInitializers(this, _displayOrder_initializers, 0));
            this.isActive = (__runInitializers(this, _displayOrder_extraInitializers), __runInitializers(this, _isActive_initializers, true));
            __runInitializers(this, _isActive_extraInitializers);
        }
        return CreateSportInput_1;
    }());
    __setFunctionName(_classThis, "CreateSportInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [(0, graphql_1.Field)({ description: 'Display name (e.g. "Table Tennis").' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1), (0, class_validator_1.MaxLength)(60)];
        _slug_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'URL-safe slug. Auto-generated from `name` if omitted. Lowercase letters, digits and hyphens only.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[a-z0-9]+(-[a-z0-9]+)*$/u, {
                message: 'Slug must be lowercase letters, digits, and hyphens only.',
            }), (0, class_validator_1.MaxLength)(60)];
        _iconUrl_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(2048)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _pricingUnit_decorators = [(0, graphql_1.Field)(function () { return client_1.SportPricingUnit; }, {
                defaultValue: client_1.SportPricingUnit.PER_HOUR,
                description: 'The unit an owner types a price in. Storage stays per hour.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.SportPricingUnit)];
        _unitLabel_decorators = [(0, sport_field_decorators_1.LabelField)('What one bookable unit is called — court, pitch, lane, table, bay.', 'court', {
                create: true,
            })];
        _unitLabelPlural_decorators = [(0, sport_field_decorators_1.LabelField)('Plural of `unitLabel`, e.g. "courts", "lanes".', 'courts', { create: true })];
        _slotDurations_decorators = [(0, sport_field_decorators_1.SlotDurationsField)({ create: true })];
        _defaultSlotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                defaultValue: 60,
                description: 'Slot length a new court starts on. Must be one of `slotDurations`.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(5)];
        _minDurationMinutes_decorators = [(0, sport_field_decorators_1.BoundedIntField)('Shortest bookable duration in minutes (a cricket ground needs 240).', {
                min: 5,
                max: 1440,
            })];
        _maxDurationMinutes_decorators = [(0, sport_field_decorators_1.BoundedIntField)('Longest bookable duration in minutes.', { min: 5, max: 1440 })];
        _bookingMode_decorators = [(0, graphql_1.Field)(function () { return client_1.SportBookingMode; }, {
                defaultValue: client_1.SportBookingMode.EXCLUSIVE,
                description: 'EXCLUSIVE takes the whole surface; CAPACITY sells N places per slot.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.SportBookingMode)];
        _defaultCapacity_decorators = [(0, sport_field_decorators_1.BoundedIntField)('Places per slot. Required when `bookingMode` is CAPACITY.', {
                min: 1,
                max: 500,
            })];
        _surfaces_decorators = [(0, sport_field_decorators_1.TagListField)('Playing surfaces an owner picks from, e.g. ["Artificial Turf"].', { create: true })];
        _formats_decorators = [(0, sport_field_decorators_1.TagListField)('Configurations sold, e.g. ["5-a-side", "7-a-side"].', { create: true })];
        _courtFeatures_decorators = [(0, sport_field_decorators_1.TagListField)('Per-court features, e.g. ["Floodlights", "Air-Conditioned"].', { create: true })];
        _displayOrder_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { defaultValue: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
        _isActive_decorators = [(0, graphql_1.Field)({ defaultValue: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _iconUrl_decorators, { kind: "field", name: "iconUrl", static: false, private: false, access: { has: function (obj) { return "iconUrl" in obj; }, get: function (obj) { return obj.iconUrl; }, set: function (obj, value) { obj.iconUrl = value; } }, metadata: _metadata }, _iconUrl_initializers, _iconUrl_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _pricingUnit_decorators, { kind: "field", name: "pricingUnit", static: false, private: false, access: { has: function (obj) { return "pricingUnit" in obj; }, get: function (obj) { return obj.pricingUnit; }, set: function (obj, value) { obj.pricingUnit = value; } }, metadata: _metadata }, _pricingUnit_initializers, _pricingUnit_extraInitializers);
        __esDecorate(null, null, _unitLabel_decorators, { kind: "field", name: "unitLabel", static: false, private: false, access: { has: function (obj) { return "unitLabel" in obj; }, get: function (obj) { return obj.unitLabel; }, set: function (obj, value) { obj.unitLabel = value; } }, metadata: _metadata }, _unitLabel_initializers, _unitLabel_extraInitializers);
        __esDecorate(null, null, _unitLabelPlural_decorators, { kind: "field", name: "unitLabelPlural", static: false, private: false, access: { has: function (obj) { return "unitLabelPlural" in obj; }, get: function (obj) { return obj.unitLabelPlural; }, set: function (obj, value) { obj.unitLabelPlural = value; } }, metadata: _metadata }, _unitLabelPlural_initializers, _unitLabelPlural_extraInitializers);
        __esDecorate(null, null, _slotDurations_decorators, { kind: "field", name: "slotDurations", static: false, private: false, access: { has: function (obj) { return "slotDurations" in obj; }, get: function (obj) { return obj.slotDurations; }, set: function (obj, value) { obj.slotDurations = value; } }, metadata: _metadata }, _slotDurations_initializers, _slotDurations_extraInitializers);
        __esDecorate(null, null, _defaultSlotMinutes_decorators, { kind: "field", name: "defaultSlotMinutes", static: false, private: false, access: { has: function (obj) { return "defaultSlotMinutes" in obj; }, get: function (obj) { return obj.defaultSlotMinutes; }, set: function (obj, value) { obj.defaultSlotMinutes = value; } }, metadata: _metadata }, _defaultSlotMinutes_initializers, _defaultSlotMinutes_extraInitializers);
        __esDecorate(null, null, _minDurationMinutes_decorators, { kind: "field", name: "minDurationMinutes", static: false, private: false, access: { has: function (obj) { return "minDurationMinutes" in obj; }, get: function (obj) { return obj.minDurationMinutes; }, set: function (obj, value) { obj.minDurationMinutes = value; } }, metadata: _metadata }, _minDurationMinutes_initializers, _minDurationMinutes_extraInitializers);
        __esDecorate(null, null, _maxDurationMinutes_decorators, { kind: "field", name: "maxDurationMinutes", static: false, private: false, access: { has: function (obj) { return "maxDurationMinutes" in obj; }, get: function (obj) { return obj.maxDurationMinutes; }, set: function (obj, value) { obj.maxDurationMinutes = value; } }, metadata: _metadata }, _maxDurationMinutes_initializers, _maxDurationMinutes_extraInitializers);
        __esDecorate(null, null, _bookingMode_decorators, { kind: "field", name: "bookingMode", static: false, private: false, access: { has: function (obj) { return "bookingMode" in obj; }, get: function (obj) { return obj.bookingMode; }, set: function (obj, value) { obj.bookingMode = value; } }, metadata: _metadata }, _bookingMode_initializers, _bookingMode_extraInitializers);
        __esDecorate(null, null, _defaultCapacity_decorators, { kind: "field", name: "defaultCapacity", static: false, private: false, access: { has: function (obj) { return "defaultCapacity" in obj; }, get: function (obj) { return obj.defaultCapacity; }, set: function (obj, value) { obj.defaultCapacity = value; } }, metadata: _metadata }, _defaultCapacity_initializers, _defaultCapacity_extraInitializers);
        __esDecorate(null, null, _surfaces_decorators, { kind: "field", name: "surfaces", static: false, private: false, access: { has: function (obj) { return "surfaces" in obj; }, get: function (obj) { return obj.surfaces; }, set: function (obj, value) { obj.surfaces = value; } }, metadata: _metadata }, _surfaces_initializers, _surfaces_extraInitializers);
        __esDecorate(null, null, _formats_decorators, { kind: "field", name: "formats", static: false, private: false, access: { has: function (obj) { return "formats" in obj; }, get: function (obj) { return obj.formats; }, set: function (obj, value) { obj.formats = value; } }, metadata: _metadata }, _formats_initializers, _formats_extraInitializers);
        __esDecorate(null, null, _courtFeatures_decorators, { kind: "field", name: "courtFeatures", static: false, private: false, access: { has: function (obj) { return "courtFeatures" in obj; }, get: function (obj) { return obj.courtFeatures; }, set: function (obj, value) { obj.courtFeatures = value; } }, metadata: _metadata }, _courtFeatures_initializers, _courtFeatures_extraInitializers);
        __esDecorate(null, null, _displayOrder_decorators, { kind: "field", name: "displayOrder", static: false, private: false, access: { has: function (obj) { return "displayOrder" in obj; }, get: function (obj) { return obj.displayOrder; }, set: function (obj, value) { obj.displayOrder = value; } }, metadata: _metadata }, _displayOrder_initializers, _displayOrder_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateSportInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateSportInput = _classThis;
}();
exports.CreateSportInput = CreateSportInput;
/** Patch semantics: every field is optional, and `undefined` means "leave it". */
var UpdateSportInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _iconUrl_decorators;
    var _iconUrl_initializers = [];
    var _iconUrl_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _pricingUnit_decorators;
    var _pricingUnit_initializers = [];
    var _pricingUnit_extraInitializers = [];
    var _unitLabel_decorators;
    var _unitLabel_initializers = [];
    var _unitLabel_extraInitializers = [];
    var _unitLabelPlural_decorators;
    var _unitLabelPlural_initializers = [];
    var _unitLabelPlural_extraInitializers = [];
    var _slotDurations_decorators;
    var _slotDurations_initializers = [];
    var _slotDurations_extraInitializers = [];
    var _defaultSlotMinutes_decorators;
    var _defaultSlotMinutes_initializers = [];
    var _defaultSlotMinutes_extraInitializers = [];
    var _minDurationMinutes_decorators;
    var _minDurationMinutes_initializers = [];
    var _minDurationMinutes_extraInitializers = [];
    var _maxDurationMinutes_decorators;
    var _maxDurationMinutes_initializers = [];
    var _maxDurationMinutes_extraInitializers = [];
    var _bookingMode_decorators;
    var _bookingMode_initializers = [];
    var _bookingMode_extraInitializers = [];
    var _defaultCapacity_decorators;
    var _defaultCapacity_initializers = [];
    var _defaultCapacity_extraInitializers = [];
    var _surfaces_decorators;
    var _surfaces_initializers = [];
    var _surfaces_extraInitializers = [];
    var _formats_decorators;
    var _formats_initializers = [];
    var _formats_extraInitializers = [];
    var _courtFeatures_decorators;
    var _courtFeatures_initializers = [];
    var _courtFeatures_extraInitializers = [];
    var _displayOrder_decorators;
    var _displayOrder_initializers = [];
    var _displayOrder_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var UpdateSportInput = _classThis = /** @class */ (function () {
        function UpdateSportInput_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.iconUrl = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _iconUrl_initializers, void 0));
            this.description = (__runInitializers(this, _iconUrl_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.pricingUnit = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _pricingUnit_initializers, void 0));
            this.unitLabel = (__runInitializers(this, _pricingUnit_extraInitializers), __runInitializers(this, _unitLabel_initializers, void 0));
            this.unitLabelPlural = (__runInitializers(this, _unitLabel_extraInitializers), __runInitializers(this, _unitLabelPlural_initializers, void 0));
            this.slotDurations = (__runInitializers(this, _unitLabelPlural_extraInitializers), __runInitializers(this, _slotDurations_initializers, void 0));
            this.defaultSlotMinutes = (__runInitializers(this, _slotDurations_extraInitializers), __runInitializers(this, _defaultSlotMinutes_initializers, void 0));
            this.minDurationMinutes = (__runInitializers(this, _defaultSlotMinutes_extraInitializers), __runInitializers(this, _minDurationMinutes_initializers, void 0));
            this.maxDurationMinutes = (__runInitializers(this, _minDurationMinutes_extraInitializers), __runInitializers(this, _maxDurationMinutes_initializers, void 0));
            this.bookingMode = (__runInitializers(this, _maxDurationMinutes_extraInitializers), __runInitializers(this, _bookingMode_initializers, void 0));
            this.defaultCapacity = (__runInitializers(this, _bookingMode_extraInitializers), __runInitializers(this, _defaultCapacity_initializers, void 0));
            this.surfaces = (__runInitializers(this, _defaultCapacity_extraInitializers), __runInitializers(this, _surfaces_initializers, void 0));
            this.formats = (__runInitializers(this, _surfaces_extraInitializers), __runInitializers(this, _formats_initializers, void 0));
            this.courtFeatures = (__runInitializers(this, _formats_extraInitializers), __runInitializers(this, _courtFeatures_initializers, void 0));
            this.displayOrder = (__runInitializers(this, _courtFeatures_extraInitializers), __runInitializers(this, _displayOrder_initializers, void 0));
            this.isActive = (__runInitializers(this, _displayOrder_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            __runInitializers(this, _isActive_extraInitializers);
        }
        return UpdateSportInput_1;
    }());
    __setFunctionName(_classThis, "UpdateSportInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _name_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1), (0, class_validator_1.MaxLength)(60)];
        _slug_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[a-z0-9]+(-[a-z0-9]+)*$/u, {
                message: 'Slug must be lowercase letters, digits, and hyphens only.',
            }), (0, class_validator_1.MaxLength)(60)];
        _iconUrl_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(2048)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _pricingUnit_decorators = [(0, graphql_1.Field)(function () { return client_1.SportPricingUnit; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.SportPricingUnit)];
        _unitLabel_decorators = [(0, sport_field_decorators_1.LabelField)('What one bookable unit is called — court, pitch, lane, table, bay.', 'court', {
                create: false,
            })];
        _unitLabelPlural_decorators = [(0, sport_field_decorators_1.LabelField)('Plural of `unitLabel`.', 'courts', { create: false })];
        _slotDurations_decorators = [(0, sport_field_decorators_1.SlotDurationsField)({ create: false })];
        _defaultSlotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(5)];
        _minDurationMinutes_decorators = [(0, sport_field_decorators_1.BoundedIntField)('Shortest bookable duration in minutes.', { min: 5, max: 1440 })];
        _maxDurationMinutes_decorators = [(0, sport_field_decorators_1.BoundedIntField)('Longest bookable duration in minutes.', { min: 5, max: 1440 })];
        _bookingMode_decorators = [(0, graphql_1.Field)(function () { return client_1.SportBookingMode; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.SportBookingMode)];
        _defaultCapacity_decorators = [(0, sport_field_decorators_1.BoundedIntField)('Places per slot. Required when `bookingMode` is CAPACITY.', {
                min: 1,
                max: 500,
            })];
        _surfaces_decorators = [(0, sport_field_decorators_1.TagListField)('Playing surfaces an owner picks from.', { create: false })];
        _formats_decorators = [(0, sport_field_decorators_1.TagListField)('Configurations sold, e.g. ["5-a-side"].', { create: false })];
        _courtFeatures_decorators = [(0, sport_field_decorators_1.TagListField)('Per-court features, e.g. ["Floodlights"].', { create: false })];
        _displayOrder_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
        _isActive_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _iconUrl_decorators, { kind: "field", name: "iconUrl", static: false, private: false, access: { has: function (obj) { return "iconUrl" in obj; }, get: function (obj) { return obj.iconUrl; }, set: function (obj, value) { obj.iconUrl = value; } }, metadata: _metadata }, _iconUrl_initializers, _iconUrl_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _pricingUnit_decorators, { kind: "field", name: "pricingUnit", static: false, private: false, access: { has: function (obj) { return "pricingUnit" in obj; }, get: function (obj) { return obj.pricingUnit; }, set: function (obj, value) { obj.pricingUnit = value; } }, metadata: _metadata }, _pricingUnit_initializers, _pricingUnit_extraInitializers);
        __esDecorate(null, null, _unitLabel_decorators, { kind: "field", name: "unitLabel", static: false, private: false, access: { has: function (obj) { return "unitLabel" in obj; }, get: function (obj) { return obj.unitLabel; }, set: function (obj, value) { obj.unitLabel = value; } }, metadata: _metadata }, _unitLabel_initializers, _unitLabel_extraInitializers);
        __esDecorate(null, null, _unitLabelPlural_decorators, { kind: "field", name: "unitLabelPlural", static: false, private: false, access: { has: function (obj) { return "unitLabelPlural" in obj; }, get: function (obj) { return obj.unitLabelPlural; }, set: function (obj, value) { obj.unitLabelPlural = value; } }, metadata: _metadata }, _unitLabelPlural_initializers, _unitLabelPlural_extraInitializers);
        __esDecorate(null, null, _slotDurations_decorators, { kind: "field", name: "slotDurations", static: false, private: false, access: { has: function (obj) { return "slotDurations" in obj; }, get: function (obj) { return obj.slotDurations; }, set: function (obj, value) { obj.slotDurations = value; } }, metadata: _metadata }, _slotDurations_initializers, _slotDurations_extraInitializers);
        __esDecorate(null, null, _defaultSlotMinutes_decorators, { kind: "field", name: "defaultSlotMinutes", static: false, private: false, access: { has: function (obj) { return "defaultSlotMinutes" in obj; }, get: function (obj) { return obj.defaultSlotMinutes; }, set: function (obj, value) { obj.defaultSlotMinutes = value; } }, metadata: _metadata }, _defaultSlotMinutes_initializers, _defaultSlotMinutes_extraInitializers);
        __esDecorate(null, null, _minDurationMinutes_decorators, { kind: "field", name: "minDurationMinutes", static: false, private: false, access: { has: function (obj) { return "minDurationMinutes" in obj; }, get: function (obj) { return obj.minDurationMinutes; }, set: function (obj, value) { obj.minDurationMinutes = value; } }, metadata: _metadata }, _minDurationMinutes_initializers, _minDurationMinutes_extraInitializers);
        __esDecorate(null, null, _maxDurationMinutes_decorators, { kind: "field", name: "maxDurationMinutes", static: false, private: false, access: { has: function (obj) { return "maxDurationMinutes" in obj; }, get: function (obj) { return obj.maxDurationMinutes; }, set: function (obj, value) { obj.maxDurationMinutes = value; } }, metadata: _metadata }, _maxDurationMinutes_initializers, _maxDurationMinutes_extraInitializers);
        __esDecorate(null, null, _bookingMode_decorators, { kind: "field", name: "bookingMode", static: false, private: false, access: { has: function (obj) { return "bookingMode" in obj; }, get: function (obj) { return obj.bookingMode; }, set: function (obj, value) { obj.bookingMode = value; } }, metadata: _metadata }, _bookingMode_initializers, _bookingMode_extraInitializers);
        __esDecorate(null, null, _defaultCapacity_decorators, { kind: "field", name: "defaultCapacity", static: false, private: false, access: { has: function (obj) { return "defaultCapacity" in obj; }, get: function (obj) { return obj.defaultCapacity; }, set: function (obj, value) { obj.defaultCapacity = value; } }, metadata: _metadata }, _defaultCapacity_initializers, _defaultCapacity_extraInitializers);
        __esDecorate(null, null, _surfaces_decorators, { kind: "field", name: "surfaces", static: false, private: false, access: { has: function (obj) { return "surfaces" in obj; }, get: function (obj) { return obj.surfaces; }, set: function (obj, value) { obj.surfaces = value; } }, metadata: _metadata }, _surfaces_initializers, _surfaces_extraInitializers);
        __esDecorate(null, null, _formats_decorators, { kind: "field", name: "formats", static: false, private: false, access: { has: function (obj) { return "formats" in obj; }, get: function (obj) { return obj.formats; }, set: function (obj, value) { obj.formats = value; } }, metadata: _metadata }, _formats_initializers, _formats_extraInitializers);
        __esDecorate(null, null, _courtFeatures_decorators, { kind: "field", name: "courtFeatures", static: false, private: false, access: { has: function (obj) { return "courtFeatures" in obj; }, get: function (obj) { return obj.courtFeatures; }, set: function (obj, value) { obj.courtFeatures = value; } }, metadata: _metadata }, _courtFeatures_initializers, _courtFeatures_extraInitializers);
        __esDecorate(null, null, _displayOrder_decorators, { kind: "field", name: "displayOrder", static: false, private: false, access: { has: function (obj) { return "displayOrder" in obj; }, get: function (obj) { return obj.displayOrder; }, set: function (obj, value) { obj.displayOrder = value; } }, metadata: _metadata }, _displayOrder_initializers, _displayOrder_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateSportInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateSportInput = _classThis;
}();
exports.UpdateSportInput = UpdateSportInput;
