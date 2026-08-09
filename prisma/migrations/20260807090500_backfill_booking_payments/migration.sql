-- Seed the payment ledger from bookings that were paid before it existed.
--
-- `bookings.amountPaid` was a single overwritten column, so the real collection
-- time of this money was never recorded. We use the booking's own createdAt as
-- the best available timestamp and mark the row `backfilled` so reports can tell
-- a reconstructed opening balance from a payment genuinely taken at that moment.
--
-- Idempotent twice over: the id is derived from the booking id, and the NOT
-- EXISTS guard skips any booking that already has ledger rows — so re-running
-- this (or applying it after payments have been itemised) cannot duplicate.
INSERT INTO "booking_payments" (
  "id", "bookingId", "venueId", "amount", "method",
  "takenAt", "backfilled", "note", "createdAt"
)
SELECT
  'bkfl_' || b."id",
  b."id",
  b."venueId",
  b."amountPaid",
  b."paymentMethod",
  b."createdAt",
  true,
  'Opening balance — collected before payments were itemised.',
  NOW()
FROM "bookings" b
WHERE b."amountPaid" > 0
  AND NOT EXISTS (
    SELECT 1 FROM "booking_payments" p WHERE p."bookingId" = b."id"
  );
