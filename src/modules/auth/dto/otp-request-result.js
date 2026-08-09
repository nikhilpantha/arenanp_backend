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
exports.OtpRequestResult = void 0;
var graphql_1 = require("@nestjs/graphql");
var OtpRequestResult = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _phoneNumber_decorators;
    var _phoneNumber_initializers = [];
    var _phoneNumber_extraInitializers = [];
    var _expiresInSeconds_decorators;
    var _expiresInSeconds_initializers = [];
    var _expiresInSeconds_extraInitializers = [];
    var _resendAvailableInSeconds_decorators;
    var _resendAvailableInSeconds_initializers = [];
    var _resendAvailableInSeconds_extraInitializers = [];
    var _devCode_decorators;
    var _devCode_initializers = [];
    var _devCode_extraInitializers = [];
    var _roleAdded_decorators;
    var _roleAdded_initializers = [];
    var _roleAdded_extraInitializers = [];
    var OtpRequestResult = _classThis = /** @class */ (function () {
        function OtpRequestResult_1() {
            this.phoneNumber = __runInitializers(this, _phoneNumber_initializers, void 0);
            this.expiresInSeconds = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _expiresInSeconds_initializers, void 0));
            this.resendAvailableInSeconds = (__runInitializers(this, _expiresInSeconds_extraInitializers), __runInitializers(this, _resendAvailableInSeconds_initializers, void 0));
            this.devCode = (__runInitializers(this, _resendAvailableInSeconds_extraInitializers), __runInitializers(this, _devCode_initializers, void 0));
            this.roleAdded = (__runInitializers(this, _devCode_extraInitializers), __runInitializers(this, _roleAdded_initializers, void 0));
            __runInitializers(this, _roleAdded_extraInitializers);
        }
        return OtpRequestResult_1;
    }());
    __setFunctionName(_classThis, "OtpRequestResult");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _phoneNumber_decorators = [(0, graphql_1.Field)()];
        _expiresInSeconds_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'How long until the OTP expires.' })];
        _resendAvailableInSeconds_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Seconds the client must wait before requesting another OTP.' })];
        _devCode_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Only populated in dev (SMS_PROVIDER=stub).' })];
        _roleAdded_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'True when this request granted a capability the account did not have yet.',
            })];
        __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: function (obj) { return "phoneNumber" in obj; }, get: function (obj) { return obj.phoneNumber; }, set: function (obj, value) { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
        __esDecorate(null, null, _expiresInSeconds_decorators, { kind: "field", name: "expiresInSeconds", static: false, private: false, access: { has: function (obj) { return "expiresInSeconds" in obj; }, get: function (obj) { return obj.expiresInSeconds; }, set: function (obj, value) { obj.expiresInSeconds = value; } }, metadata: _metadata }, _expiresInSeconds_initializers, _expiresInSeconds_extraInitializers);
        __esDecorate(null, null, _resendAvailableInSeconds_decorators, { kind: "field", name: "resendAvailableInSeconds", static: false, private: false, access: { has: function (obj) { return "resendAvailableInSeconds" in obj; }, get: function (obj) { return obj.resendAvailableInSeconds; }, set: function (obj, value) { obj.resendAvailableInSeconds = value; } }, metadata: _metadata }, _resendAvailableInSeconds_initializers, _resendAvailableInSeconds_extraInitializers);
        __esDecorate(null, null, _devCode_decorators, { kind: "field", name: "devCode", static: false, private: false, access: { has: function (obj) { return "devCode" in obj; }, get: function (obj) { return obj.devCode; }, set: function (obj, value) { obj.devCode = value; } }, metadata: _metadata }, _devCode_initializers, _devCode_extraInitializers);
        __esDecorate(null, null, _roleAdded_decorators, { kind: "field", name: "roleAdded", static: false, private: false, access: { has: function (obj) { return "roleAdded" in obj; }, get: function (obj) { return obj.roleAdded; }, set: function (obj, value) { obj.roleAdded = value; } }, metadata: _metadata }, _roleAdded_initializers, _roleAdded_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OtpRequestResult = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OtpRequestResult = _classThis;
}();
exports.OtpRequestResult = OtpRequestResult;
