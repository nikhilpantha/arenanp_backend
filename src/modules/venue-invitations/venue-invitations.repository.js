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
exports.VenueInvitationsRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var INVITATION_INCLUDES = {
    invitedBy: true,
    createdUser: true,
};
var VenueInvitationsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VenueInvitationsRepository = _classThis = /** @class */ (function () {
        function VenueInvitationsRepository_1(prisma) {
            this.prisma = prisma;
        }
        VenueInvitationsRepository_1.prototype.findById = function (id) {
            return this.prisma.venueInvitation.findUnique({
                where: { id: id },
                include: INVITATION_INCLUDES,
            });
        };
        /** Pending = not yet accepted and not expired. */
        VenueInvitationsRepository_1.prototype.findPendingByEmail = function (email) {
            return this.prisma.venueInvitation.findFirst({
                where: {
                    email: email,
                    acceptedAt: null,
                    expiresAt: { gt: new Date() },
                },
                include: INVITATION_INCLUDES,
            });
        };
        VenueInvitationsRepository_1.prototype.listPending = function () {
            return this.prisma.venueInvitation.findMany({
                where: { acceptedAt: null },
                orderBy: { createdAt: 'desc' },
                include: INVITATION_INCLUDES,
            });
        };
        VenueInvitationsRepository_1.prototype.create = function (args) {
            var _a, _b;
            return this.prisma.venueInvitation.create({
                data: {
                    email: args.email,
                    fullName: (_a = args.fullName) !== null && _a !== void 0 ? _a : null,
                    phoneNumber: (_b = args.phoneNumber) !== null && _b !== void 0 ? _b : null,
                    tokenHash: args.tokenHash,
                    expiresAt: args.expiresAt,
                    invitedById: args.invitedById,
                },
                include: INVITATION_INCLUDES,
            });
        };
        VenueInvitationsRepository_1.prototype.rotateToken = function (args) {
            return this.prisma.venueInvitation.update({
                where: { id: args.id },
                data: { tokenHash: args.tokenHash, expiresAt: args.expiresAt },
                include: INVITATION_INCLUDES,
            });
        };
        VenueInvitationsRepository_1.prototype.delete = function (id) {
            return this.prisma.venueInvitation.delete({ where: { id: id } }).then(function () { return undefined; });
        };
        /**
         * Consume an invitation transactionally:
         *   1. Create or upgrade the User (set password hash + APPROVED status).
         *   2. Stamp `acceptedAt` and link `createdUserId` on the invitation row.
         *
         * Returns the User so the resolver can mint an access token for them.
         */
        VenueInvitationsRepository_1.prototype.acceptAndProvisionUser = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var invitation, existing, userId, updated, phone, created;
                            var _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, tx.venueInvitation.findUnique({
                                            where: { id: args.invitationId },
                                        })];
                                    case 1:
                                        invitation = _e.sent();
                                        if (!invitation)
                                            throw new Error('Invitation not found');
                                        if (invitation.acceptedAt)
                                            throw new Error('Invitation already used');
                                        if (invitation.expiresAt <= new Date())
                                            throw new Error('Invitation expired');
                                        return [4 /*yield*/, tx.user.findUnique({ where: { email: invitation.email } })];
                                    case 2:
                                        existing = _e.sent();
                                        if (existing && existing.passwordHash) {
                                            throw new Error('An account with this email already exists. Please sign in.');
                                        }
                                        if (!existing) return [3 /*break*/, 4];
                                        return [4 /*yield*/, tx.user.update({
                                                where: { id: existing.id },
                                                data: {
                                                    passwordHash: args.passwordHash,
                                                    fullName: (_b = (_a = existing.fullName) !== null && _a !== void 0 ? _a : invitation.fullName) !== null && _b !== void 0 ? _b : undefined,
                                                    isActive: true,
                                                },
                                            })];
                                    case 3:
                                        updated = _e.sent();
                                        userId = updated.id;
                                        return [3 /*break*/, 6];
                                    case 4:
                                        phone = ((_c = invitation.phoneNumber) === null || _c === void 0 ? void 0 : _c.trim()) || "pending+".concat(invitation.id, "@").concat(Date.now());
                                        return [4 /*yield*/, tx.user.create({
                                                data: {
                                                    email: invitation.email,
                                                    phoneNumber: phone,
                                                    fullName: (_d = invitation.fullName) !== null && _d !== void 0 ? _d : undefined,
                                                    passwordHash: args.passwordHash,
                                                },
                                            })];
                                    case 5:
                                        created = _e.sent();
                                        userId = created.id;
                                        _e.label = 6;
                                    case 6: 
                                    // Grant the VENUE capability (admin-invited accounts are pre-approved).
                                    return [4 /*yield*/, tx.userCapability.upsert({
                                            where: { userId_type: { userId: userId, type: client_1.CapabilityType.VENUE } },
                                            update: { status: client_1.CapabilityStatus.APPROVED },
                                            create: { userId: userId, type: client_1.CapabilityType.VENUE, status: client_1.CapabilityStatus.APPROVED },
                                        })];
                                    case 7:
                                        // Grant the VENUE capability (admin-invited accounts are pre-approved).
                                        _e.sent();
                                        return [4 /*yield*/, tx.venueInvitation.update({
                                                where: { id: invitation.id },
                                                data: { acceptedAt: new Date(), createdUserId: userId },
                                            })];
                                    case 8:
                                        _e.sent();
                                        return [2 /*return*/, tx.user.findUniqueOrThrow({ where: { id: userId }, include: { capabilities: true } })];
                                }
                            });
                        }); })];
                });
            });
        };
        return VenueInvitationsRepository_1;
    }());
    __setFunctionName(_classThis, "VenueInvitationsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueInvitationsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueInvitationsRepository = _classThis;
}();
exports.VenueInvitationsRepository = VenueInvitationsRepository;
