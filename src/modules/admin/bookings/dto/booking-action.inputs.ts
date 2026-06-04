import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CancelBookingByAdminInput {
  @Field(() => ID)
  @IsString()
  bookingId!: string;

  @Field({ description: 'Required reason. Shown to the booker on their booking timeline.' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

@InputType()
export class MarkBookingCompletedInput {
  @Field(() => ID)
  @IsString()
  bookingId!: string;

  @Field({ nullable: true, description: 'Optional internal note appended to the timeline event.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
