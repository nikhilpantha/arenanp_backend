import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { SystemStaffService } from './system-staff.service';
import { VenueStaffService } from './venue-staff.service';
import { OrganizerStaffService } from './organizer-staff.service';
import { StaffResolver } from './staff.resolver';
import { PrismaModule } from '../../../database/prisma.module';
import { EmailModule } from '../../email/email.module';
import { RbacModule } from '../../rbac/rbac.module';

@Module({
  imports: [PrismaModule, EmailModule, RbacModule],
  providers: [
    StaffService,
    SystemStaffService,
    VenueStaffService,
    OrganizerStaffService,
    StaffResolver,
  ],
  exports: [StaffService, SystemStaffService, VenueStaffService, OrganizerStaffService],
})
export class StaffModule {}
