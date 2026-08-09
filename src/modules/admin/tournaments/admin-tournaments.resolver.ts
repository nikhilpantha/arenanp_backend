import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminTournamentsService } from './admin-tournaments.service';
import { AdminTournament } from './dto/admin-tournament.model';
import { ListAdminTournamentsInput } from './dto/list-admin-tournaments.input';
import { PaginatedAdminTournaments } from './dto/paginated-admin-tournaments';
import {
  ApproveTournamentInput,
  CancelTournamentInput,
  SuspendTournamentInput,
  UpdateTournamentStatusInput,
  UpdateTournamentVisibilityInput,
} from './dto/tournament-action.inputs';

@Resolver(() => AdminTournament)
@RequirePermission('tournaments.view')
export class AdminTournamentsResolver {
  constructor(private readonly service: AdminTournamentsService) {}

  @Query(() => PaginatedAdminTournaments, {
    name: 'adminListTournaments',
    description: 'List tournaments with sport / status / visibility / city / date filters.',
  })
  list(
    @Args('input', { type: () => ListAdminTournamentsInput, nullable: true })
    input?: ListAdminTournamentsInput,
  ): Promise<PaginatedAdminTournaments> {
    return this.service.list(input ?? new ListAdminTournamentsInput());
  }

  @Query(() => AdminTournament, {
    name: 'adminTournamentDetail',
    description:
      'Full tournament detail — organizer, registrations, matches, and the payment summary.',
  })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminTournament> {
    return this.service.getOne(id);
  }

  @RequirePermission('tournaments.edit')
  @Mutation(() => AdminTournament, { name: 'adminApproveTournament' })
  approve(
    @Args('input') input: ApproveTournamentInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.approve(input, actor);
  }

  @RequirePermission('tournaments.cancel')
  @Mutation(() => AdminTournament, { name: 'adminSuspendTournament' })
  suspend(
    @Args('input') input: SuspendTournamentInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.suspend(input, actor);
  }

  @RequirePermission('tournaments.cancel')
  @Mutation(() => AdminTournament, { name: 'adminCancelTournament' })
  cancel(
    @Args('input') input: CancelTournamentInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.cancel(input, actor);
  }

  @RequirePermission('tournaments.edit')
  @Mutation(() => AdminTournament, { name: 'adminUpdateTournamentVisibility' })
  updateVisibility(
    @Args('input') input: UpdateTournamentVisibilityInput,
  ): Promise<AdminTournament> {
    return this.service.updateVisibility(input);
  }

  @RequirePermission('tournaments.edit')
  @Mutation(() => AdminTournament, {
    name: 'adminUpdateTournamentStatus',
    description: 'Generic status setter. Requires a reason when moving to SUSPENDED / CANCELLED.',
  })
  updateStatus(
    @Args('input') input: UpdateTournamentStatusInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.updateStatus(input, actor);
  }
}
