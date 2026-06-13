import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class InviteVenueInput {
  @Field({ description: 'Where the setup link will be sent.' })
  @IsEmail()
  @MaxLength(120)
  email!: string;

  @Field({ nullable: true, description: 'Optional — pre-fills the owner record.' })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  fullName?: string;

  @Field({ nullable: true, description: 'Optional — pre-fills the owner record.' })
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phoneNumber?: string;
}

@InputType()
export class AcceptVenueInvitationInput {
  @Field({ description: 'The token from the email link (format: <id>.<secret>).' })
  @IsString()
  @MinLength(20)
  @MaxLength(200)
  token!: string;

  @Field({ description: 'New password — 8 characters minimum.' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password!: string;
}

@InputType()
export class RevokeVenueInvitationInput {
  @Field(() => ID)
  @IsString()
  invitationId!: string;
}

@InputType()
export class ResendVenueInvitationInput {
  @Field(() => ID)
  @IsString()
  invitationId!: string;
}
