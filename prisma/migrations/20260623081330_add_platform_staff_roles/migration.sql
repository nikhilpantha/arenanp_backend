-- CreateEnum
CREATE TYPE "OverrideAction" AS ENUM ('GRANT', 'REVOKE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'SUPPORT_AGENT';
ALTER TYPE "UserRole" ADD VALUE 'MODERATOR';
ALTER TYPE "UserRole" ADD VALUE 'ADMIN';

-- CreateTable
CREATE TABLE "permission_overrides" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "action" "OverrideAction" NOT NULL,
    "grantedById" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "reason" TEXT,

    CONSTRAINT "permission_overrides_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "permission_overrides_userId_expiresAt_idx" ON "permission_overrides"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "permission_overrides_grantedById_idx" ON "permission_overrides"("grantedById");

-- CreateIndex
CREATE UNIQUE INDEX "permission_overrides_userId_permission_key" ON "permission_overrides"("userId", "permission");

-- AddForeignKey
ALTER TABLE "permission_overrides" ADD CONSTRAINT "permission_overrides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
