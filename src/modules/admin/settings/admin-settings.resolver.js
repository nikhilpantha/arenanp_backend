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
exports.AdminSettingsResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var platform_settings_model_1 = require("./dto/platform-settings.model");
var AdminSettingsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return platform_settings_model_1.PlatformSettings; }), (0, require_permission_decorator_1.RequirePermission)('settings.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _get_decorators;
    var _update_decorators;
    var AdminSettingsResolver = _classThis = /** @class */ (function () {
        function AdminSettingsResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        AdminSettingsResolver_1.prototype.get = function () {
            return this.service.get();
        };
        AdminSettingsResolver_1.prototype.update = function (input, actor) {
            return this.service.update(input, actor);
        };
        return AdminSettingsResolver_1;
    }());
    __setFunctionName(_classThis, "AdminSettingsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _get_decorators = [(0, graphql_1.Query)(function () { return platform_settings_model_1.PlatformSettings; }, {
                name: 'adminPlatformSettings',
                description: 'Read the singleton platform settings row. Created on first access if missing.',
            })];
        _update_decorators = [(0, require_permission_decorator_1.RequirePermission)('settings.edit'), (0, graphql_1.Mutation)(function () { return platform_settings_model_1.PlatformSettings; }, {
                name: 'adminUpdatePlatformSettings',
                description: 'Partially update platform settings. Only fields present in the input are touched.',
            })];
        __esDecorate(_classThis, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: function (obj) { return "get" in obj; }, get: function (obj) { return obj.get; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminSettingsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminSettingsResolver = _classThis;
}();
exports.AdminSettingsResolver = AdminSettingsResolver;
