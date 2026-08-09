import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Booking as PrismaBooking,
  BookingExtra as PrismaBookingExtra,
  BookingPaymentStatus,
  BookingSource,
  BookingStatus,
  Court as PrismaCourt,
  CustomerType,
  PaymentProvider,
  Sport as PrismaSport,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../common/enums';
import { mapSportStub, SportStub } from '../../admin/sports/dto/sport-stub.model';

@ObjectType({
  description:
    "Who did something to a booking. Names come from the venue's own staff, so a removed employee still reads as themselves — the User row survives, only their seat goes.",
})
export class BookingActorModel {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) name?: string;
}

@ObjectType({ description: 'One recorded change of state, and who made it.' })
export class BookingStatusEventModel {
  @Field(() => ID) id!: string;
  @Field(() => BookingStatus, { nullable: true }) fromStatus?: BookingStatus;
  @Field(() => BookingStatus) toStatus!: BookingStatus;
  @Field(() => BookingActorModel, { nullable: true }) actor?: BookingActorModel;
  @Field({ nullable: true }) note?: string;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'A single add-on service charged on a booking.' })
export class BookingExtraModel {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field(() => Float) price!: number;
}

@ObjectType({ description: 'A court booking as managed from the venue panel.' })
export class BookingModel {
  @Field(() => ID) id!: string;

  @Field(() => ID) courtId!: string;
  @Field() courtName!: string;
  @Field(() => SportStub) sport!: SportStub;

  /// The venue Customer this booking belongs to (null for legacy/phoneless-walk-in rows).
  /// Lets a booking card deep-link to the unified customer profile.
  @Field(() => ID, { nullable: true }) customerId?: string;
  @Field({ nullable: true }) customerName?: string;
  @Field({ nullable: true }) customerPhone?: string;
  @Field(() => CustomerType) customerType!: CustomerType;
  @Field(() => BookingSource) source!: BookingSource;

  @Field() startAt!: Date;
  @Field() endAt!: Date;
  @Field(() => Int) durationMinutes!: number;

  @Field(() => BookingStatus) status!: BookingStatus;

  @Field(() => Float) pricePerHour!: number;
  @Field(() => Float) subtotal!: number;
  @Field(() => Float) discountAmount!: number;
  @Field(() => [BookingExtraModel]) extras!: BookingExtraModel[];
  @Field(() => Float) extrasTotal!: number;
  @Field(() => Float) total!: number;
  @Field() freeGame!: boolean;

  @Field(() => BookingPaymentStatus) paymentStatus!: BookingPaymentStatus;
  @Field(() => Float) amountPaid!: number;
  @Field(() => PaymentProvider, { nullable: true }) paymentMethod?: PaymentProvider;

  @Field({ nullable: true }) notes?: string;

  /**
   * Attribution. Null on anything a player booked themselves, and on rows from
   * before staff accounts existed — the column has always been nullable.
   */
  @Field(() => BookingActorModel, { nullable: true, description: 'Who created this booking.' })
  createdBy?: BookingActorModel;
  @Field(() => BookingActorModel, { nullable: true }) cancelledBy?: BookingActorModel;
  @Field(() => [BookingStatusEventModel], {
    description: 'Every state change, oldest first, with whoever made it.',
  })
  statusEvents!: BookingStatusEventModel[];

  @Field() createdAt!: Date;
}

type CourtWithSport = PrismaCourt & { sport: PrismaSport };
type ActorRow = { id: string; fullName: string | null } | null;
type StatusEventRow = {
  id: string;
  fromStatus: BookingStatus | null;
  toStatus: BookingStatus;
  note: string | null;
  createdAt: Date;
  actor?: ActorRow;
};
export type BookingWithRelations = PrismaBooking & {
  court: CourtWithSport;
  extras?: PrismaBookingExtra[];
  createdBy?: ActorRow;
  cancelledBy?: ActorRow;
  statusEvents?: StatusEventRow[];
};

function mapActor(actor: ActorRow | undefined): BookingActorModel | undefined {
  return actor ? { id: actor.id, name: actor.fullName ?? undefined } : undefined;
}

function num(value: Decimal): number {
  return Number(value.toString());
}

export function mapBookingToGraphql(b: BookingWithRelations): BookingModel {
  const extras = (b.extras ?? []).map((e) => ({ id: e.id, name: e.name, price: num(e.price) }));
  const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
  return {
    id: b.id,
    courtId: b.courtId,
    courtName: b.court.name,
    sport: mapSportStub(b.court.sport),
    customerId: b.customerId ?? undefined,
    customerName: b.customerName ?? undefined,
    customerPhone: b.customerPhone ?? undefined,
    customerType: b.customerType,
    source: b.source,
    startAt: b.startAt,
    endAt: b.endAt,
    durationMinutes: b.durationMinutes,
    status: b.status,
    pricePerHour: num(b.pricePerHour),
    subtotal: num(b.subtotal),
    discountAmount: num(b.discountAmount),
    extras,
    extrasTotal,
    total: num(b.total),
    freeGame: b.freeGame,
    paymentStatus: b.paymentStatus,
    amountPaid: num(b.amountPaid),
    paymentMethod: b.paymentMethod ?? undefined,
    notes: b.adminNotes ?? undefined,
    createdBy: mapActor(b.createdBy),
    cancelledBy: mapActor(b.cancelledBy),
    statusEvents: (b.statusEvents ?? []).map((e) => ({
      id: e.id,
      fromStatus: e.fromStatus ?? undefined,
      toStatus: e.toStatus,
      actor: mapActor(e.actor),
      note: e.note ?? undefined,
      createdAt: e.createdAt,
    })),
    createdAt: b.createdAt,
  };
}
