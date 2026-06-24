import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Customer as PrismaCustomer, CustomerType } from '@prisma/client';

import '../../../common/enums';

@ObjectType({ description: "A venue's customer (person or team) — loyalty is keyed by this id." })
export class VenueCustomerModel {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) notes?: string;

  @Field(() => CustomerType, { description: 'Party type (INDIVIDUAL | TEAM | CLUB).' })
  kind!: CustomerType;

  @Field(() => Int, { description: 'Completed games (drives loyalty).' })
  gamesPlayed!: number;
  @Field({ description: 'A loyalty free game is available to redeem now.' })
  freeGameReady!: boolean;

  @Field(() => Float, { description: 'Lifetime amount paid across non-cancelled bookings.' })
  totalSpent!: number;
  @Field({ nullable: true, description: 'Most recent booking start (last visit).' })
  lastVisitAt?: Date;

  @Field() createdAt!: Date;
}

export function mapCustomer(
  c: PrismaCustomer,
  gamesPlayed = 0,
  freeGameReady = false,
  totalSpent = 0,
  lastVisitAt: Date | null = null,
): VenueCustomerModel {
  return {
    id: c.id,
    name: c.name,
    phone: c.phone ?? undefined,
    notes: c.notes ?? undefined,
    kind: c.kind,
    gamesPlayed,
    freeGameReady,
    totalSpent,
    lastVisitAt: lastVisitAt ?? undefined,
    createdAt: c.createdAt,
  };
}
