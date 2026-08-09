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
exports.CreateUploadUrlInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var class_validator_1 = require("class-validator");
var storage_constants_1 = require("../storage.constants");
// Side-effect import: registers the UploadCategory enum with GraphQL.
require("../storage.constants");
var CreateUploadUrlInput = function () {
    var _classDecorators = [(0, graphql_1.InputType)({
            description: 'Ask the backend for a presigned URL to upload one file directly to S3.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _category_decorators;
    var _category_initializers = [];
    var _category_extraInitializers = [];
    var _contentType_decorators;
    var _contentType_initializers = [];
    var _contentType_extraInitializers = [];
    var _filename_decorators;
    var _filename_initializers = [];
    var _filename_extraInitializers = [];
    var CreateUploadUrlInput = _classThis = /** @class */ (function () {
        function CreateUploadUrlInput_1() {
            this.category = __runInitializers(this, _category_initializers, void 0);
            this.contentType = (__runInitializers(this, _category_extraInitializers), __runInitializers(this, _contentType_initializers, void 0));
            this.filename = (__runInitializers(this, _contentType_extraInitializers), __runInitializers(this, _filename_initializers, void 0));
            __runInitializers(this, _filename_extraInitializers);
        }
        return CreateUploadUrlInput_1;
    }());
    __setFunctionName(_classThis, "CreateUploadUrlInput");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _category_decorators = [(0, graphql_1.Field)(function () { return storage_constants_1.UploadCategory; }, {
                description: 'What the file is — fixes the S3 prefix and accepted types.',
            }), (0, class_validator_1.IsEnum)(storage_constants_1.UploadCategory)];
        _contentType_decorators = [(0, graphql_1.Field)({
                description: 'MIME type of the file, e.g. "image/jpeg". Must match the category and the PUT Content-Type header.',
            }), (0, class_validator_1.IsString)(), (0, class_validator_1.Matches)(/^[\w.+-]+\/[\w.+-]+$/, { message: 'contentType must be a valid MIME type' })];
        _filename_decorators = [(0, graphql_1.Field)({
                nullable: true,
                description: 'Original filename — optional, used only to derive the extension when the MIME is ambiguous.',
            }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(255)];
        __esDecorate(null, null, _category_decorators, { kind: "field", name: "category", static: false, private: false, access: { has: function (obj) { return "category" in obj; }, get: function (obj) { return obj.category; }, set: function (obj, value) { obj.category = value; } }, metadata: _metadata }, _category_initializers, _category_extraInitializers);
        __esDecorate(null, null, _contentType_decorators, { kind: "field", name: "contentType", static: false, private: false, access: { has: function (obj) { return "contentType" in obj; }, get: function (obj) { return obj.contentType; }, set: function (obj, value) { obj.contentType = value; } }, metadata: _metadata }, _contentType_initializers, _contentType_extraInitializers);
        __esDecorate(null, null, _filename_decorators, { kind: "field", name: "filename", static: false, private: false, access: { has: function (obj) { return "filename" in obj; }, get: function (obj) { return obj.filename; }, set: function (obj, value) { obj.filename = value; } }, metadata: _metadata }, _filename_initializers, _filename_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CreateUploadUrlInput = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CreateUploadUrlInput = _classThis;
}();
exports.CreateUploadUrlInput = CreateUploadUrlInput;
