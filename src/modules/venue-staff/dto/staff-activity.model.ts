import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

/**
 * What one person actually did at the venue.
 *
 * Every figure here is derived from columns that have been written since the
 * day bookings shipped — `Booking.createdById`, `BookingStatusEvent.actorId`,
 * `BookingPayment.takenById`, `CashReconciliation.closedById`. None of them
 * had ever been read back, which is why "who cancelled the 7 PM booking?" was
 * unanswerable despite the answer sitting in the database.
 *
 * No new tables, and nothing retroactive is lost.
 */
@ObjectType({ description: "A staff member's activity over a period." })
export class StaffActivity {
  @Field(() => ID) membershipId!: string;
  @Field({ nullable: true }) fullName?: string;

  @Field({ description: 'Start of the window, "yyyy-mm-dd".' }) from!: string;
  @Field({ description: 'End of the window (exclusive), "yyyy-mm-dd".' }) to!: string;

  @Field(() => Int, { description: 'Bookings they created.' })
  bookingsCreated!: number;
  @Field(() => Int, { description: 'Bookings they cancelled.' })
  bookingsCancelled!: number;
  @Field(() => Int, { description: 'Bookings they marked as no-shows.' })
  noShowsMarked!: number;
  @Field(() => Int, { description: 'Bookings they checked in or completed.' })
  bookingsSettled!: number;

  @Field(() => Float, { description: 'Money they took, across every payment they recorded.' })
  paymentsTaken!: number;
  @Field(() => Int) paymentCount!: number;

  @Field(() => Float, {
    description: 'Discounts given on bookings they created — the number an owner watches.',
  })
  discountsGiven!: number;

  @Field(() => Int, { description: 'End-of-day cash counts they closed.' })
  cashDaysClosed!: number;

  @Field({ nullable: true, description: 'The last thing they did here.' })
  lastActionAt?: Date;
}
