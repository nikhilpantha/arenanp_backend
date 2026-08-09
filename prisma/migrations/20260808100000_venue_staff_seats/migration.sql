-- Mark seats whose login the venue minted, as opposed to a personal account
-- that was attached to the venue.
--
-- Defaults false: every seat that exists today belongs to someone who created
-- their own account, which is exactly what false means.
ALTER TABLE "venue_memberships"
  ADD COLUMN "provisionedUser" BOOLEAN NOT NULL DEFAULT false;
