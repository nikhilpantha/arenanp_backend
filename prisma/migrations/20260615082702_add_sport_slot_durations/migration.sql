-- AlterTable
ALTER TABLE "sports" ADD COLUMN     "slotDurations" INTEGER[] DEFAULT ARRAY[30, 60, 90, 120]::INTEGER[];
