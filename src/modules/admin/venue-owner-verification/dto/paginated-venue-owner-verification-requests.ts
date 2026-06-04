import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { VenueOwnerVerificationRequestModel } from './venue-owner-verification-request.model';

@ObjectType()
export class PaginatedVenueOwnerVerificationRequests {
  @Field(() => [VenueOwnerVerificationRequestModel]) items!: VenueOwnerVerificationRequestModel[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
