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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueMembershipModel = void 0;
exports.mapMembershipToGraphql = mapMembershipToGraphql;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../common/enums");
/**
 * The signed-in user's seat in a venue, with the permissions they actually hold
 * there and the venue's listing status. This is what the mobile app reads to
 * build its panels + permission-gated tabs.
 *
 * `permissions` is resolved from `staff_permissions` by the caller, not derived
 * from `role` — the role field is a display label with no authority.
 */
var VenueMembershipModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _permissions_decorators;
    var _permissions_initializers = [];
    var _permissions_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _verificationStatus_decorators;
    var _verificationStatus_initializers = [];
    var _verificationStatus_extraInitializers = [];
    var VenueMembershipModel = _classThis = /** @class */ (function () {
        function VenueMembershipModel_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.venueName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.role = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.permissions = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _permissions_initializers, void 0));
            this.status = (__runInitializers(this, _permissions_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.verificationStatus = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _verificationStatus_initializers, void 0));
            __runInitializers(this, _verificationStatus_extraInitializers);
        }
        return VenueMembershipModel_1;
    }());
    __setFunctionName(_classThis, "VenueMembershipModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueName_decorators = [(0, graphql_1.Field)()];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueMemberRole; }, {
                deprecationReason: 'Display label only — authorization comes from `permissions`.',
            })];
        _permissions_decorators = [(0, graphql_1.Field)(function () { return [String]; }, {
                description: 'Permissions held at this venue. `["*"]` means unrestricted (owner or super admin).',
            })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipStatus; })];
        _verificationStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueVerificationStatus; })];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: function (obj) { return "permissions" in obj; }, get: function (obj) { return obj.permissions; }, set: function (obj, value) { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _permissions_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _verificationStatus_decorators, { kind: "field", name: "verificationStatus", static: false, private: false, access: { has: function (obj) { return "verificationStatus" in obj; }, get: function (obj) { return obj.verificationStatus; }, set: function (obj, value) { obj.verificationStatus = value; } }, metadata: _metadata }, _verificationStatus_initializers, _verificationStatus_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueMembershipModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueMembershipModel = _classThis;
}();
exports.VenueMembershipModel = VenueMembershipModel;
/**
 * @param permissions Effective permissions at this venue, resolved from
 *   `staff_permissions` by the caller. Never derive these from `m.role`.
 */
function mapMembershipToGraphql(m, permissions) {
    return {
        venueId: m.venueId,
        venueName: m.venue.name,
        role: m.role,
        permissions: permissions,
        status: m.status,
        verificationStatus: m.venue.verificationStatus,
    };
}
