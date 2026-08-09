"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerBookingResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var capability_decorator_1 = require("../../common/decorators/capability.decorator");
var player_booking_model_1 = require("./dto/player-booking.model");
/**
 * Player-side booking: browse-then-book lands here. Gated by the PLAYER capability
 * (CapabilityGuard is global, so the decorator alone enforces it). A single court
 * booking confirms instantly (pay at the venue) — no owner approval; memberships and
 * tournament events are the request-approved flows.
 */
var PlayerBookingResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return player_booking_model_1.PlayerBookingModel; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _myBookings_decorators;
    var _createBooking_decorators;
    var _cancelMyBooking_decorators;
    var PlayerBookingResolver = _classThis = /** @class */ (function () {
        function PlayerBookingResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        PlayerBookingResolver_1.prototype.myBookings = function (input, user) {
            return this.service.myBookings(input, user.id);
        };
        PlayerBookingResolver_1.prototype.createBooking = function (input, user) {
            return this.service.createBooking(input, user.id);
        };
        PlayerBookingResolver_1.prototype.cancelMyBooking = function (input, user) {
            return this.service.cancelMyBooking(input, user.id);
        };
        return PlayerBookingResolver_1;
    }());
    __setFunctionName(_classThis, "PlayerBookingResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _myBookings_decorators = [(0, graphql_1.Query)(function () { return player_booking_model_1.PaginatedPlayerBookings; }, {
                name: 'myBookings',
                description: "The signed-in player's bookings, most recent first.",
            }), (0, capability_decorator_1.RequireCapability)(client_1.CapabilityType.PLAYER)];
        _createBooking_decorators = [(0, graphql_1.Mutation)(function () { return player_booking_model_1.PlayerBookingModel; }, {
                name: 'createBooking',
                description: 'Book a court slot as a player. Confirms instantly — pay at the venue.',
            }), (0, capability_decorator_1.RequireCapability)(client_1.CapabilityType.PLAYER)];
        _cancelMyBooking_decorators = [(0, graphql_1.Mutation)(function () { return player_booking_model_1.PlayerBookingModel; }, {
                name: 'cancelMyBooking',
                description: 'Cancel one of your own bookings (only before it reaches a terminal state).',
            }), (0, capability_decorator_1.RequireCapability)(client_1.CapabilityType.PLAYER)];
        __esDecorate(_classThis, null, _myBookings_decorators, { kind: "method", name: "myBookings", static: false, private: false, access: { has: function (obj) { return "myBookings" in obj; }, get: function (obj) { return obj.myBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createBooking_decorators, { kind: "method", name: "createBooking", static: false, private: false, access: { has: function (obj) { return "createBooking" in obj; }, get: function (obj) { return obj.createBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancelMyBooking_decorators, { kind: "method", name: "cancelMyBooking", static: false, private: false, access: { has: function (obj) { return "cancelMyBooking" in obj; }, get: function (obj) { return obj.cancelMyBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlayerBookingResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlayerBookingResolver = _classThis;
}();
exports.PlayerBookingResolver = PlayerBookingResolver;
