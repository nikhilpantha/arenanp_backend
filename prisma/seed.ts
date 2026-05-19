import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const phone = process.env.SEED_SUPER_ADMIN_PHONE ?? '+9779800000000';
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? 'Arena NP Admin';

  const admin = await prisma.user.upsert({
    where: { phoneNumber: phone },
    update: { role: UserRole.SUPER_ADMIN, fullName: name, isActive: true },
    create: {
      phoneNumber: phone,
      fullName: name,
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log(`Seeded SUPER_ADMIN: ${admin.phoneNumber} (id=${admin.id})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
