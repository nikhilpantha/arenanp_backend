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
exports.AdminPaymentsResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_payment_model_1 = require("./dto/admin-payment.model");
var list_admin_payments_input_1 = require("./dto/list-admin-payments.input");
var paginated_admin_payments_1 = require("./dto/paginated-admin-payments");
var settlement_export_row_model_1 = require("./dto/settlement-export-row.model");
var AdminPaymentsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_payment_model_1.AdminPayment; }), (0, require_permission_decorator_1.RequirePermission)('payments.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _list_decorators;
    var _detail_decorators;
    var _overview_decorators;
    var _export_decorators;
    var _markPaid_decorators;
    var AdminPaymentsResolver = _classThis = /** @class */ (function () {
        function AdminPaymentsResolver_1(service) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
        }
        AdminPaymentsResolver_1.prototype.list = function (input) {
            return this.service.list(input !== null && input !== void 0 ? input : new list_admin_payments_input_1.ListAdminPaymentsInput());
        };
        AdminPaymentsResolver_1.prototype.detail = function (id) {
            return this.service.getOne(id);
        };
        AdminPaymentsResolver_1.prototype.overview = function (input) {
            return this.service.overview(input !== null && input !== void 0 ? input : new list_admin_payments_input_1.ListAdminPaymentsInput());
        };
        AdminPaymentsResolver_1.prototype.export = function (input) {
            return this.service.exportSettlements(input !== null && input !== void 0 ? input : new list_admin_payments_input_1.ListAdminPaymentsInput());
        };
        AdminPaymentsResolver_1.prototype.markPaid = function (input, actor) {
            return this.service.markSettlementPaid(input, actor);
        };
        return AdminPaymentsResolver_1;
    }());
    __setFunctionName(_classThis, "AdminPaymentsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _list_decorators = [(0, graphql_1.Query)(function () { return paginated_admin_payments_1.PaginatedAdminPayments; }, {
                name: 'adminListPayments',
                description: 'List payments with provider / status / settlement / date filters.',
            })];
        _detail_decorators = [(0, graphql_1.Query)(function () { return admin_payment_model_1.AdminPayment; }, {
                name: 'adminPaymentDetail',
                description: 'Single payment with commission breakdown and settlement info.',
            })];
        _overview_decorators = [(0, graphql_1.Query)(function () { return admin_payment_model_1.PaymentsOverview; }, {
                name: 'adminPaymentsOverview',
                description: 'Aggregated totals (gross / commission / venue-owed / venue-settled / refunded) for the filter set.',
            })];
        _export_decorators = [(0, require_permission_decorator_1.RequirePermission)('payouts.view'), (0, graphql_1.Query)(function () { return [settlement_export_row_model_1.SettlementExportRow]; }, {
                name: 'adminSettlementsExport',
                description: 'Returns every payment matching the filter set as a flat CSV-ready array. The frontend serialises to CSV.',
            })];
        _markPaid_decorators = [(0, require_permission_decorator_1.RequirePermission)('payouts.settle'), (0, graphql_1.Mutation)(function () { return admin_payment_model_1.AdminPayment; }, {
                name: 'adminMarkSettlementPaid',
                description: 'Mark a payment’s settlement as PAID. Creates the Settlement row on first invocation, then flips it to PAID.',
            })];
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _detail_decorators, { kind: "method", name: "detail", static: false, private: false, access: { has: function (obj) { return "detail" in obj; }, get: function (obj) { return obj.detail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _overview_decorators, { kind: "method", name: "overview", static: false, private: false, access: { has: function (obj) { return "overview" in obj; }, get: function (obj) { return obj.overview; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _export_decorators, { kind: "method", name: "export", static: false, private: false, access: { has: function (obj) { return "export" in obj; }, get: function (obj) { return obj.export; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markPaid_decorators, { kind: "method", name: "markPaid", static: false, private: false, access: { has: function (obj) { return "markPaid" in obj; }, get: function (obj) { return obj.markPaid; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminPaymentsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminPaymentsResolver = _classThis;
}();
exports.AdminPaymentsResolver = AdminPaymentsResolver;
