import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminDispute } from './admin-dispute.model';

@ObjectType()
export class PaginatedAdminDisputes {
  @Field(() => [AdminDispute]) items!: AdminDispute[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
