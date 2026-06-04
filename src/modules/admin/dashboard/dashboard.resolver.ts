import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminDashboardService } from './dashboard.service';
import { AdminDashboardOverview } from './dto/dashboard.models';

@Resolver(() => AdminDashboardOverview)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminDashboardResolver {
  constructor(private readonly service: AdminDashboardService) {}

  @Query(() => AdminDashboardOverview, {
    name: 'adminDashboardOverview',
    description: 'Aggregated KPIs, trends and recent activity for the super-admin dashboard.',
  })
  async adminDashboardOverview(): Promise<AdminDashboardOverview> {
    return this.service.getOverview();
  }
}
