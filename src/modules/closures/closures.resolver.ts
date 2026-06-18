import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';

import { ClosuresService } from './closures.service';
import { ClosureModel } from './dto/closure.model';
import { CreateClosureInput, ListClosuresInput } from './dto/closure.inputs';

@Resolver(() => ClosureModel)
export class ClosuresResolver {
  constructor(private readonly service: ClosuresService) {}

  @Query(() => [ClosureModel], {
    name: 'venueClosures',
    description: 'Closures / time blocks for a venue.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('bookings:read')
  venueClosures(@Args('input') input: ListClosuresInput): Promise<ClosureModel[]> {
    return this.service.list(input);
  }

  @Mutation(() => ClosureModel, {
    name: 'createClosure',
    description: 'Block a court or the whole venue for a time window.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('calendar:manage')
  createClosure(
    @Args('input') input: CreateClosureInput,
    @CurrentUser() user: AuthUser,
  ): Promise<ClosureModel> {
    return this.service.create(input, user.id);
  }

  @Mutation(() => ClosureModel, {
    name: 'deleteClosure',
    description: 'Remove a closure / time block.',
  })
  @UseGuards(VenuePermissionGuard)
  @RequireVenuePermission('calendar:manage')
  deleteClosure(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('closureId', { type: () => ID }) closureId: string,
  ): Promise<ClosureModel> {
    return this.service.remove(venueId, closureId);
  }
}
