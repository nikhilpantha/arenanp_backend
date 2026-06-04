import { Field, InputType } from '@nestjs/graphql';
import { RefundStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListAdminRefundsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field(() => RefundStatus, { nullable: true })
  @IsOptional()
  @IsEnum(RefundStatus)
  status?: RefundStatus;

  @Field({ nullable: true, description: 'Match on customer name, venue name or booking id.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
