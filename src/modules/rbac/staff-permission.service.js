"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.StaffPermissionService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var permission_keys_1 = require("../../common/constants/permission-keys");
/**
 * Grants and revokes individual permissions for staff members.
 *
 * There are no roles: this is the only way a staff member gains a capability.
 * Every mutation invalidates the affected user's cached permissions so the
 * change lands on their next request.
 */
var StaffPermissionService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StaffPermissionService = _classThis = /** @class */ (function () {
        function StaffPermissionService_1(prisma, permissions) {
            this.prisma = prisma;
            this.permissions = permissions;
        }
        /** The permission library, optionally filtered to one domain. */
        StaffPermissionService_1.prototype.listPermissions = function (domain) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.permission.findMany({
                            where: domain ? { domain: domain } : undefined,
                            orderBy: [{ domain: 'asc' }, { key: 'asc' }],
                        })];
                });
            });
        };
        /** The permissions available to grant in a given scope. */
        StaffPermissionService_1.prototype.listPermissionsForScope = function (scopeType) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.listPermissions((0, permission_keys_1.domainForScope)(scopeType))];
                });
            });
        };
        /** Active grants held by a user, optionally narrowed to one scope. */
        StaffPermissionService_1.prototype.listGrants = function (userId, scope) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.staffPermission.findMany({
                            where: __assign(__assign({ userId: userId }, (scope ? this.scopeWhere(scope) : {})), { OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }] }),
                            include: { permission: true },
                            orderBy: [{ scopeType: 'asc' }, { permissionKey: 'asc' }],
                        })];
                });
            });
        };
        /**
         * Replace a staff member's permission set within one scope.
         *
         * This is what the permissions screen saves: it diffs rather than
         * delete-and-recreate, so `grantedAt` and `grantedById` survive on the
         * permissions that were already there.
         */
        StaffPermissionService_1.prototype.setPermissions = function (userId, scope, permissionKeys, grantedById) {
            return __awaiter(this, void 0, void 0, function () {
                var scopeId, keys;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.assertUserExists(userId)];
                        case 1:
                            _a.sent();
                            scopeId = this.normaliseScopeId(scope);
                            return [4 /*yield*/, this.validateKeysForScope(permissionKeys, scope.scopeType)];
                        case 2:
                            keys = _a.sent();
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.staffPermission.deleteMany({
                                                    where: {
                                                        userId: userId,
                                                        scopeType: scope.scopeType,
                                                        scopeId: scopeId,
                                                        permissionKey: { notIn: keys },
                                                    },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, tx.staffPermission.createMany({
                                                        data: keys.map(function (permissionKey) { return ({
                                                            userId: userId,
                                                            permissionKey: permissionKey,
                                                            scopeType: scope.scopeType,
                                                            scopeId: scopeId,
                                                            grantedById: grantedById,
                                                        }); }),
                                                        skipDuplicates: true,
                                                    })];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(userId)];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.listGrants(userId, scope)];
                    }
                });
            });
        };
        /** Grant a single permission, optionally time-limited. */
        StaffPermissionService_1.prototype.grant = function (userId_1, permissionKey_1, scope_1, grantedById_1) {
            return __awaiter(this, arguments, void 0, function (userId, permissionKey, scope, grantedById, options) {
                var scopeId, grant;
                var _a, _b, _c, _d;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.assertUserExists(userId)];
                        case 1:
                            _e.sent();
                            scopeId = this.normaliseScopeId(scope);
                            return [4 /*yield*/, this.validateKeysForScope([permissionKey], scope.scopeType)];
                        case 2:
                            _e.sent();
                            return [4 /*yield*/, this.prisma.staffPermission.upsert({
                                    where: {
                                        userId_permissionKey_scopeType_scopeId: {
                                            userId: userId,
                                            permissionKey: permissionKey,
                                            scopeType: scope.scopeType,
                                            scopeId: scopeId,
                                        },
                                    },
                                    create: {
                                        userId: userId,
                                        permissionKey: permissionKey,
                                        scopeType: scope.scopeType,
                                        scopeId: scopeId,
                                        grantedById: grantedById,
                                        expiresAt: (_a = options.expiresAt) !== null && _a !== void 0 ? _a : null,
                                        reason: (_b = options.reason) !== null && _b !== void 0 ? _b : null,
                                    },
                                    update: {
                                        grantedById: grantedById,
                                        grantedAt: new Date(),
                                        expiresAt: (_c = options.expiresAt) !== null && _c !== void 0 ? _c : null,
                                        reason: (_d = options.reason) !== null && _d !== void 0 ? _d : null,
                                    },
                                    include: { permission: true },
                                })];
                        case 3:
                            grant = _e.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(userId)];
                        case 4:
                            _e.sent();
                            return [2 /*return*/, grant];
                    }
                });
            });
        };
        /** Revoke a single permission. Revocation is a delete — no tombstone row. */
        StaffPermissionService_1.prototype.revoke = function (userId, permissionKey, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var scopeId, count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            scopeId = this.normaliseScopeId(scope);
                            return [4 /*yield*/, this.prisma.staffPermission.deleteMany({
                                    where: { userId: userId, permissionKey: permissionKey, scopeType: scope.scopeType, scopeId: scopeId },
                                })];
                        case 1:
                            count = (_a.sent()).count;
                            if (count === 0) {
                                throw new common_1.NotFoundException('That permission is not granted in this scope');
                            }
                            return [4 /*yield*/, this.permissions.invalidateUser(userId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /** Remove every grant a user holds in one scope — used when unassigning staff. */
        StaffPermissionService_1.prototype.clearScope = function (userId, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var scopeId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            scopeId = this.normaliseScopeId(scope);
                            return [4 /*yield*/, this.prisma.staffPermission.deleteMany({
                                    where: { userId: userId, scopeType: scope.scopeType, scopeId: scopeId },
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(userId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * The distinct scopes a user holds grants in. Lets the permissions screen
         * show "this admin has access at 2 venues" without a second round trip.
         */
        StaffPermissionService_1.prototype.listScopes = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.staffPermission.groupBy({
                                by: ['scopeType', 'scopeId'],
                                where: { userId: userId },
                                _count: { _all: true },
                            })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (row) { return ({
                                    scopeType: row.scopeType,
                                    scopeId: row.scopeId,
                                    permissionCount: row._count._all,
                                }); })];
                    }
                });
            });
        };
        /** PLATFORM grants always store '' so the unique constraint holds. */
        StaffPermissionService_1.prototype.normaliseScopeId = function (scope) {
            var _a;
            if (scope.scopeType === client_1.PermissionScopeType.PLATFORM)
                return '';
            var scopeId = (_a = scope.scopeId) === null || _a === void 0 ? void 0 : _a.trim();
            if (!scopeId) {
                throw new common_1.BadRequestException("A ".concat(scope.scopeType.toLowerCase(), " id is required for ").concat(scope.scopeType, "-scoped permissions"));
            }
            return scopeId;
        };
        StaffPermissionService_1.prototype.scopeWhere = function (scope) {
            return { scopeType: scope.scopeType, scopeId: this.normaliseScopeId(scope) };
        };
        /**
         * Rejects unknown keys, and keys belonging to a different domain than the
         * scope — granting `settings.edit` against a single venue is meaningless, so
         * it is an error rather than a silently dead row.
         */
        StaffPermissionService_1.prototype.validateKeysForScope = function (permissionKeys, scopeType) {
            return __awaiter(this, void 0, void 0, function () {
                var unique, expectedDomain, found, byKey, unknown, wrongDomain;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            unique = Array.from(new Set(permissionKeys));
                            if (unique.length === 0)
                                return [2 /*return*/, []];
                            expectedDomain = (0, permission_keys_1.domainForScope)(scopeType);
                            return [4 /*yield*/, this.prisma.permission.findMany({
                                    where: { key: { in: unique } },
                                    select: { key: true, domain: true },
                                })];
                        case 1:
                            found = _a.sent();
                            byKey = new Map(found.map(function (p) { return [p.key, p.domain]; }));
                            unknown = unique.filter(function (key) { return !byKey.has(key); });
                            if (unknown.length > 0) {
                                throw new common_1.BadRequestException("Unknown permissions: ".concat(unknown.join(', ')));
                            }
                            wrongDomain = unique.filter(function (key) { return byKey.get(key) !== expectedDomain; });
                            if (wrongDomain.length > 0) {
                                throw new common_1.BadRequestException("These permissions cannot be granted at ".concat(scopeType, " scope: ").concat(wrongDomain.join(', ')));
                            }
                            return [2 /*return*/, unique];
                    }
                });
            });
        };
        StaffPermissionService_1.prototype.assertUserExists = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            return [2 /*return*/];
                    }
                });
            });
        };
        return StaffPermissionService_1;
    }());
    __setFunctionName(_classThis, "StaffPermissionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffPermissionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffPermissionService = _classThis;
}();
exports.StaffPermissionService = StaffPermissionService;
