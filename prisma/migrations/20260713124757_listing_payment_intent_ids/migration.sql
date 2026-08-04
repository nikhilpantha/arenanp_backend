-- AlterTable
ALTER TABLE "tournament_listing_payments" ADD COLUMN     "bookingId" TEXT,
ADD COLUMN     "correlationId" TEXT;

-- CreateIndex
CREATE INDEX "tournament_listing_payments_correlationId_idx" ON "tournament_listing_payments"("correlationId");
