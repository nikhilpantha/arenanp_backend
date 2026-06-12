import { Module } from '@nestjs/common';

import { AdminDashboardRepository } from './dashboard/dashboard.repository';
import { AdminDashboardResolver } from './dashboard/dashboard.resolver';
import { AdminDashboardService } from './dashboard/dashboard.service';
import { AdminUsersRepository } from './users/admin-users.repository';
import { AdminUsersResolver } from './users/admin-users.resolver';
import { AdminUsersService } from './users/admin-users.service';
import { OrganizerVerificationRepository } from './organizer-verification/organizer-verification.repository';
import { OrganizerVerificationResolver } from './organizer-verification/organizer-verification.resolver';
import { OrganizerVerificationService } from './organizer-verification/organizer-verification.service';
import { VenueVerificationRepository } from './venue-verification/venue-verification.repository';
import { VenueVerificationResolver } from './venue-verification/venue-verification.resolver';
import { VenueVerificationService } from './venue-verification/venue-verification.service';
import { AdminVenuesRepository } from './venues/admin-venues.repository';
import { AdminCourtResolver, AdminVenuesResolver } from './venues/admin-venues.resolver';
import { AdminVenuesService } from './venues/admin-venues.service';
import { AdminBookingsRepository } from './bookings/admin-bookings.repository';
import { AdminBookingsResolver } from './bookings/admin-bookings.resolver';
import { AdminBookingsService } from './bookings/admin-bookings.service';
import { AdminPaymentsRepository } from './payments/admin-payments.repository';
import { AdminPaymentsResolver } from './payments/admin-payments.resolver';
import { AdminPaymentsService } from './payments/admin-payments.service';
import { AdminRefundsRepository } from './refunds/admin-refunds.repository';
import { AdminRefundsResolver } from './refunds/admin-refunds.resolver';
import { AdminRefundsService } from './refunds/admin-refunds.service';
import { AdminDisputesRepository } from './disputes/admin-disputes.repository';
import { AdminDisputesResolver } from './disputes/admin-disputes.resolver';
import { AdminDisputesService } from './disputes/admin-disputes.service';
import { AdminTournamentsRepository } from './tournaments/admin-tournaments.repository';
import { AdminTournamentsResolver } from './tournaments/admin-tournaments.resolver';
import { AdminTournamentsService } from './tournaments/admin-tournaments.service';
import { AdminSettingsRepository } from './settings/admin-settings.repository';
import { AdminSettingsResolver } from './settings/admin-settings.resolver';
import { AdminSettingsService } from './settings/admin-settings.service';
import { AdminSportsRepository } from './sports/admin-sports.repository';
import { AdminSportsResolver } from './sports/admin-sports.resolver';
import { AdminSportsService } from './sports/admin-sports.service';
import { SportStubResolver } from './sports/sport-stub.resolver';
import { AdminStorageResolver } from './storage/admin-storage.resolver';

/**
 * Super-admin module.
 *
 * Each admin feature lives in its own sub-folder (dashboard, users, organizers, …).
 * All resolvers in here must be guarded by `@Roles(UserRole.SUPER_ADMIN)` so the
 * surface area can only be reached by an authenticated platform admin.
 */
@Module({
  providers: [
    AdminDashboardResolver,
    AdminDashboardService,
    AdminDashboardRepository,
    AdminUsersResolver,
    AdminUsersService,
    AdminUsersRepository,
    OrganizerVerificationResolver,
    OrganizerVerificationService,
    OrganizerVerificationRepository,
    VenueVerificationResolver,
    VenueVerificationService,
    VenueVerificationRepository,
    AdminVenuesResolver,
    AdminCourtResolver,
    AdminVenuesService,
    AdminVenuesRepository,
    AdminBookingsResolver,
    AdminBookingsService,
    AdminBookingsRepository,
    // Settings is consumed by Payments — keep it ahead in the provider list.
    AdminSettingsResolver,
    AdminSettingsService,
    AdminSettingsRepository,
    AdminPaymentsResolver,
    AdminPaymentsService,
    AdminPaymentsRepository,
    AdminRefundsResolver,
    AdminRefundsService,
    AdminRefundsRepository,
    AdminDisputesResolver,
    AdminDisputesService,
    AdminDisputesRepository,
    AdminTournamentsResolver,
    AdminTournamentsService,
    AdminTournamentsRepository,
    AdminSportsResolver,
    AdminSportsService,
    AdminSportsRepository,
    SportStubResolver,
    AdminStorageResolver,
  ],
})
export class AdminModule {}
