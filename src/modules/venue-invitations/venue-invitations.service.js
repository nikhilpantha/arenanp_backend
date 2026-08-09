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
exports.VenueInvitationsService = void 0;
var crypto_1 = require("crypto");
var common_1 = require("@nestjs/common");
var argon2 = require("argon2");
var invitation_models_1 = require("./dto/invitation.models");
var INVITATION_TTL_HOURS = 72;
var VenueInvitationsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VenueInvitationsService = _classThis = /** @class */ (function () {
        function VenueInvitationsService_1(repo, prisma, mailer, auth, config) {
            this.repo = repo;
            this.prisma = prisma;
            this.mailer = mailer;
            this.auth = auth;
            this.config = config;
            this.logger = new common_1.Logger(VenueInvitationsService.name);
        }
        VenueInvitationsService_1.prototype.listPending = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.listPending()];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(invitation_models_1.mapInvitationToGraphql)];
                    }
                });
            });
        };
        VenueInvitationsService_1.prototype.invite = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                var email, existingUser, existingInvite, _a, token, tokenHash, expiresAt, invitation, setupUrl;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            email = input.email.trim().toLowerCase();
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            existingUser = _d.sent();
                            if (existingUser && existingUser.passwordHash) {
                                throw new common_1.ConflictException('An account with this email already exists. Ask them to sign in instead.');
                            }
                            return [4 /*yield*/, this.repo.findPendingByEmail(email)];
                        case 2:
                            existingInvite = _d.sent();
                            if (existingInvite) {
                                throw new common_1.ConflictException('A pending invitation already exists for this email. Resend or revoke it first.');
                            }
                            return [4 /*yield*/, this.mintToken()];
                        case 3:
                            _a = _d.sent(), token = _a.token, tokenHash = _a.tokenHash;
                            expiresAt = this.expiry();
                            return [4 /*yield*/, this.repo.create({
                                    email: email,
                                    fullName: ((_b = input.fullName) === null || _b === void 0 ? void 0 : _b.trim()) || null,
                                    phoneNumber: ((_c = input.phoneNumber) === null || _c === void 0 ? void 0 : _c.trim()) || null,
                                    tokenHash: tokenHash,
                                    expiresAt: expiresAt,
                                    invitedById: actor.id,
                                })];
                        case 4:
                            invitation = _d.sent();
                            setupUrl = this.buildSetupUrl(invitation.id, token);
                            return [4 /*yield*/, this.sendInviteEmail({
                                    email: email,
                                    fullName: invitation.fullName,
                                    setupUrl: setupUrl,
                                })];
                        case 5:
                            _d.sent();
                            return [2 /*return*/, {
                                    invitation: (0, invitation_models_1.mapInvitationToGraphql)(invitation),
                                    setupUrl: this.mailer.provider === 'stub' ? setupUrl : undefined,
                                }];
                    }
                });
            });
        };
        VenueInvitationsService_1.prototype.resend = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var row, _a, token, tokenHash, updated, setupUrl;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(input.invitationId)];
                        case 1:
                            row = _b.sent();
                            if (!row)
                                throw new common_1.NotFoundException('Invitation not found.');
                            if (row.acceptedAt) {
                                throw new common_1.BadRequestException('That invitation has already been accepted.');
                            }
                            return [4 /*yield*/, this.mintToken()];
                        case 2:
                            _a = _b.sent(), token = _a.token, tokenHash = _a.tokenHash;
                            return [4 /*yield*/, this.repo.rotateToken({
                                    id: row.id,
                                    tokenHash: tokenHash,
                                    expiresAt: this.expiry(),
                                })];
                        case 3:
                            updated = _b.sent();
                            setupUrl = this.buildSetupUrl(updated.id, token);
                            return [4 /*yield*/, this.sendInviteEmail({
                                    email: updated.email,
                                    fullName: updated.fullName,
                                    setupUrl: setupUrl,
                                })];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, {
                                    invitation: (0, invitation_models_1.mapInvitationToGraphql)(updated),
                                    setupUrl: this.mailer.provider === 'stub' ? setupUrl : undefined,
                                }];
                    }
                });
            });
        };
        VenueInvitationsService_1.prototype.revoke = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(input.invitationId)];
                        case 1:
                            row = _a.sent();
                            if (!row)
                                throw new common_1.NotFoundException('Invitation not found.');
                            if (row.acceptedAt) {
                                throw new common_1.BadRequestException('Accepted invitations can no longer be revoked.');
                            }
                            return [4 /*yield*/, this.repo.delete(row.id)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /** Public — called by the setup page before showing the password form. */
        VenueInvitationsService_1.prototype.verifyToken = function (rawToken) {
            return __awaiter(this, void 0, void 0, function () {
                var parsed, row, ok;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            parsed = this.parseToken(rawToken);
                            if (!parsed)
                                return [2 /*return*/, { valid: false, reason: 'Malformed token.' }];
                            return [4 /*yield*/, this.repo.findById(parsed.id)];
                        case 1:
                            row = _c.sent();
                            if (!row)
                                return [2 /*return*/, { valid: false, reason: 'Invitation not found.' }];
                            if (row.acceptedAt)
                                return [2 /*return*/, { valid: false, reason: 'This invitation has already been used.' }];
                            if (row.expiresAt <= new Date()) {
                                return [2 /*return*/, { valid: false, reason: 'This invitation has expired.' }];
                            }
                            return [4 /*yield*/, this.verifyHash(row.tokenHash, parsed.secret)];
                        case 2:
                            ok = _c.sent();
                            if (!ok)
                                return [2 /*return*/, { valid: false, reason: 'Invalid invitation token.' }];
                            return [2 /*return*/, {
                                    valid: true,
                                    email: row.email,
                                    fullName: (_a = row.fullName) !== null && _a !== void 0 ? _a : undefined,
                                    phoneNumber: (_b = row.phoneNumber) !== null && _b !== void 0 ? _b : undefined,
                                }];
                    }
                });
            });
        };
        /** Public — consumes the invitation and signs the user in. */
        VenueInvitationsService_1.prototype.accept = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var parsed, row, ok, passwordHash, user, err_1, msg;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            parsed = this.parseToken(input.token);
                            if (!parsed)
                                throw new common_1.BadRequestException('Malformed token.');
                            return [4 /*yield*/, this.repo.findById(parsed.id)];
                        case 1:
                            row = _b.sent();
                            if (!row)
                                throw new common_1.BadRequestException('Invitation not found.');
                            if (row.acceptedAt)
                                throw new common_1.BadRequestException('This invitation has already been used.');
                            if (row.expiresAt <= new Date()) {
                                throw new common_1.BadRequestException('This invitation has expired.');
                            }
                            return [4 /*yield*/, this.verifyHash(row.tokenHash, parsed.secret)];
                        case 2:
                            ok = _b.sent();
                            if (!ok)
                                throw new common_1.BadRequestException('Invalid invitation token.');
                            return [4 /*yield*/, argon2.hash(input.password, { type: argon2.argon2id })];
                        case 3:
                            passwordHash = _b.sent();
                            _b.label = 4;
                        case 4:
                            _b.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.repo.acceptAndProvisionUser({
                                    invitationId: row.id,
                                    passwordHash: passwordHash,
                                })];
                        case 5:
                            user = _b.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            err_1 = _b.sent();
                            msg = err_1 instanceof Error ? err_1.message : 'Could not accept invitation.';
                            throw new common_1.BadRequestException(msg);
                        case 7:
                            _a = { user: user };
                            return [4 /*yield*/, this.auth.issueTokenForUser(user)];
                        case 8: 
                        // The caller turns this into a full session (refresh token + cookie) — accepting
                        // an invitation signs you in, and a 15-minute access token on its own would drop
                        // the new staff member back at the login screen mid-setup.
                        return [2 /*return*/, (_a.token = _b.sent(), _a)];
                    }
                });
            });
        };
        VenueInvitationsService_1.prototype.mintToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var secret, tokenHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            secret = (0, crypto_1.randomBytes)(32).toString('base64url');
                            return [4 /*yield*/, argon2.hash(secret, { type: argon2.argon2id })];
                        case 1:
                            tokenHash = _a.sent();
                            return [2 /*return*/, { token: secret, tokenHash: tokenHash }];
                    }
                });
            });
        };
        VenueInvitationsService_1.prototype.verifyHash = function (hash, secret) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, argon2.verify(hash, secret)];
                        case 1: return [2 /*return*/, _b.sent()];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        VenueInvitationsService_1.prototype.parseToken = function (raw) {
            var dot = raw.indexOf('.');
            if (dot <= 0 || dot === raw.length - 1)
                return null;
            return { id: raw.slice(0, dot), secret: raw.slice(dot + 1) };
        };
        VenueInvitationsService_1.prototype.buildSetupUrl = function (invitationId, secret) {
            var _a;
            var base = (_a = this.config.get('FRONTEND_URL')) !== null && _a !== void 0 ? _a : 'http://localhost:3000';
            return "".concat(base.replace(/\/$/, ''), "/setup-account?token=").concat(invitationId, ".").concat(secret);
        };
        VenueInvitationsService_1.prototype.expiry = function () {
            var d = new Date();
            d.setHours(d.getHours() + INVITATION_TTL_HOURS);
            return d;
        };
        VenueInvitationsService_1.prototype.sendInviteEmail = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var greeting, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            greeting = args.fullName ? "Hi ".concat(args.fullName) : 'Hi there';
                            text = "".concat(greeting, ",\n\nYou've been invited to join Arena NP as a venue owner. Click the link below to set your password and finish setting up your account. The link expires in ").concat(INVITATION_TTL_HOURS, " hours.\n\n").concat(args.setupUrl, "\n\nIf you didn't expect this email, you can safely ignore it.\n\n\u2014 The Arena NP team");
                            return [4 /*yield*/, this.mailer.send({
                                    to: args.email,
                                    subject: 'Set up your Arena NP venue account',
                                    text: text,
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return VenueInvitationsService_1;
    }());
    __setFunctionName(_classThis, "VenueInvitationsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueInvitationsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueInvitationsService = _classThis;
}();
exports.VenueInvitationsService = VenueInvitationsService;
