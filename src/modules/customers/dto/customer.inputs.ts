import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

@InputType()
export class ListVenueCustomersInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field({ nullable: true, description: 'Case-insensitive name / phone search.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => Int, {
    nullable: true,
    description: 'Max rows to return (page size). Defaults to 20.',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @Field(() => Int, { nullable: true, description: 'Rows to skip (offset paging). Defaults to 0.' })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}

@InputType()
export class CreateVenueCustomerInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field() @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(20) phone?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) notes?: string;
}
