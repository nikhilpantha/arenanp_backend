-- CreateTable
CREATE TABLE "booking_extras" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "booking_extras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "booking_extras_bookingId_idx" ON "booking_extras"("bookingId");

-- AddForeignKey
ALTER TABLE "booking_extras" ADD CONSTRAINT "booking_extras_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
