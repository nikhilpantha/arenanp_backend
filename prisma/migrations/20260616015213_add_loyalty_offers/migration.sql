-- CreateEnum
CREATE TYPE "OfferTrigger" AS ENUM ('PROMO_CODE', 'EVERY_NTH');

-- CreateEnum
CREATE TYPE "OfferAudience" AS ENUM ('ALL', 'INDIVIDUAL', 'TEAM');

-- AlterEnum
ALTER TYPE "OfferDiscountType" ADD VALUE 'FREE_GAME';

-- AlterTable
ALTER TABLE "offers" ADD COLUMN     "audience" "OfferAudience" NOT NULL DEFAULT 'ALL',
ADD COLUMN     "everyGames" INTEGER,
ADD COLUMN     "trigger" "OfferTrigger" NOT NULL DEFAULT 'PROMO_CODE';
