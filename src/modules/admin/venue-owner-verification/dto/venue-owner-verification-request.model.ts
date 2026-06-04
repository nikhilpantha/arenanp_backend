import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VenueOwnerStatus, VenueOwnerVerificationRequest } from '@prisma/client';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';

/**
 * Admin-facing GraphQL view of a single venue-owner-verification submission.
 * Carries the submitted KYC + business info, reviewer audit trail and status.
 */
@ObjectType()
export class VenueOwnerVerificationRequestModel {
  @Field(() => ID) id!: string;

  @Field(() => AdminUser) user!: AdminUser;

  @Field({ nullable: true }) businessName?: string;
  @Field({ nullable: true }) businessType?: string;
  @Field({ nullable: true }) panNumber?: string;
  @Field({ nullable: true }) vatNumber?: string;
  @Field({ nullable: true }) registrationNumber?: string;
  @Field({ nullable: true }) contactEmail?: string;
  @Field({ nullable: true }) contactPhone?: string;
  @Field({ nullable: true }) address?: string;
  @Field({ nullable: true }) city?: string;
  @Field(() => [String]) documentUrls!: string[];

  @Field(() => VenueOwnerStatus) status!: VenueOwnerStatus;
  @Field({ nullable: true }) rejectionReason?: string;

  @Field({ nullable: true }) reviewedAt?: Date;
  @Field(() => AdminUser, { nullable: true }) reviewer?: AdminUser;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

type WithRelations = VenueOwnerVerificationRequest & {
  user: Parameters<typeof mapPrismaUserToAdmin>[0];
  reviewer?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

export function mapVenueOwnerRequestToGraphql(
  req: WithRelations,
): VenueOwnerVerificationRequestModel {
  return {
    id: req.id,
    user: mapPrismaUserToAdmin(req.user),
    businessName: req.businessName ?? undefined,
    businessType: req.businessType ?? undefined,
    panNumber: req.panNumber ?? undefined,
    vatNumber: req.vatNumber ?? undefined,
    registrationNumber: req.registrationNumber ?? undefined,
    contactEmail: req.contactEmail ?? undefined,
    contactPhone: req.contactPhone ?? undefined,
    address: req.address ?? undefined,
    city: req.city ?? undefined,
    documentUrls: req.documentUrls,
    status: req.status,
    rejectionReason: req.rejectionReason ?? undefined,
    reviewedAt: req.reviewedAt ?? undefined,
    reviewer: req.reviewer ? mapPrismaUserToAdmin(req.reviewer) : undefined,
    createdAt: req.createdAt,
    updatedAt: req.updatedAt,
  };
}
