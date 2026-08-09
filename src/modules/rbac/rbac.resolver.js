"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../common/decorators/require-permission.decorator");
var rbac_types_1 = require("./dto/rbac.types");
/**
 * Permission administration.
 *
 * There are no roles — these operations grant and revoke permissions directly
 * against a staff member, within a scope. `myPermissions` is open to any
 * authenticated user (you may always read your own access); everything else
 * requires the corresponding `permissions.*` capability.
 */
var RbacResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _myPermissions_decorators;
    var _listPermissions_decorators;
    var _permissionsForScope_decorators;
    var _staffPermissionsFor_decorators;
    var _setStaffPermissions_decorators;
    var _grantStaffPermission_decorators;
    var _revokeStaffPermission_decorators;
    var RbacResolver = _classThis = /** @class */ (function () {
        function RbacResolver_1(staffPermissions, permissionResolver) {
            this.staffPermissions = (__runInitializers(this, _instanceExtraInitializers), staffPermissions);
            this.permissionResolver = permissionResolver;
        }
        // ─── Reads ──────────────────────────────────────────────────────────────
        RbacResolver_1.prototype.myPermissions = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, permissions, scopes;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.permissionResolver.getUserPermissions(user.id),
                                this.staffPermissions.listScopes(user.id),
                            ])];
                        case 1:
                            _a = _b.sent(), permissions = _a[0], scopes = _a[1];
                            return [2 /*return*/, { permissions: permissions, scopes: scopes }];
                    }
                });
            });
        };
        RbacResolver_1.prototype.listPermissions = function (domain) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffPermissions.listPermissions(domain)];
                });
            });
        };
        RbacResolver_1.prototype.permissionsForScope = function (scopeType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffPermissions.listPermissionsForScope(scopeType)];
                });
            });
        };
        RbacResolver_1.prototype.staffPermissionsFor = function (userId, scope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffPermissions.listGrants(userId, scope)];
                });
            });
        };
        // ─── Mutations ──────────────────────────────────────────────────────────
        RbacResolver_1.prototype.setStaffPermissions = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffPermissions.setPermissions(input.userId, input.scope, input.permissionKeys, actor.id)];
                });
            });
        };
        RbacResolver_1.prototype.grantStaffPermission = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffPermissions.grant(input.userId, input.permissionKey, input.scope, actor.id, {
                            expiresAt: input.expiresAt,
                            reason: input.reason,
                        })];
                });
            });
        };
        RbacResolver_1.prototype.revokeStaffPermission = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffPermissions.revoke(input.userId, input.permissionKey, input.scope)];
                });
            });
        };
        return RbacResolver_1;
    }());
    __setFunctionName(_classThis, "RbacResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myPermissions_decorators = [(0, graphql_1.Query)(function () { return rbac_types_1.EffectivePermissionsObject; }, {
                name: 'myPermissions',
                description: "The caller's own platform permissions plus every scope they hold grants in. Drives what the admin UI renders.",
            })];
        _listPermissions_decorators = [(0, graphql_1.Query)(function () { return [rbac_types_1.PermissionObject]; }, {
                name: 'listPermissions',
                description: 'The permission library, optionally filtered to one domain.',
            }), (0, require_permission_decorator_1.RequirePermission)('permissions.view')];
        _permissionsForScope_decorators = [(0, graphql_1.Query)(function () { return [rbac_types_1.PermissionObject]; }, {
                name: 'permissionsForScope',
                description: 'The permissions that may be granted in a scope — platform keys for PLATFORM, venue keys for VENUE, and so on.',
            }), (0, require_permission_decorator_1.RequirePermission)('permissions.view')];
        _staffPermissionsFor_decorators = [(0, graphql_1.Query)(function () { return [rbac_types_1.StaffPermissionObject]; }, {
                name: 'staffPermissions',
                description: "One staff member's grants, optionally narrowed to a single scope.",
            }), (0, require_permission_decorator_1.RequirePermission)('permissions.view')];
        _setStaffPermissions_decorators = [(0, graphql_1.Mutation)(function () { return [rbac_types_1.StaffPermissionObject]; }, {
                description: "Replace a staff member's permissions within one scope. Anything omitted from the list is revoked.",
            }), (0, require_permission_decorator_1.RequirePermission)('permissions.assign')];
        _grantStaffPermission_decorators = [(0, graphql_1.Mutation)(function () { return rbac_types_1.StaffPermissionObject; }, {
                description: 'Grant one permission to a staff member, optionally with an expiry.',
            }), (0, require_permission_decorator_1.RequirePermission)('permissions.assign')];
        _revokeStaffPermission_decorators = [(0, graphql_1.Mutation)(function () { return Boolean; }, { description: 'Revoke one permission from a staff member.' }), (0, require_permission_decorator_1.RequirePermission)('permissions.assign')];
        __esDecorate(_classThis, null, _myPermissions_decorators, { kind: "method", name: "myPermissions", static: false, private: false, access: { has: function (obj) { return "myPermissions" in obj; }, get: function (obj) { return obj.myPermissions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listPermissions_decorators, { kind: "method", name: "listPermissions", static: false, private: false, access: { has: function (obj) { return "listPermissions" in obj; }, get: function (obj) { return obj.listPermissions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _permissionsForScope_decorators, { kind: "method", name: "permissionsForScope", static: false, private: false, access: { has: function (obj) { return "permissionsForScope" in obj; }, get: function (obj) { return obj.permissionsForScope; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _staffPermissionsFor_decorators, { kind: "method", name: "staffPermissionsFor", static: false, private: false, access: { has: function (obj) { return "staffPermissionsFor" in obj; }, get: function (obj) { return obj.staffPermissionsFor; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setStaffPermissions_decorators, { kind: "method", name: "setStaffPermissions", static: false, private: false, access: { has: function (obj) { return "setStaffPermissions" in obj; }, get: function (obj) { return obj.setStaffPermissions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _grantStaffPermission_decorators, { kind: "method", name: "grantStaffPermission", static: false, private: false, access: { has: function (obj) { return "grantStaffPermission" in obj; }, get: function (obj) { return obj.grantStaffPermission; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revokeStaffPermission_decorators, { kind: "method", name: "revokeStaffPermission", static: false, private: false, access: { has: function (obj) { return "revokeStaffPermission" in obj; }, get: function (obj) { return obj.revokeStaffPermission; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RbacResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RbacResolver = _classThis;
}();
exports.RbacResolver = RbacResolver;
