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
exports.PasswordResetTicket = void 0;
var graphql_1 = require("@nestjs/graphql");
/// Proof that a password-reset code was just verified. Single use, short
/// lived, and worthless on its own — it only unlocks `resetPassword` for the
/// same number.
var PasswordResetTicket = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _resetToken_decorators;
    var _resetToken_initializers = [];
    var _resetToken_extraInitializers = [];
    var _expiresInSeconds_decorators;
    var _expiresInSeconds_initializers = [];
    var _expiresInSeconds_extraInitializers = [];
    var PasswordResetTicket = _classThis = /** @class */ (function () {
        function PasswordResetTicket_1() {
            this.resetToken = __runInitializers(this, _resetToken_initializers, void 0);
            this.expiresInSeconds = (__runInitializers(this, _resetToken_extraInitializers), __runInitializers(this, _expiresInSeconds_initializers, void 0));
            __runInitializers(this, _expiresInSeconds_extraInitializers);
        }
        return PasswordResetTicket_1;
    }());
    __setFunctionName(_classThis, "PasswordResetTicket");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _resetToken_decorators = [(0, graphql_1.Field)({ description: 'Pass this back to resetPassword. Valid once.' })];
        _expiresInSeconds_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'How long the ticket stays usable.' })];
        __esDecorate(null, null, _resetToken_decorators, { kind: "field", name: "resetToken", static: false, private: false, access: { has: function (obj) { return "resetToken" in obj; }, get: function (obj) { return obj.resetToken; }, set: function (obj, value) { obj.resetToken = value; } }, metadata: _metadata }, _resetToken_initializers, _resetToken_extraInitializers);
        __esDecorate(null, null, _expiresInSeconds_decorators, { kind: "field", name: "expiresInSeconds", static: false, private: false, access: { has: function (obj) { return "expiresInSeconds" in obj; }, get: function (obj) { return obj.expiresInSeconds; }, set: function (obj, value) { obj.expiresInSeconds = value; } }, metadata: _metadata }, _expiresInSeconds_initializers, _expiresInSeconds_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PasswordResetTicket = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PasswordResetTicket = _classThis;
}();
exports.PasswordResetTicket = PasswordResetTicket;
