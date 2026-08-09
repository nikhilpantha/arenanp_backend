"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminVenue = exports.AdminCourt = void 0;
exports.mapPrismaCourtToAdmin = mapPrismaCourtToAdmin;
exports.mapPrismaVenueToAdmin = mapPrismaVenueToAdmin;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
var sport_stub_model_1 = require("../../sports/dto/sport-stub.model");
var AdminCourt = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({ description: 'A bookable surface inside a venue (court / ground / pitch).' })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _sport_decorators;
    var _sport_initializers = [];
    var _sport_extraInitializers = [];
    var _pricePerHour_decorators;
    var _pricePerHour_initializers = [];
    var _pricePerHour_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var AdminCourt = _classThis = /** @class */ (function () {
        function AdminCourt_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.sport = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _sport_initializers, void 0));
            this.pricePerHour = (__runInitializers(this, _sport_extraInitializers), __runInitializers(this, _pricePerHour_initializers, void 0));
            this.description = (__runInitializers(this, _pricePerHour_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.isActive = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
            /** Stored S3 object keys; presigned to download URLs by AdminCourtResolver. */
            this.imageUrls = __runInitializers(this, _isActive_extraInitializers);
            this.createdAt = __runInitializers(this, _createdAt_initializers, void 0);
            __runInitializers(this, _createdAt_extraInitializers);
        }
        return AdminCourt_1;
    }());
    __setFunctionName(_classThis, "AdminCourt");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _sport_decorators = [(0, graphql_1.Field)(function () { return sport_stub_model_1.SportStub; })];
        _pricePerHour_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; })];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _isActive_decorators = [(0, graphql_1.Field)()];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _sport_decorators, { kind: "field", name: "sport", static: false, private: false, access: { has: function (obj) { return "sport" in obj; }, get: function (obj) { return obj.sport; }, set: function (obj, value) { obj.sport = value; } }, metadata: _metadata }, _sport_initializers, _sport_extraInitializers);
        __esDecorate(null, null, _pricePerHour_decorators, { kind: "field", name: "pricePerHour", static: false, private: false, access: { has: function (obj) { return "pricePerHour" in obj; }, get: function (obj) { return obj.pricePerHour; }, set: function (obj, value) { obj.pricePerHour = value; } }, metadata: _metadata }, _pricePerHour_initializers, _pricePerHour_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminCourt = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminCourt = _classThis;
}();
exports.AdminCourt = AdminCourt;
var AdminVenue = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'Admin-facing view of a Venue including owner, courts, gallery, KYC documents and review trail.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _owner_decorators;
    var _owner_initializers = [];
    var _owner_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _sports_decorators;
    var _sports_initializers = [];
    var _sports_extraInitializers = [];
    var _amenities_decorators;
    var _amenities_initializers = [];
    var _amenities_extraInitializers = [];
    var _contactEmail_decorators;
    var _contactEmail_initializers = [];
    var _contactEmail_extraInitializers = [];
    var _contactPhone_decorators;
    var _contactPhone_initializers = [];
    var _contactPhone_extraInitializers = [];
    var _verificationStatus_decorators;
    var _verificationStatus_initializers = [];
    var _verificationStatus_extraInitializers = [];
    var _rejectionReason_decorators;
    var _rejectionReason_initializers = [];
    var _rejectionReason_extraInitializers = [];
    var _isFeatured_decorators;
    var _isFeatured_initializers = [];
    var _isFeatured_extraInitializers = [];
    var _featuredAt_decorators;
    var _featuredAt_initializers = [];
    var _featuredAt_extraInitializers = [];
    var _reviewedAt_decorators;
    var _reviewedAt_initializers = [];
    var _reviewedAt_extraInitializers = [];
    var _reviewer_decorators;
    var _reviewer_initializers = [];
    var _reviewer_extraInitializers = [];
    var _courts_decorators;
    var _courts_initializers = [];
    var _courts_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var AdminVenue = _classThis = /** @class */ (function () {
        function AdminVenue_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.owner = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _owner_initializers, void 0));
            this.name = (__runInitializers(this, _owner_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.description = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _description_initializers, void 0));
            this.address = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            this.country = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _country_initializers, void 0));
            this.latitude = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
            this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
            // Stored S3 object keys; presigned to download URLs by AdminVenuesResolver.
            this.coverImageUrl = __runInitializers(this, _longitude_extraInitializers);
            this.sports = __runInitializers(this, _sports_initializers, void 0);
            this.amenities = (__runInitializers(this, _sports_extraInitializers), __runInitializers(this, _amenities_initializers, void 0));
            this.contactEmail = (__runInitializers(this, _amenities_extraInitializers), __runInitializers(this, _contactEmail_initializers, void 0));
            this.contactPhone = (__runInitializers(this, _contactEmail_extraInitializers), __runInitializers(this, _contactPhone_initializers, void 0));
            this.verificationStatus = (__runInitializers(this, _contactPhone_extraInitializers), __runInitializers(this, _verificationStatus_initializers, void 0));
            this.rejectionReason = (__runInitializers(this, _verificationStatus_extraInitializers), __runInitializers(this, _rejectionReason_initializers, void 0));
            this.isFeatured = (__runInitializers(this, _rejectionReason_extraInitializers), __runInitializers(this, _isFeatured_initializers, void 0));
            this.featuredAt = (__runInitializers(this, _isFeatured_extraInitializers), __runInitializers(this, _featuredAt_initializers, void 0));
            this.reviewedAt = (__runInitializers(this, _featuredAt_extraInitializers), __runInitializers(this, _reviewedAt_initializers, void 0));
            this.reviewer = (__runInitializers(this, _reviewedAt_extraInitializers), __runInitializers(this, _reviewer_initializers, void 0));
            this.courts = (__runInitializers(this, _reviewer_extraInitializers), __runInitializers(this, _courts_initializers, void 0));
            this.createdAt = (__runInitializers(this, _courts_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return AdminVenue_1;
    }());
    __setFunctionName(_classThis, "AdminVenue");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _owner_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _name_decorators = [(0, graphql_1.Field)()];
        _description_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _address_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _country_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _latitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        _longitude_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Float; }, { nullable: true })];
        _sports_decorators = [(0, graphql_1.Field)(function () { return [sport_stub_model_1.SportStub]; })];
        _amenities_decorators = [(0, graphql_1.Field)(function () { return [String]; })];
        _contactEmail_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _contactPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _verificationStatus_decorators = [(0, graphql_1.Field)(function () { return client_1.VenueVerificationStatus; })];
        _rejectionReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _isFeatured_decorators = [(0, graphql_1.Field)()];
        _featuredAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _reviewedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _reviewer_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _courts_decorators = [(0, graphql_1.Field)(function () { return [AdminCourt]; })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _owner_decorators, { kind: "field", name: "owner", static: false, private: false, access: { has: function (obj) { return "owner" in obj; }, get: function (obj) { return obj.owner; }, set: function (obj, value) { obj.owner = value; } }, metadata: _metadata }, _owner_initializers, _owner_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
        __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
        __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
        __esDecorate(null, null, _sports_decorators, { kind: "field", name: "sports", static: false, private: false, access: { has: function (obj) { return "sports" in obj; }, get: function (obj) { return obj.sports; }, set: function (obj, value) { obj.sports = value; } }, metadata: _metadata }, _sports_initializers, _sports_extraInitializers);
        __esDecorate(null, null, _amenities_decorators, { kind: "field", name: "amenities", static: false, private: false, access: { has: function (obj) { return "amenities" in obj; }, get: function (obj) { return obj.amenities; }, set: function (obj, value) { obj.amenities = value; } }, metadata: _metadata }, _amenities_initializers, _amenities_extraInitializers);
        __esDecorate(null, null, _contactEmail_decorators, { kind: "field", name: "contactEmail", static: false, private: false, access: { has: function (obj) { return "contactEmail" in obj; }, get: function (obj) { return obj.contactEmail; }, set: function (obj, value) { obj.contactEmail = value; } }, metadata: _metadata }, _contactEmail_initializers, _contactEmail_extraInitializers);
        __esDecorate(null, null, _contactPhone_decorators, { kind: "field", name: "contactPhone", static: false, private: false, access: { has: function (obj) { return "contactPhone" in obj; }, get: function (obj) { return obj.contactPhone; }, set: function (obj, value) { obj.contactPhone = value; } }, metadata: _metadata }, _contactPhone_initializers, _contactPhone_extraInitializers);
        __esDecorate(null, null, _verificationStatus_decorators, { kind: "field", name: "verificationStatus", static: false, private: false, access: { has: function (obj) { return "verificationStatus" in obj; }, get: function (obj) { return obj.verificationStatus; }, set: function (obj, value) { obj.verificationStatus = value; } }, metadata: _metadata }, _verificationStatus_initializers, _verificationStatus_extraInitializers);
        __esDecorate(null, null, _rejectionReason_decorators, { kind: "field", name: "rejectionReason", static: false, private: false, access: { has: function (obj) { return "rejectionReason" in obj; }, get: function (obj) { return obj.rejectionReason; }, set: function (obj, value) { obj.rejectionReason = value; } }, metadata: _metadata }, _rejectionReason_initializers, _rejectionReason_extraInitializers);
        __esDecorate(null, null, _isFeatured_decorators, { kind: "field", name: "isFeatured", static: false, private: false, access: { has: function (obj) { return "isFeatured" in obj; }, get: function (obj) { return obj.isFeatured; }, set: function (obj, value) { obj.isFeatured = value; } }, metadata: _metadata }, _isFeatured_initializers, _isFeatured_extraInitializers);
        __esDecorate(null, null, _featuredAt_decorators, { kind: "field", name: "featuredAt", static: false, private: false, access: { has: function (obj) { return "featuredAt" in obj; }, get: function (obj) { return obj.featuredAt; }, set: function (obj, value) { obj.featuredAt = value; } }, metadata: _metadata }, _featuredAt_initializers, _featuredAt_extraInitializers);
        __esDecorate(null, null, _reviewedAt_decorators, { kind: "field", name: "reviewedAt", static: false, private: false, access: { has: function (obj) { return "reviewedAt" in obj; }, get: function (obj) { return obj.reviewedAt; }, set: function (obj, value) { obj.reviewedAt = value; } }, metadata: _metadata }, _reviewedAt_initializers, _reviewedAt_extraInitializers);
        __esDecorate(null, null, _reviewer_decorators, { kind: "field", name: "reviewer", static: false, private: false, access: { has: function (obj) { return "reviewer" in obj; }, get: function (obj) { return obj.reviewer; }, set: function (obj, value) { obj.reviewer = value; } }, metadata: _metadata }, _reviewer_initializers, _reviewer_extraInitializers);
        __esDecorate(null, null, _courts_decorators, { kind: "field", name: "courts", static: false, private: false, access: { has: function (obj) { return "courts" in obj; }, get: function (obj) { return obj.courts; }, set: function (obj, value) { obj.courts = value; } }, metadata: _metadata }, _courts_initializers, _courts_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminVenue = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminVenue = _classThis;
}();
exports.AdminVenue = AdminVenue;
function decimalToNumber(value) {
    if (value === null || value === undefined)
        return undefined;
    return typeof value === 'number' ? value : Number(value.toString());
}
function mapPrismaCourtToAdmin(court) {
    var _a;
    return {
        id: court.id,
        name: court.name,
        sport: (0, sport_stub_model_1.mapSportStub)(court.sport),
        pricePerHour: Number(court.pricePerHour.toString()),
        description: (_a = court.description) !== null && _a !== void 0 ? _a : undefined,
        isActive: court.isActive,
        imageUrls: court.imageUrls,
        createdAt: court.createdAt,
    };
}
function mapPrismaVenueToAdmin(venue) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return {
        id: venue.id,
        owner: (0, admin_user_model_1.mapPrismaUserToAdmin)(venue.primaryOwner),
        name: venue.name,
        description: (_a = venue.description) !== null && _a !== void 0 ? _a : undefined,
        address: (_b = venue.address) !== null && _b !== void 0 ? _b : undefined,
        city: (_c = venue.city) !== null && _c !== void 0 ? _c : undefined,
        country: (_d = venue.country) !== null && _d !== void 0 ? _d : undefined,
        latitude: decimalToNumber(venue.latitude),
        longitude: decimalToNumber(venue.longitude),
        coverImageUrl: (_e = venue.coverImageUrl) !== null && _e !== void 0 ? _e : undefined,
        imageUrls: venue.imageUrls,
        documentUrls: venue.documentUrls,
        sports: venue.venueSports.map(function (vs) { return (0, sport_stub_model_1.mapSportStub)(vs.sport); }),
        amenities: venue.amenities,
        contactEmail: (_f = venue.contactEmail) !== null && _f !== void 0 ? _f : undefined,
        contactPhone: (_g = venue.contactPhone) !== null && _g !== void 0 ? _g : undefined,
        verificationStatus: venue.verificationStatus,
        rejectionReason: (_h = venue.rejectionReason) !== null && _h !== void 0 ? _h : undefined,
        isFeatured: venue.isFeatured,
        featuredAt: (_j = venue.featuredAt) !== null && _j !== void 0 ? _j : undefined,
        reviewedAt: (_k = venue.reviewedAt) !== null && _k !== void 0 ? _k : undefined,
        reviewer: venue.reviewer ? (0, admin_user_model_1.mapPrismaUserToAdmin)(venue.reviewer) : undefined,
        courts: venue.courts.map(mapPrismaCourtToAdmin),
        createdAt: venue.createdAt,
        updatedAt: venue.updatedAt,
    };
}
