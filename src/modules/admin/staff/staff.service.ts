import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PermissionScopeType, Prisma, StaffStatus, User, UserRole } from '@prisma/client';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../../../database/prisma.service';
import { EmailService } from '../../email/email.service';
import { PermissionResolverService } from '../../rbac/permission-resolver.service';
import { StaffPermissionService } from '../../rbac/staff-permission.service';
import {
  CreateStaffInput,
  ListStaffInput,
  ListStaffOutput,
  StaffAssignment,
} from './dto/staff.dto';

@Injectable()
export class StaffService {
  private readonly logger = new Logger(StaffService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly staffPermissions: StaffPermissionService,
    private readonly permissions: PermissionResolverService,
  ) {}

  /**
   * Create a staff member and mark them an admin of one scope.
   *
   * No role is assigned: `User.role` is set to ADMIN purely as a marker, and
   * what this person can actually do comes from the permission grants made
   * here (optionally) and on the permissions screen afterwards.
   */
  async createStaff(input: CreateStaffInput, actorId: string): Promise<User> {
    const scopeId = await this.resolveScopeTarget(input.scopeType, input.scopeId);

    const existing = await this.prisma.user.findFirst({
      where: { email: input.email },
      select: { id: true },
    });
    if (existing) {
      throw new BadRequestException(`A user with email ${input.email} already exists`);
    }

    // 32 bytes = 256 bits, hex-encoded = 64 chars
    const setupToken = randomBytes(32).toString('hex');
    const setupTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await this.prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          email: input.email,
          fullName: input.fullName,
          phoneNumber: input.email, // Temporary: phone is unique and not collected here
          role: UserRole.ADMIN,
          isActive: true,
          isStaff: true,
          setupToken,
          setupTokenExpiry,
          tokenVersion: 1,
        },
      });

      await this.createAssignment(tx, created.id, input.scopeType, scopeId, actorId);
      return created;
    });

    if (input.permissionKeys?.length) {
      await this.staffPermissions.setPermissions(
        user.id,
        { scopeType: input.scopeType, scopeId },
        input.permissionKeys,
        actorId,
      );
    }

    try {
      const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
      const setupUrl = `${frontendUrl}/setup-password?token=${setupToken}`;

      await this.emailService.sendStaffWelcomeEmail(
        user.email!,
        user.fullName || input.fullName,
        setupUrl,
      );
    } catch (error) {
      // A failed email must not roll back the account — it can be resent.
      this.logger.error(`Failed to send welcome email to ${user.email}: ${String(error)}`);
    }

    return user;
  }

  /** Suspend a staff member (isActive=false, all tokens revoked). */
  async suspendStaff(userId: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false, tokenVersion: { increment: 1 } },
    });

    await this.setAssignmentStatus(userId, StaffStatus.SUSPENDED);
    await this.permissions.invalidateUser(userId);
    return user;
  }

  /** Restore a suspended staff member. */
  async unsuspendStaff(userId: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });

    await this.setAssignmentStatus(userId, StaffStatus.ACTIVE);
    await this.permissions.invalidateUser(userId);
    return user;
  }

  /**
   * Paginated staff list, optionally filtered by scope.
   *
   * Membership is read from the staff tables, not the `isStaff` flag — those
   * rows are the authority on who is an admin, and the flag is only a
   * denormalised cache of them. The seeded super admin appears here like any
   * other platform admin.
   */
  async listStaff(input: ListStaffInput): Promise<ListStaffOutput> {
    const { limit = 50, offset = 0, scopeType, scopeId, isActive } = input;

    const anyStaffRecord: Prisma.UserWhereInput = {
      OR: [
        { systemStaff: { isNot: null } },
        { venueStaff: { some: {} } },
        { organizerStaff: { some: {} } },
      ],
    };

    const where: Prisma.UserWhereInput = {
      AND: [anyStaffRecord, ...(scopeType ? [this.scopeFilter(scopeType, scopeId)] : [])],
      ...(isActive != null && { isActive }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          phoneNumber: true,
          fullName: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          systemStaff: { select: { status: true } },
          venueStaff: {
            select: { venueId: true, status: true, venue: { select: { name: true } } },
          },
          organizerStaff: {
            select: {
              tournamentId: true,
              status: true,
              tournament: { select: { name: true } },
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    const counts = await this.permissionCounts(users.map((u) => u.id));

    return {
      items: users.map((user) => ({
        id: user.id,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        assignments: this.buildAssignments(user, counts),
        isActive: user.isActive,
        createdAt: user.createdAt,
      })),
      total,
      limit,
      offset,
    };
  }

  /** A staff member's grants and effective permissions within one scope. */
  async getStaffPermissions(
    userId: string,
    scopeType: PermissionScopeType,
    scopeId?: string | null,
  ) {
    const scope = { scopeType, scopeId: scopeId ?? '' };

    const [grants, permissions] = await Promise.all([
      this.staffPermissions.listGrants(userId, scope),
      this.effectivePermissions(userId, scopeType, scopeId ?? ''),
    ]);

    return { grants, permissions };
  }

  /** Creates the SystemStaff / VenueStaff / OrganizerStaff row for a scope. */
  private async createAssignment(
    tx: Prisma.TransactionClient,
    userId: string,
    scopeType: PermissionScopeType,
    scopeId: string,
    actorId: string,
  ): Promise<void> {
    if (scopeType === PermissionScopeType.PLATFORM) {
      await tx.systemStaff.create({ data: { userId, createdBy: actorId, status: 'ACTIVE' } });
      return;
    }

    if (scopeType === PermissionScopeType.VENUE) {
      await tx.venueStaff.create({
        data: { userId, venueId: scopeId, createdBy: actorId, status: 'ACTIVE' },
      });
      return;
    }

    await tx.organizerStaff.create({
      data: { userId, tournamentId: scopeId, createdBy: actorId, status: 'ACTIVE' },
    });
  }

  /** Validates the venue / tournament exists and returns the normalised scope id. */
  private async resolveScopeTarget(
    scopeType: PermissionScopeType,
    scopeId?: string | null,
  ): Promise<string> {
    if (scopeType === PermissionScopeType.PLATFORM) return '';

    const id = scopeId?.trim();
    if (!id) {
      throw new BadRequestException(
        `A ${scopeType.toLowerCase()} must be selected for a ${scopeType.toLowerCase()} admin`,
      );
    }

    if (scopeType === PermissionScopeType.VENUE) {
      const venue = await this.prisma.venue.findUnique({ where: { id }, select: { id: true } });
      if (!venue) throw new NotFoundException('Venue not found');
      return id;
    }

    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!tournament) throw new NotFoundException('Tournament not found');
    return id;
  }

  private scopeFilter(
    scopeType: PermissionScopeType,
    scopeId?: string | null,
  ): Prisma.UserWhereInput {
    if (scopeType === PermissionScopeType.PLATFORM) {
      return { systemStaff: { isNot: null } };
    }
    if (scopeType === PermissionScopeType.VENUE) {
      return { venueStaff: { some: scopeId ? { venueId: scopeId } : {} } };
    }
    return { organizerStaff: { some: scopeId ? { tournamentId: scopeId } : {} } };
  }

  /** Grant counts keyed by `${userId}:${scopeType}:${scopeId}`. */
  private async permissionCounts(userIds: string[]): Promise<Map<string, number>> {
    if (userIds.length === 0) return new Map();

    const rows = await this.prisma.staffPermission.groupBy({
      by: ['userId', 'scopeType', 'scopeId'],
      where: { userId: { in: userIds } },
      _count: { _all: true },
    });

    return new Map(
      rows.map((row) => [`${row.userId}:${row.scopeType}:${row.scopeId}`, row._count._all]),
    );
  }

  private buildAssignments(
    user: {
      id: string;
      systemStaff: { status: StaffStatus } | null;
      venueStaff: Array<{ venueId: string; status: StaffStatus; venue: { name: string } | null }>;
      organizerStaff: Array<{
        tournamentId: string | null;
        status: StaffStatus;
        tournament: { name: string } | null;
      }>;
    },
    counts: Map<string, number>,
  ): StaffAssignment[] {
    const countFor = (scopeType: PermissionScopeType, scopeId: string) =>
      counts.get(`${user.id}:${scopeType}:${scopeId}`) ?? 0;

    const assignments: StaffAssignment[] = [];

    if (user.systemStaff) {
      assignments.push({
        scopeType: PermissionScopeType.PLATFORM,
        scopeId: '',
        scopeName: 'Platform',
        status: user.systemStaff.status,
        permissionCount: countFor(PermissionScopeType.PLATFORM, ''),
      });
    }

    for (const venue of user.venueStaff) {
      assignments.push({
        scopeType: PermissionScopeType.VENUE,
        scopeId: venue.venueId,
        scopeName: venue.venue?.name ?? null,
        status: venue.status,
        permissionCount: countFor(PermissionScopeType.VENUE, venue.venueId),
      });
    }

    for (const staff of user.organizerStaff) {
      if (!staff.tournamentId) continue;
      assignments.push({
        scopeType: PermissionScopeType.TOURNAMENT,
        scopeId: staff.tournamentId,
        scopeName: staff.tournament?.name ?? null,
        status: staff.status,
        permissionCount: countFor(PermissionScopeType.TOURNAMENT, staff.tournamentId),
      });
    }

    return assignments;
  }

  private effectivePermissions(
    userId: string,
    scopeType: PermissionScopeType,
    scopeId: string,
  ): Promise<string[]> {
    if (scopeType === PermissionScopeType.VENUE) {
      return this.permissions.getVenueUserPermissions(userId, scopeId);
    }
    if (scopeType === PermissionScopeType.TOURNAMENT) {
      return this.permissions.getTournamentUserPermissions(userId, scopeId);
    }
    return this.permissions.getUserPermissions(userId);
  }

  /** Mirrors suspension onto every scope record the staff member holds. */
  private async setAssignmentStatus(userId: string, status: StaffStatus): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.systemStaff.updateMany({ where: { userId }, data: { status } }),
      this.prisma.venueStaff.updateMany({ where: { userId }, data: { status } }),
      this.prisma.organizerStaff.updateMany({ where: { userId }, data: { status } }),
    ]);
  }
}
