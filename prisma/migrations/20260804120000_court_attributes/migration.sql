-- Per-court attributes the sport catalogue's typed lists feed: surface and
-- format (single-select), indoor/outdoor/roofed, and capacity for CAPACITY
-- sports. All nullable — existing courts stay valid.
CREATE TYPE "CourtEnvironment" AS ENUM ('INDOOR', 'OUTDOOR', 'ROOFED');
ALTER TABLE "courts" ADD COLUMN "surface" TEXT;
ALTER TABLE "courts" ADD COLUMN "format" TEXT;
ALTER TABLE "courts" ADD COLUMN "environment" "CourtEnvironment";
ALTER TABLE "courts" ADD COLUMN "capacity" INTEGER;
