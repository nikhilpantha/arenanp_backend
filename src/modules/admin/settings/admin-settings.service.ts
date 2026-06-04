import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import type { AuthUser } from '../../../common/types/auth-context';

import { AdminSettingsRepository } from './admin-settings.repository';
import { PlatformSettings, mapPlatformSettings } from './dto/platform-settings.model';
import { UpdatePlatformSettingsInput } from './dto/update-platform-settings.input';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly repo: AdminSettingsRepository) {}

  async get(): Promise<PlatformSettings> {
    const row = await this.repo.getOrCreate();
    return mapPlatformSettings(row);
  }

  async update(input: UpdatePlatformSettingsInput, actor: AuthUser): Promise<PlatformSettings> {
    const data: Prisma.PlatformSettingUpdateInput = {};

    if (input.platformCommissionPercentage !== undefined) {
      data.platformCommissionPercentage = input.platformCommissionPercentage;
    }
    if (input.slotLockDurationMinutes !== undefined) {
      data.slotLockDurationMinutes = input.slotLockDurationMinutes;
    }
    if (input.cancellationWindowHours !== undefined) {
      data.cancellationWindowHours = input.cancellationWindowHours;
    }
    if (input.refundPolicyText !== undefined) {
      data.refundPolicyText = input.refundPolicyText.trim() || null;
    }
    if (input.bookingServiceFee !== undefined) {
      data.bookingServiceFee = input.bookingServiceFee;
    }
    if (input.paymentProvidersEnabled !== undefined) {
      data.paymentProvidersEnabled = { set: input.paymentProvidersEnabled };
    }
    if (input.supportContactNumber !== undefined) {
      data.supportContactNumber = input.supportContactNumber.trim() || null;
    }
    if (input.supportEmail !== undefined) {
      data.supportEmail = input.supportEmail.trim() || null;
    }
    if (input.defaultCity !== undefined) {
      data.defaultCity = input.defaultCity.trim() || null;
    }
    if (input.maintenanceMode !== undefined) {
      data.maintenanceMode = input.maintenanceMode;
    }

    const updated = await this.repo.update({ data, actorId: actor.id });
    return mapPlatformSettings(updated);
  }

  /**
   * Helper consumed by the payments module — returns the live commission
   * percentage from settings. Caller is expected to fall back to env when
   * the settings row hasn't been initialised yet.
   */
  async getCommissionPercentage(): Promise<number | null> {
    const row = await this.repo.getOrCreate();
    return Number(row.platformCommissionPercentage.toString());
  }
}
