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
exports.MarkRefundProcessedInput = exports.RejectRefundInput = exports.ApproveRefundInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var ApproveRefundInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _refundId_decorators;
    var _refundId_initializers = [];
    var _refundId_extraInitializers = [];
    var _adminNotes_decorators;
    var _adminNotes_initializers = [];
    var _adminNotes_extraInitializers = [];
    var ApproveRefundInput = _classThis = /** @class */ (function () {
        function ApproveRefundInput_1() {
            this.refundId = __runInitializers(this, _refundId_initializers, void 0);
            this.adminNotes = (__runInitializers(this, _refundId_extraInitializers), __runInitializers(this, _adminNotes_initializers, void 0));
            __runInitializers(this, _adminNotes_extraInitializers);
        }
        return ApproveRefundInput_1;
    }());
    __setFunctionName(_classThis, "ApproveRefundInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _refundId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _adminNotes_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Optional internal note.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _refundId_decorators, { kind: "field", name: "refundId", static: false, private: false, access: { has: function (obj) { return "refundId" in obj; }, get: function (obj) { return obj.refundId; }, set: function (obj, value) { obj.refundId = value; } }, metadata: _metadata }, _refundId_initializers, _refundId_extraInitializers);
        __esDecorate(null, null, _adminNotes_decorators, { kind: "field", name: "adminNotes", static: false, private: false, access: { has: function (obj) { return "adminNotes" in obj; }, get: function (obj) { return obj.adminNotes; }, set: function (obj, value) { obj.adminNotes = value; } }, metadata: _metadata }, _adminNotes_initializers, _adminNotes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApproveRefundInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApproveRefundInput = _classThis;
}();
exports.ApproveRefundInput = ApproveRefundInput;
var RejectRefundInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _refundId_decorators;
    var _refundId_initializers = [];
    var _refundId_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var RejectRefundInput = _classThis = /** @class */ (function () {
        function RejectRefundInput_1() {
            this.refundId = __runInitializers(this, _refundId_initializers, void 0);
            this.reason = (__runInitializers(this, _refundId_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return RejectRefundInput_1;
    }());
    __setFunctionName(_classThis, "RejectRefundInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _refundId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _reason_decorators = [(0, graphql_1.Field)({ description: 'Reason shown to the customer.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _refundId_decorators, { kind: "field", name: "refundId", static: false, private: false, access: { has: function (obj) { return "refundId" in obj; }, get: function (obj) { return obj.refundId; }, set: function (obj, value) { obj.refundId = value; } }, metadata: _metadata }, _refundId_initializers, _refundId_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RejectRefundInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RejectRefundInput = _classThis;
}();
exports.RejectRefundInput = RejectRefundInput;
var MarkRefundProcessedInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _refundId_decorators;
    var _refundId_initializers = [];
    var _refundId_extraInitializers = [];
    var _processorReference_decorators;
    var _processorReference_initializers = [];
    var _processorReference_extraInitializers = [];
    var _adminNotes_decorators;
    var _adminNotes_initializers = [];
    var _adminNotes_extraInitializers = [];
    var MarkRefundProcessedInput = _classThis = /** @class */ (function () {
        function MarkRefundProcessedInput_1() {
            this.refundId = __runInitializers(this, _refundId_initializers, void 0);
            this.processorReference = (__runInitializers(this, _refundId_extraInitializers), __runInitializers(this, _processorReference_initializers, void 0));
            this.adminNotes = (__runInitializers(this, _processorReference_extraInitializers), __runInitializers(this, _adminNotes_initializers, void 0));
            __runInitializers(this, _adminNotes_extraInitializers);
        }
        return MarkRefundProcessedInput_1;
    }());
    __setFunctionName(_classThis, "MarkRefundProcessedInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _refundId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _processorReference_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Bank transfer / provider refund reference.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _adminNotes_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _refundId_decorators, { kind: "field", name: "refundId", static: false, private: false, access: { has: function (obj) { return "refundId" in obj; }, get: function (obj) { return obj.refundId; }, set: function (obj, value) { obj.refundId = value; } }, metadata: _metadata }, _refundId_initializers, _refundId_extraInitializers);
        __esDecorate(null, null, _processorReference_decorators, { kind: "field", name: "processorReference", static: false, private: false, access: { has: function (obj) { return "processorReference" in obj; }, get: function (obj) { return obj.processorReference; }, set: function (obj, value) { obj.processorReference = value; } }, metadata: _metadata }, _processorReference_initializers, _processorReference_extraInitializers);
        __esDecorate(null, null, _adminNotes_decorators, { kind: "field", name: "adminNotes", static: false, private: false, access: { has: function (obj) { return "adminNotes" in obj; }, get: function (obj) { return obj.adminNotes; }, set: function (obj, value) { obj.adminNotes = value; } }, metadata: _metadata }, _adminNotes_initializers, _adminNotes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MarkRefundProcessedInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MarkRefundProcessedInput = _classThis;
}();
exports.MarkRefundProcessedInput = MarkRefundProcessedInput;
