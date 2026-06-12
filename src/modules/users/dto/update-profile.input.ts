import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length, MaxLength } from 'class-validator';

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

  /** S3 object key returned by the `createUploadUrl` mutation (UploadCategory.AVATAR). */
  @Field({ nullable: true, description: 'S3 object key from createUploadUrl (category AVATAR).' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  avatarUrl?: string;
}
