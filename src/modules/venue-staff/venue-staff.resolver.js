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
exports.VenueStaffResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var venue_staff_models_1 = require("./dto/venue-staff.models");
var staff_activity_model_1 = require("./dto/staff-activity.model");
/**
 * Managing who works at a venue. Every operation needs `staff:manage`, which
 * by the role table is the owner's alone — managers are deliberately excluded,
 * because staff and money-out are the two powers an owner will not delegate.
 *
 * The class-level guard covers every method; each still declares the exact
 * permission, since the guard is inert without one.
 */
var VenueStaffResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_staff_models_1.VenueStaffMember; }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _venueStaff_decorators;
    var _venueStaffLoginDomain_decorators;
    var _venueStaffLoginPreview_decorators;
    var _venueStaffActivity_decorators;
    var _createVenueStaff_decorators;
    var _updateVenueStaff_decorators;
    var _setVenueStaffStatus_decorators;
    var _removeVenueStaff_decorators;
    var _resetVenueStaffPassword_decorators;
    var VenueStaffResolver = _classThis = /** @class */ (function () {
        function VenueStaffResolver_1(service, activity) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.activity = activity;
        }
        VenueStaffResolver_1.prototype.venueStaff = function (venueId, actor) {
            return this.service.list(venueId, actor.id);
        };
        VenueStaffResolver_1.prototype.venueStaffLoginDomain = function (venueId) {
            return this.service.loginDomain(venueId);
        };
        VenueStaffResolver_1.prototype.venueStaffLoginPreview = function (input) {
            return this.service.preview(input);
        };
        VenueStaffResolver_1.prototype.venueStaffActivity = function (input) {
            return this.activity.forMember(input);
        };
        VenueStaffResolver_1.prototype.createVenueStaff = function (input, actor) {
            return this.service.create(input, actor.id);
        };
        VenueStaffResolver_1.prototype.updateVenueStaff = function (input, actor) {
            return this.service.update(input, actor.id);
        };
        VenueStaffResolver_1.prototype.setVenueStaffStatus = function (input, actor) {
            return this.service.setStatus(input, actor.id);
        };
        VenueStaffResolver_1.prototype.removeVenueStaff = function (input, actor) {
            return this.service.remove(input, actor.id);
        };
        VenueStaffResolver_1.prototype.resetVenueStaffPassword = function (input, actor) {
            return this.service.resetPassword(input, actor.id);
        };
        return VenueStaffResolver_1;
    }());
    __setFunctionName(_classThis, "VenueStaffResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueStaff_decorators = [(0, graphql_1.Query)(function () { return [venue_staff_models_1.VenueStaffMember]; }, {
                name: 'venueStaff',
                description: 'Everyone with a seat at this venue, owners first.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _venueStaffLoginDomain_decorators = [(0, graphql_1.Query)(function () { return String; }, {
                name: 'venueStaffLoginDomain',
                description: 'The email domain this venue\'s staff logins live under, e.g. "lumbini-futsal.arenanp.com".',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _venueStaffLoginPreview_decorators = [(0, graphql_1.Query)(function () { return venue_staff_models_1.StaffLoginPreview; }, {
                name: 'venueStaffLoginPreview',
                description: 'What the add-staff form would do as typed: the address that would be minted, and whether this mobile already belongs to someone.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _venueStaffActivity_decorators = [(0, graphql_1.Query)(function () { return staff_activity_model_1.StaffActivity; }, {
                name: 'venueStaffActivity',
                description: 'What one staff member did over a period — bookings created, cancellations, money taken, cash days closed. Read from columns already written on every action.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _createVenueStaff_decorators = [(0, graphql_1.Mutation)(function () { return venue_staff_models_1.CreateVenueStaffResult; }, {
                name: 'createVenueStaff',
                description: 'Add someone to the staff: mints a login for a new number, or (once confirmed) gives an existing Arena NP account a seat.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _updateVenueStaff_decorators = [(0, graphql_1.Mutation)(function () { return venue_staff_models_1.VenueStaffMember; }, {
                name: 'updateVenueStaff',
                description: "Change a staff member's role.",
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _setVenueStaffStatus_decorators = [(0, graphql_1.Mutation)(function () { return venue_staff_models_1.VenueStaffMember; }, {
                name: 'setVenueStaffStatus',
                description: 'Suspend a seat, or switch it back on. Takes effect on their very next request.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _removeVenueStaff_decorators = [(0, graphql_1.Mutation)(function () { return Boolean; }, {
                name: 'removeVenueStaff',
                description: 'Take away the seat. Everything they booked, took payment for or closed keeps their name.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        _resetVenueStaffPassword_decorators = [(0, graphql_1.Mutation)(function () { return venue_staff_models_1.StaffCredentials; }, {
                name: 'resetVenueStaffPassword',
                description: 'Issue a new starter password for a login this venue minted. Shown once. Not available for someone using their own Arena NP account.',
            }), (0, venue_permission_decorator_1.RequireVenuePermission)('staff:manage')];
        __esDecorate(_classThis, null, _venueStaff_decorators, { kind: "method", name: "venueStaff", static: false, private: false, access: { has: function (obj) { return "venueStaff" in obj; }, get: function (obj) { return obj.venueStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueStaffLoginDomain_decorators, { kind: "method", name: "venueStaffLoginDomain", static: false, private: false, access: { has: function (obj) { return "venueStaffLoginDomain" in obj; }, get: function (obj) { return obj.venueStaffLoginDomain; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueStaffLoginPreview_decorators, { kind: "method", name: "venueStaffLoginPreview", static: false, private: false, access: { has: function (obj) { return "venueStaffLoginPreview" in obj; }, get: function (obj) { return obj.venueStaffLoginPreview; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueStaffActivity_decorators, { kind: "method", name: "venueStaffActivity", static: false, private: false, access: { has: function (obj) { return "venueStaffActivity" in obj; }, get: function (obj) { return obj.venueStaffActivity; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createVenueStaff_decorators, { kind: "method", name: "createVenueStaff", static: false, private: false, access: { has: function (obj) { return "createVenueStaff" in obj; }, get: function (obj) { return obj.createVenueStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateVenueStaff_decorators, { kind: "method", name: "updateVenueStaff", static: false, private: false, access: { has: function (obj) { return "updateVenueStaff" in obj; }, get: function (obj) { return obj.updateVenueStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setVenueStaffStatus_decorators, { kind: "method", name: "setVenueStaffStatus", static: false, private: false, access: { has: function (obj) { return "setVenueStaffStatus" in obj; }, get: function (obj) { return obj.setVenueStaffStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeVenueStaff_decorators, { kind: "method", name: "removeVenueStaff", static: false, private: false, access: { has: function (obj) { return "removeVenueStaff" in obj; }, get: function (obj) { return obj.removeVenueStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetVenueStaffPassword_decorators, { kind: "method", name: "resetVenueStaffPassword", static: false, private: false, access: { has: function (obj) { return "resetVenueStaffPassword" in obj; }, get: function (obj) { return obj.resetVenueStaffPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueStaffResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueStaffResolver = _classThis;
}();
exports.VenueStaffResolver = VenueStaffResolver;
