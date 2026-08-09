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
exports.VenueService = void 0;
var common_1 = require("@nestjs/common");
var permission_keys_1 = require("../../common/constants/permission-keys");
var venue_repository_1 = require("./venue.repository");
var venue_membership_model_1 = require("./dto/venue-membership.model");
var venue_model_1 = require("./dto/venue.model");
var venue_rules_1 = require("./venue-rules");
/**
 * Strip the parts of a venue record that only someone who can edit the listing
 * has any business seeing.
 *
 * `documentUrls` holds the owner's KYC upload keys — PAN card, citizenship,
 * registration — which `VenueResolver` turns into downloadable presigned URLs.
 * Everyone with a seat at the venue can read this record (they need its name,
 * hours and courts to do their job), so without this a coach could pull the
 * owner's identity documents. `rejectionReason` goes too: it is admin
 * correspondence about the owner's paperwork, not staff-facing.
 *
 * Emptying the array rather than erroring is deliberate — the field resolver
 * then presigns nothing and the caller simply sees no documents, instead of
 * the whole venue query failing for a legitimate reader.
 */
function redactVenue(venue, permissions) {
    if (permissions === null || permissions === void 0 ? void 0 : permissions.includes('venue:edit'))
        return venue;
    return __assign(__assign({}, venue), { documentUrls: [], rejectionReason: undefined });
}
/** "3 bookings and 1 membership" — said to an owner, so plain words and counts. */
function describeDependents(bookings, subscriptions) {
    var parts = [];
    if (bookings)
        parts.push("".concat(bookings, " booking").concat(bookings === 1 ? '' : 's'));
    if (subscriptions) {
        parts.push("".concat(subscriptions, " membership").concat(subscriptions === 1 ? '' : 's'));
    }
    return parts.join(' and ');
}
var VenueService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VenueService = _classThis = /** @class */ (function () {
        function VenueService_1(repo, storage, permissions) {
            this.repo = repo;
            this.storage = storage;
            this.permissions = permissions;
        }
        /**
         * The venues the caller can work at, each redacted to what their role at
         * THAT venue allows — permissions are per venue, so a manager at one ground
         * and a coach at another must see two different shapes in the same list.
         */
        VenueService_1.prototype.myVenues = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var venues;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findMyVenues(userId)];
                        case 1:
                            venues = _a.sent();
                            return [2 /*return*/, Promise.all(venues.map(function (venue) { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _a = redactVenue;
                                            _b = [(0, venue_model_1.mapVenueToGraphql)(venue)];
                                            return [4 /*yield*/, this.repo.myPermissions(venue.id, userId)];
                                        case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                                    }
                                }); }); }))];
                    }
                });
            });
        };
        VenueService_1.prototype.myVenue = function (userId, venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var venue, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.repo.findMyVenue(venueId, userId)];
                        case 1:
                            venue = _c.sent();
                            if (!venue)
                                throw new common_1.NotFoundException('Venue not found.');
                            _a = redactVenue;
                            _b = [(0, venue_model_1.mapVenueToGraphql)(venue)];
                            return [4 /*yield*/, this.repo.myPermissions(venueId, userId)];
                        case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    }
                });
            });
        };
        /**
         * The caller's venue seats, each with the permissions they actually hold
         * there. Owners get the wildcard, matching `VenuePermissionGuard` — the app
         * must not show a narrower panel set than the API will accept.
         */
        VenueService_1.prototype.myMemberships = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findMyMemberships(userId)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, Promise.all(rows.map(function (row) { return __awaiter(_this, void 0, void 0, function () {
                                    var isOwner, permissions, _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                isOwner = row.venue.primaryOwnerId === userId;
                                                if (!isOwner) return [3 /*break*/, 1];
                                                _a = [permission_keys_1.WILDCARD_PERMISSION];
                                                return [3 /*break*/, 3];
                                            case 1: return [4 /*yield*/, this.permissions.getVenueUserPermissions(userId, row.venueId)];
                                            case 2:
                                                _a = _b.sent();
                                                _b.label = 3;
                                            case 3:
                                                permissions = _a;
                                                return [2 /*return*/, (0, venue_membership_model_1.mapMembershipToGraphql)(row, permissions)];
                                        }
                                    });
                                }); }))];
                    }
                });
            });
        };
        VenueService_1.prototype.submitVenue = function (userId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var sportsBySlug, venue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.resolveSports(input.services.map(function (s) { return s.sportSlug; }))];
                        case 1:
                            sportsBySlug = _a.sent();
                            (0, venue_rules_1.assertOperatingHours)(input.openTime, input.closeTime);
                            (0, venue_rules_1.assertCourtsMatchSports)(input.services, sportsBySlug);
                            return [4 /*yield*/, this.repo.submitVenue(userId, input, sportsBySlug)];
                        case 2:
                            venue = _a.sent();
                            return [2 /*return*/, (0, venue_model_1.mapVenueToGraphql)(venue)];
                    }
                });
            });
        };
        VenueService_1.prototype.updateProfile = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var current, replacingCover, replacingGallery, before, _a, venue, orphans, next_1;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!(input.openTime !== undefined || input.closeTime !== undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.repo.findById(input.venueId)];
                        case 1:
                            current = _e.sent();
                            (0, venue_rules_1.assertOperatingHours)((_b = input.openTime) !== null && _b !== void 0 ? _b : current === null || current === void 0 ? void 0 : current.openTime, (_c = input.closeTime) !== null && _c !== void 0 ? _c : current === null || current === void 0 ? void 0 : current.closeTime);
                            _e.label = 2;
                        case 2:
                            replacingCover = input.coverImageUrl !== undefined;
                            replacingGallery = input.imageUrls !== undefined;
                            if (!(replacingCover || replacingGallery)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.repo.findById(input.venueId)];
                        case 3:
                            _a = _e.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _a = null;
                            _e.label = 5;
                        case 5:
                            before = _a;
                            return [4 /*yield*/, this.repo.updateProfile(input)];
                        case 6:
                            venue = _e.sent();
                            if (!before) return [3 /*break*/, 8];
                            orphans = [];
                            if (replacingCover && before.coverImageUrl && before.coverImageUrl !== input.coverImageUrl) {
                                orphans.push(before.coverImageUrl);
                            }
                            if (replacingGallery) {
                                next_1 = new Set((_d = input.imageUrls) !== null && _d !== void 0 ? _d : []);
                                orphans.push.apply(orphans, before.imageUrls.filter(function (key) { return !next_1.has(key); }));
                            }
                            return [4 /*yield*/, this.storage.deleteMany(orphans)];
                        case 7:
                            _e.sent();
                            _e.label = 8;
                        case 8: return [2 /*return*/, (0, venue_model_1.mapVenueToGraphql)(venue)];
                    }
                });
            });
        };
        VenueService_1.prototype.setServices = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var sportsBySlug, _a, bookings, subscriptions, before, oldCourtImages, venue, surviving;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.resolveSports(input.services.map(function (s) { return s.sportSlug; }))];
                        case 1:
                            sportsBySlug = _c.sent();
                            (0, venue_rules_1.assertCourtsMatchSports)(input.services, sportsBySlug);
                            return [4 /*yield*/, this.repo.countVenueDependents(input.venueId)];
                        case 2:
                            _a = _c.sent(), bookings = _a.bookings, subscriptions = _a.subscriptions;
                            if (bookings || subscriptions) {
                                throw new common_1.BadRequestException("This venue has ".concat(describeDependents(bookings, subscriptions), " on record. ") +
                                    'Replacing its sports and courts wholesale would delete every court and take ' +
                                    'those with it. Add, edit or remove courts one at a time instead.');
                            }
                            return [4 /*yield*/, this.repo.findById(input.venueId)];
                        case 3:
                            before = _c.sent();
                            oldCourtImages = (_b = before === null || before === void 0 ? void 0 : before.courts.flatMap(function (c) { return c.imageUrls; })) !== null && _b !== void 0 ? _b : [];
                            return [4 /*yield*/, this.repo.setServices(input, sportsBySlug)];
                        case 4:
                            venue = _c.sent();
                            surviving = new Set(venue.courts.flatMap(function (c) { return c.imageUrls; }));
                            return [4 /*yield*/, this.storage.deleteMany(oldCourtImages.filter(function (key) { return !surviving.has(key); }))];
                        case 5:
                            _c.sent();
                            return [2 /*return*/, (0, venue_model_1.mapVenueToGraphql)(venue)];
                    }
                });
            });
        };
        // ── One court at a time ───────────────────────────────────────────────────
        /**
         * Change one court — its price, its slot length, its attributes, or whether
         * it takes bookings at all.
         *
         * Nothing here touches money already taken. `Booking` snapshots
         * `pricePerHour`, `subtotal` and `total` when it is created and never
         * recomputes them, so a new rate prices the next booking and leaves every
         * past one — and everything Finance reports off them — exactly as it was.
         */
        VenueService_1.prototype.updateCourt = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var court, data, updated, next_2;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.repo.findCourt(input.venueId, input.courtId)];
                        case 1:
                            court = _d.sent();
                            if (!court)
                                throw new common_1.NotFoundException('That court is not part of this venue.');
                            // Validate the RESULT, not the patch: a lone `slotMinutes` still has to sit
                            // inside the sport's duration bounds alongside the values already stored.
                            (0, venue_rules_1.assertCourtMatchesSport)(court.sport, {
                                slotMinutes: (_a = input.slotMinutes) !== null && _a !== void 0 ? _a : court.slotMinutes,
                                surface: input.surface !== undefined ? input.surface : court.surface,
                                format: input.format !== undefined ? input.format : court.format,
                                features: (_b = input.features) !== null && _b !== void 0 ? _b : court.features,
                                capacity: input.capacity !== undefined ? input.capacity : court.capacity,
                            }, ((_c = input.name) === null || _c === void 0 ? void 0 : _c.trim()) || court.name);
                            data = {};
                            if (input.name !== undefined)
                                data.name = input.name.trim();
                            if (input.pricePerHour !== undefined)
                                data.pricePerHour = input.pricePerHour;
                            if (input.slotMinutes !== undefined)
                                data.slotMinutes = input.slotMinutes;
                            if (input.features !== undefined)
                                data.features = input.features;
                            if (input.surface !== undefined)
                                data.surface = input.surface;
                            if (input.format !== undefined)
                                data.format = input.format;
                            if (input.environment !== undefined)
                                data.environment = input.environment;
                            if (input.capacity !== undefined)
                                data.capacity = input.capacity;
                            if (input.description !== undefined)
                                data.description = input.description;
                            if (input.isActive !== undefined)
                                data.isActive = input.isActive;
                            if (input.imageUrls !== undefined)
                                data.imageUrls = input.imageUrls;
                            return [4 /*yield*/, this.repo.updateCourt(input.courtId, data)];
                        case 2:
                            updated = _d.sent();
                            if (!(input.imageUrls !== undefined)) return [3 /*break*/, 4];
                            next_2 = new Set(input.imageUrls);
                            return [4 /*yield*/, this.storage.deleteMany(court.imageUrls.filter(function (key) { return !next_2.has(key); }))];
                        case 3:
                            _d.sent();
                            _d.label = 4;
                        case 4: return [2 /*return*/, (0, venue_model_1.mapVenueCourt)(updated)];
                    }
                });
            });
        };
        /** Add one court to a live venue, leaving the existing ones untouched. */
        VenueService_1.prototype.addCourt = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var sportsBySlug, sport, venue, existing, name, updated;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.resolveSports([input.sportSlug])];
                        case 1:
                            sportsBySlug = _c.sent();
                            sport = sportsBySlug.get(input.sportSlug);
                            (0, venue_rules_1.assertCourtMatchesSport)(sport, input.court, ((_a = input.court.name) === null || _a === void 0 ? void 0 : _a.trim()) || sport.name);
                            return [4 /*yield*/, this.repo.findById(input.venueId)];
                        case 2:
                            venue = _c.sent();
                            if (!venue)
                                throw new common_1.NotFoundException('Venue not found.');
                            existing = venue.courts.filter(function (c) { return c.sportId === sport.id; }).length;
                            name = ((_b = input.court.name) === null || _b === void 0 ? void 0 : _b.trim()) || (existing ? "".concat(sport.name, " ").concat(existing + 1) : sport.name);
                            return [4 /*yield*/, this.repo.addCourt(input.venueId, sport, (0, venue_repository_1.courtRow)(sport, input.court, name))];
                        case 3:
                            updated = _c.sent();
                            return [2 /*return*/, (0, venue_model_1.mapVenueToGraphql)(updated)];
                    }
                });
            });
        };
        /**
         * Delete a court — but only one that never earned anything.
         *
         * `Booking.courtId` and `Subscription.courtId` both cascade, so deleting a
         * court that has either would silently erase paid bookings and the income
         * reported off them. That is never what an owner means by "remove this
         * court"; they mean stop selling it, which is `isActive = false`.
         */
        VenueService_1.prototype.removeCourt = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var court, _a, bookings, subscriptions, venue;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.findCourt(input.venueId, input.courtId)];
                        case 1:
                            court = _b.sent();
                            if (!court)
                                throw new common_1.NotFoundException('That court is not part of this venue.');
                            return [4 /*yield*/, this.repo.countCourtDependents(input.courtId)];
                        case 2:
                            _a = _b.sent(), bookings = _a.bookings, subscriptions = _a.subscriptions;
                            if (bookings || subscriptions) {
                                throw new common_1.BadRequestException("".concat(court.name, " has ").concat(describeDependents(bookings, subscriptions), " on record. Deleting it would delete them and the income they earned \u2014 switch the court off instead, and it stops taking new bookings while your books stay intact."));
                            }
                            return [4 /*yield*/, this.repo.deleteCourt(input.venueId, input.courtId, court.sportId)];
                        case 3:
                            venue = _b.sent();
                            return [4 /*yield*/, this.storage.deleteMany(court.imageUrls)];
                        case 4:
                            _b.sent();
                            return [2 /*return*/, (0, venue_model_1.mapVenueToGraphql)(venue)];
                    }
                });
            });
        };
        /** Validate every referenced sport exists + is active, and index them by slug. */
        VenueService_1.prototype.resolveSports = function (slugs) {
            return __awaiter(this, void 0, void 0, function () {
                var unique, sports, bySlug, missing, inactive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            unique = __spreadArray([], new Set(slugs), true);
                            return [4 /*yield*/, this.repo.sportsBySlugs(unique)];
                        case 1:
                            sports = _a.sent();
                            bySlug = new Map(sports.map(function (s) { return [s.slug, s]; }));
                            missing = unique.filter(function (slug) { return !bySlug.has(slug); });
                            if (missing.length) {
                                throw new common_1.BadRequestException("Unknown sport(s): ".concat(missing.join(', ')));
                            }
                            inactive = sports.filter(function (s) { return !s.isActive; }).map(function (s) { return s.slug; });
                            if (inactive.length) {
                                throw new common_1.BadRequestException("Sport(s) not available: ".concat(inactive.join(', ')));
                            }
                            return [2 /*return*/, bySlug];
                    }
                });
            });
        };
        return VenueService_1;
    }());
    __setFunctionName(_classThis, "VenueService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueService = _classThis;
}();
exports.VenueService = VenueService;
