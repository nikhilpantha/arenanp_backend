/*
  Warnings:

  - You are about to drop the column `teamId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_teamId_fkey";

-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_venueId_fkey";

-- DropIndex
DROP INDEX "bookings_teamId_idx";

-- DropIndex
DROP INDEX "bookings_teamId_status_idx";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "teamId";

-- DropTable
DROP TABLE "teams";
