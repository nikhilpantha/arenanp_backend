import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminVenue } from './admin-venue.model';

@ObjectType()
export class PaginatedAdminVenues {
  @Field(() => [AdminVenue]) items!: AdminVenue[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
