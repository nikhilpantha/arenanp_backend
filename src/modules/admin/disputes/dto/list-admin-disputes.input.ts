import { Field, InputType } from '@nestjs/graphql';
import { DisputeCategory, DisputeStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListAdminDisputesInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field(() => DisputeStatus, { nullable: true })
  @IsOptional()
  @IsEnum(DisputeStatus)
  status?: DisputeStatus;

  @Field(() => DisputeCategory, { nullable: true })
  @IsOptional()
  @IsEnum(DisputeCategory)
  category?: DisputeCategory;

  @Field({ nullable: true, description: 'Match on subject, customer name, phone or venue.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
