import { Field, InputType } from '@nestjs/graphql';
import { BookingStatus, PaymentProvider } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListAdminBookingsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field({
    nullable: true,
    description: 'Match on user name, user phone, venue name or booking id.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field({ nullable: true, description: 'Venue id to scope by.' })
  @IsOptional()
  @IsString()
  venueId?: string;

  @Field({ nullable: true, description: 'Sport filter (matches the court sport).' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  sport?: string;

  @Field(() => BookingStatus, { nullable: true })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  paymentProvider?: PaymentProvider;

  @Field({ nullable: true, description: 'Inclusive start of the booking startAt range (ISO).' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @Field({ nullable: true, description: 'Exclusive end of the booking startAt range (ISO).' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
