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
exports.UpdatePlatformSettingsInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
/**
 * Partial update — only fields that the admin actually changed should be sent.
 * The service merges these onto the singleton row.
 */
var UpdatePlatformSettingsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _platformCommissionPercentage_decorators;
    var _platformCommissionPercentage_initializers = [];
    var _platformCommissionPercentage_extraInitializers = [];
    var _slotLockDurationMinutes_decorators;
    var _slotLockDurationMinutes_initializers = [];
    var _slotLockDurationMinutes_extraInitializers = [];
    var _cancellationWindowHours_decorators;
    var _cancellationWindowHours_initializers = [];
    var _cancellationWindowHours_extraInitializers = [];
    var _refundPolicyText_decorators;
    var _refundPolicyText_initializers = [];
    var _refundPolicyText_extraInitializers = [];
    var _bookingServiceFee_decorators;
    var _bookingServiceFee_initializers = [];
    var _bookingServiceFee_extraInitializers = [];
    var _paymentProvidersEnabled_decorators;
    var _paymentProvidersEnabled_initializers = [];
    var _paymentProvidersEnabled_extraInitializers = [];
    var _supportContactNumber_decorators;
    var _supportContactNumber_initializers = [];
    var _supportContactNumber_extraInitializers = [];
    var _supportEmail_decorators;
    var _supportEmail_initializers = [];
    var _supportEmail_extraInitializers = [];
    var _defaultCity_decorators;
    var _defaultCity_initializers = [];
    var _defaultCity_extraInitializers = [];
    var _maintenanceMode_decorators;
    var _maintenanceMode_initializers = [];
    var _maintenanceMode_extraInitializers = [];
    var UpdatePlatformSettingsInput = _classThis = /** @class */ (function () {
        function UpdatePlatformSettingsInput_1() {
            this.platformCommissionPercentage = __runInitializers(this, _platformCommissionPercentage_initializers, void 0);
            this.slotLockDurationMinutes = (__runInitializers(this, _platformCommissionPercentage_extraInitializers), __runInitializers(this, _slotLockDurationMinutes_initializers, void 0));
            this.cancellationWindowHours = (__runInitializers(this, _slotLockDurationMinutes_extraInitializers), __runInitializers(this, _cancellationWindowHours_initializers, void 0));
            this.refundPolicyText = (__runInitializers(this, _cancellationWindowHours_extraInitializers), __runInitializers(this, _refundPolicyText_initializers, void 0));
            this.bookingServiceFee = (__runInitializers(this, _refundPolicyText_extraInitializers), __runInitializers(this, _bookingServiceFee_initializers, void 0));
            this.paymentProvidersEnabled = (__runInitializers(this, _bookingServiceFee_extraInitializers), __runInitializers(this, _paymentProvidersEnabled_initializers, void 0));
            this.supportContactNumber = (__runInitializers(this, _paymentProvidersEnabled_extraInitializers), __runInitializers(this, _supportContactNumber_initializers, void 0));
            this.supportEmail = (__runInitializers(this, _supportContactNumber_extraInitializers), __runInitializers(this, _supportEmail_initializers, void 0));
            this.defaultCity = (__runInitializers(this, _supportEmail_extraInitializers), __runInitializers(this, _defaultCity_initializers, void 0));
            this.maintenanceMode = (__runInitializers(this, _defaultCity_extraInitializers), __runInitializers(this, _maintenanceMode_initializers, void 0));
            __runInitializers(this, _maintenanceMode_extraInitializers);
        }
        return UpdatePlatformSettingsInput_1;
    }());
    __setFunctionName(_classThis, "UpdatePlatformSettingsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _platformCommissionPercentage_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100)];
        _slotLockDurationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(180)];
        _cancellationWindowHours_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(720)];
        _refundPolicyText_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(4000)];
        _bookingServiceFee_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentProvidersEnabled_decorators = [(0, graphql_1.Field)(function () { return [client_1.PaymentProvider]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayUnique)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider, { each: true })];
        _supportContactNumber_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        _supportEmail_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)(), (0, class_validator_1.MaxLength)(120)];
        _defaultCity_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(80)];
        _maintenanceMode_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _platformCommissionPercentage_decorators, { kind: "field", name: "platformCommissionPercentage", static: false, private: false, access: { has: function (obj) { return "platformCommissionPercentage" in obj; }, get: function (obj) { return obj.platformCommissionPercentage; }, set: function (obj, value) { obj.platformCommissionPercentage = value; } }, metadata: _metadata }, _platformCommissionPercentage_initializers, _platformCommissionPercentage_extraInitializers);
        __esDecorate(null, null, _slotLockDurationMinutes_decorators, { kind: "field", name: "slotLockDurationMinutes", static: false, private: false, access: { has: function (obj) { return "slotLockDurationMinutes" in obj; }, get: function (obj) { return obj.slotLockDurationMinutes; }, set: function (obj, value) { obj.slotLockDurationMinutes = value; } }, metadata: _metadata }, _slotLockDurationMinutes_initializers, _slotLockDurationMinutes_extraInitializers);
        __esDecorate(null, null, _cancellationWindowHours_decorators, { kind: "field", name: "cancellationWindowHours", static: false, private: false, access: { has: function (obj) { return "cancellationWindowHours" in obj; }, get: function (obj) { return obj.cancellationWindowHours; }, set: function (obj, value) { obj.cancellationWindowHours = value; } }, metadata: _metadata }, _cancellationWindowHours_initializers, _cancellationWindowHours_extraInitializers);
        __esDecorate(null, null, _refundPolicyText_decorators, { kind: "field", name: "refundPolicyText", static: false, private: false, access: { has: function (obj) { return "refundPolicyText" in obj; }, get: function (obj) { return obj.refundPolicyText; }, set: function (obj, value) { obj.refundPolicyText = value; } }, metadata: _metadata }, _refundPolicyText_initializers, _refundPolicyText_extraInitializers);
        __esDecorate(null, null, _bookingServiceFee_decorators, { kind: "field", name: "bookingServiceFee", static: false, private: false, access: { has: function (obj) { return "bookingServiceFee" in obj; }, get: function (obj) { return obj.bookingServiceFee; }, set: function (obj, value) { obj.bookingServiceFee = value; } }, metadata: _metadata }, _bookingServiceFee_initializers, _bookingServiceFee_extraInitializers);
        __esDecorate(null, null, _paymentProvidersEnabled_decorators, { kind: "field", name: "paymentProvidersEnabled", static: false, private: false, access: { has: function (obj) { return "paymentProvidersEnabled" in obj; }, get: function (obj) { return obj.paymentProvidersEnabled; }, set: function (obj, value) { obj.paymentProvidersEnabled = value; } }, metadata: _metadata }, _paymentProvidersEnabled_initializers, _paymentProvidersEnabled_extraInitializers);
        __esDecorate(null, null, _supportContactNumber_decorators, { kind: "field", name: "supportContactNumber", static: false, private: false, access: { has: function (obj) { return "supportContactNumber" in obj; }, get: function (obj) { return obj.supportContactNumber; }, set: function (obj, value) { obj.supportContactNumber = value; } }, metadata: _metadata }, _supportContactNumber_initializers, _supportContactNumber_extraInitializers);
        __esDecorate(null, null, _supportEmail_decorators, { kind: "field", name: "supportEmail", static: false, private: false, access: { has: function (obj) { return "supportEmail" in obj; }, get: function (obj) { return obj.supportEmail; }, set: function (obj, value) { obj.supportEmail = value; } }, metadata: _metadata }, _supportEmail_initializers, _supportEmail_extraInitializers);
        __esDecorate(null, null, _defaultCity_decorators, { kind: "field", name: "defaultCity", static: false, private: false, access: { has: function (obj) { return "defaultCity" in obj; }, get: function (obj) { return obj.defaultCity; }, set: function (obj, value) { obj.defaultCity = value; } }, metadata: _metadata }, _defaultCity_initializers, _defaultCity_extraInitializers);
        __esDecorate(null, null, _maintenanceMode_decorators, { kind: "field", name: "maintenanceMode", static: false, private: false, access: { has: function (obj) { return "maintenanceMode" in obj; }, get: function (obj) { return obj.maintenanceMode; }, set: function (obj, value) { obj.maintenanceMode = value; } }, metadata: _metadata }, _maintenanceMode_initializers, _maintenanceMode_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdatePlatformSettingsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdatePlatformSettingsInput = _classThis;
}();
exports.UpdatePlatformSettingsInput = UpdatePlatformSettingsInput;
