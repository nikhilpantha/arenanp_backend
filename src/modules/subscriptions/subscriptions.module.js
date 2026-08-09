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
exports.SubscriptionsModule = void 0;
var common_1 = require("@nestjs/common");
var venue_permission_guard_1 = require("../../common/guards/venue-permission.guard");
var customers_module_1 = require("../customers/customers.module");
var subscriptions_repository_1 = require("./subscriptions.repository");
var subscriptions_resolver_1 = require("./subscriptions.resolver");
var subscriptions_service_1 = require("./subscriptions.service");
var rbac_module_1 = require("../rbac/rbac.module");
/**
 * Venue memberships: plans (the product) + subscriptions (a customer on a plan)
 * with payment/renewal history. Reads gated by bookings:read, writes by
 * memberships:manage.
 */
var SubscriptionsModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [rbac_module_1.RbacModule, customers_module_1.CustomersModule],
            providers: [
                subscriptions_resolver_1.SubscriptionsResolver,
                subscriptions_service_1.SubscriptionsService,
                subscriptions_repository_1.SubscriptionsRepository,
                venue_permission_guard_1.VenuePermissionGuard,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SubscriptionsModule = _classThis = /** @class */ (function () {
        function SubscriptionsModule_1() {
        }
        return SubscriptionsModule_1;
    }());
    __setFunctionName(_classThis, "SubscriptionsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SubscriptionsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SubscriptionsModule = _classThis;
}();
exports.SubscriptionsModule = SubscriptionsModule;
