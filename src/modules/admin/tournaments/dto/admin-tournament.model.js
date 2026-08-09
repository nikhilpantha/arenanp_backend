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
exports.AdminTournament = exports.AdminTournamentPaymentSummary = exports.AdminTournamentMatch = exports.AdminTournamentRegistration = exports.AdminTournamentVenueStub = void 0;
exports.mapRegistrationToAdmin = mapRegistrationToAdmin;
exports.mapMatchToAdmin = mapMatchToAdmin;
exports.mapTournamentToAdmin = mapTournamentToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var sport_stub_model_1 = require("../../sports/dto/sport-stub.model");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var AdminTournamentVenueStub = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Venue stub embedded in tournament payloads.' })];
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
    var AdminTournamentVenueStub = _classThis = /** @class */ (function () {
        function AdminTournamentVenueStub_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.city = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            __runInitializers(this, _city_extraInitializers);
        }
        return AdminTournamentVenueStub_1;
    }());
    __setFunctionName(_classThis, "AdminTournamentVenueStub");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminTournamentVenueStub = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminTournamentVenueStub = _classThis;
}();
exports.AdminTournamentVenueStub = AdminTournamentVenueStub;
var AdminTournamentRegistration = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Team / registration row inside the tournament detail.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _teamName_decorators;
    var _teamName_initializers = [];
    var _teamName_extraInitializers = [];
    var _captain_decorators;
    var _captain_initializers = [];
    var _captain_extraInitializers = [];
    var _contactEmail_decorators;
    var _contactEmail_initializers = [];
    var _contactEmail_extraInitializers = [];
    var _contactPhone_decorators;
    var _contactPhone_initializers = [];
    var _contactPhone_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _paymentStatus_decorators;
    var _paymentStatus_initializers = [];
    var _paymentStatus_extraInitializers = [];
    var _paymentProvider_decorators;
    var _paymentProvider_initializers = [];
    var _paymentProvider_extraInitializers = [];
    var _paymentReference_decorators;
    var _paymentReference_initializers = [];
    var _paymentReference_extraInitializers = [];
    var _amountPaid_decorators;
    var _amountPaid_initializers = [];
    var _amountPaid_extraInitializers = [];
    var _paidAt_decorators;
    var _paidAt_initializers = [];
    var _paidAt_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AdminTournamentRegistration = _classThis = /** @class */ (function () {
        function AdminTournamentRegistration_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.teamName = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _teamName_initializers, void 0));
            this.captain = (__runInitializers(this, _teamName_extraInitializers), __runInitializers(this, _captain_initializers, void 0));
            this.contactEmail = (__runInitializers(this, _captain_extraInitializers), __runInitializers(this, _contactEmail_initializers, void 0));
            this.contactPhone = (__runInitializers(this, _contactEmail_extraInitializers), __runInitializers(this, _contactPhone_initializers, void 0));
            this.status = (__runInitializers(this, _contactPhone_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.paymentStatus = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _paymentStatus_initializers, void 0));
            this.paymentProvider = (__runInitializers(this, _paymentStatus_extraInitializers), __runInitializers(this, _paymentProvider_initializers, void 0));
            this.paymentReference = (__runInitializers(this, _paymentProvider_extraInitializers), __runInitializers(this, _paymentReference_initializers, void 0));
            this.amountPaid = (__runInitializers(this, _paymentReference_extraInitializers), __runInitializers(this, _amountPaid_initializers, void 0));
            this.paidAt = (__runInitializers(this, _amountPaid_extraInitializers), __runInitializers(this, _paidAt_initializers, void 0));
            this.createdAt = (__runInitializers(this, _paidAt_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AdminTournamentRegistration_1;
    }());
    __setFunctionName(_classThis, "AdminTournamentRegistration");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _teamName_decorators = [(0, graphql_1.Field)()];
        _captain_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _contactEmail_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _contactPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentRegistrationStatus; })];
        _paymentStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentStatus; })];
        _paymentProvider_decorators = [(0, graphql_1.Field)(function () { return client_1.PaymentProvider; }, { nullable: true })];
        _paymentReference_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _amountPaid_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _paidAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _teamName_decorators, { kind: "field", name: "teamName", static: false, private: false, access: { has: function (obj) { return "teamName" in obj; }, get: function (obj) { return obj.teamName; }, set: function (obj, value) { obj.teamName = value; } }, metadata: _metadata }, _teamName_initializers, _teamName_extraInitializers);
        __esDecorate(null, null, _captain_decorators, { kind: "field", name: "captain", static: false, private: false, access: { has: function (obj) { return "captain" in obj; }, get: function (obj) { return obj.captain; }, set: function (obj, value) { obj.captain = value; } }, metadata: _metadata }, _captain_initializers, _captain_extraInitializers);
        __esDecorate(null, null, _contactEmail_decorators, { kind: "field", name: "contactEmail", static: false, private: false, access: { has: function (obj) { return "contactEmail" in obj; }, get: function (obj) { return obj.contactEmail; }, set: function (obj, value) { obj.contactEmail = value; } }, metadata: _metadata }, _contactEmail_initializers, _contactEmail_extraInitializers);
        __esDecorate(null, null, _contactPhone_decorators, { kind: "field", name: "contactPhone", static: false, private: false, access: { has: function (obj) { return "contactPhone" in obj; }, get: function (obj) { return obj.contactPhone; }, set: function (obj, value) { obj.contactPhone = value; } }, metadata: _metadata }, _contactPhone_initializers, _contactPhone_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _paymentStatus_decorators, { kind: "field", name: "paymentStatus", static: false, private: false, access: { has: function (obj) { return "paymentStatus" in obj; }, get: function (obj) { return obj.paymentStatus; }, set: function (obj, value) { obj.paymentStatus = value; } }, metadata: _metadata }, _paymentStatus_initializers, _paymentStatus_extraInitializers);
        __esDecorate(null, null, _paymentProvider_decorators, { kind: "field", name: "paymentProvider", static: false, private: false, access: { has: function (obj) { return "paymentProvider" in obj; }, get: function (obj) { return obj.paymentProvider; }, set: function (obj, value) { obj.paymentProvider = value; } }, metadata: _metadata }, _paymentProvider_initializers, _paymentProvider_extraInitializers);
        __esDecorate(null, null, _paymentReference_decorators, { kind: "field", name: "paymentReference", static: false, private: false, access: { has: function (obj) { return "paymentReference" in obj; }, get: function (obj) { return obj.paymentReference; }, set: function (obj, value) { obj.paymentReference = value; } }, metadata: _metadata }, _paymentReference_initializers, _paymentReference_extraInitializers);
        __esDecorate(null, null, _amountPaid_decorators, { kind: "field", name: "amountPaid", static: false, private: false, access: { has: function (obj) { return "amountPaid" in obj; }, get: function (obj) { return obj.amountPaid; }, set: function (obj, value) { obj.amountPaid = value; } }, metadata: _metadata }, _amountPaid_initializers, _amountPaid_extraInitializers);
        __esDecorate(null, null, _paidAt_decorators, { kind: "field", name: "paidAt", static: false, private: false, access: { has: function (obj) { return "paidAt" in obj; }, get: function (obj) { return obj.paidAt; }, set: function (obj, value) { obj.paidAt = value; } }, metadata: _metadata }, _paidAt_initializers, _paidAt_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminTournamentRegistration = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminTournamentRegistration = _classThis;
}();
exports.AdminTournamentRegistration = AdminTournamentRegistration;
var AdminTournamentMatch = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A single match row inside the bracket.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _round_decorators;
    var _round_initializers = [];
    var _round_extraInitializers = [];
    var _matchNumber_decorators;
    var _matchNumber_initializers = [];
    var _matchNumber_extraInitializers = [];
    var _team1Name_decorators;
    var _team1Name_initializers = [];
    var _team1Name_extraInitializers = [];
    var _team2Name_decorators;
    var _team2Name_initializers = [];
    var _team2Name_extraInitializers = [];
    var _team1Score_decorators;
    var _team1Score_initializers = [];
    var _team1Score_extraInitializers = [];
    var _team2Score_decorators;
    var _team2Score_initializers = [];
    var _team2Score_extraInitializers = [];
    var _winnerTeamName_decorators;
    var _winnerTeamName_initializers = [];
    var _winnerTeamName_extraInitializers = [];
    var _scheduledAt_decorators;
    var _scheduledAt_initializers = [];
    var _scheduledAt_extraInitializers = [];
    var _venue_decorators;
    var _venue_initializers = [];
    var _venue_extraInitializers = [];
    var _courtName_decorators;
    var _courtName_initializers = [];
    var _courtName_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _notes_decorators;
    var _notes_initializers = [];
    var _notes_extraInitializers = [];
    var AdminTournamentMatch = _classThis = /** @class */ (function () {
        function AdminTournamentMatch_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.round = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _round_initializers, void 0));
            this.matchNumber = (__runInitializers(this, _round_extraInitializers), __runInitializers(this, _matchNumber_initializers, void 0));
            this.team1Name = (__runInitializers(this, _matchNumber_extraInitializers), __runInitializers(this, _team1Name_initializers, void 0));
            this.team2Name = (__runInitializers(this, _team1Name_extraInitializers), __runInitializers(this, _team2Name_initializers, void 0));
            this.team1Score = (__runInitializers(this, _team2Name_extraInitializers), __runInitializers(this, _team1Score_initializers, void 0));
            this.team2Score = (__runInitializers(this, _team1Score_extraInitializers), __runInitializers(this, _team2Score_initializers, void 0));
            this.winnerTeamName = (__runInitializers(this, _team2Score_extraInitializers), __runInitializers(this, _winnerTeamName_initializers, void 0));
            this.scheduledAt = (__runInitializers(this, _winnerTeamName_extraInitializers), __runInitializers(this, _scheduledAt_initializers, void 0));
            this.venue = (__runInitializers(this, _scheduledAt_extraInitializers), __runInitializers(this, _venue_initializers, void 0));
            this.courtName = (__runInitializers(this, _venue_extraInitializers), __runInitializers(this, _courtName_initializers, void 0));
            this.status = (__runInitializers(this, _courtName_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.notes = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _notes_initializers, void 0));
            __runInitializers(this, _notes_extraInitializers);
        }
        return AdminTournamentMatch_1;
    }());
    __setFunctionName(_classThis, "AdminTournamentMatch");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _round_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _matchNumber_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _team1Name_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _team2Name_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _team1Score_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _team2Score_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _winnerTeamName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _scheduledAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _venue_decorators = [(0, graphql_1.Field)(function () { return AdminTournamentVenueStub; }, { nullable: true })];
        _courtName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.MatchStatus; })];
        _notes_decorators = [(0, graphql_1.Field)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _round_decorators, { kind: "field", name: "round", static: false, private: false, access: { has: function (obj) { return "round" in obj; }, get: function (obj) { return obj.round; }, set: function (obj, value) { obj.round = value; } }, metadata: _metadata }, _round_initializers, _round_extraInitializers);
        __esDecorate(null, null, _matchNumber_decorators, { kind: "field", name: "matchNumber", static: false, private: false, access: { has: function (obj) { return "matchNumber" in obj; }, get: function (obj) { return obj.matchNumber; }, set: function (obj, value) { obj.matchNumber = value; } }, metadata: _metadata }, _matchNumber_initializers, _matchNumber_extraInitializers);
        __esDecorate(null, null, _team1Name_decorators, { kind: "field", name: "team1Name", static: false, private: false, access: { has: function (obj) { return "team1Name" in obj; }, get: function (obj) { return obj.team1Name; }, set: function (obj, value) { obj.team1Name = value; } }, metadata: _metadata }, _team1Name_initializers, _team1Name_extraInitializers);
        __esDecorate(null, null, _team2Name_decorators, { kind: "field", name: "team2Name", static: false, private: false, access: { has: function (obj) { return "team2Name" in obj; }, get: function (obj) { return obj.team2Name; }, set: function (obj, value) { obj.team2Name = value; } }, metadata: _metadata }, _team2Name_initializers, _team2Name_extraInitializers);
        __esDecorate(null, null, _team1Score_decorators, { kind: "field", name: "team1Score", static: false, private: false, access: { has: function (obj) { return "team1Score" in obj; }, get: function (obj) { return obj.team1Score; }, set: function (obj, value) { obj.team1Score = value; } }, metadata: _metadata }, _team1Score_initializers, _team1Score_extraInitializers);
        __esDecorate(null, null, _team2Score_decorators, { kind: "field", name: "team2Score", static: false, private: false, access: { has: function (obj) { return "team2Score" in obj; }, get: function (obj) { return obj.team2Score; }, set: function (obj, value) { obj.team2Score = value; } }, metadata: _metadata }, _team2Score_initializers, _team2Score_extraInitializers);
        __esDecorate(null, null, _winnerTeamName_decorators, { kind: "field", name: "winnerTeamName", static: false, private: false, access: { has: function (obj) { return "winnerTeamName" in obj; }, get: function (obj) { return obj.winnerTeamName; }, set: function (obj, value) { obj.winnerTeamName = value; } }, metadata: _metadata }, _winnerTeamName_initializers, _winnerTeamName_extraInitializers);
        __esDecorate(null, null, _scheduledAt_decorators, { kind: "field", name: "scheduledAt", static: false, private: false, access: { has: function (obj) { return "scheduledAt" in obj; }, get: function (obj) { return obj.scheduledAt; }, set: function (obj, value) { obj.scheduledAt = value; } }, metadata: _metadata }, _scheduledAt_initializers, _scheduledAt_extraInitializers);
        __esDecorate(null, null, _venue_decorators, { kind: "field", name: "venue", static: false, private: false, access: { has: function (obj) { return "venue" in obj; }, get: function (obj) { return obj.venue; }, set: function (obj, value) { obj.venue = value; } }, metadata: _metadata }, _venue_initializers, _venue_extraInitializers);
        __esDecorate(null, null, _courtName_decorators, { kind: "field", name: "courtName", static: false, private: false, access: { has: function (obj) { return "courtName" in obj; }, get: function (obj) { return obj.courtName; }, set: function (obj, value) { obj.courtName = value; } }, metadata: _metadata }, _courtName_initializers, _courtName_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _notes_decorators, { kind: "field", name: "notes", static: false, private: false, access: { has: function (obj) { return "notes" in obj; }, get: function (obj) { return obj.notes; }, set: function (obj, value) { obj.notes = value; } }, metadata: _metadata }, _notes_initializers, _notes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminTournamentMatch = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminTournamentMatch = _classThis;
}();
exports.AdminTournamentMatch = AdminTournamentMatch;
var AdminTournamentPaymentSummary = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'Aggregated payment totals for a tournament.' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _totalRegistrations_decorators;
    var _totalRegistrations_initializers = [];
    var _totalRegistrations_extraInitializers = [];
    var _paidRegistrations_decorators;
    var _paidRegistrations_initializers = [];
    var _paidRegistrations_extraInitializers = [];
    var _pendingPayments_decorators;
    var _pendingPayments_initializers = [];
    var _pendingPayments_extraInitializers = [];
    var _totalCollected_decorators;
    var _totalCollected_initializers = [];
    var _totalCollected_extraInitializers = [];
    var _entryFee_decorators;
    var _entryFee_initializers = [];
    var _entryFee_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var AdminTournamentPaymentSummary = _classThis = /** @class */ (function () {
        function AdminTournamentPaymentSummary_1() {
            this.totalRegistrations = __runInitializers(this, _totalRegistrations_initializers, void 0);
            this.paidRegistrations = (__runInitializers(this, _totalRegistrations_extraInitializers), __runInitializers(this, _paidRegistrations_initializers, void 0));
            this.pendingPayments = (__runInitializers(this, _paidRegistrations_extraInitializers), __runInitializers(this, _pendingPayments_initializers, void 0));
            this.totalCollected = (__runInitializers(this, _pendingPayments_extraInitializers), __runInitializers(this, _totalCollected_initializers, void 0));
            this.entryFee = (__runInitializers(this, _totalCollected_extraInitializers), __runInitializers(this, _entryFee_initializers, void 0));
            this.currency = (__runInitializers(this, _entryFee_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            __runInitializers(this, _currency_extraInitializers);
        }
        return AdminTournamentPaymentSummary_1;
    }());
    __setFunctionName(_classThis, "AdminTournamentPaymentSummary");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _totalRegistrations_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _paidRegistrations_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _pendingPayments_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; })];
        _totalCollected_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _entryFee_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _totalRegistrations_decorators, { kind: "field", name: "totalRegistrations", static: false, private: false, access: { has: function (obj) { return "totalRegistrations" in obj; }, get: function (obj) { return obj.totalRegistrations; }, set: function (obj, value) { obj.totalRegistrations = value; } }, metadata: _metadata }, _totalRegistrations_initializers, _totalRegistrations_extraInitializers);
        __esDecorate(null, null, _paidRegistrations_decorators, { kind: "field", name: "paidRegistrations", static: false, private: false, access: { has: function (obj) { return "paidRegistrations" in obj; }, get: function (obj) { return obj.paidRegistrations; }, set: function (obj, value) { obj.paidRegistrations = value; } }, metadata: _metadata }, _paidRegistrations_initializers, _paidRegistrations_extraInitializers);
        __esDecorate(null, null, _pendingPayments_decorators, { kind: "field", name: "pendingPayments", static: false, private: false, access: { has: function (obj) { return "pendingPayments" in obj; }, get: function (obj) { return obj.pendingPayments; }, set: function (obj, value) { obj.pendingPayments = value; } }, metadata: _metadata }, _pendingPayments_initializers, _pendingPayments_extraInitializers);
        __esDecorate(null, null, _totalCollected_decorators, { kind: "field", name: "totalCollected", static: false, private: false, access: { has: function (obj) { return "totalCollected" in obj; }, get: function (obj) { return obj.totalCollected; }, set: function (obj, value) { obj.totalCollected = value; } }, metadata: _metadata }, _totalCollected_initializers, _totalCollected_extraInitializers);
        __esDecorate(null, null, _entryFee_decorators, { kind: "field", name: "entryFee", static: false, private: false, access: { has: function (obj) { return "entryFee" in obj; }, get: function (obj) { return obj.entryFee; }, set: function (obj, value) { obj.entryFee = value; } }, metadata: _metadata }, _entryFee_initializers, _entryFee_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminTournamentPaymentSummary = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminTournamentPaymentSummary = _classThis;
}();
exports.AdminTournamentPaymentSummary = AdminTournamentPaymentSummary;
var AdminTournament = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Admin-facing view of a Tournament — organizer, registrations, matches and payment totals.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _organizer_decorators;
    var _organizer_initializers = [];
    var _organizer_extraInitializers = [];
    var _venue_decorators;
    var _venue_initializers = [];
    var _venue_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _startDate_decorators;
    var _startDate_initializers = [];
    var _startDate_extraInitializers = [];
    var _endDate_decorators;
    var _endDate_initializers = [];
    var _endDate_extraInitializers = [];
    var _registrationDeadline_decorators;
    var _registrationDeadline_initializers = [];
    var _registrationDeadline_extraInitializers = [];
    var _maxTeams_decorators;
    var _maxTeams_initializers = [];
    var _maxTeams_extraInitializers = [];
    var _minTeams_decorators;
    var _minTeams_initializers = [];
    var _minTeams_extraInitializers = [];
    var _entryFee_decorators;
    var _entryFee_initializers = [];
    var _entryFee_extraInitializers = [];
    var _prizePool_decorators;
    var _prizePool_initializers = [];
    var _prizePool_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _coverImageUrl_decorators;
    var _coverImageUrl_initializers = [];
    var _coverImageUrl_extraInitializers = [];
    var _imageUrls_decorators;
    var _imageUrls_initializers = [];
    var _imageUrls_extraInitializers = [];
    var _rulesText_decorators;
    var _rulesText_initializers = [];
    var _rulesText_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    var _rejectionReason_decorators;
    var _rejectionReason_initializers = [];
    var _rejectionReason_extraInitializers = [];
    var _suspensionReason_decorators;
    var _suspensionReason_initializers = [];
    var _suspensionReason_extraInitializers = [];
    var _approvedBy_decorators;
    var _approvedBy_initializers = [];
    var _approvedBy_extraInitializers = [];
    var _approvedAt_decorators;
    var _approvedAt_initializers = [];
    var _approvedAt_extraInitializers = [];
    var _closedBy_decorators;
    var _closedBy_initializers = [];
    var _closedBy_extraInitializers = [];
    var _closedAt_decorators;
    var _closedAt_initializers = [];
    var _closedAt_extraInitializers = [];
    var _registrations_decorators;
    var _registrations_initializers = [];
    var _registrations_extraInitializers = [];
    var _matches_decorators;
    var _matches_initializers = [];
    var _matches_extraInitializers = [];
    var _paymentSummary_decorators;
    var _paymentSummary_initializers = [];
    var _paymentSummary_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminTournament = _classThis = /** @class */ (function () {
        function AdminTournament_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.organizer = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _organizer_initializers, void 0));
            this.venue = (__runInitializers(this, _organizer_extraInitializers), __runInitializers(this, _venue_initializers, void 0));
            this.name = (__runInitializers(this, _venue_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
            this.description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.sport = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.city = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.startDate = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _startDate_initializers, void 0));
            this.endDate = (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0));
            this.registrationDeadline = (__runInitializers(this, _endDate_extraInitializers), __runInitializers(this, _registrationDeadline_initializers, void 0));
            this.maxTeams = (__runInitializers(this, _registrationDeadline_extraInitializers), __runInitializers(this, _maxTeams_initializers, void 0));
            this.minTeams = (__runInitializers(this, _maxTeams_extraInitializers), __runInitializers(this, _minTeams_initializers, void 0));
            this.entryFee = (__runInitializers(this, _minTeams_extraInitializers), __runInitializers(this, _entryFee_initializers, void 0));
            this.prizePool = (__runInitializers(this, _entryFee_extraInitializers), __runInitializers(this, _prizePool_initializers, void 0));
            this.currency = (__runInitializers(this, _prizePool_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
            this.coverImageUrl = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _coverImageUrl_initializers, void 0));
            this.imageUrls = (__runInitializers(this, _coverImageUrl_extraInitializers), __runInitializers(this, _imageUrls_initializers, void 0));
            this.rulesText = (__runInitializers(this, _imageUrls_extraInitializers), __runInitializers(this, _rulesText_initializers, void 0));
            this.status = (__runInitializers(this, _rulesText_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.visibility = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
            this.rejectionReason = (__runInitializers(this, _visibility_extraInitializers), __runInitializers(this, _rejectionReason_initializers, void 0));
            this.suspensionReason = (__runInitializers(this, _rejectionReason_extraInitializers), __runInitializers(this, _suspensionReason_initializers, void 0));
            this.approvedBy = (__runInitializers(this, _suspensionReason_extraInitializers), __runInitializers(this, _approvedBy_initializers, void 0));
            this.approvedAt = (__runInitializers(this, _approvedBy_extraInitializers), __runInitializers(this, _approvedAt_initializers, void 0));
            this.closedBy = (__runInitializers(this, _approvedAt_extraInitializers), __runInitializers(this, _closedBy_initializers, void 0));
            this.closedAt = (__runInitializers(this, _closedBy_extraInitializers), __runInitializers(this, _closedAt_initializers, void 0));
            this.registrations = (__runInitializers(this, _closedAt_extraInitializers), __runInitializers(this, _registrations_initializers, void 0));
            this.matches = (__runInitializers(this, _registrations_extraInitializers), __runInitializers(this, _matches_initializers, void 0));
            this.paymentSummary = (__runInitializers(this, _matches_extraInitializers), __runInitializers(this, _paymentSummary_initializers, void 0));
            this.createdAt = (__runInitializers(this, _paymentSummary_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminTournament_1;
    }());
    __setFunctionName(_classThis, "AdminTournament");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _organizer_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _venue_decorators = [(0, graphql_1.Field)(function () { return AdminTournamentVenueStub; }, { nullable: true })];
        _name_decorators = [(0, graphql_1.Field)()];
        _slug_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _startDate_decorators = [(0, graphql_1.Field)()];
        _endDate_decorators = [(0, graphql_1.Field)()];
        _registrationDeadline_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _maxTeams_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _minTeams_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { nullable: true })];
        _entryFee_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _prizePool_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _currency_decorators = [(0, graphql_1.Field)()];
        _coverImageUrl_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _imageUrls_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _rulesText_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentStatus; })];
        _visibility_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentVisibility; })];
        _rejectionReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _suspensionReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _approvedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _approvedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _closedBy_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _closedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _registrations_decorators = [(0, graphql_1.Field)(function () { return [AdminTournamentRegistration]; })];
        _matches_decorators = [(0, graphql_1.Field)(function () { return [AdminTournamentMatch]; })];
        _paymentSummary_decorators = [(0, graphql_1.Field)(function () { return AdminTournamentPaymentSummary; })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _organizer_decorators, { kind: "field", name: "organizer", static: false, private: false, access: { has: function (obj) { return "organizer" in obj; }, get: function (obj) { return obj.organizer; }, set: function (obj, value) { obj.organizer = value; } }, metadata: _metadata }, _organizer_initializers, _organizer_extraInitializers);
        __esDecorate(null, null, _venue_decorators, { kind: "field", name: "venue", static: false, private: false, access: { has: function (obj) { return "venue" in obj; }, get: function (obj) { return obj.venue; }, set: function (obj, value) { obj.venue = value; } }, metadata: _metadata }, _venue_initializers, _venue_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: function (obj) { return "startDate" in obj; }, get: function (obj) { return obj.startDate; }, set: function (obj, value) { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
        __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: function (obj) { return "endDate" in obj; }, get: function (obj) { return obj.endDate; }, set: function (obj, value) { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
        __esDecorate(null, null, _registrationDeadline_decorators, { kind: "field", name: "registrationDeadline", static: false, private: false, access: { has: function (obj) { return "registrationDeadline" in obj; }, get: function (obj) { return obj.registrationDeadline; }, set: function (obj, value) { obj.registrationDeadline = value; } }, metadata: _metadata }, _registrationDeadline_initializers, _registrationDeadline_extraInitializers);
        __esDecorate(null, null, _maxTeams_decorators, { kind: "field", name: "maxTeams", static: false, private: false, access: { has: function (obj) { return "maxTeams" in obj; }, get: function (obj) { return obj.maxTeams; }, set: function (obj, value) { obj.maxTeams = value; } }, metadata: _metadata }, _maxTeams_initializers, _maxTeams_extraInitializers);
        __esDecorate(null, null, _minTeams_decorators, { kind: "field", name: "minTeams", static: false, private: false, access: { has: function (obj) { return "minTeams" in obj; }, get: function (obj) { return obj.minTeams; }, set: function (obj, value) { obj.minTeams = value; } }, metadata: _metadata }, _minTeams_initializers, _minTeams_extraInitializers);
        __esDecorate(null, null, _entryFee_decorators, { kind: "field", name: "entryFee", static: false, private: false, access: { has: function (obj) { return "entryFee" in obj; }, get: function (obj) { return obj.entryFee; }, set: function (obj, value) { obj.entryFee = value; } }, metadata: _metadata }, _entryFee_initializers, _entryFee_extraInitializers);
        __esDecorate(null, null, _prizePool_decorators, { kind: "field", name: "prizePool", static: false, private: false, access: { has: function (obj) { return "prizePool" in obj; }, get: function (obj) { return obj.prizePool; }, set: function (obj, value) { obj.prizePool = value; } }, metadata: _metadata }, _prizePool_initializers, _prizePool_extraInitializers);
        __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
        __esDecorate(null, null, _coverImageUrl_decorators, { kind: "field", name: "coverImageUrl", static: false, private: false, access: { has: function (obj) { return "coverImageUrl" in obj; }, get: function (obj) { return obj.coverImageUrl; }, set: function (obj, value) { obj.coverImageUrl = value; } }, metadata: _metadata }, _coverImageUrl_initializers, _coverImageUrl_extraInitializers);
        __esDecorate(null, null, _imageUrls_decorators, { kind: "field", name: "imageUrls", static: false, private: false, access: { has: function (obj) { return "imageUrls" in obj; }, get: function (obj) { return obj.imageUrls; }, set: function (obj, value) { obj.imageUrls = value; } }, metadata: _metadata }, _imageUrls_initializers, _imageUrls_extraInitializers);
        __esDecorate(null, null, _rulesText_decorators, { kind: "field", name: "rulesText", static: false, private: false, access: { has: function (obj) { return "rulesText" in obj; }, get: function (obj) { return obj.rulesText; }, set: function (obj, value) { obj.rulesText = value; } }, metadata: _metadata }, _rulesText_initializers, _rulesText_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
        __esDecorate(null, null, _rejectionReason_decorators, { kind: "field", name: "rejectionReason", static: false, private: false, access: { has: function (obj) { return "rejectionReason" in obj; }, get: function (obj) { return obj.rejectionReason; }, set: function (obj, value) { obj.rejectionReason = value; } }, metadata: _metadata }, _rejectionReason_initializers, _rejectionReason_extraInitializers);
        __esDecorate(null, null, _suspensionReason_decorators, { kind: "field", name: "suspensionReason", static: false, private: false, access: { has: function (obj) { return "suspensionReason" in obj; }, get: function (obj) { return obj.suspensionReason; }, set: function (obj, value) { obj.suspensionReason = value; } }, metadata: _metadata }, _suspensionReason_initializers, _suspensionReason_extraInitializers);
        __esDecorate(null, null, _approvedBy_decorators, { kind: "field", name: "approvedBy", static: false, private: false, access: { has: function (obj) { return "approvedBy" in obj; }, get: function (obj) { return obj.approvedBy; }, set: function (obj, value) { obj.approvedBy = value; } }, metadata: _metadata }, _approvedBy_initializers, _approvedBy_extraInitializers);
        __esDecorate(null, null, _approvedAt_decorators, { kind: "field", name: "approvedAt", static: false, private: false, access: { has: function (obj) { return "approvedAt" in obj; }, get: function (obj) { return obj.approvedAt; }, set: function (obj, value) { obj.approvedAt = value; } }, metadata: _metadata }, _approvedAt_initializers, _approvedAt_extraInitializers);
        __esDecorate(null, null, _closedBy_decorators, { kind: "field", name: "closedBy", static: false, private: false, access: { has: function (obj) { return "closedBy" in obj; }, get: function (obj) { return obj.closedBy; }, set: function (obj, value) { obj.closedBy = value; } }, metadata: _metadata }, _closedBy_initializers, _closedBy_extraInitializers);
        __esDecorate(null, null, _closedAt_decorators, { kind: "field", name: "closedAt", static: false, private: false, access: { has: function (obj) { return "closedAt" in obj; }, get: function (obj) { return obj.closedAt; }, set: function (obj, value) { obj.closedAt = value; } }, metadata: _metadata }, _closedAt_initializers, _closedAt_extraInitializers);
        __esDecorate(null, null, _registrations_decorators, { kind: "field", name: "registrations", static: false, private: false, access: { has: function (obj) { return "registrations" in obj; }, get: function (obj) { return obj.registrations; }, set: function (obj, value) { obj.registrations = value; } }, metadata: _metadata }, _registrations_initializers, _registrations_extraInitializers);
        __esDecorate(null, null, _matches_decorators, { kind: "field", name: "matches", static: false, private: false, access: { has: function (obj) { return "matches" in obj; }, get: function (obj) { return obj.matches; }, set: function (obj, value) { obj.matches = value; } }, metadata: _metadata }, _matches_initializers, _matches_extraInitializers);
        __esDecorate(null, null, _paymentSummary_decorators, { kind: "field", name: "paymentSummary", static: false, private: false, access: { has: function (obj) { return "paymentSummary" in obj; }, get: function (obj) { return obj.paymentSummary; }, set: function (obj, value) { obj.paymentSummary = value; } }, metadata: _metadata }, _paymentSummary_initializers, _paymentSummary_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminTournament = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminTournament = _classThis;
}();
exports.AdminTournament = AdminTournament;
function decimalToNumber(d) {
    if (d === null || d === undefined)
        return 0;
    return typeof d === 'number' ? d : Number(d.toString());
}
function mapRegistrationToAdmin(r) {
    var _a, _b, _c, _d, _e;
    return {
        id: r.id,
        teamName: r.teamName,
        captain: r.captain ? (0, admin_user_model_1.mapPrismaUserToAdmin)(r.captain) : undefined,
        contactEmail: (_a = r.contactEmail) !== null && _a !== void 0 ? _a : undefined,
        contactPhone: (_b = r.contactPhone) !== null && _b !== void 0 ? _b : undefined,
        status: r.status,
        paymentStatus: r.paymentStatus,
        paymentProvider: (_c = r.paymentProvider) !== null && _c !== void 0 ? _c : undefined,
        paymentReference: (_d = r.paymentReference) !== null && _d !== void 0 ? _d : undefined,
        amountPaid: decimalToNumber(r.amountPaid),
        paidAt: (_e = r.paidAt) !== null && _e !== void 0 ? _e : undefined,
        createdAt: r.createdAt,
    };
}
function mapMatchToAdmin(m) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return {
        id: m.id,
        round: m.round,
        matchNumber: m.matchNumber,
        team1Name: (_b = (_a = m.team1) === null || _a === void 0 ? void 0 : _a.teamName) !== null && _b !== void 0 ? _b : undefined,
        team2Name: (_d = (_c = m.team2) === null || _c === void 0 ? void 0 : _c.teamName) !== null && _d !== void 0 ? _d : undefined,
        team1Score: (_e = m.team1Score) !== null && _e !== void 0 ? _e : undefined,
        team2Score: (_f = m.team2Score) !== null && _f !== void 0 ? _f : undefined,
        winnerTeamName: (_h = (_g = m.winner) === null || _g === void 0 ? void 0 : _g.teamName) !== null && _h !== void 0 ? _h : undefined,
        scheduledAt: (_j = m.scheduledAt) !== null && _j !== void 0 ? _j : undefined,
        venue: m.venue
            ? { id: m.venue.id, name: m.venue.name, city: (_k = m.venue.city) !== null && _k !== void 0 ? _k : undefined }
            : undefined,
        courtName: (_m = (_l = m.court) === null || _l === void 0 ? void 0 : _l.name) !== null && _m !== void 0 ? _m : undefined,
        status: m.status,
        notes: (_o = m.notes) !== null && _o !== void 0 ? _o : undefined,
    };
}
function mapTournamentToAdmin(t) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var registrations = t.registrations.map(mapRegistrationToAdmin);
    var matches = t.matches.map(mapMatchToAdmin);
    var totalCollected = registrations.reduce(function (sum, r) { return sum + r.amountPaid; }, 0);
    var paidRegistrations = registrations.filter(function (r) { return r.paymentStatus === 'SUCCEEDED'; }).length;
    var pendingPayments = registrations.filter(function (r) { return r.paymentStatus === 'PENDING'; }).length;
    return {
        id: t.id,
        organizer: (0, admin_user_model_1.mapPrismaUserToAdmin)(t.organizer),
        venue: t.venue
            ? { id: t.venue.id, name: t.venue.name, city: (_a = t.venue.city) !== null && _a !== void 0 ? _a : undefined }
            : undefined,
        name: t.name,
        slug: t.slug,
        description: (_b = t.description) !== null && _b !== void 0 ? _b : undefined,
        sport: (0, sport_stub_model_1.mapSportStub)(t.sport),
        city: (_c = t.city) !== null && _c !== void 0 ? _c : undefined,
        startDate: t.startDate,
        endDate: t.endDate,
        registrationDeadline: (_d = t.registrationDeadline) !== null && _d !== void 0 ? _d : undefined,
        maxTeams: (_e = t.maxTeams) !== null && _e !== void 0 ? _e : undefined,
        minTeams: (_f = t.minTeams) !== null && _f !== void 0 ? _f : undefined,
        entryFee: decimalToNumber(t.entryFee),
        prizePool: decimalToNumber(t.prizePool),
        currency: t.currency,
        coverImageUrl: (_g = t.coverImageUrl) !== null && _g !== void 0 ? _g : undefined,
        imageUrls: t.imageUrls,
        rulesText: (_h = t.rulesText) !== null && _h !== void 0 ? _h : undefined,
        status: t.status,
        visibility: t.visibility,
        rejectionReason: (_j = t.rejectionReason) !== null && _j !== void 0 ? _j : undefined,
        suspensionReason: (_k = t.suspensionReason) !== null && _k !== void 0 ? _k : undefined,
        approvedBy: t.approvedBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(t.approvedBy) : undefined,
        approvedAt: (_l = t.approvedAt) !== null && _l !== void 0 ? _l : undefined,
        closedBy: t.closedBy ? (0, admin_user_model_1.mapPrismaUserToAdmin)(t.closedBy) : undefined,
        closedAt: (_m = t.closedAt) !== null && _m !== void 0 ? _m : undefined,
        registrations: registrations,
        matches: matches,
        paymentSummary: {
            totalRegistrations: registrations.length,
            paidRegistrations: paidRegistrations,
            pendingPayments: pendingPayments,
            totalCollected: totalCollected,
            entryFee: decimalToNumber(t.entryFee),
            currency: t.currency,
        },
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
    };
}
