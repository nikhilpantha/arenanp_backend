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
exports.AdminUsersService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var admin_user_model_1 = require("./dto/admin-user.model");
var pagination_input_1 = require("../../../common/dto/pagination.input");
var AdminUsersService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminUsersService = _classThis = /** @class */ (function () {
        function AdminUsersService_1(repo, permissions) {
            this.repo = repo;
            this.permissions = permissions;
        }
        AdminUsersService_1.prototype.listUsers = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var page, pageSize, _a, items, total;
                var _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            page = (_c = (_b = input.pagination) === null || _b === void 0 ? void 0 : _b.page) !== null && _c !== void 0 ? _c : 1;
                            pageSize = (_e = (_d = input.pagination) === null || _d === void 0 ? void 0 : _d.pageSize) !== null && _e !== void 0 ? _e : 20;
                            return [4 /*yield*/, this.repo.listAndCount(input)];
                        case 1:
                            _a = _f.sent(), items = _a.items, total = _a.total;
                            return [2 /*return*/, {
                                    items: items.map(admin_user_model_1.mapPrismaUserToAdmin),
                                    pageInfo: (0, pagination_input_1.buildPageInfo)(page, pageSize, total),
                                }];
                    }
                });
            });
        };
        AdminUsersService_1.prototype.getUserDetail = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(id)];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            // Related collections (bookings / payments / teams) land with their owning
                            // modules. Until then we return safe zero/empty values so the detail UI works.
                            return [2 /*return*/, {
                                    user: (0, admin_user_model_1.mapPrismaUserToAdmin)(user),
                                    bookingsCount: 0,
                                    totalSpent: 0,
                                    recentBookings: [],
                                    recentPayments: [],
                                    teams: [],
                                }];
                    }
                });
            });
        };
        AdminUsersService_1.prototype.setActive = function (id, isActive, actor) {
            return __awaiter(this, void 0, void 0, function () {
                var target, remaining, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(id)];
                        case 1:
                            target = _a.sent();
                            if (!target)
                                throw new common_1.NotFoundException('User not found');
                            if (target.id === actor.id) {
                                throw new common_1.BadRequestException('You cannot change the active state of your own account.');
                            }
                            if (target.isActive === isActive)
                                return [2 /*return*/, (0, admin_user_model_1.mapPrismaUserToAdmin)(target)];
                            if (!(!isActive && target.role === client_1.UserRole.SUPER_ADMIN)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.repo.countSuperAdmins()];
                        case 2:
                            remaining = _a.sent();
                            if (remaining <= 1) {
                                throw new common_1.ConflictException('This is the last active super admin. Promote another account before suspending this one.');
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.repo.setActive(id, isActive)];
                        case 4:
                            updated = _a.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(id)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, admin_user_model_1.mapPrismaUserToAdmin)(updated)];
                    }
                });
            });
        };
        /**
         * Change a user's platform role marker.
         *
         * Demoting revokes staff access outright — see `AdminUsersRepository.setRole`.
         * Two guards stand in the way of locking everyone out: you cannot demote
         * yourself, and you cannot remove the last super admin.
         */
        AdminUsersService_1.prototype.updateRole = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                var target, remaining, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findById(input.userId)];
                        case 1:
                            target = _a.sent();
                            if (!target)
                                throw new common_1.NotFoundException('User not found');
                            if (target.id === actor.id && input.role !== client_1.UserRole.SUPER_ADMIN) {
                                throw new common_1.ConflictException('You cannot demote your own super-admin account.');
                            }
                            if (target.role === input.role)
                                return [2 /*return*/, (0, admin_user_model_1.mapPrismaUserToAdmin)(target)];
                            if (!(target.role === client_1.UserRole.SUPER_ADMIN && input.role !== client_1.UserRole.SUPER_ADMIN)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.repo.countSuperAdmins()];
                        case 2:
                            remaining = _a.sent();
                            if (remaining <= 1) {
                                throw new common_1.ConflictException('This is the last super admin. Promote another account before demoting this one.');
                            }
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.repo.setRole(input.userId, input.role)];
                        case 4:
                            updated = _a.sent();
                            return [4 /*yield*/, this.permissions.invalidateUser(input.userId)];
                        case 5:
                            _a.sent();
                            return [2 /*return*/, (0, admin_user_model_1.mapPrismaUserToAdmin)(updated)];
                    }
                });
            });
        };
        return AdminUsersService_1;
    }());
    __setFunctionName(_classThis, "AdminUsersService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUsersService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUsersService = _classThis;
}();
exports.AdminUsersService = AdminUsersService;
