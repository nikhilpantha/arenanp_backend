import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, mapUserToGraphql } from './dto/user.model';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/types/auth-context';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { description: 'Returns the currently authenticated user.' })
  async me(@CurrentUser() current: AuthUser): Promise<User> {
    const user = await this.usersService.findById(current.id);
    return mapUserToGraphql(user);
  }

  @Mutation(() => User, { description: 'Update the current user profile (name / email / avatar).' })
  async updateProfile(
    @CurrentUser() current: AuthUser,
    @Args('input') input: UpdateProfileInput,
  ): Promise<User> {
    const user = await this.usersService.updateProfile(current.id, input);
    return mapUserToGraphql(user);
  }
}
