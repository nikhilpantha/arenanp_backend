import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Court as PrismaCourt,
  Sport as PrismaSport,
  Venue as PrismaVenue,
  VenueSport as PrismaVenueSport,
  VenueVerificationStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../common/enums';
import { mapSportStub, SportStub } from '../../admin/sports/dto/sport-stub.model';

@ObjectType({ description: 'An extra paid/free service a venue offers.' })
export class AdditionalServiceModel {
  @Field() name!: string;
  @Field(() => Float, { nullable: true }) price?: number;
}

@ObjectType({ description: 'A bookable surface (court / ground / pitch) within a venue.' })
export class VenueCourt {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field(() => SportStub) sport!: SportStub;
  @Field(() => Float) pricePerHour!: number;
  @Field(() => Int) slotMinutes!: number;
  @Field(() => [String]) features!: string[];
  @Field({ nullable: true }) description?: string;
  @Field() isActive!: boolean;
  // Stored S3 object keys; presigned to download URLs by VenueCourtResolver.
  imageUrls!: string[];
}

@ObjectType({ description: "The signed-in venue member's view of one of their venues." })
export class VenueModel {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) description?: string;

  @Field({ nullable: true }) address?: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) country?: string;
  @Field(() => Float, { nullable: true }) latitude?: number;
  @Field(() => Float, { nullable: true }) longitude?: number;

  // The next three hold stored S3 object *keys*; VenueResolver exposes them as
  // presigned download URLs via field resolvers (coverImageUrl / imageUrls / documentUrls).
  coverImageUrl?: string;
  imageUrls!: string[];
  documentUrls!: string[];

  @Field(() => [String]) amenities!: string[];
  @Field(() => [AdditionalServiceModel]) additionalServices!: AdditionalServiceModel[];

  @Field() openTime!: string;
  @Field() closeTime!: string;

  @Field({ nullable: true }) contactEmail?: string;
  @Field({ nullable: true }) contactPhone?: string;

  @Field(() => VenueVerificationStatus) verificationStatus!: VenueVerificationStatus;
  @Field({ nullable: true }) rejectionReason?: string;
  @Field() isFeatured!: boolean;

  @Field(() => [SportStub]) sports!: SportStub[];
  @Field(() => [VenueCourt]) courts!: VenueCourt[];

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

type CourtWithSport = PrismaCourt & { sport: PrismaSport };
type VenueSportWithSport = PrismaVenueSport & { sport: PrismaSport };
export type VenueWithRelations = PrismaVenue & {
  courts: CourtWithSport[];
  venueSports: VenueSportWithSport[];
};

function decimalToNumber(value: Decimal | null | undefined): number | undefined {
  if (value === null || value === undefined) return undefined;
  return typeof value === 'number' ? value : Number(value.toString());
}

function parseAdditionalServices(
  value: PrismaVenue['additionalServices'],
): AdditionalServiceModel[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (v): v is { name: string; price?: number } => !!v && typeof v === 'object' && 'name' in v,
    )
    .map((v) => ({
      name: String(v.name),
      price: typeof v.price === 'number' ? v.price : undefined,
    }));
}

export function mapVenueCourt(court: CourtWithSport): VenueCourt {
  return {
    id: court.id,
    name: court.name,
    sport: mapSportStub(court.sport),
    pricePerHour: Number(court.pricePerHour.toString()),
    slotMinutes: court.slotMinutes,
    features: court.features,
    description: court.description ?? undefined,
    isActive: court.isActive,
    imageUrls: court.imageUrls,
  };
}

export function mapVenueToGraphql(venue: VenueWithRelations): VenueModel {
  return {
    id: venue.id,
    name: venue.name,
    description: venue.description ?? undefined,
    address: venue.address ?? undefined,
    city: venue.city ?? undefined,
    country: venue.country ?? undefined,
    latitude: decimalToNumber(venue.latitude),
    longitude: decimalToNumber(venue.longitude),
    coverImageUrl: venue.coverImageUrl ?? undefined,
    imageUrls: venue.imageUrls,
    documentUrls: venue.documentUrls,
    amenities: venue.amenities,
    additionalServices: parseAdditionalServices(venue.additionalServices),
    openTime: venue.openTime,
    closeTime: venue.closeTime,
    contactEmail: venue.contactEmail ?? undefined,
    contactPhone: venue.contactPhone ?? undefined,
    verificationStatus: venue.verificationStatus,
    rejectionReason: venue.rejectionReason ?? undefined,
    isFeatured: venue.isFeatured,
    sports: venue.venueSports.map((vs) => mapSportStub(vs.sport)),
    courts: venue.courts.map(mapVenueCourt),
    createdAt: venue.createdAt,
    updatedAt: venue.updatedAt,
  };
}
