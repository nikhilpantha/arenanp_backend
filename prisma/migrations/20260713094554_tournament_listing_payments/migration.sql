-- AlterTable
ALTER TABLE "platform_settings" ADD COLUMN     "tournamentListingFee" DECIMAL(10,2) NOT NULL DEFAULT 500;

-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "listingFeePaid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "tournament_listing_payments" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'ESEWA',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "providerRef" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournament_listing_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tournament_listing_payments_tournamentId_idx" ON "tournament_listing_payments"("tournamentId");

-- AddForeignKey
ALTER TABLE "tournament_listing_payments" ADD CONSTRAINT "tournament_listing_payments_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
