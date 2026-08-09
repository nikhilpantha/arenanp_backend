"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.CustomersRepository = void 0;
exports.normalizeName = normalizeName;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var phone_util_1 = require("../../common/utils/phone.util");
var customer_inputs_1 = require("./dto/customer.inputs");
/** Subscription states that count as a "live" membership for the hasActiveMembership filter. */
var LIVE_SUBSCRIPTION = [
    client_1.SubscriptionStatus.SCHEDULED,
    client_1.SubscriptionStatus.ACTIVE,
    client_1.SubscriptionStatus.PAUSED,
];
/** Trim + collapse internal whitespace so " A  B " and "A B" dedupe to one customer. */
function normalizeName(name) {
    return name.trim().replace(/\s+/g, ' ');
}
function activeWindow(now) {
    return {
        isActive: true,
        validFrom: { lte: now },
        // Null validUntil = open-ended: live until the owner switches it off.
        OR: [{ validUntil: null }, { validUntil: { gte: now } }],
    };
}
var CustomersRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomersRepository = _classThis = /** @class */ (function () {
        function CustomersRepository_1(prisma) {
            this.prisma = prisma;
        }
        CustomersRepository_1.prototype.customerWhere = function (input) {
            var _a;
            var where = { venueId: input.venueId };
            var search = (_a = input.search) === null || _a === void 0 ? void 0 : _a.trim();
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search } },
                ];
            }
            if (input.kind)
                where.kind = input.kind;
            if (input.hasActiveMembership) {
                where.subscriptions = { some: { status: { in: LIVE_SUBSCRIPTION } } };
            }
            return where;
        };
        CustomersRepository_1.prototype.listVenueCustomers = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var where, take, skip, sort, conds, search, like, orderExpr, ranked, ids, rows, order;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            where = this.customerWhere(input);
                            take = (_a = input.limit) !== null && _a !== void 0 ? _a : 20;
                            skip = (_b = input.offset) !== null && _b !== void 0 ? _b : 0;
                            sort = (_c = input.sort) !== null && _c !== void 0 ? _c : customer_inputs_1.VenueCustomerSort.CREATED;
                            // Plain column sorts page in the DB.
                            if (sort === customer_inputs_1.VenueCustomerSort.CREATED || sort === customer_inputs_1.VenueCustomerSort.NAME) {
                                return [2 /*return*/, this.prisma.customer.findMany({
                                        where: where,
                                        orderBy: sort === customer_inputs_1.VenueCustomerSort.NAME ? { name: 'asc' } : { createdAt: 'desc' },
                                        take: take,
                                        skip: skip,
                                    })];
                            }
                            conds = [client_1.Prisma.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["c.\"venueId\" = ", ""], ["c.\"venueId\" = ", ""])), input.venueId)];
                            search = (_d = input.search) === null || _d === void 0 ? void 0 : _d.trim();
                            if (search) {
                                like = "%".concat(search, "%");
                                conds.push(client_1.Prisma.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["(c.\"name\" ILIKE ", " OR c.\"phone\" ILIKE ", ")"], ["(c.\"name\" ILIKE ", " OR c.\"phone\" ILIKE ", ")"])), like, like));
                            }
                            if (input.kind)
                                conds.push(client_1.Prisma.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["c.\"kind\"::text = ", ""], ["c.\"kind\"::text = ", ""])), input.kind));
                            if (input.hasActiveMembership) {
                                conds.push(client_1.Prisma.sql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["EXISTS (SELECT 1 FROM \"subscriptions\" s WHERE s.\"customerId\" = c.id AND s.\"status\"::text IN ('SCHEDULED','ACTIVE','PAUSED'))"], ["EXISTS (SELECT 1 FROM \"subscriptions\" s WHERE s.\"customerId\" = c.id AND s.\"status\"::text IN ('SCHEDULED','ACTIVE','PAUSED'))"]))));
                            }
                            orderExpr = sort === customer_inputs_1.VenueCustomerSort.SPEND
                                ? client_1.Prisma.raw('COALESCE(SUM(b."amountPaid"), 0) DESC')
                                : client_1.Prisma.raw("MAX(b.\"startAt\") FILTER (WHERE b.\"startAt\" <= (now() AT TIME ZONE 'UTC')) DESC NULLS LAST");
                            return [4 /*yield*/, this.prisma.$queryRaw(client_1.Prisma.sql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n      SELECT c.id\n      FROM \"customers\" c\n      LEFT JOIN \"bookings\" b ON b.\"customerId\" = c.id AND b.\"status\"::text <> 'CANCELLED'\n      WHERE ", "\n      GROUP BY c.id\n      ORDER BY ", ", c.id ASC\n      LIMIT ", " OFFSET ", "\n    "], ["\n      SELECT c.id\n      FROM \"customers\" c\n      LEFT JOIN \"bookings\" b ON b.\"customerId\" = c.id AND b.\"status\"::text <> 'CANCELLED'\n      WHERE ", "\n      GROUP BY c.id\n      ORDER BY ", ", c.id ASC\n      LIMIT ", " OFFSET ", "\n    "])), client_1.Prisma.join(conds, ' AND '), orderExpr, take, skip))];
                        case 1:
                            ranked = _e.sent();
                            ids = ranked.map(function (r) { return r.id; });
                            if (ids.length === 0)
                                return [2 /*return*/, []];
                            return [4 /*yield*/, this.prisma.customer.findMany({ where: { id: { in: ids } } })];
                        case 2:
                            rows = _e.sent();
                            order = new Map(ids.map(function (id, i) { return [id, i]; }));
                            return [2 /*return*/, rows.sort(function (a, b) { var _a, _b; return ((_a = order.get(a.id)) !== null && _a !== void 0 ? _a : 0) - ((_b = order.get(b.id)) !== null && _b !== void 0 ? _b : 0); })];
                    }
                });
            });
        };
        /**
         * Lifetime amount paid (over all non-cancelled bookings) + last visit, keyed by customerId.
         * "Last visit" is the most recent booking that has actually STARTED (startAt ≤ now) — a
         * future reservation isn't a visit. The two metrics need different filters, so they're two
         * batched groupBys over the same id set.
         */
        CustomersRepository_1.prototype.spendAndLastVisitByCustomer = function (customerIds) {
            return __awaiter(this, void 0, void 0, function () {
                var now, _a, spendRows, visitRows, out, _i, spendRows_1, r, _b, visitRows_1, r, id, entry;
                var _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (customerIds.length === 0)
                                return [2 /*return*/, new Map()];
                            now = new Date();
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.booking.groupBy({
                                        by: ['customerId'],
                                        where: { customerId: { in: customerIds }, status: { not: client_1.BookingStatus.CANCELLED } },
                                        _sum: { amountPaid: true },
                                    }),
                                    this.prisma.booking.groupBy({
                                        by: ['customerId'],
                                        where: {
                                            customerId: { in: customerIds },
                                            status: { not: client_1.BookingStatus.CANCELLED },
                                            startAt: { lte: now },
                                        },
                                        _max: { startAt: true },
                                    }),
                                ])];
                        case 1:
                            _a = _g.sent(), spendRows = _a[0], visitRows = _a[1];
                            out = new Map();
                            for (_i = 0, spendRows_1 = spendRows; _i < spendRows_1.length; _i++) {
                                r = spendRows_1[_i];
                                out.set(r.customerId, {
                                    spent: Number((_d = (_c = r._sum.amountPaid) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '0'),
                                    lastVisit: null,
                                });
                            }
                            for (_b = 0, visitRows_1 = visitRows; _b < visitRows_1.length; _b++) {
                                r = visitRows_1[_b];
                                id = r.customerId;
                                entry = (_e = out.get(id)) !== null && _e !== void 0 ? _e : { spent: 0, lastVisit: null };
                                entry.lastVisit = (_f = r._max.startAt) !== null && _f !== void 0 ? _f : null;
                                out.set(id, entry);
                            }
                            return [2 /*return*/, out];
                    }
                });
            });
        };
        CustomersRepository_1.prototype.findOne = function (venueId, customerId) {
            return this.prisma.customer.findFirst({ where: { id: customerId, venueId: venueId } });
        };
        /**
         * A customer's bookings, most recent first, one page at a time — the detail
         * screen lists every game individually and a regular can have hundreds, so
         * the caller pages instead of taking a fixed slice. Total count comes from
         * the insights aggregate, which already scans the whole history.
         */
        CustomersRepository_1.prototype.customerBookings = function (venueId, customerId, limit, offset) {
            return this.prisma.booking.findMany({
                where: { venueId: venueId, customerId: customerId },
                include: { court: { include: { sport: true } }, extras: true },
                orderBy: { startAt: 'desc' },
                take: limit,
                skip: offset,
            });
        };
        /** A customer's memberships (most recent first) for the unified profile. */
        CustomersRepository_1.prototype.customerSubscriptions = function (venueId, customerId) {
            return this.prisma.subscription.findMany({
                where: { venueId: venueId, customerId: customerId },
                include: {
                    plan: true,
                    court: { select: { name: true } },
                    customer: { select: { name: true, phone: true } },
                    payments: { orderBy: { createdAt: 'desc' } },
                },
                orderBy: { createdAt: 'desc' },
            });
        };
        /**
         * Find a venue customer by phone (the dedupe key), or null. Used to reuse an
         * existing record instead of creating a duplicate.
         */
        CustomersRepository_1.prototype.findByPhone = function (venueId, phone) {
            return this.prisma.customer.findFirst({ where: { venueId: venueId, phone: (0, phone_util_1.phoneKey)(phone) } });
        };
        /**
         * The venue customer for an app player, creating one if absent — the single bridge
         * between an app `User` and a venue's CRM. Resolution order: by `userId` (already
         * linked) → by `phone` (claim an existing walk-in, linking `userId`) → create. Shared
         * by the player booking flow and membership subscribe so a player who books AND
         * subscribes reuses one record.
         */
        CustomersRepository_1.prototype.getOrCreateForUser = function (venueId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var linked, user, name, phone, byPhone, e_1, existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.customer.findFirst({ where: { venueId: venueId, userId: userId } })];
                        case 1:
                            linked = _a.sent();
                            if (linked)
                                return [2 /*return*/, linked];
                            return [4 /*yield*/, this.prisma.user.findUnique({
                                    where: { id: userId },
                                    select: { fullName: true, phoneNumber: true },
                                })];
                        case 2:
                            user = _a.sent();
                            name = normalizeName((user === null || user === void 0 ? void 0 : user.fullName) || 'Player');
                            phone = (user === null || user === void 0 ? void 0 : user.phoneNumber) ? (0, phone_util_1.phoneKey)(user.phoneNumber) : null;
                            if (!phone) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.prisma.customer.findFirst({ where: { venueId: venueId, phone: phone } })];
                        case 3:
                            byPhone = _a.sent();
                            // Claim an existing walk-in (or older row) for this user.
                            if (byPhone) {
                                return [2 /*return*/, byPhone.userId
                                        ? byPhone
                                        : this.prisma.customer.update({ where: { id: byPhone.id }, data: { userId: userId } })];
                            }
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 9]);
                            return [4 /*yield*/, this.prisma.customer.create({ data: { venueId: venueId, name: name, phone: phone, userId: userId } })];
                        case 5: return [2 /*return*/, _a.sent()];
                        case 6:
                            e_1 = _a.sent();
                            if (!(e_1 instanceof client_1.Prisma.PrismaClientKnownRequestError && e_1.code === 'P2002')) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.prisma.customer.findFirst({
                                    where: { venueId: venueId, OR: __spreadArray([{ userId: userId }], (phone ? [{ phone: phone }] : []), true) },
                                })];
                        case 7:
                            existing = _a.sent();
                            if (existing)
                                return [2 /*return*/, existing];
                            _a.label = 8;
                        case 8: throw e_1;
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * The venue customer for a desk walk-in, keyed by phone — reuse an existing record with
         * that phone (so repeat walk-ins merge into one customer) else create. The no-app-account
         * sibling of `getOrCreateForUser`; the caller only routes here when a phone is present
         * (a phoneless walk-in can't be deduped, so it stays inline on the booking).
         */
        CustomersRepository_1.prototype.getOrCreateForWalkIn = function (venueId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var name, phone, kind, existing, e_2, row;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            name = normalizeName(params.name || 'Walk-in');
                            phone = (0, phone_util_1.phoneKey)(params.phone);
                            kind = (_a = params.kind) !== null && _a !== void 0 ? _a : client_1.CustomerType.INDIVIDUAL;
                            return [4 /*yield*/, this.prisma.customer.findFirst({ where: { venueId: venueId, phone: phone } })];
                        case 1:
                            existing = _b.sent();
                            if (existing) {
                                // Promote a default INDIVIDUAL record when this booking is for a team/club — same
                                // rule as the backfill (never downgrade or reclassify an already-set TEAM/CLUB).
                                if (existing.kind === client_1.CustomerType.INDIVIDUAL && kind !== client_1.CustomerType.INDIVIDUAL) {
                                    return [2 /*return*/, this.prisma.customer.update({ where: { id: existing.id }, data: { kind: kind } })];
                                }
                                return [2 /*return*/, existing];
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 7]);
                            return [4 /*yield*/, this.prisma.customer.create({ data: { venueId: venueId, name: name, phone: phone, kind: kind } })];
                        case 3: return [2 /*return*/, _b.sent()];
                        case 4:
                            e_2 = _b.sent();
                            if (!(e_2 instanceof client_1.Prisma.PrismaClientKnownRequestError && e_2.code === 'P2002')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.customer.findFirst({ where: { venueId: venueId, phone: phone } })];
                        case 5:
                            row = _b.sent();
                            if (row)
                                return [2 /*return*/, row];
                            _b.label = 6;
                        case 6: throw e_2;
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        CustomersRepository_1.prototype.create = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var name, phone, existing, e_3, existing;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            name = normalizeName(input.name);
                            phone = input.phone ? (0, phone_util_1.phoneKey)(input.phone) : null;
                            if (!phone) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.prisma.customer.findFirst({
                                    where: { venueId: input.venueId, phone: phone },
                                })];
                        case 1:
                            existing = _b.sent();
                            if (existing)
                                return [2 /*return*/, existing];
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 8]);
                            return [4 /*yield*/, this.prisma.customer.create({
                                    data: { venueId: input.venueId, name: name, phone: phone, notes: (_a = input.notes) !== null && _a !== void 0 ? _a : null },
                                })];
                        case 3: return [2 /*return*/, _b.sent()];
                        case 4:
                            e_3 = _b.sent();
                            if (!(e_3 instanceof client_1.Prisma.PrismaClientKnownRequestError && e_3.code === 'P2002')) return [3 /*break*/, 7];
                            if (!phone) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.customer.findFirst({
                                    where: { venueId: input.venueId, phone: phone },
                                })];
                        case 5:
                            existing = _b.sent();
                            if (existing)
                                return [2 /*return*/, existing];
                            _b.label = 6;
                        case 6: throw new common_1.ConflictException('A customer with this phone already exists.');
                        case 7: throw e_3;
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        /** The venue's active individual loyalty offer (every-Nth), or null. */
        CustomersRepository_1.prototype.findLoyaltyOffer = function (venueId) {
            return this.prisma.offer.findFirst({
                where: __assign({ venueId: venueId, trigger: client_1.OfferTrigger.EVERY_NTH, everyGames: { not: null }, audience: { in: [client_1.OfferAudience.ALL, client_1.OfferAudience.INDIVIDUAL] } }, activeWindow(new Date())),
                orderBy: { createdAt: 'desc' },
            });
        };
        /** Completed-game counts keyed by customerId. */
        CustomersRepository_1.prototype.completedByCustomer = function (customerIds) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (customerIds.length === 0)
                                return [2 /*return*/, new Map()];
                            return [4 /*yield*/, this.prisma.booking.groupBy({
                                    by: ['customerId'],
                                    where: { customerId: { in: customerIds }, status: client_1.BookingStatus.COMPLETED },
                                    _count: { _all: true },
                                })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, new Map(rows.map(function (r) { return [r.customerId, r._count._all]; }))];
                    }
                });
            });
        };
        /** Free games already redeemed under a loyalty offer, keyed by customerId. */
        CustomersRepository_1.prototype.redeemedByCustomer = function (customerIds, offerId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (customerIds.length === 0)
                                return [2 /*return*/, new Map()];
                            return [4 /*yield*/, this.prisma.booking.groupBy({
                                    by: ['customerId'],
                                    where: {
                                        customerId: { in: customerIds },
                                        offerId: offerId,
                                        freeGame: true,
                                        status: { not: client_1.BookingStatus.CANCELLED },
                                    },
                                    _count: { _all: true },
                                })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, new Map(rows.map(function (r) { return [r.customerId, r._count._all]; }))];
                    }
                });
            });
        };
        return CustomersRepository_1;
    }());
    __setFunctionName(_classThis, "CustomersRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomersRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomersRepository = _classThis;
}();
exports.CustomersRepository = CustomersRepository;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
