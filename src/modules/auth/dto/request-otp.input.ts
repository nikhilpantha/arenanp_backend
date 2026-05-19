import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class RequestOtpInput {
  @Field()
  @IsString()
  @Length(7, 20)
  phoneNumber!: string;
}
