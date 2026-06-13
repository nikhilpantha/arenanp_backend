import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { AuthUser } from '../common/types/auth-context';

import { CreateUploadUrlInput } from './dto/create-upload-url.input';
import { PresignedUpload } from './dto/presigned-upload.model';
import { StorageService } from './storage.service';

/**
 * User-facing uploads. The client asks for a presigned PUT, uploads the file
 * directly to S3, then sends the returned `key` into the relevant domain
 * mutation (updateProfile, submitVenue, …). Admin-only categories (e.g. sport
 * icons) live in the separate AdminStorageResolver.
 */
@Resolver()
export class StorageResolver {
  constructor(private readonly storage: StorageService) {}

  @Mutation(() => PresignedUpload, {
    name: 'createUploadUrl',
    description:
      'Get a presigned URL to upload one file (avatar, venue image/document, etc.) directly to S3.',
  })
  createUploadUrl(
    @Args('input') input: CreateUploadUrlInput,
    @CurrentUser() user: AuthUser,
  ): Promise<PresignedUpload> {
    return this.storage.createUploadUrl({
      category: input.category,
      contentType: input.contentType,
      filename: input.filename,
      ownerId: user.id,
      scope: 'user',
    });
  }

  @Query(() => String, {
    name: 'mediaUrl',
    nullable: true,
    description:
      'Resolve a stored object key into a fresh presigned download URL (e.g. to refresh an expired one).',
  })
  mediaUrl(@Args('key') key: string): Promise<string | null> {
    return this.storage.getDownloadUrl(key);
  }
}
