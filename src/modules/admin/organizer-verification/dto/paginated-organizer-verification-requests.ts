import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { OrganizerVerificationRequestModel } from './organizer-verification-request.model';

@ObjectType()
export class PaginatedOrganizerVerificationRequests {
  @Field(() => [OrganizerVerificationRequestModel]) items!: OrganizerVerificationRequestModel[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
