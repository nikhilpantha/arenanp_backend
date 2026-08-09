import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  MembershipStatus,
  VenueMemberRole,
  VenueMembership as PrismaMembership,
  Venue as PrismaVenue,
  VenueVerificationStatus,
} from '@prisma/client';

import '../../../common/enums';

/**
 * The signed-in user's seat in a venue, with the permissions they actually hold
 * there and the venue's listing status. This is what the mobile app reads to
 * build its panels + permission-gated tabs.
 *
 * `permissions` is resolved from `staff_permissions` by the caller, not derived
 * from `role` — the role field is a display label with no authority.
 */
@ObjectType()
export class VenueMembershipModel {
  @Field(() => ID) venueId!: string;
  @Field() venueName!: string;
  @Field(() => VenueMemberRole, {
    deprecationReason: 'Display label only — authorization comes from `permissions`.',
  })
  role!: VenueMemberRole;
  @Field(() => [String], {
    description:
      'Permissions held at this venue. `["*"]` means unrestricted (owner or super admin).',
  })
  permissions!: string[];
  @Field(() => MembershipStatus) status!: MembershipStatus;
  @Field(() => VenueVerificationStatus) verificationStatus!: VenueVerificationStatus;
}

type MembershipWithVenue = PrismaMembership & {
  venue: Pick<PrismaVenue, 'name' | 'verificationStatus' | 'primaryOwnerId'>;
};

/**
 * @param permissions Effective permissions at this venue, resolved from
 *   `staff_permissions` by the caller. Never derive these from `m.role`.
 */
export function mapMembershipToGraphql(
  m: MembershipWithVenue,
  permissions: string[],
): VenueMembershipModel {
  return {
    venueId: m.venueId,
    venueName: m.venue.name,
    role: m.role,
    permissions,
    status: m.status,
    verificationStatus: m.venue.verificationStatus,
  };
}
