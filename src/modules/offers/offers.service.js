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
exports.OffersService = void 0;
exports.computeOfferDiscount = computeOfferDiscount;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var pagination_input_1 = require("../../common/dto/pagination.input");
var loyalty_util_1 = require("./loyalty.util");
var offer_model_1 = require("./dto/offer.model");
/** Discount an offer yields on a subtotal — rounded, never more than the subtotal. */
function computeOfferDiscount(offer, subtotal) {
    if (offer.discountType === client_1.OfferDiscountType.FREE_GAME)
        return subtotal; // zeroes the total
    var value = Number(offer.discountValue.toString());
    var discount = offer.discountType === client_1.OfferDiscountType.PERCENT ? (subtotal * value) / 100 : value;
    if (offer.discountType === client_1.OfferDiscountType.PERCENT && offer.maxDiscount != null) {
        discount = Math.min(discount, Number(offer.maxDiscount.toString()));
    }
    return Math.min(Math.round(discount), subtotal);
}
function assertValidOffer(opts) {
    // A null validUntil is open-ended — nothing to order-check.
    if (opts.validFrom && opts.validUntil && opts.validFrom >= opts.validUntil) {
        throw new common_1.BadRequestException('validUntil must be after validFrom.');
    }
    if (opts.discountType === client_1.OfferDiscountType.PERCENT &&
        opts.discountValue != null &&
        opts.discountValue > 100) {
        throw new common_1.BadRequestException('A PERCENT discount cannot exceed 100.');
    }
    if (opts.trigger === client_1.OfferTrigger.EVERY_NTH && (opts.everyGames == null || opts.everyGames < 1)) {
        throw new common_1.BadRequestException('A loyalty (EVERY_NTH) offer needs everyGames ≥ 1.');
    }
}
/** Map a loyalty subject input → the repo subject + the offer audience it falls under. */
function resolveSubject(input) {
    var provided = [input.customerId, input.userId, input.phone].filter(Boolean).length;
    if (provided > 1) {
        throw new common_1.BadRequestException('Pass exactly one loyalty subject.');
    }
    if (input.customerId) {
        return { subject: { customerId: input.customerId }, audience: client_1.OfferAudience.INDIVIDUAL };
    }
    if (input.userId) {
        return {
            subject: { venueId: input.venueId, userId: input.userId },
            audience: client_1.OfferAudience.INDIVIDUAL,
        };
    }
    if (input.phone) {
        return {
            subject: { venueId: input.venueId, phone: input.phone },
            audience: client_1.OfferAudience.INDIVIDUAL,
        };
    }
    throw new common_1.BadRequestException('A loyalty subject (customerId, userId or phone) is required.');
}
var OffersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OffersService = _classThis = /** @class */ (function () {
        function OffersService_1(repo) {
            this.repo = repo;
        }
        OffersService_1.prototype.listVenueOffers = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, _a, items, total, reds;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            return [4 /*yield*/, this.repo.listVenueOffers(input, page, pageSize)];
                        case 1:
                            _a = _f.sent(), items = _a.items, total = _a.total;
                            return [4 /*yield*/, this.repo.redemptionsByOffer(items.map(function (o) { return o.id; }))];
                        case 2:
                            reds = _f.sent();
                            return [2 /*return*/, {
                                    items: items.map(function (o) { var _a; return (0, offer_model_1.mapOffer)(o, (_a = reds.get(o.id)) !== null && _a !== void 0 ? _a : 0); }),
                                    pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, total),
                                }];
                    }
                });
            });
        };
        OffersService_1.prototype.availableOffers = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows, reds;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.availableOffers(venueId)];
                        case 1:
                            rows = _a.sent();
                            return [4 /*yield*/, this.repo.redemptionsByOffer(rows.map(function (o) { return o.id; }))];
                        case 2:
                            reds = _a.sent();
                            // Hide promos that have hit their usage limit (derived from real redemptions).
                            return [2 /*return*/, rows
                                    .filter(function (o) { var _a; return o.usageLimit == null || ((_a = reds.get(o.id)) !== null && _a !== void 0 ? _a : 0) < o.usageLimit; })
                                    .map(function (o) { var _a; return (0, offer_model_1.mapOffer)(o, (_a = reds.get(o.id)) !== null && _a !== void 0 ? _a : 0); })];
                    }
                });
            });
        };
        /** A subject's progress toward a free game (and whether one is claimable now). */
        OffersService_1.prototype.getLoyaltyStatus = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, subject, audience, offer, _b, played, redeemed, r;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = resolveSubject(input), subject = _a.subject, audience = _a.audience;
                            return [4 /*yield*/, this.repo.findActiveLoyaltyOffer(input.venueId, audience)];
                        case 1:
                            offer = _c.sent();
                            if (!offer || offer.everyGames == null) {
                                return [2 /*return*/, { configured: false, gamesPlayed: 0, toNext: 0, ready: false }];
                            }
                            return [4 /*yield*/, Promise.all([
                                    this.repo.countCompletedForSubject(subject),
                                    this.repo.countRedeemedFreeForSubject(subject, offer.id),
                                ])];
                        case 2:
                            _b = _c.sent(), played = _b[0], redeemed = _b[1];
                            r = (0, loyalty_util_1.computeLoyaltyReadiness)(offer.everyGames, played, redeemed);
                            return [2 /*return*/, {
                                    configured: true,
                                    every: offer.everyGames,
                                    gamesPlayed: r.gamesPlayed,
                                    toNext: r.toNext,
                                    ready: r.ready,
                                    offerId: r.ready ? offer.id : undefined,
                                }];
                    }
                });
            });
        };
        /**
         * Validate that a subject can redeem a free game right now and return the loyalty
         * offer to attach. Throws if no free game is available. Called from the booking flow.
         */
        OffersService_1.prototype.resolveLoyaltyForBooking = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getLoyaltyStatus(input)];
                        case 1:
                            status = _a.sent();
                            if (!status.ready || !status.offerId) {
                                throw new common_1.BadRequestException('No free game available for this customer yet.');
                            }
                            return [2 /*return*/, { offerId: status.offerId }];
                    }
                });
            });
        };
        OffersService_1.prototype.create = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            assertValidOffer(input);
                            _a = offer_model_1.mapOffer;
                            return [4 /*yield*/, this.repo.create(input)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])]; // brand-new → 0 redemptions
                    }
                });
            });
        };
        OffersService_1.prototype.update = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var offer, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            assertValidOffer(input);
                            return [4 /*yield*/, this.repo.update(input)];
                        case 1:
                            offer = _c.sent();
                            _a = offer_model_1.mapOffer;
                            _b = [offer];
                            return [4 /*yield*/, this.repo.countRedemptions(offer.id)];
                        case 2: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    }
                });
            });
        };
        OffersService_1.prototype.remove = function (venueId, offerId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = offer_model_1.mapOffer;
                            return [4 /*yield*/, this.repo.remove(venueId, offerId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        /**
         * Validate a promo code against a booking subtotal and return the redemption.
         * Throws if the code is invalid/expired, exhausted, or the subtotal is too low.
         * Usage is the live count of non-cancelled bookings carrying the offer; the booking
         * transaction re-checks it authoritatively (no stored counter to drift).
         */
        OffersService_1.prototype.resolveOfferForBooking = function (venueId, code, subtotal) {
            return __awaiter(this, void 0, void 0, function () {
                var offer, _a, minSubtotal;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.findRedeemableByCode(venueId, code)];
                        case 1:
                            offer = _b.sent();
                            if (!offer)
                                throw new common_1.BadRequestException('Invalid or expired offer code.');
                            _a = offer.usageLimit != null;
                            if (!_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.repo.countRedemptions(offer.id)];
                        case 2:
                            _a = (_b.sent()) >= offer.usageLimit;
                            _b.label = 3;
                        case 3:
                            if (_a) {
                                throw new common_1.BadRequestException('This offer has reached its usage limit.');
                            }
                            minSubtotal = Number(offer.minSubtotal.toString());
                            if (subtotal < minSubtotal) {
                                throw new common_1.BadRequestException("This offer needs a minimum subtotal of ".concat(minSubtotal, "."));
                            }
                            return [2 /*return*/, { offerId: offer.id, discount: computeOfferDiscount(offer, subtotal) }];
                    }
                });
            });
        };
        return OffersService_1;
    }());
    __setFunctionName(_classThis, "OffersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OffersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OffersService = _classThis;
}();
exports.OffersService = OffersService;
