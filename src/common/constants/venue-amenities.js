"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VENUE_AMENITY_LABELS = exports.VENUE_AMENITIES = void 0;
exports.isVenueAmenity = isVenueAmenity;
/**
 * Canonical venue amenities (spec §4.8).
 *
 * Venue-wide facilities, deliberately separate from `Court.features`: every
 * court in a venue shares the same car park, so recording parking per court
 * duplicates it N times and still leaves `Venue.amenities` — the array the
 * player app actually renders — empty.
 *
 * Free text is **not** allowed: amenities are a marketplace filter, and a filter
 * over free strings matches nothing. Owners request additions; an admin extends
 * this list.
 */
exports.VENUE_AMENITIES = [
    'parking',
    'two_wheeler_parking',
    'changing_room',
    'washroom',
    'shower',
    'drinking_water',
    'seating',
    'cafeteria',
    'first_aid',
    'cctv',
    'wifi',
    'floodlights',
    'covered',
    'generator_backup',
    'equipment_rental',
    'locker',
    'wheelchair_access',
];
/** Human labels for the slugs — clients render these, never the raw slug. */
exports.VENUE_AMENITY_LABELS = {
    parking: 'Parking',
    two_wheeler_parking: 'Two-wheeler parking',
    changing_room: 'Changing room',
    washroom: 'Washroom',
    shower: 'Showers',
    drinking_water: 'Drinking water',
    seating: 'Spectator seating',
    cafeteria: 'Cafeteria',
    first_aid: 'First aid',
    cctv: 'CCTV',
    wifi: 'Wi-Fi',
    floodlights: 'Floodlights',
    covered: 'Covered / roofed',
    generator_backup: 'Generator backup',
    equipment_rental: 'Equipment rental',
    locker: 'Lockers',
    wheelchair_access: 'Wheelchair access',
};
function isVenueAmenity(value) {
    return exports.VENUE_AMENITIES.includes(value);
}
