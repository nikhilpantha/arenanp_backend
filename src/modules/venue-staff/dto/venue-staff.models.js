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
exports.StaffLoginPreview = exports.CreateVenueStaffResult = exports.StaffCredentials = exports.VenueStaffMember = exports.StaffCreateOutcome = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../common/enums");
/** What actually happened when the owner submitted the add-staff form. */
var StaffCreateOutcome;
(function (StaffCreateOutcome) {
    /** A brand-new login was minted; `credentials` carries it. */
    StaffCreateOutcome["CREATED_ACCOUNT"] = "CREATED_ACCOUNT";
    /** The mobile already had an Arena NP account, so it got a seat instead. */
    StaffCreateOutcome["ATTACHED_EXISTING"] = "ATTACHED_EXISTING";
    /** They had a suspended seat here already; it was switched back on. */
    StaffCreateOutcome["REACTIVATED"] = "REACTIVATED";
})(StaffCreateOutcome || (exports.StaffCreateOutcome = StaffCreateOutcome = {}));
(0, graphql_1.registerEnumType)(StaffCreateOutcome, {
    name: 'StaffCreateOutcome',
    description: 'How a staff seat came to be: a new login was minted, an existing account was attached, or a suspended seat was reactivated.',
});
var VenueStaffMember = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'One person with a seat at this venue.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _permissions_decorators;
    var _permissions_initializers = [];
    var _permissions_extraInitializers = [];
    var _loginEmail_decorators;
    var _loginEmail_initializers = [];
    var _loginEmail_extraInitializers = [];
    var _provisionedUser_decorators;
    var _provisionedUser_initializers = [];
    var _provisionedUser_extraInitializers = [];
    var _mustChangePassword_decorators;
    var _mustChangePassword_initializers = [];
    var _mustChangePassword_extraInitializers = [];
    var _isSelf_decorators;
    var _isSelf_initializers = [];
    var _isSelf_extraInitializers = [];
    var _isPrimaryOwner_decorators;
    var _isPrimaryOwner_initializers = [];
    var _isPrimaryOwner_extraInitializers = [];
    var _payBasis_decorators;
    var _payBasis_initializers = [];
    var _payBasis_extraInitializers = [];
    var _payRate_decorators;
    var _payRate_initializers = [];
    var _payRate_extraInitializers = [];
    var _lastLoginAt_decorators;
    var _lastLoginAt_initializers = [];
    var _lastLoginAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var VenueStaffMember = _classThis = /** @class */ (function () {
        function VenueStaffMember_1() {
            this.membershipId = __runInitializers(this, _membershipId_initializers, void 0);
            this.userId = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.fullName = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.role = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.status = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.permissions = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _permissions_initializers, void 0));
            this.loginEmail = (__runInitializers(this, _permissions_extraInitializers), __runInitializers(this, _loginEmail_initializers, void 0));
            this.provisionedUser = (__runInitializers(this, _loginEmail_extraInitializers), __runInitializers(this, _provisionedUser_initializers, void 0));
            this.mustChangePassword = (__runInitializers(this, _provisionedUser_extraInitializers), __runInitializers(this, _mustChangePassword_initializers, void 0));
            this.isSelf = (__runInitializers(this, _mustChangePassword_extraInitializers), __runInitializers(this, _isSelf_initializers, void 0));
            this.isPrimaryOwner = (__runInitializers(this, _isSelf_extraInitializers), __runInitializers(this, _isPrimaryOwner_initializers, void 0));
            this.payBasis = (__runInitializers(this, _isPrimaryOwner_extraInitializers), __runInitializers(this, _payBasis_initializers, void 0));
            this.payRate = (__runInitializers(this, _payBasis_extraInitializers), __runInitializers(this, _payRate_initializers, void 0));
            this.lastLoginAt = (__runInitializers(this, _payRate_extraInitializers), __runInitializers(this, _lastLoginAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _lastLoginAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return VenueStaffMember_1;
    }());
    __setFunctionName(_classThis, "VenueStaffMember");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _userId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _phoneNumber_decorators = [(0, graphql_1.Field)()];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueMemberRole; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipStatus; })];
        _permissions_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { description: 'Effective set: role defaults ∪ per-seat overrides.' })];
        _loginEmail_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: "The address the venue minted for them. Null for an attached personal account — the owner typed that person's phone number, not their email, and it stays that way.",
            })];
        _provisionedUser_decorators = [(0, graphql_1.Field)({ description: 'The venue minted this login, rather than attaching an existing account.' })];
        _mustChangePassword_decorators = [(0, graphql_1.Field)({ description: "They haven't replaced the password the owner set for them yet." })];
        _isSelf_decorators = [(0, graphql_1.Field)({ description: 'This row is the person looking at the screen.' })];
        _isPrimaryOwner_decorators = [(0, graphql_1.Field)({ description: 'The venue is legally theirs — they can never be removed or demoted.' })];
        _payBasis_decorators = [(0, graphql_1.Field)(function () { return client_1.PayBasis; }, {
                nullable: true,
                description: 'How they are paid. Null for anyone not on a wage — a one-off helper still gets payments recorded, just with nothing expected.',
            })];
        _payRate_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Per month, per day or per session.' })];
        _lastLoginAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _permissions_decorators, { kind: "field", name: "permissions", static: false, private: false, access: { has: function (obj) { return "permissions" in obj; }, get: function (obj) { return obj.permissions; }, set: function (obj, value) { obj.permissions = value; } }, metadata: _metadata }, _permissions_initializers, _permissions_extraInitializers);
        __esDecorate(null, null, _loginEmail_decorators, { kind: "field", name: "loginEmail", static: false, private: false, access: { has: function (obj) { return "loginEmail" in obj; }, get: function (obj) { return obj.loginEmail; }, set: function (obj, value) { obj.loginEmail = value; } }, metadata: _metadata }, _loginEmail_initializers, _loginEmail_extraInitializers);
        __esDecorate(null, null, _provisionedUser_decorators, { kind: "field", name: "provisionedUser", static: false, private: false, access: { has: function (obj) { return "provisionedUser" in obj; }, get: function (obj) { return obj.provisionedUser; }, set: function (obj, value) { obj.provisionedUser = value; } }, metadata: _metadata }, _provisionedUser_initializers, _provisionedUser_extraInitializers);
        __esDecorate(null, null, _mustChangePassword_decorators, { kind: "field", name: "mustChangePassword", static: false, private: false, access: { has: function (obj) { return "mustChangePassword" in obj; }, get: function (obj) { return obj.mustChangePassword; }, set: function (obj, value) { obj.mustChangePassword = value; } }, metadata: _metadata }, _mustChangePassword_initializers, _mustChangePassword_extraInitializers);
        __esDecorate(null, null, _isSelf_decorators, { kind: "field", name: "isSelf", static: false, private: false, access: { has: function (obj) { return "isSelf" in obj; }, get: function (obj) { return obj.isSelf; }, set: function (obj, value) { obj.isSelf = value; } }, metadata: _metadata }, _isSelf_initializers, _isSelf_extraInitializers);
        __esDecorate(null, null, _isPrimaryOwner_decorators, { kind: "field", name: "isPrimaryOwner", static: false, private: false, access: { has: function (obj) { return "isPrimaryOwner" in obj; }, get: function (obj) { return obj.isPrimaryOwner; }, set: function (obj, value) { obj.isPrimaryOwner = value; } }, metadata: _metadata }, _isPrimaryOwner_initializers, _isPrimaryOwner_extraInitializers);
        __esDecorate(null, null, _payBasis_decorators, { kind: "field", name: "payBasis", static: false, private: false, access: { has: function (obj) { return "payBasis" in obj; }, get: function (obj) { return obj.payBasis; }, set: function (obj, value) { obj.payBasis = value; } }, metadata: _metadata }, _payBasis_initializers, _payBasis_extraInitializers);
        __esDecorate(null, null, _payRate_decorators, { kind: "field", name: "payRate", static: false, private: false, access: { has: function (obj) { return "payRate" in obj; }, get: function (obj) { return obj.payRate; }, set: function (obj, value) { obj.payRate = value; } }, metadata: _metadata }, _payRate_initializers, _payRate_extraInitializers);
        __esDecorate(null, null, _lastLoginAt_decorators, { kind: "field", name: "lastLoginAt", static: false, private: false, access: { has: function (obj) { return "lastLoginAt" in obj; }, get: function (obj) { return obj.lastLoginAt; }, set: function (obj, value) { obj.lastLoginAt = value; } }, metadata: _metadata }, _lastLoginAt_initializers, _lastLoginAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueStaffMember = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueStaffMember = _classThis;
}();
exports.VenueStaffMember = VenueStaffMember;
var StaffCredentials = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A newly minted login. Shown once and never retrievable again.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _loginEmail_decorators;
    var _loginEmail_initializers = [];
    var _loginEmail_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var StaffCredentials = _classThis = /** @class */ (function () {
        function StaffCredentials_1() {
            this.loginEmail = __runInitializers(this, _loginEmail_initializers, void 0);
            this.password = (__runInitializers(this, _loginEmail_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            __runInitializers(this, _password_extraInitializers);
        }
        return StaffCredentials_1;
    }());
    __setFunctionName(_classThis, "StaffCredentials");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _loginEmail_decorators = [(0, graphql_1.Field)()];
        _password_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _loginEmail_decorators, { kind: "field", name: "loginEmail", static: false, private: false, access: { has: function (obj) { return "loginEmail" in obj; }, get: function (obj) { return obj.loginEmail; }, set: function (obj, value) { obj.loginEmail = value; } }, metadata: _metadata }, _loginEmail_initializers, _loginEmail_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffCredentials = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffCredentials = _classThis;
}();
exports.StaffCredentials = StaffCredentials;
var CreateVenueStaffResult = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _member_decorators;
    var _member_initializers = [];
    var _member_extraInitializers = [];
    var _outcome_decorators;
    var _outcome_initializers = [];
    var _outcome_extraInitializers = [];
    var _credentials_decorators;
    var _credentials_initializers = [];
    var _credentials_extraInitializers = [];
    var CreateVenueStaffResult = _classThis = /** @class */ (function () {
        function CreateVenueStaffResult_1() {
            this.member = __runInitializers(this, _member_initializers, void 0);
            this.outcome = (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _outcome_initializers, void 0));
            this.credentials = (__runInitializers(this, _outcome_extraInitializers), __runInitializers(this, _credentials_initializers, void 0));
            __runInitializers(this, _credentials_extraInitializers);
        }
        return CreateVenueStaffResult_1;
    }());
    __setFunctionName(_classThis, "CreateVenueStaffResult");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _member_decorators = [(0, graphql_1.Field)(function () { return VenueStaffMember; })];
        _outcome_decorators = [(0, graphql_1.Field)(function () { return StaffCreateOutcome; })];
        _credentials_decorators = [(0, graphql_1.Field)(function () { return StaffCredentials; }, {
                nullable: true,
                description: 'Only present when a new login was minted. Never for an attached account.',
            })];
        __esDecorate(null, null, _member_decorators, { kind: "field", name: "member", static: false, private: false, access: { has: function (obj) { return "member" in obj; }, get: function (obj) { return obj.member; }, set: function (obj, value) { obj.member = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
        __esDecorate(null, null, _outcome_decorators, { kind: "field", name: "outcome", static: false, private: false, access: { has: function (obj) { return "outcome" in obj; }, get: function (obj) { return obj.outcome; }, set: function (obj, value) { obj.outcome = value; } }, metadata: _metadata }, _outcome_initializers, _outcome_extraInitializers);
        __esDecorate(null, null, _credentials_decorators, { kind: "field", name: "credentials", static: false, private: false, access: { has: function (obj) { return "credentials" in obj; }, get: function (obj) { return obj.credentials; }, set: function (obj, value) { obj.credentials = value; } }, metadata: _metadata }, _credentials_initializers, _credentials_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateVenueStaffResult = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateVenueStaffResult = _classThis;
}();
exports.CreateVenueStaffResult = CreateVenueStaffResult;
var StaffLoginPreview = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: "What the add-staff form would do if submitted as typed — so the owner sees the login before it exists, and is warned before they hand a stranger's account access to their venue.",
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _loginEmail_decorators;
    var _loginEmail_initializers = [];
    var _loginEmail_extraInitializers = [];
    var _phoneBelongsToExistingAccount_decorators;
    var _phoneBelongsToExistingAccount_initializers = [];
    var _phoneBelongsToExistingAccount_extraInitializers = [];
    var _alreadyOnStaff_decorators;
    var _alreadyOnStaff_initializers = [];
    var _alreadyOnStaff_extraInitializers = [];
    var _existingRole_decorators;
    var _existingRole_initializers = [];
    var _existingRole_extraInitializers = [];
    var _existingStatus_decorators;
    var _existingStatus_initializers = [];
    var _existingStatus_extraInitializers = [];
    var StaffLoginPreview = _classThis = /** @class */ (function () {
        function StaffLoginPreview_1() {
            this.loginEmail = __runInitializers(this, _loginEmail_initializers, void 0);
            this.phoneBelongsToExistingAccount = (__runInitializers(this, _loginEmail_extraInitializers), __runInitializers(this, _phoneBelongsToExistingAccount_initializers, void 0));
            this.alreadyOnStaff = (__runInitializers(this, _phoneBelongsToExistingAccount_extraInitializers), __runInitializers(this, _alreadyOnStaff_initializers, void 0));
            this.existingRole = (__runInitializers(this, _alreadyOnStaff_extraInitializers), __runInitializers(this, _existingRole_initializers, void 0));
            this.existingStatus = (__runInitializers(this, _existingRole_extraInitializers), __runInitializers(this, _existingStatus_initializers, void 0));
            __runInitializers(this, _existingStatus_extraInitializers);
        }
        return StaffLoginPreview_1;
    }());
    __setFunctionName(_classThis, "StaffLoginPreview");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _loginEmail_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'The address that would be minted. Null when attaching.' })];
        _phoneBelongsToExistingAccount_decorators = [(0, graphql_1.Field)({
                description: 'This mobile already has an Arena NP account. Adding them gives THAT account access, and they keep their own password.',
            })];
        _alreadyOnStaff_decorators = [(0, graphql_1.Field)({ description: 'They already hold a seat at this venue.' })];
        _existingRole_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueMemberRole; }, { nullable: true })];
        _existingStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipStatus; }, { nullable: true })];
        __esDecorate(null, null, _loginEmail_decorators, { kind: "field", name: "loginEmail", static: false, private: false, access: { has: function (obj) { return "loginEmail" in obj; }, get: function (obj) { return obj.loginEmail; }, set: function (obj, value) { obj.loginEmail = value; } }, metadata: _metadata }, _loginEmail_initializers, _loginEmail_extraInitializers);
        __esDecorate(null, null, _phoneBelongsToExistingAccount_decorators, { kind: "field", name: "phoneBelongsToExistingAccount", static: false, private: false, access: { has: function (obj) { return "phoneBelongsToExistingAccount" in obj; }, get: function (obj) { return obj.phoneBelongsToExistingAccount; }, set: function (obj, value) { obj.phoneBelongsToExistingAccount = value; } }, metadata: _metadata }, _phoneBelongsToExistingAccount_initializers, _phoneBelongsToExistingAccount_extraInitializers);
        __esDecorate(null, null, _alreadyOnStaff_decorators, { kind: "field", name: "alreadyOnStaff", static: false, private: false, access: { has: function (obj) { return "alreadyOnStaff" in obj; }, get: function (obj) { return obj.alreadyOnStaff; }, set: function (obj, value) { obj.alreadyOnStaff = value; } }, metadata: _metadata }, _alreadyOnStaff_initializers, _alreadyOnStaff_extraInitializers);
        __esDecorate(null, null, _existingRole_decorators, { kind: "field", name: "existingRole", static: false, private: false, access: { has: function (obj) { return "existingRole" in obj; }, get: function (obj) { return obj.existingRole; }, set: function (obj, value) { obj.existingRole = value; } }, metadata: _metadata }, _existingRole_initializers, _existingRole_extraInitializers);
        __esDecorate(null, null, _existingStatus_decorators, { kind: "field", name: "existingStatus", static: false, private: false, access: { has: function (obj) { return "existingStatus" in obj; }, get: function (obj) { return obj.existingStatus; }, set: function (obj, value) { obj.existingStatus = value; } }, metadata: _metadata }, _existingStatus_initializers, _existingStatus_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffLoginPreview = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffLoginPreview = _classThis;
}();
exports.StaffLoginPreview = StaffLoginPreview;
