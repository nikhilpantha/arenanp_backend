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
exports.BookingService = void 0;
var common_1 = require("@nestjs/common");
var pagination_input_1 = require("../../common/dto/pagination.input");
var nepal_time_1 = require("../../common/utils/nepal-time");
var booking_model_1 = require("./dto/booking.model");
var player_booking_model_1 = require("./dto/player-booking.model");
var BookingService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookingService = _classThis = /** @class */ (function () {
        function BookingService_1(repo, offers, customers) {
            this.repo = repo;
            this.offers = offers;
            this.customers = customers;
        }
        BookingService_1.prototype.list = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.list(input)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(booking_model_1.mapBookingToGraphql)];
                    }
                });
            });
        };
        /**
         * `withMoney` reflects the caller's `finance:read`. The repository always
         * computes the figure (it's one aggregate in a transaction the other counts
         * already need), and it is dropped here rather than branched on in SQL —
         * one code path, and the omission is visible at the boundary that decides it.
         */
        BookingService_1.prototype.summary = function (venueId, withMoney) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, revenueToday, counts;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.summary(venueId)];
                        case 1:
                            _a = _b.sent(), revenueToday = _a.revenueToday, counts = __rest(_a, ["revenueToday"]);
                            return [2 /*return*/, withMoney ? __assign(__assign({}, counts), { revenueToday: revenueToday }) : counts];
                    }
                });
            });
        };
        BookingService_1.prototype.getOne = function (venueId, bookingId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findOne(venueId, bookingId)];
                        case 1:
                            row = _a.sent();
                            if (!row)
                                throw new common_1.NotFoundException('Booking not found.');
                            return [2 /*return*/, (0, booking_model_1.mapBookingToGraphql)(row)];
                    }
                });
            });
        };
        BookingService_1.prototype.create = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var loyaltyOfferId, subject, offerId, customerId, customer, _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!input.redeemFreeGame) return [3 /*break*/, 2];
                            subject = input.customerId
                                ? { venueId: input.venueId, customerId: input.customerId }
                                : { venueId: input.venueId, phone: (_b = input.customerPhone) !== null && _b !== void 0 ? _b : '' };
                            return [4 /*yield*/, this.offers.resolveLoyaltyForBooking(subject)];
                        case 1:
                            offerId = (_c.sent()).offerId;
                            loyaltyOfferId = offerId;
                            _c.label = 2;
                        case 2:
                            customerId = input.customerId;
                            if (!(!customerId && input.customerPhone)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.customers.getOrCreateForWalkIn(input.venueId, {
                                    name: input.customerName,
                                    phone: input.customerPhone,
                                    kind: input.customerType,
                                })];
                        case 3:
                            customer = _c.sent();
                            customerId = customer.id;
                            _c.label = 4;
                        case 4:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.create(__assign(__assign({}, input), { customerId: customerId }), actorId, loyaltyOfferId)];
                        case 5: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                    }
                });
            });
        };
        BookingService_1.prototype.update = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.update(input)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        BookingService_1.prototype.setStatus = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.setStatus(input, actorId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        BookingService_1.prototype.complete = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.complete(input, actorId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        BookingService_1.prototype.recordPayment = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.recordPayment(input, actorId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        // ─── Player-facing ──────────────────────────────────────────────────────────
        BookingService_1.prototype.createBooking = function (input, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var court, duration, startAt, endAt, openMin, closeMin, startMin, outsideHours, misaligned, pricePerHour, subtotal, discountAmount, offerId, applied, customer, row;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.repo.courtForBooking(input.courtId)];
                        case 1:
                            court = _c.sent();
                            if (!court)
                                throw new common_1.NotFoundException('Court not found.');
                            duration = (_a = input.durationMinutes) !== null && _a !== void 0 ? _a : court.slotMinutes;
                            if (duration % court.slotMinutes !== 0) {
                                throw new common_1.BadRequestException("Duration must be a multiple of ".concat(court.slotMinutes, " minutes."));
                            }
                            startAt = new Date(input.startAt);
                            if (Number.isNaN(startAt.getTime()))
                                throw new common_1.BadRequestException('Invalid startAt.');
                            if (startAt.getTime() <= Date.now()) {
                                throw new common_1.BadRequestException('Cannot book a slot in the past.');
                            }
                            endAt = new Date(startAt.getTime() + duration * 60000);
                            openMin = (0, nepal_time_1.parseHHmmToMinutes)(court.venue.openTime);
                            closeMin = (0, nepal_time_1.parseHHmmToMinutes)(court.venue.closeTime);
                            startMin = (0, nepal_time_1.utcToNepalMinutesOfDay)(startAt);
                            outsideHours = startMin < openMin || startMin + duration > closeMin;
                            misaligned = (startMin - openMin) % court.slotMinutes !== 0;
                            if (outsideHours || misaligned) {
                                throw new common_1.BadRequestException('Selected time is outside the venue’s bookable slots.');
                            }
                            pricePerHour = Number(court.pricePerHour.toString());
                            subtotal = Math.round((pricePerHour * duration) / 60);
                            discountAmount = 0;
                            offerId = null;
                            if (!input.offerCode) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.offers.resolveOfferForBooking(court.venueId, input.offerCode, subtotal)];
                        case 2:
                            applied = _c.sent();
                            discountAmount = applied.discount;
                            offerId = applied.offerId;
                            _c.label = 3;
                        case 3: return [4 /*yield*/, this.customers.getOrCreateForUser(court.venueId, userId)];
                        case 4:
                            customer = _c.sent();
                            return [4 /*yield*/, this.repo.createPlayerBooking({
                                    userId: userId,
                                    customerId: customer.id,
                                    courtId: court.id,
                                    venueId: court.venueId,
                                    startAt: startAt,
                                    endAt: endAt,
                                    durationMinutes: duration,
                                    pricePerHour: pricePerHour,
                                    subtotal: subtotal,
                                    discountAmount: discountAmount,
                                    total: Math.max(0, subtotal - discountAmount),
                                    offerId: offerId,
                                    notes: (_b = input.notes) !== null && _b !== void 0 ? _b : null,
                                })];
                        case 5:
                            row = _c.sent();
                            return [2 /*return*/, (0, player_booking_model_1.mapPlayerBooking)(row)];
                    }
                });
            });
        };
        BookingService_1.prototype.myBookings = function (input, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, _a, items, total;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            return [4 /*yield*/, this.repo.listMyBookings(userId, page, pageSize)];
                        case 1:
                            _a = _f.sent(), items = _a.items, total = _a.total;
                            return [2 /*return*/, { items: items.map(player_booking_model_1.mapPlayerBooking), pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, total) }];
                    }
                });
            });
        };
        BookingService_1.prototype.cancelMyBooking = function (input, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = player_booking_model_1.mapPlayerBooking;
                            return [4 /*yield*/, this.repo.cancelMyBooking(userId, input.bookingId, (_b = input.reason) !== null && _b !== void 0 ? _b : null)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                    }
                });
            });
        };
        BookingService_1.prototype.acceptBooking = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.acceptBooking(input.venueId, input.bookingId, actorId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        BookingService_1.prototype.declineBooking = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = booking_model_1.mapBookingToGraphql;
                            return [4 /*yield*/, this.repo.declineBooking(input.venueId, input.bookingId, actorId, (_b = input.reason) !== null && _b !== void 0 ? _b : null)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                    }
                });
            });
        };
        return BookingService_1;
    }());
    __setFunctionName(_classThis, "BookingService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingService = _classThis;
}();
exports.BookingService = BookingService;
