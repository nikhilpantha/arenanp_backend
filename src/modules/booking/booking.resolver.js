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
exports.BookingResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var venue_access_decorator_1 = require("../../common/decorators/venue-access.decorator");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var booking_summary_model_1 = require("./dto/booking-summary.model");
var booking_model_1 = require("./dto/booking.model");
var BookingResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return booking_model_1.BookingModel; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venueBookings_decorators;
    var _venueBookingSummary_decorators;
    var _venueBooking_decorators;
    var _createVenueBooking_decorators;
    var _updateVenueBooking_decorators;
    var _setVenueBookingStatus_decorators;
    var _completeVenueBooking_decorators;
    var _recordVenueBookingPayment_decorators;
    var _acceptVenueBooking_decorators;
    var _declineVenueBooking_decorators;
    var BookingResolver = _classThis = /** @class */ (function () {
        function BookingResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        BookingResolver_1.prototype.venueBookings = function (input) {
            return this.service.list(input);
        };
        BookingResolver_1.prototype.venueBookingSummary = function (venueId, access) {
            return this.service.summary(venueId, (0, venue_access_decorator_1.canRead)(access, 'finance:read'));
        };
        BookingResolver_1.prototype.venueBooking = function (venueId, bookingId) {
            return this.service.getOne(venueId, bookingId);
        };
        BookingResolver_1.prototype.createVenueBooking = function (input, user) {
            return this.service.create(input, user.id);
        };
        BookingResolver_1.prototype.updateVenueBooking = function (input) {
            return this.service.update(input);
        };
        BookingResolver_1.prototype.setVenueBookingStatus = function (input, user) {
            return this.service.setStatus(input, user.id);
        };
        BookingResolver_1.prototype.completeVenueBooking = function (input, user) {
            return this.service.complete(input, user.id);
        };
        BookingResolver_1.prototype.recordVenueBookingPayment = function (input, user) {
            return this.service.recordPayment(input, user.id);
        };
        BookingResolver_1.prototype.acceptVenueBooking = function (input, user) {
            return this.service.acceptBooking(input, user.id);
        };
        BookingResolver_1.prototype.declineVenueBooking = function (input, user) {
            return this.service.declineBooking(input, user.id);
        };
        return BookingResolver_1;
    }());
    __setFunctionName(_classThis, "BookingResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueBookings_decorators = [(0, graphql_1.Query)(function () { return [booking_model_1.BookingModel]; }, {
                name: 'venueBookings',
                description: 'Bookings for a venue, filtered by scope (today/upcoming) or a specific date.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _venueBookingSummary_decorators = [(0, graphql_1.Query)(function () { return booking_summary_model_1.VenueBookingSummary; }, {
                name: 'venueBookingSummary',
                description: "Today's booking overview numbers for a venue. `revenueToday` is omitted unless the caller holds 'finance:read'.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _venueBooking_decorators = [(0, graphql_1.Query)(function () { return booking_model_1.BookingModel; }, { name: 'venueBooking', description: 'A single booking by id.' }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.view')];
        _createVenueBooking_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'createVenueBooking',
                description: 'Create a walk-in / manual booking from the venue panel.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        _updateVenueBooking_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'updateVenueBooking',
                description: 'Edit a pending booking — reschedule (court/time/duration) and/or its customer.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        _setVenueBookingStatus_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'setVenueBookingStatus',
                description: 'Check in / complete / no-show / cancel a booking (writes a status event).',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        _completeVenueBooking_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'completeVenueBooking',
                description: 'Complete a booking with add-on extras and final payment (writes a status event).',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        _recordVenueBookingPayment_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'recordVenueBookingPayment',
                description: 'Update a booking’s payment state (paid / pending / partial).',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        _acceptVenueBooking_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'acceptVenueBooking',
                description: 'Accept (confirm) a pending online booking. Legacy: player court bookings now confirm ' +
                    'instantly, so this only applies to remaining PENDING_PAYMENT rows.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        _declineVenueBooking_decorators = [(0, graphql_1.Mutation)(function () { return booking_model_1.BookingModel; }, {
                name: 'declineVenueBooking',
                description: 'Decline (cancel) a pending online booking. Legacy: player court bookings now confirm ' +
                    'instantly, so this only applies to remaining PENDING_PAYMENT rows.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.bookings.manage')];
        __esDecorate(_classThis, null, _venueBookings_decorators, { kind: "method", name: "venueBookings", static: false, private: false, access: { has: function (obj) { return "venueBookings" in obj; }, get: function (obj) { return obj.venueBookings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueBookingSummary_decorators, { kind: "method", name: "venueBookingSummary", static: false, private: false, access: { has: function (obj) { return "venueBookingSummary" in obj; }, get: function (obj) { return obj.venueBookingSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueBooking_decorators, { kind: "method", name: "venueBooking", static: false, private: false, access: { has: function (obj) { return "venueBooking" in obj; }, get: function (obj) { return obj.venueBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createVenueBooking_decorators, { kind: "method", name: "createVenueBooking", static: false, private: false, access: { has: function (obj) { return "createVenueBooking" in obj; }, get: function (obj) { return obj.createVenueBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateVenueBooking_decorators, { kind: "method", name: "updateVenueBooking", static: false, private: false, access: { has: function (obj) { return "updateVenueBooking" in obj; }, get: function (obj) { return obj.updateVenueBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setVenueBookingStatus_decorators, { kind: "method", name: "setVenueBookingStatus", static: false, private: false, access: { has: function (obj) { return "setVenueBookingStatus" in obj; }, get: function (obj) { return obj.setVenueBookingStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _completeVenueBooking_decorators, { kind: "method", name: "completeVenueBooking", static: false, private: false, access: { has: function (obj) { return "completeVenueBooking" in obj; }, get: function (obj) { return obj.completeVenueBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _recordVenueBookingPayment_decorators, { kind: "method", name: "recordVenueBookingPayment", static: false, private: false, access: { has: function (obj) { return "recordVenueBookingPayment" in obj; }, get: function (obj) { return obj.recordVenueBookingPayment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _acceptVenueBooking_decorators, { kind: "method", name: "acceptVenueBooking", static: false, private: false, access: { has: function (obj) { return "acceptVenueBooking" in obj; }, get: function (obj) { return obj.acceptVenueBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _declineVenueBooking_decorators, { kind: "method", name: "declineVenueBooking", static: false, private: false, access: { has: function (obj) { return "declineVenueBooking" in obj; }, get: function (obj) { return obj.declineVenueBooking; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingResolver = _classThis;
}();
exports.BookingResolver = BookingResolver;
