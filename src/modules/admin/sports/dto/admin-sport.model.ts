import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Sport as PrismaSport, SportBookingMode, SportPricingUnit } from '@prisma/client';

import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';

@ObjectType({ description: 'Where a sport is currently referenced across the platform.' })
export class SportUsage {
  @Field(() => Int) courts!: number;
  @Field(() => Int) venues!: number;
  @Field(() => Int) tournaments!: number;
}

@ObjectType({
  description:
    'A sport in the platform catalogue. Every Court / Tournament references one of these, every Venue can offer many. These fields are the whole contract venue setup renders from — no client should know a sport by name.',
})
export class AdminSport {
  @Field(() => ID) id!: string;
  @Field() slug!: string;
  @Field() name!: string;
  /** Stored S3 object key; presigned to a download URL by AdminSportsResolver. */
  iconUrl?: string;
  @Field({ nullable: true }) description?: string;

  // ── How it's sold ─────────────────────────────────────────────────────────
  @Field(() => SportPricingUnit) pricingUnit!: SportPricingUnit;
  @Field({ description: 'What one bookable unit is called, e.g. "court", "lane", "table".' })
  unitLabel!: string;
  @Field() unitLabelPlural!: string;
  @Field(() => [Int], { description: 'Allowed booking slot lengths (minutes) for this sport.' })
  slotDurations!: number[];
  @Field(() => Int, { description: 'Slot length a new court starts on; one of `slotDurations`.' })
  defaultSlotMinutes!: number;
  @Field(() => Int, { nullable: true }) minDurationMinutes?: number;
  @Field(() => Int, { nullable: true }) maxDurationMinutes?: number;
  @Field(() => SportBookingMode) bookingMode!: SportBookingMode;
  @Field(() => Int, {
    nullable: true,
    description: 'Places per slot when bookingMode is CAPACITY.',
  })
  defaultCapacity?: number;

  // ── Court attribute catalogues ────────────────────────────────────────────
  @Field(() => [String], { description: 'Playing surfaces an owner picks one of, per court.' })
  surfaces!: string[];
  @Field(() => [String], { description: 'Configurations sold, e.g. ["5-a-side"].' })
  formats!: string[];
  @Field(() => [String], { description: 'Per-court features an owner toggles.' })
  courtFeatures!: string[];

  @Field(() => [String], {
    deprecationReason: 'Derived from surfaces + formats + courtFeatures. Read those instead.',
    description: 'Flat chip list kept for the mobile app until it moves to the typed catalogues.',
  })
  features!: string[];

  @Field(() => Int) displayOrder!: number;
  @Field() isActive!: boolean;

  @Field(() => SportUsage, {
    description:
      'Reference counts. Note that deactivating a sport hides it from new venue setup but does NOT unpublish courts that already use it.',
  })
  usage!: SportUsage;

  @Field(() => AdminUser, { nullable: true }) createdBy?: AdminUser;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

type SportWithCreator = PrismaSport & {
  createdBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  _count?: { courts: number; venueSports: number; tournaments: number };
};

export function mapSportToAdmin(row: SportWithCreator): AdminSport {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    iconUrl: row.iconUrl ?? undefined,
    description: row.description ?? undefined,

    pricingUnit: row.pricingUnit,
    unitLabel: row.unitLabel,
    unitLabelPlural: row.unitLabelPlural,
    slotDurations: row.slotDurations,
    defaultSlotMinutes: row.defaultSlotMinutes,
    minDurationMinutes: row.minDurationMinutes ?? undefined,
    maxDurationMinutes: row.maxDurationMinutes ?? undefined,
    bookingMode: row.bookingMode,
    defaultCapacity: row.defaultCapacity ?? undefined,

    surfaces: row.surfaces,
    formats: row.formats,
    courtFeatures: row.courtFeatures,
    features: row.features,

    displayOrder: row.displayOrder,
    isActive: row.isActive,
    usage: {
      courts: row._count?.courts ?? 0,
      venues: row._count?.venueSports ?? 0,
      tournaments: row._count?.tournaments ?? 0,
    },
    createdBy: row.createdBy ? mapPrismaUserToAdmin(row.createdBy) : undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
