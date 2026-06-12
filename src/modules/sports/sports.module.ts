import { Module } from '@nestjs/common';

import { SportsResolver } from './sports.resolver';

/** App-facing sports catalogue (read-only). Admin manages the list under admin/sports. */
@Module({
  providers: [SportsResolver],
})
export class SportsModule {}
