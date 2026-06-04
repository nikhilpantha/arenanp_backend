import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../../../../common/dto/pagination.input';
import { AdminTournament } from './admin-tournament.model';

@ObjectType()
export class PaginatedAdminTournaments {
  @Field(() => [AdminTournament]) items!: AdminTournament[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}
