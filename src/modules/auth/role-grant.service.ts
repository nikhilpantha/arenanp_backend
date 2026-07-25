import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { AuditService } from '../audit/audit.service';
import { UserRole } from '@prisma/client';

/**
 * Staff role grant service for temporary role assignments.
 * Allows temporarily promoting users to higher roles with automatic expiry.
 *
 * Example: Promote a SUPPORT_AGENT to MODERATOR for 1 month
 */
@Injectable()
export class RoleGrantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly audit: AuditService,
  ) {}

  /**
   * Grant a temporary role to a staff member.
   * Automatically expires at the specified date.
   *
   * @param userId - User to grant role to
   * @param role - Role to grant (must be higher than current role)
   * @param expiresAt - When the grant expires (must be in future)
   * @param grantedBy - Admin who granted the role
   * @param reason - Why the role is being granted
   */
  async grantTemporaryRole(
    userId: string,
    role: UserRole,
    expiresAt: Date,
    grantedBy: string,
    reason?: string,
  ): Promise<void> {
    // Validation: expiry must be in future
    if (expiresAt <= new Date()) {
      throw new BadRequestException('Expiry date must be in the future');
    }

    // Check if grant already exists
    const existing = await this.prisma.staffRoleGrant.findFirst({
      where: {
        userId,
        role,
        status: 'ACTIVE',
      },
    });

    if (existing) {
      throw new ConflictException(
        `User already has an active grant for ${role} role. Revoke it first.`,
      );
    }

    // Create the role grant
    const grant = await this.prisma.staffRoleGrant.create({
      data: {
        userId,
        role,
        grantedBy,
        expiresAt,
        reason,
      },
    });

    // Audit log
    await this.audit.logPermissionChange(
      grantedBy,
      'PERMISSION_GRANTED',
      userId,
      {
        type: 'TEMPORARY_ROLE',
        role,
        expiresAt: expiresAt.toISOString(),
      },
      reason,
    );
  }

  /**
   * Revoke a temporary role grant before it expires.
   *
   * @param userId - User to revoke from
   * @param role - Role to revoke
   * @param revokedBy - Admin who revoked the role
   * @param reason - Why the role is being revoked
   */
  async revokeTemporaryRole(
    userId: string,
    role: UserRole,
    revokedBy: string,
    reason?: string,
  ): Promise<void> {
    const grant = await this.prisma.staffRoleGrant.findFirst({
      where: {
        userId,
        role,
        status: 'ACTIVE',
      },
    });

    if (!grant) {
      throw new NotFoundException(`No active grant found for this user and role (role: ${role})`);
    }

    // Update status to REVOKED
    await this.prisma.staffRoleGrant.update({
      where: { id: grant.id },
      data: { status: 'REVOKED' },
    });

    // Audit log
    await this.audit.logPermissionChange(
      revokedBy,
      'PERMISSION_REVOKED',
      userId,
      {
        type: 'TEMPORARY_ROLE',
        role,
        previousExpiresAt: grant.expiresAt.toISOString(),
      },
      reason,
    );
  }

  /**
   * Get active temporary role grants for a user.
   *
   * @param userId - User ID
   * @returns Array of active role grants
   */
  async getActiveRoleGrants(userId: string): Promise<UserRole[]> {
    const grants = await this.prisma.staffRoleGrant.findMany({
      where: {
        userId,
        status: 'ACTIVE',
        expiresAt: { gt: new Date() },
      },
      select: { role: true },
    });

    return grants.map((g) => g.role);
  }

  /**
   * Get effective role including active temporary grants.
   * Returns the highest role: permanent role or any active temporary grant.
   *
   * @param userId - User ID
   * @returns Effective role (highest between permanent and grants)
   */
  async getEffectiveRole(userId: string): Promise<UserRole | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      return null;
    }

    // Get active temporary grants
    const activeGrants = await this.getActiveRoleGrants(userId);

    // Role hierarchy: USER < SUPPORT_AGENT < MODERATOR < ADMIN < SUPER_ADMIN
    const hierarchy = ['USER', 'SUPPORT_AGENT', 'MODERATOR', 'ADMIN', 'SUPER_ADMIN'];
    const userLevel = hierarchy.indexOf(user.role);
    const maxGrantLevel = Math.max(userLevel, ...activeGrants.map((r) => hierarchy.indexOf(r)));

    return hierarchy[maxGrantLevel] as UserRole;
  }

  /**
   * Cleanup: Mark expired grants as EXPIRED.
   * Should be run periodically (via cron job or event).
   *
   * @returns Number of grants marked as expired
   */
  async markExpiredGrants(): Promise<number> {
    const result = await this.prisma.staffRoleGrant.updateMany({
      where: {
        status: 'ACTIVE',
        expiresAt: { lte: new Date() },
      },
      data: { status: 'EXPIRED' },
    });

    return result.count;
  }

  /**
   * Get role grant history for a user (all grants, including expired/revoked).
   *
   * @param userId - User ID
   */
  async getRoleGrantHistory(userId: string) {
    return await this.prisma.staffRoleGrant.findMany({
      where: { userId },
      orderBy: { grantedAt: 'desc' },
      include: {
        granterUser: { select: { id: true, fullName: true } },
      },
    });
  }
}
