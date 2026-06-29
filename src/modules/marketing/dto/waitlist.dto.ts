import { IsEmail, IsOptional, IsString } from 'class-validator';

export class JoinWaitlistDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  source?: string; /// Where they came from
}

export class VerifyEmailDto {
  @IsString()
  token!: string;
}

export class WaitlistResponseDto {
  id!: string;
  email!: string;
  joinedAt!: Date;
  isVerified!: boolean;
  message!: string;
}

export class VerifyEmailResponseDto {
  success!: boolean;
  email!: string;
}
