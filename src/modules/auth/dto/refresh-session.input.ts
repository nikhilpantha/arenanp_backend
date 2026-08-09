import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class RefreshSessionInput {
  /**
   * The phone app passes its stored token here. Browsers leave this empty — theirs
   * travels as an httpOnly cookie, which is the whole reason page JavaScript never
   * has a copy to pass.
   */
  @Field({
    nullable: true,
    description:
      'Refresh token, for clients that store it themselves (the phone app). Omit on web: ' +
      'the httpOnly cookie is read instead.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  refreshToken?: string;
}
