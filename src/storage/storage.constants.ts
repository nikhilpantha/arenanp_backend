import { registerEnumType } from '@nestjs/graphql';

/**
 * Every kind of object a client may upload. The enum value is also the GraphQL
 * name. Each category maps to a {@link CategoryRule} that fixes its key prefix,
 * who may upload it, the accepted MIME types and a size cap — so the S3 bucket
 * stays browsable by model (avatars/, venues/, …) and admin assets are isolated
 * under admin/.
 */
export enum UploadCategory {
  /** Account avatar — User.avatarUrl. */
  AVATAR = 'AVATAR',
  /** Venue hero image — Venue.coverImageUrl. */
  VENUE_COVER = 'VENUE_COVER',
  /** Venue gallery photo — Venue.imageUrls[]. */
  VENUE_IMAGE = 'VENUE_IMAGE',
  /** Venue KYC / PAN document — Venue.documentUrls[] / VenueVerificationRequest.documentUrls[]. Private. */
  VENUE_DOCUMENT = 'VENUE_DOCUMENT',
  /** Court photo — Court.imageUrls[]. */
  COURT_IMAGE = 'COURT_IMAGE',
  /** Tournament hero image — Tournament.coverImageUrl. */
  TOURNAMENT_COVER = 'TOURNAMENT_COVER',
  /** Tournament gallery photo — Tournament.imageUrls[]. */
  TOURNAMENT_IMAGE = 'TOURNAMENT_IMAGE',
  /** Organizer KYC document — OrganizerVerificationRequest.documentUrls[]. Private. */
  ORGANIZER_DOCUMENT = 'ORGANIZER_DOCUMENT',
  /** Admin-managed sport icon — Sport.iconUrl. Admin-only. */
  SPORT_ICON = 'SPORT_ICON',
}

registerEnumType(UploadCategory, {
  name: 'UploadCategory',
  description:
    'The kind of object being uploaded; fixes the S3 key prefix and accepted file types.',
});

/** Who is allowed to request an upload URL for a category. */
export type UploadScope = 'user' | 'admin';

export interface CategoryRule {
  /** Top-level key prefix (no leading/trailing slash), e.g. `venues/gallery`. */
  prefix: string;
  /** `admin` categories are only reachable from the admin resolver. */
  scope: UploadScope;
  /** Accepted MIME types for this category. */
  allowedMime: readonly string[];
  /** Max object size in bytes (advisory — surfaced to the client). */
  maxBytes: number;
}

const IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp'] as const;
const DOC_MIME = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const;

const MB = 1024 * 1024;

/**
 * Registry of every category's storage rule. The prefix is the first path
 * segment(s) of the object key; the uploader's id is appended next, then a
 * random uuid + extension — e.g. `venues/gallery/{userId}/{uuid}.jpg`.
 */
export const CATEGORY_RULES: Record<UploadCategory, CategoryRule> = {
  [UploadCategory.AVATAR]: {
    prefix: 'avatars',
    scope: 'user',
    allowedMime: IMAGE_MIME,
    maxBytes: 5 * MB,
  },
  [UploadCategory.VENUE_COVER]: {
    prefix: 'venues/covers',
    scope: 'user',
    allowedMime: IMAGE_MIME,
    maxBytes: 10 * MB,
  },
  [UploadCategory.VENUE_IMAGE]: {
    prefix: 'venues/gallery',
    scope: 'user',
    allowedMime: IMAGE_MIME,
    maxBytes: 10 * MB,
  },
  [UploadCategory.VENUE_DOCUMENT]: {
    prefix: 'venues/documents',
    scope: 'user',
    allowedMime: DOC_MIME,
    maxBytes: 15 * MB,
  },
  [UploadCategory.COURT_IMAGE]: {
    prefix: 'courts',
    scope: 'user',
    allowedMime: IMAGE_MIME,
    maxBytes: 10 * MB,
  },
  [UploadCategory.TOURNAMENT_COVER]: {
    prefix: 'tournaments/covers',
    scope: 'user',
    allowedMime: IMAGE_MIME,
    maxBytes: 10 * MB,
  },
  [UploadCategory.TOURNAMENT_IMAGE]: {
    prefix: 'tournaments/gallery',
    scope: 'user',
    allowedMime: IMAGE_MIME,
    maxBytes: 10 * MB,
  },
  [UploadCategory.ORGANIZER_DOCUMENT]: {
    prefix: 'organizers/documents',
    scope: 'user',
    allowedMime: DOC_MIME,
    maxBytes: 15 * MB,
  },
  [UploadCategory.SPORT_ICON]: {
    prefix: 'admin/sports',
    scope: 'admin',
    allowedMime: IMAGE_MIME,
    maxBytes: 2 * MB,
  },
};

/** MIME → file extension for building object keys. */
export const MIME_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
};
