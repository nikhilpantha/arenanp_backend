-- Create audit logging tables for tracking permission and role changes

-- Staff audit log for permission changes (grants, revokes, expirations)
CREATE TABLE "staff_audit_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetId" TEXT,
    "details" JSONB NOT NULL,
    "reason" TEXT,
    "ipAddress" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_audit_log_pkey" PRIMARY KEY ("id")
);

-- Role change audit log
CREATE TABLE "role_change_audit_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fromRole" TEXT NOT NULL,
    "toRole" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "reason" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_change_audit_log_pkey" PRIMARY KEY ("id")
);

-- Staff suspension audit log
CREATE TABLE "staff_suspension_audit_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actedBy" TEXT NOT NULL,
    "reason" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_suspension_audit_log_pkey" PRIMARY KEY ("id")
);

-- Create indexes for efficient queries
CREATE INDEX "staff_audit_log_userId_timestamp_idx" ON "staff_audit_log"("userId", "timestamp");
CREATE INDEX "staff_audit_log_targetId_timestamp_idx" ON "staff_audit_log"("targetId", "timestamp");
CREATE INDEX "staff_audit_log_action_timestamp_idx" ON "staff_audit_log"("action", "timestamp");

CREATE INDEX "role_change_audit_log_userId_timestamp_idx" ON "role_change_audit_log"("userId", "timestamp");
CREATE INDEX "role_change_audit_log_changedBy_timestamp_idx" ON "role_change_audit_log"("changedBy", "timestamp");

CREATE INDEX "staff_suspension_audit_log_userId_timestamp_idx" ON "staff_suspension_audit_log"("userId", "timestamp");
CREATE INDEX "staff_suspension_audit_log_actedBy_timestamp_idx" ON "staff_suspension_audit_log"("actedBy", "timestamp");

-- Add foreign key constraints
ALTER TABLE "staff_audit_log" ADD CONSTRAINT "staff_audit_log_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "staff_audit_log" ADD CONSTRAINT "staff_audit_log_targetId_fkey"
    FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE SET NULL;

ALTER TABLE "role_change_audit_log" ADD CONSTRAINT "role_change_audit_log_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "role_change_audit_log" ADD CONSTRAINT "role_change_audit_log_changedBy_fkey"
    FOREIGN KEY ("changedBy") REFERENCES "users"("id") ON DELETE RESTRICT;

ALTER TABLE "staff_suspension_audit_log" ADD CONSTRAINT "staff_suspension_audit_log_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE "staff_suspension_audit_log" ADD CONSTRAINT "staff_suspension_audit_log_actedBy_fkey"
    FOREIGN KEY ("actedBy") REFERENCES "users"("id") ON DELETE RESTRICT;
