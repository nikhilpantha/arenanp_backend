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
exports.AdminRefundsResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_refund_model_1 = require("./dto/admin-refund.model");
var list_admin_refunds_input_1 = require("./dto/list-admin-refunds.input");
var paginated_admin_refunds_1 = require("./dto/paginated-admin-refunds");
var AdminRefundsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_refund_model_1.AdminRefundRequest; }), (0, require_permission_decorator_1.RequirePermission)('refunds.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _list_decorators;
    var _detail_decorators;
    var _approve_decorators;
    var _reject_decorators;
    var _markProcessed_decorators;
    var AdminRefundsResolver = _classThis = /** @class */ (function () {
        function AdminRefundsResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        AdminRefundsResolver_1.prototype.list = function (input) {
            return this.service.list(input !== null && input !== void 0 ? input : new list_admin_refunds_input_1.ListAdminRefundsInput());
        };
        AdminRefundsResolver_1.prototype.detail = function (id) {
            return this.service.getOne(id);
        };
        AdminRefundsResolver_1.prototype.approve = function (input, actor) {
            return this.service.approve(input, actor);
        };
        AdminRefundsResolver_1.prototype.reject = function (input, actor) {
            return this.service.reject(input, actor);
        };
        AdminRefundsResolver_1.prototype.markProcessed = function (input, actor) {
            return this.service.markProcessed(input, actor);
        };
        return AdminRefundsResolver_1;
    }());
    __setFunctionName(_classThis, "AdminRefundsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _list_decorators = [(0, graphql_1.Query)(function () { return paginated_admin_refunds_1.PaginatedAdminRefunds; }, {
                name: 'adminListRefundRequests',
                description: 'List refund requests with optional status / search filters.',
            })];
        _detail_decorators = [(0, graphql_1.Query)(function () { return admin_refund_model_1.AdminRefundRequest; }, {
                name: 'adminRefundRequestDetail',
                description: 'Single refund request — full booking + payment context.',
            })];
        _approve_decorators = [(0, require_permission_decorator_1.RequirePermission)('refunds.approve'), (0, graphql_1.Mutation)(function () { return admin_refund_model_1.AdminRefundRequest; }, { name: 'adminApproveRefund' })];
        _reject_decorators = [(0, require_permission_decorator_1.RequirePermission)('refunds.reject'), (0, graphql_1.Mutation)(function () { return admin_refund_model_1.AdminRefundRequest; }, { name: 'adminRejectRefund' })];
        _markProcessed_decorators = [(0, require_permission_decorator_1.RequirePermission)('payments.refund'), (0, graphql_1.Mutation)(function () { return admin_refund_model_1.AdminRefundRequest; }, {
                name: 'adminMarkRefundProcessed',
                description: 'After the bank-side refund clears: flips RefundRequest -> PROCESSED, Payment -> REFUNDED / PARTIALLY_REFUNDED, and freezes any unsettled Settlement.',
            })];
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _detail_decorators, { kind: "method", name: "detail", static: false, private: false, access: { has: function (obj) { return "detail" in obj; }, get: function (obj) { return obj.detail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approve_decorators, { kind: "method", name: "approve", static: false, private: false, access: { has: function (obj) { return "approve" in obj; }, get: function (obj) { return obj.approve; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _reject_decorators, { kind: "method", name: "reject", static: false, private: false, access: { has: function (obj) { return "reject" in obj; }, get: function (obj) { return obj.reject; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markProcessed_decorators, { kind: "method", name: "markProcessed", static: false, private: false, access: { has: function (obj) { return "markProcessed" in obj; }, get: function (obj) { return obj.markProcessed; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminRefundsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminRefundsResolver = _classThis;
}();
exports.AdminRefundsResolver = AdminRefundsResolver;
