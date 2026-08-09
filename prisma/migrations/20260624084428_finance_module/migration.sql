-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('RENT', 'SALARY', 'UTILITIES', 'EQUIPMENT', 'MAINTENANCE', 'MARKETING', 'SUPPLIES', 'TAX', 'OTHER');

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "category" "ExpenseCategory" NOT NULL DEFAULT 'OTHER',
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NPR',
    "description" TEXT,
    "vendor" TEXT,
    "paymentMethod" "PaymentProvider",
    "incurredAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cash_reconciliations" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "businessDate" DATE NOT NULL,
    "openingFloat" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "expectedCash" DECIMAL(10,2) NOT NULL,
    "countedCash" DECIMAL(10,2) NOT NULL,
    "variance" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "closedById" TEXT,
    "closedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cash_reconciliations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "expenses_venueId_incurredAt_idx" ON "expenses"("venueId", "incurredAt");

-- CreateIndex
CREATE INDEX "expenses_venueId_category_idx" ON "expenses"("venueId", "category");

-- CreateIndex
CREATE INDEX "cash_reconciliations_venueId_idx" ON "cash_reconciliations"("venueId");

-- CreateIndex
CREATE UNIQUE INDEX "cash_reconciliations_venueId_businessDate_key" ON "cash_reconciliations"("venueId", "businessDate");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_reconciliations" ADD CONSTRAINT "cash_reconciliations_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cash_reconciliations" ADD CONSTRAINT "cash_reconciliations_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
