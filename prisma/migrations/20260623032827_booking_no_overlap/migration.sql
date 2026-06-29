-- Prevent double-booking a court at the DB level: two non-cancelled bookings on the same
-- court cannot have overlapping [startAt, endAt) windows. This makes direct (instant-confirm)
-- player bookings race-safe even under concurrent requests, and also guards the venue paths.
--
-- NOTE: hand-written (Prisma can't express GiST exclusion constraints). If `migrate deploy`
-- fails here, the DB already contains overlapping non-cancelled bookings on a court — resolve
-- them first, e.g.:
--   SELECT a.id, b.id, a."courtId" FROM bookings a JOIN bookings b
--     ON a."courtId" = b."courtId" AND a.id < b.id
--     AND a.status <> 'CANCELLED' AND b.status <> 'CANCELLED'
--     AND a."startAt" < b."endAt" AND a."endAt" > b."startAt";

CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "bookings"
  ADD CONSTRAINT "bookings_no_overlap"
  EXCLUDE USING gist (
    "courtId" WITH =,
    tsrange("startAt", "endAt") WITH &&
  ) WHERE ("status" <> 'CANCELLED');
