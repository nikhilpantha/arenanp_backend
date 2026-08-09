import { Field, ObjectType } from '@nestjs/graphql';

import {
  VENUE_AMENITIES,
  VENUE_AMENITY_LABELS,
  type VenueAmenity,
} from '../../../common/constants/venue-amenities';

@ObjectType({ description: 'A venue-wide amenity an owner can claim during setup.' })
export class VenueAmenityOption {
  @Field({ description: 'Canonical slug stored on `Venue.amenities`.' })
  slug!: string;

  @Field({ description: 'Human label to render. Never show the raw slug.' })
  label!: string;
}

/** The closed catalogue, served so no client hardcodes the list or its labels. */
export function listVenueAmenities(): VenueAmenityOption[] {
  return VENUE_AMENITIES.map((slug: VenueAmenity) => ({
    slug,
    label: VENUE_AMENITY_LABELS[slug],
  }));
}
