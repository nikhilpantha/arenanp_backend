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
exports.SetSubscriptionStatusInput = exports.ApproveSubscriptionInput = exports.RenewSubscriptionInput = exports.CreateMySubscriptionInput = exports.CreateSubscriptionInput = exports.ListSubscriptionsInput = exports.UpdateMembershipPlanInput = exports.CreateMembershipPlanInput = exports.ListMembershipPlansInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var pagination_input_1 = require("../../../common/dto/pagination.input");
require("../../../common/enums");
var ListMembershipPlansInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _activeOnly_decorators;
    var _activeOnly_initializers = [];
    var _activeOnly_extraInitializers = [];
    var ListMembershipPlansInput = _classThis = /** @class */ (function () {
        function ListMembershipPlansInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.activeOnly = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _activeOnly_initializers, void 0));
            __runInitializers(this, _activeOnly_extraInitializers);
        }
        return ListMembershipPlansInput_1;
    }());
    __setFunctionName(_classThis, "ListMembershipPlansInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _activeOnly_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Only plans that are currently active.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _activeOnly_decorators, { kind: "field", name: "activeOnly", static: false, private: false, access: { has: function (obj) { return "activeOnly" in obj; }, get: function (obj) { return obj.activeOnly; }, set: function (obj, value) { obj.activeOnly = value; } }, metadata: _metadata }, _activeOnly_initializers, _activeOnly_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListMembershipPlansInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListMembershipPlansInput = _classThis;
}();
exports.ListMembershipPlansInput = ListMembershipPlansInput;
var CreateMembershipPlanInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _validityDays_decorators;
    var _validityDays_initializers = [];
    var _validityDays_extraInitializers = [];
    var _sessionMinutes_decorators;
    var _sessionMinutes_initializers = [];
    var _sessionMinutes_extraInitializers = [];
    var _windows_decorators;
    var _windows_initializers = [];
    var _windows_extraInitializers = [];
    var _daysOfWeek_decorators;
    var _daysOfWeek_initializers = [];
    var _daysOfWeek_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _highlight_decorators;
    var _highlight_initializers = [];
    var _highlight_extraInitializers = [];
    var CreateMembershipPlanInput = _classThis = /** @class */ (function () {
        function CreateMembershipPlanInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.name = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.duration = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.validityDays = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _validityDays_initializers, void 0));
            this.sessionMinutes = (__runInitializers(this, _validityDays_extraInitializers), __runInitializers(this, _sessionMinutes_initializers, void 0));
            this.windows = (__runInitializers(this, _sessionMinutes_extraInitializers), __runInitializers(this, _windows_initializers, void 0));
            this.daysOfWeek = (__runInitializers(this, _windows_extraInitializers), __runInitializers(this, _daysOfWeek_initializers, void 0));
            this.sports = (__runInitializers(this, _daysOfWeek_extraInitializers), __runInitializers(this, _sports_initializers, void 0));
            this.highlight = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _highlight_initializers, void 0));
            __runInitializers(this, _highlight_extraInitializers);
        }
        return CreateMembershipPlanInput_1;
    }());
    __setFunctionName(_classThis, "CreateMembershipPlanInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _name_decorators = [(0, graphql_1.Field)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
        _duration_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipDuration; }), (0, class_validator_1.IsEnum)(client_1.MembershipDuration)];
        _validityDays_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true, description: 'Override the validity window (days).' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
        _sessionMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Session length in minutes (e.g. 60).' }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(15), (0, class_validator_1.Max)(1440)];
        _windows_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { description: 'Allowed bands as "HH:mm-HH:mm" (at least one).' }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _daysOfWeek_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _highlight_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _validityDays_decorators, { kind: "field", name: "validityDays", static: false, private: false, access: { has: function (obj) { return "validityDays" in obj; }, get: function (obj) { return obj.validityDays; }, set: function (obj, value) { obj.validityDays = value; } }, metadata: _metadata }, _validityDays_initializers, _validityDays_extraInitializers);
        __esDecorate(null, null, _sessionMinutes_decorators, { kind: "field", name: "sessionMinutes", static: false, private: false, access: { has: function (obj) { return "sessionMinutes" in obj; }, get: function (obj) { return obj.sessionMinutes; }, set: function (obj, value) { obj.sessionMinutes = value; } }, metadata: _metadata }, _sessionMinutes_initializers, _sessionMinutes_extraInitializers);
        __esDecorate(null, null, _windows_decorators, { kind: "field", name: "windows", static: false, private: false, access: { has: function (obj) { return "windows" in obj; }, get: function (obj) { return obj.windows; }, set: function (obj, value) { obj.windows = value; } }, metadata: _metadata }, _windows_initializers, _windows_extraInitializers);
        __esDecorate(null, null, _daysOfWeek_decorators, { kind: "field", name: "daysOfWeek", static: false, private: false, access: { has: function (obj) { return "daysOfWeek" in obj; }, get: function (obj) { return obj.daysOfWeek; }, set: function (obj, value) { obj.daysOfWeek = value; } }, metadata: _metadata }, _daysOfWeek_initializers, _daysOfWeek_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _highlight_decorators, { kind: "field", name: "highlight", static: false, private: false, access: { has: function (obj) { return "highlight" in obj; }, get: function (obj) { return obj.highlight; }, set: function (obj, value) { obj.highlight = value; } }, metadata: _metadata }, _highlight_initializers, _highlight_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateMembershipPlanInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateMembershipPlanInput = _classThis;
}();
exports.CreateMembershipPlanInput = CreateMembershipPlanInput;
var UpdateMembershipPlanInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _planId_decorators;
    var _planId_initializers = [];
    var _planId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _validityDays_decorators;
    var _validityDays_initializers = [];
    var _validityDays_extraInitializers = [];
    var _sessionMinutes_decorators;
    var _sessionMinutes_initializers = [];
    var _sessionMinutes_extraInitializers = [];
    var _windows_decorators;
    var _windows_initializers = [];
    var _windows_extraInitializers = [];
    var _daysOfWeek_decorators;
    var _daysOfWeek_initializers = [];
    var _daysOfWeek_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _highlight_decorators;
    var _highlight_initializers = [];
    var _highlight_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var UpdateMembershipPlanInput = _classThis = /** @class */ (function () {
        function UpdateMembershipPlanInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.planId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _planId_initializers, void 0));
            this.name = (__runInitializers(this, _planId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            this.duration = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
            this.validityDays = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _validityDays_initializers, void 0));
            this.sessionMinutes = (__runInitializers(this, _validityDays_extraInitializers), __runInitializers(this, _sessionMinutes_initializers, void 0));
            this.windows = (__runInitializers(this, _sessionMinutes_extraInitializers), __runInitializers(this, _windows_initializers, void 0));
            this.daysOfWeek = (__runInitializers(this, _windows_extraInitializers), __runInitializers(this, _daysOfWeek_initializers, void 0));
            this.sports = (__runInitializers(this, _daysOfWeek_extraInitializers), __runInitializers(this, _sports_initializers, void 0));
            this.highlight = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _highlight_initializers, void 0));
            this.isActive = (__runInitializers(this, _highlight_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            __runInitializers(this, _isActive_extraInitializers);
        }
        return UpdateMembershipPlanInput_1;
    }());
    __setFunctionName(_classThis, "UpdateMembershipPlanInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _planId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _name_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(2), (0, class_validator_1.MaxLength)(120)];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
        _duration_decorators = [(0, graphql_1.Field)(function () { return client_1.MembershipDuration; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.MembershipDuration)];
        _validityDays_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
        _sessionMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(15), (0, class_validator_1.Max)(1440)];
        _windows_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _daysOfWeek_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [String]; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
        _highlight_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(40)];
        _isActive_decorators = [(0, graphql_1.Field)({ nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _planId_decorators, { kind: "field", name: "planId", static: false, private: false, access: { has: function (obj) { return "planId" in obj; }, get: function (obj) { return obj.planId; }, set: function (obj, value) { obj.planId = value; } }, metadata: _metadata }, _planId_initializers, _planId_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
        __esDecorate(null, null, _validityDays_decorators, { kind: "field", name: "validityDays", static: false, private: false, access: { has: function (obj) { return "validityDays" in obj; }, get: function (obj) { return obj.validityDays; }, set: function (obj, value) { obj.validityDays = value; } }, metadata: _metadata }, _validityDays_initializers, _validityDays_extraInitializers);
        __esDecorate(null, null, _sessionMinutes_decorators, { kind: "field", name: "sessionMinutes", static: false, private: false, access: { has: function (obj) { return "sessionMinutes" in obj; }, get: function (obj) { return obj.sessionMinutes; }, set: function (obj, value) { obj.sessionMinutes = value; } }, metadata: _metadata }, _sessionMinutes_initializers, _sessionMinutes_extraInitializers);
        __esDecorate(null, null, _windows_decorators, { kind: "field", name: "windows", static: false, private: false, access: { has: function (obj) { return "windows" in obj; }, get: function (obj) { return obj.windows; }, set: function (obj, value) { obj.windows = value; } }, metadata: _metadata }, _windows_initializers, _windows_extraInitializers);
        __esDecorate(null, null, _daysOfWeek_decorators, { kind: "field", name: "daysOfWeek", static: false, private: false, access: { has: function (obj) { return "daysOfWeek" in obj; }, get: function (obj) { return obj.daysOfWeek; }, set: function (obj, value) { obj.daysOfWeek = value; } }, metadata: _metadata }, _daysOfWeek_initializers, _daysOfWeek_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _highlight_decorators, { kind: "field", name: "highlight", static: false, private: false, access: { has: function (obj) { return "highlight" in obj; }, get: function (obj) { return obj.highlight; }, set: function (obj, value) { obj.highlight = value; } }, metadata: _metadata }, _highlight_initializers, _highlight_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateMembershipPlanInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateMembershipPlanInput = _classThis;
}();
exports.UpdateMembershipPlanInput = UpdateMembershipPlanInput;
var ListSubscriptionsInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _planId_decorators;
    var _planId_initializers = [];
    var _planId_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _pagination_decorators;
    var _pagination_initializers = [];
    var _pagination_extraInitializers = [];
    var ListSubscriptionsInput = _classThis = /** @class */ (function () {
        function ListSubscriptionsInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.status = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.planId = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _planId_initializers, void 0));
            this.search = (__runInitializers(this, _planId_extraInitializers), __runInitializers(this, _search_initializers, void 0));
            this.pagination = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _pagination_initializers, void 0));
            __runInitializers(this, _pagination_extraInitializers);
        }
        return ListSubscriptionsInput_1;
    }());
    __setFunctionName(_classThis, "ListSubscriptionsInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.SubscriptionStatus; }, {
                nullable: true,
                description: 'Filter by status. Omit to list everything except CANCELLED.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.SubscriptionStatus)];
        _planId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { nullable: true, description: 'Only members on this membership plan.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _search_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Case-insensitive customer name / phone search.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(120)];
        _pagination_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PaginationInput; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return pagination_input_1.PaginationInput; })];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _planId_decorators, { kind: "field", name: "planId", static: false, private: false, access: { has: function (obj) { return "planId" in obj; }, get: function (obj) { return obj.planId; }, set: function (obj, value) { obj.planId = value; } }, metadata: _metadata }, _planId_initializers, _planId_extraInitializers);
        __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
        __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListSubscriptionsInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListSubscriptionsInput = _classThis;
}();
exports.ListSubscriptionsInput = ListSubscriptionsInput;
var CreateSubscriptionInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _customerId_decorators;
    var _customerId_initializers = [];
    var _customerId_extraInitializers = [];
    var _planId_decorators;
    var _planId_initializers = [];
    var _planId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _slotStart_decorators;
    var _slotStart_initializers = [];
    var _slotStart_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var CreateSubscriptionInput = _classThis = /** @class */ (function () {
        function CreateSubscriptionInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.customerId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _customerId_initializers, void 0));
            this.planId = (__runInitializers(this, _customerId_extraInitializers), __runInitializers(this, _planId_initializers, void 0));
            this.courtId = (__runInitializers(this, _planId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.slotStart = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _slotStart_initializers, void 0));
            this.startDate = (__runInitializers(this, _slotStart_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            __runInitializers(this, _paymentMethod_extraInitializers);
        }
        return CreateSubscriptionInput_1;
    }());
    __setFunctionName(_classThis, "CreateSubscriptionInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _customerId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _planId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { description: 'Court the recurring slot reserves.' }), (0, class_validator_1.IsString)()];
        _slotStart_decorators = [(0, graphql_1.Field)({ description: 'Chosen daily start time ("HH:mm"); must fit a plan band.' }), (0, class_validator_1.IsString)()];
        _startDate_decorators = [(0, graphql_1.Field)({ description: 'Subscription start date (ISO); expiry = start + plan validity.' }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true, description: 'Amount collected now; defaults to price.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _customerId_decorators, { kind: "field", name: "customerId", static: false, private: false, access: { has: function (obj) { return "customerId" in obj; }, get: function (obj) { return obj.customerId; }, set: function (obj, value) { obj.customerId = value; } }, metadata: _metadata }, _customerId_initializers, _customerId_extraInitializers);
        __esDecorate(null, null, _planId_decorators, { kind: "field", name: "planId", static: false, private: false, access: { has: function (obj) { return "planId" in obj; }, get: function (obj) { return obj.planId; }, set: function (obj, value) { obj.planId = value; } }, metadata: _metadata }, _planId_initializers, _planId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _slotStart_decorators, { kind: "field", name: "slotStart", static: false, private: false, access: { has: function (obj) { return "slotStart" in obj; }, get: function (obj) { return obj.slotStart; }, set: function (obj, value) { obj.slotStart = value; } }, metadata: _metadata }, _slotStart_initializers, _slotStart_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateSubscriptionInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateSubscriptionInput = _classThis;
}();
exports.CreateSubscriptionInput = CreateSubscriptionInput;
/** Player self-subscribe — like CreateSubscriptionInput but the customer is the player. */
var CreateMySubscriptionInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _planId_decorators;
    var _planId_initializers = [];
    var _planId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _slotStart_decorators;
    var _slotStart_initializers = [];
    var _slotStart_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var CreateMySubscriptionInput = _classThis = /** @class */ (function () {
        function CreateMySubscriptionInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.planId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _planId_initializers, void 0));
            this.courtId = (__runInitializers(this, _planId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.slotStart = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _slotStart_initializers, void 0));
            this.startDate = (__runInitializers(this, _slotStart_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            __runInitializers(this, _startDate_extraInitializers);
        }
        return CreateMySubscriptionInput_1;
    }());
    __setFunctionName(_classThis, "CreateMySubscriptionInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _planId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, { description: 'Court the recurring slot reserves.' }), (0, class_validator_1.IsString)()];
        _slotStart_decorators = [(0, graphql_1.Field)({ description: 'Chosen daily start time ("HH:mm"); must fit a plan band.' }), (0, class_validator_1.IsString)()];
        _startDate_decorators = [(0, graphql_1.Field)({ description: 'Subscription start date (ISO); expiry = start + plan validity.' }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _planId_decorators, { kind: "field", name: "planId", static: false, private: false, access: { has: function (obj) { return "planId" in obj; }, get: function (obj) { return obj.planId; }, set: function (obj, value) { obj.planId = value; } }, metadata: _metadata }, _planId_initializers, _planId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _slotStart_decorators, { kind: "field", name: "slotStart", static: false, private: false, access: { has: function (obj) { return "slotStart" in obj; }, get: function (obj) { return obj.slotStart; }, set: function (obj, value) { obj.slotStart = value; } }, metadata: _metadata }, _slotStart_initializers, _slotStart_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateMySubscriptionInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateMySubscriptionInput = _classThis;
}();
exports.CreateMySubscriptionInput = CreateMySubscriptionInput;
var RenewSubscriptionInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _subscriptionId_decorators;
    var _subscriptionId_initializers = [];
    var _subscriptionId_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var RenewSubscriptionInput = _classThis = /** @class */ (function () {
        function RenewSubscriptionInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.subscriptionId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _subscriptionId_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _subscriptionId_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            __runInitializers(this, _paymentMethod_extraInitializers);
        }
        return RenewSubscriptionInput_1;
    }());
    __setFunctionName(_classThis, "RenewSubscriptionInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _subscriptionId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _subscriptionId_decorators, { kind: "field", name: "subscriptionId", static: false, private: false, access: { has: function (obj) { return "subscriptionId" in obj; }, get: function (obj) { return obj.subscriptionId; }, set: function (obj, value) { obj.subscriptionId = value; } }, metadata: _metadata }, _subscriptionId_initializers, _subscriptionId_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RenewSubscriptionInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RenewSubscriptionInput = _classThis;
}();
exports.RenewSubscriptionInput = RenewSubscriptionInput;
/** Approving a player's request — the moment their first payment is recorded. */
var ApproveSubscriptionInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _subscriptionId_decorators;
    var _subscriptionId_initializers = [];
    var _subscriptionId_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paymentMethod_decorators;
    var _paymentMethod_initializers = [];
    var _paymentMethod_extraInitializers = [];
    var ApproveSubscriptionInput = _classThis = /** @class */ (function () {
        function ApproveSubscriptionInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.subscriptionId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _subscriptionId_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _subscriptionId_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paymentMethod = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paymentMethod_initializers, void 0));
            __runInitializers(this, _paymentMethod_extraInitializers);
        }
        return ApproveSubscriptionInput_1;
    }());
    __setFunctionName(_classThis, "ApproveSubscriptionInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _subscriptionId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, {
                nullable: true,
                description: 'Amount collected now; defaults to the price they requested at.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
        _paymentMethod_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.PaymentProvider)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _subscriptionId_decorators, { kind: "field", name: "subscriptionId", static: false, private: false, access: { has: function (obj) { return "subscriptionId" in obj; }, get: function (obj) { return obj.subscriptionId; }, set: function (obj, value) { obj.subscriptionId = value; } }, metadata: _metadata }, _subscriptionId_initializers, _subscriptionId_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paymentMethod_decorators, { kind: "field", name: "paymentMethod", static: false, private: false, access: { has: function (obj) { return "paymentMethod" in obj; }, get: function (obj) { return obj.paymentMethod; }, set: function (obj, value) { obj.paymentMethod = value; } }, metadata: _metadata }, _paymentMethod_initializers, _paymentMethod_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApproveSubscriptionInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApproveSubscriptionInput = _classThis;
}();
exports.ApproveSubscriptionInput = ApproveSubscriptionInput;
var SetSubscriptionStatusInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _subscriptionId_decorators;
    var _subscriptionId_initializers = [];
    var _subscriptionId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var SetSubscriptionStatusInput = _classThis = /** @class */ (function () {
        function SetSubscriptionStatusInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.subscriptionId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _subscriptionId_initializers, void 0));
            this.status = (__runInitializers(this, _subscriptionId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return SetSubscriptionStatusInput_1;
    }());
    __setFunctionName(_classThis, "SetSubscriptionStatusInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _subscriptionId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.SubscriptionStatus; }), (0, class_validator_1.IsEnum)(client_1.SubscriptionStatus)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _subscriptionId_decorators, { kind: "field", name: "subscriptionId", static: false, private: false, access: { has: function (obj) { return "subscriptionId" in obj; }, get: function (obj) { return obj.subscriptionId; }, set: function (obj, value) { obj.subscriptionId = value; } }, metadata: _metadata }, _subscriptionId_initializers, _subscriptionId_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SetSubscriptionStatusInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SetSubscriptionStatusInput = _classThis;
}();
exports.SetSubscriptionStatusInput = SetSubscriptionStatusInput;
