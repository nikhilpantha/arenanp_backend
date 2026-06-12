import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RejectVenueVerificationInput {
  @Field(() => ID)
  @IsString()
  requestId!: string;

  @Field({ description: 'User-visible explanation. Shown to the requester.' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

@InputType()
export class ApproveVenueVerificationInput {
  @Field(() => ID)
  @IsString()
  requestId!: string;

  @Field({ nullable: true, description: 'Optional internal note. Not surfaced to the requester.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
