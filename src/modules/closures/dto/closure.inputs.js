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
exports.ListClosuresInput = exports.CreateClosureInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateClosureInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _endAt_decorators;
    var _endAt_initializers = [];
    var _endAt_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var CreateClosureInput = _classThis = /** @class */ (function () {
        function CreateClosureInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.courtId = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.startAt = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.endAt = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _endAt_initializers, void 0));
            this.reason = (__runInitializers(this, _endAt_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return CreateClosureInput_1;
    }());
    __setFunctionName(_classThis, "CreateClosureInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }, {
                nullable: true,
                description: 'Court to block; omit to close the whole venue (all courts).',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
        _startAt_decorators = [(0, graphql_1.Field)({ description: 'Block start (absolute instant).' }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _endAt_decorators = [(0, graphql_1.Field)({ description: 'Block end (absolute instant); must be after startAt.' }), (0, class_transformer_1.Type)(function () { return Date; }), (0, class_validator_1.IsDate)()];
        _reason_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Shown to players, e.g. "Maintenance", "Dashain".' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(200)];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _endAt_decorators, { kind: "field", name: "endAt", static: false, private: false, access: { has: function (obj) { return "endAt" in obj; }, get: function (obj) { return obj.endAt; }, set: function (obj, value) { obj.endAt = value; } }, metadata: _metadata }, _endAt_initializers, _endAt_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateClosureInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateClosureInput = _classThis;
}();
exports.CreateClosureInput = CreateClosureInput;
var ListClosuresInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _upcomingOnly_decorators;
    var _upcomingOnly_initializers = [];
    var _upcomingOnly_extraInitializers = [];
    var ListClosuresInput = _classThis = /** @class */ (function () {
        function ListClosuresInput_1() {
            this.venueId = __runInitializers(this, _venueId_initializers, void 0);
            this.upcomingOnly = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _upcomingOnly_initializers, void 0));
            __runInitializers(this, _upcomingOnly_extraInitializers);
        }
        return ListClosuresInput_1;
    }());
    __setFunctionName(_classThis, "ListClosuresInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _venueId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _upcomingOnly_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Only closures that have not yet ended.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _upcomingOnly_decorators, { kind: "field", name: "upcomingOnly", static: false, private: false, access: { has: function (obj) { return "upcomingOnly" in obj; }, get: function (obj) { return obj.upcomingOnly; }, set: function (obj, value) { obj.upcomingOnly = value; } }, metadata: _metadata }, _upcomingOnly_initializers, _upcomingOnly_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListClosuresInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListClosuresInput = _classThis;
}();
exports.ListClosuresInput = ListClosuresInput;
