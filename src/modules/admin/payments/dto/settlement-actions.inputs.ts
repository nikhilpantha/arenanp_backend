import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class MarkSettlementPaidInput {
  @Field(() => ID, {
    description:
      'Payment to settle. If no Settlement row exists yet, one is created with the current commission snapshot.',
  })
  @IsString()
  paymentId!: string;

  @Field({ nullable: true, description: 'Bank transfer reference / cheque number / etc.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  paymentReference?: string;

  @Field({ nullable: true, description: 'Internal note.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}
