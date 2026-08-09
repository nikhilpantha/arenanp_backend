-- Lock each subscription's terms to what was bought, instead of reading them live
-- off the plan. Re-pricing or re-timing a plan must never rewrite a member's
-- running term — the same rule bookings already follow with `pricePerHour`.
--
-- Added nullable, backfilled, then made required, so existing memberships survive.

-- 1. Add the columns.
ALTER TABLE "subscriptions"
  ADD COLUMN "daysOfWeek"     TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "pausedAt"       TIMESTAMP(3),
  ADD COLUMN "price"          DECIMAL(10,2),
  ADD COLUMN "sessionMinutes" INTEGER,
  ADD COLUMN "validityDays"   INTEGER;

-- 2. Backfill the terms from the plan they're on.
UPDATE "subscriptions" s
SET "validityDays"   = pl."validityDays",
    "sessionMinutes" = pl."sessionMinutes",
    "daysOfWeek"     = pl."daysOfWeek",
    "price"          = pl."price"
FROM "membership_plans" pl
WHERE pl."id" = s."planId";

-- 3. Price is the one term we can do better than the plan on: the last payment is
--    what this member was actually charged, which is the truth if the plan has
--    been re-priced since. Ignore the Rs 0 rows that player self-subscribe
--    requests used to write — those record no money and would zero out the price.
UPDATE "subscriptions" s
SET "price" = p."amount"
FROM (
  SELECT DISTINCT ON ("subscriptionId") "subscriptionId", "amount"
  FROM "subscription_payments"
  WHERE "amount" > 0
  ORDER BY "subscriptionId", "createdAt" DESC
) p
WHERE p."subscriptionId" = s."id";

-- 4. A pause in progress has no recorded start, so treat it as starting now —
--    resuming then extends the expiry from here rather than crediting days that
--    were never tracked.
UPDATE "subscriptions"
SET "pausedAt" = CURRENT_TIMESTAMP
WHERE "status" = 'PAUSED';

-- 5. Now they can be required.
ALTER TABLE "subscriptions"
  ALTER COLUMN "daysOfWeek"     SET NOT NULL,
  ALTER COLUMN "price"          SET NOT NULL,
  ALTER COLUMN "sessionMinutes" SET NOT NULL,
  ALTER COLUMN "validityDays"   SET NOT NULL;
