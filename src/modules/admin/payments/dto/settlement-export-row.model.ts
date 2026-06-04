import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description:
    'Flat row shape suitable for CSV export. The frontend turns these into a CSV file client-side.',
})
export class SettlementExportRow {
  @Field() paymentId!: string;
  @Field() bookingId!: string;
  @Field() venueId!: string;
  @Field() venueName!: string;
  @Field() venueCity!: string;
  @Field() customerName!: string;
  @Field() provider!: string;
  @Field() paidAt!: string;
  @Field(() => Float) grossAmount!: number;
  @Field(() => Float) commissionPercentage!: number;
  @Field(() => Float) platformCommissionAmount!: number;
  @Field(() => Float) venueSettlementAmount!: number;
  @Field() currency!: string;
  @Field() settlementStatus!: string;
  @Field({ nullable: true }) settlementPaidAt?: string;
  @Field({ nullable: true }) paymentReference?: string;
}
