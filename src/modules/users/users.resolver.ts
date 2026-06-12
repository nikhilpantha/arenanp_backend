import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, mapUserToGraphql } from './dto/user.model';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/types/auth-context';
import { StorageService } from '../../storage/storage.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly storage: StorageService,
  ) {}

  /** Presign the stored avatar object key into a temporary download URL on read. */
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User): Promise<string | null> {
    return this.storage.getDownloadUrl(user.avatarUrl);
  }

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
