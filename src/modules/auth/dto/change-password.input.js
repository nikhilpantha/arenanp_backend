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
exports.ChangePasswordInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var ChangePasswordInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _currentPassword_decorators;
    var _currentPassword_initializers = [];
    var _currentPassword_extraInitializers = [];
    var _newPassword_decorators;
    var _newPassword_initializers = [];
    var _newPassword_extraInitializers = [];
    var ChangePasswordInput = _classThis = /** @class */ (function () {
        function ChangePasswordInput_1() {
            this.currentPassword = __runInitializers(this, _currentPassword_initializers, void 0);
            this.newPassword = (__runInitializers(this, _currentPassword_extraInitializers), __runInitializers(this, _newPassword_initializers, void 0));
            __runInitializers(this, _newPassword_extraInitializers);
        }
        return ChangePasswordInput_1;
    }());
    __setFunctionName(_classThis, "ChangePasswordInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _currentPassword_decorators = [(0, graphql_1.Field)({ description: 'The password they are signing in with today.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(1, { message: 'Enter your current password.' })];
        _newPassword_decorators = [(0, graphql_1.Field)({ description: 'The new password. Must not be the current one.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(8, { message: 'Use at least 8 characters.' }), (0, class_validator_1.MaxLength)(128)];
        __esDecorate(null, null, _currentPassword_decorators, { kind: "field", name: "currentPassword", static: false, private: false, access: { has: function (obj) { return "currentPassword" in obj; }, get: function (obj) { return obj.currentPassword; }, set: function (obj, value) { obj.currentPassword = value; } }, metadata: _metadata }, _currentPassword_initializers, _currentPassword_extraInitializers);
        __esDecorate(null, null, _newPassword_decorators, { kind: "field", name: "newPassword", static: false, private: false, access: { has: function (obj) { return "newPassword" in obj; }, get: function (obj) { return obj.newPassword; }, set: function (obj, value) { obj.newPassword = value; } }, metadata: _metadata }, _newPassword_initializers, _newPassword_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChangePasswordInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChangePasswordInput = _classThis;
}();
exports.ChangePasswordInput = ChangePasswordInput;
