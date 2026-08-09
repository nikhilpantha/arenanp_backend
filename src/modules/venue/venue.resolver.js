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
exports.VenueCourtResolver = exports.VenueResolver = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var venue_permission_decorator_1 = require("../../common/decorators/venue-permission.decorator");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var venue_amenity_model_1 = require("./dto/venue-amenity.model");
var venue_membership_model_1 = require("./dto/venue-membership.model");
var venue_model_1 = require("./dto/venue.model");
var VenueResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_model_1.VenueModel; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _coverImageUrl_decorators;
    var _imageUrls_decorators;
    var _documentUrls_decorators;
    var _venueAmenities_decorators;
    var _myVenues_decorators;
    var _myVenue_decorators;
    var _myVenueMemberships_decorators;
    var _submitVenue_decorators;
    var _updateVenueProfile_decorators;
    var _setVenueServices_decorators;
    var _updateCourt_decorators;
    var _addCourt_decorators;
    var _removeCourt_decorators;
    var VenueResolver = _classThis = /** @class */ (function () {
        function VenueResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        // The stored values are S3 object keys; presign them into download URLs on read.
        VenueResolver_1.prototype.coverImageUrl = function (venue) {
            return this.storage.getDownloadUrl(venue.coverImageUrl);
        };
        VenueResolver_1.prototype.imageUrls = function (venue) {
            return this.storage.getDownloadUrls(venue.imageUrls);
        };
        VenueResolver_1.prototype.documentUrls = function (venue) {
            return this.storage.getDownloadUrls(venue.documentUrls);
        };
        VenueResolver_1.prototype.venueAmenities = function () {
            return (0, venue_amenity_model_1.listVenueAmenities)();
        };
        VenueResolver_1.prototype.myVenues = function (user) {
            return this.service.myVenues(user.id);
        };
        VenueResolver_1.prototype.myVenue = function (venueId, user) {
            return this.service.myVenue(user.id, venueId);
        };
        VenueResolver_1.prototype.myVenueMemberships = function (user) {
            return this.service.myMemberships(user.id);
        };
        VenueResolver_1.prototype.submitVenue = function (input, user) {
            return this.service.submitVenue(user.id, input);
        };
        VenueResolver_1.prototype.updateVenueProfile = function (input) {
            return this.service.updateProfile(input);
        };
        VenueResolver_1.prototype.setVenueServices = function (input) {
            return this.service.setServices(input);
        };
        VenueResolver_1.prototype.updateCourt = function (input) {
            return this.service.updateCourt(input);
        };
        VenueResolver_1.prototype.addCourt = function (input) {
            return this.service.addCourt(input);
        };
        VenueResolver_1.prototype.removeCourt = function (input) {
            return this.service.removeCourt(input);
        };
        return VenueResolver_1;
    }());
    __setFunctionName(_classThis, "VenueResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _coverImageUrl_decorators = [(0, graphql_1.ResolveField)(function () { return String; }, { nullable: true })];
        _imageUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        _documentUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        _venueAmenities_decorators = [(0, graphql_1.Query)(function () { return [venue_amenity_model_1.VenueAmenityOption]; }, {
                name: 'venueAmenities',
                description: 'The closed catalogue of venue-wide amenities. Free text is not accepted — amenities are a marketplace filter, so clients must offer these and store the slug.',
            })];
        _myVenues_decorators = [(0, graphql_1.Query)(function () { return [venue_model_1.VenueModel]; }, {
                name: 'myVenues',
                description: 'Venues the signed-in user operates (any membership).',
            })];
        _myVenue_decorators = [(0, graphql_1.Query)(function () { return venue_model_1.VenueModel; }, {
                name: 'myVenue',
                description: 'A single venue the signed-in user is a member of.',
            })];
        _myVenueMemberships_decorators = [(0, graphql_1.Query)(function () { return [venue_membership_model_1.VenueMembershipModel]; }, {
                name: 'myVenueMemberships',
                description: "The signed-in user's venue seats, with effective permissions + listing status.",
            })];
        _submitVenue_decorators = [(0, graphql_1.Mutation)(function () { return venue_model_1.VenueModel; }, {
                name: 'submitVenue',
                description: 'Add a venue from the dashboard. Creates the venue as PENDING (a super admin must approve the listing before it goes live) + an OWNER membership + its courts/sports. Requires ≥1 sport with ≥1 court. The VENUE capability is granted at signup and untouched here.',
            })];
        _updateVenueProfile_decorators = [(0, graphql_1.Mutation)(function () { return venue_model_1.VenueModel; }, {
                name: 'updateVenueProfile',
                description: 'Update editable venue profile fields. Requires the venue:edit permission.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.edit')];
        _setVenueServices_decorators = [(0, graphql_1.Mutation)(function () { return venue_model_1.VenueModel; }, {
                name: 'setVenueServices',
                description: "Replace the venue's sports + courts wholesale — every court is deleted and recreated, taking its bookings with it. Setup only. To change a live venue's courts use addCourt / updateCourt / removeCourt. Requires the venue:edit permission.",
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue.edit')];
        _updateCourt_decorators = [(0, graphql_1.Mutation)(function () { return venue_model_1.VenueCourt; }, {
                name: 'updateCourt',
                description: 'Change one court in place — price, slot length, attributes, or whether it takes bookings. A new price applies to bookings made from now on; bookings already taken keep the price they were booked at, so past takings and Finance are untouched. Requires the venue:edit permission.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue:edit')];
        _addCourt_decorators = [(0, graphql_1.Mutation)(function () { return venue_model_1.VenueModel; }, {
                name: 'addCourt',
                description: 'Add one court to an existing venue without disturbing the others. Requires the venue:edit permission.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue:edit')];
        _removeCourt_decorators = [(0, graphql_1.Mutation)(function () { return venue_model_1.VenueModel; }, {
                name: 'removeCourt',
                description: 'Delete a court. Refused once it has bookings or memberships — those cascade, so removing it would erase the income it earned. Switch the court off instead. Requires the venue:edit permission.',
            }), (0, common_1.UseGuards)(venue_permission_guard_1.VenuePermissionGuard), (0, venue_permission_decorator_1.RequireVenuePermission)('venue:edit')];
        __esDecorate(_classThis, null, _coverImageUrl_decorators, { kind: "method", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _imageUrls_decorators, { kind: "method", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _documentUrls_decorators, { kind: "method", name: "documentUrls", static: false, private: false, access: { has: function (obj) { return "documentUrls" in obj; }, get: function (obj) { return obj.documentUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _venueAmenities_decorators, { kind: "method", name: "venueAmenities", static: false, private: false, access: { has: function (obj) { return "venueAmenities" in obj; }, get: function (obj) { return obj.venueAmenities; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _myVenues_decorators, { kind: "method", name: "myVenues", static: false, private: false, access: { has: function (obj) { return "myVenues" in obj; }, get: function (obj) { return obj.myVenues; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _myVenue_decorators, { kind: "method", name: "myVenue", static: false, private: false, access: { has: function (obj) { return "myVenue" in obj; }, get: function (obj) { return obj.myVenue; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _myVenueMemberships_decorators, { kind: "method", name: "myVenueMemberships", static: false, private: false, access: { has: function (obj) { return "myVenueMemberships" in obj; }, get: function (obj) { return obj.myVenueMemberships; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _submitVenue_decorators, { kind: "method", name: "submitVenue", static: false, private: false, access: { has: function (obj) { return "submitVenue" in obj; }, get: function (obj) { return obj.submitVenue; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateVenueProfile_decorators, { kind: "method", name: "updateVenueProfile", static: false, private: false, access: { has: function (obj) { return "updateVenueProfile" in obj; }, get: function (obj) { return obj.updateVenueProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _setVenueServices_decorators, { kind: "method", name: "setVenueServices", static: false, private: false, access: { has: function (obj) { return "setVenueServices" in obj; }, get: function (obj) { return obj.setVenueServices; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateCourt_decorators, { kind: "method", name: "updateCourt", static: false, private: false, access: { has: function (obj) { return "updateCourt" in obj; }, get: function (obj) { return obj.updateCourt; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _addCourt_decorators, { kind: "method", name: "addCourt", static: false, private: false, access: { has: function (obj) { return "addCourt" in obj; }, get: function (obj) { return obj.addCourt; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _removeCourt_decorators, { kind: "method", name: "removeCourt", static: false, private: false, access: { has: function (obj) { return "removeCourt" in obj; }, get: function (obj) { return obj.removeCourt; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueResolver = _classThis;
}();
exports.VenueResolver = VenueResolver;
/** Presigns court image keys into download URLs wherever a VenueCourt is returned. */
var VenueCourtResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_model_1.VenueCourt; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _imageUrls_decorators;
    var VenueCourtResolver = _classThis = /** @class */ (function () {
        function VenueCourtResolver_1(storage) {
            this.storage = (__runInitializers(this, _instanceExtraInitializers), storage);
        }
        VenueCourtResolver_1.prototype.imageUrls = function (court) {
            return this.storage.getDownloadUrls(court.imageUrls);
        };
        return VenueCourtResolver_1;
    }());
    __setFunctionName(_classThis, "VenueCourtResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _imageUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        __esDecorate(_classThis, null, _imageUrls_decorators, { kind: "method", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueCourtResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueCourtResolver = _classThis;
}();
exports.VenueCourtResolver = VenueCourtResolver;
