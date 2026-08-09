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
exports.SortOrder = exports.AdminUserSortField = exports.AdminUserDetail = exports.AdminUserTeamSummary = exports.AdminUserPaymentSummary = exports.AdminUserBookingSummary = exports.AdminUser = exports.AdminUserCapability = void 0;
exports.mapPrismaUserToAdmin = mapPrismaUserToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
// Side-effect import: registers shared enums (UserRole / CapabilityType / CapabilityStatus).
require("../../../../common/enums");
/** One capability grant on the admin user view. */
var AdminUserCapability = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var AdminUserCapability = _classThis = /** @class */ (function () {
        function AdminUserCapability_1() {
            this.type = __runInitializers(this, _type_initializers, void 0);
            this.status = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return AdminUserCapability_1;
    }());
    __setFunctionName(_classThis, "AdminUserCapability");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _type_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityType; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUserCapability = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUserCapability = _classThis;
}();
exports.AdminUserCapability = AdminUserCapability;
/**
 * Admin-facing view of a user. Capabilities (VENUE / ORGANIZER / COACH) live in
 * the `capabilities` array; `venueStatus` / `organizerStatus` are convenience
 * fields derived from it for list filtering + display.
 */
var AdminUser = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _capabilities_decorators;
    var _capabilities_initializers = [];
    var _capabilities_extraInitializers = [];
    var _venueStatus_decorators;
    var _venueStatus_initializers = [];
    var _venueStatus_extraInitializers = [];
    var _organizerStatus_decorators;
    var _organizerStatus_initializers = [];
    var _organizerStatus_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _lastLoginAt_decorators;
    var _lastLoginAt_initializers = [];
    var _lastLoginAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminUser = _classThis = /** @class */ (function () {
        function AdminUser_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.fullName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.email = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.role = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.capabilities = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _capabilities_initializers, void 0));
            this.venueStatus = (__runInitializers(this, _capabilities_extraInitializers), __runInitializers(this, _venueStatus_initializers, void 0));
            this.organizerStatus = (__runInitializers(this, _venueStatus_extraInitializers), __runInitializers(this, _organizerStatus_initializers, void 0));
            /** Stored S3 object key; presigned to a download URL by AdminUsersResolver. */
            this.avatarUrl = __runInitializers(this, _organizerStatus_extraInitializers);
            this.isActive = __runInitializers(this, _isActive_initializers, void 0);
            this.lastLoginAt = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _lastLoginAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminUser_1;
    }());
    __setFunctionName(_classThis, "AdminUser");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _phoneNumber_decorators = [(0, graphql_1.Field)()];
        _email_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.UserRole; })];
        _capabilities_decorators = [(0, graphql_1.Field)(function () { return [AdminUserCapability]; })];
        _venueStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        _organizerStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _lastLoginAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _capabilities_decorators, { kind: "field", name: "capabilities", static: false, private: false, access: { has: function (obj) { return "capabilities" in obj; }, get: function (obj) { return obj.capabilities; }, set: function (obj, value) { obj.capabilities = value; } }, metadata: _metadata }, _capabilities_initializers, _capabilities_extraInitializers);
        __esDecorate(null, null, _venueStatus_decorators, { kind: "field", name: "venueStatus", static: false, private: false, access: { has: function (obj) { return "venueStatus" in obj; }, get: function (obj) { return obj.venueStatus; }, set: function (obj, value) { obj.venueStatus = value; } }, metadata: _metadata }, _venueStatus_initializers, _venueStatus_extraInitializers);
        __esDecorate(null, null, _organizerStatus_decorators, { kind: "field", name: "organizerStatus", static: false, private: false, access: { has: function (obj) { return "organizerStatus" in obj; }, get: function (obj) { return obj.organizerStatus; }, set: function (obj, value) { obj.organizerStatus = value; } }, metadata: _metadata }, _organizerStatus_initializers, _organizerStatus_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: function (obj) { return "lastLoginAt" in obj; }, get: function (obj) { return obj.lastLoginAt; }, set: function (obj, value) { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUser = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUser = _classThis;
}();
exports.AdminUser = AdminUser;
var AdminUserBookingSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact booking summary for the user-detail drawer.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AdminUserBookingSummary = _classThis = /** @class */ (function () {
        function AdminUserBookingSummary_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.sport = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.amount = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AdminUserBookingSummary_1;
    }());
    __setFunctionName(_classThis, "AdminUserBookingSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _sport_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUserBookingSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUserBookingSummary = _classThis;
}();
exports.AdminUserBookingSummary = AdminUserBookingSummary;
var AdminUserPaymentSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact payment summary for the user-detail drawer.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AdminUserPaymentSummary = _classThis = /** @class */ (function () {
        function AdminUserPaymentSummary_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.provider = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _provider_initializers, void 0));
            this.amount = (__runInitializers(this, _provider_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
            this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AdminUserPaymentSummary_1;
    }());
    __setFunctionName(_classThis, "AdminUserPaymentSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _provider_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
        __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUserPaymentSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUserPaymentSummary = _classThis;
}();
exports.AdminUserPaymentSummary = AdminUserPaymentSummary;
var AdminUserTeamSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact team/clan summary for the user-detail drawer.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var AdminUserTeamSummary = _classThis = /** @class */ (function () {
        function AdminUserTeamSummary_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.sport = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.role = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            __runInitializers(this, _role_extraInitializers);
        }
        return AdminUserTeamSummary_1;
    }());
    __setFunctionName(_classThis, "AdminUserTeamSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _role_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUserTeamSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUserTeamSummary = _classThis;
}();
exports.AdminUserTeamSummary = AdminUserTeamSummary;
var AdminUserDetail = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Full detail payload for the user-detail drawer. Related collections (bookings, payments, teams) return [] until those modules ship.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _bookingsCount_decorators;
    var _bookingsCount_initializers = [];
    var _bookingsCount_extraInitializers = [];
    var _totalSpent_decorators;
    var _totalSpent_initializers = [];
    var _totalSpent_extraInitializers = [];
    var _recentBookings_decorators;
    var _recentBookings_initializers = [];
    var _recentBookings_extraInitializers = [];
    var _recentPayments_decorators;
    var _recentPayments_initializers = [];
    var _recentPayments_extraInitializers = [];
    var _teams_decorators;
    var _teams_initializers = [];
    var _teams_extraInitializers = [];
    var AdminUserDetail = _classThis = /** @class */ (function () {
        function AdminUserDetail_1() {
            this.user = __runInitializers(this, _user_initializers, void 0);
            this.bookingsCount = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _bookingsCount_initializers, void 0));
            this.totalSpent = (__runInitializers(this, _bookingsCount_extraInitializers), __runInitializers(this, _totalSpent_initializers, void 0));
            this.recentBookings = (__runInitializers(this, _totalSpent_extraInitializers), __runInitializers(this, _recentBookings_initializers, void 0));
            this.recentPayments = (__runInitializers(this, _recentBookings_extraInitializers), __runInitializers(this, _recentPayments_initializers, void 0));
            this.teams = (__runInitializers(this, _recentPayments_extraInitializers), __runInitializers(this, _teams_initializers, void 0));
            __runInitializers(this, _teams_extraInitializers);
        }
        return AdminUserDetail_1;
    }());
    __setFunctionName(_classThis, "AdminUserDetail");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _user_decorators = [(0, graphql_1.Field)(function () { return AdminUser; })];
        _bookingsCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalSpent_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _recentBookings_decorators = [(0, graphql_1.Field)(function () { return [AdminUserBookingSummary]; })];
        _recentPayments_decorators = [(0, graphql_1.Field)(function () { return [AdminUserPaymentSummary]; })];
        _teams_decorators = [(0, graphql_1.Field)(function () { return [AdminUserTeamSummary]; })];
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _bookingsCount_decorators, { kind: "field", name: "bookingsCount", static: false, private: false, access: { has: function (obj) { return "bookingsCount" in obj; }, get: function (obj) { return obj.bookingsCount; }, set: function (obj, value) { obj.bookingsCount = value; } }, metadata: _metadata }, _bookingsCount_initializers, _bookingsCount_extraInitializers);
        __esDecorate(null, null, _totalSpent_decorators, { kind: "field", name: "totalSpent", static: false, private: false, access: { has: function (obj) { return "totalSpent" in obj; }, get: function (obj) { return obj.totalSpent; }, set: function (obj, value) { obj.totalSpent = value; } }, metadata: _metadata }, _totalSpent_initializers, _totalSpent_extraInitializers);
        __esDecorate(null, null, _recentBookings_decorators, { kind: "field", name: "recentBookings", static: false, private: false, access: { has: function (obj) { return "recentBookings" in obj; }, get: function (obj) { return obj.recentBookings; }, set: function (obj, value) { obj.recentBookings = value; } }, metadata: _metadata }, _recentBookings_initializers, _recentBookings_extraInitializers);
        __esDecorate(null, null, _recentPayments_decorators, { kind: "field", name: "recentPayments", static: false, private: false, access: { has: function (obj) { return "recentPayments" in obj; }, get: function (obj) { return obj.recentPayments; }, set: function (obj, value) { obj.recentPayments = value; } }, metadata: _metadata }, _recentPayments_initializers, _recentPayments_extraInitializers);
        __esDecorate(null, null, _teams_decorators, { kind: "field", name: "teams", static: false, private: false, access: { has: function (obj) { return "teams" in obj; }, get: function (obj) { return obj.teams; }, set: function (obj, value) { obj.teams = value; } }, metadata: _metadata }, _teams_initializers, _teams_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUserDetail = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUserDetail = _classThis;
}();
exports.AdminUserDetail = AdminUserDetail;
function mapPrismaUserToAdmin(user) {
    var _a, _b, _c, _d, _e;
    var caps = (_a = user.capabilities) !== null && _a !== void 0 ? _a : [];
    var statusOf = function (type) { var _a, _b; return (_b = (_a = caps.find(function (c) { return c.type === type; })) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : client_1.CapabilityStatus.NOT_REQUESTED; };
    return {
        id: user.id,
        fullName: (_b = user.fullName) !== null && _b !== void 0 ? _b : undefined,
        phoneNumber: user.phoneNumber,
        email: (_c = user.email) !== null && _c !== void 0 ? _c : undefined,
        role: user.role,
        capabilities: caps.map(function (c) { return ({ type: c.type, status: c.status }); }),
        venueStatus: statusOf(client_1.CapabilityType.VENUE),
        organizerStatus: statusOf(client_1.CapabilityType.ORGANIZER),
        avatarUrl: (_d = user.avatarUrl) !== null && _d !== void 0 ? _d : undefined,
        isActive: user.isActive,
        lastLoginAt: (_e = user.lastLoginAt) !== null && _e !== void 0 ? _e : undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
/** Sort options exposed on the admin user list. */
var AdminUserSortField;
(function (AdminUserSortField) {
    AdminUserSortField["CREATED_AT"] = "CREATED_AT";
    AdminUserSortField["FULL_NAME"] = "FULL_NAME";
    AdminUserSortField["LAST_LOGIN_AT"] = "LAST_LOGIN_AT";
})(AdminUserSortField || (exports.AdminUserSortField = AdminUserSortField = {}));
(0, graphql_1.registerEnumType)(AdminUserSortField, {
    name: 'AdminUserSortField',
    description: 'Fields the admin user list can be sorted by.',
});
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
(0, graphql_1.registerEnumType)(SortOrder, {
    name: 'SortOrder',
    description: 'Ascending / descending sort order.',
});
