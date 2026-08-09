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
exports.PaginatedPlayerBookings = exports.PlayerBookingModel = exports.BookingVenueStub = void 0;
exports.mapPlayerBooking = mapPlayerBooking;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var pagination_input_1 = require("../../../common/dto/pagination.input");
var sport_stub_model_1 = require("../../admin/sports/dto/sport-stub.model");
require("../../../common/enums");
var BookingVenueStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Compact venue reference embedded in a player booking.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var BookingVenueStub = _classThis = /** @class */ (function () {
        function BookingVenueStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.city = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.address = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            __runInitializers(this, _address_extraInitializers);
        }
        return BookingVenueStub_1;
    }());
    __setFunctionName(_classThis, "BookingVenueStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _address_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BookingVenueStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BookingVenueStub = _classThis;
}();
exports.BookingVenueStub = BookingVenueStub;
var PlayerBookingModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: "A player's own court booking (player-panel view)." })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venue_decorators;
    var _venue_initializers = [];
    var _venue_extraInitializers = [];
    var _courtId_decorators;
    var _courtId_initializers = [];
    var _courtId_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _endAt_decorators;
    var _endAt_initializers = [];
    var _endAt_extraInitializers = [];
    var _durationMinutes_decorators;
    var _durationMinutes_initializers = [];
    var _durationMinutes_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var PlayerBookingModel = _classThis = /** @class */ (function () {
        function PlayerBookingModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venue = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venue_initializers, void 0));
            this.courtId = (__runInitializers(this, _venue_extraInitializers), __runInitializers(this, _courtId_initializers, void 0));
            this.courtName = (__runInitializers(this, _courtId_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.sport = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.startAt = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.endAt = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _endAt_initializers, void 0));
            this.durationMinutes = (__runInitializers(this, _endAt_extraInitializers), __runInitializers(this, _durationMinutes_initializers, void 0));
            this.status = (__runInitializers(this, _durationMinutes_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.total = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.paymentStatus = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _paymentStatus_initializers, void 0));
            this.createdAt = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return PlayerBookingModel_1;
    }());
    __setFunctionName(_classThis, "PlayerBookingModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venue_decorators = [(0, graphql_1.Field)(function () { return BookingVenueStub; })];
        _courtId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _courtName_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        _endAt_decorators = [(0, graphql_1.Field)()];
        _durationMinutes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingStatus; })];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _paymentStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.BookingPaymentStatus; })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venue_decorators, { kind: "field", name: "venue", static: false, private: false, access: { has: function (obj) { return "venue" in obj; }, get: function (obj) { return obj.venue; }, set: function (obj, value) { obj.venue = value; } }, metadata: _metadata }, _venue_initializers, _venue_extraInitializers);
        __esDecorate(null, null, _courtId_decorators, { kind: "field", name: "courtId", static: false, private: false, access: { has: function (obj) { return "courtId" in obj; }, get: function (obj) { return obj.courtId; }, set: function (obj, value) { obj.courtId = value; } }, metadata: _metadata }, _courtId_initializers, _courtId_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _endAt_decorators, { kind: "field", name: "endAt", static: false, private: false, access: { has: function (obj) { return "endAt" in obj; }, get: function (obj) { return obj.endAt; }, set: function (obj, value) { obj.endAt = value; } }, metadata: _metadata }, _endAt_initializers, _endAt_extraInitializers);
        __esDecorate(null, null, _durationMinutes_decorators, { kind: "field", name: "durationMinutes", static: false, private: false, access: { has: function (obj) { return "durationMinutes" in obj; }, get: function (obj) { return obj.durationMinutes; }, set: function (obj, value) { obj.durationMinutes = value; } }, metadata: _metadata }, _durationMinutes_initializers, _durationMinutes_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PlayerBookingModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PlayerBookingModel = _classThis;
}();
exports.PlayerBookingModel = PlayerBookingModel;
var PaginatedPlayerBookings = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _pageInfo_decorators;
    var _pageInfo_initializers = [];
    var _pageInfo_extraInitializers = [];
    var PaginatedPlayerBookings = _classThis = /** @class */ (function () {
        function PaginatedPlayerBookings_1() {
            this.items = __runInitializers(this, _items_initializers, void 0);
            this.pageInfo = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pageInfo_initializers, void 0));
            __runInitializers(this, _pageInfo_extraInitializers);
        }
        return PaginatedPlayerBookings_1;
    }());
    __setFunctionName(_classThis, "PaginatedPlayerBookings");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _items_decorators = [(0, graphql_1.Field)(function () { return [PlayerBookingModel]; })];
        _pageInfo_decorators = [(0, graphql_1.Field)(function () { return pagination_input_1.PageInfo; })];
        __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
        __esDecorate(null, null, _pageInfo_decorators, { kind: "field", name: "pageInfo", static: false, private: false, access: { has: function (obj) { return "pageInfo" in obj; }, get: function (obj) { return obj.pageInfo; }, set: function (obj, value) { obj.pageInfo = value; } }, metadata: _metadata }, _pageInfo_initializers, _pageInfo_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PaginatedPlayerBookings = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PaginatedPlayerBookings = _classThis;
}();
exports.PaginatedPlayerBookings = PaginatedPlayerBookings;
function mapPlayerBooking(b) {
    var _a, _b;
    return {
        id: b.id,
        venue: {
            id: b.venue.id,
            name: b.venue.name,
            city: (_a = b.venue.city) !== null && _a !== void 0 ? _a : undefined,
            address: (_b = b.venue.address) !== null && _b !== void 0 ? _b : undefined,
        },
        courtId: b.courtId,
        courtName: b.court.name,
        sport: (0, sport_stub_model_1.mapSportStub)(b.court.sport),
        startAt: b.startAt,
        endAt: b.endAt,
        durationMinutes: b.durationMinutes,
        status: b.status,
        total: Number(b.total.toString()),
        paymentStatus: b.paymentStatus,
        createdAt: b.createdAt,
    };
}
