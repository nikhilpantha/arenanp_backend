import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminSportsService } from './admin-sports.service';
import { AdminSport } from './dto/admin-sport.model';
import { CreateSportInput, UpdateSportInput } from './dto/sport.inputs';

@Resolver(() => AdminSport)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminSportsResolver {
  constructor(private readonly service: AdminSportsService) {}

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

  @Mutation(() => AdminSport, { name: 'adminCreateSport' })
  create(
    @Args('input') input: CreateSportInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminSport> {
    return this.service.create(input, actor);
  }

  @Mutation(() => AdminSport, { name: 'adminUpdateSport' })
  update(@Args('input') input: UpdateSportInput): Promise<AdminSport> {
    return this.service.update(input);
  }

  @Mutation(() => Boolean, {
    name: 'adminDeleteSport',
    description:
      'Permanently remove a sport. Blocked when courts / tournaments / venue offerings still reference it — deactivate instead.',
  })
  delete(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
