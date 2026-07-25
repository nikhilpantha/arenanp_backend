import { Injectable } from '@nestjs/common';
import { CapabilityStatus, CapabilityType, Prisma } from '@prisma/client';

import { PrismaService } from '../../database/prisma.service';
import type { CapabilitySnapshot } from '../../common/types/auth-context';

/** Prisma client or an interactive-transaction client. */
type Db = PrismaService | Prisma.TransactionClient;

/**
 * Reads/writes the `user_capabilities` table — the single source of truth for
 * what a user is platform-verified for (VENUE / ORGANIZER / COACH). Used by the
 * JWT strategy (read) and the verification modules (write on approve/reject).
 */
@Injectable()
export class CapabilitiesService {
  constructor(private readonly prisma: PrismaService) {}

  /** All capability grants for a user, as the auth snapshot shape. */
  async listForUser(userId: string): Promise<CapabilitySnapshot[]> {
    const rows = await this.prisma.userCapability.findMany({
      where: { userId },
      select: { type: true, status: true },
    });
    return rows.map((r) => ({ type: r.type, status: r.status }));
  }

  /** Current status of one capability (NOT_REQUESTED when no row exists). */
  async getStatus(userId: string, type: CapabilityType): Promise<CapabilityStatus> {
    const row = await this.prisma.userCapability.findUnique({
      where: { userId_type: { userId, type } },
      select: { status: true },
    });
    return row?.status ?? CapabilityStatus.NOT_REQUESTED;
  }

  /** Upsert the status of a capability for a user. Pass `db` to run inside a transaction. */
  setStatus(userId: string, type: CapabilityType, status: CapabilityStatus, db: Db = this.prisma) {
    return db.userCapability.upsert({
      where: { userId_type: { userId, type } },
      update: { status },
      create: { userId, type, status },
    });
  }

  /**
   * Upsert capability status and bump tokenVersion if changing to APPROVED or SUSPENDED.
   * Use this when you want to force re-login on capability state changes.
   * Pass `db` to run inside a transaction.
   */
  async setStatusWithTokenRevoke(
    userId: string,
    type: CapabilityType,
    status: CapabilityStatus,
    db: Db = this.prisma,
  ) {
    const shouldBumpToken =
      status === CapabilityStatus.APPROVED || status === CapabilityStatus.SUSPENDED;

    // First, update the capability
    await this.setStatus(userId, type, status, db);

    // Then bump tokenVersion if needed
    if (shouldBumpToken) {
      const isPrismaService = db instanceof PrismaService;
      if (isPrismaService) {
        // Safe to call update directly
        await (db as PrismaService).user.update({
          where: { id: userId },
          data: { tokenVersion: { increment: 1 } },
        });
      }
      // If inside a transaction, the caller is responsible for bumping tokenVersion
      // (can't call methods on TransactionClient during the transaction)
    }
  }
}
