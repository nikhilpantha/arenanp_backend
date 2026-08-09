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
exports.ListAdminTournamentsInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var pagination_input_1 = require("../../../../common/dto/pagination.input");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var ListAdminTournamentsInput = function () {
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
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _fromDate_decorators;
    var _fromDate_initializers = [];
    var _fromDate_extraInitializers = [];
    var _toDate_decorators;
    var _toDate_initializers = [];
    var _toDate_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var ListAdminTournamentsInput = _classThis = /** @class */ (function () {
        function ListAdminTournamentsInput_1() {
            this.pagination = __runInitializers(this, _pagination_initializers, void 0);
            this.search = (__runInitializers(this, _pagination_extraInitializers), __runInitializers(this, _search_initializers, void 0));
            this.status = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.visibility = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
            this.sport = (__runInitializers(this, _visibility_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.city = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.fromDate = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _fromDate_initializers, void 0));
            this.toDate = (__runInitializers(this, _fromDate_extraInitializers), __runInitializers(this, _toDate_initializers, void 0));
            this.sortOrder = (__runInitializers(this, _toDate_extraInitializers), __runInitializers(this, _sortOrder_initializers, admin_user_model_1.SortOrder.DESC));
            __runInitializers(this, _sortOrder_extraInitializers);
        }
        return ListAdminTournamentsInput_1;
    }());
    __setFunctionName(_classThis, "ListAdminTournamentsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _pagination_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PaginationInput; }, { defaultValue: { page: 1, pageSize: 20 } }), (0, class_validator_1.IsOptional)()];
        _search_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Match on tournament name, organizer name or city.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentStatus; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.TournamentStatus)];
        _visibility_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentVisibility; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.TournamentVisibility)];
        _sport_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Sport filter (matches Tournament.sport).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Exact city match (case-insensitive).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(80)];
        _fromDate_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Inclusive lower bound for startDate (ISO).' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _toDate_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Exclusive upper bound for startDate (ISO).' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _sortOrder_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.SortOrder; }, { defaultValue: admin_user_model_1.SortOrder.DESC }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(admin_user_model_1.SortOrder)];
        __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _fromDate_decorators, { kind: "field", name: "fromDate", static: false, private: false, access: { has: function (obj) { return "fromDate" in obj; }, get: function (obj) { return obj.fromDate; }, set: function (obj, value) { obj.fromDate = value; } }, metadata: _metadata }, _fromDate_initializers, _fromDate_extraInitializers);
        __esDecorate(null, null, _toDate_decorators, { kind: "field", name: "toDate", static: false, private: false, access: { has: function (obj) { return "toDate" in obj; }, get: function (obj) { return obj.toDate; }, set: function (obj, value) { obj.toDate = value; } }, metadata: _metadata }, _toDate_initializers, _toDate_extraInitializers);
        __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListAdminTournamentsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListAdminTournamentsInput = _classThis;
}();
exports.ListAdminTournamentsInput = ListAdminTournamentsInput;
