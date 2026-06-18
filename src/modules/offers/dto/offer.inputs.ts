import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { OfferAudience, OfferDiscountType, OfferTrigger } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { PaginationInput } from '../../../common/dto/pagination.input';

import '../../../common/enums';

@InputType()
export class CreateOfferInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field() @IsString() @MaxLength(120) title!: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) description?: string;

  @Field(() => OfferDiscountType) @IsEnum(OfferDiscountType) discountType!: OfferDiscountType;
  @Field(() => Float) @IsNumber() @Min(0) discountValue!: number;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0) maxDiscount?: number;
  @Field(() => Float, { defaultValue: 0 }) @IsNumber() @Min(0) minSubtotal: number = 0;

  @Field(() => OfferTrigger, { nullable: true })
  @IsOptional()
  @IsEnum(OfferTrigger)
  trigger?: OfferTrigger;

  @Field(() => OfferAudience, { nullable: true })
  @IsOptional()
  @IsEnum(OfferAudience)
  audience?: OfferAudience;

  @Field(() => Int, { nullable: true, description: 'For EVERY_NTH: free game every N games.' })
  @IsOptional()
  @IsInt()
  @Min(1)
  everyGames?: number;

  @Field({
    nullable: true,
    description: 'Promo code; stored upper-cased. Omit for an always-listed offer.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  code?: string;

  @Field() @Type(() => Date) @IsDate() validFrom!: Date;
  @Field() @Type(() => Date) @IsDate() validUntil!: Date;

  @Field(() => Int, { nullable: true, description: 'Total redemptions allowed; null = unlimited.' })
  @IsOptional()
  @IsInt()
  @Min(1)
  usageLimit?: number;
}

@InputType()
export class UpdateOfferInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() offerId!: string;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(120) title?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(500) description?: string;
  @Field(() => OfferDiscountType, { nullable: true })
  @IsOptional()
  @IsEnum(OfferDiscountType)
  discountType?: OfferDiscountType;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0) discountValue?: number;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0) maxDiscount?: number;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsNumber() @Min(0) minSubtotal?: number;
  @Field(() => OfferTrigger, { nullable: true })
  @IsOptional()
  @IsEnum(OfferTrigger)
  trigger?: OfferTrigger;
  @Field(() => OfferAudience, { nullable: true })
  @IsOptional()
  @IsEnum(OfferAudience)
  audience?: OfferAudience;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() @Min(1) everyGames?: number;
  @Field({ nullable: true }) @IsOptional() @Type(() => Date) @IsDate() validFrom?: Date;
  @Field({ nullable: true }) @IsOptional() @Type(() => Date) @IsDate() validUntil?: Date;
  @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() @Min(0) usageLimit?: number;
  @Field({ nullable: true }) @IsOptional() @IsBoolean() isActive?: boolean;
}

@InputType({
  description: 'A loyalty subject: pass exactly one of customerId / userId / phone.',
})
export class LoyaltyStatusInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID, { nullable: true }) @IsOptional() @IsString() customerId?: string;
  @Field(() => ID, { nullable: true }) @IsOptional() @IsString() userId?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(20) phone?: string;
}

@InputType()
export class ListVenueOffersInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field(() => ID) @IsString() venueId!: string;

  @Field({ nullable: true, description: 'Only currently-active + in-window offers.' })
  @IsOptional()
  @IsBoolean()
  activeOnly?: boolean;
}
