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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenuePermissionGuard = void 0;
var common_1 = require("@nestjs/common");
var graphql_1 = require("@nestjs/graphql");
var client_1 = require("@prisma/client");
var venue_permission_decorator_1 = require("../decorators/venue-permission.decorator");
/**
<<<<<<< HEAD
 * Venue-scoped authorization.
 *
 * For a handler annotated with `@RequireVenuePermission(key)`, checks the
 * caller's grants for the target venue in `staff_permissions`. The venue id is
 * read from the GraphQL args: `venueId`, or `input.venueId`.
 *
 * There are no venue roles. Permissions are granted per user per venue, so the
 * same person can manage bookings at one venue and only read them at another.
 *
 * Two principals bypass the grant check:
 *   - platform SUPER_ADMIN, who is unrestricted everywhere;
 *   - the venue's own owner, who implicitly holds everything at their venue.
 *
 * The owner bypass is what makes the model bootstrappable: a freshly created
 * venue has an owner and no grants, and without it nobody could grant the
 * owner anything.
=======
 * Venue-scoped RBAC. For a handler annotated with `@RequireVenuePermission(p)`,
 * resolves the caller's ACTIVE membership for the target venue and checks the
 * effective permission set. The venue id is read from the GraphQL args:
 * `venueId`, or `input.venueId`.
 *
 * It also attaches what it resolved to the request as `venueAccess`, readable
 * with `@VenueAccess()`. A handler that gates a whole operation on one
 * permission often needs to gate a *field* on another — the day's revenue is
 * `finance:read` while the day's booking count is `bookings:read` — and
 * re-querying the membership per field would mean the same round trip twice.
>>>>>>> ef44c2157f1499b07793e8f1557eea31c9b504b1
 */
var VenuePermissionGuard = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VenuePermissionGuard = _classThis = /** @class */ (function () {
        function VenuePermissionGuard_1(reflector, prisma, permissions) {
            this.reflector = reflector;
            this.prisma = prisma;
            this.permissions = permissions;
        }
        VenuePermissionGuard_1.prototype.canActivate = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var required, gqlCtx, req, user, args, venueId, venue, allowed;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            required = this.reflector.getAllAndOverride(venue_permission_decorator_1.REQUIRE_VENUE_PERMISSION_KEY, [context.getHandler(), context.getClass()]);
                            if (!required)
                                return [2 /*return*/, true];
                            gqlCtx = graphql_1.GqlExecutionContext.create(context);
                            req = gqlCtx.getContext().req;
                            user = req === null || req === void 0 ? void 0 : req.user;
                            if (!user)
                                throw new common_1.ForbiddenException('Not authenticated');
                            args = gqlCtx.getArgs();
                            venueId = (_a = args.venueId) !== null && _a !== void 0 ? _a : (_b = args.input) === null || _b === void 0 ? void 0 : _b.venueId;
                            if (user.role === client_1.UserRole.SUPER_ADMIN) {
                                // Platform admins hold every permission everywhere, so field-level gates
                                // downstream must see a full set rather than an empty one.
                                attach(req, {
                                    venueId: venueId !== null && venueId !== void 0 ? venueId : '',
                                    role: VenueMemberRole.OWNER,
                                    permissions: __spreadArray([], VENUE_PERMISSIONS, true),
                                });
                                return [2 /*return*/, true];
                            }
                            if (!venueId)
                                throw new common_1.ForbiddenException('No venue specified for this action.');
                            return [4 /*yield*/, this.prisma.venue.findUnique({
                                    where: { id: venueId },
                                    select: { primaryOwnerId: true },
                                })];
                        case 1:
                            venue = _c.sent();
                            if (!venue)
                                throw new common_1.ForbiddenException('Venue not found.');
                            if (venue.primaryOwnerId === user.id)
                                return [2 /*return*/, true];
                            return [4 /*yield*/, this.permissions.venueUserHasPermission(user.id, venueId, required)];
                        case 2:
                            allowed = _c.sent();
                            if (!allowed) {
                                throw new common_1.ForbiddenException("Missing venue permission: ".concat(required));
                            }
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        return VenuePermissionGuard_1;
    }());
    __setFunctionName(_classThis, "VenuePermissionGuard");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VenuePermissionGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VenuePermissionGuard = _classThis;
}();
exports.VenuePermissionGuard = VenuePermissionGuard;
function attach(req, access) {
    if (req)
        req.venueAccess = access;
}
