import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { PaymentProvider } from '@prisma/client';
import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Partial update — only fields that the admin actually changed should be sent.
 * The service merges these onto the singleton row.
 */
@InputType()
export class UpdatePlatformSettingsInput {
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  platformCommissionPercentage?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(180)
  slotLockDurationMinutes?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(720)
  cancellationWindowHours?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(4000)
  refundPolicyText?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bookingServiceFee?: number;

  @Field(() => [PaymentProvider], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsEnum(PaymentProvider, { each: true })
  paymentProvidersEnabled?: PaymentProvider[];

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  supportContactNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(120)
  supportEmail?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  defaultCity?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  maintenanceMode?: boolean;
}
