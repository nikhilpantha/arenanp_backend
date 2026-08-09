import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { FinanceRepository } from './finance.repository';
import { FinanceResolver } from './finance.resolver';
import { FinanceService } from './finance.service';
import { SalaryService } from './salary.service';

/**
 * Venue-owner finance: live income / give-away / profit aggregations over the
 * existing money rails (bookings, subscription payments, settlements), plus the
 * two write surfaces those rails can't reconstruct — operating expenses and the
 * end-of-day cash reconciliation. Reads need `finance:read`, writes `finance:write`.
 */
@Module({
  providers: [
    FinanceResolver,
    FinanceService,
    FinanceRepository,
    SalaryService,
    VenuePermissionGuard,
  ],
})
export class FinanceModule {}
