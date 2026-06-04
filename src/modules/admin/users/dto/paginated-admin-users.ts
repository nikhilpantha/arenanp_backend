import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminUser } from './admin-user.model';

@ObjectType()
export class PaginatedAdminUsers {
  @Field(() => [AdminUser]) items!: AdminUser[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
