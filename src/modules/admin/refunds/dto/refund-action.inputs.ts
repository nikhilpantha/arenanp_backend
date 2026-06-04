import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ApproveRefundInput {
  @Field(() => ID)
  @IsString()
  refundId!: string;

  @Field({ nullable: true, description: 'Optional internal note.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  adminNotes?: string;
}

@InputType()
export class RejectRefundInput {
  @Field(() => ID)
  @IsString()
  refundId!: string;

  @Field({ description: 'Reason shown to the customer.' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

@InputType()
export class MarkRefundProcessedInput {
  @Field(() => ID)
  @IsString()
  refundId!: string;

  @Field({ nullable: true, description: 'Bank transfer / provider refund reference.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  processorReference?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  adminNotes?: string;
}
