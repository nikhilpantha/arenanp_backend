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
exports.RevokeStaffPermissionInput = exports.GrantStaffPermissionInput = exports.SetStaffPermissionsInput = exports.PermissionScopeInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
/**
 * Which scope a grant applies to.
 *
 * `scopeId` is the venue or tournament id, and is required unless `scopeType`
 * is PLATFORM.
 */
var PermissionScopeInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _scopeType_decorators;
    var _scopeType_initializers = [];
    var _scopeType_extraInitializers = [];
    var _scopeId_decorators;
    var _scopeId_initializers = [];
    var _scopeId_extraInitializers = [];
    var PermissionScopeInput = _classThis = /** @class */ (function () {
        function PermissionScopeInput_1() {
            this.scopeType = __runInitializers(this, _scopeType_initializers, void 0);
            this.scopeId = (__runInitializers(this, _scopeType_extraInitializers), __runInitializers(this, _scopeId_initializers, void 0));
            __runInitializers(this, _scopeId_extraInitializers);
        }
        return PermissionScopeInput_1;
    }());
    __setFunctionName(_classThis, "PermissionScopeInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _scopeType_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionScopeType; }), (0, class_validator_1.IsEnum)(client_1.PermissionScopeType)];
        _scopeId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, {
                nullable: true,
                description: 'Venue or tournament id. Omit for platform-wide permissions.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _scopeType_decorators, { kind: "field", name: "scopeType", static: false, private: false, access: { has: function (obj) { return "scopeType" in obj; }, get: function (obj) { return obj.scopeType; }, set: function (obj, value) { obj.scopeType = value; } }, metadata: _metadata }, _scopeType_initializers, _scopeType_extraInitializers);
        __esDecorate(null, null, _scopeId_decorators, { kind: "field", name: "scopeId", static: false, private: false, access: { has: function (obj) { return "scopeId" in obj; }, get: function (obj) { return obj.scopeId; }, set: function (obj, value) { obj.scopeId = value; } }, metadata: _metadata }, _scopeId_initializers, _scopeId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionScopeInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionScopeInput = _classThis;
}();
exports.PermissionScopeInput = PermissionScopeInput;
var SetStaffPermissionsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _scope_decorators;
    var _scope_initializers = [];
    var _scope_extraInitializers = [];
    var _permissionKeys_decorators;
    var _permissionKeys_initializers = [];
    var _permissionKeys_extraInitializers = [];
    var SetStaffPermissionsInput = _classThis = /** @class */ (function () {
        function SetStaffPermissionsInput_1() {
            this.userId = __runInitializers(this, _userId_initializers, void 0);
            // Nested inputs need both decorators, or the global whitelisting
            // ValidationPipe strips the object and rejects the request.
            this.scope = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _scope_initializers, void 0));
            this.permissionKeys = (__runInitializers(this, _scope_extraInitializers), __runInitializers(this, _permissionKeys_initializers, void 0));
            __runInitializers(this, _permissionKeys_extraInitializers);
        }
        return SetStaffPermissionsInput_1;
    }());
    __setFunctionName(_classThis, "SetStaffPermissionsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _userId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _scope_decorators = [(0, graphql_1.Field)(function () { return PermissionScopeInput; }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return PermissionScopeInput; })];
        _permissionKeys_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                description: 'The complete set for this scope — anything omitted is revoked.',
            }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _scope_decorators, { kind: "field", name: "scope", static: false, private: false, access: { has: function (obj) { return "scope" in obj; }, get: function (obj) { return obj.scope; }, set: function (obj, value) { obj.scope = value; } }, metadata: _metadata }, _scope_initializers, _scope_extraInitializers);
        __esDecorate(null, null, _permissionKeys_decorators, { kind: "field", name: "permissionKeys", static: false, private: false, access: { has: function (obj) { return "permissionKeys" in obj; }, get: function (obj) { return obj.permissionKeys; }, set: function (obj, value) { obj.permissionKeys = value; } }, metadata: _metadata }, _permissionKeys_initializers, _permissionKeys_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SetStaffPermissionsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SetStaffPermissionsInput = _classThis;
}();
exports.SetStaffPermissionsInput = SetStaffPermissionsInput;
var GrantStaffPermissionInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _permissionKey_decorators;
    var _permissionKey_initializers = [];
    var _permissionKey_extraInitializers = [];
    var _scope_decorators;
    var _scope_initializers = [];
    var _scope_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var GrantStaffPermissionInput = _classThis = /** @class */ (function () {
        function GrantStaffPermissionInput_1() {
            this.userId = __runInitializers(this, _userId_initializers, void 0);
            this.permissionKey = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _permissionKey_initializers, void 0));
            // Nested inputs need both decorators, or the global whitelisting
            // ValidationPipe strips the object and rejects the request.
            this.scope = (__runInitializers(this, _permissionKey_extraInitializers), __runInitializers(this, _scope_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _scope_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.reason = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return GrantStaffPermissionInput_1;
    }());
    __setFunctionName(_classThis, "GrantStaffPermissionInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _userId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _permissionKey_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)()];
        _scope_decorators = [(0, graphql_1.Field)(function () { return PermissionScopeInput; }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return PermissionScopeInput; })];
        _expiresAt_decorators = [(0, graphql_1.Field)(function () { return Date; }, { nullable: true, description: 'Optional expiry for temporary access.' }), (0, class_validator_1.IsOptional)()];
        _reason_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _permissionKey_decorators, { kind: "field", name: "permissionKey", static: false, private: false, access: { has: function (obj) { return "permissionKey" in obj; }, get: function (obj) { return obj.permissionKey; }, set: function (obj, value) { obj.permissionKey = value; } }, metadata: _metadata }, _permissionKey_initializers, _permissionKey_extraInitializers);
        __esDecorate(null, null, _scope_decorators, { kind: "field", name: "scope", static: false, private: false, access: { has: function (obj) { return "scope" in obj; }, get: function (obj) { return obj.scope; }, set: function (obj, value) { obj.scope = value; } }, metadata: _metadata }, _scope_initializers, _scope_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GrantStaffPermissionInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GrantStaffPermissionInput = _classThis;
}();
exports.GrantStaffPermissionInput = GrantStaffPermissionInput;
var RevokeStaffPermissionInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _permissionKey_decorators;
    var _permissionKey_initializers = [];
    var _permissionKey_extraInitializers = [];
    var _scope_decorators;
    var _scope_initializers = [];
    var _scope_extraInitializers = [];
    var RevokeStaffPermissionInput = _classThis = /** @class */ (function () {
        function RevokeStaffPermissionInput_1() {
            this.userId = __runInitializers(this, _userId_initializers, void 0);
            this.permissionKey = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _permissionKey_initializers, void 0));
            // Nested inputs need both decorators, or the global whitelisting
            // ValidationPipe strips the object and rejects the request.
            this.scope = (__runInitializers(this, _permissionKey_extraInitializers), __runInitializers(this, _scope_initializers, void 0));
            __runInitializers(this, _scope_extraInitializers);
        }
        return RevokeStaffPermissionInput_1;
    }());
    __setFunctionName(_classThis, "RevokeStaffPermissionInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _userId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _permissionKey_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)()];
        _scope_decorators = [(0, graphql_1.Field)(function () { return PermissionScopeInput; }), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return PermissionScopeInput; })];
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _permissionKey_decorators, { kind: "field", name: "permissionKey", static: false, private: false, access: { has: function (obj) { return "permissionKey" in obj; }, get: function (obj) { return obj.permissionKey; }, set: function (obj, value) { obj.permissionKey = value; } }, metadata: _metadata }, _permissionKey_initializers, _permissionKey_extraInitializers);
        __esDecorate(null, null, _scope_decorators, { kind: "field", name: "scope", static: false, private: false, access: { has: function (obj) { return "scope" in obj; }, get: function (obj) { return obj.scope; }, set: function (obj, value) { obj.scope = value; } }, metadata: _metadata }, _scope_initializers, _scope_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RevokeStaffPermissionInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RevokeStaffPermissionInput = _classThis;
}();
exports.RevokeStaffPermissionInput = RevokeStaffPermissionInput;
