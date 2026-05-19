import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/dto/user.model';

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken!: string;

  @Field()
  tokenType!: string;

  @Field()
  expiresAt!: Date;

  @Field(() => User)
  user!: User;
}
