import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { PayBasis, VenueMemberRole } from '@prisma/client';

import '../../../common/enums';

@ObjectType({ description: "One staff member's pay position for a period." })
export class StaffSalaryRow {
  @Field(() => ID) membershipId!: string;
  @Field({ nullable: true }) fullName?: string;
  @Field(() => VenueMemberRole) role!: VenueMemberRole;

  @Field(() => PayBasis, { nullable: true, description: 'Null for anyone not on a wage.' })
  basis?: PayBasis;
  @Field(() => Float, { nullable: true, description: 'Per month, per day or per session.' })
  rate?: number;

  @Field(() => Float, {
    nullable: true,
    description:
      'What is owed for the period. NULL — not zero — for daily and per-session staff until a count is entered, because nothing here records days worked and a confident zero would be a lie.',
  })
  committed?: number;

  @Field(() => Float, { description: 'Paid against this period so far.' })
  paid!: number;

  @Field(() => Float, {
    nullable: true,
    description: 'committed − paid, floored at zero. Null whenever `committed` is.',
  })
  due?: number;

  @Field(() => Float, {
    nullable: true,
    description: 'Days worked or sessions run, as entered when settling up.',
  })
  quantity?: number;

  @Field(() => Int, { description: 'How many payments make up `paid` — advances show as several.' })
  paymentCount!: number;
}

@ObjectType({ description: "A venue's salary position for one pay period." })
export class VenueSalaryPeriod {
  @Field({ description: 'First day of the period, "yyyy-mm-dd".' }) periodStart!: string;
  @Field({ description: 'Human label, e.g. "August 2026".' }) label!: string;

  @Field(() => [StaffSalaryRow]) rows!: StaffSalaryRow[];

  @Field(() => Float, {
    description: 'Total owed for the period across everyone whose pay can be worked out.',
  })
  committedTotal!: number;
  @Field(() => Float) paidTotal!: number;
  @Field(() => Float, { description: 'The "you owe staff" figure. Monthly staff only.' })
  dueTotal!: number;

  @Field(() => Int, {
    description:
      'People on a daily or per-session rate with no count entered yet — they are excluded from the totals, and the screen says so rather than quietly under-reporting.',
  })
  uncountedStaff!: number;
}
