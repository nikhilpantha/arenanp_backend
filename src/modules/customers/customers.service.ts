import { Injectable, NotFoundException } from '@nestjs/common';

import { BookingModel, mapBookingToGraphql } from '../booking/dto/booking.model';
import { computeLoyaltyReadiness } from '../offers/loyalty.util';

import { CustomersRepository } from './customers.repository';
import type { CreateVenueCustomerInput, ListVenueCustomersInput } from './dto/customer.inputs';
import { mapCustomer, VenueCustomerModel } from './dto/customer.model';

@Injectable()
export class CustomersService {
  constructor(private readonly repo: CustomersRepository) {}

  async listVenueCustomers(input: ListVenueCustomersInput): Promise<VenueCustomerModel[]> {
    const customers = await this.repo.listVenueCustomers(input);
    const ids = customers.map((c) => c.id);

    const offer = await this.repo.findLoyaltyOffer(input.venueId);
    const every = offer?.everyGames ?? null;
    const [completed, redeemed] = await Promise.all([
      this.repo.completedByCustomer(ids),
      offer && every ? this.repo.redeemedByCustomer(ids, offer.id) : Promise.resolve(new Map()),
    ]);

    return customers.map((c) => {
      const played = completed.get(c.id) ?? 0;
      const ready = every
        ? computeLoyaltyReadiness(every, played, redeemed.get(c.id) ?? 0).ready
        : false;
      return mapCustomer(c, played, ready);
    });
  }

  async getOne(venueId: string, customerId: string): Promise<VenueCustomerModel> {
    const customer = await this.repo.findOne(venueId, customerId);
    if (!customer) throw new NotFoundException('Customer not found for this venue.');
    const offer = await this.repo.findLoyaltyOffer(venueId);
    const every = offer?.everyGames ?? null;
    const [completed, redeemed] = await Promise.all([
      this.repo.completedByCustomer([customer.id]),
      offer && every
        ? this.repo.redeemedByCustomer([customer.id], offer.id)
        : Promise.resolve(new Map()),
    ]);
    const played = completed.get(customer.id) ?? 0;
    const ready = every
      ? computeLoyaltyReadiness(every, played, redeemed.get(customer.id) ?? 0).ready
      : false;
    return mapCustomer(customer, played, ready);
  }

  async create(input: CreateVenueCustomerInput): Promise<VenueCustomerModel> {
    return mapCustomer(await this.repo.create(input), 0, false);
  }

  async getCustomerBookings(venueId: string, customerId: string): Promise<BookingModel[]> {
    const rows = await this.repo.customerBookings(venueId, customerId);
    return rows.map(mapBookingToGraphql);
  }
}
