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
exports.RedisService = void 0;
var common_1 = require("@nestjs/common");
var ioredis_1 = require("ioredis");
var RedisService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RedisService = _classThis = /** @class */ (function () {
        function RedisService_1(config) {
            this.config = config;
            this.logger = new common_1.Logger(RedisService.name);
        }
        RedisService_1.prototype.onModuleInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cfg;
                var _this = this;
                return __generator(this, function (_a) {
                    cfg = this.config.get('redis');
                    if (!cfg)
                        throw new Error('Missing redis config');
                    this.client = new ioredis_1.default({
                        host: cfg.host,
                        port: cfg.port,
                        password: cfg.password,
                        db: cfg.db,
                        tls: cfg.tls ? {} : undefined,
                        lazyConnect: false,
                        maxRetriesPerRequest: 3,
                        enableReadyCheck: true,
                    });
                    this.client.on('error', function (err) { return _this.logger.error("Redis error: ".concat(err.message)); });
                    this.client.on('ready', function () { return _this.logger.log('Redis ready'); });
                    return [2 /*return*/];
                });
            });
        };
        RedisService_1.prototype.onModuleDestroy = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, ((_a = this.client) === null || _a === void 0 ? void 0 : _a.quit())];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Object.defineProperty(RedisService_1.prototype, "raw", {
            /** Raw client for advanced use. */
            get: function () {
                return this.client;
            },
            enumerable: false,
            configurable: true
        });
        // ─── string helpers ────────────────────────────────────────────────
        RedisService_1.prototype.get = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.client.get(key)];
                });
            });
        };
        RedisService_1.prototype.setEx = function (key, ttlSeconds, value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.set(key, value, 'EX', ttlSeconds)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.del = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.del(key)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RedisService_1.prototype.incr = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.client.incr(key)];
                });
            });
        };
        RedisService_1.prototype.ttl = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.client.ttl(key)];
                });
            });
        };
        RedisService_1.prototype.expire = function (key, ttlSeconds) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.expire(key, ttlSeconds)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Atomic SET-IF-NOT-EXISTS with TTL. Returns true if the lock was acquired.
         * Used by future SlotLockService (bookings) and rate limiters.
         */
        RedisService_1.prototype.acquireLock = function (key_1, ttlSeconds_1) {
            return __awaiter(this, arguments, void 0, function (key, ttlSeconds, value) {
                var res;
                if (value === void 0) { value = '1'; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.client.set(key, value, 'EX', ttlSeconds, 'NX')];
                        case 1:
                            res = _a.sent();
                            return [2 /*return*/, res === 'OK'];
                    }
                });
            });
        };
        // ─── pattern helpers ──────────────────────────────────────────────────
        /**
         * Delete all keys matching a pattern (e.g., 'user:*').
         * Uses SCAN to avoid blocking on large key sets.
         */
        RedisService_1.prototype.deleteByPattern = function (pattern) {
            return __awaiter(this, void 0, void 0, function () {
                var cursor, deleted, _a, nextCursor, keys, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            cursor = '0';
                            deleted = 0;
                            _d.label = 1;
                        case 1: return [4 /*yield*/, this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100)];
                        case 2:
                            _a = _d.sent(), nextCursor = _a[0], keys = _a[1];
                            cursor = nextCursor;
                            if (!(keys.length > 0)) return [3 /*break*/, 4];
                            _b = deleted;
                            return [4 /*yield*/, (_c = this.client).del.apply(_c, keys)];
                        case 3:
                            deleted = _b + _d.sent();
                            _d.label = 4;
                        case 4:
                            if (cursor !== '0') return [3 /*break*/, 1];
                            _d.label = 5;
                        case 5: return [2 /*return*/, deleted];
                    }
                });
            });
        };
        /**
         * Get number of keys in the current Redis database.
         */
        RedisService_1.prototype.dbSize = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.client.dbsize()];
                });
            });
        };
        return RedisService_1;
    }());
    __setFunctionName(_classThis, "RedisService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RedisService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RedisService = _classThis;
}();
exports.RedisService = RedisService;
