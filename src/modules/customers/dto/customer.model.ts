import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Customer as PrismaCustomer } from '@prisma/client';

@ObjectType({ description: "A venue's customer (person or team) — loyalty is keyed by this id." })
export class VenueCustomerModel {
  @Field(() => ID) id!: string;
  @Field() name!: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) notes?: string;

  @Field(() => Int, { description: 'Completed games (drives loyalty).' })
  gamesPlayed!: number;
  @Field({ description: 'A loyalty free game is available to redeem now.' })
  freeGameReady!: boolean;

  @Field() createdAt!: Date;
}

export function mapCustomer(
  c: PrismaCustomer,
  gamesPlayed = 0,
  freeGameReady = false,
): VenueCustomerModel {
  return {
    id: c.id,
    name: c.name,
    phone: c.phone ?? undefined,
    notes: c.notes ?? undefined,
    gamesPlayed,
    freeGameReady,
    createdAt: c.createdAt,
  };
}
