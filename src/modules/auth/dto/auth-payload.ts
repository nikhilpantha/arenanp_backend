import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/dto/user.model';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken!: string;

  @Field()
  tokenType!: string;

  @Field({ description: 'When the access token dies. Refresh before this to stay signed in.' })
  expiresAt!: Date;

  /**
   * Only ever populated for the phone app, which identifies itself with
   * `x-arenanp-client: app`. Browsers get the refresh token as an httpOnly cookie
   * instead — handing it to page JavaScript would defeat the point of the cookie.
   */
  @Field({
    nullable: true,
    description:
      'Refresh token, for clients that store it themselves (the phone app). Null on web, ' +
      'where it is set as an httpOnly cookie the page cannot read.',
  })
  refreshToken?: string;

  @Field({
    nullable: true,
    description:
      'When the session ends if it goes unused. Every refresh pushes this forward, so ' +
      'an active user is never signed out.',
  })
  refreshExpiresAt?: Date;

  @Field(() => User)
  user!: User;
}
