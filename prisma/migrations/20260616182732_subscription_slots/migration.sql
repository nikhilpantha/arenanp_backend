/*
  Warnings:

  - You are about to drop the column `endHour` on the `membership_plans` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `membership_plans` table. All the data in the column will be lost.
  - You are about to drop the column `totalSessions` on the `membership_plans` table. All the data in the column will be lost.
  - You are about to drop the column `remainingSessions` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `totalSessions` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `slotStart` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "membership_plans" DROP COLUMN "endHour",
DROP COLUMN "startHour",
DROP COLUMN "totalSessions",
ADD COLUMN     "sessionMinutes" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "windows" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "remainingSessions",
DROP COLUMN "totalSessions",
ADD COLUMN     "slotStart" TEXT NOT NULL;
