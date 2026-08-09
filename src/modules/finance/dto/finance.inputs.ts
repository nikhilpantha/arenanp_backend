import { Field, Float, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { ExpenseCategory, PayBasis, PaymentProvider } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/** Rolling reporting window ending today (or a custom from/to pair). */
export enum FinanceRangePreset {
  TODAY = 'TODAY',
  TOMORROW = 'TOMORROW',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
  ALL = 'ALL',
}
registerEnumType(FinanceRangePreset, {
  name: 'FinanceRangePreset',
  description:
    "Finance window: TODAY, TOMORROW (money expected on tomorrow's bookings), WEEK (7d), MONTH (30d), YEAR, or ALL (from the venue's first activity).",
});

/**
 * Bucket width for the trend series. A year of DAY buckets is 365 points nobody
 * can read, so callers may roll up — or omit this and let the range pick.
 */
export enum TrendGranularity {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}
registerEnumType(TrendGranularity, {
  name: 'TrendGranularity',
  description: 'Trend bucket width. Omit to auto-pick from the range length.',
});

/** What a transaction row represents. */
export enum TransactionKind {
  BOOKING_PAYMENT = 'BOOKING_PAYMENT',
  MEMBERSHIP_PAYMENT = 'MEMBERSHIP_PAYMENT',
  EXPENSE = 'EXPENSE',
}
registerEnumType(TransactionKind, {
  name: 'TransactionKind',
  description: 'Money-movement type in the venue transaction ledger.',
});

export enum TransactionSort {
  DATE_DESC = 'DATE_DESC',
  DATE_ASC = 'DATE_ASC',
  AMOUNT_DESC = 'AMOUNT_DESC',
  AMOUNT_ASC = 'AMOUNT_ASC',
}
registerEnumType(TransactionSort, { name: 'TransactionSort' });

/** Shared range fields — a preset, or explicit "yyyy-mm-dd" from/to that override it. */
@InputType()
export class FinanceRangeInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field(() => FinanceRangePreset, { nullable: true, defaultValue: FinanceRangePreset.MONTH })
  @IsOptional()
  @IsEnum(FinanceRangePreset)
  preset?: FinanceRangePreset;

  @Field({
    nullable: true,
    description: 'Custom start "yyyy-mm-dd" (inclusive); needs `to` to apply.',
  })
  @IsOptional()
  @IsString()
  from?: string;

  @Field({ nullable: true, description: 'Custom end "yyyy-mm-dd" (inclusive).' })
  @IsOptional()
  @IsString()
  to?: string;
}

@InputType()
export class FinanceTrendInput extends FinanceRangeInput {
  @Field(() => TrendGranularity, { nullable: true })
  @IsOptional()
  @IsEnum(TrendGranularity)
  granularity?: TrendGranularity;
}

/** The transaction ledger: one filtered, sorted, paged view over every money movement. */
@InputType()
export class ListTransactionsInput extends FinanceRangeInput {
  @Field({
    nullable: true,
    description: 'Matches customer, vendor, note, category or court.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => [TransactionKind], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsEnum(TransactionKind, { each: true })
  kinds?: TransactionKind[];

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  method?: PaymentProvider;

  @Field(() => ExpenseCategory, { nullable: true })
  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;

  @Field(() => TransactionSort, { nullable: true, defaultValue: TransactionSort.DATE_DESC })
  @IsOptional()
  @IsEnum(TransactionSort)
  sort?: TransactionSort;

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @Field(() => Int, { nullable: true, defaultValue: 25 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  pageSize?: number;
}

@InputType()
export class ListExpensesInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field(() => FinanceRangePreset, { nullable: true, defaultValue: FinanceRangePreset.MONTH })
  @IsOptional()
  @IsEnum(FinanceRangePreset)
  preset?: FinanceRangePreset;

  @Field({ nullable: true }) @IsOptional() @IsString() from?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() to?: string;

  @Field(() => ExpenseCategory, { nullable: true })
  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;
}

@InputType()
export class CreateExpenseInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field(() => ExpenseCategory) @IsEnum(ExpenseCategory) category!: ExpenseCategory;
  @Field(() => Float) @IsNumber() @Min(0) amount!: number;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(300) description?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(120) vendor?: string;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;

  @Field({ description: 'Date the cost applies to (bucketed by day).' })
  @Type(() => Date)
  @IsDate()
  incurredAt!: Date;
}

@InputType()
export class UpdateExpenseInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() expenseId!: string;

  @Field(() => ExpenseCategory, { nullable: true })
  @IsOptional()
  @IsEnum(ExpenseCategory)
  category?: ExpenseCategory;

  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0) amount?: number;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(300) description?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(120) vendor?: string;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;

  @Field({ nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  incurredAt?: Date;
}

@InputType()
export class CashDayInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field({ nullable: true, description: 'Business day "yyyy-mm-dd"; defaults to today.' })
  @IsOptional()
  @IsString()
  date?: string;
}

@InputType()
export class CloseCashDayInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field({ description: 'Business day being closed, "yyyy-mm-dd".' })
  @IsString()
  businessDate!: string;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  openingFloat?: number;

  @Field(() => Float) @IsNumber() @Min(0) countedCash!: number;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(300) notes?: string;
}

// ─── Staff salary ────────────────────────────────────────────────────────────

@InputType()
export class VenueSalariesInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field({
    nullable: true,
    description:
      'Any date inside the pay period; snapped to the first of that month. Defaults to now.',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  periodStart?: Date;
}

@InputType()
export class RecordStaffSalaryPaymentInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;

  @Field({ description: 'Any date inside the period being settled; snapped to its month.' })
  @Type(() => Date)
  @IsDate()
  periodStart!: Date;

  @Field(() => Float, { description: 'What was handed over now. Part-payments are expected.' })
  @IsNumber()
  @Min(0)
  amount!: number;

  @Field({ nullable: true, description: 'When the money changed hands. Defaults to today.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  paidAt?: Date;

  @Field(() => Float, {
    nullable: true,
    description: 'Days worked or sessions run — the count the system cannot know on its own.',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  note?: string;
}

@InputType()
export class SetStaffPayTermsInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;

  @Field(() => PayBasis, { nullable: true, description: 'Null clears the pay terms entirely.' })
  @IsOptional()
  @IsEnum(PayBasis)
  basis?: PayBasis;

  @Field(() => Float, { nullable: true, description: 'Per month, per day or per session.' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  rate?: number;
}
