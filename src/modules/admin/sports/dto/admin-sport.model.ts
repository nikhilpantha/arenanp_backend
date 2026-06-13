import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Sport as PrismaSport } from '@prisma/client';

import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';

@ObjectType({
  description:
    'A sport in the platform catalogue. Every Court / Tournament references one of these, every Venue can offer many.',
})
export class AdminSport {
  @Field(() => ID) id!: string;
  @Field() slug!: string;
  @Field() name!: string;
  /** Stored S3 object key; presigned to a download URL by AdminSportsResolver. */
  iconUrl?: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => [String], { description: 'Amenity presets offered for this sport.' })
  features!: string[];
  @Field(() => Int) displayOrder!: number;
  @Field() isActive!: boolean;

  @Field(() => AdminUser, { nullable: true }) createdBy?: AdminUser;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

type SportWithCreator = PrismaSport & {
  createdBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

export function mapSportToAdmin(row: SportWithCreator): AdminSport {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    iconUrl: row.iconUrl ?? undefined,
    description: row.description ?? undefined,
    features: row.features,
    displayOrder: row.displayOrder,
    isActive: row.isActive,
    createdBy: row.createdBy ? mapPrismaUserToAdmin(row.createdBy) : undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
