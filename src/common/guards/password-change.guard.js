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
exports.PasswordChangeGuard = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var allow_password_pending_decorator_1 = require("../decorators/allow-password-pending.decorator");
/**
 * Stops an account whose password was chosen by someone else from doing
 * anything until the holder picks their own.
 *
 * A venue owner creates a staff login and hands over a starter password. Until
 * it is changed, two people know it — so a booking "created by Ram" might have
 * been created by the owner, and the accountability the seat exists to provide
 * isn't there yet.
 *
 * This lives on the server rather than in a client redirect deliberately. A
 * React guard is a suggestion; anyone holding the token could call the API
 * directly around it. Here, the console genuinely cannot be driven until the
 * flag clears.
 *
 * Public routes are unaffected: they have no `req.user`, so the guard falls
 * through — which is what lets sign-in, refresh and sign-out keep working for
 * an account in this state.
 */
var PasswordChangeGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var PasswordChangeGuard = _classThis = /** @class */ (function () {
        function PasswordChangeGuard_1(reflector) {
            this.reflector = reflector;
        }
        PasswordChangeGuard_1.prototype.canActivate = function (context) {
            var user = this.currentUser(context);
            if (!(user === null || user === void 0 ? void 0 : user.mustChangePassword))
                return true;
            var allowed = this.reflector.getAllAndOverride(allow_password_pending_decorator_1.ALLOW_PASSWORD_PENDING_KEY, [context.getHandler(), context.getClass()]);
            if (allowed)
                return true;
            throw new common_1.ForbiddenException('Set a new password before continuing.');
        };
        PasswordChangeGuard_1.prototype.currentUser = function (context) {
            var _a, _b;
            if (context.getType() === 'graphql') {
                return (_a = graphql_1.GqlExecutionContext.create(context).getContext().req) === null || _a === void 0 ? void 0 : _a.user;
            }
            return (_b = context.switchToHttp().getRequest()) === null || _b === void 0 ? void 0 : _b.user;
        };
        return PasswordChangeGuard_1;
    }());
    __setFunctionName(_classThis, "PasswordChangeGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PasswordChangeGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PasswordChangeGuard = _classThis;
}();
exports.PasswordChangeGuard = PasswordChangeGuard;
