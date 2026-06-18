import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Offer as PrismaOffer,
  OfferAudience,
  OfferDiscountType,
  OfferTrigger,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { PageInfo } from '../../../common/dto/pagination.input';

import '../../../common/enums';

@ObjectType({ description: 'A venue discount / promo code, or a loyalty free-game reward.' })
export class OfferModel {
  @Field(() => ID) id!: string;
  @Field(() => ID) venueId!: string;
  @Field() title!: string;
  @Field({ nullable: true }) description?: string;

  @Field(() => OfferDiscountType) discountType!: OfferDiscountType;
  @Field(() => Float, { description: 'Percent (0–100) for PERCENT, or a flat amount for FLAT.' })
  discountValue!: number;
  @Field(() => Float, { nullable: true, description: 'Cap on a PERCENT discount.' })
  maxDiscount?: number;
  @Field(() => Float, { description: 'Minimum booking subtotal to qualify.' })
  minSubtotal!: number;

  @Field(() => OfferTrigger) trigger!: OfferTrigger;
  @Field(() => OfferAudience) audience!: OfferAudience;
  @Field(() => Int, { nullable: true, description: 'For EVERY_NTH: free game every N games.' })
  everyGames?: number;

  @Field({ nullable: true, description: 'Promo code (upper-cased); null = always-listed offer.' })
  code?: string;

  @Field() validFrom!: Date;
  @Field() validUntil!: Date;
  @Field() isActive!: boolean;

  @Field(() => Int, { nullable: true }) usageLimit?: number;
  @Field(() => Int) usageCount!: number;
  @Field() createdAt!: Date;
}

@ObjectType()
export class PaginatedOffers {
  @Field(() => [OfferModel]) items!: OfferModel[];
  @Field(() => PageInfo) pageInfo!: PageInfo;
}

@ObjectType({ description: "A subject's loyalty progress toward a free game at a venue." })
export class LoyaltyStatusModel {
  @Field({ description: 'Whether the venue has an active loyalty offer for this audience.' })
  configured!: boolean;
  @Field(() => Int, { nullable: true, description: 'Free game every N games (when configured).' })
  every?: number;
  @Field(() => Int, { description: 'Qualifying completed games toward the current cycle.' })
  gamesPlayed!: number;
  @Field(() => Int, { description: 'Games remaining to the next free game (0 = ready now).' })
  toNext!: number;
  @Field({ description: 'A free game is available to redeem now.' })
  ready!: boolean;
  @Field(() => ID, { nullable: true, description: 'The loyalty offer to redeem, when ready.' })
  offerId?: string;
}

function num(v: Decimal): number {
  return Number(v.toString());
}

export function mapOffer(o: PrismaOffer): OfferModel {
  return {
    id: o.id,
    venueId: o.venueId,
    title: o.title,
    description: o.description ?? undefined,
    discountType: o.discountType,
    discountValue: num(o.discountValue),
    maxDiscount: o.maxDiscount == null ? undefined : num(o.maxDiscount),
    minSubtotal: num(o.minSubtotal),
    trigger: o.trigger,
    audience: o.audience,
    everyGames: o.everyGames ?? undefined,
    code: o.code ?? undefined,
    validFrom: o.validFrom,
    validUntil: o.validUntil,
    isActive: o.isActive,
    usageLimit: o.usageLimit ?? undefined,
    usageCount: o.usageCount,
    createdAt: o.createdAt,
  };
}
