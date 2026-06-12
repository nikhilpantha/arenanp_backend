import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Booking as PrismaBooking,
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

@ObjectType({ description: 'A court booking as managed from the venue panel.' })
export class BookingModel {
  @Field(() => ID) id!: string;

  @Field(() => ID) courtId!: string;
  @Field() courtName!: string;
  @Field(() => SportStub) sport!: SportStub;

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
  @Field(() => Float) total!: number;
  @Field() freeGame!: boolean;

  @Field(() => BookingPaymentStatus) paymentStatus!: BookingPaymentStatus;
  @Field(() => Float) amountPaid!: number;
  @Field(() => PaymentProvider, { nullable: true }) paymentMethod?: PaymentProvider;

  @Field({ nullable: true }) notes?: string;
  @Field() createdAt!: Date;
}

type CourtWithSport = PrismaCourt & { sport: PrismaSport };
export type BookingWithRelations = PrismaBooking & { court: CourtWithSport };

function num(value: Decimal): number {
  return Number(value.toString());
}

export function mapBookingToGraphql(b: BookingWithRelations): BookingModel {
  return {
    id: b.id,
    courtId: b.courtId,
    courtName: b.court.name,
    sport: mapSportStub(b.court.sport),
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
    total: num(b.total),
    freeGame: b.freeGame,
    paymentStatus: b.paymentStatus,
    amountPaid: num(b.amountPaid),
    paymentMethod: b.paymentMethod ?? undefined,
    notes: b.adminNotes ?? undefined,
    createdAt: b.createdAt,
  };
}
