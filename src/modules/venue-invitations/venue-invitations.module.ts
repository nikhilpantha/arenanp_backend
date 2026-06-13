import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { VenueInvitationsRepository } from './venue-invitations.repository';
import { VenueInvitationsResolver } from './venue-invitations.resolver';
import { VenueInvitationsService } from './venue-invitations.service';

@Module({
  imports: [AuthModule],
  providers: [VenueInvitationsResolver, VenueInvitationsService, VenueInvitationsRepository],
})
export class VenueInvitationsModule {}
