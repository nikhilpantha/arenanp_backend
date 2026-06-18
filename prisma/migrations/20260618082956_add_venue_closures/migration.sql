-- CreateTable
CREATE TABLE "venue_closures" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "courtId" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venue_closures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "venue_closures_venueId_startAt_idx" ON "venue_closures"("venueId", "startAt");

-- CreateIndex
CREATE INDEX "venue_closures_courtId_startAt_idx" ON "venue_closures"("courtId", "startAt");

-- AddForeignKey
ALTER TABLE "venue_closures" ADD CONSTRAINT "venue_closures_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_closures" ADD CONSTRAINT "venue_closures_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_closures" ADD CONSTRAINT "venue_closures_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
