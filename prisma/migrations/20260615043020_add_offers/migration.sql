-- CreateEnum
CREATE TYPE "OfferDiscountType" AS ENUM ('PERCENT', 'FLAT');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "offerId" TEXT;

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "discountType" "OfferDiscountType" NOT NULL,
    "discountValue" DECIMAL(10,2) NOT NULL,
    "maxDiscount" DECIMAL(10,2),
    "minSubtotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "code" TEXT,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "usageLimit" INTEGER,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "offers_venueId_idx" ON "offers"("venueId");

-- CreateIndex
CREATE INDEX "offers_venueId_isActive_idx" ON "offers"("venueId", "isActive");

-- CreateIndex
CREATE INDEX "offers_validUntil_idx" ON "offers"("validUntil");

-- CreateIndex
CREATE UNIQUE INDEX "offers_venueId_code_key" ON "offers"("venueId", "code");

-- CreateIndex
CREATE INDEX "bookings_offerId_idx" ON "bookings"("offerId");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
