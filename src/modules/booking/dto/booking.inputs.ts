import { Field, Float, ID, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { BookingPaymentStatus, BookingStatus, CustomerType, PaymentProvider } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
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

  @Field({ defaultValue: false })
  freeGame: boolean = false;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) notes?: string;
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
