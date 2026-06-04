import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
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
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
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

  @Mutation(() => AdminTournament, { name: 'adminApproveTournament' })
  approve(
    @Args('input') input: ApproveTournamentInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.approve(input, actor);
  }

  @Mutation(() => AdminTournament, { name: 'adminSuspendTournament' })
  suspend(
    @Args('input') input: SuspendTournamentInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.suspend(input, actor);
  }

  @Mutation(() => AdminTournament, { name: 'adminCancelTournament' })
  cancel(
    @Args('input') input: CancelTournamentInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminTournament> {
    return this.service.cancel(input, actor);
  }

  @Mutation(() => AdminTournament, { name: 'adminUpdateTournamentVisibility' })
  updateVisibility(
    @Args('input') input: UpdateTournamentVisibilityInput,
  ): Promise<AdminTournament> {
    return this.service.updateVisibility(input);
  }

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
