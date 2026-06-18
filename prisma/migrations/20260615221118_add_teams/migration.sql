-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "teamId" TEXT;

-- CreateTable
CREATE TABLE "teams" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactPhone" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "teams_venueId_idx" ON "teams"("venueId");

-- CreateIndex
CREATE UNIQUE INDEX "teams_venueId_name_key" ON "teams"("venueId", "name");

-- CreateIndex
CREATE INDEX "bookings_teamId_idx" ON "bookings"("teamId");

-- CreateIndex
CREATE INDEX "bookings_teamId_status_idx" ON "bookings"("teamId", "status");

-- CreateIndex
CREATE INDEX "bookings_venueId_customerPhone_status_idx" ON "bookings"("venueId", "customerPhone", "status");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
