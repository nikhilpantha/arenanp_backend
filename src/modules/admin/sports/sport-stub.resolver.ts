import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { StorageService } from '../../../storage/storage.service';
import { SportStub } from './dto/sport-stub.model';

/**
 * Field resolver for the shared SportStub type. Sport icons are admin-managed
 * (UploadCategory.SPORT_ICON, stored under admin/sports/) but appear embedded in
 * user-facing venue / booking / tournament payloads, so this presigns the stored
 * key into a download URL wherever a SportStub is returned.
 */
@Resolver(() => SportStub)
export class SportStubResolver {
  constructor(private readonly storage: StorageService) {}

  @ResolveField(() => String, { nullable: true })
  iconUrl(@Parent() sport: SportStub): Promise<string | null> {
    return this.storage.getDownloadUrl(sport.iconUrl);
  }
}
