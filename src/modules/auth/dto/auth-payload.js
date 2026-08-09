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
exports.AuthPayload = void 0;
var graphql_1 = require("@nestjs/graphql");
var user_model_1 = require("../../users/dto/user.model");
var AuthPayload = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _accessToken_decorators;
    var _accessToken_initializers = [];
    var _accessToken_extraInitializers = [];
    var _tokenType_decorators;
    var _tokenType_initializers = [];
    var _tokenType_extraInitializers = [];
    var _expiresAt_decorators;
    var _expiresAt_initializers = [];
    var _expiresAt_extraInitializers = [];
    var _refreshToken_decorators;
    var _refreshToken_initializers = [];
    var _refreshToken_extraInitializers = [];
    var _refreshExpiresAt_decorators;
    var _refreshExpiresAt_initializers = [];
    var _refreshExpiresAt_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var AuthPayload = _classThis = /** @class */ (function () {
        function AuthPayload_1() {
            this.accessToken = __runInitializers(this, _accessToken_initializers, void 0);
            this.tokenType = (__runInitializers(this, _accessToken_extraInitializers), __runInitializers(this, _tokenType_initializers, void 0));
            this.expiresAt = (__runInitializers(this, _tokenType_extraInitializers), __runInitializers(this, _expiresAt_initializers, void 0));
            /**
             * Only ever populated for the phone app, which identifies itself with
             * `x-arenanp-client: app`. Browsers get the refresh token as an httpOnly cookie
             * instead — handing it to page JavaScript would defeat the point of the cookie.
             */
            this.refreshToken = (__runInitializers(this, _expiresAt_extraInitializers), __runInitializers(this, _refreshToken_initializers, void 0));
            this.refreshExpiresAt = (__runInitializers(this, _refreshToken_extraInitializers), __runInitializers(this, _refreshExpiresAt_initializers, void 0));
            this.user = (__runInitializers(this, _refreshExpiresAt_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
        return AuthPayload_1;
    }());
    __setFunctionName(_classThis, "AuthPayload");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _accessToken_decorators = [(0, graphql_1.Field)()];
        _tokenType_decorators = [(0, graphql_1.Field)()];
        _expiresAt_decorators = [(0, graphql_1.Field)({ description: 'When the access token dies. Refresh before this to stay signed in.' })];
        _refreshToken_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Refresh token, for clients that store it themselves (the phone app). Null on web, ' +
                    'where it is set as an httpOnly cookie the page cannot read.',
            })];
        _refreshExpiresAt_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'When the session ends if it goes unused. Every refresh pushes this forward, so ' +
                    'an active user is never signed out.',
            })];
        _user_decorators = [(0, graphql_1.Field)(function () { return user_model_1.User; })];
        __esDecorate(null, null, _accessToken_decorators, { kind: "field", name: "accessToken", static: false, private: false, access: { has: function (obj) { return "accessToken" in obj; }, get: function (obj) { return obj.accessToken; }, set: function (obj, value) { obj.accessToken = value; } }, metadata: _metadata }, _accessToken_initializers, _accessToken_extraInitializers);
        __esDecorate(null, null, _tokenType_decorators, { kind: "field", name: "tokenType", static: false, private: false, access: { has: function (obj) { return "tokenType" in obj; }, get: function (obj) { return obj.tokenType; }, set: function (obj, value) { obj.tokenType = value; } }, metadata: _metadata }, _tokenType_initializers, _tokenType_extraInitializers);
        __esDecorate(null, null, _expiresAt_decorators, { kind: "field", name: "expiresAt", static: false, private: false, access: { has: function (obj) { return "expiresAt" in obj; }, get: function (obj) { return obj.expiresAt; }, set: function (obj, value) { obj.expiresAt = value; } }, metadata: _metadata }, _expiresAt_initializers, _expiresAt_extraInitializers);
        __esDecorate(null, null, _refreshToken_decorators, { kind: "field", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; }, set: function (obj, value) { obj.refreshToken = value; } }, metadata: _metadata }, _refreshToken_initializers, _refreshToken_extraInitializers);
        __esDecorate(null, null, _refreshExpiresAt_decorators, { kind: "field", name: "refreshExpiresAt", static: false, private: false, access: { has: function (obj) { return "refreshExpiresAt" in obj; }, get: function (obj) { return obj.refreshExpiresAt; }, set: function (obj, value) { obj.refreshExpiresAt = value; } }, metadata: _metadata }, _refreshExpiresAt_initializers, _refreshExpiresAt_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthPayload = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthPayload = _classThis;
}();
exports.AuthPayload = AuthPayload;
