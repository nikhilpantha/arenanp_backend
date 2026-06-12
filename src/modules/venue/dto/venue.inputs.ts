import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

@InputType()
export class AdditionalServiceInput {
  @Field()
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name!: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}

@InputType({ description: 'A sport the venue offers, with its courts, slot length and price.' })
export class VenueServiceInput {
  @Field({ description: 'Sport slug, e.g. "futsal" (matches Sport.slug).' })
  @IsString()
  sportSlug!: string;

  @Field(() => Int, { defaultValue: 1, description: 'Number of identical courts to create.' })
  @IsNumber()
  @Min(1)
  courtCount: number = 1;

  @Field(() => Int, { defaultValue: 60 })
  @IsNumber()
  @Min(15)
  slotMinutes: number = 60;

  @Field(() => Float)
  @IsNumber()
  @Min(1)
  pricePerHour!: number;

  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  features: string[] = [];
}

@InputType({ description: 'Venue KYC documents + business info submitted for verification.' })
export class VenueVerificationInput {
  @Field({ nullable: true }) @IsOptional() @IsString() businessName?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() businessType?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() panNumber?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() vatNumber?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() registrationNumber?: string;
  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  documentUrls: string[] = [];
}

/**
 * Add a venue from the dashboard. Creates the Venue as PENDING (a super admin
 * approves the listing before it goes live), an OWNER membership and its
 * courts/sports. The VENUE capability is granted separately at signup.
 */
@InputType()
export class SubmitVenueInput {
  @Field()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name!: string;

  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(2000) description?: string;

  @Field()
  @IsString()
  @MinLength(3)
  address!: string;

  @Field({ nullable: true }) @IsOptional() @IsString() city?: string;

  @Field(() => Float)
  @IsLatitude()
  latitude!: number;

  @Field(() => Float)
  @IsLongitude()
  longitude!: number;

  @Field({ nullable: true }) @IsOptional() @IsString() coverImageUrl?: string;
  @Field(() => [String], { defaultValue: [] })
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[] = [];

  @Field({ nullable: true })
  @IsOptional()
  @Matches(TIME_RE, { message: 'openTime must be HH:mm' })
  openTime?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Matches(TIME_RE, { message: 'closeTime must be HH:mm' })
  closeTime?: string;

  @Field({ nullable: true }) @IsOptional() @IsString() contactEmail?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() contactPhone?: string;

  @Field(() => [VenueServiceInput])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VenueServiceInput)
  services!: VenueServiceInput[];

  @Field(() => [AdditionalServiceInput], { defaultValue: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalServiceInput)
  additionalServices: AdditionalServiceInput[] = [];

  @Field(() => VenueVerificationInput, { nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => VenueVerificationInput)
  verification?: VenueVerificationInput;
}

/** Patch the editable profile fields of an existing venue. */
@InputType()
export class UpdateVenueProfileInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field({ nullable: true }) @IsOptional() @IsString() @MinLength(2) @MaxLength(120) name?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() @MaxLength(2000) description?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() address?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() city?: string;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsLatitude() latitude?: number;
  @Field(() => Float, { nullable: true }) @IsOptional() @IsLongitude() longitude?: number;
  @Field({ nullable: true }) @IsOptional() @IsString() coverImageUrl?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @Field({ nullable: true })
  @IsOptional()
  @Matches(TIME_RE, { message: 'openTime must be HH:mm' })
  openTime?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Matches(TIME_RE, { message: 'closeTime must be HH:mm' })
  closeTime?: string;

  @Field({ nullable: true }) @IsOptional() @IsString() contactEmail?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() contactPhone?: string;

  @Field(() => [AdditionalServiceInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalServiceInput)
  additionalServices?: AdditionalServiceInput[];
}

/** Replace the venue's services (courts + sports) wholesale. */
@InputType()
export class SetVenueServicesInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field(() => [VenueServiceInput])
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => VenueServiceInput)
  services!: VenueServiceInput[];
}
