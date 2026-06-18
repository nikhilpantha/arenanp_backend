import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Booking as PrismaBooking,
  BookingPaymentStatus,
  BookingStatus,
  Court as PrismaCourt,
  Sport as PrismaSport,
  Venue as PrismaVenue,
} from '@prisma/client';

import { PageInfo } from '../../../common/dto/pagination.input';
import { mapSportStub, SportStub } from '../../admin/sports/dto/sport-stub.model';

import '../../../common/enums';

@ObjectType({ description: 'Compact venue reference embedded in a player booking.' })
export class BookingVenueStub {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) address?: string;
}

@ObjectType({ description: "A player's own court booking (player-panel view)." })
export class PlayerBookingModel {
  @Field(() => ID) id!: string;
  @Field(() => BookingVenueStub) venue!: BookingVenueStub;
  @Field(() => ID) courtId!: string;
  @Field() courtName!: string;
  @Field(() => SportStub) sport!: SportStub;

  @Field() startAt!: Date;
  @Field() endAt!: Date;
  @Field(() => Int) durationMinutes!: number;

  @Field(() => BookingStatus) status!: BookingStatus;
  @Field(() => Float) total!: number;
  @Field(() => BookingPaymentStatus) paymentStatus!: BookingPaymentStatus;
  @Field() createdAt!: Date;
}

@ObjectType()
export class PaginatedPlayerBookings {
  @Field(() => [PlayerBookingModel]) items!: PlayerBookingModel[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}

type CourtWithSport = PrismaCourt & { sport: PrismaSport };
export type PlayerBookingWithRelations = PrismaBooking & {
  court: CourtWithSport;
  venue: PrismaVenue;
};

export function mapPlayerBooking(b: PlayerBookingWithRelations): PlayerBookingModel {
  return {
    id: b.id,
    venue: {
      id: b.venue.id,
      name: b.venue.name,
      city: b.venue.city ?? undefined,
      address: b.venue.address ?? undefined,
    },
    courtId: b.courtId,
    courtName: b.court.name,
    sport: mapSportStub(b.court.sport),
    startAt: b.startAt,
    endAt: b.endAt,
    durationMinutes: b.durationMinutes,
    status: b.status,
    total: Number(b.total.toString()),
    paymentStatus: b.paymentStatus,
    createdAt: b.createdAt,
  };
}
