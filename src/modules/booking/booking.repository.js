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
exports.BookingRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var nepal_time_1 = require("../../common/utils/nepal-time");
var phone_util_1 = require("../../common/utils/phone.util");
/**
 * Append the money that actually moved to the payment ledger.
 *
 * Callers overwrite `amountPaid` with a new running total, so the event worth
 * recording is the delta. A negative delta is a correction (an owner fixing an
 * over-entry), not a refund — it is still written, because dropping it would
 * break the `SUM(booking_payments) = amountPaid` invariant the transactions
 * ledger and cash reconciliation both rely on.
 */
function appendPaymentLedger(tx, opts) {
    return __awaiter(this, void 0, void 0, function () {
        var delta;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    delta = Math.round((opts.nextPaid - opts.previousPaid) * 100) / 100;
                    if (delta === 0)
                        return [2 /*return*/];
                    return [4 /*yield*/, tx.bookingPayment.create({
                            data: {
                                bookingId: opts.bookingId,
                                venueId: opts.venueId,
                                amount: delta,
                                method: (_a = opts.method) !== null && _a !== void 0 ? _a : null,
                                takenById: (_b = opts.takenById) !== null && _b !== void 0 ? _b : null,
                                note: (_c = opts.note) !== null && _c !== void 0 ? _c : (delta < 0 ? 'Correction to the recorded amount.' : null),
                            },
                        })];
                case 1:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var closures_util_1 = require("../closures/closures.util");
var availability_util_1 = require("./availability.util");
var booking_inputs_1 = require("./dto/booking.inputs");
// The actor relations are what turn "who cancelled the 7 PM booking?" from an
// unanswerable question into a line on the screen. The columns have been
// written since bookings shipped; nothing has ever read them back.
var ACTOR_SELECT = { select: { id: true, fullName: true } };
var BOOKING_INCLUDES = {
    court: { include: { sport: true } },
    extras: true,
    createdBy: ACTOR_SELECT,
    cancelledBy: ACTOR_SELECT,
    statusEvents: {
        include: { actor: ACTOR_SELECT },
        orderBy: { createdAt: 'asc' },
    },
};
var PLAYER_BOOKING_INCLUDES = {
    court: { include: { sport: true } },
    venue: true,
};
var TERMINAL_STATUSES = new Set([
    client_1.BookingStatus.COMPLETED,
    client_1.BookingStatus.CANCELLED,
    client_1.BookingStatus.NO_SHOW,
]);
/** True for a Postgres exclusion-constraint violation from `bookings_no_overlap` (a race). */
function isOverlapViolation(e) {
    return e instanceof Error && /bookings_no_overlap|exclusion constraint/i.test(e.message);
}
/**
 * Reject a booking whose Nepal-local window crosses midnight. The whole model assumes
 * same-day windows (the player path enforces it via open/close hours); this closes the
 * gap on the venue path, where a midnight-crossing booking's post-midnight tail would
 * otherwise dodge the next-day membership-slot check in assertCourtAvailable.
 */
function assertSameNepalDay(startAt, durationMinutes) {
    if ((0, nepal_time_1.utcToNepalMinutesOfDay)(startAt) + durationMinutes > 24 * 60) {
        throw new common_1.BadRequestException('A booking can’t span midnight — please split it into two separate bookings.');
    }
}
/** UTC day window [start, nextDay) for a `Date`. */
function dayBounds(d) {
    var gte = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    var lt = new Date(gte);
    lt.setUTCDate(lt.getUTCDate() + 1);
    return { gte: gte, lt: lt };
}
var BookingRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var BookingRepository = _classThis = /** @class */ (function () {
        function BookingRepository_1(prisma) {
            this.prisma = prisma;
        }
        BookingRepository_1.prototype.list = function (input) {
            var where = { venueId: input.venueId };
            if (input.sportSlug)
                where.court = { sport: { slug: input.sportSlug } };
            if (input.date) {
                var _a = dayBounds(new Date("".concat(input.date, "T00:00:00.000Z"))), gte = _a.gte, lt = _a.lt;
                where.startAt = { gte: gte, lt: lt };
            }
            else if (input.dateFrom && input.dateTo) {
                var gte = dayBounds(new Date("".concat(input.dateFrom, "T00:00:00.000Z"))).gte;
                var lt = dayBounds(new Date("".concat(input.dateTo, "T00:00:00.000Z"))).lt;
                where.startAt = { gte: gte, lt: lt }; // [dateFrom 00:00, dateTo+1 00:00) — inclusive range
            }
            else if (input.scope === booking_inputs_1.BookingScope.TODAY) {
                var _b = dayBounds(new Date()), gte = _b.gte, lt = _b.lt;
                where.startAt = { gte: gte, lt: lt };
            }
            else if (input.scope === booking_inputs_1.BookingScope.UPCOMING) {
                var lt = dayBounds(new Date()).lt;
                where.startAt = { gte: lt }; // from start of tomorrow onward
            }
            return this.prisma.booking.findMany({
                where: where,
                include: BOOKING_INCLUDES,
                orderBy: { startAt: 'asc' },
            });
        };
        BookingRepository_1.prototype.summary = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, gte, lt, todayWhere, _b, bookingsToday, paidAgg, pendingPayments;
                var _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = dayBounds(new Date()), gte = _a.gte, lt = _a.lt;
                            todayWhere = {
                                venueId: venueId,
                                startAt: { gte: gte, lt: lt },
                                status: { not: client_1.BookingStatus.CANCELLED },
                            };
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.booking.count({ where: todayWhere }),
                                    this.prisma.booking.aggregate({ _sum: { amountPaid: true }, where: todayWhere }),
                                    this.prisma.booking.count({
                                        where: __assign(__assign({}, todayWhere), { paymentStatus: { not: client_1.BookingPaymentStatus.PAID } }),
                                    }),
                                ])];
                        case 1:
                            _b = _e.sent(), bookingsToday = _b[0], paidAgg = _b[1], pendingPayments = _b[2];
                            return [2 /*return*/, {
                                    bookingsToday: bookingsToday,
                                    revenueToday: Number((_d = (_c = paidAgg._sum.amountPaid) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '0'),
                                    pendingPayments: pendingPayments,
                                }];
                    }
                });
            });
        };
        BookingRepository_1.prototype.findOne = function (venueId, bookingId) {
            return this.prisma.booking.findFirst({
                where: { id: bookingId, venueId: venueId },
                include: BOOKING_INCLUDES,
            });
        };
        /**
         * Reject a court/time that clashes with another booking or a member's recurring
         * subscription slot. Runs inside the booking transaction so two requests can't both
         * pass. Messages are written for the venue owner, not developers.
         */
        BookingRepository_1.prototype.assertCourtAvailable = function (tx, opts) {
            return __awaiter(this, void 0, void 0, function () {
                var TAKEN, booking, who, startMin, durationMin, endMin, weekday, subs, _i, subs_1, s, subStart, subEnd, closure;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            TAKEN = 'That slot is no longer available.';
                            return [4 /*yield*/, tx.booking.findFirst({
                                    where: __assign({ courtId: opts.courtId, status: { not: client_1.BookingStatus.CANCELLED }, startAt: { lt: opts.endAt }, endAt: { gt: opts.startAt } }, (opts.excludeBookingId ? { id: { not: opts.excludeBookingId } } : {})),
                                    select: { startAt: true, endAt: true, customerName: true },
                                })];
                        case 1:
                            booking = _a.sent();
                            if (booking) {
                                if (opts.generic)
                                    throw new common_1.ConflictException(TAKEN);
                                who = booking.customerName ? " (".concat(booking.customerName, ")") : '';
                                throw new common_1.ConflictException("This court is already booked ".concat((0, availability_util_1.nepalClockRange)(booking.startAt, booking.endAt)).concat(who, ". Please pick a different time or court."));
                            }
                            startMin = (0, nepal_time_1.utcToNepalMinutesOfDay)(opts.startAt);
                            durationMin = Math.round((opts.endAt.getTime() - opts.startAt.getTime()) / 60000);
                            endMin = startMin + durationMin;
                            weekday = (0, availability_util_1.nepalWeekday)(opts.startAt);
                            return [4 /*yield*/, tx.subscription.findMany({
                                    where: {
                                        courtId: opts.courtId,
                                        // PENDING (awaiting venue approval) still holds the slot — matches the
                                        // subscriptions module's own slotConflict/takenSlotStarts — so a one-off
                                        // booking can't be confirmed onto a slot a member has requested.
                                        //
                                        // PAUSED is deliberately absent: a paused member has handed the hour back
                                        // for now, so the venue can still sell it as a walk-in. Their claim against
                                        // OTHER memberships survives (see slotConflict) — the slot is theirs again
                                        // when they resume, which is why resuming re-checks these bookings.
                                        status: {
                                            in: [client_1.SubscriptionStatus.PENDING, client_1.SubscriptionStatus.SCHEDULED, client_1.SubscriptionStatus.ACTIVE],
                                        },
                                        startedAt: { lte: opts.startAt },
                                        expiresAt: { gte: opts.startAt },
                                    },
                                    select: {
                                        slotStart: true,
                                        // Terms as this member bought them, not as the plan reads today — re-timing
                                        // a plan must never widen an existing member's hold over live bookings.
                                        sessionMinutes: true,
                                        daysOfWeek: true,
                                        customer: { select: { name: true } },
                                    },
                                })];
                        case 2:
                            subs = _a.sent();
                            for (_i = 0, subs_1 = subs; _i < subs_1.length; _i++) {
                                s = subs_1[_i];
                                if (!s.daysOfWeek.includes(weekday))
                                    continue;
                                subStart = (0, nepal_time_1.parseHHmmToMinutes)(s.slotStart);
                                subEnd = subStart + s.sessionMinutes;
                                if (startMin < subEnd && endMin > subStart) {
                                    if (opts.generic)
                                        throw new common_1.ConflictException(TAKEN);
                                    throw new common_1.ConflictException("".concat(s.customer.name, "'s membership reserves this court on ").concat((0, availability_util_1.dayLabel)(weekday), " at this time. Please pick a different time or court."));
                                }
                            }
                            return [4 /*yield*/, (0, closures_util_1.findOverlappingClosure)(tx, {
                                    venueId: opts.venueId,
                                    courtId: opts.courtId,
                                    startAt: opts.startAt,
                                    endAt: opts.endAt,
                                })];
                        case 3:
                            closure = _a.sent();
                            if (closure)
                                throw new common_1.ConflictException(opts.generic ? TAKEN : (0, closures_util_1.closureConflictMessage)(closure));
                            return [2 /*return*/];
                    }
                });
            });
        };
        BookingRepository_1.prototype.create = function (input, createdById, loyaltyOfferId) {
            return __awaiter(this, void 0, void 0, function () {
                var court, found, isFree, pricePerHour, startAt, endAt, subtotal, discountAmount, total, amountPaid, e_1;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.court.findFirst({
                                where: { id: input.courtId, venueId: input.venueId },
                                select: { pricePerHour: true },
                            })];
                        case 1:
                            court = _c.sent();
                            if (!court)
                                throw new common_1.NotFoundException('Court not found for this venue.');
                            if (!input.customerId) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.customer.findFirst({
                                    where: { id: input.customerId, venueId: input.venueId },
                                    select: { id: true },
                                })];
                        case 2:
                            found = _c.sent();
                            if (!found)
                                throw new common_1.NotFoundException('Customer not found for this venue.');
                            _c.label = 3;
                        case 3:
                            isFree = input.freeGame || loyaltyOfferId != null;
                            pricePerHour = Number(court.pricePerHour.toString());
                            startAt = new Date(input.startAt);
                            assertSameNepalDay(startAt, input.durationMinutes);
                            endAt = new Date(startAt.getTime() + input.durationMinutes * 60000);
                            subtotal = Math.round((pricePerHour * input.durationMinutes) / 60);
                            discountAmount = isFree ? subtotal : ((_a = input.discountAmount) !== null && _a !== void 0 ? _a : 0);
                            total = isFree ? 0 : Math.max(0, subtotal - discountAmount);
                            amountPaid = (_b = input.amountPaid) !== null && _b !== void 0 ? _b : (input.paymentStatus === client_1.BookingPaymentStatus.PAID ? total : 0);
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var created;
                                    var _a, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0: return [4 /*yield*/, this.assertCourtAvailable(tx, {
                                                    venueId: input.venueId,
                                                    courtId: input.courtId,
                                                    startAt: startAt,
                                                    endAt: endAt,
                                                })];
                                            case 1:
                                                _e.sent();
                                                return [4 /*yield*/, tx.booking.create({
                                                        data: {
                                                            venueId: input.venueId,
                                                            courtId: input.courtId,
                                                            createdById: createdById,
                                                            customerName: input.customerName,
                                                            // Store the canonical phone key so loyalty counts match across bookings.
                                                            customerPhone: input.customerPhone ? (0, phone_util_1.phoneKey)(input.customerPhone) : null,
                                                            customerType: input.customerType,
                                                            customerId: (_a = input.customerId) !== null && _a !== void 0 ? _a : null,
                                                            source: client_1.BookingSource.WALK_IN,
                                                            startAt: startAt,
                                                            endAt: endAt,
                                                            durationMinutes: input.durationMinutes,
                                                            pricePerHour: pricePerHour,
                                                            subtotal: subtotal,
                                                            discountAmount: discountAmount,
                                                            total: total,
                                                            freeGame: isFree,
                                                            offerId: loyaltyOfferId !== null && loyaltyOfferId !== void 0 ? loyaltyOfferId : null,
                                                            paymentStatus: input.paymentStatus,
                                                            amountPaid: amountPaid,
                                                            paymentMethod: (_b = input.paymentMethod) !== null && _b !== void 0 ? _b : null,
                                                            status: client_1.BookingStatus.CONFIRMED,
                                                            adminNotes: (_c = input.notes) !== null && _c !== void 0 ? _c : null,
                                                        },
                                                        include: BOOKING_INCLUDES,
                                                    })];
                                            case 2:
                                                created = _e.sent();
                                                // Money taken at the counter when the booking was written up.
                                                return [4 /*yield*/, appendPaymentLedger(tx, {
                                                        bookingId: created.id,
                                                        venueId: created.venueId,
                                                        previousPaid: 0,
                                                        nextPaid: amountPaid,
                                                        method: (_d = input.paymentMethod) !== null && _d !== void 0 ? _d : null,
                                                        takenById: createdById,
                                                    })];
                                            case 3:
                                                // Money taken at the counter when the booking was written up.
                                                _e.sent();
                                                return [2 /*return*/, created];
                                        }
                                    });
                                }); })];
                        case 5: return [2 /*return*/, _c.sent()];
                        case 6:
                            e_1 = _c.sent();
                            if (isOverlapViolation(e_1)) {
                                throw new common_1.ConflictException('This court was just booked for that time. Please pick a different time or court.');
                            }
                            throw e_1;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        /** Edit a still-pending booking: reschedule (court/time/duration) and/or customer. */
        BookingRepository_1.prototype.update = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, pricePerHour, courtId, court, found, durationMinutes, startAt, endAt, subtotal, discountAmount, total;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findFirst({
                                where: { id: input.bookingId, venueId: input.venueId },
                                select: {
                                    id: true,
                                    status: true,
                                    courtId: true,
                                    startAt: true,
                                    durationMinutes: true,
                                    pricePerHour: true,
                                    discountAmount: true,
                                    freeGame: true,
                                },
                            })];
                        case 1:
                            existing = _b.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Booking not found for this venue.');
                            if (existing.status !== client_1.BookingStatus.PENDING_PAYMENT &&
                                existing.status !== client_1.BookingStatus.CONFIRMED) {
                                throw new common_1.BadRequestException('Only a pending booking can be edited.');
                            }
                            pricePerHour = Number(existing.pricePerHour.toString());
                            courtId = existing.courtId;
                            if (!(input.courtId && input.courtId !== existing.courtId)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.court.findFirst({
                                    where: { id: input.courtId, venueId: input.venueId },
                                    select: { pricePerHour: true },
                                })];
                        case 2:
                            court = _b.sent();
                            if (!court)
                                throw new common_1.NotFoundException('Court not found for this venue.');
                            pricePerHour = Number(court.pricePerHour.toString());
                            courtId = input.courtId;
                            _b.label = 3;
                        case 3:
                            if (!input.customerId) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.customer.findFirst({
                                    where: { id: input.customerId, venueId: input.venueId },
                                    select: { id: true },
                                })];
                        case 4:
                            found = _b.sent();
                            if (!found)
                                throw new common_1.NotFoundException('Customer not found for this venue.');
                            _b.label = 5;
                        case 5:
                            durationMinutes = (_a = input.durationMinutes) !== null && _a !== void 0 ? _a : existing.durationMinutes;
                            startAt = input.startAt ? new Date(input.startAt) : existing.startAt;
                            assertSameNepalDay(startAt, durationMinutes);
                            endAt = new Date(startAt.getTime() + durationMinutes * 60000);
                            subtotal = Math.round((pricePerHour * durationMinutes) / 60);
                            discountAmount = Number(existing.discountAmount.toString());
                            total = existing.freeGame ? 0 : Math.max(0, subtotal - discountAmount);
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // Re-check availability for the new court/time, ignoring this booking itself.
                                            return [4 /*yield*/, this.assertCourtAvailable(tx, {
                                                    venueId: input.venueId,
                                                    courtId: courtId,
                                                    startAt: startAt,
                                                    endAt: endAt,
                                                    excludeBookingId: existing.id,
                                                })];
                                            case 1:
                                                // Re-check availability for the new court/time, ignoring this booking itself.
                                                _a.sent();
                                                return [2 /*return*/, tx.booking.update({
                                                        where: { id: existing.id },
                                                        data: __assign(__assign(__assign({ courtId: courtId, startAt: startAt, endAt: endAt, durationMinutes: durationMinutes, pricePerHour: pricePerHour, subtotal: subtotal, total: total }, (input.customerId !== undefined ? { customerId: input.customerId } : {})), (input.customerName !== undefined ? { customerName: input.customerName } : {})), (input.customerPhone !== undefined
                                                            ? { customerPhone: (0, phone_util_1.phoneKey)(input.customerPhone) }
                                                            : {})),
                                                        include: BOOKING_INCLUDES,
                                                    })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        BookingRepository_1.prototype.setStatus = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, toStatus;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findFirst({
                                where: { id: input.bookingId, venueId: input.venueId },
                                select: { id: true, status: true },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Booking not found for this venue.');
                            toStatus = booking_inputs_1.ACTION_TO_STATUS[input.status];
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, tx.bookingStatusEvent.create({
                                                    data: {
                                                        bookingId: existing.id,
                                                        fromStatus: existing.status,
                                                        toStatus: toStatus,
                                                        actorId: actorId,
                                                        note: (_a = input.note) !== null && _a !== void 0 ? _a : null,
                                                    },
                                                })];
                                            case 1:
                                                _c.sent();
                                                return [2 /*return*/, tx.booking.update({
                                                        where: { id: existing.id },
                                                        data: {
                                                            status: toStatus,
                                                            completedAt: toStatus === client_1.BookingStatus.COMPLETED ? new Date() : undefined,
                                                            cancelledAt: toStatus === client_1.BookingStatus.CANCELLED ? new Date() : undefined,
                                                            cancelledById: toStatus === client_1.BookingStatus.CANCELLED ? actorId : undefined,
                                                            cancellationReason: toStatus === client_1.BookingStatus.CANCELLED ? ((_b = input.note) !== null && _b !== void 0 ? _b : null) : undefined,
                                                        },
                                                        include: BOOKING_INCLUDES,
                                                    })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        /** Complete a booking: attach add-on extras, recompute the total, settle payment. */
        BookingRepository_1.prototype.complete = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, base, extrasTotal, total, amountPaid;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findFirst({
                                where: { id: input.bookingId, venueId: input.venueId },
                                select: {
                                    id: true,
                                    venueId: true,
                                    status: true,
                                    subtotal: true,
                                    discountAmount: true,
                                    freeGame: true,
                                    amountPaid: true,
                                },
                            })];
                        case 1:
                            existing = _b.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Booking not found for this venue.');
                            base = existing.freeGame
                                ? 0
                                : Math.max(0, Number(existing.subtotal.toString()) - Number(existing.discountAmount.toString()));
                            extrasTotal = input.extras.reduce(function (sum, e) { return sum + e.price; }, 0);
                            total = base + extrasTotal;
                            amountPaid = Math.min(total, (_a = input.amountPaid) !== null && _a !== void 0 ? _a : (input.paymentStatus === client_1.BookingPaymentStatus.PAID ? total : 0));
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0: 
                                            // Re-completing replaces any previously captured extras.
                                            return [4 /*yield*/, tx.bookingExtra.deleteMany({ where: { bookingId: existing.id } })];
                                            case 1:
                                                // Re-completing replaces any previously captured extras.
                                                _d.sent();
                                                return [4 /*yield*/, tx.bookingStatusEvent.create({
                                                        data: {
                                                            bookingId: existing.id,
                                                            fromStatus: existing.status,
                                                            toStatus: client_1.BookingStatus.COMPLETED,
                                                            actorId: actorId,
                                                            note: (_a = input.note) !== null && _a !== void 0 ? _a : null,
                                                        },
                                                    })];
                                            case 2:
                                                _d.sent();
                                                // Settling up at checkout — often the balance after a deposit.
                                                return [4 /*yield*/, appendPaymentLedger(tx, {
                                                        bookingId: existing.id,
                                                        venueId: existing.venueId,
                                                        previousPaid: Number(existing.amountPaid.toString()),
                                                        nextPaid: amountPaid,
                                                        method: (_b = input.paymentMethod) !== null && _b !== void 0 ? _b : null,
                                                        takenById: actorId,
                                                    })];
                                            case 3:
                                                // Settling up at checkout — often the balance after a deposit.
                                                _d.sent();
                                                return [2 /*return*/, tx.booking.update({
                                                        where: { id: existing.id },
                                                        data: {
                                                            status: client_1.BookingStatus.COMPLETED,
                                                            completedAt: new Date(),
                                                            total: total,
                                                            paymentStatus: input.paymentStatus,
                                                            amountPaid: amountPaid,
                                                            paymentMethod: (_c = input.paymentMethod) !== null && _c !== void 0 ? _c : undefined,
                                                            extras: {
                                                                create: input.extras.map(function (e) { return ({ name: e.name, price: e.price }); }),
                                                            },
                                                        },
                                                        include: BOOKING_INCLUDES,
                                                    })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        BookingRepository_1.prototype.recordPayment = function (input, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // Transactional: the ledger row and the cached total must move together, or
                    // `SUM(booking_payments) = amountPaid` stops holding.
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            var _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0: return [4 /*yield*/, tx.booking.findFirst({
                                            where: { id: input.bookingId, venueId: input.venueId },
                                            select: { id: true, venueId: true, amountPaid: true },
                                        })];
                                    case 1:
                                        existing = _c.sent();
                                        if (!existing)
                                            throw new common_1.NotFoundException('Booking not found for this venue.');
                                        return [4 /*yield*/, appendPaymentLedger(tx, {
                                                bookingId: existing.id,
                                                venueId: existing.venueId,
                                                previousPaid: Number(existing.amountPaid.toString()),
                                                nextPaid: input.amountPaid,
                                                method: (_a = input.paymentMethod) !== null && _a !== void 0 ? _a : null,
                                                takenById: actorId,
                                            })];
                                    case 2:
                                        _c.sent();
                                        return [2 /*return*/, tx.booking.update({
                                                where: { id: existing.id },
                                                data: {
                                                    paymentStatus: input.paymentStatus,
                                                    amountPaid: input.amountPaid,
                                                    paymentMethod: (_b = input.paymentMethod) !== null && _b !== void 0 ? _b : undefined,
                                                },
                                                include: BOOKING_INCLUDES,
                                            })];
                                }
                            });
                        }); })];
                });
            });
        };
        // ─── Player-facing ──────────────────────────────────────────────────────────
        /** Active court on an approved venue, with the data needed to price a booking. */
        BookingRepository_1.prototype.courtForBooking = function (courtId) {
            return this.prisma.court.findFirst({
                where: {
                    id: courtId,
                    isActive: true,
                    venue: { verificationStatus: client_1.VenueVerificationStatus.APPROVED },
                },
                select: {
                    id: true,
                    venueId: true,
                    slotMinutes: true,
                    pricePerHour: true,
                    venue: { select: { openTime: true, closeTime: true } },
                },
            });
        };
        /** Create an online player booking, rejecting overlaps inside the transaction. */
        BookingRepository_1.prototype.createPlayerBooking = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var user, e_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: params.userId },
                                select: { fullName: true, phoneNumber: true },
                            })];
                        case 1:
                            user = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var offer, used;
                                    var _a, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0: 
                                            // Same gate as the venue paths: rejects overlapping bookings, a member's recurring
                                            // subscription slot, and owner closures — with neutral player-facing messages.
                                            return [4 /*yield*/, this.assertCourtAvailable(tx, {
                                                    venueId: params.venueId,
                                                    courtId: params.courtId,
                                                    startAt: params.startAt,
                                                    endAt: params.endAt,
                                                    generic: true,
                                                })];
                                            case 1:
                                                // Same gate as the venue paths: rejects overlapping bookings, a member's recurring
                                                // subscription slot, and owner closures — with neutral player-facing messages.
                                                _e.sent();
                                                if (!params.offerId) return [3 /*break*/, 4];
                                                return [4 /*yield*/, tx.offer.findUnique({
                                                        where: { id: params.offerId },
                                                        select: { usageLimit: true },
                                                    })];
                                            case 2:
                                                offer = _e.sent();
                                                if (!offer)
                                                    throw new common_1.BadRequestException('Offer no longer available.');
                                                if (!(offer.usageLimit != null)) return [3 /*break*/, 4];
                                                return [4 /*yield*/, tx.booking.count({
                                                        where: { offerId: params.offerId, status: { not: client_1.BookingStatus.CANCELLED } },
                                                    })];
                                            case 3:
                                                used = _e.sent();
                                                if (used >= offer.usageLimit) {
                                                    throw new common_1.ConflictException('This offer has reached its usage limit.');
                                                }
                                                _e.label = 4;
                                            case 4: return [2 /*return*/, tx.booking.create({
                                                    data: {
                                                        userId: params.userId,
                                                        customerId: params.customerId,
                                                        venueId: params.venueId,
                                                        courtId: params.courtId,
                                                        customerName: (_a = user === null || user === void 0 ? void 0 : user.fullName) !== null && _a !== void 0 ? _a : null,
                                                        customerPhone: (_b = user === null || user === void 0 ? void 0 : user.phoneNumber) !== null && _b !== void 0 ? _b : null,
                                                        customerType: client_1.CustomerType.INDIVIDUAL,
                                                        source: client_1.BookingSource.ONLINE,
                                                        startAt: params.startAt,
                                                        endAt: params.endAt,
                                                        durationMinutes: params.durationMinutes,
                                                        pricePerHour: params.pricePerHour,
                                                        subtotal: params.subtotal,
                                                        discountAmount: params.discountAmount,
                                                        total: params.total,
                                                        offerId: (_c = params.offerId) !== null && _c !== void 0 ? _c : null,
                                                        // Single-slot court bookings confirm instantly (pay at the venue) — no owner
                                                        // approval. Memberships + tournament events are the request-approved flows.
                                                        paymentStatus: client_1.BookingPaymentStatus.PENDING,
                                                        status: client_1.BookingStatus.CONFIRMED,
                                                        adminNotes: (_d = params.notes) !== null && _d !== void 0 ? _d : null,
                                                        statusEvents: {
                                                            create: { toStatus: client_1.BookingStatus.CONFIRMED, actorId: params.userId },
                                                        },
                                                    },
                                                    include: PLAYER_BOOKING_INCLUDES,
                                                })];
                                        }
                                    });
                                }); })];
                        case 3: return [2 /*return*/, _a.sent()];
                        case 4:
                            e_2 = _a.sent();
                            // Lost a race to another booking on the same slot (DB exclusion constraint).
                            if (isOverlapViolation(e_2))
                                throw new common_1.ConflictException('That slot is no longer available.');
                            throw e_2;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        BookingRepository_1.prototype.listMyBookings = function (userId, page, pageSize) {
            return __awaiter(this, void 0, void 0, function () {
                var where, _a, items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            where = { userId: userId };
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.booking.findMany({
                                        where: where,
                                        include: PLAYER_BOOKING_INCLUDES,
                                        orderBy: { startAt: 'desc' },
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.booking.count({ where: where }),
                                ])];
                        case 1:
                            _a = _b.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        BookingRepository_1.prototype.cancelMyBooking = function (userId, bookingId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findFirst({
                                where: { id: bookingId, userId: userId },
                                select: { id: true, status: true },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Booking not found.');
                            if (TERMINAL_STATUSES.has(existing.status)) {
                                throw new common_1.BadRequestException("Booking is already ".concat(existing.status, "."));
                            }
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.bookingStatusEvent.create({
                                                    data: {
                                                        bookingId: bookingId,
                                                        fromStatus: existing.status,
                                                        toStatus: client_1.BookingStatus.CANCELLED,
                                                        actorId: userId,
                                                        note: reason !== null && reason !== void 0 ? reason : null,
                                                    },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, tx.booking.update({
                                                        where: { id: bookingId },
                                                        data: {
                                                            status: client_1.BookingStatus.CANCELLED,
                                                            cancelledAt: new Date(),
                                                            cancelledById: userId,
                                                            cancellationReason: reason !== null && reason !== void 0 ? reason : null,
                                                        },
                                                        include: PLAYER_BOOKING_INCLUDES,
                                                    })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        // ─── Venue accept / decline of pending online bookings ──────────────────────
        BookingRepository_1.prototype.acceptBooking = function (venueId, bookingId, actorId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requirePending(venueId, bookingId, 'accepted')];
                        case 1:
                            existing = _a.sent();
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.bookingStatusEvent.create({
                                                    data: {
                                                        bookingId: bookingId,
                                                        fromStatus: existing.status,
                                                        toStatus: client_1.BookingStatus.CONFIRMED,
                                                        actorId: actorId,
                                                    },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, tx.booking.update({
                                                        where: { id: bookingId },
                                                        data: { status: client_1.BookingStatus.CONFIRMED },
                                                        include: BOOKING_INCLUDES,
                                                    })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        BookingRepository_1.prototype.declineBooking = function (venueId, bookingId, actorId, reason) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.requirePending(venueId, bookingId, 'declined')];
                        case 1:
                            existing = _a.sent();
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.bookingStatusEvent.create({
                                                    data: {
                                                        bookingId: bookingId,
                                                        fromStatus: existing.status,
                                                        toStatus: client_1.BookingStatus.CANCELLED,
                                                        actorId: actorId,
                                                        note: reason !== null && reason !== void 0 ? reason : null,
                                                    },
                                                })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/, tx.booking.update({
                                                        where: { id: bookingId },
                                                        data: {
                                                            status: client_1.BookingStatus.CANCELLED,
                                                            cancelledAt: new Date(),
                                                            cancelledById: actorId,
                                                            cancellationReason: reason !== null && reason !== void 0 ? reason : null,
                                                        },
                                                        include: BOOKING_INCLUDES,
                                                    })];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        /** Fetch a venue booking and assert it is still awaiting acceptance. */
        BookingRepository_1.prototype.requirePending = function (venueId, bookingId, action) {
            return __awaiter(this, void 0, void 0, function () {
                var existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.booking.findFirst({
                                where: { id: bookingId, venueId: venueId },
                                select: { id: true, status: true },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Booking not found for this venue.');
                            if (existing.status !== client_1.BookingStatus.PENDING_PAYMENT) {
                                throw new common_1.BadRequestException("Only pending bookings can be ".concat(action, " (current: ").concat(existing.status, ")."));
                            }
                            return [2 /*return*/, existing];
                    }
                });
            });
        };
        return BookingRepository_1;
    }());
    __setFunctionName(_classThis, "BookingRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingRepository = _classThis;
}();
exports.BookingRepository = BookingRepository;
