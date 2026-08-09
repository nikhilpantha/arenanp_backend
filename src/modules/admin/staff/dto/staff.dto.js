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
exports.StaffPermissionsView = exports.ListStaffOutput = exports.StaffMember = exports.StaffAssignment = exports.ListStaffInput = exports.CreateStaffInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var rbac_types_1 = require("../../../rbac/dto/rbac.types");
// ─── Inputs ─────────────────────────────────────────────────────────────────
/**
 * Create a staff member.
 *
 * No role is assigned — every staff member is an admin of their scope, and what
 * they can actually do is granted afterwards on the permissions screen.
 * `permissionKeys` is an optional convenience so the create form can seed an
 * initial set in the same call.
 */
var CreateStaffInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _scopeType_decorators;
    var _scopeType_initializers = [];
    var _scopeType_extraInitializers = [];
    var _scopeId_decorators;
    var _scopeId_initializers = [];
    var _scopeId_extraInitializers = [];
    var _permissionKeys_decorators;
    var _permissionKeys_initializers = [];
    var _permissionKeys_extraInitializers = [];
    var CreateStaffInput = _classThis = /** @class */ (function () {
        function CreateStaffInput_1() {
            this.email = __runInitializers(this, _email_initializers, void 0);
            this.fullName = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.scopeType = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _scopeType_initializers, void 0));
            this.scopeId = (__runInitializers(this, _scopeType_extraInitializers), __runInitializers(this, _scopeId_initializers, void 0));
            this.permissionKeys = (__runInitializers(this, _scopeId_extraInitializers), __runInitializers(this, _permissionKeys_initializers, void 0));
            __runInitializers(this, _permissionKeys_extraInitializers);
        }
        return CreateStaffInput_1;
    }());
    __setFunctionName(_classThis, "CreateStaffInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _email_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)()];
        _fullName_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)()];
        _scopeType_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionScopeType; }, {
                description: 'Whether this admin runs the platform, a single venue, or a single tournament.',
            }), (0, class_validator_1.IsEnum)(client_1.PermissionScopeType)];
        _scopeId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, {
                nullable: true,
                description: 'Venue or tournament id. Required unless scopeType is PLATFORM.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _permissionKeys_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                nullable: true,
                description: 'Optional starting permissions. Can be left empty and granted later.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _scopeType_decorators, { kind: "field", name: "scopeType", static: false, private: false, access: { has: function (obj) { return "scopeType" in obj; }, get: function (obj) { return obj.scopeType; }, set: function (obj, value) { obj.scopeType = value; } }, metadata: _metadata }, _scopeType_initializers, _scopeType_extraInitializers);
        __esDecorate(null, null, _scopeId_decorators, { kind: "field", name: "scopeId", static: false, private: false, access: { has: function (obj) { return "scopeId" in obj; }, get: function (obj) { return obj.scopeId; }, set: function (obj, value) { obj.scopeId = value; } }, metadata: _metadata }, _scopeId_initializers, _scopeId_extraInitializers);
        __esDecorate(null, null, _permissionKeys_decorators, { kind: "field", name: "permissionKeys", static: false, private: false, access: { has: function (obj) { return "permissionKeys" in obj; }, get: function (obj) { return obj.permissionKeys; }, set: function (obj, value) { obj.permissionKeys = value; } }, metadata: _metadata }, _permissionKeys_initializers, _permissionKeys_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateStaffInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateStaffInput = _classThis;
}();
exports.CreateStaffInput = CreateStaffInput;
var ListStaffInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var _scopeType_decorators;
    var _scopeType_initializers = [];
    var _scopeType_extraInitializers = [];
    var _scopeId_decorators;
    var _scopeId_initializers = [];
    var _scopeId_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var ListStaffInput = _classThis = /** @class */ (function () {
        function ListStaffInput_1() {
            this.limit = __runInitializers(this, _limit_initializers, void 0);
            this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, void 0));
            this.scopeType = (__runInitializers(this, _offset_extraInitializers), __runInitializers(this, _scopeType_initializers, void 0));
            this.scopeId = (__runInitializers(this, _scopeType_extraInitializers), __runInitializers(this, _scopeId_initializers, void 0));
            this.isActive = (__runInitializers(this, _scopeId_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            __runInitializers(this, _isActive_extraInitializers);
        }
        return ListStaffInput_1;
    }());
    __setFunctionName(_classThis, "ListStaffInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _limit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
        _offset_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
        _scopeType_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionScopeType; }, {
                nullable: true,
                description: 'Filter to admins of one scope type.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PermissionScopeType)];
        _scopeId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true, description: 'Filter to admins of one venue or tournament.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _isActive_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
        __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
        __esDecorate(null, null, _scopeType_decorators, { kind: "field", name: "scopeType", static: false, private: false, access: { has: function (obj) { return "scopeType" in obj; }, get: function (obj) { return obj.scopeType; }, set: function (obj, value) { obj.scopeType = value; } }, metadata: _metadata }, _scopeType_initializers, _scopeType_extraInitializers);
        __esDecorate(null, null, _scopeId_decorators, { kind: "field", name: "scopeId", static: false, private: false, access: { has: function (obj) { return "scopeId" in obj; }, get: function (obj) { return obj.scopeId; }, set: function (obj, value) { obj.scopeId = value; } }, metadata: _metadata }, _scopeId_initializers, _scopeId_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListStaffInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListStaffInput = _classThis;
}();
exports.ListStaffInput = ListStaffInput;
// ─── Objects ────────────────────────────────────────────────────────────────
/** Where a staff member is an admin. */
var StaffAssignment = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _scopeType_decorators;
    var _scopeType_initializers = [];
    var _scopeType_extraInitializers = [];
    var _scopeId_decorators;
    var _scopeId_initializers = [];
    var _scopeId_extraInitializers = [];
    var _scopeName_decorators;
    var _scopeName_initializers = [];
    var _scopeName_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _permissionCount_decorators;
    var _permissionCount_initializers = [];
    var _permissionCount_extraInitializers = [];
    var StaffAssignment = _classThis = /** @class */ (function () {
        function StaffAssignment_1() {
            this.scopeType = __runInitializers(this, _scopeType_initializers, void 0);
            this.scopeId = (__runInitializers(this, _scopeType_extraInitializers), __runInitializers(this, _scopeId_initializers, void 0));
            this.scopeName = (__runInitializers(this, _scopeId_extraInitializers), __runInitializers(this, _scopeName_initializers, void 0));
            this.status = (__runInitializers(this, _scopeName_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.permissionCount = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _permissionCount_initializers, void 0));
            __runInitializers(this, _permissionCount_extraInitializers);
        }
        return StaffAssignment_1;
    }());
    __setFunctionName(_classThis, "StaffAssignment");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _scopeType_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionScopeType; })];
        _scopeId_decorators = [(0, graphql_1.Field)({ description: 'Venue or tournament id; empty string for platform admins.' })];
        _scopeName_decorators = [(0, graphql_1.Field)(function () { return String; }, {
                nullable: true,
                description: 'Venue or tournament name, resolved for display.',
            })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.StaffStatus; })];
        _permissionCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'How many permissions they hold in this scope.' })];
        __esDecorate(null, null, _scopeType_decorators, { kind: "field", name: "scopeType", static: false, private: false, access: { has: function (obj) { return "scopeType" in obj; }, get: function (obj) { return obj.scopeType; }, set: function (obj, value) { obj.scopeType = value; } }, metadata: _metadata }, _scopeType_initializers, _scopeType_extraInitializers);
        __esDecorate(null, null, _scopeId_decorators, { kind: "field", name: "scopeId", static: false, private: false, access: { has: function (obj) { return "scopeId" in obj; }, get: function (obj) { return obj.scopeId; }, set: function (obj, value) { obj.scopeId = value; } }, metadata: _metadata }, _scopeId_initializers, _scopeId_extraInitializers);
        __esDecorate(null, null, _scopeName_decorators, { kind: "field", name: "scopeName", static: false, private: false, access: { has: function (obj) { return "scopeName" in obj; }, get: function (obj) { return obj.scopeName; }, set: function (obj, value) { obj.scopeName = value; } }, metadata: _metadata }, _scopeName_initializers, _scopeName_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _permissionCount_decorators, { kind: "field", name: "permissionCount", static: false, private: false, access: { has: function (obj) { return "permissionCount" in obj; }, get: function (obj) { return obj.permissionCount; }, set: function (obj, value) { obj.permissionCount = value; } }, metadata: _metadata }, _permissionCount_initializers, _permissionCount_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffAssignment = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffAssignment = _classThis;
}();
exports.StaffAssignment = StaffAssignment;
var StaffMember = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _assignments_decorators;
    var _assignments_initializers = [];
    var _assignments_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var StaffMember = _classThis = /** @class */ (function () {
        function StaffMember_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.phoneNumber = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.fullName = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.email = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            /**
             * Legacy platform enum, kept only as a coarse marker: SUPER_ADMIN is
             * unrestricted, everyone else is ADMIN. Never branch on it for authorization
             * — read the permission grants instead.
             */
            this.role = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.assignments = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _assignments_initializers, void 0));
            this.isActive = (__runInitializers(this, _assignments_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            this.createdAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return StaffMember_1;
    }());
    __setFunctionName(_classThis, "StaffMember");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)()];
        _phoneNumber_decorators = [(0, graphql_1.Field)()];
        _fullName_decorators = [(0, graphql_1.Field)(function () { return String; }, { nullable: true })];
        _email_decorators = [(0, graphql_1.Field)(function () { return String; }, { nullable: true })];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.UserRole; }, {
                deprecationReason: 'Authorization comes from permission grants; this is only a staff marker.',
            })];
        _assignments_decorators = [(0, graphql_1.Field)(function () { return [StaffAssignment]; }, {
                description: 'Scopes this person administers, with a permission count for each.',
            })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _assignments_decorators, { kind: "field", name: "assignments", static: false, private: false, access: { has: function (obj) { return "assignments" in obj; }, get: function (obj) { return obj.assignments; }, set: function (obj, value) { obj.assignments = value; } }, metadata: _metadata }, _assignments_initializers, _assignments_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffMember = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffMember = _classThis;
}();
exports.StaffMember = StaffMember;
var ListStaffOutput = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _offset_decorators;
    var _offset_initializers = [];
    var _offset_extraInitializers = [];
    var ListStaffOutput = _classThis = /** @class */ (function () {
        function ListStaffOutput_1() {
            this.items = __runInitializers(this, _items_initializers, void 0);
            this.total = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.limit = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
            this.offset = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _offset_initializers, void 0));
            __runInitializers(this, _offset_extraInitializers);
        }
        return ListStaffOutput_1;
    }());
    __setFunctionName(_classThis, "ListStaffOutput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _items_decorators = [(0, graphql_1.Field)(function () { return [StaffMember]; })];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _limit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _offset_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
        __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: function (obj) { return "offset" in obj; }, get: function (obj) { return obj.offset; }, set: function (obj, value) { obj.offset = value; } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListStaffOutput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListStaffOutput = _classThis;
}();
exports.ListStaffOutput = ListStaffOutput;
/** A staff member's effective access in one scope. */
var StaffPermissionsView = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _grants_decorators;
    var _grants_initializers = [];
    var _grants_extraInitializers = [];
    var _permissions_decorators;
    var _permissions_initializers = [];
    var _permissions_extraInitializers = [];
    var StaffPermissionsView = _classThis = /** @class */ (function () {
        function StaffPermissionsView_1() {
            this.grants = __runInitializers(this, _grants_initializers, void 0);
            this.permissions = (__runInitializers(this, _grants_extraInitializers), __runInitializers(this, _permissions_initializers, void 0));
            __runInitializers(this, _permissions_extraInitializers);
        }
        return StaffPermissionsView_1;
    }());
    __setFunctionName(_classThis, "StaffPermissionsView");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _grants_decorators = [(0, graphql_1.Field)(function () { return [rbac_types_1.StaffPermissionObject]; }, { description: 'The individual grants.' })];
        _permissions_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                description: 'Effective permission keys. `["*"]` means unrestricted (super admin).',
            })];
        __esDecorate(null, null, _grants_decorators, { kind: "field", name: "grants", static: false, private: false, access: { has: function (obj) { return "grants" in obj; }, get: function (obj) { return obj.grants; }, set: function (obj, value) { obj.grants = value; } }, metadata: _metadata }, _grants_initializers, _grants_extraInitializers);
        __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: function (obj) { return "permissions" in obj; }, get: function (obj) { return obj.permissions; }, set: function (obj, value) { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _permissions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffPermissionsView = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffPermissionsView = _classThis;
}();
exports.StaffPermissionsView = StaffPermissionsView;
