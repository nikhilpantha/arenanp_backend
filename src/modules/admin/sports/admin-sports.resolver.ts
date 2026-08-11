import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../../common/types/auth-context';
import { StorageService } from '../../../storage/storage.service';

import { AdminSportsService } from './admin-sports.service';
import { AdminSport } from './dto/admin-sport.model';
import { CreateSportInput, UpdateSportInput } from './dto/sport.inputs';

@Resolver(() => AdminSport)
@RequirePermission('sports.view')
export class AdminSportsResolver {
  constructor(
    private readonly service: AdminSportsService,
    private readonly storage: StorageService,
  ) {}

  /** Presign the stored sport-icon key into a temporary download URL on read. */
  @ResolveField(() => String, { nullable: true })
  iconUrl(@Parent() sport: AdminSport): Promise<string | null> {
    return this.storage.getDownloadUrl(sport.iconUrl);
  }

  @Query(() => [AdminSport], {
    name: 'adminListSports',
    description:
      'Catalogue of sports. Pass `activeOnly: true` to filter to the ones currently bookable.',
  })
  list(
    @Args('activeOnly', { type: () => Boolean, defaultValue: false }) activeOnly: boolean,
  ): Promise<AdminSport[]> {
    return this.service.list(activeOnly);
  }

  @Query(() => AdminSport, { name: 'adminSport' })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminSport> {
    return this.service.getOne(id);
  }

  @RequirePermission('sports.create')
  @Mutation(() => AdminSport, { name: 'adminCreateSport' })
  create(
    @Args('input') input: CreateSportInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminSport> {
    return this.service.create(input, actor);
  }

  @RequirePermission('sports.edit')
  @Mutation(() => AdminSport, { name: 'adminUpdateSport' })
  update(@Args('input') input: UpdateSportInput): Promise<AdminSport> {
    return this.service.update(input);
  }

  @RequirePermission('sports.delete')
  @Mutation(() => Boolean, {
    name: 'adminDeleteSport',
    description:
      'Permanently remove a sport. Blocked when courts / tournaments / venue offerings still reference it — deactivate instead.',
  })
  delete(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
