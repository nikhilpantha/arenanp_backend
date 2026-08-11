-- Venue permissions move from VenueMembership.role to per-user grants.
--
-- The venue guard now reads staff_permissions (scopeType = VENUE, scopeId = the
-- venue id). `role` survives as a job title: it seeds a starting set when a seat
-- is created and is a display label thereafter.
--
-- Existing seats are converted here so nobody loses access at deploy time. The
-- sets below mirror VENUE_ROLE_PRESETS in
-- src/common/constants/venue-role-presets.ts.
--
-- Primary owners are deliberately skipped: the guard grants them an implicit
-- wildcard, and rows written now would outlive a transfer of ownership.

-- The venue keys must exist before grants can reference them (the FK is on
-- permissionKey) and the seeder runs after migrations, so a fresh deploy would
-- silently skip any key the library does not yet hold. Insert them here with
-- provisional labels; `prisma:seed:rbac` upserts the canonical text afterwards.
INSERT INTO "permissions" ("id", "key", "name", "description", "domain", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, key, name, NULL, 'VENUE_MANAGEMENT', NOW(), NOW()
FROM (VALUES
  ('venue.view',               'View Venue'),
  ('venue.edit',               'Edit Venue'),
  ('venue.bookings.view',      'View Bookings'),
  ('venue.bookings.manage',    'Manage Bookings'),
  ('venue.calendar.manage',    'Manage Calendar'),
  ('venue.customers.view',     'View Customers'),
  ('venue.offers.manage',      'Manage Offers'),
  ('venue.memberships.manage', 'Manage Memberships'),
  ('venue.teams.manage',       'Manage Teams'),
  ('venue.finance.view',       'View Finance'),
  ('venue.finance.manage',     'Record Finance'),
  ('venue.finance.payout',     'Manage Payouts'),
  ('venue.staff.view',         'View Venue Staff'),
  ('venue.staff.manage',       'Manage Venue Staff')
) AS v(key, name)
ON CONFLICT ("key") DO NOTHING;

INSERT INTO "staff_permissions"
  ("id", "userId", "permissionKey", "scopeType", "scopeId", "grantedById", "reason")
SELECT
  gen_random_uuid()::text,
  vm."userId",
  key,
  'VENUE',
  vm."venueId",
  COALESCE(vm."invitedById", v."primaryOwnerId"),
  'Migrated from venue seat role'
FROM "venue_memberships" vm
JOIN "users" u ON u."id" = vm."userId"
JOIN "venues" v ON v."id" = vm."venueId"
CROSS JOIN LATERAL unnest(
  CASE vm."role"
    WHEN 'OWNER' THEN ARRAY[
      'venue.view','venue.edit','venue.bookings.view','venue.bookings.manage',
      'venue.calendar.manage','venue.customers.view','venue.offers.manage',
      'venue.memberships.manage','venue.teams.manage','venue.finance.view',
      'venue.finance.manage','venue.finance.payout','venue.staff.view','venue.staff.manage'
    ]
    WHEN 'MANAGER' THEN ARRAY[
      'venue.view','venue.edit','venue.bookings.view','venue.bookings.manage',
      'venue.calendar.manage','venue.customers.view','venue.offers.manage',
      'venue.memberships.manage','venue.teams.manage','venue.finance.view',
      'venue.finance.manage','venue.staff.view'
    ]
    WHEN 'FRONT_DESK' THEN ARRAY[
      'venue.view','venue.bookings.view','venue.bookings.manage',
      'venue.calendar.manage','venue.customers.view'
    ]
    WHEN 'STAFF' THEN ARRAY[
      'venue.view','venue.bookings.view','venue.calendar.manage','venue.customers.view'
    ]
    WHEN 'COACH' THEN ARRAY[
      'venue.view','venue.bookings.view','venue.calendar.manage'
    ]
    ELSE ARRAY[]::text[]
  END
) AS key
-- A suspended seat grants nothing, and the primary owner needs no rows.
WHERE vm."status" = 'ACTIVE'
  AND vm."userId" <> v."primaryOwnerId"
  -- Only keys present in the library, so the FK holds.
  AND EXISTS (SELECT 1 FROM "permissions" p WHERE p."key" = key)
ON CONFLICT DO NOTHING;
