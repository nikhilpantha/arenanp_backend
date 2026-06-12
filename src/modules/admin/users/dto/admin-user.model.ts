import { Field, ID, ObjectType, Float, Int, registerEnumType } from '@nestjs/graphql';
import {
  CapabilityStatus,
  CapabilityType,
  User as PrismaUser,
  UserCapability,
  UserRole,
} from '@prisma/client';

// Side-effect import: registers shared enums (UserRole / CapabilityType / CapabilityStatus).
import '../../../../common/enums';

/** One capability grant on the admin user view. */
@ObjectType()
export class AdminUserCapability {
  @Field(() => CapabilityType) type!: CapabilityType;
  @Field(() => CapabilityStatus) status!: CapabilityStatus;
}

/**
 * Admin-facing view of a user. Capabilities (VENUE / ORGANIZER / COACH) live in
 * the `capabilities` array; `venueStatus` / `organizerStatus` are convenience
 * fields derived from it for list filtering + display.
 */
@ObjectType()
export class AdminUser {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) fullName?: string;
  @Field() phoneNumber!: string;
  @Field({ nullable: true }) email?: string;
  @Field(() => UserRole) role!: UserRole;
  @Field(() => [AdminUserCapability]) capabilities!: AdminUserCapability[];
  @Field(() => CapabilityStatus) venueStatus!: CapabilityStatus;
  @Field(() => CapabilityStatus) organizerStatus!: CapabilityStatus;
  /** Stored S3 object key; presigned to a download URL by AdminUsersResolver. */
  avatarUrl?: string;
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

/** A user row with its capability grants — the input shape `mapPrismaUserToAdmin` expects. */
export type PrismaUserWithCapabilities = PrismaUser & { capabilities?: UserCapability[] };

export function mapPrismaUserToAdmin(user: PrismaUserWithCapabilities): AdminUser {
  const caps = user.capabilities ?? [];
  const statusOf = (type: CapabilityType): CapabilityStatus =>
    caps.find((c) => c.type === type)?.status ?? CapabilityStatus.NOT_REQUESTED;
  return {
    id: user.id,
    fullName: user.fullName ?? undefined,
    phoneNumber: user.phoneNumber,
    email: user.email ?? undefined,
    role: user.role,
    capabilities: caps.map((c) => ({ type: c.type, status: c.status })),
    venueStatus: statusOf(CapabilityType.VENUE),
    organizerStatus: statusOf(CapabilityType.ORGANIZER),
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
