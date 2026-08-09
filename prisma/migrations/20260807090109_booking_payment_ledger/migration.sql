-- CreateTable
CREATE TABLE "booking_payments" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "PaymentProvider",
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "takenById" TEXT,
    "backfilled" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "booking_payments_venueId_takenAt_idx" ON "booking_payments"("venueId", "takenAt");

-- CreateIndex
CREATE INDEX "booking_payments_bookingId_idx" ON "booking_payments"("bookingId");

-- AddForeignKey
ALTER TABLE "booking_payments" ADD CONSTRAINT "booking_payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_payments" ADD CONSTRAINT "booking_payments_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_payments" ADD CONSTRAINT "booking_payments_takenById_fkey" FOREIGN KEY ("takenById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
