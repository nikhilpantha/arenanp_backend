-- Tournaments that were already submitted/published before the listing fee
-- existed are treated as settled, so the new "paid before approval" gate
-- doesn't strand them.
UPDATE "tournaments" SET "listingFeePaid" = true WHERE "status" <> 'DRAFT';
