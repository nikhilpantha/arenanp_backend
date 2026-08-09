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
exports.AdminModule = void 0;
var common_1 = require("@nestjs/common");
var email_module_1 = require("../email/email.module");
var rbac_module_1 = require("../rbac/rbac.module");
var dashboard_repository_1 = require("./dashboard/dashboard.repository");
var dashboard_resolver_1 = require("./dashboard/dashboard.resolver");
var dashboard_service_1 = require("./dashboard/dashboard.service");
var admin_users_repository_1 = require("./users/admin-users.repository");
var admin_users_resolver_1 = require("./users/admin-users.resolver");
var admin_users_service_1 = require("./users/admin-users.service");
var organizer_verification_repository_1 = require("./organizer-verification/organizer-verification.repository");
var organizer_verification_resolver_1 = require("./organizer-verification/organizer-verification.resolver");
var organizer_verification_service_1 = require("./organizer-verification/organizer-verification.service");
var venue_verification_repository_1 = require("./venue-verification/venue-verification.repository");
var venue_verification_resolver_1 = require("./venue-verification/venue-verification.resolver");
var venue_verification_service_1 = require("./venue-verification/venue-verification.service");
var admin_venues_repository_1 = require("./venues/admin-venues.repository");
var admin_venues_resolver_1 = require("./venues/admin-venues.resolver");
var admin_venues_service_1 = require("./venues/admin-venues.service");
var admin_bookings_repository_1 = require("./bookings/admin-bookings.repository");
var admin_bookings_resolver_1 = require("./bookings/admin-bookings.resolver");
var admin_bookings_service_1 = require("./bookings/admin-bookings.service");
var admin_payments_repository_1 = require("./payments/admin-payments.repository");
var admin_payments_resolver_1 = require("./payments/admin-payments.resolver");
var admin_payments_service_1 = require("./payments/admin-payments.service");
var admin_refunds_repository_1 = require("./refunds/admin-refunds.repository");
var admin_refunds_resolver_1 = require("./refunds/admin-refunds.resolver");
var admin_refunds_service_1 = require("./refunds/admin-refunds.service");
var admin_disputes_repository_1 = require("./disputes/admin-disputes.repository");
var admin_disputes_resolver_1 = require("./disputes/admin-disputes.resolver");
var admin_disputes_service_1 = require("./disputes/admin-disputes.service");
var admin_tournaments_repository_1 = require("./tournaments/admin-tournaments.repository");
var admin_tournaments_resolver_1 = require("./tournaments/admin-tournaments.resolver");
var admin_tournaments_service_1 = require("./tournaments/admin-tournaments.service");
var admin_settings_repository_1 = require("./settings/admin-settings.repository");
var admin_settings_resolver_1 = require("./settings/admin-settings.resolver");
var admin_settings_service_1 = require("./settings/admin-settings.service");
var admin_sports_repository_1 = require("./sports/admin-sports.repository");
var admin_sports_resolver_1 = require("./sports/admin-sports.resolver");
var admin_sports_service_1 = require("./sports/admin-sports.service");
var sport_stub_resolver_1 = require("./sports/sport-stub.resolver");
var admin_storage_resolver_1 = require("./storage/admin-storage.resolver");
var staff_service_1 = require("./staff/staff.service");
var staff_resolver_1 = require("./staff/staff.resolver");
/**
 * Platform administration module.
 *
 * Each admin feature lives in its own sub-folder (dashboard, users, organizers, …).
 * Every resolver in here must carry `@RequirePermission('<subject>.<action>')`
 * with keys from `common/constants/permission-keys.ts` — class-level for the
 * read permission, method-level on each mutation for the write permission.
 *
 * There are no roles. Authorization resolves from the grants recorded against
 * each admin in `staff_permissions`, so any subset of this surface can be handed
 * to one person without a code change. Do not reintroduce `@Roles(UserRole.X)`:
 * the enum only marks who is staff, never what they may do.
 */
var AdminModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [email_module_1.EmailModule, rbac_module_1.RbacModule],
            providers: [
                dashboard_resolver_1.AdminDashboardResolver,
                dashboard_service_1.AdminDashboardService,
                dashboard_repository_1.AdminDashboardRepository,
                admin_users_resolver_1.AdminUsersResolver,
                admin_users_service_1.AdminUsersService,
                admin_users_repository_1.AdminUsersRepository,
                organizer_verification_resolver_1.OrganizerVerificationResolver,
                organizer_verification_service_1.OrganizerVerificationService,
                organizer_verification_repository_1.OrganizerVerificationRepository,
                venue_verification_resolver_1.VenueVerificationResolver,
                venue_verification_service_1.VenueVerificationService,
                venue_verification_repository_1.VenueVerificationRepository,
                admin_venues_resolver_1.AdminVenuesResolver,
                admin_venues_resolver_1.AdminCourtResolver,
                admin_venues_service_1.AdminVenuesService,
                admin_venues_repository_1.AdminVenuesRepository,
                admin_bookings_resolver_1.AdminBookingsResolver,
                admin_bookings_service_1.AdminBookingsService,
                admin_bookings_repository_1.AdminBookingsRepository,
                // Settings is consumed by Payments — keep it ahead in the provider list.
                admin_settings_resolver_1.AdminSettingsResolver,
                admin_settings_service_1.AdminSettingsService,
                admin_settings_repository_1.AdminSettingsRepository,
                admin_payments_resolver_1.AdminPaymentsResolver,
                admin_payments_service_1.AdminPaymentsService,
                admin_payments_repository_1.AdminPaymentsRepository,
                admin_refunds_resolver_1.AdminRefundsResolver,
                admin_refunds_service_1.AdminRefundsService,
                admin_refunds_repository_1.AdminRefundsRepository,
                admin_disputes_resolver_1.AdminDisputesResolver,
                admin_disputes_service_1.AdminDisputesService,
                admin_disputes_repository_1.AdminDisputesRepository,
                admin_tournaments_resolver_1.AdminTournamentsResolver,
                admin_tournaments_service_1.AdminTournamentsService,
                admin_tournaments_repository_1.AdminTournamentsRepository,
                admin_sports_resolver_1.AdminSportsResolver,
                admin_sports_service_1.AdminSportsService,
                admin_sports_repository_1.AdminSportsRepository,
                sport_stub_resolver_1.SportStubResolver,
                admin_storage_resolver_1.AdminStorageResolver,
                staff_resolver_1.StaffResolver,
                staff_service_1.StaffService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminModule = _classThis = /** @class */ (function () {
        function AdminModule_1() {
        }
        return AdminModule_1;
    }());
    __setFunctionName(_classThis, "AdminModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminModule = _classThis;
}();
exports.AdminModule = AdminModule;
