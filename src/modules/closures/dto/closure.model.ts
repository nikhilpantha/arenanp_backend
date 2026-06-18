import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VenueClosure as PrismaClosure } from '@prisma/client';

@ObjectType({ description: 'A venue-owner block on bookings — one court or the whole venue.' })
export class ClosureModel {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;
  @Field(() => ID, { nullable: true, description: 'Blocked court; null = whole venue.' })
  courtId?: string;
  @Field() startAt!: Date;
  @Field() endAt!: Date;
  @Field({ nullable: true }) reason?: string;
  @Field() createdAt!: Date;
}

export function mapClosure(c: PrismaClosure): ClosureModel {
  return {
    id: c.id,
    venueId: c.venueId,
    courtId: c.courtId ?? undefined,
    startAt: c.startAt,
    endAt: c.endAt,
    reason: c.reason ?? undefined,
    createdAt: c.createdAt,
  };
}
