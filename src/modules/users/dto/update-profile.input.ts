import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUrl, Length } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUrl({ require_tld: false })
  avatarUrl?: string;
}
