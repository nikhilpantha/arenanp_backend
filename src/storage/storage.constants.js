"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIME_EXTENSION = exports.CATEGORY_RULES = exports.UploadCategory = void 0;
var graphql_1 = require("@nestjs/graphql");
/**
 * Every kind of object a client may upload. The enum value is also the GraphQL
 * name. Each category maps to a {@link CategoryRule} that fixes its key prefix,
 * who may upload it, the accepted MIME types and a size cap — so the S3 bucket
 * stays browsable by model (avatars/, venues/, …) and admin assets are isolated
 * under admin/.
 */
var UploadCategory;
(function (UploadCategory) {
    /** Account avatar — User.avatarUrl. */
    UploadCategory["AVATAR"] = "AVATAR";
    /** Venue hero image — Venue.coverImageUrl. */
    UploadCategory["VENUE_COVER"] = "VENUE_COVER";
    /** Venue gallery photo — Venue.imageUrls[]. */
    UploadCategory["VENUE_IMAGE"] = "VENUE_IMAGE";
    /** Venue KYC / PAN document — Venue.documentUrls[] / VenueVerificationRequest.documentUrls[]. Private. */
    UploadCategory["VENUE_DOCUMENT"] = "VENUE_DOCUMENT";
    /** Court photo — Court.imageUrls[]. */
    UploadCategory["COURT_IMAGE"] = "COURT_IMAGE";
    /** Tournament hero image — Tournament.coverImageUrl. */
    UploadCategory["TOURNAMENT_COVER"] = "TOURNAMENT_COVER";
    /** Tournament gallery photo — Tournament.imageUrls[]. */
    UploadCategory["TOURNAMENT_IMAGE"] = "TOURNAMENT_IMAGE";
    /** Organizer KYC document — OrganizerVerificationRequest.documentUrls[]. Private. */
    UploadCategory["ORGANIZER_DOCUMENT"] = "ORGANIZER_DOCUMENT";
    /** Admin-managed sport icon — Sport.iconUrl. Admin-only. */
    UploadCategory["SPORT_ICON"] = "SPORT_ICON";
})(UploadCategory || (exports.UploadCategory = UploadCategory = {}));
(0, graphql_1.registerEnumType)(UploadCategory, {
    name: 'UploadCategory',
    description: 'The kind of object being uploaded; fixes the S3 key prefix and accepted file types.',
});
var IMAGE_MIME = ['image/jpeg', 'image/png', 'image/webp'];
var DOC_MIME = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
var MB = 1024 * 1024;
/**
 * Registry of every category's storage rule. The prefix is the first path
 * segment(s) of the object key; the uploader's id is appended next, then a
 * random uuid + extension — e.g. `venues/gallery/{userId}/{uuid}.jpg`.
 */
exports.CATEGORY_RULES = (_a = {},
    _a[UploadCategory.AVATAR] = {
        prefix: 'avatars',
        scope: 'user',
        allowedMime: IMAGE_MIME,
        maxBytes: 5 * MB,
    },
    _a[UploadCategory.VENUE_COVER] = {
        prefix: 'venues/covers',
        scope: 'user',
        allowedMime: IMAGE_MIME,
        maxBytes: 10 * MB,
    },
    _a[UploadCategory.VENUE_IMAGE] = {
        prefix: 'venues/gallery',
        scope: 'user',
        allowedMime: IMAGE_MIME,
        maxBytes: 10 * MB,
    },
    _a[UploadCategory.VENUE_DOCUMENT] = {
        prefix: 'venues/documents',
        scope: 'user',
        allowedMime: DOC_MIME,
        maxBytes: 15 * MB,
        private: true,
    },
    _a[UploadCategory.COURT_IMAGE] = {
        prefix: 'courts',
        scope: 'user',
        allowedMime: IMAGE_MIME,
        maxBytes: 10 * MB,
    },
    _a[UploadCategory.TOURNAMENT_COVER] = {
        prefix: 'tournaments/covers',
        scope: 'user',
        allowedMime: IMAGE_MIME,
        maxBytes: 10 * MB,
    },
    _a[UploadCategory.TOURNAMENT_IMAGE] = {
        prefix: 'tournaments/gallery',
        scope: 'user',
        allowedMime: IMAGE_MIME,
        maxBytes: 10 * MB,
    },
    _a[UploadCategory.ORGANIZER_DOCUMENT] = {
        prefix: 'organizers/documents',
        scope: 'user',
        allowedMime: DOC_MIME,
        maxBytes: 15 * MB,
        private: true,
    },
    _a[UploadCategory.SPORT_ICON] = {
        prefix: 'admin/sports',
        scope: 'admin',
        allowedMime: IMAGE_MIME,
        maxBytes: 2 * MB,
    },
    _a);
/** MIME → file extension for building object keys. */
exports.MIME_EXTENSION = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'application/pdf': 'pdf',
};
