/**
 * Dev helper: approve a venue account + its venue listings so the mobile venue
 * panel goes "active" without running the full admin-web approval flow.
 *
 *   npx ts-node scripts/approve-venue.ts +9779812345678
 *
 * Sets the user's VENUE capability to APPROVED and flips every venue they own to
 * verificationStatus = APPROVED. The OWNER membership already exists from submitVenue.
 *
 * (The real flow is the super-admin approving via the admin web — this is a shortcut.)
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const phone = process.argv[2];
  if (!phone) {
    console.error('Usage: npx ts-node scripts/approve-venue.ts <phoneE164 e.g. +9779812345678>');
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { phoneNumber: phone } });
  if (!user) {
    console.error(`No user found with phone ${phone}. Sign up + submit a venue first.`);
    process.exit(1);
  }

  await prisma.userCapability.upsert({
    where: { userId_type: { userId: user.id, type: 'VENUE' } },
    update: { status: 'APPROVED' },
    create: { userId: user.id, type: 'VENUE', status: 'APPROVED' },
  });

  const { count } = await prisma.venue.updateMany({
    where: { primaryOwnerId: user.id },
    data: { verificationStatus: 'APPROVED' },
  });

  console.log(`✅ Approved VENUE capability for ${phone} and ${count} venue listing(s).`);
  console.log('   Reload the app (press "r" in Metro) so it re-fetches identity.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
