import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { VenueOwnerInvitationsRepository } from './venue-owner-invitations.repository';
import { VenueOwnerInvitationsResolver } from './venue-owner-invitations.resolver';
import { VenueOwnerInvitationsService } from './venue-owner-invitations.service';

@Module({
  imports: [AuthModule],
  providers: [
    VenueOwnerInvitationsResolver,
    VenueOwnerInvitationsService,
    VenueOwnerInvitationsRepository,
  ],
})
export class VenueOwnerInvitationsModule {}
