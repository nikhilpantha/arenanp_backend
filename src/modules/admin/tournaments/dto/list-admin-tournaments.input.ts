import { Field, InputType } from '@nestjs/graphql';
import { TournamentStatus, TournamentVisibility } from '@prisma/client';
import { IsDate, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationInput } from '../../../../common/dto/pagination.input';
import { SortOrder } from '../../users/dto/admin-user.model';

@InputType()
export class ListAdminTournamentsInput {
  @Field(() => PaginationInput, { defaultValue: { page: 1, pageSize: 20 } })
  @IsOptional()
  pagination?: PaginationInput;

  @Field({ nullable: true, description: 'Match on tournament name, organizer name or city.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  search?: string;

  @Field(() => TournamentStatus, { nullable: true })
  @IsOptional()
  @IsEnum(TournamentStatus)
  status?: TournamentStatus;

  @Field(() => TournamentVisibility, { nullable: true })
  @IsOptional()
  @IsEnum(TournamentVisibility)
  visibility?: TournamentVisibility;

  @Field({ nullable: true, description: 'Sport filter (matches Tournament.sport).' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  sport?: string;

  @Field({ nullable: true, description: 'Exact city match (case-insensitive).' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  city?: string;

  @Field({ nullable: true, description: 'Inclusive lower bound for startDate (ISO).' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate?: Date;

  @Field({ nullable: true, description: 'Exclusive upper bound for startDate (ISO).' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate?: Date;

  @Field(() => SortOrder, { defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder = SortOrder.DESC;
}
