import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Sport } from '@prisma/client';

import { StorageService } from '../../storage/storage.service';
import { VenueRepository } from './venue.repository';
import { mapMembershipToGraphql, VenueMembershipModel } from './dto/venue-membership.model';
import { mapVenueToGraphql, VenueModel } from './dto/venue.model';
import type {
  SetVenueServicesInput,
  SubmitVenueInput,
  UpdateVenueProfileInput,
} from './dto/venue.inputs';

@Injectable()
export class VenueService {
  constructor(
    private readonly repo: VenueRepository,
    private readonly storage: StorageService,
  ) {}

  async myVenues(userId: string): Promise<VenueModel[]> {
    const venues = await this.repo.findMyVenues(userId);
    return venues.map(mapVenueToGraphql);
  }

  async myVenue(userId: string, venueId: string): Promise<VenueModel> {
    const venue = await this.repo.findMyVenue(venueId, userId);
    if (!venue) throw new NotFoundException('Venue not found.');
    return mapVenueToGraphql(venue);
  }

  async myMemberships(userId: string): Promise<VenueMembershipModel[]> {
    const rows = await this.repo.findMyMemberships(userId);
    return rows.map(mapMembershipToGraphql);
  }

  async submitVenue(userId: string, input: SubmitVenueInput): Promise<VenueModel> {
    const sportsBySlug = await this.resolveSports(input.services.map((s) => s.sportSlug));
    const venue = await this.repo.submitVenue(userId, input, sportsBySlug);
    return mapVenueToGraphql(venue);
  }

  async updateProfile(input: UpdateVenueProfileInput): Promise<VenueModel> {
    const replacingCover = input.coverImageUrl !== undefined;
    const replacingGallery = input.imageUrls !== undefined;
    // Snapshot current image keys so we can delete the ones being dropped.
    const before =
      replacingCover || replacingGallery ? await this.repo.findById(input.venueId) : null;

    const venue = await this.repo.updateProfile(input);

    if (before) {
      const orphans: string[] = [];
      if (replacingCover && before.coverImageUrl && before.coverImageUrl !== input.coverImageUrl) {
        orphans.push(before.coverImageUrl);
      }
      if (replacingGallery) {
        const next = new Set(input.imageUrls ?? []);
        orphans.push(...before.imageUrls.filter((key) => !next.has(key)));
      }
      await this.storage.deleteMany(orphans);
    }
    return mapVenueToGraphql(venue);
  }

  async setServices(input: SetVenueServicesInput): Promise<VenueModel> {
    const sportsBySlug = await this.resolveSports(input.services.map((s) => s.sportSlug));
    // Courts are replaced wholesale; capture old court image keys to clean up.
    const before = await this.repo.findById(input.venueId);
    const oldCourtImages = before?.courts.flatMap((c) => c.imageUrls) ?? [];

    const venue = await this.repo.setServices(input, sportsBySlug);

    const surviving = new Set(venue.courts.flatMap((c) => c.imageUrls));
    await this.storage.deleteMany(oldCourtImages.filter((key) => !surviving.has(key)));
    return mapVenueToGraphql(venue);
  }

  /** Validate every referenced sport exists + is active, and index them by slug. */
  private async resolveSports(slugs: string[]): Promise<Map<string, Sport>> {
    const unique = [...new Set(slugs)];
    const sports = await this.repo.sportsBySlugs(unique);
    const bySlug = new Map(sports.map((s) => [s.slug, s]));
    const missing = unique.filter((slug) => !bySlug.has(slug));
    if (missing.length) {
      throw new BadRequestException(`Unknown sport(s): ${missing.join(', ')}`);
    }
    const inactive = sports.filter((s) => !s.isActive).map((s) => s.slug);
    if (inactive.length) {
      throw new BadRequestException(`Sport(s) not available: ${inactive.join(', ')}`);
    }
    return bySlug;
  }
}
