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
exports.ListVenueOffersInput = exports.LoyaltyStatusInput = exports.UpdateOfferInput = exports.CreateOfferInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var pagination_input_1 = require("../../../common/dto/pagination.input");
require("../../../common/enums");
var CreateOfferInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _discountType_decorators;
    var _discountType_initializers = [];
    var _discountType_extraInitializers = [];
    var _discountValue_decorators;
    var _discountValue_initializers = [];
    var _discountValue_extraInitializers = [];
    var _maxDiscount_decorators;
    var _maxDiscount_initializers = [];
    var _maxDiscount_extraInitializers = [];
    var _minSubtotal_decorators;
    var _minSubtotal_initializers = [];
    var _minSubtotal_extraInitializers = [];
    var _trigger_decorators;
    var _trigger_initializers = [];
    var _trigger_extraInitializers = [];
    var _audience_decorators;
    var _audience_initializers = [];
    var _audience_extraInitializers = [];
    var _everyGames_decorators;
    var _everyGames_initializers = [];
    var _everyGames_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _validFrom_decorators;
    var _validFrom_initializers = [];
    var _validFrom_extraInitializers = [];
    var _validUntil_decorators;
    var _validUntil_initializers = [];
    var _validUntil_extraInitializers = [];
    var _usageLimit_decorators;
    var _usageLimit_initializers = [];
    var _usageLimit_extraInitializers = [];
    var CreateOfferInput = _classThis = /** @class */ (function () {
        function CreateOfferInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.title = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.discountType = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _discountType_initializers, void 0));
            this.discountValue = (__runInitializers(this, _discountType_extraInitializers), __runInitializers(this, _discountValue_initializers, void 0));
            this.maxDiscount = (__runInitializers(this, _discountValue_extraInitializers), __runInitializers(this, _maxDiscount_initializers, void 0));
            this.minSubtotal = (__runInitializers(this, _maxDiscount_extraInitializers), __runInitializers(this, _minSubtotal_initializers, 0));
            this.trigger = (__runInitializers(this, _minSubtotal_extraInitializers), __runInitializers(this, _trigger_initializers, void 0));
            this.audience = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _audience_initializers, void 0));
            this.everyGames = (__runInitializers(this, _audience_extraInitializers), __runInitializers(this, _everyGames_initializers, void 0));
            this.code = (__runInitializers(this, _everyGames_extraInitializers), __runInitializers(this, _code_initializers, void 0));
            this.validFrom = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _validFrom_initializers, void 0));
            this.validUntil = (__runInitializers(this, _validFrom_extraInitializers), __runInitializers(this, _validUntil_initializers, void 0));
            this.usageLimit = (__runInitializers(this, _validUntil_extraInitializers), __runInitializers(this, _usageLimit_initializers, void 0));
            __runInitializers(this, _usageLimit_extraInitializers);
        }
        return CreateOfferInput_1;
    }());
    __setFunctionName(_classThis, "CreateOfferInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _title_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _discountType_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferDiscountType; }), (0, class_validator_1.IsEnum)(client_1.OfferDiscountType)];
        _discountValue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _maxDiscount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _minSubtotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { defaultValue: 0 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _trigger_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferTrigger; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.OfferTrigger)];
        _audience_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferAudience; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.OfferAudience)];
        _everyGames_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'For EVERY_NTH: free game every N games.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
        _code_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Promo code; stored upper-cased. Omit for an always-listed offer.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        _validFrom_decorators = [(0, graphql_1.Field)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _validUntil_decorators = [(0, graphql_1.Field)(function () { return Date; }, {
                nullable: true,
                description: 'Omit for an open-ended offer (runs until switched off).',
            }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _usageLimit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'Total redemptions allowed; null = unlimited.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _discountType_decorators, { kind: "field", name: "discountType", static: false, private: false, access: { has: function (obj) { return "discountType" in obj; }, get: function (obj) { return obj.discountType; }, set: function (obj, value) { obj.discountType = value; } }, metadata: _metadata }, _discountType_initializers, _discountType_extraInitializers);
        __esDecorate(null, null, _discountValue_decorators, { kind: "field", name: "discountValue", static: false, private: false, access: { has: function (obj) { return "discountValue" in obj; }, get: function (obj) { return obj.discountValue; }, set: function (obj, value) { obj.discountValue = value; } }, metadata: _metadata }, _discountValue_initializers, _discountValue_extraInitializers);
        __esDecorate(null, null, _maxDiscount_decorators, { kind: "field", name: "maxDiscount", static: false, private: false, access: { has: function (obj) { return "maxDiscount" in obj; }, get: function (obj) { return obj.maxDiscount; }, set: function (obj, value) { obj.maxDiscount = value; } }, metadata: _metadata }, _maxDiscount_initializers, _maxDiscount_extraInitializers);
        __esDecorate(null, null, _minSubtotal_decorators, { kind: "field", name: "minSubtotal", static: false, private: false, access: { has: function (obj) { return "minSubtotal" in obj; }, get: function (obj) { return obj.minSubtotal; }, set: function (obj, value) { obj.minSubtotal = value; } }, metadata: _metadata }, _minSubtotal_initializers, _minSubtotal_extraInitializers);
        __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: function (obj) { return "trigger" in obj; }, get: function (obj) { return obj.trigger; }, set: function (obj, value) { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
        __esDecorate(null, null, _audience_decorators, { kind: "field", name: "audience", static: false, private: false, access: { has: function (obj) { return "audience" in obj; }, get: function (obj) { return obj.audience; }, set: function (obj, value) { obj.audience = value; } }, metadata: _metadata }, _audience_initializers, _audience_extraInitializers);
        __esDecorate(null, null, _everyGames_decorators, { kind: "field", name: "everyGames", static: false, private: false, access: { has: function (obj) { return "everyGames" in obj; }, get: function (obj) { return obj.everyGames; }, set: function (obj, value) { obj.everyGames = value; } }, metadata: _metadata }, _everyGames_initializers, _everyGames_extraInitializers);
        __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
        __esDecorate(null, null, _validFrom_decorators, { kind: "field", name: "validFrom", static: false, private: false, access: { has: function (obj) { return "validFrom" in obj; }, get: function (obj) { return obj.validFrom; }, set: function (obj, value) { obj.validFrom = value; } }, metadata: _metadata }, _validFrom_initializers, _validFrom_extraInitializers);
        __esDecorate(null, null, _validUntil_decorators, { kind: "field", name: "validUntil", static: false, private: false, access: { has: function (obj) { return "validUntil" in obj; }, get: function (obj) { return obj.validUntil; }, set: function (obj, value) { obj.validUntil = value; } }, metadata: _metadata }, _validUntil_initializers, _validUntil_extraInitializers);
        __esDecorate(null, null, _usageLimit_decorators, { kind: "field", name: "usageLimit", static: false, private: false, access: { has: function (obj) { return "usageLimit" in obj; }, get: function (obj) { return obj.usageLimit; }, set: function (obj, value) { obj.usageLimit = value; } }, metadata: _metadata }, _usageLimit_initializers, _usageLimit_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateOfferInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateOfferInput = _classThis;
}();
exports.CreateOfferInput = CreateOfferInput;
var UpdateOfferInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _offerId_decorators;
    var _offerId_initializers = [];
    var _offerId_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _discountType_decorators;
    var _discountType_initializers = [];
    var _discountType_extraInitializers = [];
    var _discountValue_decorators;
    var _discountValue_initializers = [];
    var _discountValue_extraInitializers = [];
    var _maxDiscount_decorators;
    var _maxDiscount_initializers = [];
    var _maxDiscount_extraInitializers = [];
    var _minSubtotal_decorators;
    var _minSubtotal_initializers = [];
    var _minSubtotal_extraInitializers = [];
    var _trigger_decorators;
    var _trigger_initializers = [];
    var _trigger_extraInitializers = [];
    var _audience_decorators;
    var _audience_initializers = [];
    var _audience_extraInitializers = [];
    var _everyGames_decorators;
    var _everyGames_initializers = [];
    var _everyGames_extraInitializers = [];
    var _validFrom_decorators;
    var _validFrom_initializers = [];
    var _validFrom_extraInitializers = [];
    var _validUntil_decorators;
    var _validUntil_initializers = [];
    var _validUntil_extraInitializers = [];
    var _usageLimit_decorators;
    var _usageLimit_initializers = [];
    var _usageLimit_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var UpdateOfferInput = _classThis = /** @class */ (function () {
        function UpdateOfferInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.offerId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _offerId_initializers, void 0));
            this.title = (__runInitializers(this, _offerId_extraInitializers), __runInitializers(this, _title_initializers, void 0));
            this.description = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.discountType = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _discountType_initializers, void 0));
            this.discountValue = (__runInitializers(this, _discountType_extraInitializers), __runInitializers(this, _discountValue_initializers, void 0));
            this.maxDiscount = (__runInitializers(this, _discountValue_extraInitializers), __runInitializers(this, _maxDiscount_initializers, void 0));
            this.minSubtotal = (__runInitializers(this, _maxDiscount_extraInitializers), __runInitializers(this, _minSubtotal_initializers, void 0));
            this.trigger = (__runInitializers(this, _minSubtotal_extraInitializers), __runInitializers(this, _trigger_initializers, void 0));
            this.audience = (__runInitializers(this, _trigger_extraInitializers), __runInitializers(this, _audience_initializers, void 0));
            this.everyGames = (__runInitializers(this, _audience_extraInitializers), __runInitializers(this, _everyGames_initializers, void 0));
            this.validFrom = (__runInitializers(this, _everyGames_extraInitializers), __runInitializers(this, _validFrom_initializers, void 0));
            /** Explicit null clears the end date, making the offer open-ended. */
            this.validUntil = (__runInitializers(this, _validFrom_extraInitializers), __runInitializers(this, _validUntil_initializers, void 0));
            this.usageLimit = (__runInitializers(this, _validUntil_extraInitializers), __runInitializers(this, _usageLimit_initializers, void 0));
            this.isActive = (__runInitializers(this, _usageLimit_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            __runInitializers(this, _isActive_extraInitializers);
        }
        return UpdateOfferInput_1;
    }());
    __setFunctionName(_classThis, "UpdateOfferInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _offerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _title_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _discountType_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferDiscountType; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.OfferDiscountType)];
        _discountValue_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _maxDiscount_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _minSubtotal_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _trigger_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferTrigger; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.OfferTrigger)];
        _audience_decorators = [(0, graphql_1.Field)(function () { return client_1.OfferAudience; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.OfferAudience)];
        _everyGames_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
        _validFrom_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _validUntil_decorators = [(0, graphql_1.Field)(function () { return Date; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _usageLimit_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(0)];
        _isActive_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _offerId_decorators, { kind: "field", name: "offerId", static: false, private: false, access: { has: function (obj) { return "offerId" in obj; }, get: function (obj) { return obj.offerId; }, set: function (obj, value) { obj.offerId = value; } }, metadata: _metadata }, _offerId_initializers, _offerId_extraInitializers);
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _discountType_decorators, { kind: "field", name: "discountType", static: false, private: false, access: { has: function (obj) { return "discountType" in obj; }, get: function (obj) { return obj.discountType; }, set: function (obj, value) { obj.discountType = value; } }, metadata: _metadata }, _discountType_initializers, _discountType_extraInitializers);
        __esDecorate(null, null, _discountValue_decorators, { kind: "field", name: "discountValue", static: false, private: false, access: { has: function (obj) { return "discountValue" in obj; }, get: function (obj) { return obj.discountValue; }, set: function (obj, value) { obj.discountValue = value; } }, metadata: _metadata }, _discountValue_initializers, _discountValue_extraInitializers);
        __esDecorate(null, null, _maxDiscount_decorators, { kind: "field", name: "maxDiscount", static: false, private: false, access: { has: function (obj) { return "maxDiscount" in obj; }, get: function (obj) { return obj.maxDiscount; }, set: function (obj, value) { obj.maxDiscount = value; } }, metadata: _metadata }, _maxDiscount_initializers, _maxDiscount_extraInitializers);
        __esDecorate(null, null, _minSubtotal_decorators, { kind: "field", name: "minSubtotal", static: false, private: false, access: { has: function (obj) { return "minSubtotal" in obj; }, get: function (obj) { return obj.minSubtotal; }, set: function (obj, value) { obj.minSubtotal = value; } }, metadata: _metadata }, _minSubtotal_initializers, _minSubtotal_extraInitializers);
        __esDecorate(null, null, _trigger_decorators, { kind: "field", name: "trigger", static: false, private: false, access: { has: function (obj) { return "trigger" in obj; }, get: function (obj) { return obj.trigger; }, set: function (obj, value) { obj.trigger = value; } }, metadata: _metadata }, _trigger_initializers, _trigger_extraInitializers);
        __esDecorate(null, null, _audience_decorators, { kind: "field", name: "audience", static: false, private: false, access: { has: function (obj) { return "audience" in obj; }, get: function (obj) { return obj.audience; }, set: function (obj, value) { obj.audience = value; } }, metadata: _metadata }, _audience_initializers, _audience_extraInitializers);
        __esDecorate(null, null, _everyGames_decorators, { kind: "field", name: "everyGames", static: false, private: false, access: { has: function (obj) { return "everyGames" in obj; }, get: function (obj) { return obj.everyGames; }, set: function (obj, value) { obj.everyGames = value; } }, metadata: _metadata }, _everyGames_initializers, _everyGames_extraInitializers);
        __esDecorate(null, null, _validFrom_decorators, { kind: "field", name: "validFrom", static: false, private: false, access: { has: function (obj) { return "validFrom" in obj; }, get: function (obj) { return obj.validFrom; }, set: function (obj, value) { obj.validFrom = value; } }, metadata: _metadata }, _validFrom_initializers, _validFrom_extraInitializers);
        __esDecorate(null, null, _validUntil_decorators, { kind: "field", name: "validUntil", static: false, private: false, access: { has: function (obj) { return "validUntil" in obj; }, get: function (obj) { return obj.validUntil; }, set: function (obj, value) { obj.validUntil = value; } }, metadata: _metadata }, _validUntil_initializers, _validUntil_extraInitializers);
        __esDecorate(null, null, _usageLimit_decorators, { kind: "field", name: "usageLimit", static: false, private: false, access: { has: function (obj) { return "usageLimit" in obj; }, get: function (obj) { return obj.usageLimit; }, set: function (obj, value) { obj.usageLimit = value; } }, metadata: _metadata }, _usageLimit_initializers, _usageLimit_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateOfferInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateOfferInput = _classThis;
}();
exports.UpdateOfferInput = UpdateOfferInput;
var LoyaltyStatusInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)({
            description: 'A loyalty subject: pass exactly one of customerId / userId / phone.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _userId_decorators;
    var _userId_initializers = [];
    var _userId_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var LoyaltyStatusInput = _classThis = /** @class */ (function () {
        function LoyaltyStatusInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.customerId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
            this.userId = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _userId_initializers, void 0));
            this.phone = (__runInitializers(this, _userId_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            __runInitializers(this, _phone_extraInitializers);
        }
        return LoyaltyStatusInput_1;
    }());
    __setFunctionName(_classThis, "LoyaltyStatusInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _userId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _phone_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(20)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _userId_decorators, { kind: "field", name: "userId", static: false, private: false, access: { has: function (obj) { return "userId" in obj; }, get: function (obj) { return obj.userId; }, set: function (obj, value) { obj.userId = value; } }, metadata: _metadata }, _userId_initializers, _userId_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LoyaltyStatusInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LoyaltyStatusInput = _classThis;
}();
exports.LoyaltyStatusInput = LoyaltyStatusInput;
var ListVenueOffersInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _pagination_decorators;
    var _pagination_initializers = [];
    var _pagination_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _activeOnly_decorators;
    var _activeOnly_initializers = [];
    var _activeOnly_extraInitializers = [];
    var ListVenueOffersInput = _classThis = /** @class */ (function () {
        function ListVenueOffersInput_1() {
            this.pagination = __runInitializers(this, _pagination_initializers, void 0);
            this.venueId = (__runInitializers(this, _pagination_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.activeOnly = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _activeOnly_initializers, void 0));
            __runInitializers(this, _activeOnly_extraInitializers);
        }
        return ListVenueOffersInput_1;
    }());
    __setFunctionName(_classThis, "ListVenueOffersInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _pagination_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PaginationInput; }, { defaultValue: { page: 1, pageSize: 20 } }), (0, class_validator_1.IsOptional)()];
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _activeOnly_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Only currently-active + in-window offers.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _activeOnly_decorators, { kind: "field", name: "activeOnly", static: false, private: false, access: { has: function (obj) { return "activeOnly" in obj; }, get: function (obj) { return obj.activeOnly; }, set: function (obj, value) { obj.activeOnly = value; } }, metadata: _metadata }, _activeOnly_initializers, _activeOnly_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListVenueOffersInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListVenueOffersInput = _classThis;
}();
exports.ListVenueOffersInput = ListVenueOffersInput;
