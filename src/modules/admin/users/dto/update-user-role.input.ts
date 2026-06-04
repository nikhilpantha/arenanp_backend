import { Field, ID, InputType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => ID)
  @IsString()
  userId!: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role!: UserRole;
}
