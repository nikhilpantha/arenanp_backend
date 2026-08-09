import { Field, ID, InputType } from '@nestjs/graphql';
import { MembershipStatus, VenueMemberRole } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import '../../../common/enums';

/**
 * Every input carries `venueId` at the top level, which is what
 * `VenuePermissionGuard` reads (`args.venueId ?? args.input.venueId`). Burying
 * it in a nested object would silently disable the guard.
 */

@InputType()
export class PreviewStaffLoginInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field({ description: 'What the owner has typed so far — the address follows from it.' })
  @IsString()
  @MaxLength(120)
  fullName!: string;

  @Field({ nullable: true, description: 'Checked against existing accounts once it looks whole.' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;
}

@InputType()
export class CreateVenueStaffInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field() @IsString() @MinLength(2) @MaxLength(120) fullName!: string;

  @Field({
    description: 'Their real Nepali mobile. Also how we recognise an account they already have.',
  })
  @IsString()
  @MaxLength(20)
  phoneNumber!: string;

  @Field(() => VenueMemberRole)
  @IsEnum(VenueMemberRole)
  role!: VenueMemberRole;

  @Field({
    nullable: true,
    description:
      'Starter password for a newly minted login. Omit and the server generates a strong one. Ignored entirely when attaching an existing account — that person keeps their own password.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  password?: string;

  @Field({
    nullable: true,
    description:
      "Set once the owner has confirmed they mean to give an existing Arena NP account access to this venue. Without it, a mobile that matches someone else's account is refused rather than acted on.",
  })
  @IsOptional()
  @IsBoolean()
  attachExistingConfirmed?: boolean;

  @Field({
    nullable: true,
    description: 'Switch a suspended seat back on instead of refusing as a duplicate.',
  })
  @IsOptional()
  @IsBoolean()
  reactivate?: boolean;
}

@InputType()
export class UpdateVenueStaffInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;

  @Field(() => VenueMemberRole, { nullable: true })
  @IsOptional()
  @IsEnum(VenueMemberRole)
  role?: VenueMemberRole;
}

@InputType()
export class SetVenueStaffStatusInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;

  @Field(() => MembershipStatus, { description: 'ACTIVE or SUSPENDED.' })
  @IsEnum(MembershipStatus)
  status!: MembershipStatus;
}

@InputType()
export class RemoveVenueStaffInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;
}

@InputType()
export class ResetVenueStaffPasswordInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;

  @Field({ nullable: true, description: 'Omit and the server generates a strong one.' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  password?: string;
}

@InputType()
export class VenueStaffActivityInput {
  @Field(() => ID) @IsString() venueId!: string;
  @Field(() => ID) @IsString() membershipId!: string;

  @Field({ nullable: true, description: 'Defaults to 30 days ago.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @Field({ nullable: true, description: 'Defaults to now.' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;
}
