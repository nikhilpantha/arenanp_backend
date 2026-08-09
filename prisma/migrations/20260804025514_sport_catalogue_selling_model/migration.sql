-- CreateEnum
CREATE TYPE "SportPricingUnit" AS ENUM ('PER_HOUR', 'PER_SLOT', 'PER_SESSION', 'PER_DAY', 'PER_PERSON_SLOT');

-- CreateEnum
CREATE TYPE "SportBookingMode" AS ENUM ('EXCLUSIVE', 'CAPACITY');

-- AlterTable
ALTER TABLE "sports" ADD COLUMN     "bookingMode" "SportBookingMode" NOT NULL DEFAULT 'EXCLUSIVE',
ADD COLUMN     "courtFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "defaultBookingWindowDays" INTEGER,
ADD COLUMN     "defaultCapacity" INTEGER,
ADD COLUMN     "defaultSlotMinutes" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "extrasPresets" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "formats" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "includedPresets" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "maxDurationMinutes" INTEGER,
ADD COLUMN     "minDurationMinutes" INTEGER,
ADD COLUMN     "pricingUnit" "SportPricingUnit" NOT NULL DEFAULT 'PER_HOUR',
ADD COLUMN     "suggestedPeakWindows" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "surfaces" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "unitLabel" TEXT NOT NULL DEFAULT 'court',
ADD COLUMN     "unitLabelPlural" TEXT NOT NULL DEFAULT 'courts';
