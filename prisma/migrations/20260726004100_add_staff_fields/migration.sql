-- Add staff-related fields to User model
ALTER TABLE "users" ADD COLUMN "isStaff" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN "suspendedAt" TIMESTAMP(3);

-- Add staff setup token fields
ALTER TABLE "users" ADD COLUMN "setupToken" TEXT;
ALTER TABLE "users" ADD COLUMN "setupTokenExpiry" TIMESTAMP(3);
ALTER TABLE "users" ADD COLUMN "setupTokenUsedAt" TIMESTAMP(3);

-- Create indexes
CREATE INDEX "users_suspendedAt_idx" ON "users"("suspendedAt");
CREATE UNIQUE INDEX "users_setupToken_key" ON "users"("setupToken");
