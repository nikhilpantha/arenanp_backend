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
exports.SubscriptionsRepository = exports.DURATION_DAYS = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var nepal_time_1 = require("../../common/utils/nepal-time");
var availability_util_1 = require("../booking/availability.util");
var conflicts_util_1 = require("./conflicts.util");
var lifecycle_util_1 = require("./lifecycle.util");
/** Default validity window (days) for each plan duration. */
exports.DURATION_DAYS = {
    WEEKLY: 7,
    FORTNIGHTLY: 14,
    MONTHLY: 30,
    QUARTERLY: 90,
    HALF_YEARLY: 180,
    YEARLY: 365,
};
/** Subscription joined with the plan, court + customer needed to map it for the client. */
var SUBSCRIPTION_INCLUDE = {
    plan: true,
    court: { select: { name: true } },
    customer: { select: { name: true, phone: true } },
};
function addDays(from, days) {
    var d = new Date(from);
    d.setDate(d.getDate() + days);
    return d;
}
var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** Readable calendar date for a stored membership window end (UTC midnight). */
function formatDate(d) {
    return "".concat(MONTHS[d.getUTCMonth()], " ").concat(d.getUTCDate(), ", ").concat(d.getUTCFullYear());
}
/** "Aug 10, 6 AM to 7 AM" — one booking, in Nepal wall-clock, for an owner-facing message. */
function nepalDayAndClock(startAt, endAt) {
    var local = new Date(startAt.getTime() + nepal_time_1.NEPAL_UTC_OFFSET_MINUTES * 60000);
    return "".concat(MONTHS[local.getUTCMonth()], " ").concat(local.getUTCDate(), ", ").concat((0, availability_util_1.nepalClockRange)(startAt, endAt));
}
/**
 * Statuses that keep a membership "live" — someone is on the plan now, is about
 * to be, or has asked to be. PENDING counts: it already holds the court slot
 * (see `slotConflict`), so deleting the plan under it would orphan the request.
 */
