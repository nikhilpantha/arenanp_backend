import { Field, InputType } from '@nestjs/graphql';
import { PaymentProvider, PaymentStatus, SettlementStatus } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListAdminPaymentsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field({
    nullable: true,
    description: 'Match on payment id, provider txn id, customer name or venue name.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => PaymentProvider, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentProvider)
  provider?: PaymentProvider;

  @Field(() => PaymentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @Field(() => SettlementStatus, { nullable: true })
  @IsOptional()
  @IsEnum(SettlementStatus)
  settlementStatus?: SettlementStatus;

  @Field({ nullable: true, description: 'Scope to one venue.' })
  @IsOptional()
  @IsString()
  venueId?: string;

  @Field({ nullable: true, description: 'Inclusive lower bound for paidAt (ISO).' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @Field({ nullable: true, description: 'Exclusive upper bound for paidAt (ISO).' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
