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
exports.OffersRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var phone_util_1 = require("../../common/utils/phone.util");
/**
 * Where-clause for offers that are active and within their validity window right
 * now. A null `validUntil` is open-ended — live until the owner switches it off.
 */
function activeWindow(now) {
    return {
        isActive: true,
        validFrom: { lte: now },
        OR: [{ validUntil: null }, { validUntil: { gte: now } }],
    };
}
function subjectWhere(subject) {
    if ('customerId' in subject)
        return { customerId: subject.customerId };
    if ('userId' in subject)
        return { venueId: subject.venueId, userId: subject.userId };
    return { venueId: subject.venueId, customerPhone: (0, phone_util_1.phoneKey)(subject.phone) };
}
var OffersRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OffersRepository = _classThis = /** @class */ (function () {
        function OffersRepository_1(prisma) {
            this.prisma = prisma;
        }
        OffersRepository_1.prototype.listVenueOffers = function (input, page, pageSize) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = { venueId: input.venueId };
                            if (input.activeOnly)
                                Object.assign(where, activeWindow(new Date()));
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.offer.findMany({
                                        where: where,
                                        orderBy: { createdAt: 'desc' },
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.offer.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        /** Player-facing: active, in-window promo offers (exhausted ones filtered in the service). */
        OffersRepository_1.prototype.availableOffers = function (venueId) {
            return this.prisma.offer.findMany({
                where: __assign({ venueId: venueId, trigger: client_1.OfferTrigger.PROMO_CODE }, activeWindow(new Date())),
                orderBy: { createdAt: 'desc' },
            });
        };
        /** Real redemptions (non-cancelled bookings carrying the offer) per offer, batched. */
        OffersRepository_1.prototype.redemptionsByOffer = function (offerIds) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (offerIds.length === 0)
                                return [2 /*return*/, new Map()];
                            return [4 /*yield*/, this.prisma.booking.groupBy({
                                    by: ['offerId'],
                                    where: { offerId: { in: offerIds }, status: { not: client_1.BookingStatus.CANCELLED } },
                                    _count: { _all: true },
                                })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, new Map(rows.map(function (r) { return [r.offerId, r._count._all]; }))];
                    }
                });
            });
        };
        /** Real redemptions of a single offer. */
        OffersRepository_1.prototype.countRedemptions = function (offerId) {
            return this.prisma.booking.count({
                where: { offerId: offerId, status: { not: client_1.BookingStatus.CANCELLED } },
            });
        };
        /** The active loyalty (every-Nth) offer that applies to a subject's audience, or null. */
        OffersRepository_1.prototype.findActiveLoyaltyOffer = function (venueId, audience) {
            return this.prisma.offer.findFirst({
                where: __assign({ venueId: venueId, trigger: client_1.OfferTrigger.EVERY_NTH, everyGames: { not: null }, audience: { in: [client_1.OfferAudience.ALL, audience] } }, activeWindow(new Date())),
                orderBy: { createdAt: 'desc' },
            });
        };
        /** Completed games attributable to a subject (the loyalty tally). */
        OffersRepository_1.prototype.countCompletedForSubject = function (subject) {
            return this.prisma.booking.count({
                where: __assign(__assign({}, subjectWhere(subject)), { status: client_1.BookingStatus.COMPLETED }),
            });
        };
        /**
         * Free games already granted to a subject under a loyalty offer. In-flight (not yet
         * completed) grants count too — only a CANCELLED one frees the cycle — so a second
         * free game can't be redeemed before the first is consumed.
         */
        OffersRepository_1.prototype.countRedeemedFreeForSubject = function (subject, offerId) {
            return this.prisma.booking.count({
                where: __assign(__assign({}, subjectWhere(subject)), { offerId: offerId, freeGame: true, status: { not: client_1.BookingStatus.CANCELLED } }),
            });
        };
        OffersRepository_1.prototype.create = function (input) {
            var _a, _b, _c, _d, _e, _f, _g;
            return this.prisma.offer.create({
                data: {
                    venueId: input.venueId,
                    title: input.title,
                    description: (_a = input.description) !== null && _a !== void 0 ? _a : null,
                    discountType: input.discountType,
                    discountValue: input.discountValue,
                    maxDiscount: (_b = input.maxDiscount) !== null && _b !== void 0 ? _b : null,
                    minSubtotal: input.minSubtotal,
                    trigger: (_c = input.trigger) !== null && _c !== void 0 ? _c : client_1.OfferTrigger.PROMO_CODE,
                    audience: (_d = input.audience) !== null && _d !== void 0 ? _d : client_1.OfferAudience.ALL,
                    everyGames: (_e = input.everyGames) !== null && _e !== void 0 ? _e : null,
                    code: input.code ? input.code.toUpperCase() : null,
                    validFrom: input.validFrom,
                    validUntil: (_f = input.validUntil) !== null && _f !== void 0 ? _f : null,
                    usageLimit: (_g = input.usageLimit) !== null && _g !== void 0 ? _g : null,
                },
            });
        };
        OffersRepository_1.prototype.update = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.offer.findFirst({
                                where: { id: input.offerId, venueId: input.venueId },
                                select: { id: true },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Offer not found for this venue.');
                            data = {};
                            if (input.title !== undefined)
                                data.title = input.title;
                            if (input.description !== undefined)
                                data.description = input.description;
                            if (input.discountType !== undefined)
                                data.discountType = input.discountType;
                            if (input.discountValue !== undefined)
                                data.discountValue = input.discountValue;
                            if (input.maxDiscount !== undefined)
                                data.maxDiscount = input.maxDiscount;
                            if (input.minSubtotal !== undefined)
                                data.minSubtotal = input.minSubtotal;
                            if (input.trigger !== undefined)
                                data.trigger = input.trigger;
                            if (input.audience !== undefined)
                                data.audience = input.audience;
                            if (input.everyGames !== undefined)
                                data.everyGames = input.everyGames;
                            if (input.validFrom !== undefined)
                                data.validFrom = input.validFrom;
                            if (input.validUntil !== undefined)
                                data.validUntil = input.validUntil;
                            if (input.usageLimit !== undefined)
                                data.usageLimit = input.usageLimit;
                            if (input.isActive !== undefined)
                                data.isActive = input.isActive;
                            return [2 /*return*/, this.prisma.offer.update({ where: { id: input.offerId }, data: data })];
                    }
                });
            });
        };
        OffersRepository_1.prototype.remove = function (venueId, offerId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.offer.findFirst({
                                where: { id: offerId, venueId: venueId },
                                select: { id: true },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Offer not found for this venue.');
                            return [2 /*return*/, this.prisma.offer.delete({ where: { id: offerId } })];
                    }
                });
            });
        };
        /** Active, in-window promo offer matching a venue + code (case-insensitive), or null. */
        OffersRepository_1.prototype.findRedeemableByCode = function (venueId, code) {
            return this.prisma.offer.findFirst({
                where: __assign({ venueId: venueId, trigger: client_1.OfferTrigger.PROMO_CODE, code: code.toUpperCase() }, activeWindow(new Date())),
            });
        };
        return OffersRepository_1;
    }());
    __setFunctionName(_classThis, "OffersRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OffersRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OffersRepository = _classThis;
}();
exports.OffersRepository = OffersRepository;
