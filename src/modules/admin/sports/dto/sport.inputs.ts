import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

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

  @Field(() => [String], { defaultValue: [], description: 'Amenity presets for this sport.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  @ArrayMaxSize(40)
  features?: string[] = [];

  @Field(() => [Int], {
    defaultValue: [30, 60, 90, 120],
    description: 'Allowed booking slot lengths (minutes), e.g. [30, 60, 90, 120].',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(5, { each: true })
  @Max(600, { each: true })
  @ArrayMaxSize(12)
  slotDurations?: number[] = [30, 60, 90, 120];

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

  @Field(() => [String], { nullable: true, description: 'Amenity presets for this sport.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  @ArrayMaxSize(40)
  features?: string[];

  @Field(() => [Int], {
    nullable: true,
    description: 'Allowed booking slot lengths (minutes), e.g. [30, 60, 90, 120].',
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(5, { each: true })
  @Max(600, { each: true })
  @ArrayMaxSize(12)
  slotDurations?: number[];

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
