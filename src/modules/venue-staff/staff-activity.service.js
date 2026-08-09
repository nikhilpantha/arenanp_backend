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
exports.StaffActivityService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var DEFAULT_DAYS = 30;
function num(value) {
    return value ? Number(value.toString()) : 0;
}
/**
 * Per-person accountability, read back out of columns that were already being
 * written.
 *
 * Everything is scoped to the venue as well as the person: someone who works
 * at two grounds must not have one owner's numbers leak into the other's
 * screen.
 */
var StaffActivityService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var StaffActivityService = _classThis = /** @class */ (function () {
        function StaffActivityService_1(prisma, staff) {
            this.prisma = prisma;
            this.staff = staff;
        }
        StaffActivityService_1.prototype.forMember = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var seat, to, from, window, userId, venueId, _a, created, cancelled, events, payments, cashDays, lastBooking, byStatus;
                var _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0: return [4 /*yield*/, this.staff.findSeat(input.venueId, input.membershipId)];
                        case 1:
                            seat = _j.sent();
                            if (!seat)
                                throw new common_1.NotFoundException('That person is not on this venue’s staff.');
                            to = (_b = input.to) !== null && _b !== void 0 ? _b : new Date();
                            from = (_c = input.from) !== null && _c !== void 0 ? _c : new Date(to.getTime() - DEFAULT_DAYS * 24 * 60 * 60 * 1000);
                            window = { gte: from, lt: to };
                            userId = seat.userId;
                            venueId = input.venueId;
                            return [4 /*yield*/, Promise.all([
                                    this.prisma.booking.aggregate({
                                        where: { venueId: venueId, createdById: userId, createdAt: window },
                                        _count: { _all: true },
                                        _sum: { discountAmount: true },
                                    }),
                                    this.prisma.booking.count({
                                        where: { venueId: venueId, cancelledById: userId, cancelledAt: window },
                                    }),
                                    this.prisma.bookingStatusEvent.groupBy({
                                        by: ['toStatus'],
                                        where: { actorId: userId, createdAt: window, booking: { venueId: venueId } },
                                        _count: { _all: true },
                                    }),
                                    this.prisma.bookingPayment.aggregate({
                                        where: { venueId: venueId, takenById: userId, takenAt: window },
                                        _sum: { amount: true },
                                        _count: { _all: true },
                                    }),
                                    this.prisma.cashReconciliation.count({
                                        where: { venueId: venueId, closedById: userId, closedAt: window },
                                    }),
                                    this.prisma.booking.findFirst({
                                        where: { venueId: venueId, createdById: userId },
                                        orderBy: { createdAt: 'desc' },
                                        select: { createdAt: true },
                                    }),
                                ])];
                        case 2:
                            _a = _j.sent(), created = _a[0], cancelled = _a[1], events = _a[2], payments = _a[3], cashDays = _a[4], lastBooking = _a[5];
                            byStatus = new Map(events.map(function (e) { return [e.toStatus, e._count._all]; }));
                            return [2 /*return*/, {
                                    membershipId: seat.id,
                                    fullName: (_d = seat.user.fullName) !== null && _d !== void 0 ? _d : undefined,
                                    from: from.toISOString().slice(0, 10),
                                    to: to.toISOString().slice(0, 10),
                                    bookingsCreated: created._count._all,
                                    bookingsCancelled: cancelled,
                                    noShowsMarked: (_e = byStatus.get(client_1.BookingStatus.NO_SHOW)) !== null && _e !== void 0 ? _e : 0,
                                    bookingsSettled: ((_f = byStatus.get(client_1.BookingStatus.CHECKED_IN)) !== null && _f !== void 0 ? _f : 0) +
                                        ((_g = byStatus.get(client_1.BookingStatus.COMPLETED)) !== null && _g !== void 0 ? _g : 0),
                                    paymentsTaken: num(payments._sum.amount),
                                    paymentCount: payments._count._all,
                                    discountsGiven: num(created._sum.discountAmount),
                                    cashDaysClosed: cashDays,
                                    lastActionAt: (_h = lastBooking === null || lastBooking === void 0 ? void 0 : lastBooking.createdAt) !== null && _h !== void 0 ? _h : undefined,
                                }];
                    }
                });
            });
        };
        return StaffActivityService_1;
    }());
    __setFunctionName(_classThis, "StaffActivityService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffActivityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffActivityService = _classThis;
}();
exports.StaffActivityService = StaffActivityService;
