import { ForbiddenException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

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
      'Resolve a stored object key into a fresh presigned download URL (e.g. to refresh an expired one). Private categories (KYC documents) resolve only for the uploader.',
  })
  async mediaUrl(@Args('key') key: string, @CurrentUser() user: AuthUser): Promise<string | null> {
    // Any authenticated caller can hand this query any key, so the key itself
    // cannot be the access control. Public display assets stay open; private
    // documents answer only to whoever uploaded them.
    if (!this.storage.canResolveKey(key, user.id, user.role === UserRole.SUPER_ADMIN)) {
      throw new ForbiddenException('You do not have access to this file.');
    }
    return this.storage.getDownloadUrl(key);
  }
}
