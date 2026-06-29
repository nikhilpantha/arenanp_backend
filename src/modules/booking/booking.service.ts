import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { buildPageInfo } from '../../common/dto/pagination.input';
import { parseHHmmToMinutes, utcToNepalMinutesOfDay } from '../../common/utils/nepal-time';
import { CustomersRepository } from '../customers/customers.repository';
import { OffersService } from '../offers/offers.service';

import { BookingRepository } from './booking.repository';
import { VenueBookingSummary } from './dto/booking-summary.model';
import { mapBookingToGraphql, BookingModel } from './dto/booking.model';
import type {
  CompleteVenueBookingInput,
  CreateVenueBookingInput,
  ListVenueBookingsInput,
  RecordBookingPaymentInput,
  SetBookingStatusInput,
  UpdateVenueBookingInput,
} from './dto/booking.inputs';
import {
  mapPlayerBooking,
  PaginatedPlayerBookings,
  PlayerBookingModel,
} from './dto/player-booking.model';
import type {
  AcceptVenueBookingInput,
  CancelMyBookingInput,
  CreateBookingInput,
  DeclineVenueBookingInput,
  MyBookingsInput,
} from './dto/player-booking.inputs';

@Injectable()
export class BookingService {
  constructor(
    private readonly repo: BookingRepository,
    private readonly offers: OffersService,
    private readonly customers: CustomersRepository,
  ) {}

  async list(input: ListVenueBookingsInput): Promise<BookingModel[]> {
    const rows = await this.repo.list(input);
    return rows.map(mapBookingToGraphql);
  }

  summary(venueId: string): Promise<VenueBookingSummary> {
    return this.repo.summary(venueId);
  }

  async getOne(venueId: string, bookingId: string): Promise<BookingModel> {
    const row = await this.repo.findOne(venueId, bookingId);
    if (!row) throw new NotFoundException('Booking not found.');
    return mapBookingToGraphql(row);
  }

  async create(input: CreateVenueBookingInput, actorId: string): Promise<BookingModel> {
    // Redeeming a loyalty free game: validate the subject has actually earned one,
    // and attach the loyalty offer so the booking is recorded as a redemption.
    let loyaltyOfferId: string | undefined;
    if (input.redeemFreeGame) {
      const subject = input.customerId
        ? { venueId: input.venueId, customerId: input.customerId }
        : { venueId: input.venueId, phone: input.customerPhone ?? '' };
      const { offerId } = await this.offers.resolveLoyaltyForBooking(subject);
      loyaltyOfferId = offerId;
    }

    // Dedupe a walk-in by phone into one venue Customer so repeat visitors merge into a
    // single record (loyalty + history). A phoneless walk-in stays inline on the booking.
    let customerId = input.customerId;
    if (!customerId && input.customerPhone) {
      const customer = await this.customers.getOrCreateForWalkIn(input.venueId, {
        name: input.customerName,
        phone: input.customerPhone,
        kind: input.customerType,
      });
      customerId = customer.id;
    }

    return mapBookingToGraphql(
      await this.repo.create({ ...input, customerId }, actorId, loyaltyOfferId),
    );
  }

  async update(input: UpdateVenueBookingInput): Promise<BookingModel> {
    return mapBookingToGraphql(await this.repo.update(input));
  }

  async setStatus(input: SetBookingStatusInput, actorId: string): Promise<BookingModel> {
    return mapBookingToGraphql(await this.repo.setStatus(input, actorId));
  }

  async complete(input: CompleteVenueBookingInput, actorId: string): Promise<BookingModel> {
    return mapBookingToGraphql(await this.repo.complete(input, actorId));
  }

  async recordPayment(input: RecordBookingPaymentInput): Promise<BookingModel> {
    return mapBookingToGraphql(await this.repo.recordPayment(input));
  }

  // ─── Player-facing ──────────────────────────────────────────────────────────

  async createBooking(input: CreateBookingInput, userId: string): Promise<PlayerBookingModel> {
    const court = await this.repo.courtForBooking(input.courtId);
    if (!court) throw new NotFoundException('Court not found.');

    const duration = input.durationMinutes ?? court.slotMinutes;
    if (duration % court.slotMinutes !== 0) {
      throw new BadRequestException(`Duration must be a multiple of ${court.slotMinutes} minutes.`);
    }

    const startAt = new Date(input.startAt);
    if (Number.isNaN(startAt.getTime())) throw new BadRequestException('Invalid startAt.');
    if (startAt.getTime() <= Date.now()) {
      throw new BadRequestException('Cannot book a slot in the past.');
    }
    const endAt = new Date(startAt.getTime() + duration * 60_000);

    // Must sit inside the venue's operating window, aligned to the slot grid.
    const openMin = parseHHmmToMinutes(court.venue.openTime);
    const closeMin = parseHHmmToMinutes(court.venue.closeTime);
    const startMin = utcToNepalMinutesOfDay(startAt);
    const outsideHours = startMin < openMin || startMin + duration > closeMin;
    const misaligned = (startMin - openMin) % court.slotMinutes !== 0;
    if (outsideHours || misaligned) {
      throw new BadRequestException('Selected time is outside the venue’s bookable slots.');
    }

    const pricePerHour = Number(court.pricePerHour.toString());
    const subtotal = Math.round((pricePerHour * duration) / 60);

    // Apply a promo code if supplied; the atomic usage bump happens in the booking tx.
    let discountAmount = 0;
    let offerId: string | null = null;
    if (input.offerCode) {
      const applied = await this.offers.resolveOfferForBooking(
        court.venueId,
        input.offerCode,
        subtotal,
      );
      discountAmount = applied.discount;
      offerId = applied.offerId;
    }

    // Link the player to this venue's CRM (create/claim their Customer) so the booking
    // shows in the venue's Customers list + accrues loyalty like a walk-in's.
    const customer = await this.customers.getOrCreateForUser(court.venueId, userId);

    const row = await this.repo.createPlayerBooking({
      userId,
      customerId: customer.id,
      courtId: court.id,
      venueId: court.venueId,
      startAt,
      endAt,
      durationMinutes: duration,
      pricePerHour,
      subtotal,
      discountAmount,
      total: Math.max(0, subtotal - discountAmount),
      offerId,
      notes: input.notes ?? null,
    });
    return mapPlayerBooking(row);
  }

  async myBookings(input: MyBookingsInput, userId: string): Promise<PaginatedPlayerBookings> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.listMyBookings(userId, page, pageSize);
    return { items: items.map(mapPlayerBooking), pageInfo: buildPageInfo(page, pageSize, total) };
  }

  async cancelMyBooking(input: CancelMyBookingInput, userId: string): Promise<PlayerBookingModel> {
    return mapPlayerBooking(
      await this.repo.cancelMyBooking(userId, input.bookingId, input.reason ?? null),
    );
  }

  async acceptBooking(input: AcceptVenueBookingInput, actorId: string): Promise<BookingModel> {
    return mapBookingToGraphql(
      await this.repo.acceptBooking(input.venueId, input.bookingId, actorId),
    );
  }

  async declineBooking(input: DeclineVenueBookingInput, actorId: string): Promise<BookingModel> {
    return mapBookingToGraphql(
      await this.repo.declineBooking(input.venueId, input.bookingId, actorId, input.reason ?? null),
    );
  }
}
