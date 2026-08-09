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
exports.VenueStaffActivityInput = exports.ResetVenueStaffPasswordInput = exports.RemoveVenueStaffInput = exports.SetVenueStaffStatusInput = exports.UpdateVenueStaffInput = exports.CreateVenueStaffInput = exports.PreviewStaffLoginInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
require("../../../common/enums");
/**
 * Every input carries `venueId` at the top level, which is what
 * `VenuePermissionGuard` reads (`args.venueId ?? args.input.venueId`). Burying
 * it in a nested object would silently disable the guard.
 */
var PreviewStaffLoginInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var PreviewStaffLoginInput = _classThis = /** @class */ (function () {
        function PreviewStaffLoginInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.fullName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            __runInitializers(this, _phoneNumber_extraInitializers);
        }
        return PreviewStaffLoginInput_1;
    }());
    __setFunctionName(_classThis, "PreviewStaffLoginInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _fullName_decorators = [(0, graphql_1.Field)({ description: 'What the owner has typed so far — the address follows from it.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _phoneNumber_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Checked against existing accounts once it looks whole.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PreviewStaffLoginInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PreviewStaffLoginInput = _classThis;
}();
exports.PreviewStaffLoginInput = PreviewStaffLoginInput;
var CreateVenueStaffInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _attachExistingConfirmed_decorators;
    var _attachExistingConfirmed_initializers = [];
    var _attachExistingConfirmed_extraInitializers = [];
    var _reactivate_decorators;
    var _reactivate_initializers = [];
    var _reactivate_extraInitializers = [];
    var CreateVenueStaffInput = _classThis = /** @class */ (function () {
        function CreateVenueStaffInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.fullName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            this.role = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.password = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            this.attachExistingConfirmed = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _attachExistingConfirmed_initializers, void 0));
            this.reactivate = (__runInitializers(this, _attachExistingConfirmed_extraInitializers), __runInitializers(this, _reactivate_initializers, void 0));
            __runInitializers(this, _reactivate_extraInitializers);
        }
        return CreateVenueStaffInput_1;
    }());
    __setFunctionName(_classThis, "CreateVenueStaffInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _fullName_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _phoneNumber_decorators = [(0, graphql_1.Field)({
                description: 'Their real Nepali mobile. Also how we recognise an account they already have.',
            }), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueMemberRole; }), (0, class_validator_1.IsEnum)(client_1.VenueMemberRole)];
        _password_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Starter password for a newly minted login. Omit and the server generates a strong one. Ignored entirely when attaching an existing account — that person keeps their own password.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(128)];
        _attachExistingConfirmed_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: "Set once the owner has confirmed they mean to give an existing Arena NP account access to this venue. Without it, a mobile that matches someone else's account is refused rather than acted on.",
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        _reactivate_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Switch a suspended seat back on instead of refusing as a duplicate.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, null, _attachExistingConfirmed_decorators, { kind: "field", name: "attachExistingConfirmed", static: false, private: false, access: { has: function (obj) { return "attachExistingConfirmed" in obj; }, get: function (obj) { return obj.attachExistingConfirmed; }, set: function (obj, value) { obj.attachExistingConfirmed = value; } }, metadata: _metadata }, _attachExistingConfirmed_initializers, _attachExistingConfirmed_extraInitializers);
        __esDecorate(null, null, _reactivate_decorators, { kind: "field", name: "reactivate", static: false, private: false, access: { has: function (obj) { return "reactivate" in obj; }, get: function (obj) { return obj.reactivate; }, set: function (obj, value) { obj.reactivate = value; } }, metadata: _metadata }, _reactivate_initializers, _reactivate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateVenueStaffInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateVenueStaffInput = _classThis;
}();
exports.CreateVenueStaffInput = CreateVenueStaffInput;
var UpdateVenueStaffInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var UpdateVenueStaffInput = _classThis = /** @class */ (function () {
        function UpdateVenueStaffInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            this.role = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            __runInitializers(this, _role_extraInitializers);
        }
        return UpdateVenueStaffInput_1;
    }());
    __setFunctionName(_classThis, "UpdateVenueStaffInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueMemberRole; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.VenueMemberRole)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateVenueStaffInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateVenueStaffInput = _classThis;
}();
exports.UpdateVenueStaffInput = UpdateVenueStaffInput;
var SetVenueStaffStatusInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var SetVenueStaffStatusInput = _classThis = /** @class */ (function () {
        function SetVenueStaffStatusInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            this.status = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return SetVenueStaffStatusInput_1;
    }());
    __setFunctionName(_classThis, "SetVenueStaffStatusInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipStatus; }, { description: 'ACTIVE or SUSPENDED.' }), (0, class_validator_1.IsEnum)(client_1.MembershipStatus)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SetVenueStaffStatusInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SetVenueStaffStatusInput = _classThis;
}();
exports.SetVenueStaffStatusInput = SetVenueStaffStatusInput;
var RemoveVenueStaffInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var RemoveVenueStaffInput = _classThis = /** @class */ (function () {
        function RemoveVenueStaffInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            __runInitializers(this, _membershipId_extraInitializers);
        }
        return RemoveVenueStaffInput_1;
    }());
    __setFunctionName(_classThis, "RemoveVenueStaffInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RemoveVenueStaffInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RemoveVenueStaffInput = _classThis;
}();
exports.RemoveVenueStaffInput = RemoveVenueStaffInput;
var ResetVenueStaffPasswordInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var ResetVenueStaffPasswordInput = _classThis = /** @class */ (function () {
        function ResetVenueStaffPasswordInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            this.password = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            __runInitializers(this, _password_extraInitializers);
        }
        return ResetVenueStaffPasswordInput_1;
    }());
    __setFunctionName(_classThis, "ResetVenueStaffPasswordInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _password_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Omit and the server generates a strong one.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(128)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResetVenueStaffPasswordInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResetVenueStaffPasswordInput = _classThis;
}();
exports.ResetVenueStaffPasswordInput = ResetVenueStaffPasswordInput;
var VenueStaffActivityInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _from_decorators;
    var _from_initializers = [];
    var _from_extraInitializers = [];
    var _to_decorators;
    var _to_initializers = [];
    var _to_extraInitializers = [];
    var VenueStaffActivityInput = _classThis = /** @class */ (function () {
        function VenueStaffActivityInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.membershipId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _membershipId_initializers, void 0));
            this.from = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _from_initializers, void 0));
            this.to = (__runInitializers(this, _from_extraInitializers), __runInitializers(this, _to_initializers, void 0));
            __runInitializers(this, _to_extraInitializers);
        }
        return VenueStaffActivityInput_1;
    }());
    __setFunctionName(_classThis, "VenueStaffActivityInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _from_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Defaults to 30 days ago.' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _to_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Defaults to now.' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _from_decorators, { kind: "field", name: "from", static: false, private: false, access: { has: function (obj) { return "from" in obj; }, get: function (obj) { return obj.from; }, set: function (obj, value) { obj.from = value; } }, metadata: _metadata }, _from_initializers, _from_extraInitializers);
        __esDecorate(null, null, _to_decorators, { kind: "field", name: "to", static: false, private: false, access: { has: function (obj) { return "to" in obj; }, get: function (obj) { return obj.to; }, set: function (obj, value) { obj.to = value; } }, metadata: _metadata }, _to_initializers, _to_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueStaffActivityInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueStaffActivityInput = _classThis;
}();
exports.VenueStaffActivityInput = VenueStaffActivityInput;
