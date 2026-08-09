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
exports.ApproveVenueVerificationInput = exports.RejectVenueVerificationInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var RejectVenueVerificationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _requestId_decorators;
    var _requestId_initializers = [];
    var _requestId_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var RejectVenueVerificationInput = _classThis = /** @class */ (function () {
        function RejectVenueVerificationInput_1() {
            this.requestId = __runInitializers(this, _requestId_initializers, void 0);
            this.reason = (__runInitializers(this, _requestId_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return RejectVenueVerificationInput_1;
    }());
    __setFunctionName(_classThis, "RejectVenueVerificationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _requestId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _reason_decorators = [(0, graphql_1.Field)({ description: 'User-visible explanation. Shown to the requester.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _requestId_decorators, { kind: "field", name: "requestId", static: false, private: false, access: { has: function (obj) { return "requestId" in obj; }, get: function (obj) { return obj.requestId; }, set: function (obj, value) { obj.requestId = value; } }, metadata: _metadata }, _requestId_initializers, _requestId_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RejectVenueVerificationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RejectVenueVerificationInput = _classThis;
}();
exports.RejectVenueVerificationInput = RejectVenueVerificationInput;
var ApproveVenueVerificationInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _requestId_decorators;
    var _requestId_initializers = [];
    var _requestId_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var ApproveVenueVerificationInput = _classThis = /** @class */ (function () {
        function ApproveVenueVerificationInput_1() {
            this.requestId = __runInitializers(this, _requestId_initializers, void 0);
            this.note = (__runInitializers(this, _requestId_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            __runInitializers(this, _note_extraInitializers);
        }
        return ApproveVenueVerificationInput_1;
    }());
    __setFunctionName(_classThis, "ApproveVenueVerificationInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _requestId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Optional internal note. Not surfaced to the requester.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _requestId_decorators, { kind: "field", name: "requestId", static: false, private: false, access: { has: function (obj) { return "requestId" in obj; }, get: function (obj) { return obj.requestId; }, set: function (obj, value) { obj.requestId = value; } }, metadata: _metadata }, _requestId_initializers, _requestId_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApproveVenueVerificationInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApproveVenueVerificationInput = _classThis;
}();
exports.ApproveVenueVerificationInput = ApproveVenueVerificationInput;
