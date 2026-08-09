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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var argon2 = require("argon2");
var phone_util_1 = require("../../common/utils/phone.util");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwt, otp, config, capabilities, refreshTokens) {
            this.prisma = prisma;
            this.jwt = jwt;
            this.otp = otp;
            this.config = config;
            this.capabilities = capabilities;
            this.refreshTokens = refreshTokens;
        }
        /**
         * Issue an OTP for the given phone. Creates a bare User on first request (no
         * role is forced). When `role` is given, that capability is granted (and its
         * 1:1 profile created) — instantly for the open roles, so signing up as / adding
         * a role just works on the same number. `password`, if given, is stored on first
         * sign-up so the account can later log in with a password too.
         */
        AuthService_1.prototype.requestOtp = function (rawPhone, role, password) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, user, _a, _b, roleAdded, _c, result;
                var _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            phone = this.parsePhone(rawPhone);
                            return [4 /*yield*/, this.prisma.user.upsert({
                                    where: { phoneNumber: phone },
                                    update: {},
                                    create: { phoneNumber: phone },
                                })];
                        case 1:
                            user = _f.sent();
                            if (!(password && !user.passwordHash)) return [3 /*break*/, 4];
                            _b = (_a = this.prisma.user).update;
                            _d = {
                                where: { id: user.id }
                            };
                            _e = {};
                            return [4 /*yield*/, argon2.hash(password, { type: argon2.argon2id })];
                        case 2: return [4 /*yield*/, _b.apply(_a, [(_d.data = (_e.passwordHash = _f.sent(), _e),
                                    _d)])];
                        case 3:
                            _f.sent();
                            _f.label = 4;
                        case 4:
                            if (!role) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.grantRole(user.id, role)];
                        case 5:
                            _c = _f.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            _c = false;
                            _f.label = 7;
                        case 7:
                            roleAdded = _c;
                            return [4 /*yield*/, this.otp.issue(phone)];
                        case 8:
                            result = _f.sent();
                            return [2 /*return*/, __assign(__assign({ phoneNumber: phone }, result), { roleAdded: roleAdded })];
                    }
                });
            });
        };
        /**
         * Grant a capability (idempotent) + create its 1:1 role profile. Open roles
         * land APPROVED immediately. Returns true if the account didn't already hold it.
         */
        AuthService_1.prototype.grantRole = function (userId, role) {
            return __awaiter(this, void 0, void 0, function () {
                var current, roleAdded;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.capabilities.getStatus(userId, role)];
                        case 1:
                            current = _a.sent();
                            roleAdded = current !== client_1.CapabilityStatus.APPROVED;
                            return [4 /*yield*/, this.capabilities.setStatus(userId, role, client_1.CapabilityStatus.APPROVED)];
                        case 2:
                            _a.sent();
                            if (!(role === client_1.CapabilityType.PLAYER)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.playerProfile.upsert({ where: { userId: userId }, update: {}, create: { userId: userId } })];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            if (!(role === client_1.CapabilityType.ORGANIZER)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.organizerProfile.upsert({
                                    where: { userId: userId },
                                    update: {},
                                    create: { userId: userId },
                                })];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/, roleAdded];
                    }
                });
            });
        };
        /**
         * Verify the OTP and issue an access token.
         */
        AuthService_1.prototype.verifyOtp = function (rawPhone, code) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, existing, user, token;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            phone = this.parsePhone(rawPhone);
                            return [4 /*yield*/, this.otp.verify(phone, code)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { phoneNumber: phone } })];
                        case 2:
                            existing = _b.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { phoneNumber: phone },
                                    data: {
                                        lastLoginAt: new Date(),
                                        // Mark the phone verified the first time only — gates password login.
                                        phoneVerifiedAt: (_a = existing === null || existing === void 0 ? void 0 : existing.phoneVerifiedAt) !== null && _a !== void 0 ? _a : new Date(),
                                    },
                                    include: { capabilities: true },
                                })];
                        case 3:
                            user = _b.sent();
                            if (!user.isActive) {
                                throw new common_1.BadRequestException('This account has been deactivated.');
                            }
                            return [4 /*yield*/, this.signAccessToken(user)];
                        case 4:
                            token = _b.sent();
                            return [2 /*return*/, { user: user, token: token }];
                    }
                });
            });
        };
        /**
         * Phone + password login (mobile). Only succeeds once the phone has been
         * verified via OTP at least once — the first sign-in must be OTP. A generic
         * message is returned for every failure mode to prevent enumeration.
         */
        AuthService_1.prototype.loginWithPhonePassword = function (rawPhone, password) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, user, invalid, ok, updated, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = this.parsePhone(rawPhone);
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { phoneNumber: phone } })];
                        case 1:
                            user = _a.sent();
                            invalid = function () { return new common_1.UnauthorizedException('Invalid phone number or password.'); };
                            if (!(!user || !user.passwordHash || !user.phoneVerifiedAt)) return [3 /*break*/, 3];
                            // Constant-time dummy verify so missing-user / unverified responses match.
                            return [4 /*yield*/, argon2
                                    .verify('$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$X9N0BPzHvW3Hh9F9KmCw5/h2qD9QtdLh9wM5cd2u8oM', password)
                                    .catch(function () { return undefined; })];
                        case 2:
                            // Constant-time dummy verify so missing-user / unverified responses match.
                            _a.sent();
                            throw invalid();
                        case 3: return [4 /*yield*/, argon2.verify(user.passwordHash, password)];
                        case 4:
                            ok = _a.sent();
                            if (!ok)
                                throw invalid();
                            if (!user.isActive)
                                throw new common_1.UnauthorizedException('This account has been deactivated.');
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: { lastLoginAt: new Date() },
                                    include: { capabilities: true },
                                })];
                        case 5:
                            updated = _a.sent();
                            return [4 /*yield*/, this.signAccessToken(updated)];
                        case 6:
                            token = _a.sent();
                            return [2 /*return*/, { user: updated, token: token }];
                    }
                });
            });
        };
        /**
         * Email + password login. Used by the admin and venue-management web panels.
         * The same generic message is returned for unknown email / wrong password /
         * missing password hash so an attacker can't enumerate registered emails.
         */
        AuthService_1.prototype.loginWithEmail = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var normalisedEmail, user, invalid, ok, updated, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalisedEmail = email.trim().toLowerCase();
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: normalisedEmail } })];
                        case 1:
                            user = _a.sent();
                            invalid = function () { return new common_1.UnauthorizedException('Invalid email or password.'); };
                            if (!(!user || !user.passwordHash)) return [3 /*break*/, 3];
                            // Run a dummy verify to keep the response time constant whether the user
                            // exists or not — defeats trivial timing-based enumeration.
                            return [4 /*yield*/, argon2
                                    .verify('$argon2id$v=19$m=65536,t=3,p=4$c29tZXNhbHRzb21lc2FsdA$X9N0BPzHvW3Hh9F9KmCw5/h2qD9QtdLh9wM5cd2u8oM', password)
                                    .catch(function () { return undefined; })];
                        case 2:
                            // Run a dummy verify to keep the response time constant whether the user
                            // exists or not — defeats trivial timing-based enumeration.
                            _a.sent();
                            throw invalid();
                        case 3: return [4 /*yield*/, argon2.verify(user.passwordHash, password)];
                        case 4:
                            ok = _a.sent();
                            if (!ok)
                                throw invalid();
                            if (!user.isActive)
                                throw new common_1.UnauthorizedException('This account has been deactivated.');
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: { lastLoginAt: new Date() },
                                    include: { capabilities: true },
                                })];
                        case 5:
                            updated = _a.sent();
                            return [4 /*yield*/, this.signAccessToken(updated)];
                        case 6:
                            token = _a.sent();
                            return [2 /*return*/, { user: updated, token: token }];
                    }
                });
            });
        };
        /**
         * Password recovery, step 1 of 3: text a code to an EXISTING account.
         *
         * Deliberately not `requestOtp`: that one upserts the user and grants a role,
         * which is right for sign-up and wrong here — you can only recover an account
         * that already exists, and recovering it must never change what it can do.
         */
        AuthService_1.prototype.requestPasswordReset = function (rawPhone) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = this.parsePhone(rawPhone);
                            return [4 /*yield*/, this.findResettableUser(phone)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.otp.issue(phone)];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, __assign({ phoneNumber: phone }, result)];
                    }
                });
            });
        };
        /**
         * Step 2: check the code and hand back a short-lived ticket. Splitting this
         * from the reset itself is what lets the code screen answer "wrong code"
         * immediately, before anyone types a new password.
         */
        AuthService_1.prototype.verifyPasswordResetCode = function (rawPhone, code) {
            return __awaiter(this, void 0, void 0, function () {
                var phone;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            phone = this.parsePhone(rawPhone);
                            return [4 /*yield*/, this.findResettableUser(phone)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.otp.verify(phone, code)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, this.otp.issueResetTicket(phone)];
                    }
                });
            });
        };
        /** Step 3: spend the ticket on a new password and end every live session. */
        AuthService_1.prototype.resetPassword = function (rawPhone, resetToken, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var phone, user, _a, _b;
                var _c, _d;
                var _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            phone = this.parsePhone(rawPhone);
                            return [4 /*yield*/, this.findResettableUser(phone)];
                        case 1:
                            user = _f.sent();
                            return [4 /*yield*/, this.otp.consumeResetTicket(phone, resetToken)];
                        case 2:
                            _f.sent();
                            _b = (_a = this.prisma.user).update;
                            _c = {
                                where: { id: user.id }
                            };
                            _d = {};
                            return [4 /*yield*/, argon2.hash(newPassword, { type: argon2.argon2id })];
                        case 3: return [4 /*yield*/, _b.apply(_a, [(_c.data = (_d.passwordHash = _f.sent(),
                                    // The code proved they hold the number, and password login is gated on
                                    // this — so a reset also unblocks an account that never verified.
                                    _d.phoneVerifiedAt = (_e = user.phoneVerifiedAt) !== null && _e !== void 0 ? _e : new Date(),
                                    // Every token signed before the change stops working: whoever forced
                                    // the reset should not stay signed in on their old session.
                                    _d.tokenVersion = { increment: 1 },
                                    _d),
                                    _c)])];
                        case 4:
                            _f.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** The account a reset may target — it has to exist and still be usable. */
        AuthService_1.prototype.findResettableUser = function (phone) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { phoneNumber: phone } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.BadRequestException('No Arena NP account uses this number.');
                            if (!user.isActive)
                                throw new common_1.BadRequestException('This account has been deactivated.');
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * Public helper used by other modules (e.g. invitation accept) to mint an
         * access token for a user without going through OTP / password.
         */
        AuthService_1.prototype.issueTokenForUser = function (user) {
            return this.signAccessToken(user);
        };
        /**
         * Open a session for a user who has just proved who they are. The access token
         * comes from the login path itself; this adds the refresh token that keeps
         * renewing it for as long as they stay active.
         */
        AuthService_1.prototype.setupStaffPassword = function (token, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, passwordHash, updatedUser, accessToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { setupToken: token },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException('Invalid or expired setup token.');
                            }
                            // Check if token has expired
                            if (user.setupTokenExpiry && user.setupTokenExpiry < new Date()) {
                                throw new common_1.BadRequestException('Setup token has expired.');
                            }
                            // Check if token was already used
                            if (user.setupTokenUsedAt) {
                                throw new common_1.BadRequestException('Setup token has already been used.');
                            }
                            return [4 /*yield*/, argon2.hash(password, { type: argon2.argon2id })];
                        case 2:
                            passwordHash = _a.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        passwordHash: passwordHash,
                                        setupToken: null,
                                        setupTokenUsedAt: new Date(),
                                        tokenVersion: { increment: 1 }, // Ensure any old tokens are invalid
                                    },
                                })];
                        case 3:
                            updatedUser = _a.sent();
                            return [4 /*yield*/, this.signAccessToken(updatedUser)];
                        case 4:
                            accessToken = _a.sent();
                            return [2 /*return*/, {
                                    user: updatedUser,
                                    token: accessToken,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.invalidateSessions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: { tokenVersion: { increment: 1 } },
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.refreshTokens.revokeAllForUser(userId, reason)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.signAccessToken = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var ttl, payload, accessToken, decoded;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            ttl = this.config.get('app.jwt').accessTtl;
                            payload = {
                                sub: user.id,
                                role: user.role,
                                tokenVersion: user.tokenVersion,
                            };
                            return [4 /*yield*/, this.jwt.signAsync(payload, {
                                    expiresIn: ttl,
                                })];
                        case 1:
                            accessToken = _a.sent();
                            decoded = this.jwt.decode(accessToken);
                            return [2 /*return*/, {
                                    accessToken: accessToken,
                                    tokenType: 'Bearer',
                                    expiresAt: new Date(decoded.exp * 1000),
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.parsePhone = function (raw) {
            try {
                return (0, phone_util_1.normaliseNepalPhone)(raw);
            }
            catch (_a) {
                throw new common_1.BadRequestException('Phone must be a valid Nepal mobile number.');
            }
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
