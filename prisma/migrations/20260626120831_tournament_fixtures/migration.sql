-- CreateEnum
CREATE TYPE "MatchStage" AS ENUM ('GROUP', 'KNOCKOUT', 'LOSERS', 'FINAL');

-- AlterTable
ALTER TABLE "tournament_registrations" ADD COLUMN     "groupId" TEXT;

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "stage" "MatchStage" NOT NULL DEFAULT 'KNOCKOUT',
ADD COLUMN     "winnerToMatchId" TEXT,
ADD COLUMN     "winnerToSlot" INTEGER,
ADD COLUMN     "loserToMatchId" TEXT,
ADD COLUMN     "loserToSlot" INTEGER;

-- CreateTable
CREATE TABLE "tournament_groups" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournament_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tournament_groups_tournamentId_idx" ON "tournament_groups"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_groups_tournamentId_name_key" ON "tournament_groups"("tournamentId", "name");

-- AddForeignKey
ALTER TABLE "tournament_groups" ADD CONSTRAINT "tournament_groups_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_registrations" ADD CONSTRAINT "tournament_registrations_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "tournament_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "tournament_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_winnerToMatchId_fkey" FOREIGN KEY ("winnerToMatchId") REFERENCES "matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_loserToMatchId_fkey" FOREIGN KEY ("loserToMatchId") REFERENCES "matches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
