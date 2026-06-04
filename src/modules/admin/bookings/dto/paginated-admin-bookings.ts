import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminBooking } from './admin-booking.model';

@ObjectType()
export class PaginatedAdminBookings {
  @Field(() => [AdminBooking]) items!: AdminBooking[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
