import { Field, Float, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MembershipStatus, PayBasis, VenueMemberRole } from '@prisma/client';

import '../../../common/enums';

/** What actually happened when the owner submitted the add-staff form. */
export enum StaffCreateOutcome {
  /** A brand-new login was minted; `credentials` carries it. */
  CREATED_ACCOUNT = 'CREATED_ACCOUNT',
  /** The mobile already had an Arena NP account, so it got a seat instead. */
  ATTACHED_EXISTING = 'ATTACHED_EXISTING',
  /** They had a suspended seat here already; it was switched back on. */
  REACTIVATED = 'REACTIVATED',
}
registerEnumType(StaffCreateOutcome, {
  name: 'StaffCreateOutcome',
  description:
    'How a staff seat came to be: a new login was minted, an existing account was attached, or a suspended seat was reactivated.',
});

@ObjectType({ description: 'One person with a seat at this venue.' })
export class VenueStaffMember {
  @Field(() => ID) membershipId!: string;
  @Field(() => ID) userId!: string;

  @Field({ nullable: true }) fullName?: string;
  @Field() phoneNumber!: string;

  @Field(() => VenueMemberRole) role!: VenueMemberRole;
  @Field(() => MembershipStatus) status!: MembershipStatus;
  @Field(() => [String], { description: 'Effective set: role defaults ∪ per-seat overrides.' })
  permissions!: string[];

  @Field({
    nullable: true,
    description:
      "The address the venue minted for them. Null for an attached personal account — the owner typed that person's phone number, not their email, and it stays that way.",
  })
  loginEmail?: string;

  @Field({ description: 'The venue minted this login, rather than attaching an existing account.' })
  provisionedUser!: boolean;

  @Field({ description: "They haven't replaced the password the owner set for them yet." })
  mustChangePassword!: boolean;

  @Field({ description: 'This row is the person looking at the screen.' })
  isSelf!: boolean;

  @Field({ description: 'The venue is legally theirs — they can never be removed or demoted.' })
  isPrimaryOwner!: boolean;

  @Field(() => PayBasis, {
    nullable: true,
    description:
      'How they are paid. Null for anyone not on a wage — a one-off helper still gets payments recorded, just with nothing expected.',
  })
  payBasis?: PayBasis;

  @Field(() => Float, { nullable: true, description: 'Per month, per day or per session.' })
  payRate?: number;

  @Field({ nullable: true }) lastLoginAt?: Date;
  @Field() createdAt!: Date;
}

@ObjectType({ description: 'A newly minted login. Shown once and never retrievable again.' })
export class StaffCredentials {
  @Field() loginEmail!: string;
  @Field() password!: string;
}

@ObjectType()
export class CreateVenueStaffResult {
  @Field(() => VenueStaffMember) member!: VenueStaffMember;
  @Field(() => StaffCreateOutcome) outcome!: StaffCreateOutcome;
  @Field(() => StaffCredentials, {
    nullable: true,
    description: 'Only present when a new login was minted. Never for an attached account.',
  })
  credentials?: StaffCredentials;
}

@ObjectType({
  description:
    "What the add-staff form would do if submitted as typed — so the owner sees the login before it exists, and is warned before they hand a stranger's account access to their venue.",
})
export class StaffLoginPreview {
  @Field({ nullable: true, description: 'The address that would be minted. Null when attaching.' })
  loginEmail?: string;

  @Field({
    description:
      'This mobile already has an Arena NP account. Adding them gives THAT account access, and they keep their own password.',
  })
  phoneBelongsToExistingAccount!: boolean;

  @Field({ description: 'They already hold a seat at this venue.' })
  alreadyOnStaff!: boolean;

  @Field(() => VenueMemberRole, { nullable: true }) existingRole?: VenueMemberRole;
  @Field(() => MembershipStatus, { nullable: true }) existingStatus?: MembershipStatus;
}
