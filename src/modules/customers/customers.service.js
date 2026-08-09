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
exports.CustomersService = void 0;
var common_1 = require("@nestjs/common");
var booking_model_1 = require("../booking/dto/booking.model");
var loyalty_util_1 = require("../offers/loyalty.util");
var subscription_model_1 = require("../subscriptions/dto/subscription.model");
var customer_model_1 = require("./dto/customer.model");
var CustomersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var CustomersService = _classThis = /** @class */ (function () {
        function CustomersService_1(repo) {
            this.repo = repo;
        }
        CustomersService_1.prototype.listVenueCustomers = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var customers, ids, offer, every, _a, completed, redeemed, spend;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.repo.listVenueCustomers(input)];
                        case 1:
                            customers = _c.sent();
                            ids = customers.map(function (c) { return c.id; });
                            return [4 /*yield*/, this.repo.findLoyaltyOffer(input.venueId)];
                        case 2:
                            offer = _c.sent();
                            every = (_b = offer === null || offer === void 0 ? void 0 : offer.everyGames) !== null && _b !== void 0 ? _b : null;
                            return [4 /*yield*/, Promise.all([
                                    this.repo.completedByCustomer(ids),
                                    offer && every ? this.repo.redeemedByCustomer(ids, offer.id) : Promise.resolve(new Map()),
                                    this.repo.spendAndLastVisitByCustomer(ids),
                                ])];
                        case 3:
                            _a = _c.sent(), completed = _a[0], redeemed = _a[1], spend = _a[2];
                            return [2 /*return*/, customers.map(function (c) {
                                    var _a, _b, _c, _d;
                                    var played = (_a = completed.get(c.id)) !== null && _a !== void 0 ? _a : 0;
                                    var ready = every
                                        ? (0, loyalty_util_1.computeLoyaltyReadiness)(every, played, (_b = redeemed.get(c.id)) !== null && _b !== void 0 ? _b : 0).ready
                                        : false;
                                    var s = spend.get(c.id);
                                    return (0, customer_model_1.mapCustomer)(c, played, ready, (_c = s === null || s === void 0 ? void 0 : s.spent) !== null && _c !== void 0 ? _c : 0, (_d = s === null || s === void 0 ? void 0 : s.lastVisit) !== null && _d !== void 0 ? _d : null);
                                })];
                    }
                });
            });
        };
        CustomersService_1.prototype.getOne = function (venueId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var customer, offer, every, _a, completed, redeemed, spend, played, ready, s;
                var _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4 /*yield*/, this.repo.findOne(venueId, customerId)];
                        case 1:
                            customer = _g.sent();
                            if (!customer)
                                throw new common_1.NotFoundException('Customer not found for this venue.');
                            return [4 /*yield*/, this.repo.findLoyaltyOffer(venueId)];
                        case 2:
                            offer = _g.sent();
                            every = (_b = offer === null || offer === void 0 ? void 0 : offer.everyGames) !== null && _b !== void 0 ? _b : null;
                            return [4 /*yield*/, Promise.all([
                                    this.repo.completedByCustomer([customer.id]),
                                    offer && every
                                        ? this.repo.redeemedByCustomer([customer.id], offer.id)
                                        : Promise.resolve(new Map()),
                                    this.repo.spendAndLastVisitByCustomer([customer.id]),
                                ])];
                        case 3:
                            _a = _g.sent(), completed = _a[0], redeemed = _a[1], spend = _a[2];
                            played = (_c = completed.get(customer.id)) !== null && _c !== void 0 ? _c : 0;
                            ready = every
                                ? (0, loyalty_util_1.computeLoyaltyReadiness)(every, played, (_d = redeemed.get(customer.id)) !== null && _d !== void 0 ? _d : 0).ready
                                : false;
                            s = spend.get(customer.id);
                            return [2 /*return*/, (0, customer_model_1.mapCustomer)(customer, played, ready, (_e = s === null || s === void 0 ? void 0 : s.spent) !== null && _e !== void 0 ? _e : 0, (_f = s === null || s === void 0 ? void 0 : s.lastVisit) !== null && _f !== void 0 ? _f : null)];
                    }
                });
            });
        };
        CustomersService_1.prototype.create = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = customer_model_1.mapCustomer;
                            return [4 /*yield*/, this.repo.create(input)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent(), 0, false])];
                    }
                });
            });
        };
        CustomersService_1.prototype.getCustomerBookings = function (venueId_1, customerId_1) {
            return __awaiter(this, arguments, void 0, function (venueId, customerId, limit, offset) {
                var rows;
                if (limit === void 0) { limit = 50; }
                if (offset === void 0) { offset = 0; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.customerBookings(venueId, customerId, limit, offset)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(booking_model_1.mapBookingToGraphql)];
                    }
                });
            });
        };
        CustomersService_1.prototype.getCustomerSubscriptions = function (venueId, customerId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows, now;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.customerSubscriptions(venueId, customerId)];
                        case 1:
                            rows = _a.sent();
                            now = new Date();
                            return [2 /*return*/, rows.map(function (s) { return (0, subscription_model_1.mapSubscription)(s, now); })];
                    }
                });
            });
        };
        return CustomersService_1;
    }());
    __setFunctionName(_classThis, "CustomersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CustomersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CustomersService = _classThis;
}();
exports.CustomersService = CustomersService;
