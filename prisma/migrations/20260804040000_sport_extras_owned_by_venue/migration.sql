-- Extras belong to the venue owner, not the platform sport definition: every
-- venue charges differently for bibs, shuttles or a referee, so the owner enters
-- their own via `venues.additionalServices`. Peak windows and booking windows are
-- per-venue too. Nothing consumed these four columns yet.
ALTER TABLE "sports" DROP COLUMN "includedPresets";
ALTER TABLE "sports" DROP COLUMN "extrasPresets";
ALTER TABLE "sports" DROP COLUMN "suggestedPeakWindows";
ALTER TABLE "sports" DROP COLUMN "defaultBookingWindowDays";
