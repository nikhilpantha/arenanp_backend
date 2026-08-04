import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Sport as PrismaSport, SportBookingMode, SportPricingUnit } from '@prisma/client';

/**
 * A bookable sport from the platform catalogue.
 *
 * This is the contract that keeps venue setup sport-agnostic: every label, unit,
 * slot length and attribute an owner sees is read from here, so an admin can add
 * a sport without anyone shipping code. Clients must never branch on `slug`.
 */
@ObjectType({ description: 'A bookable sport from the platform catalogue.' })
export class SportModel {
  @Field(() => ID) id!: string;
  @Field() slug!: string;
  @Field() name!: string;
  /** Stored S3 object key; presigned to a download URL by SportsResolver. */
  iconUrl?: string;
  @Field({ nullable: true }) description?: string;

  // ── How it's sold ─────────────────────────────────────────────────────────
  @Field(() => SportPricingUnit, {
    description: 'The unit an owner prices in. Storage is always per hour.',
  })
  pricingUnit!: SportPricingUnit;
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

  // ── What an owner picks from when setting up a court ──────────────────────
  @Field(() => [String], { description: 'Playing surfaces — pick one per court.' })
  surfaces!: string[];
  @Field(() => [String], { description: 'Configurations sold — pick one per court.' })
  formats!: string[];
  @Field(() => [String], { description: 'Per-court features — toggle any.' })
  courtFeatures!: string[];
  @Field(() => [String], {
    deprecationReason: 'Derived from surfaces + formats + courtFeatures. Read those instead.',
    description: 'Flat chip list kept for the mobile app until it moves to the typed catalogues.',
  })
  features!: string[];

  @Field(() => Int) displayOrder!: number;
}

export function mapSport(row: PrismaSport): SportModel {
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
  };
}
