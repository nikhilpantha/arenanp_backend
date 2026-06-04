import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import type { AuthUser } from '../../common/types/auth-context';

import { AuthPayload } from '../auth/dto/auth-payload';
import { VenueOwnerInvitationsService } from './venue-owner-invitations.service';
import {
  CreateInvitationResult,
  InvitationVerification,
  VenueOwnerInvitation,
} from './dto/invitation.models';
import {
  AcceptVenueOwnerInvitationInput,
  InviteVenueOwnerInput,
  ResendVenueOwnerInvitationInput,
  RevokeVenueOwnerInvitationInput,
} from './dto/invitation.inputs';

@Resolver(() => VenueOwnerInvitation)
export class VenueOwnerInvitationsResolver {
  constructor(private readonly service: VenueOwnerInvitationsService) {}

  // ─── Admin-side ────────────────────────────────────────────────────────

  @Query(() => [VenueOwnerInvitation], {
    name: 'adminListVenueOwnerInvitations',
    description: 'List pending (un-accepted) venue-owner invitations.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  list(): Promise<VenueOwnerInvitation[]> {
    return this.service.listPending();
  }

  @Mutation(() => CreateInvitationResult, {
    name: 'adminInviteVenueOwner',
    description:
      'Create a venue-owner invitation, send the email, and return the resulting row. In dev (stub mailer) the setup URL is returned so admins can click straight through.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  invite(
    @Args('input') input: InviteVenueOwnerInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<CreateInvitationResult> {
    return this.service.invite(input, actor);
  }

  @Mutation(() => CreateInvitationResult, {
    name: 'adminResendVenueOwnerInvitation',
    description: 'Rotate the token, push the expiry forward and resend the email.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  resend(@Args('input') input: ResendVenueOwnerInvitationInput): Promise<CreateInvitationResult> {
    return this.service.resend(input);
  }

  @Mutation(() => Boolean, {
    name: 'adminRevokeVenueOwnerInvitation',
    description: 'Delete a pending invitation so its link stops working.',
  })
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  revoke(@Args('input') input: RevokeVenueOwnerInvitationInput): Promise<boolean> {
    return this.service.revoke(input);
  }

  // ─── Public — called by the /setup-account page ────────────────────────

  @Query(() => InvitationVerification, {
    name: 'verifyVenueOwnerInvitation',
    description: 'Validate the token before showing the password-setup form.',
  })
  @Public()
  verify(@Args('token') token: string): Promise<InvitationVerification> {
    return this.service.verifyToken(token);
  }

  @Mutation(() => AuthPayload, {
    name: 'acceptVenueOwnerInvitation',
    description:
      'Set the new account’s password, mark the invitation accepted, and return an access token so the user is signed in immediately.',
  })
  @Public()
  accept(@Args('input') input: AcceptVenueOwnerInvitationInput): Promise<AuthPayload> {
    return this.service.accept(input);
  }
}
