import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { StaffStatus } from '@prisma/client';

@Injectable()
export class OrganizerStaffService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Assign a user as staff to a tournament
   */
  async assignTournamentStaff(userId: string, tournamentId: string, createdBy: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if tournament exists
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
    });
    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    // Check if already assigned
    const existing = await this.prisma.organizerStaff.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } },
    });

    if (existing) {
      throw new BadRequestException('User is already assigned to this tournament');
    }

    return this.prisma.organizerStaff.create({
      data: {
        userId,
        tournamentId,
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
        tournament: {
          select: {
            id: true,
            name: true,
            startDate: true,
          },
        },
      },
    });
  }

  /**
   * Get all staff for a specific tournament
   */
  async getTournamentStaff(tournamentId: string, status?: StaffStatus) {
    return this.prisma.organizerStaff.findMany({
      where: { tournamentId, ...(status && { status }) },
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
   * Get all tournaments a user is staff for
   */
  async getUserTournaments(userId: string) {
    return this.prisma.organizerStaff.findMany({
      where: { userId, status: 'ACTIVE' },
      select: {
        tournamentId: true,
        tournament: {
          select: {
            id: true,
            name: true,
            startDate: true,
            city: true,
          },
        },
      },
    });
  }

  /**
   * Suspend tournament staff
   */
  async suspendTournamentStaff(userId: string, tournamentId: string) {
    const staff = await this.prisma.organizerStaff.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } },
    });

    if (!staff) {
      throw new NotFoundException('Staff assignment not found');
    }

    return this.prisma.organizerStaff.update({
      where: { userId_tournamentId: { userId, tournamentId } },
      data: { status: 'SUSPENDED' },
    });
  }

  /**
   * Reactivate tournament staff
   */
  async activateTournamentStaff(userId: string, tournamentId: string) {
    const staff = await this.prisma.organizerStaff.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } },
    });

    if (!staff) {
      throw new NotFoundException('Staff assignment not found');
    }

    return this.prisma.organizerStaff.update({
      where: { userId_tournamentId: { userId, tournamentId } },
      data: { status: 'ACTIVE' },
    });
  }

  /**
   * Remove staff from tournament
   */
  async removeTournamentStaff(userId: string, tournamentId: string) {
    return this.prisma.organizerStaff.delete({
      where: { userId_tournamentId: { userId, tournamentId } },
    });
  }
}
