import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VenueOwnerInvitation as PrismaInvitation } from '@prisma/client';

import '../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../admin/users/dto/admin-user.model';

@ObjectType({ description: 'Admin-facing view of a pending / accepted venue-owner invitation.' })
export class VenueOwnerInvitation {
  @Field(() => ID) id!: string;
  @Field() email!: string;
  @Field({ nullable: true }) fullName?: string;
  @Field({ nullable: true }) phoneNumber?: string;

  @Field() expiresAt!: Date;
  @Field({ nullable: true }) acceptedAt?: Date;

  @Field(() => AdminUser) invitedBy!: AdminUser;
  @Field(() => AdminUser, { nullable: true }) createdUser?: AdminUser;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

@ObjectType({
  description:
    'Returned right after an invitation is created. `setupUrl` is only populated for the stub mail provider so dev admins can click straight through.',
})
export class CreateInvitationResult {
  @Field(() => VenueOwnerInvitation) invitation!: VenueOwnerInvitation;
  @Field({ nullable: true, description: 'Only set when MAIL_PROVIDER=stub.' })
  setupUrl?: string;
}

@ObjectType({
  description: 'Pre-form check the public setup page calls to validate the token.',
})
export class InvitationVerification {
  @Field() valid!: boolean;
  @Field({
    nullable: true,
    description: 'When invalid, a user-facing reason (expired, accepted, missing).',
  })
  reason?: string;
  @Field({ nullable: true }) email?: string;
  @Field({ nullable: true }) fullName?: string;
  @Field({ nullable: true }) phoneNumber?: string;
}

type InvitationWithRelations = PrismaInvitation & {
  invitedBy: Parameters<typeof mapPrismaUserToAdmin>[0];
  createdUser?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

export function mapInvitationToGraphql(row: InvitationWithRelations): VenueOwnerInvitation {
  return {
    id: row.id,
    email: row.email,
    fullName: row.fullName ?? undefined,
    phoneNumber: row.phoneNumber ?? undefined,
    expiresAt: row.expiresAt,
    acceptedAt: row.acceptedAt ?? undefined,
    invitedBy: mapPrismaUserToAdmin(row.invitedBy),
    createdUser: row.createdUser ? mapPrismaUserToAdmin(row.createdUser) : undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
