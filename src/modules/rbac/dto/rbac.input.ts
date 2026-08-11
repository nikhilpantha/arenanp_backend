import { InputType, Field, ID } from '@nestjs/graphql';
import { PermissionScopeType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

/**
 * Which scope a grant applies to.
 *
 * `scopeId` is the venue or tournament id, and is required unless `scopeType`
 * is PLATFORM.
 */
@InputType()
export class PermissionScopeInput {
  @Field(() => PermissionScopeType)
  @IsEnum(PermissionScopeType)
  scopeType!: PermissionScopeType;

  @Field(() => ID, {
    nullable: true,
    description: 'Venue or tournament id. Omit for platform-wide permissions.',
  })
  @IsOptional()
  @IsString()
  scopeId?: string;
}

@InputType()
export class SetStaffPermissionsInput {
  @Field(() => ID)
  @IsString()
  userId!: string;

  // Nested inputs need both decorators, or the global whitelisting
  // ValidationPipe strips the object and rejects the request.
  @Field(() => PermissionScopeInput)
  @ValidateNested()
  @Type(() => PermissionScopeInput)
  scope!: PermissionScopeInput;

  @Field(() => [String], {
    description: 'The complete set for this scope — anything omitted is revoked.',
  })
  @IsArray()
  @IsString({ each: true })
  permissionKeys!: string[];
}

@InputType()
export class GrantStaffPermissionInput {
  @Field(() => ID)
  @IsString()
  userId!: string;

  @Field()
  @IsString()
  permissionKey!: string;

  // Nested inputs need both decorators, or the global whitelisting
  // ValidationPipe strips the object and rejects the request.
  @Field(() => PermissionScopeInput)
  @ValidateNested()
  @Type(() => PermissionScopeInput)
  scope!: PermissionScopeInput;

  @Field(() => Date, { nullable: true, description: 'Optional expiry for temporary access.' })
  @IsOptional()
  expiresAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  reason?: string;
}

@InputType()
export class RevokeStaffPermissionInput {
  @Field(() => ID)
  @IsString()
  userId!: string;

  @Field()
  @IsString()
  permissionKey!: string;

  // Nested inputs need both decorators, or the global whitelisting
  // ValidationPipe strips the object and rejects the request.
  @Field(() => PermissionScopeInput)
  @ValidateNested()
  @Type(() => PermissionScopeInput)
  scope!: PermissionScopeInput;
}
