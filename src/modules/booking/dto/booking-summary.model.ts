import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: "Top-of-screen overview numbers for a venue's bookings." })
export class VenueBookingSummary {
  @Field(() => Int) bookingsToday!: number;

  /**
   * Null for callers without `finance:read`. The whole query is gated on
   * `bookings:read`, which the front desk and ground staff hold — they need
   * the day's schedule, but the day's takings are the owner's business. A null
   * (rather than a zero) is what lets the console hide the tile instead of
   * showing a confident "Rs 0".
   */
  @Field(() => Float, {
    nullable: true,
    description: "Money taken today. Null unless the caller holds 'finance:read'.",
  })
  revenueToday?: number;

  @Field(() => Int, { description: 'Bookings today with money still owed (a count, not a sum).' })
  pendingPayments!: number;
}
