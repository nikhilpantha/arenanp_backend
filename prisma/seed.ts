import * as argon2 from 'argon2';
import { PrismaClient, SportBookingMode, SportPricingUnit, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

/// Phase-one sports catalogue — and the reference example of the sport model.
///
/// Everything venue setup renders for a sport is read from these fields, so an
/// owner's screen adapts to a new sport with no code change.
///
/// Note what is deliberately NOT here: venue-wide amenities (parking, changing
/// rooms) live on `Venue.amenities` because every court shares them; indoor vs
/// outdoor is a per-court fact, not a sport-level chip; and extras (bibs,
/// shuttles, a referee) are priced per venue, so the owner enters their own via
/// `Venue.additionalServices`. `features` is derived on write, never authored.
/// Re-running the seed restores these canonical values (upsert by slug).
type SeedSport = {
  slug: string;
  name: string;
  description: string;
  pricingUnit: SportPricingUnit;
  unitLabel: string;
  unitLabelPlural: string;
  slotDurations: number[];
  defaultSlotMinutes: number;
  minDurationMinutes?: number;
  maxDurationMinutes?: number;
  bookingMode?: SportBookingMode;
  defaultCapacity?: number;
  surfaces: string[];
  formats: string[];
  courtFeatures: string[];
  displayOrder: number;
};

const PHASE_ONE_SPORTS: SeedSport[] = [
  {
    slug: 'futsal',
    name: 'Futsal',
    description:
      'Fast-paced small-sided football played on an enclosed artificial-turf pitch. The most popular booked sport in Nepal, typically 5-a-side under floodlights.',
    pricingUnit: SportPricingUnit.PER_HOUR,
    unitLabel: 'court',
    unitLabelPlural: 'courts',
    slotDurations: [60, 90, 120],
    defaultSlotMinutes: 60,
    minDurationMinutes: 60,
    maxDurationMinutes: 240,
    surfaces: ['Artificial Turf', 'Concrete', 'Wooden Floor'],
    formats: ['5-a-side', '6-a-side', '7-a-side'],
    courtFeatures: ['Floodlights', 'Netted Enclosure', 'Roofed'],
    displayOrder: 1,
  },
  {
    slug: 'cricksal',
    name: 'Indoor Cricket (Cricksal)',
    description:
      'Indoor box-cricket played on a turf wicket inside a netted enclosure. A compact, all-weather format of cricket suited to evening games and corporate tournaments.',
    pricingUnit: SportPricingUnit.PER_HOUR,
    unitLabel: 'cage',
    unitLabelPlural: 'cages',
    slotDurations: [60, 90, 120],
    defaultSlotMinutes: 90,
    minDurationMinutes: 60,
    maxDurationMinutes: 240,
    surfaces: ['Turf Wicket', 'Matting', 'Concrete'],
    formats: ['Box Cricket', '6-a-side', '8-a-side'],
    courtFeatures: ['Floodlights', 'Safety Nets', 'Roofed'],
    displayOrder: 2,
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    description:
      'Full-court and half-court basketball on indoor or outdoor hardcourts. Supports 5-a-side games and 3x3 half-court play under floodlights.',
    pricingUnit: SportPricingUnit.PER_HOUR,
    unitLabel: 'court',
    unitLabelPlural: 'courts',
    slotDurations: [30, 60, 90, 120],
    defaultSlotMinutes: 60,
    minDurationMinutes: 30,
    maxDurationMinutes: 240,
    surfaces: ['Wooden Floor', 'Synthetic Court', 'Concrete'],
    formats: ['Full Court', 'Half Court', '3x3'],
    courtFeatures: ['Floodlights', 'Scoreboard', 'Air-Conditioned'],
    displayOrder: 3,
  },
  {
    slug: 'volleyball',
    name: 'Volleyball',
    description:
      'Indoor, outdoor and sand-court volleyball. Standard 6-a-side games with nets and lined courts, available for casual play and league fixtures.',
    pricingUnit: SportPricingUnit.PER_HOUR,
    unitLabel: 'court',
    unitLabelPlural: 'courts',
    slotDurations: [60, 90, 120],
    defaultSlotMinutes: 60,
    minDurationMinutes: 60,
    maxDurationMinutes: 180,
    surfaces: ['Indoor Court', 'Sand', 'Concrete', 'Grass'],
    formats: ['6-a-side', 'Beach (2s)', '4-a-side'],
    courtFeatures: ['Floodlights', 'Net Provided', 'Roofed'],
    displayOrder: 4,
  },
  {
    slug: 'badminton',
    name: 'Badminton',
    description:
      'Singles and doubles badminton on indoor wooden or synthetic courts. Air-conditioned halls with proper line markings and net height, ideal for year-round play.',
    pricingUnit: SportPricingUnit.PER_HOUR,
    unitLabel: 'court',
    unitLabelPlural: 'courts',
    slotDurations: [30, 60, 90],
    defaultSlotMinutes: 60,
    minDurationMinutes: 30,
    maxDurationMinutes: 180,
    surfaces: ['Wooden Floor', 'Synthetic Court', 'Cement'],
    formats: ['Singles', 'Doubles'],
    courtFeatures: ['Air-Conditioned', 'Floodlights', 'Wooden Sprung Floor'],
    displayOrder: 5,
  },
];

async function seedSports(createdById: string) {
  for (const sport of PHASE_ONE_SPORTS) {
    const fields = {
      name: sport.name,
      description: sport.description,

      pricingUnit: sport.pricingUnit,
      unitLabel: sport.unitLabel,
      unitLabelPlural: sport.unitLabelPlural,
      slotDurations: sport.slotDurations,
      defaultSlotMinutes: sport.defaultSlotMinutes,
      minDurationMinutes: sport.minDurationMinutes ?? null,
      maxDurationMinutes: sport.maxDurationMinutes ?? null,
      bookingMode: sport.bookingMode ?? SportBookingMode.EXCLUSIVE,
      defaultCapacity: sport.defaultCapacity ?? null,

      surfaces: sport.surfaces,
      formats: sport.formats,
      courtFeatures: sport.courtFeatures,
      // Mirrors the server's derivation so the deprecated flat list the mobile
      // app still reads never drifts from the typed catalogues.
      features: [...sport.surfaces, ...sport.formats, ...sport.courtFeatures],

      displayOrder: sport.displayOrder,
      isActive: true,
    };

    await prisma.sport.upsert({
      where: { slug: sport.slug },
      update: fields,
      create: { slug: sport.slug, createdById, ...fields },
    });
  }

  console.log(
    `Seeded ${PHASE_ONE_SPORTS.length} sports: ${PHASE_ONE_SPORTS.map((s) => s.slug).join(', ')}`,
  );
}

async function main() {
  const phone = process.env.SEED_SUPER_ADMIN_PHONE ?? '+9779800000000';
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? 'Arena NP Admin';
  const email = process.env.SEED_SUPER_ADMIN_EMAIL ?? 'admin@arenanp.local';
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD ?? 'ChangeMe!Admin123';

  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

  const admin = await prisma.user.upsert({
    where: { phoneNumber: phone },
    update: {
      role: UserRole.SUPER_ADMIN,
      fullName: name,
      email,
      passwordHash,
      isActive: true,
    },
    create: {
      phoneNumber: phone,
      fullName: name,
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log(`Seeded SUPER_ADMIN:`);
  console.log(`  id:    ${admin.id}`);
  console.log(`  phone: ${admin.phoneNumber}`);
  console.log(`  email: ${admin.email}`);
  console.log(`  password: (from SEED_SUPER_ADMIN_PASSWORD env)`);

  await seedSports(admin.id);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
