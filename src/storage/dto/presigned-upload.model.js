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
exports.PresignedUpload = void 0;
var graphql_1 = require("@nestjs/graphql");
var PresignedUpload = function () {
    var _classDecorators = [(0, graphql_1.ObjectType)({
            description: 'A presigned S3 upload. PUT the file to `uploadUrl`, then store `key` in the relevant mutation.',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _key_decorators;
    var _key_initializers = [];
    var _key_extraInitializers = [];
    var _uploadUrl_decorators;
    var _uploadUrl_initializers = [];
    var _uploadUrl_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _contentType_decorators;
    var _contentType_initializers = [];
    var _contentType_extraInitializers = [];
    var _expiresIn_decorators;
    var _expiresIn_initializers = [];
    var _expiresIn_extraInitializers = [];
    var _maxBytes_decorators;
    var _maxBytes_initializers = [];
    var _maxBytes_extraInitializers = [];
    var PresignedUpload = _classThis = /** @class */ (function () {
        function PresignedUpload_1() {
            this.key = __runInitializers(this, _key_initializers, void 0);
            this.uploadUrl = (__runInitializers(this, _key_extraInitializers), __runInitializers(this, _uploadUrl_initializers, void 0));
            this.method = (__runInitializers(this, _uploadUrl_extraInitializers), __runInitializers(this, _method_initializers, void 0));
            this.contentType = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _contentType_initializers, void 0));
            this.expiresIn = (__runInitializers(this, _contentType_extraInitializers), __runInitializers(this, _expiresIn_initializers, void 0));
            this.maxBytes = (__runInitializers(this, _expiresIn_extraInitializers), __runInitializers(this, _maxBytes_initializers, void 0));
            __runInitializers(this, _maxBytes_extraInitializers);
        }
        return PresignedUpload_1;
    }());
    __setFunctionName(_classThis, "PresignedUpload");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _key_decorators = [(0, graphql_1.Field)({
                description: 'The S3 object key. Persist THIS (not uploadUrl) in avatarUrl / imageUrls / documentUrls etc.',
            })];
        _uploadUrl_decorators = [(0, graphql_1.Field)({
                description: 'Presigned URL to PUT the file to. Send the same Content-Type header used to request it.',
            })];
        _method_decorators = [(0, graphql_1.Field)({ description: 'HTTP method to use against uploadUrl (always "PUT").' })];
        _contentType_decorators = [(0, graphql_1.Field)({ description: 'Content-Type header the client MUST send on the PUT.' })];
        _expiresIn_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Seconds until uploadUrl expires — PUT promptly.' })];
        _maxBytes_decorators = [(0, graphql_1.Field)(function () { return graphql_1.Int; }, { description: 'Advisory max file size in bytes for this category.' })];
        __esDecorate(null, null, _key_decorators, { kind: "field", name: "key", static: false, private: false, access: { has: function (obj) { return "key" in obj; }, get: function (obj) { return obj.key; }, set: function (obj, value) { obj.key = value; } }, metadata: _metadata }, _key_initializers, _key_extraInitializers);
        __esDecorate(null, null, _uploadUrl_decorators, { kind: "field", name: "uploadUrl", static: false, private: false, access: { has: function (obj) { return "uploadUrl" in obj; }, get: function (obj) { return obj.uploadUrl; }, set: function (obj, value) { obj.uploadUrl = value; } }, metadata: _metadata }, _uploadUrl_initializers, _uploadUrl_extraInitializers);
        __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
        __esDecorate(null, null, _contentType_decorators, { kind: "field", name: "contentType", static: false, private: false, access: { has: function (obj) { return "contentType" in obj; }, get: function (obj) { return obj.contentType; }, set: function (obj, value) { obj.contentType = value; } }, metadata: _metadata }, _contentType_initializers, _contentType_extraInitializers);
        __esDecorate(null, null, _expiresIn_decorators, { kind: "field", name: "expiresIn", static: false, private: false, access: { has: function (obj) { return "expiresIn" in obj; }, get: function (obj) { return obj.expiresIn; }, set: function (obj, value) { obj.expiresIn = value; } }, metadata: _metadata }, _expiresIn_initializers, _expiresIn_extraInitializers);
        __esDecorate(null, null, _maxBytes_decorators, { kind: "field", name: "maxBytes", static: false, private: false, access: { has: function (obj) { return "maxBytes" in obj; }, get: function (obj) { return obj.maxBytes; }, set: function (obj, value) { obj.maxBytes = value; } }, metadata: _metadata }, _maxBytes_initializers, _maxBytes_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PresignedUpload = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PresignedUpload = _classThis;
}();
exports.PresignedUpload = PresignedUpload;
