-- AlterTable: party type on the venue customer (authoritative; bookings snapshot it).
ALTER TABLE "customers" ADD COLUMN     "kind" "CustomerType" NOT NULL DEFAULT 'INDIVIDUAL';

-- CreateIndex
CREATE INDEX "customers_venueId_kind_idx" ON "customers"("venueId", "kind");
