-- Create staff_role_grants table for temporary role assignments
-- Time-limited role grants for temporary promotions/access

CREATE TABLE "staff_role_grants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "grantedBy" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "staff_role_grants_pkey" PRIMARY KEY ("id")
);

-- Create indexes for efficient queries
CREATE UNIQUE INDEX "staff_role_grants_userId_role_key" ON "staff_role_grants"("userId", "role");
CREATE INDEX "staff_role_grants_userId_status_idx" ON "staff_role_grants"("userId", "status");
CREATE INDEX "staff_role_grants_expiresAt_idx" ON "staff_role_grants"("expiresAt");
CREATE INDEX "staff_role_grants_grantedBy_idx" ON "staff_role_grants"("grantedBy");

-- Add foreign key constraints
ALTER TABLE "staff_role_grants" ADD CONSTRAINT "staff_role_grants_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "staff_role_grants" ADD CONSTRAINT "staff_role_grants_grantedBy_fkey"
    FOREIGN KEY ("grantedBy") REFERENCES "users"("id") ON DELETE RESTRICT;
