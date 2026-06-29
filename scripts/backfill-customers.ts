/**
 * One-off backfill for the unified-customer model (P1). Run AFTER the
 * `add_customer_kind` migration deploys + the client is regenerated:
 *
 *   npm run docker:up
 *   npx prisma migrate deploy && npx prisma generate
 *   npx ts-node scripts/backfill-customers.ts
 *
 * Phase 1 — link legacy bookings: every booking with no `customerId` but a phone is
 * deduped (by phoneKey) into one venue Customer, so repeat walk-ins merge into a single
 * record. Phoneless walk-ins are left inline (can't be deduped). Idempotent.
 *
 * Phase 2 — roll `Customer.kind` up from its bookings' `customerType` (TEAM > CLUB >
 * INDIVIDUAL precedence on conflict). Only promotes customers still at the default
 * INDIVIDUAL, so it never clobbers an owner-edited kind and is safe to re-run. Bookings
 * are never modified; their `customerType` stays the per-booking snapshot.
 *
 * Take a DB snapshot before running.
 */
import { CustomerType, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** Lenient canonical phone key — strips non-digits and a leading 977 (mirrors phone.util). */
function phoneKey(input: string): string {
  const digits = input.replace(/[^\d]/g, '');
  return digits.startsWith('977') ? digits.slice(3) : digits;
}

/** Trim + collapse internal whitespace (mirrors customers.repository normalizeName). */
function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, ' ');
}

function appendNote(existing: string | null, line: string): string {
  return existing ? `${existing}\n${line}` : line;
}

/** Get-or-create a venue customer by phone (mirrors CustomersRepository.getOrCreateForWalkIn). */
async function getOrCreateWalkIn(
  venueId: string,
  name: string,
  phoneRaw: string,
  kind: CustomerType,
) {
  const phone = phoneKey(phoneRaw);
  const existing = await prisma.customer.findFirst({ where: { venueId, phone } });
  if (existing) return existing;
  try {
    return await prisma.customer.create({
      data: { venueId, name: normalizeName(name || 'Walk-in'), phone, kind },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
      const row = await prisma.customer.findFirst({ where: { venueId, phone } });
      if (row) return row;
    }
    throw e;
  }
}

/** Highest-precedence party type present among a customer's bookings. */
const PRECEDENCE: CustomerType[] = [CustomerType.TEAM, CustomerType.CLUB, CustomerType.INDIVIDUAL];

async function phase1LinkBookings(): Promise<number> {
  let linked = 0;
  // Re-query each batch from scratch: linked rows leave the `customerId IS NULL` filter.
  for (;;) {
    const rows = await prisma.booking.findMany({
      where: { customerId: null, customerPhone: { not: null } },
      select: {
        id: true,
        venueId: true,
        customerName: true,
        customerPhone: true,
        customerType: true,
      },
      orderBy: { id: 'asc' },
      take: 500,
    });
    if (rows.length === 0) break;
    for (const b of rows) {
      const customer = await getOrCreateWalkIn(
        b.venueId,
        b.customerName ?? 'Walk-in',
        b.customerPhone as string,
        b.customerType,
      );
      await prisma.booking.update({ where: { id: b.id }, data: { customerId: customer.id } });
      linked += 1;
    }
    console.log(`  …linked ${linked} bookings so far`);
  }
  return linked;
}

async function phase2RollKindUp(): Promise<number> {
  const groups = await prisma.booking.groupBy({
    by: ['customerId', 'customerType'],
    where: { customerId: { not: null } },
  });
  const byCustomer = new Map<string, Set<CustomerType>>();
  for (const g of groups) {
    if (!g.customerId) continue;
    const set = byCustomer.get(g.customerId) ?? new Set<CustomerType>();
    set.add(g.customerType);
    byCustomer.set(g.customerId, set);
  }

  let updated = 0;
  for (const [customerId, types] of byCustomer) {
    const derived = PRECEDENCE.find((t) => types.has(t)) ?? CustomerType.INDIVIDUAL;
    if (derived === CustomerType.INDIVIDUAL) continue;
    const cust = await prisma.customer.findUnique({
      where: { id: customerId },
      select: { kind: true, notes: true },
    });
    // Only promote customers still at the default — never clobber an owner-set kind.
    if (!cust || cust.kind !== CustomerType.INDIVIDUAL) continue;
    const mixed = types.size > 1;
    await prisma.customer.update({
      where: { id: customerId },
      data: {
        kind: derived,
        notes: mixed
          ? appendNote(
              cust.notes,
              `[migration] mixed booking types: ${[...types].join(',')} — set ${derived}`,
            )
          : cust.notes,
      },
    });
    updated += 1;
  }
  return updated;
}

async function main() {
  console.log('Phase 1: linking legacy bookings to venue customers by phone…');
  const linked = await phase1LinkBookings();
  console.log(`Phase 1 done — linked ${linked} booking(s).`);

  console.log('Phase 2: rolling Customer.kind up from booking types…');
  const promoted = await phase2RollKindUp();
  console.log(`Phase 2 done — promoted ${promoted} customer(s) to TEAM/CLUB.`);

  // Verify against exactly what phase 1 links: every phone-bearing, customerId-null
  // booking (any source), not just WALK_IN — else an unlinked ONLINE row would hide here.
  const stillNull = await prisma.booking.count({
    where: { customerId: null, customerPhone: { not: null } },
  });
  console.log(`Verify — phone-bearing bookings still unlinked: ${stillNull} (expect 0)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
