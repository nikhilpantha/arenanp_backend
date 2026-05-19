import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as PrismaUser, OrganizerStatus, UserRole, VenueOwnerStatus } from '@prisma/client';

// Side-effect import: registers UserRole / OrganizerStatus / VenueOwnerStatus with GraphQL.
import '../../../common/enums';

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

  @Field(() => OrganizerStatus)
  organizerStatus!: OrganizerStatus;

  @Field(() => VenueOwnerStatus)
  venueOwnerStatus!: VenueOwnerStatus;

  @Field({ nullable: true })
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

export function mapUserToGraphql(user: PrismaUser): User {
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
