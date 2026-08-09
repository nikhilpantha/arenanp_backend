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
exports.EffectivePermissionsObject = exports.PermissionScopeObject = exports.StaffPermissionObject = exports.PermissionObject = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var PermissionObject = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _key_decorators;
    var _key_initializers = [];
    var _key_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _domain_decorators;
    var _domain_initializers = [];
    var _domain_extraInitializers = [];
    var PermissionObject = _classThis = /** @class */ (function () {
        function PermissionObject_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.key = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _key_initializers, void 0));
            this.name = (__runInitializers(this, _key_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.domain = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _domain_initializers, void 0));
            __runInitializers(this, _domain_extraInitializers);
        }
        return PermissionObject_1;
    }());
    __setFunctionName(_classThis, "PermissionObject");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _key_decorators = [(0, graphql_1.Field)()];
        _name_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)(function () { return String; }, { nullable: true })];
        _domain_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionDomain; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _key_decorators, { kind: "field", name: "key", static: false, private: false, access: { has: function (obj) { return "key" in obj; }, get: function (obj) { return obj.key; }, set: function (obj, value) { obj.key = value; } }, metadata: _metadata }, _key_initializers, _key_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _domain_decorators, { kind: "field", name: "domain", static: false, private: false, access: { has: function (obj) { return "domain" in obj; }, get: function (obj) { return obj.domain; }, set: function (obj, value) { obj.domain = value; } }, metadata: _metadata }, _domain_initializers, _domain_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionObject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionObject = _classThis;
}();
exports.PermissionObject = PermissionObject;
/** One permission granted to one staff member within one scope. */
var StaffPermissionObject = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _permissionKey_decorators;
    var _permissionKey_initializers = [];
    var _permissionKey_extraInitializers = [];
    var _permission_decorators;
    var _permission_initializers = [];
    var _permission_extraInitializers = [];
    var _scopeType_decorators;
    var _scopeType_initializers = [];
    var _scopeType_extraInitializers = [];
    var _scopeId_decorators;
    var _scopeId_initializers = [];
    var _scopeId_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _grantedById_decorators;
    var _grantedById_initializers = [];
    var _grantedById_extraInitializers = [];
    var _grantedAt_decorators;
    var _grantedAt_initializers = [];
    var _grantedAt_extraInitializers = [];
    var StaffPermissionObject = _classThis = /** @class */ (function () {
        function StaffPermissionObject_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.userId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.permissionKey = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _permissionKey_initializers, void 0));
            this.permission = (__runInitializers(this, _permissionKey_extraInitializers), __runInitializers(this, _permission_initializers, void 0));
            this.scopeType = (__runInitializers(this, _permission_extraInitializers), __runInitializers(this, _scopeType_initializers, void 0));
            this.scopeId = (__runInitializers(this, _scopeType_extraInitializers), __runInitializers(this, _scopeId_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _scopeId_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.reason = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            this.grantedById = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _grantedById_initializers, void 0));
            this.grantedAt = (__runInitializers(this, _grantedById_extraInitializers), __runInitializers(this, _grantedAt_initializers, void 0));
            __runInitializers(this, _grantedAt_extraInitializers);
        }
        return StaffPermissionObject_1;
    }());
    __setFunctionName(_classThis, "StaffPermissionObject");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _userId_decorators = [(0, graphql_1.Field)()];
        _permissionKey_decorators = [(0, graphql_1.Field)()];
        _permission_decorators = [(0, graphql_1.Field)(function () { return PermissionObject; })];
        _scopeType_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionScopeType; })];
        _scopeId_decorators = [(0, graphql_1.Field)({ description: 'Venue or tournament id; empty string for platform-wide grants.' })];
        _expiresAt_decorators = [(0, graphql_1.Field)(function () { return Date; }, { nullable: true, description: 'Null means the grant never expires.' })];
        _reason_decorators = [(0, graphql_1.Field)(function () { return String; }, { nullable: true })];
        _grantedById_decorators = [(0, graphql_1.Field)()];
        _grantedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _permissionKey_decorators, { kind: "field", name: "permissionKey", static: false, private: false, access: { has: function (obj) { return "permissionKey" in obj; }, get: function (obj) { return obj.permissionKey; }, set: function (obj, value) { obj.permissionKey = value; } }, metadata: _metadata }, _permissionKey_initializers, _permissionKey_extraInitializers);
        __esDecorate(null, null, _permission_decorators, { kind: "field", name: "permission", static: false, private: false, access: { has: function (obj) { return "permission" in obj; }, get: function (obj) { return obj.permission; }, set: function (obj, value) { obj.permission = value; } }, metadata: _metadata }, _permission_initializers, _permission_extraInitializers);
        __esDecorate(null, null, _scopeType_decorators, { kind: "field", name: "scopeType", static: false, private: false, access: { has: function (obj) { return "scopeType" in obj; }, get: function (obj) { return obj.scopeType; }, set: function (obj, value) { obj.scopeType = value; } }, metadata: _metadata }, _scopeType_initializers, _scopeType_extraInitializers);
        __esDecorate(null, null, _scopeId_decorators, { kind: "field", name: "scopeId", static: false, private: false, access: { has: function (obj) { return "scopeId" in obj; }, get: function (obj) { return obj.scopeId; }, set: function (obj, value) { obj.scopeId = value; } }, metadata: _metadata }, _scopeId_initializers, _scopeId_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _grantedById_decorators, { kind: "field", name: "grantedById", static: false, private: false, access: { has: function (obj) { return "grantedById" in obj; }, get: function (obj) { return obj.grantedById; }, set: function (obj, value) { obj.grantedById = value; } }, metadata: _metadata }, _grantedById_initializers, _grantedById_extraInitializers);
        __esDecorate(null, null, _grantedAt_decorators, { kind: "field", name: "grantedAt", static: false, private: false, access: { has: function (obj) { return "grantedAt" in obj; }, get: function (obj) { return obj.grantedAt; }, set: function (obj, value) { obj.grantedAt = value; } }, metadata: _metadata }, _grantedAt_initializers, _grantedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffPermissionObject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffPermissionObject = _classThis;
}();
exports.StaffPermissionObject = StaffPermissionObject;
/** A scope a staff member holds grants in, with how many they hold there. */
var PermissionScopeObject = function () {
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
    var _permissionCount_decorators;
    var _permissionCount_initializers = [];
    var _permissionCount_extraInitializers = [];
    var PermissionScopeObject = _classThis = /** @class */ (function () {
        function PermissionScopeObject_1() {
            this.scopeType = __runInitializers(this, _scopeType_initializers, void 0);
            this.scopeId = (__runInitializers(this, _scopeType_extraInitializers), __runInitializers(this, _scopeId_initializers, void 0));
            this.permissionCount = (__runInitializers(this, _scopeId_extraInitializers), __runInitializers(this, _permissionCount_initializers, void 0));
            __runInitializers(this, _permissionCount_extraInitializers);
        }
        return PermissionScopeObject_1;
    }());
    __setFunctionName(_classThis, "PermissionScopeObject");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _scopeType_decorators = [(0, graphql_1.Field)(function () { return client_1.PermissionScopeType; })];
        _scopeId_decorators = [(0, graphql_1.Field)()];
        _permissionCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        __esDecorate(null, null, _scopeType_decorators, { kind: "field", name: "scopeType", static: false, private: false, access: { has: function (obj) { return "scopeType" in obj; }, get: function (obj) { return obj.scopeType; }, set: function (obj, value) { obj.scopeType = value; } }, metadata: _metadata }, _scopeType_initializers, _scopeType_extraInitializers);
        __esDecorate(null, null, _scopeId_decorators, { kind: "field", name: "scopeId", static: false, private: false, access: { has: function (obj) { return "scopeId" in obj; }, get: function (obj) { return obj.scopeId; }, set: function (obj, value) { obj.scopeId = value; } }, metadata: _metadata }, _scopeId_initializers, _scopeId_extraInitializers);
        __esDecorate(null, null, _permissionCount_decorators, { kind: "field", name: "permissionCount", static: false, private: false, access: { has: function (obj) { return "permissionCount" in obj; }, get: function (obj) { return obj.permissionCount; }, set: function (obj, value) { obj.permissionCount = value; } }, metadata: _metadata }, _permissionCount_initializers, _permissionCount_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionScopeObject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionScopeObject = _classThis;
}();
exports.PermissionScopeObject = PermissionScopeObject;
var EffectivePermissionsObject = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _permissions_decorators;
    var _permissions_initializers = [];
    var _permissions_extraInitializers = [];
    var _scopes_decorators;
    var _scopes_initializers = [];
    var _scopes_extraInitializers = [];
    var EffectivePermissionsObject = _classThis = /** @class */ (function () {
        function EffectivePermissionsObject_1() {
            this.permissions = __runInitializers(this, _permissions_initializers, void 0);
            this.scopes = (__runInitializers(this, _permissions_extraInitializers), __runInitializers(this, _scopes_initializers, void 0));
            __runInitializers(this, _scopes_extraInitializers);
        }
        return EffectivePermissionsObject_1;
    }());
    __setFunctionName(_classThis, "EffectivePermissionsObject");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _permissions_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                description: 'Effective platform permission keys for the current user. `["*"]` means unrestricted (super admin).',
            })];
        _scopes_decorators = [(0, graphql_1.Field)(function () { return [PermissionScopeObject]; }, {
                description: 'Every scope the user holds grants in, platform and per venue/tournament.',
            })];
        __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: function (obj) { return "permissions" in obj; }, get: function (obj) { return obj.permissions; }, set: function (obj, value) { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _permissions_extraInitializers);
        __esDecorate(null, null, _scopes_decorators, { kind: "field", name: "scopes", static: false, private: false, access: { has: function (obj) { return "scopes" in obj; }, get: function (obj) { return obj.scopes; }, set: function (obj, value) { obj.scopes = value; } }, metadata: _metadata }, _scopes_initializers, _scopes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EffectivePermissionsObject = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EffectivePermissionsObject = _classThis;
}();
exports.EffectivePermissionsObject = EffectivePermissionsObject;
