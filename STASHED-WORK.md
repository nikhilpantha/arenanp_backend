# Stashed: tournament + finance + organizer backend

Parked on **2026-08-04** so the working tree only showed the venue
login / signup / onboarding + admin-sports work. **Nothing was deleted.**

## Bring it back

```bash
cd arenanp_backend
git stash list          # look for "wip: tournament + finance + organizer backend"
git stash pop           # or: git stash apply   (keeps the stash as a safety copy)
npx prisma generate     # regenerate the client with the finance/tournament models
pnpm build
```

Prefer `git stash apply` the first time — it restores the files but keeps the
stash entry, so a mistake costs nothing.

## What's in the stash

| Area        | Modules                                                                                                                                                                                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tournaments | `tournaments`, `tournament-fixtures`, `tournament-registrations`, `tournament-results`, `tournament-payments`                                                                                                                                                          |
| Scoring     | `match-scoring`, `sport-scoring`                                                                                                                                                                                                                                       |
| Finance     | `finance` (Expense + CashReconciliation)                                                                                                                                                                                                                               |
| Organizer   | `organizer` (professional profile)                                                                                                                                                                                                                                     |
| Wiring      | `app.module.ts` imports, `admin/tournaments`, `admin/settings`, `auth.service.ts`, `booking.repository.ts`, `permissions.ts`, `storage.constants.ts`, `nepal-time.ts`, `env.validation.ts`, `package.json`, `.env.example`, `schema.gql`, `seed-tournament-scoring.ts` |

≈7,800 lines. The matching UI already exists: `finance.tsx` on the app's `main`
branch, and the organizer console + live scoring on the app's `tournament`
branch.

## What was deliberately NOT stashed, and why

`prisma/` stays in the working tree — schema files and migrations:

- **`finance.prisma` must stay.** The committed `venue.prisma` has
  `expenses Expense[]` and `cashReconciliations CashReconciliation[]` on the
  `Venue` model. Remove the file and the schema fails to validate, so the
  backend won't build at all.
- **The migrations must stay.** All 33 are applied to the database. Remove the
  folders and Prisma sees history it can't account for; worse, with the models
  gone `prisma migrate dev` would offer to DROP the tournament and finance
  tables.

So `git status` still shows `prisma/schema/{identity,platform,tournament}.prisma`
modified plus `finance.prisma` and 11 migration folders untracked. That's
load-bearing, not noise.

## While the stash is out

⚠️ **Don't run `prisma migrate dev`** without checking the plan it prints. The
schema is complete, so it should be a no-op — but the module code that owns
those tables isn't here, so anything unexpected is worth stopping for.

Everything verified after stashing: schema valid, migrations in sync, typecheck
clean, `nest build` clean, API starts, and the venue flows answer (5 sports,
17 amenities). The tournament API is correctly absent.
