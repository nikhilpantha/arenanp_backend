-- CreateEnum
CREATE TYPE "SettlementStatus" AS ENUM ('PENDING', 'ON_HOLD', 'PAID', 'FAILED');

-- CreateTable
CREATE TABLE "settlements" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "grossAmount" DECIMAL(10,2) NOT NULL,
    "commissionPercentage" DECIMAL(5,2) NOT NULL,
    "platformCommissionAmount" DECIMAL(10,2) NOT NULL,
    "netAmount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "status" "SettlementStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "paymentReference" TEXT,
    "notes" TEXT,
    "markedPaidById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settlements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "settlements_paymentId_key" ON "settlements"("paymentId");

-- CreateIndex
CREATE INDEX "settlements_venueId_idx" ON "settlements"("venueId");

-- CreateIndex
CREATE INDEX "settlements_status_idx" ON "settlements"("status");

-- CreateIndex
CREATE INDEX "settlements_paidAt_idx" ON "settlements"("paidAt");

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settlements" ADD CONSTRAINT "settlements_markedPaidById_fkey" FOREIGN KEY ("markedPaidById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
