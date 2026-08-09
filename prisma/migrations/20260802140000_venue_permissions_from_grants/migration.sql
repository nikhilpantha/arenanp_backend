-- Venue permissions move from VenueMembership.role to per-user grants.
--
-- The venue guard now reads staff_permissions (scopeType = VENUE, scopeId =
-- the venue id) instead of expanding a role through a hardcoded map. Existing
-- members are converted here so nobody loses access at deploy time.
--
-- Venue OWNERs are deliberately not expanded: the guard grants the venue's
-- primaryOwner an implicit wildcard, so writing rows for them would create
-- grants that outlive an ownership transfer.
--
-- `venue_memberships.role` is left in place as a display label. Nothing derives
-- authority from it any more — the map that did has been deleted.

-- The venue keys must exist before grants can reference them (the FK is on
-- permissionKey), and the seeder runs after migrations. Insert them here with
-- provisional labels; `prisma:seed:rbac` upserts the canonical name and
-- description afterwards.
INSERT INTO "permissions" ("id", "key", "name", "description", "domain", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, key, name, NULL, 'VENUE_MANAGEMENT', NOW(), NOW()
FROM (VALUES
  ('venue.view',                'View Venue'),
  ('venue.edit',                'Edit Venue'),
  ('venue.bookings.view',       'View Bookings'),
  ('venue.bookings.manage',     'Manage Bookings'),
  ('venue.calendar.manage',     'Manage Calendar'),
  ('venue.customers.view',      'View Customers'),
  ('venue.offers.manage',       'Manage Offers'),
  ('venue.memberships.manage',  'Manage Memberships'),
  ('venue.teams.manage',        'Manage Teams'),
  ('venue.finance.view',        'View Finance'),
  ('venue.finance.payout',      'Manage Payouts'),
  ('venue.staff.view',          'View Venue Staff'),
  ('venue.staff.manage',        'Manage Venue Staff')
) AS v(key, name)
ON CONFLICT ("key") DO NOTHING;

-- The old colon-notation permissions map onto the catalog keys as:
--   venue:edit          -> venue.edit
--   bookings:read       -> venue.bookings.view
--   bookings:write      -> venue.bookings.manage
--   calendar:manage     -> venue.calendar.manage
--   customers:read      -> venue.customers.view
--   offers:manage       -> venue.offers.manage
--   memberships:manage  -> venue.memberships.manage
--   teams:manage        -> venue.teams.manage
--   finance:read        -> venue.finance.view
--   finance:payout      -> venue.finance.payout
--   staff:manage        -> venue.staff.manage

INSERT INTO "staff_permissions"
  ("id", "userId", "permissionKey", "scopeType", "scopeId", "grantedById", "reason")
SELECT
  gen_random_uuid()::text,
  vm."userId",
  mapped.key,
  'VENUE',
  vm."venueId",
  COALESCE(vm."invitedById", v."primaryOwnerId"),
  'Migrated from venue membership role'
FROM "venue_memberships" vm
JOIN "users" u ON u."id" = vm."userId"
JOIN "venues" v ON v."id" = vm."venueId"
CROSS JOIN LATERAL (
  SELECT key FROM (
    -- Role defaults, mirroring the ROLE_PERMISSIONS map being deleted.
    SELECT unnest(
      CASE vm."role"
        WHEN 'MANAGER' THEN ARRAY[
          'venue.edit','venue.bookings.view','venue.bookings.manage','venue.calendar.manage',
          'venue.customers.view','venue.offers.manage','venue.memberships.manage',
          'venue.teams.manage','venue.finance.view'
        ]
        WHEN 'FRONT_DESK' THEN ARRAY[
          'venue.bookings.view','venue.bookings.manage','venue.calendar.manage','venue.customers.view'
        ]
        WHEN 'STAFF' THEN ARRAY[
          'venue.bookings.view','venue.calendar.manage','venue.customers.view'
        ]
        WHEN 'COACH' THEN ARRAY[
          'venue.bookings.view','venue.calendar.manage'
        ]
        ELSE ARRAY[]::text[]
      END
    ) AS key

    UNION

    -- Per-membership overrides, translated from the old colon notation.
    SELECT CASE ovr
      WHEN 'venue:edit'         THEN 'venue.edit'
      WHEN 'bookings:read'      THEN 'venue.bookings.view'
      WHEN 'bookings:write'     THEN 'venue.bookings.manage'
      WHEN 'calendar:manage'    THEN 'venue.calendar.manage'
      WHEN 'customers:read'     THEN 'venue.customers.view'
      WHEN 'offers:manage'      THEN 'venue.offers.manage'
      WHEN 'memberships:manage' THEN 'venue.memberships.manage'
      WHEN 'teams:manage'       THEN 'venue.teams.manage'
      WHEN 'finance:read'       THEN 'venue.finance.view'
      WHEN 'finance:payout'     THEN 'venue.finance.payout'
      WHEN 'staff:manage'       THEN 'venue.staff.manage'
      ELSE NULL
    END AS key
    FROM unnest(vm."permissions") AS ovr
  ) keys
  WHERE key IS NOT NULL
) AS mapped
-- Owners hold an implicit wildcard; suspended seats grant nothing.
WHERE vm."role" <> 'OWNER'
  AND vm."status" = 'ACTIVE'
  -- Only keys that exist in the library, so the FK holds.
  AND EXISTS (SELECT 1 FROM "permissions" p WHERE p."key" = mapped.key)
ON CONFLICT DO NOTHING;
