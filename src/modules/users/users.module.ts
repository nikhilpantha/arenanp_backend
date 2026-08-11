import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';
import { RbacModule } from '../rbac/rbac.module';
import { StorageModule } from '../../storage/storage.module';

@Module({
  imports: [AuthModule, RbacModule, StorageModule],
  providers: [UsersService, UsersResolver, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
