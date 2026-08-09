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
exports.User = exports.UserCapabilityModel = void 0;
exports.mapUserToGraphql = mapUserToGraphql;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
// Side-effect import: registers UserRole / CapabilityType / CapabilityStatus with GraphQL.
require("../../../common/enums");
/** One capability grant on the public user model. */
var UserCapabilityModel = function () {
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
    var UserCapabilityModel = _classThis = /** @class */ (function () {
        function UserCapabilityModel_1() {
            this.type = __runInitializers(this, _type_initializers, void 0);
            this.status = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return UserCapabilityModel_1;
    }());
    __setFunctionName(_classThis, "UserCapabilityModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _type_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityType; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserCapabilityModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserCapabilityModel = _classThis;
}();
exports.UserCapabilityModel = UserCapabilityModel;
var User = function () {
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
    var _mustChangePassword_decorators;
    var _mustChangePassword_initializers = [];
    var _mustChangePassword_extraInitializers = [];
    var _lastLoginAt_decorators;
    var _lastLoginAt_initializers = [];
    var _lastLoginAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var _isStaff_decorators;
    var _isStaff_initializers = [];
    var _isStaff_extraInitializers = [];
    var _suspendedAt_decorators;
    var _suspendedAt_initializers = [];
    var _suspendedAt_extraInitializers = [];
    var _staffPermissions_decorators;
    var _staffPermissions_initializers = [];
    var _staffPermissions_extraInitializers = [];
    var User = _classThis = /** @class */ (function () {
        function User_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.fullName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.email = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.role = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.capabilities = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _capabilities_initializers, void 0));
            /** Convenience: VENUE capability status, derived from `capabilities`. */
            this.venueStatus = (__runInitializers(this, _capabilities_extraInitializers), __runInitializers(this, _venueStatus_initializers, void 0));
            /** Convenience: ORGANIZER capability status, derived from `capabilities`. */
            this.organizerStatus = (__runInitializers(this, _venueStatus_extraInitializers), __runInitializers(this, _organizerStatus_initializers, void 0));
            /**
             * Stored S3 object *key* (not a URL). Exposed to GraphQL as `avatarUrl` via a
             * field resolver on UsersResolver that presigns it into a temporary download URL.
             */
            this.avatarUrl = __runInitializers(this, _organizerStatus_extraInitializers);
            this.isActive = __runInitializers(this, _isActive_initializers, void 0);
            this.mustChangePassword = (__runInitializers(this, _isActive_extraInitializers), __runInitializers(this, _mustChangePassword_initializers, void 0));
            this.lastLoginAt = (__runInitializers(this, _mustChangePassword_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _lastLoginAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            /** Whether this user is a platform staff member. */
            this.isStaff = (__runInitializers(this, _updatedAt_extraInitializers), __runInitializers(this, _isStaff_initializers, void 0));
            /** Suspension timestamp (null = active). */
            this.suspendedAt = (__runInitializers(this, _isStaff_extraInitializers), __runInitializers(this, _suspendedAt_initializers, void 0));
            /**
             * Every permission this staff member holds platform-wide. `["*"]` means
             * unrestricted. This is the only thing that describes what they can do —
             * `role` is a coarse marker, not an authority.
             */
            this.staffPermissions = (__runInitializers(this, _suspendedAt_extraInitializers), __runInitializers(this, _staffPermissions_initializers, void 0));
            __runInitializers(this, _staffPermissions_extraInitializers);
        }
        return User_1;
    }());
    __setFunctionName(_classThis, "User");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _phoneNumber_decorators = [(0, graphql_1.Field)()];
        _email_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.UserRole; })];
        _capabilities_decorators = [(0, graphql_1.Field)(function () { return [UserCapabilityModel]; })];
        _venueStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        _organizerStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _mustChangePassword_decorators = [(0, graphql_1.Field)({
                description: 'Their password was set by someone else (a venue owner minting a staff login). Until they choose their own, every other call is refused.',
            })];
        _lastLoginAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        _isStaff_decorators = [(0, graphql_1.Field)()];
        _suspendedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _staffPermissions_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _capabilities_decorators, { kind: "field", name: "capabilities", static: false, private: false, access: { has: function (obj) { return "capabilities" in obj; }, get: function (obj) { return obj.capabilities; }, set: function (obj, value) { obj.capabilities = value; } }, metadata: _metadata }, _capabilities_initializers, _capabilities_extraInitializers);
        __esDecorate(null, null, _venueStatus_decorators, { kind: "field", name: "venueStatus", static: false, private: false, access: { has: function (obj) { return "venueStatus" in obj; }, get: function (obj) { return obj.venueStatus; }, set: function (obj, value) { obj.venueStatus = value; } }, metadata: _metadata }, _venueStatus_initializers, _venueStatus_extraInitializers);
        __esDecorate(null, null, _organizerStatus_decorators, { kind: "field", name: "organizerStatus", static: false, private: false, access: { has: function (obj) { return "organizerStatus" in obj; }, get: function (obj) { return obj.organizerStatus; }, set: function (obj, value) { obj.organizerStatus = value; } }, metadata: _metadata }, _organizerStatus_initializers, _organizerStatus_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _mustChangePassword_decorators, { kind: "field", name: "mustChangePassword", static: false, private: false, access: { has: function (obj) { return "mustChangePassword" in obj; }, get: function (obj) { return obj.mustChangePassword; }, set: function (obj, value) { obj.mustChangePassword = value; } }, metadata: _metadata }, _mustChangePassword_initializers, _mustChangePassword_extraInitializers);
        __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: function (obj) { return "lastLoginAt" in obj; }, get: function (obj) { return obj.lastLoginAt; }, set: function (obj, value) { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, null, _isStaff_decorators, { kind: "field", name: "isStaff", static: false, private: false, access: { has: function (obj) { return "isStaff" in obj; }, get: function (obj) { return obj.isStaff; }, set: function (obj, value) { obj.isStaff = value; } }, metadata: _metadata }, _isStaff_initializers, _isStaff_extraInitializers);
        __esDecorate(null, null, _suspendedAt_decorators, { kind: "field", name: "suspendedAt", static: false, private: false, access: { has: function (obj) { return "suspendedAt" in obj; }, get: function (obj) { return obj.suspendedAt; }, set: function (obj, value) { obj.suspendedAt = value; } }, metadata: _metadata }, _suspendedAt_initializers, _suspendedAt_extraInitializers);
        __esDecorate(null, null, _staffPermissions_decorators, { kind: "field", name: "staffPermissions", static: false, private: false, access: { has: function (obj) { return "staffPermissions" in obj; }, get: function (obj) { return obj.staffPermissions; }, set: function (obj, value) { obj.staffPermissions = value; } }, metadata: _metadata }, _staffPermissions_initializers, _staffPermissions_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        User = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return User = _classThis;
}();
exports.User = User;
function mapUserToGraphql(user) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
        mustChangePassword: user.mustChangePassword,
        lastLoginAt: (_e = user.lastLoginAt) !== null && _e !== void 0 ? _e : undefined,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Derived, not just read: `isStaff` is the single gate the admin app uses,
        // and the column was added after the first accounts existed. Falling back
        // to the role marker means a un-backfilled row can never lock a real admin
        // out of the panel.
        isStaff: ((_f = user.isStaff) !== null && _f !== void 0 ? _f : false) || user.role !== client_1.UserRole.USER,
        suspendedAt: (_g = user.suspendedAt) !== null && _g !== void 0 ? _g : undefined,
        staffPermissions: (_h = user.staffPermissions) !== null && _h !== void 0 ? _h : undefined,
    };
}
