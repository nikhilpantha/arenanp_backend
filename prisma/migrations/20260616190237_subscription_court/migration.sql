/*
  Warnings:

  - Added the required column `courtId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "courtId" TEXT NOT NULL,
ALTER COLUMN "startedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "subscriptions_courtId_status_idx" ON "subscriptions"("courtId", "status");

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "courts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
