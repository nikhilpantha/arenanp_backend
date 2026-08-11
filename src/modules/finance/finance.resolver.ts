import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequireVenuePermission } from '../../common/decorators/venue-permission.decorator';
import { VenuePermissionGuard } from '../../common/guards/venue-permission.guard';
import type { AuthUser } from '../../common/types/auth-context';

import { FinanceService, mapExpense } from './finance.service';
import { SalaryService } from './salary.service';
import { VenueSalaryPeriod } from './dto/salary.models';
import {
  CashDayInput,
  CloseCashDayInput,
  CreateExpenseInput,
  FinanceRangeInput,
  FinanceTrendInput,
  ListExpensesInput,
  ListTransactionsInput,
  UpdateExpenseInput,
  VenueSalariesInput,
  RecordStaffSalaryPaymentInput,
  SetStaffPayTermsInput,
} from './dto/finance.inputs';
import {
  CashDayPreview,
  CashReconciliationModel,
  ExpenseModel,
  FinancePerformance,
  FinanceSummary,
  FinanceTrendPoint,
  OfferPerformance,
  PaginatedTransactions,
  PayoutSummary,
  ReceivableRow,
} from './dto/finance.models';

/**
 * Venue-owner finance surface. Every handler is venue-scoped (the guard reads
 * `venueId` / `input.venueId`); reads need `finance:read`, writes `finance:write`.
 */
@Resolver()
@UseGuards(VenuePermissionGuard)
export class FinanceResolver {
  constructor(
    private readonly service: FinanceService,
    private readonly salaries: SalaryService,
  ) {}

  // ─── Reads ─────────────────────────────────────────────────────────────────

