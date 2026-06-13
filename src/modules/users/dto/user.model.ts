import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CapabilityStatus,
  CapabilityType,
  User as PrismaUser,
  UserCapability,
  UserRole,
} from '@prisma/client';

// Side-effect import: registers UserRole / CapabilityType / CapabilityStatus with GraphQL.
import '../../../common/enums';

/** One capability grant on the public user model. */
@ObjectType()
export class UserCapabilityModel {
  @Field(() => CapabilityType) type!: CapabilityType;
  @Field(() => CapabilityStatus) status!: CapabilityStatus;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field()
  phoneNumber!: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => UserRole)
  role!: UserRole;

  @Field(() => [UserCapabilityModel])
  capabilities!: UserCapabilityModel[];

  /** Convenience: VENUE capability status, derived from `capabilities`. */
  @Field(() => CapabilityStatus)
  venueStatus!: CapabilityStatus;

  /** Convenience: ORGANIZER capability status, derived from `capabilities`. */
  @Field(() => CapabilityStatus)
  organizerStatus!: CapabilityStatus;

  /**
   * Stored S3 object *key* (not a URL). Exposed to GraphQL as `avatarUrl` via a
   * field resolver on UsersResolver that presigns it into a temporary download URL.
   */
  avatarUrl?: string;

  @Field()
  isActive!: boolean;

  @Field({ nullable: true })
  lastLoginAt?: Date;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}

type PrismaUserWithCapabilities = PrismaUser & { capabilities?: UserCapability[] };

export function mapUserToGraphql(user: PrismaUserWithCapabilities): User {
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
