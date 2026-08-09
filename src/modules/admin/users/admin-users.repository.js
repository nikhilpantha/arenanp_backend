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
exports.AdminUsersRepository = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var admin_user_model_1 = require("./dto/admin-user.model");
var USER_INCLUDES = { capabilities: true };
var AdminUsersRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminUsersRepository = _classThis = /** @class */ (function () {
        function AdminUsersRepository_1(prisma) {
            this.prisma = prisma;
        }
        AdminUsersRepository_1.prototype.findById = function (id) {
            return this.prisma.user.findUnique({ where: { id: id }, include: USER_INCLUDES });
        };
        /**
         * List users with case-insensitive search and the standard admin filters.
         * Returns total count alongside the page so we can build PageInfo in one round-trip.
         */
        AdminUsersRepository_1.prototype.listAndCount = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, where, q, and, orderBy, _a, items, total;
                var _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            where = {};
                            if ((_f = input.search) === null || _f === void 0 ? void 0 : _f.trim()) {
                                q = input.search.trim();
                                where.OR = [
                                    { fullName: { contains: q, mode: 'insensitive' } },
                                    { phoneNumber: { contains: q, mode: 'insensitive' } },
                                    { email: { contains: q, mode: 'insensitive' } },
                                ];
                            }
                            if (input.role)
                                where.role = input.role;
                            and = [];
                            if (input.organizerStatus) {
                                and.push({
                                    capabilities: { some: { type: client_1.CapabilityType.ORGANIZER, status: input.organizerStatus } },
                                });
                            }
                            if (input.venueStatus) {
                                and.push({
                                    capabilities: { some: { type: client_1.CapabilityType.VENUE, status: input.venueStatus } },
                                });
                            }
                            // Staff are managed under /staff, not in the customer directory. Keyed off
                            // the staff tables rather than the `isStaff` flag so the two can never
                            // disagree about who is an admin.
                            if (!input.includeStaff) {
                                and.push({
                                    systemStaff: { is: null },
                                    venueStaff: { none: {} },
                                    organizerStaff: { none: {} },
                                });
                            }
                            if (and.length)
                                where.AND = and;
                            if (typeof input.isActive === 'boolean')
                                where.isActive = input.isActive;
                            orderBy = this.buildOrderBy(input.sortBy, input.sortOrder);
                            return [4 /*yield*/, this.prisma.$transaction([
                                    this.prisma.user.findMany({
                                        where: where,
                                        include: USER_INCLUDES,
                                        orderBy: orderBy,
                                        skip: (page - 1) * pageSize,
                                        take: pageSize,
                                    }),
                                    this.prisma.user.count({ where: where }),
                                ])];
                        case 1:
                            _a = _g.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        AdminUsersRepository_1.prototype.setActive = function (id, isActive) {
            // Suspending a user must kill their existing sessions; reactivating doesn't
            // touch tokenVersion (no live tokens exist while inactive anyway).
            return this.prisma.user.update({
                where: { id: id },
                data: isActive ? { isActive: isActive } : { isActive: isActive, tokenVersion: { increment: 1 } },
                include: USER_INCLUDES,
            });
        };
        /**
         * Change a user's platform role marker, keeping staff state consistent.
         *
         * Demoting to USER must strip everything that grants access, not just the
         * marker: the `isStaff` flag the admin panel gates on, the scope assignment
         * rows, and every permission grant. Flipping the enum alone would leave a
         * "demoted" account still holding its permissions and still able to open the
         * panel.
         *
         * Role is embedded in the JWT, so tokenVersion rotates either way to force a
         * re-login.
         */
        AdminUsersRepository_1.prototype.setRole = function (id, role) {
            return __awaiter(this, void 0, void 0, function () {
                var becomingStaff;
                var _this = this;
                return __generator(this, function (_a) {
                    becomingStaff = role !== 'USER';
                    return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!becomingStaff) return [3 /*break*/, 5];
                                        return [4 /*yield*/, tx.staffPermission.deleteMany({ where: { userId: id } })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, tx.systemStaff.deleteMany({ where: { userId: id } })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, tx.venueStaff.deleteMany({ where: { userId: id } })];
                                    case 3:
                                        _a.sent();
                                        return [4 /*yield*/, tx.organizerStaff.deleteMany({ where: { userId: id } })];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, tx.systemStaff.upsert({
                                            where: { userId: id },
                                            update: { status: 'ACTIVE' },
                                            create: { userId: id, createdBy: id, status: 'ACTIVE' },
                                        })];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7: return [2 /*return*/, tx.user.update({
                                            where: { id: id },
                                            data: { role: role, isStaff: becomingStaff, tokenVersion: { increment: 1 } },
                                            include: USER_INCLUDES,
                                        })];
                                }
                            });
                        }); })];
                });
            });
        };
        /** How many active super admins exist — used to block removing the last one. */
        AdminUsersRepository_1.prototype.countSuperAdmins = function () {
            return this.prisma.user.count({ where: { role: 'SUPER_ADMIN', isActive: true } });
        };
        AdminUsersRepository_1.prototype.buildOrderBy = function (sortBy, sortOrder) {
            var direction = sortOrder === admin_user_model_1.SortOrder.ASC ? 'asc' : 'desc';
            switch (sortBy) {
                case admin_user_model_1.AdminUserSortField.FULL_NAME:
                    return { fullName: direction };
                case admin_user_model_1.AdminUserSortField.LAST_LOGIN_AT:
                    return { lastLoginAt: direction };
                case admin_user_model_1.AdminUserSortField.CREATED_AT:
                default:
                    return { createdAt: direction };
            }
        };
        return AdminUsersRepository_1;
    }());
    __setFunctionName(_classThis, "AdminUsersRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUsersRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUsersRepository = _classThis;
}();
exports.AdminUsersRepository = AdminUsersRepository;
