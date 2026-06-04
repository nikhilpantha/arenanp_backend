import { Field, ID, InputType } from '@nestjs/graphql';
import { VenueVerificationStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RejectVenueInput {
  @Field(() => ID)
  @IsString()
  venueId!: string;

  @Field({ description: 'User-visible explanation. Shown to the venue owner.' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

@InputType()
export class SuspendVenueInput {
  @Field(() => ID)
  @IsString()
  venueId!: string;

  @Field({ nullable: true, description: 'Optional reason. Shown to the venue owner.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}

@InputType()
export class UpdateVenueVerificationStatusInput {
  @Field(() => ID)
  @IsString()
  venueId!: string;

  @Field(() => VenueVerificationStatus)
  @IsEnum(VenueVerificationStatus)
  status!: VenueVerificationStatus;

  @Field({ nullable: true, description: 'Required when status is REJECTED.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
