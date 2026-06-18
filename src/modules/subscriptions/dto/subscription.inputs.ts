import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { MembershipDuration, PaymentProvider, SubscriptionStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { PaginationInput } from '../../../common/dto/pagination.input';
import '../../../common/enums';

@InputType()
export class ListMembershipPlansInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field({ nullable: true, description: 'Only plans that are currently active.' })
  @IsOptional()
  @IsBoolean()
  activeOnly?: boolean;
}

@InputType()
export class CreateMembershipPlanInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field() @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) description?: string;
  @Field(() => Float) @IsNumber() @Min(1) price!: number;
  @Field(() => MembershipDuration) @IsEnum(MembershipDuration) duration!: MembershipDuration;

  @Field(() => Int, { nullable: true, description: 'Override the validity window (days).' })
  @IsOptional()
  @IsInt()
  @Min(1)
  validityDays?: number;

  @Field(() => Int, { description: 'Session length in minutes (e.g. 60).' })
  @IsInt()
  @Min(15)
  @Max(1440)
  sessionMinutes!: number;

  @Field(() => [String], { description: 'Allowed bands as "HH:mm-HH:mm" (at least one).' })
  @IsArray()
  @IsString({ each: true })
  windows!: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  daysOfWeek?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sports?: string[];

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(40) highlight?: string;
}

@InputType()
export class UpdateMembershipPlanInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() planId!: string;

  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(2) @MaxLength(120) name?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) description?: string;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(1) price?: number;
  @Field(() => MembershipDuration, { nullable: true })
  @IsOptional()
  @IsEnum(MembershipDuration)
  duration?: MembershipDuration;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() @Min(1) validityDays?: number;
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(15)
  @Max(1440)
  sessionMinutes?: number;
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  windows?: string[];
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  daysOfWeek?: string[];
  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sports?: string[];
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(40) highlight?: string;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() isActive?: boolean;
}

@InputType()
export class ListSubscriptionsInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => SubscriptionStatus, {
    nullable: true,
    description: 'Filter by status. Omit to list everything except CANCELLED.',
  })
  @IsOptional()
  @IsEnum(SubscriptionStatus)
  status?: SubscriptionStatus;

  @Field(() => ID, { nullable: true, description: 'Only members on this membership plan.' })
  @IsOptional()
  @IsString()
  planId?: string;

  @Field({ nullable: true, description: 'Case-insensitive customer name / phone search.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => PaginationInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => PaginationInput)
  pagination?: PaginationInput;
}

@InputType()
export class CreateSubscriptionInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() customerId!: string;
  @Field(() => ID) @IsString() planId!: string;
  @Field(() => ID, { description: 'Court the recurring slot reserves.' })
  @IsString()
  courtId!: string;

  @Field({ description: 'Chosen daily start time ("HH:mm"); must fit a plan band.' })
  @IsString()
  slotStart!: string;

  @Field({ description: 'Subscription start date (ISO); expiry = start + plan validity.' })
  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @Field(() => Float, { nullable: true, description: 'Amount collected now; defaults to price.' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amountPaid?: number;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;
}

@InputType()
export class RenewSubscriptionInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() subscriptionId!: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  amountPaid?: number;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentMethod?: PaymentProvider;
}

@InputType()
export class SetSubscriptionStatusInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() subscriptionId!: string;
  @Field(() => SubscriptionStatus) @IsEnum(SubscriptionStatus) status!: SubscriptionStatus;
}
