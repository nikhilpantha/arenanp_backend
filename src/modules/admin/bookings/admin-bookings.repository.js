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
exports.AdminBookingsRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var admin_user_model_1 = require("../users/dto/admin-user.model");
var BOOKING_INCLUDES = {
    user: true,
    cancelledBy: true,
    venue: { select: { id: true, name: true, city: true } },
    court: {
        select: {
            id: true,
            name: true,
            pricePerHour: true,
            sport: { select: { id: true, slug: true, name: true, iconUrl: true } },
        },
    },
    payment: true,
    statusEvents: {
        include: { actor: true },
        orderBy: { createdAt: 'asc' },
    },
};
var AdminBookingsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminBookingsRepository = _classThis = /** @class */ (function () {
        function AdminBookingsRepository_1(prisma) {
            this.prisma = prisma;
        }
        AdminBookingsRepository_1.prototype.findById = function (id) {
            return this.prisma.booking.findUnique({ where: { id: id }, include: BOOKING_INCLUDES });
        };
        AdminBookingsRepository_1.prototype.listAndCount = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, direction, where, q, _a, items, total;
                var _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            direction = input.sortOrder === admin_user_model_1.SortOrder.ASC ? 'asc' : 'desc';
                            where = {};
                            if (input.status)
                                where.status = input.status;
                            if (input.venueId)
                                where.venueId = input.venueId;
                            if (input.sport)
                                where.court = { sportId: input.sport };
                            if (input.paymentProvider)
                                where.payment = { provider: input.paymentProvider };
                            if (input.fromDate || input.toDate) {
                                where.startAt = {};
                                if (input.fromDate)
                                    where.startAt.gte = input.fromDate;
                                if (input.toDate)
                                    where.startAt.lt = input.toDate;
                            }
                            if ((_f = input.search) === null || _f === void 0 ? void 0 : _f.trim()) {
                                q = input.search.trim();
                                where.OR = [
                                    { id: { contains: q, mode: 'insensitive' } },
                                    { venue: { name: { contains: q, mode: 'insensitive' } } },
                                    { user: { fullName: { contains: q, mode: 'insensitive' } } },
                                    { user: { phoneNumber: { contains: q, mode: 'insensitive' } } },
                                ];
                            }
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.booking.findMany({
                                        where: where,
                                        include: BOOKING_INCLUDES,
                                        orderBy: { startAt: direction },
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.booking.count({ where: where }),
                                ])];
                        case 1:
                            _a = _g.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        /**
         * Transition a booking's status and append an audit row to status_events.
         * Both writes go through `$transaction` so the timeline can never drift.
         */
        AdminBookingsRepository_1.prototype.transitionStatus = function (args) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var existing, data;
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, tx.booking.findUnique({
                                            where: { id: args.bookingId },
                                            select: { id: true, status: true },
                                        })];
                                    case 1:
                                        existing = _d.sent();
                                        if (!existing)
                                            throw new Error('Booking not found');
                                        data = {
                                            status: args.nextStatus,
                                        };
                                        if (args.nextStatus === client_1.BookingStatus.CANCELLED) {
                                            data.cancellationReason = (_a = args.cancellationReason) !== null && _a !== void 0 ? _a : null;
                                            data.cancelledBy = { connect: { id: args.actorId } };
                                            data.cancelledAt = new Date();
                                        }
                                        if (args.nextStatus === client_1.BookingStatus.COMPLETED) {
                                            data.completedAt = new Date();
                                        }
                                        return [4 /*yield*/, tx.booking.update({ where: { id: existing.id }, data: data })];
                                    case 2:
                                        _d.sent();
                                        return [4 /*yield*/, tx.bookingStatusEvent.create({
                                                data: {
                                                    bookingId: existing.id,
                                                    fromStatus: existing.status,
                                                    toStatus: args.nextStatus,
                                                    actorId: args.actorId,
                                                    note: (_c = (_b = args.note) !== null && _b !== void 0 ? _b : args.cancellationReason) !== null && _c !== void 0 ? _c : null,
                                                },
                                            })];
                                    case 3:
                                        _d.sent();
                                        return [2 /*return*/, tx.booking.findUniqueOrThrow({
                                                where: { id: existing.id },
                                                include: BOOKING_INCLUDES,
                                            })];
                                }
                            });
                        }); })];
                });
            });
        };
        return AdminBookingsRepository_1;
    }());
    __setFunctionName(_classThis, "AdminBookingsRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBookingsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBookingsRepository = _classThis;
}();
exports.AdminBookingsRepository = AdminBookingsRepository;
