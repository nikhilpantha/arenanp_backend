import { Module } from '@nestjs/common';

import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';

import { ClosuresRepository } from './closures.repository';
import { ClosuresResolver } from './closures.resolver';
import { ClosuresService } from './closures.service';

/**
 * Venue closures / time blocks. Owners block a single court or the whole venue for
 * a window (`calendar:manage`); the block then suppresses bookable slots and is
 * rejected at walk-in and online booking. The overlap check lives in `closures.util`
 * so the booking and discovery flows can run it without importing this module.
 */
@Module({
  providers: [ClosuresResolver, ClosuresService, ClosuresRepository, VenuePermissionGuard],
})
export class ClosuresModule {}
