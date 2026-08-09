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
exports.VenueStaffService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var argon2 = require("argon2");
var permissions_1 = require("../../common/constants/permissions");
var password_policy_1 = require("../../common/utils/password-policy");
var phone_util_1 = require("../../common/utils/phone.util");
var venue_staff_models_1 = require("./dto/venue-staff.models");
var staff_login_1 = require("./staff-login");
/**
 * Roles an owner may hand out from the staff screen.
 *
 * OWNER is missing on purpose. It carries `finance:payout` and `staff:manage`,
 * and it interacts with `Venue.primaryOwnerId` — adding a business partner is
 * a rarer and more consequential act than hiring a receptionist, and it should
 * not be one option down a dropdown on the hiring form.
 */
var ASSIGNABLE_ROLES = [
    client_1.VenueMemberRole.MANAGER,
    client_1.VenueMemberRole.FRONT_DESK,
    client_1.VenueMemberRole.STAFF,
    client_1.VenueMemberRole.COACH,
];
var VenueStaffService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VenueStaffService = _classThis = /** @class */ (function () {
        function VenueStaffService_1(repo, auth) {
            this.repo = repo;
            this.auth = auth;
            this.logger = new common_1.Logger(VenueStaffService.name);
        }
        VenueStaffService_1.prototype.list = function (venueId, actorId, primaryOwnerId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, _a, ownerId, seats;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!primaryOwnerId) return [3 /*break*/, 1];
                            _a = null;
                            return [3 /*break*/, 3];
                        case 1: return [4 /*yield*/, this.repo.venueForStaff(venueId)];
                        case 2:
                            _a = _b.sent();
                            _b.label = 3;
                        case 3:
                            venue = _a;
                            ownerId = primaryOwnerId !== null && primaryOwnerId !== void 0 ? primaryOwnerId : venue === null || venue === void 0 ? void 0 : venue.primaryOwnerId;
                            return [4 /*yield*/, this.repo.listSeats(venueId)];
                        case 4:
                            seats = _b.sent();
                            return [2 /*return*/, seats.map(function (seat) { return mapSeat(seat, actorId, ownerId); })];
                    }
                });
            });
        };
        /**
         * What the form would do if submitted as typed.
         *
         * Its real job is the warning: a single mistyped digit in the mobile can
         * point at a stranger's account in Pokhara, and attaching it would hand them
         * `bookings:write` at this venue with no notification and no trace. The
         * client turns `phoneBelongsToExistingAccount` into a confirmation step.
         *
         * It deliberately never returns the matched account's NAME. Doing so would
         * turn this into a phone-number-to-name lookup for the whole country,
         * available to anyone who runs a venue.
         */
        VenueStaffService_1.prototype.preview = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, phone, existing, _a, seat, _b, name, loginEmail, _c;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.requireVenue(input.venueId)];
                        case 1:
                            venue = _d.sent();
                            phone = tryNormalisePhone(input.phoneNumber);
                            if (!phone) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.repo.findUserByPhone(phone)];
                        case 2:
                            _a = _d.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = null;
                            _d.label = 4;
                        case 4:
                            existing = _a;
                            if (!existing) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.repo.findSeatForUser(input.venueId, existing.id)];
                        case 5:
                            _b = _d.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            _b = null;
                            _d.label = 7;
                        case 7:
                            seat = _b;
                            name = input.fullName.trim();
                            if (!(existing || name.length < 2)) return [3 /*break*/, 8];
                            _c = undefined;
                            return [3 /*break*/, 10];
                        case 8: return [4 /*yield*/, (0, staff_login_1.uniqueStaffEmail)(name, venue.slug, function (email) { return _this.repo.emailTaken(email); })];
                        case 9:
                            _c = _d.sent();
                            _d.label = 10;
                        case 10:
                            loginEmail = _c;
                            return [2 /*return*/, {
                                    loginEmail: loginEmail,
                                    phoneBelongsToExistingAccount: Boolean(existing),
                                    alreadyOnStaff: Boolean(seat),
                                    existingRole: seat === null || seat === void 0 ? void 0 : seat.role,
                                    existingStatus: seat === null || seat === void 0 ? void 0 : seat.status,
                                }];
                    }
                });
            });
        };
        VenueStaffService_1.prototype.create = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, phone, fullName, existing, seat_1, email, password, passwordHash, seat;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.requireVenue(input.venueId)];
                        case 1:
                            venue = _b.sent();
                            this.assertAssignableRole(input.role);
                            phone = normalisePhoneOrThrow(input.phoneNumber);
                            fullName = input.fullName.trim();
                            return [4 /*yield*/, this.repo.findUserByPhone(phone)];
                        case 2:
                            existing = _b.sent();
                            if (!existing) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.attachExisting(input, existing.id, venue.primaryOwnerId, actorId)];
                        case 3:
                            seat_1 = _b.sent();
                            return [2 /*return*/, seat_1];
                        case 4: return [4 /*yield*/, (0, staff_login_1.uniqueStaffEmail)(fullName, venue.slug, function (candidate) {
                                return _this.repo.emailTaken(candidate);
                            })];
                        case 5:
                            email = _b.sent();
                            password = ((_a = input.password) === null || _a === void 0 ? void 0 : _a.trim()) || (0, staff_login_1.generateStarterPassword)();
                            (0, password_policy_1.assertPasswordStrength)(password, { fullName: fullName, phoneNumber: phone, email: email });
                            return [4 /*yield*/, argon2.hash(password, { type: argon2.argon2id })];
                        case 6:
                            passwordHash = _b.sent();
                            return [4 /*yield*/, this.repo.createProvisionedSeat({
                                    venueId: input.venueId,
                                    fullName: fullName,
                                    phoneNumber: phone,
                                    email: email,
                                    passwordHash: passwordHash,
                                    role: input.role,
                                    invitedById: actorId,
                                })];
                        case 7:
                            seat = _b.sent();
                            this.logger.log("staff created: ".concat(seat.id, " (").concat(input.role, ") at ").concat(input.venueId, " by ").concat(actorId));
                            return [2 /*return*/, {
                                    member: mapSeat(seat, actorId, venue.primaryOwnerId),
                                    outcome: venue_staff_models_1.StaffCreateOutcome.CREATED_ACCOUNT,
                                    credentials: { loginEmail: email, password: password },
                                }];
                    }
                });
            });
        };
        /**
         * Give an account that already exists a seat here.
         *
         * Two rules carry the weight. The typed password is discarded without ever
         * reaching the user record — writing it would be a complete takeover of a
         * stranger's Arena NP account by anyone who can guess their mobile number.
         * And their name, email and verification state are left exactly as they are:
         * this venue is gaining a colleague, not editing a person.
         */
        VenueStaffService_1.prototype.attachExisting = function (input, userId, primaryOwnerId, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, seat, reactivated, created;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userId === actorId) {
                                throw new common_1.BadRequestException("That's your own number — you already have a seat here.");
                            }
                            return [4 /*yield*/, this.repo.findUserByPhone(normalisePhoneOrThrow(input.phoneNumber))];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('Account not found.');
                            if (user.role === client_1.UserRole.SUPER_ADMIN) {
                                throw new common_1.ForbiddenException('That account cannot be added as venue staff.');
                            }
                            if (!user.isActive) {
                                throw new common_1.BadRequestException('That account has been deactivated platform-wide.');
                            }
                            if (userId === primaryOwnerId) {
                                throw new common_1.BadRequestException('That is the venue owner — they already hold every permission.');
                            }
                            return [4 /*yield*/, this.repo.findSeatForUser(input.venueId, userId)];
                        case 2:
                            seat = _a.sent();
                            if (!seat) return [3 /*break*/, 5];
                            if (!(seat.status === client_1.MembershipStatus.SUSPENDED)) return [3 /*break*/, 4];
                            if (!input.reactivate) {
                                throw new common_1.ConflictException('That person already has a suspended seat here. Reactivate it instead of adding them again.');
                            }
                            return [4 /*yield*/, this.repo.updateSeat(seat.id, {
                                    status: client_1.MembershipStatus.ACTIVE,
                                    role: input.role,
                                })];
                        case 3:
                            reactivated = _a.sent();
                            this.logger.log("staff reactivated: ".concat(seat.id, " at ").concat(input.venueId, " by ").concat(actorId));
                            return [2 /*return*/, {
                                    member: mapSeat(reactivated, actorId, primaryOwnerId),
                                    outcome: venue_staff_models_1.StaffCreateOutcome.REACTIVATED,
                                }];
                        case 4: throw new common_1.ConflictException('That person is already on your staff.');
                        case 5:
                            if (!input.attachExistingConfirmed) {
                                throw new common_1.ConflictException('This number already has an Arena NP account. Confirm to give that account access to your venue — they will sign in with their own password.');
                            }
                            return [4 /*yield*/, this.repo.attachSeat({
                                    venueId: input.venueId,
                                    userId: userId,
                                    role: input.role,
                                    invitedById: actorId,
                                })];
                        case 6:
                            created = _a.sent();
                            this.logger.log("staff attached: ".concat(created.id, " (").concat(input.role, ") at ").concat(input.venueId, " by ").concat(actorId));
                            return [2 /*return*/, {
                                    member: mapSeat(created, actorId, primaryOwnerId),
                                    outcome: venue_staff_models_1.StaffCreateOutcome.ATTACHED_EXISTING,
                                }];
                    }
                });
            });
        };
        VenueStaffService_1.prototype.update = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, seat, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requireVenue(input.venueId)];
                        case 1:
                            venue = _a.sent();
                            return [4 /*yield*/, this.requireSeat(input.venueId, input.membershipId)];
                        case 2:
                            seat = _a.sent();
                            if (!(input.role && input.role !== seat.role)) return [3 /*break*/, 6];
                            this.assertAssignableRole(input.role);
                            return [4 /*yield*/, this.assertNotSelf(seat, actorId, "You can't change your own role.")];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.assertNotLastOwner(seat, venue.primaryOwnerId, 'demoted')];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, this.repo.updateSeat(seat.id, { role: input.role })];
                        case 5:
                            updated = _a.sent();
                            this.logger.log("staff role: ".concat(seat.id, " ").concat(seat.role, " \u2192 ").concat(input.role, " at ").concat(input.venueId, " by ").concat(actorId));
                            return [2 /*return*/, mapSeat(updated, actorId, venue.primaryOwnerId)];
                        case 6: return [2 /*return*/, mapSeat(seat, actorId, venue.primaryOwnerId)];
                    }
                });
            });
        };
        VenueStaffService_1.prototype.setStatus = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, seat, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (input.status === client_1.MembershipStatus.INVITED) {
                                throw new common_1.BadRequestException('A seat can only be made active or suspended.');
                            }
                            return [4 /*yield*/, this.requireVenue(input.venueId)];
                        case 1:
                            venue = _a.sent();
                            return [4 /*yield*/, this.requireSeat(input.venueId, input.membershipId)];
                        case 2:
                            seat = _a.sent();
                            return [4 /*yield*/, this.assertNotSelf(seat, actorId, "You can't suspend your own seat.")];
                        case 3:
                            _a.sent();
                            if (!(input.status === client_1.MembershipStatus.SUSPENDED)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.assertNotLastOwner(seat, venue.primaryOwnerId, 'suspended')];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5: return [4 /*yield*/, this.repo.updateSeat(seat.id, { status: input.status })];
                        case 6:
                            updated = _a.sent();
                            this.logger.log("staff status: ".concat(seat.id, " \u2192 ").concat(input.status, " at ").concat(input.venueId, " by ").concat(actorId));
                            return [2 /*return*/, mapSeat(updated, actorId, venue.primaryOwnerId)];
                    }
                });
            });
        };
        /**
         * Take the seat away.
         *
         * Their history stays: `Booking.createdById` and friends point at the User,
         * which this never deletes, so "booked by Ram" still reads as Ram long after
         * Ram has left.
         *
         * A login the venue minted is retired at the same time, but only if it has
         * no seats left anywhere — otherwise a removed staff member keeps working
         * credentials, lands on a console with no venues, and is invited to create
         * one of their own.
         */
        VenueStaffService_1.prototype.remove = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, seat, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.requireVenue(input.venueId)];
                        case 1:
                            venue = _b.sent();
                            return [4 /*yield*/, this.requireSeat(input.venueId, input.membershipId)];
                        case 2:
                            seat = _b.sent();
                            return [4 /*yield*/, this.assertNotSelf(seat, actorId, "You can't remove your own seat.")];
                        case 3:
                            _b.sent();
                            return [4 /*yield*/, this.assertNotLastOwner(seat, venue.primaryOwnerId, 'removed')];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, this.repo.deleteSeat(seat.id)];
                        case 5:
                            _b.sent();
                            _a = seat.provisionedUser;
                            if (!_a) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.repo.countSeatsForUser(seat.userId)];
                        case 6:
                            _a = (_b.sent()) === 0;
                            _b.label = 7;
                        case 7:
                            if (!_a) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.repo.deactivateUser(seat.userId)];
                        case 8:
                            _b.sent();
                            return [4 /*yield*/, this.auth.invalidateSessions(seat.userId, 'venue staff seat removed')];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10:
                            this.logger.log("staff removed: ".concat(seat.id, " at ").concat(input.venueId, " by ").concat(actorId));
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        /**
         * Issue a fresh starter password.
         *
         * Only ever for a login this venue minted. A personal account's password is
         * its owner's business — they recover it through the normal forgotten-password
         * flow on their own phone.
         */
        VenueStaffService_1.prototype.resetPassword = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, seat, password, _a, _b, _c;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.requireVenue(input.venueId)];
                        case 1:
                            venue = _e.sent();
                            return [4 /*yield*/, this.requireSeat(input.venueId, input.membershipId)];
                        case 2:
                            seat = _e.sent();
                            if (!seat.provisionedUser || !seat.user.email) {
                                throw new common_1.BadRequestException('That person signs in with their own Arena NP account. They can reset it themselves from the login screen.');
                            }
                            if (seat.userId === actorId) {
                                throw new common_1.BadRequestException('Change your own password from your account screen.');
                            }
                            password = ((_d = input.password) === null || _d === void 0 ? void 0 : _d.trim()) || (0, staff_login_1.generateStarterPassword)();
                            (0, password_policy_1.assertPasswordStrength)(password, {
                                fullName: seat.user.fullName,
                                phoneNumber: seat.user.phoneNumber,
                                email: seat.user.email,
                            });
                            _b = (_a = this.repo).setPassword;
                            _c = [seat.userId];
                            return [4 /*yield*/, argon2.hash(password, { type: argon2.argon2id })];
                        case 3: return [4 /*yield*/, _b.apply(_a, _c.concat([_e.sent()]))];
                        case 4:
                            _e.sent();
                            return [4 /*yield*/, this.auth.invalidateSessions(seat.userId, 'staff password reset by venue')];
                        case 5:
                            _e.sent();
                            this.logger.log("staff password reset: ".concat(seat.id, " at ").concat(venue.id, " by ").concat(actorId));
                            return [2 /*return*/, { loginEmail: seat.user.email, password: password }];
                    }
                });
            });
        };
        /** The email domain this venue's logins live under — shown in the form. */
        VenueStaffService_1.prototype.loginDomain = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requireVenue(venueId)];
                        case 1:
                            venue = _a.sent();
                            return [2 /*return*/, (0, staff_login_1.staffEmailDomain)(venue.slug)];
                    }
                });
            });
        };
        // ─── Guards shared by the mutations ─────────────────────────────────────────
        VenueStaffService_1.prototype.requireVenue = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.venueForStaff(venueId)];
                        case 1:
                            venue = _a.sent();
                            if (!venue)
                                throw new common_1.NotFoundException('Venue not found.');
                            return [2 /*return*/, venue];
                    }
                });
            });
        };
        VenueStaffService_1.prototype.requireSeat = function (venueId, membershipId) {
            return __awaiter(this, void 0, void 0, function () {
                var seat;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findSeat(venueId, membershipId)];
                        case 1:
                            seat = _a.sent();
                            if (!seat)
                                throw new common_1.NotFoundException('That person is not on this venue’s staff.');
                            return [2 /*return*/, seat];
                    }
                });
            });
        };
        VenueStaffService_1.prototype.assertAssignableRole = function (role) {
            if (!ASSIGNABLE_ROLES.includes(role)) {
                throw new common_1.BadRequestException('Owners are not added from the staff screen. Ask support to add a co-owner.');
            }
        };
        VenueStaffService_1.prototype.assertNotSelf = function (seat, actorId, message) {
            if (seat.userId === actorId)
                throw new common_1.BadRequestException(message);
        };
        /**
         * A venue must always have one active owner, and the primary owner is never
         * one of the removable ones.
         *
         * This lives here rather than in the guard on purpose: `VenuePermissionGuard`
         * returns true for SUPER_ADMIN before it ever looks at a membership, so the
         * same rule expressed there would be bypassable by a platform admin.
         */
        VenueStaffService_1.prototype.assertNotLastOwner = function (seat, primaryOwnerId, verb) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (seat.userId === primaryOwnerId) {
                                throw new common_1.BadRequestException("The venue\u2019s owner cannot be ".concat(verb, "."));
                            }
                            if (seat.role !== client_1.VenueMemberRole.OWNER)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.repo.countActiveOwners(seat.venueId)];
                        case 1:
                            if ((_a.sent()) <= 1) {
                                throw new common_1.BadRequestException("A venue must always have at least one active owner, so this one cannot be ".concat(verb, "."));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return VenueStaffService_1;
    }());
    __setFunctionName(_classThis, "VenueStaffService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueStaffService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueStaffService = _classThis;
}();
exports.VenueStaffService = VenueStaffService;
function mapSeat(seat, actorId, primaryOwnerId) {
    var _a, _b, _c, _d;
    return {
        membershipId: seat.id,
        userId: seat.userId,
        fullName: (_a = seat.user.fullName) !== null && _a !== void 0 ? _a : undefined,
        phoneNumber: seat.user.phoneNumber,
        role: seat.role,
        status: seat.status,
        permissions: (0, permissions_1.effectivePermissions)(seat.role, seat.permissions),
        // A personal account's address is that person's, not the venue's.
        loginEmail: seat.provisionedUser ? ((_b = seat.user.email) !== null && _b !== void 0 ? _b : undefined) : undefined,
        provisionedUser: seat.provisionedUser,
        mustChangePassword: seat.user.mustChangePassword,
        isSelf: seat.userId === actorId,
        isPrimaryOwner: seat.userId === primaryOwnerId,
        payBasis: (_c = seat.payBasis) !== null && _c !== void 0 ? _c : undefined,
        payRate: seat.payRate ? Number(seat.payRate.toString()) : undefined,
        lastLoginAt: (_d = seat.user.lastLoginAt) !== null && _d !== void 0 ? _d : undefined,
        createdAt: seat.createdAt,
    };
}
function normalisePhoneOrThrow(raw) {
    try {
        return (0, phone_util_1.normaliseNepalPhone)(raw);
    }
    catch (_a) {
        throw new common_1.BadRequestException('Enter a valid 10-digit Nepali mobile number.');
    }
}
/** Preview runs on half-typed input, so an unparseable number is not an error. */
function tryNormalisePhone(raw) {
    if (!raw)
        return null;
    try {
        return (0, phone_util_1.normaliseNepalPhone)(raw);
    }
    catch (_a) {
        return null;
    }
}
