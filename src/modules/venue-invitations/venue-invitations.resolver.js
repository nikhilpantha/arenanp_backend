"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueInvitationsResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var public_decorator_1 = require("../../common/decorators/public.decorator");
var require_permission_decorator_1 = require("../../common/decorators/require-permission.decorator");
var auth_payload_1 = require("../auth/dto/auth-payload");
var invitation_models_1 = require("./dto/invitation.models");
var VenueInvitationsResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return invitation_models_1.VenueInvitation; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _list_decorators;
    var _invite_decorators;
    var _resend_decorators;
    var _revoke_decorators;
    var _verify_decorators;
    var _accept_decorators;
    var VenueInvitationsResolver = _classThis = /** @class */ (function () {
        function VenueInvitationsResolver_1(service, sessions) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.sessions = sessions;
        }
        // ─── Admin-side ────────────────────────────────────────────────────────
        VenueInvitationsResolver_1.prototype.list = function () {
            return this.service.listPending();
        };
        VenueInvitationsResolver_1.prototype.invite = function (input, actor) {
            return this.service.invite(input, actor);
        };
        VenueInvitationsResolver_1.prototype.resend = function (input) {
            return this.service.resend(input);
        };
        VenueInvitationsResolver_1.prototype.revoke = function (input) {
            return this.service.revoke(input);
        };
        // ─── Public — called by the /setup-account page ────────────────────────
        VenueInvitationsResolver_1.prototype.verify = function (token) {
            return this.service.verifyToken(token);
        };
        VenueInvitationsResolver_1.prototype.accept = function (input, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, user, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.service.accept(input)];
                        case 1:
                            _a = _b.sent(), user = _a.user, token = _a.token;
                            return [2 /*return*/, this.sessions.open(user, token, ctx)];
                    }
                });
            });
        };
        return VenueInvitationsResolver_1;
    }());
    __setFunctionName(_classThis, "VenueInvitationsResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _list_decorators = [(0, graphql_1.Query)(function () { return [invitation_models_1.VenueInvitation]; }, {
                name: 'adminListVenueInvitations',
                description: 'List pending (un-accepted) venue invitations.',
            }), (0, require_permission_decorator_1.RequirePermission)('venues.invite')];
        _invite_decorators = [(0, graphql_1.Mutation)(function () { return invitation_models_1.CreateInvitationResult; }, {
                name: 'adminInviteVenue',
                description: 'Create a venue invitation, send the email, and return the resulting row. In dev (stub mailer) the setup URL is returned so admins can click straight through.',
            }), (0, require_permission_decorator_1.RequirePermission)('venues.invite')];
        _resend_decorators = [(0, graphql_1.Mutation)(function () { return invitation_models_1.CreateInvitationResult; }, {
                name: 'adminResendVenueInvitation',
                description: 'Rotate the token, push the expiry forward and resend the email.',
            }), (0, require_permission_decorator_1.RequirePermission)('venues.invite')];
        _revoke_decorators = [(0, graphql_1.Mutation)(function () { return Boolean; }, {
                name: 'adminRevokeVenueInvitation',
                description: 'Delete a pending invitation so its link stops working.',
            }), (0, require_permission_decorator_1.RequirePermission)('venues.invite')];
        _verify_decorators = [(0, graphql_1.Query)(function () { return invitation_models_1.InvitationVerification; }, {
                name: 'verifyVenueInvitation',
                description: 'Validate the token before showing the password-setup form.',
            }), (0, public_decorator_1.Public)()];
        _accept_decorators = [(0, graphql_1.Mutation)(function () { return auth_payload_1.AuthPayload; }, {
                name: 'acceptVenueInvitation',
                description: 'Set the new account’s password, mark the invitation accepted, and return an access token so the user is signed in immediately.',
            }), (0, public_decorator_1.Public)()];
        __esDecorate(_classThis, null, _list_decorators, { kind: "method", name: "list", static: false, private: false, access: { has: function (obj) { return "list" in obj; }, get: function (obj) { return obj.list; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _invite_decorators, { kind: "method", name: "invite", static: false, private: false, access: { has: function (obj) { return "invite" in obj; }, get: function (obj) { return obj.invite; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resend_decorators, { kind: "method", name: "resend", static: false, private: false, access: { has: function (obj) { return "resend" in obj; }, get: function (obj) { return obj.resend; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revoke_decorators, { kind: "method", name: "revoke", static: false, private: false, access: { has: function (obj) { return "revoke" in obj; }, get: function (obj) { return obj.revoke; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verify_decorators, { kind: "method", name: "verify", static: false, private: false, access: { has: function (obj) { return "verify" in obj; }, get: function (obj) { return obj.verify; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _accept_decorators, { kind: "method", name: "accept", static: false, private: false, access: { has: function (obj) { return "accept" in obj; }, get: function (obj) { return obj.accept; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueInvitationsResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueInvitationsResolver = _classThis;
}();
exports.VenueInvitationsResolver = VenueInvitationsResolver;
