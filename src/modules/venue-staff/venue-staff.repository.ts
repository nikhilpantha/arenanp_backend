import { Injectable } from '@nestjs/common';
import { MembershipStatus, Prisma, User, VenueMemberRole, VenueMembership } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';

/** A seat plus the person sitting in it — everything the staff list renders. */
const SEAT_INCLUDES = {
  user: {
    select: {
      id: true,
      fullName: true,
      phoneNumber: true,
      email: true,
      isActive: true,
      lastLoginAt: true,
      mustChangePassword: true,
    },
  },
} satisfies Prisma.VenueMembershipInclude;

export type StaffSeat = VenueMembership & {
  user: Pick<
    User,
    'id' | 'fullName' | 'phoneNumber' | 'email' | 'isActive' | 'lastLoginAt' | 'mustChangePassword'
  >;
};

/** Ordering: the owners first, then by role, then alphabetically. */
const SEAT_ORDER: Prisma.VenueMembershipOrderByWithRelationInput[] = [
  { role: 'asc' },
  { createdAt: 'asc' },
];

@Injectable()
export class VenueStaffRepository {
  constructor(private readonly prisma: PrismaService) {}

  listSeats(venueId: string): Promise<StaffSeat[]> {
    return this.prisma.venueMembership.findMany({
      where: { venueId },
      include: SEAT_INCLUDES,
      orderBy: SEAT_ORDER,
    });
  }

  /**
   * A seat by id, scoped to the venue.
   *
   * The venue filter is not belt-and-braces: `membershipId` alone is a global
   * key, so without it any owner could act on another venue's seats by
   * guessing one.
   */
  findSeat(venueId: string, membershipId: string): Promise<StaffSeat | null> {
    return this.prisma.venueMembership.findFirst({
      where: { id: membershipId, venueId },
      include: SEAT_INCLUDES,
    });
  }

  findSeatForUser(venueId: string, userId: string): Promise<StaffSeat | null> {
    return this.prisma.venueMembership.findUnique({
      where: { venueId_userId: { venueId, userId } },
      include: SEAT_INCLUDES,
    });
  }

  findUserByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phoneNumber: phone } });
  }

  emailTaken(email: string): Promise<boolean> {
    return this.prisma.user
      .count({ where: { email: email.toLowerCase() } })
      .then((count) => count > 0);
  }

  venueForStaff(venueId: string) {
    return this.prisma.venue.findUnique({
      where: { id: venueId },
      select: { id: true, name: true, slug: true, primaryOwnerId: true },
    });
  }

  /** How many active owners the venue has — the last one can never be removed. */
  countActiveOwners(venueId: string): Promise<number> {
    return this.prisma.venueMembership.count({
      where: { venueId, role: VenueMemberRole.OWNER, status: MembershipStatus.ACTIVE },
    });
  }

  /** Seats this person holds anywhere, to decide whether a login still has a purpose. */
  countSeatsForUser(userId: string): Promise<number> {
    return this.prisma.venueMembership.count({ where: { userId } });
  }

  /**
   * Mint a login and seat it, in one transaction.
   *
   * The password is hashed by the caller, outside the transaction: argon2 is
   * deliberately slow, and holding a database transaction open for the duration
   * would tie up a connection for no reason.
   */
  async createProvisionedSeat(params: {
    venueId: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    passwordHash: string;
    role: VenueMemberRole;
    invitedById: string;
  }): Promise<StaffSeat> {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: params.fullName,
          phoneNumber: params.phoneNumber,
          email: params.email,
          passwordHash: params.passwordHash,
          // Someone else chose this password, so it isn't theirs until they say so.
          mustChangePassword: true,
        },
      });
      return tx.venueMembership.create({
        data: {
          venueId: params.venueId,
          userId: user.id,
          role: params.role,
          status: MembershipStatus.ACTIVE,
          provisionedUser: true,
          invitedById: params.invitedById,
        },
        include: SEAT_INCLUDES,
      });
    });
  }

  /** Seat an account that already exists. Nothing on the user record is touched. */
  attachSeat(params: {
    venueId: string;
    userId: string;
    role: VenueMemberRole;
    invitedById: string;
  }): Promise<StaffSeat> {
    return this.prisma.venueMembership.create({
      data: {
        venueId: params.venueId,
        userId: params.userId,
        role: params.role,
        status: MembershipStatus.ACTIVE,
        provisionedUser: false,
        invitedById: params.invitedById,
      },
      include: SEAT_INCLUDES,
    });
  }

  updateSeat(membershipId: string, data: Prisma.VenueMembershipUpdateInput): Promise<StaffSeat> {
    return this.prisma.venueMembership.update({
      where: { id: membershipId },
      data,
      include: SEAT_INCLUDES,
    });
  }

  deleteSeat(membershipId: string): Promise<VenueMembership> {
    return this.prisma.venueMembership.delete({ where: { id: membershipId } });
  }

  /** Retire a minted login that has no seats left anywhere. */
  deactivateUser(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false, tokenVersion: { increment: 1 } },
    });
  }

  setPassword(userId: string, passwordHash: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        mustChangePassword: true,
        // Whatever sessions the old password opened stop here.
        tokenVersion: { increment: 1 },
      },
    });
  }
}
