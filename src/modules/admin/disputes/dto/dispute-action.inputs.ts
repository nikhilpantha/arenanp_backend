import { Field, ID, InputType } from '@nestjs/graphql';
import { DisputeStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateAdminNoteOnDisputeInput {
  @Field(() => ID)
  @IsString()
  disputeId!: string;

  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  body!: string;
}

@InputType()
export class UpdateDisputeStatusInput {
  @Field(() => ID)
  @IsString()
  disputeId!: string;

  @Field(() => DisputeStatus)
  @IsEnum(DisputeStatus)
  status!: DisputeStatus;

  @Field({
    nullable: true,
    description: 'Required when transitioning to RESOLVED — shown on the dispute card.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  resolution?: string;
}
