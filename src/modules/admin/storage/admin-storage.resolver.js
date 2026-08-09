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
exports.AdminStorageResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var require_permission_decorator_1 = require("../../../common/decorators/require-permission.decorator");
var presigned_upload_model_1 = require("../../../storage/dto/presigned-upload.model");
/**
 * Admin-only uploads (e.g. sport icons). Routes through the same StorageService
 * but with `scope: 'admin'`, so only admin-scoped categories are accepted and
 * the objects land under the `admin/` key prefix — keeping admin assets cleanly
 * separated in the bucket. Requires the `storage.upload` permission.
 */
var AdminStorageResolver = function () {
    var _classDecorators = [(0, graphql_1.Resolver)(), (0, require_permission_decorator_1.RequirePermission)('storage.upload')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _adminCreateUploadUrl_decorators;
    var AdminStorageResolver = _classThis = /** @class */ (function () {
        function AdminStorageResolver_1(storage) {
            this.storage = (__runInitializers(this, _instanceExtraInitializers), storage);
        }
        AdminStorageResolver_1.prototype.adminCreateUploadUrl = function (input, actor) {
            return this.storage.createUploadUrl({
                category: input.category,
                contentType: input.contentType,
                filename: input.filename,
                ownerId: actor.id,
                scope: 'admin',
            });
        };
        return AdminStorageResolver_1;
    }());
    __setFunctionName(_classThis, "AdminStorageResolver");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _adminCreateUploadUrl_decorators = [(0, graphql_1.Mutation)(function () { return presigned_upload_model_1.PresignedUpload; }, {
                name: 'adminCreateUploadUrl',
                description: 'Get a presigned URL to upload an admin-managed asset (e.g. a sport icon) directly to S3.',
            })];
        __esDecorate(_classThis, null, _adminCreateUploadUrl_decorators, { kind: "method", name: "adminCreateUploadUrl", static: false, private: false, access: { has: function (obj) { return "adminCreateUploadUrl" in obj; }, get: function (obj) { return obj.adminCreateUploadUrl; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminStorageResolver = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminStorageResolver = _classThis;
}();
exports.AdminStorageResolver = AdminStorageResolver;
