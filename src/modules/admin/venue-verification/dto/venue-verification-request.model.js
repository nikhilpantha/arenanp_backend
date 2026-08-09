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
exports.VenueVerificationRequestModel = void 0;
exports.mapVenueRequestToGraphql = mapVenueRequestToGraphql;
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
require("../../../../common/enums");
var admin_user_model_1 = require("../../users/dto/admin-user.model");
/**
 * Admin-facing GraphQL view of a single venue-verification submission.
 * Carries the submitted KYC + business info, reviewer audit trail and status.
 */
var VenueVerificationRequestModel = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _businessName_decorators;
    var _businessName_initializers = [];
    var _businessName_extraInitializers = [];
    var _businessType_decorators;
    var _businessType_initializers = [];
    var _businessType_extraInitializers = [];
    var _panNumber_decorators;
    var _panNumber_initializers = [];
    var _panNumber_extraInitializers = [];
    var _vatNumber_decorators;
    var _vatNumber_initializers = [];
    var _vatNumber_extraInitializers = [];
    var _registrationNumber_decorators;
    var _registrationNumber_initializers = [];
    var _registrationNumber_extraInitializers = [];
    var _contactEmail_decorators;
    var _contactEmail_initializers = [];
    var _contactEmail_extraInitializers = [];
    var _contactPhone_decorators;
    var _contactPhone_initializers = [];
    var _contactPhone_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _city_decorators;
    var _city_initializers = [];
    var _city_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _rejectionReason_decorators;
    var _rejectionReason_initializers = [];
    var _rejectionReason_extraInitializers = [];
    var _reviewedAt_decorators;
    var _reviewedAt_initializers = [];
    var _reviewedAt_extraInitializers = [];
    var _reviewer_decorators;
    var _reviewer_initializers = [];
    var _reviewer_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var VenueVerificationRequestModel = _classThis = /** @class */ (function () {
        function VenueVerificationRequestModel_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.user = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            this.businessName = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _businessName_initializers, void 0));
            this.businessType = (__runInitializers(this, _businessName_extraInitializers), __runInitializers(this, _businessType_initializers, void 0));
            this.panNumber = (__runInitializers(this, _businessType_extraInitializers), __runInitializers(this, _panNumber_initializers, void 0));
            this.vatNumber = (__runInitializers(this, _panNumber_extraInitializers), __runInitializers(this, _vatNumber_initializers, void 0));
            this.registrationNumber = (__runInitializers(this, _vatNumber_extraInitializers), __runInitializers(this, _registrationNumber_initializers, void 0));
            this.contactEmail = (__runInitializers(this, _registrationNumber_extraInitializers), __runInitializers(this, _contactEmail_initializers, void 0));
            this.contactPhone = (__runInitializers(this, _contactEmail_extraInitializers), __runInitializers(this, _contactPhone_initializers, void 0));
            this.address = (__runInitializers(this, _contactPhone_extraInitializers), __runInitializers(this, _address_initializers, void 0));
            this.city = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _city_initializers, void 0));
            /** Stored S3 object keys; presigned to download URLs by VenueVerificationResolver. */
            this.documentUrls = __runInitializers(this, _city_extraInitializers);
            this.status = __runInitializers(this, _status_initializers, void 0);
            this.rejectionReason = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _rejectionReason_initializers, void 0));
            this.reviewedAt = (__runInitializers(this, _rejectionReason_extraInitializers), __runInitializers(this, _reviewedAt_initializers, void 0));
            this.reviewer = (__runInitializers(this, _reviewedAt_extraInitializers), __runInitializers(this, _reviewer_initializers, void 0));
            this.createdAt = (__runInitializers(this, _reviewer_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return VenueVerificationRequestModel_1;
    }());
    __setFunctionName(_classThis, "VenueVerificationRequestModel");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, graphql_1.Field)(function () { return graphql_1.ID; })];
        _user_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; })];
        _businessName_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _businessType_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _panNumber_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _vatNumber_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _registrationNumber_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _contactEmail_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _contactPhone_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _address_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _city_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _status_decorators = [(0, graphql_1.Field)(function () { return client_1.CapabilityStatus; })];
        _rejectionReason_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _reviewedAt_decorators = [(0, graphql_1.Field)({ nullable: true })];
        _reviewer_decorators = [(0, graphql_1.Field)(function () { return admin_user_model_1.AdminUser; }, { nullable: true })];
        _createdAt_decorators = [(0, graphql_1.Field)()];
        _updatedAt_decorators = [(0, graphql_1.Field)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, null, _businessName_decorators, { kind: "field", name: "businessName", static: false, private: false, access: { has: function (obj) { return "businessName" in obj; }, get: function (obj) { return obj.businessName; }, set: function (obj, value) { obj.businessName = value; } }, metadata: _metadata }, _businessName_initializers, _businessName_extraInitializers);
        __esDecorate(null, null, _businessType_decorators, { kind: "field", name: "businessType", static: false, private: false, access: { has: function (obj) { return "businessType" in obj; }, get: function (obj) { return obj.businessType; }, set: function (obj, value) { obj.businessType = value; } }, metadata: _metadata }, _businessType_initializers, _businessType_extraInitializers);
        __esDecorate(null, null, _panNumber_decorators, { kind: "field", name: "panNumber", static: false, private: false, access: { has: function (obj) { return "panNumber" in obj; }, get: function (obj) { return obj.panNumber; }, set: function (obj, value) { obj.panNumber = value; } }, metadata: _metadata }, _panNumber_initializers, _panNumber_extraInitializers);
        __esDecorate(null, null, _vatNumber_decorators, { kind: "field", name: "vatNumber", static: false, private: false, access: { has: function (obj) { return "vatNumber" in obj; }, get: function (obj) { return obj.vatNumber; }, set: function (obj, value) { obj.vatNumber = value; } }, metadata: _metadata }, _vatNumber_initializers, _vatNumber_extraInitializers);
        __esDecorate(null, null, _registrationNumber_decorators, { kind: "field", name: "registrationNumber", static: false, private: false, access: { has: function (obj) { return "registrationNumber" in obj; }, get: function (obj) { return obj.registrationNumber; }, set: function (obj, value) { obj.registrationNumber = value; } }, metadata: _metadata }, _registrationNumber_initializers, _registrationNumber_extraInitializers);
        __esDecorate(null, null, _contactEmail_decorators, { kind: "field", name: "contactEmail", static: false, private: false, access: { has: function (obj) { return "contactEmail" in obj; }, get: function (obj) { return obj.contactEmail; }, set: function (obj, value) { obj.contactEmail = value; } }, metadata: _metadata }, _contactEmail_initializers, _contactEmail_extraInitializers);
        __esDecorate(null, null, _contactPhone_decorators, { kind: "field", name: "contactPhone", static: false, private: false, access: { has: function (obj) { return "contactPhone" in obj; }, get: function (obj) { return obj.contactPhone; }, set: function (obj, value) { obj.contactPhone = value; } }, metadata: _metadata }, _contactPhone_initializers, _contactPhone_extraInitializers);
        __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
        __esDecorate(null, null, _city_decorators, { kind: "field", name: "city", static: false, private: false, access: { has: function (obj) { return "city" in obj; }, get: function (obj) { return obj.city; }, set: function (obj, value) { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, null, _rejectionReason_decorators, { kind: "field", name: "rejectionReason", static: false, private: false, access: { has: function (obj) { return "rejectionReason" in obj; }, get: function (obj) { return obj.rejectionReason; }, set: function (obj, value) { obj.rejectionReason = value; } }, metadata: _metadata }, _rejectionReason_initializers, _rejectionReason_extraInitializers);
        __esDecorate(null, null, _reviewedAt_decorators, { kind: "field", name: "reviewedAt", static: false, private: false, access: { has: function (obj) { return "reviewedAt" in obj; }, get: function (obj) { return obj.reviewedAt; }, set: function (obj, value) { obj.reviewedAt = value; } }, metadata: _metadata }, _reviewedAt_initializers, _reviewedAt_extraInitializers);
        __esDecorate(null, null, _reviewer_decorators, { kind: "field", name: "reviewer", static: false, private: false, access: { has: function (obj) { return "reviewer" in obj; }, get: function (obj) { return obj.reviewer; }, set: function (obj, value) { obj.reviewer = value; } }, metadata: _metadata }, _reviewer_initializers, _reviewer_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenueVerificationRequestModel = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenueVerificationRequestModel = _classThis;
}();
exports.VenueVerificationRequestModel = VenueVerificationRequestModel;
function mapVenueRequestToGraphql(req) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return {
        id: req.id,
        user: (0, admin_user_model_1.mapPrismaUserToAdmin)(req.user),
        businessName: (_a = req.businessName) !== null && _a !== void 0 ? _a : undefined,
        businessType: (_b = req.businessType) !== null && _b !== void 0 ? _b : undefined,
        panNumber: (_c = req.panNumber) !== null && _c !== void 0 ? _c : undefined,
        vatNumber: (_d = req.vatNumber) !== null && _d !== void 0 ? _d : undefined,
        registrationNumber: (_e = req.registrationNumber) !== null && _e !== void 0 ? _e : undefined,
        contactEmail: (_f = req.contactEmail) !== null && _f !== void 0 ? _f : undefined,
        contactPhone: (_g = req.contactPhone) !== null && _g !== void 0 ? _g : undefined,
        address: (_h = req.address) !== null && _h !== void 0 ? _h : undefined,
        city: (_j = req.city) !== null && _j !== void 0 ? _j : undefined,
        documentUrls: req.documentUrls,
        status: req.status,
        rejectionReason: (_k = req.rejectionReason) !== null && _k !== void 0 ? _k : undefined,
        reviewedAt: (_l = req.reviewedAt) !== null && _l !== void 0 ? _l : undefined,
        reviewer: req.reviewer ? (0, admin_user_model_1.mapPrismaUserToAdmin)(req.reviewer) : undefined,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
    };
}
