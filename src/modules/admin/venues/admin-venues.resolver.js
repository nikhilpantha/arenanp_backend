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
exports.AdminCourtResolver = exports.AdminVenuesResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_venue_model_1 = require("./dto/admin-venue.model");
var list_admin_venues_input_1 = require("./dto/list-admin-venues.input");
var paginated_admin_venues_1 = require("./dto/paginated-admin-venues");
var AdminVenuesResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_venue_model_1.AdminVenue; }), (0, require_permission_decorator_1.RequirePermission)('venues.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _coverImageUrl_decorators;
    var _imageUrls_decorators;
    var _documentUrls_decorators;
    var _list_decorators;
    var _detail_decorators;
    var _approve_decorators;
    var _reject_decorators;
    var _suspend_decorators;
    var _feature_decorators;
    var _unfeature_decorators;
    var _updateStatus_decorators;
    var AdminVenuesResolver = _classThis = /** @class */ (function () {
        function AdminVenuesResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        // The stored values are S3 object keys; presign them into download URLs on read.
        AdminVenuesResolver_1.prototype.coverImageUrl = function (venue) {
            return this.storage.getDownloadUrl(venue.coverImageUrl);
        };
        AdminVenuesResolver_1.prototype.imageUrls = function (venue) {
            return this.storage.getDownloadUrls(venue.imageUrls);
        };
        AdminVenuesResolver_1.prototype.documentUrls = function (venue) {
            return this.storage.getDownloadUrls(venue.documentUrls);
        };
        AdminVenuesResolver_1.prototype.list = function (input) {
            return this.service.list(input !== null && input !== void 0 ? input : new list_admin_venues_input_1.ListAdminVenuesInput());
        };
        AdminVenuesResolver_1.prototype.detail = function (id) {
            return this.service.getOne(id);
        };
        AdminVenuesResolver_1.prototype.approve = function (venueId, actor) {
            return this.service.approve(venueId, actor);
        };
        AdminVenuesResolver_1.prototype.reject = function (input, actor) {
            return this.service.reject(input, actor);
        };
        AdminVenuesResolver_1.prototype.suspend = function (input, actor) {
            return this.service.suspend(input, actor);
        };
        AdminVenuesResolver_1.prototype.feature = function (venueId) {
            return this.service.setFeatured(venueId, true);
        };
        AdminVenuesResolver_1.prototype.unfeature = function (venueId) {
            return this.service.setFeatured(venueId, false);
        };
        AdminVenuesResolver_1.prototype.updateStatus = function (input, actor) {
            return this.service.updateVerificationStatus(input, actor);
        };
        return AdminVenuesResolver_1;
    }());
    __setFunctionName(_classThis, "AdminVenuesResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _coverImageUrl_decorators = [(0, graphql_1.ResolveField)(function () { return String; }, { nullable: true })];
        _imageUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        _documentUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        _list_decorators = [(0, graphql_1.Query)(function () { return paginated_admin_venues_1.PaginatedAdminVenues; }, {
                name: 'adminListVenues',
                description: 'List venues with pagination, search, and city / sport / status / featured filters.',
            })];
        _detail_decorators = [(0, graphql_1.Query)(function () { return admin_venue_model_1.AdminVenue; }, {
                name: 'adminVenueDetail',
                description: 'Single venue with owner, courts, gallery and review trail.',
            })];
        _approve_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.verify'), (0, graphql_1.Mutation)(function () { return admin_venue_model_1.AdminVenue; }, { name: 'adminApproveVenue' })];
        _reject_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.reject'), (0, graphql_1.Mutation)(function () { return admin_venue_model_1.AdminVenue; }, { name: 'adminRejectVenue' })];
        _suspend_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.suspend'), (0, graphql_1.Mutation)(function () { return admin_venue_model_1.AdminVenue; }, { name: 'adminSuspendVenue' })];
        _feature_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.edit'), (0, graphql_1.Mutation)(function () { return admin_venue_model_1.AdminVenue; }, { name: 'adminFeatureVenue' })];
        _unfeature_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.edit'), (0, graphql_1.Mutation)(function () { return admin_venue_model_1.AdminVenue; }, { name: 'adminUnfeatureVenue' })];
        _updateStatus_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.verify'), (0, graphql_1.Mutation)(function () { return admin_venue_model_1.AdminVenue; }, {
                name: 'adminUpdateVenueVerificationStatus',
                description: 'Generic verification-status setter; useful for bulk-status flows.',
            })];
        __esDecorate(_classThis, null, _coverImageUrl_decorators, { kind: "method", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _imageUrls_decorators, { kind: "method", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _documentUrls_decorators, { kind: "method", name: "documentUrls", static: false, private: false, access: { has: function (obj) { return "documentUrls" in obj; }, get: function (obj) { return obj.documentUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _detail_decorators, { kind: "method", name: "detail", static: false, private: false, access: { has: function (obj) { return "detail" in obj; }, get: function (obj) { return obj.detail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approve_decorators, { kind: "method", name: "approve", static: false, private: false, access: { has: function (obj) { return "approve" in obj; }, get: function (obj) { return obj.approve; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reject_decorators, { kind: "method", name: "reject", static: false, private: false, access: { has: function (obj) { return "reject" in obj; }, get: function (obj) { return obj.reject; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _suspend_decorators, { kind: "method", name: "suspend", static: false, private: false, access: { has: function (obj) { return "suspend" in obj; }, get: function (obj) { return obj.suspend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _feature_decorators, { kind: "method", name: "feature", static: false, private: false, access: { has: function (obj) { return "feature" in obj; }, get: function (obj) { return obj.feature; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unfeature_decorators, { kind: "method", name: "unfeature", static: false, private: false, access: { has: function (obj) { return "unfeature" in obj; }, get: function (obj) { return obj.unfeature; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateStatus_decorators, { kind: "method", name: "updateStatus", static: false, private: false, access: { has: function (obj) { return "updateStatus" in obj; }, get: function (obj) { return obj.updateStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminVenuesResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminVenuesResolver = _classThis;
}();
exports.AdminVenuesResolver = AdminVenuesResolver;
/** Presigns admin court image keys into download URLs wherever an AdminCourt is returned. */
var AdminCourtResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_venue_model_1.AdminCourt; }), (0, require_permission_decorator_1.RequirePermission)('venues.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _imageUrls_decorators;
    var AdminCourtResolver = _classThis = /** @class */ (function () {
        function AdminCourtResolver_1(storage) {
            this.storage = (__runInitializers(this, _instanceExtraInitializers), storage);
        }
        AdminCourtResolver_1.prototype.imageUrls = function (court) {
            return this.storage.getDownloadUrls(court.imageUrls);
        };
        return AdminCourtResolver_1;
    }());
    __setFunctionName(_classThis, "AdminCourtResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _imageUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        __esDecorate(_classThis, null, _imageUrls_decorators, { kind: "method", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminCourtResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminCourtResolver = _classThis;
}();
exports.AdminCourtResolver = AdminCourtResolver;
