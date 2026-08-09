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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var graphql_1 = require("@nestjs/graphql");
var throttler_1 = require("@nestjs/throttler");
var app_config_1 = require("./config/app.config");
var database_config_1 = require("./config/database.config");
var redis_config_1 = require("./config/redis.config");
var storage_config_1 = require("./config/storage.config");
var env_validation_1 = require("./config/env.validation");
var graphql_config_1 = require("./config/graphql.config");
var prisma_module_1 = require("./database/prisma.module");
var redis_module_1 = require("./redis/redis.module");
var mailer_module_1 = require("./mailer/mailer.module");
var storage_module_1 = require("./storage/storage.module");
var auth_module_1 = require("./modules/auth/auth.module");
var users_module_1 = require("./modules/users/users.module");
var admin_module_1 = require("./modules/admin/admin.module");
var email_module_1 = require("./modules/email/email.module");
var rbac_module_1 = require("./modules/rbac/rbac.module");
var booking_module_1 = require("./modules/booking/booking.module");
var discovery_module_1 = require("./modules/discovery/discovery.module");
var offers_module_1 = require("./modules/offers/offers.module");
var customers_module_1 = require("./modules/customers/customers.module");
var subscriptions_module_1 = require("./modules/subscriptions/subscriptions.module");
var capabilities_module_1 = require("./modules/capabilities/capabilities.module");
var venue_module_1 = require("./modules/venue/venue.module");
var venue_staff_module_1 = require("./modules/venue-staff/venue-staff.module");
var venue_invitations_module_1 = require("./modules/venue-invitations/venue-invitations.module");
var sports_module_1 = require("./modules/sports/sports.module");
var closures_module_1 = require("./modules/closures/closures.module");
var marketing_module_1 = require("./modules/marketing/marketing.module");
var audit_module_1 = require("./modules/audit/audit.module");
var health_controller_1 = require("./health.controller");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    cache: true,
                    load: [app_config_1.appConfig, database_config_1.databaseConfig, redis_config_1.redisConfig, storage_config_1.storageConfig],
                    validationSchema: env_validation_1.envValidationSchema,
                    validationOptions: { abortEarly: false },
                }),
                // One global per-IP ceiling. Credential endpoints tighten it per handler
                // with `@ThrottleAuth()` rather than registering a second named limiter —
                // every configured limiter applies to every route, so a second one would
                // cap the whole API at the auth budget.
                throttler_1.ThrottlerModule.forRootAsync({
                    useFactory: function () {
                        var _a, _b;
                        return [
                            {
                                ttl: parseInt((_a = process.env.THROTTLE_TTL) !== null && _a !== void 0 ? _a : '60', 10) * 1000,
                                limit: parseInt((_b = process.env.THROTTLE_LIMIT) !== null && _b !== void 0 ? _b : '120', 10),
                            },
                        ];
                    },
                }),
                graphql_1.GraphQLModule.forRootAsync(graphql_config_1.graphqlConfigFactory),
                // Infrastructure
                prisma_module_1.PrismaModule,
                redis_module_1.RedisModule,
                mailer_module_1.MailerModule,
                storage_module_1.StorageModule,
                email_module_1.EmailModule,
                capabilities_module_1.CapabilitiesModule,
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                admin_module_1.AdminModule,
                rbac_module_1.RbacModule,
                venue_module_1.VenueModule,
                venue_staff_module_1.VenueStaffModule,
                booking_module_1.BookingModule,
                discovery_module_1.DiscoveryModule,
                offers_module_1.OffersModule,
                customers_module_1.CustomersModule,
                subscriptions_module_1.SubscriptionsModule,
                venue_invitations_module_1.VenueInvitationsModule,
                sports_module_1.SportsModule,
                closures_module_1.ClosuresModule,
                marketing_module_1.MarketingModule,
                audit_module_1.AuditModule,
            ],
            controllers: [health_controller_1.HealthController],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
