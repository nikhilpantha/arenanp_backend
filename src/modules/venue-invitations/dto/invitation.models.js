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
exports.InvitationVerification = exports.CreateInvitationResult = exports.VenueInvitation = void 0;
exports.mapInvitationToGraphql = mapInvitationToGraphql;
var graphql_1 = require("@nestjs/graphql");
require("../../../common/enums");
var admin_user_model_1 = require("../../admin/users/dto/admin-user.model");
var VenueInvitation = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Admin-facing view of a pending / accepted venue invitation.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _acceptedAt_decorators;
    var _acceptedAt_initializers = [];
    var _acceptedAt_extraInitializers = [];
    var _invitedBy_decorators;
    var _invitedBy_initializers = [];
    var _invitedBy_extraInitializers = [];
    var _createdUser_decorators;
    var _createdUser_initializers = [];
    var _createdUser_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var VenueInvitation = _classThis = /** @class */ (function () {
        function VenueInvitation_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.email = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.fullName = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            this.acceptedAt = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _acceptedAt_initializers, void 0));
            this.invitedBy = (__runInitializers(this, _acceptedAt_extraInitializers), __runInitializers(this, _invitedBy_initializers, void 0));
            this.createdUser = (__runInitializers(this, _invitedBy_extraInitializers), __runInitializers(this, _createdUser_initializers, void 0));
            this.createdAt = (__runInitializers(this, _createdUser_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return VenueInvitation_1;
    }());
    __setFunctionName(_classThis, "VenueInvitation");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _email_decorators = [(0, graphql_1.Field)()];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _phoneNumber_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _expiresAt_decorators = [(0, graphql_1.Field)()];
        _acceptedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _invitedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _createdUser_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _acceptedAt_decorators, { kind: "field", name: "acceptedAt", static: false, private: false, access: { has: function (obj) { return "acceptedAt" in obj; }, get: function (obj) { return obj.acceptedAt; }, set: function (obj, value) { obj.acceptedAt = value; } }, metadata: _metadata }, _acceptedAt_initializers, _acceptedAt_extraInitializers);
        __esDecorate(null, null, _invitedBy_decorators, { kind: "field", name: "invitedBy", static: false, private: false, access: { has: function (obj) { return "invitedBy" in obj; }, get: function (obj) { return obj.invitedBy; }, set: function (obj, value) { obj.invitedBy = value; } }, metadata: _metadata }, _invitedBy_initializers, _invitedBy_extraInitializers);
        __esDecorate(null, null, _createdUser_decorators, { kind: "field", name: "createdUser", static: false, private: false, access: { has: function (obj) { return "createdUser" in obj; }, get: function (obj) { return obj.createdUser; }, set: function (obj, value) { obj.createdUser = value; } }, metadata: _metadata }, _createdUser_initializers, _createdUser_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueInvitation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueInvitation = _classThis;
}();
exports.VenueInvitation = VenueInvitation;
var CreateInvitationResult = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Returned right after an invitation is created. `setupUrl` is only populated for the stub mail provider so dev admins can click straight through.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _invitation_decorators;
    var _invitation_initializers = [];
    var _invitation_extraInitializers = [];
    var _setupUrl_decorators;
    var _setupUrl_initializers = [];
    var _setupUrl_extraInitializers = [];
    var CreateInvitationResult = _classThis = /** @class */ (function () {
        function CreateInvitationResult_1() {
            this.invitation = __runInitializers(this, _invitation_initializers, void 0);
            this.setupUrl = (__runInitializers(this, _invitation_extraInitializers), __runInitializers(this, _setupUrl_initializers, void 0));
            __runInitializers(this, _setupUrl_extraInitializers);
        }
        return CreateInvitationResult_1;
    }());
    __setFunctionName(_classThis, "CreateInvitationResult");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _invitation_decorators = [(0, graphql_1.Field)(function () { return VenueInvitation; })];
        _setupUrl_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Only set when MAIL_PROVIDER=stub.' })];
        __esDecorate(null, null, _invitation_decorators, { kind: "field", name: "invitation", static: false, private: false, access: { has: function (obj) { return "invitation" in obj; }, get: function (obj) { return obj.invitation; }, set: function (obj, value) { obj.invitation = value; } }, metadata: _metadata }, _invitation_initializers, _invitation_extraInitializers);
        __esDecorate(null, null, _setupUrl_decorators, { kind: "field", name: "setupUrl", static: false, private: false, access: { has: function (obj) { return "setupUrl" in obj; }, get: function (obj) { return obj.setupUrl; }, set: function (obj, value) { obj.setupUrl = value; } }, metadata: _metadata }, _setupUrl_initializers, _setupUrl_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateInvitationResult = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateInvitationResult = _classThis;
}();
exports.CreateInvitationResult = CreateInvitationResult;
var InvitationVerification = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Pre-form check the public setup page calls to validate the token.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _valid_decorators;
    var _valid_initializers = [];
    var _valid_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var InvitationVerification = _classThis = /** @class */ (function () {
        function InvitationVerification_1() {
            this.valid = __runInitializers(this, _valid_initializers, void 0);
            this.reason = (__runInitializers(this, _valid_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            this.email = (__runInitializers(this, _reason_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.fullName = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            __runInitializers(this, _phoneNumber_extraInitializers);
        }
        return InvitationVerification_1;
    }());
    __setFunctionName(_classThis, "InvitationVerification");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _valid_decorators = [(0, graphql_1.Field)()];
        _reason_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'When invalid, a user-facing reason (expired, accepted, missing).',
            })];
        _email_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _phoneNumber_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _valid_decorators, { kind: "field", name: "valid", static: false, private: false, access: { has: function (obj) { return "valid" in obj; }, get: function (obj) { return obj.valid; }, set: function (obj, value) { obj.valid = value; } }, metadata: _metadata }, _valid_initializers, _valid_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InvitationVerification = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InvitationVerification = _classThis;
}();
exports.InvitationVerification = InvitationVerification;
function mapInvitationToGraphql(row) {
    var _a, _b, _c;
    return {
        id: row.id,
        email: row.email,
        fullName: (_a = row.fullName) !== null && _a !== void 0 ? _a : undefined,
        phoneNumber: (_b = row.phoneNumber) !== null && _b !== void 0 ? _b : undefined,
        expiresAt: row.expiresAt,
        acceptedAt: (_c = row.acceptedAt) !== null && _c !== void 0 ? _c : undefined,
        invitedBy: (0, admin_user_model_1.mapPrismaUserToAdmin)(row.invitedBy),
        createdUser: row.createdUser ? (0, admin_user_model_1.mapPrismaUserToAdmin)(row.createdUser) : undefined,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
