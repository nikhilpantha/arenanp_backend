-- CreateTable
CREATE TABLE "venue_owner_invitations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "phoneNumber" TEXT,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "invitedById" TEXT NOT NULL,
    "createdUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "venue_owner_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "venue_owner_invitations_email_idx" ON "venue_owner_invitations"("email");

-- CreateIndex
CREATE INDEX "venue_owner_invitations_expiresAt_idx" ON "venue_owner_invitations"("expiresAt");

-- CreateIndex
CREATE INDEX "venue_owner_invitations_acceptedAt_idx" ON "venue_owner_invitations"("acceptedAt");

-- AddForeignKey
ALTER TABLE "venue_owner_invitations" ADD CONSTRAINT "venue_owner_invitations_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venue_owner_invitations" ADD CONSTRAINT "venue_owner_invitations_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
