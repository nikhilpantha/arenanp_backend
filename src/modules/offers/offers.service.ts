import { BadRequestException, Injectable } from '@nestjs/common';
import { Offer, OfferAudience, OfferDiscountType, OfferTrigger } from '@prisma/client';

import { buildPageInfo } from '../../common/dto/pagination.input';

import { LoyaltySubject, OffersRepository } from './offers.repository';
import { computeLoyaltyReadiness } from './loyalty.util';
import {
  CreateOfferInput,
  ListVenueOffersInput,
  LoyaltyStatusInput,
  UpdateOfferInput,
} from './dto/offer.inputs';
import { LoyaltyStatusModel, mapOffer, OfferModel, PaginatedOffers } from './dto/offer.model';

/** Discount an offer yields on a subtotal — rounded, never more than the subtotal. */
export function computeOfferDiscount(offer: Offer, subtotal: number): number {
  if (offer.discountType === OfferDiscountType.FREE_GAME) return subtotal; // zeroes the total
  const value = Number(offer.discountValue.toString());
  let discount =
    offer.discountType === OfferDiscountType.PERCENT ? (subtotal * value) / 100 : value;
  if (offer.discountType === OfferDiscountType.PERCENT && offer.maxDiscount != null) {
    discount = Math.min(discount, Number(offer.maxDiscount.toString()));
  }
  return Math.min(Math.round(discount), subtotal);
}

function assertValidOffer(opts: {
  discountType?: OfferDiscountType;
  discountValue?: number;
  trigger?: OfferTrigger;
  everyGames?: number;
  validFrom?: Date;
  validUntil?: Date;
}): void {
  if (opts.validFrom && opts.validUntil && opts.validFrom >= opts.validUntil) {
    throw new BadRequestException('validUntil must be after validFrom.');
  }
  if (
    opts.discountType === OfferDiscountType.PERCENT &&
    opts.discountValue != null &&
    opts.discountValue > 100
  ) {
    throw new BadRequestException('A PERCENT discount cannot exceed 100.');
  }
  if (opts.trigger === OfferTrigger.EVERY_NTH && (opts.everyGames == null || opts.everyGames < 1)) {
    throw new BadRequestException('A loyalty (EVERY_NTH) offer needs everyGames ≥ 1.');
  }
}

/** Map a loyalty subject input → the repo subject + the offer audience it falls under. */
function resolveSubject(input: LoyaltyStatusInput): {
  subject: LoyaltySubject;
  audience: OfferAudience;
} {
  const provided = [input.customerId, input.userId, input.phone].filter(Boolean).length;
  if (provided > 1) {
    throw new BadRequestException('Pass exactly one loyalty subject.');
  }
  if (input.customerId) {
    return { subject: { customerId: input.customerId }, audience: OfferAudience.INDIVIDUAL };
  }
  if (input.userId) {
    return {
      subject: { venueId: input.venueId, userId: input.userId },
      audience: OfferAudience.INDIVIDUAL,
    };
  }
  if (input.phone) {
    return {
      subject: { venueId: input.venueId, phone: input.phone },
      audience: OfferAudience.INDIVIDUAL,
    };
  }
  throw new BadRequestException('A loyalty subject (customerId, userId or phone) is required.');
}

@Injectable()
export class OffersService {
  constructor(private readonly repo: OffersRepository) {}

  async listVenueOffers(input: ListVenueOffersInput): Promise<PaginatedOffers> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listVenueOffers(input, page, pageSize);
    return { items: items.map(mapOffer), pageInfo: buildPageInfo(page, pageSize, total) };
  }

  async availableOffers(venueId: string): Promise<OfferModel[]> {
    const rows = await this.repo.availableOffers(venueId);
    return rows.map(mapOffer);
  }

  /** A subject's progress toward a free game (and whether one is claimable now). */
  async getLoyaltyStatus(input: LoyaltyStatusInput): Promise<LoyaltyStatusModel> {
    const { subject, audience } = resolveSubject(input);
    const offer = await this.repo.findActiveLoyaltyOffer(input.venueId, audience);
    if (!offer || offer.everyGames == null) {
      return { configured: false, gamesPlayed: 0, toNext: 0, ready: false };
    }
    const [played, redeemed] = await Promise.all([
      this.repo.countCompletedForSubject(subject),
      this.repo.countRedeemedFreeForSubject(subject, offer.id),
    ]);
    const r = computeLoyaltyReadiness(offer.everyGames, played, redeemed);
    return {
      configured: true,
      every: offer.everyGames,
      gamesPlayed: r.gamesPlayed,
      toNext: r.toNext,
      ready: r.ready,
      offerId: r.ready ? offer.id : undefined,
    };
  }

  /**
   * Validate that a subject can redeem a free game right now and return the loyalty
   * offer to attach. Throws if no free game is available. Called from the booking flow.
   */
  async resolveLoyaltyForBooking(input: LoyaltyStatusInput): Promise<{ offerId: string }> {
    const status = await this.getLoyaltyStatus(input);
    if (!status.ready || !status.offerId) {
      throw new BadRequestException('No free game available for this customer yet.');
    }
    return { offerId: status.offerId };
  }

  async create(input: CreateOfferInput): Promise<OfferModel> {
    assertValidOffer(input);
    return mapOffer(await this.repo.create(input));
  }

  async update(input: UpdateOfferInput): Promise<OfferModel> {
    assertValidOffer(input);
    return mapOffer(await this.repo.update(input));
  }

  async remove(venueId: string, offerId: string): Promise<OfferModel> {
    return mapOffer(await this.repo.remove(venueId, offerId));
  }

  /**
   * Validate a promo code against a booking subtotal and return the redemption.
   * Throws if the code is invalid/expired, exhausted, or the subtotal is too low.
   * The atomic `usageCount` bump happens inside the booking transaction.
   */
  async resolveOfferForBooking(
    venueId: string,
    code: string,
    subtotal: number,
  ): Promise<{ offerId: string; discount: number }> {
    const offer = await this.repo.findRedeemableByCode(venueId, code);
    if (!offer) throw new BadRequestException('Invalid or expired offer code.');
    if (offer.usageLimit != null && offer.usageCount >= offer.usageLimit) {
      throw new BadRequestException('This offer has reached its usage limit.');
    }
    const minSubtotal = Number(offer.minSubtotal.toString());
    if (subtotal < minSubtotal) {
      throw new BadRequestException(`This offer needs a minimum subtotal of ${minSubtotal}.`);
    }
    return { offerId: offer.id, discount: computeOfferDiscount(offer, subtotal) };
  }
}
