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
exports.AdminSport = exports.SportUsage = void 0;
exports.mapSportToAdmin = mapSportToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var SportUsage = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Where a sport is currently referenced across the platform.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _courts_decorators;
    var _courts_initializers = [];
    var _courts_extraInitializers = [];
    var _venues_decorators;
    var _venues_initializers = [];
    var _venues_extraInitializers = [];
    var _tournaments_decorators;
    var _tournaments_initializers = [];
    var _tournaments_extraInitializers = [];
    var SportUsage = _classThis = /** @class */ (function () {
        function SportUsage_1() {
            this.courts = __runInitializers(this, _courts_initializers, void 0);
            this.venues = (__runInitializers(this, _courts_extraInitializers), __runInitializers(this, _venues_initializers, void 0));
            this.tournaments = (__runInitializers(this, _venues_extraInitializers), __runInitializers(this, _tournaments_initializers, void 0));
            __runInitializers(this, _tournaments_extraInitializers);
        }
        return SportUsage_1;
    }());
    __setFunctionName(_classThis, "SportUsage");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _courts_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _venues_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _tournaments_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _courts_decorators, { kind: "field", name: "courts", static: false, private: false, access: { has: function (obj) { return "courts" in obj; }, get: function (obj) { return obj.courts; }, set: function (obj, value) { obj.courts = value; } }, metadata: _metadata }, _courts_initializers, _courts_extraInitializers);
        __esDecorate(null, null, _venues_decorators, { kind: "field", name: "venues", static: false, private: false, access: { has: function (obj) { return "venues" in obj; }, get: function (obj) { return obj.venues; }, set: function (obj, value) { obj.venues = value; } }, metadata: _metadata }, _venues_initializers, _venues_extraInitializers);
        __esDecorate(null, null, _tournaments_decorators, { kind: "field", name: "tournaments", static: false, private: false, access: { has: function (obj) { return "tournaments" in obj; }, get: function (obj) { return obj.tournaments; }, set: function (obj, value) { obj.tournaments = value; } }, metadata: _metadata }, _tournaments_initializers, _tournaments_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SportUsage = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SportUsage = _classThis;
}();
exports.SportUsage = SportUsage;
var AdminSport = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'A sport in the platform catalogue. Every Court / Tournament references one of these, every Venue can offer many. These fields are the whole contract venue setup renders from — no client should know a sport by name.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
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
    var _features_decorators;
    var _features_initializers = [];
    var _features_extraInitializers = [];
    var _displayOrder_decorators;
    var _displayOrder_initializers = [];
    var _displayOrder_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _usage_decorators;
    var _usage_initializers = [];
    var _usage_extraInitializers = [];
    var _createdBy_decorators;
    var _createdBy_initializers = [];
    var _createdBy_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminSport = _classThis = /** @class */ (function () {
        function AdminSport_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.slug = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.name = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            /** Stored S3 object key; presigned to a download URL by AdminSportsResolver. */
            this.iconUrl = __runInitializers(this, _name_extraInitializers);
            this.description = __runInitializers(this, _description_initializers, void 0);
            // ── How it's sold ─────────────────────────────────────────────────────────
            this.pricingUnit = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _pricingUnit_initializers, void 0));
            this.unitLabel = (__runInitializers(this, _pricingUnit_extraInitializers), __runInitializers(this, _unitLabel_initializers, void 0));
            this.unitLabelPlural = (__runInitializers(this, _unitLabel_extraInitializers), __runInitializers(this, _unitLabelPlural_initializers, void 0));
            this.slotDurations = (__runInitializers(this, _unitLabelPlural_extraInitializers), __runInitializers(this, _slotDurations_initializers, void 0));
            this.defaultSlotMinutes = (__runInitializers(this, _slotDurations_extraInitializers), __runInitializers(this, _defaultSlotMinutes_initializers, void 0));
            this.minDurationMinutes = (__runInitializers(this, _defaultSlotMinutes_extraInitializers), __runInitializers(this, _minDurationMinutes_initializers, void 0));
            this.maxDurationMinutes = (__runInitializers(this, _minDurationMinutes_extraInitializers), __runInitializers(this, _maxDurationMinutes_initializers, void 0));
            this.bookingMode = (__runInitializers(this, _maxDurationMinutes_extraInitializers), __runInitializers(this, _bookingMode_initializers, void 0));
            this.defaultCapacity = (__runInitializers(this, _bookingMode_extraInitializers), __runInitializers(this, _defaultCapacity_initializers, void 0));
            // ── Court attribute catalogues ────────────────────────────────────────────
            this.surfaces = (__runInitializers(this, _defaultCapacity_extraInitializers), __runInitializers(this, _surfaces_initializers, void 0));
            this.formats = (__runInitializers(this, _surfaces_extraInitializers), __runInitializers(this, _formats_initializers, void 0));
            this.courtFeatures = (__runInitializers(this, _formats_extraInitializers), __runInitializers(this, _courtFeatures_initializers, void 0));
            this.features = (__runInitializers(this, _courtFeatures_extraInitializers), __runInitializers(this, _features_initializers, void 0));
            this.displayOrder = (__runInitializers(this, _features_extraInitializers), __runInitializers(this, _displayOrder_initializers, void 0));
            this.isActive = (__runInitializers(this, _displayOrder_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.usage = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _usage_initializers, void 0));
            this.createdBy = (__runInitializers(this, _usage_extraInitializers), __runInitializers(this, _createdBy_initializers, void 0));
            this.createdAt = (__runInitializers(this, _createdBy_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminSport_1;
    }());
    __setFunctionName(_classThis, "AdminSport");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _slug_decorators = [(0, graphql_1.Field)()];
        _name_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _pricingUnit_decorators = [(0, graphql_1.Field)(function () { return client_1.SportPricingUnit; })];
        _unitLabel_decorators = [(0, graphql_1.Field)({ description: 'What one bookable unit is called, e.g. "court", "lane", "table".' })];
        _unitLabelPlural_decorators = [(0, graphql_1.Field)()];
        _slotDurations_decorators = [(0, graphql_1.Field)(function () { return [graphql_1.Int]; }, { description: 'Allowed booking slot lengths (minutes) for this sport.' })];
        _defaultSlotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Slot length a new court starts on; one of `slotDurations`.' })];
        _minDurationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _maxDurationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _bookingMode_decorators = [(0, graphql_1.Field)(function () { return client_1.SportBookingMode; })];
        _defaultCapacity_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                nullable: true,
                description: 'Places per slot when bookingMode is CAPACITY.',
            })];
        _surfaces_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { description: 'Playing surfaces an owner picks one of, per court.' })];
        _formats_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { description: 'Configurations sold, e.g. ["5-a-side"].' })];
        _courtFeatures_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { description: 'Per-court features an owner toggles.' })];
        _features_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                deprecationReason: 'Derived from surfaces + formats + courtFeatures. Read those instead.',
                description: 'Flat chip list kept for the mobile app until it moves to the typed catalogues.',
            })];
        _displayOrder_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _usage_decorators = [(0, graphql_1.Field)(function () { return SportUsage; }, {
                description: 'Reference counts. Note that deactivating a sport hides it from new venue setup but does NOT unpublish courts that already use it.',
            })];
        _createdBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
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
        __esDecorate(null, null, _features_decorators, { kind: "field", name: "features", static: false, private: false, access: { has: function (obj) { return "features" in obj; }, get: function (obj) { return obj.features; }, set: function (obj, value) { obj.features = value; } }, metadata: _metadata }, _features_initializers, _features_extraInitializers);
        __esDecorate(null, null, _displayOrder_decorators, { kind: "field", name: "displayOrder", static: false, private: false, access: { has: function (obj) { return "displayOrder" in obj; }, get: function (obj) { return obj.displayOrder; }, set: function (obj, value) { obj.displayOrder = value; } }, metadata: _metadata }, _displayOrder_initializers, _displayOrder_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _usage_decorators, { kind: "field", name: "usage", static: false, private: false, access: { has: function (obj) { return "usage" in obj; }, get: function (obj) { return obj.usage; }, set: function (obj, value) { obj.usage = value; } }, metadata: _metadata }, _usage_initializers, _usage_extraInitializers);
        __esDecorate(null, null, _createdBy_decorators, { kind: "field", name: "createdBy", static: false, private: false, access: { has: function (obj) { return "createdBy" in obj; }, get: function (obj) { return obj.createdBy; }, set: function (obj, value) { obj.createdBy = value; } }, metadata: _metadata }, _createdBy_initializers, _createdBy_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminSport = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminSport = _classThis;
}();
exports.AdminSport = AdminSport;
function mapSportToAdmin(row) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        iconUrl: (_a = row.iconUrl) !== null && _a !== void 0 ? _a : undefined,
        description: (_b = row.description) !== null && _b !== void 0 ? _b : undefined,
        pricingUnit: row.pricingUnit,
        unitLabel: row.unitLabel,
        unitLabelPlural: row.unitLabelPlural,
        slotDurations: row.slotDurations,
        defaultSlotMinutes: row.defaultSlotMinutes,
        minDurationMinutes: (_c = row.minDurationMinutes) !== null && _c !== void 0 ? _c : undefined,
        maxDurationMinutes: (_d = row.maxDurationMinutes) !== null && _d !== void 0 ? _d : undefined,
        bookingMode: row.bookingMode,
        defaultCapacity: (_e = row.defaultCapacity) !== null && _e !== void 0 ? _e : undefined,
        surfaces: row.surfaces,
        formats: row.formats,
        courtFeatures: row.courtFeatures,
        features: row.features,
        displayOrder: row.displayOrder,
        isActive: row.isActive,
        usage: {
            courts: (_g = (_f = row._count) === null || _f === void 0 ? void 0 : _f.courts) !== null && _g !== void 0 ? _g : 0,
            venues: (_j = (_h = row._count) === null || _h === void 0 ? void 0 : _h.venueSports) !== null && _j !== void 0 ? _j : 0,
            tournaments: (_l = (_k = row._count) === null || _k === void 0 ? void 0 : _k.tournaments) !== null && _l !== void 0 ? _l : 0,
        },
        createdBy: row.createdBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(row.createdBy) : undefined,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
