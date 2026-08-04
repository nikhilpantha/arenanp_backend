-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "currentPeriod" INTEGER;

-- CreateTable
CREATE TABLE "match_lineups" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "tournamentPlayerId" TEXT NOT NULL,
    "isStarter" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_lineups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_events" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "sportStatTypeId" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "tournamentPlayerId" TEXT,
    "value" INTEGER NOT NULL DEFAULT 1,
    "scoreDelta" INTEGER NOT NULL DEFAULT 0,
    "period" INTEGER,
    "minute" INTEGER,
    "createdById" TEXT,
    "voided" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_periods" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "team1Score" INTEGER NOT NULL DEFAULT 0,
    "team2Score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "match_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_delegates" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_delegates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "match_lineups_matchId_idx" ON "match_lineups"("matchId");
-- CreateIndex
CREATE INDEX "match_lineups_registrationId_idx" ON "match_lineups"("registrationId");
-- CreateIndex
CREATE UNIQUE INDEX "match_lineups_matchId_tournamentPlayerId_key" ON "match_lineups"("matchId", "tournamentPlayerId");
-- CreateIndex
CREATE INDEX "match_events_matchId_idx" ON "match_events"("matchId");
-- CreateIndex
CREATE INDEX "match_events_registrationId_idx" ON "match_events"("registrationId");
-- CreateIndex
CREATE INDEX "match_events_tournamentPlayerId_idx" ON "match_events"("tournamentPlayerId");
-- CreateIndex
CREATE INDEX "match_events_sportStatTypeId_idx" ON "match_events"("sportStatTypeId");
-- CreateIndex
CREATE INDEX "match_periods_matchId_idx" ON "match_periods"("matchId");
-- CreateIndex
CREATE UNIQUE INDEX "match_periods_matchId_index_key" ON "match_periods"("matchId", "index");
-- CreateIndex
CREATE INDEX "match_delegates_userId_idx" ON "match_delegates"("userId");
-- CreateIndex
CREATE UNIQUE INDEX "match_delegates_matchId_userId_key" ON "match_delegates"("matchId", "userId");

-- AddForeignKey
ALTER TABLE "match_lineups" ADD CONSTRAINT "match_lineups_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_lineups" ADD CONSTRAINT "match_lineups_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "tournament_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_lineups" ADD CONSTRAINT "match_lineups_tournamentPlayerId_fkey" FOREIGN KEY ("tournamentPlayerId") REFERENCES "tournament_players"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_events" ADD CONSTRAINT "match_events_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_events" ADD CONSTRAINT "match_events_sportStatTypeId_fkey" FOREIGN KEY ("sportStatTypeId") REFERENCES "sport_stat_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_events" ADD CONSTRAINT "match_events_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "tournament_registrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_events" ADD CONSTRAINT "match_events_tournamentPlayerId_fkey" FOREIGN KEY ("tournamentPlayerId") REFERENCES "tournament_players"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_events" ADD CONSTRAINT "match_events_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_periods" ADD CONSTRAINT "match_periods_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_delegates" ADD CONSTRAINT "match_delegates_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE "match_delegates" ADD CONSTRAINT "match_delegates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
