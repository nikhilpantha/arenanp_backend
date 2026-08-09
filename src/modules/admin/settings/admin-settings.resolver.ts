import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminSettingsService } from './admin-settings.service';
import { PlatformSettings } from './dto/platform-settings.model';
import { UpdatePlatformSettingsInput } from './dto/update-platform-settings.input';

@Resolver(() => PlatformSettings)
@RequirePermission('settings.view')
export class AdminSettingsResolver {
  constructor(private readonly service: AdminSettingsService) {}

  @Query(() => PlatformSettings, {
    name: 'adminPlatformSettings',
    description: 'Read the singleton platform settings row. Created on first access if missing.',
  })
  get(): Promise<PlatformSettings> {
    return this.service.get();
  }

  @RequirePermission('settings.edit')
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
