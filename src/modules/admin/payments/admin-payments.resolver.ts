import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../common/guards/roles.guard';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminPaymentsService } from './admin-payments.service';
import { AdminPayment, PaymentsOverview } from './dto/admin-payment.model';
import { ListAdminPaymentsInput } from './dto/list-admin-payments.input';
import { PaginatedAdminPayments } from './dto/paginated-admin-payments';
import { MarkSettlementPaidInput } from './dto/settlement-actions.inputs';
import { SettlementExportRow } from './dto/settlement-export-row.model';

@Resolver(() => AdminPayment)
@UseGuards(RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminPaymentsResolver {
  constructor(private readonly service: AdminPaymentsService) {}

  @Query(() => PaginatedAdminPayments, {
    name: 'adminListPayments',
    description: 'List payments with provider / status / settlement / date filters.',
  })
  list(
    @Args('input', { type: () => ListAdminPaymentsInput, nullable: true })
    input?: ListAdminPaymentsInput,
  ): Promise<PaginatedAdminPayments> {
    return this.service.list(input ?? new ListAdminPaymentsInput());
  }

  @Query(() => AdminPayment, {
    name: 'adminPaymentDetail',
    description: 'Single payment with commission breakdown and settlement info.',
  })
  detail(@Args('id', { type: () => ID }) id: string): Promise<AdminPayment> {
    return this.service.getOne(id);
  }

  @Query(() => PaymentsOverview, {
    name: 'adminPaymentsOverview',
    description:
      'Aggregated totals (gross / commission / venue-owed / venue-settled / refunded) for the filter set.',
  })
  overview(
    @Args('input', { type: () => ListAdminPaymentsInput, nullable: true })
    input?: ListAdminPaymentsInput,
  ): Promise<PaymentsOverview> {
    return this.service.overview(input ?? new ListAdminPaymentsInput());
  }

  @Query(() => [SettlementExportRow], {
    name: 'adminSettlementsExport',
    description:
      'Returns every payment matching the filter set as a flat CSV-ready array. The frontend serialises to CSV.',
  })
  export(
    @Args('input', { type: () => ListAdminPaymentsInput, nullable: true })
    input?: ListAdminPaymentsInput,
  ): Promise<SettlementExportRow[]> {
    return this.service.exportSettlements(input ?? new ListAdminPaymentsInput());
  }

  @Mutation(() => AdminPayment, {
    name: 'adminMarkSettlementPaid',
    description:
      'Mark a payment’s settlement as PAID. Creates the Settlement row on first invocation, then flips it to PAID.',
  })
  markPaid(
    @Args('input') input: MarkSettlementPaidInput,
    @CurrentUser() actor: AuthUser,
  ): Promise<AdminPayment> {
    return this.service.markSettlementPaid(input, actor);
  }
}
