import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { PaymentProvider, PlatformSetting } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';

@ObjectType({
  description:
    'Platform-wide configuration. Singleton — one row per environment. Edited from /admin/settings.',
})
export class PlatformSettings {
  @Field(() => ID) id!: string;

  @Field(() => Float) platformCommissionPercentage!: number;
  @Field(() => Int) slotLockDurationMinutes!: number;
  @Field(() => Int) cancellationWindowHours!: number;
  @Field({ nullable: true }) refundPolicyText?: string;
  @Field(() => Float) bookingServiceFee!: number;

  @Field(() => [PaymentProvider]) paymentProvidersEnabled!: PaymentProvider[];

  @Field({ nullable: true }) supportContactNumber?: string;
  @Field({ nullable: true }) supportEmail?: string;
  @Field({ nullable: true }) defaultCity?: string;

  @Field() maintenanceMode!: boolean;

  @Field(() => AdminUser, { nullable: true }) updatedBy?: AdminUser;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

function decimalToNumber(d: Decimal | null | undefined): number {
  if (d === null || d === undefined) return 0;
  return typeof d === 'number' ? d : Number(d.toString());
}

type SettingsWithRelations = PlatformSetting & {
  updatedBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

export function mapPlatformSettings(s: SettingsWithRelations): PlatformSettings {
  return {
    id: s.id,
    platformCommissionPercentage: decimalToNumber(s.platformCommissionPercentage),
    slotLockDurationMinutes: s.slotLockDurationMinutes,
    cancellationWindowHours: s.cancellationWindowHours,
    refundPolicyText: s.refundPolicyText ?? undefined,
    bookingServiceFee: decimalToNumber(s.bookingServiceFee),
    paymentProvidersEnabled: s.paymentProvidersEnabled,
    supportContactNumber: s.supportContactNumber ?? undefined,
    supportEmail: s.supportEmail ?? undefined,
    defaultCity: s.defaultCity ?? undefined,
    maintenanceMode: s.maintenanceMode,
    updatedBy: s.updatedBy ? mapPrismaUserToAdmin(s.updatedBy) : undefined,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  };
}
