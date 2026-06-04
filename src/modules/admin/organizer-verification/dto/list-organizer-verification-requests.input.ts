import { Field, InputType } from '@nestjs/graphql';
import { OrganizerStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListOrganizerVerificationRequestsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field(() => OrganizerStatus, {
    nullable: true,
    description: 'Filter by request status. Defaults to all when omitted.',
  })
  @IsOptional()
  @IsEnum(OrganizerStatus)
  status?: OrganizerStatus;

  @Field({
    nullable: true,
    description: 'Match on user fullName, phoneNumber, email or businessName.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
