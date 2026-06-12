import * as argon2 from 'argon2';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_SPORTS = [
  { slug: 'futsal', name: 'Futsal', displayOrder: 10 },
  { slug: 'football', name: 'Football', displayOrder: 20 },
  { slug: 'cricket', name: 'Cricket', displayOrder: 30 },
  { slug: 'indoor-cricket', name: 'Indoor Cricket', displayOrder: 35 },
  { slug: 'basketball', name: 'Basketball', displayOrder: 40 },
  { slug: 'volleyball', name: 'Volleyball', displayOrder: 50 },
  { slug: 'badminton', name: 'Badminton', displayOrder: 60 },
  { slug: 'tennis', name: 'Tennis', displayOrder: 70 },
  { slug: 'table-tennis', name: 'Table Tennis', displayOrder: 80 },
];

async function main() {
  const phone = process.env.SEED_SUPER_ADMIN_PHONE ?? '+9779800000000';
  const name = process.env.SEED_SUPER_ADMIN_NAME ?? 'Arena NP Admin';
  const email = process.env.SEED_SUPER_ADMIN_EMAIL ?? 'admin@arenanp.local';
  const password = process.env.SEED_SUPER_ADMIN_PASSWORD ?? 'ChangeMe!Admin123';

  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

  const admin = await prisma.user.upsert({
    where: { phoneNumber: phone },
    update: {
      role: UserRole.SUPER_ADMIN,
      fullName: name,
      email,
      passwordHash,
      isActive: true,
    },
    create: {
      phoneNumber: phone,
      fullName: name,
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log(`Seeded SUPER_ADMIN:`);
  console.log(`  id:    ${admin.id}`);
  console.log(`  phone: ${admin.phoneNumber}`);
  console.log(`  email: ${admin.email}`);
  console.log(`  password: (from SEED_SUPER_ADMIN_PASSWORD env)`);

  // ── Sports catalogue ────────────────────────────────────────────────────
  for (const sport of DEFAULT_SPORTS) {
    await prisma.sport.upsert({
      where: { slug: sport.slug },
      update: { name: sport.name, displayOrder: sport.displayOrder },
      create: {
        slug: sport.slug,
        name: sport.name,
        displayOrder: sport.displayOrder,
        createdById: admin.id,
      },
    });
  }
  console.log(`Seeded ${DEFAULT_SPORTS.length} default sports.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
