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
exports.VenueCustomerModel = void 0;
exports.mapCustomer = mapCustomer;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../common/enums");
var VenueCustomerModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A venue's customer (person or team) — loyalty is keyed by this id." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _phone_decorators;
    var _phone_initializers = [];
    var _phone_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _kind_decorators;
    var _kind_initializers = [];
    var _kind_extraInitializers = [];
    var _gamesPlayed_decorators;
    var _gamesPlayed_initializers = [];
    var _gamesPlayed_extraInitializers = [];
    var _freeGameReady_decorators;
    var _freeGameReady_initializers = [];
    var _freeGameReady_extraInitializers = [];
    var _totalSpent_decorators;
    var _totalSpent_initializers = [];
    var _totalSpent_extraInitializers = [];
    var _lastVisitAt_decorators;
    var _lastVisitAt_initializers = [];
    var _lastVisitAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var VenueCustomerModel = _classThis = /** @class */ (function () {
        function VenueCustomerModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.phone = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _phone_initializers, void 0));
            this.notes = (__runInitializers(this, _phone_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.kind = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _kind_initializers, void 0));
            this.gamesPlayed = (__runInitializers(this, _kind_extraInitializers), __runInitializers(this, _gamesPlayed_initializers, void 0));
            this.freeGameReady = (__runInitializers(this, _gamesPlayed_extraInitializers), __runInitializers(this, _freeGameReady_initializers, void 0));
            this.totalSpent = (__runInitializers(this, _freeGameReady_extraInitializers), __runInitializers(this, _totalSpent_initializers, void 0));
            this.lastVisitAt = (__runInitializers(this, _totalSpent_extraInitializers), __runInitializers(this, _lastVisitAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _lastVisitAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return VenueCustomerModel_1;
    }());
    __setFunctionName(_classThis, "VenueCustomerModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _phone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _kind_decorators = [(0, graphql_1.Field)(function () { return client_1.CustomerType; }, { description: 'Party type (INDIVIDUAL | TEAM | CLUB).' })];
        _gamesPlayed_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Completed games (drives loyalty).' })];
        _freeGameReady_decorators = [(0, graphql_1.Field)({ description: 'A loyalty free game is available to redeem now.' })];
        _totalSpent_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { description: 'Lifetime amount paid across non-cancelled bookings.' })];
        _lastVisitAt_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Most recent booking start (last visit).' })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _phone_decorators, { kind: "field", name: "phone", static: false, private: false, access: { has: function (obj) { return "phone" in obj; }, get: function (obj) { return obj.phone; }, set: function (obj, value) { obj.phone = value; } }, metadata: _metadata }, _phone_initializers, _phone_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _kind_decorators, { kind: "field", name: "kind", static: false, private: false, access: { has: function (obj) { return "kind" in obj; }, get: function (obj) { return obj.kind; }, set: function (obj, value) { obj.kind = value; } }, metadata: _metadata }, _kind_initializers, _kind_extraInitializers);
        __esDecorate(null, null, _gamesPlayed_decorators, { kind: "field", name: "gamesPlayed", static: false, private: false, access: { has: function (obj) { return "gamesPlayed" in obj; }, get: function (obj) { return obj.gamesPlayed; }, set: function (obj, value) { obj.gamesPlayed = value; } }, metadata: _metadata }, _gamesPlayed_initializers, _gamesPlayed_extraInitializers);
        __esDecorate(null, null, _freeGameReady_decorators, { kind: "field", name: "freeGameReady", static: false, private: false, access: { has: function (obj) { return "freeGameReady" in obj; }, get: function (obj) { return obj.freeGameReady; }, set: function (obj, value) { obj.freeGameReady = value; } }, metadata: _metadata }, _freeGameReady_initializers, _freeGameReady_extraInitializers);
        __esDecorate(null, null, _totalSpent_decorators, { kind: "field", name: "totalSpent", static: false, private: false, access: { has: function (obj) { return "totalSpent" in obj; }, get: function (obj) { return obj.totalSpent; }, set: function (obj, value) { obj.totalSpent = value; } }, metadata: _metadata }, _totalSpent_initializers, _totalSpent_extraInitializers);
        __esDecorate(null, null, _lastVisitAt_decorators, { kind: "field", name: "lastVisitAt", static: false, private: false, access: { has: function (obj) { return "lastVisitAt" in obj; }, get: function (obj) { return obj.lastVisitAt; }, set: function (obj, value) { obj.lastVisitAt = value; } }, metadata: _metadata }, _lastVisitAt_initializers, _lastVisitAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueCustomerModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueCustomerModel = _classThis;
}();
exports.VenueCustomerModel = VenueCustomerModel;
function mapCustomer(c, gamesPlayed, freeGameReady, totalSpent, lastVisitAt) {
    var _a, _b;
    if (gamesPlayed === void 0) { gamesPlayed = 0; }
    if (freeGameReady === void 0) { freeGameReady = false; }
    if (totalSpent === void 0) { totalSpent = 0; }
    if (lastVisitAt === void 0) { lastVisitAt = null; }
    return {
        id: c.id,
        name: c.name,
        phone: (_a = c.phone) !== null && _a !== void 0 ? _a : undefined,
        notes: (_b = c.notes) !== null && _b !== void 0 ? _b : undefined,
        kind: c.kind,
        gamesPlayed: gamesPlayed,
        freeGameReady: freeGameReady,
        totalSpent: totalSpent,
        lastVisitAt: lastVisitAt !== null && lastVisitAt !== void 0 ? lastVisitAt : undefined,
        createdAt: c.createdAt,
    };
}
