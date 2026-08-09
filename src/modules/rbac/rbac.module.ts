import { Module } from '@nestjs/common';
import { PermissionResolverService } from './permission-resolver.service';
import { StaffPermissionService } from './staff-permission.service';
import { RbacResolver } from './rbac.resolver';

@Module({
  providers: [PermissionResolverService, StaffPermissionService, RbacResolver],
  exports: [PermissionResolverService, StaffPermissionService],
})
export class RbacModule {}
