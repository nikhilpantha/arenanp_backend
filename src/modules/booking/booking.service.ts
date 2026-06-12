import { Injectable, NotFoundException } from '@nestjs/common';

import { BookingRepository } from './booking.repository';
import { VenueBookingSummary } from './dto/booking-summary.model';
import { mapBookingToGraphql, BookingModel } from './dto/booking.model';
import type {
  CreateVenueBookingInput,
  ListVenueBookingsInput,
  RecordBookingPaymentInput,
  SetBookingStatusInput,
} from './dto/booking.inputs';

@Injectable()
export class BookingService {
  constructor(private readonly repo: BookingRepository) {}

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
    return mapBookingToGraphql(await this.repo.create(input, actorId));
  }

  async setStatus(input: SetBookingStatusInput, actorId: string): Promise<BookingModel> {
    return mapBookingToGraphql(await this.repo.setStatus(input, actorId));
  }

  async recordPayment(input: RecordBookingPaymentInput): Promise<BookingModel> {
    return mapBookingToGraphql(await this.repo.recordPayment(input));
  }
}
