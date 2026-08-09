import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PermissionScopeType, StaffStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { StaffPermissionService } from '../../rbac/staff-permission.service';

@Injectable()
export class VenueStaffService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly staffPermissions: StaffPermissionService,
  ) {}

  /**
   * Assign a user as staff to a venue
   */
  async assignVenueStaff(userId: string, venueId: string, createdBy: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if venue exists
    const venue = await this.prisma.venue.findUnique({ where: { id: venueId } });
    if (!venue) {
      throw new NotFoundException('Venue not found');
    }

    // Check if already assigned
    const existing = await this.prisma.venueStaff.findUnique({
      where: { userId_venueId: { userId, venueId } },
    });

    if (existing) {
      throw new BadRequestException('User is already assigned to this venue');
    }

    return this.prisma.venueStaff.create({
      data: {
        userId,
        venueId,
        createdBy,
        status: 'ACTIVE',
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });
  }

  /**
   * Get all staff for a specific venue
   */
  async getVenueStaff(venueId: string, status?: StaffStatus) {
    return this.prisma.venueStaff.findMany({
      where: { venueId, ...(status && { status }) },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });
  }

  /**
   * Get all venues a user is staff for
   */
  async getUserVenues(userId: string) {
    return this.prisma.venueStaff.findMany({
      where: { userId, status: 'ACTIVE' },
      select: {
        venueId: true,
        venue: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });
  }

  /**
   * Suspend venue staff
   */
  async suspendVenueStaff(userId: string, venueId: string) {
    const staff = await this.prisma.venueStaff.findUnique({
      where: { userId_venueId: { userId, venueId } },
    });

    if (!staff) {
      throw new NotFoundException('Staff assignment not found');
    }

    return this.prisma.venueStaff.update({
      where: { userId_venueId: { userId, venueId } },
      data: { status: 'SUSPENDED' },
    });
  }

  /**
   * Reactivate venue staff
   */
  async activateVenueStaff(userId: string, venueId: string) {
    const staff = await this.prisma.venueStaff.findUnique({
      where: { userId_venueId: { userId, venueId } },
    });

    if (!staff) {
      throw new NotFoundException('Staff assignment not found');
    }

    return this.prisma.venueStaff.update({
      where: { userId_venueId: { userId, venueId } },
      data: { status: 'ACTIVE' },
    });
  }

  /**
   * Remove staff from venue
   */
  /**
   * Remove a staff member from a venue.
   *
   * Their grants for that venue go with them — leaving the rows behind would
   * silently restore full access if they were ever re-added, and would leave a
   * revoked person holding permissions that no UI lists.
   */
  async removeVenueStaff(userId: string, venueId: string) {
    const removed = await this.prisma.venueStaff.delete({
      where: { userId_venueId: { userId, venueId } },
    });

    await this.staffPermissions.clearScope(userId, {
      scopeType: PermissionScopeType.VENUE,
      scopeId: venueId,
    });

    return removed;
  }
}
