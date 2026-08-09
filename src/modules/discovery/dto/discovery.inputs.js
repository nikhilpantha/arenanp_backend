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
exports.CourtSlotsInput = exports.BrowseVenuesInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var pagination_input_1 = require("../../../common/dto/pagination.input");
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
var BrowseVenuesInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _pagination_decorators;
    var _pagination_initializers = [];
    var _pagination_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _sportSlug_decorators;
    var _sportSlug_initializers = [];
    var _sportSlug_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var BrowseVenuesInput = _classThis = /** @class */ (function () {
        function BrowseVenuesInput_1() {
            this.pagination = __runInitializers(this, _pagination_initializers, void 0);
            this.search = (__runInitializers(this, _pagination_extraInitializers), __runInitializers(this, _search_initializers, void 0));
            this.sportSlug = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _sportSlug_initializers, void 0));
            this.city = (__runInitializers(this, _sportSlug_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            __runInitializers(this, _city_extraInitializers);
        }
        return BrowseVenuesInput_1;
    }());
    __setFunctionName(_classThis, "BrowseVenuesInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _pagination_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PaginationInput; }, { defaultValue: { page: 1, pageSize: 20 } }), (0, class_validator_1.IsOptional)()];
        _search_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Free-text search on venue name.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _sportSlug_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Filter by sport slug.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Filter by city.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(80)];
        __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _sportSlug_decorators, { kind: "field", name: "sportSlug", static: false, private: false, access: { has: function (obj) { return "sportSlug" in obj; }, get: function (obj) { return obj.sportSlug; }, set: function (obj, value) { obj.sportSlug = value; } }, metadata: _metadata }, _sportSlug_initializers, _sportSlug_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BrowseVenuesInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BrowseVenuesInput = _classThis;
}();
exports.BrowseVenuesInput = BrowseVenuesInput;
var CourtSlotsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var CourtSlotsInput = _classThis = /** @class */ (function () {
        function CourtSlotsInput_1() {
            this.courtId = __runInitializers(this, _courtId_initializers, void 0);
            this.date = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            __runInitializers(this, _date_extraInitializers);
        }
        return CourtSlotsInput_1;
    }());
    __setFunctionName(_classThis, "CourtSlotsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _date_decorators = [(0, graphql_1.Field)({ description: 'Day to list slots for (yyyy-mm-dd, venue-local).' }), (0, class_validator_1.Matches)(DATE_RE, { message: 'date must be yyyy-mm-dd' })];
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CourtSlotsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CourtSlotsInput = _classThis;
}();
exports.CourtSlotsInput = CourtSlotsInput;
