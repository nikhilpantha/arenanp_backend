import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, mapUserToGraphql } from './dto/user.model';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthUser } from '../../common/types/auth-context';
import { StorageService } from '../../storage/storage.service';
import { PermissionResolverService } from '../rbac/permission-resolver.service';
import { AllowWhilePasswordPending } from '../../common/decorators/allow-password-pending.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly storage: StorageService,
    private readonly permissions: PermissionResolverService,
  ) {}

  /** Presign the stored avatar object key into a temporary download URL on read. */
  @ResolveField(() => String, { nullable: true })
  avatarUrl(@Parent() user: User): Promise<string | null> {
    return this.storage.getDownloadUrl(user.avatarUrl);
  }

  // Readable even while a password change is pending: the client has to know
  // who it is to render the "choose a password" screen it is being sent to.
  @AllowWhilePasswordPending()
  @Query(() => User, { description: 'Returns the currently authenticated user.' })
  async me(@CurrentUser() current: AuthUser): Promise<User> {
    const user = await this.usersService.findById(current.id);

    // Staff permissions are resolved fresh from their grants, so a permission
    // change lands on the next `me` without a re-login.
    const isStaff = user.isStaff;
    const staffPermissions = isStaff
      ? await this.permissions.getUserPermissions(user.id)
      : undefined;

    return mapUserToGraphql({ ...user, isStaff, staffPermissions });
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
