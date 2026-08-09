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
exports.ListAdminUsersInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var pagination_input_1 = require("../../../../common/dto/pagination.input");
var admin_user_model_1 = require("./admin-user.model");
var ListAdminUsersInput = function () {
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
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _organizerStatus_decorators;
    var _organizerStatus_initializers = [];
    var _organizerStatus_extraInitializers = [];
    var _venueStatus_decorators;
    var _venueStatus_initializers = [];
    var _venueStatus_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _includeStaff_decorators;
    var _includeStaff_initializers = [];
    var _includeStaff_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    var ListAdminUsersInput = _classThis = /** @class */ (function () {
        function ListAdminUsersInput_1() {
            this.pagination = __runInitializers(this, _pagination_initializers, void 0);
            this.search = (__runInitializers(this, _pagination_extraInitializers), __runInitializers(this, _search_initializers, void 0));
            this.role = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.organizerStatus = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _organizerStatus_initializers, void 0));
            this.venueStatus = (__runInitializers(this, _organizerStatus_extraInitializers), __runInitializers(this, _venueStatus_initializers, void 0));
            this.isActive = (__runInitializers(this, _venueStatus_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            /**
             * Platform, venue and tournament admins are excluded by default — this
             * directory is the customer list, and admins are managed under Staff. Set
             * true to search across everyone (e.g. to find an admin's own bookings).
             */
            this.includeStaff = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _includeStaff_initializers, void 0));
            this.sortBy = (__runInitializers(this, _includeStaff_extraInitializers), __runInitializers(this, _sortBy_initializers, admin_user_model_1.AdminUserSortField.CREATED_AT));
            this.sortOrder = (__runInitializers(this, _sortBy_extraInitializers), __runInitializers(this, _sortOrder_initializers, admin_user_model_1.SortOrder.DESC));
            __runInitializers(this, _sortOrder_extraInitializers);
        }
        return ListAdminUsersInput_1;
    }());
    __setFunctionName(_classThis, "ListAdminUsersInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _pagination_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PaginationInput; }, { defaultValue: { page: 1, pageSize: 20 } }), (0, class_validator_1.IsOptional)()];
        _search_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Case-insensitive match on fullName, phoneNumber or email.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.UserRole; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.UserRole)];
        _organizerStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; }, {
                nullable: true,
                description: 'Filter by ORGANIZER capability status.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.CapabilityStatus)];
        _venueStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; }, {
                nullable: true,
                description: 'Filter by VENUE capability status.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.CapabilityStatus)];
        _isActive_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'true = only active users, false = only suspended.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _includeStaff_decorators = [(0, graphql_1.Field)({
                defaultValue: false,
                description: 'Include admins in the results. They are excluded by default.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _sortBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUserSortField; }, { defaultValue: admin_user_model_1.AdminUserSortField.CREATED_AT }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(admin_user_model_1.AdminUserSortField)];
        _sortOrder_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.SortOrder; }, { defaultValue: admin_user_model_1.SortOrder.DESC }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(admin_user_model_1.SortOrder)];
        __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _organizerStatus_decorators, { kind: "field", name: "organizerStatus", static: false, private: false, access: { has: function (obj) { return "organizerStatus" in obj; }, get: function (obj) { return obj.organizerStatus; }, set: function (obj, value) { obj.organizerStatus = value; } }, metadata: _metadata }, _organizerStatus_initializers, _organizerStatus_extraInitializers);
        __esDecorate(null, null, _venueStatus_decorators, { kind: "field", name: "venueStatus", static: false, private: false, access: { has: function (obj) { return "venueStatus" in obj; }, get: function (obj) { return obj.venueStatus; }, set: function (obj, value) { obj.venueStatus = value; } }, metadata: _metadata }, _venueStatus_initializers, _venueStatus_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _includeStaff_decorators, { kind: "field", name: "includeStaff", static: false, private: false, access: { has: function (obj) { return "includeStaff" in obj; }, get: function (obj) { return obj.includeStaff; }, set: function (obj, value) { obj.includeStaff = value; } }, metadata: _metadata }, _includeStaff_initializers, _includeStaff_extraInitializers);
        __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
        __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListAdminUsersInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListAdminUsersInput = _classThis;
}();
exports.ListAdminUsersInput = ListAdminUsersInput;
