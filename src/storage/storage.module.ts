import { Global, Module } from '@nestjs/common';

import { StorageService } from './storage.service';
import { StorageResolver } from './storage.resolver';

/**
 * Global so any module can inject {@link StorageService} (to presign download
 * URLs in its resolvers) without re-importing. Exposes the user-facing upload
 * resolver here; the admin upload resolver lives under modules/admin/storage.
 */
@Global()
@Module({
  providers: [StorageService, StorageResolver],
  exports: [StorageService],
})
export class StorageModule {}
