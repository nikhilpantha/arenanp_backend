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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSportsService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var admin_sport_model_1 = require("./dto/admin-sport.model");
var sport_rules_1 = require("./sport-rules");
var AdminSportsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminSportsService = _classThis = /** @class */ (function () {
        function AdminSportsService_1(repo, storage) {
            this.repo = repo;
            this.storage = storage;
        }
        AdminSportsService_1.prototype.list = function (activeOnly) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.list({ activeOnly: activeOnly })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(admin_sport_model_1.mapSportToAdmin)];
                    }
                });
            });
        };
        AdminSportsService_1.prototype.getOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(id)];
                        case 1:
                            row = _a.sent();
                            if (!row)
                                throw new common_1.NotFoundException('Sport not found.');
                            return [2 /*return*/, (0, admin_sport_model_1.mapSportToAdmin)(row)];
                    }
                });
            });
        };
        AdminSportsService_1.prototype.create = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                var slug, clash, name, surfaces, formats, courtFeatures, slotDurations, isActive, row;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
                return __generator(this, function (_w) {
                    switch (_w.label) {
                        case 0:
                            slug = ((_a = input.slug) === null || _a === void 0 ? void 0 : _a.trim()) || this.slugify(input.name);
                            if (!slug)
                                throw new common_1.BadRequestException('Could not derive a slug from the name.');
                            return [4 /*yield*/, this.repo.findBySlug(slug)];
                        case 1:
                            clash = _w.sent();
                            if (clash) {
                                throw new common_1.ConflictException("A sport with slug \"".concat(slug, "\" already exists."));
                            }
                            name = input.name.trim();
                            surfaces = (0, sport_rules_1.normaliseTags)(input.surfaces);
                            formats = (0, sport_rules_1.normaliseTags)(input.formats);
                            courtFeatures = (0, sport_rules_1.normaliseTags)(input.courtFeatures);
                            slotDurations = (0, sport_rules_1.normaliseSlotDurations)(input.slotDurations);
                            isActive = (_b = input.isActive) !== null && _b !== void 0 ? _b : true;
                            (0, sport_rules_1.assertSportConfig)({
                                name: name,
                                isActive: isActive,
                                slotDurations: slotDurations,
                                defaultSlotMinutes: (_c = input.defaultSlotMinutes) !== null && _c !== void 0 ? _c : 60,
                                minDurationMinutes: (_d = input.minDurationMinutes) !== null && _d !== void 0 ? _d : null,
                                maxDurationMinutes: (_e = input.maxDurationMinutes) !== null && _e !== void 0 ? _e : null,
                                bookingMode: (_f = input.bookingMode) !== null && _f !== void 0 ? _f : client_1.SportBookingMode.EXCLUSIVE,
                                defaultCapacity: (_g = input.defaultCapacity) !== null && _g !== void 0 ? _g : null,
                                unitLabel: (_h = input.unitLabel) !== null && _h !== void 0 ? _h : 'court',
                                unitLabelPlural: (_j = input.unitLabelPlural) !== null && _j !== void 0 ? _j : 'courts',
                            });
                            return [4 /*yield*/, this.repo.create({
                                    slug: slug,
                                    name: name,
                                    iconUrl: ((_k = input.iconUrl) === null || _k === void 0 ? void 0 : _k.trim()) || null,
                                    description: ((_l = input.description) === null || _l === void 0 ? void 0 : _l.trim()) || null,
                                    pricingUnit: (_m = input.pricingUnit) !== null && _m !== void 0 ? _m : client_1.SportPricingUnit.PER_HOUR,
                                    unitLabel: ((_o = input.unitLabel) !== null && _o !== void 0 ? _o : 'court').trim(),
                                    unitLabelPlural: ((_p = input.unitLabelPlural) !== null && _p !== void 0 ? _p : 'courts').trim(),
                                    slotDurations: slotDurations,
                                    defaultSlotMinutes: (_q = input.defaultSlotMinutes) !== null && _q !== void 0 ? _q : 60,
                                    minDurationMinutes: (_r = input.minDurationMinutes) !== null && _r !== void 0 ? _r : null,
                                    maxDurationMinutes: (_s = input.maxDurationMinutes) !== null && _s !== void 0 ? _s : null,
                                    bookingMode: (_t = input.bookingMode) !== null && _t !== void 0 ? _t : client_1.SportBookingMode.EXCLUSIVE,
                                    defaultCapacity: (_u = input.defaultCapacity) !== null && _u !== void 0 ? _u : null,
                                    surfaces: surfaces,
                                    formats: formats,
                                    courtFeatures: courtFeatures,
                                    // Derived, never authored — see sport-rules.deriveFeatures.
                                    features: (0, sport_rules_1.deriveFeatures)({ surfaces: surfaces, formats: formats, courtFeatures: courtFeatures }),
                                    displayOrder: (_v = input.displayOrder) !== null && _v !== void 0 ? _v : 0,
                                    isActive: isActive,
                                    createdById: actor.id,
                                })];
                        case 2:
                            row = _w.sent();
                            return [2 /*return*/, (0, admin_sport_model_1.mapSportToAdmin)(row)];
                    }
                });
            });
        };
        AdminSportsService_1.prototype.update = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, clash, nextIcon, surfaces, formats, courtFeatures, slotDurations, catalogueChanged, updated;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
                return __generator(this, function (_x) {
                    switch (_x.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(input.id)];
                        case 1:
                            existing = _x.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Sport not found.');
                            if (!(input.slug && input.slug !== existing.slug)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.repo.findBySlug(input.slug)];
                        case 2:
                            clash = _x.sent();
                            if (clash && clash.id !== existing.id) {
                                throw new common_1.ConflictException("A sport with slug \"".concat(input.slug, "\" already exists."));
                            }
                            _x.label = 3;
                        case 3:
                            nextIcon = input.iconUrl === undefined ? undefined : ((_a = input.iconUrl) === null || _a === void 0 ? void 0 : _a.trim()) || null;
                            surfaces = input.surfaces === undefined ? existing.surfaces : (0, sport_rules_1.normaliseTags)(input.surfaces);
                            formats = input.formats === undefined ? existing.formats : (0, sport_rules_1.normaliseTags)(input.formats);
                            courtFeatures = input.courtFeatures === undefined
                                ? existing.courtFeatures
                                : (0, sport_rules_1.normaliseTags)(input.courtFeatures);
                            slotDurations = input.slotDurations === undefined
                                ? existing.slotDurations
                                : (0, sport_rules_1.normaliseSlotDurations)(input.slotDurations);
                            catalogueChanged = input.surfaces !== undefined ||
                                input.formats !== undefined ||
                                input.courtFeatures !== undefined;
                            (0, sport_rules_1.assertSportConfig)({
                                name: (_c = (_b = input.name) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : existing.name,
                                isActive: (_d = input.isActive) !== null && _d !== void 0 ? _d : existing.isActive,
                                slotDurations: slotDurations,
                                defaultSlotMinutes: (_e = input.defaultSlotMinutes) !== null && _e !== void 0 ? _e : existing.defaultSlotMinutes,
                                minDurationMinutes: (0, sport_rules_1.patch)(input.minDurationMinutes, existing.minDurationMinutes),
                                maxDurationMinutes: (0, sport_rules_1.patch)(input.maxDurationMinutes, existing.maxDurationMinutes),
                                bookingMode: (_f = input.bookingMode) !== null && _f !== void 0 ? _f : existing.bookingMode,
                                defaultCapacity: (0, sport_rules_1.patch)(input.defaultCapacity, existing.defaultCapacity),
                                unitLabel: (_g = input.unitLabel) !== null && _g !== void 0 ? _g : existing.unitLabel,
                                unitLabelPlural: (_h = input.unitLabelPlural) !== null && _h !== void 0 ? _h : existing.unitLabelPlural,
                            });
                            return [4 /*yield*/, this.repo.update({
                                    id: input.id,
                                    data: {
                                        slug: (_j = input.slug) !== null && _j !== void 0 ? _j : undefined,
                                        name: (_l = (_k = input.name) === null || _k === void 0 ? void 0 : _k.trim()) !== null && _l !== void 0 ? _l : undefined,
                                        iconUrl: nextIcon,
                                        description: input.description === undefined ? undefined : ((_m = input.description) === null || _m === void 0 ? void 0 : _m.trim()) || null,
                                        pricingUnit: (_o = input.pricingUnit) !== null && _o !== void 0 ? _o : undefined,
                                        unitLabel: (_q = (_p = input.unitLabel) === null || _p === void 0 ? void 0 : _p.trim()) !== null && _q !== void 0 ? _q : undefined,
                                        unitLabelPlural: (_s = (_r = input.unitLabelPlural) === null || _r === void 0 ? void 0 : _r.trim()) !== null && _s !== void 0 ? _s : undefined,
                                        slotDurations: input.slotDurations === undefined ? undefined : slotDurations,
                                        defaultSlotMinutes: (_t = input.defaultSlotMinutes) !== null && _t !== void 0 ? _t : undefined,
                                        // Pass nullable numerics straight through: `undefined` means "leave it",
                                        // an explicit `null` clears it. Collapsing the two would make these
                                        // fields permanent once set.
                                        minDurationMinutes: input.minDurationMinutes,
                                        maxDurationMinutes: input.maxDurationMinutes,
                                        bookingMode: (_u = input.bookingMode) !== null && _u !== void 0 ? _u : undefined,
                                        defaultCapacity: input.defaultCapacity,
                                        surfaces: input.surfaces === undefined ? undefined : surfaces,
                                        formats: input.formats === undefined ? undefined : formats,
                                        courtFeatures: input.courtFeatures === undefined ? undefined : courtFeatures,
                                        // Keep the deprecated flat list in step with its three sources.
                                        features: catalogueChanged
                                            ? (0, sport_rules_1.deriveFeatures)({ surfaces: surfaces, formats: formats, courtFeatures: courtFeatures })
                                            : undefined,
                                        displayOrder: (_v = input.displayOrder) !== null && _v !== void 0 ? _v : undefined,
                                        isActive: (_w = input.isActive) !== null && _w !== void 0 ? _w : undefined,
                                    },
                                })];
                        case 4:
                            updated = _x.sent();
                            if (!(nextIcon !== undefined && existing.iconUrl && existing.iconUrl !== nextIcon)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.storage.deleteMany([existing.iconUrl])];
                        case 5:
                            _x.sent();
                            _x.label = 6;
                        case 6: return [2 /*return*/, (0, admin_sport_model_1.mapSportToAdmin)(updated)];
                    }
                });
            });
        };
        /**
         * Delete is only allowed when nothing references the sport. Most of the time
         * admins should toggle `isActive` instead — `delete` is the nuclear option.
         */
        AdminSportsService_1.prototype.delete = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, refs, total;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(id)];
                        case 1:
                            existing = _a.sent();
                            if (!existing)
                                throw new common_1.NotFoundException('Sport not found.');
                            return [4 /*yield*/, this.repo.countReferences(id)];
                        case 2:
                            refs = _a.sent();
                            total = refs.courts + refs.tournaments + refs.venues;
                            if (total > 0) {
                                throw new common_1.BadRequestException("Cannot delete \"".concat(existing.name, "\" \u2014 it's still used by ").concat(refs.courts, " court(s), ").concat(refs.tournaments, " tournament(s), and ").concat(refs.venues, " venue offering(s). Deactivate it instead."));
                            }
                            return [4 /*yield*/, this.repo.delete(id)];
                        case 3:
                            _a.sent();
                            return [4 /*yield*/, this.storage.deleteMany([existing.iconUrl])];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        AdminSportsService_1.prototype.slugify = function (input) {
            return input
                .toLowerCase()
                .trim()
                .replace(/['"]/g, '')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
        };
        return AdminSportsService_1;
    }());
    __setFunctionName(_classThis, "AdminSportsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminSportsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminSportsService = _classThis;
}();
exports.AdminSportsService = AdminSportsService;
