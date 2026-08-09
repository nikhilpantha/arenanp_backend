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
exports.PermissionResolverService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var permission_keys_1 = require("../../common/constants/permission-keys");
/**
 * Resolves what a staff member may do.
 *
 * There are no roles — a user's permissions are exactly the grants recorded
 * against them in `staff_permissions`, scoped to the platform, a venue, or a
 * tournament. Expired grants are ignored.
 *
 * Results are cached in Redis per (user, scope) for `CACHE_TTL`. Every mutation
 * that can change access calls `invalidateUser`.
 */
var PermissionResolverService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PermissionResolverService = _classThis = /** @class */ (function () {
        function PermissionResolverService_1(prisma, redis) {
            this.prisma = prisma;
            this.redis = redis;
            this.logger = new common_1.Logger(PermissionResolverService.name);
            this.CACHE_TTL = 5 * 60; // seconds
            this.cacheKey = function (userId, scopeType, scopeId) {
                return "perm:".concat(userId, ":").concat(scopeType, ":").concat(scopeId);
            };
            this.userKeyPattern = function (userId) { return "perm:".concat(userId, ":*"); };
        }
        /**
         * Platform-wide permissions for a user.
         *
         * Returns `['*']` for holders of the legacy `SUPER_ADMIN` enum value. That
         * bypass is deliberate: it guarantees a super admin cannot lock themselves
         * — or everyone — out of permission management by saving an empty set.
         */
        PermissionResolverService_1.prototype.getUserPermissions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.resolve(userId, client_1.PermissionScopeType.PLATFORM, '')];
                });
            });
        };
        /** Permissions a user holds at one specific venue. */
        PermissionResolverService_1.prototype.getVenueUserPermissions = function (userId, venueId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.resolve(userId, client_1.PermissionScopeType.VENUE, venueId)];
                });
            });
        };
        /** Permissions a user holds at one specific tournament. */
        PermissionResolverService_1.prototype.getTournamentUserPermissions = function (userId, tournamentId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.resolve(userId, client_1.PermissionScopeType.TOURNAMENT, tournamentId)];
                });
            });
        };
        /** True when the user holds `permissionKey` platform-wide (or the wildcard). */
        PermissionResolverService_1.prototype.userHasPermission = function (userId, permissionKey) {
            return __awaiter(this, void 0, void 0, function () {
                var permissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getUserPermissions(userId)];
                        case 1:
                            permissions = _a.sent();
                            return [2 /*return*/, permissions.includes(permission_keys_1.WILDCARD_PERMISSION) || permissions.includes(permissionKey)];
                    }
                });
            });
        };
        /** True when the user holds every key in `permissionKeys` (or the wildcard). */
        PermissionResolverService_1.prototype.userHasAllPermissions = function (userId, permissionKeys) {
            return __awaiter(this, void 0, void 0, function () {
                var permissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getUserPermissions(userId)];
                        case 1:
                            permissions = _a.sent();
                            if (permissions.includes(permission_keys_1.WILDCARD_PERMISSION))
                                return [2 /*return*/, true];
                            return [2 /*return*/, permissionKeys.every(function (key) { return permissions.includes(key); })];
                    }
                });
            });
        };
        /** True when the user holds `permissionKey` at `venueId` (or the wildcard). */
        PermissionResolverService_1.prototype.venueUserHasPermission = function (userId, venueId, permissionKey) {
            return __awaiter(this, void 0, void 0, function () {
                var permissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getVenueUserPermissions(userId, venueId)];
                        case 1:
                            permissions = _a.sent();
                            return [2 /*return*/, permissions.includes(permission_keys_1.WILDCARD_PERMISSION) || permissions.includes(permissionKey)];
                    }
                });
            });
        };
        /** True when the user holds `permissionKey` at `tournamentId` (or the wildcard). */
        PermissionResolverService_1.prototype.tournamentUserHasPermission = function (userId, tournamentId, permissionKey) {
            return __awaiter(this, void 0, void 0, function () {
                var permissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getTournamentUserPermissions(userId, tournamentId)];
                        case 1:
                            permissions = _a.sent();
                            return [2 /*return*/, permissions.includes(permission_keys_1.WILDCARD_PERMISSION) || permissions.includes(permissionKey)];
                    }
                });
            });
        };
        /** Drop every cached scope for one user. */
        PermissionResolverService_1.prototype.invalidateUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.redis.deleteByPattern(this.userKeyPattern(userId))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.warn("Permission cache invalidation failed for ".concat(userId, ": ").concat(String(error_1)));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PermissionResolverService_1.prototype.resolve = function (userId, scopeType, scopeId) {
            return __awaiter(this, void 0, void 0, function () {
                var cached, user, grants, permissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.readCache(userId, scopeType, scopeId)];
                        case 1:
                            cached = _a.sent();
                            if (cached)
                                return [2 /*return*/, cached];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: { role: true, isActive: true },
                                })];
                        case 2:
                            user = _a.sent();
                            if (!user || !user.isActive) {
                                return [2 /*return*/, []];
                            }
                            if (!(user.role === client_1.UserRole.SUPER_ADMIN)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.writeCache(userId, scopeType, scopeId, [permission_keys_1.WILDCARD_PERMISSION])];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, [permission_keys_1.WILDCARD_PERMISSION]];
                        case 4: return [4 /*yield*/, this.prisma.staffPermission.findMany({
                                where: {
                                    userId: userId,
                                    scopeType: scopeType,
                                    scopeId: scopeId,
                                    OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
                                },
                                select: { permissionKey: true },
                            })];
                        case 5:
                            grants = _a.sent();
                            permissions = grants.map(function (grant) { return grant.permissionKey; });
                            return [4 /*yield*/, this.writeCache(userId, scopeType, scopeId, permissions)];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, permissions];
                    }
                });
            });
        };
        PermissionResolverService_1.prototype.readCache = function (userId, scopeType, scopeId) {
            return __awaiter(this, void 0, void 0, function () {
                var cached, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.redis.get(this.cacheKey(userId, scopeType, scopeId))];
                        case 1:
                            cached = _a.sent();
                            return [2 /*return*/, cached ? JSON.parse(cached) : null];
                        case 2:
                            error_2 = _a.sent();
                            // A cache miss must never fail an authorization check — fall through to DB.
                            this.logger.warn("Permission cache read failed for ".concat(userId, ": ").concat(String(error_2)));
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        PermissionResolverService_1.prototype.writeCache = function (userId, scopeType, scopeId, permissions) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.redis.setEx(this.cacheKey(userId, scopeType, scopeId), this.CACHE_TTL, JSON.stringify(permissions))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.warn("Permission cache write failed for ".concat(userId, ": ").concat(String(error_3)));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return PermissionResolverService_1;
    }());
    __setFunctionName(_classThis, "PermissionResolverService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionResolverService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionResolverService = _classThis;
}();
exports.PermissionResolverService = PermissionResolverService;
