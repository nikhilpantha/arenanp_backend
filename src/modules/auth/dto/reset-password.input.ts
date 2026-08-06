import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length, MaxLength, MinLength } from 'class-validator';

/// Final step of password recovery: the ticket earned by verifying the code,
/// traded for a new password.
@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  @Length(7, 20)
  phoneNumber!: string;

  @Field({ description: 'The single-use token returned by verifyPasswordResetCode.' })
  @IsString()
  @Length(16, 200)
  resetToken!: string;

  @Field({ description: 'The new password (min 8 characters).' })
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  newPassword!: string;
}
