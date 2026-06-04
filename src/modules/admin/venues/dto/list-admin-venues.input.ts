import { Field, InputType } from '@nestjs/graphql';
import { VenueVerificationStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListAdminVenuesInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field({ nullable: true, description: 'Match on venue name, owner name, owner phone or city.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => VenueVerificationStatus, { nullable: true })
  @IsOptional()
  @IsEnum(VenueVerificationStatus)
  verificationStatus?: VenueVerificationStatus;

  @Field({ nullable: true, description: 'Exact city match (case-insensitive).' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @Field({ nullable: true, description: 'Filter venues that offer this sport.' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  sport?: string;

  @Field({ nullable: true, description: 'true = only featured, false = only non-featured.' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
