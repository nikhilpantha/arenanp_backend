# Arena NP — Backend

NestJS modular monolith that will power a Nepal-based sports ecosystem: venue booking, public games, teams/clans, tournaments, live scoring, payments, and admin tooling.

This repo is built incrementally. **Current scope: foundation + Auth (phone+OTP) + Users.** Folders for the remaining 20 modules are reserved but not yet implemented.

- **API style:** GraphQL-first (Apollo + code-first), REST only for webhooks, health, payment callbacks, auth utilities, and upload callbacks.
- **Storage now:** Postgres (Prisma), Redis (OTP, rate limiting, future slot locks).
- **Storage later:** Cloudflare R2 (S3 SDK), FCM for push.
- **Realtime later:** Socket.io for live scoring, booking updates, bracket updates.

## Roles & capabilities

Only two roles exist:

- `USER` — every account
- `SUPER_ADMIN` — platform admin

Additional capabilities are gated by status fields on `User`:

- `organizerStatus` — `NOT_REQUESTED → PENDING_VERIFICATION → APPROVED / REJECTED / SUSPENDED`
- `venueOwnerStatus` — same lifecycle

Approved organizers will be able to create tournaments; approved venue owners will be able to create venues and manage their courts/bookings. SUPER_ADMIN can do everything plus approve/reject/suspend verification requests.

The `RolesGuard` and `CapabilityGuard` are already wired so adding these flows later is just resolver decorators + service logic.

## Quick start

```bash
# 1. Install
npm install

# 2. Spin up Postgres + Redis
npm run docker:up

# 3. Copy env and edit
cp .env.example .env

# 4. Generate Prisma client + run migrations + seed
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed

# 5. Dev
npm run dev
```

GraphQL playground: <http://localhost:4000/graphql>
Health check: <http://localhost:4000/health>

## Scripts

| script                          | purpose                           |
| ------------------------------- | --------------------------------- |
| `npm run dev`                   | Start NestJS in watch mode        |
| `npm run build`                 | Compile to `dist/`                |
| `npm start`                     | Run compiled build                |
| `npm run start:prod`            | Run `dist/main.js`                |
| `npm run lint`                  | ESLint + Prettier autofix         |
| `npm run prisma:generate`       | Regenerate Prisma client          |
| `npm run prisma:migrate`        | Run dev migrations                |
| `npm run prisma:migrate:deploy` | Apply migrations (CI/prod)        |
| `npm run prisma:studio`         | Open Prisma Studio                |
| `npm run prisma:seed`           | Run `prisma/seed.ts`              |
| `npm run docker:up`             | Start Postgres + Redis containers |
| `npm run docker:down`           | Stop containers                   |

## Project layout

```
src/
  main.ts                bootstrap
  app.module.ts          root module
  config/                typed config + env validation
  common/                decorators, guards, filters
  database/              PrismaModule + PrismaService
  redis/                 RedisModule + RedisService
  modules/
    auth/                phone+OTP login, JWT
    users/               profile + me query
prisma/
  schema.prisma          User + 3 enums (verification statuses)
  migrations/
  seed.ts                creates one SUPER_ADMIN
```

New modules get added under `src/modules/<name>/` as they're built — no placeholder folders kept around.

## Auth flow (current)

1. Client calls GraphQL `mutation requestOtp(input: { phoneNumber })`.
   - Server creates the user with `role: USER` if it doesn't exist.
   - Generates a 6-digit OTP, stores it in Redis at `otp:{phone}` with TTL `OTP_TTL_SECONDS`, increments `otp:attempts:{phone}`.
   - Returns `{ sentAt, expiresInSeconds, resendAvailableInSeconds }`. In dev (`SMS_PROVIDER=stub`) the OTP is also logged.
2. Client calls `mutation verifyOtp(input: { phoneNumber, code })`.
   - Server compares against Redis, enforces `OTP_MAX_ATTEMPTS`, on success deletes the key and signs a JWT.
   - Returns `{ accessToken, user }`.
3. Client sends `Authorization: Bearer <token>` on every subsequent request. `JwtAuthGuard` / `GqlAuthGuard` populates `request.user`.

A refresh-token model isn't wired yet — when you're ready to add session rotation, add a `RefreshToken` Prisma model + extend `AuthService.signTokens()`.

## Time zone

All timestamps are stored in UTC (Postgres `timestamptz`). The application time zone is `Asia/Kathmandu` (NPT, +05:45). Time-of-day conversions happen at the edge — never in the database.

## Framework versions

This project is on the current-supported tracks:

|                                      | version                                     |
| ------------------------------------ | ------------------------------------------- |
| Node.js                              | 20+ (engines `>=20.0.0`)                    |
| NestJS                               | 11.x                                        |
| `@nestjs/apollo` / `@nestjs/graphql` | 13.x                                        |
| Apollo Server                        | 5.x (Sandbox is the default dev UI)         |
| ESLint                               | 9.x (flat config — see `eslint.config.mjs`) |
| Prisma                               | 5.x                                         |
| TypeScript                           | 5.7.x                                       |

A handful of transitive deprecation warnings from deep tooling deps (old `glob`, `rimraf@3`, `uuid@9`, etc.) may still appear during `npm install`. They're harmless and resolve as upstream packages publish. Run `npm audit` periodically to track real security advisories.

## Contributing

The repo enforces consistent code + commit style via [husky](https://typicode.github.io/husky), [lint-staged](https://github.com/lint-staged/lint-staged), and [commitlint](https://commitlint.js.org). These hooks run automatically once you `npm install` (the `prepare` script wires husky).

**On every commit (pre-commit hook):**

- `*.ts` files get `eslint --fix` + `prettier --write`.
- `*.{json,md,yml,yaml,cjs,mjs}` files get `prettier --write`.
- Only staged files are touched (fast).

**On every commit message (commit-msg hook):**

Messages must follow [Conventional Commits](https://www.conventionalcommits.org). The hook rejects anything else.

```
<type>(<scope>): <subject>

<body — optional>
```

Allowed `<type>` values: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Examples:

```text
feat(bookings): add slot-lock service backed by redis
fix(auth): reject expired otp before checking attempts
chore: bump @nestjs/apollo to 13.4.0
docs(readme): document contributing flow
```

Subject rules: lowercase, no trailing period, ≤100 chars. Full header ≤120 chars.

**Bypass (use sparingly):** `git commit --no-verify` skips both hooks. Reserved for emergency hotfixes; CI should still enforce the same rules so you can't sneak bad code into `main`.

## What's next

Modules will be added in this rough order:

1. **Sports** (catalog) → **Venues** + **Venue-owner verification** → **Courts**
2. **Bookings** (Redis slot lock) → **Payments** (eSewa first) → **Webhooks**
3. **Uploads** (R2 presigned URLs) — needed by venues for photos
4. **Teams/Clans** → **Public Games**
5. **Organizer-verification** → **Tournaments** → **Brackets** → **Live Scoring**
6. **Reviews**, **Notifications** (FCM), **Loyalty**, **Subscriptions**
7. **Admin**, **Reports**

Each module slots into the existing structure without changing the foundation.
