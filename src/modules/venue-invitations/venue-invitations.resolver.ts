import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { RequirePermission } from '../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../common/types/auth-context';

import { AuthPayload } from '../auth/dto/auth-payload';
import { SessionResponder, type GqlContext } from '../auth/session-responder.service';
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
  constructor(
    private readonly service: VenueInvitationsService,
    private readonly sessions: SessionResponder,
  ) {}

  // ─── Admin-side ────────────────────────────────────────────────────────

  @Query(() => [VenueInvitation], {
    name: 'adminListVenueInvitations',
    description: 'List pending (un-accepted) venue invitations.',
  })
  @RequirePermission('venues.invite')
  list(): Promise<VenueInvitation[]> {
    return this.service.listPending();
  }

  @Mutation(() => CreateInvitationResult, {
    name: 'adminInviteVenue',
    description:
      'Create a venue invitation, send the email, and return the resulting row. In dev (stub mailer) the setup URL is returned so admins can click straight through.',
  })
  @RequirePermission('venues.invite')
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
  @RequirePermission('venues.invite')
  resend(@Args('input') input: ResendVenueInvitationInput): Promise<CreateInvitationResult> {
    return this.service.resend(input);
  }

  @Mutation(() => Boolean, {
    name: 'adminRevokeVenueInvitation',
    description: 'Delete a pending invitation so its link stops working.',
  })
  @RequirePermission('venues.invite')
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
  async accept(
    @Args('input') input: AcceptVenueInvitationInput,
    @Context() ctx: GqlContext,
  ): Promise<AuthPayload> {
    const { user, token } = await this.service.accept(input);
    return this.sessions.open(user, token, ctx);
  }
}
