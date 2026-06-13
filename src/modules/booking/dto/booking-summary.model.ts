import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: "Top-of-screen overview numbers for a venue's bookings." })
export class VenueBookingSummary {
  @Field(() => Int) bookingsToday!: number;
  @Field(() => Float) revenueToday!: number;
  @Field(() => Int) pendingPayments!: number;
}
