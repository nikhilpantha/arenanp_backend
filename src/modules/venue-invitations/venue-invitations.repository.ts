import { Injectable } from '@nestjs/common';
import { CapabilityStatus, CapabilityType, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

const INVITATION_INCLUDES = {
  invitedBy: true,
  createdUser: true,
} satisfies Prisma.VenueInvitationInclude;

export type InvitationWithRelations = Prisma.VenueInvitationGetPayload<{
  include: typeof INVITATION_INCLUDES;
}>;

@Injectable()
export class VenueInvitationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<InvitationWithRelations | null> {
    return this.prisma.venueInvitation.findUnique({
      where: { id },
      include: INVITATION_INCLUDES,
    });
  }

  /** Pending = not yet accepted and not expired. */
  findPendingByEmail(email: string): Promise<InvitationWithRelations | null> {
    return this.prisma.venueInvitation.findFirst({
      where: {
        email,
        acceptedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: INVITATION_INCLUDES,
    });
  }

  listPending(): Promise<InvitationWithRelations[]> {
    return this.prisma.venueInvitation.findMany({
      where: { acceptedAt: null },
      orderBy: { createdAt: 'desc' },
      include: INVITATION_INCLUDES,
    });
  }

  create(args: {
    email: string;
    fullName?: string | null;
    phoneNumber?: string | null;
    tokenHash: string;
    expiresAt: Date;
    invitedById: string;
  }): Promise<InvitationWithRelations> {
    return this.prisma.venueInvitation.create({
      data: {
        email: args.email,
        fullName: args.fullName ?? null,
        phoneNumber: args.phoneNumber ?? null,
        tokenHash: args.tokenHash,
        expiresAt: args.expiresAt,
        invitedById: args.invitedById,
      },
      include: INVITATION_INCLUDES,
    });
  }

  rotateToken(args: {
    id: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<InvitationWithRelations> {
    return this.prisma.venueInvitation.update({
      where: { id: args.id },
      data: { tokenHash: args.tokenHash, expiresAt: args.expiresAt },
      include: INVITATION_INCLUDES,
    });
  }

  delete(id: string): Promise<void> {
    return this.prisma.venueInvitation.delete({ where: { id } }).then(() => undefined);
  }

  /**
   * Consume an invitation transactionally:
   *   1. Create or upgrade the User (set password hash + APPROVED status).
   *   2. Stamp `acceptedAt` and link `createdUserId` on the invitation row.
   *
   * Returns the User so the resolver can mint an access token for them.
   */
  async acceptAndProvisionUser(args: { invitationId: string; passwordHash: string }) {
    return this.prisma.$transaction(async (tx) => {
      const invitation = await tx.venueInvitation.findUnique({
        where: { id: args.invitationId },
      });
      if (!invitation) throw new Error('Invitation not found');
      if (invitation.acceptedAt) throw new Error('Invitation already used');
      if (invitation.expiresAt <= new Date()) throw new Error('Invitation expired');

      const existing = await tx.user.findUnique({ where: { email: invitation.email } });
      if (existing && existing.passwordHash) {
        throw new Error('An account with this email already exists. Please sign in.');
      }

      let userId: string;
      if (existing) {
        const updated = await tx.user.update({
          where: { id: existing.id },
          data: {
            passwordHash: args.passwordHash,
            fullName: existing.fullName ?? invitation.fullName ?? undefined,
            isActive: true,
          },
        });
        userId = updated.id;
      } else {
        // Brand-new user. `phoneNumber` is required + unique on User — fall
        // back to a synthetic placeholder when the admin didn't collect one.
        const phone = invitation.phoneNumber?.trim() || `pending+${invitation.id}@${Date.now()}`;
        const created = await tx.user.create({
          data: {
            email: invitation.email,
            phoneNumber: phone,
            fullName: invitation.fullName ?? undefined,
            passwordHash: args.passwordHash,
          },
        });
        userId = created.id;
      }

      // Grant the VENUE capability (admin-invited accounts are pre-approved).
      await tx.userCapability.upsert({
        where: { userId_type: { userId, type: CapabilityType.VENUE } },
        update: { status: CapabilityStatus.APPROVED },
        create: { userId, type: CapabilityType.VENUE, status: CapabilityStatus.APPROVED },
      });

      await tx.venueInvitation.update({
        where: { id: invitation.id },
        data: { acceptedAt: new Date(), createdUserId: userId },
      });

      return tx.user.findUniqueOrThrow({ where: { id: userId }, include: { capabilities: true } });
    });
  }
}
