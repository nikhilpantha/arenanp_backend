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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var admin_user_model_1 = require("./dto/admin-user.model");
var list_admin_users_input_1 = require("./dto/list-admin-users.input");
var paginated_admin_users_1 = require("./dto/paginated-admin-users");
var AdminUsersResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(function () { return admin_user_model_1.AdminUser; }), (0, require_permission_decorator_1.RequirePermission)('users.view')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _avatarUrl_decorators;
    var _listUsers_decorators;
    var _userDetail_decorators;
    var _suspendUser_decorators;
    var _unsuspendUser_decorators;
    var _updateUserRole_decorators;
    var AdminUsersResolver = _classThis = /** @class */ (function () {
        function AdminUsersResolver_1(service, storage) {
            this.service = (__runInitializers(this, _instanceExtraInitializers), service);
            this.storage = storage;
        }
        /** Presign the stored avatar key into a temporary download URL on read. */
        AdminUsersResolver_1.prototype.avatarUrl = function (user) {
            return this.storage.getDownloadUrl(user.avatarUrl);
        };
        AdminUsersResolver_1.prototype.listUsers = function (input) {
            return this.service.listUsers(input !== null && input !== void 0 ? input : new list_admin_users_input_1.ListAdminUsersInput());
        };
        AdminUsersResolver_1.prototype.userDetail = function (id) {
            return this.service.getUserDetail(id);
        };
        AdminUsersResolver_1.prototype.suspendUser = function (id, actor) {
            return this.service.setActive(id, false, actor);
        };
        AdminUsersResolver_1.prototype.unsuspendUser = function (id, actor) {
            return this.service.setActive(id, true, actor);
        };
        AdminUsersResolver_1.prototype.updateUserRole = function (input, actor) {
            return this.service.updateRole(input, actor);
        };
        return AdminUsersResolver_1;
    }());
    __setFunctionName(_classThis, "AdminUsersResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _avatarUrl_decorators = [(0, graphql_1.ResolveField)(function () { return String; }, { nullable: true })];
        _listUsers_decorators = [(0, graphql_1.Query)(function () { return paginated_admin_users_1.PaginatedAdminUsers; }, {
                name: 'adminListUsers',
                description: 'List platform users with pagination, search and filters.',
            })];
        _userDetail_decorators = [(0, graphql_1.Query)(function () { return admin_user_model_1.AdminUserDetail; }, {
                name: 'adminUserDetail',
                description: 'Full detail payload for a single user.',
            })];
        _suspendUser_decorators = [(0, require_permission_decorator_1.RequirePermission)('users.suspend'), (0, graphql_1.Mutation)(function () { return admin_user_model_1.AdminUser; }, {
                name: 'adminSuspendUser',
                description: 'Suspend a user (sets isActive=false).',
            })];
        _unsuspendUser_decorators = [(0, require_permission_decorator_1.RequirePermission)('users.activate'), (0, graphql_1.Mutation)(function () { return admin_user_model_1.AdminUser; }, {
                name: 'adminUnsuspendUser',
                description: 'Reactivate a previously suspended user (sets isActive=true).',
            })];
        _updateUserRole_decorators = [(0, require_permission_decorator_1.RequirePermission)('permissions.assign'), (0, graphql_1.Mutation)(function () { return admin_user_model_1.AdminUser; }, {
                name: 'adminUpdateUserRole',
                description: 'Update a user’s platform role (USER / SUPER_ADMIN).',
            })];
        __esDecorate(_classThis, null, _avatarUrl_decorators, { kind: "method", name: "avatarUrl", static: false, private: false, access: { has: function (obj) { return "avatarUrl" in obj; }, get: function (obj) { return obj.avatarUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listUsers_decorators, { kind: "method", name: "listUsers", static: false, private: false, access: { has: function (obj) { return "listUsers" in obj; }, get: function (obj) { return obj.listUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _userDetail_decorators, { kind: "method", name: "userDetail", static: false, private: false, access: { has: function (obj) { return "userDetail" in obj; }, get: function (obj) { return obj.userDetail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _suspendUser_decorators, { kind: "method", name: "suspendUser", static: false, private: false, access: { has: function (obj) { return "suspendUser" in obj; }, get: function (obj) { return obj.suspendUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _unsuspendUser_decorators, { kind: "method", name: "unsuspendUser", static: false, private: false, access: { has: function (obj) { return "unsuspendUser" in obj; }, get: function (obj) { return obj.unsuspendUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserRole_decorators, { kind: "method", name: "updateUserRole", static: false, private: false, access: { has: function (obj) { return "updateUserRole" in obj; }, get: function (obj) { return obj.updateUserRole; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUsersResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUsersResolver = _classThis;
}();
exports.AdminUsersResolver = AdminUsersResolver;
