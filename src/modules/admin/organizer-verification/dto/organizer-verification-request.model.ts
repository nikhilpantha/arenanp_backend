import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CapabilityStatus, OrganizerVerificationRequest } from '@prisma/client';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';

/**
 * Admin-facing GraphQL view of a single organizer-verification submission.
 * Carries the submitted info + reviewer audit trail + status. The owning user
 * is included so the list/detail page can show the requester inline.
 */
@ObjectType()
export class OrganizerVerificationRequestModel {
  @Field(() => ID) id!: string;

  @Field(() => AdminUser) user!: AdminUser;

  @Field({ nullable: true }) businessName?: string;
  @Field({ nullable: true }) contactEmail?: string;
  @Field({ nullable: true }) contactPhone?: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) bio?: string;
  @Field({ nullable: true }) experience?: string;
  /** Stored S3 object keys; presigned to download URLs by OrganizerVerificationResolver. */
  documentUrls!: string[];

  @Field(() => CapabilityStatus) status!: CapabilityStatus;
  @Field({ nullable: true }) rejectionReason?: string;

  @Field({ nullable: true }) reviewedAt?: Date;
  @Field(() => AdminUser, { nullable: true }) reviewer?: AdminUser;

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

type WithRelations = OrganizerVerificationRequest & {
  user: Parameters<typeof mapPrismaUserToAdmin>[0];
  reviewer?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
};

export function mapOrganizerRequestToGraphql(
  req: WithRelations,
): OrganizerVerificationRequestModel {
  return {
    id: req.id,
    user: mapPrismaUserToAdmin(req.user),
    businessName: req.businessName ?? undefined,
    contactEmail: req.contactEmail ?? undefined,
    contactPhone: req.contactPhone ?? undefined,
    city: req.city ?? undefined,
    bio: req.bio ?? undefined,
    experience: req.experience ?? undefined,
    documentUrls: req.documentUrls,
    status: req.status,
    rejectionReason: req.rejectionReason ?? undefined,
    reviewedAt: req.reviewedAt ?? undefined,
    reviewer: req.reviewer ? mapPrismaUserToAdmin(req.reviewer) : undefined,
    createdAt: req.createdAt,
    updatedAt: req.updatedAt,
  };
}
