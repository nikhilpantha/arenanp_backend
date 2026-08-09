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
exports.SubscriptionsService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var pagination_input_1 = require("../../common/dto/pagination.input");
var slots_util_1 = require("./slots.util");
var subscription_model_1 = require("./dto/subscription.model");
var SubscriptionsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SubscriptionsService = _classThis = /** @class */ (function () {
        function SubscriptionsService_1(repo, customers) {
            this.repo = repo;
            this.customers = customers;
        }
        // ─── Plans ──────────────────────────────────────────────────────────────────
        SubscriptionsService_1.prototype.listPlans = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, plans, counts;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                this.repo.listPlans(input),
                                this.repo.planCounts(input.venueId),
                            ])];
                        case 1:
                            _a = _b.sent(), plans = _a[0], counts = _a[1];
                            return [2 /*return*/, plans.map(function (p) { return (0, subscription_model_1.mapPlan)(p, counts.get(p.id)); })];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.createPlan = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var windows, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            windows = (0, slots_util_1.normaliseWindows)(input.windows);
                            input.daysOfWeek = (0, slots_util_1.normaliseDays)(input.daysOfWeek);
                            _a = subscription_model_1.mapPlan;
                            return [4 /*yield*/, this.repo.createPlan(input, windows)];
                        case 1: 
                        // Brand new, so nobody is on it — the zero counts from mapPlan are correct.
                        return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.updatePlan = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var plan, counts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Normalise the bands and days in place when they're being changed.
                            if (input.windows !== undefined)
                                input.windows = (0, slots_util_1.normaliseWindows)(input.windows);
                            if (input.daysOfWeek !== undefined)
                                input.daysOfWeek = (0, slots_util_1.normaliseDays)(input.daysOfWeek);
                            return [4 /*yield*/, this.repo.updatePlan(input)];
                        case 1:
                            plan = _a.sent();
                            return [4 /*yield*/, this.repo.planCounts(input.venueId)];
                        case 2:
                            counts = _a.sent();
                            return [2 /*return*/, (0, subscription_model_1.mapPlan)(plan, counts.get(plan.id))];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.deletePlan = function (venueId, planId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = subscription_model_1.mapPlan;
                            return [4 /*yield*/, this.repo.deletePlan(venueId, planId)];
                        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                    }
                });
            });
        };
        // ─── Subscriptions ────────────────────────────────────────────────────────────
        SubscriptionsService_1.prototype.listSubscriptions = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var now, page, pageSize, _a, items, total;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.reconcileStatuses(input.venueId, now)];
                        case 1:
                            _f.sent();
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            return [4 /*yield*/, this.repo.listSubscriptions(input, page, pageSize)];
                        case 2:
                            _a = _f.sent(), items = _a.items, total = _a.total;
                            return [2 /*return*/, {
                                    items: items.map(function (s) { return (0, subscription_model_1.mapSubscription)(s, now); }),
                                    pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, total),
                                }];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.getSubscription = function (venueId, subscriptionId) {
            return __awaiter(this, void 0, void 0, function () {
                var now, sub;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.reconcileStatuses(venueId, now)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.repo.findSubscription(venueId, subscriptionId)];
                        case 2:
                            sub = _a.sent();
                            if (!sub)
                                throw new common_1.NotFoundException('Subscription not found for this venue.');
                            return [2 /*return*/, (0, subscription_model_1.mapSubscription)(sub, now)];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.createSubscription = function (input, forceStatus) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, plan, court, customer, slotStart, startDate, endDate, now, sub;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.planCourtCustomer(input.venueId, input.planId, input.courtId, input.customerId)];
                        case 1:
                            _a = _b.sent(), plan = _a.plan, court = _a.court, customer = _a.customer;
                            if (!plan)
                                throw new common_1.NotFoundException('Membership plan not found for this venue.');
                            if (!plan.isActive)
                                throw new common_1.BadRequestException('This plan is no longer available.');
                            if (!court)
                                throw new common_1.NotFoundException('Court not found for this venue.');
                            if (!customer)
                                throw new common_1.NotFoundException('Customer not found for this venue.');
                            slotStart = (0, slots_util_1.assertSlotInWindows)(input.slotStart, plan.sessionMinutes, plan.windows);
                            startDate = input.startDate;
                            endDate = new Date(startDate);
                            endDate.setDate(endDate.getDate() + plan.validityDays);
                            return [4 /*yield*/, this.repo.slotConflict(input.courtId, slotStart, startDate, endDate)];
                        case 2:
                            if (_b.sent()) {
                                throw new common_1.BadRequestException('That court and time slot is already taken for these dates.');
                            }
                            now = new Date();
                            return [4 /*yield*/, this.repo.createSubscription(input, plan, slotStart, startDate, now, forceStatus)];
                        case 3:
                            sub = _b.sent();
                            return [2 /*return*/, (0, subscription_model_1.mapSubscription)(sub, now)];
                    }
                });
            });
        };
        /**
         * A player subscribes to a plan themselves: resolve (or create) their venue customer,
         * then run the same validation + create path.
         *
         * It lands as a PENDING request the venue approves, and no payment is recorded until
         * then — the player pays at the counter, and approval is where that gets written.
         */
        SubscriptionsService_1.prototype.createMySubscription = function (input, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var customer;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.customers.getOrCreateForUser(input.venueId, userId)];
                        case 1:
                            customer = _a.sent();
                            return [2 /*return*/, this.createSubscription(__assign(__assign({}, input), { customerId: customer.id }), client_1.SubscriptionStatus.PENDING)];
                    }
                });
            });
        };
        /** Daily slot starts ("HH:mm") already taken on a court over a date range (public). */
        SubscriptionsService_1.prototype.courtTakenSlots = function (courtId, startDate, endDate) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.takenSlotStarts(courtId, new Date(startDate), new Date(endDate))];
                });
            });
        };
        /** The signed-in player's subscriptions (across venues), mapped for the app. */
        SubscriptionsService_1.prototype.mySubscriptions = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var now, items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.mySubscriptions(userId)];
                        case 1:
                            items = _a.sent();
                            return [2 /*return*/, items.map(function (s) { return (0, subscription_model_1.mapSubscription)(s, now); })];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.renewSubscription = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var now, sub;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.renewSubscription(input, now)];
                        case 1:
                            sub = _a.sent();
                            return [2 /*return*/, (0, subscription_model_1.mapSubscription)(sub, now)];
                    }
                });
            });
        };
        SubscriptionsService_1.prototype.setStatus = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var now, sub;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.setStatus(input.venueId, input.subscriptionId, input.status, now)];
                        case 1:
                            sub = _a.sent();
                            return [2 /*return*/, (0, subscription_model_1.mapSubscription)(sub, now)];
                    }
                });
            });
        };
        /** Turn a player's request into a real membership and record what they paid. */
        SubscriptionsService_1.prototype.approveRequest = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var now, sub;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.approveRequest(input.venueId, input.subscriptionId, now, input.amountPaid, input.paymentMethod)];
                        case 1:
                            sub = _a.sent();
                            return [2 /*return*/, (0, subscription_model_1.mapSubscription)(sub, now)];
                    }
                });
            });
        };
        // ─── Stats ──────────────────────────────────────────────────────────────────
        /** `withMoney` reflects the caller's `finance:read`; see `BookingService.summary`. */
        SubscriptionsService_1.prototype.stats = function (venueId, withMoney) {
            return __awaiter(this, void 0, void 0, function () {
                var now, soonBefore, monthStart, _a, monthlyRevenue, counts;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.repo.reconcileStatuses(venueId, now)];
                        case 1:
                            _b.sent();
                            soonBefore = new Date(now);
                            soonBefore.setDate(soonBefore.getDate() + 7);
                            monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                            return [4 /*yield*/, this.repo.stats(venueId, now, soonBefore, monthStart)];
                        case 2:
                            _a = _b.sent(), monthlyRevenue = _a.monthlyRevenue, counts = __rest(_a, ["monthlyRevenue"]);
                            return [2 /*return*/, withMoney ? __assign(__assign({}, counts), { monthlyRevenue: monthlyRevenue }) : counts];
                    }
                });
            });
        };
        return SubscriptionsService_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsService = _classThis;
}();
exports.SubscriptionsService = SubscriptionsService;
