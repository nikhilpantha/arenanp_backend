import { Field, ID, ObjectType, Float, Int, registerEnumType } from '@nestjs/graphql';
import { User as PrismaUser, OrganizerStatus, UserRole, VenueOwnerStatus } from '@prisma/client';

// Side-effect import: registers shared enums (UserRole / OrganizerStatus / VenueOwnerStatus).
import '../../../../common/enums';

/**
 * Admin-facing view of a user. Same shape as the public `User` model but lives
 * in the admin namespace so we can evolve the two independently (e.g. expose
 * audit fields here that we never want on the public API).
 */
@ObjectType()
export class AdminUser {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) fullName?: string;
  @Field() phoneNumber!: string;
  @Field({ nullable: true }) email?: string;
  @Field(() => UserRole) role!: UserRole;
  @Field(() => OrganizerStatus) organizerStatus!: OrganizerStatus;
  @Field(() => VenueOwnerStatus) venueOwnerStatus!: VenueOwnerStatus;
  @Field({ nullable: true }) avatarUrl?: string;
  @Field() isActive!: boolean;
  @Field({ nullable: true }) lastLoginAt?: Date;
  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

@ObjectType({ description: 'Compact booking summary for the user-detail drawer.' })
export class AdminUserBookingSummary {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) venueName?: string;
  @Field({ nullable: true }) sport?: string;
  @Field(() => Float) amount!: number;
  @Field() status!: string;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'Compact payment summary for the user-detail drawer.' })
export class AdminUserPaymentSummary {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) provider?: string;
  @Field(() => Float) amount!: number;
  @Field() status!: string;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'Compact team/clan summary for the user-detail drawer.' })
export class AdminUserTeamSummary {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) sport?: string;
  @Field({ nullable: true }) role?: string;
}

@ObjectType({
  description:
    'Full detail payload for the user-detail drawer. Related collections (bookings, payments, teams) return [] until those modules ship.',
})
export class AdminUserDetail {
  @Field(() => AdminUser) user!: AdminUser;
  @Field(() => Int) bookingsCount!: number;
  @Field(() => Float) totalSpent!: number;
  @Field(() => [AdminUserBookingSummary]) recentBookings!: AdminUserBookingSummary[];
  @Field(() => [AdminUserPaymentSummary]) recentPayments!: AdminUserPaymentSummary[];
  @Field(() => [AdminUserTeamSummary]) teams!: AdminUserTeamSummary[];
}

export function mapPrismaUserToAdmin(user: PrismaUser): AdminUser {
  return {
    id: user.id,
    fullName: user.fullName ?? undefined,
    phoneNumber: user.phoneNumber,
    email: user.email ?? undefined,
    role: user.role,
    organizerStatus: user.organizerStatus,
    venueOwnerStatus: user.venueOwnerStatus,
    avatarUrl: user.avatarUrl ?? undefined,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt ?? undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/** Sort options exposed on the admin user list. */
export enum AdminUserSortField {
  CREATED_AT = 'CREATED_AT',
  FULL_NAME = 'FULL_NAME',
  LAST_LOGIN_AT = 'LAST_LOGIN_AT',
}

registerEnumType(AdminUserSortField, {
  name: 'AdminUserSortField',
  description: 'Fields the admin user list can be sorted by.',
});

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Ascending / descending sort order.',
});
