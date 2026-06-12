import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import type { AuthUser } from '../../common/types/auth-context';

import { AuthPayload } from '../auth/dto/auth-payload';
import { VenueInvitationsService } from './venue-invitations.service';
import {
  CreateInvitationResult,
  InvitationVerification,
  VenueInvitation,
} from './dto/invitation.models';
import {
  AcceptVenueInvitationInput,
  InviteVenueInput,
  ResendVenueInvitationInput,
  RevokeVenueInvitationInput,
} from './dto/invitation.inputs';

@Resolver(() => VenueInvitation)
export class VenueInvitationsResolver {
  constructor(private readonly service: VenueInvitationsService) {}

  // ─── Admin-side ────────────────────────────────────────────────────────

  @Query(() => [VenueInvitation], {
    name: 'adminListVenueInvitations',
    description: 'List pending (un-accepted) venue invitations.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  list(): Promise<VenueInvitation[]> {
    return this.service.listPending();
  }

  @Mutation(() => CreateInvitationResult, {
    name: 'adminInviteVenue',
    description:
      'Create a venue invitation, send the email, and return the resulting row. In dev (stub mailer) the setup URL is returned so admins can click straight through.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  invite(
    @Args('input') input: InviteVenueInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<CreateInvitationResult> {
    return this.service.invite(input, actor);
  }

  @Mutation(() => CreateInvitationResult, {
    name: 'adminResendVenueInvitation',
    description: 'Rotate the token, push the expiry forward and resend the email.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  resend(@Args('input') input: ResendVenueInvitationInput): Promise<CreateInvitationResult> {
    return this.service.resend(input);
  }

  @Mutation(() => Boolean, {
    name: 'adminRevokeVenueInvitation',
    description: 'Delete a pending invitation so its link stops working.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  revoke(@Args('input') input: RevokeVenueInvitationInput): Promise<boolean> {
    return this.service.revoke(input);
  }

  // ─── Public — called by the /setup-account page ────────────────────────

  @Query(() => InvitationVerification, {
    name: 'verifyVenueInvitation',
    description: 'Validate the token before showing the password-setup form.',
  })
  @Public()
  verify(@Args('token') token: string): Promise<InvitationVerification> {
    return this.service.verifyToken(token);
  }

  @Mutation(() => AuthPayload, {
    name: 'acceptVenueInvitation',
    description:
      'Set the new account’s password, mark the invitation accepted, and return an access token so the user is signed in immediately.',
  })
  @Public()
  accept(@Args('input') input: AcceptVenueInvitationInput): Promise<AuthPayload> {
    return this.service.accept(input);
  }
}
