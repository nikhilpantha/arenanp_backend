import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import { AuthModule } from '../auth/auth.module';

import { StaffActivityService } from './staff-activity.service';
import { VenueStaffRepository } from './venue-staff.repository';
import { VenueStaffResolver } from './venue-staff.resolver';
import { VenueStaffService } from './venue-staff.service';
import { RbacModule } from '../rbac/rbac.module';

/**
 * Who works at a venue: minting staff logins, changing roles, suspending and
 * removing seats. Everything here needs `staff:manage`, which only the owner
 * role grants.
 *
 * `AuthModule` is imported for `AuthService.invalidateSessions` — removing a
 * seat or resetting a password has to end that person's live sessions, not
 * wait for a token to expire.
 */
@Module({
  imports: [RbacModule, AuthModule],
  providers: [
    VenueStaffResolver,
    VenueStaffService,
    VenueStaffRepository,
    StaffActivityService,
    VenuePermissionGuard,
  ],
})
export class VenueStaffModule {}
