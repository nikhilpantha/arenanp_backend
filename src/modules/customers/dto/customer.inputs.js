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
exports.CreateVenueCustomerInput = exports.ListVenueCustomersInput = exports.VenueCustomerSort = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
/** Sort order for the venue customer directory. */
var VenueCustomerSort;
(function (VenueCustomerSort) {
    VenueCustomerSort["CREATED"] = "CREATED";
    VenueCustomerSort["NAME"] = "NAME";
    VenueCustomerSort["SPEND"] = "SPEND";
    VenueCustomerSort["LAST_VISIT"] = "LAST_VISIT";
})(VenueCustomerSort || (exports.VenueCustomerSort = VenueCustomerSort = {}));
(0, graphql_1.registerEnumType)(VenueCustomerSort, { name: 'VenueCustomerSort' });
var ListVenueCustomersInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _kind_decorators;
    var _kind_initializers = [];
    var _kind_extraInitializers = [];
    var _hasActiveMembership_decorators;
    var _hasActiveMembership_initializers = [];
    var _hasActiveMembership_extraInitializers = [];
    var _sort_decorators;
    var _sort_initializers = [];
    var _sort_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var ListVenueCustomersInput = _classThis = /** @class */ (function () {
        function ListVenueCustomersInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.search = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _search_initializers, void 0));
            this.kind = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _kind_initializers, void 0));
            this.hasActiveMembership = (__runInitializers(this, _kind_extraInitializers), __runInitializers(this, _hasActiveMembership_initializers, void 0));
            this.sort = (__runInitializers(this, _hasActiveMembership_extraInitializers), __runInitializers(this, _sort_initializers, void 0));
            this.limit = (__runInitializers(this, _sort_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
            this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, void 0));
            __runInitializers(this, _offset_extraInitializers);
        }
        return ListVenueCustomersInput_1;
    }());
    __setFunctionName(_classThis, "ListVenueCustomersInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _search_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Case-insensitive name / phone search.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _kind_decorators = [(0, graphql_1.Field)(function () { return client_1.CustomerType; }, { nullable: true, description: 'Filter by party type.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.CustomerType)];
        _hasActiveMembership_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Only customers with a live membership.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _sort_decorators = [(0, graphql_1.Field)(function () { return VenueCustomerSort; }, { nullable: true, description: 'Defaults to CREATED (newest).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VenueCustomerSort)];
        _limit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                nullable: true,
                description: 'Max rows to return (page size). Defaults to 20.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
        _offset_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'Rows to skip (offset paging). Defaults to 0.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _kind_decorators, { kind: "field", name: "kind", static: false, private: false, access: { has: function (obj) { return "kind" in obj; }, get: function (obj) { return obj.kind; }, set: function (obj, value) { obj.kind = value; } }, metadata: _metadata }, _kind_initializers, _kind_extraInitializers);
        __esDecorate(null, null, _hasActiveMembership_decorators, { kind: "field", name: "hasActiveMembership", static: false, private: false, access: { has: function (obj) { return "hasActiveMembership" in obj; }, get: function (obj) { return obj.hasActiveMembership; }, set: function (obj, value) { obj.hasActiveMembership = value; } }, metadata: _metadata }, _hasActiveMembership_initializers, _hasActiveMembership_extraInitializers);
        __esDecorate(null, null, _sort_decorators, { kind: "field", name: "sort", static: false, private: false, access: { has: function (obj) { return "sort" in obj; }, get: function (obj) { return obj.sort; }, set: function (obj, value) { obj.sort = value; } }, metadata: _metadata }, _sort_initializers, _sort_extraInitializers);
        __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
        __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListVenueCustomersInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListVenueCustomersInput = _classThis;
}();
exports.ListVenueCustomersInput = ListVenueCustomersInput;
var CreateVenueCustomerInput = function () {
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
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var CreateVenueCustomerInput = _classThis = /** @class */ (function () {
        function CreateVenueCustomerInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.name = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.phone = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.notes = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            __runInitializers(this, _notes_extraInitializers);
        }
        return CreateVenueCustomerInput_1;
    }());
    __setFunctionName(_classThis, "CreateVenueCustomerInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _name_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _phone_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateVenueCustomerInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateVenueCustomerInput = _classThis;
}();
exports.CreateVenueCustomerInput = CreateVenueCustomerInput;
