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
exports.UpdateTournamentStatusInput = exports.UpdateTournamentVisibilityInput = exports.ApproveTournamentInput = exports.CancelTournamentInput = exports.SuspendTournamentInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var SuspendTournamentInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _tournamentId_decorators;
    var _tournamentId_initializers = [];
    var _tournamentId_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var SuspendTournamentInput = _classThis = /** @class */ (function () {
        function SuspendTournamentInput_1() {
            this.tournamentId = __runInitializers(this, _tournamentId_initializers, void 0);
            this.reason = (__runInitializers(this, _tournamentId_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return SuspendTournamentInput_1;
    }());
    __setFunctionName(_classThis, "SuspendTournamentInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tournamentId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _reason_decorators = [(0, graphql_1.Field)({ description: 'Reason shown to the organizer.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _tournamentId_decorators, { kind: "field", name: "tournamentId", static: false, private: false, access: { has: function (obj) { return "tournamentId" in obj; }, get: function (obj) { return obj.tournamentId; }, set: function (obj, value) { obj.tournamentId = value; } }, metadata: _metadata }, _tournamentId_initializers, _tournamentId_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SuspendTournamentInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SuspendTournamentInput = _classThis;
}();
exports.SuspendTournamentInput = SuspendTournamentInput;
var CancelTournamentInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _tournamentId_decorators;
    var _tournamentId_initializers = [];
    var _tournamentId_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var CancelTournamentInput = _classThis = /** @class */ (function () {
        function CancelTournamentInput_1() {
            this.tournamentId = __runInitializers(this, _tournamentId_initializers, void 0);
            this.reason = (__runInitializers(this, _tournamentId_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return CancelTournamentInput_1;
    }());
    __setFunctionName(_classThis, "CancelTournamentInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tournamentId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _reason_decorators = [(0, graphql_1.Field)({ description: 'Reason shown to organizer + registered teams.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _tournamentId_decorators, { kind: "field", name: "tournamentId", static: false, private: false, access: { has: function (obj) { return "tournamentId" in obj; }, get: function (obj) { return obj.tournamentId; }, set: function (obj, value) { obj.tournamentId = value; } }, metadata: _metadata }, _tournamentId_initializers, _tournamentId_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CancelTournamentInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CancelTournamentInput = _classThis;
}();
exports.CancelTournamentInput = CancelTournamentInput;
var ApproveTournamentInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _tournamentId_decorators;
    var _tournamentId_initializers = [];
    var _tournamentId_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var ApproveTournamentInput = _classThis = /** @class */ (function () {
        function ApproveTournamentInput_1() {
            this.tournamentId = __runInitializers(this, _tournamentId_initializers, void 0);
            this.note = (__runInitializers(this, _tournamentId_extraInitializers), __runInitializers(this, _note_initializers, void 0));
            __runInitializers(this, _note_extraInitializers);
        }
        return ApproveTournamentInput_1;
    }());
    __setFunctionName(_classThis, "ApproveTournamentInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tournamentId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _note_decorators = [(0, graphql_1.Field)({ nullable: true, description: 'Optional internal note.' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _tournamentId_decorators, { kind: "field", name: "tournamentId", static: false, private: false, access: { has: function (obj) { return "tournamentId" in obj; }, get: function (obj) { return obj.tournamentId; }, set: function (obj, value) { obj.tournamentId = value; } }, metadata: _metadata }, _tournamentId_initializers, _tournamentId_extraInitializers);
        __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ApproveTournamentInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ApproveTournamentInput = _classThis;
}();
exports.ApproveTournamentInput = ApproveTournamentInput;
var UpdateTournamentVisibilityInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _tournamentId_decorators;
    var _tournamentId_initializers = [];
    var _tournamentId_extraInitializers = [];
    var _visibility_decorators;
    var _visibility_initializers = [];
    var _visibility_extraInitializers = [];
    var UpdateTournamentVisibilityInput = _classThis = /** @class */ (function () {
        function UpdateTournamentVisibilityInput_1() {
            this.tournamentId = __runInitializers(this, _tournamentId_initializers, void 0);
            this.visibility = (__runInitializers(this, _tournamentId_extraInitializers), __runInitializers(this, _visibility_initializers, void 0));
            __runInitializers(this, _visibility_extraInitializers);
        }
        return UpdateTournamentVisibilityInput_1;
    }());
    __setFunctionName(_classThis, "UpdateTournamentVisibilityInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tournamentId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _visibility_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentVisibility; }), (0, class_validator_1.IsEnum)(client_1.TournamentVisibility)];
        __esDecorate(null, null, _tournamentId_decorators, { kind: "field", name: "tournamentId", static: false, private: false, access: { has: function (obj) { return "tournamentId" in obj; }, get: function (obj) { return obj.tournamentId; }, set: function (obj, value) { obj.tournamentId = value; } }, metadata: _metadata }, _tournamentId_initializers, _tournamentId_extraInitializers);
        __esDecorate(null, null, _visibility_decorators, { kind: "field", name: "visibility", static: false, private: false, access: { has: function (obj) { return "visibility" in obj; }, get: function (obj) { return obj.visibility; }, set: function (obj, value) { obj.visibility = value; } }, metadata: _metadata }, _visibility_initializers, _visibility_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateTournamentVisibilityInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateTournamentVisibilityInput = _classThis;
}();
exports.UpdateTournamentVisibilityInput = UpdateTournamentVisibilityInput;
var UpdateTournamentStatusInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _tournamentId_decorators;
    var _tournamentId_initializers = [];
    var _tournamentId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _reason_decorators;
    var _reason_initializers = [];
    var _reason_extraInitializers = [];
    var UpdateTournamentStatusInput = _classThis = /** @class */ (function () {
        function UpdateTournamentStatusInput_1() {
            this.tournamentId = __runInitializers(this, _tournamentId_initializers, void 0);
            this.status = (__runInitializers(this, _tournamentId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            this.reason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _reason_initializers, void 0));
            __runInitializers(this, _reason_extraInitializers);
        }
        return UpdateTournamentStatusInput_1;
    }());
    __setFunctionName(_classThis, "UpdateTournamentStatusInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _tournamentId_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; }), (0, class_validator_1.IsString)()];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.TournamentStatus; }), (0, class_validator_1.IsEnum)(client_1.TournamentStatus)];
        _reason_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Required when transitioning to SUSPENDED / CANCELLED / REJECTED.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(500)];
        __esDecorate(null, null, _tournamentId_decorators, { kind: "field", name: "tournamentId", static: false, private: false, access: { has: function (obj) { return "tournamentId" in obj; }, get: function (obj) { return obj.tournamentId; }, set: function (obj, value) { obj.tournamentId = value; } }, metadata: _metadata }, _tournamentId_initializers, _tournamentId_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _reason_decorators, { kind: "field", name: "reason", static: false, private: false, access: { has: function (obj) { return "reason" in obj; }, get: function (obj) { return obj.reason; }, set: function (obj, value) { obj.reason = value; } }, metadata: _metadata }, _reason_initializers, _reason_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UpdateTournamentStatusInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UpdateTournamentStatusInput = _classThis;
}();
exports.UpdateTournamentStatusInput = UpdateTournamentStatusInput;
