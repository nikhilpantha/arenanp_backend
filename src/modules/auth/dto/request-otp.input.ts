import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

@InputType()
export class RequestOtpInput {
  @Field()
  @IsString()
  @Length(7, 20)
  phoneNumber!: string;

  /// Optional — set on first sign-up so the account can later log in with a
  /// password too. Ignored if the account already has a password.
  @Field({ nullable: true, description: 'Optional password to set on first sign-up (min 8).' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(200)
  password?: string;
}
