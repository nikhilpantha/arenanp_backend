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
exports.VenueSalaryPeriod = exports.StaffSalaryRow = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../common/enums");
var StaffSalaryRow = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "One staff member's pay position for a period." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _membershipId_decorators;
    var _membershipId_initializers = [];
    var _membershipId_extraInitializers = [];
    var _fullName_decorators;
    var _fullName_initializers = [];
    var _fullName_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _basis_decorators;
    var _basis_initializers = [];
    var _basis_extraInitializers = [];
    var _rate_decorators;
    var _rate_initializers = [];
    var _rate_extraInitializers = [];
    var _committed_decorators;
    var _committed_initializers = [];
    var _committed_extraInitializers = [];
    var _paid_decorators;
    var _paid_initializers = [];
    var _paid_extraInitializers = [];
    var _due_decorators;
    var _due_initializers = [];
    var _due_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _paymentCount_decorators;
    var _paymentCount_initializers = [];
    var _paymentCount_extraInitializers = [];
    var StaffSalaryRow = _classThis = /** @class */ (function () {
        function StaffSalaryRow_1() {
            this.membershipId = __runInitializers(this, _membershipId_initializers, void 0);
            this.fullName = (__runInitializers(this, _membershipId_extraInitializers), __runInitializers(this, _fullName_initializers, void 0));
            this.role = (__runInitializers(this, _fullName_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.basis = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _basis_initializers, void 0));
            this.rate = (__runInitializers(this, _basis_extraInitializers), __runInitializers(this, _rate_initializers, void 0));
            this.committed = (__runInitializers(this, _rate_extraInitializers), __runInitializers(this, _committed_initializers, void 0));
            this.paid = (__runInitializers(this, _committed_extraInitializers), __runInitializers(this, _paid_initializers, void 0));
            this.due = (__runInitializers(this, _paid_extraInitializers), __runInitializers(this, _due_initializers, void 0));
            this.quantity = (__runInitializers(this, _due_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
            this.paymentCount = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _paymentCount_initializers, void 0));
            __runInitializers(this, _paymentCount_extraInitializers);
        }
        return StaffSalaryRow_1;
    }());
    __setFunctionName(_classThis, "StaffSalaryRow");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _membershipId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _fullName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _role_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueMemberRole; })];
        _basis_decorators = [(0, graphql_1.Field)(function () { return client_1.PayBasis; }, { nullable: true, description: 'Null for anyone not on a wage.' })];
        _rate_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Per month, per day or per session.' })];
        _committed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: 'What is owed for the period. NULL — not zero — for daily and per-session staff until a count is entered, because nothing here records days worked and a confident zero would be a lie.',
            })];
        _paid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Paid against this period so far.' })];
        _due_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: 'committed − paid, floored at zero. Null whenever `committed` is.',
            })];
        _quantity_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: 'Days worked or sessions run, as entered when settling up.',
            })];
        _paymentCount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'How many payments make up `paid` — advances show as several.' })];
        __esDecorate(null, null, _membershipId_decorators, { kind: "field", name: "membershipId", static: false, private: false, access: { has: function (obj) { return "membershipId" in obj; }, get: function (obj) { return obj.membershipId; }, set: function (obj, value) { obj.membershipId = value; } }, metadata: _metadata }, _membershipId_initializers, _membershipId_extraInitializers);
        __esDecorate(null, null, _fullName_decorators, { kind: "field", name: "fullName", static: false, private: false, access: { has: function (obj) { return "fullName" in obj; }, get: function (obj) { return obj.fullName; }, set: function (obj, value) { obj.fullName = value; } }, metadata: _metadata }, _fullName_initializers, _fullName_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _basis_decorators, { kind: "field", name: "basis", static: false, private: false, access: { has: function (obj) { return "basis" in obj; }, get: function (obj) { return obj.basis; }, set: function (obj, value) { obj.basis = value; } }, metadata: _metadata }, _basis_initializers, _basis_extraInitializers);
        __esDecorate(null, null, _rate_decorators, { kind: "field", name: "rate", static: false, private: false, access: { has: function (obj) { return "rate" in obj; }, get: function (obj) { return obj.rate; }, set: function (obj, value) { obj.rate = value; } }, metadata: _metadata }, _rate_initializers, _rate_extraInitializers);
        __esDecorate(null, null, _committed_decorators, { kind: "field", name: "committed", static: false, private: false, access: { has: function (obj) { return "committed" in obj; }, get: function (obj) { return obj.committed; }, set: function (obj, value) { obj.committed = value; } }, metadata: _metadata }, _committed_initializers, _committed_extraInitializers);
        __esDecorate(null, null, _paid_decorators, { kind: "field", name: "paid", static: false, private: false, access: { has: function (obj) { return "paid" in obj; }, get: function (obj) { return obj.paid; }, set: function (obj, value) { obj.paid = value; } }, metadata: _metadata }, _paid_initializers, _paid_extraInitializers);
        __esDecorate(null, null, _due_decorators, { kind: "field", name: "due", static: false, private: false, access: { has: function (obj) { return "due" in obj; }, get: function (obj) { return obj.due; }, set: function (obj, value) { obj.due = value; } }, metadata: _metadata }, _due_initializers, _due_extraInitializers);
        __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
        __esDecorate(null, null, _paymentCount_decorators, { kind: "field", name: "paymentCount", static: false, private: false, access: { has: function (obj) { return "paymentCount" in obj; }, get: function (obj) { return obj.paymentCount; }, set: function (obj, value) { obj.paymentCount = value; } }, metadata: _metadata }, _paymentCount_initializers, _paymentCount_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffSalaryRow = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffSalaryRow = _classThis;
}();
exports.StaffSalaryRow = StaffSalaryRow;
var VenueSalaryPeriod = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A venue's salary position for one pay period." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _periodStart_decorators;
    var _periodStart_initializers = [];
    var _periodStart_extraInitializers = [];
    var _label_decorators;
    var _label_initializers = [];
    var _label_extraInitializers = [];
    var _rows_decorators;
    var _rows_initializers = [];
    var _rows_extraInitializers = [];
    var _committedTotal_decorators;
    var _committedTotal_initializers = [];
    var _committedTotal_extraInitializers = [];
    var _paidTotal_decorators;
    var _paidTotal_initializers = [];
    var _paidTotal_extraInitializers = [];
    var _dueTotal_decorators;
    var _dueTotal_initializers = [];
    var _dueTotal_extraInitializers = [];
    var _uncountedStaff_decorators;
    var _uncountedStaff_initializers = [];
    var _uncountedStaff_extraInitializers = [];
    var VenueSalaryPeriod = _classThis = /** @class */ (function () {
        function VenueSalaryPeriod_1() {
            this.periodStart = __runInitializers(this, _periodStart_initializers, void 0);
            this.label = (__runInitializers(this, _periodStart_extraInitializers), __runInitializers(this, _label_initializers, void 0));
            this.rows = (__runInitializers(this, _label_extraInitializers), __runInitializers(this, _rows_initializers, void 0));
            this.committedTotal = (__runInitializers(this, _rows_extraInitializers), __runInitializers(this, _committedTotal_initializers, void 0));
            this.paidTotal = (__runInitializers(this, _committedTotal_extraInitializers), __runInitializers(this, _paidTotal_initializers, void 0));
            this.dueTotal = (__runInitializers(this, _paidTotal_extraInitializers), __runInitializers(this, _dueTotal_initializers, void 0));
            this.uncountedStaff = (__runInitializers(this, _dueTotal_extraInitializers), __runInitializers(this, _uncountedStaff_initializers, void 0));
            __runInitializers(this, _uncountedStaff_extraInitializers);
        }
        return VenueSalaryPeriod_1;
    }());
    __setFunctionName(_classThis, "VenueSalaryPeriod");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _periodStart_decorators = [(0, graphql_1.Field)({ description: 'First day of the period, "yyyy-mm-dd".' })];
        _label_decorators = [(0, graphql_1.Field)({ description: 'Human label, e.g. "August 2026".' })];
        _rows_decorators = [(0, graphql_1.Field)(function () { return [StaffSalaryRow]; })];
        _committedTotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                description: 'Total owed for the period across everyone whose pay can be worked out.',
            })];
        _paidTotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _dueTotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'The "you owe staff" figure. Monthly staff only.' })];
        _uncountedStaff_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, {
                description: 'People on a daily or per-session rate with no count entered yet — they are excluded from the totals, and the screen says so rather than quietly under-reporting.',
            })];
        __esDecorate(null, null, _periodStart_decorators, { kind: "field", name: "periodStart", static: false, private: false, access: { has: function (obj) { return "periodStart" in obj; }, get: function (obj) { return obj.periodStart; }, set: function (obj, value) { obj.periodStart = value; } }, metadata: _metadata }, _periodStart_initializers, _periodStart_extraInitializers);
        __esDecorate(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: function (obj) { return "label" in obj; }, get: function (obj) { return obj.label; }, set: function (obj, value) { obj.label = value; } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
        __esDecorate(null, null, _rows_decorators, { kind: "field", name: "rows", static: false, private: false, access: { has: function (obj) { return "rows" in obj; }, get: function (obj) { return obj.rows; }, set: function (obj, value) { obj.rows = value; } }, metadata: _metadata }, _rows_initializers, _rows_extraInitializers);
        __esDecorate(null, null, _committedTotal_decorators, { kind: "field", name: "committedTotal", static: false, private: false, access: { has: function (obj) { return "committedTotal" in obj; }, get: function (obj) { return obj.committedTotal; }, set: function (obj, value) { obj.committedTotal = value; } }, metadata: _metadata }, _committedTotal_initializers, _committedTotal_extraInitializers);
        __esDecorate(null, null, _paidTotal_decorators, { kind: "field", name: "paidTotal", static: false, private: false, access: { has: function (obj) { return "paidTotal" in obj; }, get: function (obj) { return obj.paidTotal; }, set: function (obj, value) { obj.paidTotal = value; } }, metadata: _metadata }, _paidTotal_initializers, _paidTotal_extraInitializers);
        __esDecorate(null, null, _dueTotal_decorators, { kind: "field", name: "dueTotal", static: false, private: false, access: { has: function (obj) { return "dueTotal" in obj; }, get: function (obj) { return obj.dueTotal; }, set: function (obj, value) { obj.dueTotal = value; } }, metadata: _metadata }, _dueTotal_initializers, _dueTotal_extraInitializers);
        __esDecorate(null, null, _uncountedStaff_decorators, { kind: "field", name: "uncountedStaff", static: false, private: false, access: { has: function (obj) { return "uncountedStaff" in obj; }, get: function (obj) { return obj.uncountedStaff; }, set: function (obj, value) { obj.uncountedStaff = value; } }, metadata: _metadata }, _uncountedStaff_initializers, _uncountedStaff_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueSalaryPeriod = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueSalaryPeriod = _classThis;
}();
exports.VenueSalaryPeriod = VenueSalaryPeriod;
