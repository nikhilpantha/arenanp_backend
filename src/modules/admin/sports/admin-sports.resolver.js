"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSportsResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_sport_model_1 = require("./dto/admin-sport.model");
var AdminSportsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_sport_model_1.AdminSport; }), (0, require_permission_decorator_1.RequirePermission)('sports.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _iconUrl_decorators;
    var _list_decorators;
    var _detail_decorators;
    var _create_decorators;
    var _update_decorators;
    var _delete_decorators;
    var AdminSportsResolver = _classThis = /** @class */ (function () {
        function AdminSportsResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        /** Presign the stored sport-icon key into a temporary download URL on read. */
        AdminSportsResolver_1.prototype.iconUrl = function (sport) {
            return this.storage.getDownloadUrl(sport.iconUrl);
        };
        AdminSportsResolver_1.prototype.list = function (activeOnly) {
            return this.service.list(activeOnly);
        };
        AdminSportsResolver_1.prototype.detail = function (id) {
            return this.service.getOne(id);
        };
        AdminSportsResolver_1.prototype.create = function (input, actor) {
            return this.service.create(input, actor);
        };
        AdminSportsResolver_1.prototype.update = function (input) {
            return this.service.update(input);
        };
        AdminSportsResolver_1.prototype.delete = function (id) {
            return this.service.delete(id);
        };
        return AdminSportsResolver_1;
    }());
    __setFunctionName(_classThis, "AdminSportsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _iconUrl_decorators = [(0, graphql_1.ResolveField)(function () { return String; }, { nullable: true })];
        _list_decorators = [(0, graphql_1.Query)(function () { return [admin_sport_model_1.AdminSport]; }, {
                name: 'adminListSports',
                description: 'Catalogue of sports. Pass `activeOnly: true` to filter to the ones currently bookable.',
            })];
        _detail_decorators = [(0, graphql_1.Query)(function () { return admin_sport_model_1.AdminSport; }, { name: 'adminSport' })];
        _create_decorators = [(0, require_permission_decorator_1.RequirePermission)('sports.create'), (0, graphql_1.Mutation)(function () { return admin_sport_model_1.AdminSport; }, { name: 'adminCreateSport' })];
        _update_decorators = [(0, require_permission_decorator_1.RequirePermission)('sports.edit'), (0, graphql_1.Mutation)(function () { return admin_sport_model_1.AdminSport; }, { name: 'adminUpdateSport' })];
        _delete_decorators = [(0, require_permission_decorator_1.RequirePermission)('sports.delete'), (0, graphql_1.Mutation)(function () { return Boolean; }, {
                name: 'adminDeleteSport',
                description: 'Permanently remove a sport. Blocked when courts / tournaments / venue offerings still reference it — deactivate instead.',
            })];
        __esDecorate(_classThis, null, _iconUrl_decorators, { kind: "method", name: "iconUrl", static: false, private: false, access: { has: function (obj) { return "iconUrl" in obj; }, get: function (obj) { return obj.iconUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _detail_decorators, { kind: "method", name: "detail", static: false, private: false, access: { has: function (obj) { return "detail" in obj; }, get: function (obj) { return obj.detail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _delete_decorators, { kind: "method", name: "delete", static: false, private: false, access: { has: function (obj) { return "delete" in obj; }, get: function (obj) { return obj.delete; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminSportsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminSportsResolver = _classThis;
}();
exports.AdminSportsResolver = AdminSportsResolver;
