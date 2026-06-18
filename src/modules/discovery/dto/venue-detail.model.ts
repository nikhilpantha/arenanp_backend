import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Court as PrismaCourt,
  Sport as PrismaSport,
  Venue as PrismaVenue,
  VenueSport as PrismaVenueSport,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { mapSportStub, SportStub } from '../../admin/sports/dto/sport-stub.model';

@ObjectType({ description: 'A bookable court shown in the player marketplace.' })
export class PublicCourt {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field(() => SportStub) sport!: SportStub;
  @Field(() => Float) pricePerHour!: number;
  @Field(() => Int) slotMinutes!: number;
  @Field(() => [String]) features!: string[];
  /** Stored S3 object keys; presigned by PublicCourtResolver. */
  imageUrls!: string[];
}

@ObjectType({ description: 'Public venue detail with its bookable courts.' })
export class VenueDetail {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) description?: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) address?: string;
  @Field({ nullable: true }) contactPhone?: string;
  /** Stored S3 object key; presigned by VenueDetailResolver. */
  coverImageUrl?: string;
  /** Stored S3 object keys; presigned by VenueDetailResolver. */
  imageUrls!: string[];
  @Field(() => [String]) amenities!: string[];
  @Field(() => [SportStub]) sports!: SportStub[];
  @Field(() => [PublicCourt]) courts!: PublicCourt[];
  @Field() openTime!: string;
  @Field() closeTime!: string;
  @Field(() => Float, { nullable: true }) latitude?: number;
  @Field(() => Float, { nullable: true }) longitude?: number;
}

type CourtWithSport = PrismaCourt & { sport: PrismaSport };
type VenueSportWithSport = PrismaVenueSport & { sport: PrismaSport };

export type VenueForDetail = PrismaVenue & {
  courts: CourtWithSport[];
  venueSports: VenueSportWithSport[];
};

function num(value: Decimal | null): number | undefined {
  return value == null ? undefined : Number(value.toString());
}

function mapPublicCourt(c: CourtWithSport): PublicCourt {
  return {
    id: c.id,
    name: c.name,
    sport: mapSportStub(c.sport),
    pricePerHour: Number(c.pricePerHour.toString()),
    slotMinutes: c.slotMinutes,
    features: c.features,
    imageUrls: c.imageUrls,
  };
}

export function mapVenueDetail(v: VenueForDetail): VenueDetail {
  return {
    id: v.id,
    name: v.name,
    description: v.description ?? undefined,
    city: v.city ?? undefined,
    address: v.address ?? undefined,
    contactPhone: v.contactPhone ?? undefined,
    coverImageUrl: v.coverImageUrl ?? undefined,
    imageUrls: v.imageUrls,
    amenities: v.amenities,
    sports: v.venueSports.map((vs) => mapSportStub(vs.sport)),
    courts: v.courts.map(mapPublicCourt),
    openTime: v.openTime,
    closeTime: v.closeTime,
    latitude: num(v.latitude),
    longitude: num(v.longitude),
  };
}
