import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length, MaxLength } from 'class-validator';

/// Phone + password login (mobile). Only works once the phone has been verified
/// via OTP at least once — the very first sign-in must be OTP.
@InputType()
export class LoginWithPhoneInput {
  @Field()
  @IsString()
  @Length(7, 20)
  phoneNumber!: string;

  @Field()
  @IsString()
  @MaxLength(200)
  password!: string;
}
