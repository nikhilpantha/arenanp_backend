import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { buildPageInfo } from '../../../common/dto/pagination.input';
import type { AuthUser } from '../../../common/types/auth-context';

import { AdminPaymentsRepository } from './admin-payments.repository';
import { AdminPayment, PaymentsOverview, mapAdminPayment } from './dto/admin-payment.model';
import { ListAdminPaymentsInput } from './dto/list-admin-payments.input';
import { PaginatedAdminPayments } from './dto/paginated-admin-payments';
import { MarkSettlementPaidInput } from './dto/settlement-actions.inputs';
import { SettlementExportRow } from './dto/settlement-export-row.model';
import { AdminSettingsService } from '../settings/admin-settings.service';

@Injectable()
export class AdminPaymentsService {
  constructor(
    private readonly repo: AdminPaymentsRepository,
    private readonly config: ConfigService,
    private readonly settings: AdminSettingsService,
  ) {}

  /**
   * Hard-coded fallback when the PlatformSetting row doesn't exist yet —
   * `commissionPercentage()` resolves it from the live settings first.
   */
  private get envCommissionPct(): number {
    const raw = this.config.get<number>('PLATFORM_COMMISSION_PERCENTAGE');
    return typeof raw === 'number' ? raw : Number(raw ?? 10);
  }

  /**
   * Live platform commission percentage. Prefers PlatformSetting; falls back
   * to the env var if reading settings fails (e.g. table missing during a
   * very early boot).
   */
  private async commissionPercentage(): Promise<number> {
    try {
      const pct = await this.settings.getCommissionPercentage();
      return pct ?? this.envCommissionPct;
    } catch {
      return this.envCommissionPct;
    }
  }

  async list(input: ListAdminPaymentsInput): Promise<PaginatedAdminPayments> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    if (input.fromDate && input.toDate && input.fromDate >= input.toDate) {
      throw new BadRequestException('fromDate must be earlier than toDate.');
    }
    const pct = await this.commissionPercentage();
    const { items, total } = await this.repo.listAndCount(input);
    return {
      items: items.map((p) => mapAdminPayment(p, pct)),
      pageInfo: buildPageInfo(page, pageSize, total),
    };
  }

  async getOne(id: string): Promise<AdminPayment> {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException('Payment not found.');
    const pct = await this.commissionPercentage();
    return mapAdminPayment(row, pct);
  }

  async overview(input: ListAdminPaymentsInput): Promise<PaymentsOverview> {
    const pct = await this.commissionPercentage();
    return this.repo.overview(input, pct);
  }

  async markSettlementPaid(input: MarkSettlementPaidInput, actor: AuthUser): Promise<AdminPayment> {
    try {
      const pct = await this.commissionPercentage();
      const updated = await this.repo.markSettlementPaid({
        paymentId: input.paymentId,
        actorId: actor.id,
        commissionPercentage: pct,
        paymentReference: input.paymentReference?.trim() ?? null,
        notes: input.notes?.trim() ?? null,
      });
      return mapAdminPayment(updated, pct);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not settle payment.';
      throw new BadRequestException(msg);
    }
  }

  async exportSettlements(input: ListAdminPaymentsInput): Promise<SettlementExportRow[]> {
    const rows = await this.repo.exportAll(input);
    const pct = await this.commissionPercentage();
    return rows.map((p) => {
      const mapped = mapAdminPayment(p, pct);
      return {
        paymentId: mapped.id,
        bookingId: mapped.booking.id,
        venueId: mapped.booking.venueId ?? '',
        venueName: mapped.booking.venueName,
        venueCity: p.booking.venue?.city ?? '',
        customerName: mapped.user.fullName ?? mapped.user.phoneNumber,
        provider: mapped.provider,
        paidAt: mapped.paidAt?.toISOString() ?? '',
        grossAmount: mapped.commission.grossAmount,
        commissionPercentage: mapped.commission.commissionPercentage,
        platformCommissionAmount: mapped.commission.platformCommissionAmount,
        venueSettlementAmount: mapped.commission.venueSettlementAmount,
        currency: mapped.commission.currency,
        settlementStatus: mapped.settlement?.status ?? 'UNSETTLED',
        settlementPaidAt: mapped.settlement?.paidAt?.toISOString() ?? undefined,
        paymentReference: mapped.settlement?.paymentReference ?? undefined,
      };
    });
  }
}
