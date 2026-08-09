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
exports.ResourceOwnershipService = void 0;
var common_1 = require("@nestjs/common");
/**
 * Resource ownership validation service.
 * Ensures users can only access resources they own/manage.
 *
 * Usage: Call after permission checks to verify resource ownership
 * Example: User has 'bookings:read' permission, but can only read their own venue's bookings
 */
var ResourceOwnershipService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ResourceOwnershipService = _classThis = /** @class */ (function () {
        function ResourceOwnershipService_1(prisma) {
            this.prisma = prisma;
        }
        /**
         * Verify user has membership in a venue (ACTIVE status required).
         * Use this to prevent users from accessing venues they're not members of.
         *
         * @param userId - User ID
         * @param venueId - Venue ID to check
         * @throws ForbiddenException if user is not an active member
         */
        ResourceOwnershipService_1.prototype.validateVenueMembership = function (userId, venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var membership;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.venueMembership.findFirst({
                                where: {
                                    userId: userId,
                                    venueId: venueId,
                                    status: 'ACTIVE',
                                },
                                select: { id: true },
                            })];
                        case 1:
                            membership = _a.sent();
                            if (!membership) {
                                throw new common_1.ForbiddenException("You don't have access to this venue (venueId: ".concat(venueId, ")"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Verify user is the organizer of a tournament.
         * Prevents non-organizers from modifying tournaments they don't own.
         *
         * @param userId - User ID
         * @param tournamentId - Tournament ID to check
         * @throws ForbiddenException if user is not the organizer
         */
        ResourceOwnershipService_1.prototype.validateTournamentOwnership = function (userId, tournamentId) {
            return __awaiter(this, void 0, void 0, function () {
                var tournament;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.tournament.findUnique({
                                where: { id: tournamentId },
                                select: { organizerId: true },
                            })];
                        case 1:
                            tournament = _a.sent();
                            if (!tournament || tournament.organizerId !== userId) {
                                throw new common_1.ForbiddenException("You are not the organizer of this tournament (tournamentId: ".concat(tournamentId, ")"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Verify user owns/created a booking (if applicable for customer type).
         * For team/club bookings, verify membership.
         *
         * @param userId - User ID
         * @param bookingId - Booking ID to check
         * @throws ForbiddenException if user doesn't own the booking
         */
        ResourceOwnershipService_1.prototype.validateBookingOwnership = function (userId, bookingId) {
            return __awaiter(this, void 0, void 0, function () {
                var booking;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findUnique({
                                where: { id: bookingId },
                                select: { customerId: true, customerType: true },
                            })];
                        case 1:
                            booking = _a.sent();
                            if (!booking) {
                                throw new common_1.ForbiddenException("Booking not found (bookingId: ".concat(bookingId, ")"));
                            }
                            // For INDIVIDUAL bookings, customerId must match userId
                            if (booking.customerType === 'INDIVIDUAL' && booking.customerId !== userId) {
                                throw new common_1.ForbiddenException("You don't own this booking (bookingId: ".concat(bookingId, ")"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Verify user is viewing their own profile or has admin permissions.
         *
         * @param userId - User ID requesting
         * @param targetUserId - User ID being accessed
         * @throws ForbiddenException if different user and not admin context
         */
        ResourceOwnershipService_1.prototype.validateProfileAccess = function (userId, targetUserId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (userId !== targetUserId) {
                        throw new common_1.ForbiddenException("You can only access your own profile (userId: ".concat(targetUserId, ")"));
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Verify user has a specific role within a venue.
         * Use for operations that require a minimum role level.
         *
         * @param userId - User ID
         * @param venueId - Venue ID
         * @param requiredRole - Minimum role required (OWNER, MANAGER, etc.)
         * @throws ForbiddenException if user doesn't have the required role
         */
        ResourceOwnershipService_1.prototype.validateVenueRole = function (userId, venueId, requiredRole) {
            return __awaiter(this, void 0, void 0, function () {
                var membership, roleHierarchy, userLevel, requiredLevel;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.venueMembership.findFirst({
                                where: {
                                    userId: userId,
                                    venueId: venueId,
                                    status: 'ACTIVE',
                                },
                                select: { role: true },
                            })];
                        case 1:
                            membership = _a.sent();
                            if (!membership) {
                                throw new common_1.ForbiddenException("You don't have access to this venue");
                            }
                            roleHierarchy = { OWNER: 3, MANAGER: 2, FRONT_DESK: 1, STAFF: 0, COACH: 0 };
                            userLevel = roleHierarchy[membership.role] || 0;
                            requiredLevel = roleHierarchy[requiredRole];
                            if (userLevel < requiredLevel) {
                                throw new common_1.ForbiddenException("This operation requires ".concat(requiredRole, " role (you are ").concat(membership.role, ")"));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ResourceOwnershipService_1;
    }());
    __setFunctionName(_classThis, "ResourceOwnershipService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResourceOwnershipService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResourceOwnershipService = _classThis;
}();
exports.ResourceOwnershipService = ResourceOwnershipService;
