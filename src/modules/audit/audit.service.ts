import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';

export interface PermissionChangeDetails {
  permission: string;
  expiresAt?: string;
  grantedReason?: string;
  [key: string]: any;
}

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Log a permission change (grant or revoke)
   * @param userId - Who performed the action (admin/super_admin)
   * @param action - PERMISSION_GRANTED, PERMISSION_REVOKED, PERMISSION_EXPIRED
   * @param targetId - ID of the user affected
   * @param details - What was changed (permission, expiry, reason, etc.)
   * @param reason - Why the change was made
   * @param ipAddress - Requester's IP (optional)
   */
  async logPermissionChange(
    userId: string,
    action: 'PERMISSION_GRANTED' | 'PERMISSION_REVOKED' | 'PERMISSION_EXPIRED',
    targetId: string,
    details: PermissionChangeDetails,
    reason?: string,
    ipAddress?: string,
  ): Promise<void> {
    await this.prisma.staffAuditLog.create({
      data: {
        userId,
        action,
        targetId,
        details,
        reason,
        ipAddress,
      },
    });
  }

  /**
   * Log a role change (e.g., SUPPORT_AGENT → MODERATOR)
   * @param userId - User whose role was changed
   * @param fromRole - Previous role
   * @param toRole - New role
   * @param changedBy - Who made the change
   * @param reason - Why the change was made
   */
  async logRoleChange(
    userId: string,
    fromRole: string,
    toRole: string,
    changedBy: string,
    reason?: string,
  ): Promise<void> {
    await this.prisma.roleChangeAuditLog.create({
      data: {
        userId,
        fromRole,
        toRole,
        changedBy,
        reason,
      },
    });
  }

  /**
   * Log a staff suspension
   * @param userId - Staff member being suspended
   * @param actedBy - Who performed the suspension
   * @param reason - Why they were suspended
   */
  async logSuspension(userId: string, actedBy: string, reason?: string): Promise<void> {
    await this.prisma.staffSuspensionAuditLog.create({
      data: {
        userId,
        action: 'SUSPENDED',
        actedBy,
        reason,
      },
    });
  }

  /**
   * Log a staff unsuspension
   * @param userId - Staff member being unsuspended
   * @param actedBy - Who performed the unsuspension
   * @param reason - Why they were unsuspended
   */
  async logUnsuspension(userId: string, actedBy: string, reason?: string): Promise<void> {
    await this.prisma.staffSuspensionAuditLog.create({
      data: {
        userId,
        action: 'UNSUSPENDED',
        actedBy,
        reason,
      },
    });
  }

  /**
   * Get audit log for a specific staff member
   * @param targetId - User ID to get audit log for
   * @param limit - Max records to return
   * @param offset - Pagination offset
   */
  async getAuditLog(targetId: string, limit: number = 50, offset: number = 0) {
    const logs = await this.prisma.staffAuditLog.findMany({
      where: { targetId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await this.prisma.staffAuditLog.count({
      where: { targetId },
    });

    return { logs, total, limit, offset };
  }

  /**
   * Get permission history for a specific user and permission
   * @param targetId - User ID
   * @param permission - Permission string (e.g., "finance:read")
   */
  async getPermissionHistory(targetId: string, permission: string) {
    return await this.prisma.staffAuditLog.findMany({
      where: {
        targetId,
        details: { path: ['permission'], equals: permission },
      },
      orderBy: { timestamp: 'desc' },
    });
  }

  /**
   * Get role change history for a user
   * @param targetId - User ID
   */
  async getRoleChangeHistory(targetId: string) {
    return await this.prisma.roleChangeAuditLog.findMany({
      where: { userId: targetId },
      orderBy: { timestamp: 'desc' },
    });
  }

  /**
   * Get all actions by a specific admin (who performed them)
   * @param userId - Admin user ID
   * @param limit - Max records
   * @param offset - Pagination offset
   */
  async getAdminActions(userId: string, limit: number = 50, offset: number = 0) {
    const logs = await this.prisma.staffAuditLog.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await this.prisma.staffAuditLog.count({
      where: { userId },
    });

    return { logs, total, limit, offset };
  }
}
