import { applyDecorators } from '@nestjs/common';
import { Field, Int } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Shared field definitions for CreateSportInput / UpdateSportInput.
 *
 * A sport now carries five string-list catalogues and half a dozen numeric
 * bounds, and each needs the same handful of validators. Spelling them out
 * twice (create + update) buried the actual field list — which matters,
 * because this list *is* the contract that lets venue setup render any sport
 * without knowing its slug. `create` picks the GraphQL semantics: a default on
 * create, nullable ("leave it alone") on update.
 */

type Mode = { create: boolean };

/** A catalogue of short labels — surfaces, formats, court features, presets. */
export function TagListField(description: string, { create }: Mode) {
  return applyDecorators(
    Field(
      () => [String],
      create ? { defaultValue: [], description } : { nullable: true, description },
    ),
    IsOptional(),
    IsArray(),
    IsString({ each: true }),
    MaxLength(60, { each: true }),
    ArrayMaxSize(40),
  );
}

/** An optional bounded whole number — a duration, a capacity, a day count. */
export function BoundedIntField(description: string, bounds: { min: number; max: number }) {
  return applyDecorators(
    Field(() => Int, { nullable: true, description }),
    IsOptional(),
    IsInt(),
    Min(bounds.min),
    Max(bounds.max),
  );
}

/** A short human label such as the bookable-unit noun ("court", "lane"). */
export function LabelField(description: string, fallback: string, { create }: Mode) {
  return applyDecorators(
    Field(create ? { defaultValue: fallback, description } : { nullable: true, description }),
    IsOptional(),
    IsString(),
    MaxLength(24),
  );
}

/** Allowed slot lengths. At least one — an empty list makes a sport unsellable. */
export function SlotDurationsField({ create }: Mode) {
  const description = 'Allowed booking slot lengths (minutes), e.g. [30, 60, 90, 120].';
  return applyDecorators(
    Field(
      () => [Int],
      create ? { defaultValue: [30, 60, 90, 120], description } : { nullable: true, description },
    ),
    IsOptional(),
    IsArray(),
    ArrayMinSize(1),
    IsInt({ each: true }),
    Min(5, { each: true }),
    Max(600, { each: true }),
    ArrayMaxSize(12),
  );
}
