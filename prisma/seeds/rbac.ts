import { PrismaClient, PermissionDomain, UserRole } from '@prisma/client';
import { flattenPermissionCatalog } from '../../src/common/constants/permission-keys';

const prisma = new PrismaClient();

/**
 * Reconciles the three signals that answer "is this person platform staff?"
 *
 * `system_staff` is the authority. Any account carrying a staff role marker but
 * missing its row gets one, and `isStaff` is squared up with reality. Without
 * this, an account can be a SUPER_ADMIN that the admin panel refuses to let in
 * — which is exactly what happened to the seeded super admin.
 */
async function reconcilePlatformStaff(): Promise<void> {
  console.log('\n🌱 Reconciling platform staff records...');

  const staffByRole = await prisma.user.findMany({
    where: { role: { not: UserRole.USER } },
    select: { id: true, email: true, phoneNumber: true, systemStaff: { select: { id: true } } },
  });

  let created = 0;
  for (const user of staffByRole) {
    if (user.systemStaff) continue;
    await prisma.systemStaff.create({
      data: { userId: user.id, createdBy: user.id, status: 'ACTIVE' },
    });
    created += 1;
    console.log(`  ✓ added staff record for ${user.email ?? user.phoneNumber}`);
  }

  // `isStaff` is a denormalised cache of "has any staff record" — resync it.
  const promoted = await prisma.user.updateMany({
    where: {
      isStaff: false,
      OR: [
        { systemStaff: { isNot: null } },
        { venueStaff: { some: {} } },
        { organizerStaff: { some: {} } },
      ],
    },
    data: { isStaff: true },
  });

  const demoted = await prisma.user.updateMany({
    where: {
      isStaff: true,
      systemStaff: { is: null },
      venueStaff: { none: {} },
      organizerStaff: { none: {} },
    },
    data: { isStaff: false },
  });

  console.log(
    `  ✓ ${created} staff record(s) created, isStaff resynced (+${promoted.count} / -${demoted.count})`,
  );
}

/**
 * Seeds the permission library.
 *
 * There are no roles to seed — every staff member is granted permissions
 * individually. These rows are reference data owned by the catalog in
 * `src/common/constants/permission-keys.ts`; admins only grant and revoke them.
 *
 * Idempotent: safe to re-run after adding permissions to the catalog.
 * Permissions removed from the catalog are deleted, which cascades to any
 * grants that referenced them.
 */
async function main() {
  console.log('🌱 Seeding permission library...');

  const permissions = flattenPermissionCatalog();

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      create: {
        key: permission.key,
        name: permission.name,
        description: permission.description,
        domain: permission.domain as PermissionDomain,
      },
      update: {
        name: permission.name,
        description: permission.description,
        domain: permission.domain as PermissionDomain,
      },
    });
  }

  const stale = await prisma.permission.deleteMany({
    where: { key: { notIn: permissions.map((p) => p.key) } },
  });

  const byDomain = permissions.reduce<Record<string, number>>((acc, p) => {
    acc[p.domain] = (acc[p.domain] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`  ✓ ${permissions.length} permissions upserted`);
  for (const [domain, count] of Object.entries(byDomain)) {
    console.log(`      ${domain}: ${count}`);
  }
  if (stale.count > 0) {
    console.log(`  ✓ ${stale.count} permission(s) no longer in the catalog removed`);
  }

  await reconcilePlatformStaff();

  console.log('\n✅ Permission seed complete');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding permissions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
