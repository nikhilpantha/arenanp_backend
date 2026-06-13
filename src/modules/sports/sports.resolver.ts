import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../../database/prisma.service';
import { StorageService } from '../../storage/storage.service';

import { mapSport, SportModel } from './dto/sport.model';

/**
 * App-facing sports catalogue. Returns the active sports (admin-managed) so the
 * mobile app can populate venue setup, filters, etc. dynamically instead of a
 * hardcoded list. The stored `iconUrl` is an S3 key, presigned on read.
 */
@Resolver(() => SportModel)
export class SportsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  @Query(() => [SportModel], {
    name: 'sports',
    description: 'Active sports in the platform catalogue, ordered for display.',
  })
  async sports(): Promise<SportModel[]> {
    const rows = await this.prisma.sport.findMany({
      where: { isActive: true },
      orderBy: [{ displayOrder: 'asc' }, { name: 'asc' }],
    });
    return rows.map(mapSport);
  }

  // Presign the stored sport-icon key into a temporary download URL on read.
  @ResolveField(() => String, { nullable: true })
  iconUrl(@Parent() sport: SportModel): Promise<string | null> {
    return this.storage.getDownloadUrl(sport.iconUrl);
  }
}
