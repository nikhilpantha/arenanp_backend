-- Add soft-delete support to permission_overrides table
-- Allows maintaining audit trail of revoked permissions

-- Add deletedAt column
ALTER TABLE "permission_overrides" ADD COLUMN "deletedAt" TIMESTAMP(3);

-- Update unique constraint to exclude soft-deleted records
DROP INDEX "permission_overrides_userId_permission_key";
CREATE UNIQUE INDEX "permission_overrides_userId_permission_key" ON "permission_overrides"("userId", "permission") WHERE "deletedAt" IS NULL;

-- Update indexes to use filtered indexes (only non-deleted records)
DROP INDEX "permission_overrides_userId_expiresAt_idx";
CREATE INDEX "permission_overrides_userId_expiresAt_idx" ON "permission_overrides"("userId", "expiresAt") WHERE "deletedAt" IS NULL;

-- Add index for deleted records (for audit queries)
CREATE INDEX "permission_overrides_deletedAt_idx" ON "permission_overrides"("deletedAt");
