import { Injectable, NotFoundException } from '@nestjs/common';

import { buildPageInfo } from '../../common/dto/pagination.input';
import { nepalWallTimeToUtc, parseHHmmToMinutes } from '../../common/utils/nepal-time';

import { DiscoveryRepository } from './discovery.repository';
import { BrowseVenuesInput, CourtSlotsInput } from './dto/discovery.inputs';
import { PaginatedVenues } from './dto/paginated-venues';
import { CourtSlot, CourtSlots } from './dto/slot.model';
import { mapVenueCard } from './dto/venue-card.model';
import { mapVenueDetail, VenueDetail } from './dto/venue-detail.model';

const DAY_MS = 24 * 60 * 60_000;

@Injectable()
export class DiscoveryService {
  constructor(private readonly repo: DiscoveryRepository) {}

  async browseVenues(input: BrowseVenuesInput): Promise<PaginatedVenues> {
    const page = input.pagination?.page ?? 1;
    const pageSize = input.pagination?.pageSize ?? 20;
    const { items, total } = await this.repo.browseVenues(input, page, pageSize);
    return { items: items.map(mapVenueCard), pageInfo: buildPageInfo(page, pageSize, total) };
  }

  async venueDetail(venueId: string): Promise<VenueDetail> {
    const row = await this.repo.venueDetail(venueId);
    if (!row) throw new NotFoundException('Venue not found.');
    return mapVenueDetail(row);
  }

  /**
   * Generate the bookable slots for a court on a venue-local day: walk the venue's
   * operating window in `slotMinutes` steps (converting each boundary from Nepal wall
   * time to UTC), then flag any slot that overlaps an existing booking or is in the past.
   */
  async courtSlots(input: CourtSlotsInput): Promise<CourtSlots> {
    const court = await this.repo.courtForSlots(input.courtId);
    if (!court) throw new NotFoundException('Court not found.');

    const { slotMinutes } = court;
    const pricePerHour = Number(court.pricePerHour.toString());
    const openMin = parseHHmmToMinutes(court.venue.openTime);
    const closeMin = parseHHmmToMinutes(court.venue.closeTime);
    const slotPrice = Math.round((pricePerHour * slotMinutes) / 60);

    const dayStart = nepalWallTimeToUtc(input.date, 0);
    const dayEnd = new Date(dayStart.getTime() + DAY_MS);
    const [bookings, closures] = await Promise.all([
      this.repo.bookingsForCourtInRange(input.courtId, dayStart, dayEnd),
      this.repo.closuresForCourtInRange(court.venueId, input.courtId, dayStart, dayEnd),
    ]);

    const now = Date.now();
    const slots: CourtSlot[] = [];
    for (let start = openMin; start + slotMinutes <= closeMin; start += slotMinutes) {
      const startAt = nepalWallTimeToUtc(input.date, start);
      const endAt = nepalWallTimeToUtc(input.date, start + slotMinutes);
      const booked = bookings.some((b) => b.startAt < endAt && b.endAt > startAt);
      const closed = closures.some((c) => c.startAt < endAt && c.endAt > startAt);
      slots.push({
        startAt,
        endAt,
        available: !booked && !closed && startAt.getTime() > now,
        price: slotPrice,
      });
    }
    return { courtId: court.id, date: input.date, slotMinutes, slots };
  }
}
