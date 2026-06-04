import { Field, InputType } from '@nestjs/graphql';
import { VenueOwnerStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListVenueOwnerVerificationRequestsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field(() => VenueOwnerStatus, {
    nullable: true,
    description: 'Filter by request status. Defaults to all when omitted.',
  })
  @IsOptional()
  @IsEnum(VenueOwnerStatus)
  status?: VenueOwnerStatus;

  @Field({
    nullable: true,
    description: 'Match on user fullName, phoneNumber, email, businessName or panNumber.',
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
