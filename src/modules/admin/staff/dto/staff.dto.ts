import { InputType, Field, ObjectType, Int, ID } from '@nestjs/graphql';
import { PermissionScopeType, StaffStatus, UserRole } from '@prisma/client';
import { IsOptional, IsNumber, IsEnum, IsBoolean, IsString, IsArray } from 'class-validator';

import { StaffPermissionObject } from '../../../rbac/dto/rbac.types';

// ─── Inputs ─────────────────────────────────────────────────────────────────

/**
 * Create a staff member.
 *
 * No role is assigned — every staff member is an admin of their scope, and what
 * they can actually do is granted afterwards on the permissions screen.
 * `permissionKeys` is an optional convenience so the create form can seed an
 * initial set in the same call.
 */
@InputType()
export class CreateStaffInput {
  @Field()
  @IsString()
  email!: string;

  @Field()
  @IsString()
  fullName!: string;

  @Field(() => PermissionScopeType, {
    description: 'Whether this admin runs the platform, a single venue, or a single tournament.',
  })
  @IsEnum(PermissionScopeType)
  scopeType!: PermissionScopeType;

  @Field(() => ID, {
    nullable: true,
    description: 'Venue or tournament id. Required unless scopeType is PLATFORM.',
  })
  @IsOptional()
  @IsString()
  scopeId?: string;

  @Field(() => [String], {
    nullable: true,
    description: 'Optional starting permissions. Can be left empty and granted later.',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissionKeys?: string[];
}

@InputType()
export class ListStaffInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  offset?: number;

  @Field(() => PermissionScopeType, {
    nullable: true,
    description: 'Filter to admins of one scope type.',
  })
  @IsOptional()
  @IsEnum(PermissionScopeType)
  scopeType?: PermissionScopeType;

  @Field(() => ID, { nullable: true, description: 'Filter to admins of one venue or tournament.' })
  @IsOptional()
  @IsString()
  scopeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// ─── Objects ────────────────────────────────────────────────────────────────

/** Where a staff member is an admin. */
@ObjectType()
export class StaffAssignment {
  @Field(() => PermissionScopeType)
  scopeType!: PermissionScopeType;

  @Field({ description: 'Venue or tournament id; empty string for platform admins.' })
  scopeId!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Venue or tournament name, resolved for display.',
  })
  scopeName?: string | null;

  @Field(() => StaffStatus)
  status!: StaffStatus;

  @Field(() => Int, { description: 'How many permissions they hold in this scope.' })
  permissionCount!: number;
}

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

  /**
   * Legacy platform enum, kept only as a coarse marker: SUPER_ADMIN is
   * unrestricted, everyone else is ADMIN. Never branch on it for authorization
   * — read the permission grants instead.
   */
  @Field(() => UserRole, {
    deprecationReason: 'Authorization comes from permission grants; this is only a staff marker.',
  })
  role!: UserRole;

  @Field(() => [StaffAssignment], {
    description: 'Scopes this person administers, with a permission count for each.',
  })
  assignments!: StaffAssignment[];

  @Field()
  isActive!: boolean;

  @Field()
  createdAt!: Date;
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

/** A staff member's effective access in one scope. */
@ObjectType()
export class StaffPermissionsView {
  @Field(() => [StaffPermissionObject], { description: 'The individual grants.' })
  grants!: StaffPermissionObject[];

  @Field(() => [String], {
    description: 'Effective permission keys. `["*"]` means unrestricted (super admin).',
  })
  permissions!: string[];
}
