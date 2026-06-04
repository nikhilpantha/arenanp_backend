-- CreateTable
CREATE TABLE "organizer_verification_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "city" TEXT,
    "bio" TEXT,
    "experience" TEXT,
    "documentUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "OrganizerStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "rejectionReason" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizer_verification_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "organizer_verification_requests_status_idx" ON "organizer_verification_requests"("status");

-- CreateIndex
CREATE INDEX "organizer_verification_requests_userId_idx" ON "organizer_verification_requests"("userId");

-- AddForeignKey
ALTER TABLE "organizer_verification_requests" ADD CONSTRAINT "organizer_verification_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizer_verification_requests" ADD CONSTRAINT "organizer_verification_requests_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
