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
exports.PermissionCacheService = void 0;
var common_1 = require("@nestjs/common");
/**
 * Redis cache for *venue-scoped* permissions.
 *
 * Platform staff permissions moved to `PermissionResolverService`, which caches
 * them itself and resolves from the dynamic roles tables. This service now
 * covers only `VenueMembership.permissions`, which is still membership-shaped
 * rather than role-shaped.
 *
 * Performance: ~5ms DB query → <1ms Redis hit. Invalidation is explicit.
 */
var PermissionCacheService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PermissionCacheService = _classThis = /** @class */ (function () {
        function PermissionCacheService_1(redis, prisma) {
            this.redis = redis;
            this.prisma = prisma;
            this.CACHE_TTL = 5 * 60; // seconds
            this.VENUE_PERMS_KEY = function (userId, venueId) {
                return "venue:permissions:".concat(userId, ":").concat(venueId);
            };
        }
        /**
         * Effective permissions for a user within one venue (cached).
         *
         * @param userId - User ID
         * @param venueId - Venue ID
         * @returns Permission strings; empty when there is no active membership.
         */
        PermissionCacheService_1.prototype.getVenuePermissions = function (userId, venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var cacheKey, cached, membership, effectivePermissions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cacheKey = this.VENUE_PERMS_KEY(userId, venueId);
                            return [4 /*yield*/, this.redis.get(cacheKey)];
                        case 1:
                            cached = _a.sent();
                            if (cached) {
                                return [2 /*return*/, JSON.parse(cached)];
                            }
                            return [4 /*yield*/, this.prisma.venueMembership.findFirst({
                                    where: { userId: userId, venueId: venueId },
                                    select: { role: true, permissions: true, status: true },
                                })];
                        case 2:
                            membership = _a.sent();
                            if (!(!membership || membership.status !== 'ACTIVE')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify([]))];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, []];
                        case 4:
                            effectivePermissions = membership.permissions || [];
                            return [4 /*yield*/, this.redis.setEx(cacheKey, this.CACHE_TTL, JSON.stringify(effectivePermissions))];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, effectivePermissions];
                    }
                });
            });
        };
        /** Invalidate one user's cached permissions for one venue. */
        PermissionCacheService_1.prototype.invalidateVenuePermissionCache = function (userId, venueId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redis.del(this.VENUE_PERMS_KEY(userId, venueId))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Invalidate every venue permission entry for a user. Bulk operation — use
         * only when a user is removed from all venues.
         */
        PermissionCacheService_1.prototype.invalidateAllVenuePermissionsForUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redis.deleteByPattern("venue:permissions:".concat(userId, ":*"))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** Cache statistics for observability. */
        PermissionCacheService_1.prototype.getCacheStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var dbSize;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.redis.dbSize()];
                        case 1:
                            dbSize = _a.sent();
                            return [2 /*return*/, {
                                    cacheSize: dbSize,
                                    ttl: this.CACHE_TTL,
                                    venuePermsCacheKey: 'venue:permissions:*',
                                }];
                    }
                });
            });
        };
        return PermissionCacheService_1;
    }());
    __setFunctionName(_classThis, "PermissionCacheService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PermissionCacheService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PermissionCacheService = _classThis;
}();
exports.PermissionCacheService = PermissionCacheService;
