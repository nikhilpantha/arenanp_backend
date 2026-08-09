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
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var core_1 = require("@nestjs/core");
var auth_service_1 = require("./auth.service");
var auth_resolver_1 = require("./auth.resolver");
var auth_controller_1 = require("./auth.controller");
var otp_service_1 = require("./otp.service");
var refresh_token_service_1 = require("./refresh-token.service");
var session_responder_service_1 = require("./session-responder.service");
var jwt_strategy_1 = require("./strategies/jwt.strategy");
var jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
var capability_guard_1 = require("../../common/guards/capability.guard");
var permission_guard_1 = require("../../common/guards/permission.guard");
var capabilities_module_1 = require("../capabilities/capabilities.module");
var rbac_module_1 = require("../rbac/rbac.module");
var prisma_module_1 = require("../../database/prisma.module");
var redis_module_1 = require("../../redis/redis.module");
var audit_module_1 = require("../audit/audit.module");
var permission_cache_service_1 = require("./permission-cache.service");
var resource_ownership_service_1 = require("./resource-ownership.service");
// Force GraphQL enums to be registered before resolvers compile.
require("../../common/enums");
var AuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                capabilities_module_1.CapabilitiesModule,
                prisma_module_1.PrismaModule,
                redis_module_1.RedisModule,
                audit_module_1.AuditModule,
                rbac_module_1.RbacModule,
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                jwt_1.JwtModule.registerAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) {
                        var _a;
                        return ({
                            secret: config.get('app.jwt.accessSecret'),
                            signOptions: {
                                // `expiresIn` is typed `number | StringValue` in jsonwebtoken v9 (ms template literal);
                                // we read it from env as a string and trust env validation upstream.
                                expiresIn: ((_a = config.get('app.jwt.accessTtl')) !== null && _a !== void 0 ? _a : '7d'),
                            },
                        });
                    },
                }),
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [
                auth_service_1.AuthService,
                auth_resolver_1.AuthResolver,
                otp_service_1.OtpService,
                refresh_token_service_1.RefreshTokenService,
                session_responder_service_1.SessionResponder,
                jwt_strategy_1.JwtStrategy,
                permission_cache_service_1.PermissionCacheService,
                resource_ownership_service_1.ResourceOwnershipService,
                { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
                { provide: core_1.APP_GUARD, useClass: capability_guard_1.CapabilityGuard },
                { provide: core_1.APP_GUARD, useClass: permission_guard_1.PermissionGuard },
            ],
            exports: [
                auth_service_1.AuthService,
                jwt_1.JwtModule,
                passport_1.PassportModule,
                permission_cache_service_1.PermissionCacheService,
                resource_ownership_service_1.ResourceOwnershipService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_1() {
        }
        return AuthModule_1;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
