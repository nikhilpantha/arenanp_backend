import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { CourtEnvironment } from '@prisma/client';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { VENUE_AMENITIES } from '../../../common/constants/venue-amenities';

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

@InputType({
  description:
    "One bookable unit. Attribute values must come from the parent sport's catalogue (`surfaces`, `formats`, `courtFeatures`) — the server rejects anything else.",
})
export class VenueCourtInput {
  @Field({ nullable: true, description: 'Court name. Defaults to the sport name (+ index).' })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  @Field(() => Int, { defaultValue: 60 })
  @IsNumber()
  @Min(15)
  slotMinutes: number = 60;

  @Field(() => Float)
  @IsNumber()
  @Min(1)
  pricePerHour!: number;

  /** Per-court, unlike the deprecated service-level `features`. */
  @Field(() => [String], { defaultValue: [], description: 'Subset of `Sport.courtFeatures`.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  features: string[] = [];

  @Field({ nullable: true, description: 'One of `Sport.surfaces`.' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  surface?: string;

  @Field({ nullable: true, description: 'One of `Sport.formats`.' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  format?: string;

  @Field(() => CourtEnvironment, { nullable: true })
  @IsOptional()
  @IsEnum(CourtEnvironment)
  environment?: CourtEnvironment;

  @Field(() => Int, {
    nullable: true,
    description: 'Places per slot. Required when the sport is CAPACITY-booked.',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  capacity?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field(() => [String], { defaultValue: [], description: 'S3 keys from createUploadUrl.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[] = [];
}

@InputType({ description: 'A sport the venue offers, with its courts, slot length and price.' })
export class VenueServiceInput {
  @Field({ description: 'Sport slug, e.g. "futsal" (matches Sport.slug).' })
  @IsString()
  sportSlug!: string;

  /**
   * Per-court detail (name + slot + price). When provided this is authoritative and the
   * legacy `courtCount`/`slotMinutes`/`pricePerHour` fields below are ignored.
   */
  @Field(() => [VenueCourtInput], {
    nullable: true,
    description: 'Per-court detail; overrides courtCount/slotMinutes/pricePerHour when set.',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VenueCourtInput)
  courts?: VenueCourtInput[];

  @Field(() => Int, {
    defaultValue: 1,
    description: 'Legacy: number of identical courts to create.',
  })
  @IsNumber()
  @Min(1)
  courtCount: number = 1;

  @Field(() => Int, {
    defaultValue: 60,
    description: 'Legacy: slot length when courts[] is omitted.',
  })
  @IsNumber()
  @Min(15)
  slotMinutes: number = 60;

  @Field(() => Float, {
    nullable: true,
    description: 'Legacy: per-hour price when courts[] is omitted.',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pricePerHour?: number;

  @Field(() => [String], {
    defaultValue: [],
    deprecationReason:
      'Set `features` on each court instead — a venue can have a wooden court and a cement one.',
    description: 'Legacy: fanned out onto every court that omits its own features.',
  })
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

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email' })
  contactEmail?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() contactPhone?: string;

  @Field(() => [String], {
    defaultValue: [],
    description:
      'Venue-wide amenity slugs from the `venueAmenities` catalogue. Free text is rejected — amenities are a marketplace filter.',
  })
  @IsOptional()
  @IsArray()
  @IsIn(VENUE_AMENITIES as unknown as string[], { each: true })
  amenities: string[] = [];

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

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail({}, { message: 'Enter a valid email' })
  contactEmail?: string;
  @Field({ nullable: true }) @IsOptional() @IsString() contactPhone?: string;

  @Field(() => [String], { nullable: true, description: 'Venue-wide amenity slugs.' })
  @IsOptional()
  @IsArray()
  @IsIn(VENUE_AMENITIES as unknown as string[], { each: true })
  amenities?: string[];

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

/**
 * Patch ONE existing court, in place.
 *
 * The reason this exists rather than owners re-sending `setVenueServices`: that
 * mutation deletes every court and recreates it, and `Booking.courtId` cascades
 * — so a price change would take the venue's entire booking history, and its
 * takings, with it. Here the row keeps its id, so bookings keep their FK and
 * their money snapshot (`Booking.pricePerHour` / `subtotal` / `total` are
 * written once at booking time and never recomputed). A new rate therefore
 * applies to the next booking, never to one already taken.
 *
 * Every field is optional: absent means "leave it alone".
 */
@InputType()
export class UpdateCourtInput {
  /** The owning venue — the permission guard reads this, and it scopes the court. */
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() courtId!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: 'Name it, or leave the name unchanged.' })
  @MaxLength(80)
  name?: string;

  @Field(() => Float, { nullable: true, description: 'Applies to new bookings only.' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  pricePerHour?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(15)
  slotMinutes?: number;

  @Field(() => [String], { nullable: true, description: 'Subset of `Sport.courtFeatures`.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(60, { each: true })
  features?: string[];

  @Field({ nullable: true, description: 'One of `Sport.surfaces`.' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  surface?: string;

  @Field({ nullable: true, description: 'One of `Sport.formats`.' })
  @IsOptional()
  @IsString()
  @MaxLength(60)
  format?: string;

  @Field(() => CourtEnvironment, { nullable: true })
  @IsOptional()
  @IsEnum(CourtEnvironment)
  environment?: CourtEnvironment;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  capacity?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field({ nullable: true, description: 'Off hides it from new bookings; existing ones stand.' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field(() => [String], { nullable: true, description: 'S3 keys from createUploadUrl.' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];
}

/** Add one court to an existing venue, without touching the ones already there. */
@InputType()
export class AddCourtInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field({ description: 'Sport slug. The venue gains the sport if it did not offer it yet.' })
  @IsString()
  sportSlug!: string;

  @Field(() => VenueCourtInput)
  @ValidateNested()
  @Type(() => VenueCourtInput)
  court!: VenueCourtInput;
}

/** Delete one court. Refused when bookings or subscriptions depend on it. */
@InputType()
export class RemoveCourtInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() courtId!: string;
}
