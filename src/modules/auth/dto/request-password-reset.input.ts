import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

/// Start password recovery on a number that already has an account. No
/// password here on purpose — the new one is only accepted once the code
/// texted to this number has been verified.
@InputType()
export class RequestPasswordResetInput {
  @Field()
  @IsString()
  @Length(7, 20)
  phoneNumber!: string;
}
