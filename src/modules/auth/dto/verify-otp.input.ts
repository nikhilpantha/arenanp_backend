import { Field, InputType } from '@nestjs/graphql';
import { IsNumberString, IsString, Length } from 'class-validator';

@InputType()
export class VerifyOtpInput {
  @Field()
  @IsString()
  @Length(7, 20)
  phoneNumber!: string;

  @Field()
  @IsNumberString()
  @Length(4, 8)
  code!: string;
}
