-- CreateEnum
CREATE TYPE "TournamentFormat" AS ENUM ('SINGLE_ELIMINATION', 'DOUBLE_ELIMINATION', 'ROUND_ROBIN', 'GROUP_KNOCKOUT');

-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "format" "TournamentFormat" NOT NULL DEFAULT 'SINGLE_ELIMINATION',
ADD COLUMN     "maxPlayersPerTeam" INTEGER,
ADD COLUMN     "registrationOpensAt" TIMESTAMP(3),
ADD COLUMN     "teamSize" INTEGER;

-- CreateTable
CREATE TABLE "tournament_players" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "userId" TEXT,
    "fullName" TEXT NOT NULL,
    "contactPhone" TEXT,
    "jerseyNumber" INTEGER,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournament_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tournament_players_registrationId_idx" ON "tournament_players"("registrationId");

-- CreateIndex
CREATE INDEX "tournament_players_userId_idx" ON "tournament_players"("userId");

-- CreateIndex
CREATE INDEX "tournament_players_contactPhone_idx" ON "tournament_players"("contactPhone");

-- AddForeignKey
ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "tournament_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_players" ADD CONSTRAINT "tournament_players_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
