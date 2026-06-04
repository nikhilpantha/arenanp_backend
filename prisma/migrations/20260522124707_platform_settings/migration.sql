-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "platformCommissionPercentage" DECIMAL(5,2) NOT NULL DEFAULT 10,
    "slotLockDurationMinutes" INTEGER NOT NULL DEFAULT 10,
    "cancellationWindowHours" INTEGER NOT NULL DEFAULT 24,
    "refundPolicyText" TEXT,
    "bookingServiceFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "paymentProvidersEnabled" "PaymentProvider"[] DEFAULT ARRAY[]::"PaymentProvider"[],
    "supportContactNumber" TEXT,
    "supportEmail" TEXT,
    "defaultCity" TEXT,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "platform_settings" ADD CONSTRAINT "platform_settings_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
