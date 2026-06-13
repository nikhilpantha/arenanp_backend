import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Booking as PrismaBooking,
  BookingSource,
  BookingStatus,
  BookingStatusEvent as PrismaBookingStatusEvent,
  CustomerType,
  PaymentProvider,
  PaymentStatus,
  Payment as PrismaPayment,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';
import { SportStub, mapSportStub } from '../../sports/dto/sport-stub.model';

@ObjectType({ description: 'Compact venue stub shown inside booking payloads.' })
export class AdminBookingVenueStub {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) city?: string;
}

@ObjectType({ description: 'Compact court stub shown inside booking payloads.' })
export class AdminBookingCourtStub {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field(() => SportStub) sport!: SportStub;
  @Field(() => Float) pricePerHour!: number;
}

@ObjectType({ description: 'Payment record attached to a booking, as seen by admin.' })
export class AdminBookingPayment {
  @Field(() => ID) id!: string;
  @Field(() => PaymentProvider) provider!: PaymentProvider;
  @Field({ nullable: true }) providerTxnId?: string;
  @Field(() => Float) amount!: number;
  @Field() currency!: string;
  @Field(() => PaymentStatus) status!: PaymentStatus;
  @Field({ nullable: true }) failureReason?: string;
  @Field({ nullable: true }) paidAt?: Date;
  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

@ObjectType({ description: 'Timeline entry for a booking — one row per state transition.' })
export class AdminBookingStatusEvent {
  @Field(() => ID) id!: string;
  @Field(() => BookingStatus, { nullable: true }) fromStatus?: BookingStatus;
  @Field(() => BookingStatus) toStatus!: BookingStatus;
  @Field(() => AdminUser, { nullable: true }) actor?: AdminUser;
  @Field({ nullable: true }) note?: string;
  @Field() createdAt!: Date;
}

@ObjectType({
  description:
    'Admin-facing view of a Booking. Includes user, venue, court, payment and the status-change timeline.',
})
export class AdminBooking {
  @Field(() => ID) id!: string;

  /** The registered player who booked online; null for venue walk-in bookings. */
  @Field(() => AdminUser, { nullable: true }) user?: AdminUser;
  @Field({ nullable: true }) customerName?: string;
  @Field({ nullable: true }) customerPhone?: string;
  @Field(() => CustomerType) customerType!: CustomerType;
  @Field(() => BookingSource) source!: BookingSource;
  @Field(() => AdminBookingVenueStub) venue!: AdminBookingVenueStub;
  @Field(() => AdminBookingCourtStub) court!: AdminBookingCourtStub;

  @Field() startAt!: Date;
  @Field() endAt!: Date;
  @Field(() => Int) durationMinutes!: number;

  @Field(() => Float) pricePerHour!: number;
  @Field(() => Float) subtotal!: number;
  @Field(() => Float) serviceFee!: number;
  @Field(() => Float) total!: number;

  @Field(() => BookingStatus) status!: BookingStatus;
  @Field({ nullable: true }) cancellationReason?: string;
  @Field(() => AdminUser, { nullable: true }) cancelledBy?: AdminUser;
  @Field({ nullable: true }) cancelledAt?: Date;
  @Field({ nullable: true }) completedAt?: Date;
  @Field({ nullable: true }) adminNotes?: string;

  @Field(() => AdminBookingPayment, { nullable: true }) payment?: AdminBookingPayment;
  @Field(() => [AdminBookingStatusEvent]) statusEvents!: AdminBookingStatusEvent[];

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

function decimalToNumber(d: Decimal | null | undefined): number {
  if (d === null || d === undefined) return 0;
  return typeof d === 'number' ? d : Number(d.toString());
}

type EventWithActor = PrismaBookingStatusEvent & {
  actor?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

type PaymentLite = PrismaPayment | null;

type BookingWithRelations = PrismaBooking & {
  user: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  cancelledBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  venue: { id: string; name: string; city: string | null };
  court: {
    id: string;
    name: string;
    pricePerHour: Decimal;
    sport: { id: string; slug: string; name: string; iconUrl: string | null };
  };
  payment: PaymentLite;
  statusEvents: EventWithActor[];
};

export function mapPaymentToAdmin(p: PrismaPayment): AdminBookingPayment {
  return {
    id: p.id,
    provider: p.provider,
    providerTxnId: p.providerTxnId ?? undefined,
    amount: decimalToNumber(p.amount),
    currency: p.currency,
    status: p.status,
    failureReason: p.failureReason ?? undefined,
    paidAt: p.paidAt ?? undefined,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export function mapStatusEventToAdmin(e: EventWithActor): AdminBookingStatusEvent {
  return {
    id: e.id,
    fromStatus: e.fromStatus ?? undefined,
    toStatus: e.toStatus,
    actor: e.actor ? mapPrismaUserToAdmin(e.actor) : undefined,
    note: e.note ?? undefined,
    createdAt: e.createdAt,
  };
}

export function mapBookingToAdmin(b: BookingWithRelations): AdminBooking {
  return {
    id: b.id,
    user: b.user ? mapPrismaUserToAdmin(b.user) : undefined,
    customerName: b.customerName ?? undefined,
    customerPhone: b.customerPhone ?? undefined,
    customerType: b.customerType,
    source: b.source,
    venue: { id: b.venue.id, name: b.venue.name, city: b.venue.city ?? undefined },
    court: {
      id: b.court.id,
      name: b.court.name,
      sport: mapSportStub(b.court.sport),
      pricePerHour: decimalToNumber(b.court.pricePerHour),
    },
    startAt: b.startAt,
    endAt: b.endAt,
    durationMinutes: b.durationMinutes,
    pricePerHour: decimalToNumber(b.pricePerHour),
    subtotal: decimalToNumber(b.subtotal),
    serviceFee: decimalToNumber(b.serviceFee),
    total: decimalToNumber(b.total),
    status: b.status,
    cancellationReason: b.cancellationReason ?? undefined,
    cancelledBy: b.cancelledBy ? mapPrismaUserToAdmin(b.cancelledBy) : undefined,
    cancelledAt: b.cancelledAt ?? undefined,
    completedAt: b.completedAt ?? undefined,
    adminNotes: b.adminNotes ?? undefined,
    payment: b.payment ? mapPaymentToAdmin(b.payment) : undefined,
    statusEvents: b.statusEvents.map(mapStatusEventToAdmin),
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}