var LIVE_STATUSES = [
    client_1.SubscriptionStatus.PENDING,
    client_1.SubscriptionStatus.SCHEDULED,
    client_1.SubscriptionStatus.ACTIVE,
    client_1.SubscriptionStatus.PAUSED,
];
var SubscriptionsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SubscriptionsRepository = _classThis = /** @class */ (function () {
        function SubscriptionsRepository_1(prisma) {
            this.prisma = prisma;
        }
        // ─── Plans ──────────────────────────────────────────────────────────────────
        SubscriptionsRepository_1.prototype.listPlans = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var where;
                return __generator(this, function (_a) {
                    where = { venueId: input.venueId };
                    if (input.activeOnly)
                        where.isActive = true;
                    return [2 /*return*/, this.prisma.membershipPlan.findMany({ where: where, orderBy: { createdAt: 'desc' } })];
                });
            });
        };
        /**
         * Per-plan headcounts, split the three ways the console actually needs:
         * `active` for the card, `live` for "can this be deleted?", `total` for "does
         * deleting it destroy payment history?". Prisma can't express three differently
         * filtered counts of one relation, so it's one groupBy and a merge.
         */
        SubscriptionsRepository_1.prototype.planCounts = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows, counts, _i, rows_1, row, tally, n;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.groupBy({
                                by: ['planId', 'status'],
                                where: { venueId: venueId },
                                _count: { _all: true },
                            })];
                        case 1:
                            rows = _b.sent();
                            counts = new Map();
                            for (_i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                                row = rows_1[_i];
                                tally = (_a = counts.get(row.planId)) !== null && _a !== void 0 ? _a : { active: 0, live: 0, total: 0 };
                                n = row._count._all;
                                tally.total += n;
                                if (LIVE_STATUSES.includes(row.status))
                                    tally.live += n;
                                if (row.status === client_1.SubscriptionStatus.ACTIVE)
                                    tally.active += n;
                                counts.set(row.planId, tally);
                            }
                            return [2 /*return*/, counts];
                    }
                });
            });
        };
        SubscriptionsRepository_1.prototype.createPlan = function (input, windows) {
            var _a, _b, _c, _d, _e;
            var validityDays = (_a = input.validityDays) !== null && _a !== void 0 ? _a : exports.DURATION_DAYS[input.duration];
            return this.prisma.membershipPlan.create({
                data: {
                    venueId: input.venueId,
                    name: input.name,
                    description: (_b = input.description) !== null && _b !== void 0 ? _b : null,
                    price: input.price,
                    duration: input.duration,
                    validityDays: validityDays,
                    sessionMinutes: input.sessionMinutes,
                    windows: windows,
                    daysOfWeek: (_c = input.daysOfWeek) !== null && _c !== void 0 ? _c : [],
                    sports: (_d = input.sports) !== null && _d !== void 0 ? _d : [],
                    highlight: (_e = input.highlight) !== null && _e !== void 0 ? _e : null,
                },
            });
        };
        SubscriptionsRepository_1.prototype.updatePlan = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.membershipPlan.findFirst({
                                where: { id: input.planId, venueId: input.venueId },
                                select: { id: true },
                            })];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Membership plan not found for this venue.');
                            data = {};
                            if (input.name !== undefined)
                                data.name = input.name;
                            if (input.description !== undefined)
                                data.description = input.description;
                            if (input.price !== undefined)
                                data.price = input.price;
                            if (input.duration !== undefined) {
                                data.duration = input.duration;
                                if (input.validityDays === undefined)
                                    data.validityDays = exports.DURATION_DAYS[input.duration];
                            }
                            if (input.validityDays !== undefined)
                                data.validityDays = input.validityDays;
                            if (input.sessionMinutes !== undefined)
                                data.sessionMinutes = input.sessionMinutes;
                            if (input.windows !== undefined)
                                data.windows = input.windows;
                            if (input.daysOfWeek !== undefined)
                                data.daysOfWeek = input.daysOfWeek;
                            if (input.sports !== undefined)
                                data.sports = input.sports;
                            if (input.highlight !== undefined)
                                data.highlight = input.highlight;
                            if (input.isActive !== undefined)
                                data.isActive = input.isActive;
                            return [2 /*return*/, this.prisma.membershipPlan.update({ where: { id: input.planId }, data: data })];
                    }
                });
            });
        };
        /**
         * Delete a plan — only ever possible for one nobody has bought.
         *
         * Two separate refusals, and both point at deactivating instead:
         * 1. Members are on it now (or have a request in) — they'd lose their slot.
         * 2. Only past members remain — their payments hang off those subscriptions,
         *    so the plan is accounting history. `Subscription.plan` is `onDelete:
         *    Restrict`, so without this check Prisma raises a foreign-key error the
         *    owner sees as "internal server error".
         */
        SubscriptionsRepository_1.prototype.deletePlan = function (venueId, planId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, _a, live, total, n;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.membershipPlan.findFirst({
                                where: { id: planId, venueId: venueId },
                                select: { id: true },
                            })];
                        case 1:
                            existing = _b.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Membership plan not found for this venue.');
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.subscription.findMany({
                                        where: { planId: planId, status: { in: LIVE_STATUSES } },
                                        orderBy: { expiresAt: 'desc' },
                                        select: { expiresAt: true },
                                    }),
                                    this.prisma.subscription.count({ where: { planId: planId } }),
                                ])];
                        case 2:
                            _a = _b.sent(), live = _a[0], total = _a[1];
                            if (live.length > 0) {
                                n = live.length;
                                throw new common_1.BadRequestException("This plan still has ".concat(n, " running or upcoming membership").concat(n > 1 ? 's' : '', ". ") +
                                    'Switch the plan off instead — they finish their term and nobody new can join. ' +
                                    "The last one ends on ".concat(formatDate(live[0].expiresAt), "."));
                            }
                            if (total > 0) {
                                throw new common_1.BadRequestException("This plan has ".concat(total, " past membership").concat(total > 1 ? 's' : '', " with payment records, ") +
                                    'so deleting it would take that money history with it. ' +
                                    'Switch it off instead to hide it from new members.');
                            }
                            return [2 /*return*/, this.prisma.membershipPlan.delete({ where: { id: planId } })];
                    }
                });
            });
        };
        // ─── Subscriptions ────────────────────────────────────────────────────────────
        SubscriptionsRepository_1.prototype.listSubscriptions = function (input, page, pageSize) {
            return __awaiter(this, void 0, void 0, function () {
                var where, search, _a, items, total;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            where = { venueId: input.venueId };
                            where.status = (_b = input.status) !== null && _b !== void 0 ? _b : { not: client_1.SubscriptionStatus.CANCELLED };
                            if (input.planId)
                                where.planId = input.planId;
                            search = (_c = input.search) === null || _c === void 0 ? void 0 : _c.trim();
                            if (search) {
                                where.customer = {
                                    OR: [{ name: { contains: search, mode: 'insensitive' } }, { phone: { contains: search } }],
                                };
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.subscription.findMany({
                                        where: where,
                                        orderBy: { createdAt: 'desc' },
                                        include: SUBSCRIPTION_INCLUDE,
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.subscription.count({ where: where }),
                                ])];
                        case 1:
                            _a = _d.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        SubscriptionsRepository_1.prototype.findSubscription = function (venueId, subscriptionId) {
            return this.prisma.subscription.findFirst({
                where: { id: subscriptionId, venueId: venueId },
                include: __assign(__assign({}, SUBSCRIPTION_INCLUDE), { payments: { orderBy: { createdAt: 'desc' } } }),
            });
        };
        /**
         * Whether a court's daily slot is already held by a live subscription (ACTIVE or
         * PAUSED) whose date range overlaps [startDate, endDate]. EXPIRED/CANCELLED free it.
         */
        SubscriptionsRepository_1.prototype.slotConflict = function (courtId, slotStart, startDate, endDate, 
        /** Ignore this subscription — used when renewing, so it can't clash with itself. */
        excludeSubscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                var count;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.count({
                                where: __assign(__assign({ courtId: courtId, slotStart: slotStart }, (excludeSubscriptionId ? { id: { not: excludeSubscriptionId } } : {})), { 
                                    // Pending requests + scheduled (not-yet-started) memberships still hold their slot.
                                    status: {
                                        in: [
                                            client_1.SubscriptionStatus.PENDING,
                                            client_1.SubscriptionStatus.SCHEDULED,
                                            client_1.SubscriptionStatus.ACTIVE,
                                            client_1.SubscriptionStatus.PAUSED,
                                        ],
                                    }, 
                                    // Date ranges overlap when each starts on/before the other ends.
                                    startedAt: { lte: endDate }, expiresAt: { gte: startDate } }),
                            })];
                        case 1:
                            count = _a.sent();
                            return [2 /*return*/, count > 0];
                    }
                });
            });
        };
        /**
         * The daily slot starts ("HH:mm") already held on a court by a live subscription
         * (PENDING/SCHEDULED/ACTIVE/PAUSED) whose date range overlaps [startDate, endDate].
         * Drives the player picker's availability so they can't request a taken slot.
         */
        SubscriptionsRepository_1.prototype.takenSlotStarts = function (courtId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findMany({
                                where: {
                                    courtId: courtId,
                                    status: {
                                        in: [
                                            client_1.SubscriptionStatus.PENDING,
                                            client_1.SubscriptionStatus.SCHEDULED,
                                            client_1.SubscriptionStatus.ACTIVE,
                                            client_1.SubscriptionStatus.PAUSED,
                                        ],
                                    },
                                    startedAt: { lte: endDate },
                                    expiresAt: { gte: startDate },
                                },
                                select: { slotStart: true },
                                distinct: ['slotStart'],
                            })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (r) { return r.slotStart; })];
                    }
                });
            });
        };
        /** A player's own subscriptions across venues (via their linked customers), newest first. */
        SubscriptionsRepository_1.prototype.mySubscriptions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.subscription.findMany({
                            where: { customer: { userId: userId } },
                            orderBy: { createdAt: 'desc' },
                            include: SUBSCRIPTION_INCLUDE,
                            take: 100,
                        })];
                });
            });
        };
        /** Resolve the plan, court + customer that all belong to the venue (any may be null). */
        SubscriptionsRepository_1.prototype.planCourtCustomer = function (venueId, planId, courtId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, plan, court, customer;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.membershipPlan.findFirst({ where: { id: planId, venueId: venueId } }),
                                this.prisma.court.findFirst({ where: { id: courtId, venueId: venueId }, select: { id: true } }),
                                this.prisma.customer.findFirst({ where: { id: customerId, venueId: venueId } }),
                            ])];
                        case 1:
                            _a = _b.sent(), plan = _a[0], court = _a[1], customer = _a[2];
                            return [2 /*return*/, { plan: plan, court: court, customer: customer }];
                    }
                });
            });
        };
        /** Create the subscription + its first payment atomically. */
        SubscriptionsRepository_1.prototype.createSubscription = function (input, plan, slotStart, startedAt, now, forceStatus) {
            return __awaiter(this, void 0, void 0, function () {
                var amount, status, awaitingApproval, created;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            amount = (_a = input.amountPaid) !== null && _a !== void 0 ? _a : Number(plan.price.toString());
                            status = forceStatus !== null && forceStatus !== void 0 ? forceStatus : (startedAt > now ? client_1.SubscriptionStatus.SCHEDULED : client_1.SubscriptionStatus.ACTIVE);
                            awaitingApproval = status === client_1.SubscriptionStatus.PENDING;
                            return [4 /*yield*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var sub;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, tx.subscription.create({
                                                    data: __assign({ venueId: input.venueId, planId: plan.id, courtId: input.courtId, customerId: input.customerId, status: status, startedAt: startedAt, expiresAt: addDays(startedAt, plan.validityDays), slotStart: slotStart, 
                                                        // Lock in today's terms — the plan can change tomorrow, this term can't.
                                                        price: plan.price, validityDays: plan.validityDays, sessionMinutes: plan.sessionMinutes, daysOfWeek: plan.daysOfWeek }, (awaitingApproval
                                                        ? {}
                                                        : {
                                                            payments: {
                                                                create: {
                                                                    amount: amount,
                                                                    method: (_a = input.paymentMethod) !== null && _a !== void 0 ? _a : null,
                                                                    periodDays: plan.validityDays,
                                                                },
                                                            },
                                                        })),
                                                })];
                                            case 1:
                                                sub = _b.sent();
                                                return [2 /*return*/, sub.id];
                                        }
                                    });
                                }); })];
                        case 1:
                            created = _b.sent();
                            return [2 /*return*/, this.findSubscription(input.venueId, created)];
                    }
                });
            });
        };
        /**
         * Non-cancelled bookings on a court between two instants — the raw material for
         * "is this member's recurring slot clear over that stretch of calendar?".
         */
        SubscriptionsRepository_1.prototype.courtBookings = function (courtId, from, to) {
            return this.prisma.booking.findMany({
                where: {
                    courtId: courtId,
                    status: { not: client_1.BookingStatus.CANCELLED },
                    startAt: { lt: to },
                    endAt: { gt: from },
                },
                orderBy: { startAt: 'asc' },
                select: { startAt: true, endAt: true, customerName: true },
            });
        };
        /**
         * A member's recurring slot is only theirs while their term runs. Whenever we
         * push that hold over new calendar — renewing, or resuming after a pause that
         * opened the slot to walk-ins — the court has to be clear first, or the member
         * and a paying booking both own the same hour.
         */
        SubscriptionsRepository_1.prototype.assertSlotClearForBookings = function (sub, from, to, lead) {
            return __awaiter(this, void 0, void 0, function () {
                var bookings, clash, who;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.courtBookings(sub.courtId, from, to)];
                        case 1:
                            bookings = _a.sent();
                            clash = (0, conflicts_util_1.firstBookingInMemberSlot)(sub, bookings);
                            if (!clash)
                                return [2 /*return*/];
                            who = clash.customerName ? " (".concat(clash.customerName, ")") : '';
                            throw new common_1.BadRequestException("".concat(lead, " would put this member back on a court that's already booked: ") +
                                "".concat(nepalDayAndClock(clash.startAt, clash.endAt)).concat(who, ". ") +
                                'Move or cancel that booking first.');
                    }
                });
            });
        };
        /** Extend a subscription by its plan's validity window + record a renewal payment. */
        SubscriptionsRepository_1.prototype.renewSubscription = function (input, now) {
            return __awaiter(this, void 0, void 0, function () {
                var sub, base, nextExpiry, amount;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: { id: input.subscriptionId, venueId: input.venueId },
                                include: { plan: true },
                            })];
                        case 1:
                            sub = _c.sent();
                            if (!sub)
                                throw new common_1.NotFoundException('Subscription not found for this venue.');
                            // A cancelled membership released its slot the moment it was cancelled — someone
                            // else may hold it now, so it restarts as a new membership, never as a renewal.
                            if (sub.status === client_1.SubscriptionStatus.CANCELLED) {
                                throw new common_1.BadRequestException('This membership was cancelled and its slot was released. Add a new membership instead.');
                            }
                            // A paused membership is mid-credit: its end date moves when it resumes, so
                            // renewing first would extend from a date that's about to change.
                            if (sub.status === client_1.SubscriptionStatus.PAUSED) {
                                throw new common_1.BadRequestException('This membership is paused. Resume it first — the paused days are credited ' +
                                    'to their end date, then you can renew from there.');
                            }
                            // A switched-off plan is closed to new money: existing members ride out the term
                            // they paid for, but renewing would sell a plan the venue has withdrawn.
                            if (!sub.plan.isActive) {
                                throw new common_1.BadRequestException("\"".concat(sub.plan.name, "\" is switched off, so it can't be renewed. ") +
                                    'Switch the plan back on, or add this member to a current plan.');
                            }
                            base = sub.expiresAt > now ? sub.expiresAt : now;
                            nextExpiry = addDays(base, sub.plan.validityDays);
                            return [4 /*yield*/, this.slotConflict(sub.courtId, sub.slotStart, base, nextExpiry, sub.id)];
                        case 2:
                            // The court + time is only theirs while their term runs. Renewing claims a NEW
                            // stretch of calendar, so re-check it — after an expiry someone else may have
                            // taken the slot, and silently extending would double-book the court.
                            if (_c.sent()) {
                                throw new common_1.BadRequestException('Another member now holds that court and time for the new period. ' +
                                    'Move this member to a different slot instead.');
                            }
                            return [4 /*yield*/, this.assertSlotClearForBookings(__assign(__assign({}, sub), { sessionMinutes: sub.plan.sessionMinutes, daysOfWeek: sub.plan.daysOfWeek }), base, nextExpiry, 'Renewing')];
                        case 3:
                            _c.sent();
                            amount = (_a = input.amountPaid) !== null && _a !== void 0 ? _a : Number(sub.plan.price.toString());
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.subscription.update({
                                        where: { id: sub.id },
                                        data: {
                                            status: client_1.SubscriptionStatus.ACTIVE,
                                            expiresAt: nextExpiry,
                                            // Re-snapshot: from now on this member is on today's terms, and the next
                                            // renewal extends by today's window.
                                            price: sub.plan.price,
                                            validityDays: sub.plan.validityDays,
                                            sessionMinutes: sub.plan.sessionMinutes,
                                            daysOfWeek: sub.plan.daysOfWeek,
                                        },
                                    }),
                                    this.prisma.subscriptionPayment.create({
                                        data: {
                                            subscriptionId: sub.id,
                                            amount: amount,
                                            method: (_b = input.paymentMethod) !== null && _b !== void 0 ? _b : null,
                                            periodDays: sub.plan.validityDays,
                                        },
                                    }),
                                ])];
                        case 4:
                            _c.sent();
                            return [2 /*return*/, this.findSubscription(input.venueId, sub.id)];
                    }
                });
            });
        };
        /**
         * Pause, resume or cancel — the only status changes an owner makes by hand.
         *
         * Pausing opens the member's slot to walk-in bookings (the venue can still earn
         * from that hour) while keeping it reserved against other memberships. Resuming
         * pays the time back onto their end date and re-claims the court, which is why it
         * has to check no walk-in got in first.
         */
        SubscriptionsRepository_1.prototype.setStatus = function (venueId, subscriptionId, status, now) {
            return __awaiter(this, void 0, void 0, function () {
                var sub, refusal, data, expiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: { id: subscriptionId, venueId: venueId },
                            })];
                        case 1:
                            sub = _a.sent();
                            if (!sub)
                                throw new common_1.NotFoundException('Subscription not found for this venue.');
                            refusal = (0, lifecycle_util_1.transitionError)(sub.status, status);
                            if (refusal)
                                throw new common_1.BadRequestException(refusal);
                            data = { status: status };
                            if (!(status === client_1.SubscriptionStatus.PAUSED)) return [3 /*break*/, 2];
                            data.pausedAt = now;
                            return [3 /*break*/, 5];
                        case 2:
                            if (!(status === client_1.SubscriptionStatus.ACTIVE && sub.status === client_1.SubscriptionStatus.PAUSED)) return [3 /*break*/, 4];
                            expiresAt = (0, lifecycle_util_1.expiryAfterResume)(sub.expiresAt, sub.pausedAt, now);
                            return [4 /*yield*/, this.assertSlotClearForBookings(sub, now, expiresAt, 'Resuming')];
                        case 3:
                            _a.sent();
                            data.expiresAt = expiresAt;
                            data.pausedAt = null;
                            return [3 /*break*/, 5];
                        case 4:
                            if (status === client_1.SubscriptionStatus.CANCELLED) {
                                data.pausedAt = null;
                            }
                            _a.label = 5;
                        case 5: return [4 /*yield*/, this.prisma.subscription.update({ where: { id: subscriptionId }, data: data })];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, this.findSubscription(venueId, subscriptionId)];
                    }
                });
            });
        };
        /**
         * Approve a player's request: the moment it becomes a real membership and the
         * moment money is first recorded against it.
         *
         * A request can sit for up to `PENDING_REQUEST_TTL_HOURS` holding its slot, so
         * everything is re-checked here rather than trusted from when it was made. It is
         * charged at the price it was requested at, not today's — they asked before any
         * increase.
         */
        SubscriptionsRepository_1.prototype.approveRequest = function (venueId, subscriptionId, now, amountPaid, method) {
            return __awaiter(this, void 0, void 0, function () {
                var sub, from, status;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.subscription.findFirst({
                                where: { id: subscriptionId, venueId: venueId },
                                include: { plan: { select: { name: true, isActive: true } } },
                            })];
                        case 1:
                            sub = _a.sent();
                            if (!sub)
                                throw new common_1.NotFoundException('Subscription not found for this venue.');
                            if (sub.status !== client_1.SubscriptionStatus.PENDING) {
                                throw new common_1.BadRequestException('This membership is not waiting for approval.');
                            }
                            if (!sub.plan.isActive) {
                                throw new common_1.BadRequestException("\"".concat(sub.plan.name, "\" is switched off, so this request can't be approved. ") +
                                    'Switch the plan back on first, or reject the request.');
                            }
                            return [4 /*yield*/, this.slotConflict(sub.courtId, sub.slotStart, sub.startedAt, sub.expiresAt, sub.id)];
                        case 2:
                            if (_a.sent()) {
                                throw new common_1.BadRequestException('That court and time went to another member while this request was waiting. ' +
                                    'Reject it and offer them a different slot.');
                            }
                            from = sub.startedAt > now ? sub.startedAt : now;
                            return [4 /*yield*/, this.assertSlotClearForBookings(sub, from, sub.expiresAt, 'Approving')];
                        case 3:
                            _a.sent();
                            status = sub.startedAt > now ? client_1.SubscriptionStatus.SCHEDULED : client_1.SubscriptionStatus.ACTIVE;
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.subscription.update({ where: { id: sub.id }, data: { status: status } }),
                                    this.prisma.subscriptionPayment.create({
                                        data: {
                                            subscriptionId: sub.id,
                                            amount: amountPaid !== null && amountPaid !== void 0 ? amountPaid : Number(sub.price.toString()),
                                            method: method !== null && method !== void 0 ? method : null,
                                            periodDays: sub.validityDays,
                                        },
                                    }),
                                ])];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, this.findSubscription(venueId, subscriptionId)];
                    }
                });
            });
        };
        // ─── Stats ──────────────────────────────────────────────────────────────────
        SubscriptionsRepository_1.prototype.stats = function (venueId, now, soonBefore, monthStart) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, activeMembers, expiringSoon, revenue, paymentGroups, withPayment, renewed, renewalRatePct;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.prisma.subscription.count({
                                    where: { venueId: venueId, status: client_1.SubscriptionStatus.ACTIVE },
                                }),
                                this.prisma.subscription.count({
                                    where: {
                                        venueId: venueId,
                                        status: client_1.SubscriptionStatus.ACTIVE,
                                        expiresAt: { gte: now, lte: soonBefore },
                                    },
                                }),
                                this.prisma.subscriptionPayment.aggregate({
                                    where: { subscription: { venueId: venueId }, createdAt: { gte: monthStart } },
                                    _sum: { amount: true },
                                }),
                                this.prisma.subscriptionPayment.groupBy({
                                    by: ['subscriptionId'],
                                    where: { subscription: { venueId: venueId } },
                                    _count: { _all: true },
                                }),
                            ])];
                        case 1:
                            _a = _b.sent(), activeMembers = _a[0], expiringSoon = _a[1], revenue = _a[2], paymentGroups = _a[3];
                            withPayment = paymentGroups.length;
                            renewed = paymentGroups.filter(function (g) { return g._count._all > 1; }).length;
                            renewalRatePct = withPayment === 0 ? 0 : Math.round((renewed / withPayment) * 100);
                            return [2 /*return*/, {
                                    activeMembers: activeMembers,
                                    expiringSoon: expiringSoon,
                                    monthlyRevenue: revenue._sum.amount ? Number(revenue._sum.amount.toString()) : 0,
                                    renewalRatePct: renewalRatePct,
                                }];
                    }
                });
            });
        };
        /**
         * Lazily advance subscription lifecycle on read: SCHEDULED → ACTIVE once the start
         * date arrives, ACTIVE → SCHEDULED if it somehow hasn't started yet (legacy/edge data),
         * and ACTIVE/SCHEDULED → EXPIRED once past the end date.
         *
         * PAUSED is left alone on purpose — a paused membership's end date is still moving,
         * so expiring it on the clock would cheat the member out of their credit.
         */
        SubscriptionsRepository_1.prototype.reconcileStatuses = function (venueId, now) {
            return __awaiter(this, void 0, void 0, function () {
                var requestCutoff;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestCutoff = new Date(now.getTime() - lifecycle_util_1.PENDING_REQUEST_TTL_HOURS * 3600000);
                            return [4 /*yield*/, this.prisma.$transaction([
                                    // Let an unanswered request go: it has been holding a court slot the venue
                                    // could have sold, and the player has had no answer for two days.
                                    this.prisma.subscription.updateMany({
                                        where: {
                                            venueId: venueId,
                                            status: client_1.SubscriptionStatus.PENDING,
                                            createdAt: { lt: requestCutoff },
                                        },
                                        data: { status: client_1.SubscriptionStatus.CANCELLED },
                                    }),
                                    // Promote: a scheduled membership whose start date has arrived is now running.
                                    this.prisma.subscription.updateMany({
                                        where: {
                                            venueId: venueId,
                                            status: client_1.SubscriptionStatus.SCHEDULED,
                                            startedAt: { lte: now },
                                            expiresAt: { gte: now },
                                        },
                                        data: { status: client_1.SubscriptionStatus.ACTIVE },
                                    }),
                                    // Demote: an active membership that hasn't started yet is really upcoming.
                                    this.prisma.subscription.updateMany({
                                        where: { venueId: venueId, status: client_1.SubscriptionStatus.ACTIVE, startedAt: { gt: now } },
                                        data: { status: client_1.SubscriptionStatus.SCHEDULED },
                                    }),
                                    // Expire: anything past its end date.
                                    this.prisma.subscription.updateMany({
                                        where: {
                                            venueId: venueId,
                                            status: { in: [client_1.SubscriptionStatus.ACTIVE, client_1.SubscriptionStatus.SCHEDULED] },
                                            expiresAt: { lt: now },
                                        },
                                        data: { status: client_1.SubscriptionStatus.EXPIRED },
                                    }),
                                ])];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return SubscriptionsRepository_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsRepository = _classThis;
}();
exports.SubscriptionsRepository = SubscriptionsRepository;
