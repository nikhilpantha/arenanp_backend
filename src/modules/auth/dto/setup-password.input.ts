import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class SetupPasswordInput {
  @Field()
  @IsString()
  token!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(128, { message: 'Password must be at most 128 characters' })
  password!: string;
}
