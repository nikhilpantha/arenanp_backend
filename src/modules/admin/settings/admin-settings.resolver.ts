import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminSettingsService } from './admin-settings.service';
import { PlatformSettings } from './dto/platform-settings.model';
import { UpdatePlatformSettingsInput } from './dto/update-platform-settings.input';

@Resolver(() => PlatformSettings)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminSettingsResolver {
  constructor(private readonly service: AdminSettingsService) {}

  @Query(() => PlatformSettings, {
    name: 'adminPlatformSettings',
    description: 'Read the singleton platform settings row. Created on first access if missing.',
  })
  get(): Promise<PlatformSettings> {
    return this.service.get();
  }

  @Mutation(() => PlatformSettings, {
    name: 'adminUpdatePlatformSettings',
    description:
      'Partially update platform settings. Only fields present in the input are touched.',
  })
  update(
    @Args('input') input: UpdatePlatformSettingsInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<PlatformSettings> {
    return this.service.update(input, actor);
  }
}
