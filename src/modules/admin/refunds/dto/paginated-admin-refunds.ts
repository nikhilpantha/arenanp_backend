import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminRefundRequest } from './admin-refund.model';

@ObjectType()
export class PaginatedAdminRefunds {
  @Field(() => [AdminRefundRequest]) items!: AdminRefundRequest[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
