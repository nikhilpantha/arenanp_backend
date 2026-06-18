import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../common/dto/pagination.input';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

@InputType()
export class BrowseVenuesInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field({ nullable: true, description: 'Free-text search on venue name.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field({ nullable: true, description: 'Filter by sport slug.' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  sportSlug?: string;

  @Field({ nullable: true, description: 'Filter by city.' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;
}

@InputType()
export class CourtSlotsInput {
  @Field(() => ID) @IsString() courtId!: string;

  @Field({ description: 'Day to list slots for (yyyy-mm-dd, venue-local).' })
  @Matches(DATE_RE, { message: 'date must be yyyy-mm-dd' })
  date!: string;
}
