import { Field, ObjectType } from '@nestjs/graphql';

import { PageInfo } from '../../../common/dto/pagination.input';

import { VenueCard } from './venue-card.model';

@ObjectType()
export class PaginatedVenues {
  @Field(() => [VenueCard]) items!: VenueCard[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
