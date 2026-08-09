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
exports.RefreshTokenService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var MS_PER_DAY = 86400000;
/**
 * Refresh-token sessions: one row per signed-in device, kept alive by use.
 *
 * The contract, in one line: **you stay signed in for as long as you keep using
 * Arena NP, and one quiet week signs you out.** Each refresh rotates the token and
 * pushes its expiry out by the inactivity window, so there is no fixed session
 * ceiling for an active user and no lingering session for an inactive one.
 */
var RefreshTokenService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RefreshTokenService = _classThis = /** @class */ (function () {
        function RefreshTokenService_1(prisma, config) {
            this.prisma = prisma;
            this.config = config;
            this.logger = new common_1.Logger(RefreshTokenService.name);
        }
        Object.defineProperty(RefreshTokenService_1.prototype, "settings", {
            get: function () {
                return this.config.get('app.refresh');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(RefreshTokenService_1.prototype, "inactivityMs", {
            /** How long from now a freshly-used token stays valid. */
            get: function () {
                return this.settings.inactivityDays * MS_PER_DAY;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Start a new session. Called by every login path, so each device that signs in
         * gets its own independently-revocable row.
         */
        RefreshTokenService_1.prototype.issue = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, meta) {
                if (meta === void 0) { meta = {}; }
                return __generator(this, function (_a) {
                    // A fresh login is a fresh family — nothing links it to the device's old chain.
                    return [2 /*return*/, this.mint(userId, this.newFamilyId(), meta)];
                });
            });
        };
        /**
         * Exchange a refresh token for the next one, sliding the deadline forward.
         *
         * Returns the user id so the caller can mint the matching access token. Throws
         * `UnauthorizedException` for anything the client must react to by signing in
         * again — expired, unknown, revoked, or a detected replay.
         */
        RefreshTokenService_1.prototype.rotate = function (presented_1) {
            return __awaiter(this, arguments, void 0, function (presented, meta) {
                var existing, refresh;
                var _this = this;
                if (meta === void 0) { meta = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.refreshToken.findUnique({
                                where: { tokenHash: hash(presented) },
                                include: { user: { select: { id: true, isActive: true } } },
                            })];
                        case 1:
                            existing = _a.sent();
                            // Unknown token: either garbage, or one we purged long ago.
                            if (!existing)
                                throw new common_1.UnauthorizedException(SIGN_IN_AGAIN);
                            if (!existing.revokedAt) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.revokeFamily(existing.familyId, 'reuse detected')];
                        case 2:
                            _a.sent();
                            this.logger.warn("Refresh token reuse detected for user ".concat(existing.userId, "; revoked family ").concat(existing.familyId, "."));
                            throw new common_1.UnauthorizedException(SIGN_IN_AGAIN);
                        case 3:
                            if (!(existing.expiresAt.getTime() <= Date.now())) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.revoke(existing.id, 'expired')];
                        case 4:
                            _a.sent();
                            throw new common_1.UnauthorizedException('You have been signed out after a week of inactivity. Please sign in again.');
                        case 5:
                            if (!existing.user.isActive)
                                throw new common_1.UnauthorizedException(SIGN_IN_AGAIN);
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.refreshToken.update({
                                                    where: { id: existing.id },
                                                    data: { revokedAt: new Date(), revokedReason: 'rotated', lastUsedAt: new Date() },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, this.mint(existing.userId, existing.familyId, meta, tx)];
                                        }
                                    });
                                }); })];
                        case 6:
                            refresh = _a.sent();
                            // Housekeeping on a cheap, naturally-throttled hook rather than a cron.
                            void this.purgeExpired().catch(function () { return undefined; });
                            return [2 /*return*/, { userId: existing.userId, refresh: refresh }];
                    }
                });
            });
        };
        /**
         * Sign out one device. Deliberately quiet when the token is unknown: sign-out is
         * idempotent, and telling a caller "that token doesn't exist" helps nobody.
         */
        RefreshTokenService_1.prototype.revokeByToken = function (presented) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                where: { tokenHash: hash(presented), revokedAt: null },
                                data: { revokedAt: new Date(), revokedReason: 'signed out' },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * End every session a user has. Pairs with bumping `tokenVersion` for the things
         * that must lock an account out everywhere at once — password reset, suspend,
         * role change — where leaving live refresh tokens behind would undo the bump on
         * the next refresh.
         */
        RefreshTokenService_1.prototype.revokeAllForUser = function (userId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                where: { userId: userId, revokedAt: null },
                                data: { revokedAt: new Date(), revokedReason: reason },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** Drop rows nobody can use again, so the table tracks live devices, not history. */
        RefreshTokenService_1.prototype.purgeExpired = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cutoff;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cutoff = new Date(Date.now() - this.inactivityMs);
                            return [4 /*yield*/, this.prisma.refreshToken.deleteMany({
                                    where: {
                                        OR: [{ expiresAt: { lt: new Date() } }, { revokedAt: { lt: cutoff } }],
                                    },
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RefreshTokenService_1.prototype.mint = function (userId, familyId, meta, tx) {
            return __awaiter(this, void 0, void 0, function () {
                var token, expiresAt;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            token = (0, crypto_1.randomBytes)(48).toString('base64url');
                            expiresAt = new Date(Date.now() + this.inactivityMs);
                            return [4 /*yield*/, (tx !== null && tx !== void 0 ? tx : this.prisma).refreshToken.create({
                                    data: {
                                        userId: userId,
                                        familyId: familyId,
                                        tokenHash: hash(token),
                                        expiresAt: expiresAt,
                                        userAgent: (_b = (_a = meta.userAgent) === null || _a === void 0 ? void 0 : _a.slice(0, 300)) !== null && _b !== void 0 ? _b : null,
                                        ip: (_c = meta.ip) !== null && _c !== void 0 ? _c : null,
                                    },
                                })];
                        case 1:
                            _d.sent();
                            return [2 /*return*/, { token: token, expiresAt: expiresAt }];
                    }
                });
            });
        };
        RefreshTokenService_1.prototype.revoke = function (id, reason) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.refreshToken.update({
                                where: { id: id },
                                data: { revokedAt: new Date(), revokedReason: reason },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RefreshTokenService_1.prototype.revokeFamily = function (familyId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.refreshToken.updateMany({
                                where: { familyId: familyId, revokedAt: null },
                                data: { revokedAt: new Date(), revokedReason: reason },
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        RefreshTokenService_1.prototype.newFamilyId = function () {
            return (0, crypto_1.randomBytes)(16).toString('hex');
        };
        return RefreshTokenService_1;
    }());
    __setFunctionName(_classThis, "RefreshTokenService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RefreshTokenService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RefreshTokenService = _classThis;
}();
exports.RefreshTokenService = RefreshTokenService;
/**
 * One message for every "this token is no good" case, so a caller can't use the
 * wording to tell an unknown token from a revoked one.
 */
var SIGN_IN_AGAIN = 'Your session has ended. Please sign in again.';
/** Tokens are looked up by hash, so the raw value never touches the database. */
function hash(token) {
    return (0, crypto_1.createHash)('sha256').update(token).digest('hex');
}
