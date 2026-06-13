import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';

import { CapabilitiesService } from './capabilities.service';

@Module({
  imports: [PrismaModule],
  providers: [CapabilitiesService],
  exports: [CapabilitiesService],
})
export class CapabilitiesModule {}
