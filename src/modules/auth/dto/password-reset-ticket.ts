import { Field, Int, ObjectType } from '@nestjs/graphql';

/// Proof that a password-reset code was just verified. Single use, short
/// lived, and worthless on its own — it only unlocks `resetPassword` for the
/// same number.
@ObjectType()
export class PasswordResetTicket {
  @Field({ description: 'Pass this back to resetPassword. Valid once.' })
  resetToken!: string;

  @Field(() => Int, { description: 'How long the ticket stays usable.' })
  expiresInSeconds!: number;
}
