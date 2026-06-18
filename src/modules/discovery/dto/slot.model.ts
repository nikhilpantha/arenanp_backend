import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A single bookable time window for a court.' })
export class CourtSlot {
  @Field() startAt!: Date;
  @Field() endAt!: Date;
  @Field({ description: 'False if already booked or in the past.' }) available!: boolean;
  @Field(() => Float, { description: 'Price for this slot at the court rate.' }) price!: number;
}

@ObjectType({ description: 'Bookable slots for a court on a given venue-local day.' })
export class CourtSlots {
  @Field(() => ID) courtId!: string;
  @Field({ description: 'The requested day (yyyy-mm-dd, venue-local).' }) date!: string;
  @Field(() => Int) slotMinutes!: number;
  @Field(() => [CourtSlot]) slots!: CourtSlot[];
}
