import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import {
  DisputeCategory,
  DisputeNote as PrismaDisputeNote,
  Dispute as PrismaDispute,
  DisputeStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import '../../../../common/enums';
import { AdminUser, mapPrismaUserToAdmin } from '../../users/dto/admin-user.model';
import { SportStub, mapSportStub } from '../../sports/dto/sport-stub.model';

@ObjectType({ description: 'Booking context embedded in a dispute.' })
export class AdminDisputeBookingStub {
  @Field(() => ID) id!: string;
  @Field({ nullable: true }) venueId?: string;
  @Field() venueName!: string;
  @Field(() => SportStub, { nullable: true }) sport?: SportStub;
  @Field() startAt!: Date;
  @Field(() => Float) total!: number;
  @Field() status!: string;
}

@ObjectType()
export class AdminDisputeNote {
  @Field(() => ID) id!: string;
  @Field(() => AdminUser) author!: AdminUser;
  @Field() body!: string;
  @Field() createdAt!: Date;
}

@ObjectType({
  description:
    'Admin-facing view of a Dispute — booking context, status, resolution, and the admin-notes thread.',
})
export class AdminDispute {
  @Field(() => ID) id!: string;
  @Field(() => AdminUser) user!: AdminUser;
  @Field(() => AdminDisputeBookingStub) booking!: AdminDisputeBookingStub;

  @Field() subject!: string;
  @Field() description!: string;
  @Field(() => DisputeCategory) category!: DisputeCategory;

  @Field(() => DisputeStatus) status!: DisputeStatus;
  @Field({ nullable: true }) resolution?: string;

  @Field(() => AdminUser, { nullable: true }) closedBy?: AdminUser;
  @Field({ nullable: true }) closedAt?: Date;

  @Field(() => [AdminDisputeNote]) notes!: AdminDisputeNote[];

  @Field() createdAt!: Date;
  @Field() updatedAt!: Date;
}

function decimalToNumber(d: Decimal | null | undefined): number {
  if (d === null || d === undefined) return 0;
  return typeof d === 'number' ? d : Number(d.toString());
}

type NoteWithAuthor = PrismaDisputeNote & {
  author: Parameters<typeof mapPrismaUserToAdmin>[0];
};

type DisputeWithRelations = PrismaDispute & {
  user: Parameters<typeof mapPrismaUserToAdmin>[0];
  closedBy?: Parameters<typeof mapPrismaUserToAdmin>[0] | null;
  booking: {
    id: string;
    venueId: string;
    startAt: Date;
    total: Decimal;
    status: string;
    venue: { name: string };
    court: { sport: { id: string; slug: string; name: string; iconUrl: string | null } };
  };
  notes: NoteWithAuthor[];
};

export function mapDisputeNote(n: NoteWithAuthor): AdminDisputeNote {
  return {
    id: n.id,
    author: mapPrismaUserToAdmin(n.author),
    body: n.body,
    createdAt: n.createdAt,
  };
}

export function mapDisputeToAdmin(d: DisputeWithRelations): AdminDispute {
  return {
    id: d.id,
    user: mapPrismaUserToAdmin(d.user),
    booking: {
      id: d.booking.id,
      venueId: d.booking.venueId,
      venueName: d.booking.venue.name,
      sport: mapSportStub(d.booking.court.sport),
      startAt: d.booking.startAt,
      total: decimalToNumber(d.booking.total),
      status: d.booking.status,
    },
    subject: d.subject,
    description: d.description,
    category: d.category,
    status: d.status,
    resolution: d.resolution ?? undefined,
    closedBy: d.closedBy ? mapPrismaUserToAdmin(d.closedBy) : undefined,
    closedAt: d.closedAt ?? undefined,
    notes: d.notes.map(mapDisputeNote),
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  };
}
