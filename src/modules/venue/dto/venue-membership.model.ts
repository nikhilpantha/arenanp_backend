import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  MembershipStatus,
  VenueMemberRole,
  VenueMembership as PrismaMembership,
  Venue as PrismaVenue,
  VenueVerificationStatus,
} from '@prisma/client';

import '../../../common/enums';
import { effectivePermissions } from '../../../common/constants/permissions';

/**
 * The signed-in user's seat in a venue, with the effective permission set
 * (role defaults ∪ overrides) and the venue's listing status. This is what the
 * mobile app reads to build its panels + permission-gated tabs.
 */
@ObjectType()
export class VenueMembershipModel {
  @Field(() => ID) venueId!: string;
  @Field() venueName!: string;
  @Field(() => VenueMemberRole) role!: VenueMemberRole;
  @Field(() => [String]) permissions!: string[];
  @Field(() => MembershipStatus) status!: MembershipStatus;
  @Field(() => VenueVerificationStatus) verificationStatus!: VenueVerificationStatus;
}

type MembershipWithVenue = PrismaMembership & {
  venue: Pick<PrismaVenue, 'name' | 'verificationStatus'>;
};

export function mapMembershipToGraphql(m: MembershipWithVenue): VenueMembershipModel {
  return {
    venueId: m.venueId,
    venueName: m.venue.name,
    role: m.role,
    permissions: effectivePermissions(m.role, m.permissions),
    status: m.status,
    verificationStatus: m.venue.verificationStatus,
  };
}
