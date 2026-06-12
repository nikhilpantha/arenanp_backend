import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { VenueVerificationRequestModel } from './venue-verification-request.model';

@ObjectType()
export class PaginatedVenueVerificationRequests {
  @Field(() => [VenueVerificationRequestModel]) items!: VenueVerificationRequestModel[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
