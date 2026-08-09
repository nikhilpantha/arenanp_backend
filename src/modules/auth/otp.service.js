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
exports.OtpService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var constants_1 = require("../../common/constants");
/**
 * Dev master OTP — always accepted when SMS_PROVIDER=stub, so you can sign in
 * without reading the generated code. Strictly gated to the stub provider, so it
 * is impossible to use against a real SMS provider in production.
 */
var DEV_MASTER_OTP = '123456';
/**
 * How long a password-reset ticket lives. Longer than the code's own TTL: the
 * clock starts once the code is already accepted, and all that's left is typing
 * a new password.
 */
var RESET_TICKET_TTL_SECONDS = 600;
var OtpService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OtpService = _classThis = /** @class */ (function () {
        function OtpService_1(redis, config) {
            this.redis = redis;
            this.config = config;
            this.logger = new common_1.Logger(OtpService.name);
        }
        Object.defineProperty(OtpService_1.prototype, "otp", {
            get: function () {
                return this.config.get('app.otp');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OtpService_1.prototype, "sms", {
            get: function () {
                return this.config.get('app.sms');
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Generate + store an OTP for the given phone. Returns the result the
         * resolver should send back to the client.
         */
        OtpService_1.prototype.issue = function (phoneNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var cooldownKey, cooldownTtl, code;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cooldownKey = constants_1.REDIS_KEYS.otpResendCooldown(phoneNumber);
                            return [4 /*yield*/, this.redis.ttl(cooldownKey)];
                        case 1:
                            cooldownTtl = _a.sent();
                            if (cooldownTtl > 0) {
                                throw new common_1.BadRequestException("Please wait ".concat(cooldownTtl, "s before requesting another OTP."));
                            }
                            code = this.generateCode();
                            return [4 /*yield*/, this.redis.setEx(constants_1.REDIS_KEYS.otpCode(phoneNumber), this.otp.ttlSeconds, code)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.redis.del(constants_1.REDIS_KEYS.otpAttempts(phoneNumber))];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.redis.setEx(cooldownKey, this.otp.resendCooldownSeconds, '1')];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.send(phoneNumber, code)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, {
                                    expiresInSeconds: this.otp.ttlSeconds,
                                    resendAvailableInSeconds: this.otp.resendCooldownSeconds,
                                    devCode: this.sms.provider === 'stub' ? code : undefined,
                                }];
                    }
                });
            });
        };
        /**
         * Verify the OTP. On success, deletes the code so it can't be reused.
         * Throws on miss / mismatch / too-many-attempts.
         */
        OtpService_1.prototype.verify = function (phoneNumber, code) {
            return __awaiter(this, void 0, void 0, function () {
                var stored, attempts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.sms.provider === 'stub' && code === DEV_MASTER_OTP)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.redis.del(constants_1.REDIS_KEYS.otpCode(phoneNumber))];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.redis.del(constants_1.REDIS_KEYS.otpAttempts(phoneNumber))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3: return [4 /*yield*/, this.redis.get(constants_1.REDIS_KEYS.otpCode(phoneNumber))];
                        case 4:
                            stored = _a.sent();
                            if (!stored) {
                                throw new common_1.BadRequestException('OTP expired or never requested. Request a new one.');
                            }
                            return [4 /*yield*/, this.redis.incr(constants_1.REDIS_KEYS.otpAttempts(phoneNumber))];
                        case 5:
                            attempts = _a.sent();
                            if (!(attempts === 1)) return [3 /*break*/, 7];
                            // First attempt — sync the attempts key's TTL with the code's TTL.
                            return [4 /*yield*/, this.redis.expire(constants_1.REDIS_KEYS.otpAttempts(phoneNumber), this.otp.ttlSeconds)];
                        case 6:
                            // First attempt — sync the attempts key's TTL with the code's TTL.
                            _a.sent();
                            _a.label = 7;
                        case 7:
                            if (!(attempts > this.otp.maxAttempts)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.redis.del(constants_1.REDIS_KEYS.otpCode(phoneNumber))];
                        case 8:
                            _a.sent();
                            throw new common_1.BadRequestException('Too many incorrect attempts. Request a new OTP.');
                        case 9:
                            if (stored !== code) {
                                throw new common_1.BadRequestException('Invalid OTP.');
                            }
                            return [4 /*yield*/, this.redis.del(constants_1.REDIS_KEYS.otpCode(phoneNumber))];
                        case 10:
                            _a.sent();
                            return [4 /*yield*/, this.redis.del(constants_1.REDIS_KEYS.otpAttempts(phoneNumber))];
                        case 11:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Mint a single-use ticket standing in for a code that has just been
         * verified. Password recovery is two calls — check the code, then set the
         * password — so the code screen can fail fast on a wrong code instead of
         * making someone type a new password first. The code itself is spent by
         * `verify`, so it can't be replayed on the second call.
         */
        OtpService_1.prototype.issueResetTicket = function (phoneNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var resetToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
                            return [4 /*yield*/, this.redis.setEx(constants_1.REDIS_KEYS.passwordResetTicket(phoneNumber), RESET_TICKET_TTL_SECONDS, resetToken)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { resetToken: resetToken, expiresInSeconds: RESET_TICKET_TTL_SECONDS }];
                    }
                });
            });
        };
        /** Burn the ticket. Throws unless it's the one held for this number. */
        OtpService_1.prototype.consumeResetTicket = function (phoneNumber, resetToken) {
            return __awaiter(this, void 0, void 0, function () {
                var key, stored;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            key = constants_1.REDIS_KEYS.passwordResetTicket(phoneNumber);
                            return [4 /*yield*/, this.redis.get(key)];
                        case 1:
                            stored = _a.sent();
                            if (!stored || stored !== resetToken) {
                                throw new common_1.BadRequestException('This reset expired. Request a new code.');
                            }
                            return [4 /*yield*/, this.redis.del(key)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OtpService_1.prototype.generateCode = function () {
            var len = this.otp.length;
            var min = Math.pow(10, (len - 1));
            var max = Math.pow(10, len);
            return String((0, crypto_1.randomInt)(min, max));
        };
        OtpService_1.prototype.send = function (phoneNumber, code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.sms.provider === 'stub') {
                        this.logger.log("[OTP-STUB] ".concat(phoneNumber, " \u2192 ").concat(code));
                        return [2 /*return*/];
                    }
                    // TODO: plug in Sparrow SMS / Twilio / etc.
                    this.logger.warn("SMS provider ".concat(this.sms.provider, " is not implemented yet"));
                    return [2 /*return*/];
                });
            });
        };
        return OtpService_1;
    }());
    __setFunctionName(_classThis, "OtpService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OtpService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OtpService = _classThis;
}();
exports.OtpService = OtpService;
