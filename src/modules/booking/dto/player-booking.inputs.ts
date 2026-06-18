import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { PaginationInput } from '../../../common/dto/pagination.input';

@InputType()
export class CreateBookingInput {
  @Field(() => ID) @IsString() courtId!: string;

  @Field({ description: 'Slot start (ISO 8601).' })
  @IsString()
  startAt!: string;

  @Field(() => Int, { nullable: true, description: 'Defaults to the court slot length.' })
  @IsOptional()
  @IsInt()
  @Min(15)
  durationMinutes?: number;

  @Field({ nullable: true, description: 'Promo code to apply (venue offer).' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  offerCode?: string;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) notes?: string;
}

@InputType()
export class MyBookingsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;
}

@InputType()
export class CancelMyBookingInput {
  @Field(() => ID) @IsString() bookingId!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) reason?: string;
}

@InputType()
export class AcceptVenueBookingInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() bookingId!: string;
}

@InputType()
export class DeclineVenueBookingInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() bookingId!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) reason?: string;
}
