-- AlterTable: add public-facing "professional" identity fields to organizer profiles.
ALTER TABLE "organizer_profiles"
  ADD COLUMN "logoUrl" TEXT,
  ADD COLUMN "bannerUrl" TEXT,
  ADD COLUMN "website" TEXT,
  ADD COLUMN "facebookUrl" TEXT,
  ADD COLUMN "instagramUrl" TEXT,
  ADD COLUMN "tiktokUrl" TEXT,
  ADD COLUMN "youtubeUrl" TEXT,
  ADD COLUMN "termsAndConditions" TEXT;
