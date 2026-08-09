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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueRepository = void 0;
exports.courtRow = courtRow;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var permissions_1 = require("../../common/constants/permissions");
var venue_slug_1 = require("./venue-slug");
var COURT_INCLUDES = {
    sport: true,
    // Drives the console's "you can switch this off, but not delete it" guard.
    // A court's bookings cascade on delete, so the count is the difference
    // between hiding a court and erasing what it earned.
    _count: { select: { bookings: true } },
};
var VENUE_INCLUDES = {
    courts: { include: COURT_INCLUDES, orderBy: { createdAt: 'asc' } },
    venueSports: { include: { sport: true }, orderBy: { sport: { displayOrder: 'asc' } } },
};
var MEMBERSHIP_INCLUDES = {
    // primaryOwnerId is needed to grant the owner an implicit wildcard, matching
    // VenuePermissionGuard.
    venue: { select: { name: true, verificationStatus: true, primaryOwnerId: true } },
};
/**
 * Build the court rows for a service. Prefers explicit per-court detail (`courts[]`)
 * when the client sends it; otherwise falls back to the legacy "N identical courts"
 * shape (`courtCount` + a single slot/price). Courts are named sequentially when
 * there are several and no explicit name was given.
 */
function courtsForService(sport, svc) {
    var _a, _b;
    if ((_a = svc.courts) === null || _a === void 0 ? void 0 : _a.length) {
        var many_1 = svc.courts.length > 1;
        return svc.courts.map(function (c, i) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return ({
                name: ((_a = c.name) === null || _a === void 0 ? void 0 : _a.trim()) || (many_1 ? "".concat(sport.name, " ").concat(i + 1) : sport.name),
                sportId: sport.id,
                pricePerHour: c.pricePerHour,
                slotMinutes: c.slotMinutes,
                // Per-court features win; the service-level array is the deprecated
                // fallback for clients that predate per-court attributes.
                features: ((_b = c.features) === null || _b === void 0 ? void 0 : _b.length) ? c.features : svc.features,
                surface: (_c = c.surface) !== null && _c !== void 0 ? _c : null,
                format: (_d = c.format) !== null && _d !== void 0 ? _d : null,
                environment: (_e = c.environment) !== null && _e !== void 0 ? _e : null,
                capacity: (_f = c.capacity) !== null && _f !== void 0 ? _f : null,
                description: (_g = c.description) !== null && _g !== void 0 ? _g : null,
                imageUrls: (_h = c.imageUrls) !== null && _h !== void 0 ? _h : [],
            });
        });
    }
    // Legacy path: N identical courts at one slot/price.
    var pricePerHour = (_b = svc.pricePerHour) !== null && _b !== void 0 ? _b : 0;
    return Array.from({ length: svc.courtCount }, function (_, i) { return ({
        name: svc.courtCount > 1 ? "".concat(sport.name, " ").concat(i + 1) : sport.name,
        sportId: sport.id,
        pricePerHour: pricePerHour,
        slotMinutes: svc.slotMinutes,
        features: svc.features,
    }); });
}
/** One court row from the wizard's court shape, with its name already resolved. */
function courtRow(sport, court, name) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        name: name,
        sportId: sport.id,
        pricePerHour: court.pricePerHour,
        slotMinutes: court.slotMinutes,
        features: (_a = court.features) !== null && _a !== void 0 ? _a : [],
        surface: (_b = court.surface) !== null && _b !== void 0 ? _b : null,
        format: (_c = court.format) !== null && _c !== void 0 ? _c : null,
        environment: (_d = court.environment) !== null && _d !== void 0 ? _d : null,
        capacity: (_e = court.capacity) !== null && _e !== void 0 ? _e : null,
        description: (_f = court.description) !== null && _f !== void 0 ? _f : null,
        imageUrls: (_g = court.imageUrls) !== null && _g !== void 0 ? _g : [],
    };
}
function additionalServicesJson(items) {
    return items.map(function (s) { return (s.price != null ? { name: s.name, price: s.price } : { name: s.name }); });
}
var VenueRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VenueRepository = _classThis = /** @class */ (function () {
        function VenueRepository_1(prisma) {
            this.prisma = prisma;
        }
        /** Sports referenced by the given slugs (for validation + court naming). */
        VenueRepository_1.prototype.sportsBySlugs = function (slugs) {
            return this.prisma.sport.findMany({ where: { slug: { in: slugs } } });
        };
        /**
         * Venues the user can currently work at.
         *
         * `status: ACTIVE` is the whole point: a suspended or removed staff member
         * must stop seeing the venue immediately, and every guarded mutation already
         * enforces exactly this (`VenuePermissionGuard`). Without it here, the two
         * disagree — the console would keep listing a venue whose every action fails.
         */
        VenueRepository_1.prototype.findMyVenues = function (userId) {
            return this.prisma.venue.findMany({
                where: { memberships: { some: { userId: userId, status: client_1.MembershipStatus.ACTIVE } } },
                include: VENUE_INCLUDES,
                orderBy: { createdAt: 'asc' },
            });
        };
        /** A single venue the user is an ACTIVE member of (or null). */
        VenueRepository_1.prototype.findMyVenue = function (venueId, userId) {
            return this.prisma.venue.findFirst({
                where: { id: venueId, memberships: { some: { userId: userId, status: client_1.MembershipStatus.ACTIVE } } },
                include: VENUE_INCLUDES,
            });
        };
        /** The caller's effective permissions at one venue, or null if not an active member. */
        VenueRepository_1.prototype.myPermissions = function (venueId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var membership;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.venueMembership.findUnique({
                                where: { venueId_userId: { venueId: venueId, userId: userId } },
                                select: { role: true, permissions: true, status: true },
                            })];
                        case 1:
                            membership = _a.sent();
                            if (!membership || membership.status !== client_1.MembershipStatus.ACTIVE)
                                return [2 /*return*/, null];
                            return [2 /*return*/, (0, permissions_1.effectivePermissions)(membership.role, membership.permissions)];
                    }
                });
            });
        };
        VenueRepository_1.prototype.findById = function (venueId) {
            return this.prisma.venue.findUnique({ where: { id: venueId }, include: VENUE_INCLUDES });
        };
        /** The user's venue memberships, with the venue name + listing status. */
        VenueRepository_1.prototype.findMyMemberships = function (userId) {
            return this.prisma.venueMembership.findMany({
                where: { userId: userId },
                include: MEMBERSHIP_INCLUDES,
                orderBy: { createdAt: 'asc' },
            });
        };
        /**
         * Add a venue from the dashboard: creates the Venue + an OWNER membership +
         * its courts/sports in one transaction. The listing starts PENDING — a super
         * admin must approve it (adminUpdateVenueVerificationStatus) before it goes
         * live. A venue always has ≥1 sport with ≥1 court (enforced by SubmitVenueInput).
         *
         * The owner's VENUE capability is granted separately at signup, so it is NOT
         * touched here — adding a venue neither grants nor re-requests it.
         */
        VenueRepository_1.prototype.submitVenue = function (userId, input, sportsBySlug) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var slug, venue;
                            var _this = this;
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                            return __generator(this, function (_l) {
                                switch (_l.label) {
                                    case 0: return [4 /*yield*/, (0, venue_slug_1.uniqueVenueSlug)(input.name, function (candidate) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, tx.venue.count({ where: { slug: candidate } })];
                                                case 1: return [2 /*return*/, (_a.sent()) > 0];
                                            }
                                        }); }); })];
                                    case 1:
                                        slug = _l.sent();
                                        return [4 /*yield*/, tx.venue.create({
                                                data: {
                                                    primaryOwnerId: userId,
                                                    name: input.name,
                                                    slug: slug,
                                                    description: (_a = input.description) !== null && _a !== void 0 ? _a : null,
                                                    address: input.address,
                                                    city: (_b = input.city) !== null && _b !== void 0 ? _b : null,
                                                    latitude: input.latitude,
                                                    longitude: input.longitude,
                                                    coverImageUrl: (_c = input.coverImageUrl) !== null && _c !== void 0 ? _c : null,
                                                    imageUrls: input.imageUrls,
                                                    documentUrls: (_e = (_d = input.verification) === null || _d === void 0 ? void 0 : _d.documentUrls) !== null && _e !== void 0 ? _e : [],
                                                    amenities: (_f = input.amenities) !== null && _f !== void 0 ? _f : [],
                                                    additionalServices: additionalServicesJson(input.additionalServices),
                                                    openTime: (_g = input.openTime) !== null && _g !== void 0 ? _g : '06:00',
                                                    closeTime: (_h = input.closeTime) !== null && _h !== void 0 ? _h : '22:00',
                                                    contactEmail: (_j = input.contactEmail) !== null && _j !== void 0 ? _j : null,
                                                    contactPhone: (_k = input.contactPhone) !== null && _k !== void 0 ? _k : null,
                                                    verificationStatus: client_1.VenueVerificationStatus.PENDING,
                                                    memberships: {
                                                        create: {
                                                            userId: userId,
                                                            role: client_1.VenueMemberRole.OWNER,
                                                            permissions: [],
                                                            status: client_1.MembershipStatus.ACTIVE,
                                                        },
                                                    },
                                                    venueSports: {
                                                        create: input.services.map(function (s) { return ({ sportId: sportsBySlug.get(s.sportSlug).id }); }),
                                                    },
                                                    courts: {
                                                        create: input.services.flatMap(function (svc) {
                                                            return courtsForService(sportsBySlug.get(svc.sportSlug), svc);
                                                        }),
                                                    },
                                                },
                                            })];
                                    case 2:
                                        venue = _l.sent();
                                        return [2 /*return*/, tx.venue.findUniqueOrThrow({ where: { id: venue.id }, include: VENUE_INCLUDES })];
                                }
                            });
                        }); })];
                });
            });
        };
        /**
         * Patch editable venue profile fields.
         *
         * `slug` is deliberately absent and must stay that way: staff login emails
         * embed it, so re-deriving it from a renamed venue would break every staff
         * account here with no error anyone could trace back to the rename.
         */
        VenueRepository_1.prototype.updateProfile = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var venueId, additionalServices, rest, data;
                return __generator(this, function (_a) {
                    venueId = input.venueId, additionalServices = input.additionalServices, rest = __rest(input, ["venueId", "additionalServices"]);
                    data = {};
                    if (rest.name !== undefined)
                        data.name = rest.name;
                    if (rest.description !== undefined)
                        data.description = rest.description;
                    if (rest.address !== undefined)
                        data.address = rest.address;
                    if (rest.city !== undefined)
                        data.city = rest.city;
                    if (rest.latitude !== undefined)
                        data.latitude = rest.latitude;
                    if (rest.longitude !== undefined)
                        data.longitude = rest.longitude;
                    if (rest.coverImageUrl !== undefined)
                        data.coverImageUrl = rest.coverImageUrl;
                    if (rest.imageUrls !== undefined)
                        data.imageUrls = rest.imageUrls;
                    if (rest.openTime !== undefined)
                        data.openTime = rest.openTime;
                    if (rest.closeTime !== undefined)
                        data.closeTime = rest.closeTime;
                    if (rest.contactEmail !== undefined)
                        data.contactEmail = rest.contactEmail;
                    if (rest.contactPhone !== undefined)
                        data.contactPhone = rest.contactPhone;
                    if (rest.amenities !== undefined)
                        data.amenities = rest.amenities;
                    if (additionalServices !== undefined) {
                        data.additionalServices = additionalServicesJson(additionalServices);
                    }
                    return [2 /*return*/, this.prisma.venue.update({ where: { id: venueId }, data: data, include: VENUE_INCLUDES })];
                });
            });
        };
        /** Replace the venue's courts + sports wholesale. */
        VenueRepository_1.prototype.setServices = function (input, sportsBySlug) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.court.deleteMany({ where: { venueId: input.venueId } })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, tx.venueSport.deleteMany({ where: { venueId: input.venueId } })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, tx.venueSport.createMany({
                                                data: input.services.map(function (s) { return ({
                                                    venueId: input.venueId,
                                                    sportId: sportsBySlug.get(s.sportSlug).id,
                                                }); }),
                                                skipDuplicates: true,
                                            })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, tx.court.createMany({
                                                data: input.services.flatMap(function (svc) {
                                                    return courtsForService(sportsBySlug.get(svc.sportSlug), svc).map(function (c) { return (__assign(__assign({}, c), { venueId: input.venueId })); });
                                                }),
                                            })];
                                    case 4:
                                        _a.sent();
                                        return [2 /*return*/, tx.venue.findUniqueOrThrow({ where: { id: input.venueId }, include: VENUE_INCLUDES })];
                                }
                            });
                        }); })];
                });
            });
        };
        // ── One court at a time ───────────────────────────────────────────────────
        // Everything below edits a single Court row and leaves its id alone, which is
        // the whole point: `Booking.courtId` and `Subscription.courtId` cascade on
        // delete, so the wholesale replace above can never be the way an owner
        // changes a price.
        /** One court, scoped to its venue so a member of venue A can't touch venue B's. */
        VenueRepository_1.prototype.findCourt = function (venueId, courtId) {
            return this.prisma.court.findFirst({
                where: { id: courtId, venueId: venueId },
                include: COURT_INCLUDES,
            });
        };
        /** Patch one court in place. Bookings keep their FK and their money snapshot. */
        VenueRepository_1.prototype.updateCourt = function (courtId, data) {
            return this.prisma.court.update({
                where: { id: courtId },
                data: data,
                include: COURT_INCLUDES,
            });
        };
        /**
         * Add one court, and the VenueSport row if this is the venue's first court in
         * that sport — without it the marketplace filters would never surface the
         * venue for the sport it just started offering.
         */
        VenueRepository_1.prototype.addCourt = function (venueId, sport, court) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.venueSport.createMany({
                                            data: [{ venueId: venueId, sportId: sport.id }],
                                            skipDuplicates: true,
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, tx.court.create({ data: __assign(__assign({}, court), { venueId: venueId }) })];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, tx.venue.findUniqueOrThrow({ where: { id: venueId }, include: VENUE_INCLUDES })];
                                }
                            });
                        }); })];
                });
            });
        };
        /** Subscriptions cascade too, so removal has to check them alongside bookings. */
        /** Everything across the venue that would die with its courts. */
        VenueRepository_1.prototype.countVenueDependents = function (venueId) {
            return this.prisma
                .$transaction([
                this.prisma.booking.count({ where: { venueId: venueId } }),
                this.prisma.subscription.count({ where: { venueId: venueId } }),
            ])
                .then(function (_a) {
                var bookings = _a[0], subscriptions = _a[1];
                return ({ bookings: bookings, subscriptions: subscriptions });
            });
        };
        VenueRepository_1.prototype.countCourtDependents = function (courtId) {
            return this.prisma
                .$transaction([
                this.prisma.booking.count({ where: { courtId: courtId } }),
                this.prisma.subscription.count({ where: { courtId: courtId } }),
            ])
                .then(function (_a) {
                var bookings = _a[0], subscriptions = _a[1];
                return ({ bookings: bookings, subscriptions: subscriptions });
            });
        };
        /**
         * Delete one court, dropping the sport from the venue when it was the last
         * court hosting it. Only ever reached for a court with no bookings and no
         * subscriptions — the service checks that first.
         */
        VenueRepository_1.prototype.deleteCourt = function (venueId, courtId, sportId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var remaining;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.court.delete({ where: { id: courtId } })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, tx.court.count({ where: { venueId: venueId, sportId: sportId } })];
                                    case 2:
                                        remaining = _a.sent();
                                        if (!(remaining === 0)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, tx.venueSport.deleteMany({ where: { venueId: venueId, sportId: sportId } })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/, tx.venue.findUniqueOrThrow({ where: { id: venueId }, include: VENUE_INCLUDES })];
                                }
                            });
                        }); })];
                });
            });
        };
        return VenueRepository_1;
    }());
    __setFunctionName(_classThis, "VenueRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueRepository = _classThis;
}();
exports.VenueRepository = VenueRepository;
