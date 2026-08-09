import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '../../../common/dto/pagination.input';

// Side-effect import to register shared GraphQL enums (ExpenseCategory, PaymentProvider…).
import '../../../common/enums';

@ObjectType({ description: 'Loyalty free games redeemed and the play value forgone.' })
export class FreeGameStat {
  @Field(() => Int) count!: number;
  @Field(() => Float) forgoneValue!: number;
}

@ObjectType({
  description:
    "A venue's money picture for a period: income received across every rail, what was given away, expenses, and the resulting net profit.",
})
export class FinanceSummary {
  @Field(() => Float, { description: 'Total money received = bookings + memberships.' })
  income!: number;
  @Field(() => Float) bookingIncome!: number;
  @Field(() => Float) membershipIncome!: number;
  @Field(() => Float, { description: 'Add-on revenue (already counted inside bookingIncome).' })
  addOnRevenue!: number;

  @Field(() => Float) cashIncome!: number;
  @Field(() => Float) digitalIncome!: number;

  @Field(() => Float, {
    description: 'Promo/loyalty discounts given (informational, not re-deducted).',
  })
  discountsGiven!: number;
  @Field(() => FreeGameStat) freeGames!: FreeGameStat;

  @Field(() => Float, {
    description: 'Billed for the period = collected + outstanding. Already net of discounts.',
  })
  revenue!: number;
  @Field(() => Float, {
    description: 'List price before discounts. gross − discountsGiven = revenue.',
  })
  grossRevenue!: number;

  @Field(() => Float) expensesTotal!: number;
  @Field(() => [ExpenseCategoryTotal], { description: 'Expense split, biggest first.' })
  expensesByCategory!: ExpenseCategoryTotal[];
  @Field(() => Float, { description: 'income − expenses.' }) netProfit!: number;

  @Field(() => Float, { description: 'Billed but not yet collected (receivables).' })
  outstanding!: number;
  @Field(() => Int, { description: 'Non-cancelled bookings in the period.' })
  bookingsCount!: number;

  @Field(() => Float, {
    description: 'Money taken on bookings the customer never turned up for.',
  })
  paidNoShows!: number;
}

@ObjectType({ description: 'One expense category and what it cost in the period.' })
export class ExpenseCategoryTotal {
  @Field(() => String) category!: string;
  @Field(() => Float) amount!: number;
  @Field(() => Int) count!: number;
}

@ObjectType()
export class FinanceTrendPoint {
  @Field({ description: 'Bucket start, "yyyy-mm-dd".' }) date!: string;
  @Field({ description: 'Human label for the bucket, e.g. "7 Aug" or "Aug 2026".' })
  label!: string;
  @Field(() => Float) income!: number;
  @Field(() => Float) expenses!: number;
  @Field(() => Float, { description: 'income − expenses for this bucket.' }) profit!: number;
  @Field(() => Int) bookings!: number;
}

@ObjectType({ description: 'One money movement in the venue ledger.' })
export class TransactionRow {
  @Field(() => ID) id!: string;
  @Field(() => String, { description: 'BOOKING_PAYMENT | MEMBERSHIP_PAYMENT | EXPENSE.' })
  kind!: string;
  @Field() occurredAt!: Date;
  @Field({ description: 'What it was — customer, plan or expense description.' })
  description!: string;
  @Field({ nullable: true, description: 'Court, plan or vendor.' }) counterparty?: string;
  @Field({ nullable: true }) method?: string;
  @Field({ nullable: true, description: 'Expense category, when it is one.' }) category?: string;
  @Field(() => Float, { description: 'Positive = money in, negative = money out.' })
  amount!: number;
  @Field({ nullable: true, description: 'Booking id, for linking back.' }) reference?: string;
}

@ObjectType({ description: 'Totals across every row matching the filter — not just this page.' })
export class TransactionTotals {
  @Field(() => Float) moneyIn!: number;
  @Field(() => Float) moneyOut!: number;
  @Field(() => Float, { description: 'moneyIn − moneyOut.' }) net!: number;
  @Field(() => Int) count!: number;
}

@ObjectType()
export class PaginatedTransactions {
  @Field(() => [TransactionRow]) items!: TransactionRow[];
  @Field(() => TransactionTotals) totals!: TransactionTotals;
  @Field(() => PageInfo) pageInfo!: PageInfo;
}

