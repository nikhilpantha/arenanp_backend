import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { StaffStatus } from '@prisma/client';

@Injectable()
export class SystemStaffService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create or register a user as platform staff
   */
  async createSystemStaff(userId: string, createdBy: string) {
    // Check if user already is staff
    const existing = await this.prisma.systemStaff.findUnique({
      where: { userId },
    });

    if (existing) {
      throw new BadRequestException('User is already a platform staff member');
    }

    // Create system staff record
    return this.prisma.systemStaff.create({
      data: {
        userId,
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
   * Get all platform staff
   */
  async getAllSystemStaff(status?: StaffStatus) {
    return this.prisma.systemStaff.findMany({
      where: status ? { status } : undefined,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            role: true,
          },
        },
      },
      orderBy: { joinedAt: 'desc' },
    });
  }

  /**
   * Get system staff by user ID
   */
  async getSystemStaffByUserId(userId: string) {
    return this.prisma.systemStaff.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            role: true,
          },
        },
      },
    });
  }

  /**
   * Suspend a staff member.
   *
   * No reason is captured: `SystemStaff` has nowhere to put one. If suspensions
   * need a justification, it belongs in the audit log alongside the actor, not
   * as an argument this method would silently discard.
   */
  async suspendStaff(userId: string, suspendedBy: string) {
    const staff = await this.prisma.systemStaff.findUnique({
      where: { userId },
    });

    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }

    return this.prisma.systemStaff.update({
      where: { userId },
      data: {
        status: 'SUSPENDED',
        suspendedAt: new Date(),
        suspendedBy,
      },
    });
  }

  /**
   * Activate (restore) staff member
   */
  async activateStaff(userId: string) {
    const staff = await this.prisma.systemStaff.findUnique({
      where: { userId },
    });

    if (!staff) {
      throw new NotFoundException('Staff member not found');
    }

    return this.prisma.systemStaff.update({
      where: { userId },
      data: {
        status: 'ACTIVE',
        suspendedAt: null,
        suspendedBy: null,
      },
    });
  }

  /**
   * Remove staff member
   */
  async removeStaff(userId: string) {
    return this.prisma.systemStaff.delete({
      where: { userId },
    });
  }

  /**
   * Check if a user is platform staff
   */
  async isSystemStaff(userId: string): Promise<boolean> {
    const staff = await this.prisma.systemStaff.findUnique({
      where: { userId },
    });
    return !!staff && staff.status === 'ACTIVE';
  }
}
