import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { CreateUploadUrlInput } from '../../../storage/dto/create-upload-url.input';
import { PresignedUpload } from '../../../storage/dto/presigned-upload.model';
import { StorageService } from '../../../storage/storage.service';

/**
 * Admin-only uploads (e.g. sport icons). Routes through the same StorageService
 * but with `scope: 'admin'`, so only admin-scoped categories are accepted and
 * the objects land under the `admin/` key prefix — keeping admin assets cleanly
 * separated in the bucket. Guarded to SUPER_ADMIN like the rest of admin/.
 */
@Resolver()
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminStorageResolver {
  constructor(private readonly storage: StorageService) {}

  @Mutation(() => PresignedUpload, {
    name: 'adminCreateUploadUrl',
    description:
      'Get a presigned URL to upload an admin-managed asset (e.g. a sport icon) directly to S3.',
  })
  adminCreateUploadUrl(
    @Args('input') input: CreateUploadUrlInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<PresignedUpload> {
    return this.storage.createUploadUrl({
      category: input.category,
      contentType: input.contentType,
      filename: input.filename,
      ownerId: actor.id,
      scope: 'admin',
    });
  }
}
