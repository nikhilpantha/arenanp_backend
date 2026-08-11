import { Query, Resolver } from '@nestjs/graphql';

import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import { AdminDashboardService } from './dashboard.service';
import { AdminDashboardOverview } from './dto/dashboard.models';

@Resolver(() => AdminDashboardOverview)
@RequirePermission('dashboard.view')
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
