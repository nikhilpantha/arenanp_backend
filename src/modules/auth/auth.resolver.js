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
exports.AuthResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var otp_request_result_1 = require("./dto/otp-request-result");
var auth_payload_1 = require("./dto/auth-payload");
var public_decorator_1 = require("../../common/decorators/public.decorator");
var throttle_auth_decorator_1 = require("../../common/decorators/throttle-auth.decorator");
var AuthResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _requestPlayerOtp_decorators;
    var _requestVenueOtp_decorators;
    var _requestOrganizerOtp_decorators;
    var _verifyOtp_decorators;
    var _loginWithEmail_decorators;
    var _loginWithPhone_decorators;
    var _setupPassword_decorators;
    var _signOut_decorators;
    var AuthResolver = _classThis = /** @class */ (function () {
        function AuthResolver_1(authService, sessions) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.sessions = sessions;
        }
        // ── Per-role sign-up / sign-in. The role is fixed server-side (never a client
        // param). Each sends an OTP and ensures that capability on the same number,
        // creating it the first time ("roleAdded"). Used by both sign-up and sign-in.
        AuthResolver_1.prototype.requestPlayerOtp = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.requestOtp(input.phoneNumber, client_1.CapabilityType.PLAYER, input.password)];
                });
            });
        };
        AuthResolver_1.prototype.requestVenueOtp = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.requestOtp(input.phoneNumber, client_1.CapabilityType.VENUE, input.password)];
                });
            });
        };
        AuthResolver_1.prototype.requestOrganizerOtp = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.requestOtp(input.phoneNumber, client_1.CapabilityType.ORGANIZER, input.password)];
                });
            });
        };
        AuthResolver_1.prototype.verifyOtp = function (input, context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.authService.verifyOtp(input.phoneNumber, input.code)];
                        case 1:
                            _a = _b.sent(), user = _a.user, token = _a.token;
                            // Set HTTP-only cookie
                            context.res.setHeader('Set-Cookie', "accessToken=".concat(token.accessToken, "; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900"));
                            return [2 /*return*/, {
                                    accessToken: token.accessToken,
                                    tokenType: token.tokenType,
                                    expiresAt: token.expiresAt,
                                    user: mapUserToGraphql(user),
                                }];
                    }
                });
            });
        };
        AuthResolver_1.prototype.loginWithEmail = function (input, context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.authService.loginWithEmail(input.email, input.password)];
                        case 1:
                            _a = _b.sent(), user = _a.user, token = _a.token;
                            // Set HTTP-only cookie
                            context.res.setHeader('Set-Cookie', "accessToken=".concat(token.accessToken, "; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900"));
                            return [2 /*return*/, {
                                    accessToken: token.accessToken,
                                    tokenType: token.tokenType,
                                    expiresAt: token.expiresAt,
                                    user: mapUserToGraphql(user),
                                }];
                    }
                });
            });
        };
        AuthResolver_1.prototype.loginWithPhone = function (input, context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.authService.loginWithPhonePassword(input.phoneNumber, input.password)];
                        case 1:
                            _a = _b.sent(), user = _a.user, token = _a.token;
                            context.res.setHeader('Set-Cookie', "accessToken=".concat(token.accessToken, "; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900"));
                            return [2 /*return*/, {
                                    accessToken: token.accessToken,
                                    tokenType: token.tokenType,
                                    expiresAt: token.expiresAt,
                                    user: mapUserToGraphql(user),
                                }];
                    }
                });
            });
        };
        AuthResolver_1.prototype.setupPassword = function (input, context) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.authService.setupStaffPassword(input.token, input.password)];
                        case 1:
                            _a = _b.sent(), user = _a.user, token = _a.token;
                            // Set HTTP-only cookie
                            context.res.setHeader('Set-Cookie', "accessToken=".concat(token.accessToken, "; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=900"));
                            return [2 /*return*/, {
                                    accessToken: token.accessToken,
                                    tokenType: token.tokenType,
                                    expiresAt: token.expiresAt,
                                    user: mapUserToGraphql(user),
                                }];
                    }
                });
            });
        };
        AuthResolver_1.prototype.signOut = function (actor, context) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.invalidateSessions(actor.id)];
                        case 1:
                            _a.sent();
                            // Clear the cookie
                            context.res.setHeader('Set-Cookie', 'accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        return AuthResolver_1;
    }());
    __setFunctionName(_classThis, "AuthResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _requestPlayerOtp_decorators = [(0, public_decorator_1.Public)(), (0, throttle_auth_decorator_1.ThrottleAuth)(), (0, graphql_1.Mutation)(function () { return otp_request_result_1.OtpRequestResult; }, {
                description: 'Send an OTP and ensure the PLAYER role for this phone (granted instantly).',
            })];
        _requestVenueOtp_decorators = [(0, public_decorator_1.Public)(), (0, throttle_auth_decorator_1.ThrottleAuth)(), (0, graphql_1.Mutation)(function () { return otp_request_result_1.OtpRequestResult; }, {
                description: 'Send an OTP and ensure the VENUE (owner) role for this phone.',
            })];
        _requestOrganizerOtp_decorators = [(0, public_decorator_1.Public)(), (0, throttle_auth_decorator_1.ThrottleAuth)(), (0, graphql_1.Mutation)(function () { return otp_request_result_1.OtpRequestResult; }, {
                description: 'Send an OTP and ensure the ORGANIZER role for this phone.',
            })];
        _verifyOtp_decorators = [(0, public_decorator_1.Public)(), (0, throttle_auth_decorator_1.ThrottleAuth)(), (0, graphql_1.Mutation)(function () { return auth_payload_1.AuthPayload; }, {
                description: 'Verify an OTP and return an access token.',
            })];
        _loginWithEmail_decorators = [(0, public_decorator_1.Public)(), (0, throttle_auth_decorator_1.ThrottleAuth)(), (0, graphql_1.Mutation)(function () { return auth_payload_1.AuthPayload; }, {
                description: 'Email + password login. Used by admin / venue-management web panels. Mobile users use OTP.',
            })];
        _loginWithPhone_decorators = [(0, public_decorator_1.Public)(), (0, throttle_auth_decorator_1.ThrottleAuth)(), (0, graphql_1.Mutation)(function () { return auth_payload_1.AuthPayload; }, {
                description: 'Phone + password login (mobile). Only works after the phone has been verified via OTP once.',
            })];
        _setupPassword_decorators = [(0, public_decorator_1.Public)(), (0, graphql_1.Mutation)(function () { return auth_payload_1.AuthPayload; }, {
                description: 'Set password for a new staff member using their setup token.',
            })];
        _signOut_decorators = [(0, graphql_1.Mutation)(function () { return Boolean; }, {
                description: "Sign out every device: bumps the caller's tokenVersion and revokes all their refresh " +
                    'tokens. For a lost phone, or a shared number.',
            })];
        __esDecorate(_classThis, null, _requestPlayerOtp_decorators, { kind: "method", name: "requestPlayerOtp", static: false, private: false, access: { has: function (obj) { return "requestPlayerOtp" in obj; }, get: function (obj) { return obj.requestPlayerOtp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _requestVenueOtp_decorators, { kind: "method", name: "requestVenueOtp", static: false, private: false, access: { has: function (obj) { return "requestVenueOtp" in obj; }, get: function (obj) { return obj.requestVenueOtp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _requestOrganizerOtp_decorators, { kind: "method", name: "requestOrganizerOtp", static: false, private: false, access: { has: function (obj) { return "requestOrganizerOtp" in obj; }, get: function (obj) { return obj.requestOrganizerOtp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyOtp_decorators, { kind: "method", name: "verifyOtp", static: false, private: false, access: { has: function (obj) { return "verifyOtp" in obj; }, get: function (obj) { return obj.verifyOtp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _loginWithEmail_decorators, { kind: "method", name: "loginWithEmail", static: false, private: false, access: { has: function (obj) { return "loginWithEmail" in obj; }, get: function (obj) { return obj.loginWithEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _loginWithPhone_decorators, { kind: "method", name: "loginWithPhone", static: false, private: false, access: { has: function (obj) { return "loginWithPhone" in obj; }, get: function (obj) { return obj.loginWithPhone; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setupPassword_decorators, { kind: "method", name: "setupPassword", static: false, private: false, access: { has: function (obj) { return "setupPassword" in obj; }, get: function (obj) { return obj.setupPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _signOut_decorators, { kind: "method", name: "signOut", static: false, private: false, access: { has: function (obj) { return "signOut" in obj; }, get: function (obj) { return obj.signOut; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthResolver = _classThis;
}();
exports.AuthResolver = AuthResolver;
