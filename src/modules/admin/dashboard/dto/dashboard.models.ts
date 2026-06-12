import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

// Side-effect import to register existing GraphQL enums.
import '../../../../common/enums';

@ObjectType({ description: 'Top-line KPI numbers for the super-admin dashboard.' })
export class AdminDashboardKpis {
  @Field(() => Int) totalUsers!: number;
  @Field(() => Int) totalVenues!: number;
  @Field(() => Int) totalBookings!: number;
  @Field(() => Float) totalRevenue!: number;
  @Field(() => Int) pendingOrganizerVerifications!: number;
  @Field(() => Int) pendingVenueApprovals!: number;
  @Field(() => Int) pendingRefunds!: number;
  @Field(() => Int) activeTournaments!: number;
  @Field(() => Int) todayBookings!: number;
}

@ObjectType()
export class BookingTrendPoint {
  @Field() date!: string;
  @Field(() => Int) bookings!: number;
}

@ObjectType()
export class RevenueTrendPoint {
  @Field() date!: string;
  @Field(() => Float) revenue!: number;
}

@ObjectType({ description: 'Compact booking row for the dashboard recent-bookings table.' })
export class RecentBookingItem {
  @Field() id!: string;
  @Field({ nullable: true }) userFullName?: string;
  @Field({ nullable: true }) venueName?: string;
  @Field({ nullable: true }) sport?: string;
  @Field(() => Float) amount!: number;
  @Field() status!: string;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'Compact payment row for the dashboard recent-payments table.' })
export class RecentPaymentItem {
  @Field() id!: string;
  @Field({ nullable: true }) userFullName?: string;
  @Field({ nullable: true }) provider?: string;
  @Field(() => Float) amount!: number;
  @Field() status!: string;
  @Field() createdAt!: Date;
}

@ObjectType()
export class PopularSportItem {
  @Field() sport!: string;
  @Field(() => Int) bookings!: number;
}

@ObjectType()
export class PopularCityItem {
  @Field() city!: string;
  @Field(() => Int) bookings!: number;
}

@ObjectType({
  description:
    'Aggregated dashboard payload returned to the super-admin home. Counts/lists for entities not yet implemented (venue, booking, payment, tournament) are returned as 0 / [] until those modules land.',
})
export class AdminDashboardOverview {
  @Field(() => AdminDashboardKpis) kpis!: AdminDashboardKpis;
  @Field(() => [RecentBookingItem]) recentBookings!: RecentBookingItem[];
  @Field(() => [RecentPaymentItem]) recentPayments!: RecentPaymentItem[];
  @Field(() => [BookingTrendPoint]) bookingTrend!: BookingTrendPoint[];
  @Field(() => [RevenueTrendPoint]) revenueTrend!: RevenueTrendPoint[];
  @Field(() => [PopularSportItem]) popularSports!: PopularSportItem[];
  @Field(() => [PopularCityItem]) popularCities!: PopularCityItem[];
}
