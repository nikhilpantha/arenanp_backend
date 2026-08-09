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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var crypto_1 = require("crypto");
var StaffService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StaffService = _classThis = /** @class */ (function () {
        function StaffService_1(prisma, emailService, configService, staffPermissions, permissions) {
            this.prisma = prisma;
            this.emailService = emailService;
            this.configService = configService;
            this.staffPermissions = staffPermissions;
            this.permissions = permissions;
            this.logger = new common_1.Logger(StaffService.name);
        }
        /**
         * Create a staff member and mark them an admin of one scope.
         *
         * No role is assigned: `User.role` is set to ADMIN purely as a marker, and
         * what this person can actually do comes from the permission grants made
         * here (optionally) and on the permissions screen afterwards.
         */
        StaffService_1.prototype.createStaff = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var scopeId, existing, setupToken, setupTokenExpiry, user, frontendUrl, setupUrl, error_1;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.resolveScopeTarget(input.scopeType, input.scopeId)];
                        case 1:
                            scopeId = _b.sent();
                            return [4 /*yield*/, this.prisma.user.findFirst({
                                    where: { email: input.email },
                                    select: { id: true },
                                })];
                        case 2:
                            existing = _b.sent();
                            if (existing) {
                                throw new common_1.BadRequestException("A user with email ".concat(input.email, " already exists"));
                            }
                            setupToken = (0, crypto_1.randomBytes)(32).toString('hex');
                            setupTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var created;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.user.create({
                                                    data: {
                                                        email: input.email,
                                                        fullName: input.fullName,
                                                        phoneNumber: input.email, // Temporary: phone is unique and not collected here
                                                        role: client_1.UserRole.ADMIN,
                                                        isActive: true,
                                                        isStaff: true,
                                                        setupToken: setupToken,
                                                        setupTokenExpiry: setupTokenExpiry,
                                                        tokenVersion: 1,
                                                    },
                                                })];
                                            case 1:
                                                created = _a.sent();
                                                return [4 /*yield*/, this.createAssignment(tx, created.id, input.scopeType, scopeId, actorId)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/, created];
                                        }
                                    });
                                }); })];
                        case 3:
                            user = _b.sent();
                            if (!((_a = input.permissionKeys) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.staffPermissions.setPermissions(user.id, { scopeType: input.scopeType, scopeId: scopeId }, input.permissionKeys, actorId)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _b.trys.push([5, 7, , 8]);
                            frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
                            setupUrl = "".concat(frontendUrl, "/setup-password?token=").concat(setupToken);
                            return [4 /*yield*/, this.emailService.sendStaffWelcomeEmail(user.email, user.fullName || input.fullName, setupUrl)];
                        case 6:
                            _b.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            error_1 = _b.sent();
                            // A failed email must not roll back the account — it can be resent.
                            this.logger.error("Failed to send welcome email to ".concat(user.email, ": ").concat(String(error_1)));
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/, user];
                    }
                });
            });
        };
        /** Suspend a staff member (isActive=false, all tokens revoked). */
        StaffService_1.prototype.suspendStaff = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: { isActive: false, tokenVersion: { increment: 1 } },
                            })];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.setAssignmentStatus(userId, client_1.StaffStatus.SUSPENDED)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(userId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /** Restore a suspended staff member. */
        StaffService_1.prototype.unsuspendStaff = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.update({
                                where: { id: userId },
                                data: { isActive: true },
                            })];
                        case 1:
                            user = _a.sent();
                            return [4 /*yield*/, this.setAssignmentStatus(userId, client_1.StaffStatus.ACTIVE)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(userId)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, user];
                    }
                });
            });
        };
        /**
         * Paginated staff list, optionally filtered by scope.
         *
         * Membership is read from the staff tables, not the `isStaff` flag — those
         * rows are the authority on who is an admin, and the flag is only a
         * denormalised cache of them. The seeded super admin appears here like any
         * other platform admin.
         */
        StaffService_1.prototype.listStaff = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, limit, _b, offset, scopeType, scopeId, isActive, anyStaffRecord, where, _c, users, total, counts;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = input.limit, limit = _a === void 0 ? 50 : _a, _b = input.offset, offset = _b === void 0 ? 0 : _b, scopeType = input.scopeType, scopeId = input.scopeId, isActive = input.isActive;
                            anyStaffRecord = {
                                OR: [
                                    { systemStaff: { isNot: null } },
                                    { venueStaff: { some: {} } },
                                    { organizerStaff: { some: {} } },
                                ],
                            };
                            where = __assign({ AND: __spreadArray([anyStaffRecord], (scopeType ? [this.scopeFilter(scopeType, scopeId)] : []), true) }, (isActive != null && { isActive: isActive }));
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.user.findMany({
                                        where: where,
                                        select: {
                                            id: true,
                                            phoneNumber: true,
                                            fullName: true,
                                            email: true,
                                            role: true,
                                            isActive: true,
                                            createdAt: true,
                                            systemStaff: { select: { status: true } },
                                            venueStaff: {
                                                select: { venueId: true, status: true, venue: { select: { name: true } } },
                                            },
                                            organizerStaff: {
                                                select: {
                                                    tournamentId: true,
                                                    status: true,
                                                    tournament: { select: { name: true } },
                                                },
                                            },
                                        },
                                        take: limit,
                                        skip: offset,
                                        orderBy: { createdAt: 'desc' },
                                    }),
                                    this.prisma.user.count({ where: where }),
                                ])];
                        case 1:
                            _c = _d.sent(), users = _c[0], total = _c[1];
                            return [4 /*yield*/, this.permissionCounts(users.map(function (u) { return u.id; }))];
                        case 2:
                            counts = _d.sent();
                            return [2 /*return*/, {
                                    items: users.map(function (user) { return ({
                                        id: user.id,
                                        phoneNumber: user.phoneNumber,
                                        fullName: user.fullName,
                                        email: user.email,
                                        role: user.role,
                                        assignments: _this.buildAssignments(user, counts),
                                        isActive: user.isActive,
                                        createdAt: user.createdAt,
                                    }); }),
                                    total: total,
                                    limit: limit,
                                    offset: offset,
                                }];
                    }
                });
            });
        };
        /** A staff member's grants and effective permissions within one scope. */
        StaffService_1.prototype.getStaffPermissions = function (userId, scopeType, scopeId) {
            return __awaiter(this, void 0, void 0, function () {
                var scope, _a, grants, permissions;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            scope = { scopeType: scopeType, scopeId: scopeId !== null && scopeId !== void 0 ? scopeId : '' };
                            return [4 /*yield*/, Promise.all([
                                    this.staffPermissions.listGrants(userId, scope),
                                    this.effectivePermissions(userId, scopeType, scopeId !== null && scopeId !== void 0 ? scopeId : ''),
                                ])];
                        case 1:
                            _a = _b.sent(), grants = _a[0], permissions = _a[1];
                            return [2 /*return*/, { grants: grants, permissions: permissions }];
                    }
                });
            });
        };
        /** Creates the SystemStaff / VenueStaff / OrganizerStaff row for a scope. */
        StaffService_1.prototype.createAssignment = function (tx, userId, scopeType, scopeId, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(scopeType === client_1.PermissionScopeType.PLATFORM)) return [3 /*break*/, 2];
                            return [4 /*yield*/, tx.systemStaff.create({ data: { userId: userId, createdBy: actorId, status: 'ACTIVE' } })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                        case 2:
                            if (!(scopeType === client_1.PermissionScopeType.VENUE)) return [3 /*break*/, 4];
                            return [4 /*yield*/, tx.venueStaff.create({
                                    data: { userId: userId, venueId: scopeId, createdBy: actorId, status: 'ACTIVE' },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                        case 4: return [4 /*yield*/, tx.organizerStaff.create({
                                data: { userId: userId, tournamentId: scopeId, createdBy: actorId, status: 'ACTIVE' },
                            })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /** Validates the venue / tournament exists and returns the normalised scope id. */
        StaffService_1.prototype.resolveScopeTarget = function (scopeType, scopeId) {
            return __awaiter(this, void 0, void 0, function () {
                var id, venue, tournament;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (scopeType === client_1.PermissionScopeType.PLATFORM)
                                return [2 /*return*/, ''];
                            id = scopeId === null || scopeId === void 0 ? void 0 : scopeId.trim();
                            if (!id) {
                                throw new common_1.BadRequestException("A ".concat(scopeType.toLowerCase(), " must be selected for a ").concat(scopeType.toLowerCase(), " admin"));
                            }
                            if (!(scopeType === client_1.PermissionScopeType.VENUE)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.venue.findUnique({ where: { id: id }, select: { id: true } })];
                        case 1:
                            venue = _a.sent();
                            if (!venue)
                                throw new common_1.NotFoundException('Venue not found');
                            return [2 /*return*/, id];
                        case 2: return [4 /*yield*/, this.prisma.tournament.findUnique({
                                where: { id: id },
                                select: { id: true },
                            })];
                        case 3:
                            tournament = _a.sent();
                            if (!tournament)
                                throw new common_1.NotFoundException('Tournament not found');
                            return [2 /*return*/, id];
                    }
                });
            });
        };
        StaffService_1.prototype.scopeFilter = function (scopeType, scopeId) {
            if (scopeType === client_1.PermissionScopeType.PLATFORM) {
                return { systemStaff: { isNot: null } };
            }
            if (scopeType === client_1.PermissionScopeType.VENUE) {
                return { venueStaff: { some: scopeId ? { venueId: scopeId } : {} } };
            }
            return { organizerStaff: { some: scopeId ? { tournamentId: scopeId } : {} } };
        };
        /** Grant counts keyed by `${userId}:${scopeType}:${scopeId}`. */
        StaffService_1.prototype.permissionCounts = function (userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0)
                                return [2 /*return*/, new Map()];
                            return [4 /*yield*/, this.prisma.staffPermission.groupBy({
                                    by: ['userId', 'scopeType', 'scopeId'],
                                    where: { userId: { in: userIds } },
                                    _count: { _all: true },
                                })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, new Map(rows.map(function (row) { return ["".concat(row.userId, ":").concat(row.scopeType, ":").concat(row.scopeId), row._count._all]; }))];
                    }
                });
            });
        };
        StaffService_1.prototype.buildAssignments = function (user, counts) {
            var _a, _b, _c, _d;
            var countFor = function (scopeType, scopeId) { var _a; return (_a = counts.get("".concat(user.id, ":").concat(scopeType, ":").concat(scopeId))) !== null && _a !== void 0 ? _a : 0; };
            var assignments = [];
            if (user.systemStaff) {
                assignments.push({
                    scopeType: client_1.PermissionScopeType.PLATFORM,
                    scopeId: '',
                    scopeName: 'Platform',
                    status: user.systemStaff.status,
                    permissionCount: countFor(client_1.PermissionScopeType.PLATFORM, ''),
                });
            }
            for (var _i = 0, _e = user.venueStaff; _i < _e.length; _i++) {
                var venue = _e[_i];
                assignments.push({
                    scopeType: client_1.PermissionScopeType.VENUE,
                    scopeId: venue.venueId,
                    scopeName: (_b = (_a = venue.venue) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null,
                    status: venue.status,
                    permissionCount: countFor(client_1.PermissionScopeType.VENUE, venue.venueId),
                });
            }
            for (var _f = 0, _g = user.organizerStaff; _f < _g.length; _f++) {
                var staff = _g[_f];
                if (!staff.tournamentId)
                    continue;
                assignments.push({
                    scopeType: client_1.PermissionScopeType.TOURNAMENT,
                    scopeId: staff.tournamentId,
                    scopeName: (_d = (_c = staff.tournament) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : null,
                    status: staff.status,
                    permissionCount: countFor(client_1.PermissionScopeType.TOURNAMENT, staff.tournamentId),
                });
            }
            return assignments;
        };
        StaffService_1.prototype.effectivePermissions = function (userId, scopeType, scopeId) {
            if (scopeType === client_1.PermissionScopeType.VENUE) {
                return this.permissions.getVenueUserPermissions(userId, scopeId);
            }
            if (scopeType === client_1.PermissionScopeType.TOURNAMENT) {
                return this.permissions.getTournamentUserPermissions(userId, scopeId);
            }
            return this.permissions.getUserPermissions(userId);
        };
        /** Mirrors suspension onto every scope record the staff member holds. */
        StaffService_1.prototype.setAssignmentStatus = function (userId, status) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.$transaction([
                                this.prisma.systemStaff.updateMany({ where: { userId: userId }, data: { status: status } }),
                                this.prisma.venueStaff.updateMany({ where: { userId: userId }, data: { status: status } }),
                                this.prisma.organizerStaff.updateMany({ where: { userId: userId }, data: { status: status } }),
                            ])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return StaffService_1;
    }());
    __setFunctionName(_classThis, "StaffService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffService = _classThis;
}();
exports.StaffService = StaffService;
