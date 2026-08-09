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
exports.SessionResponder = void 0;
var common_1 = require("@nestjs/common");
var user_model_1 = require("../users/dto/user.model");
var session_transport_1 = require("./session-transport");
/**
 * Turns "this user has proved who they are" into an `AuthPayload`, and owns the one
 * decision that must never be made twice: **how** the refresh token reaches the
 * client. Every mutation that signs somebody in goes through here — login, OTP
 * verify, refresh, and accepting a venue invitation — so none of them can forget
 * the cookie or accidentally leak the token into a browser-readable body.
 */
var SessionResponder = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SessionResponder = _classThis = /** @class */ (function () {
        function SessionResponder_1(auth, config) {
            this.auth = auth;
            this.config = config;
        }
        Object.defineProperty(SessionResponder_1.prototype, "settings", {
            get: function () {
                return this.config.get('app.refresh');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SessionResponder_1.prototype, "isProd", {
            get: function () {
                return this.config.get('NODE_ENV') === 'production';
            },
            enumerable: false,
            configurable: true
        });
        /** Rough device info for the session row. Never trusted for anything. */
        SessionResponder_1.prototype.meta = function (ctx) {
            var _a, _b, _c;
            return { userAgent: (_b = (_a = ctx.req) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b['user-agent'], ip: (_c = ctx.req) === null || _c === void 0 ? void 0 : _c.ip };
        };
        /** The refresh token on this request — cookie (web) or explicit argument (app). */
        SessionResponder_1.prototype.presentedToken = function (ctx, fromInput) {
            return (0, session_transport_1.readRefreshToken)(ctx.req, this.settings, fromInput);
        };
        SessionResponder_1.prototype.clear = function (ctx) {
            (0, session_transport_1.clearRefreshCookie)(ctx.res, this.settings, this.isProd);
        };
        /** Open a brand-new session for a user who just authenticated, then reply. */
        SessionResponder_1.prototype.open = function (user, token, ctx) {
            return __awaiter(this, void 0, void 0, function () {
                var refresh;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.auth.openSession(user, this.meta(ctx))];
                        case 1:
                            refresh = _a.sent();
                            return [2 /*return*/, this.respond(user, token, refresh, ctx)];
                    }
                });
            });
        };
        /**
         * The single place the refresh token is handed over. A browser gets it as an
         * httpOnly cookie and **never** in the body — page JavaScript could read it
         * there, which is the whole thing httpOnly exists to prevent. The phone app has
         * no usable cookie jar, so it gets the body instead and stores it itself.
         */
        SessionResponder_1.prototype.respond = function (user, token, refresh, ctx) {
            var isApp = (0, session_transport_1.clientKindOf)(ctx.req) === 'app';
            if (!isApp)
                (0, session_transport_1.setRefreshCookie)(ctx.res, refresh, this.settings, this.isProd);
            return {
                accessToken: token.accessToken,
                tokenType: token.tokenType,
                expiresAt: token.expiresAt,
                refreshToken: isApp ? refresh.token : undefined,
                refreshExpiresAt: refresh.expiresAt,
                user: (0, user_model_1.mapUserToGraphql)(user),
            };
        };
        return SessionResponder_1;
    }());
    __setFunctionName(_classThis, "SessionResponder");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SessionResponder = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SessionResponder = _classThis;
}();
exports.SessionResponder = SessionResponder;
