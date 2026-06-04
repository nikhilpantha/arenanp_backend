import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

const INVITATION_INCLUDES = {
  invitedBy: true,
  createdUser: true,
} satisfies Prisma.VenueOwnerInvitationInclude;

export type InvitationWithRelations = Prisma.VenueOwnerInvitationGetPayload<{
  include: typeof INVITATION_INCLUDES;
}>;

@Injectable()
export class VenueOwnerInvitationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<InvitationWithRelations | null> {
    return this.prisma.venueOwnerInvitation.findUnique({
      where: { id },
      include: INVITATION_INCLUDES,
    });
  }

  /** Pending = not yet accepted and not expired. */
  findPendingByEmail(email: string): Promise<InvitationWithRelations | null> {
    return this.prisma.venueOwnerInvitation.findFirst({
      where: {
        email,
        acceptedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: INVITATION_INCLUDES,
    });
  }

  listPending(): Promise<InvitationWithRelations[]> {
    return this.prisma.venueOwnerInvitation.findMany({
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
    return this.prisma.venueOwnerInvitation.create({
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
    return this.prisma.venueOwnerInvitation.update({
      where: { id: args.id },
      data: { tokenHash: args.tokenHash, expiresAt: args.expiresAt },
      include: INVITATION_INCLUDES,
    });
  }

  delete(id: string): Promise<void> {
    return this.prisma.venueOwnerInvitation.delete({ where: { id } }).then(() => undefined);
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
      const invitation = await tx.venueOwnerInvitation.findUnique({
        where: { id: args.invitationId },
      });
      if (!invitation) throw new Error('Invitation not found');
      if (invitation.acceptedAt) throw new Error('Invitation already used');
      if (invitation.expiresAt <= new Date()) throw new Error('Invitation expired');

      const existing = await tx.user.findUnique({ where: { email: invitation.email } });
      if (existing && existing.passwordHash) {
        throw new Error('An account with this email already exists. Please sign in.');
      }

      let user;
      if (existing) {
        user = await tx.user.update({
          where: { id: existing.id },
          data: {
            passwordHash: args.passwordHash,
            fullName: existing.fullName ?? invitation.fullName ?? undefined,
            venueOwnerStatus: 'APPROVED',
            isActive: true,
          },
        });
      } else {
        // Brand-new user. `phoneNumber` is required + unique on User — fall
        // back to a synthetic placeholder when the admin didn't collect one.
        const phone = invitation.phoneNumber?.trim() || `pending+${invitation.id}@${Date.now()}`;
        user = await tx.user.create({
          data: {
            email: invitation.email,
            phoneNumber: phone,
            fullName: invitation.fullName ?? undefined,
            passwordHash: args.passwordHash,
            venueOwnerStatus: 'APPROVED',
          },
        });
      }

      await tx.venueOwnerInvitation.update({
        where: { id: invitation.id },
        data: { acceptedAt: new Date(), createdUserId: user.id },
      });

      return user;
    });
  }
}
