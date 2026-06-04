import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

/** Reusable 1-indexed offset pagination input. */
@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1, description: 'Page number, 1-indexed.' })
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @Field(() => Int, { defaultValue: 20, description: 'Page size, max 100.' })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  pageSize: number = 20;
}

@ObjectType({ description: 'Pagination metadata returned alongside list payloads.' })
export class PageInfo {
  @Field(() => Int) page!: number;
  @Field(() => Int) pageSize!: number;
  @Field(() => Int) totalItems!: number;
  @Field(() => Int) totalPages!: number;
  @Field() hasNextPage!: boolean;
  @Field() hasPreviousPage!: boolean;
}

export function buildPageInfo(page: number, pageSize: number, totalItems: number): PageInfo {
  const totalPages = totalItems === 0 ? 0 : Math.ceil(totalItems / pageSize);
  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
