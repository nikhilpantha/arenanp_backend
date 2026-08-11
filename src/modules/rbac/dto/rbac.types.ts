import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { PermissionDomain, PermissionScopeType } from '@prisma/client';

@ObjectType()
export class PermissionObject {
  @Field(() => ID)
  id!: string;

  @Field()
  key!: string;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => PermissionDomain)
  domain!: PermissionDomain;
}

/** One permission granted to one staff member within one scope. */
@ObjectType()
export class StaffPermissionObject {
  @Field(() => ID)
  id!: string;

  @Field()
  userId!: string;

  @Field()
  permissionKey!: string;

  @Field(() => PermissionObject)
  permission!: PermissionObject;

  @Field(() => PermissionScopeType)
  scopeType!: PermissionScopeType;

  @Field({ description: 'Venue or tournament id; empty string for platform-wide grants.' })
  scopeId!: string;

  @Field(() => Date, { nullable: true, description: 'Null means the grant never expires.' })
  expiresAt?: Date | null;

  @Field(() => String, { nullable: true })
  reason?: string | null;

  @Field()
  grantedById!: string;

  @Field()
  grantedAt!: Date;
}

/** A scope a staff member holds grants in, with how many they hold there. */
@ObjectType()
export class PermissionScopeObject {
  @Field(() => PermissionScopeType)
  scopeType!: PermissionScopeType;

  @Field()
  scopeId!: string;

  @Field(() => Int)
  permissionCount!: number;
}

@ObjectType()
export class EffectivePermissionsObject {
  @Field(() => [String], {
    description:
      'Effective platform permission keys for the current user. `["*"]` means unrestricted (super admin).',
  })
  permissions!: string[];

  @Field(() => [PermissionScopeObject], {
    description: 'Every scope the user holds grants in, platform and per venue/tournament.',
  })
  scopes!: PermissionScopeObject[];
}
