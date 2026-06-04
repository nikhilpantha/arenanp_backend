import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  Court as PrismaCourt,
  Sport as PrismaSport,
  Venue as PrismaVenue,
  VenueSport as PrismaVenueSport,
  VenueVerificationStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';
import { SportStub, mapSportStub } from '../../sports/dto/sport-stub.model';

@ObjectType({ description: 'A bookable surface inside a venue (court / ground / pitch).' })
export class AdminCourt {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field(() => SportStub) sport!: SportStub;
  @Field(() => Float) pricePerHour!: number;
  @Field({ nullable: true }) description?: string;
  @Field() isActive!: boolean;
  @Field(() => [String]) imageUrls!: string[];
  @Field() createdAt!: Date;
}

@ObjectType({
  description:
    'Admin-facing view of a Venue including owner, courts, gallery, KYC documents and review trail.',
})
export class AdminVenue {
  @Field(() => ID) id!: string;
  @Field(() => AdminUser) owner!: AdminUser;

  @Field() name!: string;
  @Field({ nullable: true }) description?: string;

  @Field({ nullable: true }) address?: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) country?: string;
  @Field(() => Float, { nullable: true }) latitude?: number;
  @Field(() => Float, { nullable: true }) longitude?: number;

  @Field({ nullable: true }) coverImageUrl?: string;
  @Field(() => [String]) imageUrls!: string[];
  @Field(() => [String]) documentUrls!: string[];

  @Field(() => [SportStub]) sports!: SportStub[];
  @Field(() => [String]) amenities!: string[];

  @Field({ nullable: true }) contactEmail?: string;
  @Field({ nullable: true }) contactPhone?: string;

  @Field(() => VenueVerificationStatus) verificationStatus!: VenueVerificationStatus;
  @Field({ nullable: true }) rejectionReason?: string;

  @Field() isFeatured!: boolean;
  @Field({ nullable: true }) featuredAt?: Date;

  @Field({ nullable: true }) reviewedAt?: Date;
  @Field(() => AdminUser, { nullable: true }) reviewer?: AdminUser;

  @Field(() => [AdminCourt]) courts!: AdminCourt[];

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

type CourtWithSport = PrismaCourt & { sport: PrismaSport };
type VenueSportWithSport = PrismaVenueSport & { sport: PrismaSport };
type VenueWithRelations = PrismaVenue & {
  owner: Parameters<typeof mapPrismaUserToAdmin>[0];
  reviewer?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  courts: CourtWithSport[];
  venueSports: VenueSportWithSport[];
};

function decimalToNumber(value: Decimal | null | undefined): number | undefined {
  if (value === null || value === undefined) return undefined;
  return typeof value === 'number' ? value : Number(value.toString());
}

export function mapPrismaCourtToAdmin(court: CourtWithSport): AdminCourt {
  return {
    id: court.id,
    name: court.name,
    sport: mapSportStub(court.sport),
    pricePerHour: Number(court.pricePerHour.toString()),
    description: court.description ?? undefined,
    isActive: court.isActive,
    imageUrls: court.imageUrls,
    createdAt: court.createdAt,
  };
}

export function mapPrismaVenueToAdmin(venue: VenueWithRelations): AdminVenue {
  return {
    id: venue.id,
    owner: mapPrismaUserToAdmin(venue.owner),
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
    sports: venue.venueSports.map((vs) => mapSportStub(vs.sport)),
    amenities: venue.amenities,
    contactEmail: venue.contactEmail ?? undefined,
    contactPhone: venue.contactPhone ?? undefined,
    verificationStatus: venue.verificationStatus,
    rejectionReason: venue.rejectionReason ?? undefined,
    isFeatured: venue.isFeatured,
    featuredAt: venue.featuredAt ?? undefined,
    reviewedAt: venue.reviewedAt ?? undefined,
    reviewer: venue.reviewer ? mapPrismaUserToAdmin(venue.reviewer) : undefined,
    courts: venue.courts.map(mapPrismaCourtToAdmin),
    createdAt: venue.createdAt,
    updatedAt: venue.updatedAt,
  };
}
