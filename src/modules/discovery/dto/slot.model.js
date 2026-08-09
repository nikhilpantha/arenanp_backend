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
exports.CourtSlots = exports.CourtSlot = void 0;
var graphql_1 = require("@nestjs/graphql");
var CourtSlot = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A single bookable time window for a court.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _endAt_decorators;
    var _endAt_initializers = [];
    var _endAt_extraInitializers = [];
    var _available_decorators;
    var _available_initializers = [];
    var _available_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var CourtSlot = _classThis = /** @class */ (function () {
        function CourtSlot_1() {
            this.startAt = __runInitializers(this, _startAt_initializers, void 0);
            this.endAt = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _endAt_initializers, void 0));
            this.available = (__runInitializers(this, _endAt_extraInitializers), __runInitializers(this, _available_initializers, void 0));
            this.price = (__runInitializers(this, _available_extraInitializers), __runInitializers(this, _price_initializers, void 0));
            __runInitializers(this, _price_extraInitializers);
        }
        return CourtSlot_1;
    }());
    __setFunctionName(_classThis, "CourtSlot");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _startAt_decorators = [(0, graphql_1.Field)()];
        _endAt_decorators = [(0, graphql_1.Field)()];
        _available_decorators = [(0, graphql_1.Field)({ description: 'False if already booked or in the past.' })];
        _price_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Price for this slot at the court rate.' })];
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _endAt_decorators, { kind: "field", name: "endAt", static: false, private: false, access: { has: function (obj) { return "endAt" in obj; }, get: function (obj) { return obj.endAt; }, set: function (obj, value) { obj.endAt = value; } }, metadata: _metadata }, _endAt_initializers, _endAt_extraInitializers);
        __esDecorate(null, null, _available_decorators, { kind: "field", name: "available", static: false, private: false, access: { has: function (obj) { return "available" in obj; }, get: function (obj) { return obj.available; }, set: function (obj, value) { obj.available = value; } }, metadata: _metadata }, _available_initializers, _available_extraInitializers);
        __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CourtSlot = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CourtSlot = _classThis;
}();
exports.CourtSlot = CourtSlot;
var CourtSlots = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Bookable slots for a court on a given venue-local day.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _slotMinutes_decorators;
    var _slotMinutes_initializers = [];
    var _slotMinutes_extraInitializers = [];
    var _slots_decorators;
    var _slots_initializers = [];
    var _slots_extraInitializers = [];
    var CourtSlots = _classThis = /** @class */ (function () {
        function CourtSlots_1() {
            this.courtId = __runInitializers(this, _courtId_initializers, void 0);
            this.date = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _date_initializers, void 0));
            this.slotMinutes = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _slotMinutes_initializers, void 0));
            this.slots = (__runInitializers(this, _slotMinutes_extraInitializers), __runInitializers(this, _slots_initializers, void 0));
            __runInitializers(this, _slots_extraInitializers);
        }
        return CourtSlots_1;
    }());
    __setFunctionName(_classThis, "CourtSlots");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _date_decorators = [(0, graphql_1.Field)({ description: 'The requested day (yyyy-mm-dd, venue-local).' })];
        _slotMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _slots_decorators = [(0, graphql_1.Field)(function () { return [CourtSlot]; })];
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
        __esDecorate(null, null, _slotMinutes_decorators, { kind: "field", name: "slotMinutes", static: false, private: false, access: { has: function (obj) { return "slotMinutes" in obj; }, get: function (obj) { return obj.slotMinutes; }, set: function (obj, value) { obj.slotMinutes = value; } }, metadata: _metadata }, _slotMinutes_initializers, _slotMinutes_extraInitializers);
        __esDecorate(null, null, _slots_decorators, { kind: "field", name: "slots", static: false, private: false, access: { has: function (obj) { return "slots" in obj; }, get: function (obj) { return obj.slots; }, set: function (obj, value) { obj.slots = value; } }, metadata: _metadata }, _slots_initializers, _slots_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CourtSlots = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CourtSlots = _classThis;
}();
exports.CourtSlots = CourtSlots;
