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
exports.WaitlistService = void 0;
var common_1 = require("@nestjs/common");
var WaitlistService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WaitlistService = _classThis = /** @class */ (function () {
        function WaitlistService_1(prisma, mailer) {
            this.prisma = prisma;
            this.mailer = mailer;
        }
        /// Generate a 6-digit verification code
        WaitlistService_1.prototype.generateVerificationToken = function () {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
        WaitlistService_1.prototype.joinWaitlist = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, source, existing, emailRegex, verificationToken, tokenExpiresAt, entry;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = dto.email, source = dto.source;
                            return [4 /*yield*/, this.prisma.waitlist.findUnique({
                                    where: { email: email },
                                })];
                        case 1:
                            existing = _a.sent();
                            if (existing) {
                                throw new common_1.ConflictException('Email already on waitlist');
                            }
                            emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(email)) {
                                throw new common_1.BadRequestException('Invalid email format');
                            }
                            verificationToken = this.generateVerificationToken();
                            tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.prisma.waitlist.create({
                                    data: {
                                        email: email,
                                        source: source || 'landing',
                                        verificationToken: verificationToken,
                                        verificationTokenExpiresAt: tokenExpiresAt,
                                        metadata: {
                                            createdAt: new Date().toISOString(),
                                        },
                                    },
                                })];
                        case 2:
                            entry = _a.sent();
                            // Send verification email
                            return [4 /*yield*/, this.sendVerificationEmail(email, verificationToken)];
                        case 3:
                            // Send verification email
                            _a.sent();
                            return [2 /*return*/, {
                                    id: entry.id,
                                    email: entry.email,
                                    joinedAt: entry.joinedAt,
                                    isVerified: entry.isVerified,
                                    message: 'Welcome to the waitlist! Check your email to verify your signup.',
                                }];
                    }
                });
            });
        };
        WaitlistService_1.prototype.sendVerificationEmail = function (email, token) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationLink;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            verificationLink = "".concat(process.env.APP_URL || 'http://localhost:3003', "/verify?token=").concat(token);
                            return [4 /*yield*/, this.mailer.send({
                                    to: email,
                                    subject: 'Verify your Arena NP waitlist signup',
                                    text: "\nWelcome to the Arena NP waitlist!\n\nYour verification code is: ".concat(token, "\n\nOr click the link to verify: ").concat(verificationLink, "\n\nThis link expires in 24 hours.\n\nThanks,\nThe Arena NP Team\n      "),
                                    html: "\n<h2>Welcome to the Arena NP waitlist!</h2>\n<p>Your verification code is: <strong>".concat(token, "</strong></p>\n<p><a href=\"").concat(verificationLink, "\">Click here to verify your email</a></p>\n<p>This link expires in 24 hours.</p>\n<p>Thanks,<br/>The Arena NP Team</p>\n      "),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WaitlistService_1.prototype.verifyEmail = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.waitlist.findFirst({
                                where: { verificationToken: token },
                            })];
                        case 1:
                            entry = _a.sent();
                            if (!entry) {
                                throw new common_1.NotFoundException('Invalid verification token');
                            }
                            // Check if token has expired
                            if (entry.verificationTokenExpiresAt && entry.verificationTokenExpiresAt < new Date()) {
                                throw new common_1.BadRequestException('Verification token has expired');
                            }
                            return [4 /*yield*/, this.prisma.waitlist.update({
                                    where: { id: entry.id },
                                    data: {
                                        isVerified: true,
                                        verifiedAt: new Date(),
                                        verificationToken: null, // Clear the token
                                    },
                                })];
                        case 2:
                            updated = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    email: updated.email,
                                }];
                    }
                });
            });
        };
        WaitlistService_1.prototype.resendVerificationEmail = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var entry, newToken, tokenExpiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.waitlist.findUnique({
                                where: { email: email },
                            })];
                        case 1:
                            entry = _a.sent();
                            if (!entry) {
                                throw new common_1.NotFoundException('Email not found on waitlist');
                            }
                            if (entry.isVerified) {
                                throw new common_1.BadRequestException('Email is already verified');
                            }
                            newToken = this.generateVerificationToken();
                            tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
                            // Update with new token
                            return [4 /*yield*/, this.prisma.waitlist.update({
                                    where: { id: entry.id },
                                    data: {
                                        verificationToken: newToken,
                                        verificationTokenExpiresAt: tokenExpiresAt,
                                    },
                                })];
                        case 2:
                            // Update with new token
                            _a.sent();
                            // Resend email
                            return [4 /*yield*/, this.sendVerificationEmail(email, newToken)];
                        case 3:
                            // Resend email
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Verification email resent. Check your inbox.',
                                }];
                    }
                });
            });
        };
        WaitlistService_1.prototype.getWaitlistStats = function () {
            return __awaiter(this, void 0, void 0, function () {
                var total, verified, bySource;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.waitlist.count()];
                        case 1:
                            total = _a.sent();
                            return [4 /*yield*/, this.prisma.waitlist.count({
                                    where: { isVerified: true },
                                })];
                        case 2:
                            verified = _a.sent();
                            return [4 /*yield*/, this.prisma.waitlist.groupBy({
                                    by: ['source'],
                                    _count: true,
                                })];
                        case 3:
                            bySource = _a.sent();
                            return [2 /*return*/, {
                                    totalSignups: total,
                                    verifiedUsers: verified,
                                    pendingVerification: total - verified,
                                    bySource: bySource.map(function (s) { return ({
                                        source: s.source || 'unknown',
                                        count: s._count,
                                    }); }),
                                }];
                    }
                });
            });
        };
        WaitlistService_1.prototype.markNotified = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.waitlist.update({
                            where: { email: email },
                            data: {
                                notifiedAt: new Date(),
                            },
                        })];
                });
            });
        };
        return WaitlistService_1;
    }());
    __setFunctionName(_classThis, "WaitlistService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WaitlistService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WaitlistService = _classThis;
}();
exports.WaitlistService = WaitlistService;
