-- CreateEnum
CREATE TYPE "StatScope" AS ENUM ('TEAM', 'PLAYER');

-- CreateEnum
CREATE TYPE "SportPeriodType" AS ENUM ('HALVES', 'QUARTERS', 'SETS', 'INNINGS', 'SINGLE');

-- CreateTable
CREATE TABLE "sport_stat_types" (
    "id" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT,
    "scope" "StatScope" NOT NULL DEFAULT 'PLAYER',
    "scoreDelta" INTEGER NOT NULL DEFAULT 0,
    "isScoring" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sport_stat_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sport_period_configs" (
    "id" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "periodType" "SportPeriodType" NOT NULL DEFAULT 'HALVES',
    "periodCount" INTEGER NOT NULL DEFAULT 2,
    "winBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sport_period_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tournament_stat_toggles" (
    "id" TEXT NOT NULL,
    "tournamentId" TEXT NOT NULL,
    "sportStatTypeId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tournament_stat_toggles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sport_stat_types_sportId_idx" ON "sport_stat_types"("sportId");

-- CreateIndex
CREATE UNIQUE INDEX "sport_stat_types_sportId_key_key" ON "sport_stat_types"("sportId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "sport_period_configs_sportId_key" ON "sport_period_configs"("sportId");

-- CreateIndex
CREATE INDEX "tournament_stat_toggles_tournamentId_idx" ON "tournament_stat_toggles"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "tournament_stat_toggles_tournamentId_sportStatTypeId_key" ON "tournament_stat_toggles"("tournamentId", "sportStatTypeId");

-- AddForeignKey
ALTER TABLE "sport_stat_types" ADD CONSTRAINT "sport_stat_types_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sport_period_configs" ADD CONSTRAINT "sport_period_configs_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "sports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_stat_toggles" ADD CONSTRAINT "tournament_stat_toggles_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournament_stat_toggles" ADD CONSTRAINT "tournament_stat_toggles_sportStatTypeId_fkey" FOREIGN KEY ("sportStatTypeId") REFERENCES "sport_stat_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
