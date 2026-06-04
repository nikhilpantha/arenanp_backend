import { Field, InputType } from '@nestjs/graphql';
import { OrganizerStatus, UserRole, VenueOwnerStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { AdminUserSortField, SortOrder } from './admin-user.model';

@InputType()
export class ListAdminUsersInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field({
    nullable: true,
    description: 'Case-insensitive match on fullName, phoneNumber or email.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field(() => OrganizerStatus, { nullable: true })
  @IsOptional()
  @IsEnum(OrganizerStatus)
  organizerStatus?: OrganizerStatus;

  @Field(() => VenueOwnerStatus, { nullable: true })
  @IsOptional()
  @IsEnum(VenueOwnerStatus)
  venueOwnerStatus?: VenueOwnerStatus;

  @Field({ nullable: true, description: 'true = only active users, false = only suspended.' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => AdminUserSortField, { defaultValue: AdminUserSortField.CREATED_AT })
  @IsOptional()
  @IsEnum(AdminUserSortField)
  sortBy?: AdminUserSortField = AdminUserSortField.CREATED_AT;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
