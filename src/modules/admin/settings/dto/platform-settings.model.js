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
exports.PlatformSettings = void 0;
exports.mapPlatformSettings = mapPlatformSettings;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var PlatformSettings = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Platform-wide configuration. Singleton — one row per environment. Edited from /admin/settings.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
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
    var _updatedBy_decorators;
    var _updatedBy_initializers = [];
    var _updatedBy_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var PlatformSettings = _classThis = /** @class */ (function () {
        function PlatformSettings_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.platformCommissionPercentage = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _platformCommissionPercentage_initializers, void 0));
            this.slotLockDurationMinutes = (__runInitializers(this, _platformCommissionPercentage_extraInitializers), __runInitializers(this, _slotLockDurationMinutes_initializers, void 0));
            this.cancellationWindowHours = (__runInitializers(this, _slotLockDurationMinutes_extraInitializers), __runInitializers(this, _cancellationWindowHours_initializers, void 0));
            this.refundPolicyText = (__runInitializers(this, _cancellationWindowHours_extraInitializers), __runInitializers(this, _refundPolicyText_initializers, void 0));
            this.bookingServiceFee = (__runInitializers(this, _refundPolicyText_extraInitializers), __runInitializers(this, _bookingServiceFee_initializers, void 0));
            this.paymentProvidersEnabled = (__runInitializers(this, _bookingServiceFee_extraInitializers), __runInitializers(this, _paymentProvidersEnabled_initializers, void 0));
            this.supportContactNumber = (__runInitializers(this, _paymentProvidersEnabled_extraInitializers), __runInitializers(this, _supportContactNumber_initializers, void 0));
            this.supportEmail = (__runInitializers(this, _supportContactNumber_extraInitializers), __runInitializers(this, _supportEmail_initializers, void 0));
            this.defaultCity = (__runInitializers(this, _supportEmail_extraInitializers), __runInitializers(this, _defaultCity_initializers, void 0));
            this.maintenanceMode = (__runInitializers(this, _defaultCity_extraInitializers), __runInitializers(this, _maintenanceMode_initializers, void 0));
            this.updatedBy = (__runInitializers(this, _maintenanceMode_extraInitializers), __runInitializers(this, _updatedBy_initializers, void 0));
            this.createdAt = (__runInitializers(this, _updatedBy_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return PlatformSettings_1;
    }());
    __setFunctionName(_classThis, "PlatformSettings");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _platformCommissionPercentage_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _slotLockDurationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _cancellationWindowHours_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _refundPolicyText_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _bookingServiceFee_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _paymentProvidersEnabled_decorators = [(0, graphql_1.Field)(function () { return [client_1.PaymentProvider]; })];
        _supportContactNumber_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _supportEmail_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _defaultCity_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _maintenanceMode_decorators = [(0, graphql_1.Field)()];
        _updatedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
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
        __esDecorate(null, null, _updatedBy_decorators, { kind: "field", name: "updatedBy", static: false, private: false, access: { has: function (obj) { return "updatedBy" in obj; }, get: function (obj) { return obj.updatedBy; }, set: function (obj, value) { obj.updatedBy = value; } }, metadata: _metadata }, _updatedBy_initializers, _updatedBy_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlatformSettings = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlatformSettings = _classThis;
}();
exports.PlatformSettings = PlatformSettings;
function decimalToNumber(d) {
    if (d === null || d === undefined)
        return 0;
    return typeof d === 'number' ? d : Number(d.toString());
}
function mapPlatformSettings(s) {
    var _a, _b, _c, _d;
    return {
        id: s.id,
        platformCommissionPercentage: decimalToNumber(s.platformCommissionPercentage),
        slotLockDurationMinutes: s.slotLockDurationMinutes,
        cancellationWindowHours: s.cancellationWindowHours,
        refundPolicyText: (_a = s.refundPolicyText) !== null && _a !== void 0 ? _a : undefined,
        bookingServiceFee: decimalToNumber(s.bookingServiceFee),
        paymentProvidersEnabled: s.paymentProvidersEnabled,
        supportContactNumber: (_b = s.supportContactNumber) !== null && _b !== void 0 ? _b : undefined,
        supportEmail: (_c = s.supportEmail) !== null && _c !== void 0 ? _c : undefined,
        defaultCity: (_d = s.defaultCity) !== null && _d !== void 0 ? _d : undefined,
        maintenanceMode: s.maintenanceMode,
        updatedBy: s.updatedBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(s.updatedBy) : undefined,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
    };
}
