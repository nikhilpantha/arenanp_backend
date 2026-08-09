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
exports.DiscoveryService = void 0;
var common_1 = require("@nestjs/common");
var pagination_input_1 = require("../../common/dto/pagination.input");
var nepal_time_1 = require("../../common/utils/nepal-time");
var venue_card_model_1 = require("./dto/venue-card.model");
var venue_detail_model_1 = require("./dto/venue-detail.model");
var DAY_MS = 24 * 60 * 60000;
var DiscoveryService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DiscoveryService = _classThis = /** @class */ (function () {
        function DiscoveryService_1(repo) {
            this.repo = repo;
        }
        DiscoveryService_1.prototype.browseVenues = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, _a, items, total;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            return [4 /*yield*/, this.repo.browseVenues(input, page, pageSize)];
                        case 1:
                            _a = _f.sent(), items = _a.items, total = _a.total;
                            return [2 /*return*/, { items: items.map(venue_card_model_1.mapVenueCard), pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, total) }];
                    }
                });
            });
        };
        DiscoveryService_1.prototype.venueDetail = function (venueId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.venueDetail(venueId)];
                        case 1:
                            row = _a.sent();
                            if (!row)
                                throw new common_1.NotFoundException('Venue not found.');
                            return [2 /*return*/, (0, venue_detail_model_1.mapVenueDetail)(row)];
                    }
                });
            });
        };
        /**
         * Generate the bookable slots for a court on a venue-local day: walk the venue's
         * operating window in `slotMinutes` steps (converting each boundary from Nepal wall
         * time to UTC), then flag any slot that overlaps an existing booking or is in the past.
         */
        DiscoveryService_1.prototype.courtSlots = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var court, slotMinutes, pricePerHour, openMin, closeMin, slotPrice, dayStart, dayEnd, _a, bookings, closures, now, slots, _loop_1, start;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.courtForSlots(input.courtId)];
                        case 1:
                            court = _b.sent();
                            if (!court)
                                throw new common_1.NotFoundException('Court not found.');
                            slotMinutes = court.slotMinutes;
                            pricePerHour = Number(court.pricePerHour.toString());
                            openMin = (0, nepal_time_1.parseHHmmToMinutes)(court.venue.openTime);
                            closeMin = (0, nepal_time_1.parseHHmmToMinutes)(court.venue.closeTime);
                            slotPrice = Math.round((pricePerHour * slotMinutes) / 60);
                            dayStart = (0, nepal_time_1.nepalWallTimeToUtc)(input.date, 0);
                            dayEnd = new Date(dayStart.getTime() + DAY_MS);
                            return [4 /*yield*/, Promise.all([
                                    this.repo.bookingsForCourtInRange(input.courtId, dayStart, dayEnd),
                                    this.repo.closuresForCourtInRange(court.venueId, input.courtId, dayStart, dayEnd),
                                ])];
                        case 2:
                            _a = _b.sent(), bookings = _a[0], closures = _a[1];
                            now = Date.now();
                            slots = [];
                            _loop_1 = function (start) {
                                var startAt = (0, nepal_time_1.nepalWallTimeToUtc)(input.date, start);
                                var endAt = (0, nepal_time_1.nepalWallTimeToUtc)(input.date, start + slotMinutes);
                                var booked = bookings.some(function (b) { return b.startAt < endAt && b.endAt > startAt; });
                                var closed_1 = closures.some(function (c) { return c.startAt < endAt && c.endAt > startAt; });
                                slots.push({
                                    startAt: startAt,
                                    endAt: endAt,
                                    available: !booked && !closed_1 && startAt.getTime() > now,
                                    price: slotPrice,
                                });
                            };
                            for (start = openMin; start + slotMinutes <= closeMin; start += slotMinutes) {
                                _loop_1(start);
                            }
                            return [2 /*return*/, { courtId: court.id, date: input.date, slotMinutes: slotMinutes, slots: slots }];
                    }
                });
            });
        };
        return DiscoveryService_1;
    }());
    __setFunctionName(_classThis, "DiscoveryService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DiscoveryService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DiscoveryService = _classThis;
}();
exports.DiscoveryService = DiscoveryService;
