import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { SportBookingMode, SportPricingUnit } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {
  BoundedIntField,
  LabelField,
  SlotDurationsField,
  TagListField,
} from './sport-field.decorators';

/**
 * The sport catalogue is what makes venue setup sport-agnostic: every label,
 * price unit, slot length and attribute an owner sees is read from the row an
 * admin fills in here, so adding a sport never needs a deploy.
 *
 * Note `features` is no longer an input — it is derived on write as
 * surfaces + formats + courtFeatures, and kept only so the Expo app's setup
 * screen keeps working until it moves to the typed lists.
 */
@InputType()
export class CreateSportInput {
  @Field({ description: 'Display name (e.g. "Table Tennis").' })
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  name!: string;

  @Field({
    nullable: true,
    description:
      'URL-safe slug. Auto-generated from `name` if omitted. Lowercase letters, digits and hyphens only.',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/u, {
    message: 'Slug must be lowercase letters, digits, and hyphens only.',
  })
  @MaxLength(60)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  iconUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  // ── How the sport is sold ─────────────────────────────────────────────────

  @Field(() => SportPricingUnit, {
    defaultValue: SportPricingUnit.PER_HOUR,
    description: 'The unit an owner types a price in. Storage stays per hour.',
  })
  @IsOptional()
  @IsEnum(SportPricingUnit)
  pricingUnit?: SportPricingUnit = SportPricingUnit.PER_HOUR;

  @LabelField('What one bookable unit is called — court, pitch, lane, table, bay.', 'court', {
    create: true,
  })
  unitLabel?: string = 'court';

  @LabelField('Plural of `unitLabel`, e.g. "courts", "lanes".', 'courts', { create: true })
  unitLabelPlural?: string = 'courts';

  @SlotDurationsField({ create: true })
  slotDurations?: number[] = [30, 60, 90, 120];

  @Field(() => Int, {
    defaultValue: 60,
    description: 'Slot length a new court starts on. Must be one of `slotDurations`.',
  })
  @IsOptional()
  @IsInt()
  @Min(5)
  defaultSlotMinutes?: number = 60;

  @BoundedIntField('Shortest bookable duration in minutes (a cricket ground needs 240).', {
    min: 5,
    max: 1440,
  })
  minDurationMinutes?: number;

  @BoundedIntField('Longest bookable duration in minutes.', { min: 5, max: 1440 })
  maxDurationMinutes?: number;

  @Field(() => SportBookingMode, {
    defaultValue: SportBookingMode.EXCLUSIVE,
    description: 'EXCLUSIVE takes the whole surface; CAPACITY sells N places per slot.',
  })
  @IsOptional()
  @IsEnum(SportBookingMode)
  bookingMode?: SportBookingMode = SportBookingMode.EXCLUSIVE;

  @BoundedIntField('Places per slot. Required when `bookingMode` is CAPACITY.', {
    min: 1,
    max: 500,
  })
  defaultCapacity?: number;

  // ── Court attribute catalogues ────────────────────────────────────────────

  @TagListField('Playing surfaces an owner picks from, e.g. ["Artificial Turf"].', { create: true })
  surfaces?: string[] = [];

  @TagListField('Configurations sold, e.g. ["5-a-side", "7-a-side"].', { create: true })
  formats?: string[] = [];

  @TagListField('Per-court features, e.g. ["Floodlights", "Air-Conditioned"].', { create: true })
  courtFeatures?: string[] = [];

  // ── Listing ───────────────────────────────────────────────────────────────

  @Field(() => Int, { defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number = 0;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

/** Patch semantics: every field is optional, and `undefined` means "leave it". */
@InputType()
export class UpdateSportInput {
  @Field(() => ID)
  @IsString()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(-[a-z0-9]+)*$/u, {
    message: 'Slug must be lowercase letters, digits, and hyphens only.',
  })
  @MaxLength(60)
  slug?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  iconUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field(() => SportPricingUnit, { nullable: true })
  @IsOptional()
  @IsEnum(SportPricingUnit)
  pricingUnit?: SportPricingUnit;

  @LabelField('What one bookable unit is called — court, pitch, lane, table, bay.', 'court', {
    create: false,
  })
  unitLabel?: string;

  @LabelField('Plural of `unitLabel`.', 'courts', { create: false })
  unitLabelPlural?: string;

  @SlotDurationsField({ create: false })
  slotDurations?: number[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(5)
  defaultSlotMinutes?: number;

  @BoundedIntField('Shortest bookable duration in minutes.', { min: 5, max: 1440 })
  minDurationMinutes?: number;

  @BoundedIntField('Longest bookable duration in minutes.', { min: 5, max: 1440 })
  maxDurationMinutes?: number;

  @Field(() => SportBookingMode, { nullable: true })
  @IsOptional()
  @IsEnum(SportBookingMode)
  bookingMode?: SportBookingMode;

  @BoundedIntField('Places per slot. Required when `bookingMode` is CAPACITY.', {
    min: 1,
    max: 500,
  })
  defaultCapacity?: number;

  @TagListField('Playing surfaces an owner picks from.', { create: false })
  surfaces?: string[];

  @TagListField('Configurations sold, e.g. ["5-a-side"].', { create: false })
  formats?: string[];

  @TagListField('Per-court features, e.g. ["Floodlights"].', { create: false })
  courtFeatures?: string[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
