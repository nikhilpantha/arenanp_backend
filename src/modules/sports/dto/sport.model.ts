import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Sport as PrismaSport } from '@prisma/client';

@ObjectType({ description: 'A bookable sport from the platform catalogue.' })
export class SportModel {
  @Field(() => ID) id!: string;
  @Field() slug!: string;
  @Field() name!: string;
  /** Stored S3 object key; presigned to a download URL by SportsResolver. */
  iconUrl?: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => [String], { description: 'Amenity presets to offer for this sport.' })
  features!: string[];
  @Field(() => [Int], { description: 'Allowed booking slot lengths (minutes) for this sport.' })
  slotDurations!: number[];
  @Field(() => Int) displayOrder!: number;
}

export function mapSport(row: PrismaSport): SportModel {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    iconUrl: row.iconUrl ?? undefined,
    description: row.description ?? undefined,
    features: row.features,
    slotDurations: row.slotDurations,
    displayOrder: row.displayOrder,
  };
}
