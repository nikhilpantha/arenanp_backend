import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  Court as PrismaCourt,
  Sport as PrismaSport,
  Venue as PrismaVenue,
  VenueSport as PrismaVenueSport,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { mapSportStub, SportStub } from '../../admin/sports/dto/sport-stub.model';

@ObjectType({ description: 'A venue as shown in the player marketplace list.' })
export class VenueCard {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) address?: string;
  /** Stored S3 object key; presigned to a download URL by VenueCardResolver. */
  coverImageUrl?: string;
  @Field(() => [SportStub]) sports!: SportStub[];
  @Field(() => Float, { nullable: true, description: 'Lowest active court price/hour.' })
  priceFrom?: number;
  @Field() openTime!: string;
  @Field() closeTime!: string;
  @Field(() => Float, { nullable: true }) latitude?: number;
  @Field(() => Float, { nullable: true }) longitude?: number;
}

type VenueSportWithSport = PrismaVenueSport & { sport: PrismaSport };

/** Shape the card mapper needs: the venue plus its active courts' prices + its sports. */
export type VenueForCard = PrismaVenue & {
  courts: Pick<PrismaCourt, 'pricePerHour'>[];
  venueSports: VenueSportWithSport[];
};

function num(value: Decimal | null): number | undefined {
  return value == null ? undefined : Number(value.toString());
}

export function mapVenueCard(v: VenueForCard): VenueCard {
  const prices = v.courts.map((c) => Number(c.pricePerHour.toString()));
  return {
    id: v.id,
    name: v.name,
    city: v.city ?? undefined,
    address: v.address ?? undefined,
    coverImageUrl: v.coverImageUrl ?? undefined,
    sports: v.venueSports.map((vs) => mapSportStub(vs.sport)),
    priceFrom: prices.length ? Math.min(...prices) : undefined,
    openTime: v.openTime,
    closeTime: v.closeTime,
    latitude: num(v.latitude),
    longitude: num(v.longitude),
  };
}