  @Query(() => FinanceSummary, {
    name: 'venueFinanceSummary',
    description: 'Income, give-aways, expenses and net profit for a venue over a period.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueFinanceSummary(@Args('input') input: FinanceRangeInput): Promise<FinanceSummary> {
    return this.service.summary(input);
  }

  @Query(() => [FinanceTrendPoint], {
    name: 'venueFinanceTrend',
    description:
      'Income, expenses, profit and booking volume as a gap-filled series. Bucket width follows `granularity`, or the range length when omitted.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueFinanceTrend(@Args('input') input: FinanceTrendInput): Promise<FinanceTrendPoint[]> {
    return this.service.trend(input);
  }

  @Query(() => PaginatedTransactions, {
    name: 'venueTransactions',
    description:
      'Every money movement — booking payments, membership payments and expenses — searchable, filterable, sortable and paged. Totals cover the whole filtered set, not the page.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueTransactions(@Args('input') input: ListTransactionsInput): Promise<PaginatedTransactions> {
    return this.service.transactions(input);
  }

  @Query(() => [ReceivableRow], {
    name: 'venueReceivables',
    description: 'Bookings with money still owed, largest first — the list behind `outstanding`.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueReceivables(@Args('input') input: FinanceRangeInput): Promise<ReceivableRow[]> {
    return this.service.receivables(input);
  }

  @Query(() => FinancePerformance, {
    name: 'venueFinancePerformance',
    description: 'Occupancy, revenue by court / sport, peak hours and top customers.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueFinancePerformance(@Args('input') input: FinanceRangeInput): Promise<FinancePerformance> {
    return this.service.performance(input);
  }

  @Query(() => OfferPerformance, {
    name: 'venueOfferPerformance',
    description: 'Per-offer cost vs. revenue driven, plus loyalty free-game give-away.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueOfferPerformance(@Args('input') input: FinanceRangeInput): Promise<OfferPerformance> {
    return this.service.offerPerformance(input);
  }

  @Query(() => PayoutSummary, {
    name: 'venuePayoutSummary',
    description: 'Platform-held settlement balance owed to the venue.',
  })
  @RequireVenuePermission('venue.finance.view')
  venuePayoutSummary(@Args('venueId', { type: () => ID }) venueId: string): Promise<PayoutSummary> {
    return this.service.payoutSummary(venueId);
  }

  @Query(() => [ExpenseModel], {
    name: 'venueExpenses',
    description: 'Expenses for a venue over a period.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueExpenses(@Args('input') input: ListExpensesInput): Promise<ExpenseModel[]> {
    return this.service.listExpenses(input);
  }

  @Query(() => CashDayPreview, {
    name: 'venueCashDayPreview',
    description: 'Expected cash to count for a business day, with the cash-in/out breakdown.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueCashDayPreview(@Args('input') input: CashDayInput): Promise<CashDayPreview> {
    return this.service.cashDayPreview(input);
  }

  @Query(() => [CashReconciliationModel], {
    name: 'venueCashReconciliations',
    description: 'Closed cash days for a venue over a period.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueCashReconciliations(
    @Args('input') input: FinanceRangeInput,
  ): Promise<CashReconciliationModel[]> {
    return this.service.listReconciliations(input);
  }

  // ─── Writes ────────────────────────────────────────────────────────────────

  @Mutation(() => ExpenseModel, {
    name: 'createVenueExpense',
    description: 'Record an operating expense.',
  })
  @RequireVenuePermission('venue.finance.manage')
  createVenueExpense(
    @Args('input') input: CreateExpenseInput,
    @CurrentUser() user: AuthUser,
  ): Promise<ExpenseModel> {
    return this.service.createExpense(input, user.id);
  }

  @Mutation(() => ExpenseModel, {
    name: 'updateVenueExpense',
    description: 'Edit an operating expense.',
  })
  @RequireVenuePermission('venue.finance.manage')
  updateVenueExpense(@Args('input') input: UpdateExpenseInput): Promise<ExpenseModel> {
    return this.service.updateExpense(input);
  }

  @Mutation(() => ExpenseModel, {
    name: 'deleteVenueExpense',
    description: 'Delete an operating expense.',
  })
  @RequireVenuePermission('venue.finance.manage')
  deleteVenueExpense(
    @Args('venueId', { type: () => ID }) venueId: string,
    @Args('expenseId', { type: () => ID }) expenseId: string,
  ): Promise<ExpenseModel> {
    return this.service.deleteExpense(venueId, expenseId);
  }

  // ─── Staff salary ──────────────────────────────────────────────────────────

  @Query(() => VenueSalaryPeriod, {
    name: 'venueSalaries',
    description:
      'Who is owed what for a pay period, and what has been paid. Daily and per-session staff report a null `due` until a count is entered — the system does not record attendance and will not pretend to.',
  })
  @RequireVenuePermission('venue.finance.view')
  venueSalaries(@Args('input') input: VenueSalariesInput): Promise<VenueSalaryPeriod> {
    return this.salaries.period(input);
  }

  @Mutation(() => ExpenseModel, {
    name: 'recordStaffSalaryPayment',
    description:
      'Record a salary payment. Writes an expense, so it lands in net profit, the ledger, the category breakdown and the cash-day close with no further work.',
  })
  @RequireVenuePermission('venue.finance.manage')
  async recordStaffSalaryPayment(
    @Args('input') input: RecordStaffSalaryPaymentInput,
    @CurrentUser() user: AuthUser,
  ): Promise<ExpenseModel> {
    return mapExpense(await this.salaries.recordPayment(input, user.id));
  }

  @Mutation(() => Boolean, {
    name: 'setStaffPayTerms',
    description: 'Set or clear what a staff member is paid, and on what basis.',
  })
  @RequireVenuePermission('venue.staff.manage')
  async setStaffPayTerms(@Args('input') input: SetStaffPayTermsInput): Promise<boolean> {
    await this.salaries.setPayTerms(
      input.venueId,
      input.membershipId,
      input.basis ?? null,
      input.rate ?? null,
    );
    return true;
  }

  @Mutation(() => CashReconciliationModel, {
    name: 'closeVenueCashDay',
    description: 'Close a business day: snapshot expected cash and record the physical count.',
  })
  @RequireVenuePermission('venue.finance.manage')
  closeVenueCashDay(
    @Args('input') input: CloseCashDayInput,
    @CurrentUser() user: AuthUser,
  ): Promise<CashReconciliationModel> {
    return this.service.closeCashDay(input, user.id);
  }
}
