-- Remove the last of the role machinery.
--
-- `staff_role_grants` implemented temporary role promotions ("make this support
-- agent a moderator for a month"). Nothing consumed the role it produced any
-- more, and the capability it existed for is covered by StaffPermission.expiresAt,
-- which grants a single permission for a window rather than a whole role.
--
-- `OverrideAction` was the GRANT/REVOKE enum for permission_overrides, dropped
-- in 20260802090000. Nothing references it.
--
-- This also adds foreign keys the staff tables never had. Their absence is what
-- let orphaned rows accumulate — a deleted user left assignment rows pointing at
-- nothing, which broke an earlier migration. Orphans are cleared first so the
-- constraints can be created.

-- DropTable
DROP TABLE "staff_role_grants";

-- DropEnum
DROP TYPE "OverrideAction";

-- Clear rows pointing at deleted parents, so the FKs below can be added.
DELETE FROM "system_staff" s
  WHERE NOT EXISTS (SELECT 1 FROM "users" u WHERE u."id" = s."userId");

DELETE FROM "venue_staff" v
  WHERE NOT EXISTS (SELECT 1 FROM "users" u WHERE u."id" = v."userId")
     OR NOT EXISTS (SELECT 1 FROM "venues" n WHERE n."id" = v."venueId");

DELETE FROM "organizer_staff" o
  WHERE NOT EXISTS (SELECT 1 FROM "users" u WHERE u."id" = o."userId")
     OR (o."tournamentId" IS NOT NULL
         AND NOT EXISTS (SELECT 1 FROM "tournaments" t WHERE t."id" = o."tournamentId"));

-- AddForeignKey
ALTER TABLE "system_staff" ADD CONSTRAINT "system_staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_staff" ADD CONSTRAINT "venue_staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_staff" ADD CONSTRAINT "venue_staff_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "venues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizer_staff" ADD CONSTRAINT "organizer_staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizer_staff" ADD CONSTRAINT "organizer_staff_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
