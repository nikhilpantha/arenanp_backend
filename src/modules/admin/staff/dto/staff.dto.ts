import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { UserRole, OverrideAction } from '@prisma/client';

// ─── Inputs ─────────────────────────────────────────────────────────────────

@InputType()
export class CreateStaffInput {
  @Field()
  phoneNumber!: string;

  @Field(() => UserRole)
  platformStaffRole!: UserRole;
}

@InputType()
export class ChangeStaffRoleInput {
  @Field(() => UserRole)
  newRole!: UserRole;
}

@InputType()
export class GrantPermissionOverrideInput {
  @Field()
  permission!: string;

  @Field(() => OverrideAction)
  action!: OverrideAction;

  @Field({ nullable: true })
  reason?: string;

  @Field({ nullable: true })
  expiresAt?: Date;
}

@InputType()
export class ListStaffInput {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @Field({ nullable: true })
  isActive?: boolean;
}

// ─── Objects ────────────────────────────────────────────────────────────────

@ObjectType()
export class StaffMember {
  @Field()
  id!: string;

  @Field()
  phoneNumber!: string;

  @Field(() => String, { nullable: true })
  fullName?: string | null;

  @Field(() => String, { nullable: true })
  email?: string | null;

  @Field(() => UserRole)
  role!: UserRole;

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;

  @Field(() => Int)
  overrideCount!: number;
}

@ObjectType()
export class StaffPermissionOverride {
  @Field()
  permission!: string;

  @Field(() => OverrideAction)
  action!: OverrideAction;

  @Field(() => String, { nullable: true })
  reason?: string | null;

  @Field(() => Date, { nullable: true })
  expiresAt?: Date | null;
}

@ObjectType()
export class ListStaffOutput {
  @Field(() => [StaffMember])
  items!: StaffMember[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  limit!: number;

  @Field(() => Int)
  offset!: number;
}

@ObjectType()
export class StaffPermissions {
  @Field(() => UserRole)
  baseRole!: UserRole;

  @Field(() => [String])
  permissions!: string[];

  @Field(() => [StaffPermissionOverride])
  overrides!: StaffPermissionOverride[];
}
