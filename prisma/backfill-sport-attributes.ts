import { PrismaClient } from '@prisma/client';

/**
 * One-off: split the legacy `Sport.features` bag into the typed catalogues.
 *
 * The old field mixed five different kinds of data — surfaces, formats,
 * per-court features, venue-wide amenities and equipment — which is why a court
 * could be tagged both "Indoor" and "Outdoor", and why `Venue.amenities` stayed
 * empty while "Parking" was stored on every court of every sport.
 *
 * Three buckets are reported and then dropped rather than migrated: environment
 * (becoming a per-court enum), venue amenities (venue-wide), and equipment
 * (priced per venue, so owners enter their own extras).
 *
 * Re-running the seed already fixes the five seeded sports. This handles sports
 * an admin created since, and is safe to re-run: a sport that already has typed
 * catalogues is skipped.
 *
 *   npx ts-node prisma/backfill-sport-attributes.ts --dry-run
 *   npx ts-node prisma/backfill-sport-attributes.ts
 */

const prisma = new PrismaClient();

type Bucket = 'surface' | 'format' | 'courtFeature' | 'equipment' | 'venueAmenity' | 'environment';

/**
 * Known chips from the seeded catalogue and their real home. Matched
 * case-insensitively; anything unrecognised falls through to `courtFeature`,
 * the reversible default — an admin can re-file it in the UI afterwards.
 */
const CHIP_BUCKETS: Record<string, Bucket> = {
  // Environment — becomes a per-court enum, so it is dropped from the catalogue.
  indoor: 'environment',
  outdoor: 'environment',

  // Surfaces
  'artificial turf': 'surface',
  'turf wicket': 'surface',
  'wooden floor': 'surface',
  'synthetic court': 'surface',
  'beach / sand court': 'surface',
  concrete: 'surface',
  matting: 'surface',
  grass: 'surface',
  cement: 'surface',

  // Formats
  '5-a-side': 'format',
  '6-a-side': 'format',
  '7-a-side': 'format',
  '8-a-side': 'format',
  '4-a-side': 'format',
  'full court': 'format',
  'half court': 'format',
  '3x3': 'format',
  'box cricket': 'format',
  singles: 'format',
  doubles: 'format',

  // Genuine per-court features
  floodlights: 'courtFeature',
  'safety nets': 'courtFeature',
  'air-conditioned': 'courtFeature',
  'netted enclosure': 'courtFeature',
  roofed: 'courtFeature',
  scoreboard: 'courtFeature',

  // Equipment — dropped: extras are priced per venue, so the owner enters their
  // own via `Venue.additionalServices` rather than inheriting a platform list.
  'bibs provided': 'equipment',
  'ball provided': 'equipment',
  'net provided': 'equipment',
  'bats & balls provided': 'equipment',
  'pads & gloves': 'equipment',
  'shuttlecocks provided': 'equipment',
  'racket rental': 'equipment',
  'bowling machine': 'equipment',

  // Venue-wide — belongs on Venue.amenities, not on any court.
  'changing rooms': 'venueAmenity',
  showers: 'venueAmenity',
  parking: 'venueAmenity',
  'spectator area': 'venueAmenity',
};

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const sports = await prisma.sport.findMany({ orderBy: { displayOrder: 'asc' } });

  let changed = 0;
  let skipped = 0;

  for (const sport of sports) {
    const alreadyTyped =
      sport.surfaces.length > 0 || sport.formats.length > 0 || sport.courtFeatures.length > 0;
    if (alreadyTyped) {
      skipped += 1;
      continue;
    }

    const buckets: Record<Bucket, string[]> = {
      surface: [],
      format: [],
      courtFeature: [],
      equipment: [],
      venueAmenity: [],
      environment: [],
    };

    for (const chip of sport.features) {
      const bucket = CHIP_BUCKETS[chip.trim().toLowerCase()] ?? 'courtFeature';
      buckets[bucket].push(chip.trim());
    }

    const surfaces = buckets.surface;
    const formats = buckets.format;
    const courtFeatures = buckets.courtFeature;

    console.log(`\n${sport.name} (${sport.slug}) — ${sport.features.length} chips`);
    console.log(`  surfaces        ${fmt(surfaces)}`);
    console.log(`  formats         ${fmt(formats)}`);
    console.log(`  courtFeatures   ${fmt(courtFeatures)}`);
    if (buckets.equipment.length) {
      console.log(`  dropped (owner prices their own extras)  ${fmt(buckets.equipment)}`);
    }
    if (buckets.environment.length) {
      console.log(`  dropped (now a per-court enum)      ${fmt(buckets.environment)}`);
    }
    if (buckets.venueAmenity.length) {
      console.log(`  dropped (belongs to Venue.amenities) ${fmt(buckets.venueAmenity)}`);
    }

    if (!dryRun) {
      await prisma.sport.update({
        where: { id: sport.id },
        data: {
          surfaces,
          formats,
          courtFeatures,
          // Keep the deprecated list in step with its three new sources.
          features: [...surfaces, ...formats, ...courtFeatures],
          // A default slot that isn't on offer is rejected by the API, so pull
          // any stale value onto the nearest allowed length.
          defaultSlotMinutes: nearestSlot(sport.defaultSlotMinutes, sport.slotDurations),
        },
      });
    }
    changed += 1;
  }

  console.log(
    `\n${dryRun ? 'Would update' : 'Updated'} ${changed} sport(s); skipped ${skipped} already using the typed catalogues.`,
  );
  if (dryRun) console.log('Dry run — nothing was written. Re-run without --dry-run to apply.');
}

function fmt(values: string[]): string {
  return values.length ? values.join(', ') : '—';
}

/** Snap a default slot onto the closest allowed length, ties going shorter. */
function nearestSlot(current: number, allowed: number[]): number {
  if (!allowed.length || allowed.includes(current)) return current;
  return allowed.reduce((best, value) =>
    Math.abs(value - current) < Math.abs(best - current) ? value : best,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
