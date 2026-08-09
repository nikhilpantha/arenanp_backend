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
exports.ResendVenueInvitationInput = exports.RevokeVenueInvitationInput = exports.AcceptVenueInvitationInput = exports.InviteVenueInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var InviteVenueInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var InviteVenueInput = _classThis = /** @class */ (function () {
        function InviteVenueInput_1() {
            this.email = __runInitializers(this, _email_initializers, void 0);
            this.fullName = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.phoneNumber = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
            __runInitializers(this, _phoneNumber_extraInitializers);
        }
        return InviteVenueInput_1;
    }());
    __setFunctionName(_classThis, "InviteVenueInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _email_decorators = [(0, graphql_1.Field)({ description: 'Where the setup link will be sent.' }), (0, class_validator_1.IsEmail)(), (0, class_validator_1.MaxLength)(120)];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Optional — pre-fills the owner record.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _phoneNumber_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Optional — pre-fills the owner record.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InviteVenueInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InviteVenueInput = _classThis;
}();
exports.InviteVenueInput = InviteVenueInput;
var AcceptVenueInvitationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var AcceptVenueInvitationInput = _classThis = /** @class */ (function () {
        function AcceptVenueInvitationInput_1() {
            this.token = __runInitializers(this, _token_initializers, void 0);
            this.password = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _password_initializers, void 0));
            __runInitializers(this, _password_extraInitializers);
        }
        return AcceptVenueInvitationInput_1;
    }());
    __setFunctionName(_classThis, "AcceptVenueInvitationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _token_decorators = [(0, graphql_1.Field)({ description: 'The token from the email link (format: <id>.<secret>).' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(20), (0, class_validator_1.MaxLength)(200)];
        _password_decorators = [(0, graphql_1.Field)({ description: 'New password — 8 characters minimum.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8), (0, class_validator_1.MaxLength)(128)];
        __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
        __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AcceptVenueInvitationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AcceptVenueInvitationInput = _classThis;
}();
exports.AcceptVenueInvitationInput = AcceptVenueInvitationInput;
var RevokeVenueInvitationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _invitationId_decorators;
    var _invitationId_initializers = [];
    var _invitationId_extraInitializers = [];
    var RevokeVenueInvitationInput = _classThis = /** @class */ (function () {
        function RevokeVenueInvitationInput_1() {
            this.invitationId = __runInitializers(this, _invitationId_initializers, void 0);
            __runInitializers(this, _invitationId_extraInitializers);
        }
        return RevokeVenueInvitationInput_1;
    }());
    __setFunctionName(_classThis, "RevokeVenueInvitationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _invitationId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _invitationId_decorators, { kind: "field", name: "invitationId", static: false, private: false, access: { has: function (obj) { return "invitationId" in obj; }, get: function (obj) { return obj.invitationId; }, set: function (obj, value) { obj.invitationId = value; } }, metadata: _metadata }, _invitationId_initializers, _invitationId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RevokeVenueInvitationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RevokeVenueInvitationInput = _classThis;
}();
exports.RevokeVenueInvitationInput = RevokeVenueInvitationInput;
var ResendVenueInvitationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _invitationId_decorators;
    var _invitationId_initializers = [];
    var _invitationId_extraInitializers = [];
    var ResendVenueInvitationInput = _classThis = /** @class */ (function () {
        function ResendVenueInvitationInput_1() {
            this.invitationId = __runInitializers(this, _invitationId_initializers, void 0);
            __runInitializers(this, _invitationId_extraInitializers);
        }
        return ResendVenueInvitationInput_1;
    }());
    __setFunctionName(_classThis, "ResendVenueInvitationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _invitationId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        __esDecorate(null, null, _invitationId_decorators, { kind: "field", name: "invitationId", static: false, private: false, access: { has: function (obj) { return "invitationId" in obj; }, get: function (obj) { return obj.invitationId; }, set: function (obj, value) { obj.invitationId = value; } }, metadata: _metadata }, _invitationId_initializers, _invitationId_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ResendVenueInvitationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ResendVenueInvitationInput = _classThis;
}();
exports.ResendVenueInvitationInput = ResendVenueInvitationInput;
