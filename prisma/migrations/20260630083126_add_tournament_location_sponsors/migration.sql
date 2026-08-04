-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "address" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "locationName" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "sponsors" JSONB NOT NULL DEFAULT '[]';
