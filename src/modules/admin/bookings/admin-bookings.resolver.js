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
exports.AdminBookingsResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_booking_model_1 = require("./dto/admin-booking.model");
var list_admin_bookings_input_1 = require("./dto/list-admin-bookings.input");
var paginated_admin_bookings_1 = require("./dto/paginated-admin-bookings");
var AdminBookingsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_booking_model_1.AdminBooking; }), (0, require_permission_decorator_1.RequirePermission)('bookings.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _list_decorators;
    var _detail_decorators;
    var _cancel_decorators;
    var _complete_decorators;
    var AdminBookingsResolver = _classThis = /** @class */ (function () {
        function AdminBookingsResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        AdminBookingsResolver_1.prototype.list = function (input) {
            return this.service.list(input !== null && input !== void 0 ? input : new list_admin_bookings_input_1.ListAdminBookingsInput());
        };
        AdminBookingsResolver_1.prototype.detail = function (id) {
            return this.service.getOne(id);
        };
        AdminBookingsResolver_1.prototype.cancel = function (input, actor) {
            return this.service.cancel(input, actor);
        };
        AdminBookingsResolver_1.prototype.complete = function (input, actor) {
            return this.service.markCompleted(input, actor);
        };
        return AdminBookingsResolver_1;
    }());
    __setFunctionName(_classThis, "AdminBookingsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _list_decorators = [(0, graphql_1.Query)(function () { return paginated_admin_bookings_1.PaginatedAdminBookings; }, {
                name: 'adminListBookings',
                description: 'List bookings with date / venue / sport / status / payment-provider filters.',
            })];
        _detail_decorators = [(0, graphql_1.Query)(function () { return admin_booking_model_1.AdminBooking; }, {
                name: 'adminBookingDetail',
                description: 'Full detail for a single booking — user, venue, court, payment and timeline.',
            })];
        _cancel_decorators = [(0, require_permission_decorator_1.RequirePermission)('bookings.cancel'), (0, graphql_1.Mutation)(function () { return admin_booking_model_1.AdminBooking; }, {
                name: 'adminCancelBooking',
                description: 'Cancel a booking on the user’s behalf. A reason is required.',
            })];
        _complete_decorators = [(0, require_permission_decorator_1.RequirePermission)('bookings.edit'), (0, graphql_1.Mutation)(function () { return admin_booking_model_1.AdminBooking; }, {
                name: 'adminMarkBookingCompleted',
                description: 'Mark a paid / CONFIRMED booking as COMPLETED.',
            })];
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _detail_decorators, { kind: "method", name: "detail", static: false, private: false, access: { has: function (obj) { return "detail" in obj; }, get: function (obj) { return obj.detail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _cancel_decorators, { kind: "method", name: "cancel", static: false, private: false, access: { has: function (obj) { return "cancel" in obj; }, get: function (obj) { return obj.cancel; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _complete_decorators, { kind: "method", name: "complete", static: false, private: false, access: { has: function (obj) { return "complete" in obj; }, get: function (obj) { return obj.complete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminBookingsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminBookingsResolver = _classThis;
}();
exports.AdminBookingsResolver = AdminBookingsResolver;
