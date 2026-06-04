import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminRefundsService } from './admin-refunds.service';
import { AdminRefundRequest } from './dto/admin-refund.model';
import { ListAdminRefundsInput } from './dto/list-admin-refunds.input';
import { PaginatedAdminRefunds } from './dto/paginated-admin-refunds';
import {
  ApproveRefundInput,
  MarkRefundProcessedInput,
  RejectRefundInput,
} from './dto/refund-action.inputs';

@Resolver(() => AdminRefundRequest)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminRefundsResolver {
  constructor(private readonly service: AdminRefundsService) {}

  @Query(() => PaginatedAdminRefunds, {
    name: 'adminListRefundRequests',
    description: 'List refund requests with optional status / search filters.',
  })
  list(
    @Args('input', { type: () => ListAdminRefundsInput, nullable: true })
    input?: ListAdminRefundsInput,
  ): Promise<PaginatedAdminRefunds> {
    return this.service.list(input ?? new ListAdminRefundsInput());
  }

  @Query(() => AdminRefundRequest, {
    name: 'adminRefundRequestDetail',
    description: 'Single refund request — full booking + payment context.',
  })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminRefundRequest> {
    return this.service.getOne(id);
  }

  @Mutation(() => AdminRefundRequest, { name: 'adminApproveRefund' })
  approve(
    @Args('input') input: ApproveRefundInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminRefundRequest> {
    return this.service.approve(input, actor);
  }

  @Mutation(() => AdminRefundRequest, { name: 'adminRejectRefund' })
  reject(
    @Args('input') input: RejectRefundInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminRefundRequest> {
    return this.service.reject(input, actor);
  }

  @Mutation(() => AdminRefundRequest, {
    name: 'adminMarkRefundProcessed',
    description:
      'After the bank-side refund clears: flips RefundRequest -> PROCESSED, Payment -> REFUNDED / PARTIALLY_REFUNDED, and freezes any unsettled Settlement.',
  })
  markProcessed(
    @Args('input') input: MarkRefundProcessedInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminRefundRequest> {
    return this.service.markProcessed(input, actor);
  }
}
