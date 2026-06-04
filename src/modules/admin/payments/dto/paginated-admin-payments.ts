import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminPayment } from './admin-payment.model';

@ObjectType()
export class PaginatedAdminPayments {
  @Field(() => [AdminPayment]) items!: AdminPayment[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
