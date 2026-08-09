import * as argon2 from 'argon2';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const phone = process.env.SEED_SUPER_ADMIN_PHONE ?? '+9779800000000';
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? 'Arena NP Admin';
  const email = process.env.SEED_SUPER_ADMIN_EMAIL ?? 'admin@arenanp.local';
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD ?? 'ChangeMe!Admin123';

  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

  // `isStaff` is what the admin panel gates on — without it this account can
  // authenticate but cannot open the panel.
  const admin = await prisma.user.upsert({
    where: { phoneNumber: phone },
    update: {
      role: UserRole.SUPER_ADMIN,
      fullName: name,
      email,
      passwordHash,
      isActive: true,
      isStaff: true,
    },
    create: {
      phoneNumber: phone,
      fullName: name,
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      isStaff: true,
    },
  });

  // The super admin is a platform staff member; make sure the marker row exists.
  await prisma.systemStaff.upsert({
    where: { userId: admin.id },
    update: { status: 'ACTIVE' },
    create: { userId: admin.id, createdBy: admin.id, status: 'ACTIVE' },
  });

  console.log(`Seeded SUPER_ADMIN:`);
  console.log(`  id:    ${admin.id}`);
  console.log(`  phone: ${admin.phoneNumber}`);
  console.log(`  email: ${admin.email}`);
  console.log(`  password: (from SEED_SUPER_ADMIN_PASSWORD env)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
