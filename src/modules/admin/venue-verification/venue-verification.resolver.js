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
exports.VenueVerificationResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_user_model_1 = require("../users/dto/admin-user.model");
var list_venue_verification_requests_input_1 = require("./dto/list-venue-verification-requests.input");
var paginated_venue_verification_requests_1 = require("./dto/paginated-venue-verification-requests");
var venue_verification_request_model_1 = require("./dto/venue-verification-request.model");
var VenueVerificationResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return venue_verification_request_model_1.VenueVerificationRequestModel; }), (0, require_permission_decorator_1.RequirePermission)('venues.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _documentUrls_decorators;
    var _list_decorators;
    var _getOne_decorators;
    var _approve_decorators;
    var _reject_decorators;
    var _suspend_decorators;
    var _reinstate_decorators;
    var VenueVerificationResolver = _classThis = /** @class */ (function () {
        function VenueVerificationResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        /** Presign the stored KYC/PAN document keys into temporary download URLs for the admin. */
        VenueVerificationResolver_1.prototype.documentUrls = function (req) {
            return this.storage.getDownloadUrls(req.documentUrls);
        };
        VenueVerificationResolver_1.prototype.list = function (input) {
            return this.service.list(input !== null && input !== void 0 ? input : new list_venue_verification_requests_input_1.ListVenueVerificationRequestsInput());
        };
        VenueVerificationResolver_1.prototype.getOne = function (id) {
            return this.service.getOne(id);
        };
        VenueVerificationResolver_1.prototype.approve = function (input, actor) {
            return this.service.approve(input, actor);
        };
        VenueVerificationResolver_1.prototype.reject = function (input, actor) {
            return this.service.reject(input, actor);
        };
        VenueVerificationResolver_1.prototype.suspend = function (userId, actor) {
            return this.service.suspendAccess(userId, actor);
        };
        VenueVerificationResolver_1.prototype.reinstate = function (userId) {
            return this.service.reinstateAccess(userId);
        };
        return VenueVerificationResolver_1;
    }());
    __setFunctionName(_classThis, "VenueVerificationResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _documentUrls_decorators = [(0, graphql_1.ResolveField)(function () { return [String]; })];
        _list_decorators = [(0, graphql_1.Query)(function () { return paginated_venue_verification_requests_1.PaginatedVenueVerificationRequests; }, {
                name: 'adminListVenueVerificationRequests',
                description: 'List venue-verification submissions with optional status / search filters.',
            })];
        _getOne_decorators = [(0, graphql_1.Query)(function () { return venue_verification_request_model_1.VenueVerificationRequestModel; }, {
                name: 'adminVenueVerificationRequest',
                description: 'Single venue-verification submission with submitted info + reviewer.',
            })];
        _approve_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.verify'), (0, graphql_1.Mutation)(function () { return venue_verification_request_model_1.VenueVerificationRequestModel; }, {
                name: 'adminApproveVenueVerification',
                description: 'Approve a pending venue-verification request.',
            })];
        _reject_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.reject'), (0, graphql_1.Mutation)(function () { return venue_verification_request_model_1.VenueVerificationRequestModel; }, {
                name: 'adminRejectVenueVerification',
                description: 'Reject a pending venue-verification request with a reason.',
            })];
        _suspend_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.suspend'), (0, graphql_1.Mutation)(function () { return admin_user_model_1.AdminUser; }, {
                name: 'adminSuspendVenueAccess',
                description: 'Suspend venue access on a user (venueStatus -> SUSPENDED).',
            })];
        _reinstate_decorators = [(0, require_permission_decorator_1.RequirePermission)('venues.activate'), (0, graphql_1.Mutation)(function () { return admin_user_model_1.AdminUser; }, {
                name: 'adminReinstateVenueAccess',
                description: 'Reinstate venue access on a previously-suspended user.',
            })];
        __esDecorate(_classThis, null, _documentUrls_decorators, { kind: "method", name: "documentUrls", static: false, private: false, access: { has: function (obj) { return "documentUrls" in obj; }, get: function (obj) { return obj.documentUrls; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOne_decorators, { kind: "method", name: "getOne", static: false, private: false, access: { has: function (obj) { return "getOne" in obj; }, get: function (obj) { return obj.getOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approve_decorators, { kind: "method", name: "approve", static: false, private: false, access: { has: function (obj) { return "approve" in obj; }, get: function (obj) { return obj.approve; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reject_decorators, { kind: "method", name: "reject", static: false, private: false, access: { has: function (obj) { return "reject" in obj; }, get: function (obj) { return obj.reject; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _suspend_decorators, { kind: "method", name: "suspend", static: false, private: false, access: { has: function (obj) { return "suspend" in obj; }, get: function (obj) { return obj.suspend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reinstate_decorators, { kind: "method", name: "reinstate", static: false, private: false, access: { has: function (obj) { return "reinstate" in obj; }, get: function (obj) { return obj.reinstate; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueVerificationResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueVerificationResolver = _classThis;
}();
exports.VenueVerificationResolver = VenueVerificationResolver;
