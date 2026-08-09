import { Injectable, NotFoundException } from '@nestjs/common';
import { CashReconciliation, Expense, Prisma } from '@prisma/client';

import { dayBounds, resolveRange, type ResolvedRange } from '../../common/utils/nepal-time';
import { buildPageInfo } from '../../common/dto/pagination.input';

import { FinanceRepository, type TrendBucket } from './finance.repository';
import {
  CashDayInput,
  CloseCashDayInput,
  CreateExpenseInput,
  FinanceRangeInput,
  FinanceRangePreset,
  FinanceTrendInput,
  ListExpensesInput,
  ListTransactionsInput,
  TransactionSort,
  TrendGranularity,
  UpdateExpenseInput,
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
 * Bucket width for a trend. An explicit choice always wins; otherwise the range
 * picks one, because a year of daily points is 365 unreadable ticks and a single
 * week rolled up to months is one bar.
 */
function pickBucket(days: number, explicit?: TrendGranularity): TrendBucket {
  if (explicit === TrendGranularity.DAY) return 'day';
  if (explicit === TrendGranularity.WEEK) return 'week';
  if (explicit === TrendGranularity.MONTH) return 'month';
  if (days > 120) return 'month';
  if (days > 31) return 'week';
  return 'day';
}

const num = (v: Prisma.Decimal | number) => (typeof v === 'number' ? v : Number(v.toString()));

export function mapExpense(e: Expense): ExpenseModel {
  return {
    id: e.id,
    venueId: e.venueId,
    category: e.category,
    amount: num(e.amount),
    currency: e.currency,
    description: e.description ?? undefined,
    vendor: e.vendor ?? undefined,
    paymentMethod: e.paymentMethod ?? undefined,
    incurredAt: e.incurredAt,
    createdAt: e.createdAt,
  };
}

function mapReconciliation(r: CashReconciliation): CashReconciliationModel {
  return {
    id: r.id,
    venueId: r.venueId,
    businessDate: r.businessDate,
    openingFloat: num(r.openingFloat),
    expectedCash: num(r.expectedCash),
    countedCash: num(r.countedCash),
    variance: num(r.variance),
    notes: r.notes ?? undefined,
    closedAt: r.closedAt,
  };
}

/** "yyyy-mm-dd" (or undefined = today) → that day's UTC business window. */
function dayWindow(date?: string): { gte: Date; lt: Date } {
  return dayBounds(date ? new Date(`${date}T00:00:00.000Z`) : new Date());
}

@Injectable()
export class FinanceService {
  constructor(private readonly repo: FinanceRepository) {}

  /**
   * Resolve a request's window, including the two presets plain arithmetic can't
   * answer: TOMORROW (a forward day — money expected on advance bookings, since
   * bookings bucket by play date) and ALL (which has to ask the data where the
   * venue's history actually starts).
   */
  private async window(input: FinanceRangeInput): Promise<ResolvedRange> {
    if (input.from && input.to) return resolveRange(input);

    if (input.preset === FinanceRangePreset.TOMORROW) {
      const t = new Date();
      t.setUTCDate(t.getUTCDate() + 1);
      const { gte, lt } = dayBounds(t);
      return { gte, lt, days: 1 };
    }

    if (input.preset === FinanceRangePreset.ALL) {
      const first = await this.repo.firstActivityAt(input.venueId);
      const { lt } = dayBounds(new Date());
      // Nothing recorded yet — fall back to today so the screen renders zeros
      // rather than an empty range that would divide by zero downstream.
      const gte = first ? dayBounds(first).gte : dayBounds(new Date()).gte;
      const days = Math.max(1, Math.round((lt.getTime() - gte.getTime()) / 86_400_000));
      return { gte, lt, days };
    }

    return resolveRange(input);
  }

  async summary(input: FinanceRangeInput): Promise<FinanceSummary> {
    return this.repo.summary(input.venueId, await this.window(input));
  }

  async trend(input: FinanceTrendInput): Promise<FinanceTrendPoint[]> {
    const range = await this.window(input);
    return this.repo.trend(input.venueId, range, pickBucket(range.days, input.granularity));
  }

  async performance(input: FinanceRangeInput): Promise<FinancePerformance> {
    return this.repo.performance(input.venueId, await this.window(input));
  }

  async offerPerformance(input: FinanceRangeInput): Promise<OfferPerformance> {
    return this.repo.offerPerformance(input.venueId, await this.window(input));
  }

  async transactions(input: ListTransactionsInput): Promise<PaginatedTransactions> {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 25;
    const result = await this.repo.transactions({
      venueId: input.venueId,
      range: await this.window(input),
      search: input.search,
      kinds: input.kinds,
      method: input.method,
      category: input.category,
      sort: input.sort ?? TransactionSort.DATE_DESC,
      page,
      pageSize,
    });
    return {
      items: result.items,
      totals: result.totals,
      pageInfo: buildPageInfo(page, pageSize, result.total),
    };
  }

  async receivables(input: FinanceRangeInput): Promise<ReceivableRow[]> {
    return this.repo.receivables(input.venueId, await this.window(input));
  }

  payoutSummary(venueId: string): Promise<PayoutSummary> {
    return this.repo.payoutSummary(venueId);
  }

  // ─── Expenses ────────────────────────────────────────────────────────────────

  async listExpenses(input: ListExpensesInput): Promise<ExpenseModel[]> {
    const rows = await this.repo.listExpenses(input.venueId, resolveRange(input), input.category);
    return rows.map(mapExpense);
  }

  async createExpense(input: CreateExpenseInput, userId: string): Promise<ExpenseModel> {
    const row = await this.repo.createExpense({
      venueId: input.venueId,
      category: input.category,
      amount: input.amount,
      description: input.description,
      vendor: input.vendor,
      paymentMethod: input.paymentMethod,
      incurredAt: input.incurredAt,
      createdById: userId,
    });
    return mapExpense(row);
  }

  async updateExpense(input: UpdateExpenseInput): Promise<ExpenseModel> {
    try {
      const row = await this.repo.updateExpense(input.venueId, input.expenseId, {
        category: input.category,
        amount: input.amount,
        description: input.description,
        vendor: input.vendor,
        paymentMethod: input.paymentMethod,
        incurredAt: input.incurredAt,
      });
      return mapExpense(row);
    } catch {
      throw new NotFoundException('Expense not found.');
    }
  }

  async deleteExpense(venueId: string, expenseId: string): Promise<ExpenseModel> {
    try {
      return mapExpense(await this.repo.deleteExpense(venueId, expenseId));
    } catch {
      throw new NotFoundException('Expense not found.');
    }
  }

  // ─── Cash reconciliation ─────────────────────────────────────────────────────

  async cashDayPreview(input: CashDayInput): Promise<CashDayPreview> {
    const { gte, lt } = dayWindow(input.date);
    const businessDate = gte;
    const [flow, existing] = await Promise.all([
      this.repo.cashFlowForDay(input.venueId, gte, lt),
      this.repo.findReconciliation(input.venueId, businessDate),
    ]);
    const openingFloat = existing ? num(existing.openingFloat) : 0;
    return {
      businessDate: businessDate.toISOString().slice(0, 10),
      openingFloat,
      cashIn: flow.cashIn,
      cashOut: flow.cashOut,
      expectedCash: openingFloat + flow.cashIn - flow.cashOut,
      alreadyClosed: !!existing,
      reconciliation: existing ? mapReconciliation(existing) : undefined,
    };
  }

  async closeCashDay(input: CloseCashDayInput, userId: string): Promise<CashReconciliationModel> {
    const { gte, lt } = dayWindow(input.businessDate);
    const flow = await this.repo.cashFlowForDay(input.venueId, gte, lt);
    const openingFloat = input.openingFloat ?? 0;
    const expectedCash = openingFloat + flow.cashIn - flow.cashOut;
    const row = await this.repo.upsertReconciliation({
      venueId: input.venueId,
      businessDate: gte,
      openingFloat,
      expectedCash,
      countedCash: input.countedCash,
      variance: input.countedCash - expectedCash,
      notes: input.notes,
      closedById: userId,
    });
    return mapReconciliation(row);
  }

  async listReconciliations(input: FinanceRangeInput): Promise<CashReconciliationModel[]> {
    const rows = await this.repo.listReconciliations(input.venueId, resolveRange(input));
    return rows.map(mapReconciliation);
  }
}
