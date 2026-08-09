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
exports.AdminDispute = exports.AdminDisputeNote = exports.AdminDisputeBookingStub = void 0;
exports.mapDisputeNote = mapDisputeNote;
exports.mapDisputeToAdmin = mapDisputeToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var sport_stub_model_1 = require("../../sports/dto/sport-stub.model");
var AdminDisputeBookingStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Booking context embedded in a dispute.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _venueId_decorators;
    var _venueId_initializers = [];
    var _venueId_extraInitializers = [];
    var _venueName_decorators;
    var _venueName_initializers = [];
    var _venueName_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _startAt_decorators;
    var _startAt_initializers = [];
    var _startAt_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var AdminDisputeBookingStub = _classThis = /** @class */ (function () {
        function AdminDisputeBookingStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.venueId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _venueId_initializers, void 0));
            this.venueName = (__runInitializers(this, _venueId_extraInitializers), __runInitializers(this, _venueName_initializers, void 0));
            this.sport = (__runInitializers(this, _venueName_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.startAt = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _startAt_initializers, void 0));
            this.total = (__runInitializers(this, _startAt_extraInitializers), __runInitializers(this, _total_initializers, void 0));
            this.status = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return AdminDisputeBookingStub_1;
    }());
    __setFunctionName(_classThis, "AdminDisputeBookingStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _venueId_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _venueName_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; }, { nullable: true })];
        _startAt_decorators = [(0, graphql_1.Field)()];
        _total_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _status_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _venueId_decorators, { kind: "field", name: "venueId", static: false, private: false, access: { has: function (obj) { return "venueId" in obj; }, get: function (obj) { return obj.venueId; }, set: function (obj, value) { obj.venueId = value; } }, metadata: _metadata }, _venueId_initializers, _venueId_extraInitializers);
        __esDecorate(null, null, _venueName_decorators, { kind: "field", name: "venueName", static: false, private: false, access: { has: function (obj) { return "venueName" in obj; }, get: function (obj) { return obj.venueName; }, set: function (obj, value) { obj.venueName = value; } }, metadata: _metadata }, _venueName_initializers, _venueName_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _startAt_decorators, { kind: "field", name: "startAt", static: false, private: false, access: { has: function (obj) { return "startAt" in obj; }, get: function (obj) { return obj.startAt; }, set: function (obj, value) { obj.startAt = value; } }, metadata: _metadata }, _startAt_initializers, _startAt_extraInitializers);
        __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDisputeBookingStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDisputeBookingStub = _classThis;
}();
exports.AdminDisputeBookingStub = AdminDisputeBookingStub;
var AdminDisputeNote = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _author_decorators;
    var _author_initializers = [];
    var _author_extraInitializers = [];
    var _body_decorators;
    var _body_initializers = [];
    var _body_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AdminDisputeNote = _classThis = /** @class */ (function () {
        function AdminDisputeNote_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.author = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _author_initializers, void 0));
            this.body = (__runInitializers(this, _author_extraInitializers), __runInitializers(this, _body_initializers, void 0));
            this.createdAt = (__runInitializers(this, _body_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AdminDisputeNote_1;
    }());
    __setFunctionName(_classThis, "AdminDisputeNote");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _author_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _body_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _author_decorators, { kind: "field", name: "author", static: false, private: false, access: { has: function (obj) { return "author" in obj; }, get: function (obj) { return obj.author; }, set: function (obj, value) { obj.author = value; } }, metadata: _metadata }, _author_initializers, _author_extraInitializers);
        __esDecorate(null, null, _body_decorators, { kind: "field", name: "body", static: false, private: false, access: { has: function (obj) { return "body" in obj; }, get: function (obj) { return obj.body; }, set: function (obj, value) { obj.body = value; } }, metadata: _metadata }, _body_initializers, _body_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDisputeNote = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDisputeNote = _classThis;
}();
exports.AdminDisputeNote = AdminDisputeNote;
var AdminDispute = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Admin-facing view of a Dispute — booking context, status, resolution, and the admin-notes thread.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _booking_decorators;
    var _booking_initializers = [];
    var _booking_extraInitializers = [];
    var _subject_decorators;
    var _subject_initializers = [];
    var _subject_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _resolution_decorators;
    var _resolution_initializers = [];
    var _resolution_extraInitializers = [];
    var _closedBy_decorators;
    var _closedBy_initializers = [];
    var _closedBy_extraInitializers = [];
    var _closedAt_decorators;
    var _closedAt_initializers = [];
    var _closedAt_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminDispute = _classThis = /** @class */ (function () {
        function AdminDispute_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.booking = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _booking_initializers, void 0));
            this.subject = (__runInitializers(this, _booking_extraInitializers), __runInitializers(this, _subject_initializers, void 0));
            this.description = (__runInitializers(this, _subject_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.category = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _category_initializers, void 0));
            this.status = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.resolution = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _resolution_initializers, void 0));
            this.closedBy = (__runInitializers(this, _resolution_extraInitializers), __runInitializers(this, _closedBy_initializers, void 0));
            this.closedAt = (__runInitializers(this, _closedBy_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
            this.notes = (__runInitializers(this, _closedAt_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            this.createdAt = (__runInitializers(this, _notes_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminDispute_1;
    }());
    __setFunctionName(_classThis, "AdminDispute");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _user_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _booking_decorators = [(0, graphql_1.Field)(function () { return AdminDisputeBookingStub; })];
        _subject_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)()];
        _category_decorators = [(0, graphql_1.Field)(function () { return client_1.DisputeCategory; })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.DisputeStatus; })];
        _resolution_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _closedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _closedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _notes_decorators = [(0, graphql_1.Field)(function () { return [AdminDisputeNote]; })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _booking_decorators, { kind: "field", name: "booking", static: false, private: false, access: { has: function (obj) { return "booking" in obj; }, get: function (obj) { return obj.booking; }, set: function (obj, value) { obj.booking = value; } }, metadata: _metadata }, _booking_initializers, _booking_extraInitializers);
        __esDecorate(null, null, _subject_decorators, { kind: "field", name: "subject", static: false, private: false, access: { has: function (obj) { return "subject" in obj; }, get: function (obj) { return obj.subject; }, set: function (obj, value) { obj.subject = value; } }, metadata: _metadata }, _subject_initializers, _subject_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _resolution_decorators, { kind: "field", name: "resolution", static: false, private: false, access: { has: function (obj) { return "resolution" in obj; }, get: function (obj) { return obj.resolution; }, set: function (obj, value) { obj.resolution = value; } }, metadata: _metadata }, _resolution_initializers, _resolution_extraInitializers);
        __esDecorate(null, null, _closedBy_decorators, { kind: "field", name: "closedBy", static: false, private: false, access: { has: function (obj) { return "closedBy" in obj; }, get: function (obj) { return obj.closedBy; }, set: function (obj, value) { obj.closedBy = value; } }, metadata: _metadata }, _closedBy_initializers, _closedBy_extraInitializers);
        __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: function (obj) { return "closedAt" in obj; }, get: function (obj) { return obj.closedAt; }, set: function (obj, value) { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminDispute = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminDispute = _classThis;
}();
exports.AdminDispute = AdminDispute;
function decimalToNumber(d) {
    if (d === null || d === undefined)
        return 0;
    return typeof d === 'number' ? d : Number(d.toString());
}
function mapDisputeNote(n) {
    return {
        id: n.id,
        author: (0, admin_user_model_1.mapPrismaUserToAdmin)(n.author),
        body: n.body,
        createdAt: n.createdAt,
    };
}
function mapDisputeToAdmin(d) {
    var _a, _b;
    return {
        id: d.id,
        user: (0, admin_user_model_1.mapPrismaUserToAdmin)(d.user),
        booking: {
            id: d.booking.id,
            venueId: d.booking.venueId,
            venueName: d.booking.venue.name,
            sport: (0, sport_stub_model_1.mapSportStub)(d.booking.court.sport),
            startAt: d.booking.startAt,
            total: decimalToNumber(d.booking.total),
            status: d.booking.status,
        },
        subject: d.subject,
        description: d.description,
        category: d.category,
        status: d.status,
        resolution: (_a = d.resolution) !== null && _a !== void 0 ? _a : undefined,
        closedBy: d.closedBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(d.closedBy) : undefined,
        closedAt: (_b = d.closedAt) !== null && _b !== void 0 ? _b : undefined,
        notes: d.notes.map(mapDisputeNote),
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    };
}