@ObjectType({ description: 'A booking with money still owed on it.' })
export class ReceivableRow {
  @Field(() => ID) bookingId!: string;
  @Field() customerName!: string;
  @Field({ nullable: true }) customerPhone?: string;
  @Field({ nullable: true }) courtName?: string;
  @Field() startAt!: Date;
  @Field(() => Float) total!: number;
  @Field(() => Float) amountPaid!: number;
  @Field(() => Float) outstanding!: number;
}

@ObjectType()
export class CourtRevenue {
  @Field(() => ID) courtId!: string;
  @Field() courtName!: string;
  @Field({ nullable: true }) sport?: string;
  @Field(() => Int) bookings!: number;
  @Field(() => Float) revenue!: number;
}

@ObjectType()
export class SportRevenue {
  @Field() sport!: string;
  @Field(() => Int) bookings!: number;
  @Field(() => Float) revenue!: number;
}

@ObjectType({ description: 'Revenue + booking volume for one hour of the day (0–23, Nepal time).' })
export class PeakHourPoint {
  @Field(() => Int) hour!: number;
  @Field(() => Int) bookings!: number;
  @Field(() => Float) revenue!: number;
}

@ObjectType()
export class TopCustomer {
  @Field(() => ID, { nullable: true }) customerId?: string;
  @Field() name!: string;
  @Field(() => Int) bookings!: number;
  @Field(() => Float) spent!: number;
}

@ObjectType({ description: 'How busy and how valuable the venue was over the period.' })
export class FinancePerformance {
  @Field(() => Float, { description: 'Booked court-hours ÷ available court-hours, %.' })
  occupancyPct!: number;
  @Field(() => Float) bookedHours!: number;
  @Field(() => Float) capacityHours!: number;
  @Field(() => Float) avgBookingValue!: number;
  @Field(() => Float, { description: 'Share of period customers with more than one booking.' })
  repeatRatePct!: number;
  @Field(() => [CourtRevenue]) byCourt!: CourtRevenue[];
  @Field(() => [SportRevenue]) bySport!: SportRevenue[];
  @Field(() => [PeakHourPoint]) peakHours!: PeakHourPoint[];
  @Field(() => [TopCustomer]) topCustomers!: TopCustomer[];
}

@ObjectType({ description: 'Cost vs. revenue for a single offer over the period.' })
export class OfferRoi {
  @Field(() => ID) offerId!: string;
  @Field() title!: string;
  @Field({ nullable: true }) code?: string;
  @Field(() => Int) redemptions!: number;
  @Field(() => Float, { description: 'Discount + forgone free-game value given on this offer.' })
  givenAmount!: number;
  @Field(() => Float, { description: 'Total billed on bookings that used this offer.' })
  revenueDriven!: number;
}

@ObjectType()
export class OfferPerformance {
  @Field(() => [OfferRoi]) offers!: OfferRoi[];
  @Field(() => Int) freeGamesRedeemed!: number;
  @Field(() => Float) freeGamesForgoneValue!: number;
  @Field(() => Float) totalGiven!: number;
  @Field(() => Float) totalDriven!: number;
}

@ObjectType({
  description: 'Platform-held settlement balance owed to the venue (separate from its own books).',
})
export class PayoutSummary {
  @Field(() => Float) pendingPayout!: number;
  @Field(() => Float) onHold!: number;
  @Field(() => Float) paidOut!: number;
  @Field({ nullable: true }) lastPaidAt?: Date;
}

@ObjectType()
export class ExpenseModel {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;
  @Field() category!: string;
  @Field(() => Float) amount!: number;
  @Field() currency!: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) vendor?: string;
  @Field({ nullable: true }) paymentMethod?: string;
  @Field() incurredAt!: Date;
  @Field() createdAt!: Date;
}

@ObjectType()
export class CashReconciliationModel {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;
  @Field() businessDate!: Date;
  @Field(() => Float) openingFloat!: number;
  @Field(() => Float) expectedCash!: number;
  @Field(() => Float) countedCash!: number;
  @Field(() => Float) variance!: number;
  @Field({ nullable: true }) notes?: string;
  @Field() closedAt!: Date;
}

@ObjectType({
  description: 'What the desk should expect to count for a business day, with the breakdown.',
})
export class CashDayPreview {
  @Field() businessDate!: string;
  @Field(() => Float) openingFloat!: number;
  @Field(() => Float, { description: 'Cash collected (bookings + memberships) that day.' })
  cashIn!: number;
  @Field(() => Float, { description: 'Cash paid out (expenses) that day.' }) cashOut!: number;
  @Field(() => Float) expectedCash!: number;
  @Field() alreadyClosed!: boolean;
  @Field(() => CashReconciliationModel, { nullable: true })
  reconciliation?: CashReconciliationModel;
}
