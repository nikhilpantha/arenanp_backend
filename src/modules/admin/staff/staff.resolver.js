"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.StaffResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var staff_dto_1 = require("./dto/staff.dto");
var StaffResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return staff_dto_1.StaffMember; })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _listStaff_decorators;
    var _getStaffPermissions_decorators;
    var _createStaff_decorators;
    var _suspendStaff_decorators;
    var _unsuspendStaff_decorators;
    var StaffResolver = _classThis = /** @class */ (function () {
        function StaffResolver_1(staffService) {
            this.staffService = (__runInitializers(this, _instanceExtraInitializers), staffService);
        }
        /** List platform, venue and tournament admins with their scopes. */
        StaffResolver_1.prototype.listStaff = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffService.listStaff(input || {})];
                });
            });
        };
        /** A staff member's grants and effective permissions within one scope. */
        StaffResolver_1.prototype.getStaffPermissions = function (userId, scopeType, scopeId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.staffService.getStaffPermissions(userId, scopeType, scopeId)];
                });
            });
        };
        /**
         * Create a staff member as an admin of one scope. Permissions are granted
         * separately — pass `permissionKeys` to seed an initial set.
         */
        StaffResolver_1.prototype.createStaff = function (input, actor) {
            return __awaiter(this, void 0, void 0, function () {
                var created;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.staffService.createStaff(input, actor.id)];
                        case 1:
                            created = _a.sent();
                            return [2 /*return*/, {
                                    id: created.id,
                                    phoneNumber: created.phoneNumber,
                                    fullName: created.fullName,
                                    email: created.email,
                                    role: created.role,
                                    // The caller refetches the list to pick up the assignment; returning an
                                    // empty array is honest about what this write actually returned.
                                    assignments: [],
                                    isActive: created.isActive,
                                    createdAt: created.createdAt,
                                }];
                    }
                });
            });
        };
        /** Suspend a staff member (isActive=false, tokens revoked). */
        StaffResolver_1.prototype.suspendStaff = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.staffService.suspendStaff(userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, "Staff member ".concat(userId, " suspended")];
                    }
                });
            });
        };
        /** Restore a suspended staff member. */
        StaffResolver_1.prototype.unsuspendStaff = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.staffService.unsuspendStaff(userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, "Staff member ".concat(userId, " unsuspended")];
                    }
                });
            });
        };
        return StaffResolver_1;
    }());
    __setFunctionName(_classThis, "StaffResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listStaff_decorators = [(0, graphql_1.Query)(function () { return staff_dto_1.ListStaffOutput; }), (0, require_permission_decorator_1.RequirePermission)('staff.view')];
        _getStaffPermissions_decorators = [(0, graphql_1.Query)(function () { return staff_dto_1.StaffPermissionsView; }), (0, require_permission_decorator_1.RequirePermission)('permissions.view')];
        _createStaff_decorators = [(0, graphql_1.Mutation)(function () { return staff_dto_1.StaffMember; }), (0, require_permission_decorator_1.RequirePermission)('staff.create')];
        _suspendStaff_decorators = [(0, graphql_1.Mutation)(function () { return String; }), (0, require_permission_decorator_1.RequirePermission)('staff.suspend')];
        _unsuspendStaff_decorators = [(0, graphql_1.Mutation)(function () { return String; }), (0, require_permission_decorator_1.RequirePermission)('staff.activate')];
        __esDecorate(_classThis, null, _listStaff_decorators, { kind: "method", name: "listStaff", static: false, private: false, access: { has: function (obj) { return "listStaff" in obj; }, get: function (obj) { return obj.listStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStaffPermissions_decorators, { kind: "method", name: "getStaffPermissions", static: false, private: false, access: { has: function (obj) { return "getStaffPermissions" in obj; }, get: function (obj) { return obj.getStaffPermissions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createStaff_decorators, { kind: "method", name: "createStaff", static: false, private: false, access: { has: function (obj) { return "createStaff" in obj; }, get: function (obj) { return obj.createStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _suspendStaff_decorators, { kind: "method", name: "suspendStaff", static: false, private: false, access: { has: function (obj) { return "suspendStaff" in obj; }, get: function (obj) { return obj.suspendStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unsuspendStaff_decorators, { kind: "method", name: "unsuspendStaff", static: false, private: false, access: { has: function (obj) { return "unsuspendStaff" in obj; }, get: function (obj) { return obj.unsuspendStaff; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StaffResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StaffResolver = _classThis;
}();
exports.StaffResolver = StaffResolver;
