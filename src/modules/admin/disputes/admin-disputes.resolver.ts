import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { RequirePermission } from '../../../common/decorators/require-permission.decorator';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminDisputesService } from './admin-disputes.service';
import { AdminDispute } from './dto/admin-dispute.model';
import { ListAdminDisputesInput } from './dto/list-admin-disputes.input';
import { PaginatedAdminDisputes } from './dto/paginated-admin-disputes';
import {
  CreateAdminNoteOnDisputeInput,
  UpdateDisputeStatusInput,
} from './dto/dispute-action.inputs';

@Resolver(() => AdminDispute)
@RequirePermission('disputes.view')
export class AdminDisputesResolver {
  constructor(private readonly service: AdminDisputesService) {}

  @Query(() => PaginatedAdminDisputes, {
    name: 'adminListDisputes',
    description: 'List customer disputes with status / category / search filters.',
  })
  list(
    @Args('input', { type: () => ListAdminDisputesInput, nullable: true })
    input?: ListAdminDisputesInput,
  ): Promise<PaginatedAdminDisputes> {
    return this.service.list(input ?? new ListAdminDisputesInput());
  }

  @Query(() => AdminDispute, {
    name: 'adminDisputeDetail',
    description: 'Single dispute with booking context + the full admin-notes thread.',
  })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminDispute> {
    return this.service.getOne(id);
  }

  @RequirePermission('disputes.resolve')
  @Mutation(() => AdminDispute, {
    name: 'adminCreateAdminNoteOnDispute',
    description: 'Append an admin note to a dispute.',
  })
  addNote(
    @Args('input') input: CreateAdminNoteOnDisputeInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminDispute> {
    return this.service.addNote(input, actor);
  }

  @RequirePermission('disputes.resolve')
  @Mutation(() => AdminDispute, {
    name: 'adminUpdateDisputeStatus',
    description:
      'Transition a dispute. RESOLVED requires a resolution; closed disputes (RESOLVED / REJECTED) cannot be reopened.',
  })
  updateStatus(
    @Args('input') input: UpdateDisputeStatusInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminDispute> {
    return this.service.updateStatus(input, actor);
  }
}
