-- Give every venue a permanent URL-safe handle.
--
-- Staff login emails are minted as `<name>@<slug>.arenanp.com`, so this column
-- is part of every staff member's credentials and must never be regenerated
-- after creation (see the doc comment on Venue.slug and updateProfile).
--
-- Three steps, because the column is NOT NULL UNIQUE on a table that has rows:
-- add it nullable, backfill it, then constrain it.

-- 1. Add nullable.
ALTER TABLE "venues" ADD COLUMN "slug" TEXT;

-- 2. Backfill from the name, mirroring src/modules/venue/venue-slug.ts:
--    lowercase, collapse every run of non-alphanumerics to a hyphen, trim
--    hyphens, cap at 40 chars. A name with no Latin characters (fully
--    Devanagari) collapses to empty and falls back to 'venue'.
--
--    Deliberately NOT using unaccent(): it needs an extension that may not be
--    installed, and it would only matter for accented Latin names, which
--    Nepali venue names are not. An accented character just becomes a hyphen
--    here, where the app would fold it to its base letter — a difference that
--    can only show up on rows that already exist, all of which are checked
--    below.
WITH slugged AS (
  SELECT
    "id",
    "createdAt",
    COALESCE(
      NULLIF(
        -- Trim again after the cut: truncating at 40 can leave a trailing hyphen.
        TRIM(BOTH '-' FROM LEFT(
          TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER("name"), '[^a-z0-9]+', '-', 'g')),
          40
        )),
        ''
      ),
      'venue'
    ) AS base
  FROM "venues"
),
numbered AS (
  SELECT
    "id",
    base,
    ROW_NUMBER() OVER (PARTITION BY base ORDER BY "createdAt", "id") AS n
  FROM slugged
)
UPDATE "venues" v
SET "slug" = CASE WHEN nu.n = 1 THEN nu.base ELSE nu.base || '-' || nu.n END
FROM numbered nu
WHERE v."id" = nu."id";

-- 3. Constrain.
ALTER TABLE "venues" ALTER COLUMN "slug" SET NOT NULL;
CREATE UNIQUE INDEX "venues_slug_key" ON "venues"("slug");
