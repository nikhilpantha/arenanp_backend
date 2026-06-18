import { Field, Float, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { BookingPaymentStatus, BookingStatus, CustomerType, PaymentProvider } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import '../../../common/enums';

/** Time window for the bookings list. */
export enum BookingScope {
  TODAY = 'TODAY',
  UPCOMING = 'UPCOMING',
}
registerEnumType(BookingScope, {
  name: 'BookingScope',
  description: 'Bookings time window: TODAY or UPCOMING.',
});

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

@InputType()
export class ListVenueBookingsInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field(() => BookingScope, { nullable: true })
  @IsOptional()
  @IsEnum(BookingScope)
  scope?: BookingScope;

  @Field({ nullable: true, description: 'Specific day (yyyy-mm-dd). Overrides scope when set.' })
  @IsOptional()
  @Matches(DATE_RE, { message: 'date must be yyyy-mm-dd' })
  date?: string;

  @Field({ nullable: true, description: 'Filter by sport slug.' })
  @IsOptional()
  @IsString()
  sportSlug?: string;
}

@InputType()
export class CreateVenueBookingInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() courtId!: string;

  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  customerName!: string;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(20) customerPhone?: string;

  @Field(() => CustomerType, { defaultValue: CustomerType.INDIVIDUAL })
  @IsEnum(CustomerType)
  customerType: CustomerType = CustomerType.INDIVIDUAL;

  @Field(() => ID, { nullable: true, description: 'The venue customer this booking is for.' })
  @IsOptional()
  @IsString()
  customerId?: string;

  @Field({ description: 'Start time (ISO 8601).' })
  @IsString()
  startAt!: string;

  @Field(() => Int, { defaultValue: 60 })
  @IsInt()
  @Min(15)
  durationMinutes: number = 60;

  @Field(() => BookingPaymentStatus, { defaultValue: BookingPaymentStatus.PENDING })
  @IsEnum(BookingPaymentStatus)
  paymentStatus: BookingPaymentStatus = BookingPaymentStatus.PENDING;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amountPaid?: number;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountAmount?: number;

  // Must carry a class-validator decorator — the global ValidationPipe runs with
  // forbidNonWhitelisted, which rejects any property lacking one ("property freeGame
  // should not exist"). GraphQL's defaultValue means it's always present in the args.
  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  freeGame: boolean = false;

  // Redeem the subject's earned loyalty free game (validated server-side against
  // their completed-game tally). Distinct from `freeGame`, which is a manual comp.
  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  redeemFreeGame: boolean = false;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) notes?: string;
}

/** Edit a pending/upcoming booking: reschedule (court/time/duration) and/or the customer. */
@InputType()
export class UpdateVenueBookingInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() bookingId!: string;

  @Field(() => ID, { nullable: true }) @IsOptional() @IsString() courtId?: string;
  @Field({ nullable: true, description: 'New start time (ISO 8601).' })
  @IsOptional()
  @IsString()
  startAt?: string;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() @Min(15) durationMinutes?: number;

  @Field(() => ID, { nullable: true }) @IsOptional() @IsString() customerId?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  customerName?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(20) customerPhone?: string;
}

/** One add-on line item charged when completing a booking. */
@InputType()
export class BookingExtraInput {
  @Field() @IsString() @MinLength(1) @MaxLength(120) name!: string;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber()
  @Min(0)
  price: number = 0;
}

/** Complete a booking: attach the extras the customer used and settle payment. */
@InputType()
export class CompleteVenueBookingInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() bookingId!: string;

  @Field(() => [BookingExtraInput], { defaultValue: [] })
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => BookingExtraInput)
  extras: BookingExtraInput[] = [];

  @Field(() => BookingPaymentStatus, { defaultValue: BookingPaymentStatus.PAID })
  @IsEnum(BookingPaymentStatus)
  paymentStatus: BookingPaymentStatus = BookingPaymentStatus.PAID;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amountPaid?: number;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) note?: string;
}

/** Venue-side status transitions (the manage actions). */
export enum BookingStatusAction {
  CHECKED_IN = 'CHECKED_IN',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED',
}
registerEnumType(BookingStatusAction, {
  name: 'BookingStatusAction',
  description: 'Venue manage actions: CHECKED_IN, COMPLETED, NO_SHOW, CANCELLED.',
});

@InputType()
export class SetBookingStatusInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() bookingId!: string;
  @Field(() => BookingStatusAction) @IsEnum(BookingStatusAction) status!: BookingStatusAction;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) note?: string;
}

@InputType()
export class RecordBookingPaymentInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() bookingId!: string;
  @Field(() => BookingPaymentStatus)
  @IsEnum(BookingPaymentStatus)
  paymentStatus!: BookingPaymentStatus;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber()
  @Min(0)
  amountPaid: number = 0;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;
}

/** The terminal/lifecycle BookingStatus a status action maps to. */
export const ACTION_TO_STATUS: Record<BookingStatusAction, BookingStatus> = {
  [BookingStatusAction.CHECKED_IN]: BookingStatus.CHECKED_IN,
  [BookingStatusAction.COMPLETED]: BookingStatus.COMPLETED,
  [BookingStatusAction.NO_SHOW]: BookingStatus.NO_SHOW,
  [BookingStatusAction.CANCELLED]: BookingStatus.CANCELLED,
};
