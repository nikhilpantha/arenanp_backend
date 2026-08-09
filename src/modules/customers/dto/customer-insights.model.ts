import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

/**
 * Everything the venue console's customer profile needs to answer two
 * questions: how loyal is this player, and how do they like to play here.
 *
 * All of it is aggregated over the customer's WHOLE booking history at this
 * venue (the paged booking list only shows a window), so the numbers stay
 * right for a regular with hundreds of games.
 *
 * Vocabulary, fixed here so every field means the same thing:
 *   visit     — a booking that already started and wasn't cancelled or no-showed
 *   completed — status COMPLETED; the tally loyalty is earned on
 *   money     — summed over non-cancelled bookings (a cancelled game is not trade)
 */

@ObjectType({ description: 'One "most booked" entry — a court, a sport, a slot.' })
export class CustomerFavouriteModel {
  @Field() label!: string;
  @Field(() => Int) games!: number;
}

@ObjectType({ description: 'Visits starting in one Nepal-time hour of the day (0–23).' })
export class CustomerHourBucketModel {
  @Field(() => Int) hour!: number;
  @Field(() => Int) games!: number;
}

@ObjectType({ description: 'One Nepal calendar month of play, for the trend strip.' })
export class CustomerMonthModel {
  @Field({ description: 'Nepal month as "YYYY-MM".' }) month!: string;
  @Field(() => Int) games!: number;
  @Field(() => Float) spend!: number;
}

@ObjectType({ description: "Loyalty standing under the venue's every-Nth free-game offer." })
export class CustomerLoyaltyModel {
  @Field({ description: 'The venue runs an every-Nth loyalty offer right now.' })
  configured!: boolean;
  @Field(() => Int, { nullable: true, description: 'Games per free game (N).' })
  every?: number;
  @Field(() => Int, { description: 'Qualifying games in the current cycle count.' })
  gamesPlayed!: number;
  @Field(() => Int, { description: 'Games still to play before the next free one.' })
  toNext!: number;
  @Field({ description: 'A free game is available to redeem now.' })
  ready!: boolean;
  @Field(() => Int, { description: 'Free games already given to this customer.' })
  redeemed!: number;
  @Field(() => ID, { nullable: true }) offerId?: string;
}

@ObjectType({ description: "A customer's play history at one venue, aggregated." })
export class VenueCustomerInsightsModel {
  // ─── Counts ───────────────────────────────────────────────────────────────
  @Field(() => Int, { description: 'Every booking ever made, whatever its state.' })
  totalBookings!: number;
  @Field(() => Int, {
    description: 'Games that actually happened (started, not cancelled/no-show).',
  })
  visits!: number;
  @Field(() => Int, { description: 'Bookings closed as COMPLETED — the loyalty tally.' })
  completed!: number;
  @Field(() => Int) cancelled!: number;
  @Field(() => Int) noShow!: number;
  @Field(() => Int, { description: 'Live bookings still in the future.' })
  upcoming!: number;
  @Field(() => Int, { description: 'Games taken free under a loyalty offer.' })
  freeGames!: number;

  // ─── Where the bookings come from ─────────────────────────────────────────
  @Field(() => Int) walkInBookings!: number;
  @Field(() => Int) onlineBookings!: number;
  @Field(() => Int) membershipBookings!: number;

  // ─── Time on court ────────────────────────────────────────────────────────
  @Field(() => Float, { description: 'Hours played across all visits.' })
  hoursPlayed!: number;
  @Field(() => Int, { description: 'Typical session length, in minutes.' })
  avgSessionMinutes!: number;
  @Field(() => Float, {
    description: 'Visits per month since the first one — the regularity number.',
  })
  visitsPerMonth!: number;

  // ─── Money ────────────────────────────────────────────────────────────────
  @Field(() => Float, { description: 'Billed across non-cancelled bookings.' })
  lifetimeBilled!: number;
  @Field(() => Float, { description: 'Actually collected — matches the list screen\'s "spent".' })
  lifetimePaid!: number;
  @Field(() => Float, { description: 'Billed minus paid: what they still owe.' })
  outstanding!: number;
  @Field(() => Float, { description: 'Average collected per visit.' })
  avgSpendPerVisit!: number;
  @Field(() => Float, { description: 'Discounts and offers given, lifetime.' })
  totalDiscount!: number;

  // ─── Dates ────────────────────────────────────────────────────────────────
  @Field({ nullable: true }) firstVisitAt?: Date;
  @Field({ nullable: true }) lastVisitAt?: Date;
  @Field({ nullable: true, description: 'Their next booking, if one is on the books.' })
  nextVisitAt?: Date;

  // ─── Preferences ──────────────────────────────────────────────────────────
  @Field(() => [CustomerFavouriteModel], { description: 'Most-played courts, busiest first.' })
  topCourts!: CustomerFavouriteModel[];
  @Field(() => [CustomerFavouriteModel], { description: 'Most-played sports, busiest first.' })
  topSports!: CustomerFavouriteModel[];
  @Field(() => [Int], { description: 'Visits per weekday, Sunday-first (7 entries).' })
  weekdayGames!: number[];
  @Field(() => [CustomerHourBucketModel], {
    description: 'Visits by Nepal start hour — only hours they have actually played.',
  })
  hourGames!: CustomerHourBucketModel[];

  // ─── Trend ────────────────────────────────────────────────────────────────
  @Field(() => [CustomerMonthModel], { description: 'The last 12 Nepal months, oldest first.' })
  monthlyPlay!: CustomerMonthModel[];

  @Field(() => CustomerLoyaltyModel) loyalty!: CustomerLoyaltyModel;
}
