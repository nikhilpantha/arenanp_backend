import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

/**
 * Resource ownership validation service.
 * Ensures users can only access resources they own/manage.
 *
 * Usage: Call after permission checks to verify resource ownership
 * Example: User has 'bookings:read' permission, but can only read their own venue's bookings
 */
@Injectable()
export class ResourceOwnershipService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Verify user has membership in a venue (ACTIVE status required).
   * Use this to prevent users from accessing venues they're not members of.
   *
   * @param userId - User ID
   * @param venueId - Venue ID to check
   * @throws ForbiddenException if user is not an active member
   */
  async validateVenueMembership(userId: string, venueId: string): Promise<void> {
    const membership = await this.prisma.venueMembership.findFirst({
      where: {
        userId,
        venueId,
        status: 'ACTIVE',
      },
      select: { id: true },
    });

    if (!membership) {
      throw new ForbiddenException(`You don't have access to this venue (venueId: ${venueId})`);
    }
  }

  /**
   * Verify user is the organizer of a tournament.
   * Prevents non-organizers from modifying tournaments they don't own.
   *
   * @param userId - User ID
   * @param tournamentId - Tournament ID to check
   * @throws ForbiddenException if user is not the organizer
   */
  async validateTournamentOwnership(userId: string, tournamentId: string): Promise<void> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { organizerId: true },
    });

    if (!tournament || tournament.organizerId !== userId) {
      throw new ForbiddenException(
        `You are not the organizer of this tournament (tournamentId: ${tournamentId})`,
      );
    }
  }

  /**
   * Verify user owns/created a booking (if applicable for customer type).
   * For team/club bookings, verify membership.
   *
   * @param userId - User ID
   * @param bookingId - Booking ID to check
   * @throws ForbiddenException if user doesn't own the booking
   */
  async validateBookingOwnership(userId: string, bookingId: string): Promise<void> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      select: { customerId: true, customerType: true },
    });

    if (!booking) {
      throw new ForbiddenException(`Booking not found (bookingId: ${bookingId})`);
    }

    // For INDIVIDUAL bookings, customerId must match userId
    if (booking.customerType === 'INDIVIDUAL' && booking.customerId !== userId) {
      throw new ForbiddenException(`You don't own this booking (bookingId: ${bookingId})`);
    }

    // For TEAM/CLUB, additional validation would be needed (team membership, etc.)
    // This is simplified for MVP - add team membership checks in phase 7
  }

  /**
   * Verify user is viewing their own profile or has admin permissions.
   *
   * @param userId - User ID requesting
   * @param targetUserId - User ID being accessed
   * @throws ForbiddenException if different user and not admin context
   */
  async validateProfileAccess(userId: string, targetUserId: string): Promise<void> {
    if (userId !== targetUserId) {
      throw new ForbiddenException(
        `You can only access your own profile (userId: ${targetUserId})`,
      );
    }
  }

  /**
   * Verify user has a specific role within a venue.
   * Use for operations that require a minimum role level.
   *
   * @param userId - User ID
   * @param venueId - Venue ID
   * @param requiredRole - Minimum role required (OWNER, MANAGER, etc.)
   * @throws ForbiddenException if user doesn't have the required role
   */
  async validateVenueRole(
    userId: string,
    venueId: string,
    requiredRole: 'OWNER' | 'MANAGER',
  ): Promise<void> {
    const membership = await this.prisma.venueMembership.findFirst({
      where: {
        userId,
        venueId,
        status: 'ACTIVE',
      },
      select: { role: true },
    });

    if (!membership) {
      throw new ForbiddenException(`You don't have access to this venue`);
    }

    const roleHierarchy = { OWNER: 3, MANAGER: 2, FRONT_DESK: 1, STAFF: 0, COACH: 0 };
    const userLevel = roleHierarchy[membership.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole];

    if (userLevel < requiredLevel) {
      throw new ForbiddenException(
        `This operation requires ${requiredRole} role (you are ${membership.role})`,
      );
    }
  }
}
