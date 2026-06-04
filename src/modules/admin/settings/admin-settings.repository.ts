import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';

const SETTINGS_INCLUDES = {
  updatedBy: true,
} satisfies Prisma.PlatformSettingInclude;

export type SettingsWithRelations = Prisma.PlatformSettingGetPayload<{
  include: typeof SETTINGS_INCLUDES;
}>;

const SINGLETON_ID = 'default';

@Injectable()
export class AdminSettingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Read the singleton row, upserting an empty one (Prisma defaults) if it
   * doesn't exist yet. This guarantees `/admin/settings` works on a freshly
   * migrated DB without needing a seed step.
   */
  async getOrCreate(): Promise<SettingsWithRelations> {
    return this.prisma.platformSetting.upsert({
      where: { id: SINGLETON_ID },
      create: { id: SINGLETON_ID },
      update: {},
      include: SETTINGS_INCLUDES,
    });
  }

  update(args: {
    data: Prisma.PlatformSettingUpdateInput;
    actorId: string;
  }): Promise<SettingsWithRelations> {
    return this.prisma.platformSetting.upsert({
      where: { id: SINGLETON_ID },
      create: {
        id: SINGLETON_ID,
        ...args.data,
        updatedBy: { connect: { id: args.actorId } },
      } as Prisma.PlatformSettingCreateInput,
      update: {
        ...args.data,
        updatedBy: { connect: { id: args.actorId } },
      },
      include: SETTINGS_INCLUDES,
    });
  }
}
