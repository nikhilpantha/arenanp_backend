import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field({ description: 'The password they are signing in with today.' })
  @IsString()
  @MinLength(1, { message: 'Enter your current password.' })
  currentPassword!: string;

  @Field({ description: 'The new password. Must not be the current one.' })
  @IsString()
  @MinLength(8, { message: 'Use at least 8 characters.' })
  @MaxLength(128)
  newPassword!: string;
}
