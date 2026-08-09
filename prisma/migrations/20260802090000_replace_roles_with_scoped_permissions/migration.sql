-- Replace role-based RBAC with scoped per-user permission grants.
--
-- Every staff member is an admin of one scope (platform / a venue / a
-- tournament) and holds permissions individually. Roles are removed entirely.
--
-- Existing access is preserved rather than dropped: each user's role
-- memberships are expanded into the equivalent individual grants BEFORE the
-- role tables are dropped, so nobody loses access at deploy time.

-- CreateEnum
CREATE TYPE "PermissionScopeType" AS ENUM ('PLATFORM', 'VENUE', 'TOURNAMENT');

-- CreateTable
CREATE TABLE "staff_permissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionKey" TEXT NOT NULL,
    "scopeType" "PermissionScopeType" NOT NULL,
    "scopeId" TEXT NOT NULL DEFAULT '',
    "expiresAt" TIMESTAMP(3),
    "reason" TEXT,
    "grantedById" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staff_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "staff_permissions_userId_scopeType_scopeId_idx" ON "staff_permissions"("userId", "scopeType", "scopeId");

-- CreateIndex
CREATE INDEX "staff_permissions_permissionKey_idx" ON "staff_permissions"("permissionKey");

-- CreateIndex
CREATE INDEX "staff_permissions_expiresAt_idx" ON "staff_permissions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "staff_permissions_userId_permissionKey_scopeType_scopeId_key" ON "staff_permissions"("userId", "permissionKey", "scopeType", "scopeId");

-- ─── Carry existing access forward ──────────────────────────────────────────

-- Platform roles → PLATFORM grants.
-- A permission REVOKEd for a user by an override is simply not granted, which
-- is the same effective result without needing a revoke concept.
INSERT INTO "staff_permissions" ("id", "userId", "permissionKey", "scopeType", "scopeId", "grantedById", "reason")
SELECT
    gen_random_uuid()::text,
    pur."userId",
    p."key",
    'PLATFORM',
    '',
    pur."assignedBy",
    'Migrated from role assignment'
FROM "platform_user_roles" pur
-- The old assignment tables have no cascade on userId, so they can hold rows
-- pointing at deleted users. Join users to skip those instead of failing.
JOIN "users" u ON u."id" = pur."userId"
JOIN "role_permissions" rp ON rp."roleId" = pur."roleId"
JOIN "permissions" p ON p."id" = rp."permissionId"
WHERE NOT EXISTS (
    SELECT 1 FROM "permission_overrides" po
    WHERE po."userId" = pur."userId"
      AND po."permission" = p."key"
      AND po."action" = 'REVOKE'
      AND po."deletedAt" IS NULL
)
ON CONFLICT DO NOTHING;

-- Venue roles → VENUE grants, scoped to the venue the role was assigned in.
INSERT INTO "staff_permissions" ("id", "userId", "permissionKey", "scopeType", "scopeId", "grantedById", "reason")
SELECT
    gen_random_uuid()::text,
    vur."userId",
    p."key",
    'VENUE',
    vur."venueId",
    vur."assignedBy",
    'Migrated from venue role assignment'
FROM "venue_user_roles" vur
JOIN "users" u ON u."id" = vur."userId"
JOIN "role_permissions" rp ON rp."roleId" = vur."roleId"
JOIN "permissions" p ON p."id" = rp."permissionId"
ON CONFLICT DO NOTHING;

-- Tournament roles → TOURNAMENT grants.
INSERT INTO "staff_permissions" ("id", "userId", "permissionKey", "scopeType", "scopeId", "grantedById", "reason")
SELECT
    gen_random_uuid()::text,
    tur."userId",
    p."key",
    'TOURNAMENT',
    tur."tournamentId",
    tur."assignedBy",
    'Migrated from tournament role assignment'
FROM "tournament_user_roles" tur
JOIN "users" u ON u."id" = tur."userId"
JOIN "role_permissions" rp ON rp."roleId" = tur."roleId"
JOIN "permissions" p ON p."id" = rp."permissionId"
ON CONFLICT DO NOTHING;

-- Individual GRANT overrides → PLATFORM grants.
-- Joined against "permissions" so legacy colon-notation keys ("finance:read"),
-- which have no row in the library, are dropped instead of violating the FK.
INSERT INTO "staff_permissions" ("id", "userId", "permissionKey", "scopeType", "scopeId", "expiresAt", "reason", "grantedById", "grantedAt")
SELECT
    gen_random_uuid()::text,
    po."userId",
    po."permission",
    'PLATFORM',
    '',
    po."expiresAt",
    po."reason",
    po."grantedById",
    po."grantedAt"
FROM "permission_overrides" po
JOIN "users" u ON u."id" = po."userId"
JOIN "permissions" p ON p."key" = po."permission"
WHERE po."action" = 'GRANT'
  AND po."deletedAt" IS NULL
ON CONFLICT DO NOTHING;

-- ─── Drop the role machinery ────────────────────────────────────────────────

-- DropForeignKey
ALTER TABLE "permission_overrides" DROP CONSTRAINT "permission_overrides_userId_fkey";

-- DropTable
DROP TABLE "dynamic_permission_overrides";

-- DropTable
DROP TABLE "permission_overrides";

-- DropTable
DROP TABLE "platform_user_roles";

-- DropTable
DROP TABLE "role_permissions";

-- DropTable
DROP TABLE "venue_user_roles";

-- DropTable
DROP TABLE "tournament_user_roles";

-- DropTable
DROP TABLE "roles";

-- AddForeignKey
ALTER TABLE "staff_permissions" ADD CONSTRAINT "staff_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_permissions" ADD CONSTRAINT "staff_permissions_permissionKey_fkey" FOREIGN KEY ("permissionKey") REFERENCES "permissions"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── Pre-existing schema drift, folded in so migrate status stays clean ─────

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "staff_role_grants_userId_role_key" ON "staff_role_grants"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "users_setuptoken_key" ON "users"("setuptoken");
